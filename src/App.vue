<template>
  <div id="app">
    <router-view :ws="ws"/>
  </div>
</template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket';
export default {
  data(){
    return {
      ws:''
    }
  },
  created(){
    let id = (this.$route.query.id || sessionStorage.getItem('myid'))
    console.log(id,this.$route.query.id,this.$route.query)
    if(id){
      sessionStorage.setItem('myid',id)
      sessionStorage.setItem('uuid',id)
    }
    this.ws = new ReconnectingWebSocket('ws://39.98.227.114:9509?uuid='+id);
    this.ws.onopen = function(){
      sessionStorage.setItem('type',1)
    }
  },
  mounted(){
    resetrem();
    //切换屏幕 （横屏竖屏）
    window.addEventListener("orientationchange", resetrem);
    //resize：屏幕的大小发生改变就触发监听事件resetrem
    window.addEventListener("resize", resetrem);
    function resetrem() {
      var html = document.querySelector("html"); //获取到html元素
      var width = html.getBoundingClientRect().width; //获取屏幕的宽度
      html.style.fontSize = width / 23.5 + "px";
    }
  },
  beforeDestroy(){
    sessionStorage.removeItem('type')
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0
}
html {
  max-width: 540px;
}
</style>
