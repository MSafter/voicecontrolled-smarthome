import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  options = [{
    title: "Option 1",
    icon: "people"
  },
    {
      title: "Option 2",
      icon: "done"
    }, {
      title: "Option 3",
      icon: "people"
    },
    {
      title: "Option 4",
      icon: "done"
    }];

  constructor() {
  }

  ngOnInit() {
  }

}
