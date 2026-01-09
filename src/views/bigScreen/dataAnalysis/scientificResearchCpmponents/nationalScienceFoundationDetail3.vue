<template>
    <div id="nationalScienceFoundationDetail3" style="background-color: black; width: 100%; height: 100vh">
        <div class="bg">
            <el-backtop></el-backtop>
            <div>
                <div class="nav">
                    <h2>国家自然科学基金-{{ name }}-{{ year }}&nbsp;</h2>
                </div>
                <div>
                    <div style="padding-left: 82%; padding-top: 12px;padding-bottom: 10px;">
                        <el-button type="primary" @click="returnLastPage">返回上级页面</el-button>
                    </div>
                    <div style="padding-left: 4%;padding-right: 4%;">
                        <el-table :data="data1" style="width: 98%" :header-cell-style="{ textAlign: 'center' }"
                            :cell-style="{ textAlign: 'center' }">
                            <el-table-column prop="projectNumber" label="项目批准号" width="100"></el-table-column>
                            <el-table-column prop="person" label="负责人" width="100"></el-table-column>
                            <el-table-column prop="unit" label="院系所" width="240"></el-table-column>
                            <el-table-column prop="name" label="项目名称"></el-table-column>
                            <el-table-column prop="applicationCode" label="申请代码" width="100"></el-table-column>
                            <el-table-column prop="type" label="项目类别" width="200"></el-table-column>
                            <el-table-column prop="funding" label="项目经费" width="60"></el-table-column>
                            <el-table-column prop="researchTime" label="研究周期" width="60"></el-table-column>
                            <el-table-column prop="initiationTime" label="立项时间" width="80"></el-table-column>
                            <!--
                            <el-table-column label="详情" width="120">
                                <template v-slot="scope">
                                    <el-button size="small" @click.prevent="showDetail(scope.row)">查看详情</el-button>
                                </template>
                            </el-table-column>
                            -->
                        </el-table>
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
import service from '@/utils/service';

export default {
    name: 'NationalScienceFoundationDetail3',
    data() {
        return {
            name: null,
            year: null,
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
            this.year = this.$route.query.year
            //this.name = this.name.replace(/[^\d]/g, "") //调整合适的前后端交互输入值
            console.log(this.name, this.year)
            await this.loadData()
        },
        // 加载数据
        async loadData() {
            let rr = null
            await service
                .get('scientificResearch/researchNationalNatureFunds/detail', { params: { name: this.name, year: this.year } })
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
        // 返回上一页面
        returnLastPage() {
            this.$router.push({ name: 'ScientificResearch-NationalScienceFoundationDetail' })
        }

    },
};
</script>

<style lang="scss" scoped>
#nationalScienceFoundationDetail3 {
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