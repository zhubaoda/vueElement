<template>
  <div class="footers">
    <div class="layout footer_top">
      <div class="layout display-row-box">
        <div class="left">
          <div class="box" v-for="(todo, index) in titleArr" :key="index">
            <div
              :class="[index === titleArr.length-1 ? 'no_border' : '', 'big_title']"
            >{{todo.title}}</div>
            <div class="small_title" v-for="(item,i) in todo.smallTitle" :key="i+'l'">{{item.title}}</div>
          </div>
        </div>
        <div class="right">
          <p class="footer_top_new_right_p1">24小时客服热线:</p>
          <p class="footer_top_new_right_p2">
            0571-
            <span>89999999</span>
          </p>
          <p class="footer_top_new_right_p3">服务质量监督电话：0571-81689888</p>
          <p class="footer_top_new_right_p3">服务质量监督邮箱：service@loongair.cn</p>
          <p class="footer_top_new_right_p3">邮箱：e-commerce@loongair.cn</p>
          <p class="footer_top_new_right_p3">地址：浙江省杭州市萧山国际机场5号路长龙航空办公大楼</p>
          <div style=" line-height: 30px;">
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902001175"
              style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
            >
              <img src="/static/images/jgwab.png" style="float:left;">

              <p
                style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#888888; font-size: 12px;"
              >
                浙公网安备
                33010902001175号
              </p>
            </a>
          </div>
          <div style="float: left;  height: 41px;">
            <a
              href="https://credit.szfw.org/CX20150724010851200156.html"
              target="_blank"
              style=" display: block; line-height: 40px; "
            >
              <img
                src="/static/images/cert.png"
                border="0"
                style="vertical-align: middle; width: 114px; height: 41px;"
              >
            </a>
          </div>
          <div class="Industrial">
            <a
              target="_blank"
              href="http://idinfo.zjaic.gov.cn//bscx.do?method=lzxx&id=3300003300000000024919"
            >
              <img src="/static/images/i_lo2.gif" border="0">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="social socialnew">
      <div class="container">
        <span style="margin: 0 25px 0;line-height: 74px;">更多惊喜，关注长龙航空！</span>
        <div class="imgs">
          <a
            class="weibo weibonew"
            href="https://weibo.com/3213801462/profile?topnav=1&wvr=5"
            @mouseover="showImg(0, 0)"
            @mouseout="showImg(0, 1)"
            target="_blank"
          >
            <span class="popqrcode1" v-show="showWeibo">
              <img src="/static/images/weibochat.png" style="width:73px;height:74px;">
            </span>
          </a>
        </div>
        <div class="imgs">
          <a class="weixin winxinnew" @mouseover="showImg(1, 0)" @mouseout="showImg(1, 1)">
            <span class="popqrcode" v-show="showWechat">
              <img src="/static/images/weichat.png" style="width:73px;height:74px;">
            </span>
          </a>
        </div>
        <div class="clr"></div>
        <div class="footnew">
          <span
            style="font-size: 12px;"
          >Copyright © 2015 ZheJiang Loong Airlines CO.,Ltd, All Rights Reserved 浙ICP：12006774</span>

          <br>
          <span style="font-size: 12px;">本网站用字经北京北大方正电子有限公司授权许可</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import needData from "./service";
export default {
  data() {
    return {
      showWeibo: false,
      showWechat: false,
      titleArr: needData.titleArr
    };
  },
  methods: {
    showImg(i, j) {
      if (!i) {
        if (!j) {
          this.showWeibo = true;
        } else {
          this.showWeibo = false;
        }
      } else {
        if (!j) {
          this.showWechat = true;
        } else {
          this.showWechat = false;
        }
      }
    }
  },
  created() {
    console.log(1, this.titleArr);
  }
};
</script>

<style lang="less" scoped>
.footers {
  width: 100%;
  .footer_top {
    width: 100%;
    background: #eeeeef;
    height: 272px;
    padding-top: 19px;
    overflow: hidden;
    .left {
      display: flex;
      width: 693px;
      border-right: 1px solid #dbdcdc;
      .box {
        width: 105px;
        margin-right: 25px;
        margin-left: 0px;
        padding-left: 8px;
        background: url(../../../static/images/spit2_new.png) no-repeat left top;
        .big_title {
          height: 48px;
          font-size: 16px;
          color: #231815;
          vertical-align: bottom;
          border-right: 1px solid #dbdcdc;
          line-height: 72px;
          margin-bottom: 20px;
        }
        .no_border {
          border-right: none;
        }
        .small_title {
          font-size: 12px;
          color: #888;
          line-height: 24px;
          cursor: pointer;
        }
        .small_title:hover {
          color: #ff3333;
        }
      }
    }
    .right {
      padding-left: 25px;
      padding-top: 25px;
      flex: 1;
      .footer_top_new_right_p1 {
        font-size: 18px;
        color: #b4b4b5;
      }
      .footer_top_new_right_p2 {
        font-size: 24px;
        color: #888888;
        margin-bottom: 5px;
        span {
          font-size: 38px;
          font-family: "arial", "Open Sans", "PingHei", "Hiragino Sans GB",
            "黑体", "宋体", "sans-serif";
          margin-left: 5px;
        }
      }
      .footer_top_new_right_p3 {
        font-size: 12px;
        color: #888888;
        margin-bottom: 5px;
      }
      .Industrial {
        img {
          width: 36px;
          height: 41px;
          margin-left: 20px;
        }
      }
    }
  }
  .social {
    background: #efefef;
    text-align: center;
    margin-top: 20px;
    padding: 15px 0;
    // line-height: 74px;
  }
  .socialnew {
    background: #ff3333;
    margin-top: 0px;
    color: #fff;
  }

  .container {
    width: 1030px;
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
    .imgs {
      display: inline-block;
      padding: 5px 15px;
      .weibo {
        background: url(../../../static/images/wb2.png) no-repeat;
        display: block;
        margin-bottom: -33px;
        width: 45px;
        height: 45px;
        float: left;
      }
      .weibonew {
        background: url(../../../static/images/wbNew.png) no-repeat center;
      }
      .weixin {
        cursor: pointer;
        position: relative;
        background: url(../../../static/images/wx2.png) no-repeat;
        display: block;
        margin-bottom: -33px;
        width: 45px;
        height: 45px;
        float: left;
      }
      .winxinnew {
        background: url(../../../static/images/wxNew.png) no-repeat center;
      }
    }
  }
  .social span {
    display: inline-block;
    margin: 0 20px 0;
    font-size: 16px;
  }
  .social span.popqrcode1 {
    border: 2px solid #f56467;
    position: absolute;
    bottom: 95px;
    background: #fff;
    width: 73px;
    height: 74px;
    padding: 10px;
    left: 50%;
    margin: 0;
    margin-left: 34px;
  }
  .social span.popqrcode {
    border: 2px solid #8dc81b;
    position: absolute;
    bottom: 67px;
    background: #fff;
    width: 73px;
    height: 74px;
    padding: 10px;
    left: 50%;
    margin: 0;
    margin-left: -47px;
  }
}
</style>