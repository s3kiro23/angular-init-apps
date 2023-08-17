import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss'],
})
export class FaceSnapComponent {
  @Input() faceSnap!: FaceSnap;

  constructor(private faceSnapsService: FaceSnapsService) {}

  onSnap() {
    if (this.faceSnap.snapped) {
      this.faceSnapsService.unsnapFaceSnapById(this.faceSnap.id);
      return;
    }
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id);
  }
}
