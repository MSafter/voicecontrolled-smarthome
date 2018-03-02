import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/first'


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


    console.log(this.prepareValue(value));
    this.rootOptions = value;
    this.navOptions = value;
    this.optionHierarchy.push(value);
  }


  async prepareValue(value: any){
    for (let i = 0; i < value.length; i++) {
      let currRootCommand = value[i];
      for (let j = 0; j < currRootCommand.commands.length; j++) {
        let currCommand = currRootCommand.commands[j];
        if (currCommand.command.parameters) {
          const newParams = [];
          for (let k = 0; k < currCommand.command.parameters.length; k++) {
            let parameter = currCommand.command.parameters[k];
            if (parameter.type === 'url') {
              newParams.push(await this.http.get(parameter.value).first().toPromise());
            } else if (parameter.type === 'plain') {
              newParams.push(parameter.value);
            }
          }
          currCommand.command.parameters = newParams;
          console.log(currCommand.command.parameters);
        }
      }
    }
}

  constructor(private http: HttpClient) {

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

  validateParam(param: any) {
    if (param.type === 'url') {
      console.log(param.value);
      this.http.get(param.value).subscribe(data => {
        param.show = data;
      });
    } else if (param.type === 'plain') {
      param.show = param.value;
    }
  }

  triggerCommand(option: any, param: any) {
    this.commandSelected.emit({command: `${this.currentKeyPhrase} ${option.phrase}`, params: param.value});
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
