import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { name_customer, products, invoiceId } = body

  if (!name_customer || !products || products.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
    });
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

  return new Response(JSON.stringify(data), { status: 200 });
  // try {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoice`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name_customer,
  //       products,
  //       invoiceId,
  //     }),
  //   })

  //   if (!response.ok) {
  //     throw new Error('Failed to create invoice');
  //   }

  //   const data = await response.json();
  //   return new Response(JSON.stringify(data), { status: 200 });
  // } catch (error) {
  //   return new Response(JSON.stringify({ error: error.message }), {
  //     status: 500,
  //   });
  // }
}