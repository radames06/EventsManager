import { Injectable } from '@angular/core';
import { GuestEvent } from './guest-event.model';
import { Attendee } from './attendee.model';
import { Dish } from './dish.model';
import { Drink } from './drink.model';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {
    private events: GuestEvent[] = [
        new GuestEvent(
            new Date('01/01/2018'),
            [
                new Attendee("Paul"),
                new Attendee("Pierre")
            ],
            "Lunch",
            [
                new Dish("Poulet au curry"),
                new Dish("Mousse au chocolat")
            ],
            [
                new Drink(
                    "Vin",
                    "Pomerol",
                    2011
                )
            ]
        ),
        new GuestEvent(
            new Date("08/15/2019"),
            [
                new Attendee("Paul"),
                new Attendee("Kevin"),
                new Attendee("Brad")
            ],
            "Party",
            [
                new Dish("Merguez"),
                new Dish("Houmous"),
                new Dish("Chips")
            ],
            [
                new Drink(
                    "Soda",
                    "Diet-Coke",
                    null
                ),
                new Drink(
                    "Whisky",
                    "Lagavullin 15yo",
                    null
                )
            ],
            "Kevin likes very much Lagavullin."
        )
    ]
    eventsChanged = new Subject<GuestEvent[]>();

    getEvents() {
        return this.events.slice();
    }
    getEvent(id: number) {
        return this.events[id];
    }
    updateEvent(id: number, guestEvent: GuestEvent) {
        this.events[id] = guestEvent;
        this.eventsChanged.next(this.events.slice());
    }
    addEvent(guestEvent: GuestEvent) {
        this.events.push(guestEvent);
        this.eventsChanged.next(this.events.slice());
    }
    deleteEvent(id: number) {
        this.events.splice(id, 1);
        this.eventsChanged.next(this.events.slice());
    }
}