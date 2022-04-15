import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";

export interface EventState {
    guests : IUser[];
    events: IEvent[];
}

export enum EventActionEnums {
    SET_GUESTS = "SET_GUESTS",
    SET_EVENTS = "SET_EVENTS",
    DELETE_EVENTS = "DELETE_EVENTS"
}

export interface SetGuestAction {
    type: EventActionEnums.SET_GUESTS;
    payload: IUser[];
}

export interface SetEventAction {
    type: EventActionEnums.SET_EVENTS;
    payload: IEvent[];
}

export interface DeleteEventAction {
    type: EventActionEnums.DELETE_EVENTS;
    payload: IEvent;
}

export type EventActions  = SetEventAction | SetGuestAction | DeleteEventAction;



