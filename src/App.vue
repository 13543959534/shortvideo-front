<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="keepAliveRouteNames">
            <component :is="Component" :key="route.name" />
        </keep-alive>
    </router-view>
    <tabbar />
</template>
<script setup lang="ts">
import useRouteCache from "@/stores/modules/routeCache";
const keepAliveRouteNames = computed(() => {
    return useRouteCache().routeCaches as string[];
});
onBeforeMount(async () => {
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJfaWQiOjEyMzQ1Njc4OSwiZXhwIjoxNzMxNTY0NDg2LCJpYXQiOjE3MzA3MDA0ODYsIm5iZiI6MTczMDcwMDQ4Nn0.pi2Tjtp13q_Q6Ek-IUs87vy6VRn79p95_o11bfU2y66IaIgxpU_YIxnC1OnTSixiLmyXBE-3YUtsJfR2k0nUgw')
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
@import './assets/css/flex.css';

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
