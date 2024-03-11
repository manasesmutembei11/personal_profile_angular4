import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { Person } from '../person.model';
import { Country } from '../country.model';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.scss'
})
export class ReactiveformComponent implements OnInit {
personform: FormGroup;
person= {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone:'',
  country: '',
  dateOfBirth:  new Date().toLocaleDateString(),
  status: 0,
  paymentNumber: '',
};
countries: Country[];

constructor (private personservice: PersonService, private router: Router, private formbuilder: FormBuilder) {
  this.personform = this.formbuilder.group({
    firstName: [this.person.firstName, Validators.required],
    lastName: [this.person.lastName, Validators.required],
    email: [this.person.email, Validators.required],
    phone: [this.person.phone, Validators.required],
    dateOfBirth: [this.person.dateOfBirth, Validators.required],
    country: [this.person.country, Validators.required, ]
  });
}

ngOnInit(): void {
  this.personservice.getCountries(this.countries).subscribe(countries => {
    this.countries = countries;
  });
}
onSubmit() {

  console.log(this.personform)
  this.savePerson();

};

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
