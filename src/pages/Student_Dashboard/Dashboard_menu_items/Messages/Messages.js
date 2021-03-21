import React, { Component } from 'react';
import './Messages.css'

/**chakra ui imports */
import {
    ChakraProvider, Button as CUIButton, Spinner,
    ButtonGroup, Stack, SimpleGrid, Box, Grid, GridItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton, Textarea

} from "@chakra-ui/react"
import { MdBuild, MdCall, MdCheckCircle, MdSettings } from "react-icons/md"
import { FaFacebook, FaTwitter } from "react-icons/fa"

/**material ui imports */
import {
    Button as MUIButton, TextField, List, ListItem,
    FormControl, InputLabel, OutlinedInput,
    InputAdornment, IconButton, ListItemIcon, Checkbox, ListItemText,
    ListItemSecondaryAction, Divider, Typography,
} from '@material-ui/core';
import {
    Visibility, VisibilityOff, Search, Delete,
    Reply, ContactSupportOutlined, Create,
} from '@material-ui/icons'

/**react bootstrap imports */
import {
    Button as RBButton, Container, Row, Col,
    Dropdown, DropdownButton, Table
} from 'react-bootstrap';

/**react-bootstrap table-2 */
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


//table column headers
const columns = [

    /********************** ID COLUMN ************************* */
    {
        dataField: 'id',
        text: 'Id',
        headerStyle: (colum, colIndex) => {
            return {
                width: '5%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            };
        },
        align: 'center',
        hidden: true,
    },


    /********************** NAME COLUMN ************************* */
    {
        dataField: 'name',
        text: 'Name',
        headerStyle: (colum, colIndex) => {
            return {
                width: '20%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            };
        },
        title: (cell_content, row, rowIndex, colIndex) => `${cell_content}`,
        style: (cell, row, rowIndex, colIndex) => {
            return {
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }
        },
    },

    /********************** MESSAGE COLUMN ************************* */
    {
        dataField: 'message',
        text: 'Message',
        headerStyle: (colum, colIndex) => {
            return {
                width: '55%', textAlign: 'center'
            };
        },
        title: (cell_content, row, rowIndex, colIndex) => `${cell_content}`,
        style: (cell, row, rowIndex, colIndex) => {
            return {
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }
        },
    },

    /********************** TIME COLUMN ************************* */
    {
        dataField: 'time',
        text: 'Time',
        headerStyle: (colum, colIndex) => {
            return {
                width: '10%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            };
        },
        align: 'center',
        style: (cell, row, rowIndex, colIndex) => {
            return {
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }
        },
    },

    /********************** ACTIONS COLUMN ************************* */
    {
        dataField: 'actions',
        text: 'Actions',
        headerStyle: (colum, colIndex) => {
            return {
                width: '10%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            };
        },
        align: 'center',
    },
];

//data for your table
const data = [
    {
        id: 1,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 2,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 3,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 4,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 5,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 6,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 7,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 8,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 9,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 10,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 11,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 12,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 13,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 14,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 15,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 16,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 17,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 18,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 19,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 20,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },
    {
        id: 21,
        name: 'Samuel Asare Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

    {
        id: 22,
        name: 'Venom Mobius Botwe',
        message: 'Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.',
        time: '8:30',
        actions: <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div><Reply style={{ color: 'green', cursor: 'pointer' }} /></div>
            <div><Delete style={{ color: 'red', cursor: 'pointer' }} /></div>
        </div>
    },

];

/**adding events to a row */
const rowEvents = {
    onClick: (e, row, rowIndex) => {
        // console.log('event data of row: ', e)
        // console.log('content of row: ', row)
        // console.log('index of row: ', rowIndex)
    }
};

/**style content in the row */
const rowStyle = (row, rowIndex) => {
    return { cursor: 'pointer' };
};



class Messages extends Component {

    constructor(props) {
        super(props)

        this.state = {
            display_new_message_popover: false
        }
    }

    open() {
        this.setState({ display_new_message_popover: !this.state.display_new_message_popover })
    }

    close() {
        this.setState({ display_new_message_popover: false })
    }

    render() {
        return (

            <ChakraProvider>

                <Container fluid className="wholepage" style={{ height: '100vh', overflow: 'hidden' }}>

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


                    {/**row 2 of container containing messages using the react-bootstrap-table-2 component*/}
                    <Row>

                        <Col className="somecols">

                            <div className="dropdown_fab_containers">

                                {/**filter messages dropdown menu */}
                                <DropdownButton id="dropdown-basic-button"
                                    title="All messages">
                                    <Dropdown.Item href="#">All</Dropdown.Item>
                                    <Dropdown.Item href="#">Unread</Dropdown.Item>
                                    <Dropdown.Item href="#">Read</Dropdown.Item>
                                </DropdownButton>


                                <div
                                    className="fabs"
                                    onClick={() => { this.new_message_popover() }}
                                >
                                    <Create fontSize='small' style={{ color: 'white', cursor: 'pointer' }} />
                                </div>
                            </div>

                            <div>
                                <BootstrapTable
                                    keyField='id'   //This should be the name of a property that is unique for each item in your dataset
                                    data={data}
                                    columns={columns}
                                    // loading={false}
                                    // overlay={overlayFactory({   //react-bootstrap-table will render overlay if only loading is set to true
                                    //     spinner: true,
                                    //     className: "table_overlays"
                                    // })}
                                    bootstrap4={true} //true to indicate your bootstrap version is 4. Default version is 3.
                                    noDataIndication={() => { alert('noting in the table') }}   //a callback function which return anything that will be showed in the table when data is empty. ie. data=[]
                                    striped={false}  //for adding zebra-stripes to a table.
                                    bordered={false} //for adding borders to a table and table cells.
                                    hover={true}    //Same as bootstrap .table-hover class for adding mouse hover effect (grey background color) on table rows.
                                    condensed={false}   //for making a table more compact by cutting cell padding in half
                                    classes="table_containers"   //Customize class on table element.
                                    wrapperClasses="wrapper_classs"    //Customize class on the outer element which wrap up the table element.
                                    headerClasses="header_classs"    //Customize class on the header row(tr).
                                    headerWrapperClasses="header_wrapper_classs" //Customize class on thead.
                                    bodyClasses="body_classs"    //Customize class on tbody.

                                    //remote
                                    // cellEdit
                                    // selectRow

                                    rowStyle={rowStyle} // Custom the style of table rows
                                    rowClasses="row_classs"   //Custom the style of table rows
                                    rowEvents={rowEvents}   //Custom the events on row
                                    // hiddenRows={hiddenRows}   //this props accept an array of row keys
                                    // defaultSorted={defaultSorted}  //define which column should be sorted by default when the data is rendered

                                    //pagination
                                    //filter
                                    // onTableChange
                                    // onDataSizeChange

                                    pagination={paginationFactory({
                                        // page, // Specify the current page. It's necessary when remote is enabled
                                        // sizePerPage, // Specify the size per page. It's necessary when remote is enabled
                                        // totalSize, // Total data size. It's necessary when remote is enabled

                                        pageStartIndex: 1, // value to be written as the first page on the pagination bar
                                        paginationSize: 3,  // the pagination bar size or number of selections that can be made on the pagination bar
                                        showTotal: false, // display pagination information eg. (showing 1-10 of 500 rows)
                                        sizePerPageList: [
                                            // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
                                            //first value is item to start
                                            //second value is item to end
                                            { text: '1', value: 14 },
                                        ],

                                        withFirstAndLast: false, // show the first and last page button
                                        firstPageText: 'First', // the text of first page button
                                        firstPageTitle: 'Go to first', // the tooltip of first page button
                                        lastPageText: 'Last', // the text of last page button
                                        lastPageTitle: 'Go to last', // the tooltip of last page button

                                        alwaysShowAllBtns: true, // always show the next and previous page button
                                        prePageText: 'Prev', // the text of previous page button
                                        prePageTitle: 'Go to previous', // the tooltip of previous page button
                                        nextPageText: 'Next', // the text of next page button
                                        nextPageTitle: 'Go to next', // the toottip of next page button

                                        hideSizePerPage: true, // hide the size per page dropdown
                                        hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false

                                        onPageChange: (page, sizePerPage) => {
                                            // callback function when page was changing
                                            // alert('changing page')
                                            console.log('size per page: ', sizePerPage);
                                            console.log('page: ', page);
                                        },

                                        // onSizePerPageChange: (sizePerPage, page) => {
                                        //     // callback function when page size was changing
                                        //     console.log('size per page: ', sizePerPage);
                                        //     console.log('page: ', page);
                                        // },

                                        // paginationTotalRenderer: (from, to, size) => { ... }  // custom the pagination total
                                    })}

                                    filter={filterFactory()}
                                />
                            </div>



                        </Col>
                    </Row>

                    {/**popover display */}
                    <div style={{
                        display: 'flex', justifyContent: 'flex-end',
                        backgroundColor: 'transparent'
                    }}>
                        <Popover
                            returnFocusOnClose={false}
                            placement="bottom"
                            isOpen={this.state.display_new_message_popover}
                            onClose={() => { this.close() }}
                            closeOnBlur={false}
                        >
                            {/**nb: removing the lines of code between this comment messes up the popover */}
                            <PopoverTrigger>
                                <CUIButton style={{ visibility: 'hidden' }}>Trigger</CUIButton>
                            </PopoverTrigger>
                            {/**nb: removing the lines of code between this comment messes up the popover */}

                            <PopoverContent color="white" bg="blue.800" borderColor="blue.800"
                                marginRight="5"
                            >
                                <PopoverHeader pt={4} fontWeight="bold" border="0">

                                    <div style={{ display: 'flex' }}>
                                        <span style={{ paddingRight: 10, paddingTop: 5 }}>To:</span>

                                        <DropdownButton size="sm" id="dropdown-basic-button"
                                            title="Everyone">
                                            <Dropdown.Item href="#">Everyone</Dropdown.Item>
                                            <Dropdown.Item href="#">Dr. Peter Mensah</Dropdown.Item>
                                            <Dropdown.Item href="#">Mrs. Jane Doe</Dropdown.Item>
                                        </DropdownButton>
                                    </div>

                                </PopoverHeader>

                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Textarea
                                        borderRadius="5px"
                                        placeholder="Enter Message ..."
                                        // value={value}
                                        // onChange={handleInputChange}
                                        size="sm"
                                        isInvalid={false}
                                        variant="flushed"
                                    />
                                </PopoverBody>
                                <PopoverFooter
                                    border="0"
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    pb={4}
                                >
                                    <ButtonGroup size="sm">
                                        <CUIButton colorScheme="green">Send</CUIButton>
                                        <CUIButton colorScheme="red" >Cancel </CUIButton>
                                    </ButtonGroup>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>
                    </div>

                </Container>

            </ChakraProvider >
        )
    }

    new_message_popover() {
        // alert('create new message')
        this.open()
    }

    close_new_message_popover() {
        this.setState({ display_new_message_popover: false })
    }

}
export default Messages;
