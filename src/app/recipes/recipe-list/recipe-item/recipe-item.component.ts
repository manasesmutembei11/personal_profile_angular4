import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @ViewChild('f') personform: NgForm
  
genders: ['male', 'female', 'other'];
person= {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  country: '',
  dateOfBirth: '',
};

  


  onSubmit(){

      this.person.firstName= this.personform.value.firstName;
      this.person.lastName= this.personform.value.lastName;
      this.person.email= this.personform.value.email;
      this.person.phoneNumber= this.personform.value.phoneNumber;
      this.person.country= this.personform.value.country
      this.person.dateOfBirth= this.personform.value.dateOfBirth;

    
  }

}
