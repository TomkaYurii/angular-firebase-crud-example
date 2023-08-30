import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { map } from 'rxjs/operators';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
    });
  }


  /*retrieveTutorials(): void {: Це оголошення методу retrieveTutorials в Angular-компоненті.
  Метод приймає нуль аргументів (void вказує на відсутність поверненого значення).

   this.tutorialService.getAll(): Цей код викликає метод getAll() з сервісу tutorialService.
   tutorialService є сервісом, який взаємодіє з Firebase Firestore і надає функціональність для отримання даних.

   .snapshotChanges(): Цей метод викликається на результаті getAll() і відображає зміни в документах Firestore
    реальному часі.

   .pipe(: Цей метод визначає потік операцій, які будуть застосовані до результату запиту Firestore перед
   підпискою на нього.

    map(changes =>: Ця операція map визначає функцію, яка буде застосована до кожного елементу потоку
    (у цьому випадку, до змін в документах Firestore).

    changes.map(c =>: Ця операція map визначає функцію, яка буде застосована до кожного об'єкта c в масиві changes.
    Вираз { id: c.payload.doc.id, ...c.payload.doc.data() } створює новий об'єкт, який містить id документа
    та всі дані документа, розпилюючи їх за допомогою оператора розпилення (...).

    .subscribe(data => {: Цей метод підписується на потік даних, отриманий після всіх операцій map.
    Коли дані будуть доступні, вони передаються в функцію data => {...}, де вони призначаються змінній this.tutorials.
*/

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
}
