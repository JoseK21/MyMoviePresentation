import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent implements OnInit {

  @Input() data: object;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {}

  title = 'test'

  ngOnInit() {
    console.log(this.data);
    
  }
  dismiss() {
    this.ref.close();
  }
}
