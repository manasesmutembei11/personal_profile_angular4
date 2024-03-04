import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PersoncreateComponent } from './personcreate/personcreate.component';
import { PersonService } from './person.service';
import { PersonListComponent } from './person-list/person-list.component';




const routes: Routes = [
  {path: '', component: HeaderComponent},
  {path: 'person', component: PersoncreateComponent},
  {path: 'personlist', component: PersonListComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersoncreateComponent,
    PersonListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClient,NgForm, PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
