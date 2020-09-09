import React, { Component } from 'react'
import './style.css'

class AddBlock extends Component {
    componentDidMount() {
        this.props.mount()
    }
    render() {
        return (
            <div className={this.props.hide}>
                <button className='add-btn'onClick={this.props.click}>+</button>
            </div>
        )
    }
}
export default AddBlock