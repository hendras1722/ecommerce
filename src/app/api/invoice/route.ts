import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.invoice.findMany({
      include: {
        invoiceProducts: {
          include: {
            product: true,
          },
        },
      },
    })
    return NextResponse.json(
      {
        data: data,
        message: 'success',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}   

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name_customer, products, invoiceId } = body

  if (!name_customer || !products || products.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
    })
  }

  const data = prisma.invoice.create({
    data: {
      invoiceProducts: products.map((product: any) => ({
        productId: product.id,
        name_customer: name_customer,
        invoiceId: invoiceId,
      })),
    },
  })

  return NextResponse.json(
    {
      data: data,
      message: 'success',
    },
    { status: 200 }
  )
}