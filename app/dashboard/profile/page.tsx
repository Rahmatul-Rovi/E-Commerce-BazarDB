"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Pencil, X, Check, Mail, Phone, Calendar } from "lucide-react";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: "", phone: "", createdAt: "" });
  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name: data.name || "",
          phone: data.phone || "",
          createdAt: data.createdAt || "",
        });
        setForm({ name: data.name || "", phone: data.phone || "" });
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: data.error || "Something went wrong",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }

    setProfile({ ...profile, name: form.name, phone: form.phone });
    setEditing(false);

    await update({ name: form.name });

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      showConfirmButton: false,
      timer: 1300,
      customClass: { popup: "rounded-2xl" },
    });
  };

  const handleCancel = () => {
    setForm({ name: profile.name, phone: profile.phone });
    setEditing(false);
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Profile</h1>
      <p className="text-gray-500 text-sm mb-6">Manage your account information.</p>

      <div className="bg-surface rounded-2xl p-6 max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary text-white font-semibold flex items-center justify-center text-2xl shadow-sm">
                {profile.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="font-heading font-semibold text-lg text-gray-900">
                {profile.name}
              </p>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:bg-primary-light px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              <Pencil size={14} />
              Edit
            </button>
          )}
        </div>

        {/* Info / Edit form */}
        {editing ? (
          <div className="space-y-4 bg-white rounded-2xl p-5 border border-gray-100">
            <div>
              <label className="text-xs text-gray-500 font-medium">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Add phone number"
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                <Check size={15} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <X size={15} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="text-sm text-gray-800">{session?.user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
              <Phone size={16} className="text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="text-sm text-gray-800">
                  {profile.phone || <span className="text-gray-400">Not added</span>}
                </p>
              </div>
            </div>

            {profile.createdAt && (
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
                <Calendar size={16} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Member Since</p>
                  <p className="text-sm text-gray-800">
                    {new Date(profile.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}