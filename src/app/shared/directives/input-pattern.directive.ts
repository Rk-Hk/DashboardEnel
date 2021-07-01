import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputPattern]'
})
export class InputPatternDirective {
  patterns = {
    alphanumericWithDashes: /[^a-zA-Z0-9-\._\s]*/g,
    alphanumeric: /[^a-zA-Z0-9\s]*/g,
    onlyLetters: /[^a-zA-Z\s]*/g,
    onlyNumbers: /[^0-9]*/g
  };

  @Input() appInputPattern: string;

  constructor() { }

  getValueReplaced(value, patternName): string {
    const pattern = this.patterns[patternName];
    const replacedValue = value.replace(pattern, '');

    return replacedValue;
  }

  @HostListener('keyup', ['$event'])
  onReplaceKeyUp(event) {

    // Inputs
    const { appInputPattern } = this;

    const value = event.target.value;

    event.target.value = this.getValueReplaced(value, appInputPattern);
  }

}
