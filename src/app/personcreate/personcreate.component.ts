

import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../models/person.model';
import { Router } from '@angular/router';
import { Country } from '../country.model';



@Component({
  selector: 'app-personcreate',
  templateUrl: './personcreate.component.html',
  styleUrl: './personcreate.component.scss'
})
export class PersoncreateComponent {
  
  @ViewChild('f') personform: NgForm;
  person: Person
  countries: Country[];
constructor(private personservice: PersonService, private router: Router) { }  




  onSubmit(){
    this.person.firstName= this.personform.value.firstName;
    this.person.lastName= this.personform.value.lastName;
    this.person.email= this.personform.value.email;
    this.person.phone= this.personform.value.phone;
    this.person.country= this.personform.value.country;
    this.person.dateOfBirth= this.personform.value.dateOfBirth;
    this.person.status=this.personform.value.status;
    this.person.paymentNumber= this.personform.value.paymentNumber;
      this.savePerson();    
  }

  ngOnInit(): void {
    this.personservice.getCountries(this.countries).subscribe(countries => {
      this.countries = countries;
    });
    
  }

  savePerson() {

    this.personservice.savePerson(this.person)
      .subscribe(
        response => {
          window.confirm('Are you sure you want to save person entry?')
          console.log('Person saved successfully:', response);
          this.router.navigate(['/personlist']);
         
        },
        error => {
          console.error('Error saving person:', error);
          
        },
        
      );
      
  }
}
