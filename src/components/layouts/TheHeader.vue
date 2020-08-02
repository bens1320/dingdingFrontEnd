<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <router-link to="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </router-link>
      </div>

      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <li v-for="(item, index) in navList" :class="{ active: index === activeNavIndex }">
            <a href="/">{{ item }}</a>
          </li>
        </ul>
        <!-- 入口组件 -->
        <div class="navbar-right">
          <TheEntry/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheEntry from '@/components/layouts/TheEntry'

export default {
  name: 'TheHeader',
  components: {
    TheEntry,
  },
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}images/2020/07/11/fBCXj.png`,
        title: '帮我盯着'
      },
      navList: ['首页'],
      activeNavIndex: 0,
      showCollapsedNav: false
    }
  },
  beforeCreate() {
    this.uploadsUrl = 'https://images.weserv.nl/?url=img.wenhairu.com/'
  },
  methods: {
    // changeNavIndex(index) {
    //   this.activeNavIndex = index
    // },
    toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav
    }
  }
}
</script>

<style scoped>
.title { display: none;}
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>