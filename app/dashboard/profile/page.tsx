"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const {data : session} = useSession();

    return(
        <div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Profile</h1>
      <p className="text-gray-500 text-sm mb-6">Your account information.</p>

      <div className="bg-surface rounded-2xl p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary text-white font-semibold flex items-center justify-center text-xl">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div></div>
        </div>
    )
}