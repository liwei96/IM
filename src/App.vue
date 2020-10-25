<template>
  <div id="app">
    <router-view :ws="ws"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ws:''
    }
  },
  created(){
    this.ws = new ReconnectingWebSocket('ws://39.98.227.114:9509?uuid=69');
    this.ws.onopen = function(){
      sessionStorage.setItem('type',1)
    }
    let id = 69
    sessionStorage.setItem('uuid',69)
  },
  beforeDestroy(){
    sessionStorage.removeItem('uuid')
    sessionStorage.removeItem('type')
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0
}
</style>
