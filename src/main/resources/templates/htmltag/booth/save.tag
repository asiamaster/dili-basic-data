<script>
    var app = new Vue({
        el: '#app',
        data() {
            return {
                formBtns: [
                    {
                        text: '关闭',
                        click: () => {
                            $.modal.close();
                        }
                    }
                ],
                formData: {
                    businessType:1
                },
                formDesc: {
                    type: {
                        options: function (data) {
                            return loadProvider({
                                provider: 'dataDictionaryValueProvider',
                                queryParams: {dd_code: "${_type}", required: true}
                            })
                        },
                        label: "类型",
                        type: "select",
                        layout: 6,
                        required: true
                    },
                    departmentId: {
                        options: function (data) {
                            return loadProvider({
                                provider: 'authDepartmentProvider'})
                        },
                        label: "所属部门",
                        type: "select",
                        layout: 6,
                        required: false
                    },
                    areaArray: {
                        options: function (data) {
                            return new Promise((resolve, reject) => {
                                axios.post('/district/search.action', {parentId: 0})
                                    .then((res) => {
                                        resolve(res.data.data);
                                        // console.log(res);
                                    })
                                    .catch(function (error) {
                                        reject(error);
                                        // console.log(error);
                                    });
                            });
                        },
                        label: "区域",
                        type: "cascader",
                        attrs: {
                            props: {
                                value: 'id',
                                label: 'name',
                                separator: '-',
                                expandTrigger: 'hover',
                                checkStrictly: true,
                                lazy: true,
                                lazyLoad(node, resolve) {
                                    if(node.value){
                                        axios.post('/district/search.action', {parentId: node.value})
                                            .then((res) => {
                                                resolve(res.data.data);
                                                // console.log(res);
                                            })
                                            .catch(function (error) {
                                                reject(error);
                                                // console.log(error);
                                            });
                                    }
                                }
                            }
                        },
                        layout: 6,
                        required: true
                    },
                    name: {
                        label: "编号",
                        type: "input",
                        attrs: {
                            maxlength: 20,
                            showWordLimit: true
                        },
                        layout: 6,
                        required: true
                    },
                    corner: {
                        options: function (data) {
                            return loadProvider({
                                provider: 'cornerProvider',
                                queryParams: {required: true}
                            })
                        },
                        label: "是否转角",
                        type: "select",
                        layout: 6,
                        required: true,
                        vif (data) {
                            return data.businessType === 1
                        }
                    },
                    unit: {
                        options: function (data) {
                            return loadProvider({
                                provider: 'dataDictionaryValueProvider',
                                queryParams: {dd_code: "unit", required: true}
                            })
                        },
                        label: "单位",
                        type: "select",
                        layout: 6,
                        required: true
                    },
                    number: {
                        label: "数量",
                        type: "number",
                        attrs: {
                            min: 1,
                            max: 999999,
                            precision: 2
                        },
                        default: 0,
                        layout: 6,
                        required: true
                    },
                    notes: {
                        label: "备注",
                        type: "textarea",
                        attrs: {
                            maxlength: 100,
                            showWordLimit: true,
                            autosize: {
                                minRows: 2,
                                maxRows: 4
                            }
                        },
                        layout: 24
                    },
                    creatorUser: {
                        label: "创建人",
                        type: "input",
                        attrs: {
                            disabled: true
                        },
                        vif (data) {
                            return data.creatorUser
                        },
                        layout: 6
                    },
                    createTime: {
                        label: "创建时间",
                        type: "input",
                        attrs: {
                            disabled: true
                        },
                        vif (data) {
                            return data.createTime
                        },
                        layout: 18
                    }
                }
            };
        },
        methods: {
            handleRequest(data) {
                // 转换一级区域和二级区域
                let areaArray = data.areaArray;
                data.area = areaArray[0];
                if(areaArray.length > 1){
                    data.secondArea = areaArray[1];
                }

                axios.post(rootPath + "${_url}", data)
                    .then(function (response) {
                        $.operate.saveSuccess(response.data);
                    })
                    .catch(function (error) {
                        $.modal.alertError("系统错误");
                    });
            }
        }
    })
    function loadProvider(data) {
        return new Promise((resolve, reject) => {
            axios.post('/convert/list.action', data)
                .then((res) => {
                    resolve(res.data);
                    // console.log(res);
                })
                .catch(function (error) {
                    reject(error);
                    // console.log(error);
                });
        });
    }
</script>