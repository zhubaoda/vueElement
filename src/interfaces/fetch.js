import axios from 'axios'
import Global from './globalname.js'
let serviceType = 0;
let serviceUrl = '/webhandler.ashx'
let appId = 'ClientService'
// let appId = 'ManageService'
export default function Fetch() {
	this.fetch = async (actionType, args = {}) => {
		let res = await this._request(actionType, args);
		if (res.status === 200) {
			if (res.data.ErrorCode === 0) {
				res.data.Result = JSON.parse(res.data.Result)
				res.data.result = res.data.Result;
				res.data.Result.Message = "成功"
			} else if (res.data.ErrorCode === 100010) {
				this.delCookieFn("sessionid")
				window.location.href = "../user/login.html";
			}
		}
		return res
	}
	this._request = async (actionType, args) => {
		// 顶项的
		let constId = '';
		if (sessionStorage.getItem('constId')) {
            constId = sessionStorage.getItem('constId')
		} else {
			constId = await _dx.ConstID(
				{
				  appId: "cdb4c73567702ad8a4ef9950370d5ad8", // 唯一标识，必填
				  server: "https://constid.dingxiang-inc.com/udid/c1", // ConstId 服务接口，可选
				  userId: "" // 用户标识，可选
				}
			);
			sessionStorage.setItem('constId', constId)
		}
        
		// 走clientService
		if (serviceType === 0) {
			let headers = {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
			let paras = {
				ActionType: "",
				SessionId: "",
				Args: args
			}
			paras.Args.SaleChannel = Global.WebSaleChannel
			paras.Args.ConstID = constId
			paras.ActionType = actionType
			paras.MethodName = paras.ActionType
			paras.AppID = appId
			paras.Parameters = paras.Args = JSON.stringify(paras.Args)
			let postData = {
				paras: paras
			};
			return new Promise((resolve, reject) => {
				axios({
					url: serviceUrl,
					transformRequest: [
						function (data) {
							data = "paras=" + JSON.stringify(paras);
							return data;
						}
					],
					data: postData || {},
					header: headers,
					method: 'POST'
				}).then((suc) => {
					resolve(suc);
				}).catch(function (error) {
					reject(error);
				});
			})
		} else {
			let url = '';
			let params = '';
			// yapi服务 else是戚华峰
			if (serviceType === 1) {
				console.log('走的yapi服务')
				url = "yapi" + actionType;
				params = {
					params: args
				}
			} else {
				console.log('走的戚的服务')
				url = 'api' + actionType;
				params = args;
			}
			return new Promise((resolve, reject) => {
				axios.post(url, params).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		}

	}
	//删除cookie
	this.delCookieFn = (name) => {
		name = name || "";
		name = this.hump(name);
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if (cval != null) {
			var domain = location.hostname;
			//document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
			document.cookie = name + "=" + 0 + "; expires=" + exp.toUTCString() + "; path=/" + ("; domain=" + domain);
		}
	}
	this.getCookie = (name) => {
		name = name || "";
		name = this.hump(name);
		var arr,
			reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
		else return null;
	}
	this.hump = (str) => {
		//驼峰转下划线小写
		if (typeof str === "string" && str !== "") {
			return str.replace(/([^_])([A-Z])/g, "$1_$2").toLocaleLowerCase();
		}
		return str;
	}
}
