import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chapter1',
  templateUrl: './chapter1.component.html',
  styleUrls: ['./chapter1.component.css']
})
export class Chapter1Component {
  id: any; 

  constructor(private route: ActivatedRoute, private router: Router) {}


  findLesson(lesson: number) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    var totalNumber = ((this.id - 1) * 6) + lesson; 

    this.router.navigate(['/lesson/', totalNumber]);

  }

}
