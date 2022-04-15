import {EventActionEnums, EventActions, EventState} from "./types";

const initialState :EventState = {
    guests: [],
    events: []
}

export default function EventReducer(state = initialState, action:EventActions):EventState {
    switch (action.type) {
        case EventActionEnums.SET_GUESTS:
            return {...state , guests: action.payload}
        case EventActionEnums.SET_EVENTS:
            return {...state, events: action.payload}
        case EventActionEnums.DELETE_EVENTS:
            return {guests: state.guests, events: state.events.filter(ev=>ev.id !== action.payload.id)};
        default:
            return state
    }
};
