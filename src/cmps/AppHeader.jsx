import React from 'react'
import appLogo from '../assets/img/logoNew.svg'

export function AppHeader(props) {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={appLogo} alt="logo" />
            </div>
        </div>
    )
}