import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = await params
  try {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '10', 10)

    if (slug.slug) {
      const [data, total] = await Promise.all([
        prisma.category.findUnique({
          where: {
            id: slug.slug ?? '',
          },
        }),
        prisma.category.count(),
      ])
      return NextResponse.json(
        {
          data: data ?? {},
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
    } else {
      throw new Error('slug not found')
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 400,
        }
      )
    }
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slugParams = await params
  try {
    const slug = slugParams.slug
    const data = await request.json()

    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 })
    }

    const existing = await prisma.category.findUnique({
      where: { id: slug },
    })

    if (!existing) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    const res = await prisma.category.update({
      where: { id: slug },
      data: {
        name_category: data.name_category ?? '',
      },
    })

    return NextResponse.json({ data: res, message: 'success' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 400,
        }
      )
    }
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slugParams = await params
  try {
    const slug = slugParams.slug

    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 })
    }

    const existing = await prisma.category.findUnique({
      where: { id: slug },
    })

    if (!existing) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    await prisma.category.delete({
      where: { id: slug },
    })

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 400,
        }
      )
    }
  }
}