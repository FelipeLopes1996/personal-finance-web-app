export interface IExpense {
  id: number;
  name: string;
  description?: string;
  value: number;
  categoryId?: number;
  cateroryName?: string;
}

export interface ICreateOrEditExpense {
  id?: number;
  name: string;
  description?: string;
  value: number;
  categoryId?: number | null;
}
