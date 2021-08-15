import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-timer',
  templateUrl: './player-timer.component.html',
  styleUrls: ['./player-timer.component.css']
})
export class PlayerTimerComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    // Every second, decrement a second on this timer instance
    setInterval(() => { this.decrementSecond() }, 1000)
  }

  active: boolean = true;
  minutes: number = 10;
  seconds: number = 5;

  timerComplete(outcome: string) {
    clearInterval()
    if (outcome = "win") {
      // Turn the background color of the timer box to Green
    }
    else {
      // turn the background color of the timer box to Red
    }
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
      }
    }
  }

}
