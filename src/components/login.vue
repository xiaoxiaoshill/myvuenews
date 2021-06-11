<template>
  <div>
      <!-- 走马灯 -->
       
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    
        <!-- ------------------------------------- -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off" ref='fo' name='inp'></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" name='inp' ref='nn'></el-input>
          </el-form-item>
          
      
            <el-button type="primary" @click="submitForm('ruleForm')" name='inp'>登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
         
        </el-form>
        <div class="mima">
          <el-link type="primary" >忘记密码？</el-link>
          <router-link to="/register">没有账号？去注册</router-link>
        </div>
        
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
      var name=(rule, value, callback) =>{
        if(value===''){
          callback(new Error('请输入用户名'));
        }else if(value.length<3||value.length>5){
          callback(new Error('用户名需在3-5位'))
        }else{
          callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          userName: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName:[
            {validator: name, trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let postData=this.$qs.stringify({
          username:this.ruleForm.userName,
          userpassword:this.ruleForm.pass
        })
        this.$refs[formName].validate((valid) => {
          this.$http.defaults.headers = {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
          if (valid) {
           this.$http.post("/user/login",postData).then(res=>{
             if(res.data.ret=="登录成功！"){
               this.$message({
                showClose: true,
                message: res.data.ret,
                type: 'success'
              });
              this.$router.push({path:'/Home/'+res.data.id});
             }else{
               this.$message({
                showClose: true,
                message: res.data.ret,
                type: 'warning'
              });
             }
             
           })
          } else {
            window.console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.$refs.fo.focus();
      /* eslint-disable */
      var that=this;
      /* eslint-disable */
      document.onkeydown=function(e){
        var key=window.event.keyCode;
        if(key==13){
          var a=document.getElementsByName('inp');
              if(a[0]==document.activeElement){
                  that.$refs.nn.focus();
              }else if(a[1]==document.activeElement){
                  a[2].click();
              }
        }
      }
    },
    created() {
      
    },
}
</script>


<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .demo-ruleForm{
    text-align: center;
  }
  .mima{
    text-align: center;
  }
</style>
