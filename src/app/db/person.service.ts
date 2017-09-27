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
    
    createPerson(data){
         return this.authHttp.post(this.baseUrl +"api/person", data).map(res=> res.json());
	}
    
    getPersonById(id:string){
         return this.authHttp.get(this.baseUrl +"api/person/"+id).map(res=> res.json());
	}

	updatePerson(id, data){
         return this.authHttp.put(this.baseUrl +"api/person/"+ id, data).map(res=> res.json());
	}

	deletePerson(id){
         return this.authHttp.delete(this.baseUrl +"api/person/"+ id);
	}
	
	getDoctors(){
		return this.authHttp.get(this.baseUrl +"api/persons/doctors").map(res=> res.json());
    }
    
    getOwners(){
	    return this.authHttp.get(this.baseUrl +"api/persons/owners").map(res=> res.json());
    }

    //Locations
    createLocation(id,data){
		return this.authHttp.put(this.baseUrl +"api/addlocation/"+id,data);
    }   

    updateLocation(id,data){
		return this.authHttp.put(this.baseUrl +"api/updatelocation/"+id,data);
    } 

    deleteLocation(id,data){
		return this.authHttp.put(this.baseUrl +"api/removelocation/"+id,data);
    } 
    
    //Phones
    createPhone(id,data){
		return this.authHttp.put(this.baseUrl +"api/addphone/"+id,data);
    }   

    updatePhone(id,data){
		return this.authHttp.put(this.baseUrl +"api/updatephone/"+id,data);
    } 

    deletePhone(id,data){
		return this.authHttp.put(this.baseUrl +"api/removephone/"+id,data);
    } 
    
    //Emails
    createEmail(id,data){
		return this.authHttp.put(this.baseUrl +"api/addemail/"+id,data);
    }   

    updateEmail(id,data){
		return this.authHttp.put(this.baseUrl +"api/updateemail/"+id,data);
    } 

    deleteEmail(id,data){
		return this.authHttp.put(this.baseUrl +"api/removeemail/"+id,data);
    }  

}