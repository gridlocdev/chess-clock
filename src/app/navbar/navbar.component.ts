import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Input() mobileAudioEnabled!: boolean;
  
  @Output() mobileAudioStateChanged: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(this.mobileAudioEnabled)
  }

  toggleMobileAudioEnabled() {
    this.mobileAudioStateChanged.emit()
  }

}
