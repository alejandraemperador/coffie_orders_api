export type StatusLoan = 'borrowed' | 'returned';

export interface Loan {
  id: number;
  student: string;
  equipment: string;
  status: StatusLoan;
}
