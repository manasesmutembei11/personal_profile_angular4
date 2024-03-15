import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../models/person.model';
import { BasePagedListComponent } from '../core/base-paged-list-component';
import { Params } from '@angular/router';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent extends BasePagedListComponent implements OnDestroy{
    people: Person[] = [];
    

  
    constructor(private personService: PersonService) { 
      super();
    }
  
    ngOnInit(): void {
      this.getAllPeople();
    }

    ngOnDestroy(): void {
      this.destroy();
    }
  
    getAllPeople(): void {
      this.personService.getAllPeople(this.page)
        .subscribe(
          (pagedList: any) => {
            if (pagedList && pagedList.data && Array.isArray(pagedList.data)) {
              this.people = pagedList.data;
              this.page = pagedList.pageNumber;
              this.totalCount = pagedList.totalItems;
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
    loadItems(): any {
      this.personService.getAllPeople(this.page).subscribe((data: any) => {
        this.totalCount = data.totalCount;
        this.people = data.items;
      });
    }
  
    fetchPagingParams(params: Params): void {
      super.fetchPagingParams(params);
    }

    onPageChange(page: number) {
      this.page = page; 
      this.getAllPeople(); 
    }
  }