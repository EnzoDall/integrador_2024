import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { Observable, of } from 'rxjs'; // Importe 'of' para inicialização com array vazio
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-reservas',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  reservas$: Observable<any[]> = of([]); // Inicializa com array vazio usando 'of' do RxJS

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.reservas$ = this.firebaseService.getReservas().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      catchError(error => {
        console.error('Erro ao carregar reservas: ', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

}
