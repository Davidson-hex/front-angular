import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/authentication/user.service';
import { BookServiceService } from '../../services/book-service.service';
import { Movements } from '../../services/movement';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent implements OnInit {
  movement!: Movements;
  user!: string;
  show!: boolean;
  constructor(
    private bookService: BookServiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.returnUser().subscribe((result) => {
      this.user = result.sub ?? '';
    });
    this.bookService.returnMoviment().subscribe(
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
}
