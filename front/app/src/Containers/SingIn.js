import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import { connect } from 'react-redux';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
            flash: '',
            open: false
        };
        this.updateEmailField = this.updateEmailField.bind(this);
        this.updatePasswordField = this.updatePasswordField.bind(this);

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

    handleSubmit(event) {
        event.preventDefault();
        fetch('/auth/sign-in',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
            })
            .then(res => res.json()
            )
            .then(
                res => {
                    this.setState({ 'flash': res.flash, open: true })
                    console.log(JSON.stringify(res));
                    this.props.dispatch(
                        {
                            type: "CREATE_SESSION",
                            user: res.user,
                            token: res.token,
                            flash: res.flash
                        }
                    )
                    this.props.history.replace("/profile")
                },
                err => this.setState({ 'flash': err.flash, open: true })
            )
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        console.log(this.props.flash)
        return (
            <div className='sign-in'>
                <h1>Sign In</h1>
                <form className='sign-in-form' onSubmit={this.handleSubmit} action='/profile' >
                    <TextField type='email' name='email' defaultValue='' label='Email Address' onChange={this.updateEmailField} />
                    <br /><br />
                    <TextField type='password' name='password' defaultValue='' label='Password' onChange={this.updatePasswordField} />
                    <br /><br />
                    {/* <Link to='/profile'> */}
                    <Button variant='contained' color='primary' type='submit' onClick={this.GrowTransition}>
                        Submit
                    </Button>
                    {/* </Link> */}
                </form>

                <h3>
                    Not a member?<Link to='/sign-up' style={{ color: '#9900a7', textDecoration: 'none' }}>Create an account for free!</Link>
                </h3>

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
                    message={<span id="message-id">{this.props.flash}</span>}
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


function mapStateToProps(state) {
    return {
        flash: state.auth.flash,
        token: state.auth.token
    }
};

export default connect(mapStateToProps)(SignIn)


