import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person.model';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent{
    person: Person;
    error = '';

    people: Person[] = [];
  
    constructor(private personService: PersonService) { }
  
    ngOnInit(): void {
      this.getAllPeople();
    }
  
    getAllPeople(): void {
      this.personService.getAllPeople()
        .subscribe(
          (pagedList: any) => {
            
            if (pagedList && pagedList.data && Array.isArray(pagedList.data)) {
              this.people = pagedList.data;
            } else {
              console.error('Error: Response does not contain a valid data property.', pagedList);
            }
          },
          error => {
            console.error('Error fetching persons:', error);
          }
        );
    }


    deletePerson(id: number): void {
      const confirmed = window.confirm('Are you sure you want to delete this person?');
      if (confirmed) {
        this.personService.deletePerson(id)
          .subscribe(() => {
            this.people = this.people.filter(p => p.id !== id);
          }, Response=>{
            console.log(Response);
          }
          
          );
      }
    } 
  }