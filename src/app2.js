import $ from "jquery";
import "./app2.css";

const eventBus = $({});

const m = {
  data: {
    index: parseInt(localStorage.getItem("app2.index")) || 0
  },
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m_updated");
    localStorage.setItem("app2.index", m.data.index);
  },
  get() {}
};

const v = {
  el: null,
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
  init(container) {
    v.el = $(container);
  },
  render(index) {
    if (v.el.children.length !== 0) {
      v.el.empty();
    }
    $(v.html(index)).appendTo($(v.el));
  }
};

const c = {
  init(container) {
    v.init(container);
    v.render(m.data.index);
    c.autoBindEvents();
    eventBus.on("m_updated", () => {
      v.render(m.data.index);
    });
  },
  events: {
    "click .tab-bar li": "x"
  },
  x(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    m.update({ index: index });
  },

  autoBindEvents() {
    for (let key in c.events) {
      const fn = c[c.events[key]];
      const spaceIndex = key.indexOf(" ");
      const e = key.slice(0, spaceIndex);
      const s = key.slice(spaceIndex + 1);
      v.el.on(e, s, fn);
    }
  }
};

export default c;
