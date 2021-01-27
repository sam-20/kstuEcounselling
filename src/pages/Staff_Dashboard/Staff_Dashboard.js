import React, { Component } from 'react';
import '../Staff_Dashboard/Staff_Dashboard.css'
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
import ScheduleComponent from './Dashboard_menu_items/Schedule/Schedule'
import ChatroomComponent from './Dashboard_menu_items/Chatroom/Chatroom'
import ForumComponent from './Dashboard_menu_items/Forum/Forum'

/**fontawesome icon imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTimes, faBars, faCalendar, faBook,
    faComment
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faTimes, faBars, faCalendar, faBook, faComment)

class Staff_Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {

            /**hamburger menu is hidden by default when page is viewed on desktop */
            mobileview_menu_opened: false,

            /**our default selected item in the drawer is schedule
             * the value changes when the user selects a different item in th drawer
             * and we give the selected drawer item css properties to make it active */
            selected_drawer_item: 'schedule'
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
                    <div className="pagesetup">

                        {/** column 1 of page setup...drawer menu */}
                        <div className="sidemenu_column">

                            {/**nav menu container */}
                            <nav className="navmenu_container">

                                {/**nav menu header */}
                                <div className="navmenu_header" >

                                    {/**header avatar */}
                                    <Wrap className="avatar_wrapper_container" >
                                        <WrapItem>
                                            <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                                        </WrapItem>
                                    </Wrap>

                                    {/**header title */}
                                    <Wrap>
                                        <WrapItem style={{ paddingLeft: 25 }}>
                                            <h1>Administrator</h1>
                                        </WrapItem>
                                    </Wrap>

                                    {/**drawer menu icon only visible when switched to mobile view*/}
                                    <div className="menu_icon" onClick={this.toggle_drawer}>
                                        <FontAwesomeIcon icon={this.state.mobileview_menu_opened ? faTimes : faBars} />{/**change menu icon when toggled */}
                                    </div>
                                </div>


                                {/**drawer items */}
                                <ul className={this.state.mobileview_menu_opened ? 'mobileview_drawer_list' : 'desktop_drawer_list'}>

                                    {/**schedule list item */}
                                    <li style={{ paddingTop: 20 }} onClick={() => {
                                        this.close_drawer()
                                        this.set_active_drawer_item('schedule')
                                    }}>
                                        <Link to="/staff/dashboard/schedule" style={{ textDecoration: 'none' }}>
                                            <HStack spacing="10px" className={this.state.selected_drawer_item === 'schedule' ? 'selected_drawer_item' : 'unselected_drawer_item'}>

                                                {/* <Icon fontSize='small' >star</Icon> */}
                                                <FontAwesomeIcon icon={faCalendar} size="sm" /> <p style={{ fontSize: 14 }}>Schedule</p>
                                            </HStack>
                                        </Link>
                                    </li>

                                    {/**forum list item */}
                                    <li style={{ paddingTop: 20 }} onClick={() => {
                                        this.close_drawer()
                                        this.set_active_drawer_item('forum')
                                    }}>
                                        <Link to="/staff/dashboard/forum" style={{ textDecoration: 'none' }}>
                                            <HStack spacing="10px" className={this.state.selected_drawer_item === 'forum' ? 'selected_drawer_item' : 'unselected_drawer_item'}>
                                                <FontAwesomeIcon icon={faBook} size="sm" /> <p style={{ fontSize: 14, paddingRight: 25 }}>Forum</p>
                                            </HStack>
                                        </Link>
                                    </li>

                                    {/**chatroom list item */}
                                    <li style={{ paddingTop: 20 }} onClick={() => {
                                        this.close_drawer()
                                        this.set_active_drawer_item('chatroom')
                                    }}>
                                        <Link to="/staff/dashboard/chatroom" style={{ textDecoration: 'none' }}>
                                            <HStack spacing="10px" className={this.state.selected_drawer_item === 'chatroom' ? 'selected_drawer_item' : 'unselected_drawer_item'}>
                                                <FontAwesomeIcon icon={faComment} size="sm" /> <p style={{ fontSize: 14 }}>Chatroom</p>
                                            </HStack>
                                        </Link>
                                    </li>

                                    {/**logout button would appear as part of the drawer items  when switched to mobile view*/}
                                    <li style={{ paddingTop: 20 }} className="logout_button_mobile_view" >
                                        <MUIButton fullWidth variant="contained" color="primary" >Logout</MUIButton>
                                    </li>

                                </ul>

                                {/**logout bottom here appears only in desktop view */}
                                <div className="logout_container_desktop_view">
                                    <MUIButton fullWidth variant="contained" color="primary" >Logout</MUIButton>
                                </div>

                            </nav>
                        </div>

                        {/**column 2 of page setup
                         * pages of the selected link from the drawer will show here */}
                        <div style={{ width: '100%' }}>
                            <Switch>
                                <Route exact path="/staff/dashboard/schedule" component={ScheduleComponent} />
                                <Route exact path="/staff/dashboard/forum" component={ForumComponent} />
                                <Route exact path="/staff/dashboard/chatroom" component={ChatroomComponent} />
                                <Route render={() => <ScheduleComponent />} /> {/**default page to open */}
                            </Switch>
                        </div>

                    </div>

                </ChakraProvider>
            </BrowserRouter >
        )
    }

}
export default Staff_Dashboard;