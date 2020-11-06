import { Component, Input } from '@angular/core';
import { NbDialogRef, NbComponentStatus, NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {

  @Input() name: string;
  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  index = 1;
  destroyByClick = true;
  duration = 2500;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  title = 'HI there!';
  content = `I'm cool toaster!`;

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>, private toastrService: NbToastrService) { }

  cancel() {
    this.ref.close();
  }

  submit(comment: string, note: string) {


    let data = { 'comment': comment, 'note': parseInt(note) }
    console.log('data>', data);

    if (comment.trim() == '' || note.trim() == '') {
      this.openRandomToast();
    } else {
      this.ref.close(data);
    }

  }

  openRandomToast() {
    this.showToast(this.types[3], null, 'Please digit both field');
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

}
