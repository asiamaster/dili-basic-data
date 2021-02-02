var app = new Vue({
    el: '#app',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请输入类型名称'));
            } else {
                callback();
            }
        };
        return {
            formBtns: [
                {
                    text: '关闭',
                    click: () => {
                        $.modal.close();
                    }
                }
            ],
            opUrl: "",
            formData: {},
            formDesc: {
                code: {
                    type: 'input',
                    label: '类型编码',
                    attrs: {
                        maxlength: 10,
                        showWordLimit: true
                    },
                    rules: [
                        {
                            required: true, message: '请输入类型编码', trigger: 'blur'
                        },
                        {
                            pattern: new RegExp("^[0-9]*$", ""),
                            type: "string",
                            message: "只能是数字"
                        }],
                    disabled(data) {
                        return data.showCode === true;
                    }
                },
                name: {
                    type: 'input',
                    label: '类型名称',
                    attrs: {
                        maxlength: 20,
                        showWordLimit: true
                    },
                    rules: [{required: true, message: '请输入类型名称', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}],
                    displayFormatter(labels) {
                        // 判断 如果是string类型，则调用split(',')方法分割为数组，否则直接返回
                        return typeof labels === 'string' ? labels.trim() : labels
                    }
                },
                push: {
                    type: 'select',
                    label: '是否推送',
                    options: [
                        {
                            text: "是",
                            value: 1
                        },
                        {
                            text: "否",
                            value: 0
                        }
                    ],
                    default: 1
                },
                scene: {
                    isOptions: true,
                    options: [
                        {
                            text: "常规交易",
                            value: 1
                        },
                        {
                            text: "老农交易",
                            value: 2
                        },
                        {
                            text: "自营交易",
                            value: 3
                        }
                    ],
                    type: "checkbox",
                    label: "过磅场景",
                    attrs: {}
                }
            }
        };
    },
    methods: {
        handleRequest(data) {
            axios.post(this.opUrl, data)
                .then(function (response) {
                    $.operate.saveSuccess(response.data);
                })
                .catch(function (error) {
                    $.modal.alertError("系统错误");
                });
        }
    },
    created: function () {
        // `this` 指向 vm 实例
        init(this)
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