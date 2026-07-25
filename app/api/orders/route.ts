import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const session = await auth();
        if(!session?.user?.id){
            return NextResponse.json(
                { error: "Please log in to place an order" },
                { status: 401 }
            );
        }

         const body = await request.json();
    const { fullName, phone, address, city, paymentMethod, items, total } = body;

    if (!fullName || !phone || !address || !city || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    }
}