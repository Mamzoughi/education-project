import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CoursesService } from "src/app/services/courses.service";
import { QuizService } from "src/app/services/quiz.service";
import { UserService } from "src/app/services/user.service";
import { JwPaginationModule } from "jw-angular-pagination";

@Component({
  selector: "app-student-quiz",
  templateUrl: "./student-quiz.component.html",
  styleUrls: ["./student-quiz.component.css"],
})
export class StudentQuizComponent implements OnInit {
  studentId: string;
  test: any = {};
  quizForm = FormGroup;
  pageOfItems: Array<any>;
  quizTab: any = [];
  user: any = {};
  realisedQuiz:any={};

  constructor(
    private quizService: QuizService,
    private courseService: CoursesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.studentId = JSON.parse(localStorage.getItem("connectedUser")).id;
    this.courseService
      .getcoursesReservation(this.studentId)
      .subscribe((res) => {
        console.log(res.reservations);
        
        for (var i = 0; i < res.reservations.length; i++) {
          if(res.reservations[i].scoreTest==""){
            // alert(res.reservations[i].scoreTest)
            this.quizService.getQuizByCourseId(res.reservations[i].courseId).subscribe(
              data=>{this.quizTab.push(data.quizs)}
            )
          }
        }
                  console.log(this.quizTab)
              });
          }
      
  //     });
  // }

  check(courseId) {
    var messages = ["Good job", "Not bad", "You really need to do better"];
    var range;
    var correct = 0;

    this.quizService.getQuizByCourseId(courseId).subscribe((data) => {
      console.log(data.quizs);
      if (this.test.answerOne == data.quizs.rightAnswerOne) {
        correct = correct + 5;
      }
      if (this.test.answerTwo == data.quizs.rightAnswerTwo) {
        correct = correct + 5;
      }
      if (this.test.answerThree == data.quizs.rightAnswerThree) {
        correct = correct + 10;
      }
      console.log(correct);
      if (correct < 1) {
        range = 2;
      }
      if (correct > 0 && correct < 3) {
        range = 1;
      }

      document.getElementById("after_submit").style.visibility = "visible";
      document.getElementById("message").innerHTML = messages[range];
      document.getElementById("number_correct").innerHTML =
        "you got" + correct + "/20";

      this.courseService.getcoursesReservation(this.studentId).subscribe(
           data=>{console.log(data.reservations)
            this.realisedQuiz=data.reservations.find(obj=>{return obj.courseId== courseId})
            this.realisedQuiz.scoreTest=correct;
            this.courseService.addScoreQuiz(this.realisedQuiz).subscribe()
          }
        )
      // this.userService.getUserById(this.studentId).subscribe((dat) => {
      //   this.quizService
      //     .addQuizResponse({
      //       quizId: data.quizs,
      //       userId: this.studentId,
      //       score: correct,
      //     })
      //     .subscribe();
      //   this.user = dat.user;
      //   this.user.scoreQuiz = correct;
      //   console.log(this.user);
      //   this.userService.updateUser(this.user, this.user.img).subscribe();

      //   console.log("hi", dat.user);
      // });
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
