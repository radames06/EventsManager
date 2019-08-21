import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { SearchEventsComponent } from './search-events/search-events.component';

const eventsRoutes: Routes = [
    { path: 'events-list', component: EventsListComponent },
    { path: 'search-events', component: SearchEventsComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(eventsRoutes)],
    exports: [RouterModule]
})
export class EventsRoutingModule {}