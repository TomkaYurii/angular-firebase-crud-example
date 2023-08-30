import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private dbPath = '/tutorials';

  // Цей клас створює посилання на колекцію Firestore.
  // Посилання та запит надаються в конструкторі.
  tutorialsRef: AngularFirestoreCollection<Tutorial>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef;
  }


  // У цьому коді ...tutorial - це оператор "розпилення" (spread operator) в TypeScript і JavaScript.
  // Цей оператор використовується для створення нового об'єкта або масиву, який містить всі властивості
  // (або елементи, у випадку масиву) з існуючого об'єкта або масиву.
  // У даному контексті { ...tutorial } створює копію об'єкта tutorial із всіма його властивостями.
  // Це може бути корисним, наприклад, якщо у вас є об'єкт tutorial, і ви хочете зберегти його копію у базі даних,
  // але не змінювати початковий об'єкт.
  create(tutorial: Tutorial): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
