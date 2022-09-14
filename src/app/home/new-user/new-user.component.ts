import { Router } from '@angular/router';
import { NewUserService } from './new-user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from './new-user';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  public newUserForm!: FormGroup;
  verifyExists!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private newUserService: NewUserService,
    private router: Router,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    if (this.newUserForm.valid) {
      const newUser = this.newUserForm.getRawValue() as NewUser;
      this.newUserService.registerNewUser(newUser).subscribe(
        (result) => {
          this.router.navigate(['']);
        },
        (error) => {
          const message = error.error.title;
          if (message == 'Method argument not valid') {
            const message = 'Password is invalid';
            this.handleError(message);
          } else {
            this.handleError(message);
          }
        }
      );
    }
  }

  handleError(message: string) {
    this.alertService.showAlertDanger(message);
  }
}
