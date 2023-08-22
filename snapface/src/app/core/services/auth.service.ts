import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http
      .get<User[]>(`http://localhost:3000/users/?username=${username}`)
      .pipe(
        map((users) => {
          if (users.length === 0) {
            throw new Error(
              `La combinaison du mot de passe et de l'utilisateur n'existe pas`
            ); // L'utilisateur n'existe pas
          }
          return users[0];
        })
      );
  }

  login(formValue: { username: string; password: string }) {
    console.log(formValue.username);
    console.log(formValue.password);
    return this.getUserByUsername(formValue.username).pipe(
      tap((user) => {
        console.log(user);
        if (user.password !== formValue.password) {
          throw new Error(
            `La combinaison du mot de passe et de l'utilisateur n'existe pas`
          ); // L'utilisateur n'existe pas
        }
        this.token = 'MyFakeToken';
      })
    );
  }

  getToken(): string {
    return this.token;
  }

  createNewUser(formValue: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
  }): Observable<User> {
    return this.getAllUsers().pipe(
      map((facesnaps) => [...facesnaps].sort((a, b) => a.id - b.id)),
      map((sortedFaceSnaps) => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map((previousFaceSnap) => ({
        id: previousFaceSnap.id + 1,
        ...formValue,
      })),
      switchMap((newUser) =>
        this.http.post<User>('http://localhost:3000/users/', newUser)
      )
    );
  }
}
