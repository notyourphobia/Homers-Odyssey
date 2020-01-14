import React, { Component } from 'react';
import { List, ListItem, ListItemText, Paper, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                email: 'homer.simpson@wildcodeschool.fr',
                name: 'Homer',
                lastname: 'Simpson'
            }
        };

    }
    componentDidMount() {
        if (this.props.token){
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    throw new Error(res.statusText)
                }
            })
            .then(res => { this.setState({ profile: {
                email: res.email,
                name: res.name,
                lastname: res.lastname
            } }) })
            .catch()
        }
    }

    render() {
        return (
            <div className='profile'>
                <Grid container
                    alignItems='center'
                    alignContent='center'
                    justify='center'
                    style={{ height: '100%' }}
                >
                    <Grid item xs={12} style={{ margin: '15%', textAlign: 'center' }}>
                        <Paper>
                            <List>
                                <ListItem>
                                    <ListItemText primary='Email' secondary={this.state.profile.email} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Name' secondary={this.state.profile.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Lastname' secondary={this.state.profile.lastname} />
                                </ListItem>
                            </List>
                        </Paper>
                        <br /><br />
                        <Link to='/sign-in' >
                            <Button variant='contained' color='primary' style={{ textDecoration: 'none' }}>
                                Sign Out
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
