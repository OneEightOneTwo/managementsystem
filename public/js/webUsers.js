$(function () {
    // 商品管理 --商品列表-商品管理

    $('#products').click(() => {
        //点击和再点击，内容跟着显示或隐藏
        $('.sub_sidebarnav2').toggle();
    });

});
layui.use(['layer', 'table'], function () {
    var layer = layui.layer //弹层
        , table = layui.table //表格

    //第一个实例
    table.render({
        elem: '#demo',
        height: 400,
        url: '/users/users' //数据接口
        , page: true //开启分页
        , toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
        , cols: [
            [ //表头
                {
                    type: 'checkbox',
                    fixed: 'left',
                    width: 80
                }, {
                    field: 'id',
                    title: 'ID',
                    width: 80,
                    sort: true,
                    fixed: 'left'
                }, {
                    field: 'username',
                    title: '用户名',
                    width: 100
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
                    field: 'sex',
                    title: '性别',
                    width: 80,
                }, {
                    field: 'IP',
                    title: 'IP',
                    width: 100,
                    sort: true
                }, {
                    field: 'Time',
                    title: '加入时间',
                    width: 120,
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
                // 添加 显示弹窗，并且获取里面输入的内容
                layer.msg('添加');
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
                // console.log(data.id);
                //向服务端发送删除指令 传送要删除的那行的ID
                let id = data.id;
                $.ajax({
                    type: "POST",
                    url: "/delUser/delUser",
                    data: `id=${id}`
                }).done((data) => {
                    console.log(data);
                })

            });
        }
    });

  

});