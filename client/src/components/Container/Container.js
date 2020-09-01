import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../Nav/Navbar'
import './style.css'
import Break from '../Break/Break'
import AddBlock from '../AddBlock/AddBlock'
import LoginButton from '../Login/LoginButton/LoginButton'
import ScheduleBlock from '../ScheduleBlock/ScheduleBlock'

class Container extends Component {
    state = {
        formShow: 'form-hide',
        buttonShow: 'login-btn-show',
        error: null,
        userId: '',
        username: '',
        password: '',
        loggedIn: false,
        userData: []
    }

    handleShow = () => {
        this.setState({formShow: 'form-show', buttonShow: 'login-btn-hide'})
    }

    handleOnChange = (e) => {
        let name = e.target.name
        this.setState({[name]: e.target.value})
    }

    handleLogin = () => {
        fetch(`https://morning-coffee-backend-austin.herokuapp.com/findUser/${this.state.username}`)
        .then(res => res.json())
        .then((result) => {
            if (result.error) {
                this.setState({error: result.error})
            } else {
                this.setState({error: null})
                if (this.state.password === result.password) {
                    this.setState({formShow: 'form-hide', loggedIn: true, userId: result._id})
                } else {
                    this.setState({error: 'Password is incorrect'})
                }
            }
        })
    }

    handleCreateUser = () => {
        if (this.state.password.length >= 4 && this.state.username.length >= 4) {
            axios.post('https://morning-coffee-backend-austin.herokuapp.com/addUser', {username: this.state.username, password: this.state.password})
            .then(response => {
                if (response.data.username) {
                    this.setState({loggedIn: true, userId: response.data._id})
                } else {
                    this.setState({error: 'An error occured, please try again'})
                }
            
            })
            .catch(err => {
                console.log(err)
                this.setState({error: 'An error occured, please try again'})
            })
        } else {
            this.setState({error: 'Username and Password must be at least 4 characters'})
        }
    }

    isLoggedin = () => {
        if(this.state.loggedIn) {
            return (
                <>
                {this.state.userData.map(b => (
                    <ScheduleBlock  key={b._id} data={b}/>
                ))}
                <AddBlock user={this.state.userId} mount={this.getUserData}/>
                </>
            )
        } else {
            return (
                <LoginButton state={{...this.state}} handleShow={this.handleShow} handleOnChange={this.handleOnChange}
                handleLogin={this.handleLogin} handleCreateUser={this.handleCreateUser}/>
            )
        }
    }

    getUserData = () => {
        axios.get(`https://morning-coffee-backend-austin.herokuapp.com/users/${this.state.userId}/schedule`)
        .then(response => {
            this.setState({userData: response.data})
        })
    }


    render() {
        return (<div className='container'>
            <Navbar />
            <Break />
            {this.isLoggedin()}
            
        </div>)
    }
}
export default Container