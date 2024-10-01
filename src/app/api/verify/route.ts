import { getSession } from "@/lib/dal";
import prisma from "@/lib/db";
import { PayVerifyResponse } from "@/lib/types";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const status: number = request.nextUrl.searchParams.get(
    "status"
  ) as unknown as number;
  const token = request.nextUrl.searchParams.get("token");
  const session = await getSession();
  if (status == 0 || !token || !session)
    return Response.redirect("http://localhost:3000/payment/error");

  const url = "https://pay.ir/pg/verify";
  const payment = await prisma.payment.findFirst({
    where: {
      token: token,
      verify: false,
    },
  });

  if (!payment) return Response.redirect("http://localhost:3000/payment/error");
  const order = await prisma.order.findUnique({
    where: {
      id: payment.orderId,
      userId: session.userId,
    },
  });

  const verifyBody = {
    api: "test",
    token,
  };

  const { data } = await axios.post(url, verifyBody);
  const verifyResult: PayVerifyResponse = data;
  console.log(verifyResult);
  if (verifyResult.status == 1) {
    const paymentUpdate = await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        transId: verifyResult.transId,
        verify: true,
      },
    });
    const orderUpdate = await prisma.order.update({
      where: {
        id: order?.id,
      },
      data: {
        status: "success",
      },
    });

    return Response.redirect("http://localhost:3000/payment/success");
  } else {
    return Response.redirect("http://localhost:3000/payment/error");
  }
}
