import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import GameState from '../models/gamestate'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chess-clock';

  isMobileDevice: boolean = false

  gameState: GameState = new GameState("reset")
  key: string = ""
  player1TimerActive: boolean = true
  player2TimerActive: boolean = false
  defaultMinutes: number = 5
  defaultSeconds: number = 0

  constructor(private _snackbar: MatSnackBar) { }

  ngOnInit() {
    this.isMobileDevice = this.detectMobileDevice(window.navigator.userAgent)
    console.log(this.isMobileDevice)
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (this.key === "Enter" || this.key === " ") {
      this.switchTimers()
    }
  }

  detectMobileDevice(userAgent: string): boolean {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
    return isMobile
  }

  validateIsKeyPressNumber(event: KeyboardEvent, textboxName: string) {
    this.key = event.key;
    console.log(event.key)

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
                if ((event.target as HTMLTextAreaElement).value)
                  this.defaultMinutes = parseInt((event.target as HTMLTextAreaElement).value)
                console.log(this.defaultMinutes)
                return true
              }
            case 'seconds':
              {
                if ((event.target as HTMLTextAreaElement).value)
                  this.defaultSeconds = parseInt((event.target as HTMLTextAreaElement).value)
                console.log(this.defaultSeconds)
                return true;
              }
            default:
              {
                console.error("Not sure how you got here, it should be one of the above!")
                return false;
              }
          }
        }
      default:
        {
          event.preventDefault();
          console.log(this.key)
          return false;
        }
    }
  }


  openSnackBar(message: string, action: string): void {
    this._snackbar.open(message, action)
  }

  closeSnackBar(): void {
    this._snackbar.dismiss()
  }

  switchTimers(): void {
    this.player1TimerActive = !this.player1TimerActive
    this.player2TimerActive = !this.player2TimerActive
  }

  startGame(): void {
    this.gameState.set("active")
  }

  resetGame(): void {
    this.closeSnackBar()
    this.gameState.set("reset")
  }

  pauseGame(): void {
    this.gameState.set("paused")
  }

  endGame(event: Event): void {
    this.gameState.set("ended")
    this.openSnackBar("Timer complete!", "Close")
    console.log(event)
  }

}
