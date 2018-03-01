import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {

  info: any[] = [];

  @Input()
  set status(value: any) {
    if (!value) {
      return;
    }
    Object.keys(value).forEach(item => {
      this.info.push({key: item, value: value[item]});
    });
  }

  constructor() {
  }

  ngOnInit() {
  }

}
