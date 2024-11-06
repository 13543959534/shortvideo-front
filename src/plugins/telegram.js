// 全局插件
export default {
    install(app) {
        app.config.globalProperties.$telegram = window.Telegram.WebApp;
    }
};