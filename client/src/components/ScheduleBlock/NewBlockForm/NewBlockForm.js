import React, { Component } from 'react'
import './style.css'

class NewScheduleBlock extends Component {
    render() {
        return (
            <div className={this.props.show} id='new-block'>
                <label id='event-name'>
                    Event: 
                    <br></br>
                    <input type='text' name='event' id='event-input' onChange={this.props.onchange}/>
                </label>
                <label id='desc'>
                    Description (optional):
                    <br></br>
                    <input type='text' name='description' id='desc-input'onChange={this.props.onchange}/>
                </label>
                <div className='end-time'>
                    <p id='end-label'>End Time:</p>
                    <select name='hour' onChange={this.props.timeChange}> 
                        <option value='01'>1</option>
                        <option value='02'>2</option>
                        <option value='03'>3</option>
                        <option value='04'>4</option>
                        <option value='05'>5</option>
                        <option value='06'>6</option>
                        <option value='07'>7</option>
                        <option value='08'>8</option>
                        <option value='09'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                    </select>
                    <select name='minutes' onChange={this.props.timeChange}>
                        <option value='00'>00</option>
                        <option value='15'>15</option>
                        <option value='30'>30</option>
                        <option value='45'>45</option>
                    </select>
                    <select name='TOD' onChange={this.props.timeChange}>
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                    </select>
                    <button className='add-schedule-block'>Add Event</button>
                </div>
                <button className='close-form' onClick={this.props.close}>X</button>
                
            </div>
        )
    }
}
export default NewScheduleBlock