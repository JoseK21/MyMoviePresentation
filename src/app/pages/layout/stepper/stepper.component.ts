import { MyMovieServiceService } from 'app/my-movie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbSearchService, NbDialogService } from '@nebular/theme';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';

import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  statuses: NbComponentStatus[] = [ 'primary', 'success', 'info', 'warning', 'danger' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
  
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  $Movies = [];
  __localMoview = [];
  value = '';
  showAlertMovie = false;

  constructor(private fb: FormBuilder, private dataService: MyMovieServiceService, private searchService: NbSearchService, private dialogService: NbDialogService) {
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        console.log('VALUE:', this.value);
        this._getMovieSearch(this.value);
      })
  }

  getMovies() {
    this.dataService.getMovies().subscribe((data: any[]) => {
      console.log(data);
      if (data['status'] === 200) {
        this.$Movies = data['data'];
        this.__localMoview = this.$Movies;
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
        this.showAlertMovie = false;
        this.$Movies = data['data'];
      }
      if (data['status'] === 204) {
        this.showAlertMovie = true;
        this.$Movies = [];
      }
    }, error => {
      this.showAlertMovie = true;
      console.log("Error", error);
    })
  }

  ngOnInit() {
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

  clear(){
    this.value = '';
    this.showAlertMovie = false;
    //this.$Movies = this.__localMoview
    this.getMovies();
  }
  COMMENT = ''
  NOTE = ''

  showModalReview(ID, name) {
    this.dialogService.open(DialogNamePromptComponent, {
      context: {
        name: name,
      }}
      )
      .onClose.subscribe(name => {
        this.COMMENT = name.comment;
        this.NOTE = name.note;
        console.log(ID);        
      });
  }

  open(movie) {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        data: movie,
      },
    });
  }
}
