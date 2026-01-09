<template>
    <div>
        <div v-if="state === 1">
            <div style="padding: 6%;">
                <h2 style="padding: 20px;">数据南理瞭望台数据管理（更新数据前建议先下载历史模版）</h2>
                <el-table :data="tableData" style="padding: 4px;" :header-cell-style="{ textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }">
                    <el-table-column prop="bigScreenName" label="大屏名称"></el-table-column>
                    <el-table-column label="更新" width="200">
                        <template v-slot="scope">
                            <el-button size='small' type="text"
                                @click="uploadUpdatedFile(scope.$index)">更新数据</el-button>
                            <input v-if="scope.$index === 0" id="fileInput0" type="file" style="display: none;"
                                @change="uploadFile($event, 0)" />
                            <input v-if="scope.$index === 1" id="fileInput1" type="file" style="display: none;"
                                @change="uploadFile($event, 1)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="下载" width="200">
                        <template v-slot="scope">
                            <el-button size='small' type="text" @click="downloadFile(scope.$index)">下载当前数据</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style=" padding-top: 20px;display: flex;justify-content: center;align-items: center;">
                    <el-button type="primary" @click="returnIndex">返回主界面</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import service from '@/utils/service';

export default {
    name: 'UpdateData',
    components: {},
    data() {
        return {
            state: 0,
            tableData: [
                {
                    bigScreenName: "科研看板",
                },
                {
                    bigScreenName: "核心数据学科分布看板",
                },
            ],
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
            document.title = '数据南理瞭望台 数据更新'
            service
                .get('upload/login')
                .then(res => {
                    console.log(res.data)
                    if (res.data.value === 1) {
                        this.state = 1
                        console.log("login success")
                    }
                    else if (res.data.value === 2) {
                        this.$message({
                            type: 'error',
                            message: '尚未同意条款声明，暂无权限查看当前看板'
                        });
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: '无权限查看当前看板'
                        });
                    }
                })

                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '无权限查看当前看板'
                    });
                    console.log(error);
                });
        },
        uploadUpdatedFile(index) {
            let inputName = '#fileInput' + index
            document.querySelector(inputName).click()
        },
        uploadFile(e, index) {
            let file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)
            let fileUrl = 'upload/upload'
            service({
                method: 'post',
                url: fileUrl,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData,
                params: { option: index },
            }).then((res) => {
                console.log(res)
                this.$message({
                    type: 'success',
                    message: '上传成功'
                });
            }).catch(error => {
                this.handleError(error)
            })
        },
        downloadFile(index) {
            console.log(index)
            service
                .get('upload/download', {
                    responseType: 'blob',
                    params: { option: index },
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
        returnIndex() {
            this.$router.push({ name: 'Index' })
        },
    },
}
</script>

<style scoped>
body,
html {
    height: 100%
}
</style>
