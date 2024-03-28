import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person.model';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent {
  person: Person;

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.personService.getPersonDetails(id).subscribe({
      next:(_)=>{
        this.person = _;
        console.log("Person => ",_);
      },
      error:()=>{}
    })
       
  }
}
