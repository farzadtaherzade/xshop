import { CartItem } from "@/hooks/use-cart";
import { getSession } from "@/lib/dal";
import prisma from "@/lib/db";
import { PayOption, PayResponse } from "@/lib/types";
import axios from "axios";

export async function POST(request: Request) {
  const res = await request.json();
  const items: CartItem[] = res.items;
  const amount: number = res.amount;
  const session = await getSession();
  if (!items || !session) return Response.json({ status: 400 });
  const order = await prisma.order.create({
    data: {
      status: "in progress",
      total: amount,
      userId: session.userId,
      products: {
        connect: items.map(({ id }) => ({ id })),
      },
    },
  });
  const url = "https://pay.ir/pg/send";
  const pay_options: PayOption = {
    api: "test",
    amount: String(amount),
    description: "buy an article",
    redirect: "http://localhost:3000/api/verify",
  };

  console.log(pay_options);

  const { data } = await axios.post(url, pay_options);
  const { status, token }: PayResponse = data;

  console.log(data);
  console.log(token, status);

  if (status == 1 && token) {
    await prisma.payment.create({
      data: {
        amount,
        orderId: order.id,
        userId: session.userId,
        verify: false,
        token,
      },
    });
    return Response.json({
      status,
      url: `https://pay.ir/pg/${token}`,
    });
  }
  return Response.json({ status: 400 });
}
