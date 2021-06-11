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
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="五位数验证码" prop="vfcode">
            <el-input type="text" v-model="ruleForm.vfcode" autocomplete="off" placeholder="点击注册按钮，验证码将会发至您的邮箱！" maxlength='5'></el-input>
          </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :disabled=ruleForm.disabled>注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form>
        <div class="mima">
          <router-link to="/login">有账号，去登陆！</router-link>
        </div>
        
  </div>
</template>

<script>
export default {
  name: 'register',
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var em=(rule, value,callback)=>{
        var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(value===''){
          callback(new Error('请输入邮箱地址'));
        }else if(!reg.test(value)){
          callback(new Error('请输入正确的邮箱地址'));
        }else{
          callback();
        }
      }
      var code=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入验证码'))
        }else{
          callback();
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          userName: '',
          email:'',
          vfcode:'',
          delayTimer:'',
          disabled:true
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName:[
            {validator: name, trigger:'blur'}
          ],
          email:[
            {validator:em,trigger:'blur'}
          ],
          vfcode:[{validator:code,trigger:'blur'}]
        },
      };
    },
    methods: {
      submitForm(formName) {
        let postData=this.$qs.stringify({
            //要传的参数
            username:this.ruleForm.userName,
            userpassword:this.ruleForm.pass,
            mailbox:this.ruleForm.email,
            vfcode:this.ruleForm.vfcode
        })
        let data=this.$qs.stringify({
            email:this.ruleForm.email
        })
        this.$refs[formName].validate((valid) => {
          this.$http.defaults.headers = {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
          if (valid) {
           this.$http.post("/user/register",postData).then(res=>{
             if(res.data=='注册成功!'){
               this.$message({
                showClose: true,
                message: res.data,
                type: 'success'
              });
             }else{
               this.$message({
                showClose: true,
                message: res.data,
                type: 'warning'
              });
             }
           })
          } else {
              if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.ruleForm.email)){
                // 发送验证码
                this.$notify({
                title: '发送成功',
                message: '验证码已发送！',
                type: 'success',
                position: 'bottom-right'
              });
              this.$http.post('/user/yz',data).then(res=>{
                  window.console.log(res.data);
              })
              }
              this.$message({
                showClose: true,
                message: '请将资料填写完整！',
                type: 'warning'
              });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed: {
      userName:function(){
        return this.ruleForm.userName;
      }
    },
    watch: {
      userName:function(){
        let i = 0;
        if (this.ruleForm.delayTimer) {
            clearInterval(this.ruleForm.delayTimer);
        }
        this.ruleForm.delayTimer = setInterval(() => {
            i++;
            if (i === 20) {
              clearInterval(this.ruleForm.delayTimer);
                //进行用户名验证
                //对数据进行打包处理，方便传入后台
                let postData=this.$qs.stringify({
                  username:this.ruleForm.userName
                })
                //对中文进行处理
                this.$http.defaults.headers = {
                  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                }
                if(this.ruleForm.userName!=''){
                  this.$http.post("/user/selectbyusername",postData).then(res=>{
                  if(!res.data){
                    this.$message({
                    showClose: true,
                    message: '用户名已存在!',
                    type: 'warning'
                  });
                  this.ruleForm.disabled=true;
                  }else{
                    this.ruleForm.disabled=false;
                  }
                })
                }else{
                  this.ruleForm.disabled=true;
                }
                
            }
        }, 100);
      }
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
