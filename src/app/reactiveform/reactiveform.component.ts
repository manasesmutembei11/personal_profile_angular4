import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../country.model';
import { NgbDateParserFormatter, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from '../core/base-form-component';
import { Person } from '../models/person.model';
import { first } from 'rxjs';
import { DpHelper } from '../core/date-picker-helper';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.scss'
})
export class ReactiveformComponent extends BaseFormComponent implements OnInit {
personform: FormGroup = this.formbuilder.group({});
countries: Country[];

constructor (
  private personservice: PersonService,
   private router: ActivatedRoute, private formbuilder: FormBuilder) {
  super();

}

ngOnInit(): void {
  this.personform = this.createForm();
  this.personservice.getCountries(this.countries).subscribe(countries => {
    this.countries = countries;
  });

  this.router.params.pipe().subscribe((params) => {
    this.id = params['id'] ? params['id'] : '';
    this.editMode = params['id'] != null;
    this.pageTitle = this.editMode ? 'Edit Area' : 'New Area';
    this.breadCrumbItems = [
      { label: 'Master Data' },
      { label: 'Area' },
      { label: this.pageTitle, active: true },
    ];
    this.buttonText = this.editMode ? 'Update' : 'Create';
    this.initForm();
  });
}

createForm(): FormGroup<any> {
  const form = this.formbuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    country: ['', Validators.required],
    dateOfBirth: ['', Validators.required]
  });
  return form
}

initForm() {
  if (this.editMode) {
    this.personservice
      .getPersonById(this.id)
      .pipe(first())
      .subscribe((data) => {         
        this.personform.patchValue(data);         
      });
  }  
}


onSubmit() {
  debugger
  console.log("form value",this.personform.value)
  this.submitted = true;
  if (this.validateForm(this.personform)) {
    const model: Person ={...this.personform.value} ;
  model.dateOfBirth= DpHelper.toISODate(model.dateOfBirth);
  console.log("model",model)
    window.confirm("Confirm save")
    this.personservice.savePerson(model).subscribe({
      next: (_) => {
        console.log(_)
      },
      error: (errors) => {
        this.errors = errors;
        console.log('Error =>', this.errors);
      },
    });
  }
};

back() {
 
}
}
