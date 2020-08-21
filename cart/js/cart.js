/*******获取购物车数据进行渲染*********/
class Cart {
  constructor() {
    this.list();
  }
  list () {
    let carts = localStorage.getItem('carts');
    // 2 判断是否有数据
    if (carts) {
      // 2-1 将数据转化为对象
      carts = JSON.parse(carts);
      let goodsId = '';
      for (let id in carts) {
        goodsId += id + ','
      }
      ajax.post('./server/cart.php?fn=lst', { goodsId: goodsId }).then(res => {
        let str = '';
        JSON.parse(res).data.forEach(ele => {
          let { id, goodsName, goodsImg, desc, price } = ele;
          str += `<tr>
          <td class="checkbox"><input class="check-one check" type="checkbox"/ onclick="goodsCheck(this)"></td>
          <td class="goods"><img src="${goodsImg}" alt=""/><span>${goodsName}</span></td>
          <td class="price">${price}</td>
          <td class="count">
              <span class="reduce">-</span>
              <input class="count-input" type="text" value="${carts[id]}"/>
              <span class="add" onclick="Cart.addGoodsNum(this,${id})">+</span></td>
          <td class="subtotal">${(price * carts[id]).toFixed(2)}</td>
          <td class="operation"><span class="delete" onclick='Cart.delGoods(this,${id})'>删除</span></td>
      </tr>`;

        });
        // 2-3 追加到页面中
        $('tbody').innerHTML = str;
      });
    }
  }
  static addGoodsNum (obj, id) {
    let goodsNum = obj.previousElementSibling.value;
    ajax.get('./server/cart.php', { fn: 'update', goodsId: id, goodsNum: goodsNum }).then(res => {
      console.log(res);

    })
  }

  static delGoods (obj, id) { }
}
new Cart();
(function () {
  //console.log(11111)
  // 1 从locacal中获取数据
  let carts = localStorage.getItem('carts');
  // 2 判断是否有数据
  if (carts) {
    // 2-1 将数据转化为对象
    carts = JSON.parse(carts);
    //console.log(carts)
    // 2-2 遍历数据,进行拼接
    let str = '';
    carts.forEach(ele => {
      // console.log(ele)
      let { gid, gname, gprice, gsrc, gnum } = ele;
      str += `<tr>
      <td class="checkbox"><input class="check-one check" type="checkbox"/ onclick="goodsCheck(this)"></td>
      <td class="goods"><img src="${gsrc}" alt=""/><span>${gname}</span></td>
      <td class="price">${gprice}</td>
      <td class="count">
          <span class="reduce"></span>
          <input class="count-input" type="text" value="${gnum}"/>
          <span class="add" onclick="addGoodsNum(this)">+</span></td>
      <td class="subtotal">${(gprice * gnum).toFixed(2)}</td>
      <td class="operation"><span class="delete" onclick='delGoods(this,${gid})'>删除</span></td>
  </tr>`;
    });
    // 2-3 追加到页面中
    $('tbody').innerHTML = str;
  } else {   // 3 购物车中没有数据,则进行提示
    $('tbody').innerHTML = '<h2>购物车内暂时没有商品，登录后将显示您之前加入的商品</h2>'
  }
});

/**************全选的实现************/
// 0 获取全选按钮
let checkAllObj = all('.check-all');
//console.log(checkAllObj);
//1 给点击的全选按钮绑定事件
// checkAllObj.forEach(function (ele) {
//   ele.addEventListener('click', function () {
//     // console.log(this);
//   })
// });
checkAllObj[0].addEventListener('click', function () {
  // 2获取当前按钮的状态,然后穿递
  // checked 获取复选框状态,true是选中  false是取消
  //console.log(this.checked);
  checkAllGoods(1, this.checked)
});

checkAllObj[1].addEventListener('click', function () {
  // 2获取当前按钮的状态,然后穿递
  // checked 获取复选框状态,true是选中  false是取消
  //console.log(this.checked);
  checkAllGoods(0, this.checked)
});

/*********让所有的商品选中***********/
function checkAllGoods (key, state) {
  // 1 获取所有商品的单选框
  var checkOnes = all('.check-one');
  // 2  循环所有的单选框,设置状态
  checkOnes.forEach(ele => {
    // console.log(ele)
    ele.checked = state;
  });

  //3  设置另一个全选按钮,为选中
  checkAllObj[key].checked = state;
  cpCount();
}

/***********单个商品的选中******/
function goodsCheck (eleObj) {
  //console.log(eleObj)
  // 1如果当前是取消操作,让全选取消
  // 2 获取全选按钮
  let checkAllObj = all('.check-all');
  if (!eleObj.checked) {
    // 循环全选按钮进行取消
    checkAllObj.forEach(function (ele) {
      ele.checked = false;
    })
  } else { // 页面的元素都选中时,让全选选上
    // 3 获取页面中的所有单选框
    var checkOnes = all('.check-one');
    // 4 记录所有商品的数量
    var len = checkOnes.length;
    // 5 保存页面中单选选中的数量
    var counts = 0;
    checkOnes.forEach(ele => {
      // console.log(ele)
      if (ele.checked == true) {  // 选中一次数量加1
        counts++;
      }
    });
    // 6 比对商品数量和选中的数量,相等让全选选中
    if (len == counts) {
      checkAllObj.forEach(function (ele) {
        ele.checked = true;
      })
    }
  }
  cpCount();
}

/*********计算总的价格和数量*******/
function cpCount () {
  // 1 获取所有商品的单选按钮
  var checkOnes = all('.check-one');
  // 2 声明保存价格和数量的变量
  var couNum = 0;
  var totalPrice = 0;
  // 3 循环单选框,找到选中的
  checkOnes.forEach(ele => {
    //console.log(ele.checked)
    if (ele.checked) {
      // 4 取到选中的商品价格和数量
      // 4-1 获取当前单选框所在的tr,就是爷爷辈
      var parnetObj = ele.parentNode.parentNode;
      var price = parnetObj.querySelector('.price').innerHTML;
      var num = parnetObj.querySelector('.count-input').value;
      //console.log(price, num)
      //5 计算数量和总价
      couNum = num - 0 + couNum;
      totalPrice += num * price;
    }
  })
  // 6 将价格和数量放到页面中
  $('#selectedTotal').innerHTML = couNum;
  $('#priceTotal').innerHTML = totalPrice.toFixed(2);
}

/**********添加商品数量*****/
var times = '';
function addGoodsNum (eleObj) {
  // console.log(eleObj)
  clearTimeout(times)
  times = setTimeout(function () {
    //1 获取input框
    var inputObj = eleObj.previousElementSibling;
    //2 取出数量,并且增加
    var count = inputObj.value;
    //console.log(count - 0 + 1);
    count = count - 0 + 1;
    inputObj.value = count;
    // 3拿到单价
    var price = eleObj.parentNode.previousElementSibling.innerHTML;
    // 4 获取小计
    var xjObj = eleObj.parentNode.nextElementSibling;
    xjObj.innerHTML = (price * count).toFixed(2);
    cpCount();
    // 将数量添加到localstorage中

  }, 500)

}

/**********减少商品数量*****/
/********删除的实现*****/
function delGoods (eleObj, gid) {
  // 1 获取tr节点
  var trObj = eleObj.parentNode.parentNode;

  // 2 判断是否选中,选中删除后重新计算价格
  var checkOne = trObj.querySelector('.check-one');
  // 删除节点
  trObj.remove();
  // 3 删除local中的数据
  let cartGoods = localStorage.getItem('carts');
  cartGoods = JSON.parse(cartGoods);
  // 4循环所有的商品,然后删除当前操作的
  cartGoods.forEach((ele, key) => {
    if (ele.gid == gid) {
      //console.log(ele, key)
      //  console.log(cartGoods)
      cartGoods.splice(key, 1);
      return;
    }
  });
  //console.log(cartGoods);
  // 将删除后的重新设置
  localStorage.setItem('carts', JSON.stringify(cartGoods))
  if (checkOne.checked) {
    cpCount();
  }

}