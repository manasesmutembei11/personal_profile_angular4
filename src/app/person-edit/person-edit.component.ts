import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Person } from '../models/person.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent {
 /* person: Person;


  constructor(private route: ActivatedRoute, private personService: PersonService,private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.personService.getPersonById(id)
      .subscribe(response => {
        this.person = response;
      });
  }

  updatePerson(): void {
   this.personService.updatePerson(this.person)
      .subscribe(Response => {
        window.confirm('Confirm to save changes')
        this.personService.savePerson(this.person)
        console.log(Response)
        this.router.navigate(['/personlist']);
      }, error => {
        console.log(error)
      });  
  }
 */

}
