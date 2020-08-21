class Carts {
  constructor() {
    this.list();
  }

  // 通过用户登录状态获取商品id(商品ID就是代表了商品信息)
  list () {
    let userId = localStorage.setItem('userId');
    if(userId){
    // 如果用户登录,就去数据库获取数据
    ajax.post('./server/carts.php')
    }
  }
}
new Carts;






// // 1.对购物车数据进行渲染
// class Carts {
//   constructor() {
//     this.list();
//     // console.log(this)
//     all('.check-all')[0].addEventListener('click', this.checks);
//     // console.log( all('.check-all')[0])
//     all('.check-all')[1].addEventListener('click', this.checks);
//   }
//   // // 向购物车中添加数据-------
//   // list () {

//   //   let userId = localStorage.getItem('userId');
//   //   if (userId) {
//   //     ajax.get('./server/cart.php', { fn: 'getGoodsId', userId: userId }).then(res => {
//   //       console.log(res);
//   //     })
//   //   }
//   // }
//   list () {
//     // 根据登录状态获取商品ID
//     let userId = localStorage.getItem('userId');
//     // 如果登录,就去数据库获取数据
//     // 声明保存购物车商品ID变量
//     let cartgoodsId = '';

//     if (userId) {
//       ajax.get('./server/cart.php', { fn: 'getGoodsId', userId: userId }).then(res => {
//         // console.log(res);
//         let { data, stateCode } = JSON.parse(res);
//         if (stateCode == 200) {
//           // console.log(data)
//           if (!data) return;
//           // 讲商品的id和信息 保存为对象形式
//           let goodscart = {}
//           data.forEach(ele => {
//             cartgoodsId += ele.productId + ',';
//             // 构造为对象形式,方便操作
//             goodscart[ele.productId] = ele.num;
//           });
//           // console.log(goodscart)
//           // console.log(cartgoodsId)
//           // 根据商品id去获取信息
//           Carts.getcartGoods(cartgoodsId, goodscart);
//         }


//       })
//     } else {
//       //  如果没有登录就去浏览器中获取
//       let cartgoods = localStorage.getItem('carts');
//       // 判断是否有数据
//       // 购物车空空如也

//       if (!cartgoods) return;
//       cartgoods = JSON.parse(cartgoods);
//       // 循环遍历.获取商品ID
//       // console.log(cartgoods)
//       for (let gid in cartgoods) {
//         // console.log(gid);
//         // console.log(cartgoods);
//         // 拿到key就等于拿到了商品Id
//         cartgoodsId += gid + ',';

//       }
//       // console.log(cartgoodsId)
//       Carts.getcartGoods(cartgoodsId);

//     }

//   }

//   // ------根据购物车商品ID 去获取商品信息---------
//   static getcartGoods (gid, cartids = '') {
//     // 如果是登录状态,数据从catrs中来,如果未登录,数据从浏览器中获取
//     cartids = cartids || JSON.parse(localStorage.getItem('carts'));
//     // console.log(cartids);
//     ajax.post('./server/cart.php?fn=lst', { goodsId: gid }).then(res => {
//       // console.log(res)

//       // 1.转化数据 获取data
//       let { data, stateCode } = JSON.parse(res);
//       let str = "";
//       if (stateCode == 200) {
//         // 循环追加到页面
//         data.forEach(ele => {
//           // console.log(ele);

//           str += `<tr>
//           <td class="checkbox"><input class="check-one check" type="checkbox"/ onclick="Carts.goodsCheck(this)"></td>
//           <td class="goods"><img src="${ele.goodsImg}" alt=""/><span>${ele.goodsName}</span></td>
//           <td class="price">${ele.price}</td>
//           <td class="count">
//               <span class="reduce"></span>
//               <input class="count-input" type="text" value="${cartids[ele.id]}"/>
//               <span class="add" onclick="addGoodsNum(this)">+</span></td>
//           <td class="subtotal">${(ele.price * cartids[ele.id]).toFixed(2)}</td>
//           <td class="operation"><span class="delete" onclick='delGoods(this,${ele.id})'>删除</span></td>
//       </tr>`;
//         })
//         $('tbody').innerHTML = str;
//       }
//     })
//   }

//   // -----------全选的实现--------------
//   checks () {
//     // console.log(this)
//     // 实现按钮的选中和取消,确定状态(true/false)
//     let state = this.checked;
//     // console.log(state)
//     // 设置上下两个同步选择中
//     all('.check-all')[this.getAttribute('key')].checked = state;

//     // 获取单个商品的选框(复选框)
//     let checkbox = all('.check-one');
//     // 遍历所有的单选框设置状态
//     checkbox.forEach(ele => {
//       // console.log(ele)
//       ele.checked = state;

//       checkAllObj[key].checked = state;

//     })

//   }
//   // --------单选的实现(单选全部选中,则全选选中)------------
//   static goodsCheck (ele) {
//     // console.log(ele)
//     // 当一件商品取消选中,全选框取消选择
//     let state = ele.checked;
//     // console.log(state) 
//     if (!state) {
//       // all('.check-all').checked = false;
//       all('.check-all')[0].checked = false;
//       all('.check-all')[1].checked = false;
//     }

//     // 当所有单选选中,全选框选中
//     // 1.获取所有的单选框
//     let checkone = all('.check-all');
//     let length = checkone.length;

//     // 计算选中的单选框
//     let conts = 0;
//     checkone.forEach(ele => {
//       //  已经被选中,后面++
//       ele.checked && conts++;
//     });
//     console.log(length)
//     // 单个商品选中的个数等于全部的数量(length),则全选选中
//     if (length == conts) {
//       all('check-all')[0].checked = true;
//       all('check-all')[1].checked = true;

//     }
//   }
// }
// new Carts;

