import { NgModule } from '@angular/core';
import { PostListModule } from './list/PostListModule';
import { PostResource } from './services/PostResource';
import { PostService } from './services/PostService';

@NgModule({
    imports: [ 
        PostListModule ],
    exports: [
        PostListModule
    ],
    declarations: [],
    providers: [
        PostService,
        PostResource
    ],
})
export class BlogModule { }
