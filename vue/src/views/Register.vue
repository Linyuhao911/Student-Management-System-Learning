<template>
  <div class="login-container">
    <!-- 左侧区域 -->
    <div class="left-section">
      <h1 class="title">史上最简单脚手架</h1>
      <p class="description">一款由 Spring Boot + Vue + Mybatis Plus 开发的前后端分离脚手架。</p>
      <p class="descr">多角色登录，前后台界面，史上最简单最方便最易学的后台管理系统！</p>
      <img src="../assets/login.svg" alt="登录插画" class="illustration" />
    </div>
    <!-- 右侧区域 -->
    <div class="right-section">
      <h1 class="welcome-title">欢迎注册</h1>
      <div class="login-type-wrapper">
        <p class="login-type">账号密码注册</p>
      </div>
      <el-form :model="user" :rules="rules" ref="registerRef" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="user.username" size="medium" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" size="medium" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请确认密码" v-model="user.confirmPass"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="user.role" size="medium" placeholder="请选择角色" style="width: 100%">
            <el-option label="用户" value="USER"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="login-btn" @click="register" style="background-color: darkseagreen">注 册</el-button>
        </el-form-item>

        <div class="links">
          <div style="margin-left: 10px"><a href="/login">返回登录</a></div>

        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, confirmPass, callback) => {
      if (confirmPass === '') {
        callback(new Error('请确认密码'))
      } else if (confirmPass !== this.user.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '',
        password: '',
        confirmPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        confirmPass: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    register() {
      this.$refs['registerRef'].validate((valid) => {
        if (valid) {
          // 验证通过
          this.$request.post('/register', this.user).then(res => {
            if (res.code === '200') {
              this.$router.push('/login')
              this.$notify.success({title: '成功', message: '注册成功', showClose: false, duration: 2000});
            } else {
              this.$notify.error({message: res.msg, showClose: false, duration: 2000});
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
/* 登录页面整体容器：左右分区布局 */
.login-container {
  display: flex;              /* 启用弹性布局，实现左右分栏 */
  height: 100vh;              /* 高度占满整个视口高度 */
}

/* 左侧介绍区域（深色背景） */
.left-section {
  flex: 6;                    /* 占6份宽度，左侧更宽 */
  background-color: #1f2937;  /* 深灰蓝背景色 */
  color: #fff;                /* 白色文字 */
  display: flex;              /* 弹性布局 */
  flex-direction: column;     /* 子元素垂直排列 */
  align-items: center;        /* 水平居中 */
  justify-content: center;    /* 垂直居中 */
  padding: 20px;              /* 内边距20px */
}

/* 左侧主标题 */
.title {
  font-size: 40px;            /* 字号24px */
  font-weight: bold;          /* 加粗显示 */
  margin-bottom: 20px;        /* 底部外边距10px */
}

/* 左侧描述文字 */
.description {
  font-size: 20px;            /* 小字号 */
  margin-bottom: 20px;        /* 底部外边距10px */
  text-align: center;         /* 文字水平居中 */
}

/* 左侧描述文字 */
.descr {
  font-size: 14px;            /* 小字号 */
  margin-bottom: 20px;        /* 底部外边距30px */
  text-align: center;         /* 文字水平居中 */
}

/* 左侧插图 */
.illustration {
  width: 400px;               /* 固定宽度400px */
  height: auto;               /* 高度自适应，保持宽高比 */
  border-radius: 0;           /* 无圆角 */
}

/* 右侧登录表单区域（白色背景） */
.right-section {
  flex: 4;                    /* 占4份宽度，右侧较窄 */
  display: flex;              /* 弹性布局 */
  flex-direction: column;     /* 子元素垂直排列 */
  align-items: center;        /* 水平居中 */
  justify-content: center;    /* 垂直居中 */
  padding: 20px;              /* 内边距20px */
  background-color: #fff;     /* 白色背景 */
}

/* 右侧欢迎标题 */
.welcome-title {
  font-size: 26px;            /* 字号26px，略大于左侧标题 */
  font-weight: bold;          /* 加粗 */
  margin-bottom: 20px;        /* 底部外边距20px */
  color: #1e293b;             /* 深灰色文字 */
}

/* “账号密码登录”文字包裹容器（用于实现左右横线效果） */
.login-type-wrapper {
  display: flex;              /* 弹性布局，使伪元素与文字同行 */
  align-items: center;        /* 垂直居中对齐 */
  margin-bottom: 20px;        /* 底部外边距20px */
  width: 200px;               /* 宽度与表单对齐，确保横线对称 */
}

/* 左侧横线（通过伪元素实现） */
.login-type-wrapper::before {
  content: '';                /* 必须设置 content 才能渲染伪元素 */
  flex: 1;                    /* 占据剩余空间 */
  height: 1px;                /* 线条高度1px */
  background-color: #e2e8f0;  /* 浅灰色线条 */
  margin-right: 10px;         /* 与中间文字间距10px */
}

/* 右侧横线（通过伪元素实现） */
.login-type-wrapper::after {
  content: '';                /* 必须设置 content 才能渲染伪元素 */
  flex: 1;                    /* 占据剩余空间 */
  height: 1px;                /* 线条高度1px */
  background-color: #e2e8f0;  /* 浅灰色线条 */
  margin-left: 10px;          /* 与中间文字间距10px */
}

/* “账号密码登录”文字样式 */
.login-type {
  font-size: 13px;            /* 小字号 */
  color: #64748b;             /* 灰蓝色文字 */
  white-space: nowrap;        /* 禁止换行，保证横线对称布局 */
}

/* 登录表单容器 */
.login-form {
  width: 350px;               /* 固定宽度350px，统一视觉宽度 */
}

/* 登录按钮 */
.login-btn {
  width: 100%;                /* 宽度占满父容器 */
  height: 40px;               /* 固定高度40px */
  font-size: 14px;            /* 字号14px */
}

/* 链接容器 */
.links {
  display: flex;              /* 横向排列两个链接 */
  justify-content: right;     /* 右对齐，符合表单底部布局习惯 */
  margin: 20px 0;             /* 上下外边距20px */
  font-size: 14px;            /* 小字号，弱化处理 */
  color: #409eff;             /* 蓝色链接，符合 Element UI 主题 */
}

/* 链接样式 */
.links a {
  text-decoration: none;      /* 去除默认下划线 */
  color: #409eff;             /* 统一链接颜色 */
}

/* 链接悬停效果 */
.links a:hover {
  text-decoration: underline; /* 悬停时显示下划线，增强交互反馈 */
}
</style>
