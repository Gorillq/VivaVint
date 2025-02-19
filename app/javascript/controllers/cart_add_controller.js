import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form"]

  addProduct(event) {
    event.preventDefault();

    const form = this.formTarget;
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert("Product added to cart!");
        // Update your UI here if needed
      } else {
        alert(data.message || 'Failed to add product to cart!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while adding the product to the cart. Please try again.');
    });
  }
}
