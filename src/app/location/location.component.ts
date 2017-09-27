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
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy { 
  public listLocations;
  private  message;
  private location;
  myForm: FormGroup;
  private person_name;
  private subscription: Subscription;
  private id: string;
  primary = ['Yes','No'];
  headerRow = ['Address','Zipcode','Country','Primary','Options'];
  constructor(private formBuilder: FormBuilder, 
    private personService: PersonService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
  		  this.myForm = formBuilder.group({
		      'lc_id': [],
		      'lc_address': ['', [Validators.required]],
		      'lc_zipcode': ['', [Validators.required]],
		      'lc_country': ['', [Validators.required]],
		      'lc_primary': ['', [Validators.required]]
		  });

		  this.myForm.statusChanges.subscribe(
		      (data: any) => console.log(data)
		  );

		  this.subscription = activatedRoute.params.subscribe(
		   (param: any) => { 
		      this.id = param['id'];
		  });

		  this.personService.getPersonById(this.id).subscribe(data => {
		        console.log("get location data " ,data);
		        this.listLocations= data.pr_locations;
            this.person_name = data.pr_firstname + " "+ data.pr_lastname;
		  });	
   }
  
  onSubmit() {
		let id_loc= this.myForm.controls['lc_id'].value;
		if(id_loc==null){
		    this.location = {
		        "lc_address": this.myForm.controls['lc_address'].value,
		        "lc_zipcode": this.myForm.controls['lc_zipcode'].value,
		        "lc_country": this.myForm.controls['lc_country'].value,
		        "lc_primary": this.myForm.controls['lc_primary'].value
		    }
			this.message="Inserted Info";
			this.personService.createLocation(this.id,this.location).subscribe(data => {
			    console.log(data);
			    this.getInfoDb();
			});

		}else{
		    this.location = {
		    	"lc_id": this.myForm.controls['lc_id'].value,
		        "lc_address": this.myForm.controls['lc_address'].value,
		        "lc_zipcode": this.myForm.controls['lc_zipcode'].value,
		        "lc_country": this.myForm.controls['lc_country'].value,
		        "lc_primary": this.myForm.controls['lc_primary'].value
		    }
			this.message="Updated Info";
			this.personService.updateLocation(this.id,this.location).subscribe(data => {
			    //this.message=data;			    console.log(data);
          this.getInfoDb();
			});
		}

		this.myForm.reset();
		this.showNotification('top','center','success',this.message);
   }
   
   delete(id_location){
        this.message="Deleted Info";
        let location;
        this.listLocations.map(function(value){
	        if(value.lc_id==id_location){
	            location=value;
	        }  
        });
        this.personService.deleteLocation(this.id,location).subscribe(data => {
            console.log("DELETE Location " + data);
            this.getInfoDb();
        });

         this.showNotification('top','center','warning',this.message);        
   }
   
   update(id_location){
        console.log("udate ", id_location);
        let location_edit;
        this.listLocations.map(function(value){
	        if(value.lc_id==id_location){
	            location_edit=value;
	        }  
        });

        this.myForm.patchValue({
            lc_id: location_edit.lc_id,
            lc_address: location_edit.lc_address,
            lc_zipcode: location_edit.lc_zipcode,
            lc_country: location_edit.lc_country,
            lc_primary: location_edit.lc_primary
          });
    }

   getInfoDb(){    
        this.personService.getPersonById(this.id).subscribe(data => {
		        console.log("get location data " ,data);
		        this.listLocations= data.pr_locations;
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