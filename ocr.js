var fs = require('fs');
var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "19228290";
var API_KEY = "FFPKNGwXdv2sQI4vGI0RfxRb";
var SECRET_KEY = "MVi5Vq6k8HWsdDAPCCUs3MlQBjiHXpHt";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
function ocr( image, callback ) {
    var options = {};
    options["language_type"] = "CHN_ENG";
    options["detect_direction"] = "true";
    options["detect_language"] = "true";
    options["probability"] = "true";
    // 调用通用文字识别, 图片参数为本地图片
    client.generalBasic(image, options).then(function (result) {
        callback( result )
    }).catch(function (err) {
        // 如果发生网络错误
        console.log(err);
    });
}
module.exports = ocr;
