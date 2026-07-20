import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterPage(){
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
}