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
import {
    TextField, Typography,
    List, ListItem, ListItemAvatar, Avatar,
    ListItemText, ListItemSecondaryAction, IconButton
} from '@material-ui/core';

import {
    VisibilityOutlined, VisibilityOffOutlined,
    PersonOutlineOutlined, Error, Close, CalendarToday,
    Place, Assignment, Check, Delete, Info
} from '@material-ui/icons';

/**react bootstrap imports */
import { Button as RBButton, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';

/**chakra ui imports */
import {
    useToast,    /**toast 1 */
    ChakraProvider, AlertDialog, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
    AlertDialogOverlay, Button as CUIButton, Spinner, Modal as CUIModal,
    ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton,
    ButtonGroup, Stack, SimpleGrid, Box, Grid, GridItem, VStack,
    List as CUIList, ListItem as CUIListItem, Collapse
} from "@chakra-ui/react"
import { MdBuild, MdCall } from "react-icons/md"
import { FaFacebook, FaTwitter } from "react-icons/fa"

import { AsyncStorage } from 'AsyncStorage'
import modulevariables from '../../../Modulevariables';

const server = modulevariables.applicationserver

/**customized editor window
 * changing the button texts
 * the editor window header text is hidden in the scheduler.css file
 */
L10n.load({
    'en-US': {
        'schedule': {
            // 'saveButton': 'Confirm',
            // 'cancelButton': 'Close',
            // 'newEvent': 'Book Appointment',
            // 'editEvent': 'Book Appointment'
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

            dropdown_text: 'Select Counsellor',

            available_staff_table: [],

            selected_staff_events_table: [],

            display_booking_confirmation_dialog_box: false,
            display_unbooking_confirmation_dialog_box: false,

            display_backdrop: false,

            event_details_to_be_booked: [], /**this will store the event details of the event the student has decided to book so that we pass the data in it into our function that books the student in the db */
            event_details_to_be_unbooked: [], /**this will store the event details of the event the studnet has decided to unbook so that we pass the data in it into our function that unbooks the student in the db */

            selected_staff_id: null, /**this will store the id of the staff who has been selected from the dropdown menu */

            display_modal: false,
            modal_title: '',
            modal_content: '',

            display_student_appointments_modal: false,

            my_appointment_list_item_collapse_info: false,/**this shows or collapses a list item for its more info in the my appoinments modal */

            student_appointments_table: [],/**appointments booked by the student */
            student_appointments_data_ready: false, /**we use this to render a loader whiles fetching the student's appoinments booked */
            student_has_zero_appointments: false, /**we use this to render a message indicating a student has no appointment if there is none in the db */
        }
    }


    componentDidMount() {
        /**fetch the students's id which we'd used to fetch his details
               *  whenever we refresh the page(benefit of the async storage) 
               * since the async fetch is asynchronous we wait for it to finish before we finally 
               * fetch the available staff's names from which he'd select one to load his schedule appointments
               * and choose which date to book*/
        this._asyncStore_fetch_student_id()
            .then(response => {
                console.log('student id has been fetched!')
                this.fetch_available_staff()
            })
    }

    /**when user selects an available booking slot event our customized window editor will
     * show up allowing them to provide their details and then finally book the slot
     */
    editorWindowTemplate() {
        return (
            <VStack
                spacing={5}
                align="stretch"
            // style={{ marginLeft: 20, marginRight: 20 }}
            >
                <TextField id="standard-basic" label="Full name" />

                <TextField id="standard-basic" label="Programme" />

                <TextField id="standard-basic" label="Year" />
            </VStack>
        )
    }

    /**disable the popup window when an event is clicked*/
    onPopupOpen(args) {
        // args.cancel = true;
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

    onEventClick(args) {
        // this.appendElement('Schedule <b>Event Click</b> event called<hr>');
        // alert('event clicked!')
        // args.cancel = true;
        // if (args.type === 'PopupType.Editor' || args.type === 'PopupType.QuickInfo') {
        //     // args.Cancel = true;
        //     console.log('what??')
        // }
        // alert('Book slot?')


        // this.scheduleObj.closeEditor(); 
    }

    onCellDoubleClick(args) {
        // this.appendElement('SChedule <b>Cell Double Click</b> event called<hr>');
        // alert('cell double clicked!')
        args.cancel = true
    }

    /**prevent user from opening the mini "create event" window since we
     * want them to provide*/
    onCellClick(args) {
        // this.appendElement('Schedule <b>Cell Click</b> event called<hr>');
        // alert('cell clicked!')
        args.cancel = true;
    }

    onQuickInfoClose = () => {
        this.scheduleObj.quickPopup.quickPopupClose();
    };

    /**only appears on the quick info that shows when trying to create a new event */
    footer() {
        return (
            <div>
                this is the footer section
            </div>
        )
    }

    /**quick info popup design header */
    header(props) {
        return (
            <div
                style={{
                    width: '100%', display: 'block',
                    background: '#3560B8', color: 'white',
                }}>

                {/**close icon */}
                <div
                    style={{
                        width: '100%', display: 'flex', background: 'reds',
                        justifyContent: 'flex-end', paddingRight: 10, paddingTop: 5
                    }}>
                    <Close fontSize='small' style={{ color: 'white' }} onClick={this.onQuickInfoClose.bind(this)} />
                </div>

                {/**event subject */}
                <div
                    style={{
                        width: '100%', display: 'flex', background: 'greens',
                        justifyContent: 'flex-start',
                        paddingLeft: 25, paddingBottom: 10
                    }}>
                    {(props.Subject !== undefined) ?
                        <Typography style={{ fontWeight: 'bold', fontSize: 15 }}>
                            <span>{props.Subject}</span>
                        </Typography>
                        :
                        ""
                    }
                </div>
            </div>
        )
    }

    /**quick info popup design content */
    content(props) {

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
                        onClick={() => { this.show_booking_confirmation_dialog_box(props) }}
                        isLoading={false}
                        loadingText="Logging in"
                        variant="solid"
                        size="sm"
                        style={{ background: '#3560B8', color: 'white' }}
                    >
                        Book Appointment
                </CUIButton>
                </div>

            </div>

        )
    }

    render() {

        /**toast 2 */
        const { toast } = this.props;

        return (

            <ChakraProvider>

                <div className="page-setup">

                    {/* backdrop */}
                    {
                        this.state.display_backdrop ?
                            <div style={{
                                width: '100%', height: '100%',
                                position: 'fixed',
                                left: 0, top: 0,
                                zIndex: 100,
                                background: 'rgb(0,0,0,0.5)',
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


                    {/* student appointments modal */}
                    <CUIModal
                        isOpen={this.state.display_student_appointments_modal}
                        onClose={() => { this.setState({ display_student_appointments_modal: false }) }}
                        isCentered
                    // size="sm"
                    >
                        <ModalOverlay />
                        <ModalContent
                            style={{
                                height: '75vh'
                            }}
                        >
                            <ModalHeader
                                style={{
                                    // textAlign: 'center',
                                    paddingLeft: 40
                                }}
                            >
                                My appointments</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody style={{ overflowY: 'scroll' }}>

                                {

                                    //finished fetching from the db
                                    this.state.student_appointments_data_ready ?
                                        <div>
                                            {

                                                //if the student had no appointment in the db
                                                this.state.student_has_zero_appointments ?
                                                    <div style={{
                                                        height: 300, display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        // background: 'red',
                                                        paddingLeft: 50, paddingRight: 50
                                                    }}>
                                                        <Typography style={{ color: 'black', alignSelf: 'flex-start' }}>
                                                            You have no appointments.
                                                        </Typography>

                                                        <Typography style={{ color: 'black', paddingTop: 30 }}>
                                                            Select a counsellor from the drop
                                                            down menu to book an appointment.
                                                        </Typography>
                                                    </div>
                                                    :

                                                    //if the student had appointmnents in the db
                                                    <List>
                                                        {/**list item */}

                                                        {
                                                            this.state.student_appointments_table.map((countB) => {
                                                                return (
                                                                    <ListItem key={countB.booked_event_row_id} >
                                                                        {/**event subject and counsellor name */}
                                                                        <ListItemText
                                                                            primary={countB.event_subject}
                                                                            secondary={
                                                                                <CUIList spacing={2}>
                                                                                    <CUIListItem >
                                                                                        <span style={{ fontWeight: 'bold' }}>by: </span>{countB.staff_full_name}
                                                                                    </CUIListItem>

                                                                                    {/* <Collapse in={countB.collapse}> */}
                                                                                    <CUIListItem>
                                                                                        <span style={{ fontWeight: 'bold' }}>Date: </span>{countB.event_date_and_time}
                                                                                    </CUIListItem>
                                                                                    <CUIListItem style={{ paddingTop: 5 }}>
                                                                                        <span style={{ fontWeight: 'bold' }}>Loaction: </span>{countB.event_location}
                                                                                    </CUIListItem>
                                                                                    <CUIListItem style={{ paddingTop: 5 }}>
                                                                                        <span style={{ fontWeight: 'bold' }}>Description: </span>{countB.event_description}
                                                                                    </CUIListItem>
                                                                                    {/* </Collapse> */}
                                                                                </CUIList>
                                                                            }
                                                                        />
                                                                        {/**right end buttons */}
                                                                        <ListItemSecondaryAction>

                                                                            {/**more info button */}
                                                                            {/* <IconButton edge="end" aria-label="delete"
                                                                                onClick={() => { this.collapse_or_uncollapse_list_item(countB) }}
                                                                            >
                                                                                <Info fontSize='small' />
                                                                            </IconButton> */}

                                                                            {/**unbook icon */}
                                                                            <IconButton edge="end" aria-label="delete" onClick={() => { this.show_unbooking_confirmation_dialog_box(countB) }}>
                                                                                <Delete fontSize='small' />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                )
                                                            })
                                                        }


                                                    </List>
                                            }
                                        </div>


                                        :

                                        // loading spinner...
                                        <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                                            <Typography style={{ color: 'black', paddingLeft: 20 }}>loading appointments ...</Typography>
                                        </div>
                                }


                            </ModalBody>

                        </ModalContent>
                    </CUIModal>


                    {/**counsellor selection row */}
                    <div className="counsellor-section-row">

                        {/* select counsellor dropdown menu  */}
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={this.state.dropdown_text}
                            style={{
                                paddingLeft: 10
                            }}
                            size="sm"
                        >
                            {
                                this.state.available_staff_table.map((countA) => {
                                    return (
                                        <Dropdown.Item
                                            key={countA.staff_id}
                                            onClick={() => { this.change_staff(countA) }}
                                        >
                                            {countA.staff_full_name}
                                        </Dropdown.Item>
                                    )
                                })
                            }

                        </DropdownButton>

                        {/* my appointmnents button */}
                        <RBButton
                            variant="primary"
                            size="sm"
                            onClick={() => {
                                this.view_student_appointments()
                            }}
                            style={{
                                marginLeft: 20
                            }}
                        >
                            My appointments
                        </RBButton>

                    </div>

                    {/**scheduler row */}
                    <div className="scheduler-component-row">

                        <ScheduleComponent
                            currentView="Month" /**Month/Week/WorkWeek/Day */
                            width='100%' height='100%' rowAutoHeight={true}
                            eventSettings={{ dataSource: this.state.selected_staff_events_table }} /**fetch added events or schedules into the current view*/
                            editorTemplate={this.editorWindowTemplate.bind(this)}
                            ref={schedule => this.scheduleObj = schedule}   /**we assign a reference to the new instance we created so that we can access the data and methods of the scheduler component */
                            actionBegin={this.onActionBegin.bind(this)}
                            eventClick={this.onEventClick.bind(this)}
                            popupOpen={this.onPopupOpen.bind(this)}
                            cellClick={this.onCellClick.bind(this)}
                            cellDoubleClick={this.onCellDoubleClick.bind(this)}

                            quickInfoTemplates={{
                                // header: this.header.bind(this),
                                content: this.content.bind(this),
                                // footer: this.footer.bind(this)
                            }}
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

                    </div>


                    {/* booking confirmation dialog box */}
                    <AlertDialog
                        isOpen={this.state.display_booking_confirmation_dialog_box}
                        isCentered
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    Book appointment
                                 </AlertDialogHeader>

                                <AlertDialogBody>
                                    Do you want to place a booking for this event?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <CUIButton colorScheme="green"
                                        onClick={() => {
                                            this.setState({ display_booking_confirmation_dialog_box: false })
                                            this.show_backdrop()

                                            /**toast 4 
                                             * pass the toast as an arg into the function where it might be called*/
                                            this.book_event(this.state.event_details_to_be_booked, toast)

                                        }}
                                        ml={3}>
                                        Yes
                                    </CUIButton>
                                    <CUIButton colorScheme="red"
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                            this.setState({ display_booking_confirmation_dialog_box: false })
                                        }}
                                    >
                                        No
                                    </CUIButton>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>

                    {/**unbooking confirmation box */}
                    <AlertDialog
                        isOpen={this.state.display_unbooking_confirmation_dialog_box}
                        isCentered
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    Unbook appointment
                                 </AlertDialogHeader>

                                <AlertDialogBody>
                                    Do you want to delete this booked appointment?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <CUIButton colorScheme="green"
                                        onClick={() => {
                                            this.setState({ display_unbooking_confirmation_dialog_box: false })

                                            this.setState({ display_student_appointments_modal: false }) /**we hide the modal else
                                            the please wait backdrop loader wouldnt be seen since the 
                                            student_appointments_modal also provides its own backdrop  */

                                            this.show_backdrop()

                                            /**toast 4 
                                             * pass the toast as an arg into the function where it might be called*/
                                            this.unbook_event(this.state.event_details_to_be_unbooked, toast)

                                        }}
                                        ml={3}>
                                        Yes
                                    </CUIButton>
                                    <CUIButton colorScheme="red"
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                            this.setState({ display_unbooking_confirmation_dialog_box: false })
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


    _asyncStore_fetch_student_id = async () => {
        try {
            modulevariables.global_student_id = await AsyncStorage.getItem('stored_student_id');
            console.log('student id: ', modulevariables.global_student_id)
        } catch (error) {
            // Error fetching data
            console.log("async storage error: ", error)
        }
    }


    /**we fetch the names and ids of the staff or counsellors so that the student can select
     * one to book an appointment from the staff's schedule events */
    fetch_available_staff() {
        fetch(server + 'fetch_available_staff.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                //we need nothing 
            })
        }).then((response) => response.text())
            .then((responseJson) => {

                // console.log(responseJson)

                var jsconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsconvertedrows)

                /**if there are no staff in the database */
                if (finaldata === '"no search results"') {
                    console.log('there are no staff in the database')
                }

                /**if there are staff in the database */
                else {
                    this.setState({ available_staff_table: [] }, () => {
                        this.setState({ available_staff_table: jsconvertedrows }, () => {
                            console.log('available staff: ', this.state.available_staff_table)
                        })
                    })
                }

            }, err => {
                /**connection to server error */
                console.log('internet error: ', err)
                this.show_modal('Error!', 'Could not fetch staff counsellors. Check your internet connection')
            })
    }

    /**when a student selects a staff from the dropdown menu */
    change_staff(staff_details) {
        this.setState({ dropdown_text: staff_details.staff_full_name })

        // console.log('selected staff details: ', staff_details)
        this.setState({ selected_staff_id: staff_details.staff_id }, () => {

            /**now we fetch that particular staff's schedule events */
            this.fetch_selected_staff_schedule_events(staff_details)
        })
    }

    fetch_selected_staff_schedule_events(staff_details) {
        fetch(server + 'view_staff_schedule.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                staff_idDB: staff_details.staff_id
            })
        }).then((response) => response.text())
            .then((responseJson) => {

                // console.log(responseJson)

                var jsconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsconvertedrows)

                /**if there are no events created by the staff */
                if (finaldata === '"no search results"') {
                    console.log('no event has been created by staff')

                    /**clear the table of the previous staff memebers' schedule events */
                    this.setState({ selected_staff_events_table: [] })
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
                    jsconvertedrows.map(element => {
                        element.IsReadonly = true
                    })

                    /**we can finally save the valid data required by the scheduler into the
                     * staff events table */
                    this.setState({ selected_staff_events_table: jsconvertedrows })
                    console.log('selected staff events table: ', this.state.selected_staff_events_table)

                }

            }, err => {
                /**connection to server error */
                console.log('internet error: ', err)
            })
    }

    show_booking_confirmation_dialog_box(event_details) {
        // console.log('event details to be booked to are: ', event_details)
        // console.log('event to be be booked id: ', event_details.Id)

        /**save the event details into our temporary table before opening our confirmation box */
        this.setState({ event_details_to_be_booked: event_details }, () => {
            this.setState({ display_booking_confirmation_dialog_box: true })
        })

    }

    show_backdrop() {
        this.setState({ display_backdrop: true })
    }

    hide_backdrop() {
        this.setState({ display_backdrop: false })
    }

    book_event(event_details, toast) {

        console.log('database row_id of event to be booked: ', event_details.row_id)
        console.log('student_id: ', modulevariables.global_student_id)
        console.log('staff id of event: ', this.state.selected_staff_id)
        // console.log('event details to be booked into the db: ', event_details)

        /**before we book the student for the event they have selected
         * we want to avoid duplicates hencewe first check in the db if the student has
         * already booked to the particular event and then
         * display a notification if the student has already booked that event
         * or save the booking details in the db if the student hasnt booked the event*/

        fetch(server + 'check_if_student_has_already_booked.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                booked_event_row_idDB: event_details.row_id,
                student_idDB: modulevariables.global_student_id
            })
        }).then((response) => response.text())
            .then((responseJson) => {

                // console.log(responseJson)

                var jsonconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsonconvertedrows)

                /**if student hasnt booked the event already */
                if (finaldata === '"no search results"') {
                    console.log('student hasnt booked the event so event can be booked')

                    /**booking the student for the event they have selected into the db*/
                    fetch(server + 'book_event.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'text/plain',
                            'Content-Type': 'text/plain'
                        },
                        body: JSON.stringify({
                            event_row_idDB: event_details.row_id,   /**we used the row id to differentitate events because every new lecturer's first event created has an event id of 1 so we use the row_id instead */
                            student_idDB: modulevariables.global_student_id,
                            staff_idDB: this.state.selected_staff_id
                        })
                    }).then((response) => response.text())
                        .then((responseJson) => {

                            // console.log(responseJson)

                            var jsonconvertedrows = JSON.parse(responseJson)
                            var finaldata = JSON.stringify(jsonconvertedrows)

                            /**if the event was successfully booked in the db */
                            if (finaldata === '"event successfully booked!"') {
                                console.log('event has been succesfully booked in the db')

                                this.hide_backdrop()    /**hide backdrop */

                                this.show_toast(toast, 'Success!', 'Appointment has been booked')   /**display success toast */

                            }

                            else {
                                console.log('event couldnt be booked.Query failed!')
                                this.hide_backdrop()    /**hide backdrop */
                                this.show_modal('Error!', 'Could not place booking for the appointment. Please try again')
                            }

                        }, err => {
                            /**connection to server error */
                            console.log('internet errror: ', err)

                            this.hide_backdrop()    /**hide backdrop */
                            this.show_modal('Error!', 'Could not place booking for the appointment. Check your internet connection')
                        })
                }

                /**if student has already booked for the appointment */
                else {
                    console.log('Student has booked the event already!')
                    this.hide_backdrop()    /**hide backdrop */
                    this.show_modal('Error!', 'You have already booked for this appointment')
                }

            }, err => {
                /**connection to server error */
                console.log('internet errror: ', err)

                this.hide_backdrop()    /**hide backdrop */
                this.show_modal('Error!', 'Could not place booking for the appointment. Check your internet connection')
            })
    }

    unbook_event(event_details, toast) {

        // console.log('event details to be unbooked: ',event_details)
        // console.log('database row_id of event to be unbooked: ', event_details.booked_event_row_id)
        // console.log('student id :', modulevariables.global_student_id)

        console.log('db table(booked_appointments) id: ', event_details.id)

        /**unbooking the student for the event they have selected */
        fetch(server + 'delete_booked_appointment.php', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                booked_appointments_db_table_row_idDB: event_details.id
            })
        }).then((response) => response.text())
            .then((responseJson) => {

                // console.log(responseJson)

                var jsonconvertedrows = JSON.parse(responseJson)
                var finaldata = JSON.stringify(jsonconvertedrows)

                /**if the appointment was successfully deleted from the db */
                if (finaldata === '"appointment successully deleted!"') {
                    console.log('appointment has been succesffuly deleted from the db')

                    this.hide_backdrop() /**hide backdrop */

                    this.show_toast(toast, 'Success', 'Appointment has been deleted')

                    /**open the student appointment modal again */
                    this.view_student_appointments()
                }

                else {
                    console.log('appointment could be deleted.Query failed')
                    this.hide_backdrop()
                    this.show_modal('Error!', 'Could not delete the appointment. Please try again')
                }

            }, err => {
                /**connection to server error */
                console.log('internet errror: ', err)

                this.hide_backdrop()    /**hide backdrop */
                this.show_modal('Error!', 'Could not place booking for the appointment. Check your internet connection')
            })
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
        })
    }

    /**toast 5 */
    show_toast(toast, title, content) {
        toast({
            duration: 5000, /**use null to make it not disappear */
            isClosable: true,
            position: "top",
            render: () => (

                /**toast shadow */
                <div className="shadow-lg rounded">
                    <Box color='white' style={{ background: '#59DB00', borderRadius: 5 }}>
                        <div style={{ width: '100%', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>

                            {/**success icon */}
                            <div style={{ width: '10%', background: 'yellows', display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
                                <Check fontSize='small' />
                            </div>

                            {/**toast message */}
                            <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingLeft: 10 }}>
                                <Typography>{title}</Typography>
                                <Typography style={{ fontSize: 12 }}>{content}</Typography>
                            </div>

                            {/**close icon */}
                            <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                                <Close fontSize='small' onClick={() => { toast.closeAll() }} />
                            </div>
                        </div>
                    </Box>
                </div>
            )
        })
    }

    view_student_appointments() {
        this.setState({ display_student_appointments_modal: true }, () => {

            this.setState({ student_appointments_data_ready: false })
            this.setState({ student_has_zero_appointments: false })

            /** we fetch the student's appointments from the db */
            this.setState({ student_appointments_table: [] }, () => {
                fetch(server + 'view_student_appointments.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'text/plain'
                    },
                    body: JSON.stringify({
                        student_idDB: modulevariables.global_student_id
                    })
                }).then((response) => response.text())
                    .then((responseJson) => {

                        // console.log(responseJson)

                        var jsonconvertedrows = JSON.parse(responseJson)
                        var finaldata = JSON.stringify(jsonconvertedrows)

                        /**if there are no appointments booked by the student in the db */
                        if (finaldata === '"no search results"') {
                            console.log('you havent booked any appointments in the database')

                            this.setState({ student_appointments_data_ready: true })   /**this hides the loader */

                            /**show our render message to indicate there are no appoinments */
                            this.setState({ student_has_zero_appointments: true })
                        }

                        /**if student has appointments */
                        else {

                            console.log('student has appointments')

                            /**modify jsonconverted rows for view in the modal */
                            //1. we add a 'collapse' property to each row to differentiate which list item to collapse or not when the
                            //list item's more info is clicked
                            jsonconvertedrows.map(element => {
                                element.collapse = false
                            })


                            /**2. we change the value for where the location or description was not provided */
                            for (var count = 0; count < jsonconvertedrows.length; count++) {
                                if (jsonconvertedrows[count].event_location === 'null') {
                                    jsonconvertedrows[count].event_location = 'Not specified'
                                }
                                if (jsonconvertedrows[count].event_description === 'null') {
                                    jsonconvertedrows[count].event_description = 'Not specified'
                                }
                            }

                            /**3. we create a new property that stores the date and time all in one */
                            jsonconvertedrows.map(element => {
                                element.event_date_and_time = ''
                            })

                            /**4.we find out which events are all day or time specified and format them before
                             * assigning to our event_date_and_time property
                             */
                            for (var count = 0; count < jsonconvertedrows.length; count++) {

                                /**if the event is all day */
                                if (jsonconvertedrows[count].event_all_day_status === 'true') {
                                    /**substr('number of characters to remove from the front' , 'character to end at after removing the characters in front') */
                                    jsonconvertedrows[count].event_date_and_time = jsonconvertedrows[count].event_start_time.toString().substr(0, 10) + ' (All day)'
                                }

                                else {
                                    /**if the event is time specified */
                                    /**substr('number of characters to remove from the front' , 'character to end at after removing the characters in front') */
                                    jsonconvertedrows[count].event_date_and_time = jsonconvertedrows[count].event_start_time.toString().substr(0, 10) + ' ' + '(' + jsonconvertedrows[count].event_start_time.toString().substr(11, 5) + ' - ' + jsonconvertedrows[count].event_end_time.toString().substr(11, 5) + ')'
                                }
                            }


                            this.setState({ student_appointments_table: jsonconvertedrows }, () => {
                                console.log('student appointments: ', this.state.student_appointments_table)
                                this.setState({ student_appointments_data_ready: true })   /**we can finally hide the loader */
                                this.setState({ student_has_zero_appointments: false })
                            })
                        }

                    }, err => {
                        /**connection to server error */
                        console.log('internet error: ', err)
                        this.show_modal('Error!', 'Could not fetch appointments. Check your internet connection')
                    })
            })
        })
    }


    /**collpase or uncollapse a list item in the 'my appointments' modal */
    collapse_or_uncollapse_list_item(count) {
        // console.log(count)

        count.collapse = !count.collapse

        let temp_array = [...this.state.student_appointments_table];
        temp_array[count] = { ...temp_array[count], collapse: !count.collapse }
        this.setState({ temp_array })
    }


    show_unbooking_confirmation_dialog_box(appointment_details) {
        // console.log('appointment to be unbooked details: ', appointment_details)

        /**save the event details into our temporary table before opening our confirmation box */
        this.setState({ event_details_to_be_unbooked: appointment_details }, () => {
            this.setState({ display_unbooking_confirmation_dialog_box: true })
        })
    }

}
// export default Booking;

export default function (props) {
    const toast = useToast();   /**toast 3 */
    return <Booking {...props} toast={toast} />
}