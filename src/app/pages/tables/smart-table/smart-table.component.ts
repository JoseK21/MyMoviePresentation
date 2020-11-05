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

  constructor(private toastrService: NbToastrService, private _domSanitizer: DomSanitizer, private service: SmartTableData, private dataService: MyMovieServiceService) {
    this.getMovies();
    //this.testPOST();
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
            selectText: 'Select',
            list: [
              { value: 'Acción', title: 'Acción' },
              { value: 'Aventura', title: 'Aventura' },
              { value: 'Ciencia ficción', title: 'Ciencia ficción' },
              { value: 'Comedia', title: 'Comedia' },
              { value: 'Crimen', title: 'Crimen' },
              { value: 'Musicales', title: 'Musicales' },
              { value: 'Romance', title: 'Romance' },
              { value: 'Suspenso', title: 'Suspenso' },
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

  onSaveConfirm(event): void {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (this.hasEmptyValue(event.newData)) {
      this.openRandomToast();
    } else {
      console.log(event.newData);
      this.dataService.createMovie(event.newData).subscribe(
        data => {
          console.log("POST Request is successful ", data);
          event.confirm.resolve(data['data']);
        },
        error => {
          console.log("Error", error);
        }
      )
    }
  }

  /**
   * testPOST
   */
  public testPOST() {
    var v = {
      Name: "Van 3",
      Director: "Stephen Sommers",
      Year: 2004,
      Gender: "Fantasía oscura",
      Language: "Inglés",
      Favorite: true,
      Community_Score: 8.0,
      IMDB: 10.0,
      Style: "heroes",
      MetaScore: 10.0,
      Popularity: 50.0,
      Image: "https://www.bolsamania.com/cine/wp-content/uploads/2017/07/1-35.jpg"
    }

    this.dataService.createMovie(v).subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    )
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
    this.showToast(this.types[3], null, 'One or more attributes are empty');
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
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Toast ${this.index}${titleContent}`,
      config);
  }

  public hasEmptyValue(obj) {
    const { Name, Director, Year, Gender, Language, Community_Score, Style, Popularity, Image } = obj
    //console.log(obj);

    if (Name === '' || Director === '' || Year === '' || Gender === '' || Language === '' || Community_Score === '' || Style === '' || Popularity === '' || Image === '') {
      return true;
    }
    return false;
  }

  getMovies() {
    this.dataService.sendGetRequest().subscribe((data: any[]) => {
      //console.log(data);
      if (data['status'] === 200) {
        //this.$Movies = data['data'];
        this.source.load(data['data']);
      }
    })
  }
}
