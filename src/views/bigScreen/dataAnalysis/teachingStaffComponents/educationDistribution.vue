<template>
    <div id="educationDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-bar" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">在校教职工学历分布</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="chart1" class="dv-bar-chart"></div>
            </div>
            <div style="text-align: center;">
                <span style="color: #D7D8DA; font-size: 14px;"></span>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'EducationDistribution',
    data() {
        return {
            chart1: null,
            legendClass1: [ '博士', '硕士', '本科','其他',],
            yClass1: ['其他', '管理人员', '专职教师',],
            data1: [[13750, 3372, 1750], [13750, 3372, 1750], [13750, 3372, 1750], [13750, 3372, 1750]],
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
                .get('/teachingStaff/educationDistribution')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load educationDistribution success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            if (rr) {
                for (let i = 0; i < this.yClass1.length; i++) {
                    for (let j = 0; j < rr.length; j++) {
                        if (this.yClass1[i] === rr[j].name) {
                            for (let ii = 0; ii < this.legendClass1.length; ii++) {
                                for (let jj = 0; jj < rr[j].value.length; jj++) {
                                    if (this.legendClass1[ii] === rr[j].value[jj].name) {
                                        this.data1[ii][i] = rr[j].value[jj].value
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log(this.data1)
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
                    formatter: function (params) {
                        let obj = params.map((item, index) => {
                            if (item.value == undefined || item.value !== item.value) {
                                item.value = 0;
                            }
                            let total = 0
                            for (let i = 0; i < _this.legendClass1.length; i++) {
                                total += _this.data1[i][item.dataIndex]
                            }
                            let percent = (item.value / total * 100).toFixed(2)
                            // 小圆点显示
                            let dotColor = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
                            return dotColor + item.seriesName + ":" + item.value + '(' + percent + '%' + ')' + '</br>'
                        })
                        return obj.join('') // 去除','
                    },
                },
                grid: {
                    left: '3%',
                    bottom: '5%',
                    containLabel: true
                },
                legend: {
                    data: this.legendClass1,
                    top: '22', // 距离顶部的位置
                    textStyle: { //图例文字的样式
                        color: '#fff',
                        fontSize: 16,
                    },
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: this.yClass1,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    }
                },
                series: [
                    {
                        name: this.legendClass1[0],
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'top',
                            fontSize: 15,
                            formatter: (params) => {
                                let total = 0
                                for (let i = 0; i < this.legendClass1.length; i++) {
                                    total += this.data1[i][params.dataIndex]
                                }
                                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                                const percentage = (rawValue / total * 100).toFixed(1)
                                //return `${rawValue}(${percentage}%)`
                                return `${rawValue}`
                            },
                        },
                        data: this.data1[0],
                        itemStyle: {
                            color: '#9665BA',
                        },
                        barWidth:48,
                    },
                    {
                        name: this.legendClass1[1],
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'bottom',
                            fontSize: 15,
                            formatter: (params) => {
                                let total = 0
                                for (let i = 0; i < this.legendClass1.length; i++) {
                                    total += this.data1[i][params.dataIndex]
                                }
                                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                                const percentage = (rawValue / total * 100).toFixed(1)
                                //return `${rawValue}(${percentage}%)`
                                return `${rawValue}`
                            },
                        },
                        data: this.data1[1],
                        itemStyle: {
                            color: '#FAC858',
                        }
                    },
                    {
                        name: this.legendClass1[2],
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'top',
                            fontSize: 15,
                            formatter: (params) => {
                                let total = 0
                                for (let i = 0; i < this.legendClass1.length; i++) {
                                    total += this.data1[i][params.dataIndex]
                                }
                                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                                const percentage = (rawValue / total * 100).toFixed(1)
                                //return `${rawValue}(${percentage}%)`
                                return `${rawValue}`
                            },
                        },
                        data: this.data1[2],
                        itemStyle: {
                            color: '#67ACC7',
                        }
                    },
                    {
                        name: this.legendClass1[3],
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'inside',
                            fontSize: 15,
                            formatter: (params) => {
                                let total = 0
                                for (let i = 0; i < this.legendClass1.length; i++) {
                                    total += this.data1[i][params.dataIndex]
                                }
                                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                                const percentage = (rawValue / total * 100).toFixed(2)
                                //return `${rawValue}(${percentage}%)`
                                return `${rawValue}`
                            },
                        },
                        data: this.data1[3],
                        itemStyle: {
                            color: '#EE6666',
                        }
                    },
                ]
            }
            this.chart1.setOption(option1);
            this.chart1.on('click', function (params) {
                console.log(params.componentType)
                console.log(params.seriesName)
                console.log(params.name)
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name + params.seriesName);
                    _this.$router.push({ name: 'TeachingStaff-EducationDetail', query: { name1: params.name, name2: params.seriesName, } })
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#educationDistribution {
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
            width: 100%;
            height: 376px; // Adjust based on the available space
        }
    }
}
</style>