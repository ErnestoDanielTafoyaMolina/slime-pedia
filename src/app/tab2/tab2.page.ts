import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Food } from '../interfaces/slime.interface'; // Asegúrate de tener esta interfaz creada

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  foods: Food[] = []; // Aquí almacenarás los datos de la comida

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {
    this.getFoods(); // Llama a la función para obtener los alimentos
  }

  getFoods() {
    this.http.get<{ status: string; foods: Food[] }>('http://localhost:3001/api/food') // Cambia la URL según tu configuración
      .subscribe(
        (data) => {
          console.log("DATOS: ", data);
          if (data.status === 'success') {
            this.foods = data.foods; // Almacena los datos de la comida
          }
        },
        (error) => {
          console.error('Error fetching foods:', error);
        }
      );
  }

  async showFoodInfo(food: Food) {
    const alert = await this.alertController.create({
      header: food.name,
      subHeader: food.type,
      message: `Slime ID: ${food.slimeId}<br>About: ${food.slimepedia.about}<br>Ranch Info: ${food.slimepedia.ranch}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
