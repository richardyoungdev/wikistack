const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">
      <input id="name" name="name" placeholder="type author name" type="text" class="form-control"/>

      <input id="email" name="email" placeholder="type author email" type="text" class="form-control"/>

      <input id="title" name="title" type="text" class="form-control" placeholder="title"/>

      <textarea id="content" name="content" type="text" class="form-control"/>I love ! :D</textarea>

      <input id="status" name="status" type="text" class="form-control"/>

      <button type="submit" class="btn btn-primary">submit</button>
  </form>
`);