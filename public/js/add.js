$(function () {

    // 封装函数：鼠标点击时显示，再点击时隐藏 obj1 点击的节点。obj2需要显示的节点
    function show(obj1, obj2) {
        $(obj1).click(() => {
            // console.log($('#sidebarnav li'));

            //内容跟着出来
            $(obj2).eq($(this).index())
                .css('display', 'block')
                .siblings()
                .css('display', 'none');
        });
    }
    show('#page1', '.container-fluid1');
    show('.sub_sidebarnav1t', '.container-fluid2t');
    show('.sub_sidebarnav1b', '.container-fluid2b');
    show('.sub_sidebarnav2t', '.container-fluid3t');
    show('.sub_sidebarnav2b', '.container-fluid3b');
    show('#products', '.container-fluid3');
    show('#orders', '.container-fluid4');

    //左边侧栏下拉菜单 二级菜单
    $('#user').click(() => {
        //点击和再点击，内容跟着显示或隐藏
        $('.sub_sidebarnav1').toggle();
    });

    $('#products').click(() => {
        //点击和再点击，内容跟着显示或隐藏
        $('.sub_sidebarnav2').toggle();
    });

});