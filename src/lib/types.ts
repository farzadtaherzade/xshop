export interface ImageJson {
  key: string;
  url: string;
  name: string;
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
