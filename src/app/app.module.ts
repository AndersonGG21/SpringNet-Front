import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {BadgeModule} from 'primeng/badge';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MenuModule} from 'primeng/menu';
import { StoriesComponent } from './components/stories/stories.component';
import { PostsCardComponent } from './components/posts-card/posts-card.component';
import { MessageService } from 'primeng/api';
import { ProfileComponent } from './components/profile/profile.component';
import { GridConfigComponent } from './components/grid-config/grid-config.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    NavbarComponent,
    StoriesComponent,
    PostsCardComponent,
    ProfileComponent,
    GridConfigComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    BadgeModule,
    MenuModule,
    DialogModule,
    FileUploadModule,
    ProgressBarModule,
    ToastModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
