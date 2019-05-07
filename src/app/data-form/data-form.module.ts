
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataFormComponent } from './data-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import alert service and component

 import { AprenderDirective } from '../shared/aprender.directive';
import { AdcionaisModule } from '../adcionais/adcionais.module';
import { AdicionarTextDirective } from '../shared/adicionar-text.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, // par trabalhar com formulários reativos
    AdcionaisModule,
    /*  coloquei tudo em uma pasta só e modularizando-os trazendo
    todos os adcionais componentes{FormDebugComponent, CampoControlErroComponent} */
    FormsModule,
    HttpClientModule // para usar o objeto http...
  ],
  declarations: [
    DataFormComponent, AprenderDirective,
    AdicionarTextDirective
  ]
})
export class DataFormModule { }
