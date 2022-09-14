import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = '';
  senha = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.authenticate(this.user, this.senha).subscribe(
      () => {
        this.router.navigate(['livros']);
        console.log('logou');
      },
      (error) => {
        const message = error.error;
        console.log(message);
      }
    );
  }
}
