import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


export interface ICommandSelected {
  command: string;
  params?: any;
}

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {

  rootOptions: any[];
  navOptions: any[];
  optionHierarchy: any[] = [];
  currentKeyPhrase: string;

  @Input()
  set levelUp(value: EventEmitter<void>) {
    if (value) {
      value.subscribe(() => {
        this.upALevel();
      });
    }
  }

  @Output() commandSelected: EventEmitter<ICommandSelected> = new EventEmitter<ICommandSelected>();

  @Output() levelChanged: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set options(value: any[]) {
    if (!value) {
      return;
    }
    this.rootOptions = value;
    this.navOptions = value;
    this.optionHierarchy.push(value);
  }

  constructor() {

  }

  ngOnInit() {
  }

  downALevel(subOption: any) {
    if (subOption.commands) {
      this.navOptions = subOption.commands;
      this.optionHierarchy.push(subOption.commands);
      this.levelChanged.emit(false);
      this.currentKeyPhrase = subOption.keyphrase;
    } else {
      if (!subOption.command.parameters) {
        this.commandSelected.emit({command: `${this.currentKeyPhrase} ${subOption.phrase}`});
      }
    }
  }

  triggerCommand(option: any, params: any) {
    this.commandSelected.emit({command: `${this.currentKeyPhrase} ${option.phrase}`, params});
  }

  upALevel() {
    if (this.optionHierarchy.length > 1) {
      this.optionHierarchy.pop();
      this.navOptions = this.optionHierarchy[this.optionHierarchy.length - 1];
      const rootLevel: boolean = this.optionHierarchy.length === 1;
      this.levelChanged.emit(rootLevel);
    }
  }


}
