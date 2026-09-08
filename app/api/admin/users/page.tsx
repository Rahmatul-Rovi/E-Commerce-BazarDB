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

      })
    })
}