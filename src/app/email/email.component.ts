import { Component, OnInit ,OnDestroy} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PersonService } from '../db/person.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { Subscription } from "rxjs/Rx";

declare var $:any;

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  public listEmails;
  private  message;
  private email;
  myForm: FormGroup;
  private subscription: Subscription;
  public person_name;
  private id: string;
  primary = ['Yes','No'];
  headerRow = ['Email','Primary','Options'];
  constructor(private formBuilder: FormBuilder, 
    private personService: PersonService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
  		  this.myForm = formBuilder.group({
		      'em_id': [],
		      'em_email': ['', Validators.compose([
          Validators.required, Validators.email])],
		      'em_primary': ['', [Validators.required]]
		  });

		  this.myForm.statusChanges.subscribe(
		      (data: any) => console.log(data)
		  );

		  this.subscription = activatedRoute.params.subscribe(
		   (param: any) => { 
		      this.id = param['id'];
		  });

		  this.personService.getPersonById(this.id).subscribe(data => {
		        console.log("get email data " ,data);
		        this.listEmails= data.t_emails;
            this.person_name = data.pr_firstname + " "+ data.pr_lastname;
		  });	
   }
  
  onSubmit() {
		let id_em= this.myForm.controls['em_id'].value;
		if(id_em==null){
		    this.email = {
		        "em_email": this.myForm.controls['em_email'].value,
		        "em_primary": this.myForm.controls['em_primary'].value
		    }
			this.message="Inserted Info";
			this.personService.createEmail(this.id,this.email).subscribe(data => {
			    console.log(data);
			    this.getInfoDb();
			});

		}else{
		    this.email = {
		    	"em_id": this.myForm.controls['em_id'].value,
		        "em_email": this.myForm.controls['em_email'].value,
		        "em_primary": this.myForm.controls['em_primary'].value
		    }
			this.message="Updated Info";
			this.personService.updateEmail(this.id,this.email).subscribe(data => {
				this.getInfoDb();
			});
		}

		this.myForm.reset();
		this.showNotification('top','center','success',this.message);
   } 
   
   delete(id_email){
        this.message="Deleted Info";
        let email;
        this.listEmails.map(function(value){
	        if(value.em_id==id_email){
	            email=value;
	        }  
        });
        console.log(email);
        this.personService.deleteEmail(this.id,email).subscribe(data => {
            console.log("DELETE email " + data);
            this.getInfoDb();
        });

        this.showNotification('top','center','warning',this.message);        
   }
   
   update(id_email){
        console.log("udate ", id_email);
        let email_edit;
        this.listEmails.map(function(value){
	        if(value.em_id==id_email){
	            email_edit=value;
	        }  
        });

        this.myForm.patchValue({
            em_id: email_edit.em_id,
            em_email: email_edit.em_email,
            em_primary: email_edit.em_primary
        });
    }
   
   getInfoDb(){    
        this.personService.getPersonById(this.id).subscribe(data => {
		        console.log("get email data " ,data);
		        this.listEmails= data.t_emails;
		});
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showNotification(from, align,type_info,msg){
       // const type = ['','info','success','warning','danger'];
        console.log(msg);
        $.notify({
            icon: "pe-7s-cloud-upload",
            message: msg
        },{
            type: type_info,
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
    }

}
