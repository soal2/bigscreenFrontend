<template>
    <div id="nationalScienceFoundationDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-pie" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">国家自然科学基金</span>
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
    name: 'NationalScienceFoundationDistribution',
    data() {
        return {
            chart: null,
            legendClass: ['国家自然科学基金（项）',],
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
            /*
            // 总数中去除立项数目
            for(let i=0;i<this.yData[0].length;i++){
                this.yData[1][i]-=this.yData[0][i]
            }
            */

        },
        // 初始化图
        initCharts() {
            let _this = this
            this.chart = echarts.init(this.$refs.chart);
            const option1 = {
                grid: {
                    top: '16%',
                    left: '6%',
                    right: '10%',
                    bottom: '5%',
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
                    selectedMode: false,
                    textStyle: { //图例文字的样式
                        color: '#fff',
                        fontSize: 15, // 18
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
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
                    //name: '篇',
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
                        type: 'bar',
                        stack: 'total',
                        data: this.yData[0],
                        itemStyle: {
                            color: '#E3B750'
                        },
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'top',
                            fontSize: 14,
                        },
                    },
                ]
            }
            this.chart.setOption(option1);
            this.chart.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name);
                    _this.$router.push({ name: 'ScientificResearch-NationalScienceFoundationDetail', query: { name: params.name, } })
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 480px;
$box-width: 100%;

#nationalScienceFoundationDistribution {
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
            padding-top: 18px;
            width: 100%;
            height: 420px; // Adjust based on the available space
            margin-bottom: 20px;
        }
    }
}
</style>