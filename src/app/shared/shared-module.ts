import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureImagePipe } from './pipes/secure-image.pipe';
import { FloatingCopilotComponent } from './components/floating-copilot/floating-copilot';

@NgModule({
  declarations: [SecureImagePipe],
  imports: [CommonModule, FloatingCopilotComponent],
  exports: [SecureImagePipe, FloatingCopilotComponent]
})
export class SharedModule {}
