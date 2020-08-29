import React, { Component } from 'react'
import './style.css'

class LoginModal extends Component {
    state = {
        username: '',
        password: ''
    }
    
    handleOnChange = (e) => {
        let name = e.target.name
        this.setState({[name]: e.target.value})
    }

    render() {
        return (
            <div className={this.props.show}>
                <p>Login</p>
                <hr />
                <p id='tip'>This is not a secure site, please do not use a meaningful password</p>
                <label>
                    Username:
                    <input type='text' name='username' onChange={this.handleOnChange}/>
                </label>
                <br />
                <label>
                    Password:
                    <input type='text' name='password' onChange={this.handleOnChange}/>
                </label>
                <div className='buttons'>
                    <button className='login'>Login</button>
                    <button className='create'>Create New User</button>
                </div>
            </div>
        )
    }
}
export default LoginModal