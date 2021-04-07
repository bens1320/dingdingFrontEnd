<template>
  <div>
    <a-row>
      <a-col>
<!--        报表报告期-->
        <el-select v-model="report_period_value" filterable>
          <el-option
              v-for="item in report_period_options"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
<!--        报表类型-->
<!--        净利润增长下限-->
<!--        净利润增长上限-->
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "Profit",
  data(){
    return{
      report_type_options: [],
      report_type_value: null,
      report_period_options: [],
      report_period_value: null,
      net_profit_inc_low_limit: null,
      net_profit_inc_high_limit: null,
    }
  }
}
</script>

<style scoped>

</style>