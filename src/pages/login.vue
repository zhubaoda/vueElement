<template>
  <div class="login container">
    <div class="layout header">
      <commonHead></commonHead>
    </div>
    <div class="banner">
      <div class="login_box">
        <div class="login_name">
          <div class="tab">
            <span
              @click="selectTab(index)"
              :class="{active: istab===index}"
              v-for="(todo, index) in tabArr"
              :key="index"
            >{{todo}}</span>
          </div>
          <div class="footer_box">
            <div class="inp">
              <span class="icon iconfont">&#xe6e6;</span>
              <input type="text" v-model="formData.UserName">
            </div>
            <div class="inp" v-show="istab===0">
              <span class="icon iconfont">&#xe60d;</span>
              <input type="password" v-model="formData.Password">
            </div>
            <div class="inp" v-show="istab===1">
              <span class="icon iconfont">&#xe605;</span>
              <input type="password" class="safe_inp" v-model="formData.VerifyCode">
              <div  :class="[disabled ? 'active' : '', 'mycode']" @click="getCode">{{codeText}}</div>
            </div>
            <div class="login_icon">
              <div class="left item" @click="wechatLogin">
                <img src="/static/images/weixinLoginBg.png" />
                &ensp;微信登录
              </div>
              <div class="right item">
                <span>注册</span> &ensp;
                <span>忘记密码</span>
              </div>
            </div>
            <el-button class="login_button" :loading="loading" @click="loginWeb">登录</el-button>
          </div>
        </div>
      </div>
    </div>
    <commonFooter></commonFooter>
  </div>
</template>

<script>
import commonHead from "@/components/common/headers";
import commonFooter from "@/components/common/footer";
import interfaces from "@/interfaces/index";
export default {
  components: { commonHead, commonFooter },
  name: "login",
  data() {
    return {
      istab: 0,
      tabArr: ["账号密码登录", "手机动态密码登录"],
      loading: false,
      disabled: false,
      codeText: "发送验证码",
      formData: {
        LoginWay: 1,
        UserName: "",
        Password: "",
        Token: "",
        VerifyCode: ""
      }
    };
  },
  methods: {
    selectTab(index) {
      this.istab = index;
    },
    // 微信登录
    wechatLogin() {
        window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=wx31400dd99bf82c09&redirect_uri=https%3a%2f%2fwww.loongair.cn%2fMember%2fWeChatCallback.html%3faction%3dwechatLogin&response_type=code&scope=snsapi_login&state=" + Math.random() + "#wechat_redirect";
    },
    // 获取手机验证码
    async getCode() {
      if (this.disabled) {
        return
      }
      if (!this.formData.UserName) {
        this.$message({
          message: "请填写手机号码",
          type: "warning"
        });
        return;
      }
      let regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!regPhone.test(this.formData.UserName)) {
        this.$message({
          message: "您输入的手机号码格式有误，请重新输入~",
          type: "warning"
        });
        return;
      }
      let params = {
        PhoneNumber: this.formData.UserName,
        VerifyCodeType: 9
      };
      let res = await interfaces.getPhoneCode(params);
      if (res.data.ErrorCode === 0) {
        this.disabled = true;
        this.startTimer();
      } else {
        this.$message({
            message: "获取验证码失败！",
            type: "warning"
        });
      }
    },
    // 登录计时
    startTimer() {
      let s = 59;
      this.codeText = `剩余${s}秒`;
      this.timer = setInterval(() => {
        s--;
        if (s < 10) {
          this.codeText = `剩余0${s}秒`;
        } else {
          this.codeText = `剩余${s}秒`;
        }
        if (s <= 0) {
          this.codeText = "获取验证码";
          this.disabled = false;
          clearInterval(this.timer);
        }
      }, 1000);
    },
    // 登录及登录校验
    async loginWeb() {
      this.formData.LoginWay = 1;
      if (!this.istab) {
        if (!this.formData.UserName) {
          this.$message({
            message: "请填写账号~",
            type: "warning"
          });
          return;
        }
        if (!this.formData.Password) {
          this.$message({
            message: "请填写密码~",
            type: "warning"
          });
          return;
        }
        // 密码登录将非密码登录的参数设置为空
        this.formData.VerifyCode = '';
        this.formData.Token = '';
        this.loading = true;
        let res = await interfaces.webLogin(this.formData);
        this.loading = false;
      } else {
        if (!this.formData.UserName) {
          this.$message({
            message: "请填写手机号码",
            type: "warning"
          });
          return;
        }
        let regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!regPhone.test(this.formData.UserName)) {
          this.$message({
            message: "您输入的手机号码格式有误，请重新输入~",
            type: "warning"
          });
          return;
        }
        if (!this.formData.VerifyCode) {
          this.$message({
            message: "请填写验证码~",
            type: "warning"
          });
          return;
        }
        // 验证码登录将非验证码登录的参数设置为空
        this.formData.Password = '';
        this.formData.Token = '';
        this.loading = true;
        let res = await interfaces.phoneCodeLogin(this.formData);
        this.loading = false;
      }
      
      
    }
  },
  async created() {}
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  .banner {
    background-image: url(../../static/banner/index-banner.jpg);
    min-height: 608px;
    width: 100%;
    display: block;
    background-size: cover;
    background-position: center center;
    position: relative;
    text-align: center;
    background-repeat: no-repeat;
    .login_box {
      z-index: 900;
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      width: 1030px;
      height: 608px;
      top: 0;
      left: 50%;
      margin-left: -515px;
      .login_name {
        margin: 100px 0 0 80px;
        width: 320px;
        padding: 30px;
        height: 290px;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 2px 2px 4px 0 rgba(102, 102, 102, 0.3);
        .tab {
          display: flex;
          span {
            display: block;
            color: #595757;
            font-size: 18px;
            text-align: center;
            line-height: 30px;
            width: 50%;
            height: 31px;
            border-bottom: 1px solid #dbdcdc;
            cursor: pointer;
          }
          .active {
            border-bottom: 2px solid #f00 !important;
            color: #f00 !important;
          }
        }
        .footer_box {
          padding: 20px;
          .inp {
            display: flex;
            border: 1px solid #ddd;
            margin-bottom: 20px;
            .mycode {
              background-color: #f00;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 84px;
              box-sizing: border-box;
              cursor: pointer;
            }
            .active {
              background-color: #dedede;
              color: #333;
            }
            span {
              line-height: 35px;
              background-color: #fff;
              width: 35px;
              height: 35px;
            }
            input {
              outline: none;
              flex: 1;
              border: none;
              background: rgba(255, 255, 255, 0.6);
              height: 35px;
              line-height: 35px;
              text-indent: 10px;
              padding: 0;
            }
            .safe_inp {
              width: 130px;
            }
          }
          .login_icon {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item {
              display: flex;
              align-items: center;
              color: rgb(78, 78, 78);
              font-size: 12px;
              cursor: pointer;
            }
          }
          .login_button {
            margin-top: 20px;
            width: 100%;
            background-color: #f00;
            color: #fff;
            border-radius: 5px;
            padding: 0 15px;
            font-size: 16px;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
