// pages/goods_list/goods_list.js\
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabs:[
       {
         id:0,
         value:"综合",
         isActive:true
       },
       {
        id:0,
        value:"销量",
        isActive:false
      },
      {
        id:0,
        value:"价格",
        isActive:false
      },
     ],
     //商品列表数组
     goodsList:[]
  },
 
  // 接口要的参数
  queryParams:{
    query:'',
    cid:'',
    pagesize:10,
    pagenum:1,
  },


  //标题点击事件 从子组件传递guolai
  handelTabsItemChange(e){
    // console.log(e);
    //获取被点击标题的索引
    const index=e.detail;
    //修改原数组
    let tabs=this.data.tabs;
    // console.log(tabs)
    //修改被点击的样式
    tabs.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false;
    })
    //赋值到data中
    this.setData({
      tabs
    })
  },
//  总页数
  totalPages:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
  this.queryParams.cid=options.cid;
  this.getGoodsList();
  },

  //获取商品列表的数据
  getGoodsList(){
    request({url:"/goods/search?",data:this.queryParams}).then(result=>{
    //  console.log(result.data.message.goods);
    //获取总条数
    const total=result.data.message.total
    //console.log(total)
    // 计算总页数 出了问题 写成const totalPages=Math.ceil(total/this.queryParams.pagesize);
    this.totalPages=Math.ceil(total/this.queryParams.pagesize);
    const goods=result.data.message.goods
    // console.log(totalPages)
    this.setData({
      //拼接数组
      goodsList:[...this.data.goodsList,...goods], 
      // goodsList:goods,
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
      
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  // 1 找到滚动触底事件m
  onReachBottom: function () {
    //  console.log("到底了")
    //判断是否还有下一页
    if(this.queryParams.pagenum>=this.totalPages){
     //上拉没有数据显示
      wx.showToast({
        title: '没有更多数据了',
      });
        
    }else{
      this.queryParams.pagenum++;
      this.getGoodsList()
    }
  },

    /**
   * 页面下拉刷新事件的处理函数
   */
  onPullDownRefresh(){
    //1 重置数组
    this.setData({
     goodsList:[]
    })
    //2 重置页码
    this.queryParams.pagenum=1;
    // 3 发送请求
    this.getGoodsList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})