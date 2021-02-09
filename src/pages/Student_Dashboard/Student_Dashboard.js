import React, { Component } from 'react';
import '../Student_Dashboard/Student_Dashboard.css'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"

/**chakra ui imports */
import {
    ChakraProvider, Button as CUIButton,
    ButtonGroup, SimpleGrid, Box, Grid, GridItem, Wrap,
    WrapItem, Avatar, Input, Stack, HStack, VStack, flexbox
} from "@chakra-ui/react"
import { FaFacebook, FaTwitter } from "react-icons/fa"

/**material ui imports */
import {
    Button as MUIButton, List,
    ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import { PeopleIcon } from '@material-ui/icons'
import Icon from '@material-ui/core/Icon';

/**react bootstrap imports */
import {
    Button as RBButton, Container, Row, Col,
    Card,
    CardDeck
} from 'react-bootstrap';

/**dashboard menu items */
import BookingComponent from './Dashboard_menu_items/Booking/Booking'
import MessagesComponent from './Dashboard_menu_items/Messages/Messages'
import ChatroomComponent from './Dashboard_menu_items/Chatroom/Chatroom'

/**fontawesome icon imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTimes, faBars, faCalendar, faBook,
    faComment
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Booking from './Dashboard_menu_items/Booking/Booking';
library.add(faTimes, faBars, faCalendar, faBook, faComment)

class Student_Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {

            /**hamburger menu is hidden by default when page is viewed on desktop */
            mobileview_menu_opened: false,

            /**our default selected item in the drawer is booking
             * the value changes when the user selects a different item in th drawer
             * and we give the selected drawer item css properties to make it active */
            selected_drawer_item: 'booking'
        }

    }

    /**mobile view function to toggle the drawer */
    toggle_drawer = () => {
        this.setState({ mobileview_menu_opened: !this.state.mobileview_menu_opened })
    }

    /**after selecting any list item from the drawer in mobile view we want to automatically close the drawer */
    close_drawer() {
        this.setState({ mobileview_menu_opened: false })
    }

    /**set the selected drawer item to be active to differentiate it from other list items */
    set_active_drawer_item(drawer_item_name) {
        this.setState({ selected_drawer_item: drawer_item_name })
    }


    render() {
        return (
            <BrowserRouter>
                <ChakraProvider>

                    {/**page setup */}
                    <div className="pagesetups">

                        {/** column 1 of page setup...drawer menu */}
                        <div className="sidemenu_columns">

                            {/**nav menu container */}
                            <nav className="navmenu_containers">

                                {/**nav menu header */}
                                <div className="navmenu_headers" >

                                    {/**header avatar */}
                                    <Wrap className="avatar_wrapper_containers" >
                                        <WrapItem>
                                            <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                                        </WrapItem>
                                    </Wrap>

                                    {/**header title */}
                                    <Wrap>
                                        <WrapItem style={{ paddingLeft: 25 }}>
                                            <h1>Student</h1>
                                        </WrapItem>
                                    </Wrap>

                                    {/**drawer menu icon only visible when switched to mobile view*/}
                                    <div className="menu_icons" onClick={this.toggle_drawer}>
                                        <FontAwesomeIcon icon={this.state.mobileview_menu_opened ? faTimes : faBars} />{/**change menu icon when toggled */}
                                    </div>
                                </div>


                                {/**drawer items */}
                                <ul className={this.state.mobileview_menu_opened ? 'mobileview_drawer_lists' : 'desktop_drawer_lists'}>

                                    {/**booking list item */}
                                    <li style={{ paddingTop: 20 }} onClick={() => {
                                        this.close_drawer()
                                        this.set_active_drawer_item('booking')
                                    }}>
                                        <Link to="/student/dashboard/booking" style={{ textDecoration: 'none' }}>
                                            <HStack spacing="10px" className={this.state.selected_drawer_item === 'booking' ? 'selected_drawer_items' : 'unselected_drawer_items'}>

                                                {/* <Icon fontSize='small' >star</Icon> */}
                                                <FontAwesomeIcon icon={faCalendar} size="sm" /> <p style={{ fontSize: 14 }}>Booking</p>
                                            </HStack>
                                        </Link>
                                    </li>

                                    {/**messages list item */}
                                    <li style={{ paddingTop: 20 }} onClick={() => {
                                        this.close_drawer()
                                        this.set_active_drawer_item('messages')
                                    }}>
                                        <Link to="/student/dashboard/messages" style={{ textDecoration: 'none' }}>
                                            <HStack spacing="10px" className={this.state.selected_drawer_item === 'messages' ? 'selected_drawer_items' : 'unselected_drawer_items'}>
                                                <FontAwesomeIcon icon={faBook} size="sm" /> <p style={{ fontSize: 14 }}>Messages</p>
                                            </HStack>
                                        </Link>
                                    </li>

                                    {/**chatroom list item */}
                                    <li style={{ paddingTop: 20 }} onClick={() => {
                                        this.close_drawer()
                                        this.set_active_drawer_item('chatroom')
                                    }}>
                                        <Link to="/student/dashboard/chatroom" style={{ textDecoration: 'none' }}>
                                            <HStack spacing="10px" className={this.state.selected_drawer_item === 'chatroom' ? 'selected_drawer_items' : 'unselected_drawer_items'}>
                                                <FontAwesomeIcon icon={faComment} size="sm" /> <p style={{ fontSize: 14 }}>Chatroom</p>
                                            </HStack>
                                        </Link>
                                    </li>

                                    {/**logout button would appear as part of the drawer items  when switched to mobile view*/}
                                    <li style={{ paddingTop: 20 }} className="logout_button_mobile_views" >
                                        <MUIButton fullWidth variant="contained" color="primary" >Logout</MUIButton>
                                    </li>

                                </ul>

                                {/**logout bottom here appears only in desktop view */}
                                <div className="logout_container_desktop_views">
                                    <MUIButton fullWidth variant="contained" color="primary" >Logout</MUIButton>
                                </div>

                            </nav>
                        </div>

                        {/**column 2 of page setup
                         * pages of the selected link from the drawer will show here */}
                        <div style={{ width: '100%' }}>
                            <Switch>
                                <Route exact path="/student/dashboard/booking" component={BookingComponent} />
                                <Route exact path="/student/dashboard/messages" component={MessagesComponent} />
                                <Route exact path="/student/dashboard/chatroom" component={ChatroomComponent} />
                                <Route render={() => <BookingComponent />} /> {/**default page to open */}
                            </Switch>
                        </div>

                    </div>

                </ChakraProvider>
            </BrowserRouter >
        )
    }


}
export default Student_Dashboard;