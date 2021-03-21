import React, { Component } from 'react';
import '../Schedule/Schedule.css'
import '../Schedule/react-scheduler.css'

import {
    ScheduleComponent, Inject, Week,
    WorkWeek, Month, Agenda, Day, EventSettingsModel,
    ViewDirective, ViewsDirective, EventRenderedArgs, ActionEventArgs
} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { L10n } from '@syncfusion/ej2-base'

/**chakra ui imports */
import {
    ChakraProvider,
    AlertDialog, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
    AlertDialogOverlay, Button as CUIButton, Spinner, Modal as CUIModal,
    ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react"

/**material ui imports */
import {
    Button as MUIButton, Typography,
    TextField, Backdrop, CircularProgress,
} from '@material-ui/core';
import {
    VisibilityOutlined, VisibilityOffOutlined,
    PersonOutlineOutlined, Error, Close, CalendarToday,
    Place, Assignment
} from '@material-ui/icons';

/**react bootstrap imports */
import {
    Button as RBButton, Container, Row, Col,
    Card, Modal,
    CardDeck,
} from 'react-bootstrap';

import { AsyncStorage } from 'AsyncStorage'
import modulevariables from '../../../Modulevariables';

/**customized editor window
 * changing the button texts
 * the editor window header text is hidden in the scheduler.css file
 */
L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Save',
            'cancelButton': 'Cancel',
            'newEvent': 'Create Appointment',
            'editEvent': 'Edit Appointment'
        }
    }
})


const server = modulevariables.applicationserver

class Schedule extends Component {

    constructor(props) {

        super(props)

        /**creating a new instance of the scheduler component allowing us to access the data in the scheduler
         * and the default methods that come with the scheduler component*/
        this.scheduleObj = ScheduleComponent;

        this.state = {

            /**this table collects the staff's events fetched from the db */
            staff_events_table: [],

            scheduler_event_raw_data: [],/**this stores the args records when an event is created, updated or deleted */

            display_confirm_new_appointment_dialog_box: false,
            display_update_appointment_details_dialog_box: false,

            display_backdrop: false,

            display_modal: false,
            modal_title: '',
            modal_content: '',

            display_modal2: false,

            scheduler_events_refreshing: true,/**we display a loader page in place of the calender when we're refreshing the calendar events data */


            present_event_quickinfo_popup: false,
        }
    }

    componentDidMount() {
        /**fetch the staff's id which we'd used to fetch his details
         *  whenever we refresh the page(benefit of the async storage) 
         * since the async fetch is asynchronous we wait for it to finish before we finally use the 
         * id to fetch the staff's schedule events*/
        this._asyncStore_fetch_staff_id()
            .then(response => {
                console.log('staff id has been fetched!')
                this.fetch_staff_schedule_events()
            })
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
            // console.log('Added event: ', args.addedRecords)  /**retrieves the fields data of the newly created event */

            this.setState({ scheduler_event_raw_data: args.addedRecords }, () => {
                this.show_confirmation_dialog_box_new_appointment()
            })

            /**built-in methods by the scheduler component */
            // console.log('All events in the schedule :', this.scheduleObj.getEvents());  //Retrieves the entire collection of events bound to the Schedule.
            // console.log('All events in the current view :', this.scheduleObj.getCurrentViewEvents())   //Retrieves the events that lies on the current date range of the active view of Schedule.
            // console.log('Last id of event in the schedule :', this.scheduleObj.getEventMaxID())   //Get the maximum id of an event.
            // this.scheduleObj.refreshEvents() //Refreshes the event dataSource. This method may be useful when the events alone in the schedule needs to be re-rendered.
        }

        /**when an event is changed or edited */
        if (args.requestType === "eventChange") {
            // alert("This will be triggered after an event has been edited or updated.");
            // console.log('Updated event: ', args.changedRecords)    /**retrieves the fields data of the updated event */  

            this.setState({ scheduler_event_raw_data: args.changedRecords }, () => {
                this.show_update_appointment_dialog_box()
            })

        }

        /**when an event is removed */
        if (args.requestType === "eventRemove") {
            // alert("This will triggered after an event has been deleted");
            // console.log('Deleted event: ', args.deletedRecords)    /**retrieves the fields data of the deleted event */

            this.show_backdrop()
            this.delete_event(args.deletedRecords)
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


    onCellDoubleClick() {
        // this.appendElement('SChedule <b>Cell Double Click</b> event called<hr>');
        // alert('cell double clicked!')
    }

    /**prevent user from opening the mini "create event" window since we
     * want them to provide*/
    onCellClick(args) {
        // this.appendElement('Schedule <b>Cell Click</b> event called<hr>');
        // alert('cell clicked!')
        args.cancel = true;

        // this.setState({ present_event_quickinfo_popup: false })
    }

    onEventClick(args) {
        // this.appendElement('Schedule <b>Event Click</b> event called<hr>');
        // alert('event clicked!')
        // args.Cancel = true;
        // if (args.type === 'Editor' || args.type === 'QuickInfo') {
        //     alert('edit event window has opened')
        // }

        this.setState({ present_event_quickinfo_popup: true })
    }

    onPopupOpen(args) {

        // if (args.type === 'Editor') {
        //     alert('editor window opened')
        // }

        // if (args.type === 'EventContainer') {
        //    alert('EventContainer window opened')
        // }

        // if (args.type === 'QuickInfo') {
        //     // alert('QuickInfo window opened')
        //     // this.setState({ present_event_quickinfo_popup: false })
        // }

        // open the editor window in single click
        // if (args.type === 'QuickInfo') {
        //     var dialogObj = args.element.ej2_instances[0];
        //     dialogObj.hide();
        //     var currentAction = args.target.classList.contains('e-work-cells') ? 'Add' : 'Save';
        //     this.scheduleObj.openEditor(args.data, currentAction);
        // }

        // if (args.type === 'RecurrenceAlert') {
        //     alert('RecurrenceAlert window opened')
        // }

        // if (args.type === 'DeleteAlert') {
        //     alert('DeleteAlert window opened')
        // }

        // if (args.type === 'ViewEventInfo') {
        //     alert('ViewEventInfo window opened')
        // }

        if (args.type === 'EditEventInfo') {
            alert('EditEventInfo window opened')
            this.setState({ present_event_quickinfo_popup: true })

        }

        // if (args.type === 'ValidationAlert') {
        //     alert('ValidationAlert window opened')
        // }

        // if (args.type === 'RecurrenceValidationAlert') {
        //     alert('RecurrenceValidationAlert window opened')
        // }
    }

    onPopupClose(args) {
        // alert('pop up closed')
        // this.setState({ present_event_quickinfo_popup: false })
    }


    onBeforeOpen(args) {
        // if (args.model.title == "Edit Repeat Appointment")
        //     args.cancel = true;
    }


    /**quick info popup design content */
    content(props) {

        if (this.state.present_event_quickinfo_popup === true) {
            // console.log('props: ', props)

            /**substr('number of characters to remove from the front' , 'character to end at after removing the characters in front') */
            // console.log(props.StartTime.toString().substr(4, 17))

            return (
                <div style={{ background: 'reds', display: 'block', width: '100%', margin: 0, color: 'gray' }}>

                    {/**date and time row */}
                    <div style={{ width: '100%', background: 'greens', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>

                        {/**calendar icon */}
                        <div style={{ width: '10%', background: 'yellows', display: 'flex', alignItems: 'center', }}>
                            {(props.StartTime !== null) ?
                                <CalendarToday fontSize='small' style={{ color: 'gray' }} />
                                :
                                <div style={{ margin: 0, padding: 0 }}>
                                </div>
                            }
                        </div>

                        {/* date and time */}
                        <div style={{ width: '90%', background: 'grays', paddingTop: 2 }}>
                            {(props.StartTime !== undefined) ?
                                <Typography style={{ fontSize: 12 }}>
                                    {(props.IsAllDay === false) ?
                                        <span>{props.StartTime.toString().substr(4, 17)} - {props.EndTime.toString().substr(16, 5)}</span>
                                        :
                                        <span>{props.StartTime.toString().substr(4, 11)} (All day)</span>
                                    }
                                </Typography>
                                :
                                <div style={{ margin: 0, padding: 0 }}></div>
                            }
                        </div>

                    </div>

                    {/* location row */}
                    <div style={{ width: '100%', background: 'greens', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>

                        {/* location icon */}
                        <div style={{ width: '10%', background: 'yellows', display: 'flex', alignItems: 'center', }}>
                            {(props.Location !== null) ?
                                <Place fontSize='small' style={{ color: 'gray' }} />
                                :
                                <div style={{ margin: 0, padding: 0 }}></div>
                            }
                        </div>

                        {/* location */}
                        <div style={{ width: '90%', background: 'grays', paddingTop: 2 }}>
                            {(props.Location !== undefined) ?
                                <Typography style={{ fontSize: 12 }}>
                                    <span> {props.Location}</span>
                                </Typography>
                                :
                                <div style={{ margin: 0, padding: 0 }}>
                                </div>
                            }
                        </div>
                    </div>

                    {/* description row */}
                    <div style={{ width: '100%', background: 'pinks', display: 'flex', paddingTop: 5, paddingBottom: 10 }}>

                        {/* description icon */}
                        <div style={{ width: '10%', background: 'oranges', display: 'flex', alignItems: 'center' }}>
                            {(props.Description !== null) ?
                                <Assignment fontSize='small' style={{ color: 'gray' }} />
                                :
                                <div style={{ margin: 0, padding: 0 }}>
                                </div>
                            }
                        </div>

                        {/* description  */}
                        <div style={{ width: '90%', background: 'dodgerblues', paddingTop: 2 }}>
                            {(props.Description !== undefined) ?
                                <Typography style={{ fontSize: 12 }}>
                                    <span>{props.Description}</span>
                                </Typography>
                                :
                                <div style={{ margin: 0, padding: 0 }}>
                                </div>
                            }
                        </div>
                    </div>

                    {/* book appointment button */}
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <CUIButton
                            isFullWidth={true}
                            onClick={() => {
                                alert('booked students!')
                            }}
                            isLoading={false}
                            loadingText="Logging in"
                            variant="solid"
                            size="sm"
                            style={{ background: '#3560B8', color: 'white' }}
                        >
                            View booked students
                </CUIButton>
                    </div>

                </div>

            )
        }
    }


    render() {

        /**this is only rendered when we're refreshing the calendar page */
        if (this.state.scheduler_events_refreshing === true) {
            return (
                <div className="events_refreshing_backdrop" >
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                    <Typography style={{ color: 'white', paddingLeft: 20 }}>Loading appointments ...</Typography>

                    {/**special modal for error fetching appointments by staff */}
                    <CUIModal
                        isOpen={this.state.display_modal2}
                        onClose={() => { this.close_modal2() }}
                        isCentered
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Error!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Error loading appointments. Please check your internet connection and then refresh the page
                                </ModalBody>

                            <ModalFooter>
                                <CUIButton colorScheme="blue" mr={3}
                                    onClick={() => { this.close_modal2() }}
                                >
                                    Close
                                    </CUIButton>
                            </ModalFooter>
                        </ModalContent>
                    </CUIModal>
                </div>
            )
        }


        else {
            return (

                <ChakraProvider>

                    <div>

                        {/* backdrop */}
                        {
                            this.state.display_backdrop ?
                                <div style={{
                                    width: '100%', height: '100%', position: 'fixed',
                                    zIndex: 100, left: 0, top: 0, background: 'rgb(0,0,0,0.5)',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    opacity: 0.5
                                }}>
                                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                                    <Typography style={{ color: 'white', paddingLeft: 20 }}>please wait ...</Typography>
                                </div>
                                :
                                null
                        }

                        {/**modal design */}
                        <CUIModal
                            isOpen={this.state.display_modal}
                            onClose={() => { this.close_modal() }}
                            isCentered
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader> {this.state.modal_title}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    {this.state.modal_content}
                                </ModalBody>

                                <ModalFooter>
                                    <CUIButton colorScheme="blue" mr={3} onClick={() => { this.close_modal() }}>Close</CUIButton>
                                </ModalFooter>
                            </ModalContent>
                        </CUIModal>

                        {/**schedule component wrapper */}
                        <ScheduleComponent
                            currentView="Month" /**default view to be displayed in the scheduler */
                            width='100%' height='100vh' rowAutoHeight={true}
                            eventSettings={{
                                dataSource: this.state.staff_events_table,    /**fetch added events or schedules into the current view*/
                            }}
                            eventRendered={this.onEventRendered.bind(this)}
                            actionBegin={this.onActionBegin.bind(this)}
                            actionComplete={this.onActionComplete.bind(this)}
                            ref={schedule => this.scheduleObj = schedule}   /**we assign a reference to the new instance we created so that we can access the data and methods of the scheduler component */

                            cellClick={this.onCellClick.bind(this)}
                            cellDoubleClick={this.onCellDoubleClick.bind(this)}
                            eventClick={this.onEventClick.bind(this)}
                            popupOpen={this.onPopupOpen.bind(this)}
                            popupClose={this.onPopupClose.bind(this)}
                            onBeforeOpen={this.onBeforeOpen.bind(this)}

                            quickInfoTemplates={this.state.present_event_quickinfo_popup ? {
                                // header: this.header.bind(this),
                                content: this.content.bind(this),
                                // footer: this.footer.bind(this)
                            } : {}}



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


                        {/* create new appointment confirmation dialog box */}
                        <AlertDialog
                            isOpen={this.state.display_confirm_new_appointment_dialog_box}
                            isCentered
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                        Confirm New Appointment
                                 </AlertDialogHeader>

                                    <AlertDialogBody>
                                        This will be made visible to students to allow them to book an appointment
                                </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <CUIButton colorScheme="green"
                                            onClick={() => {
                                                this.show_backdrop()
                                                this.hide_confirmation_dialog_box_new_appointment()
                                                this.save_event(this.state.scheduler_event_raw_data)
                                            }}
                                            ml={3}>
                                            Confirm
                                    </CUIButton>
                                        <CUIButton colorScheme="red"
                                            style={{ marginLeft: 10 }}
                                            onClick={() => {
                                                this.hide_confirmation_dialog_box_new_appointment()
                                                this.cancel_dialog_box()
                                            }}
                                        >
                                            Cancel
                                    </CUIButton>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>

                        {/* update appointment details dialog box */}
                        <AlertDialog
                            isOpen={this.state.display_update_appointment_details_dialog_box}
                            isCentered
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                        Update appointment
                                 </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Do you want to update the appointment details?
                                </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <CUIButton colorScheme="green"
                                            onClick={() => {
                                                this.show_backdrop()
                                                this.hide_update_appointment_details_dialog_box()
                                                this.update_event(this.state.scheduler_event_raw_data)
                                            }}
                                            ml={3}>
                                            Yes
                                    </CUIButton>
                                        <CUIButton colorScheme="red"
                                            style={{ marginLeft: 10 }}
                                            onClick={() => {
                                                this.hide_update_appointment_details_dialog_box()
                                                this.cancel_dialog_box()
                                            }}
                                        >
                                            No
                                    </CUIButton>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>

                    </div>

                </ChakraProvider >
            )

        }

    }


    _asyncStore_fetch_staff_id = async () => {
        try {
            modulevariables.global_staff_id = await AsyncStorage.getItem('stored_staff_id');
            console.log('staff id: ', modulevariables.global_staff_id)
        } catch (error) {
            // Error fetching data
            console.log("async storage error: ", error)
        }
    }

    /**save created event into db */
    save_event(event_details) {
        console.log('event details to be saved are :', event_details)

        if (event_details[0].Description === undefined) {
            event_details[0].Description = 'null'
        }
        if (event_details[0].IsAllDay === true) {
            event_details[0].IsAllDay = 'true'
        } else {
            event_details[0].IsAllDay = 'false'
        }

        // if (event_details[0].EndTime === undefined) {
        //     event_details[0].EndTime = ''
        // }
        if (event_details[0].EndTimezone === null) {
            event_details[0].EndTimezone = 'null'
        }

        if (!event_details[0].EndTimezone) {
            event_details[0].EndTimezone = 'null'
        }

        if (event_details[0].FollowingID === undefined) {
            event_details[0].FollowingID = 'null'
        }
        if (event_details[0].Guid === undefined) {
            event_details[0].Guid = 'null'
        }
        if (event_details[0].Location === undefined) {
            event_details[0].Location = 'null'
        }
        if (event_details[0].RecurrenceException === undefined) {
            event_details[0].RecurrenceException = 'null'
        }
        if (event_details[0].RecurrenceID === undefined) {
            event_details[0].RecurrenceID = 'null'
        }
        if (event_details[0].RecurrenceRule === null) {
            event_details[0].RecurrenceRule = 'null'
        }

        if (!event_details[0].RecurrenceRule) {
            event_details[0].RecurrenceRule = 'null'
        }

        // if (event_details[0].StartTime === undefined) {
        //     event_details[0].StartTime = ''
        // }
        if (event_details[0].StartTimezone === null) {
            event_details[0].StartTimezone = 'null'
        }

        if (!event_details[0].StartTimezone) {
            event_details[0].StartTimezone = 'null'
        }


        // if (event_details[0].Subject === 'Add title') {
        //     event_details[0].Subject = 'Add title'
        // }

        fetch(server + 'staff_save_event.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                staff_idDB: modulevariables.global_staff_id,    /**we have to add the id of the staff who's creating the event */
                event_idDB: event_details[0].Id,
                event_subjectDB: event_details[0].Subject,
                event_descriptionDB: event_details[0].Description,
                event_locationDB: event_details[0].Location,
                event_start_timeDB: event_details[0].StartTime,
                event_start_time_zoneDB: event_details[0].StartTimezone,
                event_end_timeDB: event_details[0].EndTime,
                event_end_time_zoneDB: event_details[0].EndTimezone,
                event_all_day_statusDB: event_details[0].IsAllDay,
                event_recurrence_idDB: event_details[0].RecurrenceID,
                event_recurrence_ruleDB: event_details[0].RecurrenceRule,
                event_recurrence_exceptionDB: event_details[0].RecurrenceException,
                event_guidDB: event_details[0].Guid,
                event_following_idDB: event_details[0].FollowingID
            })
        }).then((response) => response.text())
            .then((responseJson) => {
                // console.log(responseJson)

                var jsconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsconvertedrows)

                /**if event was successfully saved in the db */
                if (finaldata === '"event successfully saved!"') {
                    console.log('event has been saved in the db')

                    /**close confirmation box */
                    this.hide_confirmation_dialog_box_new_appointment()

                    /**close backdrop */
                    this.hide_backdrop()

                    /**refresh the schedule events data */
                    this.fetch_staff_schedule_events()
                }

                /**if event couldnt be saved in the db */
                else {
                    console.log('event couldnt be saved. Query failed!')

                    /**close confirmation box */
                    this.hide_confirmation_dialog_box_new_appointment()

                    /**close backdrop */
                    this.hide_backdrop()

                    this.show_modal('Error!', 'Could not create new appointment. Please try again')

                }
            }, err => {

                /**connection to server error */
                console.log('internet error: ', err)

                /**close confirmation box */
                this.hide_confirmation_dialog_box_new_appointment()

                /**hide backdrop */
                this.hide_backdrop()

                this.show_modal('Error!', 'Could not create new appointment. Check your internet connection')

            })
    }

    /**delete selected event from the db */
    delete_event(event_details) {
        console.log('event details to be deleted are: ', event_details)

        /**deleting event from db */
        fetch(server + 'delete_staff_event.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                event_idDB: event_details[0].Id,
                staff_idDB: modulevariables.global_staff_id  /**we add this because two different staff can 
                create separate events and they'd have the same event id
                so by deleting we specify the staff's id too to know which staff's event we're deleting */
            })
        }).then((response) => response.text())
            .then((responseJson) => {

                // console.log(responseJson)

                var jsconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsconvertedrows)

                /**if event was successfully deleted from the db */
                if (finaldata === '"event successully deleted!"') {
                    console.log('event has been deleted from db')

                    /**close backdrop */
                    this.hide_backdrop()

                    /**refresh the schedule events data */
                    this.fetch_staff_schedule_events()
                }

                /**if event couldnt be deleted from the db */
                else {
                    console.log('event couldnt be deleted. Query failed!')

                    /**close backdrop */
                    this.hide_backdrop()

                    this.show_modal('Error!', 'Could not delete appointment. Please try again')
                }

            }, err => {
                /**connection to server error */
                console.log('internet error: ', err)

                /**hide backdrop */
                this.hide_backdrop()

                this.show_modal('Error!', 'Could not delete appointment. Check your internet connection')
            })
    }

    /**update selected event in the db */
    update_event(event_details) {
        console.log('event details to be updated are: ', event_details)

        event_details[0].RecurrenceException = 'null'
        event_details[0].RecurrenceID = 'null'
        event_details[0].FollowingID = 'null'

        if ((event_details[0].RecurrenceException === null)) {
            event_details[0].RecurrenceException = 'null'
        }

        if ((event_details[0].RecurrenceID === null)) {
            event_details[0].RecurrenceID = 'null'
        }

        if ((event_details[0].FollowingID === null)) {
            event_details[0].FollowingID = 'null'
        }

        if (event_details[0].RecurrenceRule === null) {
            event_details[0].RecurrenceRule = 'null'
        }
        if (event_details[0].Description === undefined) {
            event_details[0].Description = 'null'
        }
        if (event_details[0].IsAllDay === true) {
            event_details[0].IsAllDay = 'true'
        } else {
            event_details[0].IsAllDay = 'false'
        }
        // if (event_details[0].EndTime === undefined) {
        //     event_details[0].EndTime = ''
        // }
        if (event_details[0].EndTimezone === null) {
            event_details[0].EndTimezone = 'null'
        }
        if (event_details[0].Guid === undefined) {
            event_details[0].Guid = 'null'
        }
        if (event_details[0].Location === undefined) {
            event_details[0].Location = 'null'
        }
        // if (event_details[0].StartTime === undefined) {
        //     event_details[0].StartTime = ''
        // }
        if (event_details[0].StartTimezone === null) {
            event_details[0].StartTimezone = 'null'
        }
        // if (event_details[0].Subject === 'Add title') {
        //     event_details[0].Subject = 'Add title'
        // }

        // setTimeout(() => {
        //     console.log('event details to be updated are: ', event_details)
        // }, 5000);


        fetch(server + 'update_staff_event.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                staff_idDB: modulevariables.global_staff_id,    /**we have to add the id of the staff who's updating the event because two diff
                staff can create separate events with the same event id so we use the staff id to differentiate between them*/
                event_idDB: event_details[0].Id,
                event_subjectDB: event_details[0].Subject,
                event_descriptionDB: event_details[0].Description,
                event_locationDB: event_details[0].Location,
                event_start_timeDB: event_details[0].StartTime,
                event_start_time_zoneDB: event_details[0].StartTimezone,
                event_end_timeDB: event_details[0].EndTime,
                event_end_time_zoneDB: event_details[0].EndTimezone,
                event_all_day_statusDB: event_details[0].IsAllDay,
                event_recurrence_idDB: event_details[0].RecurrenceID,
                event_recurrence_ruleDB: event_details[0].RecurrenceRule,
                event_recurrence_exceptionDB: event_details[0].RecurrenceException,
                event_guidDB: event_details[0].Guid,
                event_following_idDB: event_details[0].FollowingID
            })
        }).then((response) => response.text())
            .then((responseJson) => {

                // console.log(responseJson)

                var jsconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsconvertedrows)

                /**if event was successfully updated in the db */
                if (finaldata === '"event successfully updated!"') {
                    console.log('event has been updated in the db')

                    /**close confirmation box */
                    this.hide_update_appointment_details_dialog_box()

                    /**close backdrop */
                    this.hide_backdrop()

                    /**refresh the schedule events data */
                    this.fetch_staff_schedule_events()
                }

                /**if event couldnt be updated in the db */
                else {
                    console.log('event couldnt be updated. Query failed!')

                    /**close confirmation box */
                    this.hide_update_appointment_details_dialog_box()

                    /**close backdrop */
                    this.hide_backdrop()

                    this.show_modal('Error', 'Could not update appointment. Please try again')
                }

            }, err => {
                /**connection to server error */
                console.log('internet error: ', err)

                /**close confirmation box */
                this.hide_update_appointment_details_dialog_box()

                /**hide backdrop */
                this.hide_backdrop()

                this.show_modal('Error!', 'Could not update appointment. Check your internet connection')
            })
    }

    /**fetch staff's events */
    fetch_staff_schedule_events() {

        this.setState({ scheduler_events_refreshing: true })

        this.setState({ staff_events_table: [] })

        fetch(server + 'view_staff_schedule.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                staff_idDB: modulevariables.global_staff_id
            })
        }).then((response) => response.text())
            .then((responseJson) => {

                // console.log(responseJson)

                var jsconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsconvertedrows)

                /**if there are no events created by the staff */
                if (finaldata === '"no search results"') {
                    console.log('no event has been created by staff')

                    this.setState({ scheduler_events_refreshing: false })
                }

                /**if the events were fetched from the db*/
                else {

                    /**for each property we're going to change the value in a way that would
                     * be recognized by the scheduler when fetched into it
                     */
                    for (var count = 0; count < jsconvertedrows.length; count++) {

                        if (jsconvertedrows[count].EndTimezone === 'null') {
                            jsconvertedrows[count].EndTimezone = null;
                        }
                        if (jsconvertedrows[count].Description === 'null') {
                            jsconvertedrows[count].Description = null;
                        }
                        if (jsconvertedrows[count].FollowingID === 'null') {
                            jsconvertedrows[count].FollowingID = null;
                        }
                        if (jsconvertedrows[count].Guid === 'null') {
                            jsconvertedrows[count].Guid = null;
                        }
                        if (jsconvertedrows[count].Location === 'null') {
                            jsconvertedrows[count].Location = null;
                        }
                        if (jsconvertedrows[count].RecurrenceException === 'null') {
                            jsconvertedrows[count].RecurrenceException = null;
                        }
                        if (jsconvertedrows[count].RecurrenceID === 'null') {
                            jsconvertedrows[count].RecurrenceID = null;
                        }
                        if (jsconvertedrows[count].RecurrenceRule === 'null') {
                            jsconvertedrows[count].RecurrenceRule = null;
                        }
                        if (jsconvertedrows[count].StartTimezone === 'null') {
                            jsconvertedrows[count].StartTimezone = null;
                        }

                        if (jsconvertedrows[count].IsAllDay === 'true') {
                            jsconvertedrows[count].IsAllDay = true;
                        } else {
                            if (jsconvertedrows[count].IsAllDay === 'false') {
                                jsconvertedrows[count].IsAllDay = false;
                            }
                        }
                    }

                    /**adding new property to our object array */
                    // jsconvertedrows.map(element => {
                    //     element.category = "1,2,6"
                    // })

                    /**we can finally save the valid data required by the scheduler into the
                     * staff events table */
                    this.setState({ staff_events_table: [] }, () => {
                        this.setState({ staff_events_table: jsconvertedrows }, () => {
                            // console.log('staff events data: ', this.state.staff_events_table)
                            this.setState({ scheduler_events_refreshing: false })
                        })
                    })

                }

            }, err => {
                /**connection to server error */
                console.log('internet error: ', err)

                this.setState({ display_modal2: true })
            })
    }

    show_backdrop() {
        this.setState({ display_backdrop: true })
    }

    hide_backdrop() {
        this.setState({ display_backdrop: false })
    }

    show_confirmation_dialog_box_new_appointment() {
        this.setState({ display_confirm_new_appointment_dialog_box: true })
    }

    show_update_appointment_dialog_box() {
        this.setState({ display_update_appointment_details_dialog_box: true })
    }

    hide_confirmation_dialog_box_new_appointment() {
        this.setState({ display_confirm_new_appointment_dialog_box: false })
    }

    hide_update_appointment_details_dialog_box() {
        this.setState({ display_update_appointment_details_dialog_box: false })
    }

    show_modal(title, content) {
        this.setState({ modal_title: title }, () => {
            this.setState({ modal_content: content }, () => {
                this.setState({ display_modal: true })
            })
        })
    }

    close_modal() {
        this.setState({ display_modal: false }, () => {
            this.fetch_staff_schedule_events()/**refresh the schedule events data */
        })
    }

    close_modal2() {
        this.setState({ display_modal2: false }, () => {
            this.setState({ scheduler_events_refreshing: false })
        })
    }

    cancel_dialog_box() {
        this.fetch_staff_schedule_events();
    }

}
export default Schedule;