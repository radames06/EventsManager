import { Attendee } from './attendee.model';
import { Dish } from './dish.model';
import { Drink } from './drink.model';

export class GuestEvent {

    constructor (
        public date: Date,
        public attendees: Attendee[],
        public event: String, // lunch, dinner, birthday...
        public dishes?: Dish[],
        public drinks?: Drink[],
        public feedback?: String
    ) {}

    cloneEvent() {
        return new GuestEvent(
            this.date,
            this.attendees.slice(),
            this.event,
            this.dishes.slice(),
            this.drinks.slice(),
            this.feedback
        )
    }

    get attendeesNames() {
        return this.attendees.map(value => value.name); 
    }
    get dishesNames() {
        return this.dishes.map(value => value.name);
    }
    get drinksNames() {
        return this.drinks.map(value => value.name);
    }
}