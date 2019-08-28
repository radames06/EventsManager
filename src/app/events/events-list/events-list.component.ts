import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { GuestEvent } from 'src/app/services/guest-event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit, OnDestroy {

  eventsList: GuestEvent[];
  subscription: Subscription;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.subscription = this.eventService.eventsChanged.subscribe((guestEvents: GuestEvent[]) => {
      this.eventsList = guestEvents;
    })
    this.eventsList = this.eventService.getEvents();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
