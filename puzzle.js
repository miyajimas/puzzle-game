window.addEventListener("keydown",mykeydown); // キー押下のイベントハンドラ登録

const data = [
  // 迷路データ（0：通路、1：目的地、2：荷物、6：壁 ）
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 0, 0, 1, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 6],
  [6, 6, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 2, 0, 6],
  [6, 6, 0, 6, 0, 6, 0, 6, 6, 6, 6, 6, 6, 0, 6, 0, 0, 0, 0, 6],
  [6, 6, 0, 6, 2, 0, 0, 6, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 6],
  [6, 6, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 6, 0, 6, 6, 0, 0, 6, 6],
  [6, 6, 6, 0, 0, 6, 0, 6, 6, 0, 0, 6, 6, 0, 6, 0, 0, 0, 6, 6],
  [6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6],
  [6, 6, 0, 0, 6, 0, 6, 6, 0, 6, 0, 6, 0, 0, 0, 0, 0, 0, 6, 6],
  [6, 6, 6, 6, 6, 0, 0, 6, 0, 0, 0, 6, 6, 6, 1, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];
const data2 = [
  // 迷路データ（0：通路、1：目的地、2：荷物、6：壁 ）
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 0, 0, 1, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 6, 6, 6],
  [6, 6, 6, 0, 0, 6, 6, 0, 6, 6, 6, 6, 6, 0, 0, 2, 0, 6, 6, 6],
  [6, 6, 0, 2, 0, 0, 0, 0, 6, 0, 6, 6, 6, 0, 0, 6, 0, 0, 6, 6],
  [6, 6, 0, 0, 6, 0, 0, 6, 6, 0, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6],
  [6, 0, 0, 0, 0, 0, 0, 6, 6, 0, 6, 6, 0, 6, 0, 0, 6, 0, 6, 6],
  [6, 0, 0, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 6, 0, 6, 0, 0, 6, 6],
  [6, 6, 6, 0, 6, 0, 6, 6, 6, 6, 0, 6, 0, 0, 0, 6, 0, 0, 6, 6],
  [6, 6, 6, 6, 6, 0, 0, 6, 6, 6, 0, 6, 6, 6, 1, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];
let px = 3; // 主人公x座標
let py = 2; // 主人公y座標
let px2 = 5; // 主人公x座標
let py2 = 2; // 主人公y座標

let c=0;

document.addEventListener("load", repaint());
document.addEventListener("load", repaint2());

function mykeydown(e) {
  console.log(e.keyCode);

  let dx0 = px; // 1歩先x
  let dy0 = py; // 1歩先y
  let dx1 = px; // 2歩先x
  let dy1 = py;

  let d2x0 = px2; // 1歩先x
  let d2y0 = py2; // 1歩先y
  let d2x1 = px2; // 2歩先x
  let d2y1 = py2; // 2歩先y

  switch (e.keyCode) {
    case 37: // 左
      dx0--;
      dx1 -= 2;
      d2x0--;
      d2x1 -= 2;
      break;
    case 38: // 上
      dy0--;
      dy1 -= 2;
      d2y0--;
      d2y1 -= 2;
      break;
    case 39: // 右
      dx0++;
      dx1 += 2;
      d2x0++;
      d2x1 += 2;
      break;
    case 40: // 下
      dy0++;
      dy1 += 2;
      d2y0++;
      d2y1 += 2;
      break;
  }
  let moved=false;

  if (data[dy0][dx0] <= 1) {
      px = dx0;
      py = dy0;
      moved = true;
    }

    else if (data[dy0][dx0] == 2 && data[dy1][dx1] <= 1) {
      data[dy1][dx1] += 2; // 2歩先に荷物を置く
      data[dy0][dx0] -= 2; // 1歩先を空にする
      px = dx0;
      py = dy0;
      moved = true;
    }

    if (data2[d2y0][d2x0] <= 1) {
      px2 = d2x0;
      py2 = d2y0;
      moved = true;
    }

    else if (data2[d2y0][d2x0] == 2 && data2[d2y1][d2x1] <= 1) {
      data2[d2y1][d2x1] += 2; // 2歩先に荷物を置く
      data2[d2y0][d2x0] -= 2; // 1歩先を空にする
      px2 = d2x0;
      py2 = d2y0;
      moved = true;
    }

    if (moved) {
      c++;
      document.getElementById('count').textContent = c + '歩';
    }


    let clearedCount1 = 0;
let clearedCount2 = 0;

for (let j = 0; j < data.length; j++) {
  for (let i = 0; i < data[0].length; i++) {
    // data1のクリア判定
    if (data[j][i] === 3) {
      clearedCount1++;
    }
    // data2のクリア判定
    if (data2[j][i] === 3) {
      clearedCount2++;
    }
  }
}

// 迷路1の荷物数と迷路2の荷物数を正しく設定
const totalBoxes1 = 2; // data1の荷物数
const totalBoxes2 = 2; // data2の荷物数

if (clearedCount1 === totalBoxes1 && clearedCount2 === totalBoxes2) {
  // すべての荷物が目的地に置かれているか確認
  document.getElementById('clea').textContent = c + '歩でクリア！';
  alert('おめでとう！クリア！'); // アラートを表示
}
    repaint();
    repaint2();
  }


function repaint() {

  let map;　//描画例、他の文字等を使用しても良い

  map="<table>";

for(let j=0;j<=10;j++){
    map=map+"<tr>"
    for (let i=0; i<=19;i++){

      if(i==px && j==py){
        map=map+"<td>👧</td>";
      }else if(data[j][i]==6){
         map=map+"<td>🧱</td>";
       }else if(data[j][i]==0){
      map=map+"<td></td>";
    }else if(data[j][i]==1){
      map=map+"<td>🔒</td>";
    }  else if(data[j][i]==2){
      map=map+"<td>🔑</td>";
    }else if(data[j][i]==3){
    map=map+"<td>🎁</td>";
    }
  }
    map=map+"</tr>";
}

  map=map+"</table>";

  document.getElementById('soko').innerHTML=map;　// 表描画

}
function repaint2() {

  let map2;　//描画例、他の文字等を使用しても良い

  map2="<table>";

for(let j=0;j<=10;j++){
    map2=map2+"<tr>"
    for (let i=0; i<=19;i++){

      if(i==px2 && j==py2){
        map2=map2+"<td>👦</td>";
      }else if(data2[j][i]==6){
         map2=map2+"<td>🧱</td>";
       }else if(data2[j][i]==0){
      map2=map2+"<td></td>";
    }else if(data2[j][i]==1){
      map2=map2+"<td>🔒</td>";
    }  else if(data2[j][i]==2){
      map2=map2+"<td>🔑</td>";
    }else if(data2[j][i]==3){
    map2=map2+"<td>🎁</td>";
    }
  }
    map2=map2+"</tr>";
}

  map2=map2+"</table>";

  document.getElementById('soko2').innerHTML=map2;　// 表描画

}
