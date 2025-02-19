import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    this.startAnimation();
  }

  startAnimation() {
    this.element.classList.add('slide-in-left');
    this.element.addEventListener('animationend', this.handleAnimationEnd);
  }

  handleAnimationEnd = () => {
    this.element.classList.remove('slide-in-left');
    // Schedule the next animation cycle after 5 seconds
    setTimeout(() => {
      this.resetAnimation();
    }, 10000); //delay
  }

  resetAnimation() {
    // Use requestAnimationFrame for smoother transition
    requestAnimationFrame(() => {
      this.startAnimation();
    });
  }
}
