import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import './../css/global.css'
class DashboardLeft extends Component {
    render() {
        return (
            <div>

                <h6>This is Dashboard Left</h6>
                <h1 style={{ height: '400px' }} >
                    put Calendar here
                </h1>

                <Row className="m-0">
                    <div className="f-18 font-500">To Do List</div>
                    <img alt="" src="./../"></img>
                </Row>


            </div>


        )
    }
}

export default DashboardLeft;