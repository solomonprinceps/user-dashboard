import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss']
})
export class AllLoansComponent implements OnInit {
  loans: any;
  constructor(private service: MainService, private title: Title) { 
    this.title.setTitle('All Loans');
  }

  ngOnInit(): void {
    this.fetchAllLoans();
  }

  fetchAllLoans() {
    this.service.viewAllLoans().subscribe((data: any) => {
      if (data.status === 'success') {
        this.loans = data.loans;
      }
    });
  }
}
