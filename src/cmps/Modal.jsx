import React, { useState } from "react";
import { utilService } from '../services/util-service';

export function Modal({ setOpenModal, onSaveChanges, userToEdit, isAddMode }) {
    if (isAddMode) {
        userToEdit = {
            id: {
                value: ''
            },
            name: {
                title: '',
                first: '',
                last: ''
            },
            email: '',
            location: {
                city: '',
                country: '',
                street: {
                    name: '',
                    number: ''
                }
            },
            picture: {
                medium: ''
            }
        }
    }
    const [name, setName] = useState(userToEdit.name)
    const [email, setEmail] = useState(userToEdit.email)
    const [location, setLocation] = useState(userToEdit.location)
    const [street, setStreet] = useState(userToEdit.location.street)
    const [isValidCheck, setIsValidCheck] = useState(false)

    const handleNameChange = ev => {
        const { name, value } = ev.target;
        setName(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLocationChange = ev => {
        const { name, value } = ev.target;
        setLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStreetChange = ev => {
        const { name, value } = ev.target;
        setStreet(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onValidateUser = (user) => {
        const { name, email, location } = user
        const { country, city, street } = location
        setIsValidCheck(true)
        if (!name.first || !name.last || !email || !country || !city || !street.name || !street.number) return
        else if (name.first < 3) return
        if (!utilService.validateEmail(email)) return
        onSaveChanges(user)
        setOpenModal(false)
    }

    return (
        <div className="modal-background" onClick={() => { setOpenModal(false) }}>
            <div className="modal-container" onClick={(ev) => { ev.stopPropagation() }}>
                <div className="title-close-btn">
                    <button className="close-btn" onClick={() => { setOpenModal(false) }}>X</button>
                </div>
                <div className="modal-title">
                    <h1>{isAddMode ? 'Add User' : 'Update User'}</h1>
                </div>
                <div className="modal-body">
                    <form className="flex column" onSubmit={() => { onSaveChanges(); setOpenModal(false); }}>
                        <div className="flex">
                            <label>Title:</label>
                            <input
                                type="text"
                                value={name.title}
                                name="title"
                                onChange={handleNameChange}
                                placeholder="Enter your name.."
                            />
                            {isValidCheck && !name.title ? <span className="err">*</span> : ''}
                        </div>
                        <div className="flex">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name.first}
                                name="first"
                                onChange={handleNameChange}
                                placeholder="Enter your name.."
                            />
                            {isValidCheck && !name.first ? <span className="err">*</span> : ''}
                        </div>
                        <div className="flex">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={name.last}
                                name="last"
                                onChange={handleNameChange}
                                placeholder="Enter your name.."
                            />
                            {isValidCheck && !name.last ? <span className="err">*</span> : ''}
                        </div>
                        <div className="flex">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                placeholder="Enter Email.. (israelisraeli@example.com)"
                            />
                            {isValidCheck && !email ? <span className="err">*</span> : ''}
                        </div>
                        <div className=" flex">
                            <label>Country:</label>
                            <input
                                type="text"
                                value={location.country}
                                name="country"
                                onChange={handleLocationChange}
                                placeholder="Enter country.."
                            />
                            {isValidCheck && !location.country ? <span className="err">*</span> : ''}
                        </div>
                        <div className="flex">
                            <label>City:</label>
                            <input
                                type="text"
                                value={location.city}
                                name="city"
                                onChange={handleLocationChange}
                                placeholder="Enter city.."
                            />
                            {isValidCheck && !location.city ? <span className="err">*</span> : ''}
                        </div>
                        <div className="flex">
                            <label>Street Name:</label>
                            <input
                                type="text"
                                value={street.name}
                                name="name"
                                onChange={handleStreetChange}
                                placeholder="Enter street name.."
                            />
                            {isValidCheck && !street.name ? <span className="err">*</span> : ''}
                        </div>
                        <div className="flex">
                            <label>Street Number:</label>
                            <input
                                type="number"
                                value={street.number}
                                name="number"
                                onChange={handleStreetChange}
                                placeholder="Enter street number.."
                            />
                            {isValidCheck && !street.number ? <span className="err">*</span> : ''}
                        </div>
                    </form>
                </div>
                {isValidCheck &&
                    <div className="error-msg">
                        {name.first.length < 3 ? <p>*The length of the name should be at least 3</p> : ''}
                        {!utilService.validateEmail(email) ? <p>*Email address is not valid</p> : ''}
                    </div>
                }
                <div className="modal-footer">
                    <button onClick={() => { setOpenModal(false) }} className=" modal-btns cancel-btn">Cancel</button>
                    <button onClick={() => { onValidateUser({ ...userToEdit, email, name, location: { ...location, street } }); }} className=" modal-btns continue-btn">{isAddMode ? 'ADD' : 'UPDATE'}</button>
                </div>
            </div>
        </div>
    );
}