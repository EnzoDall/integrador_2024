import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  horarios = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  reservasAgrupadas: { [key: string]: any[] } = {};
  reservasVisiveis: { [key: string]: boolean } = {};
  horarioSelecionado: string | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.horarios.forEach(horario => {
      this.reservasVisiveis[horario] = false;
    });

    this.firebaseService.getReservas().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      catchError(error => {
        console.error('Erro ao carregar reservas: ', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    ).subscribe(reservas => {
      this.horarios.forEach(horario => {
        this.reservasAgrupadas[horario] = reservas.filter(reserva => reserva.horario === horario);
      });
    });
  }

  toggleReservas(horario: string) {
    if (this.horarioSelecionado === horario) {
      this.horarioSelecionado = null;
    } else {
      this.horarioSelecionado = horario;
    }
  }

  isReservasVisiveis(horario: string): boolean {
    return this.horarioSelecionado === horario;
  }
}
