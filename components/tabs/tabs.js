// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  //接收父组件goods_list的数据tabs="{{tabs}}"
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handelItemTap(e){
      // console.log(e);
      //1 获取点击的元素
      const index=e.currentTarget.dataset.index;
      console.log(index)
      // 2 触发父组件中的事件 自定义
      this.triggerEvent("tabsItemChange",index)
    }
  }
})
