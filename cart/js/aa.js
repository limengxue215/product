
// `<div class="goodsCon"><a target = "_blank" >
// //             <img src="${ele.goodsImg}" class="icon"><h4 class="title">${ele.goodsName}</h4>
// //             <div class="info">限时抢购200条</div></a><div class="priceCon">
// //             <span class="price">￥${ele.price}</span>
// //             <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span>
// //             <div><span class="soldText">已售${ele.num}%</span>
// //             <span class="soldSpan"><span style="width: 87.12px;">
// //             </span></span></div>
// //             <a class="button" target="_blank" onclick="Goods.addCart(${ele.id},1)">立即抢购</a></div></div >`;
class Goods {
  constructor() {
    this.list();
    // addEventLineser
    $('#login').addEventListener('click', this.login);

    $('#exit').addEventListener('click', this.exit);

  }

  // -------1-发送ajax获取数据----------
  list () {
    ajax.get('./server/goods.php', { fn: 'lst' }).then(res => {
      // console.log(res)
      let { stateCode, data } = JSON.parse(res);
      let str = '';
      if (stateCode == 200) {
        data.forEach(ele => {
          str += `<div class="goodsCon"><a target = "_blank" >
             <img src="${ele.goodsImg}" class="icon"><h4 class="title">${ele.goodsName}</h4>
             <div class="info">限时抢购200条</div></a><div class="priceCon">
             <span class="price">￥${ele.price}</span>
             <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span>
             <div><span class="soldText">已售${ele.num}%</span>
             <span class="soldSpan"><span style="width: 87.12px;">
             </span></span></div>
            <a class="button" target="_blank" onclick="Goods.addCart(${ele.id},1)">立即抢购</a></div></div >`;
        });
        $('.divs').innerHTML = str;
      }
    })
  }

  //  -----------2-把商品数据加入购物车-----------
  static addCart (goodsId, goodsNum) {
    // 判断用户是否登录(根据用户ID进行判断)
    if (localStorage.getItem('user')) {
      // 如果用户已经登录,则去数据库获取数据
      Goods.dataBase(goodsId, goodsNum);
    } else {
      // 如果没有登录,就去浏览器获取数据
      Goods.setloca(goodsId, goodsNum);
    }

  }

  // -----------3.用户登录从数据库获取数据方法-------------------
  static dataBase (goodsId, goodsNum) {
    let userId = localStorage.getItem('userId');
    // 如果里面有数据,并且key为catrs,则
    // 发送ajax请求,存入数据
    ajax.post('./server/goods.php?fn=add', { gId: goodsId, userId: userId, gNum: goodsNum }).then(res => {
      console.log(res);
    })
  }





  // -----------4.用户未登录,从浏览器获取数据方法-------------------
  static setloca (goodsId, goodsNum) {
    // 1.取出浏览器数据
    let carts = localStorage.getItem('carts');
    // 判断是否有数据,如果有数据就新增数量
    if (carts) {
      // console.log(typeof( carts))
      // 转化成对象
      carts = JSON.parse(carts);
      // 遍历,判断商品是否存在
      for (let gid in carts) {
        // 如果当前商品已经存在.则增加数量
        if (gid == goodsId) {
          goodsNum = carts[gid] - 0 + goodsNum;
          // console.log(goodsNum);
        }
      }
      carts[goodsId] = goodsNum;//给原来的参数重新赋值
      localStorage.setItem('carts', JSON.stringify(carts));

    } else {
      // 没有数据就拟构造一个新的数据对象,进行数据的追加
      let goodsobj = { [goodsId]: goodsNum };
      localStorage.setItem('carts', JSON.stringify(goodsobj))
    }
  }
  // -------登录--------
  login () {
    localStorage.setItem('user', 'li');
    localStorage.setItem('userId', '1');
  }

  // -------退出--------
  exit () {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }
}
new Goods;


















// class Goods {
//   constructor() {
//     this.list();
//     // ----------获取节点绑定事件---------------
//     // 登录按钮绑定
//     $('#login').addEventListener('click', this.login);
//     $('#exit').addEventListener('click', this.exit);

//   }

//   // ------1--获取数据-----------------
//   list () {
//     // 2.ajax发送请求
//     ajax.get('./server/goods.php', { fn: 'lst' }).then(res => {
//       // console.log(res);
//       // 3.解构赋值,把返回数据转化为对象
//       let { stateCode, data } = JSON.parse(res);
//       console.log(JSON.parse(res))
//       if (stateCode == 200) {
//         let str = '';
//         // 4.遍历返回的data
//         data.forEach(ele => {
//           // console.log(ele);
//           str += `<div class="goodsCon"><a target = "_blank" >
//             <img src="${ele.goodsImg}" class="icon"><h4 class="title">${ele.goodsName}</h4>
//             <div class="info">限时抢购200条</div></a><div class="priceCon">
//             <span class="price">￥${ele.price}</span>
//             <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span>
//             <div><span class="soldText">已售${ele.num}%</span>
//             <span class="soldSpan"><span style="width: 87.12px;">
//             </span></span></div>
//             <a class="button" target="_blank" onclick="Goods.addCart(${ele.id},1)">立即抢购</a></div></div >`;
//         });
//         // 5.把数据追加到页面
//         $('.divs').innerHTML = str;
//       }
//     })
//   }

//   // 把数据加入购物车
//   static addCart (goodsId, goodsNum) {

//     // 判断用户是否登录
//     // 如果用户登录 就把数据存到数据库中

//     if (localStorage.getItem('user')) {
//       Goods.setDataBase(goodsId, goodsNum)
//     } else {
//       // 如果没有登录,就存在浏览器中
//       Goods.setLocal(goodsId, goodsNum)

//     }

//   }

//   // //------- 存入数据库的方法-------- 
//   static setDataBase (goodsId, goodsNum) {
//     // 1 获取当前用户登录id
//     let userId = localStorage.getItem('userId');
//     // 2 发送ajax进行存储
//     ajax.post('./server/goods.php?fn=add', { gId: goodsId, userId: userId, gNum: goodsNum }).then(res => {
//       // console.log(res);

//     });
//   }


//   // -------存浏览器的方法-------------
//   static setLocal (goodsId, goodsNum) {

//     // 1.取出浏览器中的数据
//     let carts = localStorage.getItem('carts')

//     // 2.判断是否有数据
//     if (carts) {
//       console.log(carts)
//       // 如果有数据,就判断当前商品是否存在
//       // 2-1.转化为对象
//       carts = JSON.parse(carts)
//       // 2-2判断当前商品是否存在
//       // 遍历
//       for (let gId in carts) {
//         if (gId == goodsId) {//判断当前添加的商品和正在循环的商品是否一致
//           // 2-3存在则增加数量
//           goodsNum = carts[gId] - 0 + goodsNum;
//           // console.log(goodsNum)
//           // console.log(carts[gId])
//         }
//       }
//       carts[goodsId] = goodsNum;//如果goodsid不存在,相当于新增一个属性-----如果存在,就重新赋值;
//       // 存
//       localStorage.setItem('carts', JSON.stringify(carts))

//       // 2-4不存在就新增

//     } else {


//       // 3.没有数据就新增(保存商品ID和数量)
//       let goodscarts = { [goodsId]: goodsNum };
//       // 转化为json字符串,浏览器只识别json字符串
//       goodscarts = JSON.stringify(goodscarts);
//       localStorage.setItem('carts', goodscarts)
//     }

//   }




//   // ----------登录的方法------------------
//   login () {
//     localStorage.setItem('user', 'zs');
//     localStorage.setItem('userId', 1);
//   }


//   // ----------退出的方法------------------
//   exit () {
//     localStorage.removeItem('user');
//     localStorage.removeItem('userId');
//   }

// }
// new Goods;

