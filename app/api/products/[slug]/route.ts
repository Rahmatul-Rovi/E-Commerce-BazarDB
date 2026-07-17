import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    {params} : {params: promise<{slug:string}>}
){
  const slug = await params;
  const product = await prisma.product.findUnique({
    where: {slug},
    include: {category: true}
  });
  if(!product){
    return NextResponse.json({error: "Product not Found"}, {status:404});
  }
  return NextResponse.json(product);
}