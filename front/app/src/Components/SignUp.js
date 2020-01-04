import React, { Component } from 'react';
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passowrd: '',
            confirmPassowrd: '',
            firstName: '',
            lastName: '',
            flash: ''
        };
        this.updateEmailField = this.updateEmailField.bind(this);
        this.updatePasswordField = this.updatePasswordField.bind(this);
        this.updateConfirmPasswordField = this.updateConfirmPasswordField.bind(this);
        this.updateFirstNameField = this.updateFirstNameField.bind(this);
        this.updateLastNameField = this.updateLastNameField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateEmailField(event) {
        this.setState({
            email: event.target.value
        })

    }

    updatePasswordField(event) {
        this.setState({
            passowrd: event.target.value
        })
    }

    updateConfirmPasswordField(event) {
        this.setState({
            confirmPassowrd: event.target.value
        })
    }

    updateFirstNameField(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    updateLastNameField(event) {
        this.setState({
            lastName: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch("/auth/sign-up",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(this.state),
            })
            .then(res => res.json()
            )
            .then(
                res => this.setState({ "flash": res.flash }),
                err => this.setState({ "flash": err.flash })
            )
       

        // .catch((res,err) => {
        // if (err) {
        //     res.status(500).json({ flash: err.message });
        // }
        // else {
        //     res.status(200).json({ flash: "User has been signed up!" });
        // }
        // }) 

        console.log(JSON.stringify(this.state, 1, 1));
    }

    render() {
        return (
            <Col className='sign-up'>
                {this.state.log}
                <h1>
                    {JSON.stringify(this.state, 1, 1)}
                </h1>
                <Form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId='formGroupEmail'>
                        <Form.Label column>
                            Email Address
                        </Form.Label>
                        <Form.Control type="email" name="email" onChange={this.updateEmailField} />
                    </Form.Group>

                    <Form.Group controlId='formGroupPassword'>
                        <Form.Label column>
                            Password
                        </Form.Label>
                        <Form.Control type="password" name="password" onChange={this.updatePasswordField} />
                    </Form.Group>

                    <Form.Group controlId='formGroupConfirmPassword'>
                        <Form.Label column>
                            Confirm Password
                        </Form.Label>
                        <Form.Control type="password" name="password" onChange={this.updateConfirmPasswordField} />
                    </Form.Group>

                    <Form.Group controlId='formGrouFirstName'>
                        <Form.Label column>
                            First Name
                        </Form.Label>
                        <Form.Control type="text" name="firstName" onChange={this.updateFirstNameField} />
                    </Form.Group>

                    <Form.Group controlId='formGroupLastName'>
                        <Form.Label column>
                            Last Name
                        </Form.Label>
                        <Form.Control type="text" name="lasttName" onChange={this.updateLastNameField} />
                    </Form.Group>

                    <Button variant='primary' type='submit' size='md'>
                        Submit
                    </Button>
                </Form>
            </Col>
        );
    }
}

