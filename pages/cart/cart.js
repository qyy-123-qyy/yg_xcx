// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //点击收货地址事件
  handelAddress() {
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
      },
    });

    //获取权限状态
    wx.getSetting({
      success: (result) => {
        //2 获取权限状态 属性名怪异scope.address 用['']形式
        //  console.log(result.authSetting['scope.address'])
        const scopeAddress = result.authSetting['scope.address'];
        if (scopeAddress === true || scopeAddress === undefined) {
          //用户确认权限 直接调用收货地址代码
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1)
            },
          });
        } else {
          //用户拒绝过授予权权限
          wx.openSetting({
            success: (result2) => {
              console.log(result2)
              //可以调用 收货地址代码
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3)
                },
              });
            },
          });

        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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