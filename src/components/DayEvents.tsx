import React, {FC} from 'react';
import {IEvent} from "../models/IEvent";

interface DayEventsProps {
    dayEvents: IEvent[];
    onDelete : (ev:IEvent)=> void
}

const DayEvents: FC<DayEventsProps> = ({dayEvents,onDelete}) => {

    const deleteEvent =(ev:IEvent) =>{
        onDelete(ev);
    }

    return (
        <div>
            {   dayEvents.length<1
                ? <div>
                    No any events for this day.
                </div>
                : <ul>
                    {dayEvents.map((ev, index) =>
                        <li key={index} className='event-list'>{ev.description}
                            <button onClick={() => deleteEvent(ev)}>X</button>
                        </li>)}
                </ul>
            }
        </div>
    );
};

export default DayEvents;
