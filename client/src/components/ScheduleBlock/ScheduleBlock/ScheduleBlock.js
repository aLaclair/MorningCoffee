import React, { Component } from 'react'
import './style.css'

class ScheduleBlock extends Component {

handleDescription = () => {
    if(this.props.data.description) {
        return (
            <div className='schedule-block desc' data-aos='fade-zoom-in'>
                <h1 id='event'>{this.props.data.event}</h1>
                <i id={this.props.data._id} onClick={this.props.delete} className="fa fa-trash icon-2x"></i>
                <p id='desc'>{this.props.data.description}</p>
                <p id='end-time'>{this.handleTimeConversion()}</p>
            </div>
        )
    } else {
        return (
            <div className='schedule-block' data-aos='fade-zoom-in'>
                <h1 id='event'>{this.props.data.event}</h1>
                <i id={this.props.data._id} onClick={this.props.delete} className="fa fa-trash icon-2x"></i>
                <p id='end-time'>{this.handleTimeConversion()}</p>
            </div>
        )
    }
}
handleTimeConversion = () => {
    let firstHalf = this.props.data.endTime.slice(0,2)
    let secondHalf = this.props.data.endTime.slice(2,5)
    if(firstHalf > 11) {
        if (firstHalf === `12`) {
            return `Finish @ ${firstHalf}:${secondHalf} PM`
        } else {
            firstHalf -= 12
            return `Finish @ ${firstHalf}:${secondHalf} PM`
        }
    } else {
        if (firstHalf === `00`) {
            return `Finish @ 12:${secondHalf} AM`
        } else if (firstHalf === '10' || firstHalf === '11') {
            return `Finish @ ${firstHalf}:${secondHalf} AM`
        }
        return `Finish @ ${firstHalf[1]}:${secondHalf} AM`
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