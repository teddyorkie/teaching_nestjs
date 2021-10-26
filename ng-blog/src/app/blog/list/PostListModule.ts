import { NgModule } from '@angular/core';
import { PostListComponent } from './PostListComponent';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        MatCardModule,
    ],
    exports: [],
    declarations: [
        PostListComponent
    ],
    providers: [
        PostListComponent
    ],
})
export class PostListModule { }
