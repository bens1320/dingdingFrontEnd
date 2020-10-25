<template>
    <div class="panel panel-default list-panel search-results">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="fa fa-search"></i>
                搜索共 {{ list.length }} 条

                <div v-if="list.length" class="pull-right" style="margin-top:-10px">
                    <button class="btn btn-default btn-sm" href="javascript:;" @click="save()">
                        保存搜索信息
                    </button>
                    <button class="btn btn-default btn-sm" href="javascript:;" @click="">
                        打包发送
                    </button>
                </div>
            </h3>
        </div>
        <div class="panel-body">
            <div v-for="result in list" class="result">
                <h2 class="title">
                    <a target="_blank" :href="result._source.link">{{result._source.id}} <span
                            v-html="result._source.title"></span></a>
                </h2>
                <div class="desc" v-html="result._source.content"></div>
                <hr>
            </div>
            <div v-if="!list.length" class="empty-block">
                没有任何数据~~
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import axios from 'axios';

    export default {
        name: 'Search',
        props: {
            list: {
                type: Array,
                default: () => []
            },
            nameOrId: {
                type: String,
                default: () => []
            },
            keywords: {
                type: String,
                default: () => []
            }
        },
        data() {
            return {
                msg: "",
                msgType: "",
                msgShow: false,
                keyword: '',
                results: [],
                filter: 'default', // 默认排序方式
                filters: [ // 排序方式列表
                    {
                        filter: 'default',
                        title: '相关性排序',
                        icon: 'random'
                    },
                    {
                        filter: 'vote',
                        title: '点赞数排序',
                        icon: 'thumbs-up'
                    }
                ]
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getArticlesByKeyword(to.query.q)
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.getArticlesByKeyword(to.query.q)
            next()
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('UPDATE_SEARCH_VALUE', '')
            next()
        },
        methods: {
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
            save() {
                const search = {
                    nameOrId: this.nameOrId,
                    keywords: this.keywords,
                }
                axios.post('http://121.43.179.224:8000/api/dingzhe/', search).then((res) => {
                    console.log(res.data)
                    const code = parseInt(res.data['code'])
                    const msg = res.data['msg']
                    console.log("this.showMsgSuccess(msg)")
                    this.showMsgSuccess(msg)
                    if (code === 3000) {
                        console.log(code)
                        this.showMsgSuccess(msg)
                    } else if (code === 3001) {
                        this.showMsgWarning(msg)
                        console.log(code)
                    }
                });
            },

            // 添加 filter 参数，以按指定方式排序
            getArticlesByKeyword(keyword, filter) {
                if (keyword) {
                    this.keyword = keyword
                    // 更新排序方式
                    if (filter) this.filter = filter
                    this.$store.commit('UPDATE_SEARCH_VALUE', keyword)
                    // 传入 filter 参数
                    this.results = this.$store.getters.getArticlesByKeyword(keyword, filter)
                }
            }
        }
    }
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
</style>