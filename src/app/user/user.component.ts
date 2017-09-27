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
  public listPersons;
  myForm: FormGroup;
  genders = ['Male','Female'];
  status = ['Yes','No'];
  listTitle =['NONE','DR','LADY','MR','MRS','MS','MISS'];
  types = ['Doctor','Owner'];
  headerRow = ['First name','Last name','Title','Gender',
            'Status','Create date','Types', 'Options']; 
  private person; 

  constructor(private personService: PersonService, private authService: AuthService, private formBuilder: FormBuilder) { 
        this.myForm = formBuilder.group({
            '_id': [], 
            'pr_title': ['', [Validators.required]],
            'pr_lastname': ['', [Validators.required]],
            'pr_firstname': ['', [Validators.required]],
            'pr_gender': ['', [Validators.required]],
            'pr_status': ['', [Validators.required]],
            'pr_createdate': [''],
            'pr_types': [''],
            'Doctor': [true],
            'Owner': [true]
        });

        this.myForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );
  }
  
  onSubmit() {
        console.log(this.myForm);
        let types:string[] =[];
        if(this.myForm.controls['Doctor'].value)
            types.push("Doctor");
        if(this.myForm.controls['Owner'].value)
            types.push("Owner"); 
             
        this.person = {
          "pr_title":this.myForm.controls['pr_title'].value,
          "pr_lastname":this.myForm.controls['pr_lastname'].value,
          "pr_firstname":this.myForm.controls['pr_firstname'].value,
          "pr_gender":this.myForm.controls['pr_gender'].value,
          "pr_status":this.myForm.controls['pr_status'].value,
          "pr_createdate": new Date(),
          "pr_types":types,
          "pr_locations":[],
          "pr_phones":[],
          "t_emails":[]
        }

        console.log("datos a guardar",  this.person);
        let id= this.myForm.controls['_id'].value;
        if(id==null){
            console.log("save", id);
            this.personService.createPerson(this.person).subscribe(data => {
                console.log("SAVE DATA " + data);
            });
        }else{
            console.log("update", id);
            this.personService.updatePerson(id,this.person).subscribe(data => {
                console.log("update:" + data);
            });
        }
        this.myForm.reset();
        this.getInfoDb();

  }
  
  update(id){
        console.log("udate ", id);
        this.personService.getPersonById(id).subscribe(data => {
            console.log(data);
            let doc =false;
            let own= false;
            if(data.pr_types.indexOf("Doctor") > -1){
              doc= true;
            }
            if(data.pr_types.indexOf("Owner") > -1){
              own= true;
            }
            this.myForm.patchValue({
                _id: data._id,
                pr_title: data.pr_title,
                pr_lastname: data.pr_lastname,
                pr_firstname: data.pr_firstname,
                pr_gender: data.pr_gender,
                pr_status: data.pr_status,
                pr_createdate: '',
                pr_types: '',
                Doctor: doc,
                Owner: own
              });
        });
  }
            
  delete(id){
        console.log("delete ", id);
        this.personService.deletePerson(id).subscribe(data => {
            console.log("delete:" + data);
        });
        this.getInfoDb();
  }

  getInfoDb(){
      this.personService.getPersons().subscribe(data => {
            this.listPersons = data;
            console.log(data);
      });
  }

  ngOnInit() {  console.log("data inti");
       this.getInfoDb()       
  }
 
}
