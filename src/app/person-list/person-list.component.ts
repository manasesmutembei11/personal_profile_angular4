import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person.model';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent{

    persons: Person[] = [];
  
    constructor(private personService: PersonService) { }
  
    ngOnInit(): void {
      this.getAllPersons();
    }
  
    getAllPersons(): void {
      this.personService.getAllPersons()
        .subscribe(
          (persons: Person[]) => {
            this.persons = persons;
          },
          error => {
            console.error('Error fetching persons:', error);
          }
        );
    }
  }