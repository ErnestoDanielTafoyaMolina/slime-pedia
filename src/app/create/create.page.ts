import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  username: string = ''; // Inicializa las variables
  email: string = '';
  password: string = '';
  usernameError: string = ''; // Para mostrar error de username
  emailError: string = ''; // Para mostrar error de email
  passwordError: string = ''; // Para mostrar error de contraseña
  createError: string = ''; // Para mostrar error de creación de usuario

  constructor(private authService: AuthService, private router: Router) {}

  onCreate() {
    // Limpiar errores previos
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.createError = '';

    // Validar campos
    if (!this.username) {
      this.usernameError = 'Username is required.';
    }
    if (!this.email) {
      this.emailError = 'Email is required.';
    } else if (!this.email.includes('@')) {
      this.emailError = 'Email must contain "@" symbol.';
    }
    if (!this.password) {
      this.passwordError = 'Password is required.';
    }

    // Si hay errores, no proceder con la creación
    if (this.usernameError || this.emailError || this.passwordError) {
      return;
    }

    // Crear usuario
    this.authService.createUser({ username: this.username, email: this.email, password: this.password }).subscribe(
      response => {
        console.log('User created successfully', response);
        // Redirigir a login o a donde sea necesario
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error creating user', error);
        this.createError = 'Error creating user. Please try again.'; // Mensaje de error
      }
    );
  }
}
