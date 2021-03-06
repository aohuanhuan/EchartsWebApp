import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextStyleComponent} from './text-style.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [TextStyleComponent],
  exports: [TextStyleComponent]
})
export class TextStyleModule { }
