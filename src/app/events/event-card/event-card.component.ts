import { Component, OnInit, Input } from '@angular/core';
import { GuestEvent } from 'src/app/services/guest-event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() guestEvent: GuestEvent;
  @Input() index: number; 
  
  constructor() { }

  ngOnInit() {
  }

}
