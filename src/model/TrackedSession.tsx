export class TrackedSession {
    /** Title of session, set at end of tracking before save */
    title: string = ``;

    /** Events that make up the session */
    events: Array<SessionEvent> = [];
}

export class SessionEvent {
    /** Event title */
    title: string;

    /** Time as an epoch timestamp */
    time: number;

    /** Notes about this instance of the event */
    notes: string = ``;

    constructor(title: string, time: number = Date.now()) {
        this.title = title;
        this.time = time;
    }
}
