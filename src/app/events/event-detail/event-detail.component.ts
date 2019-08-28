import { Component, OnInit, ViewChild } from '@angular/core';
import { GuestEvent } from 'src/app/services/guest-event.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { faTrash, faEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/services/dialog.service';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/services/attendee.model';
import { Dish } from 'src/app/services/dish.model';
import { Drink } from 'src/app/services/drink.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  faTrash = faTrash; // icons
  faEdit = faEdit;
  faCalendarAlt = faCalendarAlt;
  id: number;
  guestEvent: GuestEvent;
  editEvent: GuestEvent;
  eventDate: NgbDate;
  editMode = false;
  addMode = false;
  formUntouched = true;
  addGuest: String;
  addDish: String;
  addDrink: String;
  @ViewChild('eventForm', { static: false }) eventForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.addMode = (this.route.pathFromRoot[2].snapshot.url[0].path ==  "new");
          if (!this.addMode) {
            this.guestEvent = this.eventService.getEvent(this.id);
            this.editMode = false;
            this.formUntouched = true;
          } else {
            this.guestEvent = new GuestEvent(
              new Date(),
              new Array<Attendee>(),
              null,
              new Array<Dish>(),
              new Array<Drink>()
            );
            this.editMode = true;
            this.formUntouched = true;
          }
          console.log(this.guestEvent);
          this.editEvent = this.guestEvent.cloneEvent();

        }
      );
  }

  onEdit() {
    this.editMode = true;
    this.formUntouched = true;
    this.eventDate = new NgbDate(
      this.guestEvent.date.getFullYear(),
      this.guestEvent.date.getMonth() + 1,
      this.guestEvent.date.getDate()
    );
  }
  onSubmit(form: NgForm) {
    this.editMode = false;
    this.editEvent.date = new Date(this.eventDate.year, this.eventDate.month - 1, this.eventDate.day);
    this.guestEvent = this.editEvent.cloneEvent();
    this.formUntouched = true;
    this.eventForm.reset();
    if (this.addMode) {
      this.eventService.addEvent(this.guestEvent);
    } else {
      this.eventService.updateEvent(this.id, this.guestEvent);
    }
  }
  onCancel() {
    this.editMode = false;
    this.editEvent = this.guestEvent.cloneEvent();
    this.formUntouched = true;
    this.eventForm.reset();
  }
  onDeleteAttendee(id: number) {
    this.editEvent.attendees.splice(id, 1);
    this.formUntouched = false;
  }
  onDeleteDish(id: number) {
    this.editEvent.dishes.splice(id, 1);
    this.formUntouched = false;
  }
  onDeleteDrink(id: number) {
    this.editEvent.drinks.splice(id, 1);
    this.formUntouched = false;
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (
      this.eventForm.untouched
      && this.formUntouched
    ) {
      return true;
    } else {
      return this.dialogService.confirm('Discard changes ?');
    }
  }
  onAddGuest() {
    this.editEvent.attendees.push(new Attendee(this.addGuest));
    // this.eventForm.controls['addGuest'].reset();
    this.addGuest = null;
    this.formUntouched = false;
  }
  onAddDish() {
    this.editEvent.dishes.push(new Dish(this.addDish));
    // this.eventForm.controls['addDish'].reset();
    this.addDish = null;
    this.formUntouched = false;
  }
  onAddDrink() {
    this.editEvent.drinks.push(new Drink(this.addDrink, null, null));
    // this.eventForm.controls['addDrink'].reset();
    this.addDrink = null;
    this.formUntouched = false;
  }
  onDelete() {
    this.eventService.deleteEvent(this.id);
    this.router.navigate(['/events']);
  }
}
