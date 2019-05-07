import { EstadoBr } from './../adcionais/models/estado-br';
import { DropdownService } from './../adcionais/services/dropdown.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../adcionais/services/consulta-cep.service';
import { Observable } from 'rxjs';
// import 'FormGroup'  pra manipular o formulario reativo

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  // formulario reativo

  formulario: FormGroup;
  /* estados: EstadoBr[]; */
  estados: Observable <EstadoBr[]>; // o pipe async faz a inscrição e a desiscrição automatic.
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService, // carrega os estados do arquivo json
    private CepService: ConsultaCepService
  ) {}

  ngOnInit() {

this.estados = this.dropdownService.getEstadosBr();
this.cargos = this.dropdownService.getCargos();
this.tecnologias = this.dropdownService.getTecnologias();
this.newsletterOp = this.dropdownService.getNewletter();
   /*  this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados;
      console.log(dados);
    }); */
    /*   this.formulario=new FormGroup({
        nome:new FormControl(null),
        email:new FormControl(null)
        endereco: formulario=new FormGroup({//criando um objeto para agrupar dados com referência ao endereço
          cep: new FormControl(null),...
        })

      }); */
    // outra maneira de inciar o formulari
    // email  Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i);
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      email2: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        // criando um objeto para agrupar dados com referência ao endereço
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null, Validators.required],
      newsletter: ['s'], // deixarei um valor padrão com o valor 'Sim' no caso 's'
      termos: [null, Validators.pattern('true')], // é usado o pattern pelo fato do required verificar qualquer valor diferente de 'null'
       // o que se quer, é o checkbox esteje marcado com valor true
       frameworks: this.buildFrameworks()
    });
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values);
/* return [
  new FormControl(false), Angular
  new FormControl(false), React
  new FormControl(false), Vue
  new FormControl(false), Sencha ....
]; */
  }

  verificarEmailIvalido() {
    // tslint:disable-next-line:max-line-length
    const campoEmail = this.formulario.get('email2'); // essa variavel [campoEmail] pode retorna null == false, desqualificando a ação do if.
    // o if só verifica se o objeto erros existe, se o mesmo existe então realizará o código caso verdadeiro.
    if (campoEmail.errors) {// existe um objeto erros e esse garda ostros objetos tipo email: true ... etc
      // erros tem que passar o paramentro de validação no caso se realmente é um email válido
      return campoEmail.errors['email'] && campoEmail.touched;
      // { campoEmail.errors['email'] } esse código verifica se a propriedade email existe no objeto erros, retornando true ou false
    }
  }

  verificarEmailRequerido() {
    const campoEmail = this.formulario.get('email2');
    if (campoEmail.errors) {
      // erros tem que passar o paramentro de validação no caso se realmente é um email válido
      return campoEmail.errors['required'] && campoEmail.touched;
    }
  }

  verificaValidTouched(campo: string) {
    // this.formulario.controls[campo] -> outro tipo de acesso ao objeto formulário
    const input = this.formulario.get(campo);
    return !input.valid && (input.touched || input.dirty); // tocado ou modificado
  }

  aplicaCssErroInput(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': this.formulario.get(campo).valid
    };
  }

  aplicaCssErroIcon(campo: string) {
    return {
      // [ngClass]
      'erro ': this.verificaValidTouched(campo),
      'correto ': this.formulario.get(campo).valid
    };
  }

  aplicarCSStooltip(campo: string) {
    return {
      'animated bounceIn delay-2s': !this.formulario.get(campo).valid
    };
  }

  getPoliticianName(): string {
    return 'ReGiNaLdO FeRrEiRa';
  }

  onSubmit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null) // se valor de v for 'true' ele retorna o valor do array frameworks['angular', 'vue',..]
      .filter(v => v !== null) // retorna só os diferentes de null
    });
    console.log(valueSubmit);
    if (this.formulario.valid) {
      // console.log(this.usuario);
      const formJson = JSON.stringify(this.formulario.value); // transforma o valor do form em json
      // para usar o objeto http temos que colocar o HttpModule no mudulo desta classe
      // linha a abaixo está correta.......
      /*     this.http.post('https://httpbin.org/post', formJson)//http://127.0.0.1:8081/listUsers https://httpbin.org/post
           .map(res => res).subscribe(dados => {
             console.log(dados);
             //resta o formulário ou limpa
             this.resetar()
            },
            (error: any)=>alert('erro'));  */

      // tslint:disable-next-line:max-line-length
      this.http.get(`http://127.0.0.1:8081/listUsers`)
        // servidor local que eu fiz no nodejs o nome do arquivo é server.js na pasta de 'servidores com nodejs' na area de trabalho
        .subscribe(
          dadosSub => {
            // os dados já vem em json
            console.log(dadosSub); // quando o servidor retornar então execultar função popularDados
            this.resetar(); // limpa form
          },
          (error: any) => alert('erro')
        );
    } else {
      console.log('formulário inválido');
      this.verificaValidacoesForm(this.formulario); // função recursival
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  /*   verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(
      campo => {
        const controle = this.formulario.get(campo);
        controle.markAsDirty();//modificado-> este método set ou envia para o input como se ele estivesse marcado ou modificado
        if (controle instanceof FormGroup) {
          this.verificaValidacoesForm(controle);
        }
      });
  } */

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;
    if (cep != null && cep !== '') {
      this.CepService.consultaCEP(cep) // trasforma todos os dados em json
        .subscribe(
          dadosSub => (
            console.log(this.formulario), this.populaDadosForm(dadosSub)
          )
        ); // quando o servidor retornar então execultar função popularDados;
    }
  }

  populaDadosForm(dados) {
    if (!('erro' in dados)) {
      // verifica se vem com algum tipo de erro se não houver o formulário é populado

      this.formulario.patchValue({
        endereco: {
          // o meu código tem algumas diferenças do código da loiane o meu é "endereco_ng" e o dela é "endereco"
          rua: dados.logradouro,
          // cep: dados.cep,

          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });
      // caso eu queira popular apenas um campo faria como este assim
      this.formulario.get('nome').setValue('Reginaldo');
    } else {
      // cep pesquisado não foi encotrado.
      this.resetaDadosForm();
      alert(`CEP: ${dados.cep} NÃO FOI ENCONTRADO!`);
    }
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        // o meu código tem algumas diferenças do código da loiane o meu é "endereco_ng" e o dela é "endereco"
        rua: null,
        // cep: dados.cep,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  setarCargo() { // para testa a função
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  setarTecnologias() {

    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php']); // só envia um exemplo de como dever ser o objeto
    console.log(this.formulario.get('tecnologias'));
  }



// não estou usando esta função
  formControlName(obj1: any, obj2: any) {// para diretiva [compareWith]
    // usando o operador ternário 'valor lógico' ? faça : então
    // se o1 e o o2 tiverem o mesmo nome retorna true, caso contrario faz o que o angular já faz(compara por endereço de memória)
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
    // o retorno é simples verdadeiro ou falso.....
    // [ obj1 && obj2 ] -> só verifica se os objetos existem...
    // ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) -> compara se os nomes e niveis são iguais...
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }


}
