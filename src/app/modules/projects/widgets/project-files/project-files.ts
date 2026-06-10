import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProjectDocument } from '../../../../shared/interfaces/project.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-project-files',
  standalone: false,
  templateUrl: './project-files.html',
  styleUrl: './project-files.scss',
})
export class ProjectFiles implements OnInit, OnChanges {
  @Input() documents: IProjectDocument[] = [];
  @Output() uploadMedia = new EventEmitter<void>();

  apiUrl = environment.serverUrl;
  searchQuery = '';
  selectedCategory = 'All';

  categories = [
    { name: 'All', icon: 'grid_view', count: 0, color: 'text-primary' },
    { name: 'Drawings', icon: 'architecture', count: 0, color: 'text-secondary' },
    { name: 'Photos', icon: 'image', count: 0, color: 'text-tertiary-container' },
    { name: 'Legal', icon: 'gavel', count: 0, color: 'text-error' },
    { name: 'Others', icon: 'description', count: 0, color: 'text-outline' }
  ];

  filteredFiles: any[] = [];
  selectedFile: any = null;
  viewAllFiles = false;

  showSignatureAlert = false;
  showDropdownForFile: number | null = null;

  constructor() { }

  ngOnInit() {
    this.processDocuments();
    if (this.filteredFiles.length > 0) {
      this.selectedFile = this.filteredFiles[0];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documents']) {
      this.processDocuments();
    }
  }

  processDocuments() {
    if (!this.documents) return;

    const all = this.documents.map(doc => ({
      ...doc,
      fullUrl: doc.url.startsWith('http') ? doc.url : `${this.apiUrl}${doc.url}`,
      type: this.getFileType(doc.name, doc.mimetype),
      icon: this.getFileIcon(doc.mimetype),
      color: this.getFileColor(doc.mimetype),
      category: this.getFileCategory(doc.name, doc.mimetype),
      dateLabel: new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'System Admin' // Placeholder until we have uploader info
    }));

    // Update Category Counts
    this.categories.forEach(cat => {
      if (cat.name === 'All') cat.count = all.length;
      else cat.count = all.filter(f => f.category === cat.name).length;
    });

    this.applyFilters(all);
  }

  applyFilters(all?: any[]) {
    const source = all || this.documents.map(doc => ({
      ...doc,
      fullUrl: doc.url.startsWith('http') ? doc.url : `${this.apiUrl}${doc.url}`,
      type: this.getFileType(doc.name, doc.mimetype),
      icon: this.getFileIcon(doc.mimetype),
      color: this.getFileColor(doc.mimetype),
      category: this.getFileCategory(doc.name, doc.mimetype),
      dateLabel: new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'System Admin'
    }));

    this.filteredFiles = source.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || f.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (this.selectedFile && !this.filteredFiles.find(f => f.id === this.selectedFile.id)) {
      this.selectedFile = this.filteredFiles[0] || null;
    } else if (!this.selectedFile && this.filteredFiles.length > 0) {
      this.selectedFile = this.filteredFiles[0];
    }
  }

  selectCategory(name: string) {
    this.selectedCategory = name;
    this.applyFilters();
  }

  getFileType(name: string, mimetype: string): string {
    if (mimetype?.includes('pdf')) return 'PDF';
    if (mimetype?.startsWith('image/')) return 'IMG';
    const ext = name.split('.').pop()?.toUpperCase();
    return ext || 'FILE';
  }

  getFileIcon(mimetype: string): string {
    if (mimetype?.includes('pdf')) return 'picture_as_pdf';
    if (mimetype?.startsWith('image/')) return 'image';
    if (mimetype?.includes('word') || mimetype?.includes('text')) return 'description';
    if (mimetype?.includes('excel') || mimetype?.includes('sheet')) return 'table_chart';
    return 'insert_drive_file';
  }

  getFileColor(mimetype: string): string {
    if (mimetype?.includes('pdf')) return 'bg-red-100 text-red-600';
    if (mimetype?.startsWith('image/')) return 'bg-amber-100 text-amber-600';
    if (mimetype?.includes('word')) return 'bg-blue-100 text-blue-600';
    return 'bg-slate-100 text-slate-600';
  }

  getFileCategory(name: string, mimetype: string): string {
    const n = name.toLowerCase();
    if (mimetype?.startsWith('image/')) return 'Photos';
    if (n.includes('draw') || n.includes('blueprint') || n.includes('plan') || n.includes('cad')) return 'Drawings';
    if (n.includes('contract') || n.includes('agree') || n.includes('legal')) return 'Legal';
    return 'Others';
  }

  get recentFiles() {
    return [...this.filteredFiles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  }

  toggleViewAll() {
    this.viewAllFiles = !this.viewAllFiles;
  }

  toggleFileDropdown(id: number, event: Event) {
    event.stopPropagation();
    this.showDropdownForFile = this.showDropdownForFile === id ? null : id;
  }

  selectFile(file: any) {
    this.selectedFile = file;
  }

  deleteFile(file: any) {
    if (confirm(`Delete ${file.name}?`)) {
      // Implementation for delete would go through service
      alert('Delete functionality to be implemented');
    }
    this.showDropdownForFile = null;
  }

  sendSignatureRequest() {
    if (!this.selectedFile) return;
    this.showSignatureAlert = true;
    setTimeout(() => {
      this.showSignatureAlert = false;
      this.selectedFile.status = 'Signed';
    }, 2500);
  }
}
