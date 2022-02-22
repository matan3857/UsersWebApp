import { UserPreview } from './UserPreview'

export function UserList({ users, setOpenModal, setUserToEdit, setIsAddMode }) {

    return (
        <div className="users-list flex wrap justify-center">
            {users.map((user, idx) => {
                return <UserPreview
                    key={user.id.value}
                    user={user}
                    setOpenModal={setOpenModal}
                    setUserToEdit={setUserToEdit}
                    setIsAddMode={setIsAddMode}
                />
            })}
        </div>
    )
}
