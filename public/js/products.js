layui.use('table', function () {
    var table = layui.table;
    //第一个实例
    table.render({
        elem: '#demo',
        //  toolbar: '#toolbarDemo',
        height: 351,
        url: '/product/product' //数据接口
            ,
        page: true, //开启分页
        

        cols: [
            [ //表头
                {
                    checkbox: true,
                    fixed: true,
                    width: 100
                },
                {
                    field: 'id',
                    title: 'ID',
                    width: 100,
                    sort: true,
                    fixed: 'left'
                }, {
                    field: 'goodsname',
                    title: '商品名',
                    width: 140
                }, {
                    field: 'goodstype',
                    title: '商品类型',
                    width: 120,
                    sort: true
                }, {
                    field: 'price',
                    title: '现价',
                    width: 130
                }, {
                    field: 'reprice',
                    title: '原价',
                    width: 100
                }, {
                    field: 'repertory',
                    title: '库存',
                    width: 120,
                    sort: true
                }, {
                    field: 'state',
                    title: '状态',
                    width: 120,
                    sort: true
                }, {
                    field: 'addtime',
                    title: '添加时间',
                    width: 130
                }, {
                    field: 'handle',
                    title: '操作',
                    width: 500,
                    toolbar: '#toolbarDemo'

                }
            ]
        ]
    });

    table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        var id = obj.data.id;
        console.log(obj);
        if (layEvent === 'delete') { //删除
            layer.confirm('真的删除行么', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                $.ajax({
                    type: 'post',
                    url: '/product/remove/',
                    data: `id=${id}`
                }).done((data) => {
                    console.log(data);
                })
                //删除当前行
                //向服务端发送删除指令
            });
        }
    });




    //监听行双击事件
    table.on('rowDouble(test)', function (obj) {
        //obj 同上
    });

});