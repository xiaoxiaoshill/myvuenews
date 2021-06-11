<template>
  <div>
      <!--整体-->
		<div id="full" style="width: 500px;border: gainsboro solid 1px;box-shadow: 0 2px 20px 0 rgba(0,0,0,0.13);position: fixed;left: 30%;top: 10%;" v-show="file.panel">
			<div class="top" style="line-height: 50px;border-bottom: gainsboro solid 1px;">
				<span style="margin-left: 15px;font-weight: bold;">上传头像</span>
				<a href="javascript:void(0)"  id="close"><span style="float: right;margin-right: 15px;">X</span></a>
			</div>
			<!--图片放置区-->
				<!--上传的图片放置区-->
				<div class="box" style="display: flex;justify-content: space-around;padding-top: 20px;border-bottom: gainsboro solid 1px;padding-bottom: 20px;">
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
					<button style="margin-right: 10px;">重新选择</button>
					<button style="margin-left: 10px;">保存并关闭</button>
				</div>
		</div>
        <input type="file" id="change" accept="image" @change="filechange" style="display:none;">
        <button @click="xiugai">修改头像</button>
        <img :src="file.curl" alt="">
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import 'cropperjs/dist/cropper.js'
export default {
  name: 'tests',
  data() {
      return {
        file:{
            picValue: "",
            cropper: "",
            panel: false,
            url: "",
            imgCropperData: {
                accept: "image/gif, image/jpeg, image/png, image/jpg"
            },
            curl:""
        }
      }
  },
  mounted() {
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
  methods: {
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
        xiugai(){
            document.getElementById('change').click();
        }
  },
}
</script>


<style scoped>
.before{
overflow: hidden;
}
</style>
