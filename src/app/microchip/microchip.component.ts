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
  selector: 'app-microchip',
  templateUrl: './microchip.component.html',
  styleUrls: ['./microchip.component.scss']
})
export class MicrochipComponent  implements OnInit, OnDestroy {
  public listMicrochips;
  public listDoctors;
  private microchip;
  private  message;
  private animal_name;
  myForm: FormGroup;
  private subscription: Subscription;
  private id: string;

  headerRow = [
    'Description',
    'Date',
    'Implant Site',
    'Brand',
    'Doctor'];

    implantsite = [
      'LEFT SHOULDER',
      'DORSAL SURFACE',
      'RIGHT SHOULDER',
      'VENTRAL AREA'
  ];
  constructor(private formBuilder: FormBuilder, 
    private DbAnimalService: DbAnimalService, 
    private personService: PersonService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
    this.myForm = formBuilder.group({
      'mr_id': [],
      'mr_date': ['', [Validators.required]],
      'mr_description': ['', [Validators.required]],
      'mr_implantsite': ['', [Validators.required]],
      'mr_brand': ['', [Validators.required]],
      'mr_doctor': ['', [Validators.required]]
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
        this.listMicrochips= data.an_microchip;
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
    let id_microchip= this.myForm.controls['mr_id'].value;
    if(id_microchip==null){
        this.microchip = {
            "mr_date": this.myForm.controls['mr_date'].value,
            "mr_description": this.myForm.controls['mr_description'].value,
            "mr_implantsite": this.myForm.controls['mr_implantsite'].value,
            "mr_brand": this.myForm.controls['mr_brand'].value,
            "mr_doctor": this.myForm.controls['mr_doctor'].value
        }
    this.message="Inserted Info";
    this.DbAnimalService.saveMicrochip(this.id,this.microchip).subscribe(data => {
       // this.message=data;
        console.log(data);
        this.getInfoDb();
    });
    
    }else{
        this.microchip = {
            "mr_id": this.myForm.controls['mr_id'].value,
            "mr_date": this.myForm.controls['mr_date'].value,
            "mr_description": this.myForm.controls['mr_description'].value,
            "mr_implantsite": this.myForm.controls['mr_implantsite'].value,
            "mr_brand": this.myForm.controls['mr_brand'].value,
            "mr_doctor": this.myForm.controls['mr_doctor'].value
        }
    this.message="Updated Info";
    console.log("update", id_microchip);
    this.DbAnimalService.updateMicrochip(this.id,this.microchip).subscribe(data => {
        //this.message=data;
        console.log(data);
        this.getInfoDb();
        
    });
    }
        this.myForm.reset();
    
        this.showNotification('top','center','success',this.message);


       }

       delete(id_mr){
        this.message="Deleted Info";
        console.log("delete id deworm ",id_mr);
        this.microchip = {
            "mr_id":id_mr
        }
        this.DbAnimalService.deleteMicrochip(this.id,this.microchip).subscribe(data => {
            console.log("DELETE DATA " + data);
            this.getInfoDb();
        });

        this.showNotification('top','center','warning',this.message);

    }

    update(id_mr){
      console.log("udate ", id_mr);
      let microchip_edit;
       this.listMicrochips.map(function(value){
      if(value.mr_id==id_mr){
        microchip_edit=value;
          console.log(value.mr_description);}  
      });

      this.myForm.patchValue({
          mr_id: microchip_edit.mr_id,
          mr_date: microchip_edit.mr_date,
          mr_description: microchip_edit.mr_description,
          mr_implantsite: microchip_edit.mr_implantsite,
          mr_brand: microchip_edit.mr_brand,
          mr_doctor: microchip_edit.mr_doctor
        });
  }

  getInfoDb(){
    this.DbAnimalService.getByIdAnimal(this.id).subscribe(data => {
        console.log("get DATA " ,data);
        this.listMicrochips= data.an_microchip;
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
}
