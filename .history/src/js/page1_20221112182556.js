const updateView = () => {
  const pages = {
    "/": `
      <h1>Vanilla SPA</h1>
      <a href="/about/" class="aboutLink">aboutページ</a>
      <a href="/works/" class="worksLink">worksページ</a>
      <a href="/skill/" class="skillLink">skillページ</a>
    `,
    "/works/": `
      <h1>ようこそ！</h1>
    `,
    "/skill/": `
      <h1>私は太郎です。</h1>
    `
  };
  const page = pages[window.location.pathname];
  const render = page || `<h1>404 : Not Found<h1>`;
  document.getElementById("app").innerHTML = render;
  document.getElementById("app").innerHTML = pages[window.location.pathname];
};

document.querySelectorAll("a").forEach(a => {
  a.onclick = event => {
    event.preventDefault(); //アンカーリンクのデフォルト挙動をdisable
    window.history.pushState(null, "", a.href);
    updateView(); //ここで定義した関数を発火
  };
});
//初期化処理
updateView();