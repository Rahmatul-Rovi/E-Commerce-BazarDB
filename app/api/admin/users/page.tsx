"use client";

import { useEffect, useState } from "react";

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  _count: { orders: number };
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
      fetch("/api/admin/users")
      .then((res)=> res.json())
      .then((data)=> {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    }, []);

     if (loading) return <p className="text-gray-500 text-sm">Loading users...</p>;

     return(
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Users</h1>
      <p className="text-gray-500 text-sm mb-6">{users.length} registered users</p>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <Users size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No users yet.</p>
        </div>
      )
      </div>
     )
}