import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { DropdownService } from './services/dropdown.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    RatingInputComponent
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    RatingInputComponent
  ],
  providers: [DropdownService]
})
export class AdcionaisModule { }
