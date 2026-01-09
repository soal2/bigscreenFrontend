<template>
    <div id="platformBaseParticipatingNationalPlatformDetail3" style="background-color: black; width: 100%; height: 100vh">
        <div class="bg">
            <el-backtop></el-backtop>
            <div>
                <div class="nav">
                    <h2>科研平台和哲社基地情况-联合共建国家级平台-{{ year }}&nbsp;</h2>
                </div>
                <div>
                    <div style="padding-left: 82%; padding-top: 12px;padding-bottom: 10px;">
                        <el-button type="primary" @click="returnLastPage">返回看板</el-button>
                    </div>
                    <div style="padding-left: 4%;padding-right: 4%;">
                        <el-table :data="data1" style="width: 98%" :header-cell-style="{ textAlign: 'center' }"
                            :cell-style="{ textAlign: 'center' }">
                            <el-table-column prop="department" label="主管部门" width="120"></el-table-column>
                            <el-table-column prop="type" label="类型" width="60"></el-table-column>
                            <el-table-column prop="name" label="实验室名称"></el-table-column>
                            <el-table-column prop="time" label="立项日期" width="140"></el-table-column>
                            <el-table-column prop="unit" label="所属学院" width="120"></el-table-column>
                            <el-table-column prop="director" label="实验室主任" width="100"></el-table-column>
                            <el-table-column prop="leadUnit" label="牵头单位" width="150"></el-table-column>
                            <el-table-column prop="coConstructionUnit" label="共建单位" width="200"></el-table-column>
                            <el-table-column prop="cooperatingUnit" label="合作单位" width="100"></el-table-column>
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
    name: 'PlatformBaseParticipatingNationalPlatformDetail3',
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
            //this.name = this.$route.query.name
            this.year = this.$route.query.year
            //this.name = this.name.replace(/[^\d]/g, "") //调整合适的前后端交互输入值
            console.log(this.name, this.year)
            await this.loadData()
        },
        // 加载数据
        async loadData() {
            let rr = null
            await service
                .get('scientificResearch/researchParticipatingNationalPlatforms/detail', { params: { year: this.year } })
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
        // 返回看板
        returnLastPage() {
            this.$router.push({ name: 'BigScreen-ScientificResearch' })
        }

    },
};
</script>

<style lang="scss" scoped>
#platformBaseParticipatingNationalPlatformDetail3 {
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