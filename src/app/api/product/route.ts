import prisma from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log(searchParams.get('name_product'),searchParams.get('page'))
    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '10', 10)

    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          name_product: {
            contains: searchParams.get('name_product') ?? '',
            mode: 'insensitive',
          },
          category_id: {
            contains: searchParams.get('category_id') ?? '',
            mode: 'insensitive',
          },
        },
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          name_product: true,
          price: true,
          description: true,
          stock: true,
          category_id: true,
          created_at: true,
          updated_at: true,
          category: {
            select: {
              id: true,
              name_category: true,
            },
          },
        }
      }),
      prisma.product.count(),
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(JSON.stringify({ message: error.message }), {
        status: 400,
      })
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json()
    console.log(res)
    const data = await prisma.product.create({ data: res })
    if (data) {
      return NextResponse.json({ data: data, message: 'success' }, { status: 200 })
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(JSON.stringify({ message: error.message }), {
        status: 400,
      })
    }
  }
}
