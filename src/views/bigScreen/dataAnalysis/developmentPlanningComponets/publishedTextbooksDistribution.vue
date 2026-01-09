<template>
    <div id="publishedTextbooksDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-bar" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">出版教材质量</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="chart" class="dv-bar-chart"></div>
                <div style="width: 96%;padding-left: 2%;">
                    <div style="text-align: center;">
                        <span style="color: #D7D8DA; font-size: 10px;width: 90%;line-height: 1;">{{ description }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'PublishedTextbooksDistribution',
    data() {
        return {
            chart: null,
            legendClass: ['出版教材质量'],
            xLabel: [],
            yData: [],
            description:'',
        };
    },
    mounted() {
        this.indexStart();
    },
    methods: {
        // 异步初始化
        async indexStart() {
            await this.initLoadData()
            await this.initCharts()
        },
        // 加载数据
        async initLoadData() {
            this.xLabel = []
            this.yData = []
            let rr = null
            for (let i = 0; i < this.legendClass.length; i++) {
                await service
                    .get('developmentPlanning', { params: { name: this.legendClass[i] } })
                    .then(
                        res => {
                            console.log(res.data)
                            rr = res.data
                            console.log("load success" + this.legendClass[i])
                        }
                    )
                    .catch(failResponse => {
                        console.log("error", failResponse)
                    })
                if (rr) {
                    this.xLabel = rr.subject
                    this.yData.push(rr.value)
                    this.description=rr.indicatorDescription
                }
                else {
                    this.yData.push([])
                }
            }
        },
        // 初始化图
        initCharts() {
            let _this = this
            this.chart = echarts.init(this.$refs.chart);
            const option1 = {
                /*
                title: {
                    text: '省内Top5城市',
                    left: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                },
                */
                grid: {
                    top: '10%',
                    left: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                /*
                legend: {
                    data: this.legendClass,
                    top: '2',
                    textStyle: { //图例文字的样式
                        color: '#fff',
                        fontSize: 14,
                    },
                },
                */
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                xAxis: {
                    data: this.xLabel,
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                            //lineHeight: 16,
                        },
                        formatter: function (params) {
                            var str = "";                 // 最终拼接成的字符串
                            var paramsLen = params.length;// 获取每项文字的个数
                            var len = 1;                  // 每行能显示的字的个数（根据实际情况自己设置）
                            var rowNumber = Math.ceil(paramsLen / len); // 换行的话，需要显示几行，向上取整
                            if (paramsLen > len) {        //大于设定的len就换行，不大于就不变化
                                for (var i = 0; i < rowNumber; i++) {
                                    var temp = "";            // 表示每一次截取的字符串
                                    var start = i * len;      // 开始截取的位置
                                    var end = start + len;    // 结束截取的位置
                                    if (i == rowNumber - 1) { // 最后一次不换行
                                        temp = params.substring(start, paramsLen);
                                    } else {                  // 每一次拼接字符串并换行
                                        temp = params.substring(start, end) + "\n";
                                    }
                                    str += temp;              // 最终拼成的字符串
                                }
                            } else {                      // 给新的字符串赋值
                                str = params;
                            }
                            return str;                   //返回字符串
                        }
                    },
                },
                yAxis: {
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    },
                    interval: 1,
                },
                series: [
                    {
                        name: this.legendClass[0],
                        type: "bar",
                        barGap: 0,
                        data: this.yData[0],
                        itemStyle: {
                            color: '#9665BA'
                        },
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'top',
                            fontSize: 14,
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    },
                ]
            }
            this.chart.setOption(option1);
            this.chart.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name);
                    _this.$router.push({ name: 'DevelopmentPlanning-PublishedTextbooksDetail', query: { name: params.name, } })
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#publishedTextbooksDistribution {
    padding: 14px 16px;
    height: $box-height;
    width: $box-width;
    border-radius: 5px;

    .bg-color-black {
        height: $box-height - 30px;
        border-radius: 10px;
    }

    .dv-dec-3 {
        position: relative;
        width: 100px;
        height: 20px;
        top: -3px;
    }

    .text {
        color: #D7D8DA; //#c3cbde
        font-size: 19px;
        font-weight: bold;
    }

    .body-box {
        border-radius: 2px;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .dv-bar-chart {
            padding-top: 20px;
            width: 100%;
            height: 370px; // Adjust based on the available space
            margin-bottom: 2px;
        }
    }
}
</style>