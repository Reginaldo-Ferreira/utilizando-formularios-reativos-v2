import { Directive, ElementRef, AfterViewInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRetirTagPai]'
})
export class RetirTagPaiDirective {

/*   constructor(private _elementRef:ElementRef) {
   // console.log(this._elementRef);
   let elRefMock = {
    nativeElement: document.createElement('div')
  };
   _elementRef.nativeElement.style.backgroundColor = 'yellow';
   } */
   constructor(private elRef: ElementRef, private renderer: Renderer2) {
    console.log('parent inicio da diretiva');
  }

  //ngAfterViewInit()
ngOnInit() {//"invalid-tooltip invalid-feedback" 

    const div = this.renderer.createElement('div');
       const text = this.renderer.createText('Hello World! teste');
      // const property = this.renderer.data();  //(div,"[ngClass]","{'animated bounceIn delay-2s': !mtCert }");
       this.renderer.addClass(div, 'invalid-tooltip');
       this.renderer.addClass(div, 'invalid-feedback');
       this.renderer.appendChild(div, text);
	 
      // const parent: ElementRef = this.elRef;
      const parent: ElementRef = this.elRef.nativeElement;
       console.log(parent);
       const refChild = this.elRef.nativeElement;
      // this.renderer.
       this.renderer.insertBefore(parent, div, refChild);
    //this.divs.forEach(div => console.log(div));
  }
 

}
