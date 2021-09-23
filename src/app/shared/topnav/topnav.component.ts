import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  user: any;
  userInitials: string;
  constructor(private authservice: AuthService, private router: Router) {
    this.user = authservice.getUser() ? JSON.parse(authservice.getUser()) : null;
    this.userInitials = `${this.user.borrower_lastname.slice(0, 1)}${this.user.borrower_firstname.slice(0, 1)}`;

    this.router.events.subscribe(eve => {
      if (eve instanceof NavigationEnd) {
        const mobilemenu = document.getElementById('navbarSupportedContent');
        if (mobilemenu) {
          if(mobilemenu.classList.contains('show')) {
            mobilemenu.classList.toggle('show');
          }
        }
      }
    })
   }

  ngOnInit(): void {
  }

  logOut() {
    this.authservice.logOut().then(() => this.router.navigate(['/login']));
  }

}
