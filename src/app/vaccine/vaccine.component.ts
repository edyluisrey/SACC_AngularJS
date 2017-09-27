/*
GLORIA GALLEGO
MWA FINAL PROJECT
27-09-2017
*/


import { Component, OnInit ,OnDestroy} from '@angular/core';
import { DbAnimalService } from '../db/dbAnimal.service';
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
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit, OnDestroy {
  public listVaccines;
  public listDoctors;
  private vaccine;
  private  message;
  private animal_name;
  myForm: FormGroup;
  private subscription: Subscription;
  private id: string;

  headerRow = [
    'Name',
    'Date',
    'Batch',
    'Doctor'];



  constructor(private formBuilder: FormBuilder, 
    private DbAnimalService: DbAnimalService, 
    private personService: PersonService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
    this.myForm = formBuilder.group({
      'va_id': [],
      'va_date': ['', [Validators.required]],
      'va_name': ['', [Validators.required]],
      'va_batch': ['', [Validators.required]],
      'va_doctor': ['', [Validators.required]]
  });

  this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
  );

  this.subscription = activatedRoute.params.subscribe(
    (param: any) => { 
      this.id = param['id'];
    });

    this.DbAnimalService.getByIdAnimal(this.id).subscribe(data => {
        console.log("get DATA " ,data);
        this.listVaccines= data.an_vaccine;
        this.animal_name = data.an_name;
    });

    this.personService.getDoctors().subscribe(data => {
        this.listDoctors= data;
    });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
      }


  onSubmit() {
    let id_vaccine= this.myForm.controls['va_id'].value;
    if(id_vaccine==null){
        this.vaccine = {
            "va_date": this.myForm.controls['va_date'].value,
            "va_name": this.myForm.controls['va_name'].value,
            "va_batch": this.myForm.controls['va_batch'].value,
            "va_doctor": this.myForm.controls['va_doctor'].value
        }
    this.message="Inserted Info";
    this.DbAnimalService.saveVaccine(this.id,this.vaccine).subscribe(data => {
       // this.message=data;
        console.log(data);
    });
    
    }else{
        this.vaccine = {
            "va_id": this.myForm.controls['va_id'].value,
            "va_date": this.myForm.controls['va_date'].value,
            "va_name": this.myForm.controls['va_name'].value,
            "va_batch": this.myForm.controls['va_batch'].value,
            "va_doctor": this.myForm.controls['va_doctor'].value
          }
    
          this.message="Updated Info";
    console.log("update", id_vaccine);
    this.DbAnimalService.updateVaccine(this.id,this.vaccine).subscribe(data => {
        //this.message=data;
        console.log(data);
    });
    }
        this.myForm.reset();
    
        this.showNotification('top','center','success',this.message);
        this.getInfoDb();
     
    
       }

       getInfoDb(){
        this.DbAnimalService.getByIdAnimal(this.id).subscribe(data => {
            console.log("get DATA " ,data);
            this.listVaccines= data.an_vaccine;
        });
    
        this.personService.getDoctors().subscribe(data => {
            this.listDoctors= data;
        });
    }

    showNotification(from, align,type_info,msg){
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

      update(id_vaccine){
        console.log("udate ", id_vaccine);
        let vaccine_edit;
       this.listVaccines.map(function(value){
        if(value.va_id==id_vaccine){
          vaccine_edit=value;
            console.log(value.va_name);}  
        });
  
        this.myForm.patchValue({
            va_id: vaccine_edit.va_id,
            va_date: vaccine_edit.va_date,
            va_name: vaccine_edit.va_name,
            va_batch: vaccine_edit.va_batch,
            va_doctor: vaccine_edit.va_doctor
          });
    }
 

    delete(id_va){
      this.message="Deleted Info";
      console.log("delete id vaccine ",id_va);
      this.vaccine = {
          "va_id":id_va
      }
      this.DbAnimalService.deleteVaccine(this.id,this.vaccine).subscribe(data => {
          console.log("DELETE DATA " + data);
      });
  
      this.showNotification('top','center','warning',this.message);
      this.getInfoDb();
  }  

}
