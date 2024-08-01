import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  point = 0;
  words = '';
  timer = 60;
  interval: any;
  inputValue: string = '';
  Mywords = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
    "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry",
    "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "xigua", "yam", "zucchini",
    "avocado", "blueberry", "coconut", "dragonfruit", "eggplant", "grapefruit", "huckleberry",
    "jackfruit", "kumquat", "lime", "mandarin", "nectar", "olive", "peach", "plum",
    "pomegranate", "quinoa", "rhubarb", "spinach", "tomato", "ube", "valencia", "walnut",
    "yellowfin", "zest"
  ];
  
  buttons = [
    { top: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"] },
    { middle: ["a", "s", "d", "f", "g", "h", "j", "k", "l"] },
    { bottom: ["z", "x", "c", "v", "b", "n", "m"] }
  ];

  ngOnInit(): void {
    this.resetGame();
  }

  startGame(): void {
    this.resetGame();
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.interval);
        alert("Time's up!");
      }
    }, 1000);
  }

  changeWord(): void {
    this.words = this.getRandomWord();
  }

  resetGame(): void {
    this.words = this.getRandomWord();
    this.point = 0;
    this.resetTimer();
  }

  resetTimer(): void {
    clearInterval(this.interval);
    this.timer = 60;
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.interval);
        this.point--;
        this.resetGame();
      }
    }, 1000);
  }

  getRandomWord(): string {
    const index = Math.floor(Math.random() * this.Mywords.length);
    return this.Mywords[index];
  }

  checkWord(): void {
    if (this.inputValue.trim().toLowerCase() === this.words.toLowerCase()) {
      alert("Correct!");
      this.point++;
      this.inputValue = '';
      this.words = this.getRandomWord();
    } else {
      alert("Incorrect!");
      this.inputValue = '';
    }
  }

  onInput(event: any): void {
    if (event.target.value.trim().toLowerCase() === this.words.toLowerCase()) {
      this.point++;
      this.inputValue = '';
      this.resetGame();
    }
  }

  onButtonClick(key: string): void {
    this.inputValue += key;
    if (this.inputValue.trim().toLowerCase() === this.words.toLowerCase()) {
      this.checkWord();
    } else if (this.inputValue.length >= this.words.length) {
      this.checkWord();
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.checkWord();
    }
  }
}
