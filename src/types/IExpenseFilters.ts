export interface IExpenseFilters {
  text?: string | undefined;
  minValue?: number | undefined;
  maxValue?: number | undefined;
  categoryId?: number | null | undefined;
}
