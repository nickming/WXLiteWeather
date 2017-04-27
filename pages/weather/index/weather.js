const weatherUtil = require('../../../utils/weatherUtil.js');
const imageUtil=require('../../../utils/imageUtil.js');
var app = getApp();

function refreshData(that) {
  weatherUtil.loadWeatherData((success, data) => {
    that.setData({
      weather: data
    });
    wx.stopPullDownRefresh();
  });
}

Page({
  data: {
    title: 'Lite天气',
    weather: {},
    backgroudUrl:''
  },

  bindViewTap: function () {

  },

  onLoad: function () {
    var that=this;
    imageUtil.requestDailyImageUrl((url)=>{
        that.setData({
          backgroudUrl:url
        });
    });
    refreshData(that);
  },

  onPullDownRefresh: function () {
    console.log("下拉刷新了");
    refreshData(this);
  }
})