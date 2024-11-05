import { defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import VueRouter from 'unplugin-vue-router/vite'
 // 配置@别名
import { resolve } from "path";
import pxtovw from 'postcss-px-to-viewport'
const loder_pxtovw = pxtovw({
    //这里是设计稿宽度 自己修改
    unitToConvert: "px",// 要转化的单位
    viewportWidth: 375,// UI设计稿的宽度
    unitPrecision: 3,// 转换后的精度，即小数点位数
    propList: [
      "*"
    ],// 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    viewportUnit: "vw",// 指定需要转换成的视窗单位，默认vw
    fontViewportUnit: "vw",// 指定字体需要转换成的视窗单位，默认vw
    landscapeUnit: 'vh',// 横屏时使用的单位
    landscapeWidth: 667,// 横屏时使用的视口宽度
    selectorBlackList: [],// 指定不转换为视窗单位的类名
    minPixelValue: 1,// 默认值1，小于或等于1px则不进行转换
    mediaQuery: false,// 是否在媒体查询的css代码中也进行转换，默认false
    replace: true,// 是否转换后直接更换属性值
    // landscape: false, // 是否处理横屏情况
    exclude: /(\/|\\)(node_modules)(\/|\\)/, // 设置忽略文件，用正则做目录名匹配
  })
// https://vitejs.dev/config/
export default (({mode}:any)=>{
  return defineConfig({
    plugins: [
      VueRouter({}),
      vue(),
      AutoImport({
        //安装两行后你会发现在组件中不用再导入ref，reactive等
        imports: ['vue', 'vue-router'],
              //存放的位置
        dts: "src/auto-import.d.ts",
      }),
      Components({
        // 引入组件的,包括自定义组件
        resolvers: [VantResolver()],
        // 存放的位置
        dts: "src/components.d.ts",
      }),
    ],
    resolve: {
      // ↓路径别名
      alias: {
        '@': resolve(__dirname, './src'),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    css: {
      postcss: {
        plugins: [loder_pxtovw]
      }
    },
    // 跨域前端处理
    server: {
      port: 8081,
      host: true,
      proxy: {//同时打开Network服务代理
        '/api': { // 匹配请求路径，
          target: process.env.NODE_ENV === "production" ? "https://live.vrsuperhappy.com/" : "https://api.sunmax.top", //跨域到的地址
          changeOrigin: true,//是否跨域
          rewrite: (path) => path.replace('/api', '/')
        }
      }
    },
    // 定义环境变量
    define: {
      'process.env': loadEnv(mode,process.cwd())
    },
  })
})
