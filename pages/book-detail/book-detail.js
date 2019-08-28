import Book from '../../models/book.js'
import Like from '../../models/like.js'
const bookModel = new Book()
const likeModel = new Like()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: null,
    likeStatus: false,
    favNums: 0,
    readOnly: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBookData(options.bid)
  },

  async initBookData(bid) {
    const bookPromise = bookModel.getBookById(bid)
    const commentsPromise = bookModel.getComments(bid)
    const bookLikeDataPromise = bookModel.getFavor(bid)
    const [book, comments, bookLikeData] = await Promise.all([
      bookPromise, commentsPromise, bookLikeDataPromise
    ])
    this.setData({
      readOnly: false,
      book,
      comments: comments.comments,
      likeStatus: bookLikeData.like_status,
      favNums: bookLikeData.fav_nums
    })
  },

  onLike(e) {
    if (!this.data.readOnly) {
      const isLike = e.detail.isLike
      likeModel.like(this.data.book.id, 400, isLike)
    }
  },

  onTag(e) {
    this.emit(e.detail.text)
  },

  onInputConfirm(e) {
    this.emit(e.detail.value)
  },

  emit(text) {
    bookModel.addComment(this.data.book.id, text)
    this.showEmitSucc()
    this.updateComments(text)
  },
  showEmitSucc() {
    wx.showToast({'title': '+ 1', 'icon': 'none'})
  },
  updateComments(text) {
    this.data.comments.unshift({
      content: text,
      nums: 1
    })
    this.setData({
      comments: this.data.comments
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
