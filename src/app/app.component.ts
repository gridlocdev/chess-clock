import { Component, HostListener } from '@angular/core';
import GameState from '../models/gamestate'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chess-clock';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (this.key === "Enter" || this.key === " ") {
      this.switchTimers()
    }
  }
  validateIsKeyPressNumber(event: KeyboardEvent, textboxName: string) {
    this.key = event.key;

    switch (event.key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        {
          switch (textboxName) {
            case 'minutes':
              {
                this.defaultMinutes = parseInt((event.target as HTMLTextAreaElement).value)
                return true
              }
            case 'seconds':
              {
                this.defaultSeconds = parseInt((event.target as HTMLTextAreaElement).value)
                return true;
              }
            default:
              {
                console.error("Not sure how you got here, it should be one of the above!")
              }
          }
          return true;
        }
      default:
        {
          event.preventDefault();
          return false;
        }
    }
  }

  gameState: GameState = new GameState("reset")
  key: string = ""
  player1TimerActive: boolean = true
  player2TimerActive: boolean = false
  defaultMinutes: number = 5
  defaultSeconds: number = 0

  switchTimers(): void {
    this.player1TimerActive = !this.player1TimerActive
    this.player2TimerActive = !this.player2TimerActive
  }

  startGame(): void {
    this.gameState.set("active")
  }

  resetGame(): void {
    this.gameState.set("reset")
  }

  pauseGame(): void {
    this.gameState.set("paused")
  }

  endGame(event: Event): void {
    this.gameState.set("ended")
    console.log(event)
  }

}
