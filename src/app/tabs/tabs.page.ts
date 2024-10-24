import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importar AlertController

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  async onLogout() {
    // Crear alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Confirmar Logout',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Cancelado logout'); // Manejar cancelación
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Llama al método de logout en el servicio de autenticación
            this.authService.logout().subscribe(() => {
              // Limpia el token y redirige al login
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }, error => {
              console.error('Logout failed', error);
              // Manejar error de logout si es necesario
            });
          }
        }
      ]
    });

    await alert.present(); // Presentar la alerta
  }
}
