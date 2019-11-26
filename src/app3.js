import "./app3.css";
import Vue from "vue";

const init = el => {
  new Vue({
    el: el,
    data: {
      active:
        localStorage.getItem("app3.active") === "yes" ? "yes" : "no" || "yes"
    },
    watch: {
      active() {
        localStorage.setItem("app3.active", this.active);
      }
    },
    template: `
      <section id="app3">
        <div class="square" :class="active==='yes'?'active':''"
             @click="active==='yes'?active='no':active='yes'"></div>
      </section>
    `
  });
};
export default init;
