"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Params {
  params: {
    userId: string;
  };
}

const UserPage = ({ params }: Params) => {
  const { userId } = params;
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data.user);
    };
    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Details</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={() => router.push('/admin/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default UserPage;
