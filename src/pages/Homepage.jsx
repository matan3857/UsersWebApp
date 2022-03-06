import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { onUpdateUser, onAddUser } from "../store/user.actions";
import { loadUsers, filterUsers } from "../services/user.service";
import { UserList } from '../cmps/UserList';
import { Modal } from "../cmps/Modal";
import { LoaderSpinner } from "../cmps/LoaderSpinner"
import { UserFilter } from "../cmps/UserFilter"
import { userService } from '../services/user.service';

export function _Homepage(props) {
  const { users, filterBy } = props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await props.loadUsers()
    }
    if (!users.length) fetchData()
  }, []);

  const onSaveChanges = (user) => {
    isAddMode ? props.onAddUser(user) : props.onUpdateUser(user)
  }

  const onAddNewUser = () => {
    setIsAddMode(true)
    setIsModalOpen(true)
  }

  const filteredUsers = userService.filterUsers(users , filterBy)

  return (
    <section className="home-page">
      <UserFilter />
      <button className="light-btn" onClick={onAddNewUser}>Add new user</button>
      {!users || !users.length ?
        <LoaderSpinner />
        :
        <>
          <UserList users={filteredUsers} setOpenModal={setIsModalOpen} setUserToEdit={setUserToEdit} setIsAddMode={setIsAddMode} />
        </>
      }
      {isModalOpen && <Modal setOpenModal={setIsModalOpen} onSaveChanges={onSaveChanges} userToEdit={userToEdit} isAddMode={isAddMode} />}
    </section>
  )
}

function mapStateToProps(state) {
  return {
    users: state.userModule.users,
    filterBy: state.userModule.filterBy,
  };
}

const mapDispatchToProps = {
  loadUsers,
  onUpdateUser,
  onAddUser
};

export const Homepage = connect(mapStateToProps, mapDispatchToProps)(_Homepage);