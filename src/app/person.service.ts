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
  
  getAllPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(`${this.apiUrl}/People/Index`);
      }
  getPersonDetails(id: number): Observable<Person> {
        return this.http.get<Person>(`${this.apiUrl}/details?id=${id}`, {headers: new HttpHeaders({"Content-Type": "application/json"})});
      }

  deletePerson(id: number): Observable<void> {
        const url = `${this.apiUrl}/People/Delete?id=${id}`;
        return this.http.delete<void>(url);
      }

  getPersonById(id: number): Observable<Person> {
        const url = `${this.apiUrl}/People/Edit?id=${id}`;
      return this.http.get<Person>(url, {headers: new HttpHeaders({"Content-Type": "application/json"})});
      }

  updatePerson(person: Person): Observable<Person> {
        const url = `${this.apiUrl}/People/Edit?id=${person.id}`;
        return this.http.post<Person>(url, person);
      }
}
