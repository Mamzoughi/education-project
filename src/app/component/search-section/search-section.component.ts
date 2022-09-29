import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent implements OnInit {
  searchForm:FormGroup;
 path:string;
 optionThree:string= "Option Price";
 optionFour:string= "Option Price";
 search:any={};
 isDisplyed:boolean=true;
  constructor(private router: Router) { }

  ngOnInit() {
    this.path=this.router.url;
    if(this.path=="/search-section"){
      this.isDisplyed=false;
      this.optionThree= "MaximumPrice";
      this.optionFour= "Minimum Price";
    }
  }
  toSearch(){
    
    alert(this.search.type);
  }
}
