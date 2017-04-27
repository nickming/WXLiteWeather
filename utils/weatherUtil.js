const baseUrl = 'https://free-api.heweather.com/v5/weather?key=19713447578c4afe8c12a351d46ea922';
const app = getApp();

/**
 * 根据经纬度获取天气
 */
function requestWeatherByLocation(latitude, longitude, callback) {
    wx.request({
        url: baseUrl + '&city=' + longitude + ',' + latitude,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            // success
            var result = pareseWeahterData(res);
            callback(true, result);
        },
        fail: function (res) {
            // fail
            callback(false);
        }
    });
}

/**
 * 获取天气回调
 */
function requestWeatherData(callback) {
    requestLocation((success, latitude, longitude) => {
        if (success == false) {
            latitude = 120.343;
            longitude = 36.088;
        }
        requestWeatherByLocation(latitude, longitude, callback);
    });
}

/**
 * 解析数据
 */
function pareseWeahterData(orign) {
    var weather = {};
    console.log(orign);
    var data = orign.data.HeWeather5[0];
    weather.city = data.basic.city;
    weather.now = data.now;
    weather.daily = data.daily_forecast;
    weather.suggestion = data.suggestion;
    weather.basic = data.basic;
    weather.update = data.basic.update.loc.substring(10, 16);
    weather.aqi=data.aqi.city;
    console.log(weather);
    return weather;
}

/**
 * 获取位置信息，返回经纬度
 */
function requestLocation(callback) {
    wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
            callback(true, res.latitude, res.longitude);
        },
        fail: function (res) {
            callback(false);
        }
    });
}

function loadWeatherData(callback) {
    requestWeatherData(callback);
}

module.exports = { loadWeatherData: loadWeatherData }