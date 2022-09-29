import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderDisplay'
})
export class GenderDisplayPipe implements PipeTransform {

  transform(gender:string) {
  //  if (gender=="women"){return gender="Miss"}
  //  return(gender="Mr")
  return (gender=="women"? 'Miss' :'Mr')
  }
// Ternary Operator?
}
