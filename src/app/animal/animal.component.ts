import { Component, OnInit } from '@angular/core';
import { DbAnimalService } from '../db/dbAnimal.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'app-animal',
    templateUrl: './animal.component.html',
    styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {

    public headerRow: string[];
    public listAnimals;
    public listOwners;
    myForm: FormGroup;
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
        'Affenpinscher',
        'Afghan Hound',
        'Airedale Terrier',
        'Akita',
        'Alaskan Malamute',
        'American English Coonhound',
        'American Eskimo Dog',
        'American Foxhound'
    ];



    constructor(private formBuilder: FormBuilder, private DbAnimalService: DbAnimalService) {
        this.myForm = formBuilder.group({
            'an_name': ['', [Validators.required]],
            'an_gender': ['male', [Validators.required]],
            'an_neutered': ['true', [Validators.required]],
            'an_birth': ['', [Validators.required]],
            'an_color': ['', [Validators.required]],
            'an_specie': ['Canine', [Validators.required]],
            'an_breed': ['', [Validators.required]],
            'an_owner': ['', [Validators.required]]
        });

        this.myForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );


    }

    onSubmit() {
        console.log(this.myForm);
    }

    ngOnInit() {
        console.log("data inti");
        this.DbAnimalService.getAnimals().subscribe(data => {
            this.listAnimals = data;
            console.log(data);
        });


        this.headerRow = [
            'Name',
            'Gender',
            'Neutered',
            'Birth',
            'Color',
            'deceased',
            //  'status',
            'Specie',
            'Breed',
            'Options'];

        /*  this.listAnimals = 
             [
                 {
                     "_id": "59c950371e856309f0bc0e6c",
                     "an_name": "Yaak",
                     "an_gender": "MALE",
                     "an_neutered": false,
                     "an_birth": "2017-09-25T18:51:35.304Z",
                     "an_color": "brown",
                     "an_deceased": null,
                     "an_status": true,
                     "an_createdate": "2017-09-25T18:51:35.304Z",
                     "an_specie": "Dog",
                     "an_breed": "yorkshire terrier",
                     "an_owner": "59c950071e856309f0bc0e6b",
                     "an_deworm": [
                         {
                             "de_date": "2017-09-25T18:51:35.304Z",
                             "de_name": "SASSS",
                             "de_doctor": "59c94a941e856309f0bc0e69"
                         },
                         {
                             "de_date": "2017-09-25T18:51:35.304Z",
                             "de_name": "AFSAS",
                             "de_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ],
                     "an_vaccine": [
                         {
                             "va_date": "2017-09-25T18:51:35.304Z",
                             "va_name": "SASSS",
                             "va_batch": "lote",
                             "va_doctor": "59c94a941e856309f0bc0e69"
                         },
                         {
                             "va_date": "2017-09-25T18:51:35.304Z",
                             "va_name": "423asda",
                             "va_batch": "Lote2",
                             "va_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ],
                     "an_microchip": [
                         {
                             "mr_date": "2017-09-25T18:51:35.304Z",
                             "mr_description": "Identification",
                             "mr_implantsite": "DORSAL SURFACE",
                             "mr_brand": "mychip",
                             "mr_doctor": "59c94a941e856309f0bc0e69"
                         },
                         {
                             "mr_date": "2017-09-25T18:51:35.304Z",
                             "mr_description": "Location",
                             "mr_implantsite": "LEFT SHOULDER",
                             "mr_brand": "mychip",
                             "mr_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ]
                 },
                 {
                     "_id": "59c9d89b58874823d332a79e",
                     "an_name": "OSITA",
                     "an_gender": null,
                     "an_neutered": false,
                     "an_birth": "2017-09-25T00:00:00.000Z",
                     "an_color": "black",
                     "an_deceased": null,
                     "an_status": true,
                     "an_createdate": "2017-09-26T04:33:31.665Z",
                     "an_specie": "Dog",
                     "an_breed": "yorkshire terrier",
                     "an_owner": "59c950071e856309f0bc0e6b",
                     "an_deworm": [
                         {
                             "de_id": "59c9d89b58874823d332a798",
                             "de_date": "2017-09-25T00:00:00.000Z",
                             "de_name": "SASSS",
                             "de_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ],
                     "an_vaccine": [
                         {
                             "va_id": "59c9d89b58874823d332a79b",
                             "va_date": "2017-09-25T00:00:00.000Z",
                             "va_name": "423asda",
                             "va_batch": "Lote2",
                             "va_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ],
                     "an_microchip": []
                 },
                 {
                     "_id": "59c9dc4c4c07c824173b26c5",
                     "an_name": "OSITA",
                     "an_gender": null,
                     "an_neutered": false,
                     "an_birth": "2017-09-25T00:00:00.000Z",
                     "an_color": "black",
                     "an_deceased": null,
                     "an_status": true,
                     "an_createdate": "2017-09-26T04:49:16.985Z",
                     "an_specie": "Dog",
                     "an_breed": "yorkshire terrier",
                     "an_owner": "59c950071e856309f0bc0e6b",
                     "an_deworm": [
                         {
                             "de_id": "59c9dc664c07c824173b26c6",
                             "de_date": "2017-09-25T22:09:50.859Z",
                             "de_name": "GLOMAGA",
                             "de_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ],
                     "an_vaccine": [
                         {
                             "va_id": "59c9dc774c07c824173b26c7",
                             "va_date": "2017-09-25T22:09:50.859Z",
                             "va_name": "GASDASDAS",
                             "va_batch": "GASDASDAS",
                             "va_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ],
                     "an_microchip": [
                         {
                             "mr_id": "59c9dca44c07c824173b26c9",
                             "mr_date": "2017-09-25T22:09:50.859Z",
                             "mr_description": "description",
                             "mr_implantsite": "LEFT SHOULDER",
                             "mr_brand": "my brand",
                             "mr_doctor": "59c94a941e856309f0bc0e69"
                         }
                     ]
                 }
             ]; */

        this.listOwners =
            [
                {
                    "_id": "59ca60ba736fd92f00be88bf",
                    "pr_title": "DR",
                    "pr_lastname": "Gallego",
                    "pr_firstname": "Andres",
                    "pr_gender": "MALE",
                    "pr_status": "Y",
                    "pr_createdate": "2017-09-25T18:27:32.780Z",
                    "pr_types": [
                        "Doctor",
                        "Owner"
                    ],
                    "pr_locations": [],
                    "pr_phones": [],
                    "t_emails": []
                },
                {
                    "_id": "59ca6192736fd92f00be88c1",
                    "pr_title": "MISS",
                    "pr_lastname": "Gallego",
                    "pr_firstname": "Gloria",
                    "pr_gender": "FEMALE",
                    "pr_status": "Y",
                    "pr_createdate": "2017-09-25T18:27:32.780Z",
                    "pr_types": [
                        "Doctor",
                        "Owner"
                    ],
                    "pr_locations": [],
                    "pr_phones": [],
                    "t_emails": []
                }
            ];

        console.log(this.listAnimals)
        console.log(this.listOwners)
    }
}
