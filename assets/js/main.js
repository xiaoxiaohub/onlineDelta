/* OnlineDelta 站点交互：导航菜单、滚动显现、Fact 数字滚动、零件选择、商品配置 */
(function () {
  "use strict";

  /* 移动端菜单 */
  var btn = document.getElementById("menuBtn");
  var links = document.getElementById("navLinks");
  if (btn && links) {
    btn.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  /* 滚动显现 */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* Fact 数字滚动（data-count 目标值，data-decimals 小数位，data-prefix/suffix 前后缀） */
  function animateFact(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var pre = el.getAttribute("data-prefix") || "";
    var suf = el.getAttribute("data-suffix") || "";
    var dur = 1400, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * eased).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var fio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateFact(e.target); fio.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-count]").forEach(function (el) { fio.observe(el); });

  /* 零件总览：点击节点切换说明 */
  var nodes = document.querySelectorAll(".part-node");
  var info = document.getElementById("partInfo");
  nodes.forEach(function (n) {
    n.addEventListener("click", function () {
      nodes.forEach(function (x) { x.classList.remove("sel"); });
      n.classList.add("sel");
      if (!info) return;
      info.querySelector("h3").textContent = n.getAttribute("data-name");
      info.querySelector("p").textContent = n.getAttribute("data-desc");
      var price = info.querySelector(".price");
      if (price) price.innerHTML = n.getAttribute("data-price");
      var link = info.querySelector("a.btn");
      if (link) link.href = n.getAttribute("data-href");
    });
  });

  /* 商品配置单选 */
  document.querySelectorAll(".opt-group").forEach(function (g) {
    g.querySelectorAll(".opt").forEach(function (o) {
      o.addEventListener("click", function () {
        g.querySelectorAll(".opt").forEach(function (x) { x.classList.remove("sel"); });
        o.classList.add("sel");
      });
    });
  });

  /* 询价表单：前端演示提交 */
  var form = document.getElementById("inquiryForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var done = document.getElementById("formDone");
      form.style.display = "none";
      if (done) done.style.display = "block";
      if (done) done.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
