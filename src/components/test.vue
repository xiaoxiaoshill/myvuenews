<template>
   <div id="demo">  
     <div style="padding:20px;"> 
        <div style="margin-top:20px;text-align: left;">  
          <input type="file" id="change" accept="image" @change="change">  
        </div>  
    </div> 
    <!-- 遮罩层 -->  
    <div class="container" v-show="panel">  
        <div style="height:200px;width:200px;">  
            <img id="image" :src="url" alt="Picture">  
        </div>  
        <div>
        </div>
    </div>  
    <img src= "http://127.0.0.1:8081/img/1575988303126IMG_2019121050.jpeg"  alt="logo"> 
  </div>  
</template>

<script>

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css'
export default {
  name: 'HelloWorld',
  data() {
    return {
      picValue: "",
      cropper: "",
      panel: false,
      url: "",
      imgCropperData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
    };
  },
 mounted() {
    //初始化这个裁剪框
    var image = document.getElementById("image");
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
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
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let type = files[0].type; //文件的类型，判断是否是图片
      let size = files[0].size; //文件的大小，判断图片的大小
      if (this.imgCropperData.accept.indexOf(type) == -1) {
        alert("请选择我们支持的图片格式！");
        return false;
      }
      if (size > 5242880) {
        alert("请选择5M以内的图片！");
        return false;
      }
      this.picValue = files[0];
      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
      this.panel = true;
    }
  }
}
</script>


<style scoped>

</style>
