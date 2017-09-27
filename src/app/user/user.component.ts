import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PersonService } from '../db/person.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public headerRow: string[];
  public listPersons;
  myForm: FormGroup;
  genders = ['Male','Female'];
  status = ['Yes','No'];
  listTitle =['NONE','DR','LADY','MR','MRS','MS'];
  types = ['Doctor','Owner'];
 
  constructor(private personService: PersonService, private authService: AuthService, private formBuilder: FormBuilder) { 
        this.myForm = formBuilder.group({
            'pr_title': ['', [Validators.required]],
            'pr_lastname': ['', [Validators.required]],
            'pr_firstname': ['', [Validators.required]],
            'pr_gender': ['', [Validators.required]],
            'pr_status': ['', [Validators.required]],
            'pr_createdate': [''],
            'pr_types': [''],
            'Doctor': [false],
            'Owner': [false]
        });

        this.myForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );
  }
  
  onSubmit() {
        console.log(this.myForm);
  }

  ngOnInit() {  console.log("data inti");
        this.personService.getPersons().subscribe(data => {
            this.listPersons = data;
            console.log(data);
        });

        this.headerRow = [
            'First name','Last name','Title','Gender',
            'Status','Create date','Types', 'Options']; 

  }

}
