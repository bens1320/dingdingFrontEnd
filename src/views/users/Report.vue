<template>
    <div class="col-md-9 left-col">
        <div class="alert alert-success" role="alert">
            提示: 系统会根据搜索信息追踪表报发布情况, 匹配到最新的相关搜索信息, 会第一时间邮箱提醒.
        </div>
        <div class="panel panel-default padding-md">
            <div class="panel-body">
                <h2><i class="fa fa-cog"></i>搜索信息</h2>
                <hr>
                <div class="form-horizontal" data-validator-form>
                    <table class="table table-bordered table-hover text-center">
                        <thead>
                        <th class="text-center">股票名或股票代码</th>
                        <th class="text-center">关键词</th>
                        <th class="text-center">删除</th>
                        </thead>
                        <tbody v-if="allInfo.length !== 0">
                        <tr v-for='item in allInfo' :key='item.id'>
                            <td>{{item.title_code === "" ? "空" : item.title_code}}</td>
                            <td>{{item.content === "" ? "空" : item.content}}</td>
                            <td>
                                <button class="btn btn-success" @click='oneDelete(item.id)'>
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                        <tbody v-else>
                        <tr>
                            <td colspan="3">该报表暂无保存的搜索信息</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'EditProfile',
        props: ["reportType"],
        data() {
            return {
                allInfo: null,
            }
        },
        methods: {
            getAll() {
                axios.get(`http://121.43.179.224:8000/api/keywords/?reportType=${this.reportType}&email=` + localStorage.getItem('useremail')).then((res) => {
                    this.allInfo = res.data['data']
                });
            },
            oneDelete(id) {
                this.$swal({
                    text: '你确定要删除吗?',
                    confirmButtonText: '删除'
                }).then((res) => {
                    if (res.value) {
                        axios.delete('http://121.43.179.224:8000/api/keywords/', {data: {id: id}}).then((res) => {
                            this.getAll();
                        });
                    }
                })

            },
        },
        mounted() {
            this.getAll();
        }
    }
</script>

<style scoped>

</style>