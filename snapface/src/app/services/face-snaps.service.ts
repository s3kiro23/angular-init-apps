import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  faceSnaps: FaceSnap[] = [
    {
      id: 1,
      title: 'oh my face!',
      description: 'This is my first face snap',
      createdDate: new Date(),
      snaps: 0,
      imageUrl: 'https://picsum.photos/200',
      snapped: false,
      btnText: 'Snap my face!',
      location: 'London',
    },
    {
      id: 2,
      title: 'three little things!',
      description: 'This is my other face snap',
      createdDate: new Date(),
      snaps: 0,
      imageUrl: 'https://picsum.photos/id/304/200',
      snapped: false,
      btnText: 'Snap it!',
      location: 'New York',
    },
    {
      id: 3,
      title: 'oh dear!',
      description: 'This is my last face snap',
      createdDate: new Date(),
      snaps: 0,
      imageUrl: 'https://picsum.photos/id/237/200',
      snapped: false,
      btnText: 'Snap it again!',
      location: 'Paris',
    },
  ];

  getAllFaceSnaps(): FaceSnap[] {
    return this.faceSnaps;
  }

  snapFaceSnapById(id: number): void {
    const faceSnap = this.faceSnaps.find((faceSnap) => faceSnap.id === id);
    if (!faceSnap) {
      throw new Error('FaceSnap not found');
    }
    faceSnap.snaps++;
    faceSnap.snapped = true;
    faceSnap.btnText = 'Snapped!';
  }

  unsnapFaceSnapById(id: number): void {
    const faceSnap = this.faceSnaps.find((faceSnap) => faceSnap.id === id);
    if (!faceSnap) {
      throw new Error('FaceSnap not found');
    }
    faceSnap.snaps--;
    faceSnap.snapped = false;
    faceSnap.btnText = 'Snap my face!';
  }
}
