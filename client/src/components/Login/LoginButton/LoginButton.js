import React, { Component } from 'react'
import './style.css'
import LoginModal from '../LoginModal/LoginModal'
import axios from 'axios'

class LoginButton extends Component {
    
    render() {
        return (
            <div className='login-block'>
                <button className={this.props.state.buttonShow} onClick={this.props.handleShow}>Login</button>
                <LoginModal show={this.props.state.formShow} handleLogin={this.props.handleLogin} handleCreateUser={this.props.handleCreateUser}
                onChange={this.props.handleOnChange} error={this.props.state.error}/>
            </div>
        )
    }
}

export default LoginButton