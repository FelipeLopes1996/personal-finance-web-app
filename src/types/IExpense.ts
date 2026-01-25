export interface IExpense {
  id: number;
  name: string;
  description?: string;
  value: number | string;
  categoryId?: number;
  cateroryName?: string;
  date?: string;
}

export interface ICreateOrEditExpense {
  id?: number;
  name: string;
  description?: string;
  value: number;
  categoryId?: number | null;
  date?: string;
}
