
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form.component';
import { AddElemErroDirective } from '../shared/add-elem-erro.directive';
import { MaskDiretivaDirective } from '../shared/mask-diretiva.directive';
import { AdcionaisModule } from '../adcionais/adcionais.module';
import { HttpClientModule } from '@angular/common/http';
// import { MaskDiretivaDirective } from './../shared/mask-diretiva.directive';
// import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
// import { FormDebugComponent } from '../form-debug/form-debug.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // para que o objeto http fique disponivel para uso na pasta
    AdcionaisModule // campo-control-erro e form-debug
  ],
  declarations: [
    TemplateFormComponent,
    AddElemErroDirective, MaskDiretivaDirective,
  ]
})
export class TemplateFormModule { }
