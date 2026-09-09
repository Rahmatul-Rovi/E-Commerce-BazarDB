

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

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

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500 text-sm">Loading users...</p>;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Users</h1>
      <p className="text-gray-500 text-sm mb-6">{users.length} registered users</p>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <Users size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No users yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[650px]">
            <thead className="bg-surface text-gray-500 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Orders</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-800">{user.name}</td>
                  <td className="px-5 py-3 text-gray-500">{user.email}</td>
                  <td className="px-5 py-3 text-gray-500">{user.phone || "—"}</td>
                  <td className="px-5 py-3">{user._count.orders}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                        user.role === "admin"
                          ? "bg-primary-light text-primary-dark"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}