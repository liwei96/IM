<template>
  <div class="home">
    <div class="top">
      <header>
        <img src="../assets/goback.png" alt="" />
        访客接待
      </header>
      <ul class="nav">
        <li :class="type == 1 ? 'active' : ''" @click="change(1)">
          访客<span></span>
        </li>
        <li :class="type == 2 ? 'active' : ''" @click="change(2)">
          沟通<span></span>
          <p v-if="num"><i>...</i></p>
        </li>
      </ul>
    </div>
    <div class="con">
      <template v-if="type == 1">
        <div :class="(item.uuid === currentuuid && currentuuid !== againuuid)?'peo current':'peo'" v-for="(item, key) in listmsg" :key="key">
          <div class="left">
            <img class="peoimg" :src="mup" alt="" @click="godetail(item.uuid)" />
            <p v-if="item.num">{{item.num}}</p>
          </div>
          <div class="right" @click="istalk(item.uuid)">
            <p class="topmsg">
              {{ item.city }}
              <span class="type" v-if="item.connected === 1">已沟通过</span>
              <span class="time">{{ item.time }}</span>
            </p>
            <div class="bommsg">
              <span>访问项目</span>
              <span class="org">{{ item.name }}</span>
            </div>
            <p class="line"></p>
          </div>
        </div>
      </template>
      <template v-if="type == 2">
        <div class="peo" v-for="item in commlist" :key="item.uuid">
          <div class="left" @click="godetail(item.uuid)">
            <img class="peoimg" :src="item.visiting===0?mdown:mup" alt="" />
            <p v-if="item.num">{{ item.num }}</p>
          </div>
          <div class="right" @click="istalk(item.uuid)">
            <p class="topmsg">
              {{ item.city }}
              <span class="time">{{ item.time }}</span>
            </p>
            <p class="response">{{ item.content }}</p>
            <p class="line"></p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    ws: {
      type: Object,
    },
  },
  data() {
    return {
      mup: require("../assets/mpeo-up.png"),
      mdown: require("../assets/mpeo-down.png"),
      pcup: require("../assets/pcpeo-up.png"),
      pcdown: require("../assets/pcpeo-down.png"),
      status: 1,
      num: false,
      type: 1,
      listmsg: [],
      id: 0,
      commlist: [],
      timer: "",
      nums: 0,
      types:true
    };
  },
  methods: {
    godetail(uuid) {
      this.$router.push("/VisitorDetail");
      sessionStorage.setItem("userid", uuid);
    },
    change(type) {
      if (type == 1) {
        this.type = 1;
      } else {
        this.type = 2;
      }
      sessionStorage.setItem("type", type);
    },
    list(id) {
      let pp = {
        controller: "Talker",
        action: "my_onlines",
        params: { uuid: id },
      };
      this.ws.send(JSON.stringify(pp));
    },
    comments(id) {
      let pp = {
        controller: "Talker",
        action: "mine",
        params: { uuid: id },
      };
      this.ws.send(JSON.stringify(pp));
    },
    istalk(userid) {
      sessionStorage.removeItem(userid)
      let id = sessionStorage.getItem("uuid");
      sessionStorage.setItem('userid',userid)
      let pp = {
        controller: "Talker",
        action: "occupy",
        params: { uuid: id, customer: userid },
      };
      this.ws.send(JSON.stringify(pp));
    },
  },
  mounted() {
    this.currentuuid = this.$route.query.currentuuid
    this.againuuid = localStorage.getItem('currentuuid')
    localStorage.setItem('currentuuid',this.$route.query.currentuuid)
    this.id = sessionStorage.getItem("uuid");
    let that = this;
    this.ws.onopen = function (event) {
      that.list(that.id);
      that.comments(that.id);
    };
    if (this.ws.readyState == 1) {
      if (sessionStorage.getItem("type")) {
        that.list(that.id);
        that.comments(that.id);
      }
    }

    that.timer = setInterval(() => {
      if(that.types){
        that.types = false
        that.list(that.id);
        // that.comments(that.id);
      }
    }, 2000);
    that.ws.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if (data.action == 205) {
        that.types = true
        let date = new Date();
        for (let val of data.users) {
          let dd = new Date(val.createtime.replace(/\-/g, '/'));
          let time = date - dd;
          if (time / 1000 < 3600 * 24) {
            val.time =
              (dd.getHours() >= 10 ? dd.getHours() : "0" + dd.getHours()) +
              ":" +
              (dd.getMinutes() >= 10 ? dd.getMinutes() : "0" + dd.getMinutes());
          } else {
            val.time =
              dd.getFullYear() +
              "-" +
              (dd.getMonth() + 1 >= 10
                ? dd.getMonth() + 1
                : "0" + (dd.getMonth() + 1)) +
              "-" +
              (dd.getDate() >= 10 ? dd.getDate() : "0" + dd.getDate());
          }
          if(sessionStorage.getItem(val.uuid)){
            val.num = sessionStorage.getItem(val.uuid)
          }
        }
        that.listmsg = data.users;
      } else if (data.action == 308) {
        let date = new Date();
        for (let val of data.list) {
          let dd = new Date(val.time.replace(/\-/g, '/'));
          let time = date - dd;
          if (time / 1000 < 3600 * 24) {
            val.time =
              (dd.getHours() >= 10 ? dd.getHours() : "0" + dd.getHours()) +
              ":" +
              (dd.getMinutes() >= 10 ? dd.getMinutes() : "0" + dd.getMinutes());
          } else {
            val.time =
              dd.getFullYear() +
              "-" +
              (dd.getMonth() + 1 >= 10
                ? dd.getMonth() + 1
                : "0" + (dd.getMonth() + 1)) +
              "-" +
              (dd.getDate() >= 10 ? dd.getDate() : "0" + dd.getDate());
          }
          if(sessionStorage.getItem(val.uuid)){
            val.num = sessionStorage.getItem(val.uuid)
            that.num = true
          }
          if (sessionStorage.getItem(val.id)) {
            console.log(sessionStorage.getItem(val.id));
            val.num = sessionStorage.getItem(val.id);
          }
          if(val.content.indexOf('%get your phone%')!== -1) {
            val.content = '请您报备电话'
          }else if(val.content.indexOf('%put my card%')!== -1) {
            val.content = '这是我的名片'
          }else if(val.content.indexOf('project_card')!== -1) {
            let msg = JSON.parse(val.content)
            val.content = '客户浏览了'+msg.name
          }else if(val.content.length>300) {
            val.content = '我发送了一张图片'
          }
        }
        that.commlist = data.list;
      } else if (data.action == 306) {
        that.num = false;
        if (data.result == "success") {
          that.$router.push("/talk");
        } else {
          that.toast("客户已被沟通");
        }
      } else if (data.action == 301) {
        that.comments(that.id);
        let num = 0;
        if (sessionStorage.getItem(data.fromUserName)) {
          num = parseInt(sessionStorage.getItem(data.fromUserName)) + 1;
        } else {
          num = 1;
        }
        sessionStorage.setItem(data.fromUserName, num);
        for(let val of that.commlist) {
          if(val.uuid == data.fromUserName) {
            val.num = num
            that.num = true;
          }
        }
        for(let val of that.listmsg) {
          if(val.uuid == data.fromUserName) {
            val.num = num
          }
        }
        console.log(that.listmsg)
      }
    };
  },
  beforeDestroy() {
    console.log('555')
    console.log(45);
    clearInterval(this.timer);
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
        background-color: #f24949;
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
        width: 17.5rem;
        height: 1.125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
  .current {
    background-color: #F2F6FC;
  }
}
</style>