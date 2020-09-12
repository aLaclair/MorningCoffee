import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../Nav/Navbar'
import './style.css'
import Break from '../Break/Break'
import AddBlock from '../AddBlock/AddBlock'
import LoginButton from '../Login/LoginButton/LoginButton'
import ScheduleBlock from '../ScheduleBlock/ScheduleBlock/ScheduleBlock'
import NewScheduleBlock from '../ScheduleBlock/NewBlockForm/NewBlockForm'

class Container extends Component {
    state = {
        formShow: 'form-hide',
        buttonShow: 'login-btn-show',
        newBlockShow: 'form-hide',
        error: null,
        eventErr: null,
        addBlock: 'add-block',
        userId: '',
        username: '',
        password: '',
        event: '',
        endTime: '0100',
        endTimeTOD: 'AM',
        description: null,
        loggedIn: false,
        userData: []
    }
    readCookies = () => {
        if (sessionStorage.getItem('userId')) {
            this.setState({loggedIn: true, userId: sessionStorage.getItem('userId')})
        }
    }

    handleShow = () => {
        this.setState({formShow: 'form-show', buttonShow: 'login-btn-hide'})
    }
    handleFormClose = () => {
        this.setState({newBlockShow: 'form-hide', eventErr: null, addBlock:'add-block'})
    }

    handleOnChange = (e) => {
        let name = e.target.name
        this.setState({[name]: e.target.value})
    }

    handleTimeChange = (e) => {
        let name = e.target.name
        switch (name) {
            case 'hour':
                let newTime = this.state.endTime.split('')
                let time = e.target.value
                if (this.state.endTimeTOD === 'AM') {
                    if (time === '12') {
                        time = '00'
                    }
                    time = time.split('')
                    newTime[0] = time[0]
                    newTime[1] = time[1]
                } else {
                    if (time !== '12') {
                        time = (parseInt(time) + 12).toString()
                    }
                    time = time.split('')
                    newTime[0] = time[0]
                    newTime[1] = time[1]
                }
                newTime = newTime.join('')
                this.setState({endTime: newTime})
                break;
            
            case 'minutes':
                let newMinutes = this.state.endTime.split('')
                let minutes = e.target.value.split('')
                newMinutes[2] = minutes[0]
                newMinutes[3] = minutes[1]
                newMinutes = newMinutes.join('')

                this.setState({endTime: newMinutes})
                break;

            case 'TOD':
                this.setState({endTimeTOD: e.target.value})
                let checkTime = this.state.endTime.split('')
                let hours = parseInt(checkTime.slice(0,2).join(''))
                if (e.target.value === 'AM' && hours > 11) {
                    hours = hours - 12
                    if (hours < 10) {
                        hours = `0${hours}`.split('')
                    } else {
                        hours = hours.toString().split('')
                    }
                    checkTime[0] = hours[0]
                    checkTime[1] = hours[1]
                    
                } else if (e.target.value === 'PM' && hours < 12) {
                    hours = (hours + 12).toString().split('')
                    checkTime[0] = hours[0]
                    checkTime[1] = hours[1]
                }
                this.setState({endTime: checkTime.join('')})
                break;

            default:
                break;
        }
    }

    handleAddEvent = () => {
        if (this.state.event !== '') {
            if (this.state.description === null) {
                axios.post('https://morning-coffee-backend-austin.herokuapp.com/addScheduleBlock', {
                    userId: this.state.userId,
                    event: this.state.event,
                    endTime: this.state.endTime
                }).then(response => {
                    let data = this.state.userData
                    data.push(response.data)
                    this.setState({userData: data, eventErr: null, newBlockShow: 'form-hide', addBlock: 'add-block'})
                })
            } else {
                axios.post('https://morning-coffee-backend-austin.herokuapp.com/addScheduleBlock', {
                    userId: this.state.userId,
                    event: this.state.event,
                    description: this.state.description,
                    endTime: this.state.endTime
                }).then(response => {
                    let data = this.state.userData
                    data.push(response.data)
                    this.setState({userData: data, eventErr: null, newBlockShow: 'form-hide', addBlock:'add-block'})
                })
            }
        } else {
            this.setState({eventErr: 'Please add an event'})
        }
    }

    handleLogin = () => {
        axios.get(`https://morning-coffee-backend-austin.herokuapp.com/findUser/${this.state.username}`)
        .then((result) => {
            if (result.error) {
                this.setState({error: result.error})
            } else {
                this.setState({error: null})
                if (this.state.password === result.data.password) {
                    this.setState({formShow: 'form-hide', loggedIn: true, userId: result.data._id})
                    sessionStorage.setItem('userId', result.data._id)
                    console.log(result.data._id)
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
                    sessionStorage.setItem('userId', response.data._id)
                    console.log(this.state.userId)
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
                    <ScheduleBlock  key={b._id} data={b} delete={this.handleDelete}/>
                ))}
                <AddBlock user={this.state.userId} mount={this.getUserData} click={this.handleAddClick} hide={this.state.addBlock}/>
                <NewScheduleBlock show={this.state.newBlockShow} close={this.handleFormClose} onchange={this.handleOnChange} timeChange={this.handleTimeChange}
                onSubmit={this.handleAddEvent} error={this.state.eventErr}/>
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
    handleAddClick = () => {
        this.setState({newBlockShow: 'form-show', addBlock: 'form-hide',})
    }

    handleDelete = (e) => {
       let id = e.target.id
       axios.get(`https://morning-coffee-backend-austin.herokuapp.com/delete/block/${id}`)
       .then(response => {
           let newData = this.state.userData
           for (let i = 0; i < this.state.userData.length; i++) {
               if (this.state.userData[i]._id === id) {
                   newData.splice(i, 1)
                   this.setState({userData: newData})
               }
           }
       }).catch(err => {
           console.log(err)
       })
    }

    componentDidMount() {
        this.readCookies()
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