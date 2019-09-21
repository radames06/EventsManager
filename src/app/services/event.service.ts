import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable, OnInit } from '@angular/core';
import { GuestEvent } from './guest-event.model';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class EventService {
    
    constructor(private http: HttpClient) { }

    private events: GuestEvent[];
    eventsChanged = new Subject<GuestEvent[]>();

    initEvents(userMail: String) {
        const options = {
            params: new HttpParams()
                .set('orderBy', '\"userMail\"')
                .set('equalTo', '\"' + userMail + '\"')
        };
        this.http
            .get('https://eventmanager-492e5.firebaseio.com/events.json', options)
            .subscribe(
                response => {
                    const returnArray = Object.keys(response).map(
                        it => {
                            // var currentEvent = <GuestEvent>response[it];
                            // currentEvent.firebaseId = it;
                            // currentEvent.attendees = currentEvent.attendees ? currentEvent.attendees : [];
                            // currentEvent.drinks = currentEvent.drinks ? currentEvent.drinks : [];
                            // currentEvent.dishes = currentEvent.dishes ? currentEvent.dishes : [];
                            var currentEvent = new GuestEvent(
                                it,
                                response[it].name,
                                new Date(response[it].date),
                                response[it].attendees,
                                response[it].event,
                                response[it].userMail,
                                response[it].dishes ? response[it].dishes : [],
                                response[it].drinks ? response[it].drinks : [],
                                response[it].feedback ? response[it].feedback : ''
                            )
                            return currentEvent;
                        }
                    );
                    this.events = returnArray;
                    this.eventsChanged.next(this.events.slice());
                },
                error => console.log("Error in Fetch : " + error)
            );
    }

    getEvents() {
        return this.events.slice();
    }
    getEvent(id: number) {
        return this.events[id];
    }
    updateEvent(id: number, guestEvent: GuestEvent) {
        console.log(this.events[id]);
        this.events[id] = guestEvent;
        console.log(this.events[id]);
        const updateURL = 'https://eventmanager-492e5.firebaseio.com/events/' + this.events[id].firebaseId + '.json';
        
        this.http
          .put(updateURL, this.events[id])
          .subscribe(
            response => {
              console.log(response);
              this.eventsChanged.next(this.events.slice());
            }
          );
    

        this.eventsChanged.next(this.events.slice());
    }
    addEvent(guestEvent: GuestEvent) {
        this.http.post('https://eventmanager-492e5.firebaseio.com/events.json', guestEvent)
          .subscribe((response: GuestEvent) => {
            console.log(response);
            guestEvent.firebaseId = response.name;
            this.events.push(guestEvent);
            this.eventsChanged.next(this.events.slice());
          });
    }
    deleteEvent(id: number) {
        this.events.splice(id, 1);
        this.eventsChanged.next(this.events.slice());
    }
}