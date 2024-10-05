import { JsonValue } from "@prisma/client/runtime/library";

export interface ImageJson {
  key: string;
  url: string;
  name: string;
}

export interface EditProduct {
  title: string;
  description: string;
  price: number;
  published: boolean;
  slug: string;
  images: JsonValue[];
}

export interface PayOption {
  api: string;
  amount: string;
  description: string;
  redirect: string;
  mobile?: string;
}

export interface PayResponse {
  status: number;
  token: string;
}

export interface PayVerifyResponse {
  status?: number;
  transId?: number;
  factorNumber?: string;
  mobile?: string;
  description?: string;
  cardNumber?: string;
  message?: string;
}
