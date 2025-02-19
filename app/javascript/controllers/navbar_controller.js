import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "nav" ]

  connect() {
    this.lastScrollTop = 0;
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  disconnect() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop){
      // Scroll Down
      this.navTarget.style.top = '-60px'; // Assuming navbar height is 60px
    } else {
      // Scroll Up
      this.navTarget.style.top = '0';
    }
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }
}
