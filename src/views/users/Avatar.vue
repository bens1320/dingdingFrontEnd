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
                        <tbody>
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
                    </table>
                </div>
                <!--        <div class="form-horizontal" data-validator-form>-->
                <!--          <div class="form-group">-->
                <!--            <label class="col-sm-2 control-label">用户名</label>-->
                <!--            <div class="col-sm-6">-->
                <!--              <input v-model.trim="username" v-validator:input.required="{ title: '用户名', regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control">-->
                <!--            </div>-->
                <!--          </div>-->
                <!--          <div class="form-group">-->
                <!--            <label class="col-sm-2 control-label">性别</label>-->
                <!--            <div class="col-sm-6">-->
                <!--              <select v-model="sex" class="form-control">-->
                <!--                <option value="">未选择</option>-->
                <!--                <option value="male">男</option>-->
                <!--                <option value="female">女</option>-->
                <!--              </select>-->
                <!--            </div>-->
                <!--          </div>-->
                <!--          <div class="form-group">-->
                <!--            <label class="col-sm-2 control-label">兴趣</label>-->
                <!--            <div class="col-sm-6">-->
                <!--              <label class="checkbox-inline">-->
                <!--                <input v-model="hobbies" value="泡网" type="checkbox"> 泡网-->
                <!--              </label>-->
                <!--              <label class="checkbox-inline">-->
                <!--                <input v-model="hobbies" value="运动" type="checkbox"> 运动-->
                <!--              </label>-->
                <!--              <label class="checkbox-inline">-->
                <!--                <input v-model="hobbies" value="健身" type="checkbox"> 健身-->
                <!--              </label>-->
                <!--              <label class="checkbox-inline">-->
                <!--                <input v-model="hobbies" value="旅游" type="checkbox"> 旅游-->
                <!--              </label>-->
                <!--              <label class="checkbox-inline">-->
                <!--                <input v-model="hobbies" value="游戏" type="checkbox"> 游戏-->
                <!--              </label>-->
                <!--            </div>-->
                <!--          </div>-->
                <!--          <div class="form-group">-->
                <!--            <label class="col-sm-2 control-label">个人简介</label>-->
                <!--            <div class="col-sm-6">-->
                <!--              <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>-->
                <!--            </div>-->
                <!--          </div>-->

                <!--          <div class="form-group">-->
                <!--            <div class="col-sm-offset-2 col-sm-6">-->
                <!--              <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>-->
                <!--            </div>-->
                <!--          </div>-->
                <!--        </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'EditProfile',
        data() {
            return {
                allInfo: null,
                username: '', // 用户名
                sex: '', // 性别
                hobbies: [], // 兴趣
                introduction: '' // 个人简介
            }
        },
        created() {
            const user = this.$store.state.user

            if (user && typeof user === 'object') {
                const {name, sex, hobbies, introduction} = user

                this.username = name
                this.sex = sex || this.sex
                this.hobbies = hobbies || this.hobbies
                this.introduction = introduction
            }
        },
         methods: {
            getAll() {
                axios.get("http://121.43.179.224:8000/api/keywords/?reportType=annual&email=" + localStorage.getItem('useremail')).then((res) => {
                    console.log(res.data)
                    console.log(res.data['data'])
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
                            console.log(res.data)
                            this.getAll();
                        });
                    }
                })

            },
            updateProfile(e) {
                setTimeout(() => {
                    if (e.target.canSubmit) {
                        this.$store.dispatch('updateUser', {
                            name: this.username,
                            sex: this.sex,
                            hobbies: this.hobbies,
                            introduction: this.introduction
                        })
                        this.$message.show('修改成功')
                    }
                })
            }
        },
        mounted() {
            this.getAll();
        }
    }
</script>

<style scoped>

</style>