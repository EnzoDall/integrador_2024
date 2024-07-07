// components.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importe IonicModule
import { FormsModule } from '@angular/forms'; // Importe FormsModule
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    IonicModule, // Adicione IonicModule aos imports
    FormsModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule // Adicione FormsModule aos imports
  ],
  exports: [LoginModalComponent]
})
export class ComponentsModule { }