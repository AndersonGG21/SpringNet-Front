import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsCardComponent } from './components/posts-card/posts-card.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "feed", component: FeedComponent},
  {path: "section", component: PostsCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
