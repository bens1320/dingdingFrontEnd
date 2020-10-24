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
                  <input type="text" v-model.trim="nameOrId" class="form-control" id="nameOrId" placeholder="请输入股票名或股票代码">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">每股分红</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{cashMin | formatPrice}}</span>
                  <DoubleRangeSlider  style="width: 80%;" :minThreshold="0" :maxThreshold="2" :step="0.01" :min="0" :max="2"
                                     @update:min="value => cashMin = value"
                                     @update:max="value => cashMax = value"></DoubleRangeSlider>
                  <span class="range-border">{{cashMax | formatPrice}}</span>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">每股送股</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{sendMin | formatPrice}}</span>
                  <DoubleRangeSlider2  style="width: 80%;" :min2Threshold="0" :max2Threshold="2" :step="0.01" :min2="0" :max2="2"
                                      @update:min2="value => sendMin = value"
                                      @update:max2="value => sendMax = value"></DoubleRangeSlider2>
                  <span class="range-border">{{sendMax | formatPrice}}</span>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">每股转股</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{conversionMin | formatPrice}}</span>
                  <DoubleRangeSlider3 style="width: 80%;" :min3Threshold="0" :max3Threshold="2" :step="0.01" :min3="0" :max3="2"
                                      @update:min3="value => conversionMin = value"
                                      @update:max3="value => conversionMax = value"></DoubleRangeSlider3>
                  <span class="range-border">{{conversionMax | formatPrice}}</span>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">股息率</label>
                <div class="col-sm-9" style="  display: flex;align-items: center;justify-content: space-between;">
                  <span class="range-border">{{rateMin | formatPrice}}</span>
                  <DoubleRangeSlider4  style="width: 80%;" :min4Threshold="0" :max4Threshold="2" :step="0.01" :min4="0" :max4="2"
                                      @update:min4="value => rateMin = value"
                                      @update:max4="value => rateMax = value"></DoubleRangeSlider4>
                  <span class="range-border">{{rateMax | formatPrice}}</span>
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
import DoubleRangeSlider from '@/components/DoubleRangeSlider'
import DoubleRangeSlider2 from '@/components/DoubleRangeSlider2'
import DoubleRangeSlider3 from '@/components/DoubleRangeSlider3'
import DoubleRangeSlider4 from '@/components/DoubleRangeSlider4'

export default {

  name: 'Home',
  components: {
    // 局部注册 TheSidebar
    DoubleRangeSlider,
    DoubleRangeSlider2,
    DoubleRangeSlider3,
    DoubleRangeSlider4,
  },
  data() {
    return {
      nameOrId: '',
      cashMin: 0,
      cashMax: 2,
      sendMin: 0,
      sendMax: 2,
      conversionMin: 0,
      conversionMax: 2,
      rateMin: 0,
      rateMax: 2,
      value: '',
      dividendList: [],
      msg: '',
      msgType: '',
      msgShow: false,
      total: 100, // 总数
      pageSize: 20, // 每页条数,
      isClickSearch: false,
      maxValueList: []
    }
  },

  computed: {
    ...mapState(['auth', 'user']),
    // 当前页，从查询参数 page 返回
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }

  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    },


  },

  created() {
    this.loadDividendList()
  },

  filters: {
    formatPrice: function (value) {
      let tempVal = parseFloat(value).toFixed(3)
      return tempVal.substring(0, tempVal.length - 1)
    }
  },

  methods: {
    loadDividendList() {
      axios.get(`http://127.0.0.1:8000/api/dividends/?page=${this.currentPage}`).then((res) => {
        const code = parseInt(res.data['code'])
        const msg = res.data['msg']
        if (code === 3001) {
          this.dividendList = res.data['data'] || []
          this.total = res.data['total']
          // let maxValueList = res.data['maxValueList']
          //
          // this.cashMax = maxValueList[0]['cash__max']
          // this.sendMax = maxValueList[1]['send__max']
          // this.conversionMax = maxValueList[2]['conversion__max']
          // this.rateMax = maxValueList[3]['rate__max']
          // console.log(this.cashMax )
          console.log(this.dividendList)
          console.log(res.data['total'])
        } else {
          this.showMsgWarning(msg)
        }
      })
    },
    handleSearch() {
      this.$route.query.page = 1
      const search = {
        nameOrId: this.nameOrId,
        cashMin: this.cashMin,
        cashMax: this.cashMax,
        sendMin: this.sendMin,
        sendMax: this.sendMax,
        conversionMin: this.conversionMin,
        conversionMax: this.conversionMax,
        rateMin: this.rateMin,
        rateMax: this.rateMax,
        page: this.$route.query.page
      }
      console.log(search)
      axios.post('http://127.0.0.1:8000/api/dividends/', search).then((res) => {
        console.log('handleSearch')
        const code = parseInt(res.data['code'])
        const msg = res.data['msg']
        console.log(res.data)
        if (code === 2001) {
          this.dividendList = res.data['data'] || []
          this.showMsgSuccess(msg)
          this.total = res.data['total']
          this.isClickSearch = true
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
        var timestamp = Date.parse(new Date())
        const search = {
          nameOrId: this.nameOrId,
          cashMin: String(this.cashMin),
          cashMax: String(this.cashMax),
          sendMin: this.sendMin,
          sendMax: this.sendMax,
          conversionMin: this.conversionMin,
          conversionMax: this.conversionMax,
          rateMin: this.rateMin,
          rateMax: this.rateMax,
          email: localStorage.getItem('useremail'),
        }
        axios.post('http://127.0.0.1:8000/api/keywords/', search).then((res) => {
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
          this.$router.push({
            name: 'Login'
          })
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

<style scoped>

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