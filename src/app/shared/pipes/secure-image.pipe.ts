import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { SecureImageService, ImageLoadOptions } from '../services/secure-image.service';

@Pipe({
  name: 'secureImage',
  pure: true,
  standalone: false
})
export class SecureImagePipe implements PipeTransform {
  constructor(private secureImageService: SecureImageService) {}

  transform(
    imagePath: string | null | undefined,
    category: 'projects' | 'avatars' | 'general' = 'general',
    fallback?: string
  ): Observable<string> {
    const options: ImageLoadOptions = { category, fallback };
    return this.secureImageService.getImageUrl(imagePath, options);
  }
}
