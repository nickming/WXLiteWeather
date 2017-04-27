const defaultUrl = 'http://attach.bbs.miui.com/forum/201601/18/192538xnn4xeaahx6jhhpa.png.thumb.jpg';

/**
 * 获取每日图片地址
 */
function requestDailyImageUrl(callback) {
    wx.request({
      url: 'https://bing.ioliu.cn/v1/rand?w=720&h=1280&type=json',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var result=res.data.data.url;
        console.log(result);
        callback(defaultUrl);
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}

module.exports = {
    requestDailyImageUrl: requestDailyImageUrl
}