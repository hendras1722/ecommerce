import prisma from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

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

    const existing = await prisma.product.findUnique({
      where: { id: slug },
    })

    if (!existing) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    const res = await prisma.product.delete({
      where: { id: slug },
    })

    return NextResponse.json({ data: res, message: 'success' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(JSON.stringify({ message: error.message }), {
        status: 400,
      })
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
    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 })
    }

    const body = await request.json()
    const { name_product, price, description, category_id, stock } = body

    if (!name_product || !price || !description || !category_id || !stock) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const existing = await prisma.product.findUnique({
      where: { id: slug },
    })

    if (!existing) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    const res = await prisma.product.update({
      where: { id: slug },
      data: {
        name_product,
        price,
        description,
        category_id,
        stock,
      },
    })

    return NextResponse.json({ data: res, message: 'success' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(JSON.stringify({ message: error.message }), {
        status: 400,
      })
    }
  }
}
