import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TemplateFormModule } from './template-form/template-form.module';
import { RetirTagPaiDirective } from './retir-tag-pai.directive';

import { DataFormModule } from './data-form/data-form.module';


//import { MaskDiretivaDirective } from './shared/mask-diretiva.directive';







@NgModule({
  declarations: [
    AppComponent,
    RetirTagPaiDirective
    
   // MaskDiretivaDirective
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,// para trabalhar com template-form
    DataFormModule,
    TemplateFormModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
