export class GuestEvent {

    constructor (
        public firebaseId: String,
        public name: String,
        public date: Date,
        public attendees: String[],
        public event: String, // lunch, dinner, birthday...
        public userMail: String,
        public dishes?: String[],
        public drinks?: String[],
        public feedback?: String,
    ) {}

    public cloneEvent() : GuestEvent {
        return new GuestEvent(
            this.firebaseId,
            this.name,
            this.date,
            this.attendees.slice(),
            this.event,
            this.userMail,
            this.dishes.slice(),
            this.drinks.slice(),
            this.feedback
        )
    }
}