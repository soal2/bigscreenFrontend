<template>
    <div id="recent5YearsEnrollDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-area" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">近五年硕博招生人数</span>
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
    name: 'Recent5YearsEnrollDistribution',
    data() {
        return {
            chart1: null,
            legendClass: ['硕士', '博士'],
            xLabel: [],
            yData1: [], //硕士
            yData2: [],  //博士
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
                .get('graduateStudent/recent5YearsEnrollNumDistribution/master')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load recent5YearsEnrollNumDistribution master success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            if (rr) {
                for (let i = 0; i < rr.length; i++) {
                    this.xLabel.push(rr[i].name)
                    this.yData1.push(rr[i].value)
                }
            }
            await service
                .get('graduateStudent/recent5YearsEnrollNumDistribution/phd')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load recent5YearsEnrollNumDistribution phd success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            if (rr) {
                for (let i = 0; i < rr.length; i++) {
                    this.yData2.push(rr[i].value)
                }
            }
            console.log(this.yData2)
        },
        // 初始化图
        initCharts() {
            let _this = this
            this.chart1 = echarts.init(this.$refs.chart1);
            const option1 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line' // 使用 line 类型的 axisPointer 辅助
                    }
                },
                legend: {
                    data: this.legendClass,
                    top: '14',
                    textStyle: { //图例文字的样式
                        color: '#fff',
                        fontSize: 16,
                    },
                },
                xAxis: {
                    name: '年份',
                    type: 'category',
                    data: this.xLabel,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    },
                },
                yAxis: {
                    name: '人数',
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    },
                },
                series: [
                    {
                        name: this.legendClass[0],
                        data: this.yData1,
                        type: 'line',
                        label: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                            fontSize: 16,
                        },
                        lineStyle: {
                            width: 3,
                            color: '#EE6666',
                        },
                        itemStyle: {//设置端点颜色
                            normal: {
                                color: '#EE6666'
                            }
                        }
                    },
                    {
                        name: this.legendClass[1],
                        data: this.yData2,
                        type: 'line',
                        label: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                            fontSize: 16,
                        },
                        lineStyle: {
                            width: 3,
                            color: '#FFA054',
                        },
                        itemStyle: {//设置端点颜色
                            normal: {
                                color: '#FFA054'
                            }
                        }
                    },

                ]
            };

            this.chart1.setOption(option1);
            this.chart1.on('click', function (params) {
                console.log(params.componentType)
                console.log(params.seriesName)
                console.log(params.name)
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name + params.seriesName);
                    _this.$router.push({ name: 'GraduateStudent-Recent5YearsEnrollDetail', query: { year: params.name, name: params.seriesName, } })
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#recent5YearsEnrollDistribution {
    padding: 16px 16px;
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
            padding-top: 28px;
            width: 100%;
            height: 380px; // Adjust based on the available space
            margin-bottom: 20px;
        }
    }
}
</style>