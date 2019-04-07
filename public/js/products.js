layui.use('table', function () {
    var table = layui.table;
    //第一个实例
    table.render({
        elem: '#demo',
        height: 355,
        url: 'http://localhost:3000/product/product' //数据接口
            ,
        page: true //开启分页
            ,
        sort: true,
        cols: [
            [ //表头
                {
                    field: 'id',
                    title: 'ID',
                    width: 80,
                    sort: true,
                    fixed: 'left'
                }, {
                    field: 'goodsname',
                    title: '商品名',
                    width: 130
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
                    toolbar:'#barDemo'
                }
            ]
        ]
    });

});