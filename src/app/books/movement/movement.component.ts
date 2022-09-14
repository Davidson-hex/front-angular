import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { BookServiceService } from '../services/book-service.service';
import { Movement } from '../services/movement';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css'],
})
export class MovementComponent implements OnInit {
  movement!: Movement;
  user!: string;
  show!: boolean;

  constructor(
    private service: BookServiceService,
    private activate: ActivatedRoute,
    private modal: AlertModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.activate.snapshot.params['idUser'];
    this.service.returnLocado().subscribe(
      (result) => {
        this.movement = result;
        this.show = true;
      },
      (error) => {
        if (error.error.status == 404) {
          this.show = false;
        }
      }
    );
  }

  return(id: number) {
    this.service.returnBook(id).subscribe(
      (result) => {
        if (result) {
          this.direct();
          this.modal.showAlertSuccess('Livro devolvido com sucesso!');
        }
      },
      (error) => {
        const message = error.error.text;
        if (message == 'Livro devolvido com sucesso') {
          this.direct();
          this.modal.showAlertSuccess(message);
        } else {
          this.modal.showAlertDanger(message);
        }
      }
    );
  }

  direct() {
    return this.router.navigate(['/livros']);
  }
}
