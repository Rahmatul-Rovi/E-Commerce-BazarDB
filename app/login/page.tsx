"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage(){
const router = useRouter();
const [form , setForm] = useState({email: "", password: ""});
const [error , setError] = useState("");
const [loading , setLoading] = useState(false);

const handleSubmit = async(e: React.FormEvent)=> {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
    });
    setLoading(false);

    if(res?.error){
        setError("Invalid Email or Password");
        return;
    }
    router.push("/");
    router.refresh();
};

}