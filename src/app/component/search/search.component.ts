import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm=FormGroup;
  price:any={};
  constructor() { }

  ngOnInit() {
  }
  toSearch(){

  }
}
