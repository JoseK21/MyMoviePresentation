import { Component, OnInit } from '@angular/core';
import { MyMovieServiceService } from 'app/my-movie.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';

import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {

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

  $Movies = [];
  showAlertMovie = false;
  showColors = false;


  constructor(private dataService: MyMovieServiceService, private toastrService: NbToastrService, private dialogService: NbDialogService) { }

  getMovies() {
    this.dataService.getMovies().subscribe((data: any[]) => {
      /* console.log(data); */
      if (data['status'] === 200) {
        this.$Movies = data['data'];
      }
    })
  }

  _getMovieGender(search_data) {
    this.dataService.getMovieGender(search_data).subscribe(data => {
      console.log(data);
      if (data['status'] === 200) {
        this.showAlertMovie = false;
        this.$Movies = data['data'];
        this.showColors = true;
      }
      if (data['status'] === 204) {
        this.showAlertMovie = true;
        this.$Movies = [];
        this.showColors = false;
      }
    }, error => {
      this.showAlertMovie = true;
      this.showColors = false;
      console.log("Error", error);
    })
  }

  ngOnInit() {
    this.getMovies();
  }

  clear() {
    (<HTMLInputElement>document.getElementById('IMDB')).value = '';
    (<HTMLInputElement>document.getElementById('MetaScore')).value = '';
    (<HTMLInputElement>document.getElementById('Community_Score')).value = '';
    (<HTMLInputElement>document.getElementById('Popularity')).value = '';
    this.currentGender = '';
    this.currentFavorite = '';
    this.showAlertMovie = false;
    this.showColors = false;
    
    this.getMovies();
  }

  showModalReview(ID, name) {
    this.dialogService.open(DialogNamePromptComponent, { context: { name: name, } })
      .onClose.subscribe(name => {
        let json = {comment: name.comment, score: name.note, id_movie: ID}

        this.dataService.addComment(json).subscribe(data => {
          /* console.log(data); */
          this.showToast(this.types[1], 'Review', 'Comment and note added');
        }, error => {
          this.showToast(this.types[4], 'Review', 'Internal server Error');
          console.log("Error", error);
        })
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
    let json = { Gender: this.currentGender, IMDB, MetaScore, Community_Score, Favorite: this.currentFavorite, Popularity }
    /* console.log(json); */
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
    this.index += 1;
    const titleContent = title ? `${this.index}. ${title}` : '';

    this.toastrService.show(body, `${titleContent}`, config);
  }

  openRandomToast() {
    this.showToast(this.types[3], 'Warning', 'Please digit all field');
  }
}
