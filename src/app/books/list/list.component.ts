import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/authentication/user.service';
import { Books } from '../services/book';
import { BookServiceService } from '../services/book-service.service';

import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  books!: Books;
  user!: string;

  constructor(
    private bookService: BookServiceService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((result) => {
      this.books = result;
    });
    this.userService.returnUser().subscribe((result) => {
      this.user = result.sub ?? '';
    });
  }

  refresh(): void {
    this.bookService.getBooks().subscribe((result) => {
      this.books = result;
    });
  }
  delete(id: number) {
    this.bookService.deleteBook(id).subscribe(
      (result) => {
        this.refresh();
      },
      (error) => {
        const message = error.error.title;
        this.alertService.showAlertDanger(message);
      }
    );
  }
}
