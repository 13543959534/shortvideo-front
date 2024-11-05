<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="keepAliveRouteNames">
            <component :is="Component" :key="route.name" />
        </keep-alive>

    </router-view>
    <tabbar />
</template>
<script setup lang="ts">
import useRouteCache from "@/store/modules/routeCache";
const keepAliveRouteNames = computed(() => {
    return useRouteCache().routeCaches as string[];
});
import { registerUser } from "@/request/api";
onBeforeMount(async ()=>{
    // @ts-ignore
    window.Telegram.WebApp.ready();
    // @ts-ignore
    window.Telegram.WebApp.expand();
    // @ts-ignore
    window.Telegram.WebApp.disableVerticalSwipes();
    // const data = await registerUser({
    //     // @ts-ignore
    //     data: Telegram.WebApp.initData,
    // });
    // console.log(data)
})
</script>
<style>
@import './assets/css/common.css';

html,
body {
    margin: 0;
    padding: 0;
    user-select: text;
}

#app {
    width: 100%;
    height: 100vh;
}

html {
    height: 100%;
}
</style>
