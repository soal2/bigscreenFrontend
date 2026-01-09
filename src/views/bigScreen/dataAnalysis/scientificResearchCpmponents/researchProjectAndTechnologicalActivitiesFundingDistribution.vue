<template>
    <div id="researchProjectAndTechnologicalActivitiesFundingDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-line" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">科研项目科技活动经费</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="chart" class="dv-bar-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'ResearchProjectAndTechnologicalActivitiesFundingDistribution',
    data() {
        return {
            chart: null,
            legendClass: ['科研项目经费（亿元）', '科技活动经费（亿元）',],
            xLabel: [],
            yData: [],
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
                    .get('scientificResearch', { params: { name: this.legendClass[i] } })
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
                    this.xLabel = rr.year
                    this.yData.push(rr.value)
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
                grid: {
                    top: '20%',
                    left: '4%',
                    bottom: '3%',
                    containLabel: true
                },
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
                    //name: '年份',
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
                    //name: '亿元',
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
                        data: this.yData[0],
                        type: 'line',
                        label: {
                            show: true,
                            position: 'bottom',
                            color: '#fff',
                            fontSize: 14,
                        },
                        lineStyle: {
                            width: 3,
                            color: '#536FC4',
                        },
                        itemStyle: {//设置端点颜色
                            normal: {
                                color: '#536FC4'
                            }
                        }
                    },
                    {
                        name: this.legendClass[1],
                        data: this.yData[1],
                        type: 'line',
                        label: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                            fontSize: 14,
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
                ]
            }
            this.chart.setOption(option1);
            this.chart.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.seriesName + params.name);
                    if(params.seriesName==='科研项目经费（亿元）'){
                        _this.$router.push({ name: 'ScientificResearch-ResearchProjectFundingDetail', query: { name: params.name, } })
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

#researchProjectAndTechnologicalActivitiesFundingDistribution {
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
            padding-top: 28px;
            width: 100%;
            height: 410px; // Adjust based on the available space
            margin-bottom: 20px;
        }
    }
}
</style>