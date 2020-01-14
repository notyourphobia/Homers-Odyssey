import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/sign-in');
            }
        }

        componentWillUpdate() {
            if (!this.props.authenticated) {
                this.props.history.push('/sign-in');
            }
        }
        render() {
            return <ComposedComponent  {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return { authenticated: state.auth.token ? true : false };
    }

    return connect(mapStateToProps)(Authentication);
}