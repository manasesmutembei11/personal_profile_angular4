import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateParserFormatter, NgbDatepickerModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PersoncreateComponent } from './personcreate/personcreate.component';
import { PersonService } from './person.service';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { SharedComponent } from './shared/shared.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { PersonFormComponent } from './person-form/person-form.component';






const routes: Routes = [
  {path: '', component: SharedComponent, pathMatch: 'full'},
  {path: 'person', component: PersoncreateComponent},
  {path: 'personlist', component: PersonListComponent},
  {path: 'details/:id', component: PersonDetailsComponent},
  {path: 'edit/:id', component: ReactiveformComponent},

 
  
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersoncreateComponent,
    PersonListComponent,
    PersonDetailsComponent,
    PersonEditComponent,
    SharedComponent,
    ReactiveformComponent,
    PersonFormComponent,
    
   
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClient,NgForm, PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
