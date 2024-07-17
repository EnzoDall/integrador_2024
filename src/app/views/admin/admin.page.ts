import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Reserva {
  id: string;
  nome: string;
  email: string;
  numeroPessoas: number;
  data: string;
  horario: string;
  tipoMesa: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  diasDisponiveis: string[] = [];
  horarios = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  reservasAgrupadas: { [key: string]: { [key: string]: Reserva[] } } = {};
  diaSelecionado: string | null = null;
  horarioSelecionado: string | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getReservas().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reserva;
        const id = a.payload.doc.id;
        return { ...data, id }; 
      })),
      catchError(error => {
        console.error('Erro ao carregar reservas: ', error);
        return of([] as Reserva[]); 
      })
    ).subscribe(reservas => {
      this.reservasAgrupadas = {};
      this.diasDisponiveis = Array.from(new Set(reservas.map(reserva => reserva.data)));

      this.diasDisponiveis.forEach(dia => {
        this.reservasAgrupadas[dia] = this.horarios.reduce((acc: { [key: string]: Reserva[] }, horario: string) => {
          acc[horario] = reservas.filter(reserva => reserva.data === dia && reserva.horario === horario);
          return acc;
        }, {});
      });
    });
  }

  selecionarDia(dia: string) {
    this.diaSelecionado = dia;
    this.horarioSelecionado = null;
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
