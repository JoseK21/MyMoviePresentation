import { MyMovieServiceService } from 'app/my-movie.service';
import { Component, OnInit } from '@angular/core';
import { NbSearchService, NbDialogService, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  
  $Movies = [];
  value = '';
  showAlertMovie = false;

  constructor(private dataService: MyMovieServiceService, private toastrService: NbToastrService, private searchService: NbSearchService, private dialogService: NbDialogService) {
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this._getMovieSearch(this.value);
      })
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.dataService.getMovies().subscribe((data: any[]) => {
      /* console.log(data); */
      if (data['status'] === 200) {
        this.$Movies = data['data'];
      }
    })
  }

  _getMovieSearch(search) {
    this.dataService.getMovieSearch(search).subscribe(data => {
      /* console.log(data); */
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

  clear() {
    this.value = '';
    this.showAlertMovie = false;
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

  destroyByClick = true;
  duration = 2500;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  index = 1;

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

  open(movie) {
    this.dialogService.open(ShowcaseDialogComponent, { context: { data: movie, }, });
  }
}
