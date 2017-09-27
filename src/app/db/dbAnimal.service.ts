import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Router } from "@angular/router";
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
@Injectable()
export class DbAnimalService {
	//baseUrl: string = "https://sacc-nodejs.herokuapp.com/";
	baseUrl: string = "http://localhost:8080/";
	constructor(private http: Http, private authHttp: AuthHttp) { }

	getAnimals(){
         return this.authHttp.get(this.baseUrl +"api/animals").map(res=> res.json());
	}

	saveAnimals(data){
		return this.authHttp.post(this.baseUrl +"api/animal",data);
	}

	deleteAnimal(data){
		return this.authHttp.delete(this.baseUrl +"api/animal/" + data);
	}

	updateAnimal(id, data){
		return this.authHttp.put(this.baseUrl +"api/animal/" + id, data);
	}

	getByIdAnimal(id){
		return this.authHttp.get(this.baseUrl +"api/animal/"+id).map(res=> res.json());
   }

    deleteDeworm(id,data){
		console.log("Id Animal"+ id);
		console.log("Info a Borrar",data)
	return this.authHttp.delete(this.baseUrl +"api/animal/deworm/" + id, new RequestOptions({
		body: data
	 }));
} 

saveDeworm(id,data){
	console.log("Id Animal"+ id)

	return this.authHttp.post(this.baseUrl +"api/animal/deworm/"+id,data);
} 

updateDeworm(id,data){
	console.log("Id Animal"+ id)
	return this.authHttp.put(this.baseUrl +"api/animal/deworm/"+id,data);
} 

}
