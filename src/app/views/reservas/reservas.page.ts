import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {

  currentDate: string;
  constructor(private navCtrl: NavController) {
    this.currentDate = new Date().toDateString();
  }


  irParaLogin() {
    this.navCtrl.navigateForward('/login');
  }

  submitReserva() {
    // Lógica para enviar a reserva

  }




}

