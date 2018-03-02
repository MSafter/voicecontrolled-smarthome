import {Component, OnInit, Input} from '@angular/core';

export interface IStatusInfo {
  title: string;
  fields: IStatusInfoField[];
}

export interface IStatusInfoField {
  type: string;
  value: any;
  positiveResult?: any;
  negativeResult?: any;
}

export interface IStatus {
  title: string;
  icon: string;
  info: IStatusInfo
}

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {

  _status: IStatus[];

  @Input()
  set status(value: IStatus[]) {
    if (!value) {
      return;
    }
    this._status = value;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
