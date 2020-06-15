//index.js
//获取应用实例
const app = getApp()
// 引入用来发送请求的 方法、
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    tabList:[],
    //楼层数组
    floorList:[]  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送异步请求，获取轮播图数据 回调地狱优化的手段可以通过es6的promise来解决
/*   wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result.data.message);
        this.setData({
          swiperList:result.data.message
        })
      },
    }); */

   //发送异步请求，获取导航数据 回调地狱优化的手段可以通过es6的promise来解决
/*   wx.request({
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    method: 'GET',
    success: (result) => {
      console.log(result.data.message);
      this.setData({
        tabList:result.data.message
      })
    },
  }); */

  // 请求接口
/*     request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"}).then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
 */
this.getSwiper();
this.getTab();
this.getFloor();

  }, 
 
  // 请求轮播图接口
  getSwiper(){
    request({url:"/home/swiperdata"}).then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },

    // 请求导航接口
    getTab(){
      request({url:"/home/catitems"}).then(result=>{
        this.setData({
          tabList:result.data.message
        })
      })
    },

    // 请求楼层接口
    getFloor(){
       request({url:"/home/floordata"}).then(result=>{
         console.log(result.data.message)
         this.setData({
             floorList:result.data.message
          })
      })
     },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})