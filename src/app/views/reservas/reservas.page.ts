import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ReservasService } from '../../services/reservas.service';  // Importar o serviço de reservas

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
    private reservasService: ReservasService
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
      const reservasSnapshot = await this.reservasService.getReservasPorDataETipo(data, tipoMesa).toPromise();

      if (!reservasSnapshot) {
        this.mostrarToast('Erro ao obter reservas existentes. Tente novamente.');
        return;
      }

      const numeroReservasExistentes = reservasSnapshot.size;

      if ((tipoMesa === 'aLaCarte' && numeroReservasExistentes >= this.limiteMesas.aLaCarte) ||
          (tipoMesa === 'rodizio' && numeroReservasExistentes >= this.limiteMesas.rodizio)) {
        this.mostrarToast(`Limite de mesas ${tipoMesa} atingido para a data ${data}.`);
        return;
      }

      await this.reservasService.addReserva(this.reserva).toPromise();
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
