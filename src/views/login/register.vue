<template>
  <div class="regist-container">
    <el-form :model="ruleForm" :rules="rules" ref="regist" label-width="80px" size="medium">
      <h3>用户注册</h3>
      <el-form-item label="职工号" prop="职工号">
        <el-input v-model="ruleForm.职工号" placeholder="9位数字"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifiCode">
        <el-input v-model="ruleForm.verifiCode" placeholder="输入条形验码" class="identifyInput"></el-input>
        <div @click="refreshCode" class="identify">
          <Identify :identifyCode="identifyCode"></Identify>
        </div>
      </el-form-item>
      <el-form-item label="姓名" prop="姓名">
        <el-input v-model="ruleForm.姓名" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密   码" prop="密码">
        <el-input v-model="ruleForm.密码" placeholder="8位字母、数字组成"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPsw">
        <el-input v-model="ruleForm.confirmPsw" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="用户级别">
        <el-select v-model="ruleForm.权限" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="success" round @click="registUser" class="regist">
        立即注册
      </el-button>
      <el-button type="success" round @click="goback" class="cancel">
        取消
      </el-button>
      <router-link :to="'/login'">
        <el-button type="primary" icon="el-icon-right" circle plain class="arrow-right"></el-button>
      </router-link>
    </el-form>
  </div>
</template>

<script>
import Identify from '@/utils/Identify'
import Link from "@/views/layout/components/Sidebar/Link";
import { register } from '@/api/login'
export default {
  name: "register",
  components: {Link, Identify},
  data() {
    //检查职工号格式
    var checkName = (rule, value, callback) => {
      let reg = /^[0-9]{9}$/;
      if (!reg.exec(value)) {
        callback(new Error('职工号格式错误'));
      } else {
        callback()
      }
    };
    // 检查密码格式
    var checkPsw = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9]{8}$/g;
      if (!reg.exec(value)) {
        callback(new Error('密码格式错误'));
      } else {
        callback()
      }
    };
    // 检查两次密码是否一致
    var checkConfirmPsw = (rule, value, callback) => {
      if (this.ruleForm.密码 !== value) {
        callback(new Error('两次密码不一样'));
      } else {
        callback()
      }
    };
    // 检查验证码
    var checkidentifyCode = (rule, value, callback) => {
      if (this.ruleForm.verifiCode !== this.identifyCode) {
        callback(new Error('验证码不正确'));
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
      },
      identifyCode: '',
      identifyCodes: '1234567890',
      options: [
        '管理员','初审人','复审人'
      ],
      rules: {
        职工号: [
          {required: true, message: '请输入职工号', trigger: 'blur'},
          {validator: checkName, trigger: 'blur'}
        ],
        姓名: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        verifiCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {validator: checkidentifyCode, trigger: 'blur'}
        ],
        密码: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: checkPsw, trigger: 'blur'}
        ],
        confirmPsw: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: checkConfirmPsw, trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  created() {
  },
  methods: {
    goback() {
      this.$router.push({path: '/login'})
    },
    registUser() {
      this.$refs['regist'].validate((valid) => {
        if (valid) {
          this.$confirm("确定提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            register(this.ruleForm).then(response=>{
              alert("注册成功，快去登陆吧");
              this.goback();
            }).catch(() => {
                alert("注册失败，请重试");
              }
            )
          }).catch(() => {
          })
        } else {
          alert("信息有误")
        }
      })
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ]
      }
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.regist-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("../../assets/background/main3.jpg");

  .el-form {
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 15px;
    background-color: #ffffff;
    background-clip: padding-box;
    margin: 120px auto;
    width: 45%;
    height: 350px;
    box-shadow: 0 0 25px #cac6c6;

    h3 {
      font-size: 18px;
      text-align: center;
    }

    .el-form-item {
      margin: 8px 0px;
      float: left;
      width: 50%;

      .el-input {
        width: 60%;
      }

      .identifyInput {
        float: left;
        width: 130px;
      }

      .identify {
        float: left;
      }

      .factorys {
        width: 70%;

        .el-input__inner {
          padding-right: 15px;
          width: 180px !important;
        }

        .el-input__suffix {
          right: -15px;
        }
      }


      .el-form-item__content {
        margin: 0px !important;
      }

      .el-form-item__label {
        font-size: 12px;
        width: 30% !important;
      }

      .el-form-item__error {
        margin-left: 110px !important;
      }
    }

    .regist {
      position: absolute;
      left: 250px;
      bottom: 20px;
    }

    .cancel {
      position: absolute;
      right: 250px;
      bottom: 20px;
    }

    .arrow-right {
      position: absolute;
      left: -25px;
      top: 200px;
      font-size: 20px;
    }
  }

}
</style>
