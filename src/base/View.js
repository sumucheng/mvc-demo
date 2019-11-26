import $ from "jquery";
import EventBus from "./EventBus";

class View extends EventBus {
  constructor(options) {
    super();
    Object.assign(this, options);
    this.el = $(this.el);
    this.render(this.data);
    this.autoBindEvents();
    this.on("m_updated", () => {
      this.render(this.data);
    });
  }
  autoBindEvents() {
    for (let key in this.events) {
      const fn = this[this.events[key]];
      const spaceIndex = key.indexOf(" ");
      const e = key.slice(0, spaceIndex);
      const s = key.slice(spaceIndex + 1);
      this.el.on(e, s, fn);
    }
  }
}
export default View;
