import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventStartComponent } from './event-start/event-start.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CanDeactivateGuard } from '../services/can-deactivate.guard';

const eventsRoutes: Routes = [
  {
    path: 'events',
    component: EventsComponent,
    children: [
      {
        path: '',
        component: EventStartComponent
      }, 
      {
        path: ':id',
        component: EventDetailComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'new',
        component: EventDetailComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }