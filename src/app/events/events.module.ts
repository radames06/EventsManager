import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EventsListComponent } from './events-list/events-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { SearchEventsComponent } from './search-events/search-events.component';
import { BrowserModule } from '@angular/platform-browser';
import { EventCardComponent } from './event-card/event-card.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventStartComponent } from './event-start/event-start.component';
import { SharedModule } from '../shared.module';
import { ConcatArrayPipe } from '../services/concat-array.pipe';
@NgModule({
    declarations: [
        EventsListComponent,
        SearchEventsComponent,
        EventCardComponent,
        EventsComponent,
        EventDetailComponent,
        EventStartComponent,
        ConcatArrayPipe   
    ],
    imports: [
        RouterModule,
        EventsRoutingModule,
        BrowserModule,
        SharedModule
    ]
})
export class EventsModule {}