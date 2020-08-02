<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请登录</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">邮箱</label>
            <input v-model.trim="email" v-validator.required="{ title: '邮箱' }" type="text" class="form-control" placeholder="请填写邮箱">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <br>
          <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
            <i class="fa fa-btn fa-sign-in"></i> 登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      email: '', // 邮箱
      password: '', // 密码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  methods: {
    login(e) {
      setTimeout(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      const user = {
        email: this.email,
        password: this.password,
        action: "login"
      }
      axios.post('http://121.43.179.224:8000/api/users/', user).then((res)=> {
        const code = parseInt(res.data['code'])
        const token = res.data['token']
        if(code === 1000){
            localStorage.setItem("useremail", this.email)
          localStorage.setItem("token", token)
            this.$store.dispatch('login')
          }else if(code === 1001){
            this.showMsg('邮箱或密码错误')
          }
      });
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>

</style>