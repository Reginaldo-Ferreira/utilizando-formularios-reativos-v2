/**
 * Diretiva de máscara genérica em campo de texto.
 *
 * @author Reginaldo ferreira <reginaldods@ferreira.gmail.com>
 * @since 0.0.1
 */
import {NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMaskDiretiva]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MaskDiretivaDirective,
    multi: true
  }]
})
export class MaskDiretivaDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;


  @Input('appMaskDiretiva') kzMask: string;

  constructor(private el: ElementRef) {
  }

  writeValue(value: any): void {
   // console.log("if (value) {}"+value);
   // console.log(`-if writeValue => ${value}`);
    if (value) {
     // console.log(`+if writeValue => ${value}`);
      this.el.nativeElement.value = this.aplicarMascara(value);
     // console.log("if (value) {}"+this.el.nativeElement);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
   // console.log(`-registerOnTouched => ${fn}`);
    this.onTouched = fn;
  }


  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor = $event.target.value.replace(/\D/g, ''); // retira os não digitos

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {//
      this.onChange(valor); // retorno o valor sem digitos inválidos...ou sem formatação
      return;
    }

    const pad = this.kzMask.replace(/\D/g, '').replace(/9/g, '_'); // retira os [não dígitos] da máscara e substitui os digitos 9 por '_'
    // console.log("this.kzMask="+this.kzMask.replace(/\D/g, ''));
//
    if (valor.length <= pad.length) {// se a quantidade de letras 'valor' for menor ou igual 'pad'
      this.onChange(valor);
     // console.log(`valor.length = ${valor.length}\n pad.length = ${pad.length}`);
    //  console.log(`2valor = ${valor}`);
    }
   // console.log(`3valor = ${valor}`);
    $event.target.value = this.aplicarMascara(valor);

  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.kzMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }


/**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, ''); // tira os não digitos
    const pad = this.kzMask.replace(/\D/g, '').replace(/9/g, '_'); // tira os não digitos e trocas o numeros '9' '_'
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    console.log(`valorMask = ${valorMask}`);
    let valorMaskPos = 0;

    // console.log(`valor=${valor}  \n   pad=${pad}  \n valorMask= ${valorMask} `);

    valor = '';
    for (let i = 0; i < this.kzMask.length; i++) { // e pego o valor direto passado pela mascara ex:(99) 9999-9999
      if (isNaN(parseInt(this.kzMask.charAt(i)))) { // procura o indicador passado na mascara ex: /.*)($@....
        valor += this.kzMask.charAt(i); // se não for numero então agrega o simbolo ao valor ex: telefone (61) 473-8344
      } else {//
        valor += valorMask[valorMaskPos++]; // so agrega o valor passando pelo keyup do event pelo usuário
      }
    }

    if (valor.indexOf('_') > -1) { // se encontrar '_'
      valor = valor.substr(0, valor.indexOf('_')); // retira o excesso de '_'
    }

    return valor;
  }

}
