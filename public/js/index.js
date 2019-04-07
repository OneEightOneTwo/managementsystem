//1.获取订单数据和dashbord数据
//2.等待DOM加载完成
//3.将订单数据渲染到相应DOM


function renderStatice(data) {
    let html1 = `
        
    <div class="pannel-item ">
        <em>${data.dataList[0].visitorNum}</em>
        <span>访客人数</span>
    </div>
    <div class="pannel-item">
        <em>${data.dataList[0].visitortime}</em>
        <span>访客次数</span>
    </div>
    <div class="pannel-item">
        <em>${data.dataList[0].orderNum}</em>
        <span>下单人数</span>
    </div>
    <div class="pannel-item">
        <em>${data.dataList[0].orderConfirmNum}</em>
        <span>确认订单数</span>
    </div>
    <div class="pannel-item">
        <em>${data.dataList[0].payNum}</em>
        <span>支付人数</span>
    </div>
    <div class="pannel-item">
        <em>${data.dataList[0].dealNum}</em>
        <span>成交订单数</span>
    </div>

`;
    let html2 = `
     <div class="pannel-item" style="background:#F9B224">
        <p><span>￥</span><em>${data.dataList[0].orderPrice}</em></p>
        <span>下单金额</span>
    </div>
    <div class="pannel-item" style="background:#896ED7">
        <p><span>￥</span><em>${data.dataList[0].dealPrice}</em></p>
        <span>成交金额</span>
    </div>
    <div class="pannel-item" style="background:#33C6CD">
        <p><span>￥</span><em>${data.dataList[0].unitPrice}</em></p>
        <span>客单价</span>
    </div>

`
    $('.statistics .pannel-simple').html(html1);
    $('.statistics .pannel-bigger').html(html2);

}



function echartsRender(json) {
    //echarts
    var myChart = echarts.init(document.getElementById('charts-main'));

    var colors = ['#F9B224', '#d14a61', '#675bba'];

    option = {
        color: colors,

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['成交金额', '订单数']
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [{

            type: 'category',
            axisTick: {
                alignWithLabel: false
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            data: json.dataList[0].timeLine
        }],
        yAxis: [{
            name: '成交额',
            type: 'value',

        }, {
            name: '订单数',
            type: 'value'
        }],
        series: [{
                name: '成交金额',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                smooth: true,
                data: json.dataList[0].dealPrie
            },
            {
                name: '订单数',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 1,
                smooth: true,
                data: json.dataList[0].orders
            }
        ]
    };
    myChart.setOption(option);
    //
    window.addEventListener('resize', () => {
        myChart.resize();
    })
}


$(() => { //DomReady
    ;(async () => {
        let data = await $.ajax({type: 'GET', url: '/index/statistics'})
        renderStatice(data);
    })();
    //请求echarts数据
    ;(async () => {
        let data = await $.ajax({type: 'GET', url: '/index/echart'})
        echartsRender(data);
    })();


    //时间区间选择插件
    $("#date-picker").dateRangePicker({
        language: 'cn'
    });
})