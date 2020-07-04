import { Injectable } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DictionaryOpService {

  constructor(public http: HttpClient) { }
  return_data:any;

  get_dictionary():Promise<any>{
    let url="/api/dictionary";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }

  update_Dictionary(data):Promise<any>{
    let url="/api/dictionary/Dictionary/"+data.id;
    // console.log(JSON.stringify(data));
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  update_DictionaryDetail(data):Promise<any>{
    let url="/api/dictionary/DictionaryDetail/"+data.id;
    // console.log(JSON.stringify(data));
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data);
  }
  

  Add_DictionaryDetail(data):Promise<any>{
    let url="/api/dictionary/DictionaryDetail";
    // console.log(JSON.stringify(data));
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  Add_Dictionary(data):Promise<any>{
    let url="/api/dictionary/Dictionary";
    // console.log(JSON.stringify(data));
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  Delet_DictionaryDetail(id):Promise<any>{
    let url="/api/dictionary/DictionaryDetail/"+id;
    // console.log(JSON.stringify(data));
    return this.http.delete(url).toPromise().then(data=>data);
  }

  Delet_Dictionary(id):Promise<any>{
    let url="/api/dictionary/Dictionary/"+id;
    // console.log(JSON.stringify(data));
    return this.http.delete(url).toPromise().then(data=>data);
  }

  get_dictionary_detail(id):Promise<any>{
    let url="/api/dictionary_detail/"+id;
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }
}
