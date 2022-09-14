import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/authentication/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  show: boolean = true;
  name!: string;
  user$ = this.user.returnUser();
  isLogin!: boolean;
  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user.returnUser().subscribe((result) => {
      this.name = result.sub ?? '';
    });
    this.isLogin = this.user.isLogin();
  }

  logout() {
    this.user.logout();
    this.router.navigate(['']);
  }
}
