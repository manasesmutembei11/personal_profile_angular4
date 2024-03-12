import { Component, EventEmitter } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../models/person.model';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent{
    person: Person;
    people: Person[] = [];
    pageNumber: number = 1;
    totalItems: number;
    pageSize: number;
    

  
    constructor(private personService: PersonService) { }
  
    ngOnInit(): void {
      this.getAllPeople();
    }
  
    getAllPeople(): void {
      this.personService.getAllPeople(this.pageNumber)
        .subscribe(
          (pagedList: any) => {
            if (pagedList && pagedList.data && Array.isArray(pagedList.data)) {
              this.people = pagedList.data;
              this.pageNumber = pagedList.pageNumber;
              this.totalItems = pagedList.totalItems;
              this.pageSize = pagedList.pageSize
            } else {
              console.log('Error: Response does not contain a valid data property.', pagedList);
            }
          },

          error => {
            console.log('Error fetching persons:', error);
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
    onPageChange(pageNumber: number) {
      this.pageNumber = pageNumber; 
      this.getAllPeople(); 
    }

  }