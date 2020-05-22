import { Injectable } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }


  login_check(data):Promise<any>{
    let url="/api/login_check";
    // console.log(JSON.stringify(data));
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data);
  }



}
