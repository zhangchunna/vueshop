<template>
  <div id="app">
    <router-view/>
    <app-footer v-if="$route.meta.navshow"></app-footer>
  </div>
</template>

<script>
import AppFooter from './pages/footer/footer';
export default {
  name: 'App',
  components:{
    AppFooter
  },
}
</script>

<style>
 @import './font/iconfont.css';
 @import './styles/style.css';  
 body, html {
    background-color: #f4f4f4;
    font-size: 16px;
    min-height: 100%;
    margin: 0;
    padding: 0;
}
#app{
  max-width: 640px;
  margin: 0 auto;
}
</style>
