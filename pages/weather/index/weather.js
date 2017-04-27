const weatherUtil = require('../../../utils/weatherUtil.js');
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
    weather: {}
  },

  bindViewTap: function () {

  },

  onLoad: function () {
    refreshData(this);
  },

  onPullDownRefresh: function () {
    console.log("下拉刷新了");
    refreshData(this);
  }
})