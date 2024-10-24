import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: User | null = null; // Almacena los datos del usuario

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserData(); // Llama a la función para obtener los datos del usuario
  }

  getUserData() {
    // Obtiene el token del almacenamiento local
    const token = localStorage.getItem('token'); // Asegúrate de que el nombre sea el correcto

    // Configura los encabezados para la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Agrega el token a los encabezados
    });

    // Cambia esta URL a la ruta correspondiente de tu API para obtener datos de usuario
    this.http.get<User>('http://localhost:3001/api/user', { headers })
      .subscribe(
        (data) => {
          this.user = data; // Almacena los datos del usuario
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
  }
}
