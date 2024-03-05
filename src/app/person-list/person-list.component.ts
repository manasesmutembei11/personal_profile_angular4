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
          (pagedList: any) => {
            
            if (pagedList && pagedList.data && Array.isArray(pagedList.data)) {
              this.persons = pagedList.data;
            } else {
              console.error('Error: Response does not contain a valid data property.', pagedList);
            }
          },
          error => {
            console.error('Error fetching persons:', error);
          }
        );
    }
  }