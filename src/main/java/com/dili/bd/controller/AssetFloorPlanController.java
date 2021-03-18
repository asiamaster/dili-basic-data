/*
 *  Copyright 2019-2020 ShaoFan
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.dili.bd.controller;

import cn.hutool.core.util.ArrayUtil;
import com.alibaba.fastjson.JSON;
import com.dili.assets.sdk.dto.AssetsDTO;
import com.dili.assets.sdk.rpc.AssetsRpc;
import com.dili.bd.domian.dto.FloorPlanDto;
import com.dili.bd.rpc.AssetFloorPlanRpc;
import com.dili.commons.glossary.YesOrNoEnum;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.domain.EasyuiPageOutput;
import com.dili.ss.exception.AppException;
import com.dili.ss.retrofitful.annotation.POST;
import com.dili.uap.sdk.domain.Department;
import com.dili.uap.sdk.domain.UserTicket;
import com.dili.uap.sdk.rpc.DepartmentRpc;
import com.dili.uap.sdk.session.SessionContext;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.Objects;

/**
 * @author asa.lee
 * @date 2021-01-28
 **/
@Controller
@RequestMapping("/assetManagement")
public class AssetFloorPlanController {
    private static final Logger logger = LoggerFactory.getLogger(AssetFloorPlanController.class);

    private String prefix = "assetManager";
    @Resource
    private AssetFloorPlanRpc assetMangerRpc;
    @Resource
    private AssetsRpc assetsRpc;
    @Resource
    private DepartmentRpc departmentRpc;

    /**
     * 上传token
     */
    @Value("${upload.config.accessToken:0000000}")
    private String accessToken;
    @Value("${upload.config.baseUrl:https://dfs.diligrp.com}")
    private String baseUrl;
    private String dirName = "/file/upload";
    private String downName ="/file/download";
    private String splitChatStr ="/";

    /**
     * 分页跳转
     */
    @GetMapping("/list.action")
    public String list(ModelMap model) {
        return prefix + "/list";
    }

    /**
     * 编辑跳转
     */
    @GetMapping("/floorPlan.html")
    public String floorPlan( ModelMap map,Long id, Long districtId,Long curDistrictId) {
        map.put("ref_id", id);
        map.put("districtId", districtId);
        map.put("curDistrictId", curDistrictId==null?districtId:curDistrictId);
        return prefix + "/floorPlan";
    }

    /**
     * 小程序编辑跳转
     */
    @GetMapping("/appletsFloorPlan.html")
    public String appletsFloorPlan(ModelMap map,Long id, Long districtId,Long curDistrictId) {
        map.put("ref_id", id);
        map.put("districtId", districtId);

        map.put("curDistrictId", curDistrictId==null?districtId:curDistrictId);
        return prefix + "/appletsFloorPlan";
    }

    /**
     * 编辑跳转
     */
    @GetMapping("/floorPlanPngEdit5.html")
    public String floorPlanPngEdit5(ModelMap map) {
        return prefix + "/floorPlanPngEdit5";
    }

    /**
     * 编辑摊位后同步到平面图方法
     */
    @RequestMapping("/updateBooth.action")
    @ResponseBody
    public BaseOutput updateBooth(@RequestBody FloorPlanDto sync) {
        try {
            assetMangerRpc.updateFloorPlanBoothData(sync);
            return BaseOutput.success();
        } catch (Exception e) {
            logger.error(e.getMessage());
            return BaseOutput.failure().setErrorData(e.getMessage());
        }

    }

    /**
     * 历史
     */
    @GetMapping("/floorPlanHistory.html")
    public String floorPlanHistory(ModelMap map, String districtId, String refId, String pDistrictId,String regionalCategory) {
        map.put("districtId", districtId);
        map.put("pDistrictId", pDistrictId);
        map.put("refId", refId);
        map.put("regionalCategory",regionalCategory);
        return prefix + "/floorPlanHistory";
    }


    /**
     * 分页查询平面图历史数据，返回easyui分页信息
     *
     * @param floorPlanDto
     * @return String
     * @throws Exception
     */
    @RequestMapping(value = "/floorPlanHistoryList.action")
    public @ResponseBody
    String floorPlanHistoryList(FloorPlanDto floorPlanDto) {
        floorPlanDto.setItemState(1);
        BaseOutput<?> plan = assetMangerRpc.getFloorPlanHistory(floorPlanDto);
        return JSON.toJSONString(plan.getData());
    }

    /**
     * 导航
     */
    @GetMapping("/floorPlanNavigation.html")
    public String floorPlanNavigation(ModelMap map, Long id) {
        try {
            map.put("id", id);
            FloorPlanDto floorPlanDto = new FloorPlanDto();
            floorPlanDto.setId(id);
            BaseOutput<?> floorPlan = assetMangerRpc.getFloorPlan(floorPlanDto);
            if (Objects.nonNull(floorPlan) && Objects.nonNull(floorPlan.getData())) {
                String plaStr = JSON.toJSONString(floorPlan.getData());
                List<FloorPlanDto> res = JSON.parseArray(plaStr, FloorPlanDto.class);
                if (CollectionUtils.isEmpty(res)) {
                    throw new AppException("未找到区域信息");
                }
                map.put("itemOrder", JSON.toJSONString(res.get(0)));
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return prefix + "/floorPlanNavigation";
    }

    /**
     * 编辑跳转
     */
    @RequestMapping("/getBoothList.action")
    @ResponseBody
    public BaseOutput<List<FloorPlanDto>> getBoothList() {
        AssetsDTO input = new AssetsDTO();
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        input.setIsDelete(YesOrNoEnum.NO.getCode());
        input.setMarketId(userTicket.getFirmId());
        // 部门过滤
        if (input.getDepartmentId() == null) {
            List<Department> departments = departmentRpc.listUserAuthDepartmentByFirmId(userTicket.getId(), userTicket.getFirmId()).getData();
            long[] ids = departments.stream().mapToLong(Department::getId).toArray();
            if (ids.length > 0) {
                input.setDeps(ArrayUtil.join(ids, ","));
            }
        }
        input.setSecondArea(10);
        String listPage = assetsRpc.listPage(input);
        if (StringUtils.isNotBlank(listPage)) {
            EasyuiPageOutput output = JSON.parseObject(listPage, EasyuiPageOutput.class);
            List list = output.getRows();
            return BaseOutput.successData(list);
        }
        return BaseOutput.failure();

    }

    /**
     * 编辑跳转
     */
    @RequestMapping("/getFloorPlanList.action")
    @ResponseBody
    public BaseOutput<List<FloorPlanDto>> getFloorPlanList(@RequestBody FloorPlanDto que) {
        try {
            if (Objects.isNull(que.getItemState())) {
                que.setItemState(0);
            }
            BaseOutput<?> plan = assetMangerRpc.getFloorPlan(que);
            if (Objects.nonNull(plan) && Objects.nonNull(plan.getData())) {
                logger.info("======>>>>" + JSON.toJSONString(plan.getData()));
                String plaStr = JSON.toJSONString(plan.getData());
                List<FloorPlanDto> res = JSON.parseArray(plaStr, FloorPlanDto.class);
                return BaseOutput.success().setData(res);
            }
        } catch (Exception e) {
            return BaseOutput.failure().setErrorData(e.getMessage());
        }
        return BaseOutput.failure();

    }

    /**
     * 更新区域图districtId
     *
     * @param floorPlanDtoList
     * @return
     */
    @RequestMapping("/updateFloorPlanList.action")
    @ResponseBody
    public BaseOutput updateFloorPlanList(@RequestBody List<FloorPlanDto> floorPlanDtoList) {
        try {
            logger.info("======>>>>" + JSON.toJSONString(floorPlanDtoList));
            return assetMangerRpc.updateFloorPlanData(floorPlanDtoList);
        } catch (Exception e) {
            return BaseOutput.failure().setErrorData(e.getMessage());
        }
    }

    /**
     * TODO 上传文件
     *
     * @param file:
     * @return：com.dili.ss.domain.BaseOutput
     * @author：Henry.Huang
     * @date：2021/1/12 14:10
     */
    @RequestMapping(value = "/doUpload.action", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public BaseOutput doUpload(@RequestParam("file") MultipartFile file) {
        try {
            BaseOutput res = doUploadFileToDFS(file);
            String resData="";
            if (logger.isInfoEnabled()) {
                logger.info("====>>>upload result:" + res);
            }
            if(res.isSuccess()){
                resData=baseUrl+downName+splitChatStr+res.getData();
        }
            return BaseOutput.successData(resData);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("=====>>>upload error" + e.getMessage());
            return BaseOutput.failure().setErrorData(e.getMessage());
        }
    }

    /**
     * TODO 执行上传到dfs服务器
     *
     * @param file:
     * @return：java.lang.String
     * @author：Henry.Huang
     * @date：2021/1/12 14:10
     */
    private BaseOutput doUploadFileToDFS(MultipartFile file) throws Exception {
        String uploadPath = baseUrl + dirName;
        String fileName = file.getOriginalFilename();
        //暂存
        File targetFile = new File(fileName);
        FileUtils.copyInputStreamToFile(file.getInputStream(), targetFile);
        //如果备份报错需要改成copyInputStreamToFile;
        FileSystemResource resource = new FileSystemResource(targetFile);
        MultiValueMap<String, Object> param = new LinkedMultiValueMap<>();
        param.add("accessToken", accessToken);
        param.add("file", resource);
        //上传
        RestTemplate restTemplate = new RestTemplate();
        if (logger.isInfoEnabled()) {
            logger.info("===========>>>>RestTemplate Url:" + uploadPath + "|uploadMap:" + param);
        }
        BaseOutput res = restTemplate.postForObject(uploadPath, param, BaseOutput.class);
        if (logger.isInfoEnabled()) {
            logger.info("===========>>>>RestTemplate Url:" + JSON.toJSONString(res));
        }
        if (targetFile.exists()) {
            targetFile.delete();
        }
        return res;
    }
}