import React, { Component } from 'react';
import '../Booking/Booking.css'
import '../Booking/scheduler.css'

import {
    ScheduleComponent, Inject, Week,
    WorkWeek, Month, Agenda, Day, EventSettingsModel,
    ViewDirective, ViewsDirective, EventRenderedArgs, ActionEventArgs
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { L10n } from '@syncfusion/ej2-base';


/**material ui imports */
import { TextField } from '@material-ui/core';

/**react bootstrap imports */
import { Button as RBButton, Container, Row, Col } from 'react-bootstrap';

/**chakra ui imports */
import {
    ChakraProvider, Button as CUIButton,
    ButtonGroup, Stack, SimpleGrid, Box, Grid, GridItem, VStack
} from "@chakra-ui/react"
import { MdBuild, MdCall } from "react-icons/md"
import { FaFacebook, FaTwitter } from "react-icons/fa"

/**customized editor window
 * changing the button texts
 * the editor window header text is hidden in the scheduler.css file
 */
L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Confirm',
            'cancelButton': 'Close',
            'newEvent': 'Book Appointment',
            'editEvent': 'Book Appointment'
        }
    }
})

class Booking extends Component {

    constructor(props) {
        super(props)

        /**creating a new instance of the scheduler component allowing us to access the data in the scheduler
         * and the default methods that come with the scheduler component*/
        this.scheduleObj = ScheduleComponent;

        this.state = {
            data: [{
                Id: 1,
                Subject: "Consultation Session",
                StartTime: '2021-02-02T09:00:00',
                EndTime: 'Wed Feb 02 2021 09:45:00 GMT+0000 (Greenwich Mean Time)',
                Location: 'BTech last floor',
                IsAllDay: false,
                IsReadonly: false
            }]
        }
    }

    /**when user selects an available booking slot event our customized window editor will
     * show up allowing them to provide their details and then finally book the slot
     */
    editorWindowTemplate() {
        return (
            <VStack
                spacing={5}
                align="stretch"
                style={{ marginLeft: 20, marginRight: 20 }}
            >
                <TextField id="standard-basic" label="Full name" />

                <TextField id="standard-basic" label="Programme" />

                <TextField id="standard-basic" label="Year" />
            </VStack>
        )
    }

    /**disable the popup window when an event is clicked*/
    onPopupOpen(args) {
        args.cancel = true;
    }

    onActionBegin(args) {

        /**if student wants to create a new event then we prevent it
         * the student is only allowed to open the available booking slots and book an appointment 
         */
        if (args.requestType === 'eventCreate') {
            args.cancel = true;
            alert('Access Denied')
        }

        /**a student is not allowed or permitted to remove a booking event created by the staff */
        if (args.requestType === 'eventRemove') {
            args.cancel = true
            alert('Acess Denied!')
        }

        /**if the student opens an available appointmnet slot and proceeds to book an appointment
         * the following is triggered
         */
        if (args.requestType === 'eventChange') {
            alert('Appointment has been booked')
        }
    }

    render() {
        return (

            <ScheduleComponent
                currentView="Month" /**Month/Week/WorkWeek/Day */
                width='100%' height='100vh' rowAutoHeight={true}
                eventSettings={{ dataSource: this.state.data }} /**fetch added events or schedules into the current view*/
                editorTemplate={this.editorWindowTemplate.bind(this)}
                ref={schedule => this.scheduleObj = schedule}   /**we assign a reference to the new instance we created so that we can access the data and methods of the scheduler component */
                actionBegin={this.onActionBegin.bind(this)}
            // popupOpen={this.onPopupOpen.bind(this)}
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
export default Booking;