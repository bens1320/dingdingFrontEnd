<template>
    <div>
        <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
        <!-- 帖子列表 修改了222 -->
        <div class="col-md-12 topics-index main-col">

            <div class="panel panel-default">

                    <div class="panel-heading text-left">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="panel-body" data-validator-form>
                                <div class="form-group">
                                    <input v-model.trim="nameOrId" type="text"
                                           class="form-control"  placeholder="请输入股票名或股票代码(必填)">
                                </div>
                                <div class="form-group">
                                    <input v-model.trim="keywords"
                                           type="text" class="form-control" placeholder="请输入搜索的关键词(可选)">
                                </div>
                                <div class="form-group">

                                    <label class="form-check-label">
                                        <input v-model="reportType" class="form-check-input" type="radio"
                                           value="first-session-report" name="typeReport" >
                                        <span>第一季度报</span>
                                    </label>


                                    <label class="form-check-label">
                                        <input v-model="reportType" class="form-check-input" type="radio"
                                           value="mid-year-report" name="typeReport" >
                                        <span>年中报</span>
                                    </label>


                                    <label class="form-check-label">
                                        <input v-model="reportType" class="form-check-input" type="radio"
                                           value="third-session-report" name="typeReport" >
                                        <span>第三季度报</span>
                                    </label>


                                    <label class="form-check-label">
                                        <input v-model="reportType" class="form-check-input" type="radio"
                                           value="year-report" name="typeReport">
                                        <span>年报</span>
                                    </label>
                                </div>

                                <button @click="handleSearch" type="submit" style=" width: 48%"
                                        class="btn btn-lg btn-success">
                                    <i class="fa fa-search"></i> 搜索
                                </button>

                                <button @click="save" type="submit" style=" width: 48%; float:right;"
                                        class="btn btn-lg btn-success ">
                                    <i class="fa fa-check-square"></i> 保存
                                </button>
                                <div class="alert alert-secondary" role="alert" style="margin-top: 10px">
                                    提示: 可点击保存按钮保存搜索信息, 系统会根据搜索信息追踪表报发布情况, 匹配到最新的相关搜索信息, 会第一时间邮箱提醒.
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>

                <div class="panel panel-default list-panel search-results">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <i class="fa fa-search"></i>
                            搜索共 {{ searchList.length }} 条

                            <div v-if="searchList.length" class="pull-right">
                                <button class="btn btn-default btn-sm" href="javascript:;" @click="sendEmail">
                                    打包发送
                                </button>
                            </div>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div v-for="result in searchList" class="result">
                            <h2 class="title">
                                <a target="_blank" :href="result.link"> <span
                                        v-html="result.code"></span><span
                                        v-html="result.title"></span></a>
                                <small>&nbsp;发布时间: {{ formatDate(result.date)}}</small>
                            </h2>
                            <div class="desc" v-html="result.content"></div>
                            <hr>
                        </div>
                        <div v-if="!searchList.length" class="empty-block">
                            没有任何数据~~
                        </div>
                    </div>
                </div>

                <!-- 分页组件 -->
<!--                <div class="panel-footer text-right remove-padding-horizontal pager-footer">-->
<!--                    <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize"-->
<!--                                :onPageChange="changePage"/>-->
<!--                </div>-->
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState} from "vuex";
    // 引入 TheSidebar.vue 的默认值2222
    import axios from 'axios';
    import {formatDate} from '@/plugins/formatDate.js'

    export default {
        name: "Home",
        components: {
            // 局部注册 TheSidebar
        },
        data() {
            return {
                nameOrId: "",
                keywords: "",
                reportType: "first-session-report",
                value: "",
                searchList: [],
                msg: "",
                msgType: "",
                msgShow: false,
                total: 0, // 总数
                pageSize: 10, // 每页条数
            };
        },
        beforeRouteEnter(to, from, next) {
            const fromName = from.name;
            const logout = to.params.logout;

            next(vm => {
                if (vm.$store.state.auth) {
                    switch (fromName) {
                        case "Register":
                            vm.showMsg("注册成功");
                            break;
                        case "Login":
                            vm.showMsg("登录成功");
                            break;
                    }
                } else if (logout) {
                    vm.showMsg("操作成功");
                }

                vm.setDataByFilter(to.query.filter);
            });
        },
        computed: {
            ...mapState(["auth", "user"]),
            // 当前页，从查询参数 page 返回
            currentPage() {
                return parseInt(this.$route.query.page) || 1;
            }
        },
        watch: {
            auth(value) {
                if (!value) {
                    this.showMsg("操作成功");
                }
            },
            $route(to) {
                this.setDataByFilter(to.query.filter);
            }
        },
        methods: {
            formatDate(time) {
                time = time * 1000
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            handleSearch() {
                const search = {
                    nameOrId: this.nameOrId,
                    keywords: this.keywords,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    reportType: this.reportType
                }
                console.log(search)
                axios.post('http://121.43.179.224:8000/api/esearch/', search).then((res) => {
                    const code = parseInt(res.data['code'])
                    const msg = res.data['msg']
                    if (code === 2001) {
                        this.searchList = res.data["data"] || []
                        this.showMsgSuccess(msg)
                    }else{
                        this.showMsgWarning(msg)

                    }
                });
            },

            save() {
                const useremail = localStorage.getItem("useremail")
                console.log(useremail)
                if (useremail) {
                    var timestamp = Date.parse(new Date());
                    const search = {
                        nameOrId: this.nameOrId,
                        keywords: this.keywords,
                        email: localStorage.getItem("useremail"),
                        reportType: this.reportType,
                        createTime: timestamp,
                        action: "save"
                    }
                    axios.post('http://121.43.179.224:8000/api/keywords/', search).then((res) => {
                        console.log(res.data)
                        const code = parseInt(res.data['code'])
                        const msg = res.data['msg']
                        this.showMsgSuccess(msg)
                        if (code === 3001) {
                            console.log(code)
                            this.showMsgSuccess(msg)
                        } else{
                            this.showMsgWarning(msg)
                        }
                    });
                } else {
                    this.$swal({
                        text: '该功能需要登录',
                        confirmButtonText: '登录'
                    }).then((res) => {
                        this.$router.push({
                            name: 'Login'
                        })
                    })
                }

            },
            sendEmail() {
                const useremail = localStorage.getItem("useremail")
                console.log(useremail)
                if (useremail) {
                    const search = {
                        searchList: this.searchList,
                        email: localStorage.getItem("useremail"),
                        reportType: this.reportType
                    }
                    this.showMsgSuccess("正在发送中...")
                    axios.post('http://121.43.179.224:8000/api/emails/', search).then((res) => {
                        const code = parseInt(res.data['code'])
                        const msg = res.data['msg']
                        if (code === 4001) {
                            this.showMsgSuccess(msg)
                        }else{
                            this.showMsgWarning(msg)
                        }
                    });
                } else {
                    this.$swal({
                        text: '该功能需要登录',
                        confirmButtonText: '登录'
                    }).then((res) => {
                        this.$router.push({
                            name: 'Login'
                        })
                    })
                }
            },
            showMsgSuccess(msg, type = "success") {
                this.msg = msg;
                this.msgType = type;
                this.msgShow = true;
            },
            showMsgWarning(msg, type = "warning") {
                this.msg = msg;
                this.msgType = type;
                this.msgShow = true;
            },
            setDataByFilter(filter = "mid-year-report") {
                // 每页条数
                const pageSize = this.pageSize;
                // 当前页
                const currentPage = this.currentPage;
                // 过滤后的所有文章
                const allArticles = this.$store.getters.getArticlesByFilter(filter);

                this.filter = filter;
                // 文章总数
                this.total = allArticles.length;
                // 当前页的文章
                this.articles = allArticles.slice(
                    pageSize * (currentPage - 1),
                    pageSize * currentPage
                );
            },
            // 回调，组件的当前页改变时调用
            changePage(page) {
                // 在查询参数中混入 page，并跳转到该地址
                // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })

                this.$router.push({query: {...this.$route.query, page}});
                // this.handleSearch()
            }
        }
    };
</script>

<style scoped>
    .result a:hover, .result a:focus {
        color: #d6514d;
        transition: color .15s ease;
    }

    .panel-title .btn {
        margin-left: 5px;
    }

    .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    @media (max-width: 767px) {
        .pull-right {
            margin-top: -10px
        }
    }
    .form-check-label{
        padding-right: 20px;
        /*width: 20%;*/
    }
</style>