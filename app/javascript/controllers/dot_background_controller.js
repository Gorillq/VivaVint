import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dotContainer"]

  connect() {
    this.animateDots();
  }

  animateDots() {
    const dotContainer = this.dotContainerTarget;
    const dots = Array.from(dotContainer.children);

    // Function to randomly reposition dots
    const repositionDot = (dot) => {
      const rect = dotContainer.getBoundingClientRect();
      dot.style.top = `${Math.random() * rect.height}px`;
      dot.style.left = `${Math.random() * rect.width}px`;
    };

    // Animate dots every few seconds
    setInterval(() => {
      dots.forEach(dot => {
        repositionDot(dot);
        // Randomly change animation duration
        dot.style.animationDuration = `${Math.random() * 5 + 2}s`;
      });
    }, 24000); // Every 6 seconds, reposition dots
  }
}
