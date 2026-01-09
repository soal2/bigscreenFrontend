<template>
    <div id="studentSourceSituationDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-pie" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">研究生来源分布</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>

            <div class="body-box">
                <div ref="chart1" class="dv-bar-chart"></div>
                <!--
                <div ref="chart2" class="dv-bar-chart"></div>
                -->
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: "StudentSourceSituationDistribution",
    data() {
        return {
            chart1: null,
            data1: [
                { name: '应届本科', value: 1950 },
                { name: '其他人员', value: 358 },
                { name: '研究生', value: 458 },
                { name: '其他在职', value: 160 },
                { name: '城镇应届', value: 130 },
            ],
            data1Total: 0,
            chart2: null,
            data2: [
                { name: '应届本科', value: 1950 },
                { name: '其他人员', value: 358 },
                { name: '研究生', value: 458 },
                { name: '其他在职', value: 160 },
                { name: '城镇应届', value: 130 },
            ],
            data2Total: 0,
        };
    },
    mounted() {
        this.indexStart();
    },
    methods: {
        async indexStart() {
            await this.initLoadData()
            await this.initCharts()
        },
        // 加载数据
        async initLoadData() {
            await service
                .get('graduateStudent/studentSourceSituationDistribution')
                .then(
                    res => {
                        console.log(res.data)
                        this.data1 = res.data
                        console.log("load studentSourceSituationDistribution master success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            // 获取总人数
            this.data1Total = 0
            for (let i = 0; i < this.data1.length; i++) {
                this.data1Total += this.data1[i].value
            }
            /*
            await service
                .get('graduateStudent/studentSourceSituationDistribution/phd')
                .then(
                    res => {
                        console.log(res.data)
                        this.data2 = res.data
                        console.log("load studentSourceSituationDistribution phd success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            // 获取总人数
            this.data2Total = 0
            for (let i = 0; i < this.data2.length; i++) {
                this.data2Total += this.data2[i].value
            }
                */
        },
        // 初始化饼状图
        initCharts() {
            let _this = this
            this.chart1 = echarts.init(this.$refs.chart1);
            const option1 = {
                /*
                title: {
                    text: '硕\n士\n来\n源\n分\n布',
                    right: '4%',
                    top: '14%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                        lineHeight: 20,
                    },
                },
                */
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}人({d}%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 10,
                    padding: [10, 15],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                },
                series: [
                    {
                        name: '硕博来源分布',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['50%', '50%'],
                        data: this.data1,
                        startAngle: 20,
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        itemStyle: {
                            borderColor: '#2a2a2a',
                            borderWidth: 2,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 5,
                        },
                        emphasis: {
                            itemStyle: {
                                borderWidth: 4,
                                borderColor: '#ff0',
                                shadowBlur: 20,
                                shadowColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        },
                        label: {
                            fontSize: 18,
                            lineHeight: 20,
                            color: '#fff',
                            formatter: '{b}:\n{c}人({d}%)',
                            overflow: 'truncate',
                        },
                    },
                ],
            };
            this.chart1.setOption(option1);
            this.chart1.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name);
                    _this.$router.push({ name: 'GraduateStudent-StudentSourceSituationDetail', query: { name: params.name, } })
                }
            });
            /*
            this.chart2 = echarts.init(this.$refs.chart2);
            const option2 = {
                title: {
                    text: '博\n士\n来\n源\n分\n布',
                    right: '4%',
                    top: '12%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                        lineHeight: 20,
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}人({d}%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 10,
                    padding: [10, 15],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                },
                series: [
                    {
                        name: '博士来源分布',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['50%', '46%'],
                        data: this.data2,
                        startAngle: 20,
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        itemStyle: {
                            borderColor: '#2a2a2a',
                            borderWidth: 2,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 5,
                        },
                        emphasis: {
                            itemStyle: {
                                borderWidth: 4,
                                borderColor: '#ff0',
                                shadowBlur: 20,
                                shadowColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        },
                        label: {
                            fontSize: 16,
                            lineHeight: 16,
                            color: '#fff',
                            formatter: '{b}:\n{c}人({d}%)',
                            overflow: 'truncate',
                        },
                    },
                ],
            };
            this.chart2.setOption(option2);
            this.chart2.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name);
                    //_this.$router.push({ name: 'GraduateStudent-MasterGradeDetail', query: { name: params.name, } })
                }
            });
            */
        },
    },
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#studentSourceSituationDistribution {
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
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .dv-bar-chart {
            padding-top: 6px;
            width: 100%;
            height: 400px; // Adjust based on the available space
            margin-bottom: 10px;
        }
    }
}
</style>