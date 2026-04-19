export type PaymentMethod = "PIX" | "CREDITO" | "DEBITO" | "DINHEIRO";

export interface IExpense {
  id: number;
  name: string;
  description?: string;
  value: number | string;
  categoryId?: number;
  cateroryName?: string;
  date?: string;
  paymentMethod?: PaymentMethod;
  nameCard?: string;
}

export interface ICreateOrEditExpense {
  id?: number;
  name: string;
  description?: string;
  value: number;
  categoryId?: number | null;
  localDate?: string;
  paymentMethod: PaymentMethod;
  nameCard?: string;
}
