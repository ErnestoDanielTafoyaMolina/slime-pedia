import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) { }

  createUser(userData: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, userData);
  }

  login(credentials: { email: string, password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  isAuthenticated(): boolean {
    console.log("Is authenticated: ", !!localStorage.getItem('token'));
    return !!localStorage.getItem('token'); // Verifica si hay un token en local storage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Obtiene el token
  }
}
