import "./app1.css";
import Vue from "vue";

const init = el => {
  new Vue({
    el: el,
    data: {
      n: parseInt(localStorage.getItem("app1.n")) || 0
    },
    methods: {
      add() {
        this.n += 1;
      },
      minus() {
        this.n -= 1;
      }
    },
    watch: {
      n() {
        localStorage.setItem("app1.n", this.n);
      }
    },
    template: `
    <section >
      <div class="result">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button @click="add">+1</button>
        <button @click="minus">-1</button>
      </div>
    </section>
  `
  });
};

export default init;
