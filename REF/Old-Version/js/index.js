/* preloader */
function UI() {}

// hide preloader
UI.prototype.hidePreloader = function () {
 document.querySelector('.preloader').style.display = "none";
}

function eventListeners() {
 const ui = new UI()
 // preloader
 window.addEventListener('load', function () {
  ui.hidePreloader();
 })
}

eventListeners();
/* end of preloader */