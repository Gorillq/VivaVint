import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // This will trigger the animation when the element connects to the DOM
    setTimeout(() => {
      this.element.classList.add('show');
    }, 100); // Small delay to ensure the SVG is fully loaded
  }
}
