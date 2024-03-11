import { Component } from '@angular/core';
import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  person: Person;
  people: Person[] = [];
  currentPage: number = 1;
  totalItems: number;
  pageSize: number;
  


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getAllPeople();
  }

  getAllPeople(): void {
    this.personService.getAllPeople(this.currentPage)
      .subscribe(
        (pagedList: any) => {
          if (pagedList && pagedList.data && Array.isArray(pagedList.data)) {
            this.people = pagedList.data;
            this. currentPage = pagedList.pageNumber;
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

}
