import { Pipe, PipeTransform } from "@angular/core";
import { EventsTableComponent } from "../component/events-table/events-table.component";

@Pipe({
  name: "filterEvents",
})
export class FilterEventsPipe implements PipeTransform {
  result: any;

  transform(eventTab: any, x: Date, y:Date ) {
    
    if (x === undefined || y === undefined) {
      return eventTab;
    }
    if (x > y) {
      return eventTab;
    }
    return (eventTab.filter(
      (obj) => { return( 
      obj.dateStart <= x && (obj.dateEnd) >= y) 
    }) ) 
  }
}
