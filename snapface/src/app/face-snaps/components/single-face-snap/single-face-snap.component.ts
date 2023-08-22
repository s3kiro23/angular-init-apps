import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss'],
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>;
  btnText!: string;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.btnText = 'Snap me!';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(id: number) {
    if (this.btnText === 'Snapped!') {
      this.faceSnap$ = this.faceSnapsService
        .snapFaceSnapById(id, 'unsnap')
        .pipe(
          tap(() => {
            this.btnText = 'Snap me!';
          })
        );
      return;
    }
    this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(id, 'snap').pipe(
      tap(() => {
        this.btnText = 'Snapped!';
      })
    );
  }
}
