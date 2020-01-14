import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class NotAuthentication extends Component {
        componentWillMount() {
            if (this.props.authenticated) {
                this.props.history.push('/profile')
            }
        }

        componentWillUpdate() {
            if (this.props.authenticated) {
                this.props.history.push('/profile')
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return { authenticated: state.auth.token ? true : false };
    }

    return connect(mapStateToProps)(NotAuthentication);
}