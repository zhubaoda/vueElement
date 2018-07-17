<template>
  <div class="home">
		<el-container>
			<el-header style="padding: 0; height: 50px;" class="el-my-header display-row-box">
				<div class="store-name display-row-box" v-show="!isCollapse">
					<span class="big-word">乙店商家后台</span>
					<div class="header-right-item display-row-box" @click="handleSwitch(false)">
						<img src="/static/icon/switch.svg" />
					</div>
				</div>
				<div class="store-name display-row-box" v-show="isCollapse">
					<span class="big-word">乙店</span>
					<div class="header-right-item display-row-box" @click="handleSwitch(true)">
						<img src="/static/icon/switch.svg" />
					</div>
				</div>
				<div class="header-right display-row-box">
					<div class="header-right-item">15971484216</div>
					<div class="header-right-item">选择店铺</div>
					<div class="header-right-item">退出</div>
				</div>
			</el-header>
			<el-container>
				<div @mouseover="overAside" @mouseout="outAside">
						<el-menu :default-active="defaultIndex" 
						class="el-menu-vertical-demo aside" 
						:collapse="isCollapse">
							<el-submenu index="1">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span slot="title">类目一</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="1-1" @click="jump('read')">读书</el-menu-item>
									<el-menu-item index="1-2" @click="jump('store')">商城</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						</el-menu>					
				</div>
				<el-main class="main">
					<router-view/>
				</el-main>
			</el-container>
	  </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      isCollapse: false,
			defaultIndex: '1-1'
    }
  },
	methods: {
		handleSwitch (key) {
			this.isCollapse = !key
		},
		jump (path) {
			this.$router.push(`/home/${path}`)
		},
		overAside () {
			this.isCollapse = false
		},
		outAside () {
			this.isCollapse = true
		}
  },
	created () {
		this.defaultIndex = this.$route.meta.routerIndex
	}
}
</script>
<style scoped>
.el-my-header {
	background-color: #409eff;
	color: #fff;
	width: 100%;
	justify-content: space-between;
}
.store-name {
	padding: 0 20px;
}
.big-word {
	font-size: 18px;
}
.header-right-item {
	height: 50px;
	line-height: 50px;
	padding: 0 20px;
	cursor: pointer;
}
.header-right-item:hover {
	background-color: rgba(0,0,0,.6);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
.aside {
	height: calc(100vh - 50px);
}
.main {
	height: calc(100vh - 50px);
	overflow: auto;
}
</style>
