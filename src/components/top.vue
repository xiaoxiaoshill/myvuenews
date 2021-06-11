<template>
  <div>
      <nav class="navbar navbar-default" style="background-color: #e60026">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="javascript:void(0)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle"></use>
          </svg>
          </a>
          <a href="javascript:void(0)" class="navbar-brand" style="color: white">网云音乐</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <div>
          <a class="navbar-brand" href="javascript:void(0)" style="color:white" @click="go(-1)">
            <i class="el-icon-arrow-left"></i>
          </a>
          <a class="navbar-brand" href="javascript:void(0)" style="color:white" @click="go(1)">
            <i class="el-icon-arrow-right"></i>
          </a>
          </div>
          <a class="navbar-brand navbar-right" href="javascript:void(0)" style="color:white">
            <img src="../assets/img/shezhi.svg" class="icon">
          </a>
          <a class="navbar-brand navbar-right" href="javascript:void(0)" style="color:white">
            <img src="../assets/img/youjian.svg" class="icon">
          </a>
          <a class="navbar-brand navbar-right" href="javascript:void(0)" style="color:white">
            <img src="../assets/img/pifu.svg" class="icon">
          </a>
          <a class="navbar-brand navbar-right" href="javascript:void(0)" style="color:white;font-size: 10px;">
            开通VIP
          </a>
          <el-popover width="300" trigger="click">
            <!-- 弹出框显示内容 -->
            <div style="margin-left: 15px;margin-top: 20px;">
			<div style="display: inline-block;"> 
        <a href="javascript:void(0)" @click="goxiugai">  
				<img :src="my.headportrait" style="width: 40px;height: 40px;border-radius: 50%;">
        </a> 
			</div>
			<div style="line-height: 40px;display: inline-block;margin-left: 10px;">
        <a href="javascript:void(0)" style="color: black;text-decoration:none" @click="goxiugai">
				{{my.username}}
        </a>
			</div>
			<div style="display: inline-block;float: right;margin-right: 20px;">
				<el-button plain @click="clkchanger">{{signin}}</el-button>
			</div>
		</div>
		<div style="margin-left: 35px;margin-top: 20px;">
		<div style="display: inline-block;padding-right: 35px;border-right: 1px solid gainsboro;">
					<span style="font-size: 25px;">
						0
					</span>
				<div>
					动态
				</div>
				</div>
				<div style="display: inline-block;padding-left: 10px;padding-right: 35px;border-right: 1px solid gainsboro;">
					<span style="font-size: 25px;">
						6
					</span>
					<div>
					关注
					</div>
				</div>
				<div style="display: inline-block;padding-left: 10px;">
					<span style="font-size: 25px;">
						2
					</span>
					<div>
					粉丝
					</div>
				</div>
		</div>
		<hr />
		<div style="padding-left: 15px;">
			<div style="display: inline-block;">
				<img src="../assets/img/huiyuanzhongxin.svg" style="width: 2em;height: 2em;"/>
			</div>
			<div style="line-height: 40px;display: inline-block;margin-left: 10px;">
				会员中心
			</div>
			<div style="line-height: 40px;display: inline-block;float: right;margin-right: 20px;">
				未订购
			</div>
		</div>
		<div style="padding-left: 15px;">
			<div style="display: inline-block;">
				<img src="../assets/img/dengji.svg" style="width: 2em;height: 2em;"/>
			</div>
			<div style="line-height: 40px;display: inline-block;margin-left: 10px;">
				等级
			</div>
			<div style="line-height: 40px;display: inline-block;float: right;margin-right: 20px;">
				Lv.7
			</div>
		</div>
		<div style="padding-left: 15px;border-bottom: gainsboro solid 1px;">
			<div style="display: inline-block;">
				<img src="../assets/img/gouwuche.svg" style="width: 2em;height: 2em;"/>
			</div>
			<div style="line-height: 40px;display: inline-block;margin-left: 10px;">
				商场
			</div>
		</div>
		<div style="padding-left: 15px;">
			<div style="display: inline-block;">
				<img src="../assets/img/shezhi.svg" style="width: 2em;height: 2em;"/>
			</div>
			<div style="line-height: 40px;display: inline-block;margin-left: 10px;">
        <a href="javascript:void(0)" style="color: black;text-decoration:none;" @click="change">个人信息设置</a>
			</div>
		</div>
		<div style="padding-left: 15px;border-bottom: gainsboro solid 1px;">
			<div style="display: inline-block;">
				<img src="../assets/img/bagnding.svg" style="width: 2em;height: 2em;"/>
			</div>
			<div style="line-height: 40px;display: inline-block;margin-left: 10px;">
				绑定社交账号
			</div>
			<div style="line-height: 40px;display: inline-block;float: right;margin-right: 20px;">
				QQor微信
			</div>
		</div>
		<div style="padding-left: 15px;">
			<div style="display: inline-block;">
				<img src="../assets/img/tuichu.svg" style="width: 2em;height: 2em;"/>
			</div>
			<div style="line-height: 40px;display: inline-block;margin-left: 10px;">
				退出登录
			</div>
		</div>
            <a class="navbar-brand navbar-right" href="javascript:void(0)" style="color:white;font-size: 10px;margin-right:5px;" slot="reference">
            {{my.username}}
            </a>
          </el-popover>
          <a class="navbar-brand navbar-right" href="javascript:void(0)" style="color:white;font-size: 10px;" @click="goxiugai">
            <el-badge is-dot><img :src="my.headportrait" class="headerP" :title="my.username"></el-badge>
          </a>
          <form class="navbar-form">
            <el-input placeholder="搜索音乐,歌词,视频,电台" suffix-icon="el-icon-search" style="width: 200px;" size='small'></el-input>
          </form>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'top',
  methods: {
    goxiugai(){
      this.$router.push({path:'/Home/'+this.id+'/xiugai'});
    },
    go(index){
      this.$router.go(index);
    },
    clkchanger(){
      this.signin='已签到';
      this.$message({
          message: '签到成功!已增加2积分!',
          type: 'success'
        });
    },
    change(){
      this.$router.push({path:'/Home/'+this.id+'/xiugai/EYourP'});
    }
  },
  data() {
    return {
      signin:'签到',
      flag:'',
      my:{
        headportrait:require('@/assets/img/weidenglu.svg'),
        username:'未登录'
      }
    }
  },
  props:['id'],
  mounted() {
    let postData=this.$qs.stringify({
      userid:this.id
    })
    this.$http.defaults.headers = {
                  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                }
    this.$http.post("/user/selectByPrimaryKey",postData).then(res=>{
      if(res.data){
        this.my.headportrait="http://localhost:8080/myfirstssm/user/getImage?"+new Date().getTime();
        this.my.username=res.data.username;
      }
    })
  },
}
</script>


<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
   
}
.headerP{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
