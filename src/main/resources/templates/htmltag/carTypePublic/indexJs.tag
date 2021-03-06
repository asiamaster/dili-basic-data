<script>
    //时间范围
    lay('.laydatetime').each(function () {
        laydate.render({
            elem: this
            , trigger: 'click'
            , range: false
        });
    });

    /*********************变量定义区 begin*************/
        //行索引计数器
        //如 let itemIndex = 0;
    let _grid = $('#grid');
    let _form = $('#_form');
    let _modal = $('#_modal');

    /*********************变量定义区 end***************/


    /******************************驱动执行区 begin***************************/
    $(function () {
        $(window).resize(function () {
            _grid.bootstrapTable('resetView')
        });
        let size = ($(window).height() - $('#queryForm').height() - 210) / 40;
        size = size > 10 ? size : 10;
        _grid.bootstrapTable('refreshOptions', {url: '/carTypePublic/listPage.action', pageSize: parseInt(size)});
    });

    /******************************驱动执行区 end****************************/

    /*****************************************函数区 begin************************************/
    /**
     * 打开新增窗口
     */
    function openInsertHandler() {
        $("#_modal").modal();

        $('#_modal .modal-body').load("/carTypePublic/add.html");
        _modal.find('.modal-title').text('车型新增');

    }

    /**
     * 打开修改窗口
     */
    function openUpdateHandler(id) {
        let rows = _grid.bootstrapTable('getSelections');
        if (null == rows || rows.length == 0) {
            bs4pop.alert('请选中一条数据');
            return;
        }
        $("#_modal").modal("show");
        if(rows[0].id){
			$('#_modal .modal-body').load("/carTypePublic/update.html?id=" + rows[0].id + "&carTypeId=" + rows[0].car_type_id + "&name=" + rows[0].carTypeName + "&number=" + rows[0].carTypeNumber);
        }else{
        	$('#_modal .modal-body').load("/carTypePublic/update.html?" + "carTypeId=" + rows[0].car_type_id + "&name=" + rows[0].carTypeName + "&number=" + rows[0].carTypeNumber);
        }
		
        _modal.find('.modal-title').text('业务属性设置');
    }

    function openDeleteHandler(id) {
        let rows = _grid.bootstrapTable('getSelections');
        if (null == rows || rows.length == 0) {
            bs4pop.alert('请选中一条数据');
            return;
        }
        bs4pop.confirm("确定要删除吗", {title: "确认提示"}, function (sure) {
            if (sure) {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: '/carTypePublic/delete.action',
                    data: {id: rows[0].id},
                    success: function (data) {
                        bui.loading.hide();
                        if (data.code != '200') {
                            bs4pop.alert(data.message, {type: 'error'});
                            return;
                        }
                        // bs4pop.alert('成功', {type: 'success '}, function () {
                        //     window.location.reload();
                        // });
                        window.location.reload();
                    },
                    error: function () {
                        bui.loading.hide();
                        bs4pop.alert("车型删除失败!", {type: 'error'});
                    }
                });
            }
        });
    }

    /**
     * 禁启用操作
     * @param enable 是否启用:true-启用
     * @param id
     */
    function doEnableHandler(enable, id) {
        var opType ="";
        if(enable == 1){
            opType = "enable";
        }
        if(enable == 2){
            opType = "disable";
        }
        let rows = _grid.bootstrapTable('getSelections');
        if (null == rows || rows.length == 0) {
            bs4pop.alert('请选中一条数据');
            return;
        }
        //table选择模式是单选时可用
        let msg = enable == 1 ? '确定要启用该车型吗？' : '确定要禁用该车型吗？';
        bs4pop.confirm(msg, undefined, function (sure) {
            if (sure) {
                bui.loading.show('努力提交中，请稍候。。。');
                $.ajax({
                    type: "POST",
                    url: "${contextPath}/carTypePublic/updateStatus.action",
                    data: {id: rows[0].id, status: enable,opType:opType, "carType.name": rows[0].carTypeName},
                    processData: true,
                    dataType: "json",
                    async: true,
                    success: function (data) {
                        bui.loading.hide();
                        if (data.success) {
                            _grid.bootstrapTable('refresh');
                            $("#btn_disabled").removeClass("btn_css_disabled");
                            $("#btn_enabled").removeClass("btn_css_disabled");
                            _modal.modal('hide');
                        } else {
                            bs4pop.alert(data.result, {type: 'error'});
                        }
                    },
                    error: function () {
                        bui.loading.hide();
                        bs4pop.alert('远程访问失败', {type: 'error'});
                    }
                });
            }
        })
    }


    /**
     * 查询处理
     */
    function queryDataHandler() {
    	if (!$('#queryForm').valid()) {
            return false;
        }else{
		    _grid.bootstrapTable('refresh');
        }
    }

    /**
     * table参数组装
     * 可修改queryParams向服务器发送其余的参数
     * @param params
     */
    function queryParams(params) {
        let temp = {
            rows: params.limit,   //页面大小
            page: ((params.offset / params.limit) + 1) || 1, //页码
            sort: params.sort,
            order: params.order
        };
        return $.extend(temp, bui.util.bindGridMeta2Form('grid', 'queryForm'));
    }

    /*****************************************函数区 end**************************************/

    /*****************************************自定义事件区 begin************************************/
    //表单弹框关闭事件
    _modal.on('hidden.bs.modal', function () {
        _form[0].reset();
        //重置表单验证到初始状态
        $(this).find('input,select,textarea').removeClass('is-invalid is-valid');
        $(this).find('input,select,textarea').removeAttr('disabled readonly');
        $(this).find('.invalid-feedback').css('display', 'none');
    });

    _grid.on('post-body.bs.table', function (e,data){
        var columns = _grid.bootstrapTable('getOptions').columns;
        if (columns && columns[0][0].visible) {
            _grid.treegrid({
                treeColumn: 0,
                expanderExpandedClass: 'fa fa-minus',
                expanderCollapsedClass: 'fa fa-plus',
                onChange: function() {
                    console.log($(this).treegrid('getDepth'))
                }
            })
        }
    });

    /*****************************************自定义事件区 end**************************************/
</script>