<template>
  <div class="Home">
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="tuijian"></el-tab-pane>
      <el-tab-pane label="歌单" name="gedan"></el-tab-pane>
      <el-tab-pane label="主播电台" name="diantai"></el-tab-pane>
      <el-tab-pane label="排行榜" name="Ranking"></el-tab-pane>
      <el-tab-pane label="歌手" name="singer"></el-tab-pane>
      <el-tab-pane label="最新音乐" name="newest"></el-tab-pane>
    </el-tabs>
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeName: 'tuijian'
    }
  },
  methods: {
      handleClick() {
        this.$router.push({ path: '/Home/'+this.id+'/'+this.activeName });
      }
    },
  props:['id'],
  mounted() {
    
  },
}
</script>


<style scoped>
.Home{
  overflow-y: scroll;
  height: 550px;
  overflow-x: hidden;
}
</style>
