import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores'
import 'virtual:uno.css'
import '@/styles/app.less'
import { i18n } from '@/utils/i18n'
import telegramPlugin from './plugins/telegram';
import { localStorage } from '@/utils/local-storage'
import { VueClipboard } from '@soerenmartius/vue3-clipboard';

const screenSize = `${screen.width}x${screen.height}`;
const userAgent = navigator.userAgent;
const platform = navigator.platform;
const language = navigator.language;

const deviceId = `${screenSize}-${userAgent}-${platform}-${language}`;
localStorage.set('deviceId', deviceId)
// console.log('Device ID:', deviceId);


import vconsole from 'vconsole';
console.log(location.href.indexOf(
    'https://test-tg-minglive-web.spakc.com',
))
if (
    location.href.indexOf(
        'https://test-tg-minglive-web.spakc.com',
    ) > -1 ||
    location.href.indexOf('https://pre-newactivity.vrsuperhappy.com/') > -1
) {
    new vconsole();
}

// Vant 桌面端适配
import '@vant/touch-emulator'

/* --------------------------------
Vant 中有个别组件是以函数的形式提供的，
包括 Toast，Dialog，Notify 和 ImagePreview 组件。
在使用函数组件时，unplugin-vue-components
无法自动引入对应的样式，因此需要手动引入样式。
------------------------------------- */
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
const app = createApp(App)
const head = createHead()
app.use(VueClipboard);


app.use(pinia)



app.use(head)

app.use(i18n)
app.use(telegramPlugin);
app.use(router)
app.mount('#app')


