import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
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

  limiteMesas = {
    aLaCarte: 1,
    rodizio: 1
  };

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private firebaseService: FirebaseService // Adicione private firebaseService: FirebaseService
  ) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  irParaLogin() {
    this.navCtrl.navigateForward('/login');
  }

  async submitReserva() {
    const { data, tipoMesa } = this.reserva;

    try {
      // Verifique o número de reservas existentes para a data e tipo de mesa
      const reservasSnapshot = await this.firebaseService.getReservasPorDataETipo(data, tipoMesa).toPromise();

      // Verifique se reservasSnapshot existe
      if (!reservasSnapshot) {
        this.mostrarToast('Erro ao obter reservas existentes. Tente novamente.');
        return;
      }

      const numeroReservasExistentes = reservasSnapshot.size;

      // Verifique se o limite foi atingido
      if ((tipoMesa === 'aLaCarte' && numeroReservasExistentes >= this.limiteMesas.aLaCarte) ||
          (tipoMesa === 'rodizio' && numeroReservasExistentes >= this.limiteMesas.rodizio)) {
        this.mostrarToast(`Limite de mesas ${tipoMesa} atingido para a data ${data}.`);
        return;
      }

      // Adicione a nova reserva se o limite não foi atingido
      await this.firebaseService.addReserva(this.reserva);
      this.mostrarToast('Reserva realizada com sucesso!');
      this.resetarFormulario(); // Resetar o formulário após a reserva

    } catch (error) {
      console.error('Erro ao adicionar reserva: ', error);
      this.mostrarToast('Erro ao realizar a reserva. Tente novamente.');
    }
  }

  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000, // 3 segundos
      position: 'bottom'
    });
    toast.present();
  }

  resetarFormulario() {
    this.reserva = {
      nome: '',
      email: '',
      numeroPessoas: null,
      data: '',
      horario: '',
      tipoMesa: ''
    };
  }
}
