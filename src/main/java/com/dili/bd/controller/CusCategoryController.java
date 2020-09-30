package com.dili.bd.controller;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.TimeInterval;
import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import com.dili.assets.sdk.dto.CategoryDTO;
import com.dili.assets.sdk.dto.CusCategoryDTO;
import com.dili.assets.sdk.dto.CusCategoryQuery;
import com.dili.assets.sdk.rpc.AssetsRpc;
import com.dili.assets.sdk.rpc.CategoryRpc;
import com.dili.bd.domian.CategoryNew;
import com.dili.bd.util.LogBizTypeConst;
import com.dili.bd.util.LoggerUtil;
import com.dili.bd.util.PinyinUtil;
import com.dili.bd.util.similarity.util.CosineSimilarity;
import com.dili.commons.glossary.EnabledStateEnum;
import com.dili.logger.sdk.annotation.BusinessLogger;
import com.dili.logger.sdk.base.LoggerContext;
import com.dili.logger.sdk.glossary.LoggerConstant;
import com.dili.ss.domain.BaseOutput;
import com.dili.uap.sdk.domain.UserTicket;
import com.dili.uap.sdk.session.SessionContext;
import com.hankcs.hanlp.suggest.Suggester;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

/**
 * CategoryController
 */
@Controller
@RequestMapping("/cus_category")
@Slf4j
public class CusCategoryController {

    @Autowired
    private AssetsRpc assetsRpc;
    @Autowired
    private CategoryRpc categoryRpc;

    @Value("${dfs.url}")
    private String dfsurl;

    /**
     * 跳转到品类列表页
     */
    @RequestMapping("list.html")
    public String list() {
        return "cus_category/list";
    }

    /**
     * 返回添加品类页面片段
     */
    @RequestMapping("addView.html")
    public String toAdd(ModelMap map) {
        map.put("url", dfsurl);
        return "cus_category/add";
    }

    /**
     * 导入
     *
     * @return
     */
    @RequestMapping("import.action")
    public String toImport() {
        return "cus_category/import";
    }

    /**
     * do import
     *
     * @param file
     * @return
     */
    @PostMapping("doImport.action")
    @ResponseBody
    public Object doImport(@RequestParam("file") MultipartFile file) {
        try {
            TimeInterval timer = DateUtil.timer();
            assetsRpc.delByMarket(SessionContext.getSessionContext().getUserTicket().getFirmId());
            ExcelReader reader = ExcelUtil.getReader(file.getInputStream(), 0);
            List<Map<String, Object>> readAll = reader.readAll();
            Set<String> yiji = new HashSet<>();
            readAll.forEach(it -> {
                Object[] objects = it.keySet().toArray();
                yiji.add(it.get(objects[0].toString()).toString());
            });
            List<CategoryNew> root = new ArrayList<>();

            yiji.forEach(it -> {
                CategoryNew categoryNew = new CategoryNew();
                categoryNew.setName(it);
                List<CategoryNew> erji = new ArrayList<>();
                readAll.forEach(it2 -> {
                    Object[] objects = it2.keySet().toArray();
                    if (it2.get(objects[0].toString()).toString().equals(it)) {
                        CategoryNew categoryNew2 = new CategoryNew();
                        categoryNew2.setName(it2.get(objects[1].toString()).toString());
                        if (erji.stream().anyMatch(iterji -> iterji.getName().equals(categoryNew2.getName()))) {
                            return;
                        }
                        List<CategoryNew> esanji = new ArrayList<>();
                        readAll.forEach(it3 -> {
                            Object[] objects2 = it3.keySet().toArray();
                            if (it3.get(objects2[1].toString()).toString().equals(categoryNew2.getName())) {
                                CategoryNew categoryNew3 = new CategoryNew();
                                categoryNew3.setName(it3.get(objects2[2].toString()).toString());
                                esanji.add(categoryNew3);
                            }
                        });
                        categoryNew2.setChildren(esanji);
                        erji.add(categoryNew2);
                    }
                });
                categoryNew.setChildren(erji);
                root.add(categoryNew);
            });

            Snowflake snowflake = IdUtil.getSnowflake(1, 1);
            for (CategoryNew categoryNew : root) {
                CusCategoryDTO cusCategory = new CusCategoryDTO();
                cusCategory.setName(categoryNew.getName());
                if (StrUtil.isBlank(cusCategory.getPingying())) {
                    cusCategory.setPingying(PinyinUtil.converterToSpell(categoryNew.getName()));
                    cusCategory.setPyInitials(PinyinUtil.converterToFirstSpell(categoryNew.getName()));
                } else {
                    cusCategory.setPingying(categoryNew.getPingying());
                    cusCategory.setPyInitials(categoryNew.getPyInitials());
                }
                cusCategory.setIcon(categoryNew.getIcon());
                cusCategory.setParent(0L);
                cusCategory.setCreatorId(SessionContext.getSessionContext().getUserTicket().getId());
                cusCategory.setCreateTime(new Date());
                cusCategory.setModifyTime(new Date());
                if (StrUtil.isBlank(categoryNew.getCode())) {
                    cusCategory.setKeycode(snowflake.nextIdStr());
                } else {
                    cusCategory.setKeycode(categoryNew.getCode());
                }
                cusCategory.setCategoryId(matchCategory(cusCategory.getName()));
                cusCategory.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
                BaseOutput<Integer> baseOutput = assetsRpc.saveCusCategory(cusCategory);
                savechildren(baseOutput.getData().longValue(), categoryNew.getChildren(), snowflake);
            }
            log.info("导入完成,花费:" + timer.intervalMinute() + "分钟");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return BaseOutput.success();
    }

    /**
     * test
     *
     * @param parentId
     * @param children
     */
    private void savechildren(Long parentId, List<CategoryNew> children, Snowflake snowflake) {
        if (CollUtil.isNotEmpty(children)) {
            for (CategoryNew categoryNew : children) {
                CusCategoryDTO cusCategory = new CusCategoryDTO();
                cusCategory.setName(categoryNew.getName());
                if (StrUtil.isBlank(cusCategory.getPingying())) {
                    cusCategory.setPingying(PinyinUtil.converterToSpell(categoryNew.getName()));
                    cusCategory.setPyInitials(PinyinUtil.converterToFirstSpell(categoryNew.getName()));
                } else {
                    cusCategory.setPingying(categoryNew.getPingying());
                    cusCategory.setPyInitials(categoryNew.getPyInitials());
                }
                cusCategory.setIcon(categoryNew.getIcon());
                cusCategory.setParent(parentId);
                cusCategory.setCreatorId(SessionContext.getSessionContext().getUserTicket().getId());
                cusCategory.setCreateTime(new Date());
                cusCategory.setModifyTime(new Date());
                if (StrUtil.isBlank(categoryNew.getCode())) {
                    cusCategory.setKeycode(snowflake.nextIdStr());
                } else {
                    cusCategory.setKeycode(categoryNew.getCode());
                }
                cusCategory.setCategoryId(matchCategory(cusCategory.getName()));
                cusCategory.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
                BaseOutput<Integer> baseOutput = assetsRpc.saveCusCategory(cusCategory);
                savechildren(baseOutput.getData().longValue(), categoryNew.getChildren(), snowflake);
            }
        }
    }

    /**
     * match test
     *
     * @param text
     * @return
     */
    private Long matchCategory(String name) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setState(EnabledStateEnum.ENABLED.getCode());
        BaseOutput<List<CategoryDTO>> list = assetsRpc.list(categoryDTO);

        CategoryDTO result = intellijSearch(list.getData(), name);
        if (result != null) {
            return result.getId();
        } else {
            List<Integer> randomEle = CollUtil.newArrayList(1, 2);
            Integer random = RandomUtil.randomEle(randomEle);
            switch (random) {
                case 1:
                    for (char c : name.toCharArray()) {
                        result = intellijSearch(list.getData(), String.valueOf(c));
                        if (result != null) {
                            return result.getId();
                        }
                    }
                    break;
                case 2:
                    Suggester suggester = new Suggester();
                    String[] titleArray = list.getData().stream().map(CategoryDTO::getName).toArray(String[]::new);
                    for (String title : titleArray) {
                        suggester.addSentence(title);
                    }

                    String text = suggester.suggest(name, 1).get(0);
                    AtomicReference<CategoryDTO> finialResult = new AtomicReference<>();
                    list.getData().stream().filter(it -> it.getName().equals(text)).findFirst().ifPresent((finialResult::set));
                    if (finialResult.get() != null) {
                        return finialResult.get().getId();
                    }
                    break;
            }
        }
        return 1L;
    }

    /**
     * 返回修改品类页面片段
     */
    @RequestMapping("editView.html")
    public String toEdit(Long id, ModelMap map) {
        CusCategoryDTO categoryDTO = assetsRpc.getCusCategory(id).getData();
        List<Long> parentArray = new ArrayList<>();
        parentArray.add(0L);
        CategoryDTO data = assetsRpc.get(categoryDTO.getCategoryId()).getData();
        JSONObject jsonObject = JSONUtil.parseObj(categoryDTO);
        if (!categoryDTO.getParent().equals(0L)) {
            CusCategoryDTO parentDTO = assetsRpc.getCusCategory(categoryDTO.getParent()).getData();
            parentArray.addAll(StrUtil.split(parentDTO.getPath(), ',').stream().filter(StrUtil::isNotBlank).map(Long::parseLong).collect(Collectors.toList()));
        }
        jsonObject.set("parentArray", parentArray);
        List<Long> categoryArray = new ArrayList<>(StrUtil.split(data.getPath(), ',').stream().filter(StrUtil::isNotBlank).map(Long::parseLong).collect(Collectors.toList()));
        jsonObject.set("categoryArray", categoryArray);
        map.put("data", jsonObject);
        map.put("url", dfsurl);
        return "cus_category/edit";
    }

    /**
     * 中文转拼音
     */
    @RequestMapping(value = "/convert.action")
    @ResponseBody
    public Map<String, Object> convert(String name) {
        Map<String, Object> map = new HashMap<>();
        if (name == null || name.trim().length() == 0) {
            map.put("first", "");
            map.put("whole", "");
            return map;
        }
        map.put("first", PinyinUtil.converterToFirstSpell(name));
        map.put("whole", PinyinUtil.converterToSpell(name));
        return map;
    }

    /**
     * 中文转拼音
     */
    @RequestMapping(value = "/match.action")
    @ResponseBody
    public Object match(String name) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setState(EnabledStateEnum.ENABLED.getCode());
        BaseOutput<List<CategoryDTO>> list = assetsRpc.list(categoryDTO);

        CategoryDTO result = intellijSearch(list.getData(), name);
        if (result != null) {
            return Arrays.stream(StrUtil.split(result.getPath(), ",")).collect(Collectors.toList()).stream().filter(StrUtil::isNotBlank).map(Long::parseLong).collect(Collectors.toList());
        } else {
            List<Integer> randomEle = CollUtil.newArrayList(1, 2);
            Integer random = RandomUtil.randomEle(randomEle);
            switch (random) {
                case 1:
                    for (char c : name.toCharArray()) {
                        result = intellijSearch(list.getData(), String.valueOf(c));
                        if (result != null) {
                            return Arrays.stream(StrUtil.split(result.getPath(), ",")).collect(Collectors.toList()).stream().filter(StrUtil::isNotBlank).map(Long::parseLong).collect(Collectors.toList());
                        }
                    }
                    break;
                case 2:
                    Suggester suggester = new Suggester();
                    String[] titleArray = list.getData().stream().map(CategoryDTO::getName).toArray(String[]::new);
                    for (String title : titleArray) {
                        suggester.addSentence(title);
                    }

                    String text = suggester.suggest(name, 1).get(0);
                    AtomicReference<CategoryDTO> finialResult = new AtomicReference<>();
                    list.getData().stream().filter(it -> it.getName().equals(text)).findFirst().ifPresent((finialResult::set));
                    if (finialResult.get() != null) {
                        return Arrays.stream(StrUtil.split(finialResult.get().getPath(), ",")).collect(Collectors.toList()).stream().filter(StrUtil::isNotBlank).map(Long::parseLong).collect(Collectors.toList());
                    }
                    break;
            }
        }

        return new ArrayList<>();
    }

    /**
     * 智能匹配
     *
     * @param list
     * @param text
     * @return
     */
    private CategoryDTO intellijSearch(List<CategoryDTO> list, String text) {
        var ref = new Object() {
            Double score = 0D;
            CategoryDTO match = null;
        };

        list.forEach(it -> {
            double temp = CosineSimilarity.getSimilarity(text, it.getName());
            if (temp >= ref.score) {
                ref.score = temp;
                ref.match = it;
            }
        });

        if (ref.match != null && ref.score != 0) {
            return ref.match;
        }
        return null;
    }

    /**
     * 获取品类树
     */
    @RequestMapping(value = "/getTree.action")
    @ResponseBody
    public BaseOutput<List<CusCategoryDTO>> getTree(CusCategoryQuery input) {
        try {
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            return assetsRpc.listCusCategory(input);
        } catch (Exception e) {
            return BaseOutput.failure(e.getMessage());
        }
    }

    /**
     * 新增品类
     */
    @RequestMapping(value = "/save.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.CATEGORY, content = "", operationType = "add", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput save(@RequestBody CusCategoryDTO input) {
        try {
            input.setCreateTime(new Date());
            input.setCreatorId(SessionContext.getSessionContext().getUserTicket().getId());
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            input.setModifyTime(new Date());
            if (input.getId() != null) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "edit");
            }
            BaseOutput save = assetsRpc.saveCusCategory(input);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            LoggerUtil.buildLoggerContext(input.getId(), input.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
            return save;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * 品类列表页面
     *
     * @param input
     * @return
     */
    @RequestMapping("/table.html")
    public ModelAndView list(@ModelAttribute CusCategoryQuery input) {

        Map<String, Object> map = new HashMap<>();
        input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
        List<CusCategoryDTO> list = assetsRpc.listCusCategory(input).getData();
        map.put("obj", list);
        return new ModelAndView("cus_category/table", map);
    }

    /**
     * 批量修改状态
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/batchUpdate.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.CATEGORY, content = "", operationType = "edit", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput batchUpdate(Long id, Integer value) {
        try {
            BaseOutput baseOutput = assetsRpc.batchCusCategoryUpdate(id, value);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            if (value.equals(EnabledStateEnum.ENABLED.getCode())) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "enable");
            }
            if (value.equals(EnabledStateEnum.DISABLED.getCode())) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "disable");
            }
            if (value.equals(3)) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "del");
            }


            LoggerUtil.buildLoggerContext(id, String.valueOf(value), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
            return baseOutput;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * list Category
     */
    @RequestMapping(value = "/search.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody
    BaseOutput<List<CusCategoryDTO>> search(String keyword) {
        CusCategoryQuery query = new CusCategoryQuery();
        if (null == keyword) {
            query.setParent(0L);
        } else {
            query.setKeyword(keyword);
        }
        try {
            return assetsRpc.listCusCategory(query);
        } catch (Exception e) {
            return BaseOutput.success().setData(new ArrayList<>());
        }
    }
}
