<template>
  <div class="homeContainer">
    <div class="carousel-margin">
      <el-carousel height="600px" :interval="10000">
        <el-carousel-item v-for="item in carousels" :key="item">
          <img :src="item" class="carousel-img">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      carousels: [
        require('../../assets/bg1.jpeg'),
        require('../../assets/bg2.jpg'),
      ],
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.homeContainer{
  width: 70%;
  margin: 0 auto;
  min-height: 90vh;
}

.carousel-margin{
  margin: 10px 0;
}

.carousel-img{
  width: 100%;
  height: 100%;
}
</style>
