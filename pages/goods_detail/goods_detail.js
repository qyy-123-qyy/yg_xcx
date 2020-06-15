// pages/goods_detail/goods_detail.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     goodsObj:[]
  },
 
  //商品对象
   goodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const {goods_id}=options;
     console.log(goods_id)
     this.getGoodsDetail(goods_id)
  },
  //获取商品详情接口
  getGoodsDetail(goods_id){
    request({url:"/goods/detail",data:{goods_id}}).then(result=>{
    // console.log(result)
    const goodsObj=result.data.message;
    this.goodsInfo=goodsObj
    this.setData({
      goodsObj:{
        pics:goodsObj.pics,
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        goods_introduce:goodsObj.goods_introduce,
      }
    })
    })
  },
 
   //点击图片放大事件 拿不到设置全局变量goodsInfo
   handleImage(e){
    // 先构造要预览的图片数组
    const urls=this.goodsInfo.pics.map(v=>v.pics_mid);
    //点击
    const current=e.currentTarget.dataset.url
     wx.previewImage({
       current,
       urls
     });
       
   },

  //  点击加入购物车
  handelCart(){
    //1 获取缓存中的购物车 数组
    let cart=wx.getStorageSync('cart')||[];
     //2 判断商品对象是否存在数组对象中
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id) 
    if(index===-1){
     //3 不存在
     this.goodsInfo.num=1;
     cart.push( this.goodsInfo)
    }else{
      //存在 num++
      cart[index].num++;
    }
    // 5 把购物车重新添加到缓存中
  wx.setStorageSync('cart', cart);
  // 6 弹窗提示
  wx.showToast({
    title: '加入成功',
    icon: 'success',
    //防止疯狂点击按钮
    mask: true,
  });
    
      
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