import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  sendQuery(data: any) {
    // return this.http.post('https://testologia.com/intensive-price', data);
    console.log(data)
    return this.http.post(environment.api + 'choice', data);
    // return this.http.post(environment.api + 'requests', data);
  }

  getData() {
    // return this.http.get('https://testologia.ru/intensive-data');
    // return this.http.get('http://localhost:5000/api/cars');
    return this.http.get(environment.api + 'cars');
 
  }
}
/*

[
  {
    "image": "http://testologia.site/cars-images/4.png",
    "name": "Lamborghini Urus",
    "gear": "полный",
    "engine": 3.2,
    "places": 3
  },
]

*/

/*
  //sendQuery(data: any) {
  //  return this.http.post('https://testologia.ru/intensive-price', data);}
  //

  this.appService.sendQuery(this.priceForm.value)
  ...
    priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required]
  })


*/