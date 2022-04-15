import {DeleteEventAction, EventActionEnums, SetEventAction, SetGuestAction} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserService from "../../../api/userService";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestAction => ({type: EventActionEnums.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventAction => ({type: EventActionEnums.SET_EVENTS, payload}),
    deleteEvent: (payload:IEvent): DeleteEventAction=> ({type: EventActionEnums.DELETE_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data));
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event)
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json));
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (username:string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]';
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(ev=>ev.author === username || ev.guest===username);
            dispatch(EventActionCreators.setEvents(currentUserEvents));
        } catch (e){

        }
    }
}
