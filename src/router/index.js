import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [{
	path: '/home',
	component: resolve => require(['@/pages/home.vue'], resolve),
	children: [{
		path: '/home/read',
		component: resolve => require(['@/pages/home/read.vue'], resolve),
		meta: { routerIndex: '1-1' }
	},{
		path: '/home/store',
		component: resolve => require(['@/pages/home/store.vue'], resolve),
		meta: { routerIndex: '1-2' }
	}]
},{
	path: '/login',
	component: resolve => require(['@/pages/login.vue'], resolve)
}]
//let routes = [{
//	path: '/centerLogin',
//	component: resolve => require(['@/pages/callcenter/login.vue'], resolve)
//},{
//	path: '/fillorder',
//	component: resolve => require(['@/pages/callcenter/fillOrder.vue'], resolve)
//}]

var router = new Router({
//	mode: 'history',
//	hashbang: true,
//	history: true,
	saveScrollPosition: true,
//	suppressTransitionError: true,
//	linkActiveClass: "myactive",
	routes: routes,
	//这个因为有路由动画可能用不了
	//https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html
	scrollBehavior (to, from, savedPosition) {
//	  return new Promise ((resolve,reject) => {
//	  	setTimeout(() => {
//		  if (savedPosition) {
//		    resolve(savedPosition);
//		  } else {
//		    resolve({ x: 0, y: 0 });
//		  }	
//	  	}, 500)
//	  })	  	
	}
})
export default router;
