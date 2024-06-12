import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users'); 
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleBanUser = async (userId) => {
        try {
            await axiosPrivate.put(`/users/${userId}/ban`); 
            setUsers(users.map(user => user.userId === userId ? { ...user,  accountNonLocked: false } : user));
        } catch (error) {
            console.error('Error banning user:', error);
        }
    };

    return (
        <div>
            <h1>User List</h1>
            <table className="user-list-table table-bordered">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {!user.banned && (
                                    <Button variant="danger" onClick={() => handleBanUser(user.userId)}>Ban</Button>
                                )}
                                {user.banned && <span>User Banned</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
