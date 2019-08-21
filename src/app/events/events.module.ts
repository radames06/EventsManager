import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EventsListComponent } from './events-list/events-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { SearchEventsComponent } from './search-events/search-events.component';
@NgModule({
    declarations: [
        EventsListComponent,
        SearchEventsComponent       
    ],
    imports: [
        RouterModule,
        EventsRoutingModule
    ]
})
export class EventsModule {}