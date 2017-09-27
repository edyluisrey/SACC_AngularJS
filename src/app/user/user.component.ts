import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PersonService } from '../db/person.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  persons:any;
  constructor(private personService: PersonService, private authService: AuthService) { }

  ngOnInit() {  console.log("data inti");
  	this.personService.getPerson().subscribe(data=>{
      this.persons = data		
      
      console.log(data.json());
    });
  }

}
