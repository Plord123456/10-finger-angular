import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  title = 'first_project';
  point = 0;
  timer = 60;
  words = 'example'; 
  inputValue = '';
  buttons = [
    { top: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] },
    { middle: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'] },
    { bottom: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'] }
  ];



  startGame() {
    this.point = 0;
    this.timer = 60;
    this.words = this.getRandomWord();
    this.inputValue = '';
    this.startTimer();
  }

  onInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    this.checkPoint();
  }

  onButtonClick(key: string) {
    this.inputValue += key;
    this.checkPoint();
  }

  checkPoint() {
    if (this.inputValue.trim().toLowerCase() === this.words.toLowerCase()) {
      this.point++;
      this.words = this.getRandomWord();
      this.inputValue = '';
    }
  }

  getRandomWord(): string {
    const wordList = ['example', 'word', 'list', 'for', 'typing', 'game'];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }

  startTimer() {
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(interval);
        alert('Game over! Your score: ' + this.point);
      }
    }, 1000);
  }
}
