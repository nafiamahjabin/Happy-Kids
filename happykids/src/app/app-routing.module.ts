import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { CmsComponent } from './cms/cms.component';
import { MovieframeComponent } from './movieframe/movieframe.component';
import { QuizComponent } from './quiz/quiz.component';
import { CartoonframeComponent } from './cartoonframe/cartoonframe.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizframeoneComponent } from './quizframeone/quizframeone.component';
import { QuizframetwoComponent } from './quizframetwo/quizframetwo.component';
import { QuizstandingsComponent } from './quizstandings/quizstandings.component';
import { ProfileComponent } from './profile/profile.component';
import { PoemComponent } from './poem/poem.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'cms',
    component: CmsComponent
  },
  {
    path: 'movie',
    component: MovieframeComponent
  },
  {
    path: 'set-quiz-test',
    component: QuizComponent
  },
  {
    path: 'cartoon',
    component: CartoonframeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'quiz-tests',
    component: QuizframeoneComponent
  },
  {
    path:'quiz',
    component: QuizframetwoComponent
  },
  {
    path: 'quiz-tests/standings',
    component: QuizstandingsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'poem',
    component: PoemComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
