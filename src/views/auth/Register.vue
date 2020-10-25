<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <!-- 消息组件 -->
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">邮箱</label>
            <input v-model.trim="email" v-validator:input.required="{ regex: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, error: '邮箱不合法' }" type="text" class="form-control" placeholder="请填写邮箱">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
          </div>
          <div class="form-group">
            <label class="control-label">图片验证码</label>
            <input v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" type="text" class="form-control" placeholder="请填写验证码">
          </div>
          <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
            <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '', // 验证码模板
      email: '', // 邮箱
      password: '', // 密码
      cpassword: '', // 确认密码
      captcha: '', // 验证码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      const { tpl, captcha } = createCaptcha(4)
      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
    register(e) {
      setTimeout(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement
        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      if (this.captcha.toUpperCase() !== this.localCaptcha) {
        this.showMsg('验证码不正确')
        this.getCaptcha()
      } else {
        const user = {
          email: this.email,
          password: this.password,
          action: "register"
          // avatar: `https://api.adorable.io/avatars/200/${this.email}.png`
        }
        axios.post('http://127.0.0.1:8000/api/users/', user).then((res)=> {
          const code = parseInt(res.data['code'])
          if(code === 1000){
            this.login(user)
          }else if(code === 1004){
            this.showMsg('邮箱已存在')
          }
        });
      }
    },
    login(user) {
      localStorage.setItem("useremail", this.email)
      this.$store.dispatch('login', user)
      this.showMsg('注册成功', 'success')
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
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>