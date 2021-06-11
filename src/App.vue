<template>
  <div id="app" style="margin: 0;padding: 0;" v-if="isRouterAlive">
    <el-container>
  <el-header style="padding:0;"><router-view name='top'></router-view></el-header>
  <el-container>
    <el-aside width="200px"><router-view name='left'></router-view></el-aside>
    <el-main class="main"><router-view name='Home' style="overflow-x: hidden;"></router-view></el-main>
  </el-container>
  </el-container>
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  },
  mounted() {
    //进入之前请求服务器，进行cookie验证，从而进行自动登录
    // this.$http.post("/user/login");
  },
}

</script>

<style>
.main{
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
</style>
