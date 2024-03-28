import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Person } from './models/person.model';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
    private baseUrl = 'https://localhost:7240/';

  constructor(private http: HttpClient) { }

  savePerson(person: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}api/People/Create`, person, {headers: new HttpHeaders({"Content-Type": "application/json"})});
    }
  
  getAllPeople(page: number, pageSize: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}api/People/GetPagedList?pageNumber=${page}&pageSize=${pageSize}`);
      }
  getPersonDetails(id: number): Observable<Person> {
        const url = `${this.baseUrl}api/People/Details?id=${id}`;
        return this.http.get<Person>(url);
      }

  deletePerson(id: number): Observable<void> {
        const url = `${this.baseUrl}api/People/Delete?id=${id}`;
        return this.http.delete<void>(url);
      }

  getPersonById(id: string): Observable<Person> {
        const url = `${this.baseUrl}api/People/Edit?id=${id}`;
      return this.http.get<Person>(url, {headers: new HttpHeaders({"Content-Type": "application/json"})});
      }

  updatePerson(id: string, person: Person): Observable<Person> {
        const url = `${this.baseUrl}api/People/Edit?id=${id}`;
        return this.http.post<Person>(url, person);
      }

      getCountries(countries: Country[]): Observable<Country[]> {
        const url = 'https://restcountries.com/v3.1/all';
        return this.http.get<any[]>(url).pipe(
          map(data => {
            return data.map(country => ({
              name: country.name.common,
              code: country.cca2
            }));
          })
        );
      }
}
