import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  usuario = '';
  senha = '';
  mostrarErro = false;

  constructor(private modalCtrl: ModalController, private router: Router, private fireAuth: AngularFireAuth) {}

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

    this.fireAuth.signInWithEmailAndPassword(usuario, senha)
      .then(userCredential => {
        // Login bem-sucedido
        this.mostrarErro = false;
        this.modalCtrl.dismiss();
        this.irParaAdmin();
      })
      .catch(error => {
        // Erro no login
        this.mostrarErro = true;
        console.error('Erro no login:', error);
      });
  }
}
