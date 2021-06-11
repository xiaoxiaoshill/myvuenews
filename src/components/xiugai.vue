<template>
  <div class="xiugai">
      <div id="tou">
			<div class="col-md-3">
				<img :src="my.headportrait" style="width: 200px;height: 200px;margin-left: 30px;margin-top: 30px;"/>
			</div>
			<div style="padding-top: 30px;" class="col-md-9">
				<span style="font-size: 25px;">{{my.username}}</span>
				<el-badge is-dot class="navbar-right"><el-button plain  @click="change">编辑个人信息</el-button></el-badge>
				<hr />
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
				<div style="margin-top: 35px;margin-bottom: 70px;">
					<div>
						所在地区：
						<span>
							{{my.desc}}
						</span>
					</div>
					<div style="margin-top: 15px;">
						个人介绍：
						<span>
							{{my.presentation}}
						</span>
					</div>
				</div>
			</div>
			<hr />
			<div>
			<span style="margin-left: 30px;font-size: 13px;">我创建的表单</span>
			<span class="navbar-right">
				<a href="javascript:void(0)" name='xiugaione' @click="gotochange('xiugaione')"><img src="../assets/img/333.svg" style="width: 20px;height: 20px;"/></a>
				<a href="javascript:void(0)" name='xiugaitwo' @click="gotochange('xiugaitwo')"><img src="../assets/img/222.svg" style="width: 20px;height: 20px;;"/></a>
				<a href="javascript:void(0)" name='xiugaithree' @click="gotochange('xiugaithree')"><img src="../assets/img/111.svg" style="width: 20px;height: 20px;"/></a>
			</span>
			</div>
			<hr />
			<router-view></router-view>
			<hr />
			<div>
			<span style="margin-left: 30px;font-size: 13px;">我收藏的表单</span>
			<span class="navbar-right">
				<a href="javascript:void(0)"><img src="../assets/img/333.svg" style="width: 20px;height: 20px;"/></a>
				<a href="javascript:void(0)"><img src="../assets/img/222.svg" style="width: 20px;height: 20px;;"/></a>
				<a href="javascript:void(0)"><img src="../assets/img/111.svg" style="width: 20px;height: 20px;"/></a>
			</span>
			</div>
			<hr />
			<router-view name='xiu'></router-view>
            </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'xiugai',
   methods: {
      gotochange(name) {
        this.$router.push({path:'/Home/xiugai/'+name});
	  },
	  change() {
		this.$router.push({path:'/Home/'+this.id+'/xiugai/EYourP'});
	  }
	},
	props:['id'],
	data() {
		return {
			my:{
				headportrait:require('@/assets/img/weidenglu.svg'),
				username:'',
				desc:'',
				presentation:''
			}
		}
	},
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
			this.my.presentation=res.data.presentation;
			var siteindex=res.data.site.indexOf(';');
			this.my.desc=res.data.site.substring(0,siteindex)+" "+res.data.site.substring(siteindex+1);
		}
		})
	},
}
</script>


<style scoped>
.navbar-right{
	margin-right: 30px;
}
.xiugai{
	height: 550px;
	overflow-y: scroll;
}
</style>
