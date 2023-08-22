import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineFormComponent } from './components/inlineForm/inlineForm.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [InlineFormComponent],
  exports: [InlineFormComponent],
})
export class InlineFormModule {}
