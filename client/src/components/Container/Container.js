import React from 'react'
import Navbar from '../Nav/Navbar'
import './style.css'
import Break from '../Break/Break'
import AddBlock from '../AddBlock/AddBlock'
import LoginButton from '../Login/LoginButton/LoginButton'
import LoginModal from '../Login/LoginModal/LoginModal'

const Container = () => {
    return (<div className='container'>
        <Navbar />
        <Break />
        <LoginButton />
    </div>)
}
export default Container