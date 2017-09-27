import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Router } from "@angular/router";
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
@Injectable()
export class PersonService {
	baseUrl: string = "https://mwa-person-api.herokuapp.com/";
	constructor(private http: Http, private authHttp: AuthHttp) { }

	getPerson(){
         return this.authHttp.get("https://mwa-person-api.herokuapp.com/api/persons");
	}
	getDoctors(){
		return this.authHttp.get(this.baseUrl +"api/persons/doctors").map(res=> res.json());
   }
   getOwners(){
	return this.authHttp.get(this.baseUrl +"api/persons/owners").map(res=> res.json());
}

}