import React from 'react'

interface User {
    _id: number;
    firstName: String;
    lastName: String;
    email: String;
    username: String;
}


const UsersPage = async () => {
    const res = await fetch('http://localhost:5000/api/user/all-users')
    const users: User[] = await res.json();


    return (
        <>
            <h1>Users</h1>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.firstName + ' ' + user.lastName}</td>
                        <td>{user.email}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default UsersPage