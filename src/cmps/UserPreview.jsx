import React, { Component } from "react";
import { connect } from "react-redux";
import { onRemoveUser } from '../store/user.actions.js'

function _UserPreview({ user, onRemoveUser, setOpenModal, setUserToEdit, setIsAddMode }) {
    return (
        <section className="user-card flex column">
            <div className="user-img">
                {user.picture &&
                    <img src={`${user.picture.medium}`} alt="user-img" />
                }
            </div>
            <div className="user-info">
                <h3>{user.name.title} {user.name.first} {user.name.last}</h3>
                <h4><span className="decoration">E-mail:</span> {user.email}</h4>
                <p><span className="decoration">Location:</span> <span>{user.location.country}, {user.location.city}, {user.location.street.name} {user.location.street.number}.</span></p>
                <p><span className="decoration">ID:</span> <span>{user.id.value}</span></p>
            </div>
            <div className="user-actions flex justify-center">
                <button className="primary-btn" onClick={() => { setIsAddMode(false); setUserToEdit(user); setOpenModal(true); }}>Edit</button>
                <button className="danger-btn" onClick={() => { onRemoveUser(user.id.value) }}>Delete</button>
            </div>
        </section>
    )
}

const mapDispatchToProps = {
    onRemoveUser
}

export const UserPreview = connect(null, mapDispatchToProps)(_UserPreview);

