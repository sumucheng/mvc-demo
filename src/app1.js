import $ from "jquery";
import "./app1.css";

const $add = $("#add");
const $minus = $("#minus");
const $number = $("#number");
const n = localStorage.getItem("n");
$number.text(n || 0);

$add.on("click", () => {
  let n = parseInt($number.text());
  n += 1;
  localStorage.setItem("n", n);
  $number.text(n);
});
$minus.on("click", () => {
  let n = parseInt($number.text());
  n -= 1;
  localStorage.setItem("n", n);
  $number.text(n);
});
