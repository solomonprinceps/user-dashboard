import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../core/services/auth.service';
import { MainService } from '../core/services/main.service';


function toggleAllButtonsDisable(value) {
  const buttons: any = document.getElementsByTagName('button');
  for (const button of buttons) {
    button.disabled = value;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren('pageModal') pageModals: QueryList<NzModalRef>;
  dashboardData: any;
  openLoan: any;
  email: any;
  liquidateModal: boolean;
  letterModal: boolean;
  showEmailError: boolean;
  letterType: string;
  todayDate = new Date().toDateString();
  user: any;
  repayments: any;
  constructor(private service: MainService,
    private title: Title,
    private authService: AuthService, private message: NzMessageService, private notification: NzNotificationService) {
    this.user = authService.getUser() ? JSON.parse(authService.getUser()) : null;
    this.title.setTitle('Dashboard');
  }

  ngOnInit(): void {
    this.fetchDashboard();
  }

  ngAfterViewInit(): void {
    if (this.pageModals.toArray().length) {
      this.pageModals.toArray().forEach(modal => {
        modal.afterOpen.subscribe(() => {
          toggleAllButtonsDisable(false);
        });
      });
    }
  }

  fetchDashboard() {
    this.service.fetchDashboard().subscribe((data: any) => {
      if (data.status === 'success') {
        this.dashboardData = data;
        this.openLoan = data.open_loan;
        this.repayments = data.repayments;
      }
    });
  }

  closeLiquidateModal() {
    this.liquidateModal = false;
    this.email = null;
    this.showEmailError = false;
  }

  closeLetterModal() {
    this.letterModal = false;
    this.email = null;
    this.showEmailError = false;
  }

  liquidateLoan() {
    if (this.dashboardData.open_loans_count < 1) {
      return this.notification.info('No Open Loan!', 'Can only liquidate if you have an open loan');
    } else {
      this.liquidateModal = true;
    }
  }

  processLiquidation() {
    const liquidateData = {
      loanid: this.openLoan.loan_application_id,
      email: this.email
    };
    if (!this.email) {
      this.showEmailError = true;
    } else {
      this.service.liquidateLoan(liquidateData).subscribe((data: any) => {
        if (data.status === 'success') {
          this.message.success(data.message);
          this.closeLiquidateModal();
        }
      });
    }
  }

  openLetterModal(type: string) {
    this.letterType = type;
    if (this.letterType === 'non-indebtedness') {
      this.getLetter();
    } else {
      this.letterModal = true;
    }
  }

  getLetter() {
    if (this.dashboardData.open_loans_count > 0) {
      return this.notification.info('You have an open loan!', 'Can not get letter of non indebtedness as you currently have an open loan');
    } else {
      this.letterModal = true;
    }
  }

  processLetter() {
    const letterData = {
      loanid: this.openLoan.loan_application_id,
      email: this.email
    };
    if (!this.email) {
      this.showEmailError = true;
    } else {
      const type = this.letterType.replace('-', '').trim().toLowerCase();
      this.service.processLetter(letterData, type).subscribe((data: any) => {
        if (data.status === 'success') {
          this.message.success(data.message);
          this.closeLetterModal();
        }
      });
    }
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
