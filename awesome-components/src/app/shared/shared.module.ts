import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UserNamePipe } from './pipes/username.pipe';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
    declarations: [
        CommentsComponent,
        ShortenPipe,
        UserNamePipe,
        TimeAgoPipe,
        HighlightDirective,
    ],
    imports: [CommonModule, MaterialModule, ReactiveFormsModule],
    exports: [
        CommentsComponent,
        MaterialModule,
        ReactiveFormsModule,
        ShortenPipe,
        UserNamePipe,
        TimeAgoPipe,
        HighlightDirective,
    ],
})
export class SharedModule {}
