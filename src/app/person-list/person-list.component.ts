import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../models/person.model';
import { BasePagedListComponent } from '../core/base-paged-list-component';
import { Params } from '@angular/router';
import { first } from 'rxjs';
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
    this.personService.getAllPeople(this.page, this.pageSize).subscribe({
      next:(_)=>{
        this.people = _.data;       
        this.totalCount = _.metaData.totalCount;       
      }
    })
      
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
    //this.page = page; 
    this.getAllPeople(); 
  }
  }