import Fetch from './fetch'


export default {
   async fetch() {
      let fetch = new Fetch()
      return fetch.fetch(...arguments)
   },
   // 微信支付签名获取
   async getWXSign(parmas) {
      let actiontype = 'OrderService_GetPayUrlHandler'
      return await this.fetch(actiontype, parmas)
   },
   // 登录模块
   // 获取验证码
   async getPhoneCode(parmas) {
      let actiontype = 'AccountService_GetPhoneVerifyCodeHandler'
      return await this.fetch(actiontype, parmas)
   },
   // 密码账号登录
   async webLogin(parmas) {
      let actiontype = 'AccountService_UserLoginHandler'
      return await this.fetch(actiontype, parmas)
   },
   // 手机验证码登录
   async phoneCodeLogin(parmas) {
      let actiontype = 'AccountService_MobileLoginHandler'
      return await this.fetch(actiontype, parmas)
   }

}
