import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
    private apiUrl = 'https://localhost:7240';

  constructor(private http: HttpClient) { }

  savePerson(person: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/People/Create`, person);
    }
  
  getAllPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(`${this.apiUrl}/People/Index`);
      }
  getPersonDetails(id: number): Observable<Person> {
        return this.http.get<Person>(`${this.apiUrl}/details/${id}`);
      }
}
