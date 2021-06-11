<template>
  <div class="row">
      <div style="margin-left: 30px;margin-top: 30px;font-size: 20px;font-weight: bold;">编辑个人信息</div>
	<hr width="96%"/>
  <div class="col-md-9">
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="昵称">
    <el-col :span='12'>
    <el-input v-model="form.name"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="介绍">
    <el-col :span='12'>
    <el-input type="textarea" v-model="form.desc" :rows='3' maxlength="300" show-word-limit></el-input>
    </el-col>
  </el-form-item>
   <el-form-item label="性别">    
    <el-radio-group v-model="form.radio">
      <el-radio label="保密"></el-radio>
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="年龄">
    <el-select v-model="formInline.year" @change="age(1)">
      <el-option :label=item :value=item v-for="(item,index) in form.list" :key="index"></el-option>
    </el-select>
    <el-select v-model="formInline.month" style="margin-left:30px;" @change="age(2)">
      <el-option :label=item :value=item v-for="(item,index) in form.monthlist" :key="index"></el-option>
    </el-select>
    <el-select v-model="formInline.day" style="margin-left:30px;">
      <el-option :label=item :value=item v-for="(item,index) in form.daylist" :key="index" v-show="index<form.daymax"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="地区">
    <el-select v-model="region.province" @change="change">
      <el-option :label=item.province :value=item.province v-for="(item,index) in region.regionlist" :key="index"></el-option>
    </el-select>
    <el-select v-model="region.district" style="margin-left:30px;">
      <el-option :label=item :value=item v-for="(item,index) in region.regionlist[region.index].district" :key="index"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" :disabled=form.disabled @click="save">保存</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
  <div class="col-md-3">
    <img :src="my.headportrait" style="width: 200px;height: 200px;"/>
    <div class="button" style="margin-left:60px;margin-top:20px;">
    <el-button plain size='small' @click="upload">修改头像</el-button>
    <input type="file" id="file" accept="image" @change="filechange" style="display:none;">
    </div>
  </div>
  <!-- 头像上传及其预览 -->
   <!--整体-->
		<div id="full" style="width: 500px;border: gainsboro solid 1px;box-shadow: 0 2px 20px 0 rgba(0,0,0,0.15);position: fixed;left: 30%;top: 10%;" v-show="file.panel">
			<div class="top" style="line-height: 50px;border-bottom: gainsboro solid 1px;background-color: whitesmoke;">
				<span style="margin-left: 15px;font-weight: bold;">上传头像</span>
				<a href="javascript:void(0)"  @click="close" id="close"><span style="float: right;margin-right: 15px;">X</span></a>
			</div>
			<!--图片放置区-->
				<!--上传的图片放置区-->
				<div class="box" style="display: flex;justify-content: space-around;padding-top: 20px;border-bottom: gainsboro solid 1px;padding-bottom: 20px;background-color: whitesmoke;">
					<div class="item" style="margin-top: 15px;">
						<div class="img-mybox" style="height: 200px;width: 200px;">
                            <img id="image" :src="file.url" alt="Picture">
						</div>
					</div>
					<div class="item">
						<!--裁剪框大尺寸图片放置区-->
						<div class="before" style="width: 170px;height: 170px;">
							
						</div>
						<div style="font-size: small;line-height: 30px;color: gray;">大尺寸封面</div>
						<!--裁剪图片小尺寸图片放置区-->
						<div class="before" style="width: 30px;height: 30px;">
							
						</div>
						<div style="font-size: small;line-height: 30px;color: gray;">小尺寸封面</div>
					</div>
				</div>
				<!--确认和取消键-->
				<div class="btn" style="display: flex;justify-content: center;padding-top: 10px;padding-bottom: 10px;background-color: whitesmoke;">
          <el-button plain style="margin-right: 10px;">重新选择</el-button>
          <el-button type="primary" style="margin-left: 10px;" @click="crop">保存并关闭</el-button>
				</div>
		</div>
    <!-- canvas部分 -->
    <img :src="file.curl" alt="" id="imga" style="display:block;">
    <!-- 此部分为canvas图片 -->
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import 'cropperjs/dist/cropper.js'
export default {
  inject:['reload'],//依赖注入
  name: 'EYourP',
   data() {
      return {
        form: {
          name: '',
          radio:'',
          desc: '',
          list:[],
          years:1920,
          monthlist:[],
          daylist:[],
          month:1,
          day:1,
          flag:'',
          daymax:'',
          mlist:[1,3,5,7,8,10,12],
          countflag:true,
          firstval:'',
          disabled:true
        },
        formInline: {
          year: '',
          month:'',
          day:''
        },
        region:{
          province:'',
          district:'',
          regionlist:[
            {province:'广州',district:['越秀区','海珠区','荔湾区','天河区','白云区','黄埔区','南沙区','番禺区','花都区','增城区','从化区']},
            {province:'上海',district:['黄浦区','静安区','徐汇区','长宁区','杨浦区','虹口区','普陀区','浦东新区','宝山区','嘉定区','闵行区','松江区','青浦区','奉贤区','金山区','崇明县区']},
            {province:'深圳',district:['罗湖区','福田区','南山区','盐田区','龙岗区','宝安区','光明新区','坪山新区','龙华新区','大鹏新区']},
            {province:'海口',district:['龙华区','秀英区','美兰区','琼山区']},
            {province:'濮阳',district:['濮阳县','清丰县','南乐县','范县','台前县华龙区','高新技术开发区']},
            {province:'湘潭',district:['雨湖区','岳塘区','湘乡市','韶山市','湘潭县']}
          ],
          index:0
        },
        file:{
            picValue: "",
            cropper: "",
            panel: false,
            url: "",
            imgCropperData: {
                accept: "image/gif, image/jpeg, image/png, image/jpg"
            },
            curl:'',
            headerImage:''
        },
        my:{
          headportrait:require('@/assets/img/weidenglu.svg')
        },
      }
    },
    props:['id'],
    methods: {
      age(index){
          // window.console.log(index);
          //判断年份是否为闰年
          switch(index){
            case 1:
              var newyear=parseInt(this.formInline.year.substring(0,this.formInline.year.length-1));
              if(newyear%100==0){
                if(newyear%400==0){
                  this.form.flag=true;
                }else{
                  this.form.flag=false;
                }
              }else{
                if(newyear%4==0){
                  this.form.flag=true;
                }else{
                  this.form.flag=false;
                }
              }
              this.formInline.month='1月';
              this.formInline.day='1日';
            break;
            //判断月份从而判断这个月有多少天
            case 2:
              var newmonth=parseInt(this.formInline.month.substring(0,this.formInline.month.length-1));
              for(var i=0;i<this.form.mlist.length;i++){
                if(newmonth==this.form.mlist[i]){
                  this.form.daymax=31;
                  break;
                }else{
                  if(newmonth==2&&this.form.flag==true){
                    this.form.daymax=29;
                    break;
                  }else if(newmonth==2&&this.form.flag==false){
                    this.form.daymax=28;
                    break;
                  }else{
                    this.form.daymax=30;
                  }
                }
              }
              // window.console.log(this.form.daymax);
              this.formInline.day='1日';
          }
          
          // window.console.log(this.form.daymax);
      },
      change(){
        for(var j=0;j<this.region.regionlist.length;j++){
        if(this.region.province==this.region.regionlist[j].province){
          this.region.index=j;
          this.region.district=this.region.regionlist[j].district[0];
          break;
        }
      }
      },
      save(){
        //处理年龄和地区
        var year=this.formInline.year.substring(0,this.formInline.year.length-1);
        var month=this.formInline.month.substring(0,this.formInline.month.length-1);
        var day=this.formInline.day.substring(0,this.formInline.day.length-1);
        var age=year+'-'+month+'-'+day;
        var site=this.region.province+';'+this.region.district;
        window.console.log(age);
        let postData=this.$qs.stringify({
          username:this.form.name,
          presentation:this.form.desc,
          sex:this.form.radio,
          age:age,
          site:site,
          userid:this.id
        })
        this.$http.defaults.headers = {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        this.$http.post("/user/updatebyid",postData).then(res=>{
              window.console.log(res);
        })
        // window.console.log('保存成功！');
        this.form.disabled=true;
        this.reload();
        //重新赋值，否则会导致保存键混乱
        this.form.firstval=this.form.name+';'+this.form.desc+';'+this.form.radio+';'+this.formInline.year+';'+this.formInline.month+';'+this.formInline.day+';'+this.region.province+';'+this.region.district;
      },
      upload(){
        //将修改头像按钮绑定file
        var file=document.getElementById('file');
        file.click();
        // eslint-disable-line no-unused-vars
        // var f=new FormData(file);
        // this.$http.post("/user/uplode",f).then(res=>{
        //   window.console.log(res);
        // })
      },
      //创建url路径
        getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
        },
        //input框change事件，获取到上传的文件
        filechange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let type = files[0].type; //文件的类型，判断是否是图片
        let size = files[0].size; //文件的大小，判断图片的大小
        if (this.file.imgCropperData.accept.indexOf(type) == -1) {
            alert("请选择我们支持的图片格式！");
            return false;
        }
        if (size > 5242880) {
            alert("请选择5M以内的图片！");
            return false;
        }
        this.file.picValue = files[0];
        this.file.url = this.getObjectURL(this.file.picValue);
        //每次替换图片要重新得到新的url
        if (this.file.cropper) {
            this.file.cropper.replace(this.file.url);
        }
        this.file.panel = true;
        },
        close(){
          this.file.panel = false;
          //将file重新赋值为空
          var f=document.getElementById('file');
          f.value='';
        },
        crop(){
          this.file.panel = false;//关闭头像
          var croppedCanvas;
          var roundedCanvas;
          //Crop
          croppedCanvas = this.file.cropper.getCroppedCanvas();
          // window.console.log(this.file.cropper);
          //Round
          roundedCanvas = this.getRoundedCanvas(croppedCanvas);
          this.file.headerImage = roundedCanvas.toDataURL();
          // window.console.log(this.file.headerImage);
          //将file重新赋值为空
          var f=document.getElementById('file');
          f.value='';
          //进行头像的上传
          var date = new Date();
          var formData = new FormData();
          formData.append('file',this.dataURLtoBlob(this.file.headerImage),'IMG_'+date .getFullYear()+(date .getMonth()+1)+date .getDate()+Math.ceil(Math.random()*100)+'.jpeg');
          formData.append('userid',this.id);
           //对中文进行处理
            this.$http.defaults.headers = {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
            this.isifshow=false;
            this.$http.post("/user/uplode",formData).then(res=>{
              if(res){
                //如果上传成功，则将base64图片放入头像
                // this.my.headportrait=this.file.headerImage;
                this.reload()
              }
            })
        },
         getRoundedCanvas (sourceCanvas) {

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;//设置图片是否平滑
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.fill();

        return canvas;
      },
      //再次写一个方法，将base64格式图片转换为文件形式
      dataURLtoBlob(dataurl){
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr =atob(arr[1]);    
        var n = bstr.length;     
        var u8arr =new Uint8Array(n); 
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime });
      }
    },
    mounted() {
      var d=new Date();
      while(this.form.years<=d.getFullYear()){
        this.form.list.push(this.form.years+"年");
        this.form.years=this.form.years+1;
      }
      while(this.form.month<=12){
        this.form.monthlist.push(this.form.month+"月");
        this.form.month=this.form.month+1;
      }
      var y=this.formInline.year.substring(0,this.formInline.year.length-1);
      var yy=parseInt(y);
      // window.console.log(yy);
      var m=this.formInline.month.substring(0,this.formInline.month.length-1);
      var mm=parseInt(m);
      // window.console.log(mm);
      //判断是平年还是闰年
      if(yy%100==0){
        if(yy%400==0){
          this.form.flag=true;
        }else{
          this.form.flag=false;
        }
      }else{
        if(yy%4==0){
          this.form.flag=true;
        }else{
          this.form.flag=false;
        }
      }
      // window.console.log(this.form.flag);
      //判断是几月份
      for(var i=0;i<this.form.mlist.length;i++){
        if(mm==this.form.mlist[i]||isNaN(mm)){
          this.form.daymax=31;
          break;
        }else{
          if(mm==2&&this.form.flag==true){
            this.form.daymax=29;
            break;
          }else if(mm==2&&this.form.flag==false){
            this.form.daymax=28;  
            break;
          }else{
            this.form.daymax=30;
          }
        }
      }
      // window.console.log(this.form.daymax);
      while(this.form.day<=31){
        this.form.daylist.push(this.form.day+"日");
        this.form.day=this.form.day+1;
      }
      //对地区进行处理
      for(var j=0;j<this.region.regionlist.length;j++){
        if(this.region.province==this.region.regionlist[j].province){
          this.region.index=j;
          break;
        }
      }
      // window.console.log(encodeURIComponent(this.region.province)+';'+encodeURIComponent(this.region.regionlist[0].province));
      // window.console.log(typeof(this.region.province)+';'+typeof(this.region.regionlist[0].province));
      //根据用户id查找用户基本信息
      let postData=this.$qs.stringify({
        userid:this.id
      })
      this.$http.defaults.headers = {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
      this.$http.post("/user/selectByPrimaryKey",postData).then(res=>{
        this.form.name=res.data.username;
        this.form.desc=res.data.presentation;
        this.form.radio=res.data.sex;
        //对年龄进行处理,类型date
        var age=res.data.age+"";
        var start=age.indexOf('-');
        var end=age.lastIndexOf('-');
        if(start>=0){
          this.formInline.year=age.substring(0,start)+'年';
          this.formInline.month=age.substring(start+1,end)+'月';
          this.formInline.day=age.substring(end+1)+'日';
          // window.console.log('年龄存在！');
        }
        //对地区进行处理
        var siteindex=res.data.site.indexOf(';');
        if(siteindex>=0){
          this.region.province=res.data.site.substring(0,siteindex);
          this.region.district=res.data.site.substring(siteindex+1);
          // window.console.log('地区存在！');
        }
        //对头像进行处理
        if(res.data){
            this.my.headportrait="http://localhost:8080/myfirstssm/user/getImage?"+new Date().getTime();
          }
      })
      //初始化这个裁剪框
        var image = document.getElementById("image");
        this.file.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'crop',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 1,
        zoomOnWheel: false,
        guides:false,
        center:false
        });
    },
    computed: {
      now:function(){
        return this.form.name+';'+this.form.desc+';'+this.form.radio+';'+this.formInline.year+';'+this.formInline.month+';'+this.formInline.day+';'+this.region.province+';'+this.region.district;
      },
    },
    watch: {
      now:function(val){
        if(this.form.countflag){
          this.form.firstval=val;
          this.form.countflag=false;
        }
        if(val==this.form.firstval){
          this.form.disabled=true;
        }else{
          this.form.disabled=false;
        }
      }
    },
}
</script>


<style scoped>
.before{
overflow: hidden;
}
#close{
				color: gray;
}
#close:hover{
				color: black;
				transition: 1s;
}
</style>
