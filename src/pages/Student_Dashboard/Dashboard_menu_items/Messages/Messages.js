import React, { Component } from 'react';
import './Messages.css'

/**chakra ui imports */
import {
    ChakraProvider, Button as CUIButton,
    ButtonGroup, Stack, SimpleGrid, Box, Grid, GridItem,

} from "@chakra-ui/react"
import { MdBuild, MdCall, MdCheckCircle, MdSettings } from "react-icons/md"
import { FaFacebook, FaTwitter } from "react-icons/fa"

/**material ui imports */
import {
    Button as MUIButton, TextField, List, ListItem,
    FormControl, InputLabel, OutlinedInput,
    InputAdornment, IconButton, ListItemIcon, Checkbox, ListItemText,
    ListItemSecondaryAction, Divider, Typography
} from '@material-ui/core';
import { Visibility, VisibilityOff, Search, Delete, Reply } from '@material-ui/icons'

/**react bootstrap imports */
import {
    Button as RBButton, Container, Row, Col,
    Dropdown, DropdownButton, Table
} from 'react-bootstrap';

class Messages extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ChakraProvider>

                <Container fluid style={{ background: 'transparent', height: '100vh' }}>

                    {/**row 1 of container containing the search box */}
                    <Row style={{ background: 'transparent' }}>
                        {/**search box takes half of the screen on desktops and full on mobile */}
                        <Col xl={6}>
                            <FormControl variant="outlined" style={{ width: '100%', paddingTop: 15, paddingBottom: 10 }}>
                                <OutlinedInput
                                    style={{ height: 40 }}
                                    placeholder="Search"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end">
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Col>
                        <Col xl={6}></Col>
                    </Row>


                    {/**row 2 of container containing messages using the list component*/}
                    <Row>

                        <Col style={{ paddingRight: 0 }}>

                            {/**filter messages dropdown menu */}
                            <DropdownButton id="dropdown-basic-button" title="All messages" style={{ paddingBottom: 10 }}>
                                <Dropdown.Item href="#">All</Dropdown.Item>
                                <Dropdown.Item href="#">Inbox</Dropdown.Item>
                                <Dropdown.Item href="#">Sent</Dropdown.Item>
                            </DropdownButton>

                            {/**list of messages */}
                            <List
                                style={{ background: 'reds', marginLeft: -10, marginRight: 0, height: '83vh', overflowY: 'scroll' }}
                            >

                                {/**message item */}
                                <ListItem style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 15 }} className="list_items_student">

                                    {/**checkbox */}
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            disableRipple={false} />
                                    </ListItemIcon>

                                    {/**sender name */}
                                    <ListItemText className="sender_name_student">
                                        <Typography noWrap={true} style={{ fontSize: 14 }}>
                                            Jane Doe
                                    </Typography>
                                    </ListItemText>

                                    {/**message */}
                                    <ListItemText className="message_student">
                                        <Typography noWrap={true} style={{ fontSize: 14 }}>
                                            Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.
                                    </Typography>
                                    </ListItemText>

                                    {/**message time stamp */}
                                    <ListItemText className="message_time_stamp_student">
                                        <Typography noWrap={true} style={{ fontSize: 12 }}>
                                            8:30pm
                                    </Typography>
                                    </ListItemText>

                                    {/**edit and delete buttons */}
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <Reply style={{ color: 'green' }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments">
                                            <Delete style={{ color: 'red' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {/* <Divider style={{ marginLeft: 10, marginRight: 10, background: 'black' }} /> */}



                            </List>

                        </Col>
                    </Row>

                </Container>

            </ChakraProvider >
        )
    }

}
export default Messages;