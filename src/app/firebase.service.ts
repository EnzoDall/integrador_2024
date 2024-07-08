import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private collectionName = 'reservas';

  constructor(private firestore: AngularFirestore) { }

  addReserva(reserva: any): Promise<any> {
    if (!this.isHoraMinimaAntecedenciaValida(reserva.data, reserva.horario)) {
      return Promise.reject('Não é possível fazer uma reserva com menos de uma hora de antecedência.');
    }
    
    return this.firestore.collection(this.collectionName).add(reserva);
  }

  private isHoraMinimaAntecedenciaValida(data: string, horario: string): boolean {
    const horaAtual = new Date();
    const horaReserva = new Date(`${data}T${horario}`);

    
    horaAtual.setHours(horaAtual.getHours() + 1);

    
    return horaReserva > horaAtual;
  }

  getReservasPorDataETipo(data: string, tipoMesa: string): Observable<any> {
    return this.firestore.collection(this.collectionName, ref => 
      ref.where('data', '==', data).where('tipoMesa', '==', tipoMesa)
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      catchError(error => {
        console.error('Erro ao buscar reservas por data e tipo: ', error);
        return of([]);
      })
    );
  }

  getReservas(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      catchError(error => {
        console.error('Erro ao buscar reservas: ', error);
        return of([]);
      })
    );
  }

  updateReserva(id: string, data: any): Promise<void> {
    return this.firestore.doc(`${this.collectionName}/${id}`).update(data);
  }

  deleteReserva(id: string): Promise<void> {
    return this.firestore.doc(`${this.collectionName}/${id}`).delete();
  }

  deleteExpiredReservas(): Promise<void> {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;

    return this.firestore.collection(this.collectionName).ref.get().then(snapshot => {
      const batch = this.firestore.firestore.batch();
      snapshot.forEach(doc => {
        const reserva = doc.data() as any;
        if (reserva.data < currentDate || (reserva.data === currentDate && reserva.horario < currentTime)) {
          batch.delete(doc.ref);
        }
      });
      return batch.commit();
    });
  }
}
