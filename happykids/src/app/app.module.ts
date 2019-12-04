import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { CmsComponent } from './cms/cms.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieframeComponent } from './movieframe/movieframe.component';
import { QuizComponent } from './quiz/quiz.component';
import { CartoonframeComponent } from './cartoonframe/cartoonframe.component';
import { ServiceoneService } from './serviceone.service';
import { QuizframeoneComponent } from './quizframeone/quizframeone.component';
import { QuizframetwoComponent } from './quizframetwo/quizframetwo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizstandingsComponent } from './quizstandings/quizstandings.component';
import {FileUploadModule} from 'ng2-file-upload';
import { FileService } from './file.service';
import { ProfileComponent } from './profile/profile.component';
import { PoemComponent } from './poem/poem.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SliderComponent,
    FooterComponent,
    AdminComponent,
    CmsComponent,
    MovieframeComponent,
    QuizComponent,
    CartoonframeComponent,
    QuizframeoneComponent,
    QuizframetwoComponent,
    LoginComponent,
    RegisterComponent,
    QuizstandingsComponent,
    ProfileComponent,
    PoemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule

  ],
  providers: [
    ServiceoneService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
