import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCourseComponent } from './component/add-course/add-course.component';
import { AddEventComponent } from './component/add-event/add-event.component';
import { AdminComponent } from './component/admin/admin.component';
import { BestTutorsComponent } from './component/best-tutors/best-tutors.component';
import { CoursesComponent } from './component/courses/courses.component';
import { EventsComponent } from './component/events/events.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { SearchSectionComponent } from './component/search-section/search-section.component';
import { SearchComponent } from './component/search/search.component';
import { SignupComponent } from './component/signup/signup.component';
import { StudentQuizComponent } from './component/student-quiz/student-quiz.component';
import { StudentComponent } from './component/student/student.component';
import { TeacherComponent } from './component/teacher/teacher.component';
import { UsersTableComponent } from './component/users-table/users-table.component';
import { AdminGuard } from './guard/admin.guard';
import { StudentGuard } from './guard/student.guard';
import { TeacherGuard } from './guard/teacher.guard';
import { TestComponent } from './component/test/test.component';
import { StudentEvaluationComponent } from './component/student-evaluation/student-evaluation.component';


const routes: Routes = [{path:"",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"signup/student",component:SignupComponent},
{path:"signup/teacher",component:SignupComponent},
{path:"signup/admin",component:SignupComponent},
{path:"userForm/:id",component:SignupComponent},

{path:"courses",component:CoursesComponent},
{path:"coursesReservation",component:CoursesComponent,canActivate:[StudentGuard]},
{path:"course/:id",component:CoursesComponent},
{path:"events",component:EventsComponent},
{path:"eventsReservation",component:EventsComponent,canActivate:[StudentGuard]},
{path:"events/:id",component:EventsComponent},
{path:"eventForm/:id",component:AddEventComponent},
{path:"addCourse",component:AddCourseComponent},
{path:"coursForm/:id",component:AddCourseComponent},
{path:"addEvent",component:AddEventComponent},
{path:"trainers/tutors",component:BestTutorsComponent},
{path:"trainer/:id",component:BestTutorsComponent},
{path:"test",component:TestComponent},
{path:"search-section",component:SearchComponent},
{path:"evaluation/:id",component:StudentEvaluationComponent,canActivate:[TeacherGuard]},
{path:"administration",component:AdminComponent,canActivate:[AdminGuard]},
{path:"home/teacher",component:HomeComponent,canActivate:[TeacherGuard]},
{path:"home/student",component:HomeComponent,canActivate:[StudentGuard]},
{path:"quiz",component:StudentQuizComponent,canActivate:[StudentGuard]},
{path:"home/admin",component:HomeComponent,canActivate:[AdminGuard]},
{path:"teacherSpace",component:TeacherComponent,canActivate:[TeacherGuard]},
{path:"studentlist/:id",component:UsersTableComponent,canActivate:[TeacherGuard]},
{path:"quiz/:id",component:QuizComponent,canActivate:[TeacherGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
