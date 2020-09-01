import React, { Component } from 'react'

class ScheduleBlock extends Component {
handleDescription = () => {
    if(this.props.data.description) {
        return (
            <div className='schedule-block'>
                <h1>{this.props.data.event}</h1>
                <p>{this.props.data.description}</p>
                <p>{this.props.data.endTime}</p>
            </div>
        )
    } else {
        return (
            <div className='schedule-block'>
                <h1>{this.props.data.event}</h1>
                <p>{this.props.data.endTime}</p>
            </div>
        )
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