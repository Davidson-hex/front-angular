import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { Book } from '../services/book';
import { BookServiceService } from '../services/book-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  bookId!: number;
  book!: Book;
  livro!: Observable<Book>;
  editForm!: FormGroup;
  autor: string = '';
  titulo: string = '';
  id!: number;

  constructor(
    private activatedRouter: ActivatedRoute,
    private bookService: BookServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.activatedRouter.snapshot.params['bookId'];
    console.log(this.bookId);
    this.livro = this.bookService.getBook(this.bookId);
    this.bookService.getBook(this.bookId).subscribe((result) => {
      this.book = result;
      console.log(result);
      this.autor = result.autor ?? '';
      this.titulo = result.titulo ?? '';
      this.id = result.id ?? 0;
    });
  }

  save(): void {
    const livro = {
      ativo: this.book.ativo,
      autor: this.autor,
      dataCriacao: this.book.dataCriacao,
      id: this.id,
      idUsuarioCadastro: this.book.idUsuarioCadastro,
      proprietario: this.book.proprietario,
      titulo: this.titulo,
    };
    this.bookService.putBook(this.bookId, livro).subscribe((result) => {
      if (result) {
        this.router.navigate(['/livros']);
      }
    });
  }
}
