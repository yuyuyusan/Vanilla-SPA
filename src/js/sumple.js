let mediaFlag, width;

function media() {
  width = window.innerWidth,
    width > 1024 ? mediaFlag = "pc" : width >= 600 ? mediaFlag = "tablet" : width <= 599 && (mediaFlag = "sp")
}! function () {
  const setSize = 360,
    viewport = document.querySelector("meta[name='viewport']");

  function adjustViewport() {
    const value = window.outerWidth > 360 ? "width=device-width,initial-scale=1" : "width=360";
    viewport.getAttribute("content") !== value && viewport.setAttribute("content", value)
  }
  addEventListener("resize", adjustViewport),
    adjustViewport()
}(),
media(),
  window.addEventListener("load", (function () {
    media()
  })),
  window.addEventListener("resize", (function () {
    media()
  }));
const DOMobserver = new MutationObserver((function () {
    if (null != document.querySelector(".anm")) {
      const anm = document.querySelectorAll(".anm"),
        options = {
          root: null,
          rootMargin: "-8%",
          threshold: [0]
        },
        observe = new IntersectionObserver(addAnimation, options);

      function addAnimation(entries) {
        entries.forEach((function (entry) {
          entry.isIntersecting && entry.target.classList.add("is-show")
        }))
      }
      anm.forEach((function (elem, index) {
        observe.observe(elem)
      }))
    }
  })),
  targetApp = document.getElementById("app"),
  config = {
    childList: !0
  };

function sleep(ms) {
  return new Promise((function (resolve) {
    setTimeout((function () {
      resolve()
    }), ms)
  }))
}
DOMobserver.observe(targetApp, config);
import {
  curtain
} from "./svg/curtain.js";
import {
  distotion
} from "./svg/distotion.js";
document.body.insertAdjacentHTML("afterbegin", distotion);
import {
  cubeElement
} from "./cube/cube.js";
document.querySelector("main").insertAdjacentHTML("afterbegin", cubeElement);
import {
  navigationElement
} from "./navigation/navigation.js";
document.querySelector("main").insertAdjacentHTML("afterbegin", navigationElement);
import {
  loadingArea
} from "./loading/loading.js";
document.querySelector("body").insertAdjacentHTML("afterbegin", loadingArea);
const loading = document.querySelector(".loading"),
  loadingElement = document.querySelector(".svg-rotate"),
  loadingText = document.querySelector(".loading-textpath"),
  buttonVisit = document.querySelector(".button--visit");
let flag = !0;
if ("/" == window.location.pathname || "/index.html" == window.location.pathname)
  addEventListener("load", () => {
    sleep(4e3).then((function () {
      return buttonVisit.classList.add("is-show"),
        loadingElement.classList.add("is-stop"),
        loadingText.remove(),
        flag = !1,
        buttonVisit.classList.add("is-active"),
        sleep(3e3)
    })).then((function () {
      loading.classList.add("is-loaded"),
        flag = !1,
        loadingElement.style.cursor = "pointer",
        buttonVisit.addEventListener("click", () => {
          loading.classList.add("is-fadeout"),
            document.body.insertAdjacentHTML("afterbegin", curtain);
          const animationStartElement = document.querySelector("#animation1"),
            animationEndElement = document.querySelector("#animation3"),
            animationFinalElement = document.querySelector("#animation5"),
            overlay = document.querySelector(".overlay-path");
          setTimeout(() => {
              animationStartElement.beginElement()
            }, 400),
            animationEndElement.addEventListener("endEvent", (function () {
              buttonVisit.classList.remove("is-show"),
                overlay.classList.add("is-turn"),
                loading.remove()
            })),
            animationFinalElement.addEventListener("endEvent", (function () {
              const textOneByOne = document.querySelectorAll(".text-split");
              textOneByOne.forEach((function (elem, index) {
                let getText = elem.textContent;
                elem.textContent = "",
                  elem.style.opacity = "1",
                  getText = getText.split(""),
                  getText.forEach((function (elem2, index) {
                    const newText = "<span aria-hidden='true' class='text-each'>" + elem2 + "</span>";
                    elem.insertAdjacentHTML("beforeend", newText)
                  }));
                const textEach = elem.querySelectorAll("span"),
                  textLength = textEach.length,
                  delayTime = 100;
                textEach.forEach((function (elem3, index) {
                  setTimeout((function () {
                    elem3.style.transitionDelay = 100 * index + "ms",
                      elem3.classList.add("is-active")
                  }), 100)
                }))
              }))
            }))
        }),
        buttonVisit.click()
    }))
  });
else {
  flag = !1,
    loading.remove();
  const textOneByOne = document.querySelectorAll(".text-split"),
    SPA = document.querySelectorAll(".SPA");
  textOneByOne.forEach((function (elem, index) {
      let getText = elem.textContent;
      elem.textContent = "",
        elem.style.opacity = "1",
        getText = getText.split(""),
        getText.forEach((function (elem2, index) {
          const newText = "<span aria-hidden='true' class='text-each'>" + elem2 + "</span>";
          elem.insertAdjacentHTML("beforeend", newText)
        }));
      const textEach = elem.querySelectorAll("span"),
        textLength = textEach.length,
        delayTime = 100;
      textEach.forEach((function (elem3, index) {
        setTimeout((function () {
          elem3.style.transitionDelay = 100 * index + "ms",
            elem3.classList.add("is-active")
        }), 100)
      }))
    })),
    window.addEventListener("load", (function () {
      "/profile/" == window.location.pathname ? SPA[0].click() : "/products/" == window.location.pathname ? SPA[2].click() : "/skill/" == window.location.pathname ? SPA[1].click() : "/contact/" == window.location.pathname && SPA[3].click()
    }), {
      once: !0
    })
}
const body = document.body;

function ColorCode() {
  const makingColorCode = ["#0000cd", "#000080", "#dc143c", "#c71585", "#ffff00", "#7fff00", "#00ffff", "#ffa500"],
    makingColorCodeLength = makingColorCode.length,
    colorNum = Math.floor(Math.random() * makingColorCodeLength),
    finalCode = makingColorCode[colorNum];
  return finalCode
}
document.addEventListener("mousemove", (function (e) {
  if (flag) {
    const x = e.clientX,
      y = e.clientY,
      angle = 360 * Math.random(),
      dist = 100 + 50 * Math.random(),
      size = 2 + 2 * Math.random();
    body.insertAdjacentHTML("afterbegin", "<span class='stalker'></span>");
    const stalker = document.querySelector(".stalker");
    stalker.style.top = y + "px",
      stalker.style.left = x + "px",
      stalker.style.backgroundColor = ColorCode(),
      stalker.animate([{
        transform: `rotate(${angle}deg) translateX(0px) scale(${size})`
      }, {
        transform: `rotate(${angle}deg) translateX(${dist}px) scale(${size})`
      }], {
        duration: 2e3 * (Math.random() + 1)
      }),
      setTimeout((function () {
        stalker.remove()
      }), 3e3),
      flag = !1,
      setTimeout((function () {
        flag = !0
      }), 20)
  }
}));
const SPA = document.querySelectorAll(".SPA");
let windowW = window.innerWidth,
  windowH = window.innerHeight;
const html = document.querySelector("html"),
  buttonExpand = document.querySelector(".js-buttonExpand"),
  buttonShrink = document.querySelector(".js-buttonShrink"),
  cube = document.querySelector(".cube"),
  cubeWrap = document.querySelector(".cube-wrap"),
  cubeContainer = document.querySelector(".cube-container");
let cubeWidth = parseFloat(document.defaultView.getComputedStyle(cubeContainer, null).width),
  cubeHeight = parseFloat(document.defaultView.getComputedStyle(cubeContainer, null).height);
const cubeElementsList = [cube, cubeContainer];
let animationCount = 0,
  render;
addEventListener("load", () => {
    cubeElementsList.forEach((elem, index) => {
      elem.classList.add("on-animation")
    });
    const widthRatio = windowW / cubeWidth,
      heightRatio = windowH / cubeHeight;
    html.style.setProperty("--scaleX", widthRatio),
      html.style.setProperty("--scaleY", heightRatio)
  }),
  addEventListener("resize", () => {
    windowW = window.innerWidth,
      windowH = window.innerHeight,
      cubeWidth = parseFloat(document.defaultView.getComputedStyle(cubeContainer, null).width),
      cubeHeight = parseFloat(document.defaultView.getComputedStyle(cubeContainer, null).height);
    const widthRatio = windowW / cubeWidth,
      heightRatio = windowH / cubeHeight;
    html.style.setProperty("--scaleX", widthRatio),
      html.style.setProperty("--scaleY", heightRatio)
  }),
  cube.addEventListener("animationiteration", () => {
    animationCount += 1,
      html.style.setProperty("--animationCount", animationCount + 1)
  }),
  buttonExpand.addEventListener("click", () => {
    cubeElementsList.forEach((elem, index) => {
      elem.classList.add("is-stop"),
        elem.classList.contains("on-animation") || (elem.classList.add("on-animation"),
          animationCount = 0,
          html.style.setProperty("--animationCount", animationCount))
    })
  }),
  buttonShrink.addEventListener("click", () => {
    window.history.pushState(null, "", "/index.html"),
      cubeWrap.classList.remove("is-hidden"),
      buttonShrink.classList.remove("is-show"),
      cube.classList.remove("is-expand"),
      document.defaultView.getComputedStyle(cube, null).height,
      cube.classList.add("is-shrink"),
      removeDOMFunction()
  }),
  cube.addEventListener("animationend", event => {
    if ("roll" === event.animationName)
      cube.classList.add("is-expand"),
      cubeElementsList.forEach((elem, index) => {
        elem.classList.remove("on-animation")
      });
    else if ("expand" === event.animationName)
      cubeWrap.classList.add("is-hidden"),
      buttonShrink.classList.add("is-show"),
      updateView(),
      renderFunction();
    else if ("shrink" === event.animationName) {
      animationCount = 0,
        html.style.setProperty("--animationCount", animationCount),
        cube.classList.remove("is-expand"),
        cube.classList.remove("is-shrink"),
        cubeElementsList.forEach((elem, index) => {
          elem.classList.add("on-animation"),
            elem.classList.remove("is-stop")
        });
      for (let i = 0; i < SPA.length; i++)
        SPA[i].classList.remove("is-fadeout"),
        SPA[i].classList.remove("is-selected")
    }
  });
import {
  page1
} from "./pages/page1.js";
import {
  page2
} from "./pages/page2.js";
import {
  page3
} from "./pages/page3.js";
import {
  page4
} from "./pages/page4.js";
SPA.forEach(a => {
  a.onclick = event => {
    event.preventDefault();
    for (let i = 0; i < SPA.length; i++)
      SPA[i].classList.add("is-fadeout");
    a.classList.remove("is-fadeout"),
      a.classList.add("is-selected"),
      buttonExpand.click(),
      window.history.pushState(null, "", a.href)
  }
});
const updateView = () => {
    const pages = {
        "/profile": page1,
        "/skill": page2,
        "/products": page3,
        "/contact": page4
      },
      page = pages[window.location.pathname];
    render = page || "<h1>404 : Not Found<h1>"
  },
  renderFunction = () => {
    document.getElementById("app").innerHTML = render,
      SPAafter()
  },
  removeDOMFunction = () => {
    document.getElementById("app").innerHTML = ""
  };

function SPAafter() {
  if (null != document.querySelector(".js-slideCont")) {
    setTimeout(() => {
      const slideWrap = document.querySelector(".p-slide-wrap");
      slideWrap.classList.add("is-active")
    }, 1);
    const slideItems = document.querySelectorAll(".js-slideItem"),
      slideItemsLength = slideItems.length;
    let exFlag = !1;
    const exRatio = 1.8,
      transitionSpeed = 400,
      itemSlide = function () {
        let zIndex;
        const getIndexNum = function (num) {
          return document.defaultView.getComputedStyle(slideItems[num], null).zIndex
        };
        slideItems.forEach((function (elem, index) {
          elem.classList.add(`c-slide--${index + 1}`);
          const elemWidth = elem.offsetWidth;
          elem.addEventListener("mouseenter", (function () {
              zIndex = document.defaultView.getComputedStyle(elem, null).zIndex;
              const indexNumArray = [];
              for (let i = 0; i < slideItemsLength; i++)
                indexNumArray.push(getIndexNum(i));
              zIndex <= parseInt(Math.max.apply(null, indexNumArray)) && (elem.style.zIndex = parseInt(Math.max.apply(null, indexNumArray)) + 1),
                "pc" == mediaFlag && (elem.style.width = 100 / slideItemsLength * exRatio + "%",
                  index === slideItemsLength - 1 && !1 === exFlag && (elem.style.transform = "translateX(" + -(elemWidth * exRatio - elemWidth) + "px)"))
            })),
            elem.addEventListener("mouseleave", (function () {
              "pc" == mediaFlag ? elem.style.width = 100 / slideItemsLength + "%" : "sp" == mediaFlag && (elem.style.width = "100%"),
                index === slideItemsLength - 1 && (elem.style.transform = "translateX(0%)")
            })),
            window.addEventListener("resize", (function () {
              "pc" == mediaFlag ? elem.style.width = 100 / slideItemsLength + "%" : "sp" != mediaFlag && "tablet" != mediaFlag || (elem.style.width = "100%")
            })),
            elem.addEventListener("click", (function () {
              async function disableEvents() {
                for (let i = 0; i < slideItemsLength; i++)
                  slideItems[i].classList.add("is-noevents")
              }
              async function enableEvents() {
                await disableEvents(),
                  await sleep(400);
                for (let i = 0; i < slideItemsLength; i++)
                  slideItems[i].classList.remove("is-noevents")
              }
              enableEvents(),
                exFlag = !0 !== exFlag,
                elem.classList.toggle("is-clicked"),
                index === slideItemsLength - 1 && (elem.style.transform = "translateX(0%)")
            }))
        }))
      };
    itemSlide()
  }
  if (null != document.querySelector(".circle")) {
    const circle = document.querySelector(".circle");
    let elements = document.querySelectorAll(".target"),
      rotatePoint;
    for (let i = 0; i < 2; i++) {
      let cloneElement;
      const cloneChildren = circle.cloneNode("true").innerHTML;
      circle.insertAdjacentHTML("beforeend", cloneChildren)
    }
    elements = document.querySelectorAll(".target");
    const amount = elements.length;
    circle.style.setProperty("--itemAmount", amount);
    const setCircle = () => {
        const size = Math.round(100 * elements[0].getBoundingClientRect().width) / 100,
          radius = circle.getBoundingClientRect().width / 2 - size;

        function setPosition(element, angle) {
          const x1 = radius,
            y1 = radius,
            r = radius,
            a = angle,
            x2 = x1 + r * Math.cos(a * (Math.PI / 180)),
            y2 = y1 + r * Math.sin(a * (Math.PI / 180));
          element.style.top = y2 + size / 2 + "px",
            element.style.left = x2 + size / 2 + "px"
        }
        elements.forEach((elem, index) => {
          const degree = 360 / amount * index;
          setPosition(elem, degree),
            rotatePoint = amount / 4,
            index < rotatePoint ? elem.querySelector(".target__inner").style.rotate = ` ${90 / rotatePoint * index}deg` : index === rotatePoint ? elem.querySelector(".target__inner").style.rotate = " 90deg" : index < 2 * rotatePoint ? elem.querySelector(".target__inner").style.rotate = ` ${90 / rotatePoint * index}deg` : index === 2 * rotatePoint ? elem.querySelector(".target__inner").style.rotate = " 180deg" : index < 3 * rotatePoint ? elem.querySelector(".target__inner").style.rotate = ` ${90 / rotatePoint * index}deg` : index === 3 * rotatePoint ? elem.querySelector(".target__inner").style.rotate = " 270deg" : index < 4 * rotatePoint && (elem.querySelector(".target__inner").style.rotate = ` ${90 / rotatePoint * index}deg`)
        })
      },
      button = document.querySelectorAll(".button");
    button.forEach((function (elem, index) {
        elem.addEventListener("click", (function () {
          const currentDegree = parseFloat(document.defaultView.getComputedStyle(circle, null).rotate);
          if (elem.classList.contains("button--next")) {
            const nextDegree = currentDegree - 90 / rotatePoint;
            circle.style.rotate = nextDegree > -360 ? nextDegree + "deg" : "-90deg",
              elem.classList.add("is-busy"),
              circle.addEventListener("transitionend", (function () {
                elem.classList.remove("is-busy")
              }))
          }
          if (elem.classList.contains("button--prev")) {
            const nextDegree = currentDegree + 90 / rotatePoint;
            circle.style.rotate = nextDegree < 360 ? nextDegree + "deg" : "-90deg",
              elem.classList.add("is-busy"),
              circle.addEventListener("transitionend", (function () {
                elem.classList.remove("is-busy")
              }))
          }
        }))
      })),
      addEventListener("resize", (function () {
        circle.style.rotate = "-90deg",
          setCircle()
      })),
      setCircle(),
      setTimeout(() => {
        const circleWrap = document.querySelector(".circle-wrap");
        circleWrap.classList.add("is-active"),
          dispatchEvent(new Event("resize"))
      }, 1)
  }
  if (null != document.querySelector(".kv-parallax")) {
    const kvParallax = document.querySelector(".kv-parallax"),
      kvLeft = document.querySelector(".kv-left"),
      kvRight = document.querySelector(".kv-right"),
      kvCenter = document.querySelector(".kv-center"),
      maskedWrap = document.querySelector(".masked-wrap"),
      maskedArea = document.querySelector(".masked"),
      textMask1 = document.querySelector(".c-text-masked1"),
      textMask2 = document.querySelector(".c-text-masked2"),
      scrollDown = document.querySelector(".scrolldown");
    setTimeout(() => {
      scrollDown.classList.add("is-show"),
        kvParallax.classList.add("is-active"),
        kvRight.classList.add("is-active"),
        kvLeft.classList.add("is-active"),
        maskedWrap.classList.add("is-active"),
        textMask1.classList.add("is-active"),
        textMask2.classList.add("is-active"),
        maskedArea.classList.add("is-active")
    }, 1);
    const mask = document.querySelector(".js-mask"),
      getSize = parseFloat(getComputedStyle(mask).getPropertyValue("--maskSize")),
      getBgSize = parseFloat(document.defaultView.getComputedStyle(mask, null).backgroundSize);
    window.addEventListener("scroll", (function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        parallaxWrap = document.querySelector(".parallax-wrap"),
        parallaxWrapRect = !!parallaxWrap.getBoundingClientRect() && parallaxWrap.getBoundingClientRect(),
        parallaxWrapTop = parallaxWrapRect.top + scrollTop;
      if (scrollTop < parallaxWrapTop + window.innerHeight) {
        const windowHeight = window.innerHeight,
          windowBottom = scrollTop + windowHeight,
          windowHalf = scrollTop + windowHeight / 2,
          opacityRatio = .002;

        function maskAnimation1() {
          mask.style.setProperty("--maskSize", getSize + scrollTop / 30 + "%"),
            requestAnimationFrame(maskAnimation1)
        }

        function maskAnimation2() {
          mask.style.backgroundSize = getBgSize - scrollTop / 10 + "%",
            requestAnimationFrame(maskAnimation2)
        }
        scrollTop > 100 ? (kvLeft.style.transform = `translateX(${100 - scrollTop}px)`,
          kvRight.style.transform = `translateX(${scrollTop - 100}px)`,
          kvCenter.style.opacity = 1 - (scrollTop - 100) * opacityRatio,
          getSize + scrollTop / 10 > getSize && maskAnimation1(),
          getBgSize - scrollTop / 10 > 100 && maskAnimation2()) : (mask.style.setProperty("--maskSize", getSize + "%"),
          mask.style.backgroundSize = getBgSize + "%",
          kvLeft.style.transform = "translateX(0px)",
          kvRight.style.transform = "translateX(0px)",
          kvCenter.style.opacity = 1);
        const kvParallax = document.querySelector(".kv-parallax"),
          kvParallaxRect = kvParallax.getBoundingClientRect(),
          kvParallaxTop = kvParallaxRect.top + scrollTop,
          kvUnder = document.querySelector(".kv-under");
        scrollTop > kvParallaxTop && windowBottom > parallaxWrapTop ? (kvParallax.classList.remove("is-fixed"),
          kvUnder.classList.add("is-parallax-end")) : (scrollTop > kvParallaxTop ? (kvParallax.classList.add("is-fixed"),
            kvUnder.classList.remove("is-parallax-end")) : kvParallax.classList.remove("is-fixed"),
          scrollTop > parallaxWrapTop && kvParallax.classList.remove("is-fixed"))
      }
    }));
    const parallax = document.querySelector(".js-parallaxWrap");
    let parallaxHeight = parallax.offsetHeight;
    const parallaxContent = document.querySelector(".js-parallaxVH"),
      parallaxScroll = document.querySelector(".js-parallaxScroll");
    let parallaxContentWidth = parallaxScroll.offsetWidth,
      parallaxContentHeight = parallaxContent.offsetHeight,
      parallaxScrollWidth = parallaxScroll.scrollWidth;
    const parallaxEnd = document.querySelector(".parallax-end"),
      scrollYstartFlag = 300;
    let windowWidth = window.innerWidth,
      windowHeight = window.innerHeight,
      beforeFinish = .5 * windowWidth,
      isIntersecting;
    parallax.style.paddingBottom = parallaxScrollWidth + parallaxContentHeight + 2 * scrollYstartFlag - beforeFinish + "px",
      window.addEventListener("resize", (function () {
        windowWidth = window.innerWidth,
          windowHeight = window.innerHeight,
          parallaxHeight = parallax.offsetHeight,
          parallaxContentWidth = parallaxScroll.offsetWidth,
          parallaxContentHeight = parallaxContent.offsetHeight,
          parallaxScrollWidth = parallaxScroll.scrollWidth,
          beforeFinish = .5 * windowWidth,
          parallax.style.paddingBottom = parallaxScrollWidth + parallaxContentHeight + 2 * scrollYstartFlag - beforeFinish + "px"
      }));
    const observer = new IntersectionObserver((function (entries) {
      entries.forEach((function (entry) {
        entry.isIntersecting ? (window.addEventListener("scroll", parallaxAction, {
            passive: !0
          }),
          isIntersecting = !0) : (window.removeEventListener("scroll", parallaxAction, {
            passive: !0
          }),
          isIntersecting = !1)
      }))
    }));

    function parallaxAction() {
      parallaxHeight = parallax.offsetHeight,
        parallaxContentWidth = parallaxScroll.offsetWidth,
        parallaxContentHeight = parallaxContent.offsetHeight,
        parallaxScrollWidth = parallaxScroll.scrollWidth;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
      const windowBottom = scrollTop + windowHeight,
        parallaxRect = parallax.getBoundingClientRect(),
        parallaxTop = parallaxRect.top + scrollTop,
        parallaxEndRect = parallaxEnd.getBoundingClientRect(),
        parallaxEndTop = parallaxEndRect.top + scrollTop,
        scrollDif = scrollTop - parallaxTop;
      beforeFinish = .5 * windowWidth,
        scrollTop > parallaxTop && windowBottom > parallaxEndTop ? (parallaxContent.classList.remove("is-fixed"),
          parallaxContent.classList.add("is-finished"),
          parallaxContent.style.top = parallaxScrollWidth + 2 * scrollYstartFlag - beforeFinish + "px") : scrollTop > parallaxTop ? (parallaxContent.classList.add("is-fixed"),
          parallaxContent.classList.remove("is-finished"),
          parallaxContent.style.top = "0px",
          scrollTop > parallaxTop + scrollYstartFlag && parallaxScroll.scrollTo({
            left: scrollDif - scrollYstartFlag
          })) : (parallaxContent.classList.remove("is-fixed"),
          parallaxContent.style.top = "0px",
          parallaxScroll.scrollTo({
            left: 0
          }))
    }
    observer.observe(parallax);
    const parallaxCover1 = document.querySelector(".parallax-cover-1");

    function parallaxPages() {
      const parallaxAll = document.querySelectorAll(".js-parallax"),
        parallaxCover1Content = document.querySelector(".js-parallax1"),
        parallaxCover1Item = document.querySelector(".parallax-item1"),
        parallaxCover2 = document.querySelector(".parallax-cover-2"),
        parallaxCover2Content = document.querySelector(".js-parallax2"),
        parallaxCover2Item = document.querySelector(".parallax-item2"),
        parallaxCover3 = document.querySelector(".parallax-cover-3"),
        parallaxCover3Content = document.querySelector(".js-parallax3");

      function parallaxCoverAction() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop,
          windowBottom = scrollTop + windowHeight,
          cover1Rect = parallaxCover1.getBoundingClientRect(),
          cover1Top = cover1Rect.top + scrollTop,
          cover2Rect = parallaxCover2.getBoundingClientRect(),
          cover2Top = cover2Rect.top + scrollTop,
          cover3Rect = parallaxCover3.getBoundingClientRect(),
          cover3Top = cover3Rect.top + scrollTop,
          cover2Dif = scrollTop + windowHeight - cover2Top,
          cover3Dif = scrollTop + windowHeight - cover3Top;
        scrollTop > cover1Top && windowBottom > cover2Top ? (parallaxCover1Content.classList.remove("is-fixed"),
            parallaxCover1Content.classList.add("is-finished"),
            parallaxCover1Item.style.opacity = 1 - .002 * cover2Dif,
            parallaxCover1Item.style.transform = `translateY(-${.3 * cover2Dif}px)`) : scrollTop > cover1Top ? (parallaxCover1Content.classList.add("is-fixed"),
            parallaxCover1Content.classList.remove("is-finished"),
            parallaxCover1Item.style.opacity = 1,
            parallaxCover1Item.style.transform = "translateY(0px)") : (parallaxCover1Content.classList.remove("is-fixed"),
            parallaxCover1Item.style.opacity = 1,
            parallaxCover1Item.style.transform = "translateY(0px)"),
          scrollTop > cover2Top && windowBottom > cover3Top ? (parallaxCover2Content.classList.remove("is-fixed"),
            parallaxCover2Content.classList.add("is-finished"),
            parallaxCover2Item.style.opacity = 1 - .003 * cover3Dif,
            parallaxCover2Item.style.transform = `translateY(-${.3 * cover3Dif}px)`) : scrollTop > cover2Top ? (parallaxCover2Content.classList.add("is-fixed"),
            parallaxCover2Content.classList.remove("is-finished"),
            parallaxCover2Item.style.opacity = 1,
            parallaxCover2Item.style.transform = "translateY(0px)") : (parallaxCover2Content.classList.remove("is-fixed"),
            parallaxCover2Item.style.opacity = 1,
            parallaxCover2Item.style.transform = "translateY(0px)")
      }
      window.addEventListener("scroll", parallaxCoverAction, {
        passive: !0
      })
    }
    const observer2 = new IntersectionObserver((function (entries) {
      entries.forEach((function (entry) {
        entry.isIntersecting ? (window.addEventListener("scroll", parallaxPages, {
            passive: !0
          }),
          isIntersecting = !0) : (window.removeEventListener("scroll", parallaxPages, {
            passive: !0
          }),
          isIntersecting = !1)
      }))
    }));
    observer2.observe(parallaxCover1)
  }
  if (null != document.querySelector(".svg-wrap")) {
    const text = document.querySelector(".js-text"),
      startX = Number(text.getAttribute("dx"));
    let currentX = 0,
      totalX;

    function motionPathAnimation() {
      totalX < -1500 && (currentX = 0,
          totalX = startX - currentX),
        currentX += 1,
        totalX = startX - currentX,
        text.setAttribute("dx", totalX),
        requestAnimationFrame(motionPathAnimation)
    }
    motionPathAnimation()
  }
}
window.addEventListener("popstate", () => {
  buttonShrink.click()
});