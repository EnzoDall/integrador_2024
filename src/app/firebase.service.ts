import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private collectionName = 'reservas';

  constructor(private firestore: AngularFirestore) { }

  addReserva(reserva: any) {
    return this.firestore.collection('reservas').add(reserva);
  }

  getReservasPorDataETipo(data: string, tipoMesa: string) {
    return this.firestore.collection('reservas', ref => 
      ref.where('data', '==', data).where('tipoMesa', '==', tipoMesa)
    ).get();
  }

  getReservas(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  updateReserva(id: string, data: any) {
    return this.firestore.doc(`${this.collectionName}/${id}`).update(data);
  }

  deleteReserva(id: string) {
    return this.firestore.doc(`${this.collectionName}/${id}`).delete();
  }
}
