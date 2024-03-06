import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent {
  person: Person;

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

  details(): void {
    const id = this.route.snapshot.params['id'];
    this.personService.getPersonById(id)
      .subscribe(response => {
        this.person = response;
      });
  }
}
