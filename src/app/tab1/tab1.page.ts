import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Slime } from '../interfaces/slime.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  slimes: Slime[] = [];

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {
    this.getSlimes();
  }

  getSlimes() {
    this.http.get<{ status: string; slimes: Slime[] }>('http://localhost:3001/api/slimes')
      .subscribe(
        (data) => {
          console.log("DATOS: ",data);
          if (data.status === 'success') {
            this.slimes = data.slimes;
          }
        },
        (error) => {
          console.error('Error fetching slimes:', error);
        }
      );
  }

  async showSlimeInfo(slime: Slime) {
    const alert = await this.alertController.create({
      header: slime.name,
      subHeader: slime.type,
      message: `Diet: ${slime.diet}<br>Favourite Food: ${slime.favouriteFood}<br>Slimeology: ${slime.slimepedia.slimeology}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
