$(() => {

    function renderOrderList(json) {
        let listArr = json.dataset;
        let html = listArr.map(item => {
            return `
            <tr>
                <td>${item.status}</td>
                <td>${item.orderID}</td>
                <td>${item.data}</td>
                <td>${item.consignee}</td>
                <td>${item.phone}</td>
                <td>${item.payStyle}</td>
                <td>${item.logInfo}</td>
                <td>${item.orderPrice}</td>
            </tr>
            `
        }).join('');

        $('.table tbody').html(html)
    }

    //获取后台数据 在渲染
    $.ajax({
        type: 'get',
        url: '/order/list'
    }).done((data) => {
        renderOrderList(data);
    })

    //上传
    $('#btn').click(() => {
        let formdata = new FormData();
        let fileList = document.querySelector('#file').files;
        if (fileList.length > 0) {
            formdata.set('excel', fileList[0]);
            $.ajax({
                type: 'post',
                url: '/order/upload',
                data: formdata,
                //使用jq的ajax需要加上下面两条
                processData: false, 
                contentType: false,
            }).done((data) => {
                console.log(data);
                location.reload();
            })

        } else {
            alert('请选择文件')
        }
    })

    //下载
    $('.download').click(() => {
       window.open('/order/download');
    })
})