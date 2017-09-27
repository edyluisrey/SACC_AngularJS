import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Router } from "@angular/router";
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
@Injectable()
export class DbAnimalService {
	baseUrl: string = "https://sacc-nodejs.herokuapp.com/";
	constructor(private http: Http, private authHttp: AuthHttp) { }

	getAnimals(){
         return this.authHttp.get(this.baseUrl +"api/animals").map(res=> res.json());
	}
	

}
