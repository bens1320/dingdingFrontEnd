<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
    <a-row type="flex" :gutter="5" justify="center">
      <a-col :span="span">
        <el-select v-model="report_period_value" filterable v-on:change="click_process">
          <el-option
              v-for="item in report_period_options"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </a-col>
      <a-col :span="span">
        <el-select v-model="market_value" filterable v-on:change="click_process">
          <el-option
              v-for="item in market_options"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </a-col>
      <a-col :span="span">
        <el-select v-model="report_type_value" filterable v-on:change="click_process">
          <el-option
              v-for="item in report_type_options"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </a-col>
      <a-col :span="span">
        <a-tooltip placement="topLeft">
          <template slot="title">
            <span>净利润波动幅度下限</span>
          </template>
          <el-input-number v-model="net_profit_inc_low_limit" :precision="1" :step="1"></el-input-number>
        </a-tooltip>
      </a-col>
      <a-col :span="span">
        <a-tooltip placement="topLeft">
          <template slot="title">
            <span>净利润波动幅度上限</span>
          </template>
          <el-input-number v-model="net_profit_inc_high_limit" :precision="1" :step="1"></el-input-number>
        </a-tooltip>
      </a-col>
      <a-col>
        <a-tooltip placement="topLeft">
          <template slot="title">
            <span>查询天数(最大90)</span>
          </template>
          <el-input-number v-model="day_range_value" :precision="0" :step="1" :max="90"></el-input-number>
        </a-tooltip>
      </a-col>
      <a-col :span="span">
        <a-button type="primary" size='large' shape="circle" icon="search" v-on:click="click_process"/>
      </a-col>
      <a-col>
        <a-button type="primary" size="large" v-on:click="save">保存</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <div class="Chart" id="chart1"></div>
      </a-col>
      <a-col>
        <div class="Chart" id="chart2"></div>
      </a-col>
      <a-col>
        <div style="height: 30%;">
          <vxe-table
              border
              show-footer
              class="mytable-scrollbar"
              height="400"
              :footer-method="footerMethod"
              :data="tableData">
            <vxe-table-column field='代码' title='股票代码' width="90" fixed="left"></vxe-table-column>
            <vxe-table-column field='公告日' title='预告发布日期' width="90"></vxe-table-column>
            <vxe-table-column field='预告涨跌幅' title='预告涨跌幅(%)' width="140"></vxe-table-column>
            <vxe-table-column v-for="count in this.day_range_value"
                              :key="''+count"
                              :title="''+count"
                              align="center"
                              min-width="80"
                              height="40"
                              :field="''+count"></vxe-table-column>
          </vxe-table>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import XEUtils from 'xe-utils'
import {Loading} from "element-ui";

export default {
  name: "Forecast",
  data() {
    return {
      report_period_options: [],
      report_period_value: null,
      report_type_options: [],
      report_type_value: null,
      market_options: [],
      market_value: null,
      net_profit_inc_low_limit: null,
      net_profit_inc_high_limit: null,
      day_range_value: null,
      chart1: null,
      chart2: null,
      option1: null,
      option2: null,
      tableData: [],
      stock_num: [],
      msg: null,
      msgType: null,
      msgShow: null,
      span: 'auto',
      url: 'https://csubigdata.com/dingding_backend/api/indicator/'
    }
  },
  mounted() {
    this.report_type_options = ['续盈', '预增', '略增', '扭亏', '续亏', '预减', '略减', '首亏']
    this.market_options = ['','主板', '中小板', '创业板', '科创板']
    this.market_value = '主板'
    this.report_type_value = '预增'
    this.net_profit_inc_low_limit = -100000
    this.net_profit_inc_high_limit = 100000
    this.day_range_value = 30
    this.chart1 = echarts.init(document.getElementById('chart1'))
    this.chart2 = echarts.init(document.getElementById('chart2'))
    window.addEventListener("resize", () => {
      this.chart1.resize();
      this.chart2.resize();
    })
    this.periods()
  },
  methods: {
    periods(){
      axios.get(this.url,{
        params:{
          'qtype': 'periods'
        }
      }).then((res) =>{
        let data = res['data']
        this.report_period_options = data['periods']
        this.report_period_value = this.report_period_options[0]
        this.click_process()
      })
    },
    click_process() {
      let loadingInstance1 = Loading.service({fullscreen: true});
      axios.get(this.url, {
        params: {
          qtype: 'page1',
          period: this.report_period_value,
          type: this.report_type_value,
          low_limit: this.net_profit_inc_low_limit,
          high_limit: this.net_profit_inc_high_limit,
          days: this.day_range_value,
          market: this.market_value
        }
      }).then((res) => {

        let data = res['data']
        let ts_codes = data['ts_codes']
        let daily_pcr = data['daily_pcr']
        let daily_inc_r = data['daily_inc_r']
        let daily_average_pcr = data['daily_average_pcr']
        let day_num_seq = []
        this.stock_num = data['stock_num']
        let ann_dates = data['ann_date']
        let p_change = data['p_change']
        for (let i = 1; i <= daily_inc_r.length; i++) {
          day_num_seq.push(i)
        }

        this.option1 = {
          title: {left: 'center', text: this.report_period_value + ' | ' + this.report_type_value + '型股票 ['
                + this.net_profit_inc_low_limit +' , '+ this.net_profit_inc_high_limit + ']每日波动涨占比',},
          grid: {left: '5%', right: '2%', bottom: '20%'},
          xAxis: {type: 'category', data: day_num_seq,},
          yAxis: {type: 'value'},
          series: [{data: daily_inc_r, type: 'line'}],
          dataZoom: [{
            type: 'slider', top: '88%', start: 0, end: 100, textStyle: {color: '#8392A5'},
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            dataBackground: {areaStyle: {color: '#8392A5'}, lineStyle: {opacity: 0.8, color: '#8392A5'}},
            handleStyle: {
              color: '#fff', shadowBlur: 3, shadowColor: 'rgba(0, 0, 0, 0.6)', shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }, {show: true, type: 'inside', top: '90%', start: 0, end: 100}],
          tooltip: {show: true, trigger: 'axis', formatter: function (params){
              let dataIndex = params[0]['dataIndex']
              return '涨占比:' + params[0]['data'] + "<br/>"
                  + '有值的股票数量:' + this.stock_num[dataIndex]
            }},
          toolbox:{
            show: true,
            feature:{
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          }
        }

        this.option2 = {
          title: {left: 'center', text: this.report_period_value + ' | ' + this.report_type_value + '型股票 [' +
                + this.net_profit_inc_low_limit +' , '+ this.net_profit_inc_high_limit + ']每日涨跌算术平均值',},
          grid: {left: '5%', right: '2%', bottom: '20%'},
          xAxis: {type: 'category', data: day_num_seq,},
          yAxis: {type: 'value'},
          series: [{data: daily_average_pcr, type: 'line'}],
          dataZoom: [{
            type: 'slider', top: '88%', start: 0, end: 100, textStyle: {color: '#8392A5'},
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            dataBackground: {areaStyle: {color: '#8392A5'}, lineStyle: {opacity: 0.8, color: '#8392A5'}},
            handleStyle: {
              color: '#fff', shadowBlur: 3, shadowColor: 'rgba(0, 0, 0, 0.6)', shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }, {show: true, type: 'inside', top: '90%', start: 0, end: 100}],
          tooltip: {show: true, trigger: 'axis',formatter: (params) => {
              let dataIndex = params[0]['dataIndex']
              return '涨跌幅算术平均值:' + params[0]['data'] + "<br/>"
                  + '有值的股票数量:' + this.stock_num[dataIndex]
            }},
          toolbox:{
            show: true,
            feature:{
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          }
        }

        this.tableData = []
        for (let i = 0; i < daily_pcr.length; i++){
          let tableDict = {}
          tableDict['代码'] = ts_codes[i]
          tableDict['公告日'] = ann_dates[i]
          tableDict['预告涨跌幅'] = p_change[i]
          for (let j =0 ; j < this.day_range_value; j++){
            if (daily_pcr[i][j]){
              tableDict[j+1] = daily_pcr[i][j].toFixed(2)
            }else if (j !== this.day_range_value-1 && daily_pcr[i][j+1]){
              tableDict[j+1] = '0'
            }else{
              tableDict[j+1] = null
            }
          }
          this.tableData.push(tableDict)
        }

        this.chart1.clear()
        this.chart2.clear()
        this.chart1.setOption(this.option1)
        this.chart2.setOption(this.option2)
        this.chart1.group = 'group1';
        this.chart2.group = 'group1';
        echarts.connect('group1');
        loadingInstance1.close()
      })
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (parseInt(columnIndex) >= 3) {
            return (XEUtils.sum(data, column.property) / this.stock_num[columnIndex-3]).toFixed(2)
          }
          return '-'
        })
      ]
    },
    save() {
      const useremail = localStorage.getItem('useremail')
      if (useremail) {
        const search = {
          qtype: 'add',
          period: this.report_period_value,
          market: this.market_value,
          type: this.report_type_value,
          low_limit: this.net_profit_inc_low_limit,
          high_limit: this.net_profit_inc_high_limit,
          email: localStorage.getItem('useremail'),}
        axios.get(this.url, {
          params: search
        }).then((res) => {
          const code = parseInt(res.data['code'])
          if (code === 2) {
            this.showMsgSuccess('添加成功')
          } else if(code === 1) {
            this.showMsgWarning('已存在')
          } else{
            this.showMsgWarning('添加失败')
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
  }
}
</script>

<style scoped>
.Chart {
  width: 100%;
  height: 300px;
  padding-top: 2%;
}
</style>