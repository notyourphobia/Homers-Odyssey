import React, { Component } from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.updateEmailField = this.updateEmailField.bind(this);
    }

    // updateEmailField = (event) => {
    //     this.setState({
    //         email: event.target.value
    //     })
    // }

    updateEmailField(event) {
        this.setState({
            email: event.target.value
        })
    }


    render() {
        return (
            <div className='sign-up'>
                <h1>{this.state.email.length === 0 ? 'test@test.com' : this.state.email}</h1>
                <input type="email" name="email" onChange={this.updateEmailField} />
            </div>
        );
    }
}

