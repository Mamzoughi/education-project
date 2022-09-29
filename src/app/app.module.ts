import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { SearchSectionComponent } from './component/search-section/search-section.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { CoursesComponent } from './component/courses/courses.component';
import { SubscribtionComponent } from './component/subscribtion/subscribtion.component';
import { EventsComponent } from './component/events/events.component';
import { BestTutorsComponent } from './component/best-tutors/best-tutors.component';
import { NewsComponent } from './component/news/news.component';
import { FooterComponent } from './component/footer/footer.component';
import { CourseComponent } from './component/course/course.component';
import { EventComponent } from './component/event/event.component';
import { TutorComponent } from './component/tutor/tutor.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './component/add-course/add-course.component';
import { AddEventComponent } from './component/add-event/add-event.component';
import { AdminComponent } from './component/admin/admin.component';
import { TeachersTableComponent } from './component/teachers-table/teachers-table.component';
import { CoursesTableComponent } from './component/courses-table/courses-table.component';
import { EventsTableComponent } from './component/events-table/events-table.component';
import { SearchComponent } from './component/search/search.component';
import { FilterEventsPipe } from './pipes/filter-events.pipe';
import { UsersTableComponent } from './component/users-table/users-table.component';
import { GenderDisplayPipe } from './pipes/gender-display.pipe';
import { CriptagePipe } from './pipes/criptage.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TeacherComponent } from './component/teacher/teacher.component';
import { StudentComponent } from './component/student/student.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { CommentComponent } from './component/comment/comment.component';
import { StudentQuizComponent } from './component/student-quiz/student-quiz.component';
import { TestComponent } from './component/test/test.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { StudentEvaluationComponent } from './component/student-evaluation/student-evaluation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchSectionComponent,
    WelcomeComponent,
    CoursesComponent,
    SubscribtionComponent,
    EventsComponent,
    BestTutorsComponent,
    NewsComponent,
    FooterComponent,
    CourseComponent,
    EventComponent,
    TutorComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AddCourseComponent,
    AddEventComponent,
    AdminComponent,
    TeachersTableComponent,
    CoursesTableComponent,
    EventsTableComponent,
    SearchComponent,
    FilterEventsPipe,
    UsersTableComponent,
    GenderDisplayPipe,
    CriptagePipe,
    SortPipe,
    TeacherComponent,
    StudentComponent,
    QuizComponent,
    CommentComponent,
    StudentQuizComponent,
    TestComponent,
    StudentEvaluationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
