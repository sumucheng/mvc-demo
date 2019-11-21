import $ from "jquery";
import "./app1.css";

const eventBus = $({});

const m = {
  data: {
    n: parseInt(localStorage.getItem("app1.n")) || 0
  },
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m_updated");
    localStorage.setItem("app1.n", m.data.n);
  },
  get() {}
};

const v = {
  el: null,
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
  init(container) {
    v.el = $(container);
  },
  render(n) {
    if (v.el.children.length !== 0) {
      v.el.empty();
    }
    v.el = $(v.html.replace("{{n}}", n)).appendTo($(v.el));
  }
};

const c = {
  init(container) {
    v.init(container);
    v.render(m.data.n);
    c.autoBindEvents();
    eventBus.on("m_updated", () => {
      v.render(m.data.n);
    });
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
