import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CiItem } from '../classes/ci-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  status_list: CiItem[];
  header: any;
  factory: string = 'nj';
  constructor(private data: DataService) { setInterval(()=> {this.update_table()},5000) }
  home_route: any = 'http://10.10.4.61:8083/status';
  route: any;

  ngOnInit(): void {
    // this.header = this.getHeaders();
    this.update_table();
  }
  update_table(){
    // this.part_parameter = 'part_number';
    console.log("Calling getAllData")
    this.data.getAllData(this.home_route + '/nj')
    .subscribe(data=> 
      {
        this.status_list=data;
        console.log(this.status_list);

      }
    )
  }
}
