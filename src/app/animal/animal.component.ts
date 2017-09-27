/*
GLORIA GALLEGO
MWA FINAL PROJECT
27-09-2017
*/




import { Component, OnInit,OnChanges ,ChangeDetectorRef} from '@angular/core';
import { DbAnimalService } from '../db/dbAnimal.service';
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

declare var $:any;


@Component({
    selector: 'app-animal',
    templateUrl: './animal.component.html',
    styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit,OnChanges {

    public listAnimals;
    public listOwners;
    private animal;
    private  message;
    myForm: FormGroup;

  headerRow = [
        'Name',
        'Gender',
        'Neutered',
        'Birth',
        'Color',
        'deceased',
        'Specie',
        'Breed',
        'Owner',
        'Options'];

    genders = [
        'male',
        'female'
    ];
    neutered = [
        true,
        false
    ];

    specie = [
        'Canine',
        'Feline',
        'Bovine',
        'Swine',
        'Porcine',
        'Ursine',
        'Ovine',
        'Simian'
    ];

    breed = [
        'yorkshire terrier',
        'Affenpinscher',
        'Afghan Hound',
        'Airedale Terrier',
        'Akita',
        'Alaskan Malamute',
        'American English Coonhound',
        'American Eskimo Dog',
        'American Foxhound'
    ];



    constructor(private formBuilder: FormBuilder, 
        private DbAnimalService: DbAnimalService, 
        private personService: PersonService, 
        private authService: AuthService
        //,private _cdRef: ChangeDetectorRef
    ) {
        this.myForm = formBuilder.group({
            '_id': [],
            'an_name': ['', [Validators.required]],
            'an_gender': ['male', [Validators.required]],
            'an_neutered': ['true', [Validators.required]],
            'an_birth': ['', [Validators.required]],
            'an_color': ['', [Validators.required]],
            'an_deceased': [''],
            'an_specie': ['Canine', [Validators.required]],
            'an_breed': ['', [Validators.required]],
            'an_owner': ['', [Validators.required]]
        });

        this.myForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );


    }

    onSubmit() {
        this.animal = {
            "an_name": this.myForm.controls['an_name'].value,//"OSITA",
            "an_gender": this.myForm.controls['an_gender'].value,//"MALE",
            "an_neutered": this.myForm.controls['an_neutered'].value,//false,
            "an_birth": this.myForm.controls['an_birth'].value,//"2017-09-24 19:00:00.000",
            "an_color": this.myForm.controls['an_color'].value,//"black",
            "an_deceased": this.myForm.controls['an_deceased'].value== "" ? null : this.myForm.controls['an_deceased'].value,//null,
            "an_status": null,
            "an_createdate": null,
            "an_specie": this.myForm.controls['an_specie'].value,//"Dog",
            "an_breed": this.myForm.controls['an_breed'].value,//"yorkshire terrier",
            "an_owner": this.myForm.controls['an_owner'].value,//"59c950071e856309f0bc0e6b",
            "an_deworm": [],
            "an_vaccine": [],
            "an_microchip": []
        }
let id= this.myForm.controls['_id'].value;
if(id==null){
    this.message="Inserted Info";
    this.DbAnimalService.saveAnimals(this.animal).subscribe(data => {
       // this.message=data;
        console.log(data);
    });
    
}else{
    this.message="Updated Info";
    console.log("update", id);
    this.DbAnimalService.updateAnimal(id,this.animal).subscribe(data => {
        //this.message=data;
        console.log(data);
    });
}
        this.myForm.reset();

        this.showNotification('top','center','success',this.message);
        this.getInfoDb();
   //   this._cdRef.detectChanges();
    }

    ngOnChanges() {
        this.getInfoDb();
        }
    
    update(id){
        console.log("udate ", id);
        this.DbAnimalService.getByIdAnimal(id).subscribe(data => {
            console.log("get DATA " + data);
            this.myForm.patchValue({
                _id: data._id,
                an_name: data.an_name,
                an_gender: data.an_gender,
                an_neutered: data.an_neutered,
                an_deceased: data.an_deceased,
                an_birth: this.processDate(data.an_birth),// data.an_birth,
                an_color: data.an_color,
                an_specie: data.an_specie,
                an_breed: data.an_breed,
                an_owner: data.an_owner
              });
        });
    }

    processDate(dbdate){
        var date = new Date(dbdate);
        var currentDate = date.toISOString().slice(0,10);
        return currentDate;
    }

    delete(id){
        this.message="Deleted Info";
        console.log("delete ", id);
        this.DbAnimalService.deleteAnimal(id).subscribe(data => {
            console.log("DELETE DATA " + data);
        });

        this.showNotification('top','center','warning',this.message);
        this.getInfoDb();
    }
    getInfoDb(){
        this.DbAnimalService.getAnimals().subscribe(data => {
            this.listAnimals = data;
            console.log(data);
        });

        this.personService.getOwners().subscribe(data => {
            this.listOwners = data;
            console.log(data);
        });
    }
    ngOnInit() {
        console.log("data inti");
        this.getInfoDb();

        console.log(this.listAnimals)
        console.log(this.listOwners)
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
