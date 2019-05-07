import { Directive, Input, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[appAprender]'
})
export class AprenderDirective implements AfterViewInit,OnInit {

 
  @Input() politicianAuthor: string;
  @Input() politicianQuote: string;
  @Input('appAprender') color: string;

  private text: string;

//constructor(private _elementRef: ElementRef,private _renderer2: Renderer2)

  constructor(private el: ElementRef, private _renderer2: Renderer2) {
   // this.text = `"${this.politicianQuote}" <br> - ${this.politicianAuthor}`;
   el.nativeElement.style.backgroundColor = this.color;
   
  }
  


  inseriTexto(){
    
    this.text =`"${this.politicianQuote}" <br> - ${this.politicianAuthor}`;
    console.log("-----> "+ this.politicianAuthor);
   
  }

  ngAfterViewInit() {
   // this._renderer2.setProperty(this.el.nativeElement, 'innerHTML', '<h1>Hello world</h1>');
  }

  ngOnInit() {
    this.inseriTexto();
    console.log("diretiva nova: 'AprenderDirective' --->>> " + this.text); 
    this._renderer2.setProperty(this.el.nativeElement, 'innerHTML', this.text);

/*  este funciona---->
   const element = this.el.nativeElement;
    console.log(this.el);
    element.innerHTML = this.text; */


  /* *** modelo=>> 
   this._renderer2.setStyle(
      this.el.nativeElement,
       'background-color',
        'blue'); */
        
        //este não esta inserindo o texto 
 // let text = this._renderer2.createText(`"${this.politicianQuote}" <br> - ${this.politicianAuthor}`);//cria um texto par ser inserido an tag
 //  this._renderer2.appendChild(this.el.nativeElement,text);//inseri o texto dentro da tag onde a diretiva esta...

   // this._renderer2.createText(`"${this.politicianQuote}" <br> - ${this.politicianAuthor}`);
/* maneira anterior    this.el.nativeElement.innerHTML =`"${this.politicianQuote}" <br> - ${this.politicianAuthor}`; */
   }

}
