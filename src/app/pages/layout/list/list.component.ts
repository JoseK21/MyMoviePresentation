import { MyMovieServiceService } from 'app/my-movie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbSearchService, NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';

import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {

  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'];
  shapes: NbComponentShape[] = ['rectangle', 'semi-round', 'round'];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  COMMENT = ''
  NOTE = ''
  currentGender = '';
  currentFavorite = '';

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  $Movies = [];
  __localMoview = [];
  showAlertMovie = false;

  constructor(private fb: FormBuilder, private dataService: MyMovieServiceService, private toastrService: NbToastrService, private dialogService: NbDialogService) { }

  getMovies() {
    this.dataService.getMovies().subscribe((data: any[]) => {
      console.log(data);
      if (data['status'] === 200) {
        this.$Movies = data['data'];
        this.__localMoview = this.$Movies;
      }
    })
  }

  _getMovieGender(search_data) {
    this.dataService.getMovieGender(search_data).subscribe(data => {
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

  clear() {
    (<HTMLInputElement>document.getElementById('IMDB')).value = '';
    (<HTMLInputElement>document.getElementById('MetaScore')).value = '';
    (<HTMLInputElement>document.getElementById('Community_Score')).value = '';
    (<HTMLInputElement>document.getElementById('Popularity')).value = '';
    this.currentGender = '';
    this.currentFavorite = '';



    this.showAlertMovie = false;
    //this.$Movies = this.__localMoview
    this.getMovies();
  }

  showModalReview(ID, name) {
    this.dialogService.open(DialogNamePromptComponent, { context: { name: name, } })
      .onClose.subscribe(name => {
        this.COMMENT = name.comment;
        this.NOTE = name.note;
        console.log(ID);
      });
  }

  open(movie) {
    this.dialogService.open(ShowcaseDialogComponent, { context: { data: movie, }, });
  }

  changeGender(gender: string) {
    this.currentGender = gender;
  }

  changeFavorite(favorite: string) {
    this.currentFavorite = favorite;
  }

  searchGender(IMDB, MetaScore, Community_Score, Popularity) {
    console.log(this.currentFavorite);
    
    let json = { Gender: this.currentGender, IMDB, MetaScore, Community_Score, Favorite: this.currentFavorite, Popularity }
    console.log(json);
    if (json.Gender.trim() === '' || json.IMDB.trim() === '' || json.MetaScore.trim() === '' || json.Community_Score.trim() === '' || json.Favorite.trim() === '' || json.Popularity.trim() === '') {
      this.openRandomToast();
    } else {
      this._getMovieGender(json)
    }
  }

  index = 1;
  destroyByClick = true;
  duration = 2500;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
  }

  openRandomToast() {
    this.showToast(this.types[3], null, 'Please digit all field');
  }
}
