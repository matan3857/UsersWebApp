import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setFilterBy } from "../store/user.actions";

function _UserFilter(props) {
    const { filterBy } = props
    const [userFilterBy, setUserFilterBy] = useState(filterBy)

    useEffect(() => {
        props.setFilterBy(userFilterBy)
    }, [userFilterBy]);

    const handleChange = (ev) => {
        const { value, name } = ev.target
        setUserFilterBy(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <form className="user-filter-container" onSubmit={(ev) => { ev.preventDefault(); }}>
            <div className='filter-options'>
                <div className='filter-option'>
                    <input type='search' value={userFilterBy.name} name='name' className="user-input" placeholder='Filter by user name' onChange={handleChange} />
                    <input type='search' value={userFilterBy.email} name='email' className="user-input" placeholder='Filter by user email' onChange={handleChange} />
                    <input type='search' value={userFilterBy.id} name='id' className="user-input" placeholder='Filter by user id' onChange={handleChange} />
                    <input type='search' value={userFilterBy.location} name='location' className="user-input" placeholder='Filter by user location' onChange={handleChange} />
                </div>
            </div>
        </form >
    )
}

function mapStateToProps(state) {
    return {
        filterBy: state.userModule.filterBy,
        users: state.userModule.users
    };
}

const mapDispatchToProps = {
    setFilterBy,
    // loadUsers
};

export const UserFilter = connect(mapStateToProps, mapDispatchToProps)(_UserFilter);
