"use client";

import { useSearchParams } from "next/navigation";

function OrderSuccessContent(){
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
}