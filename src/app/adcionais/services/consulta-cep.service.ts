import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  constructor(private http: HttpClient) {}

  consultaCEP(cep: string) {

    cep = cep.replace(/\D/g, ''); // verifica se ´so tem digito.
    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      //   [0-9] aceita digito de 0 a 9 ,{8} aceita minimo oito digito
      const validacep = /^[0-9]{8}$/; // Expressão regular para validar o cep.
      if (validacep.test(cep)) {
        return this.http.get(
          `http://viacep.com.br/ws/${cep}/json/`
        );
        // this.http.get(`//viacep.com.br/ws/${cep}/json`).pipe( map(dados => dados.json()) ).subscribe(dados => console.log(dados));
      }
    }
    return of({});
  }
}
