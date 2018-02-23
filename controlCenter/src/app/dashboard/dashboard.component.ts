import {Component, OnInit, EventEmitter} from '@angular/core';
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  upLevel: EventEmitter<void> = new EventEmitter<void>();
  navigation = {
    isRootLevel: true
  };

  commands: any[];

  constructor(private dataService: DataService) {
  }

  levelChanged(rootLevel: boolean) {
    this.navigation.isRootLevel = rootLevel;
  }

  commandSelected(command){
    this.dataService.execCommand(command);
  }

  async ngOnInit() {
    this.dataService.systemInfo().subscribe(data => {
      this.commands = data.commands;
    });
  }

}
