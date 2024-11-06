//K M B 单位换算  decimalPlaces选择小数位
export function formatNumber(num: any, decimalPlaces: number) {
    const units = ['K', 'M', 'B'];
    let decimalFactor = Math.pow(10, decimalPlaces);
    for (let i = units.length - 1; i >= 0; i--) {
        let lower = Math.pow(10, (i + 1) * 3);
        if (num >= lower) {
            num = Math.floor((num * decimalFactor) / lower) / decimalFactor;
            num += units[i];
            break;
        }
    }
    return num;
}

export function base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
}