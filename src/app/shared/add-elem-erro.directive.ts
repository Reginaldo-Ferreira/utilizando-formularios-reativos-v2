import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAddElemErro]'
})
export class AddElemErroDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    console.log('parent inicio da diretiva');  
  }


/* 
constructor(private el: ElementRef) {}
ngOnInit() {
   this.el.nativeElement.innerHTML =`"${this.politicianQuote}" <br> - ${this.politicianAuthor}`;
  }
}      
*/

 //ngAfterViewInit()    ngOnInit()
 ngAfterViewInit() {//"invalid-tooltip invalid-feedback" 

 const div = this.renderer.createElement('div');


    const text = this.renderer.createText('Hello World! teste');
   // this.renderer.setAttribute(div, `${ '[' } ngClass ${ ']' }`, "{'animated bounceIn delay-2s': !mtCert }");

   // const property = this.renderer.data();  //(div,"[ngClass]","{'animated bounceIn delay-2s': !mtCert }");
    this.renderer.addClass(div, 'invalid-tooltip');
    this.renderer.addClass(div, 'invalid-feedback');
    this.renderer.appendChild(div, text);

    const parent: ElementRef = this.elRef.nativeElement.parentElement;//: ElementRef 
   ///// const decendente: string = this.elRef.nativeElement.innerHTML;
   ////// const htmlInterno = this.elRef.nativeElement.outerHTML;
   //this.elRef.nativeElement.innerHTML = decendente ;


   //const parent: ElementRef = this.elRef.nativeElement;
   
    console.log(parent);
   // const refChild = this.elRef.nativeElement;
   // this.renderer.
  this.renderer.appendChild(this.elRef.nativeElement,div);

   // this.renderer.insertBefore(parent, div, refChild);
 //this.divs.forEach(div => console.log(div));
}


}
