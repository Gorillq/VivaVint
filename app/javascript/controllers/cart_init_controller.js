import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const checkbox = document.getElementById('cart-toggle-checkbox');
    const dropdown = document.getElementById('cart-dropdown');

    if (checkbox && dropdown) {
      checkbox.addEventListener('change', () => {
        dropdown.classList.toggle('is-hidden', !checkbox.checked);
      });
    }
  }
}
