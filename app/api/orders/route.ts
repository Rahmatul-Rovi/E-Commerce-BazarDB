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

        
    }
}