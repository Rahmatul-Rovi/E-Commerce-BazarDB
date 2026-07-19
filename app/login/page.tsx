import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage(){
const router = useRouter();
const [form , setForm] = useState({email: "", password: ""});
const [error , setError] = useState("");
const [loading , setLoading] = useState(false);
}