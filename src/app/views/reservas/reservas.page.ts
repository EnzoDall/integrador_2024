import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';  // Adicione esta linha

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {

  currentDate: string;
  reserva: any = {
    nome: '',
    email: '',
    numeroPessoas: null,
    data: '',
    horario: '',
    tipoMesa: ''
  };

  constructor(private navCtrl: NavController, private firebaseService: FirebaseService) {  // Adicione private firebaseService: FirebaseService

    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  irParaLogin() {
    this.navCtrl.navigateForward('/login');
  }

  submitReserva() {
    this.firebaseService.addReserva(this.reserva)
      .then(() => {
        console.log('Reserva adicionada com sucesso');
        // Resetar o formulário ou mostrar uma mensagem de sucesso
      })
     
  }
}
