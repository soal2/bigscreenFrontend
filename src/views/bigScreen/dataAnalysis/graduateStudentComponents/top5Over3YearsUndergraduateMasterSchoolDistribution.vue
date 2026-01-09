<template>
    <div id="top5Over3YearsUndergraduateMasterSchoolDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-bar" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">超期未毕业硕士生数量Top5学院</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="chart1" class="dv-bar-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'Top5Over3YearsUndergraduateMasterSchoolDistribution',
    data() {
        return {
            chart1: null,
            xLabel: [],
            yData: [],
            yRateData: [],
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
            let rr = null
            await service
                .get('graduateStudent/top5Over3YearsUndergraduateMasterSchoolDistribution')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load top5Over3YearsUndergraduateMasterSchoolDistribution success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            if (rr) {
                for (let i = 0; i < 5; i++) {
                    this.xLabel.push(rr[i].name)
                    this.yData.push(rr[i].value)
                    this.yRateData.push(rr[i].rate)
                }
            }
            console.log(this.xLabel)
        },
        // 初始化图
        initCharts() {
            let _this = this
            this.chart1 = echarts.init(this.$refs.chart1);
            const option1 = {
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
                            fontSize: 15,
                            lineHeight: 15,
                        },
                        formatter: function (params) {
                            var str = "";                 // 最终拼接成的字符串
                            var paramsLen = params.length;// 获取每项文字的个数
                            var len = 4;                  // 每行能显示的字的个数（根据实际情况自己设置）
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
                },
                series: [{
                    name: "超期未毕业硕士生数量Top5学院",
                    type: "bar",
                    data: this.yData,
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear', // 渐变类型
                                x: 0, y: 0, // 渐变起始点
                                x2: 0, y2: 1, // 渐变结束点
                                colorStops: [ // 颜色停靠点
                                    { offset: 1, color: 'rgba(0, 0, 0, 0)' }, // 偏移量0表示渐变起点
                                    { offset: 0, color: '#9665BA' } // 偏移量1表示渐变终点
                                ],
                                global: false // 默认为false，是否应用为全局渐变色，true表示应用到所有柱子上
                            }
                        }
                    },
                    label: {
                        show: true,
                        color: '#fff',
                        position: 'top',
                        fontSize: 16,
                        formatter: (params) => {
                            const rawValue = this.yData[params.dataIndex]
                            const percentage = this.yRateData[params.dataIndex].toFixed(2)
                            return `${rawValue}人\n${percentage}%`
                        },
                    },
                }]
            }
            this.chart1.setOption(option1);
            this.chart1.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name);
                    _this.$router.push({ name: 'GraduateStudent-Top5Over3YearsUndergraduateMasterSchoolDetail', query: { name: params.name, } })
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#top5Over3YearsUndergraduateMasterSchoolDistribution {
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
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .dv-bar-chart {
            padding-top: 20px;
            width: 100%;
            height: 400px; // Adjust based on the available space
            margin-bottom: 20px;
        }
    }
}
</style>