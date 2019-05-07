import { Directive, Input, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[addText]'
})
export class AdicionarTextDirective implements OnInit{
 

  @Input() inserir: String;

  constructor(
    private el: ElementRef,
    private render: Renderer2) {
      

     }
   
     @HostListener('click') 
     performTask() {
       const li = this.render.createElement('li');
       const text = this.render.createText('Click here to add li');
       this.render.appendChild(li, text);
       this.render.appendChild(this.el.nativeElement, li);
     }

     ngOnInit(): void {
      /*  este só funciona se estiver no metodo ngOnInit */
      this.render.setProperty(this.el.nativeElement, 'innerHTML', this.inserir);
     /* este funciona:
       const element = this.el.nativeElement;
      console.log(this.inserir);
      element.innerHTML = this.inserir; */
    }

}
