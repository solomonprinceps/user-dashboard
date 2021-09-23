import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { banks } from 'src/app/banks';
import { AuthService } from 'src/app/core/services/auth.service';
import { MainService } from 'src/app/core/services/main.service';
import { tenors } from 'src/app/duration';

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.scss']
})
export class NewLoanComponent implements OnInit {
  newLoanForm: FormGroup;
  tenors = tenors;
  step = 1;
  loanBreakdown: any;
  isLoading: boolean;
  user: any;
  constructor(private fb: FormBuilder, private title: Title, private service: MainService, private authService: AuthService) {
    this.user = authService.getUser() ? JSON.parse(authService.getUser()) : null;
    this.title.setTitle('New Loan');
  }

  ngOnInit(): void {
    this.newLoanForm = this.fb.group({
      amount: [null, Validators.required],
      tenor: [null, Validators.required]
    });
  }

  calculateRepaymentForm() {
    Object.keys(this.newLoanForm.controls).forEach(key => {
      this.newLoanForm.controls[key].markAllAsTouched();
      this.newLoanForm.controls[key].updateValueAndValidity();
    });
    if (this.newLoanForm.valid) {
      this.loanBreakdown = null;
      this.isLoading = true;
      this.newLoanForm.disable();
      this.service.calcRepayment(this.newLoanForm.value).subscribe((data: any) => {
        this.isLoading = false;
        this.newLoanForm.enable();
        if (data.status === 'success') {
          this.loanBreakdown = { ...data, ...this.newLoanForm.value };
          // this.service.setLoanDetails(this.loanBreakdown);
          this.step = 2;
        }
      }, error => {
        this.newLoanForm.enable();
        this.isLoading = false;
      });
    }

  }

  getBankCode(value) {
    if (value) {
      const foundbank = banks.find(bank => bank.name.toLowerCase() === value);
      if (foundbank) {
        return foundbank.bankcode;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  submitApplication() {
    const loan = {
      firstname: this.user.borrower_firstname,
      lastname: this.user.borrower_lastname,
      gender: this.user.borrower_gender,
      title: this.user.borrower_title,
      email: this.user.borrower_email,
      telephone: this.user.borrower_mobile,
      house_address: this.user.borrower_address,
      city: this.user.borrower_city,
      state: this.user.borrower_province,
      place_of_work: this.user.borrower_business_name,
      ippisnumber: this.user.custom_field_1135,
      salary_bank_account: this.getBankCode(this.user.custom_field_1168.toLowerCase()),
      salary_bank_name: this.user.custom_field_1169,
      loan_amount: this.loanBreakdown.loan_amount,
      monthly_repayment: this.loanBreakdown.monthlyrepayment,
      tenor: this.loanBreakdown.loanTenor,
      dob: this.user.borrower_dob,
    };
    this.service.loanApply(loan).subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === 'success') {
        this.step = 3;
      }
    }, () => {
      this.isLoading = false;
      this.step = 3;
    });
  }
}
