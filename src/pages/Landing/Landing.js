import React, { Component } from 'react';
import '../Landing/Landing.css'

/**chakra ui imports */
import {
    ChakraProvider, Button as CUIButton,
    ButtonGroup, Stack, SimpleGrid, Box, Grid, GridItem, Wrap,
    WrapItem, Avatar, Input, InputGroup, InputRightElement,
    useToast,    /**toast 1 */
    Skeleton, SkeletonCircle, SkeletonText, Spinner,
    Modal as CUIModal,
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
    PersonOutlineOutlined, Error, Close
} from '@material-ui/icons';

/**react bootstrap imports */
import {
    Button as RBButton, Container, Row, Col,
    Card, Modal,
    CardDeck,
} from 'react-bootstrap';

/**animations */
import { Zoom, Slide, Flip } from 'react-reveal';

// image imports
import landingbackground from '../../assets/background2.jpg';
import student_login_avatar from '../../assets/student.jpg';
import staff_login_avatar from '../../assets/staff.jpg';

import { Redirect } from 'react-router' /**navigation***  1 */

import modulevariables from '../Modulevariables'
import { AsyncStorage } from 'AsyncStorage'

const server = modulevariables.applicationserver

class Landing extends Component {

    constructor(props) {
        super(props)

        this.state = {

            /**we navigate to either page when its set to true */
            student_redirect: false,  /**navigation***  2 */
            staff_redirect: false,  /**navigation***  2 */

            /**switch between the student or staff login form */
            staff_login_tab_selected: true,
            student_login_tab_selected: false,

            /**staff textfield variables */
            staff_username: '',
            staff_password: '',
            show_staff_password: false,

            /**student textfield variables */
            student_number: '',
            student_password: '',
            show_student_password: false,

            display_modal: false,
            modal_title: '',
            modal_content: '',

            display_backdrop: false,
        }
    }

    /**keeping track of username and password onchange textfield events */
    handleStaffusernameChange = (event) => {
        this.setState({
            staff_username: event.target.value
        })
    }

    handleStaffpasswordChange = (event) => {
        this.setState({
            staff_password: event.target.value
        })
    }

    handleStudentnumberChange = (event) => {
        this.setState({
            student_number: event.target.value
        })
    }

    handleStudentpasswordChange = (event) => {
        this.setState({
            student_password: event.target.value
        })
    }



    render() {

        /**toast 2 */
        const { toast } = this.props;

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
                <Container fluid
                    style={{
                        backgroundImage: `url(${landingbackground})`,
                        backgroundSize: '100% 100%',
                        backgroundAttachment: 'fixed',
                        backgroundRepeat: 'no-repeat'
                    }}>

                    {/**modal design */}
                    <CUIModal
                        isOpen={this.state.display_modal}
                        onClose={() => { this.close_modal() }}
                        isCentered
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{this.state.modal_title}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {this.state.modal_content}
                            </ModalBody>

                            <ModalFooter>
                                <CUIButton colorScheme="blue" mr={3}
                                    onClick={() => { this.close_modal() }}
                                >
                                    Close
                                    </CUIButton>
                            </ModalFooter>
                        </ModalContent>
                    </CUIModal>

                    {/* backdrop */}
                    {
                        this.state.display_backdrop ?
                            <div style={{
                                width: '100%', height: '100%', position: 'fixed',
                                zIndex: 100, left: 0, top: 0, background: 'rgb(0,0,0,0.5)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                                <Typography style={{ color: 'white', paddingLeft: 20 }}>please wait ...</Typography>
                            </div>
                            :
                            null
                    }



                    <Row>
                        <Col style={{ background: 'transparent', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            {/**shadow covering login card */}
                            <div className="shadow-lg rounded" style={{ background: 'transparent' }}>

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
                                            <Container fluid style={{ background: 'reds', paddingLeft: 0, paddingRight: 0 }}>

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

                                                        {/**staff username textbox */}
                                                        <InputGroup size="sm">
                                                            <Input
                                                                variant="filled"
                                                                pr="4.5rem"
                                                                type="text"
                                                                placeholder="Username"
                                                                value={this.state.staff_username}
                                                                onChange={this.handleStaffusernameChange}
                                                            />
                                                            <InputRightElement style={{ background: 'reds' }} width="2.5rem">
                                                                <PersonOutlineOutlined fontSize='small' style={{ color: '#A4B8BD' }} />
                                                            </InputRightElement>
                                                        </InputGroup>

                                                        {/**staff password texbox */}
                                                        <InputGroup size="sm">
                                                            <Input
                                                                variant="filled"
                                                                pr="4.5rem"
                                                                type={this.state.show_staff_password ? "text" : "password"}
                                                                placeholder="Password"
                                                                value={this.state.staff_password}
                                                                onChange={this.handleStaffpasswordChange}
                                                            />
                                                            <InputRightElement style={{ background: 'reds' }} width="2.5rem">
                                                                {
                                                                    this.state.show_staff_password ?
                                                                        <VisibilityOffOutlined
                                                                            style={{ color: '#ADC2C7' }}
                                                                            fontSize='small'
                                                                            onClick={() => { this.setState({ show_staff_password: false }) }}
                                                                        />
                                                                        :
                                                                        <VisibilityOutlined
                                                                            style={{ color: '#ADC2C7' }}
                                                                            fontSize='small'
                                                                            onClick={() => { this.setState({ show_staff_password: true }) }}
                                                                        />
                                                                }
                                                            </InputRightElement>
                                                        </InputGroup>

                                                        <CUIButton
                                                            onClick={() => {
                                                                this.staff_login(toast) /**toast 4 */
                                                            }}
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
                                            <Container fluid style={{ background: 'reds', paddingLeft: 0, paddingRight: 0 }}>

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

                                                        {/**student number textbox */}
                                                        <InputGroup size="sm">
                                                            <Input
                                                                variant="filled"
                                                                pr="4.5rem"
                                                                type="text"
                                                                placeholder="Student number"
                                                                value={this.state.student_number}
                                                                onChange={this.handleStudentnumberChange}
                                                            />
                                                            <InputRightElement style={{ background: 'reds' }} width="2.5rem">
                                                                <PersonOutlineOutlined fontSize='small' style={{ color: '#A4B8BD' }} />
                                                            </InputRightElement>
                                                        </InputGroup>

                                                        {/**student password textbox */}
                                                        <InputGroup size="sm">
                                                            <Input
                                                                variant="filled"
                                                                pr="4.5rem"
                                                                type={this.state.show_student_password ? "text" : "password"}
                                                                placeholder="Password"
                                                                value={this.state.student_password}
                                                                onChange={this.handleStudentpasswordChange}
                                                            />
                                                            <InputRightElement style={{ background: 'reds' }} width="2.5rem">
                                                                {
                                                                    this.state.show_student_password ?
                                                                        <VisibilityOffOutlined
                                                                            style={{ color: '#ADC2C7' }}
                                                                            fontSize='small'
                                                                            onClick={() => { this.setState({ show_student_password: false }) }}
                                                                        />
                                                                        :
                                                                        <VisibilityOutlined
                                                                            style={{ color: '#ADC2C7' }}
                                                                            fontSize='small'
                                                                            onClick={() => { this.setState({ show_student_password: true }) }}
                                                                        />
                                                                }
                                                            </InputRightElement>
                                                        </InputGroup>

                                                        <CUIButton
                                                            onClick={() => { this.student_login(toast) }}
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


    staff_login(toast) {

        /**removing white space */
        try {
            this.setState({ staff_username: this.state.staff_username.toString().trim() })
            this.setState({ staff_password: this.state.staff_password.toString().trim() })
        } catch (e) {
            console.log(e)
        }

        /**if user doesnt provide all fields */
        if ((!this.state.staff_username) || (!this.state.staff_password)) {

            /**toast 5 */
            toast({
                duration: 2000, /**use null to make it not disappear */
                isClosable: true,
                position: "top",
                render: () => (

                    /**toast shadow */
                    <div className="shadow-lg rounded">
                        <Box color='white' style={{ background: '#FF443D', borderRadius: 5 }}>
                            <div style={{ width: '100%', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>

                                {/**error icon */}
                                <div style={{ width: '10%', background: 'yellows', display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
                                    <Error fontSize='small' />
                                </div>

                                {/**toast message */}
                                <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingLeft: 10 }}>
                                    <Typography>Login failed!</Typography>
                                    <Typography style={{ fontSize: 12 }}>Provide all details.</Typography>
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

        /**if user provides all fields */
        else {
            /**show backdrop while we communicate with the backend */
            this.show_backdrop()

            /**verify login credentials */
            fetch(server + 'view_staff_users.php', {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain'
                },
                body: JSON.stringify({
                    staff_usernameDB: this.state.staff_username,
                    staff_passwordDB: this.state.staff_password
                })
            }).then((response) => response.text())
                .then((responseJson) => {

                    // console.log(responseJson)

                    var jsonconvertedrows = JSON.parse(responseJson)
                    var finaldata = JSON.stringify(jsonconvertedrows)


                    if (finaldata === '"no search results"') {
                        /**if account doesnt exist */

                        //hide backdrop
                        this.hide_backdrop()

                        this.show_modal('Login failed!', 'Staff could not be found')
                        console.log('staff details cannot be found!')
                    }

                    else {
                        /**if account exists */

                        /**transfer the id of the staff in the db to the globalmodule variable */
                        for (var count = 0; count < jsonconvertedrows.length; count++) {
                            modulevariables.global_staff_id = jsonconvertedrows[count].staff_id
                        }

                        this._asyncStore_save_staff_id()    /**save the staff's id into our local storage */

                        this.setState({ staff_redirect: true }) /**finally redirect to the dashboard */
                    }

                }, err => {
                    /**connection to server error */

                    //hide backdrop
                    this.hide_backdrop()

                    console.log('internet error: ', err)
                    this.show_modal('Login failed!', 'Please check your internet connection')
                })
        }

    }

    student_login(toast) {
        // this.setState({ student_redirect: true })

        /**removing white space */
        try {
            this.setState({ student_number: this.state.student_number.toString().trim() })
            this.setState({ student_password: this.state.student_password.toString().trim() })
        } catch (e) {
            console.log(e)
        }

        /**if user doesnt provide all fields */
        if ((!this.state.student_number) || (!this.state.student_password)) {

            toast({
                duration: 2000, /**use null to make it not disappear */
                isClosable: true,
                position: "top",
                render: () => (

                    /**toast shadow */
                    <div className="shadow-lg rounded">
                        <Box color='white' style={{ background: '#FF443D', borderRadius: 5 }}>
                            <div style={{ width: '100%', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>

                                {/**error icon */}
                                <div style={{ width: '10%', background: 'yellows', display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
                                    <Error fontSize='small' />
                                </div>

                                {/**toast message */}
                                <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingLeft: 10 }}>
                                    <Typography>Login failed!</Typography>
                                    <Typography style={{ fontSize: 12 }}>Provide all details.</Typography>
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

        /**if user provides all fields */
        else {

            /**first check if the student number field was only numbers */
            const re = /^[0-9\b]+$/

            /**if user entered numbers */
            if (re.test(this.state.student_number)) {

                /**show backdrop while we communicate with the backend */
                this.show_backdrop()

                /**verify login credentials */
                fetch(server + 'student_login.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'text/plain'
                    },
                    body: JSON.stringify({
                        student_numberDB: this.state.student_number,
                        student_passwordDB: this.state.student_password
                    })
                }).then((response) => response.text())
                    .then((responseJson) => {

                        // console.log(responseJson)

                        var jsonconvertedrows = JSON.parse(responseJson)
                        var finaldata = JSON.stringify(jsonconvertedrows)

                        if (finaldata === '"no search results"') {
                            /**if account doesnt exist */

                            //hide backdrop
                            this.hide_backdrop()

                            console.log('student details cannot be found!')
                            this.show_modal('Login failed', 'Student details could not be found')
                        }

                        else {
                            /**if account exists */

                            /**transfer the id of the student in the db to the globalmodule variable */
                            for (var count = 0; count < jsonconvertedrows.length; count++) {
                                modulevariables.global_student_id = jsonconvertedrows[count].student_id
                            }

                            this._asyncStore_save_student_id()  /**save the student's id into our local storage */

                            this.hide_backdrop()

                            this.setState({ student_redirect: true })   /**finally redirect to the dashboard */
                        }
                    }, err => {
                        /**connection to server error */

                        //hide backdrop
                        this.hide_backdrop()

                        console.log('internet error: ', err)
                        this.show_modal('Login failed!', 'Please check your internet connection')
                    })
            }

            else {
                /**if user didnt enter numbers in the student number textbox */
                toast({
                    duration: 2000, /**use null to make it not disappear */
                    isClosable: true,
                    position: "top",
                    render: () => (

                        /**toast shadow */
                        <div className="shadow-lg rounded">
                            <Box color='white' style={{ background: '#FF443D', borderRadius: 5 }}>
                                <div style={{ width: '100%', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>

                                    {/**error icon */}
                                    <div style={{ width: '10%', background: 'yellows', display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
                                        <Error fontSize='small' />
                                    </div>

                                    {/**toast message */}
                                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingLeft: 10 }}>
                                        <Typography>Login failed!</Typography>
                                        <Typography style={{ fontSize: 12 }}>Student number field is incorrect.</Typography>
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
        }
    }

    _asyncStore_save_staff_id = async () => {
        try {
            await AsyncStorage.setItem('stored_staff_id', modulevariables.global_staff_id);
            // console.log('the staff id stored is: ', modulevariables.global_staff_id)
        } catch (error) {
            // Error saving data
            console.log("async storage error: ", error)
        }
    }

    _asyncStore_save_student_id = async () => {
        try {
            await AsyncStorage.setItem('stored_student_id', modulevariables.global_student_id);
            // console.log('the student id stored is: ', modulevariables.global_student_id)
        } catch (error) {
            // error saving data
            console.log("asyn storage error: ", error)
        }
    }

    show_modal(title, content) {
        this.setState({ modal_title: title }, () => {
            this.setState({ modal_content: content }, () => {
                this.setState({ display_modal: true })
            })
        })
    }

    close_modal() {
        this.setState({ display_modal: false })
    }

    show_backdrop() {
        this.setState({ display_backdrop: true })
    }

    hide_backdrop() {
        this.setState({ display_backdrop: false })
    }

}
// export default Landing;

export default function (props) {
    const toast = useToast();   /**toast 3 */
    return <Landing {...props} toast={toast} />
}