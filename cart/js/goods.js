class Goods {
  constructor() {
    this.list();

  }

  // 1.发送ajax请求获取数据想购物车中添加数据
  list () {
    ajax.get('./server/goods.php', { fn: 'lst' }).then(res => {
      // console.log(res);  拿到返回数据,是字符串,需要解构赋值,转化为对象
      let { data, stateCode } = JSON.parse(res);
      let str = '';
      if (stateCode == 200) {
      data.forEach(ele => {
      str+=`<div class="goodsCon"><a target = "_blank" >
            <img src="${ele.goodsImg}" class="icon"><h4 class="title">${ele.goodsName}</h4>
            <div class="info">限时抢购200条</div></a><div class="priceCon">
            <span class="price">￥${ele.price}</span>
            <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span>
            <div><span class="soldText">已售${ele.num}%</span>
            <span class="soldSpan"><span style="width: 87.12px;">
            </span></span></div>
            <a class="button" target="_blank" onclick="Goods.addCart(${ele.id},1)">立即抢购</a></div></div >`;
      });
      }
    })
  }

}
new Goods;