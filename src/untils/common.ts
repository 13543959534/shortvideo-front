/**
 * 全局通用函数汇总
 *
 */

/**
 * H5传参给APP
 * @param funcName:原生方法名  data
 * @param data:传给原生的数据
 * @returns {}
 */

export function sendAppMsg(funcName:string, data:string, data2:string):void {
    console.log('funcName:', funcName);
    if (versions().ios) {
        console.log('iosData', data);
        (window as any).webkit.messageHandlers[funcName].postMessage(data);
    } else if (versions().android) {
        console.log('androidData', data);
        console.log('方法', (window as any).JSBridgeService);
        if (data) {
            if (data2) {
                (window as any).JSBridgeService[funcName](data, data2);
            } else {
                (window as any).JSBridgeService[funcName](data);
            }
        } else {
            (window as any).JSBridgeService[funcName]();
        }
    }
}

/**
 * 获取地址参数
 * @param url
 * @returns {unescape}
 */
export function getQueryString() {
    let as = {token:""};
    if (document.URL.split('?').length == 1) return as;
    let param = document.URL.split('?')[1];
    if (param) {
        let arr = param.split('&');
        arr.forEach((itm) => {
            let paramsArr = itm.split('=');
            as[paramsArr[0]] = paramsArr[1];
        });
        if (as.token) {
            localStorage.setItem('token', as.token);
        }
    }
    return as;
}
//数字用分隔符分开
export function numCutting(num:string | number) {
    let numStr = num.toString();
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 删除 Cookie
export function delCookie(name:string) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
    }
}
//获取 Cookie
export function getCookie(name:string) {
    let arr:any,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
//设置 Cookie
export function setCookie(cname:string, cvalue:string, exdays:number) {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}
/**
 * 时间戳转时间 formatDate(new Date(时间戳),'hh:mm dd/MM/yyyy')
 * */
export function formatDate(date:Date, fmt:string) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return fmt;
}
function padLeftZero(str:string) {
    return ('00' + str).substr(str.length);
}
/**
 *  微信判断
 * @param
 * @returns
 */

export function is_weixn() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' as unknown) {
        return true;
    } else {
        return false;
    }
}
/**
 * 登录设备
 * @param
 * @returns
 */
export function deviceCheck() {
    var device = '';
    if (versions().mobile) {
        if (versions().android) {
            device = 'android';
        } else if (versions().ios) {
            device = 'ios';
        } else {
            device = 'mobile';
        }
    } else {
        device = 'web';
    }
    return device;
}

/**
 * 设备信息
 * @param ""
 * @returns {}
 */
export function versions() :any {
    var u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1, //IE
        presto: u.indexOf('Presto') > -1, //opera
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //判断是否是移动端  是true 否false
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //是否ios  是true  否false
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //是否android  是true  否false
        iPhone: u.indexOf('iPhone') > -1, //iPhone
        iPad: u.indexOf('iPad') > -1, //iPad
        webApp: u.indexOf('Safari') == -1, //web
        weixin: u.indexOf('MicroMessenger') > -1, //weixin
        weibo:
            u.match(/WeiBo/i) == 'WeiBo' as unknown ||
            u.match(/Weibo/i) == 'Weibo' as unknown ||
            u.match(/weibo/i) == 'weibo' as unknown,
        qq: u.match(/qq/i) == 'qq' as unknown || u.match(/QQ/i) == 'QQ' as unknown, //qq
        qqBrower: u.indexOf('Mobile MQQbrow') == -1 && u.indexOf('MQQbrow') != -1,
    };
}