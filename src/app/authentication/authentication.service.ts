import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const API = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}
  authenticate(usuario: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post(
        `${API}authenticate`,
        {
          username: usuario,
          password: password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          var authToken = res.headers.get('Authorization') ?? '';
          authToken = authToken.replace("Bearer ", "");
          this.userService.saveToken(authToken);
        })
      );
  }
}
