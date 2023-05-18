const updateView = () => {
  const pages = {
    "/": `
      <h1>Vanilla SPA</h1>
    `,
    "/home": `
      <h1>ようこそ！</h1>
    `,
    "/profile": `
      <h1>私は太郎です。</h1>
    `
  };
  document.getElementById("app").innerHTML = pages[window.location.pathname];
};

document.querySelectorAll("a").forEach(a => {
  a.onclick = event => {
    event.preventDefault();//アンカーリンクのデフォルト挙動をdisable
    window.history.pushState(null, "", a.href);
    updateView();//ここで定義した関数を発火
  };
});