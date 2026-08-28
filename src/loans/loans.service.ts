import { Injectable, NotFoundException } from '@nestjs/common';
import { Loan } from './loans.interface';
import { StatusLoan } from './loans.interface';
import { CreateLoanDto } from './dto/create-loans.dto';

@Injectable()
export class LoansService {
  private loans: Loan[] = [
    { id: 1, student: 'Alejandra', equipment: 'Laptop', status: 'borrowed' },
    { id: 2, student: 'Mateo', equipment: 'Tablet', status: 'returned' },
    { id: 3, student: 'Laura', equipment: 'Camera', status: 'borrowed' },
    { id: 4, student: 'Santiago', equipment: 'Projector', status: 'returned' },
  ];

  getAllLoans(): Loan[] {
    return this.loans;
  }

  filterLoansByStatus(status: StatusLoan): Loan[] {
    return this.loans.filter((loan) => loan.status === status);
  }

  getLoanById(id: number): Loan {
    const loan = this.loans.find((loan) => loan.id === id);

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return loan;
  }

  createLoan(createLoanDto: CreateLoanDto): Loan {
    const newLoan: Loan = {
      id: this.loans.length + 1,
      student: createLoanDto.student,
      equipment: createLoanDto.equipment,
      status: 'borrowed',
    };

    this.loans.push(newLoan);

    return newLoan;
  }

  deleteSpecificLoan(id: number): Loan {
    const loanIndex = this.loans.findIndex((loan) => loan.id !== id);

    if (loanIndex === -1) {
      throw new NotFoundException('Loan not found');
    }

    const deletedLoan = this.loans[loanIndex];

    this.loans.splice(loanIndex, 1);

    return deletedLoan;
  }

  returnLoan(id: number): Loan {
    const loan = this.loans.find((loan) => loan.id === id);

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    loan.status = 'returned';

    return loan;
  }
}
