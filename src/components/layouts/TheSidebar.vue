<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">帮我盯着</h3>
      </div>
      <div class="panel-body">
        <Slider :slides="slides" v-slot="{ currentSlide }">
          <a :href="currentSlide.link" target="_blank">
            <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
          </a>
        </Slider>
      </div>
    </div>

    <!-- 活跃用户 -->
<!--    <div class="panel panel-default corner-radius panel-active-users">-->
<!--      <div class="panel-heading text-center">-->
<!--        <h3 class="panel-title">活跃用户</h3>-->
<!--      </div>-->
<!--      <div class="panel-body">-->
<!--        <div class="users-label">-->
<!--          <router-link v-for="(user, index) in activeUsers" :to="`/${user.name}`" :key="index" class="users-label-item">-->
<!--            <img :src="user.avatar" class="avatar-small inline-block">-->
<!--            {{ user.name }}-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <!-- 七天内最热 -->
<!--    <div class="panel panel-default corner-radius panel-hot-topics">-->
<!--      <div class="panel-heading text-center">-->
<!--        <h3 class="panel-title">七天内最热</h3>-->
<!--      </div>-->
<!--      <div class="panel-body">-->
<!--        <ul class="list">-->
<!--          <li v-for="(article, index) in hotArticles">-->
<!--            <router-link :to="`/articles/${article.articleId}/content`">-->
<!--              <span v-if="index === 0">🏆</span>-->
<!--              <span v-else>{{ index + 1 }}.</span>-->
<!--              {{ article.title }}-->
<!--            </router-link>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->

    <!-- 其他内容 -->
    <div class="other">
<!--      <div class="panel panel-default corner-radius sidebar-resources">-->
<!--        <div class="panel-heading text-center">-->
<!--          <h3 class="panel-title">推荐资源</h3>-->
<!--        </div>-->
<!--        <div class="panel-body">-->
<!--          <ul class="list list-group">-->
<!--            <li v-for="(item, index) in resources" class="list-group-item">-->
<!--              <a :href="item.link" target="_blank">-->
<!--                <img class="media-object inline-block " src="https://cdn.learnku.com//uploads/communities/hIZjRRdF8oVYZy69XJnT.png!/both/44x44">-->
<!--                {{ item.title }}-->
<!--              </a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->

      <div class="panel panel-default corner-radius">
        <div class="panel-body text-center">
          <a href="mailto:yu1piao09@163.com" style="color:#a5a5a5">
            <span style="margin-top: 7px;display: inline-block;">
              <i class="fa fa-heart" style="color: rgba(232, 146, 136, 0.89);"></i>
              建议反馈？请私信: <br> 中南大学大数据组
            </span>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TheSidebar',
  data() {
    return {
      slides: [
        {
          title: '帮我盯着: 公司分红',
          img: 'https://cdn.img.wenhairu.com/images/2020/07/11/fBK8g.png',
          link: '/'
        },
        {
          title: '帮我盯着: 股票',
          img: 'https://cdn.img.wenhairu.com/images/2020/07/11/fBK8g.png',
          link: '/'
        },
        {
          title: '帮我盯着: 期货',
          img: 'https://cdn.img.wenhairu.com/images/2020/07/11/fBK8g.png',
          link: '/'
        }
      ],
      activeUsers: [],
      hotArticles: [],
      // 推荐资源
      resources: [
        {
          title: 'Vue 官方教程',
          link: 'https://vuejscaff.com/v2/guide/',
        },
        {
          title: 'Vuex 官方教程',
          link: 'https://vuex.vuejs.org/zh/',
        },
        {
          title: 'Vue Router 官方教程',
          link: 'https://router.vuejs.org/zh-cn/',
        },
        {
          title: 'Vue Loader 官方教程',
          link: 'https://vue-loader.vuejs.org/zh-cn/',
        },
        {
          title: 'Vue 特有代码的风格指南',
          link: 'https://vuejscaff.com/v2/style-guide/',
        }
      ]
    }
  },
  created() {
    this.$axios.get('/users/active').then((response) => {
      this.activeUsers = response.data
    })

    // 通过 axios 执行 POST 请求来返回七天内最热文章，可以传递 num 来指定返回条数
    this.$axios.post('/articles/hot', { num: 10 }).then((response) => {
      this.hotArticles = response.data
    })
  }
}
</script>

<style scoped>
.carousel-inner img {display:block;margin:auto;line-height:1;width:70%;border:1px solid #ddd;box-shadow:0 0 10px #ccc;-moz-box-shadow:0 0 10px #ccc;-webkit-box-shadow:0 0 10px #ccc;}
</style>