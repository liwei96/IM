<template>
  <div class="home">
    <div class="top">
      <header>
        <img src="../assets/goback.png" alt="" />
        访客接待
      </header>
      <ul class="nav">
        <li :class="type == 1 ?'active':''" @click="change(1)">访客<span></span></li>
        <li :class="type == 2 ?'active':''" @click="change(2)">
          沟通<span></span>
          <p v-if="num"><i>...</i></p>
        </li>
      </ul>
    </div>
    <div class="con">
      <div class="peo">
        <img class="peoimg" :src="mup" alt="" @click="godetail" />
        <div class="right" @click="gotalk(0)">
          <p class="topmsg">
            浙江_杭州
            <span class="type">已被接待</span>
            <span class="time">11:24</span>
          </p>
          <div class="bommsg">
            <span>访问1页</span>
            <span class="org">临安宝龙广场</span>
            <img src="../assets/talk.png" alt="" />
          </div>
          <p class="line"></p>
        </div>
      </div>
      <div class="peo">
        <img class="peoimg" :src="mdown" alt="" />
        <div class="right" @click="gotalk(1)">
          <p class="topmsg">
            浙江_杭州
            <span class="time">11:24</span>
          </p>
          <div class="bommsg">
            <span>访问1页</span>
            <span class="org">临安宝龙广场</span>
            <img src="../assets/talk.png" alt="" />
          </div>
          <p class="line"></p>
        </div>
      </div>
      <div class="peo">
        <img class="peoimg" :src="pcup" alt="" />
        <div class="right">
          <p class="topmsg">
            浙江_杭州
            <span class="time">11:24</span>
          </p>
          <div class="bommsg">
            <span>访问1页</span>
            <span class="org">临安宝龙广场</span>
            <img src="../assets/talk.png" alt="" />
          </div>
          <p class="line"></p>
        </div>
      </div>
      <div class="peo">
        <div class="left">
          <img class="peoimg" :src="pcdown" alt="" />
          <p>1</p>
        </div>
        <div class="right">
          <p class="topmsg">
            浙江_杭州
            <span class="time">11:24</span>
          </p>
          <div class="bommsg" v-if="false">
            <span>访问1页</span>
            <span class="org">临安宝龙广场</span>
            <img src="../assets/talk.png" alt="" />
          </div>
          <p class="response">您好，我想咨询临安宝龙广场详情</p>
          <p class="line"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      mup: require("../assets/mpeo-up.png"),
      mdown: require("../assets/mpeo-down.png"),
      pcup: require("../assets/pcpeo-up.png"),
      pcdown: require("../assets/pcpeo-down.png"),
      status: 1,
      num: false,
      type:1
    };
  },
  methods: {
    godetail() {
      this.$router.push("/VisitorDetail");
    },
    gotalk(type) {
      if (type == 1) {
        this.$router.push("/talk");
      } else {
        this.toast("客户已被沟通");
      }
    },
    change(type) {
      if(type ==1){
        this.type = 1
        
      }else{
        this.type =2
      }
      sessionStorage.setItem('type',type)
    }
  },
};
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
.top {
  box-shadow: 0px 0px 0.5625rem 0px rgba(52, 71, 87, 0.24);
}
header {
  height: 2.75rem;
  line-height: 2.75rem;
  text-align: center;
  color: #19191a;
  font-size: 1.125rem;
  position: relative;
  z-index: 1;
  img {
    width: 1.5rem;
    position: absolute;
    left: 1rem;
    margin-top: 0.5625rem;
  }
}
.nav {
  display: flex;
  justify-content: space-around;
  padding: 0 10%;
  height: 2.5rem;
  color: #323233;
  font-size: 0.9375rem;
  li {
    height: 100%;
    position: relative;
    line-height: 2.5rem;
    p {
      position: absolute;
      display: block;
      width: 1.4375rem;
      height: 1rem;
      border-radius: 0.5rem;
      background-color: #f34f4f;
      text-align: center;
      color: #fff;
      display: flex;
      justify-content: center;
      line-height: 0.25rem;
      top: 0;
      right: -0.75rem;
    }
  }
  .active {
    color: #52c2cc;
    font-weight: bold;
    span {
      display: block;
      width: 100%;
      height: 0.125rem;
      border-radius: 0.0625rem;
      background: #52c2cc;
      position: absolute;
      bottom: 0;
    }
  }
}
.con {
  .peo {
    display: flex;
    padding: 0 0.9375rem;
    height: 4.875rem;
    align-items: center;
    position: relative;
    .left {
      position: relative;
      p {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        text-align: center;
        line-height: 1rem;
        background-color: #F24949;
        color: #fff;
        font-size: 0.6875rem;
        position: absolute;
        top: 0;
        right: 0.75rem;
      }
    }
    .peoimg {
      width: 3.125rem;
      height: 3.125rem;
      margin-right: 0.9375rem;
    }
    .right {
      flex: 1;
      .topmsg {
        color: #19191a;
        font-size: 0.9375rem;
        margin-bottom: 0.5rem;
        .time {
          color: #afafb3;
          font-size: 0.75rem;
          float: right;
        }
        .type {
          color: #52c2cc;
          font-size: 0.625rem;
          padding: 0.1875rem 0.4375rem;
          background-color: #ebf9fa;
          border-radius: 0.125rem;
          margin-left: 0.5rem;
        }
      }
      .bommsg {
        span {
          color: #7d7d80;
          font-size: 0.8125rem;
        }
        .org {
          color: #ff7519;
          padding-left: 0.5rem;
          border-left: 0.03125rem solid #e6e6e6;
          margin-left: 0.5rem;
        }
        img {
          width: 1rem;
          float: right;
        }
      }
      .response {
        color: #7d7d80;
        font-size: 0.8125rem;
      }
      .line {
        width: 17.625rem;
        height: 0.03125rem;
        position: absolute;
        bottom: 0;
        right: 0.9375rem;
        background-color: #f2f2f2;
      }
    }
  }
}
</style>