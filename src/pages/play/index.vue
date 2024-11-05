<template>
  <div class="video">
    <video id="my-video" class="video-js vjs-default-skin" preload="auto">
      <source type="application/x-mpegURL">
    </video>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'play'
})
definePage({
  name: 'play',
  meta: {
    keepAlive: false,
    level: 2
  },
})
import videojs from "video.js"
import "video.js/dist/video-js.css"
const myPlayer = ref()
const playVideo = reactive({
  videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
})
onBeforeMount(() => {
  console.log("2.组件挂载页面之前执行----onBeforeMount");
});
onMounted(() => {
  initVideoSource()
  // @ts-ignore
  videojs.Vhs.xhr.beforeRequest = function (options: any) {
    let headers = options.headers || {};
    // headers["token"] = "J2LqH1mnoXE0ZL5typ3VT3n4fe7RFYAO";

    options.headers = headers;

    console.log("options", options);

    return options;
  };
});
function initVideoSource() {
  myPlayer.value = videojs('my-video', {
    width:"100%",
    height:"100%",
    controls: true, // 是否显示控制条
    preload: 'auto',
    autoplay: false,
    loop: false, // 循环播放
    // fluid: true, // 自适应宽高
    language: 'zh-CN', // 设置语言
    muted: false, // 是否静音
    inactivityTimeout: false,
    poster:"https://livecdn.vrsuperhappy.com/livchat/images20241030/17302923027642145.png",
    // 设置控制条组件
    controlBar: { // 设置控制条组件
      //  设置控制条里面组件的相关属性及显示与否
      // currentTimeDisplay: true,
      // timeDivider: true,
      // durationDisplay: true,
      // remainingTimeDisplay: false,
      // volumePanel: {
      //   inline: false,
      // },
      // pictureInPictureToggle: false,
      // 或者使用 children 定义
      /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
      children: [
        // { name: 'playToggle' }, // 播放按钮
        { name: 'currentTimeDisplay' }, // 当前已播放时间
        { name: 'progressControl' }, // 播放进度条
        { name: 'durationDisplay' }, // 总时间
        // {
        //   name: 'volumePanel', // 音量控制
        //   inline: false, // 不使用水平方式
        // },
        // { name: 'FullscreenToggle' }, // 全屏
      ],
    },
    sources: [
      {
        src: playVideo.videoUrl,
        type: 'application/x-mpegURL',
      },
    ],
    userActions: {
      click:true,
      hotkeys: true,
    },
    
  })
  console.log(myPlayer.value)
    myPlayer.value.on('click', function() {
        console.log('视频被点击了！');
    });
}
// 为播放器添加点击事件监听器
</script>
<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100vh;
  ::v-deep(.video-js){
    width: 100%;
    height: 100%;
    // 封面图片
    .vjs-poster{
      img{
        height: auto;
        max-height: 100%;
      }
    }
    // 进度条
    .vjs-control-bar{
      width: 342px;
      height: 63px;
      background: rgba(#000000,0.6);
      margin: 0 auto;
      .vjs-progress-holder{
        top: -12px;
      }
      // 已播放时间
      .vjs-current-time{
        display: block;
        position: absolute;
        left: 0px;
        bottom: 24px;
        height: 12px;
        line-height: 12px;
      }
      .vjs-current-time::after{
        content: "/";
        position: absolute;
        right: 5px;
        top: 0;
      }
      // 总时间
      .vjs-duration{
        display: block;
        position: absolute;
        left: 26px;
        bottom: 24px;
        color: rgba(#fff,0.6);
        height: 12px;
        line-height: 12px;
      }
    }
  }
}
</style>
