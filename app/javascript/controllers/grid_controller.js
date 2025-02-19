import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "cell" ]

  connect() {
    this.cellTargets.forEach(cell => {
      cell.addEventListener("mouseover", this.onHover.bind(this, cell))
      cell.addEventListener("mouseout", this.onLeave.bind(this, cell))
    })
  }

  onHover(cell) {
    cell.style.transform = "scale(1.1)"
  }

  onLeave(cell) {
    cell.style.transform = "scale(1)"
  }

  async loadContent(event) {
    const cell = event.currentTarget
    const url = cell.dataset.contentUrl

    if (url) {
      try {
        const response = await fetch(url)
        const content = await response.text()
        cell.innerHTML = content
      } catch (error) {
        console.error("Error loading content:", error)
      }
    }
  }
}
