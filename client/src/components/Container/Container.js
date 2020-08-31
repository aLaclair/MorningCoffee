import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../Nav/Navbar'
import './style.css'
import Break from '../Break/Break'
import AddBlock from '../AddBlock/AddBlock'
import LoginButton from '../Login/LoginButton/LoginButton'
import LoginModal from '../Login/LoginModal/LoginModal'

class Container extends Component {
    state = {
        formShow: 'form-hide',
        buttonShow: 'login-btn-show',
        error: null,
        username: '',
        password: '',
        loggedIn: false
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
                console.log(result)
                if (this.state.password === result.password) {
                    this.setState({formShow: 'form-hide', loggedIn: true})
                } else {
                    this.setState({error: 'Password is incorrect'})
                }
            }
        })
    }

    handleCreateUser = () => {
        axios.post('https://morning-coffee-backend-austin.herokuapp.com/addUser', {username: this.state.username, password: this.state.password})
        .then(response => {console.log(response)})
    }

    isLoggedin = () => {
        if(this.state.loggedIn) {
            return (
                <AddBlock />
            )
        } else {
            return (
                <LoginButton state={{...this.state}} handleShow={this.handleShow} handleOnChange={this.handleOnChange}
                handleLogin={this.handleLogin} handleCreateUser={this.handleCreateUser}/>
            )
        }
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