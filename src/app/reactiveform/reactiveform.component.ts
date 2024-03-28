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
form: FormGroup = this.formbuilder.group({});
countries: Country[];

constructor (
  private personservice: PersonService,
  private route: ActivatedRoute,
  private formbuilder: FormBuilder,
  private router: Router) {
  super();

}
createForm(): FormGroup<any> {
  const form = this.formbuilder.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    country: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    status:[0]
  });
  return form
}

initForm() {
  if (this.editMode) {
    this.personservice
      .getPersonById(this.id)
      .pipe(first())
      .subscribe((data) => {         
        this.form.patchValue(data);        
      });
  }   
}

ngOnInit(): void {
  this.form = this.createForm();
  this.personservice.getCountries(this.countries).subscribe(countries => {
    this.countries = countries;
  });

  this.route.params.pipe().subscribe((params) => {
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

onSubmit() {
  this.submitted = true; 
  if (this.validateForm(this.form)) {
    let model: Person = { ...this.form.value };
    model.dateOfBirth = DpHelper.toISODate(model.dateOfBirth);
    if (this.editMode) {
      this.personservice.updatePerson(this.id ,model).subscribe({
        next: (_) => {
          window.confirm('Are you sure you want to update person entry?');
          console.log('Person updated successfully:', _);
          this.router.navigate(['/personlist']);
        },
        error: (errors) => {
          this.errors = errors;
          console.log('Error =>', this.errors);
        },
      });
    } else {
      this.personservice.savePerson(model).subscribe({
        next: (_) => {
          window.confirm('Are you sure you want to save person entry?');
          console.log('Person saved successfully:', _);
          this.router.navigate(['/personlist']);
        },
        error: (errors) => {
          this.errors = errors;
          console.log('Error =>', this.errors);
        },
      });
    }
  }
}

back() {
 
}
}
