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
            formData: {},
            formDesc: {
                code: {
                    type: 'input',
                    label: '交易厅编号',
                    attrs: {
                        maxlength: 10,
                        showWordLimit: true
                    },
                    rules: [
                        {
                            required: true, message: '请输入编号', trigger: 'blur'
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
                    label: '交易厅名称',
                    attrs: {
                        maxlength: 20,
                        showWordLimit: true
                    },
                    rules: [{required: true, message: '请输入交易厅名称', trigger: 'blur'}]
                },
                tradeType: {
                    type: 'select',
                    label: '关联交易类型',
                    required: true,
                    options: loadProvider({provider: 'tradeTypeProvider'})
                },
            }
        };
    },
    methods: {
        handleRequest(data) {

            axios.post(rootPath + "/tradeRoomController/add.action", data)
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