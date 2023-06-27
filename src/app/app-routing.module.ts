import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { PostsCardComponent } from './components/posts-card/posts-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "feed", component: FeedComponent},
  {path: "section", component: PostsCardComponent},
  {path: "profile/:id", component: ProfileComponent},
  {path: "profile/saved/:id", component: SavedPostsComponent},
  {path: "chat", component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
