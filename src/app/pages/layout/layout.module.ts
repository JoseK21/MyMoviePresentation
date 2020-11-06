import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbRouteTabsetModule,
  NbAccordionModule,
  NbCheckboxModule,
  NbStepperModule,
  NbTabsetModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbUserModule,
  NbIconModule,
  NbInputModule,
  NbActionsModule,
  NbSpinnerModule,
  NbSelectModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { Tab1Component, Tab2Component, TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ListComponent } from './list/list.component';
import { InfiniteListComponent } from './infinite-list/infinite-list.component';
import { NewsPostComponent } from './infinite-list/news-post/news-post.component';
import { NewsPostPlaceholderComponent } from './infinite-list/news-post-placeholder/news-post-placeholder.component';
import { AccordionComponent } from './accordion/accordion.component';
import { NewsService } from './news.service';
import { NbAlertModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';

@NgModule({
  imports: [
    LayoutRoutingModule,
    ReactiveFormsModule,
    NbRouteTabsetModule,
    NbAccordionModule,
    NbStepperModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbIconModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    NbActionsModule,
    NbSpinnerModule,
    NbSelectModule,
  ],
  declarations: [
    LayoutComponent,
    TabsComponent,
    Tab1Component,
    Tab2Component,
    StepperComponent,
    ListComponent,
    NewsPostPlaceholderComponent,
    InfiniteListComponent,
    NewsPostComponent,
    AccordionComponent,
  ],
  providers: [
    NewsService,
  ],
})
export class LayoutModule { }
