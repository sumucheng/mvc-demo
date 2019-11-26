import $ from "jquery";
import "./app2.css";
import Model from "./base/Model";
import View from "./base/View";

const m = new Model({
  data: {
    index: parseInt(localStorage.getItem("app2.index")) || 0
  },
  update(data) {
    Object.assign(m.data, data);
    this.trigger("m_updated");
    localStorage.setItem("app2.index", m.data.index);
  }
});

const init = el => {
  const view = new View({
    el: el,
    data: m.data,
    html: index => {
      return `
      <section id="app2">
      <ol class="tab-bar">
        <li class='${index === 0 ? "selected" : ""}' data-index='0'>1</li>
        <li class='${index === 1 ? "selected" : ""}' data-index='1'>2</li>
      </ol>
      <ol class="tab-content">
        <li class='${index === 0 ? "active" : ""}'>hello</li>
        <li class='${index === 1 ? "active" : ""}'>world</li>
      </ol>
    </section>
    `;
    },
    render(data) {
      const index = data.index;
      if (this.el.children.length !== 0) {
        this.el.empty();
      }
      $(this.html(index)).appendTo($(this.el));
    },
    events: {
      "click .tab-bar li": "x"
    },
    x(e) {
      const index = parseInt(e.currentTarget.dataset.index);
      m.update({ index: index });
    }
  });
};

export default init;
