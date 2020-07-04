import { Injectable } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherOpService {

  constructor(public http: HttpClient) { }

  get_teacher():Promise<any>{
    let url="/api/teach";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }

}
