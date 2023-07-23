import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { PostsCardComponent } from './components/posts-card/posts-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegisterComponent } from './components/register/register.component';
import { NotLoggedComponent } from './components/not-logged/not-logged.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: "login", component: LoginComponent},
  {path: "feed", component: FeedComponent},
  {path: "section", component: PostsCardComponent},
  {path: "profile/:id", component: ProfileComponent},
  {path: "bookmarks", component: SavedPostsComponent},
  {path: "chat", component: ChatComponent},
  {path: "register", component: RegisterComponent},
  {path: "liked", component: SavedPostsComponent},
  {path: "not-logged", component: NotLoggedComponent},
  {path: "404", component: NotFoundComponent},
  {path: "server-error", component: ServerErrorComponent},
  {path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
