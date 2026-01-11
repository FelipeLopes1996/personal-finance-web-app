export interface Expense {
  id: number;
  name: string;
  description: string;
  value: number;
  categoryId: number;
}

export interface ICreateExpense {
  name: string;
  description?: string;
  value: number;
}
