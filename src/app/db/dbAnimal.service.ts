import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class DbAnimalService {
  private headers = new Headers({
    'Content-Type': 'application/json',
     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1EUXpPRUZETnpSQ05qZzNOemxDTVVFM04wVTNPVEUxTXpCRlFqazNRVUl4TjBFNFJFWTBRUSJ9.eyJpc3MiOiJodHRwczovL2VkeWx1aXNyZXkuYXV0aDAuY29tLyIsInN1YiI6ImdNeUxPM2xpOGZzbzY0dmhlWFFEczVFWjFKcWJzb3U5QGNsaWVudHMiLCJhdWQiOiJtd2EiLCJleHAiOjE1MDY0OTEzNjIsImlhdCI6MTUwNjQwNDk2Miwic2NvcGUiOiIifQ.yEaenyOlZYSAjAcVoTkgGl6220jnOosKvdx0ivn43yl23slQjg2yDWhqsvySEN-s426sL9CwH4oAkoIGqxSjh9LqDY9RU2cIwdqa9YBaCaeVqzpfKFUN1BpYQgPoHrCvt528A6djSXPBa0CgaVQrW4piHTYf-5uUTE_QDqmT_vn6Y8g_CVNx6ibIhwTWPIO8G1b1PlUH8b7dlX1dOcKddjO-NJEQ5UZ9iZ7OHaPy_rDhq5X7-g70J6I8H8V1L50ETuMg1qyrlg4qNnC6z1CdbNRMBSRpfsWfafYyn1kXHS-LVc7Or5dFSFSgID876oO3MLGy8XvZJ5Mur5SOeWV4nQ' 

});
private options = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) { }

  getAnimals(){
   return this.http.get('https://sacc-nodejs.herokuapp.com/api/animals', this.options);
    }
}
