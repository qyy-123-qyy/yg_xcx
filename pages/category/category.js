// pages/category/category.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMeauList:[],
    // 右侧的商品数据
    rightList:[],
    //被点击的左侧的菜单
    currentIndex:0,
    //右侧内容滚动条距顶部的据距离
    scrollTop:0
  },
  // 接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    1 先判断本地存储中也没有旧的数据
       {time:Date.now(),data:[...]}
    2 没有旧数据 直接发送请求
    3 有旧的数据 同时 旧的数据也没过期 就使用 本地存储中的数据即可 
    */
    // 1 先获取本地存储的数据
    const Cates=wx.getStorageSync("cates");
    // 2 判断
    if(!Cates){
      //不存在 发送请求
      this.getCates();
    }else{
      //有旧的数据 定义过期时间
      if(Date.now()-Cates.time>1000*10){
      this.getCates();
      }else{
        //可以使用旧的数据
        this.Cates=Cates.data;
            //构造左侧菜单数据
      let leftMeauList=this.Cates.map(v=>v.cat_name);
      //构造左侧菜单数据
     let rightList=this.Cates[0].children;
     this.setData({
       leftMeauList,
       rightList
     })
      }
    }
      
  },
   // 请求分类接口
   getCates(){
    request({url:"/categories"}).then(result=>{
      console.log(result.data.message)
      this.Cates=result.data.message;
      //把接口的数据存入到本地存储中
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});       
      //构造左侧菜单数据
      let leftMeauList=this.Cates.map(v=>v.cat_name);
       //构造左侧菜单数据
      let rightList=this.Cates[0].children;
      this.setData({
        leftMeauList,
        rightList
      })
    })
  },

  // 左侧菜单点击事件
  handleItemTap(e){
    // console.log(e);
    // 获取被点击的标题的索引赋值给currentIndex
    const index=e.currentTarget.dataset.index;
    // 根据不同的索引对应显示右侧内容
    let rightList=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightList,
    //重新设置右侧内容的scroll-view标签的距离顶部的距离 
    scrollTop:0
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