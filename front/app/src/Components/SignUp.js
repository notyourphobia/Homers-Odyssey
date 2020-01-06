import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            flash: '',
            open: false
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
            password: event.target.value
        })
    }

    updateConfirmPasswordField(event) {
        this.setState({
            confirmPassword: event.target.value
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
        console.log('123');
        if (this.state.password === this.state.confirmPassword) {
            fetch('/auth/sign-up',
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.firstName,
                        lastname: this.state.lastName
                    }),
                })
                .then(res => res.json()
                )
                .then(
                    res => this.setState({ 'flash': res.flash, open: true }),
                    err => this.setState({ 'flash': err.flash, open: true })
                )
        } else {
            alert('Passwords donnt match')
        }
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        return (
            <div className='sign-up'>
                <h1>Sign Up</h1>
                <form className='sign-up-form' onSubmit={this.handleSubmit} >
                    <TextField type='email' name='email' defaultValue='' label='Email Address' onChange={this.updateEmailField} />
                    <br /><br />
                    <TextField type='password' name='password' defaultValue='' label='Password' onChange={this.updatePasswordField} />
                    <br /><br />
                    <TextField type='password' name='password' defaultValue='' label='Confirm Password' onChange={this.updateConfirmPasswordField} />
                    <br /><br />
                    <TextField type='text' name='firstName' defaultValue='' label='First Name' onChange={this.updateFirstNameField} />
                    <br /><br />
                    <TextField type='text' name='lasttName' defaultValue='' label='Last Name' onChange={this.updateLastNameField} />
                    <br /><br />
                    <Link to='/'>
                        <Button variant='contained' color='primary' type='submit' onClick={this.handleSubmit}>
                            Submit
                    </Button>
                    </Link>
                </form>
                <h3>Already have an account? Sing In<Link to='/sign-in' style={{ color: '#9900a7', textDecoration: 'none' }}> here</Link>!</h3>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">{this.state.flash}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}