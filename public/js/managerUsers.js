layui.use(['layer', 'table'], function () {
    var layer = layui.layer //弹层
        , table = layui.table //表格
    //第一个实例
    table.render({
        elem: '#demo',
        height: 400,
        url: '/manager/manager' //数据接口
        , page: true //开启分页
        , toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
        , cols: [
            [ //表头
                {
                    type: 'checkbox',
                    fixed: 'left',
                    width: 80
                }, {
                    field: 'ID',
                    title: 'ID',
                    width: 80,
                    sort: true,
                    fixed: 'left'
                }, {
                    field: 'username',
                    title: '用户名',
                    width: 120
                }, {
                    field: 'phone',
                    title: '手机',
                    width: 150,
                    sort: true
                }, {
                    field: 'email',
                    title: '邮箱',
                    width: 150,
                }, {
                    field: 'role',
                    title: '角色',
                    width: 120,
                }, {
                    field: 'Time',
                    title: '加入时间',
                    width: 120,
                    sort: true
                }, {
                    field: 'status',
                    title: '状态',
                    width: 100,
                    sort: true
                }, {
                    field: 'handle',
                    title: '操作',
                    width: 120,
                    toolbar: '#barDemo'
                }
            ]
        ]
    });
    //监听头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id)
            , data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'add':
                // layer.msg('添加');
                // 添加 显示弹窗，并且获取里面输入的内容
                $('.addPage').css('display', 'block');
                break;
            case 'update':
                if (data.length === 0) {
                    layer.msg('请选择一行');
                } else if (data.length > 1) {
                    layer.msg('只能同时编辑一个');
                } else {
                    layer.alert('编辑 [id]：' + checkStatus.data[0].id);
                }
                break;
            case 'delete':
                if (data.length === 0) {
                    layer.msg('请选择一行');
                } else {
                    layer.msg('删除');
                }
                break;
        };
    });
    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'edit') {
            layer.msg('编辑操作');

        } else if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
                let ID = data.ID;
                console.log(ID);
                $.ajax({
                    type: "POST",
                    url: "/delManager/delManager",
                    data: `ID=${ID}`
                }).done((data) => {
                    console.log(data);
                })
            });
        }
    });

    // 点击 确认 按钮时，获取里面输入的全部内容，并把它们传给后端
    $('#btn').on('click', () => {
        // 获取输入的内容
        let ID = $('#id').val() * 1;
        // console.log(id);
        let username = $('#username').val();
        let phone = $('#phone').val();
        let email = $('#email').val();
        let role = $('#role').val();
        let status = $('#status').val();
        let Time = $('#time').val() * 1;
        $.ajax({
            type: "POST",
            url: "/addManager/addManager",
            data: {
                'ID': `${ID}`,
                'username': `${username}`,
                'phone': `${phone}`,
                'email': `${email}`,
                'role': `${role}`,
                'status': `${status}`,
                ' Time': `${Time}`
            }
        }).done((data) => {
            console.log(data);
        })


    });
    // 点击 清除 按钮时，清除里面输入的全部内容，并且关闭该窗口
    $('#delBtn').on('click', () => {
        console.log($('#delBtn'));
        // 清空内容
        // $('#id').val() = '';
        // $('#username').val() = '';
        // $('#phone').val() = '';
        // $('#email').val() = '';
        // $('#role').val() = '';
        // $('#status').val() = '';
        // $('#time').val() = '';
        $('.addPage').css('display', 'none');
    });

});