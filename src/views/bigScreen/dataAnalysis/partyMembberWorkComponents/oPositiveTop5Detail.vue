<template>
    <div id="oPositiveTop5Detail">
        <el-backtop></el-backtop>
        <div class="bg">
            <div class="nav">
                <h2>2024年转正排名TOP5-{{ name }}&nbsp;</h2>
            </div>
            <div>
                <div style="padding-left: 82%; padding-top: 12px;padding-bottom: 10px;">
                <el-button type="primary" @click="returnBigScreen">返回看板</el-button>
                </div>
                <div style="padding-left: 4%;padding-right: 4%;">
                    <el-table :data="data1" style="width: 98%" :header-cell-style="{ textAlign: 'center' }"
                        :cell-style="{ textAlign: 'center' }">
                        <el-table-column prop="code" label="学/工号" style="width: 25%;"></el-table-column>
                        <el-table-column prop="name" label="姓名" style="width: 25%;"></el-table-column>
                        <el-table-column prop="party" label="所属党委" style="width: 25%;"></el-table-column>
                        <el-table-column prop="branch" label="所属支部" style="width: 25%;"></el-table-column>
                        <!-- <el-table-column prop="duePayMonth" label="应缴月份" style="width: 20%;"></el-table-column> -->
                        <!-- <el-table-column label="详情" style="width: 20%;">
                            <template v-slot="scope">
                                <el-button size="small" @click.prevent="showDetail(scope.row)">查看详情</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </div>
                <div style="text-align:center;padding: 5px;">
                    <el-pagination background 
                    :layout="layout" 
                    :total="total" 
                    :page-sizes="pageSizes" 
                    :page-size="pageSize" 
                    :currentPage="currentPage" 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" />
                </div>
            </div>
        </div>

        <!-- 弹出详情对话框 -->
        <el-dialog :visible.sync="dialogTableVisible" title="详情" width="70%" @close="dialogTableVisible = false">
            <div>
                <div style="padding-left: 3%;padding-right: 3%;"> 
                    <el-table :data="dialogData1" style="width: 98%" :header-cell-style="{ textAlign: 'center' }"
                        :cell-style="{ textAlign: 'center' }">
                        <el-table-column prop="code" label="工号" style="width: 25%;"></el-table-column>
                        <el-table-column prop="name" label="姓名" style="width: 25%;"></el-table-column>
                        <el-table-column prop="party" label="所属党委" style="width: 25%;"></el-table-column>
                        <el-table-column prop="branch" label="所属支部" style="width: 25%;"></el-table-column>
                    </el-table>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import service from '@/utils/service';

export default {
    name: 'oPositiveTop5Detail',
    data() {
        return {
            name: null,
            data1: [],

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
            this.name = this.$route.query.name
            // this.name = this.name.replace(/[^\d]/g, "") //调整合适的前后端交互输入值
            await this.loadData()
        },
        // 加载数据
        async loadData() {
            try{
                const response = await service.get("organization/positiveTop5Detail", {
                    params: {
                        page: this.currentPage - 1,
                        size: this.pageSize,
                        name: this.name
                    }
                });

                // 现在 response 数据已经加载完成
                const rr = response.data;
                // console.log(rr);
                this.data1 = rr.content;
    //             this.data1 = rr.content.map(item => {
    //     if (item.duePayMonth) {
    //         // 假设duePayMonth是日期字符串，格式为"2024-02-29T16:00:00.000+00:00"
    //         const date = new Date(item.duePayMonth);
    //         // 将日期格式化为"YYYY-MM-DD"格式
    //         item.duePayMonth = date.toISOString().split('T')[0];
    //     }
    //     return item;
    // });
                // this.data1.duePayMonth.split('T')[0];
                this.total = rr.totalElements;
            }catch(error){
                console.error('Error fetching bar chart data:', error);
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.loadData()
        },

        // 弹框显示详情数据 数据跟返回数据一样，部分数据可以放到弹框中显示
        showDetail(item) {
            console.log(item)
            this.dialogTableVisible = true
            this.dialogData1 = [item]
        },
        // 返回原始大屏
        returnBigScreen(){
            this.$router.push({ name: 'BigScreen-PartyMember'})
        }

    },
};
</script>

<style lang="scss" scoped>
#oPositiveTop5Detail {
    // padding: 6px;

    // .nav {
    //     overflow: hidden;
    //     background-color: #005eff;
    //     line-height: 30px;
    // }

    // .nav h2 {
    //     padding: 12px;
    //     float: left;
    //     margin-left: 5%;
    //     font-family: "Microsoft Yahei";
    //     font-size: 22px;
    //     display: block;
    //     color: white;
    //     text-align: center;
    //     text-decoration: none;
    //     overflow: hidden;
    // }
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
}
</style>