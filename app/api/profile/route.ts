import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const session = await auth();

    if(!session?.user?.id){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const {name, phone} = await request.json();
        if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
        where: {id: session.user.id},
        data: {name, phone: phone || null},
    });
    return NextResponse.json({
        message: "Profile updated successfully",
        user: { name: updatedUser.name, phone: updatedUser.phone },
    });
    }catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
    const session = await auth();

    if(!session?.user?.id){
        return NextResponse.json({error: "Unauthorized"}, {status:401});
    }
}
