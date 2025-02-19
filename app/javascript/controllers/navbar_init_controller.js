import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const $navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
}
