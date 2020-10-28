<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
    <div class="col-md-12 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading text-left">
          <div class="col-md-8 col-md-offset-2">
            <div class="panel-body" data-validator-form>
              <div class="alert alert-secondary" role="alert" style="margin-top: 10px">
                提示: 可点击保存按钮保存筛选信息, 系统会根据搜索信息追踪最新公告发布情况, 匹配到最新的相关搜索信息, 会第一时间邮箱提醒.
              </div>
              <div class="form-group row">
                <label for="nameOrId" class="col-sm-3 col-form-label">股票/代码</label>
                <div class="col-sm-9">
                  <input type="text" v-model.trim="nameOrId" class="form-control" id="nameOrId" placeholder="请输入股票名或股票代码（可选）">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">每股分红</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{ cashCurrentValue[0] | formatPrice }}</span>
                  <vue-slider :tooltip="'none'" :process-style="{ backgroundColor:  '#00b5ad' }" style="width: 70%" v-model="cashCurrentValue" :min="0" :max="cashMaxRange"
                              :interval="0.001"></vue-slider>
                  <span class="range-border">{{ cashCurrentValue[1] | formatPrice }}</span>
                </div>
              </div>


              <div class="form-group row">
                <label class="col-sm-3 col-form-label">每股送股</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{ sendCurrentValue[0] | formatPrice }}</span>
                  <vue-slider :tooltip="'none'" :process-style="{ backgroundColor:  '#00b5ad' }" style="width: 70%" v-model="sendCurrentValue" :min="0" :max="sendMaxRange"
                              :interval="0.001"></vue-slider>
                  <span class="range-border">{{ sendCurrentValue[1] | formatPrice }}</span>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">每股转股</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{ conversionCurrentValue[0] | formatPrice }}</span>
                  <vue-slider :tooltip="'none'" :process-style="{ backgroundColor:  '#00b5ad' }" style="width: 70%" v-model="conversionCurrentValue" :min="0" :max="conversionMaxRange"
                              :interval="0.001"></vue-slider>

                  <span class="range-border">{{ conversionCurrentValue[1] | formatPrice }}</span>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">股息率</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{ rateCurrentValue[0] * 100 | formatPrice3 }} %</span>
                  <vue-slider :tooltip="'none'" :process-style="{ backgroundColor:  '#00b5ad' }" style="width: 70%"
                              v-model="rateCurrentValue" :min="0" :max="rateMaxRange"
                              :interval="0.001"></vue-slider>
                  <span class="range-border">{{ rateCurrentValue[1] * 100 | formatPrice3 }} %</span>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">日期</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <datepicker style="width: 48%" placeholder="开始时间" input-class="form-control" :format="dateFormat" :language="zh" v-model="startDate"></datepicker>-
                  <datepicker style="width: 48%" placeholder="结束时间" input-class="form-control" :format="dateFormat" :language="zh" v-model="endDate"></datepicker>
                </div>
              </div>

              <button @click="handleSearch" type="submit" style=" width: 48%;"
                      class="btn btn-primary">
                <i class="fa fa-search"></i> 筛选
              </button>

              <button @click="save" type="submit" style=" width: 48%; float:right;"
                      class="btn btn-primary">
                <i class="fa fa-check-square"></i> 保存
              </button>

            </div>
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="panel panel-default list-panel search-results">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">股票代码</th>
              <th scope="col">股票名称</th>
              <th scope="col">每股分红</th>
              <th scope="col">股息率</th>
              <th scope="col">当前股价</th>
              <th scope="col">每股送股</th>
              <th scope="col">每股转股</th>
              <th scope="col">公告标题</th>
              <th scope="col">发布日期</th>
            </tr>
            </thead>
            <tbody v-if="dividendList && dividendList.length > 0">
            <tr v-for="dividend in dividendList" :key="dividend.id">
              <th scope="row">{{ dividend.code }}</th>
              <td>{{ dividend.name }}</td>
              <td>{{dividend.cash !== 0 ? dividend.cash : ''}}</td>
              <td v-if="dividend.rate !== 0">{{ dividend.rate * 100  | formatPrice}} %</td><td v-else></td>
              <td>{{ dividend.stockPrice !== 0 ? dividend.stockPrice : '' }}</td>
              <td>{{ dividend.send !== 0 ? dividend.send : '' }}</td>
              <td>{{ dividend.conversion !== 0 ? dividend.conversion : ''  }}</td>
              <td>
                <a target="_blank" :href="dividend.url">
                  <span
                      v-html="dividend.title">
                  </span>
                </a>
              </td>
              <td>{{ dividend.noticeDate }}</td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
              <td colspan="8" style="text-align: center;">没有数据。</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!--分页组件-->
        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize"
                      :onPageChange="changePage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import Datepicker from 'vuejs-datepicker'
import {zh} from 'vuejs-datepicker/dist/locale'


export default {

  name: 'Home',

  components: {
    // 局部注册 TheSidebar
    VueSlider,
    Datepicker
  },
  data() {
    return {
      nameOrId: '',
      cashCurrentValue: [0, 5],
      cashMaxRange: 10,
      sendCurrentValue: [0, 6],
      sendMaxRange: 11,
      conversionMin: 0,
      conversionMax: 2,
      conversionCurrentValue: [0, 7],
      conversionMaxRange: 12,
      rateCurrentValue: [0, 8],
      rateMaxRange: 13,
      value: '',
      dividendList: [],
      msg: '',
      msgType: '',
      msgShow: false,
      total: 100, // 总数
      pageSize: 20, // 每页条数,
      isClickSearch: false,
      startDate: '2020-01-01',
      endDate: '2020-10-28',
      zh: zh,
      dateFormat: 'yyyy-MM-dd'
    }
  },


  computed: {
    ...mapState(['auth', 'user']),
    // 当前页，从查询参数 page 返回
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },


  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    }
  },

  created() {
    let dayjs = require('dayjs')
    this.endDate = dayjs().format('YYYY-MM-DD')

    this.loadDividendList()
  },

  filters: {
    formatPrice: function (value) {
      let tempVal = parseFloat(value).toFixed(4)
      return tempVal.substring(0, tempVal.length - 1)
    },
    formatPrice3: function (value) {
      let tempVal = parseFloat(value).toFixed(2)
      return tempVal.substring(0, tempVal.length - 1)
    }
  },

  methods: {
    loadDividendList() {
      axios.get(`${window.webSite}/api/dividends/?page=${this.currentPage}`).then((res) => {
        const code = parseInt(res.data['code'])
        const msg = res.data['msg']
        if (code === 3001) {
          this.dividendList = res.data['data'] || []
          console.log(this.dividendList)
          this.total = res.data['total']
          let maxValueList = res.data['maxValueList']
          this.cashMaxRange = Number(maxValueList[0]['cash__max'].toFixed(3))
          this.cashCurrentValue = [0, this.cashMaxRange]
          this.sendMaxRange = Number(maxValueList[1]['send__max'].toFixed(3))
          this.sendCurrentValue = [0, this.sendMaxRange]
          this.conversionMaxRange = Number(maxValueList[2]['conversion__max'].toFixed(3))
          this.conversionCurrentValue = [0, this.conversionMaxRange]
          this.rateMaxRange = Number(maxValueList[3]['rate__max'].toFixed(3))
          this.rateCurrentValue = [0, this.rateMaxRange]
        } else {
          this.showMsgWarning(msg)
        }
      })
    },
    handleSearch() {
      const search = {
        nameOrId: this.nameOrId,
        cashMin: this.cashCurrentValue[0],
        cashMax: this.cashCurrentValue[1],
        sendMin: this.sendCurrentValue[0],
        sendMax: this.sendCurrentValue[1],
        conversionMin: this.conversionCurrentValue[0],
        conversionMax: this.conversionCurrentValue[1],
        rateMin: this.rateCurrentValue[0],
        rateMax: this.rateCurrentValue[1],
        page: this.$route.query.page | 1,
        startDate: this.startDate,
        endDate: this.endDate
      }

      console.log(search)
      axios.post(`${window.webSite}/api/dividends/`, search).then((res) => {
        console.log('handleSearch')
        const code = parseInt(res.data['code'])
        const msg = res.data['msg']
        console.log(res.data)
        if (code === 2001) {
          this.dividendList = res.data['data'] || []
          this.showMsgSuccess(msg)
          this.total = res.data['total']
          this.isClickSearch = true
          this.currentPage = res.data['page']
          console.log(this.dividendList)
        } else {
          this.showMsgWarning(msg)

        }
      })
    },

    save() {
      const useremail = localStorage.getItem('useremail')
      console.log(useremail)
      if (useremail) {
        const search = {
          nameOrId: this.nameOrId,
          cashMin: this.cashCurrentValue[0],
          cashMax: this.cashCurrentValue[1],
          sendMin: this.sendCurrentValue[0],
          sendMax: this.sendCurrentValue[1],
          conversionMin: this.conversionCurrentValue[0],
          conversionMax: this.conversionCurrentValue[1],
          rateMin: this.rateCurrentValue[0],
          rateMax: this.rateCurrentValue[1],
          email: localStorage.getItem('useremail'),
        }
        axios.post(`${window.webSite}/api/keywords/`, search).then((res) => {
          console.log(res.data)
          const code = parseInt(res.data['code'])
          const msg = res.data['msg']
          this.showMsgSuccess(msg)
          if (code === 3001) {
            console.log(code)
            this.showMsgSuccess(msg)
          } else {
            this.showMsgWarning(msg)
          }
        })
      } else {
        this.$swal({
          text: '该功能需要登录',
          confirmButtonText: '登录'
        }).then((res) => {
          if(res.value){
            this.$router.push({
              name: 'Login'
            })
          }

        })
      }

    },

    showMsgSuccess(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    showMsgWarning(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    // 回调，组件的当前页改变时调用
    changePage(page) {
      // 在查询参数中混入 page，并跳转到该地址
      // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })

      this.$router.push({query: {...this.$route.query, page}})
      if (this.isClickSearch) {
        this.handleSearch()
      } else {
        this.loadDividendList()
      }
      // this.handleSearch()
    }
  }
}
</script>

<style scoped lang="scss">

.range-border{
  width: 10%;
  color: #525252;
}

.col-sm-3{
  color: #525252;
}

.form-group{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/*td{*/
/*  white-space:nowrap;*/
/*  overflow:hidden;*/
/*  word-break:keep-all;*/
/*}*/

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

.form-check-label {
  padding-right: 20px;
  /*width: 20%;*/
}

</style>