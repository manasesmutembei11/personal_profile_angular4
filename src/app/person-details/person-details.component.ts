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
  public person: Person;
  selectedPerson: Person | null = null;

  constructor(private personService: PersonService, private route: ActivatedRoute) { }

  getPersonDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPersonDetails(id)
      .subscribe(
        (person: Person) => {
          this.person = person;
        },
        error => {
          console.error('Error fetching person details:', error);
        }
      );
  }


}
