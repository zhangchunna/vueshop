<template>
  <div class="header_title">
      <!-- <div class="header_box">
        <div class="header-left" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
        </div>
        <div class="header-in">{{title}}</div>
      </div> -->
      <div class="van-hairline--bottom van-nav-bar" style="z-index: 1;">
          <div class="van-nav-bar__left" @click="$router.go(-1)">
              <i class="van-icon van-icon-arrow van-nav-bar__arrow"></i>
          </div>
          <div class="van-ellipsis van-nav-bar__title">{{title}}</div>
          <div class="van-nav-bar__right"></div>
       </div>
  </div>
</template>

<script>
import { NavBar } from 'vant';
export default {
  name:"headercom",
  props:[
      "title"
  ]
}
</script>
<style>
</style>
