
import { Component, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements OnInit, ControlValueAccessor {
  // de onde eu tirei: https://alligator.io/angular/custom-form-control/
  stars: boolean[] = Array(5).fill(false);

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  // Function to call when the rating changes.
  onChange = (rating: number) => { };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { console.log('tocado!!'); }; // o console.log foi eu quem o colocou

  get value(): number {// conta quantas estrelas tem, verificado pelo boolean
    return this.stars.reduce((total, starred) => { // se tem estrela
      return total + (starred ? 1 : 0); // caso seja verdadeiro o valor será '1' caso contrario '0'
    }, 0);
  }

  rate(rating: number) {// primeira vez entra 1 clicando no primeiro
    if (!this.disabled) {// primeira vez false ... if inverter true
      this.writeValue(rating);
    }
  }

  verificaFunc(rating: number, index: number) { // esta função foi eu reginaldo quem fez para verificar a função
    console.log(`rating: ${rating} > index: ${index} = ${rating > index}`);
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(rating: number): void {
            // na função de 'map' o 1° paramentro não é usado, somente o index
    this.stars = this.stars.map((_, i) => { this.verificaFunc(rating, i); return rating > i; }); // carrega as estrelas no array
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor() { }

  ngOnInit() {
    /* this.stars[0]=true;
    this.stars[3]=true; */
  }



}
