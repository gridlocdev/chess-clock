import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import GameState from '../../models/gamestate'

@Component({
  selector: 'app-player-timer',
  templateUrl: './player-timer.component.html',
  styleUrls: ['./player-timer.component.css']
})
export class PlayerTimerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.startTimer()
  }

  @Input() active!: boolean;
  @Input() playerName!: string;
  @Input() gameState!: GameState;
  @Input() defaultMinutes!: number;
  @Input() defaultSeconds!: number;

  @Output() onEndOfGame: EventEmitter<any> = new EventEmitter<any>();

  minutes: number = this.defaultMinutes;
  seconds: number = this.defaultSeconds;

  startTimer() {
    clearInterval() // Doesn't do anything, but I'll keep it here since replacing with an Observable would make sense.
    // Every second, decrement a second on this timer instance
    setInterval(() => {
      console.log(this.gameState.get())
      if (this.active == true && this.gameState.get() == 'active') {
        this.decrementSecond()
      } else if (this.gameState.get() == 'reset') {
        this.stopTimer()
        this.resetClock()
      } else if (this.gameState.get() == 'paused') {
        this.stopTimer()
      } else if (this.gameState.get() == 'ended') {
        this.stopTimer()
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval()
  }

  resetClock() {
    this.minutes = this.defaultMinutes
    this.seconds = this.defaultSeconds
  }

  decrementSecond() {
    if (this.seconds > 0) {
      this.seconds--;
    }
    else {
      if (this.minutes > 0) {
        this.seconds = 59;
        this.minutes--;
      }
      else {
        // TODO: Send an event call to the parent module that says which one wins
        clearInterval()
        this.onEndOfGame.emit('ended')
      }
    }
  }

}
