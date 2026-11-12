import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ImageLoadOptions {
  fallback?: string;
  category?: 'projects' | 'avatars' | 'general';
}

@Injectable({
  providedIn: 'root'
})
export class SecureImageService implements OnDestroy {
  private serverUrl = environment.serverUrl.endsWith('/')
    ? environment.serverUrl.slice(0, -1)
    : environment.serverUrl;

  private defaultProjectCover =
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop';
  private defaultAvatar =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop';

  // Cache normalized paths to Observable<string (ObjectURL)>
  private cache = new Map<string, Observable<string>>();
  // Track created object URLs so they can be revoked on cleanup
  private createdUrls = new Set<string>();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      (window as any).__secureImageService = this;
    }
  }

  /**
   * Returns an Observable of a safe browser ObjectURL or fallback URL.
   * If the input is already an external URL (e.g. Unsplash), it is returned directly.
   * If the image is protected (/uploads/...), it is fetched via authenticated GET as Blob.
   */
  getImageUrl(
    imagePath: string | null | undefined,
    options: ImageLoadOptions = {}
  ): Observable<string> {
    const fallback =
      options.fallback ||
      (options.category === 'avatars'
        ? this.defaultAvatar
        : this.defaultProjectCover);

    if (!imagePath || typeof imagePath !== 'string') {
      return of(fallback);
    }

    const trimmed = imagePath.trim();
    if (!trimmed) {
      return of(fallback);
    }

    // Direct HTTP/HTTPS external links
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return of(trimmed);
    }

    // Normalize path
    const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    const fullApiUrl = `${this.serverUrl}${normalizedPath}`;

    // Return existing cached observable if present
    if (this.cache.has(normalizedPath)) {
      return this.cache.get(normalizedPath)!;
    }

    const load$ = this.http
      .get(fullApiUrl, { responseType: 'blob' })
      .pipe(
        map((blob: Blob) => {
          const objectUrl = URL.createObjectURL(blob);
          this.createdUrls.add(objectUrl);
          return objectUrl;
        }),
        catchError((err) => {
          // On 401, 403, 404, or network error, return the clean fallback image
          return of(fallback);
        }),
        shareReplay(1)
      );

    this.cache.set(normalizedPath, load$);
    return load$;
  }

  /**
   * Clear memory cache and revoke created Object URLs (e.g., on logout or tenant change)
   */
  clearCache(): void {
    this.createdUrls.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {}
    });
    this.createdUrls.clear();
    this.cache.clear();
  }

  ngOnDestroy(): void {
    this.clearCache();
  }
}
