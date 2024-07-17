// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private fireAuth: AngularFireAuth) {}

  login(usuario: string, senha: string) {
    return this.fireAuth.signInWithEmailAndPassword(usuario, senha);
  }
}
