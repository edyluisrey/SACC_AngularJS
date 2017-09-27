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
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  public listPhones;
  private  message;
  private phone;
  myForm: FormGroup;
  public person_name;
  private subscription: Subscription;
  private id: string;
  primary = ['Yes','No'];
  headerRow = ['Area Code','Telephone','Primary','Options'];
  constructor(private formBuilder: FormBuilder, 
    private personService: PersonService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
  		  this.myForm = formBuilder.group({
		      'ph_id': [],
		      'ph_areacode': ['', [Validators.required]],
		      'ph_telephone': ['', [Validators.required]],
		      'ph_primary': ['', [Validators.required]]
		  });

		  this.myForm.statusChanges.subscribe(
		      (data: any) => console.log(data)
		  );

		  this.subscription = activatedRoute.params.subscribe(
		   (param: any) => { 
		      this.id = param['id'];
		  });

		  this.personService.getPersonById(this.id).subscribe(data => {
		        console.log("get Phone data " ,data);
		        this.listPhones= data.pr_phones;
            this.person_name = data.pr_firstname + " "+ data.pr_lastname;
		  });	
   }
  
  onSubmit() {
		let id_ph= this.myForm.controls['ph_id'].value;
		if(id_ph==null){
		    this.phone = {
		        "ph_areacode": this.myForm.controls['ph_areacode'].value,
		        "ph_telephone": this.myForm.controls['ph_telephone'].value,
		        "ph_primary": this.myForm.controls['ph_primary'].value
		    }
			this.message="Inserted Info";
			this.personService.createPhone(this.id,this.phone).subscribe(data => {
			    console.log(data);
			    this.getInfoDb();
			});

		}else{
		    this.phone = {
		    	"ph_id": this.myForm.controls['ph_id'].value,
		        "ph_areacode": this.myForm.controls['ph_areacode'].value,
		        "ph_telephone": this.myForm.controls['ph_telephone'].value,
		        "ph_primary": this.myForm.controls['ph_primary'].value
		    }
			this.message="Updated Info";
			this.personService.updatePhone(this.id,this.phone).subscribe(data => {
			    //this.message=data;			    console.log(data);
			    this.getInfoDb();
			});
		}

		this.myForm.reset();
		this.showNotification('top','center','success',this.message);
   }
   
   delete(id_phone){
        this.message="Deleted Info";
        let phone;
        this.listPhones.map(function(value){
	        if(value.ph_id==id_phone){
	            phone=value;
	        }  
        });
        this.personService.deletePhone(this.id,phone).subscribe(data => {
            console.log("DELETE phone " + data);
            this.getInfoDb();
        });

       this.showNotification('top','center','warning',this.message);       
   }
   
   update(id_phone){
        console.log("udate ", id_phone);
        let phone_edit;
        this.listPhones.map(function(value){
	        if(value.ph_id==id_phone){
	            phone_edit=value;
	        }  
        });

        this.myForm.patchValue({
            ph_id: phone_edit.ph_id,
            ph_areacode: phone_edit.ph_areacode,
            ph_telephone: phone_edit.ph_telephone,
            ph_primary: phone_edit.ph_primary
          });
    }

   getInfoDb(){    
        this.personService.getPersonById(this.id).subscribe(data => {
		        console.log("get phone data " ,data);
		        this.listPhones= data.pr_phones;
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
