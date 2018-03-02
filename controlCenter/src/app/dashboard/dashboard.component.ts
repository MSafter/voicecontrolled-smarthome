import {Component, OnInit, EventEmitter} from '@angular/core';
import {DataService} from "../shared/data.service";
import {ICommandSelected} from "../option/option-list/option-list.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  upLevel: EventEmitter<void> = new EventEmitter<void>();
  isRootLevel = true;
  status: any;
  commands: any[];

  constructor(private dataService: DataService) {
  }

  levelChanged(rootLevel: boolean) {

    this.isRootLevel = rootLevel;
  }

  commandSelected(event: ICommandSelected) {
    this.dataService.execCommand(event.command, event.params);
  }

  async ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.dataService.apiInfo().subscribe(data => {
      console.log(data);
      this.commands = data.commands;
    });

    this.dataService.systemInfo().subscribe(data =>{
      this.status = data;
    });
  }

}
