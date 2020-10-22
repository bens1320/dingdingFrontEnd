<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
    <div class="col-md-12 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading text-left">
          <div class="col-md-6 col-md-offset-3">
            <div class="panel-body" data-validator-form>
              <div class="form-group">
                <label for="formControlRange1">股票名或代码</label>
                <input id="formControlRange1" v-model.trim="nameOrId" type="text"
                       class="form-control" placeholder="请输入股票名或股票代码">
              </div>
              <div class="form-group">
                <label>现金分红（每股）</label>
                <DoubleRangeSlider :minThreshold="0" :maxThreshold="2" :step="0.01" :min="0" :max="2" @update:min="value => cashMin = value" @update:max="value => cashMax = value"></DoubleRangeSlider>
                <label>Min</label><input type="text" v-model.trim="cashMin">
                <label>Max</label><input type="text" v-model.trim="cashMax">
              </div>
              <div class="form-group">
                <label>送股（每股）</label>
                <DoubleRangeSlider2 :min2Threshold="0" :max2Threshold="2" :step="0.01" :min2="0" :max2="2" @update:min2="value => sendMin = value" @update:max2="value => sendMax = value"></DoubleRangeSlider2>
                <label>Min</label><input type="text" v-model.trim="sendMin">
                <label>Max</label><input type="text" v-model.trim="sendMax">
              </div>
              <div class="form-group">

                <label>转股（每股）</label>
                <DoubleRangeSlider3 :min3Threshold="0" :max3Threshold="2" :step="0.01" :min3="0" :max3="2" @update:min3="value => conversionMin = value" @update:max3="value => conversionMax = value"></DoubleRangeSlider3>
                <label>Min</label><input type="text" v-model.trim="conversionMin">
                <label>Max</label><input type="text" v-model.trim="conversionMax">


              </div>
              <div class="form-group">
                <label>股息率</label>
                <DoubleRangeSlider4 :min4Threshold="0" :max4Threshold="2" :step="0.01" :min4="0" :max4="2" @update:min4="value => rateMin = value" @update:max4="value => rateMax = value"></DoubleRangeSlider4>
                <label>Min</label><input type="text" v-model.trim="rateMin">
                <label>Max</label><input type="text" v-model.trim="rateMax">

              </div>

              <button @click="handleSearch" type="submit" style=" width: 48%"
                      class="btn btn-lg btn-success">
                <i class="fa fa-search"></i> 筛选
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
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">股票代码</th>
              <th scope="col">股票名称</th>
              <th scope="col">送股比例（每股）</th>
              <th scope="col">转股比例（每股）</th>
              <th scope="col">现金分红（每股）</th>
              <th scope="col">股息率(TTM)</th>
              <th scope="col">公告标题</th>
              <th scope="col">发布日期</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="dividend in dividendList" :key="dividend.id">
              <th scope="row">{{dividend.code}}</th>
              <td>{{dividend.code}}</td>
              <td>4股</td>
              <td >6股</td>
              <td>{{dividend.value}}元</td>
              <td>{{dividend.rate}}</td>
              <td>{{dividend.title}}</td>
              <td>{{dividend.noticeDate}}</td>
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
import {formatDate} from '@/plugins/formatDate.js'
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
    DoubleRangeSlider4
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

  methods: {
    loadDividendList(){
      axios.get(`http://127.0.0.1:8000/api/dividends/?page=${this.currentPage}`).then((res) => {
        const code = parseInt(res.data['code'])
        const msg = res.data['msg']
        if (code === 3001) {
          this.dividendList = res.data['data'] || []
          this.total = res.data['total']
          // this.showMsgSuccess(msg)
          console.log(this.dividendList)
          console.log(res.data['total'])
        } else {
          this.showMsgWarning(msg)
        }
      })
    },

    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    handleSearch() {
      this.$route.query.page = 1
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
      if(this.isClickSearch){
        this.handleSearch()
      }else{
        this.loadDividendList()
      }
      // this.handleSearch()
    }
  }
}
</script>

<style scoped>
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