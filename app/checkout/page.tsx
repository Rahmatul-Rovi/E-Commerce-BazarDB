import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CheckoutPage(){
    const router = useRouter();
    const {data:session, status} = useSession();
    const {items, totalPrice, clearCart} = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "Dhaka",
        paymentMethod: "cod",
    });

    useEffect(()=> {
        setMounted(true);
    }, []);

    useEffect(()=> {
        if(mounted && session?.user){
            setForm((prev) => ({ ...prev, fullName: session.user.name || "" }));
        }
    }, [mounted, session]);

    if (!mounted || status === "loading") return null;
}