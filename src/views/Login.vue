<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Login } from '../api/request'

export default {
  data () {
    return {
      param: {
        username: 'root1',
        password: '123456789'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名必须在3到10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 15,
          message: '密码必须在5到15个字符之间',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.login.validate(valid => {
        if (valid) {
          Login(this.param).then(res => {
            // console.log(res)
            if (res.status === 200) {
              this.$message.success('登录成功')
              sessionStorage.clear()
              sessionStorage.setItem('ms_username', this.param.username)
              sessionStorage.setItem('token', res.data.token)
              this.$router.push('/index')
            }
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message.error('请输入正确的账号和密码')
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/hzau.png);
    background-size: 100%;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

</style>
