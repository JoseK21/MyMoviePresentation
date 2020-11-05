import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { MyMovieServiceService } from './../../../my-movie-service.service';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

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
        type: 'string',
        filter: false
      },
      Gender: {
        title: 'Gender',
        type: 'string',
        filter: false
      },
      Community_Score: {
        title: 'Community Score',
        type: 'number',
        filter: false,
        editable: false
      },
      Style: {
        title: 'Style',
        type: 'string',
        filter: false
      },
      Popularity: {
        title: 'Popularity',
        type: 'string',
        filter: false
      },
      IMDB: {
        title: 'Image Url',
        type: 'number',
        filter: false
      },
      Image: {
        title: 'Image Url',
        type: 'string',
        filter: false
      },
      Favorite: {
        title: 'Favorite',
        filter: false,
        editor: {
          type: 'checkbox',
          config: {
            true: true,
            false: false,
          },
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private toastrService: NbToastrService, private service: SmartTableData, private dataService: MyMovieServiceService) {
    this.getMovies();
  }

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

      event.confirm.resolve(event.newData);
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
    this.showToast(this.types[3], null, 'One or more attributes are empty');
  }

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

    const { Name, Director, Year, Gender, Community_Score, Style, Popularity, Image, Favorite } = obj

    if (Name === '' || Director === '' || Year === '' || Gender === '' || Community_Score === '' || Style === '' || Popularity === '' || Image === '' || Favorite === '') {
      return true;
    }
    return false;
  }

  getMovies() {
    this.dataService.sendGetRequest().subscribe((data: any[]) => {
      console.log(data);
      if (data['status'] === 200) {
        //this.$Movies = data['data'];
        this.source.load(data['data']);
      }
    })
  }
}
