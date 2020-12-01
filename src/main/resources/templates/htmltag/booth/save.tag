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
                    businessType: {
                        options: [
                            {text: '摊位', value: 1, attrs: {size: 'medium'}},
                            {text: '冷库', value: 2, attrs: {size: 'medium'}},
                            {text: '公寓', value: 3, attrs: {size: 'medium'}}
                        ],
                        label: "资产类型",
                        type: "select",
                        layout: 6,
                        required: true
                    },
                    areaArray: {
                        options: function (data) {
                            return new Promise((resolve, reject) => {
                                axios.post('/district/search.action')
                                    .then((res) => {
                                        resolve(toEleTree(res.data.data, {label: "name", pid: "parentId"}));
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
                                checkStrictly: true
                            }
                        },
                        layout: 6,
                        required: true
                    },
                    floor: {
                        label: "楼层",
                        type: "select",
                        layout: 6,
                        optionsLinkageFields: ['areaArray'],
                        prop: { text: 'name', value: 'name' },
                        options: data => {
                            if (data.areaArray!==undefined && data.areaArray.length > 0) {
                                let areaArray = data.areaArray;
                                let area = areaArray[0];
                                if (areaArray.length > 1) {
                                    area = areaArray[1];
                                }
                                return new Promise((resolve, reject) => {
                                    axios.post('/floorController/queryAll.action', {area: area})
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
                        }
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
                    name: {
                        label: "编号",
                        type: "input",
                        attrs: {
                            maxlength: 20,
                            showWordLimit: false
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
                        required: true
                    },
                    type: {
                        options: [
                            {text: '固定', value: 0, attrs: {size: 'medium'}},
                            {text: '临时', value: 1, attrs: {size: 'medium'}}
                        ],
                        label: "性质",
                        type: "select",
                        layout: 6,
                        required: true
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
                if (areaArray.length > 1) {
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