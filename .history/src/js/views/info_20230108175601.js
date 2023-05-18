const page4 = `
<div class="info">
    <a href="/" class="backButton">
    </a>
    <section class="infoFv">
      <div class="container">
        <h1>INFO</h1>
      </div>
    </section>

    <section class="infoNews">
      <div class="container">
        <h2>お知らせ</h2>
        <dl class="def">
          <div class="defInner">
            <dt>2022.12.25</dt>
            <dd>News Title</dd>
          </div>
          <div class="defInner">
            <dt>2022.12.25</dt>
            <dd>News Title</dd>
          </div>
          <div class="defInner">
            <dt>2022.12.25</dt>
            <dd>News Title</dd>
          </div>
        </dl>
      </div>
    </section>

    <iframe src="https://workup-sub.com/test_shitsukawa/form/index.php" frameborder="0"></iframe>

    
    <section class="infoForm">
      <h2>お問い合わせフォーム</h2>
      <form action="" method="post">
        <table>
          <tr>
            <th>
              <label for="name">
                <span class="title">ご希望</span><span class="require">必須</span>
              </label>
            </th>
            <td>
              <input type="text" name="name">
            </td>
          </tr>
          <tr>
            <th>
              <label for="mail">
                <span class="title">メールアドレス</span><span class="require">必須</span>
              </label>
            </th>
            <td>
              <input type="mail" name="mail">
            </td>
          </tr>
          <tr>
            <th>
              <label for="tel">
                <span class="title">電話番号</span><span class="require">必須</span>
              </label>
            </th>
            <td>
              <input type="tel" name="tel">
            </td>
          </tr>
          <tr>
            <th>
              <label for="detail">
                <span class="title">内容</span><span class="require">必須</span>
              </label>
            </th>
            <td>
              <textarea name="detail" id="" cols="30" rows="5"></textarea>
            </td>
          </tr>
        </table>
        <div class="submitButton">
          <input type="submit" value="送信する">
        </div>
      </form>
    </section>
  </div>
`;
export {
    page4
};