// ------------------------------
// pjax? spa?
// ------------------------------
import {
  page1
} from "./views/about.js";
import {
  page2
} from "./views/skill.js";
import {
  page3
} from "./views/works.js";
import {
  page4
} from "./views/info.js";

const updateView = () => {
  const pages = {
    "/about": page1,
    "/skill": page2,
    "/works": page3,
    "/info": page4,
  };
  const page = pages[window.location.pathname];
  const render = page || `<p>404 : Not Found<p>`;
  document.getElementById("app").innerHTML = render;
  //初期化処理 updateView();←だけだと最大呼び出しスタックエラーがでる
  function updateView(i) {
    if (i >= 1) {
      return;
    }
    updateView(i + 1);
  }
  updateView(1);
};

document.querySelectorAll(".topLink").forEach(a => {
  a.onclick = event => {
    //アンカーリンクのデフォルト挙動をdisable
    event.preventDefault();
    window.history.pushState(null, "", a.href);
    //ここで定義した関数を発火
    updateView();
  };
});

window.addEventListener("popstate", () => {
  updateView();
});

// ------------------------------
// ブラウザバック時発火 元のtopの状態に戻す
// ------------------------------
history.replaceState(null, null, location.href);
window.addEventListener('popstate', function (e) {
  headerNav.classList.remove("navActive");
  topLink[0].classList.remove("navActive");
});

// ------------------------------
// 戻るボタンクリック時
// ------------------------------
const headerNav = document.querySelector(".headerNav");
const topLink = document.getElementsByClassName("topLink");

function menuClick() {
  headerNav.classList.add("navActive");
  topLink[0].classList.add("navActive");
}
for (let i = 0; i < topLink.length; i++) {
  topLink[i].addEventListener('click', menuClick, false);
}

// ------------------------------
// ローディングアニメーション
// ------------------------------
// topの場合js発火
function loadingAction() {
  if ("/" == window.location.pathname || "/index.html" == window.location.pathname) {

    // loading
    const load = () => {
      const loading = document.querySelector('.loading');
      loading.classList.add('loaded');
      const loadingText = document.querySelector('.loadingAfter__text');
      loadingText.classList.add('loadedText');
      const loadingHidden = document.querySelector('.loading');
      loadingHidden.classList.add('loadingBgHidden');
    }
    window.addEventListener('load', () => {
      setTimeout(load, 2000);
    });
    // loadingのテキストが終わったあとのイベント
    const loadAfter1 = document.querySelector('.loadingAfter__text');
    const loadAfter2 = document.querySelector('.loadingAfter');

    loadAfter1.addEventListener('animationend', () => {
      loadAfter2.classList.add('loadingAfter__hidden');
    });

    // ------------------------------
    // リンクアニメーション
    // ------------------------------
    // loadingアニメーション完了後
    loadAfter2.addEventListener('animationend', () => {
      const targets = document.querySelectorAll('.linkSplit')

      function spanWrap() {
        targets.forEach(function (target) {
          let nodes = [...target.childNodes];
          let textBox = '';
          nodes.forEach(function (node) {
            //テキストの場合
            if (node.nodeType == 3) {
              //テキストから改行コード削除
              let text = node.textContent.replace(/\r?\n/g, '');
              text.split('').forEach(function (t, i) {
                if (t !== " ") {
                  if (i < 10) {
                    textBox += '<span class="letter' + (i + 1) + '" ' + 'style="animation-delay:.' + i + 's;">' + t + '</span>';
                  } else {
                    let n = i / 10;
                    textBox += '<span class="letter' + (i + 1) + '" ' + 'style="animation-delay:' + n + 's;">' + t + '</span>';
                  }
                } else {
                  textBox += t;
                }
              });
            } else if (node.contains(node) == true) {
              // テキストではなく、子ノード(=span要素)を持つ
              // そのまま連結
              textBox = textBox + node.outerHTML;
            } else {
              // テキストではなく、br要素などspan要素以外の要素を持つ
              // そのまま連結 ※br要素などをspan要素とは別に処理する場合はここに書く
              textBox = textBox + node.outerHTML;
            }
          })
          target.innerHTML = textBox
        })
      }
      spanWrap();
    });
  } else {
    // top以外のページはloading削除 エラーでる書き直し必要
    const nodeRemove1 = document.querySelector('.loading');
    const nodeRemove2 = document.querySelector('.loadingAfter');
    nodeRemove1.remove();
    nodeRemove2.remove();
  }
}
loadingAction();
// ------------------------------
// pathnameがついたときheaderNav削除
// ------------------------------
// パスの取得
const path = location.pathname;
let topHeader = document.getElementById('headerNav');
if ("/about" == path || "/skill" == path || "/works" == path || "/info" == path) {
  topHeader.classList.add('topHidden');
} else {
  topHeader.classList.remove('topHidden');
}

// ------------------------------
// マウスストーカー
// ------------------------------
let stalker = document.getElementById('stalker');
let hovFlag = false;
document.addEventListener('mousemove', function (e) {
  stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});
let linkElem = document.querySelectorAll('a.topLink');
for (let i = 0; i < linkElem.length; i++) {
  linkElem[i].addEventListener('mouseover', function (e) {
    hovFlag = true;
    stalker.classList.add('is_active');
  });
  linkElem[i].addEventListener('mouseout', function (e) {
    hovFlag = false;
    stalker.classList.remove('is_active');
  });
}
// ------------------------------
// DOMの子孫の変化を監視し、変化したら実行処理
// ------------------------------
if ("/about" == path) {

  const elm = document.getElementById("app");
  const DOMobserver = new MutationObserver(function () {
    // ------------------------------
    // aboutページスクロールでsticky
    // あとで分解して理解する
    // ------------------------------
    let isActiveSticky = false;
    let stickyTrigger = {
      top: false,
      bottom: false,
      container: false
    };
    const stickyElement = document.querySelector('.stickyArea');
    const doObserve = () => {
      const targets = document.querySelectorAll('.observeTarget');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target.attributes['data-guide'].value === 'top') {
            if (entry.isIntersecting) {
              // スティッキー範囲の上限位置が画面上端より外に出た場合
              stickyTrigger.top = false
            } else {
              stickyTrigger.top = true
            }
          }
          if (entry.target.attributes['data-guide'].value === 'bottom') {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              // スティッキー範囲の下限位置が画面上端より外に出た場合
              stickyTrigger.bottom = false;
            } else {
              stickyTrigger.bottom = true;
            }
          }
          if (entry.target.attributes['data-guide'].value === 'container') {
            if (entry.isIntersecting) {
              // スティッキー範囲の要素が画面内に入った時
              stickyTrigger.container = true
            } else {
              stickyTrigger.container = false
            }
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0
      });
      Array.from(targets).forEach((target) => {
        observer.observe(target);
      });
    };
    doObserve();
    window.addEventListener('scroll', () => {
      if (stickyTrigger.top && stickyTrigger.container && stickyTrigger.bottom) {
        isActiveSticky = true;
      } else {
        isActiveSticky = false;
      }
      if (isActiveSticky) {
        stickyElement.style.backgroundColor = "#aaa";
      } else {
        stickyElement.style.backgroundColor = "#bbb";
      }
    });

    // ------------------------------
    // about last
    // ------------------------------
    const scroller = document.querySelector("#scroller");
    const output = document.querySelector("#textActive");
    if (scroller) {
      scroller.addEventListener("scroll", () => {
        output.style.backgroundImage = `
      linear-gradient(
        -45deg,
        rgb(255,255,255) ${0 - scroller.scrollTop}%,
        rgb(0, 0, 0) ${100 - scroller.scrollTop}%,
        rgb(255,255,255) ${200 - scroller.scrollTop}%
        )`;
        output.style.right = `
        ${0.5 * scroller.scrollTop}%`;
      });
    }

    const aboutLast = document.querySelector("#aboutLast");
    const options = {
      threshold: buildThresholdList()
    };
    const observer2 = new IntersectionObserver(showElements, options);
    observer2.observe(aboutLast);

    function buildThresholdList() {
      let thresholds = [];
      let numSteps = 100;
      for (let i = 1; i <= numSteps; i++) {
        let ratio = i / numSteps;
        thresholds.push(ratio);
      }
      return thresholds;
    }

    function showElements(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let ratio = Math.round(entry.intersectionRatio * 200);
          const textActive = document.getElementById("textActive");
          textActive.style.backgroundImage = `
        linear-gradient(
        -45deg,
        rgb(255,255,255) ${0 - ratio}%,
        rgb(0, 0, 0) ${100 - ratio}%,
        rgb(255,255,255) ${200 - ratio}%
      )`;
          textActive.style.right = `
        ${0.25 * ratio}%`;
        }
      });
    }
  });
  // ------------------------------
  // DOMの子孫の変化を監視し、変化したら実行処理
  // ------------------------------
  const config = {
    childList: true
  };
  DOMobserver.observe(elm, config);
};

// ------------------------------
// 静的用
// ------------------------------
// const aboutLast = document.querySelector("#aboutLast");
// const options = {
//   threshold: buildThresholdList()
// };
// const observer2 = new IntersectionObserver(showElements, options);
// observer2.observe(aboutLast);

// function buildThresholdList() {
//   let thresholds = [];
//   let numSteps = 100;
//   for (let i = 1; i <= numSteps; i++) {
//     let ratio = i / numSteps;
//     thresholds.push(ratio);
//   }
//   return thresholds;
// }

// function showElements(entries) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       let ratio = Math.round(entry.intersectionRatio * 200);
//       const textActive = document.getElementById("textActive");
//       textActive.style.backgroundImage = `
//         linear-gradient(
//         -45deg,
//         rgb(255,255,255) ${0 - ratio}%,
//         rgb(0, 0, 0) ${100 - ratio}%,
//         rgb(255,255,255) ${200 - ratio}%
//       )`;
//       textActive.style.right = `
//         ${0.25 * ratio}%`;
//     }
//   });
// }



// ------------------------------
// skill
// ------------------------------
if ("/skill" == path) {

  const elm2 = document.getElementById("app");
  const DOMobserver2 = new MutationObserver(function () {
    const area = document.getElementById("scrollListWrap");
    const parallaxScroll = document.getElementById("parallaxScroll");
    let options = {
      threshold: 0
    }
    let observer3 = new IntersectionObserver(callback, options);
    observer3.observe(area);

    function callback(entries) {
      if (entries[0].isIntersecting) {
        document.body.style.overflow = "hidden";
        window.addEventListener("wheel", wheel);
        window.addEventListener("touchmove", move);
      } else {
        document.body.style.overflow = "auto";
        window.removeEventListener("wheel", wheel);
        window.removeEventListener("touchmove", move);
      }
    }
    // ユーザのスクロール量を検知
    let sum = 0;
    let move1 = 0;
    let move2 = 0;
    let stamp1 = 0;
    let stamp2 = 0;

    function move(e) {
      let imamove = e.touches[0].clientY;
      let imastamp = e.timeStamp;
      if (stamp1 == 0) {
        stamp1 = imastamp;
      } else {
        stamp2 = imastamp;
        if (stamp2 - stamp1 > 100) {
          move1 = 0;
        }
        stamp1 = imastamp;
      }
      if (move1 == 0) {
        move1 = imamove;
      } else {
        move2 = imamove;
        sum = sum + (move1 - move2);
        scrollX();
        move1 = imamove;
      }
    }

    function wheel(e) {
      sum = sum + e.deltaY;
      scrollX();
    }
    // スクロール量に合わせてアニメーション
    function scrollX() {
      if (sum > 0 && sum < 6000) {
        parallaxScroll.style.transform = `translateX(-${360*sum/1000}px)`;
        document.body.style.overflow = "hidden";
      } else if (sum >= 6000) {
        sum = 6000;
        parallaxScroll.style.transform = `translateX(-${360*sum/1000}px)`;
        document.body.style.overflow = "auto";
      } else if (sum <= 0) {
        sum = 0;
        parallaxScroll.style.transform = "translateX(0px)";
        document.body.style.overflow = "auto";
      }
    }
  });
  // ------------------------------
  // DOMの子孫の変化を監視し、変化したら実行処理
  // ------------------------------
  const config2 = {
    childList: true
  };
  DOMobserver2.observe(elm2, config2);
};

// ------------------------------
// works slider
// ------------------------------
if ("/works" == path) {

  const elm3 = document.getElementById("app");
  const DOMobserver3 = new MutationObserver(function () {
    var slide = document.getElementById('slider');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var list1 = document.getElementById('list1');
    var list2 = document.getElementById('list2');
    var list3 = document.getElementById('list3');
    var list4 = document.getElementById('list4');

    // クリックイベント

    next.addEventListener('click', nextClick);
    prev.addEventListener('click', prevClick);

    function nextClick() {
      if (slide.classList.contains('slider1') === true) {
        slide.classList.remove('slider1');
        slide.classList.add('slider2');
        list1.style.backgroundColor = 'transparent';
        list2.style.backgroundColor = '#222';
        count = 0;
      } else if (slide.classList.contains('slider2') === true) {
        slide.classList.remove('slider2');
        slide.classList.add('slider3');
        list2.style.backgroundColor = 'transparent';
        list3.style.backgroundColor = '#222';
        count = 0;
      } else if (slide.classList.contains('slider3') === true) {
        slide.classList.remove('slider3');
        slide.classList.add('slider4');
        list3.style.backgroundColor = 'transparent';
        list4.style.backgroundColor = '#222';
        count = 0;
      } else {
        slide.classList.remove('slider4');
        slide.classList.add('slider1');
        list4.style.backgroundColor = 'transparent';
        list1.style.backgroundColor = '#222';
        count = 0;
      }
    };

    function prevClick() {
      if (slide.classList.contains('slider1') === true) {
        slide.classList.remove('slider1');
        slide.classList.add('slider4');
        list1.style.backgroundColor = 'transparent';
        list4.style.backgroundColor = '#222';
        count = 0;
      } else if (slide.classList.contains('slider2') === true) {
        slide.classList.remove('slider2');
        slide.classList.add('slider1');
        list2.style.backgroundColor = 'transparent';
        list1.style.backgroundColor = '#222';
        count = 0;
      } else if (slide.classList.contains('slider3') === true) {
        slide.classList.remove('slider3');
        slide.classList.add('slider2');
        list3.style.backgroundColor = 'transparent';
        list2.style.backgroundColor = '#222';
        count = 0;
      } else {
        slide.classList.remove('slider4');
        slide.classList.add('slider3');
        list4.style.backgroundColor = 'transparent';
        list3.style.backgroundColor = '#222';
        count = 0;
      }
    };

    // インジケーター

    list1.addEventListener('click', click1);
    list2.addEventListener('click', click2);
    list3.addEventListener('click', click3);
    list4.addEventListener('click', click4);

    function click1() {
      slide.classList.add('slider1');
      slide.classList.remove('slider2');
      slide.classList.remove('slider3');
      slide.classList.remove('slider4');
      list1.style.backgroundColor = '#222';
      list2.style.backgroundColor = 'transparent';
      list3.style.backgroundColor = 'transparent';
      list4.style.backgroundColor = 'transparent';
      count = 0;
    }

    function click2() {
      slide.classList.remove('slider1');
      slide.classList.add('slider2');
      slide.classList.remove('slider3');
      slide.classList.remove('slider4');
      list1.style.backgroundColor = 'transparent';
      list2.style.backgroundColor = '#222';
      list3.style.backgroundColor = 'transparent';
      list4.style.backgroundColor = 'transparent';
      count = 0;
    }

    function click3() {
      slide.classList.remove('slider1');
      slide.classList.remove('slider2');
      slide.classList.add('slider3');
      slide.classList.remove('slider4');
      list1.style.backgroundColor = 'transparent';
      list2.style.backgroundColor = 'transparent';
      list3.style.backgroundColor = '#222';
      list4.style.backgroundColor = 'transparent';
      count = 0;
    }

    function click4() {
      slide.classList.remove('slider1');
      slide.classList.remove('slider2');
      slide.classList.remove('slider3');
      slide.classList.add('slider4');
      list1.style.backgroundColor = 'transparent';
      list2.style.backgroundColor = 'transparent';
      list3.style.backgroundColor = 'transparent';
      list4.style.backgroundColor = '#222';
      count = 0;
    }

    // 自動スライド
    var count = 0;

    setInterval(() => {
      if (count > 4) {
        count = 0;
        nextClick();
      }
      count++;
    }, 1000);
  });
  const config3 = {
    childList: true
  };
  DOMobserver3.observe(elm3, config3);
};