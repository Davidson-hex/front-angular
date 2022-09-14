import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Book } from '../services/book';
import { BookServiceService } from '../services/book-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  newBookForm!: FormGroup;
  book!: Book;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookServiceService,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.newBookForm = this.formBuilder.group({
      autor: ['', Validators.required],
      titulo: ['', Validators.required],
    });
  }
  save(): void {
    if (this.newBookForm.valid) {
      const title = this.newBookForm.get('titulo')?.value;
      const author = this.newBookForm.get('autor')?.value;
      this.bookService.addBook(author, title).subscribe(
        (result) => {
          if (result) {
            console.log(result);
            this.alertService.showAlertSuccess('Livro adicionado com sucesso');
            this.router.navigate(['/livros']);
          }
        },
        (error) => {
          this.alertService.showAlertDanger(error.erro.title);
        }
      );
    }
  }
}
