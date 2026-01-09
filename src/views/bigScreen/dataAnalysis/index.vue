<template>
    <div>
        <!--
        <div class="nav">
            <h2>南理数据瞭望台</h2>
        </div>
        -->
        <el-dialog title="条款声明" :visible.sync="clauseCheck" width="60%">
            <div style="padding: 4px;">
                <span>使用数据南理需要同意《南京理工大学智慧理工服务门户用户隐私政策》，点击下方下载链接了解隐私政策详情。</span>
                </br>
                <el-button type="text" @click="downloadFile()">南京理工大学智慧理工服务门户用户隐私政策</el-button>
                <div style="height: 20px;">
                    <div style="position: absolute;bottom: 10px;left: 50%;transform: translate(-50%);">
                        <el-button type="primary" size="small" @click="clauseAgree()">同意上述条款</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

        <div>
            <div v-if="state === 1 && clause === true" id="index">
                <div style="padding: 2%;">
                    <div style="text-align: center;">
                        <el-row>
                            <el-col :span="8">
                                <el-button class="el-icon-devops-PartyMember" @click="toBigScreen('PartyMember')">
                                </el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="el-icon-devops-OrganizationalWork"
                                    @click="toBigScreen('OrganizationalWork')">
                                </el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="el-icon-devops-TeachingStaff" @click="toBigScreen('TeachingStaff')">
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row style="padding-top: 2%;">
                            <el-col :span="8">
                                <el-button class="el-icon-devops-GraduateStudent1"
                                    @click="toBigScreen('GraduateStudent1')">
                                </el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="el-icon-devops-GraduateStudent2"
                                    @click="toBigScreen('GraduateStudent2')">
                                </el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="el-icon-devops-ScientificResearch"
                                    @click="toBigScreen('ScientificResearch')">
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row style="padding-top: 2%;">
                            <el-col :span="8">
                                <el-button class="el-icon-devops-DevelopmentPlanning"
                                    @click="toBigScreen('DevelopmentPlanning')">
                                </el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="el-icon-devops-UpdateData" @click="toBigScreen('UpdateData')">
                                </el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="el-icon-devops-MoreBigScreen">
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div v-else-if="state === 0" style="padding: 2%;">
                <h4 style="color:red;">请登录</h4>
            </div>
            <div v-else-if="state === 1 && clause === false" style="padding: 2%;">
                <el-button type="text" @click="toClauseAgree()">条款声明</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import service from '@/utils/service';

export default {
    name: 'Index',
    components: {},
    data() {
        return {
            state: 0, // 登录信息核验
            clause: false, // 使用条款确认

            clauseCheck: false, // 确认条款弹框

        }
    },

    mounted: async function () {
        document.documentElement.scrollTop = 0;
        await this.indexStart();
    },

    methods: {
        // 错误处理
        handleError(error) {
            if (error.response) {
                // error.response包含了服务器响应的详细信息
                const statusCode = error.response.status;
                const errorMessage = error.response.data.msg;
                // 错误提示
                this.$message.error(`${statusCode}: ${errorMessage}`);
            } else {
                // 其他错误（例如网络问题）
                this.$message.error(`${error}`);
            }
        },
        async indexStart() {
            document.title = '数据南理瞭望台'
            service
                .get('index/login')
                .then(res => {
                    /*
                    console.log(res);
                    if (res.data.code === 202) {
                        //后端的202代表没有认证，前端收到202后跳转到cas认证
                        //debugger
                        console.log("sss");
                        //window.location.href = "https://ids.njust.edu.cn/authserver/login?service=http%3A%2F%2F192.10.86.137%3A8080%2Flogin%2Findex"
                    }
                    else if (res.data.code === 200) {
                        //200认证成功，继续执行
                        this.state = 1
                    }
                    console.log(res);
                    */
                    console.log(res.data)
                    if (res.data.value === 1) {
                        this.state = 1
                        this.clause = true
                        //document.getElementById('index').style.display = 'block';
                    }
                    else if(res.data.value === 2){
                        this.state = 1
                        this.clauseCheck = true
                        document.getElementById('index').style.display = 'block';
                    }
                    console.log("login success")
                })

                .catch(error => {
                    //this.handleError(error)
                });
        },
        downloadFile() {
            service
                .get('pdf/download', {
                    responseType: 'blob',
                }
                ).then((res) => {
                    console.log(res)
                    let blob = new Blob([res.data])
                    let url = window.URL.createObjectURL(blob)
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    // 文件名一般是在res.headers里：content-disposition;fileName=xxxxxxxxxx.csv，这个让后端统一规定文件名怎么放前端就怎么取就行
                    let str = typeof res.headers['content-disposition'] === 'undefined'
                        ? res.headers['Content-Disposition'].split(';')[1]
                        : res.headers['content-disposition'].split(';')[1]

                    let filename_ = typeof str.split('fileName=')[1] === 'undefined'
                        ? str.split('filename=')[1]
                        : str.split('fileName=')[1]
                    let filename = filename_.replace(/["]/g, "")
                    console.log(filename)
                    link.setAttribute('download', decodeURIComponent(filename)) // 解码，这里也可以自定义下载的文件名字，如link.setAttribute('download', 'xxxxxdownload.xls')
                    document.body.appendChild(link)
                    link.click() //用新窗口打开window.open(link.click())，但是下载完成后不会先get请求那样自动关闭窗口
                    window.URL.revokeObjectURL(url)
                }).catch(error => {
                    this.handleError(error)
                })
        },
        toClauseAgree() {
            this.clauseCheck = true
        },
        clauseAgree() {
            service
                .get('index/hasReadPrivacy')
                .then(res => {
                    console.log(res.data)
                    this.clause = true
                    this.clauseCheck = false
                    document.getElementById('index').style.display = 'none';
                    console.log("hasReadPrivacy success")
                })
                .catch(error => {
                    //this.handleError(error)
                });
        },
        toBigScreen(index) {
            switch (index) {
                case 'PartyMember':
                    const routeDataPartyMember = this.$router.resolve({ name: 'BigScreen-PartyMember' })
                    window.open(routeDataPartyMember.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-PartyMember' })
                    break;
                case 'OrganizationalWork':
                    const routeDataOrganizationalWork = this.$router.resolve({ name: 'BigScreen-OrganizationalWork' })
                    window.open(routeDataOrganizationalWork.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-OrganizationalWork' })
                    break;
                case 'TeachingStaff':
                    const routeDataTeachingStaff = this.$router.resolve({ name: 'BigScreen-TeachingStaff' })
                    window.open(routeDataTeachingStaff.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-TeachingStaff' })
                    break;
                case 'GraduateStudent1':
                    const routeDataGraduateStudent1 = this.$router.resolve({ name: 'BigScreen-GraduateStudent1' })
                    window.open(routeDataGraduateStudent1.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-GraduateStudent1' })
                    break;
                case 'GraduateStudent2':
                    const routeDataGraduateStudent2 = this.$router.resolve({ name: 'BigScreen-GraduateStudent2' })
                    window.open(routeDataGraduateStudent2.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-GraduateStudent2' })
                    break;
                case 'ScientificResearch':
                    const routeDataScientificResearch = this.$router.resolve({ name: 'BigScreen-ScientificResearch' })
                    window.open(routeDataScientificResearch.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-GraduateStudent2' })
                    break;
                case 'DevelopmentPlanning':
                    const routeDataDevelopmentPlanning = this.$router.resolve({ name: 'BigScreen-DevelopmentPlanning' })
                    window.open(routeDataDevelopmentPlanning.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-GraduateStudent2' })
                    break;
                case 'UpdateData':
                    const routeDataUpdateData = this.$router.resolve({ name: 'UpdateData' })
                    window.open(routeDataUpdateData.href, '_blank')
                    // this.$router.push({ name: 'BigScreen-GraduateStudent2' })
                    break;
                default:
                    break;
            }
        },

    },
}
</script>

<style scoped>
body,
html {
    height: 100%
}

.nav {
    overflow: hidden;
    background-color: #61288A;
    line-height: 44px;
}

.nav h2 {
    padding: 12px;
    float: left;
    margin-left: 8%;
    font-family: "Microsoft Yahei";
    font-size: 26px;
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
}

.bg {
    width: 100%;
    height: 100vh;
    padding: 16px 16px 0 16px;
    background-image: url("~@/assets/index.png");
    background-size: cover;
    background-position: center center;
}

.line {
    margin: 0 auto;
    width: 800px;
    height: 1px;
    /* 虚线的厚度 */
    background: #fff;
    /* 虚线的颜色 */
    border-top: 2px dashed #8C2B82;
    /* 虚线样式 */
}

.container {
    text-align: center;
    padding-top: 3%;
    line-height: 16px;
}

.el-icon-devops-PartyMember {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-PartyMember.jpg") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-OrganizationalWork {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-OrganizationalWork.jpg") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-TeachingStaff {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-TeachingStaff.jpg") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-GraduateStudent1 {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-GraduateStudent1.jpg") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-GraduateStudent2 {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-GraduateStudent2.jpg") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-ScientificResearch {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-ScientificResearch.png") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-DevelopmentPlanning {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-DevelopmentPlanning.png") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-UpdateData {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-UpdateData.png") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}

.el-icon-devops-MoreBigScreen {
    color: white !important;
    height: 11vw;
    width: 94%;
    background: url("~@/assets/buttonPic/IndexButton-MoreBigScreen.jpg") center no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
}
</style>
