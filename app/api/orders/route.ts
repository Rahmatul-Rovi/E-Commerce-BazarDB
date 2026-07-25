import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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

    const order = await prisma.order.create({
        data: {
            userId: session.user.id,
            fullName,
            phone,
            address,
            city,
            paymentMethod: paymentMethod || "cod",
        total,
        status: "pending",
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
    },
    include: {items: true},
    });
     return NextResponse.json(
      { message: "Order placed successfully", orderId: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}