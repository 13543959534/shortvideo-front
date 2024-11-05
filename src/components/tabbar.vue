<template>
    <div class="tabbar" v-if="show">
      <van-tabbar v-model="active" :route="true">
        <van-tabbar-item replace  to="/" name="home">
          <div class="tabbar-box" :class="active=='home'&&'tabbar-active'">
            <img class="tab-img" src="@/assets/image/tabbar/home_a.png" alt="" v-show="active=='home'">
            <img class="tab-img" src="@/assets/image/tabbar/home_l.png" alt="" v-show="active!='home'">
            <div>Home</div>
          </div>
        </van-tabbar-item>
        <van-tabbar-item replace  to="/foryou" name="foryou">
          <div class="tabbar-box" :class="active=='foryou'&&'tabbar-active'">
            <img class="tab-img" src="@/assets/image/tabbar/foryou_a.png" alt="" v-show="active=='foryou'">
            <img class="tab-img" src="@/assets/image/tabbar/foryou_l.png" alt="" v-show="active!='foryou'">
            <div>For You</div>
          </div>
        </van-tabbar-item>
        <van-tabbar-item replace  to="/mylist" name="mylist">
          <div class="tabbar-box" :class="active=='mylist'&&'tabbar-active'">
            <img class="tab-img" src="@/assets/image/tabbar/mylist_a.png" alt="" v-show="active=='mylist'">
            <img class="tab-img" src="@/assets/image/tabbar/mylist_l.png" alt="" v-show="active!='mylist'">
            <div>My List</div>
          </div>
        </van-tabbar-item>
        <van-tabbar-item replace  to="/profile" name="profile">
          <div class="tabbar-box" :class="active=='profile'&&'tabbar-active'">
            <img class="tab-img" src="@/assets/image/tabbar/profile_a.png" alt="" v-show="active=='profile'">
            <img class="tab-img" src="@/assets/image/tabbar/profile_l.png" alt="" v-show="active!='profile'">
            <div>Profile</div>
          </div>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </template>
  <script setup lang="ts">
    const route = useRoute();
    const active = ref('home')
    const show = computed(() => {
      if (route.meta.level && route.meta.level !== 2){
         return true;
      }else{
        return false;
      }
      
    });
  </script>
  <style lang="scss" scoped>
  .tabbar{
    ::v-deep(.van-tabbar){
      background-color: #000000;
      height: 50px;
      .van-tabbar-item{
        background-color: transparent;
      }
      .tabbar-box{
        text-align: center;
        font-family: ArialMT;
        font-size: 10px;
        color: rgba(#E7E7E7,0.64);
        .tab-img{
          width: 26px;
          height: 26px;
        }
      }
      .tabbar-active{
        color: #E7E7E7;
      }
    }
  }
  </style>