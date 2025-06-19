import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '10', 10)

    const skip = (page - 1) * limit
   
    const [data, total] = await Promise.all([
      prisma.category.findMany({
        where: {
          name_category: {
            contains: searchParams.get('name_category') ?? '',
            mode: 'insensitive',
          },
        },
        skip,
        take: limit,
      }),
      prisma.category.count(),
    ])
  
    return NextResponse.json(
      {
        data: data,
        message: 'success',
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {
        status: 400,
      })
    }
  }
}

export async function POST(request: NextRequest){
  try {
    const data = await request.json()
    const res = await prisma.category.create({ data })
  
    return NextResponse.json({ data: res, message: 'success' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {
        status: 400,
      })
    }
  }
}