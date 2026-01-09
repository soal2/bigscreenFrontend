<template>
    <div id="recent5YearsEntryAndResignDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-area" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">近五年人员变动情况</span>
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
    name: 'Recent5YearsEntryAndResignDistribution',
    data() {
        return {
            chart1: null,
            legendClass: ['专职教师入职', '管理人员入职', '劳务派遣入职', '离职'],
            xLabel: [],
            yData1_0: [], //专职
            yData1_1: [], // 管理
            yData1_2: [], // 劳务派遣
            yData2: [],  //离职
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
                .get('teachingStaff/recent5YearsEntryDistribution')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load recent5YearsEntryDistribution success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            this.xLabel = []
            this.yData1_0 = []
            this.yData1_1 = []
            this.yData1_2 = []
            if (rr) {
                for (let i = 0; i < rr[0].value.length; i++) {
                    this.xLabel.push(rr[0].value[i].name)
                    this.yData1_0.push(rr[0].value[i].value)
                    this.yData1_1.push(rr[1].value[i].value)
                    this.yData1_2.push(rr[2].value[i].value)
                }
            }
            await service
                .get('teachingStaff/recent5YearsResignDistribution')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load recent5YearsResignDistribution success")
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
                    top: '2',
                    textStyle: { //图例文字的样式
                        color: '#fff',
                        fontSize: 15,
                    },
                },
                xAxis: {
                    name: '年份',
                    type: 'category',
                    data: this.xLabel,
                    nameTextStyle: {
                        color: '#fff',
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 16,
                            color: '#fff',
                        }
                    },
                },
                yAxis: {
                    name: '人数',
                    nameTextStyle: {
                        color: '#fff',
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 16,
                            color: '#fff',
                        }
                    },
                },
                series: [
                    {
                        name: this.legendClass[0],
                        data: this.yData1_0,
                        type: 'line',
                        label: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                            fontSize: 14,
                        },
                        lineStyle: {
                            width: 3,
                        },
                    },
                    {
                        name: this.legendClass[1],
                        data: this.yData1_1,
                        type: 'line',
                        label: {
                            show: true,
                            position: 'bottom',
                            color: '#fff',
                            fontSize: 14,
                        },
                        lineStyle: {
                            width: 3,
                        },
                    },
                    {
                        name: this.legendClass[2],
                        data: this.yData1_2,
                        type: 'line',
                        label: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                            fontSize: 14,
                        },
                        lineStyle: {
                            width: 3,
                        },
                    },
                    {
                        name: this.legendClass[3],
                        data: this.yData2,
                        type: 'line',
                        label: {
                            show: true,
                            position: 'bottom',
                            color: '#fff',
                            fontSize: 14,
                        },
                        lineStyle: {
                            width: 3,
                        },
                    },


                ]
            };

            this.chart1.setOption(option1);
            this.chart1.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name + params.seriesName.slice(0, 4));
                    if (params.seriesName === "离职") {
                        _this.$router.push({ name: 'TeachingStaff-Recent5YearsResignDetail', query: { name: params.name, } })
                    }
                    else {
                        _this.$router.push({ name: 'TeachingStaff-Recent5YearsEntryDetail', query: { year: params.name, name: JSON.parse(JSON.stringify(params.seriesName.slice(0, 4))) } })
                    }

                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#recent5YearsEntryAndResignDistribution {
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
            padding-top: 28px;
            width: 100%;
            height: 410px; // Adjust based on the available space
            margin-bottom: 20px;
        }
    }
}
</style>