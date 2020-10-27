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
                    <table class="table text-center">
                      <thead>
                      <th class="text-center">股票名或代码</th>
                      <th class="text-center">现金分红区间</th>
                      <th class="text-center">转股区间</th>
                      <th class="text-center">送股区间</th>
                      <th class="text-center">股息率区间</th>
                      <th class="text-center">创建日期</th>
                      <th class="text-center">操作</th>
                      </thead>
                      <tbody v-if="allInfo && allInfo.length > 0">
                      <tr v-for='item in allInfo' :key='item.id'>
                        <td>{{ item.nameOrId === '' ? 'All' : item.nameOrId }}</td>
                        <td>{{ item.cashMin | formatPrice }}-{{ item.cashMax | formatPrice }}</td>
                        <td>{{ item.sendMin | formatPrice }}-{{ item.sendMax | formatPrice }}</td>
                        <td>{{ item.conversionMin | formatPrice }}-{{ item.conversionMax | formatPrice }}</td>
                        <td>{{ item.rateMin | formatPrice }}-{{ item.rateMax | formatPrice }}</td>
                        <td>{{ item.createDate | formateDate}}</td>
                        <td>
                          <button class="btn btn-primary" style="padding:2px 4px" @click='oneDelete(item.id)'>
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

              <div class="panel-footer text-right remove-padding-horizontal pager-footer">
                <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize"
                            :onPageChange="changePage"/>
              </div>
            </div>
        </div>
    </div>


</template>

<script>
    import axios from 'axios';
    import dayjs from 'dayjs';


    export default {
      name: 'EditProfile',
      props: ['reportType'],
      data() {
        return {
          allInfo: null,
          total: 20, // 总数
          pageSize: 10, // 每页条数,
        }
      },
      computed: {
        // 当前页，从查询参数 page 返回
        currentPage() {
          return parseInt(this.$route.query.page) || 1
        }
      },
      filters: {
        formatPrice: function (value) {
          let tempVal = parseFloat(value).toFixed(3)
          return tempVal.substring(0, tempVal.length - 1)
        },
        formateDate: function (date){
          var dayjs = require('dayjs')
          return dayjs.unix(date).format('YYYY-MM-DD')
        }

      },
      methods: {
        getAll() {
          axios.get(`${window.webSite}/api/keywords/?page=${this.currentPage}&email=` + localStorage.getItem('useremail')).then((res) => {
            console.log(res.data['data'])
            this.allInfo = res.data['data']
            this.total = res.data['total']
          })
        },
        oneDelete(id) {
                this.$swal({
                    text: '你确定要删除吗?',
                  confirmButtonText: '删除'
                }).then((res) => {
                  if (res.value) {
                    axios.delete(`${window.webSite}/api/keywords/`, {data: {id: id}}).then((res) => {
                      this.getAll()
                    })
                  }
                })

        },
        changePage(page) {
          // 在查询参数中混入 page，并跳转到该地址
          // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })

          this.$router.push({query: {...this.$route.query, page}})
          this.getAll();
          // this.handleSearch()
        }

      },
        mounted() {
            this.getAll();
        }
    }
</script>

<style scoped>

</style>