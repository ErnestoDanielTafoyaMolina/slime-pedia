import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: import('@angular/router').ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    // Bloquear el acceso a las rutas de login y create si ya está autenticado
    if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'create') {
      if (isAuthenticated) {
        this.router.navigate(['/tabs']); // Redirige a tabs si está autenticado
        return false; // Bloquea el acceso
      }
    } else {
      // Permite el acceso a las tabs solo si está autenticado
      if (!isAuthenticated) {
        this.router.navigate(['/login']); // Redirige al login si no está autenticado
        return false; // Bloquea el acceso
      }
    }

    return true; // Permite el acceso a otras rutas
  }
}
