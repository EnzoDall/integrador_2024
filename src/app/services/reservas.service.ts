// reservas.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private firestore: AngularFirestore) {}

  getReservasPorDataETipo(data: string, tipoMesa: string) {
    return this.firestore.collection('reservas', ref => 
      ref.where('data', '==', data).where('tipoMesa', '==', tipoMesa)
    ).get();
  }

  addReserva(reserva: any) {
    return from(this.firestore.collection('reservas').add(reserva));
  }
}
