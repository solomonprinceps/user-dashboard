import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { MainService } from 'src/app/core/services/main.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-single-loan',
  templateUrl: './single-loan.component.html',
  styleUrls: ['./single-loan.component.scss']
})
export class SingleLoanComponent implements OnInit {
  loanID: any;
  loanData: any;
  loan: any;
  repayments: any;
  showFinanceAlert: boolean;
  constructor(private service: MainService, private title: Title, private activatedRoute: ActivatedRoute, private message: NzMessageService) {
    this.title.setTitle('View Loan');
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.loanID = param.id;
      this.fetchLoanDetails(param.id);
    });
  }

  fetchLoanDetails(loanId) {
    this.service.fetchSingleLoan({loan_id : loanId}).subscribe((data: any) => {
      if (data.status === 'success') {
        this.loanData = data.loan_operation;
        if (this.loanData.status === 'success') {
          this.showFinanceAlert = false;
          this.loan = data.loan_operation.loan;
          this.title.setTitle(`View Loan | ${this.loan.loan_application_id}`);
          this.repayments = data.loan_operation.repayments;
        } else {
          this.showFinanceAlert = true;
        }
      }
    });
  }

  requestRefund() {
    // this.service.requestrefunds(this.loan?.loan_application_id).subscribe((data: any) => {
    //   if (data.status === 'success') {
    //     this.message.create('success', data.message);
    //   }
    // });
  }

  getRepaymentType(methodID) {
    switch (methodID) {
      case 17471:
        return 'Cash Deposit';
      case 17472:
        return 'Refund';
      case 17473:
        return 'Cheque';
      case 17474:
        return 'Remita Salary Platform (RSP)';
      case 17475:
        return 'Online Transfer';
      case 18088:
        return 'System Generated';
      case 20253:
        return 'Direct Debit (Paystack, Remita, Etc)';
      case 38759:
        return 'Deduction from new loan';
      case 39643:
        return 'IPPIS Deduction';
      case 40815:
        return 'Deduction from CW Salary Source';
      case 50019:
        return 'Disbursement in error';
      case 53176:
        return 'Deduction from Deposit Investment';
      case 69509:
        return 'Repayment Transfer"';
      default:
        return 'Cash Deposit';
    }
  }
}
