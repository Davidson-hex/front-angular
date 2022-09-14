import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/authentication/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { BookServiceService } from '../../services/book-service.service';
import { dateValidator } from './date.validator';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  dateForm!: FormGroup;
  userName!: string;
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private bookService: BookServiceService,
    private alertService: AlertModalService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      date: ['', [dateValidator, Validators.required]],
    });
    this.userService.returnUser().subscribe((result) => {
      this.userName = result.sub ?? '';
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  onConfirm() {
    const date = this.dateForm.get('date')?.value;
    const dateMoment = moment(date, 'YYYY/MM/DD');
    const dateFormated: string = `${dateMoment.year()}/${
      dateMoment.month() + 1
    }/${dateMoment.date()}`;
    const id = this.bsModalRef.content.bookId;
    this.bookService.rentBook(id, dateFormated).subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['/livros', this.userName, 'movimentacao']);
          this.alertService.showAlertSuccess('Livro alugado com sucesso');
          this.bsModalRef.hide();
        }
      },
      (error) => {
        const message = error.error.text;
        if (message != 'Você já possui um livro alugado') {
          this.router.navigate(['/livros', this.userName, 'movimentacao']);
          this.alertService.showAlertSuccess(message);
          this.bsModalRef.hide();
        } else {
          this.alertService.showAlertDanger(message);
        }
      }
    );

    /*
      .subscribe(
        (result) => {
          if (result) {
            this.router.navigate(['/livros']);
          }
        },
        (error) => {
          this.bsModalRef.hide();
          this.alertService.showAlertDanger(error.error);
        }
      )
      */
  }
}
