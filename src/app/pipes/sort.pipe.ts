import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
   max:any;
  transform(eventT:any){
 
    for(var i=0; i<eventT.length-1;i++){
      for(var j=i+1; j<eventT.length; j++){
      if(eventT[i].price<eventT[j].price){
        this.max=eventT[j];
        eventT[j]=eventT[i]; 
        eventT[i]=this.max;
      }}}
      return eventT;
    
  }

}
