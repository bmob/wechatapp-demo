// pages/interface/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_height: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    current: 0,
    tabStyle: {
      'color': '#333',
      'width:': '80px'
    },
    activeTabStyle: {
      'color': '#ff2a00',
      'border-right': '1px solid #ff2a00'
    },
    tabItems: [{ name: '男装' }, { name: '女装' }, { name: '美妆' }, { name: '配饰' }, { name: '鞋靴' }],
    height: wx.DEFAULT_CONTENT_HEIGHT,
    tabContents: [{
      subCategoryList: [{
        categoryName: '男士羽绒/棉服',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/83/rBACW1mlMEiAWNITAAAiWsyngD0082.jpg'
      }, {
        categoryName: '男士风衣/大衣',
        imageUrl: 'https://bfs.biyao.com/group1/M00/18/76/rBACVFmSkKqAHYBNAAAfdj1aPOI825.jpg'
      }, {
        categoryName: '男士皮衣/棉夹克',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7B/rBACW1lTWD-APUeLAAAgYMZ9cH4426.jpg'
      }, {
        categoryName: '男士羊绒/毛衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/11/rBACW1nEdiOAfwQUAAAdaKb5jVI059.jpg'
      }, {
        categoryName: '男士衬衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/10/rBACYVnEdjqAXa7NAAAcW-pnhDk339.jpg'
      }, {
        categoryName: '男士针织衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/10/rBACYVnEdhqAdI2cAAAdtV7BASE873.jpg'
      }, {
        categoryName: '男士西服',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/10/rBACYVnEdp6ASDIYAAAcoXEchKM497.jpg'
      }, {
        categoryName: '男士卫衣',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/83/rBACW1mlMEiAWNITAAAiWsyngD0082.jpg'
      }, {
        categoryName: '男士马甲',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/5C/rBACVFnEdn6AeSRuAAAdMuV88TU961.jpg'
      }, {
        categoryName: '男士T桖',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/11/rBACW1nEdrqAFS0pAAAbGxuAh3s074.jpg'
      }, {
        categoryName: '男士POLO衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/BF/rBACVFlTUwaAZDEUAAAXdtIxOTE832.jpg'
      }, {
        categoryName: '男士羽绒/棉服',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/83/rBACW1mlMEiAWNITAAAiWsyngD0082.jpg'
      }, {
        categoryName: '男士风衣/大衣',
        imageUrl: 'https://bfs.biyao.com/group1/M00/18/76/rBACVFmSkKqAHYBNAAAfdj1aPOI825.jpg'
      }, {
        categoryName: '男士皮衣/棉夹克',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7B/rBACW1lTWD-APUeLAAAgYMZ9cH4426.jpg'
      }, {
        categoryName: '男士羊绒/毛衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/11/rBACW1nEdiOAfwQUAAAdaKb5jVI059.jpg'
      }, {
        categoryName: '男士衬衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/10/rBACYVnEdjqAXa7NAAAcW-pnhDk339.jpg'
      }, {
        categoryName: '男士针织衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/10/rBACYVnEdhqAdI2cAAAdtV7BASE873.jpg'
      }, {
        categoryName: '男士西服',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/10/rBACYVnEdp6ASDIYAAAcoXEchKM497.jpg'
      }, {
        categoryName: '男士卫衣',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/83/rBACW1mlMEiAWNITAAAiWsyngD0082.jpg'
      }, {
        categoryName: '男士马甲',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/5C/rBACVFnEdn6AeSRuAAAdMuV88TU961.jpg'
      }, {
        categoryName: '男士T桖',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/11/rBACW1nEdrqAFS0pAAAbGxuAh3s074.jpg'
      }, {
        categoryName: '男士POLO衫',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/BF/rBACVFlTUwaAZDEUAAAXdtIxOTE832.jpg'
      }]
    }, {
      subCategoryList: [{
        categoryName: '羽绒服/棉衣',
        imageUrl: 'https://bfs.biyao.com/group1/M00/22/75/rBACYVoJXFWAO5cFAAAb2M98n4o855.jpg'
      }, {
        categoryName: '女士风衣/大衣',
        imageUrl: 'https://bfs.biyao.com/group1/M00/20/49/rBACW1n5clWAVX2uAAASnuS2XK0400.jpg'
      }, {
        categoryName: '女士针织/羊毛',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1E/91/rBACVFn5cmSAEScBAAAeobcsVlI982.jpg'
      }, {
        categoryName: '女士风衣/大衣',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/5C/rBACVFnEdu6AWR3KAAAWZfdXbn0829.jpg'
      }, {
        categoryName: '女士针织/羊毛',
        imageUrl: 'https://bfs.biyao.com/group1/M00/22/75/rBACYVoJXFWAO5cFAAAb2M98n4o855.jpg'
      }, {
        categoryName: '连衣裙',
        imageUrl: 'https://bfs.biyao.com/group1/M00/20/49/rBACW1n5cqKAVtWGAAATyCv5qtg488.jpg'
      }, {
        categoryName: '半身裙',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/10/rBACYVnEd2GAVFVFAAAUGbA2jt0796.jpg'
      }, {
        categoryName: '女式休闲裤',
        imageUrl: 'https://bfs.biyao.com/group1/M00/20/49/rBACW1n5cpCAXEiRAAAS6G7GxPc087.jpg'
      }, {
        categoryName: '女士牛仔裤',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1E/91/rBACVFn5coaAceDXAAAYKP_2i08331.jpg'
      }, {
        categoryName: '女士短裤',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1D/11/rBACW1nEd0CAUNCgAAAS3TdE36o054.jpg'
      }]
    }, {
      subCategoryList: [{
        categoryName: '水/精华/霜',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1B/5C/rBACVFnEeRuAORxOAAATl1iWPNY037.jpg'
      }, {
        categoryName: '面膜',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7B/rBACYVlTZQeAIuPIAAAkVEeSY_w874.jpg'
      }, {
        categoryName: '卸妆',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/C1/rBACVFlTZSOAF4vBAAAPBXoAoOM906.jpg'
      }, {
        categoryName: '男士护肤',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/81/rBACW1lTiWyAPiEPAAAs6qov5NM096.jpg'
      }, {
        categoryName: '底妆',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7B/rBACYVlTZhKAa2xoAAAl7phK3JY573.jpg'
      }, {
        categoryName: '唇妆',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7B/rBACYVlTZQeAIuPIAAAkVEeSY_w874.jpg'
      }, {
        categoryName: '眼妆',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7D/rBACW1lTZriAA_zGAAAmKD1Td5k381.jpg'
      }, {
        categoryName: '香水',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/C2/rBACVFlTZh2Aa8QJAAAePFJ0kf0429.jpg'
      }, {
        categoryName: '美妆工具',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/C2/rBACVFlTazWASZoCAAAkKEeEvFs736.jpg'
      }, {
        categoryName: '美甲',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7C/rBACYVlTalGAR-L5AAAcsykQ3xs773.jpg'
      }]
    }, {
      subCategoryList: [{
        categoryName: '文胸/套装',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/7D/rBACYVlTdF6AEMX9AAAl_0cr7sE250.jpg'
      }, {
        categoryName: '女士内裤',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/8E/rBACYVlUcvyAeE4cAAAeuvesr3I388.jpg'
      }, {
        categoryName: '男士内裤',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/C3/rBACVFlTdZaAdL_sAAAgIGJyF6E950.jpg'
      }, {
        categoryName: '秋衣秋裤',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/77/rBACVFltpV-AF4qXAAAUm8xPQuY795.jpg'
      }, {
        categoryName: '袜子',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/C3/rBACVFlTdRaAYRN-AAASQHYEvWw312.jpg'
      }, {
        categoryName: '俩裤袜',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1E/92/rBACVFn5cuOAOKKDAAAMoaW_ing799.jpg'
      }]
    }, {
      subCategoryList: [{
        categoryName: '女靴',
        imageUrl: 'https://bfs.biyao.com/group1/M00/1C/7E/rBACW1m4oLSAW6hxAAAeCjJEIXA902.jpg'
      }, {
        categoryName: '女士雪地靴',
        imageUrl: 'https://bfs.biyao.com/group1/M00/20/4A/rBACW1n5dr6ASj8MAAATaEMA3ik329.jpg'
      }, {
        categoryName: '女士单鞋',
        imageUrl: 'https://bfs.biyao.com/group1/M00/13/AD/rBACVFlSWpiAY4lJAAAeSzACwl8995.jpg'
      }, {
        categoryName: '女士休闲鞋',
        imageUrl: 'https://bfs.biyao.com/group1/M00/15/68/rBACW1lSWniACzrrAAAYINnkU5M044.jpg'
      }, {
        categoryName: '女靴',
        imageUrl: 'https://bfs.biyao.com/group1/M00/20/4A/rBACW1n5dr6ASj8MAAATaEMA3ik329.jpg'
      }]
    }],
    tabContentData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  navigateBack: function navigateBack() {
    wx.navigateBack();
  },
  handleChange: function handleChange(e) {
    console.log(e);
    var index = e.detail.index;
    this.setData({
      current: index,
      tabContentData: this.data.tabContents[index]
    });
  },

  onReady: function onReady() {
    this.setData({
      tabContentData: this.data.tabContents[0]
    });
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