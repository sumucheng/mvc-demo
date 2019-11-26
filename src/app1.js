import $ from "jquery";
import "./app1.css";
import Model from "./base/Model.js";
import View from "./base/View";

const m = new Model({
  data: {
    n: parseInt(localStorage.getItem("app1.n")) || 0
  },
  update(data) {
    Object.assign(m.data, data);
    this.trigger("m_updated");
    localStorage.setItem("app1.n", m.data.n);
  }
});

const init = el => {
  const view = new View({
    el: el,
    data: m.data,
    html: `
    <div >
      <div class="result">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button id="add">+1</button>
        <button id="minus">-1</button>
      </div>
    </div>
  `,

    render(data) {
      const n = data.n;
      if (this.el.children.length !== 0) {
        this.el.empty();
      }
      $(this.html.replace("{{n}}", n)).appendTo($(this.el));
    },

    events: {
      "click #add": "add",
      "click #minus": "minus"
    },
    add() {
      m.update({ n: m.data.n + 1 });
    },
    minus() {
      m.update({ n: m.data.n - 1 });
    }
  });
};

export default init;
