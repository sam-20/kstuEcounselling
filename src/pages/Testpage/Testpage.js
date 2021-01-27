import React, { Component } from 'react';


/**chakra ui imports */
import {
    ChakraProvider, Button as CUIButton,
    ButtonGroup, Stack, SimpleGrid, Box, Grid, GridItem
} from "@chakra-ui/react"
import { MdBuild, MdCall } from "react-icons/md"
import { FaFacebook, FaTwitter } from "react-icons/fa"

/**material ui imports */
import { Button as MUIButton } from '@material-ui/core';

/**react bootstrap imports */
import { Button as RBButton, Container, Row, Col } from 'react-bootstrap';

import logo from '../../assets/kstu.png';

class Testpage extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <ChakraProvider>
                <div>

                    {/**material ui components */}
                    material ui components<br />
                    <MUIButton variant="contained">Default</MUIButton>
                    <MUIButton variant="contained" color="primary">
                        Primary
                    </MUIButton>
                    <MUIButton variant="contained" color="secondary">
                        Secondary
                    </MUIButton>
                    <MUIButton variant="contained" disabled>
                        Disabled
                    </MUIButton>
                    <MUIButton variant="contained" color="primary" href="#contained-buttons">
                        Link
                    </MUIButton>

                    <br /><br />

                    getbootstrap components<br />
                    {/**getbootstrap components */}
                    <button type="button" class="btn btn-primary">Primary</button>
                    <button type="button" class="btn btn-secondary">Secondary</button>
                    <button type="button" class="btn btn-success">Success</button>
                    <button type="button" class="btn btn-danger">Danger</button>
                    <button type="button" class="btn btn-warning">Warning</button>
                    <button type="button" class="btn btn-info">Info</button>
                    <button type="button" class="btn btn-light">Light</button>
                    <button type="button" class="btn btn-dark">Dark</button>
                    <button type="button" class="btn btn-link">Link</button>

                    <br /><br />

                    react-bootstrap components<br />
                    {/**react-bootstrap components */}
                    <RBButton variant="primary">Primary</RBButton>{' '}
                    <RBButton variant="secondary">Secondary</RBButton>{' '}
                    <RBButton variant="success">Success</RBButton>{' '}
                    <RBButton variant="warning">Warning</RBButton>{' '}
                    <RBButton variant="danger">Danger</RBButton> <RBButton variant="info">Info</RBButton>{' '}
                    <RBButton variant="light">Light</RBButton> <RBButton variant="dark">Dark</RBButton>{' '}
                    <RBButton variant="link">Link</RBButton>


                    {/**responsive grids */}
                    <Container fluid style={{ background: 'red' }}>
                        <Row>
                            <Col
                                xl={6} /**full screen ≥1200px*/
                                lg={6} /**slight reduction ≥992px*/
                                md={6} /**half screen ≥768px*/
                                sm={6} /**reduction in half screen ≥576px*/
                                xs={6}  /**phone screen <576px*/
                                // xl={true}   /**true property is used for auto layout */
                                style={{ background: 'yellow' }}>1 of 2</Col>
                            <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{ background: 'green' }}>2 of 2</Col>
                        </Row>
                    </Container>


                    <img
                        src={logo} style={{ width: 120, height: 120 }}
                        alt=""
                    />

                    <img
                        style={{ width: 120, height: 120 }}
                        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                        alt="new"
                    />
                    <br />


                    chakra ui components<br />
                    {/**chakra ui components */}
                    <ButtonGroup direction="row" spacing={3} align="center">
                        <CUIButton colorScheme="teal" variant="solid">
                            Button
                        </CUIButton>
                        <CUIButton colorScheme="teal" variant="outline">
                            Button
                        </CUIButton>

                        <CUIButton leftIcon={<MdBuild />} colorScheme="pink" variant="solid">
                            Settings
                        </CUIButton>
                        <CUIButton rightIcon={<MdCall />} colorScheme="blue" variant="outline">
                            Call us
                        </CUIButton>

                        <CUIButton
                            isLoading={true}
                            loadingText="Submitting"
                            colorScheme="teal"
                            variant="outline">
                            Submit
                        </CUIButton>

                        <CUIButton colorScheme="facebook" leftIcon={<FaFacebook />}>
                            Facebook
                        </CUIButton>
                        <CUIButton colorScheme="twitter" leftIcon={<FaTwitter />}>
                            Twitter
                        </CUIButton>

                    </ButtonGroup>

                    <br /><br />

                    <Container fluid >
                        <Row>
                            <Col style={{ background: 'yellow', height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div>material ui grid</div>
                            </Col>
                        </Row>
                    </Container>

                    <br />
                    chakra ui simple grid component
                    <SimpleGrid columns={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} spacingX="10px" spacingY="10px">
                        <Box style={{ background: 'red', height: 80 }}></Box>
                        <Box style={{ background: 'yellow', height: 80 }}></Box>
                        <Box style={{ background: 'green', height: 80 }}></Box>
                    </SimpleGrid>

                    <br />
                    chakra ui grid component
                    <Grid
                        h="200px"
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(5, 1fr)"
                        gap={4}>
                        <GridItem rowSpan={2} colSpan={1} bg="tomato" />
                        <GridItem colSpan={2} bg="papayawhip" />
                        <GridItem colSpan={2} bg="papayawhip" />
                        <GridItem colSpan={4} bg="tomato" />
                    </Grid>
                </div>
            </ChakraProvider>
        )
    }

}

export default Testpage;