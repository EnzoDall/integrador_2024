import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private router: Router, 
        private modalCtrl: ModalController) {
        
    }
    async irParaLogin() {
        console.log('Método irParaLogin chamado'); // Adicione esta linha
        const modal = await this.modalCtrl.create({
          component: LoginModalComponent,
          cssClass: 'login-modal.scss', 
        });
        return await modal.present();
      }

    irParaReservas() {
        this.router.navigate(['/reservas']); 
    }
}
