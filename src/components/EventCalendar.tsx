import React, {FC} from 'react';
import {Calendar, Modal} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useState} from "react";
import DayEvents from "./DayEvents";
import {useAction} from "../hooks/useAction";
import {store} from "../store";


interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    const {deleteEvent} = useAction()
    const [modal, setModal] = useState(false)
    const [dayEvents, setDayEvents] = useState([] as IEvent[]);
    const [deletedEvents, setDeletedEvents] = useState([] as IEvent[]);

    const getCurrentDayEvents=(value:Moment)=>{
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter((ev) => ev.date === formatedDate);
        return currentDayEvents;
    }

    const handleSelect = (value:Moment) =>{
        const events = getCurrentDayEvents(value);
        if(events.length){
            setDayEvents(events);
            setModal(true);
        }
    }

    const handleSubmit = () =>{
        for (let i =0; i< deletedEvents.length; i++){
            deleteEvent(deletedEvents[i]);
        }
        localStorage.setItem('events', JSON.stringify(store.getState().event.events));
        setModal(false);
    }

    const handleDelete = (ev: IEvent) => {
        const updatedEvents = dayEvents.filter(event => event.id !== ev.id);
        setDayEvents(updatedEvents);
        setDeletedEvents([...deletedEvents, ev]);
        console.log(deletedEvents);
    }

    const handleCancel = () =>{
        setModal(false);

    }

    function dataCellRender(value: Moment) {
        const currentDayEvents = getCurrentDayEvents(value)
        return (
            <div>
                {currentDayEvents.map((ev, i) => (
                       <div key={i}>{ev.description}</div>
                ))}
            </div>
        )
    }

    return (
        <>
            <Calendar dateCellRender={dataCellRender} onSelect={(value)=>handleSelect(value)}/>
            <Modal visible={modal}
                   onCancel={handleCancel}
                   onOk={handleSubmit}
            >
                <DayEvents dayEvents={dayEvents}
                            onDelete={handleDelete}
                />
            </Modal>)
        </>

    );
};

export default EventCalendar;
