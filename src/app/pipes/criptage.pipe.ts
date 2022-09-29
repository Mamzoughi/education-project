import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'criptage'
})
export class CriptagePipe implements PipeTransform {
  result:string;
  transform(pass:string){
    this.result="";
    for(var i=0 ; i<pass.length;i++){
      this.result=this.result+"*";
    }
    return this.result ;
  }

}
