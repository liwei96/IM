<template>
  <div class="VisitorDetail">
    <header>
      <img src="../assets/goback.png" alt="" @click="back"/>
      访客详情
    </header>
    <div class="con">
      <div class="card">
        <div class="card-top">
          <img src="../assets/peo.png" alt="" />
          <span class="city">浙江_杭州</span>
          <span class="type" v-if="istalk">已被邀请</span>
          <span class="status" v-if="isup">访问中</span>
          <span class="status1" v-if="!isup">已离开</span>
        </div>
        <p class="cardinfo">访客ID <span> 81345736457346544</span></p>
        <p class="cardinfo">IP地址 <span> 115.220.188.246 </span></p>
      </div>
      <h2>访客记录</h2>
      <ul>
        <li>访问项目 <span>临安宝龙广场</span></li>
        <li>访问时间 <span>2020-09-22 08:23:56</span></li>
        <li>离开时间 <span>-</span></li>
        <li>访问页数 <span>1页</span></li>
      </ul>
    </div>
    <div class="bom1" v-if="!istalk">
      <button :class="!isup?'btn':''" @click="gotalk">{{ btnmsg }}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnmsg: "进入聊天",
      isup:true,
      istalk:false
    };
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    gotalk(){
      let status = 1
      if(status == 1){
        this.$router.push('/talk')
      }else{
        this.toast('访客已被沟通')
      }
      
    }
  },
  created(){
    if(sessionStorage.getItem('type') == 2){
      this.btnmsg = '进入聊天'
    }else{
      this.btnmsg = '开始沟通'
    }
  }
};
</script>
<style lang="less" scoped>
header {
  height: 2.75rem;
  line-height: 2.75rem;
  text-align: center;
  color: #19191a;
  font-size: 1.125rem;
  position: relative;
  z-index: 1;
  margin-bottom: 0.9375rem;
  img {
    width: 1.5rem;
    position: absolute;
    left: 1rem;
    margin-top: 0.5625rem;
  }
}
li {
  list-style: none;
}
.con {
  padding: 0 4%;
  .card {
    width: 100%;
    height: 8.75rem;
    border-radius: 0.625rem;
    box-shadow: 0px 0px 0.5625rem 0px rgba(52, 71, 87, 0.14);
    margin-bottom: 3.125rem;
    .card-top {
      padding-left: 0.9375rem;
      padding-top: 0.9375rem;
      align-items: center;
      display: flex;
      margin-bottom: 1rem;
      img {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 0.875rem;
      }
      .city {
        color: #19191a;
        font-size: 1.25rem;
      }
      .type {
        color: #52c2cc;
        font-size: 0.75rem;
        padding: 0.3125rem 0.5625rem;
        background-color: #ebf9fa;
        border-radius: 0.1875rem;
        margin-left: 0.5rem;
      }
      .status {
        color: #ff7519;
        font-size: 0.75rem;
        padding: 0.3125rem 0.375rem;
        background-color: #fff7f2;
        border: 0.03125rem solid #ffd0b1;
        border-radius: 0.1875rem;
        margin-left: auto;
        margin-right: 0.9375rem;
      }
      .status1 {
        color: #b1b1b3;
        font-size: 0.75rem;
        padding: 0.3125rem 0.375rem;
        background-color: #f5f5f7;
        border: 0.03125rem solid #d7d7d9;
        border-radius: 0.1875rem;
        margin-left: auto;
        margin-right: 0.9375rem;
      }
    }
    .cardinfo {
      color: #626266;
      font-size: 0.875rem;
      padding-left: 0.9375rem;
      margin-bottom: 0.875rem;
      span {
        color: #19191a;
        margin-left: 0.25rem;
      }
    }
  }
  h2 {
    color: #19191a;
    font-size: 1rem;
  }
  ul {
    li {
      color: #626266;
      font-size: 0.9375rem;
      line-height: 3.375rem;
      border-bottom: 0.0625rem solid #f2f2f2;
      span {
        color: #19191a;
        margin-left: 1.875rem;
      }
    }
  }
}
.bom {
  width: 92%;
  position: fixed;
  bottom: 0;
  padding: 0 4%;
  padding-bottom: 1rem;
  button {
    width: 10.125rem;
    height: 2.75rem;
    border-radius: 0.25rem;
    text-align: center;
    line-height: 2.75rem;
    font-size: 1rem;
    border: 0;
    outline: none;
  }
  button:nth-of-type(1) {
    background-color: #52c2cc;
    color: #fff;
  }
  .av1 {
    background-color: #aadce0 !important;
  }
  button:nth-of-type(2) {
    color: #52c2cc;
    border: 0.0625rem solid #52c2cc;
    background-color: #fff;
    float: right;
  }
  .av2 {
    color: #aadce0 !important;
    border-color: #aadce0 !important;
  }
}
.bom1 {
  width: 92%;
  position: fixed;
  bottom: 0;
  padding: 0 4%;
  padding-bottom: 1rem;
  button {
    width: 100%;
    font-size: 1rem;
    text-align: center;
    line-height: 2.75rem;
    border-radius: 0.25rem;
    background-color: #52c2cc;
    color: #fff;
    border: 0;
  }
  .btn {
    background-color: #aadce0;
  }
}
</style>