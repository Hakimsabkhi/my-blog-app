"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session || !session.user || session.user.role !== 'Admin') {
      router.push('/auth/signin');
    } else {
      fetchUsers();
    }
  }, [session, status]);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data.users);
  };

  const handleDeleteUser = async (userId: string) => {
    await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    });
    fetchUsers();
  };

  if (status === 'loading' || !session || !session.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                <button onClick={() => handleChangeRole(user._id, 'Rédacteur')}>Make Writer</button>
                <button onClick={() => handleChangeRole(user._id, 'Admin')}>Make Admin</button>
                <button onClick={() => handleChangeRole(user._id, 'Visitor')}>Make Visitor</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
