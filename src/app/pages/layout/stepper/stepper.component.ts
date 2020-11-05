import { MyMovieServiceService } from 'app/my-movie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  $Movies = [];

  constructor(private fb: FormBuilder, private dataService: MyMovieServiceService) { }

  getMovies() {
    this.dataService.getMovies().subscribe((data: any[]) => {
      console.log(data);
      if (data['status'] === 200) {
        this.$Movies = data['data'];
      }
    })
  }

  _getMovieGender(gender) {
    this.dataService.getMovieGender(gender).subscribe(
      data => {
        console.log(data);
        if (data['status'] === 200) {
          this.$Movies = data['data'];
        }
      }, error => {
        console.log("Error", error);
      })
  }

  _getMovieSearch(search) {
    this.dataService.getMovieSearch(search).subscribe(data => {
      console.log(data);
      if (data['status'] === 200) {
        this.$Movies = data['data'];
      }
    }, error => {
      console.log("Error", error);
    })
  }

  ngOnInit() {

    //this._getMovieGender('Accion')
    //this._getMovieSearch('Avengers')
    this.getMovies();

    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
