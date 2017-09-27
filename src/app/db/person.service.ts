import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Router } from "@angular/router";
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PersonService {
	baseUrl: string = "http://localhost:3000/api";
	constructor(private http: Http, private authHttp: AuthHttp) { }

	getPerson(){
         return this.authHttp.get("https://mwa-person-api.herokuapp.com/api/persons");
    }
}