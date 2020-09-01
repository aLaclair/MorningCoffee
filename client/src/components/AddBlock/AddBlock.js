import React, { Component } from 'react'
import './style.css'

class AddBlock extends Component {
    componentDidMount() {
        this.props.mount()
    }
    render() {
        return (
            <div className='add-block'>
                <button className='add-btn'>+</button>
            </div>
        )
    }
}
export default AddBlock