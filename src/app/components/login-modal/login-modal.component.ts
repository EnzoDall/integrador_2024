import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importar o serviço de autenticação
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  usuario = '';
  senha = '';
  mostrarErro = false;

  constructor(private modalCtrl: ModalController, private router: Router, private authService: AuthService) {} // Injete o serviço de autenticação

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  irParaAdmin() {
    this.router.navigate(['/admin']);
  }

  fazerLogin(usuario: string, senha: string) {
    if (!usuario || !senha) {
      this.mostrarErro = true;
      return;
    }

    this.authService.login(usuario, senha)
      .then((userCredential: firebase.auth.UserCredential) => {
        // Login bem-sucedido
        this.mostrarErro = false;
        this.modalCtrl.dismiss();
        this.irParaAdmin();
      })
      .catch((error: firebase.auth.Error) => {
        // Erro no login
        this.mostrarErro = true;
        console.error('Erro no login:', error);
      });
  }
}
