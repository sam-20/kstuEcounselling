import React, { Component } from 'react';
import '../Forum/Forum.css'

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
    Dropdown, DropdownButton
} from 'react-bootstrap';

class Forum extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <ChakraProvider>

                <Container fluid style={{ background: 'white', height: '100vh' }}>

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


                    {/**row 2 of container containing list of messages */}
                    <Row>

                        <Col>

                            {/**filter messages dropdown menu */}
                            <DropdownButton id="dropdown-basic-button" title="All messages" style={{ paddingBottom: 10 }}>
                                <Dropdown.Item href="#">All</Dropdown.Item>
                                <Dropdown.Item href="#">Unread</Dropdown.Item>
                                <Dropdown.Item href="#">Read</Dropdown.Item>
                            </DropdownButton>

                            {/**list of messages */}
                            <List style={{ background: 'reds', marginLeft: -5 }}>

                                <ListItem style={{ paddingTop: 0, paddingBottom: 0 }} className="list_items">
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            disableRipple={false}
                                        />
                                    </ListItemIcon>

                                    <ListItemText style={{ width: 200, paddingRight: 40, marginLeft: -30 }}>
                                        <Typography noWrap={true} style={{ fontSize: 14 }}>
                                            Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.
                                        </Typography>
                                    </ListItemText>

                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <Reply style={{ color: 'green' }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments">
                                            <Delete style={{ color: 'red' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {/* <Divider style={{ marginLeft: 10, marginRight: 10 }} /> */}

                                <ListItem style={{ paddingTop: 0, paddingBottom: 0 }} className="list_items">
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            disableRipple={false}
                                        />
                                    </ListItemIcon>

                                    <ListItemText style={{ width: 200, paddingRight: 40, marginLeft: -30 }}>
                                        <Typography noWrap={true} style={{ fontSize: 14 }}>
                                            Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.
                                        </Typography>
                                    </ListItemText>

                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <Reply style={{ color: 'green' }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments">
                                            <Delete style={{ color: 'red' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {/* <Divider style={{ marginLeft: 10, marginRight: 10 }} /> */}

                                <ListItem style={{ paddingTop: 0, paddingBottom: 0 }} className="list_items">
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            disableRipple={false}
                                        />
                                    </ListItemIcon>

                                    <ListItemText style={{ width: 200, paddingRight: 40, marginLeft: -30 }}>
                                        <Typography noWrap={true} style={{ fontSize: 14 }}>
                                            Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.
                                        </Typography>
                                    </ListItemText>

                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <Reply style={{ color: 'green' }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments">
                                            <Delete style={{ color: 'red' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {/* <Divider style={{ marginLeft: 10, marginRight: 10 }} /> */}

                                <ListItem style={{ paddingTop: 0, paddingBottom: 0 }} className="list_items">
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            disableRipple={false}
                                        />
                                    </ListItemIcon>

                                    <ListItemText style={{ width: 200, paddingRight: 40, marginLeft: -30 }}>
                                        <Typography noWrap={true} style={{ fontSize: 14 }}>
                                            Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.
                                        </Typography>
                                    </ListItemText>

                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <Reply style={{ color: 'green' }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments">
                                            <Delete style={{ color: 'red' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {/* <Divider style={{ marginLeft: 10, marginRight: 10 }} /> */}

                            </List>

                        </Col>

                    </Row>

                </Container>

            </ChakraProvider>
        )
    }

}
export default Forum;
