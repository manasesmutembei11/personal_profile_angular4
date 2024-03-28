import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { BasePagedListComponent } from '../core/base-paged-list-component';
import { Person } from '../models/person.model';
import { Params } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent extends BasePagedListComponent implements OnInit,OnDestroy{
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
    this.personService.getAllPeople(this.page, this.pageSize)
      .subscribe( response => {
        this.people = response.data;
        this.page = response.metaData.currentPage;
        this.pageSize = response.metaData.pageSize;
        this.totalCount = response.metaData.totalCount;
        this.maxSize = response.metaData.totalPages;
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
    this.personService.getAllPeople(this.page, this.pageSize).subscribe(response => {
      this.totalCount = response.metaData.totalCount;
      this.people = response.data;
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
