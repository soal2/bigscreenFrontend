<template>
    <div id="researchProjectFundingDetail" style="background-color: black; width: 100%; height: 100vh">
        <div class="bg">
            <el-backtop></el-backtop>
            <div>
                <div class="nav">
                    <!--
                    <h2>科研经费：{{ name }}&nbsp;数据</h2>
                    -->
                    <h2>科研经费</h2>
                </div>
                <div>
                    <div style="padding-left: 85%; padding-top: 12px;padding-bottom: 10px;">
                        <el-button type="primary" @click="returnBigScreen">返回看板</el-button>
                    </div>
                    <div style="padding-left: 2%;padding-right: 2%;">
                        <div ref="chart" class="detail-chart-set"></div>
                    </div>
                    <!--
                    <div style="text-align:center;padding: 5px;">
                        <el-pagination background :layout="layout" :total="total" :page-sizes="pageSizes"
                            :page-size="pageSize" :currentPage="currentPage" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />
                    </div>
                    -->
                </div>
            </div>

            <!-- 弹出详情对话框 -->
            <el-dialog :visible.sync="dialogTableVisible" title="数据详情" width="70%" @close="dialogTableVisible = false">
                <div>
                    <div style="padding-left: 3%;padding-right: 3%;">
                        <el-table :data="dialogData1" style="width: 98%" :header-cell-style="{ textAlign: 'center' }"
                            :cell-style="{ textAlign: 'center' }">
                            <el-table-column prop="code" label="工号" width="120"></el-table-column>
                            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                            <el-table-column prop="birthday" label="生日"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'ResearchProjectFundingDetail',
    data() {
        return {
            name: null,
            legendClass: ['2021', '2022', '2023', '2024'],
            xLabel: [],
            yData: [],

            total: 0,
            currentPage: 1,
            pageSizes: [10, 20, 50],
            pageSize: 10,
            layout: "total, sizes, prev, pager, next, jumper",

            dialogTableVisible: false,
            dialogData1: null,
        };
    },
    mounted() {
        this.indexStart();
    },
    methods: {
        // 异步初始化
        async indexStart() {
            //this.name = this.$route.query.name
            //this.name = this.name.replace(/[^\d]/g, "") //调整合适的前后端交互输入值
            console.log(this.name)
            await this.initLoadData()
            await this.initCharts()
        },
        // 加载数据
        async initLoadData() {
            this.legendClass = ['2021', '2022', '2023', '2024']
            this.xLabel = []
            this.yData = []
            let rr = null
            await service
                .get('scientificResearch/researchFunds')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            if (rr) {
                this.xLabel = rr.subject
                this.yData = rr.yearValueList
                this.legendClass = rr.year
            }
            /*
            // 总数中去除立项数目
            for(let i=0;i<this.yData[0].length;i++){
                this.yData[1][i]-=this.yData[0][i]
            }
            */

        },
        /*
        async loadData() {
            let rr = null
            await service
                .get('scientificResearch/researchNationalNatureFunds')
                .then(
                    res => {
                        console.log(res.data)
                        rr = res.data
                        console.log("load success")
                    }
                )
                .catch(failResponse => {
                    console.log("error", failResponse)
                })
            // 根据返回值处理保存数据
            if (rr) {
                this.data1 = rr
                //this.total = rr.totalElements
            }
        },
        */
        handleSizeChange(val) {
            this.pageSize = val
            this.loadData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.loadData()
        },

        // 初始化图
        initCharts() {
            let _this = this
            this.chart = echarts.init(this.$refs.chart);
            const option1 = {
                grid: {
                    top: '8%',
                    left: '3%',
                    right: '2%',
                    bottom: '2%',
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
                        fontSize: 18,
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
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 13,
                            lineHeight: 16,
                            color: '#fff',
                        },
                        interval: 0,
                        /*
                        formatter: function (value, index) { // 根据index或其他条件自定义标签内容或位置调整
                            if (index % 2 === 0) {
                                return value;
                            } else {
                                return '\n' + value;
                            }
                        }*/
                        //rotate: 50,
                        
                        formatter: function (params) {
                            var str = "";                 // 最终拼接成的字符串
                            var paramsLen = params.length;// 获取每项文字的个数
                            var len = 3;                  // 每行能显示的字的个数（根据实际情况自己设置）
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
                    name: '科研经费（亿元）',
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 16,
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
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'inside',
                            fontSize: 12,
                            /*
                            formatter: function (params) { // 小于0.5时不显示
                                if (params.value < 0.5) {
                                    return ''
                                } else {
                                    return params.value
                                }
                            },
                            */
                        },
                        itemStyle: {

                        },
                    },
                    {
                        name: this.legendClass[1],
                        type: 'bar',
                        stack: 'total',
                        data: this.yData[1],
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'inside',
                            fontSize: 12,
                            /*
                            formatter: function (params) { // 小于0.5时不显示
                                if (params.value < 0.5) {
                                    return ''
                                } else {
                                    return params.value
                                }
                            },
                            */
                        },
                        itemStyle: {

                        },
                    },
                    {
                        name: this.legendClass[2],
                        type: 'bar',
                        stack: 'total',
                        data: this.yData[2],
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'inside',
                            fontSize: 12,
                            /*
                            formatter: function (params) { // 小于0.5时不显示
                                if (params.value < 0.5) {
                                    return ''
                                } else {
                                    return params.value
                                }
                            },
                            */
                        },
                        itemStyle: {

                        },
                    },
                    {
                        name: this.legendClass[3],
                        type: 'bar',
                        stack: 'total',
                        data: this.yData[3],
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'inside',
                            fontSize: 12,
                            /*
                            formatter: function (params) { // 小于0.5时不显示
                                if (params.value < 0.5) {
                                    return ''
                                } else {
                                    return params.value
                                }
                            },
                            */
                        },
                        itemStyle: {

                        },
                    },
                ]
            }
            this.chart.setOption(option1);
            /*
            this.chart.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name);
                    _this.$router.push({ name: 'ScientificResearch-NationalScienceFoundationDetail', query: { name: params.name, } })
                }
            });
            */
        },

        // 弹框显示详情数据 数据跟返回数据一样，部分数据可以放到弹框中显示
        showDetail(item) {
            console.log(item)
            this.dialogTableVisible = true
            this.dialogData1 = [item]
        },
        // 返回原始大屏
        returnBigScreen() {
            this.$router.push({ name: 'BigScreen-ScientificResearch' })
        }

    },
};
</script>

<style lang="scss" scoped>
#researchProjectFundingDetail {
    .nav {
        overflow: hidden;
        background-color: #005eff;
        line-height: 30px;
    }

    .nav h2 {
        padding: 12px;
        float: left;
        margin-left: 5%;
        font-family: "Microsoft Yahei";
        font-size: 22px;
        display: block;
        color: white;
        text-align: center;
        text-decoration: none;
        overflow: hidden;
    }

    .bg {
        width: 100%;
        min-height: 100vh;
        padding: 16px 16px 0 16px;
        background-image: url("~@/assets/pageBg.png");
        background-size: cover;
        background-position: center center;
        background-repeat: repeat;
    }

    // 表格背景颜色
    .el-table {
        background-color: transparent;
    }

    // 表格内背景颜色
    ::v-deep .el-table th,
    ::v-deep .el-table tr,
    ::v-deep .el-table td {
        background-color: transparent;
        color: #ffffff;
    }

    .detail-chart-set {
        padding-top: 18px;
        width: 100%;
        height: 660px; // Adjust based on the available space
        margin-bottom: 20px;
    }
}
</style>