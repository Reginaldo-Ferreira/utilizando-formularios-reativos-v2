import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.css'],
  
  /* preserveWhitespaces:false */
 // changeDetection: ChangeDetectionStrategy.Default//OnPush
 /*  encapsulation: ViewEncapsulation.Native */
})
export class CampoControlErroComponent implements OnInit {

  @Input() mtErro: boolean;
  @Input() mtCert: boolean;
  @Input() msgErro: string;
  @Input() PosicaoSvgCss: string;
  @Input() campo: any;

  constructor() { }

  ngOnInit() {
    /* console.log("verificar se passar: ------->"+this.campo.join(" - ")); */
  }

/*   verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  } */

/*   aplicaCssErroIcon(campo) {
    return {
      'erro ': this.verificaValidTouched(campo),
      'correto ': campo.valid
    }
  } */
/* 
  { '{{' }} mostrarErro {{ '}}' } 
{ '{{' }} name {{ '}}'  */
}
