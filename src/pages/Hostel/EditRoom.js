import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class EditRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Edit Room</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/hostel">Room</a></li>
                                <li className="breadcrumb-item active">Edit Room</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Form>
                                <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Room Information</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Block</Form.Label>
                                                <Form.Control type="text" defaultValue="A Block" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Room No</Form.Label>
                                                <Form.Control type="text" defaultValue="101" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Room Type</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Normal</option>
                                                    <option>Normal</option>
                                                    <option>AC</option>
                                                    <option>Suite</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>No of Beds</Form.Label>
                                                <Form.Control type="text" defaultValue="5" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Cost per Bed</Form.Label>
                                                <Form.Control type="text" defaultValue="$25" />
                                            </Form.Group>
                                        </Col>                                        
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Availability</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Available</option>
                                                    <option>Available</option>
                                                    <option>Not Available</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>                                        
                                    </Row>                                     
                                </Form>                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export { EditRoom };