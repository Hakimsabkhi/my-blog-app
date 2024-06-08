import React from 'react';
import { IUser } from '../models/User';

interface UserListProps {
  users: IUser[];
  onDelete: (userId: string) => void;
  onRoleChange: (userId: string, role: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete, onRoleChange }) => {
  return (
    <div className="container mx-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Role</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border border-gray-200 p-2">{user.email}</td>
              <td className="border border-gray-200 p-2">
                <select
                  value={user.role}
                  onChange={e => onRoleChange(user._id, e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="Visitor">Visitor</option>
                  <option value="Redacteur">Redacteur</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => onDelete(user._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
