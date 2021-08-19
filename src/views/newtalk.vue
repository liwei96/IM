<template>
  <div id="Talk">
    <div class="talk">
      <header v-if="false">
        <img src="../assets/goback.png" alt="" @click="back" />
        {{ city }}
        <div class="status" v-if="status">
          <p></p>
          在线
        </div>
        <div class="status doen" v-if="!status">
          <p></p>
          离线
        </div>
      </header>
      <div class="con">
        <div class="huti" v-if="ishuti">
          <span>有关客户的提示</span>
          <img src="../assets/close.png" alt="" @click="ishuti = false" />
        </div>
        <div class="address">
          <div class="name">
            杭州 <span>临安宝龙广场</span>
          </div>
          <p class="infotxt">
            [2条]您好，我想咨询临安宝龙广场详情
          </p>
        </div>
        <p class="time">{{ time }}</p>
        <!-- <div class="you alltxt">
          <div class="left">
            <img src="../assets/people.png" alt="" />
          </div>
          <p class="txt">
            您好！很高兴为您服务,看楼盘项目 本人可提供免费接送服务
          </p>
        </div>
        <div class="peo alltxt">
          <img src="../assets/talk-peo.png" alt="" />
          <p class="txt">
            您好！很高兴为您服务,看楼盘项目 本人可提供免费接送服务
          </p>
        </div>
        <div class="peo-pro alltxt">
          <img src="../assets/talk-peo.png" alt="" />
          <div class="pro">
            <img src="../assets/lun02.jpg" alt="" />
            <div class="pro-msg">
              <p class="name">{{pro.name}}</p>
              <p class="area">建面 80-120/m²</p>
              <p class="price">
                均价<span><i>25000</i>元/m²</span>
              </p>
            </div>
          </div>
        </div>
        <div class="gettel alltxt">
          <img src="../assets/people.png" alt="" class="peoimg" />
          <div class="telbox">
            <img src="../assets/talk-tel.jpg" alt="" />
            <div class="telbox-bom">
              <p class="tit">为您制定专属分析报告</p>
              <p class="msg">
                向咨询师免费领取专属分析报告,内附有购房 流程全盘解读
              </p>
              <button>免费领取</button>
            </div>
          </div>
        </div>
        <div class="putcard alltxt">
          <img src="../assets/people.png" alt="" class="peoimg" />
          <div class="cardbox">
            <div class="top">
              <img src="../assets/people.png" alt="" />
              <div class="top-right">
                <h5>王烨城 <span>新房咨询</span></h5>
                <p>从业咨询服务6年</p>
              </div>
            </div>
            <div class="bom">
              <div class="txt">
                <p class="num"><span>134</span>人</p>
                <p class="type">服务客户</p>
              </div>
              <div class="txt">
                <p class="num"><span>134</span>次</p>
                <p class="type">带看客户</p>
              </div>
              <div class="txt">
                <p class="num"><span>99</span>%</p>
                <p class="type">好评率</p>
              </div>
            </div>
            <button>电话咨询</button>
          </div>
        </div>
        <div class="imgbox alltxt">
          <img src="../assets/people.png" alt="" class="peoimg" />
          <div class="right">
            <img src="../assets/lun02.jpg" alt="" />
          </div>
        </div> -->
      </div>
      <div class="nav">
        <div class="morechang" @click="add" v-if="!txt">
          常用语
        </div>
        <div class="moreimg" @click="add" v-if="txt">
          <img src="../assets/changyong.png" alt="">
        </div>
          <input
            class="inu"
            type="text"
            v-model="talktxt"
            placeholder="在这输入内容"
            @click="setinput"
          />
          <img src="../assets/icon.png" alt="" @click="iconbtn" v-if="!icon"/>
          <img src="../assets/iconyes.png" alt="" @click="iconbtn" v-if="icon"/>
          <img src="../assets/more.png" alt="" @click="setmoretype" v-if="!msg"/>
          <!-- <input type="file" id="upload" v-show="!msg" /> -->
          <span v-if="msg" @click="send">发送</span>
      </div>
      <div class="moretype" v-show="moretype">
        <div class="typebox">
          <input type="file" id="upload" />
          <div class="iconbox">
            <img src="../assets/img.png" alt="">
          </div>
          <p>相册</p>
        </div>
        <div class="typebox"  @click="gettel">
          <div class="iconbox">
            <img src="../assets/telyes.png" alt="" v-if="!teltype">
            <img src="../assets/telno.png" alt="" v-if="teltype">
          </div>
          <p>要电话</p>
        </div>
        <div class="typebox" @click="putcard">
          <div class="iconbox">
            <img src="../assets/cardyes.png" alt="" v-if="!cardtype">
            <img src="../assets/cardno.png" alt="" v-if="cardtype">
          </div>
          <p>发名片</p>
        </div>
        <div class="typebox" @click="gosearch">
          <div class="iconbox">
            <img src="../assets/build.png" alt="">
          </div>
          <p>推楼盘</p>
        </div>
      </div>
      <div class="icons" v-if="icon">
        <img
          v-for="item in faces"
          :key="item.con"
          :src="item.img"
          alt
          @click="seticon(item.con)"
        />
      </div>
      <div class="words" v-if="txt">
        <div class="lk">
          <!-- <van-swipe-cell v-for="item in words" :key="item.id"> -->
            <div class="word" v-for="item in words" :key="item.id">
              <div class="txt">
                <p v-if="type" class="showmsg" @click="settxt(item.word)">
                  {{ item.word }}
                </p>
                <div class="ll" v-if="!type">
                  <div class="tt" v-text="item.word"></div>
                  <p class="edit" @click="edittxt(item.word, item.id)">编辑</p>
                </div>
              </div>
            </div>
            <!-- <template #right>
              <van-button
                square
                type="danger"
                text="删除"
                class="delete-button"
                @click.native="del(item.id)"
              />
            </template>
          </van-swipe-cell> -->
        </div>
        <div class="word-btn">
          <div class="btn" @click="addbtn">
            <img src="../assets/add.png" alt="" /> 添加
          </div>
          <div class="btn" @click="set">
            <img src="../assets/editbig.png" alt="" /> {{ btnmsg }}
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="show3" :style="{ background: 'rgba(0,0,0,0)' }">
      <img style="width: 100vw" :src="bigimg" alt="" @click="show3 = false" />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    ws: {
      type: Object,
    },
  },
  data() {
    return {
      show3: false,
      bigimg: "",
      faces: [
        "[微笑]",
        "[嘻嘻]",
        "[哈哈]",
        "[可爱]",
        "[可怜]",
        "[挖鼻]",
        "[吃惊]",
        "[害羞]",
        "[挤眼]",
        "[闭嘴]",
        "[鄙视]",
        "[爱你]",
        "[泪]",
        "[偷笑]",
        "[亲亲]",
        "[生病]",
        "[太开心]",
        "[白眼]",
        "[右哼哼]",
        "[左哼哼]",
        "[嘘]",
        "[衰]",
        "[委屈]",
        "[吐]",
        "[哈欠]",
        "[抱抱]",
        "[怒]",
        "[疑问]",
        "[馋嘴]",
        "[拜拜]",
        "[思考]",
        "[汗]",
        "[困]",
        "[睡]",
        "[钱]",
        "[失望]",
        "[酷]",
        "[色]",
        "[哼]",
        "[鼓掌]",
        "[晕]",
        "[悲伤]",
        "[抓狂]",
        "[黑线]",
        "[阴险]",
        "[怒骂]",
        "[互粉]",
        "[心]",
        "[伤心]",
        "[猪头]",
        "[熊猫]",
        "[兔子]",
        "[ok]",
        "[耶]",
        "[good]",
        "[NO]",
        "[赞]",
        "[来]",
        "[弱]",
        "[草泥马]",
        "[神马]",
        "[囧]",
        "[浮云]",
        "[给力]",
        "[围观]",
        "[威武]",
        "[奥特曼]",
        "[礼物]",
        "[钟]",
        "[话筒]",
        "[蜡烛]",
        "[蛋糕]",
      ],
      icon: false,
      type: true,
      btnmsg: "编辑",
      mm:
        "您好，这个楼盘即将开盘主力户型有89.99.124！您好，这个楼盘即将开盘主力户型有89.99.124！您好，这个楼盘即将开盘主力户型有89.99.124！",
      txt: false,
      show: false,
      show2: false,
      addtxt: "",
      addtxtnum: 0,
      show1: false,
      teltype: false,
      cardtype: false,
      status: false,
      msg: false,
      talktxt: "",
      editmsg: "",
      editmsgnum: 0,
      city: "",
      staffimg: "",
      userimg: "",
      timer: "",
      words: [],
      wordid: 0,
      list: [],
      total: 0,
      isok: true,
      page: 1,
      time: "",
      pro: {},
      staffname: "",
      totalnum: 0,
      usernum: 0,
      looknum: 0,
      rate: 0,
      stafftel: "",
      ishuti: true,
      moretype: false
    };
  },
  methods: {
    gosearch() {
      wx.miniProgram.navigateTo({ url: "/pages/search/search?id=" + id });
    },
    setmoretype() {
      this.moretype = !this.moretype
      this.icon = false
      this.txt = false
    },
    set() {
      if (this.type) {
        this.btnmsg = "保存";
      } else {
        this.btnmsg = "编辑";
      }
      this.type = !this.type;
    },
    addbtn() {
      if (this.words.length < 10) {
        this.show = true;
      } else {
        this.toast("常用语最多10条");
      }
    },
    gettel() {
      if (!this.teltype) {
        this.teltype = true;
        let img = this.staffimg;
        let img1 = require("../assets/talk-tel.jpg");
        let dv = document.createElement("div");
        dv.className = "gettel alltxt";
        dv.innerHTML = `
            <img src="${img}" alt="" class="peoimg" />
            <div class="telbox">
              <img src="${img1}" alt="" />
              <div class="telbox-bom">
                <p class="tit">为您制定专属分析报告</p>
                <p class="msg">
                  向咨询师免费领取专属分析报告,内附有购房 流程全盘解读
                </p>
                <button>免费领取</button>
              </div>
            </div>
          `;
        $(".con").append(dv);
        dv.scrollIntoView();
        let id = sessionStorage.getItem("userid");
        let pp = {
          controller: "chat",
          action: "send",
          params: { content: "%get your phone%", username: id },
        };
        this.ws.send(JSON.stringify(pp));
      }
    },
    putcard() {
      if (!this.cardtype) {
        this.cardtype = true;
        let img = this.staffimg;
        let dv = document.createElement("div");
        dv.className = "putcard alltxt";
        dv.innerHTML = `
            <img src="${img}" alt="" class="peoimg" />
            <div class="cardbox">
              <div class="top">
                <img src="${img}" alt="" />
                <div class="top-right">
                  <h5>${this.staffname} <span>新房咨询</span></h5>
                  <p>从业咨询服务6年</p>
                </div>
              </div>
              <div class="bom">
                <div class="txt">
                  <p class="num"><span>${this.usernum}</span>人</p>
                  <p class="type">服务客户</p>
                </div>
                <div class="txt">
                  <p class="num"><span>${this.looknum}</span>次</p>
                  <p class="type">带看客户</p>
                </div>
                <div class="txt">
                  <p class="num"><span>${this.rate}</span>%</p>
                  <p class="type">好评率</p>
                </div>
              </div>
              <a href="tel:${this.stafftel}">
              <button>电话咨询</button>
              </a>
            </div>
            `;
        $(".con").append(dv);
        dv.scrollIntoView();
        let userid = sessionStorage.getItem("userid");
        let oo = {
          controller: "chat",
          action: "send",
          params: { content: "%put my card%", username: userid },
        };
        this.ws.send(JSON.stringify(oo));
      }
    },
    back() {
      console.log(123);
      this.$router.go(-1);
    },
    settxt(k) {
      this.talktxt = k;
      this.txt = false;
    },
    iconbtn() {
      this.icon = !this.icon;
      this.txt = false;
    },
    send() {
      let img = this.staffimg;
      let msg = this.talktxt;
      let that = this;
      if (msg.split("face").length !== 0) {
        let index = msg.indexOf("face");
        while (index != -1) {
          var reg = /face\[[\u4e00-\u9fa5_a-zA-Z]+\]/s;
          var match = msg.match(reg);
          if (match) {
            var title = match[0].replace("face", "");
          }
          for (let val in that.faces) {
            if (that.faces[val].con == title) {
              let img = require(`../assets/${val}.gif`);
              let h = `<img src="${img}">`;
              msg = msg.replace(`face${title}`, h);
            }
          }
          index = msg.indexOf("face", index + 4);
        }
      }
      let id = sessionStorage.getItem("userid");
      let ll = this.talktxt;
      let pp = {
        controller: "chat",
        action: "send",
        params: { content: ll, username: id },
      };
      this.ws.send(JSON.stringify(pp));
      let dv = document.createElement("div");
      dv.className = "you alltxt";
      dv.innerHTML = `
                    <div class="left">
                        <img src="${img}" alt="" />
                      </div>
              <p class="txt">
                ${msg}
              </p>
        `;
      $(".con").append(dv);
      dv.scrollIntoView();
      this.talktxt = "";
    },
    seticon(con) {
      this.talktxt = this.talktxt + "face" + con;
      this.icon = false;
    },
    edittxt(txt, id) {
      this.show2 = true;
      this.editmsgnum = txt.length;
      this.editmsg = txt;
      this.wordid = id;
    },
    add() {
      this.txt = !this.txt;
      this.icon = false;
    },
    loadbox(id, userid) {
      let pp = {
        controller: "chat",
        action: "index",
        params: { staff: id, customer: userid, type: 1 },
      };
      this.ws.send(JSON.stringify(pp));
    },
    isup(userid) {
      let pp = {
        controller: "talker",
        action: "online_one",
        params: { uuid: userid },
      };
      this.ws.send(JSON.stringify(pp));
    },
    wordlist(id) {
      let pp = {
        controller: "Staff",
        action: "words",
        params: { uuid: id },
      };
      this.ws.send(JSON.stringify(pp));
    },
    addword() {
      let id = sessionStorage.getItem("uuid");
      let word = this.addtxt;
      let pp = {
        controller: "Staff",
        action: "add_word",
        params: { uuid: id, word: word },
      };
      this.ws.send(JSON.stringify(pp));
    },
    editword() {
      let id = sessionStorage.getItem("uuid");
      let wordid = this.wordid;
      let word = this.editmsg;
      let pp = {
        controller: "Staff",
        action: "add_word",
        params: { uuid: id, word: word, id: wordid },
      };
      this.ws.send(JSON.stringify(pp));
    },
    delword() {
      let id = this.wordid;
      let pp = {
        controller: "Staff",
        action: "delete_words",
        params: { id: id },
      };
      this.ws.send(JSON.stringify(pp));
    },
    del(id) {
      this.show1 = true;
      this.wordid = id;
    },
    record(id, userid) {
      let page = this.page;
      let pp = {
        controller: "chat",
        action: "history",
        params: { mine: id, customer: userid, page: page, limit: 100 },
      };
      this.ws.send(JSON.stringify(pp));
    },
    setinput() {
      this.icon = false
      this.txt = false
      this.moretype = false
    }
  },
  created() {
    let that = this;
    for (let val in that.faces) {
      that.faces[val] = {
        img: require(`../assets/${val}.gif`),
        con: that.faces[val],
      };
    }
  },
  mounted() {
    let that = this;
    let id = sessionStorage.getItem("uuid");
    let userid = sessionStorage.getItem("userid") || this.$route.query.uuid;
    this.ws.onopen = function(event) {
      that.loadbox(id, userid);
      that.isup(userid);
      that.wordlist(id);
      let pp = {
        controller: "Staff",
        action: "info",
        params: { uuid: id },
      };
      that.ws.send(JSON.stringify(pp));
    };
    if (this.ws.readyState == 1) {
      that.loadbox(id, userid);
      that.isup(userid);
      that.wordlist(id);
      let pp = {
        controller: "Staff",
        action: "info",
        params: { uuid: id },
      };
      that.ws.send(JSON.stringify(pp));
    }
    that.timer = setInterval(() => {
      that.isup(userid);
    }, 3000);
    that.ws.onmessage = function(event) {
      let data = JSON.parse(event.data);
      if (data.action == 305) {
        console.log(data);
        that.userimg = data.avatar;
        that.staffimg = data.staff.head_img;
        that.city = data.city;
        that.record(id, userid);
        let pro = data.project_info;
        // if(pro.length>0){
        //   let txt = `
        //     <img src="${that.userimg}" alt="" />
        //   <div class="pro">
        //     <img src="${pro.img}" alt="" />
        //     <div class="pro-msg">
        //       <p class="name">${pro.name}</p>
        //       <p class="area">建面 ${pro.area}/m²</p>
        //       <p class="price">
        //         均价<span><i>${pro.price}</i>元/m²</span>
        //       </p>
        //     </div>
        //   </div>
        //   `;
        // let dv = document.createElement("div");
        // dv.innerHTML = txt;
        // dv.className = "peo-pro alltxt";
        // $(".con").append(dv);
        // dv.scrollIntoView();
        // }
      } else if (data.action == 304) {
        if (data.visiting == 1) {
          that.status = true;
        } else {
          that.status = false;
        }
      } else if (data.action == 208) {
        that.words = data.data;
      } else if (data.action == 207) {
        that.show = false;
        that.wordlist(id);
        that.toast("设置成功");
        that.addtxt = "";
        that.show2 = false;
      } else if (data.action == 209) {
        that.wordlist(id);
        that.toast("删除成功");
        that.show1 = false;
      } else if (data.action == 303) {
        let nn = 0;
        if (that.list.length == 0) {
          that.list = data.data.reverse();
        } else {
          let list = data.data.reverse();
          nn = list.length - 1;
          that.list = list.concat(that.list);
        }
        let dd = new Date();
        if (that.list[0]) {
          dd = new Date(that.list[0].createtime.replace(/\-/g, "/"));
        }
        let date = new Date();
        let time = date - dd;
        if (time / 1000 < 3600 * 24) {
          that.time =
            (dd.getHours() >= 10 ? dd.getHours() : "0" + dd.getHours()) +
            ":" +
            (dd.getMinutes() >= 10 ? dd.getMinutes() : "0" + dd.getMinutes());
        } else {
          that.time =
            dd.getFullYear() +
            "-" +
            (dd.getMonth() + 1 >= 10
              ? dd.getMonth() + 1
              : "0" + (dd.getMonth() + 1)) +
            "-" +
            (dd.getDate() >= 10 ? dd.getDate() : "0" + dd.getDate());
        }
        that.page = that.page + 1;
        that.total = data.total;
        for (let val of that.list) {
          let msg = val.content;
          if (msg == "%get your phone%") {
            let img = that.staffimg;
            let mm = require("../assets/address.jpg");
            let dv = document.createElement("div");
            dv.className = "gettel alltxt";
            dv.innerHTML = `
              <img src="${img}" alt="" class="peoimg" />
              <div class="telbox">
                <h5>楼盘置业报告</h5>
                <img src="${mm}" alt="" />
              </div>
              `;
            $(".con").append(dv);
          } else if (msg == "%put my card%") {
            let img = that.staffimg;
            let dv = document.createElement("div");
            dv.className = "putcard alltxt";
            dv.innerHTML = `
              <img src="${img}" alt="" class="peoimg" />
              <div class="cardbox">
                <div class="top">
                  <img src="${img}" alt="" />
                  <div class="top-right">
                    <h5>${that.staffname} <span>新房咨询</span></h5>
                    <p>从业咨询服务6年</p>
                  </div>
                </div>
                <div class="bom">
                  <div class="txt">
                    <p class="num"><span>${that.usernum}</span>人</p>
                    <p class="type">服务客户</p>
                  </div>
                  <div class="txt">
                    <p class="num"><span>${that.looknum}</span>次</p>
                    <p class="type">带看客户</p>
                  </div>
                  <div class="txt">
                    <p class="num"><span>${that.rate}</span>%</p>
                    <p class="type">好评率</p>
                  </div>
                </div>
                <a href="tel:${that.stafftel}">
                <button>电话咨询</button>
                </a>
              </div>
              `;
            $(".con").append(dv);
          } else if (msg.indexOf("project_card") !== -1) {
            console.log(msg);
            msg = JSON.parse(msg);
            let img = require("../assets/talk-peo.png");
            if (that.status) {
              img = require("../assets/peoyes.png");
            } else {
              img = require("../assets/peono.png");
            }
            let txt = `
                <img src="${img}" alt="" />
              <div class="pro">
                <img src="${msg.img}" alt="" />
                <div class="pro-msg">
                  <p class="name">${msg.name}</p>
                  <p class="area">建面 ${msg.area}/m²</p>
                  <p class="price">
                    均价<span><i>${msg.price}</i>元/m²</span>
                  </p>
                </div>
              </div>
              `;
            let dv = document.createElement("div");
            dv.innerHTML = txt;
            dv.className = "peo-pro alltxt";
            $(".con").append(dv);
          } else {
            if (msg.split("face").length !== 0) {
              let index = msg.indexOf("face");
              while (index != -1) {
                var reg = /face\[[\u4e00-\u9fa5_a-zA-Z]+\]/s;
                var match = msg.match(reg);
                if (match) {
                  var title = match[0].replace("face", "");
                }
                for (let val in that.faces) {
                  if (that.faces[val].con == title) {
                    let img = require(`../assets/${val}.gif`);
                    let h = `<img src="${img}">`;
                    msg = msg.replace(`face${title}`, h);
                  }
                }
                index = msg.indexOf("face", index + 4);
              }
            }
            let dv = document.createElement("div");
            if (val.from == userid) {
              if (msg.indexOf("img:") !== -1) {
                let img = msg.substr(4);
                // let kk = require("../assets/talk-peo.png");
                let kk = require("../assets/talk-peo.png");
                if (that.status) {
                  kk = require("../assets/peoyes.png");
                } else {
                  kk = require("../assets/peono.png");
                }
                dv.className = "imgs alltxt";
                dv.innerHTML = `
                  <img src="${kk}" alt="" class="peoimg godetail" />
                  <div class="right">
                    <img class="bigimg" src="${img}" alt="" />
                  </div>
                `;
              } else {
                let img = require("../assets/talk-peo.png");
                if (that.status) {
                  img = require("../assets/peoyes.png");
                } else {
                  img = require("../assets/peono.png");
                }
                dv.className = "peo alltxt";
                dv.innerHTML = `
                    <img class="godetail" src="${img}" alt="" />
                        <p class="txt">
                          ${msg}
                        </p>
                  `;
              }
            } else {
              if (msg.indexOf("img:") !== -1) {
                let img = msg.substr(4);
                let kk = that.staffimg;
                dv.className = "imgbox alltxt";
                dv.innerHTML = `
                  <img src="${kk}" alt="" class="peoimg" />
                  <div class="right">
                    <img class="bigimg" src="${img}" alt="" />
                  </div>
                `;
              } else {
                let img = that.staffimg;
                dv.className = "you alltxt";
                dv.innerHTML = `
                    <div class="left">
                        <img src="${img}" alt="" />
                      </div>
                        <p class="txt">
                          ${msg}
                        </p>
                  `;
              }
            }
            $(".con").append(dv);
          }
        }
        let kk;
        let dds = document.getElementsByClassName("alltxt");
        if (that.page == 2) {
          kk = dds[dds.length - 1];
        } else {
          kk = dds[nn];
        }
        if (kk) {
          kk.scrollIntoView();
        }
      } else if (data.action == 206) {
        that.usernum = data.num.user_num;
        that.looknum = data.num.look_num;
        that.rate = data.num.rate;
        that.stafftel = data.staff.tel;
        that.staffname = data.staff.name;
      } else if (data.action == 301) {
        let id = sessionStorage.getItem("userid");
        let isagain = false;
        for (let val of that.list) {
          if (val.id === data.message_id) {
            isagain = true;
          }
        }
        if (data.fromUserName == id) {
          let img = require("../assets/talk-peo.png");
          if (that.status) {
            img = require("../assets/peoyes.png");
          } else {
            img = require("../assets/peono.png");
          }
          let msg = data.content;
          if (isagain) {
            return;
          }
          if (msg == "%get your phone%") {
            let mm = require("../assets/talk-tel.jpg");
            let dv = document.createElement("div");
            dv.className = "gettel alltxt";
            dv.innerHTML = `
              <img src="${img}" alt="" class="peoimg" />
              <div class="telbox">
                <img src="${mm}" alt="" />
                <div class="telbox-bom">
                  <p class="tit">为您制定专属分析报告</p>
                  <p class="msg">
                    向咨询师免费领取专属分析报告,内附有购房 流程全盘解读
                  </p>
                  <button class="mfbtn">免费领取</button>
                </div>
              </div>
              `;
            $(".con").append(dv);
            dv.scrollIntoView();
          } else if (msg == "%put my card%") {
            let mm = require("../assets/talk-tel.jpg");
            let dv = document.createElement("div");
            dv.className = "putcard alltxt";
            dv.innerHTML = `
              <img src="${img}" alt="" class="peoimg" />
              <div class="cardbox">
                <div class="top">
                  <img src="${img}" alt="" />
                  <div class="top-right">
                    <h5>${that.staffname} <span>新房咨询</span></h5>
                    <p>从业咨询服务6年</p>
                  </div>
                </div>
                <div class="bom">
                  <div class="txt">
                    <p class="num"><span>${that.usernum}</span>人</p>
                    <p class="type">服务客户</p>
                  </div>
                  <div class="txt">
                    <p class="num"><span>${that.looknum}</span>次</p>
                    <p class="type">带看客户</p>
                  </div>
                  <div class="txt">
                    <p class="num"><span>${that.rate}</span>%</p>
                    <p class="type">好评率</p>
                  </div>
                </div>
                <a href="tel:${that.stafftel}">
                <button>电话咨询</button>
                </a>
              </div>
              `;
            $(".con").append(dv);
            dv.scrollIntoView();
          } else if (data.content.indexOf("img:") !== -1) {
            let dv = document.createElement("div");
            let img = data.content.substr(4);
            let kk = require("../assets/talk-peo.png");
            if (that.status) {
              kk = require("../assets/peoyes.png");
            } else {
              kk = require("../assets/peono.png");
            }
            dv.className = "imgs alltxt";
            dv.innerHTML = `
                <img src="${kk}" alt="" class="peoimg" />
                <div class="right">
                  <img class="bigimg" src="${img}" alt="" />
                </div>
              `;
            $(".con").append(dv);
            dv.scrollIntoView();
          } else if (data.content.indexOf("project_card") !== -1) {
            let msg = JSON.parse(data.content);
            let txt = `
                <img src="${img}" alt="" />
              <div class="pro">
                <img src="${msg.img}" alt="" />
                <div class="pro-msg">
                  <p class="name">${msg.name}</p>
                  <p class="area">建面 ${msg.area}/m²</p>
                  <p class="price">
                    均价<span><i>${msg.price}</i>元/m²</span>
                  </p>
                </div>
              </div>
              `;
            let dv = document.createElement("div");
            dv.innerHTML = txt;
            dv.className = "peo-pro alltxt";
            $(".con").append(dv);
            dv.scrollIntoView();
          } else {
            if (msg.split("face").length !== 0) {
              let index = msg.indexOf("face");
              while (index != -1) {
                var reg = /face\[[\u4e00-\u9fa5_a-zA-Z]+\]/s;
                var match = msg.match(reg);
                if (match) {
                  var title = match[0].replace("face", "");
                }
                for (let val in that.faces) {
                  if (that.faces[val].con == title) {
                    let img = require(`../assets/${val}.gif`);
                    let h = `<img src="${img}">`;
                    msg = msg.replace(`face${title}`, h);
                  }
                }
                index = msg.indexOf("face", index + 4);
              }
            }
            let dv = document.createElement("div");
            dv.className = "peo alltxt";
            dv.innerHTML = `
              <img class="godetail" src="${img}" alt="" />
                  <p class="txt">
                    ${msg}
                  </p>
            `;
            $(".con").append(dv);
            dv.scrollIntoView();
          }
        } else {
          let num = 0;
          if (sessionStorage.getItem(data.fromUserName)) {
            num = parseInt(sessionStorage.getItem(data.fromUserName)) + 1;
          } else {
            num = 1;
          }
          sessionStorage.setItem(data.fromUserName, num);
        }
      }
    };

    document.getElementById("upload").addEventListener("change", function(e) {
      var file = event.currentTarget.files[0];
      if ((file.size / 1000).toFixed(0) < 2000) {
        let r = new FileReader(); //本地预览
        r.onload = function(e) {
          var imgFile = e.target.result; //或e.target都是一样的
          let img = that.staffimg;
          let dv = document.createElement("div");
          dv.className = "imgbox alltxt";
          dv.innerHTML = `
            <img src="${img}" alt="" class="peoimg" />
            <div class="right">
              <img class="bigimg" src="${imgFile}" alt="">
            </div>
          `;
          let ig = ``;
          $(".con").append(dv);
          dv.scrollIntoView();
          let ll = `img:${imgFile}`;
          let pp = {
            controller: "chat",
            action: "send",
            params: { content: ll, username: userid },
          };
          that.ws.send(JSON.stringify(pp));
        };
        let base = r.readAsDataURL(file);
      } else {
        this.toast("请不要上传超过2M的图片");
      }
    });
    $(".con").on("click", ".bigimg", function() {
      that.bigimg = $(this).attr("src");
      that.show3 = true;
    });
    $(".con").on("scroll", function() {
      if ($(this).scrollTop() == 0) {
        console.log(456);
        if (that.isok && that.total > 100 * that.page) {
          that.isok = false;
          let id = sessionStorage.getItem("uuid");
          let userid = sessionStorage.getItem("userid");
          that.record(id, userid);
        }
      }
    });
    $(".con").on("click", ".godetail", function() {
      that.$router.push("/VisitorDetail");
    });
  },
  watch: {
    addtxt(val) {
      this.addtxtnum = val.length;
    },
    talktxt(val) {
      if (val.length > 0) {
        this.msg = true;
      } else {
        this.msg = false;
      }
    },
    editmsg(val) {
      console.log(val);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="less" scoped>
.talk {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  .status {
    position: absolute;
    color: #191919;
    font-size: 0.8125rem;
    display: flex;
    align-items: center;
    top: 0;
    right: 1rem;
    p {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #49e641;
      margin-right: 0.25rem;
    }
  }
  .doen {
    color: #939399;
    p {
      background-color: #b1b1b3;
    }
  }
}
.con {
  flex: 1;
  width: 92%;
  padding: 0 4%;
  background-color: #f5f7f7;
  overflow-y: auto;
  .address {
    width: 21.5625rem;
    height: 4.1875rem;
    border-radius: .75rem;
    background-color: #fff;
    margin-top: .75rem;
    .name {
      color: #0F161A;
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: .3rem;
      padding-top: .7rem;
      padding-left: .9375rem;
      span {
        color: #FF7519;
        font-size: .6875rem;
        padding: .21875rem .3125rem;
        background-color: #FAF2ED;
        border-radius: .1875rem;
        margin-left: .5rem;
        font-weight: normal;
      }
    }
    .infotxt {
      color: #2E3133;
      font-size: .8125rem;
      padding-left: .9375rem;
    }
  }
  .huti {
    width: 18.75rem;
    height: 2rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    background: rgba(255, 117, 25, 0.1);
    border: 0.0625rem solid #ff7519;
    margin-left: 1.40625rem;
    margin-top: 0.75rem;
    span {
      color: #ff7519;
      font-size: 0.9375rem;
      margin-left: 1.5625rem;
    }
    img {
      width: 0.75rem;
      height: 0.75rem;
      margin-left: auto;
      margin-right: 0.625rem;
    }
  }
  .time {
    margin-top: 1.125rem;
    font-size: 0.75rem;
    text-align: center;
    color: #afafb3;
    margin-bottom: 1.25rem;
  }
  /deep/.you {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1.5rem;
    .left {
      width: 2.5rem;
      margin-left: 1rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 2.5rem;
      }
    }
    .txt {
      color: #fff;
      font-size: 0.875rem;
      padding: 0.75rem 0.625rem;
      border-radius: 0.375rem 0 0.375rem 0.375rem;
      background-color: #52c2cc;
      position: relative;
      bottom: -0.625rem;
      max-width: 14rem;
      align-items: center;
      word-break: break-all;
      img {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem;
      }
      a {
        color: #fff;
      }
    }
    .txt::after {
      content: "";
      display: block;
      position: absolute;
      border: 0.75rem solid transparent;
      border-top-color: #52c2cc;
      top: 0;
      right: -0.375rem;
    }
  }
  /deep/.peo {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    img {
      width: 2.5rem;
      margin-right: 1rem;
      height: 2.5rem;
    }
    .txt {
      color: #323233;
      font-size: 0.875rem;
      padding: 0.75rem 0.625rem;
      border-radius: 0 0.375rem 0.375rem 0.375rem;
      background-color: #e8eded;
      position: relative;
      bottom: -0.625rem;
      max-width: 14rem;
      img {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem;
      }
    }
    .txt::after {
      content: "";
      display: block;
      position: absolute;
      border: 0.75rem solid transparent;
      border-top-color: #e8eded;
      top: 0;
      left: -0.375rem;
    }
  }
  /deep/.peo-pro {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    img {
      width: 2.5rem;
      margin-right: 1rem;
      height: 2.5rem;
    }
    .pro {
      width: 13.75rem;
      height: 12.5rem;
      border-radius: 0.375rem;
      overflow: hidden;
      background-color: #fff;
      img {
        width: 100%;
        height: 7.375rem;
      }
      .pro-msg {
        padding-left: 0.875rem;
        .name {
          color: #19191a;
          font-size: 0.9375rem;
          margin-bottom: 0.25rem;
          margin-top: 0.25rem;
        }
        .area {
          color: #969699;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
        }
        .price {
          color: #969699;
          font-size: 0.75rem;
          span {
            color: #ff5454;
            font-size: 0.625rem;
            i {
              font-style: normal;
              font-weight: bold;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
  /deep/.gettel {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1.5rem;
    .peoimg {
      width: 2.5rem;
      margin-left: 1rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    .telbox {
      width: 15rem;
      height: 9.375rem;
      border-radius: 0.375rem;
      overflow: hidden;
      background-color: #fff;
      text-align: center;
      h5 {
        color: #0F161A;
        font-size: 1.125rem;
        font-weight: bold;
        text-align: center;
        padding-top: 1.125rem;
        margin-bottom: .75rem
      }
      img {
        width: 13.125rem;
      }
    }
  }
  /deep/.putcard {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1.5rem;
    .peoimg {
      width: 2.5rem;
      margin-left: 1rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    .cardbox {
      width: 13.125rem;
      height: 8.125rem;
      border-radius: 0.375rem;
      background-color: #fff;
      padding: 0.9375rem;
      .top {
        display: flex;
        margin-bottom: 1rem;
        img {
          width: 2.25rem;
          height: 2.25rem;
          margin-right: 0.625rem;
          border-radius: 50%;
        }
        .top-right {
          h5 {
            color: #1f1f1f;
            font-size: 0.875rem;
            font-weight: bold;
            position: relative;
            top: -0.125rem;
            span {
              color: #52c2cc;
              font-size: 0.6875rem;
              padding: 0.125rem 0.25rem;
              font-weight: 400;
              border-radius: 0.09375rem;
              background-color: #ebf9fa;
              margin-left: 0.3125rem;
            }
          }
          p {
            color: #646466;
            font-size: 0.75rem;
            margin-top: 0.125rem;
          }
        }
      }
      .bom {
        display: flex;
        margin-bottom: 0.75rem;
        .txt {
          width: 33%;
          .num {
            color: #121212;
            font-size: 0.625rem;
            padding-bottom: 0.25rem;
            border-right: 0.03125rem solid #f0f0f2;
            span {
              font-size: 1rem;
              font-weight: bold;
            }
          }
          .type {
            color: #646466;
            font-size: 0.6875rem;
            position: relative;
          }
        }
        .txt:nth-of-type(2) {
          text-align: center;
          width: 40%;
        }
        .txt:nth-of-type(3) {
          text-align: right;
          width: 27%;
          border: 0;
        }
      }
      button {
        width: 100%;
        height: 1.875rem;
        background-color: #52c2cc;
        text-align: center;
        line-height: 1.875rem;
        border-radius: 0.25rem;
        color: #fff;
        font-weight: bold;
        font-size: 0.75rem;
        border: 0;
        outline: none;
      }
    }
  }
  /deep/.imgbox {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1.5rem;
    .peoimg {
      width: 2.5rem;
      margin-left: 1rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    .right {
      img {
        max-width: 7.5rem;
      }
    }
  }
  /deep/.imgs {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    .peoimg {
      width: 2.5rem;
      margin-right: 1rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    .right {
      img {
        max-width: 7.5rem;
      }
    }
  }
}
.nav {
  width: 92%;
  height: 3.625rem;
  background-color: #fff;
  padding: 0 4%;
  .top {
    color: #646466;
    font-size: 0.8125rem;
    display: flex;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    p {
      padding: 0.375rem 1rem;
      border-radius: 0.9375rem;
      border: 0.03125rem solid #cccccc;
      margin-right: 0.625rem;
    }
    .active {
      border-color: #51c1cb;
      color: #51c1cb;
    }
    .hid {
      border-color: #d9d9d9;
      color: #d9d9d9;
    }
  }
  display: flex;
  align-items: center;
  position: relative;
  .morechang {
    width: 3.125rem;
    height: 2rem;
    border-radius: 1rem;
    background-color: #50BDC7;
    text-align: center;
    line-height: 2rem;
    color: #fff;
    font-size: .8125rem;
    margin-right: .625rem;
  }
  .moreimg {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 2rem;
    background-color: #50BDC7;
    margin-right: .8125rem;
    img {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
  .inu {
    background-color: #F0F2F2;
    flex: 1;
    height: 2.5rem;
    border-radius: .375rem;
    border: 0;
    outline: none;
    padding-left: 0.9375rem;
    margin-right: .625rem;
  }
  img {
    width: 1.75rem;
    height: 1.75rem;
  }
  img:nth-of-type(2) {
    margin-left: .8125rem;
  }
  #upload {
    width: 1.75rem;
    height: 1.75rem;
    opacity: 0;
    position: absolute;
    right: 0;
  }
  span {
    width: 2.5rem;
    height: 2.125rem;
    border-radius: 0.25rem;
    line-height: 2.125rem;
    text-align: center;
    color: #fff;
    font-size: 0.875rem;
    background-color: #52c2cc;
    margin-left: 0.5rem;
  }
}
.moretype {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 9.375rem;
  background-color: #fff;
  .typebox {
    position: relative;
    #upload {
       width: 3.25rem;
      height: 3.25rem;
      opacity: 0;
      position: absolute;
    }
    .iconbox {
      width: 3.25rem;
      height: 3.25rem;
      border-radius: .75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #F0F2F2;
      margin-bottom: .5rem;
      img {
        width: 1.75rem;
        height: 1.75rem;
      }
    }
    p {
      color: #949799;
      font-size: .75rem;
      text-align: center;
    }
  }
}
.icons {
  padding: 1.5rem 4%;
  border-top: 0.03125rem solid #f2f2f2;
  height: 11.25rem;
  overflow-y: auto;
  img {
    width: 1.625rem;
    height: 1.625rem;
    margin-right: 1.1875rem;
    margin-bottom: 1.375rem;
  }
  img:nth-of-type(8n) {
    margin-right: 0;
  }
}
.words {
  height: 16.25rem;
  /deep/.delete-button {
    height: 100%;
  }
  .lk {
    height: 12.5rem;
    overflow-y: auto;
  }
  .word {
    padding: 0 4%;
    .txt {
      color: #313133;
      font-size: 0.8125rem;
      border-bottom: 0.03125rem solid #f2f2f2;
      .ll {
        display: flex;
        align-items: center;
      }
      .showmsg {
        padding: 1.25rem 0;
      }
      .tt {
        border: 0;
        outline: none;
        color: #313133;
        line-height: 1.1875rem;
        width: 19.5rem;
        font-size: 13px;
        padding: 1.25rem 0;
      }
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      .edit {
        color: #52c2cc;
        font-size: 0.8125rem;
      }
    }
  }
  .word-btn {
    height: 3.75rem;
    display: flex;
    align-items: center;
    .btn {
      color: #181819;
      font-size: 0.875rem;
      width: 50%;
      text-align: center;
      font-weight: bold;
      img {
        width: 1.125rem;
        position: relative;
        bottom: -0.25rem;
      }
    }
    .btn:nth-of-type(1) {
      border-right: 0.03125rem solid #e5e5e5;
    }
  }
}
.addtxt {
  width: 19.6875rem;
  height: 17.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 0px 0.5625rem 0px rgba(51, 70, 87, 0.24);
  background-color: #fff;
  position: relative;
  img {
    position: absolute;
    width: 1rem;
    top: 1rem;
    right: 1rem;
  }
  h2 {
    color: #323233;
    font-size: 1.25rem;
    text-align: center;
    padding-top: 1.5rem;
    margin-bottom: 1.2rem;
  }
  textarea {
    width: 15.3125rem;
    height: 5.625rem;
    border-radius: 0.25rem;
    background-color: #f7f7f7;
    border: 0;
    outline: none;
    margin-left: 1.25rem;
    padding: 0.9375rem;
    margin-bottom: 1.4rem;
  }
  button {
    font-size: 0.9375rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background-color: #51c1cb;
    border: 0;
    outline: none;
    width: 17.1875rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    line-height: 2.5rem;
    margin-left: 1.25rem;
  }
  p {
    color: #7c7e7f;
    font-size: 0.75rem;
    position: absolute;
    right: 1.5rem;
    bottom: 6rem;
  }
}
.delmsg {
  width: 17.1875rem;
  height: 9.875rem;
  border-radius: 0.625rem;
  background-color: #fff;
  .tit {
    color: #333333;
    font-size: 1.125rem;
    text-align: center;
    padding-top: 1.25rem;
    margin-bottom: 1.125rem;
  }
  .msg {
    color: #7c7e7f;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .bom {
    border-top: 0.03125rem solid #f7f7f7;
    display: flex;
    padding-top: 0.375rem;
    p {
      width: 50%;
      font-size: 1rem;
      color: #7d7d7f;
      text-align: center;
      line-height: 2.375rem;
    }
    .btn {
      border-left: 0.03125rem solid #f2f2f2;
      color: #51c1cb;
    }
  }
}
</style>
