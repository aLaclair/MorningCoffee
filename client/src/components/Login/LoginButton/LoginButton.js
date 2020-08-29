import React, { Component } from 'react'
import './style.css'
import LoginModal from '../LoginModal/LoginModal'

class LoginButton extends Component {
    state = {
        formShow: 'form-hide',
        buttonShow: 'login-btn-show'
    }

    handleShow = () => {
        this.setState({formShow: 'form-show', buttonShow: 'login-btn-hide'})
    }

    render() {
        return (
            <div className='login-block'>
                <button className={this.state.buttonShow} onClick={this.handleShow}>Login</button>
                <LoginModal show={this.state.formShow}/>
            </div>
        )
    }
}

export default LoginButton