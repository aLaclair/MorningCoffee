import React, { Component } from 'react'
import './style.css'

class ScheduleBlock extends Component {

handleDescription = () => {
    if(this.props.data.description) {
        return (
            <div className='schedule-block'>
                <h1 id='event'>{this.props.data.event}</h1>
                <p id='desc'>{this.props.data.description}</p>
                <p id='end-time'>{this.handleTimeConversion()}</p>
            </div>
        )
    } else {
        return (
            <div className='schedule-block'>
                <h1 id='event'>{this.props.data.event}</h1>
                <p id='end-time'>{this.handleTimeConversion()}</p>
            </div>
        )
    }
}
handleTimeConversion = () => {
    let endTime = this.props.data.endTime.toString()
    endTime = endTime.split('')
    let firstHalf = parseInt(endTime.slice(0, 2).join(''))
    let secondHalf = endTime.slice(2, 5).join('')
    if(firstHalf > 12) {
        firstHalf -= 12
        return `Finish @ ${firstHalf}:${secondHalf} PM`
    } else {
        return `${firstHalf}:${secondHalf} AM`
    }
    
}
    
    render() {
        return (
            <>
                {this.handleDescription()}
            </>
        )
    }
}
export default ScheduleBlock