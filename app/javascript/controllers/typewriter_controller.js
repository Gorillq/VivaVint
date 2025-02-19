import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "cursor", "cursor2"];

  connect() {
    this.phrases = [
      { dynamic: "complexity", dynamic2: "simplicity." },
      { dynamic: "waiting", dynamic2: "instant gratification." },
      { dynamic: "confusion", dynamic2: "clear information." },
      { dynamic: "hidden fees", dynamic2: "transparent pricing." },
      { dynamic: "complicated processes", dynamic2: "seamless experiences." },
      { dynamic: "poor service", dynamic2: "exceptional support." },
      { dynamic: "limited options", dynamic2: "a wide variety of choices." }
    ];
    this.currentPhraseIndex = 0;
    this.typePhrase();
  }

  typePhrase() {
    let phrase = this.phrases[this.currentPhraseIndex];
    const dynamicPart = this.textTarget.querySelector('.dynamic-part');
    const dynamicPart2 = this.textTarget.querySelector('.dynamic-part-2');
    const cursor1 = this.cursorTarget;
    const cursor2 = this.cursor2Target;

    // Reset dynamic parts
    dynamicPart.innerHTML = '';
    dynamicPart2.innerHTML = '';
    cursor1.style.left = '0em';
    cursor2.style.left = '0em';

    // Type dynamic part after 'hate'
    this.typeDynamicText(dynamicPart, cursor1, phrase.dynamic, () => {
      // Type dynamic part after 'love'
      this.typeDynamicText(dynamicPart2, cursor2, phrase.dynamic2, () => {
        setTimeout(() => this.deleteDynamicText(dynamicPart, dynamicPart2, cursor1, cursor2), 3000); // Wait 2 seconds before deleting
      });
    });
  }

  typeDynamicText(element, cursor, text, callback) {
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        let charSpan = document.createElement('span');
        charSpan.textContent = text[index];
        charSpan.className = 'dynamic-text';
        element.appendChild(charSpan);
        cursor.style.left = (index + 1) + 'em';
        index++;
      } else {
        clearInterval(typeInterval);
        callback();
      }
    }, 125); // Speed of typing
  }

  deleteDynamicText(element1, element2, cursor1, cursor2) {
    let text1 = element1.children;
    let text2 = element2.children;
    let index1 = text1.length - 1;
    let index2 = text2.length - 1;

    const deleteInterval = setInterval(() => {
      if (index2 >= 0) {
        element2.removeChild(text2[index2]);
        cursor2.style.left = index2 + 'em';
        index2--;
      } else if (index1 >= 0) {
        element1.removeChild(text1[index1]);
        cursor1.style.left = index1 + 'em';
        index1--;
        if (index1 === -1) {
          clearInterval(deleteInterval);
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
          setTimeout(() => this.typePhrase(), 500); // Wait half a second before starting next phrase
        }
      }
    }, 90); // Speed of deleting
  }
}
