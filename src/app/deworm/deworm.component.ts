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
  selector: 'app-deworm',
  templateUrl: './deworm.component.html',
  styleUrls: ['./deworm.component.scss']
})
export class DewormComponent implements OnInit, OnDestroy {

  public listDeworms;
  public listDoctors;
  private deworm;
  private  message;
  myForm: FormGroup;
  private subscription: Subscription;
  private id: string;

  headerRow = [
    'Name',
    'Date',
    'Doctor'];


  constructor(private formBuilder: FormBuilder, 
    private DbAnimalService: DbAnimalService, 
    private personService: PersonService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
    this.myForm = formBuilder.group({
      'de_id': [],
      'de_date': ['', [Validators.required]],
      'de_name': ['', [Validators.required]],
      'de_doctor': ['', [Validators.required]]
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
        this.listDeworms= data.an_deworm;
    });

    this.personService.getDoctors().subscribe(data => {
        this.listDoctors= data;
    });
   }
   onSubmit() {
let id_deworm= this.myForm.controls['de_id'].value;
if(id_deworm==null){
    this.deworm = {
        "de_date": this.myForm.controls['de_date'].value,
        "de_name": this.myForm.controls['de_name'].value,
        "de_doctor": this.myForm.controls['de_doctor'].value
    }
this.message="Inserted Info";
this.DbAnimalService.saveDeworm(this.id,this.deworm).subscribe(data => {
   // this.message=data;
    console.log(data);
});

}else{
    this.deworm = {
        "de_id": this.myForm.controls['de_id'].value,
        "de_date": this.myForm.controls['de_date'].value,
        "de_name": this.myForm.controls['de_name'].value,
        "de_doctor": this.myForm.controls['de_doctor'].value
    }
this.message="Updated Info";
console.log("update", id_deworm);
this.DbAnimalService.updateDeworm(this.id,this.deworm).subscribe(data => {
    //this.message=data;
    console.log(data);
});
}
    this.myForm.reset();

    this.showNotification('top','center',5,this.message);
    this.getInfoDb();
 

   }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
      }


      delete(id_de){
        this.message="Deleted Info";
        console.log("delete id deworm ",id_de);
        this.deworm = {
            "de_id":id_de
        }
        this.DbAnimalService.deleteDeworm(this.id,this.deworm).subscribe(data => {
            console.log("DELETE DATA " + data);
        });

        this.showNotification('top','center',4,this.message);
        this.getInfoDb();
    }

    update(id_deworm){
        console.log("udate ", id_deworm);
        let deworm_edit;
       // this.listDeworms. FILTRAR en la lista para no llamar otro servicio
       this.listDeworms.map(function(value){
        if(value.de_id==id_deworm){
            deworm_edit=value;
            console.log(value.de_name);}  
        });

        this.myForm.patchValue({
            de_id: deworm_edit.de_id,
            de_date: deworm_edit.de_date,
            de_name: deworm_edit.de_name,
            de_doctor: deworm_edit.de_doctor
          });
    }
    getInfoDb(){
        this.DbAnimalService.getByIdAnimal(this.id).subscribe(data => {
            console.log("get DATA " ,data);
            this.listDeworms= data.an_deworm;
        });
    
        this.personService.getDoctors().subscribe(data => {
            this.listDoctors= data;
        });
    }

  showNotification(from, align,color,msg){
    const type = ['','info','success','warning','danger'];
console.log(msg);
   // var color = col;//Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: "pe-7s-cloud-upload",
        message: msg
    },{
        type: type[color],
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
}
}
