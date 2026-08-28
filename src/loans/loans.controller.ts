import {
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import type { StatusLoan } from './loans.interface';
import { CreateLoanDto } from './dto/create-loans.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  getAllLoans(@Query('status') status?: StatusLoan) {
    if (status) {
      return this.loansService.filterLoansByStatus(status);
    }
    return this.loansService.getAllLoans();
  }

  @Get(':id')
  getLoandByID(@Param('id') id: string) {
    return this.loansService.getLoanById(Number(id));
  }

  @Post()
  createLoan(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.createLoan(createLoanDto);
  }

  @Delete(':id')
  deleteSpecificLoan(@Param('id') id: string) {
    return this.loansService.deleteSpecificLoan(Number(id));
  }

  @Patch(':id')
  returnLoan(@Param('id') id: string) {
    return this.loansService.returnLoan(Number(id));
  }
}
