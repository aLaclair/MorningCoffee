import React, { Component } from 'react'
import './style.css'


class LoginModal extends Component {
    
    render() {
        return (
            <div className={this.props.show}>
                <p>Login</p>
                <hr />
                <p id='tip'>This is not a secure site, please do not use a meaningful password</p>
                <label>
                    Username:
                    <input type='text' name='username' onChange={this.props.onChange}/>
                </label>
                <br />
                <label>
                    Password:
                    <input type='text' name='password' onChange={this.props.onChange}/>
                </label>
                <p id='error'>{this.props.error}</p>
                <div className='buttons'>
                    <button className='login' onClick={this.props.handleLogin}>Login</button>
                    <button className='create' onClick={this.props.handleCreateUser}>Create New User</button>
                </div>
            </div>
        )
    }
}
export default LoginModal