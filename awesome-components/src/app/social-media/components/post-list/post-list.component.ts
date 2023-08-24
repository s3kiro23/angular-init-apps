import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostsService } from '../../services/post.services';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.posts$ = this.route.data.pipe(map((data) => data['posts']));
  }

  onPostCommented(postCommented: { comment: string; postId: number }) {
    this.postsService.addNewComment(postCommented);
  }
}
