import React, { Component } from 'react';


/**chakra ui imports */
import {
    ChakraProvider, Button as CUIButton,
    ButtonGroup, Stack, SimpleGrid, Box, Grid, GridItem, Wrap,
    WrapItem, Avatar, Input
} from "@chakra-ui/react"

/**material ui imports */
import {
    Button as MUIButton, Typography,
    TextField,
} from '@material-ui/core';

/**react bootstrap imports */
import {
    Button as RBButton, Container, Row, Col,
    Card,
    CardDeck
} from 'react-bootstrap';

/**animations */
import { Zoom, Slide, Flip } from 'react-reveal';

// image imports
import landingbackground from '../../assets/background2.jpg';
import student_login_avatar from '../../assets/student.jpg';
import staff_login_avatar from '../../assets/staff.jpg';

import { Redirect } from 'react-router' /**navigation***  1 */

class Landing extends Component {

    constructor(props) {
        super(props)

        this.state = {

            /**we navigate to either page when its set to true */
            student_redirect: false,  /**navigation***  2 */
            staff_redirect: false,  /**navigation***  2 */

            /**switch between the student or staff login form */
            staff_login_tab_selected: true,
            student_login_tab_selected: false
        }
    }

    render() {

        /**navigation***  3 */
        if (this.state.student_redirect) {
            return <Redirect push to="student/dashboard" />;
        }

        /**navigation***  3 */
        if (this.state.staff_redirect) {
            return <Redirect push to="staff/dashboard" />;
        }


        return (
            <ChakraProvider>
                <Container fluid style={{ backgroundImage: `url(${landingbackground})` }}>
                    <Row>
                        <Col style={{ background: 'transparent', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            {/**shadow covering login card */}
                            <div class="shadow-lg rounded" style={{ background: 'transparent' }}>

                                {/**login card  */}
                                <Card className="text-center" style={{ background: 'reds', borderColor: 'transparent' }}>

                                    {/**staff and student switch header container */}
                                    <Container fluid style={{ background: 'reds', padding: 0, marginTop: 20, marginBottom: 25 }}>
                                        <Row>

                                            {/**staff switch header */}
                                            <Col style={{ display: 'flex', background: 'pinks', margin: 0, justifyContent: 'flex-end' }}>
                                                <Typography
                                                    onClick={() => { this.switch_to_staff_login_section() }}
                                                    style={{ color: 'gray', fontSize: 14, cursor: 'pointer' }}
                                                >
                                                    STAFF
                                                    {this.state.staff_login_tab_selected ?
                                                        <Slide right>
                                                            <div style={{ background: 'reds', borderBottom: '2px solid dodgerblue' }}></div>
                                                        </Slide>
                                                        :
                                                        <div></div>
                                                    }
                                                </Typography>
                                            </Col>

                                            {/**student switch header */}
                                            <Col style={{ display: 'flex', background: 'greens', margin: 0, justifyContent: 'flex-start' }}>
                                                <Typography
                                                    onClick={() => { this.switch_to_student_login_section() }}
                                                    style={{ color: 'gray', fontSize: 14, cursor: 'pointer' }}
                                                >
                                                    STUDENT
                                                    {this.state.student_login_tab_selected ?
                                                        <Slide left>
                                                            <div style={{ background: 'reds', borderBottom: '2px solid dodgerblue' }}></div>
                                                        </Slide>
                                                        :
                                                        <div></div>
                                                    }
                                                </Typography>
                                            </Col>
                                        </Row>
                                    </Container>

                                    {/**Staff avatar, inputfields, button and footer container */}
                                    {this.state.staff_login_tab_selected ?
                                        <Flip right>
                                            <Container fluid style={{ background: 'reds' }}>

                                                {/**staff avatar container */}
                                                <Container style={{ marginBottom: 15 }}>
                                                    <Row>
                                                        <Col></Col>
                                                        <Col>
                                                            <Wrap>
                                                                <WrapItem>
                                                                    <Avatar size="2xl" name="staff avatar" src={staff_login_avatar} />
                                                                </WrapItem>
                                                            </Wrap>
                                                        </Col>
                                                        <Col></Col>
                                                    </Row>
                                                </Container>

                                                {/**staff input fields and button section */}
                                                <Card.Body>
                                                    <Stack spacing={4}>
                                                        <Input variant="filled" placeholder="Username" />
                                                        <Input variant="filled" placeholder="Password" />

                                                        <CUIButton
                                                            onClick={() => { this.staff_login() }}
                                                            isLoading={false}
                                                            loadingText="Logging in"
                                                            colorScheme="twitter"
                                                            variant="solid"
                                                            size="md"
                                                            style={{ marginLeft: 20, marginRight: 20 }}
                                                        >
                                                            Log in
                                                 </CUIButton>
                                                    </Stack>
                                                </Card.Body>

                                                {/**staff footer section */}
                                                <Card.Footer className="text-muted" style={{ background: 'yellows' }} >
                                                    <Card.Text style={{ fontSize: 12 }}>
                                                        Forgot password?
                                         </Card.Text>
                                                </Card.Footer>
                                            </Container>
                                        </Flip>
                                        :
                                        <div></div>
                                    }



                                    {/**Student avatar, inputfields, button and footer container */}
                                    {this.state.student_login_tab_selected ?
                                        <Flip left>
                                            <Container fluid style={{ background: 'reds' }}>

                                                {/**student avatar container */}
                                                <Container style={{ marginBottom: 15 }}>
                                                    <Row>
                                                        <Col></Col>
                                                        <Col>
                                                            <Wrap>
                                                                <WrapItem>
                                                                    <Avatar size="2xl" name="student avatar" src={student_login_avatar} />
                                                                </WrapItem>
                                                            </Wrap>
                                                        </Col>
                                                        <Col></Col>
                                                    </Row>
                                                </Container>

                                                {/**student input fields and button section */}
                                                <Card.Body>
                                                    <Stack spacing={4}>
                                                        <Input variant="filled" placeholder="Student number" />
                                                        <Input variant="filled" placeholder="Password" />

                                                        <CUIButton
                                                            onClick={() => { this.student_login() }}
                                                            isLoading={false}
                                                            loadingText="Logging in"
                                                            colorScheme="twitter"
                                                            variant="solid"
                                                            size="md"
                                                            style={{ marginLeft: 20, marginRight: 20 }}
                                                        >
                                                            Log in
                                                 </CUIButton>
                                                    </Stack>
                                                </Card.Body>

                                                {/**student footer section */}
                                                <Card.Footer className="text-muted" style={{ background: 'yellows' }} >
                                                    <Card.Text style={{ fontSize: 12 }}>
                                                        Forgot password?
                                         </Card.Text>
                                                </Card.Footer>
                                            </Container>
                                        </Flip>
                                        :
                                        <div></div>
                                    }


                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </ChakraProvider>
        )
    }

    switch_to_staff_login_section() {
        this.setState({ staff_login_tab_selected: true })
        this.setState({ student_login_tab_selected: false })
    }

    switch_to_student_login_section() {
        this.setState({ student_login_tab_selected: true })
        this.setState({ staff_login_tab_selected: false })
    }

    staff_login() {
        this.setState({ staff_redirect: true })
    }

    student_login() {
        this.setState({ student_redirect: true })
    }

}
export default Landing;