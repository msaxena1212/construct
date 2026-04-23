import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IProjectDocument } from '../../../../shared/interfaces/project.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-site-gallery',
  standalone: false,
  templateUrl: './site-gallery.html',
  styleUrl: './site-gallery.scss',
})
export class SiteGallery implements OnInit, OnChanges {
  @Input() projectId: string | number = '';
  @Input() documents: IProjectDocument[] = [];
  @Output() uploadMedia = new EventEmitter<void>();

  photos: any[] = [];
  files: any[] = [];
  apiUrl = environment.serverUrl;

  constructor() { }

  ngOnInit(): void {
    this.processDocuments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documents']) {
      this.processDocuments();
    }
  }

  processDocuments() {
    if (!this.documents) {
        this.photos = [];
        this.files = [];
        return;
    }
    
    // Process Photos
    this.photos = this.documents
      .filter(doc => doc.mimetype?.startsWith('image/'))
      .map(doc => ({
        url: doc.url.startsWith('http') ? doc.url : `${this.apiUrl}${doc.url}`,
        title: doc.name,
        date: new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: this.getCategory(doc.name)
      }));

    // Process Other Files (Drawings, Docs)
    this.files = this.documents
      .filter(doc => !doc.mimetype?.startsWith('image/'))
      .map(doc => ({
        id: doc.id,
        name: doc.name,
        url: doc.url.startsWith('http') ? doc.url : `${this.apiUrl}${doc.url}`,
        date: new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        mimetype: doc.mimetype
      }));
  }

  private getCategory(filename: string): string {
    const name = filename.toLowerCase();
    if (name.includes('site') || name.includes('view')) return 'Site Overview';
    if (name.includes('found') || name.includes('pour')) return 'Foundation';
    if (name.includes('steel') || name.includes('frame')) return 'Structural';
    if (name.includes('finish') || name.includes('paint')) return 'Finishing';
    return 'General';
  }
}
