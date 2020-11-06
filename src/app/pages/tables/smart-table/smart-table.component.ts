import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { MyMovieServiceService } from './../../../my-movie.service';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  source: LocalDataSource = new LocalDataSource();

  constructor(private toastrService: NbToastrService, private _domSanitizer: DomSanitizer, private dataService: MyMovieServiceService) {
    this.getMovies();
  }


  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Loading...',
    columns: {
      Name: {
        title: 'Name',
        type: 'string',
      },
      Director: {
        title: 'Director',
        type: 'string',
        filter: false
      },
      Year: {
        title: 'Year',
        type: 'number',
        filter: false
      },
      Gender: {
        title: 'Gender',
        type: 'string',
        filter: false,
        editor: {
          type: 'list',
          config: {
            selectText: 'Action',
            list: [
              { value: 'Action', title: 'Action' },
              { value: 'Adventure', title: 'Adventure' },
              { value: 'Science fiction', title: 'Science fiction' },
              { value: 'Comedy', title: 'Comedy' },
              { value: 'Crime', title: 'Crime' },
              { value: 'Musicals', title: 'Musicals' },
              { value: 'Romance', title: 'Romance' },
              { value: 'Suspense', title: 'Suspense' },
              { value: 'Terror', title: 'Terror' }
            ]
          },
        }
      },
      Language: {
        title: 'Language',
        type: 'string',
        filter: false,
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'English', title: 'English' },
              { value: 'Spanish', title: 'Spanish' },
              { value: 'French', title: 'French' },
              { value: 'German', title: 'German' },
              { value: 'Other', title: 'Other' }
            ]
          },
        }
      },
      Favorite: {
        title: 'Favorite',
        filter: false,
        editor: {
          type: 'checkbox',
          config: {
            true: 1,
            false: 0,
          },
        },
      },
      Community_Score: {
        title: 'Community Score',
        type: 'number',
        filter: false,
        editable: false
      },
      Image: {
        title: 'Image Url',
        filter: false,
        type: 'html',
        valuePrepareFunction: (Image) => {
          return this._domSanitizer.bypassSecurityTrustHtml(`<img src="${Image}" alt="error" height="50" width="50">`);
        },
      },
      IMDB: {
        title: 'IMDB',
        type: 'number',
        filter: false
      },
      Style: {
        title: 'Style',
        type: 'string',
        filter: false,
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Anthology film', title: 'Anthology film' },
              { value: 'Art film', title: 'Art film' },
              { value: 'Art horror', title: 'Art horror' },
              { value: 'Arthouse action film', title: 'Arthouse action film' },
              { value: 'Classical Hollywood cinema', title: 'Classical Hollywood cinema' },
              { value: 'Collage film', title: 'Collage film' },
              { value: 'Composite film', title: 'Composite film' },
              { value: 'Database cinema', title: 'Database cinema' },
              { value: 'European art cinema', title: 'European art cinema' },
              { value: 'Experimental film', title: 'Experimental film' },
              { value: 'Film- poem', title: 'Film- poem' },
              { value: 'Hyperlink cinema', title: 'Hyperlink cinema' },
              { value: 'Machinima', title: 'Machinima' },
              { value: 'Neo- Baroque film', title: 'Neo- Baroque film' },
              { value: 'Oneiric (film theory)', title: 'Oneiric (film theory)' },
              { value: 'Socialist realism', title: 'Socialist realism' },
              { value: 'Video film era', title: 'Video film era' },
              { value: 'Woman\'s film', title: 'Woman\'s film' },
            ],
          }
        }
      },
      MetaScore: {
        title: 'MetaScore',
        type: 'number',
        filter: false
      },
      Popularity: {
        title: 'Popularity',
        type: 'number',
        filter: false
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    /* console.log(event.newData); */

    if (this.hasEmptyValue(event.newData)) {
      this.openRandomToast();
    } else {
      /* console.log(event.newData); */
      this.dataService.updateMovie(event.newData).subscribe(
        data => {
          /* console.log("PUT Request is successful ", data); */
          event.confirm.resolve(data['data']);
        },
        error => {
          console.log("Error", error);
        }
      )
    }
  }

  onCreateConfirm(event): void {
    if (this.hasEmptyValue(event.newData)) {
      this.openRandomToast();
    } else {
      /* console.log(event.newData); */
      this.dataService.createMovie(event.newData).subscribe(
        data => {
         /*  console.log("POST Request is successful ", data); */
          event.confirm.resolve(data['data']);
        },
        error => {
          console.log("Error", error);
        }
      )
    }
  }

  index = 1;
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  title = 'HI there!';
  content = `I'm cool toaster!`;

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  quotes = [
    { title: null, body: 'One or more attributes are empty' },
    { title: null, body: 'Titles are not always needed' },
    { title: null, body: 'Toastr rock!' },
  ];


  openRandomToast() {
    this.showToast(this.types[3], 'Warning', 'One or more attributes are empty');
  }

  /*   setList() {
      this.settings.columns.Style.editor.config.list = [{ value: 'Option 1', title: 'Option 1' },
              { value: 'Option 2', title: 'Option 2' },
              { value: 'Option 3', title: 'Option 3' },
              { value: 'Option 4', title: 'Option 4' },
              { value: 'Option 5', title: 'Option 5' },
              { value: 'Option 6', title: 'Option 6' },
      ];
    } */

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

  public hasEmptyValue(obj) {
    const { Name, Director, Year, Gender, Language, Community_Score, Style, Popularity, Image } = obj
    /* console.log(obj); */

    if (Name === '' || Director === '' || Year === '' || Gender === '' || Language === '' || Community_Score === '' || Style === '' || Popularity === '' || Image === '') {
      return true;
    }
    return false;
  }

  getMovies() {
    this.dataService.getMovies().subscribe((data: any[]) => {
      /* console.log(data); */
      if (data['status'] === 200) {
        //this.$Movies = data['data'];
        this.source.load(data['data']);
      }
    })
  }
}
