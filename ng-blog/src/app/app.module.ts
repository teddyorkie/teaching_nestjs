import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogModule } from './blog/BlogModule';
import { RedditSearchComponent } from './reddit-search/reddit-search.component';

@NgModule({
  declarations: [
    AppComponent,
    RedditSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
