import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http: HttpClient) {
  }

  systemInfo() {
    return this.http.get('http://localhost:3000/api/info').map(data => <{ commands: any[] }>data);
  }

  execCommand(command: string) {
    return this.http.post('http://localhost:3000/api/cmd/validate', {command}).subscribe();
  }

}
