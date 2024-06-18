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
    const filteredUsers = data.users.filter((user: User) => user.role !== 'Admin');
    setUsers(filteredUsers);
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
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-300">
                  Delete
                </button>
                <button onClick={() => handleChangeRole(user._id, 'Rédacteur')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-300 ml-2">
                  Make Writer
                </button>
                <button onClick={() => handleChangeRole(user._id, 'Admin')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors duration-300 ml-2">
                  Make Admin
                </button>
                <button onClick={() => handleChangeRole(user._id, 'Visitor')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors duration-300 ml-2">
                  Make Visitor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
