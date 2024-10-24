import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { Token } from '../interfaces/token.interface'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = ''; // Inicializa las variables
  password: string = '';
  emailError: string = ''; // Para mostrar error de email
  passwordError: string = ''; // Para mostrar error de contraseña
  loginError: string = ''; // Para mostrar error de inicio de sesión

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // Limpiar errores previos
    this.emailError = '';
    this.passwordError = '';
    this.loginError = '';

    // Validar campos
    if (!this.email) {
      this.emailError = 'Email is required.';
    } else if (!this.email.includes('@')) {
      this.emailError = 'Email must contain "@" symbol.';
    }

    if (!this.password) {
      this.passwordError = 'Password is required.';
    }

    // Si hay errores, no proceder con el login
    if (this.emailError || this.passwordError) {
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: Token) => {
        console.log('Login successful', response);
        // Almacena solo el token
        localStorage.setItem('token', response.token);
        // Redirige a las tabs
        this.router.navigate(['/tabs']);
      },
      (error) => {
        console.error('Login failed', error);
        // Manejar error (mostrar un mensaje, etc.)
        this.loginError = 'Invalid email or password.'; // Mensaje de error
      }
    );
  }
}
