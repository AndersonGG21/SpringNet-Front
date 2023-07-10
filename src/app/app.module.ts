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
import { FilePondModule, registerPlugin } from "ngx-filepond";
import { CookieService } from 'ngx-cookie-service';
import { SkeletonModule } from 'primeng/skeleton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
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

import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import * as FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import * as FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import * as FilePondPluginImageResize from 'filepond-plugin-image-resize';
import * as FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import * as FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import * as FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import * as FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import * as FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';
import { ChatComponent } from './components/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
  FilePondPluginImageExifOrientation,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize
);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    NavbarComponent,
    StoriesComponent,
    PostsCardComponent,
    ProfileComponent,
    GridConfigComponent,
    SavedPostsComponent,
    ChatComponent,
    SidebarComponent,
    RegisterComponent
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
    ToastModule,
    FilePondModule,
    SkeletonModule,
    AutoCompleteModule,
    SocketIoModule.forRoot(config),
    AvatarModule
  ],
  providers: [MessageService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
