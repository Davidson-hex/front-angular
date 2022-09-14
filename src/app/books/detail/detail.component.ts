import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserService } from 'src/app/authentication/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Book } from '../services/book';
import { BookServiceService } from '../services/book-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  livro!: Observable<Book>;
  bookId!: number;
  book!: Book;
  user!: string;
  constructor(
    private activatedRouter: ActivatedRoute,
    private bookService: BookServiceService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.bookId = this.activatedRouter.snapshot.params['bookId'];
    this.livro = this.bookService.getBook(this.bookId);
    this.bookService.getBook(this.bookId).subscribe((result) => {
      this.book = result;
    });
    this.userService.returnUser().subscribe((result) => {
      this.user = result.sub ?? '';
    });
  }

  previousState(): void {
    window.history.back();
  }

  delete() {
    this.bookService.deleteBook(this.bookId).subscribe(
      (result) => {
        this.router.navigate(['/livros']);
      },
      (error) => {
        const message = error.error.title;
        this.alertService.showAlertDanger(message);
      }
    );
  }

  active() {
    this.bookService.activeBook(this.bookId).subscribe(
      (result) => {
        this.alertService.showAlertSuccess('Livro ativado com sucesso');
      },
      (error) => {
        const text = 'Livro ativado com sucesso';
        const message = error.error.text;
        if (message == text) {
          this.alertService.showAlertSuccess(message);
          this.onRefresh();
        } else {
          this.alertService.showAlertDanger(message);
        }
      }
    );
  }

  inactive() {
    this.bookService.inactiveBook(this.bookId).subscribe(
      (result) => {
        console.log('result :', result);
        this.alertService.showAlertSuccess('inativado');
        this.onRefresh();
      },
      (error) => {
        const message = 'Livro inativado com sucesso';
        const err = error.error.text;
        if (err === message) {
          this.alertService.showAlertSuccess(err);
          this.onRefresh();
        } else {
          this.alertService.showAlertDanger(err);
        }
      }
    );
  }

  onRefresh() {
    return (this.livro = this.bookService.getBook(this.bookId));
  }

  rent() {
    this.bookService.showAlert(this.bookId);
  }
}
