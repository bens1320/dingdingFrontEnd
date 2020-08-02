<template>
  <div class="navbar-right">
    <ul v-if="auth" class="nav navbar-nav github-login">
      <li>
        <a v-dropdown href="javascript:;">
          {{useremail}}
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <!-- 个人专栏 -->
          <li>
            <router-link :to="`/users/1/edit`">
              <i class="fa fa-list-ul text-md i-middle"></i>
              帮我盯着
            </router-link>
          </li>
          <li><a href="javascript:;" @click="logout"><i class="fa fa-sign-out text-md"></i>退出</a></li>
        </ul>
      </li>
    </ul>
    <div v-else class="nav navbar-nav github-login">
      <router-link to="/auth/login" class="btn btn-default login-btn">
        <i class="fa fa-user"></i> 登 录
      </router-link>
      <router-link to="/auth/register" class="btn btn-default login-btn">
        <i class="fa fa-user-plus"></i> 注 册
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheEntry',
  data(){
    return {
      useremail: ""
    }
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ])
  },
  // 添加 methods 选项，并添加 logout 方法
  methods: {
    getEmail(){
      this.useremail = localStorage.getItem("useremail")
    },
    logout() {
      this.$swal({
        text: '你确定要退出吗?',
        confirmButtonText: '退出'
      }).then((res) => {
        if (res.value) {
          localStorage.setItem("useremail", "")
          this.$store.dispatch('logout')
        }
      })
    }
  },
  mounted() {
    this.getEmail()
  },
  updated() {
    this.getEmail()
  }
}
</script>

<style scoped>

</style>