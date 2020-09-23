import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CiItem } from '../classes/ci-item';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  status_list: CiItem[];
  header: any;
  factory: string = 'nj';
  sorting: string;
  constructor(private data: DataService) { setInterval(()=> {this.update_table(this.sorting)},5000) }
  home_route: any = 'http://10.10.4.61:8084/status';
  route: any;

  ngOnInit(): void {
    // this.header = this.getHeaders();
    this.sorting = "ticket_num";
    this.update_table(this.sorting);
  }
  update_table(sorting){
    // this.part_parameter = 'part_number';
    console.log("Calling getAllData")
    
    this.data.getData(this.home_route,"","sorting",this.sorting)
    .subscribe(data=> 
      {
        this.status_list=data;
        console.log(this.status_list);
      }
    )
  }
  getColor(status){
    switch(status){
      case 'In Progress':
        return '#0399C1';
      case 'Completed':
        return 'green';
      case "Not complete":
        return "red";
      case "Requested":
        return "grey";
      default:
        return "black";
    }
  }

  sort_by_urgency(){
    this.sorting = "urgency";
    console.log("Sorting by urgency");
    this.update_table(this.sorting);
  }
  sort_by_ticket_num(){
    this.sorting = "ticket_num";
    console.log("Sorting by ticket number");
    this.update_table(this.sorting);
  }
  sort_by_status(){
    this.sorting = "status";
    console.log("Sorting by status");
    this.update_table(this.sorting);
  }
}
