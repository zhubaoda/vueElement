<template>
  <div class="commonheader">
    <div class="top display-row-box">
      <div class="left"></div>
      <div class="right">
        <span class="font14 cursor">登录&ensp;</span> |
        <span class="font14 cursor">&ensp;注册</span>&ensp;
        <span>&ensp;
          <i class="iconfont icon-dianhua font19"></i>&ensp;
        </span>
        <span class="tel">
          <span class="font14">24小时客服服务电话:</span>
          <span class="font19">0571-89999999</span>
        </span>
      </div>
    </div>
    <div class="tab display-row-box">
      <img src="/static/images/logonew.png" alt class="left_logo">
      <div class="tab_list display-row-box">
        <div
          @mouseover="tabSelect(index, 0)"
          @mouseout="tabSelect(index, 1)"
          :class="[current === index || index === 0 ? 'active' : '', 'tab_item']"
          v-for="(todo, index) in tablist"
          :key="index"
        >
          <span>{{todo.title}}</span>
          <div
            @mouseover="tabSelect(index, 0)"
            @mouseout="tabSelect(index, 1)"
            v-if="todo.downList && current === index"
            class="downlist"
          >
            <div class="item">
              <div class="big_title" v-for="(item, i) in todo.downList" :key="i + 'rr'">
                <div class="big_title_top">
                  <i class="iconfont icon-yousanjiao"></i>
                  <span>{{item.name}}</span>
                </div>
                <div v-if="item.detail" class="big_title_list" v-for="(it, j) in item.detail" :key="j + 'ii'">{{it}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="box" @mouseover="selectQrcode(0, 0)" @mouseout="selectQrcode(1, 0)">
          <i class="icon iconfont">&#xf0105;</i>
          <img src="/static/images/weibo.png" class="qrcode" v-show="weiboShow" alt>
        </div>
        <div class="box" @mouseover="selectQrcode(0, 1)" @mouseout="selectQrcode(1, 1)">
          <i class="icon iconfont">&#xe608;</i>
          <img src="/static/images/weixin.png" class="qrcode" v-show="weixinShow" alt>
        </div>
        <div class="box" @mouseover="selectQrcode(0, 2)" @mouseout="selectQrcode(1, 2)">
          <i class="icon iconfont">&#xe615;</i>
          <img src="/static/images/weixin.png" class="qrcode" v-show="phoneShow" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {
      current: 0,
      weiboShow: false,
      weixinShow: false,
      phoneShow: false,
      tablist: [
        {
          title: "首页"
        },
        {
          title: "机票",
          downList: [
            {
              name: "机票预订"
            },
            {
              name: "查询订单"
            },
            {
              name: "军残订票"
            },
            {
              name: "警残订票"
            },
            {
              name: "申请改期"
            }
          ]
        },
        {
          title: "旅行助手",
          downList: [
            {
              name: "注意事项",
              detail: [
                "旅客须知",
                "行李须知",
                "特殊旅客运输指南",
                "电子客票行程单邮寄使用规则",
                "运输条款",
                "危险品运输规定",
                "旅客携带锂电池规定",
                "人体捐献器官航空运输指南",
                "残疾人运输服务方案"
              ]
            },
            {
              name: "行前服务",
              detail: ["机场信息", "值机柜台", "航线", "超售公示说明"]
            },
            {
              name: "运输总条件",
              detail: ["国内运输总条件", "国际运输总条件", "GCOICP&B"]
            },
            {
              name: "机上延误应急预案",
              detail: ["机上延误应急预案"]
            }
          ]
        },
        {
          title: "自助服务",
          downList: [
            {
              name: "客票验真"
            },
            {
              name: "预订餐食"
            },
            {
              name: "在线选座"
            },
            {
              name: "航班不正常证明"
            },
            {
              name: "航班时刻"
            },
            {
              name: "特殊旅客申请"
            },
            {
              name: "补订儿童/婴儿预订票"
            },
            {
              name: "邮寄行程单"
            }
          ]
        },
        {
          title: "长龙假期",
          downList: [
            {
              name: "门票"
            }
          ]
        },
        {
          title: "旅游度假"
        },
        {
          title: "企业预订"
        }
      ]
    };
  },
  methods: {
    tabSelect(index, type) {
      if (!type) {
        this.current = index;
      } else {
        this.current = 0;
      }
    },
    allFalse() {
      this.weiboShow = false;
      this.weixinShow = false;
      this.phoneShow = false;
    },
    selectQrcode(isOver, index) {
      // 鼠标进入
      if (!isOver) {
        this.allFalse();
        switch (index) {
          case 0:
            this.weiboShow = true;
            return;
          case 1:
            this.weixinShow = true;
            return;
          case 2:
            this.phoneShow = true;
            return;
        }
      } else {
        this.allFalse();
      }
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.commonheader {
  width: 100%;
  background-color: #fff;
  .top {
    justify-content: space-between;
    color: #888888;
    .right {
      padding: 15px 0;
    }
  }
  .tab {
    position: relative;
    padding-left: 136px;
    box-sizing: border-box;
    align-items: center;
    color: #595757;
    .downlist {
      position: absolute;
      top: 42px;
      left: 0;
      width: 100%;
      font-size: 14px;
      background: rgba(255,255,255,0.9);
      z-index: 999;
      /*background-color: rgba(255, 255, 255, .3);*/
      .item {
        display: flex;
        flex-wrap: wrap;
        .big_title {
          width: 20%;
          padding-left: 20px;
          box-sizing: border-box;
          .big_title_top {
            display: flex;
            align-items: center;
            color: #333;
          }
          .big_title_list {
            padding-left: 18px;
            font-size: 12px;
            line-height: 30px;
            border-left: 1px dashed #999;
            color: #666;
            margin-left: 4px;
          }
          span {
            font-size: 14px;
            flex: 1;
            text-align: left;
            padding-left: 10px;
          }
          i {
            font-size: 14px;
          }
        }
      }
    }
    .left_logo {
      position: absolute;
      left: 0;
      bottom: 10px;
    }
    .tab_item {
      cursor: pointer;
      margin: 0 20px;
      span {
        font-size: 16px;
        line-height: 40px;
        display: block;
        width: 65px;
        text-align: center;
      }
    }
    .active {
      border-bottom: 2px solid red;
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .box {
		cursor: pointer;
        position: relative;
        .qrcode {
          position: absolute;
          width: 100px;
          height: 100px;
          left: -23px;
          z-index: 999;
        }
      }
      i {
        font-size: 32px;
        margin-left: 10px;
      }
      i:hover {
        color: red;
      }
      .phone {
        font-size: 28px;
      }
    }
  }
  .top,
  .tab {
    width: 100%;
    .font14 {
      font-size: 12px;
    }
    .font19 {
      font-size: 14px;
    }
    .tel:hover {
      color: red;
    }
  }
}
</style>