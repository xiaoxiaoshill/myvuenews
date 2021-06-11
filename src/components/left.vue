<template>
  <div class="left">
    <div class="left-top">
    <!-- 1 -->
      <p style="font-size: 12px;margin-left: 12px;margin-bottom: 15px;">推荐</p>
      <div v-for="(item, index) in items" :key='index'>
        <p style="font-size: 12px;margin-left: 8px;margin-bottom: 15px;" v-if="index==5">我的音乐</p>
				<div class="d" @click="change(index)" :class="{active:index==isshow}">
          <a href="javascript:void(0)" style="text-decoration: none;">{{item}}</a>
        </div>
			</div>
    <!-- 2 -->
      
				
    <!-- 3 -->
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="创建的歌单" name="1">
          <div class="d"><a href="javascript:void(0)" style="text-decoration: none;">我喜欢的音乐</a></div>
        </el-collapse-item>
      </el-collapse>
    <!-- 4 -->
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="收藏的歌单" name="1">
          
        </el-collapse-item>
      </el-collapse>
    </div>
    <a href="javascript:void(0)" style="text-decoration: none;">
      <div id="photo">
        <div>
          <img src="../assets/img/img1.jpg" alt="123" id="img">
        </div>
        <div id="text">
          <p>被驯服的象</p>
          <p>蔡健雅</p>
        </div>
      </div>
      </a>
  </div>
</template>

<script>

export default {
  name: 'left',
  data() {
    return {
      activeNames: ['1'],
      items:['发现音乐','私人FM','Look直播','视频','朋友','本地音乐','下载管理','我的音乐云盘','我的收藏'],
      isshow:-1
    }
  },
  methods: {
    handleChange(val) {
        window.console.log(val);
      },
    change(index){
      this.isshow=index;
    }
  },
}
</script>


<style scoped>
.d{
				padding-left: 25px;
				margin-bottom: 15px;
        color: gray;
        line-height: 40px;
			}
.left{
  height: 550px;
 
  overflow-x: hidden;
}
a{
  color: gray;
}
a:hover{
  color: black;
}
.active{
  background-color: gainsboro;
  border-left: 2px solid red;
}
#img{
				width: 90px;
				height: 90px;
				margin-top: 5px;
				margin-left: 5px;
			}
			#photo{
				display: flex;
				flex-wrap: wrap;
				border: 1px solid gainsboro;
				width: 200px;
				height: 100px;
			}
			#text{
				margin-left: 10px;
        margin-top: 20px;
			}
      .left-top{
        overflow-y: scroll;
        height: 450px;
      }
</style>
