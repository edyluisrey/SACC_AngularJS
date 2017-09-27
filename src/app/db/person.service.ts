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

	getPersons(){
         return this.authHttp.get(this.baseUrl +"api/persons").map(res=> res.json());
	}
    
    createPerson(){
         //return this.authHttp.get(this.baseUrl +"api/persons").map(res=> res.json());
	}
    
    getPersonById(id:string){
         return this.authHttp.get(this.baseUrl +"api/person/"+id).map(res=> res.json());
	}

	updatePerson(){
         //return this.authHttp.get(this.baseUrl +"api/persons").map(res=> res.json());
	}

	deletePerson(){
         //return this.authHttp.get(this.baseUrl +"api/persons").map(res=> res.json());
	}
	
	getDoctors(){
		return this.authHttp.get(this.baseUrl +"api/persons/doctors").map(res=> res.json());
    }
    
    getOwners(){
	    return this.authHttp.get(this.baseUrl +"api/persons/owners").map(res=> res.json());
    }

    //Locations

    //Phones

    //Emails

}