import React, { Component } from 'react';
import '../Schedule/Schedule.css'

import {
    ScheduleComponent, Inject, Week,
    WorkWeek, Month, Agenda, Day, EventSettingsModel,
    ViewDirective, ViewsDirective, EventRenderedArgs, ActionEventArgs
} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { L10n } from '@syncfusion/ej2-base'


class Schedule extends Component {

    constructor(props) {

        super(props)

        /**creating a new instance of the scheduler component allowing us to access the data in the scheduler
         * and the default methods that come with the scheduler component*/
        this.scheduleObj = ScheduleComponent;

        this.state = {

            data: [{
                Id: 1,  /**must be unique for each event */

                EventType: 'New',   /**for the dropdown in the editor window template */

                Subject: "Therapy Session",    /**title for event */

                /**start time of event
                 * format is ('year' , 'month starting from Jan as 0' , 'day', '24hr time hour', '24hr time min') */
                StartTime: new Date(2021, 1, 1, 18, 0),

                EndTime: new Date(2021, 1, 1, 20, 59),  /**end time of event */

                Location: 'BTech last floor',   /**location of event */

                IsAllDay: false,

                CategoryColor: '#f57f17',

                // RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',

                IsReadonly: true,  /**make event editable or not */

            },
            {
                Id: 2,  /**must be unique for each event */

                EventType: 'New',   /**for the dropdown in the editor window template */

                Subject: "Consultation Session",    /**title for event */

                /**start time of event
                 * format is ('year' , 'month starting from Jan as 0' , 'day', '24hr time hour', '24hr time min') */
                StartTime: '2021-02-02T09:00:00',

                EndTime: 'Wed Feb 02 2021 09:45:00 GMT+0000 (Greenwich Mean Time)',  /**end time of event */

                Location: 'BTech last floor',   /**location of event */

                IsAllDay: false,

                CategoryColor: '#f57f17',

                // RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',

                // IsReadonly: true,  /**make event editable or not */

            },

            {
                Description: "conference meetings",
                EndTime: 'Wed Feb 10 2021 17:30:00 GMT+0000 (Greenwich Mean Time)',
                EndTimezone: null,
                FollowingID: null,
                Guid: "f92cbd9a-ec99-92b0-3a05-5e93289a9ec5",
                Id: 3,
                IsAllDay: false,
                Location: "yep",
                RecurrenceException: null,
                RecurrenceID: null,
                RecurrenceRule: "FREQ=DAILY;INTERVAL=1;UNTIL=20210211T160000Z;",
                StartTime: 'Wed Feb 10 2021 16:00:00 GMT+0000 (Greenwich Mean Time)',
                StartTimezone: null,
                Subject: "some action"
            }
            ]
        }
    }

    /**anything in here triggers before each of the event
     * getting rendered on the scheduler user interface */
    onEventRendered(args) {
        // alert("It will triggered before each of the event getting rendered on the scheduler user interface.");
    }


    /**anything in here triggers on beginning of every scheduler action */
    onActionBegin(args) {

        /**when an event is created */
        if (args.requestType === "eventCreate") {
            // alert("This will be triggered after a new event is rendered on the scheduler page");
            console.log('Added event: ', args.addedRecords)  /**retrieves the fields data of the newly created event */

            /**built-in methods by the scheduler component */
            // console.log('All events in the schedule :', this.scheduleObj.getEvents());  //Retrieves the entire collection of events bound to the Schedule.
            // console.log('All events in the current view :', this.scheduleObj.getCurrentViewEvents())   //Retrieves the events that lies on the current date range of the active view of Schedule.
            // console.log('Last id of event in the schedule :', this.scheduleObj.getEventMaxID())   //Get the maximum id of an event.
            // this.scheduleObj.refreshEvents() //Refreshes the event dataSource. This method may be useful when the events alone in the schedule needs to be re-rendered.
        }

        /**when an event is changed or edited */
        if (args.requestType === "eventChange") {
            // alert("This will be triggered after an event has been edited or updated.");
            console.log('Updated event: ', args.changedRecords)    /**retrieves the fields data of the updated event */
        }

        /**when an event is removed */
        if (args.requestType === "eventRemove") {
            // alert("This will triggered after an event has been deleted");
            console.log('Deleted event: ', args.deletedRecords)    /**retrieves the fields data of the deleted event */
        }
    }


    /**everything in here triggers on successful completion of the scheduler action */
    onActionComplete(args) {
        if (args.requestType === "dateNavigate") {
            // alert("This will triggered after click the next/prev button");
            // console.log(this.scheduleObj.getCurrentViewDates())  //Retrieves the dates that lies on active view of Schedule.

            /**retrieving the events after moving on to the next view page */
            // let currentViewDates: Date[] = this.scheduleObj.getCurrentViewDates() as Date[];
            // let startDate: Date = currentViewDates[4];
            // let endDate: Date = currentViewDates[7];
            // let filteredEvents: Object[] = this.scheduleObj.getEvents(startDate, endDate, true);
        }
    }



    render() {
        return (

            /**schedule component wrapper */
            <ScheduleComponent
                currentView="Month" /**default view to be displayed in the scheduler */
                width='100%' height='100vh' rowAutoHeight={true}
                eventSettings={{
                    dataSource: this.state.data,    /**fetch added events or schedules into the current view*/
                }}
                eventRendered={this.onEventRendered.bind(this)}
                actionBegin={this.onActionBegin.bind(this)}
                actionComplete={this.onActionComplete.bind(this)}
                ref={schedule => this.scheduleObj = schedule}   /**we assign a reference to the new instance we created so that we can access the data and methods of the scheduler component */
            >

                {/**views we want to display in the top right corner of schedule page
                 * delete all these to display default views */}
                <ViewsDirective>
                    <ViewDirective
                        option='Month'
                        showWeekNumber={false}
                        showWeekend={true}  /**add sat and sun to month view */
                    ></ViewDirective>
                </ViewsDirective>

                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>


        )
    }

}
export default Schedule;