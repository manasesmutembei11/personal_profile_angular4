import { Component } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  page = 1; 
  pageSize = 1; 
  totalItems = 0; 
  people: any[] = []; 

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.getAllPeople(); 
  }

  getAllPeople(): void {
    this.personService.getAllPeople(this.page)
      .subscribe(
        (pagedList: any) => {
          if (pagedList && pagedList.data && Array.isArray(pagedList.data)) {
            this.people = pagedList.data;
            this.page = pagedList.pageNumber;
            this.totalItems = pagedList.totalItems;
            this.pageSize = pagedList.pageSize;
          } else {
            console.log('Error: Response does not contain a valid data property.', pagedList);
          }
        },
        error => {
          console.log('Error fetching persons:', error);
        }
      );
  }

  onPageChange(page: number) {
    this.page = page; 
    this.getAllPeople(); 
  }
}
