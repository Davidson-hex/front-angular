import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, Books } from './book';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RentComponent } from '../detail/rent/rent.component';
import { Movement, Movements } from './movement';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  bsModalRef?: BsModalRef;
  constructor(
    private http: HttpClient,
    private modalSerivice: BsModalService
  ) {}

  getBooks(): Observable<Books> {
    return this.http.get<Books>(`${API}livros`);
  }

  addBook(autor: string, titulo: string) {
    return this.http.post(`${API}livros`, { autor, titulo });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${API}livros/${id}`);
  }

  putBook(id: number, book: Book) {
    return this.http.put(`${API}livros/${id}`, {
      ativo: book.ativo,
      autor: book.autor,
      dataCriacao: book.dataCriacao,
      id: book.id,
      idUsuarioCadastro: book.idUsuarioCadastro,
      proprietario: book.proprietario,
      titulo: book.titulo,
    });
  }

  deleteBook(id: number) {
    return this.http.delete(`${API}livros/${id}`);
  }

  inactiveBook(id: number) {
    return this.http.get(`${API}inativar/${id}`);
  }

  activeBook(id: number) {
    return this.http.get(`${API}ativar/${id}`);
  }

  showAlert(bookId: number) {
    const bsModalRef: BsModalRef = this.modalSerivice.show(RentComponent);
    bsModalRef.content.bookId = bookId;
  }

  rentBook(id: number, previsao_devolucao: string) {
    return this.http.post(`${API}locar/${id}`, {
      previsao_devolucao: previsao_devolucao,
    });
  }

  returnBook(id: number) {
    return this.http.get(`${API}devolver/${id}`);
  }

  returnMoviment(): Observable<Movements> {
    return this.http.get<Movements>(`${API}umhistorico`);
  }

  returnLocado(): Observable<Movement> {
    return this.http.get<Movement>(`${API}locado`);
  }
}
