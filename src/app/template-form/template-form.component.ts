import { HttpClient } from '@angular/common/http'; // tem que importa no modulo da pasta

import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { Form } from '@angular/forms';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  usuario: any = {
    nome: null, // 'Reginaldo',
    email: null, // 'reginaldods.ferreira@gmail.com',
    email2: null, // 'reginaldods.ferreira@gmail.com',
    senha: null, // 'senha',
    guarda_dados: false // true

  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(formulario) {
    console.log(formulario);
    // console.log(this.usuario);
    const formJson = JSON.stringify(formulario.value); // transforma form em json

    this.http.post('https://httpbin.org/post', formJson).pipe(
      map(res => res)).subscribe(dados => {
        console.log(dados);
        formulario.form.reset(); // resta o formulário
      });
  }



  verificaValidTouched(campo) {
    // console.log(`**nome do campo: ${campo}`);
    return !campo.valid && campo.touched;
  }

  aplicaCssErroInput(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': campo.valid
    };
  }

  aplicaCssErroIcon(campo) {
    return { // [ngClass]
      'erro ': this.verificaValidTouched(campo),
      'correto ': campo.valid
    };
  }

  consultaCEP(cep, form) {
    // Verifica se campo cep possui valor informado.
    // alert(`CEP: [${cep}]numero do cep`);
    if (cep !== '') {
      // Nova variável "cep" somente com dígitos.
      const cep_verifica_so_digt = cep.replace(/\D/g, '');

      //   [0-9] aceita digito de 0 a 9 ,{8} aceita minimo oito digito
      const validacep = /^[0-9]{8}$/; // Expressão regular para validar o cep.
      if (validacep.test(cep_verifica_so_digt)) {
        this.resetaDadosForm(form); // limpar partes referente ao endereço.
        this.http.get(`http://viacep.com.br/ws/${cep_verifica_so_digt}/json/`) // trasforma todos os dados em json
          // tslint:disable-next-line:max-line-length
          .subscribe(dadosSub => (console.log(form), this.populaDadosForm(dadosSub, form))); // quando o servidor retornar então execultar função popularDados

         // const clicks = fromEvent(document, 'click');................................
         //  const positions = clicks.pipe(map(ev => ev.clientX));........exemplo.......
         //  positions.subscribe(x => console.log(x));..................................


        // No Ang6 ficaria:
    //   const respostaAssin = this.http.get(`//viacep.com.br/ws/${cep}/json`);
     //   respostaAssin.subscribe(dados => console.log(dados));

      }
    }
  }

  populaDadosForm(dados, formulario) {
    /* form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      email2: null,
      senha: 1234,
      endereco_ng: {
        cep:dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro:  dados.bairro,
        cidade:  dados.localidade,
        estado:  dados.uf
      }
    }); */
    // alert(`CEP: [${dados}] resultado`);
    if (!('erro' in dados)) {
      formulario.form.patchValue({
        endereco_ng: {// o meu código tem algumas diferenças do código da loiane o meu é "endereco_ng" e o dela é "endereco"
          rua: dados.logradouro,
          // cep: dados.cep,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });
    } else {
      // cep pesquisado não foi encotrado.
      this.resetaDadosForm(formulario);
      alert(`CEP: ${dados.cep} NÃO FOI ENCONTRADO!`);
    }
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco_ng: {// o meu código tem algumas diferenças do código da loiane o meu é "endereco_ng" e o dela é "endereco"
        rua: null,
        // cep: dados.cep,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
