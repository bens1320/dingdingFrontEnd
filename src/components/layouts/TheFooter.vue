<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-12 col-lg-12 text-center">
          <span v-html="designer"></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'TheFooter',
    data() {
      return {
        designer: `
        <span style="font-size:1.1em">Designed by
          <span style="color: #e27575;font-size: 16px;">❤</span>
          中南大学大数据组
        </span>
      `,
      }
    }
  }
</script>

<style scoped>
  a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>