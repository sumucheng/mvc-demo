import "./app4.css";
import Vue from "vue";

const init = el => {
  new Vue({
    el: el,
    data: {
      active: "no"
    },
    template: `
      <section id="app4">
        <div class="circle" :class="active==='yes'?'active':''"
             @mouseenter="active='yes'" @mouseleave="active='no'"></div>
      </section>
    `
  });
};

export default init;
