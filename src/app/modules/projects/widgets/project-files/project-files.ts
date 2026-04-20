import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-files',
  standalone: false,
  templateUrl: './project-files.html',
  styleUrl: './project-files.scss',
})
export class ProjectFiles implements OnInit {
  folders = [
    { id: 1, name: 'Blueprints', fileCount: 124, size: '1.2 GB', color: 'text-secondary' },
    { id: 2, name: 'Site Photos', fileCount: 842, size: '4.5 GB', color: 'text-primary' },
    { id: 3, name: 'Contracts', fileCount: 12, size: '45 MB', color: 'text-tertiary-container' }
  ];

  allFiles = [
    { id: 101, name: 'Ground_Floor_Structural_V3.cad', author: 'James W.', date: '2 hours ago', type: 'CAD', icon: 'architecture', color: 'bg-blue-100 text-blue-600', folderId: 1, status: 'Draft' },
    { id: 102, name: 'Site_Inspection_Report_Aug_24.pdf', author: 'Sarah L.', date: 'Yesterday', type: 'PDF', icon: 'picture_as_pdf', color: 'bg-red-100 text-red-600', folderId: 3, status: 'Signed' },
    { id: 103, name: 'North_Foundation_Pour_01.jpg', author: 'Mike T.', date: '3 days ago', type: 'IMG', icon: 'image', color: 'bg-amber-100 text-amber-600', folderId: 2, status: 'None' },
    { id: 104, name: 'Vendor_Agreement_Q3.pdf', author: 'Elena R.', date: '4 days ago', type: 'PDF', icon: 'picture_as_pdf', color: 'bg-slate-100 text-slate-600', folderId: 3, status: 'Pending Signature' },
    { id: 105, name: 'Plumbing_Layout_B.cad', author: 'David S.', date: '1 week ago', type: 'CAD', icon: 'architecture', color: 'bg-blue-100 text-blue-600', folderId: 1, status: 'None' },
    { id: 106, name: 'Old_Draft_V1.pdf', author: 'Mark Z.', date: '2 weeks ago', type: 'PDF', icon: 'picture_as_pdf', color: 'bg-red-100 text-red-600', folderId: 1, status: 'None' }
  ];

  viewAllFiles = false;
  editingFolderId: number | null = null;
  newFolderName = '';
  showDropdownForFolder: number | null = null;
  showDropdownForFile: number | null = null;

  showSignatureAlert = false;
  selectedFileForSignature: any = null;

  constructor() { }

  ngOnInit() {
    this.selectedFileForSignature = this.allFiles.find(f => f.status === 'Pending Signature') || this.allFiles[0];
  }

  get recentFiles() {
    return [...this.allFiles].slice(0, 5); // Return top 5
  }

  toggleViewAll() {
    this.viewAllFiles = !this.viewAllFiles;
  }

  toggleFolderDropdown(id: number, event: Event) {
    event.stopPropagation();
    this.showDropdownForFolder = this.showDropdownForFolder === id ? null : id;
    this.showDropdownForFile = null;
  }

  toggleFileDropdown(id: number, event: Event) {
    event.stopPropagation();
    this.showDropdownForFile = this.showDropdownForFile === id ? null : id;
    this.showDropdownForFolder = null;
  }

  // Folder CRUD
  addFolder() {
    const newName = prompt('Enter new folder name:', 'New Folder');
    if (newName) {
      this.folders.push({
        id: Date.now(),
        name: newName,
        fileCount: 0,
        size: '0 KB',
        color: 'text-slate-500'
      });
    }
  }

  renameFolder(folder: any) {
    const newName = prompt('Enter new name for folder:', folder.name);
    if (newName && newName.trim()) {
      folder.name = newName.trim();
    }
    this.showDropdownForFolder = null;
  }

  deleteFolder(folder: any) {
    if (confirm(`Are you sure you want to delete ${folder.name} and all its files?`)) {
      this.allFiles = this.allFiles.filter(f => f.folderId !== folder.id);
      this.folders = this.folders.filter(f => f.id !== folder.id);
    }
    this.showDropdownForFolder = null;
  }

  // File CRUD
  simulateFileUpload() {
    const fileName = prompt('Enter file name to upload:', 'new_document.pdf');
    if (fileName) {
      this.allFiles.unshift({
        id: Date.now(),
        name: fileName,
        author: 'You',
        date: 'Just now',
        type: fileName.split('.').pop()?.toUpperCase() || 'FILE',
        icon: 'description',
        color: 'bg-slate-100 text-slate-600',
        folderId: this.folders[0]?.id || 0,
        status: 'None'
      });
    }
  }

  deleteFile(file: any) {
    if (confirm(`Delete ${file.name}?`)) {
      this.allFiles = this.allFiles.filter(f => f.id !== file.id);
    }
    this.showDropdownForFile = null;
  }

  moveFile(file: any) {
    const folderNames = this.folders.map(f => `${f.id}: ${f.name}`).join('\n');
    const targetFolder = prompt(`Enter Folder ID to move to:\n${folderNames}`);
    if (targetFolder && !isNaN(Number(targetFolder))) {
      const id = Number(targetFolder);
      if (this.folders.find(f => f.id === id)) {
        file.folderId = id;
        alert(`${file.name} moved successfully!`);
      }
    }
    this.showDropdownForFile = null;
  }

  // Signature Workflow
  openSignatureWorkflow(file: any) {
    this.selectedFileForSignature = file;
  }

  sendSignatureRequest() {
    if (!this.selectedFileForSignature) return;
    this.showSignatureAlert = true;
    setTimeout(() => {
      this.showSignatureAlert = false;
      this.selectedFileForSignature.status = 'Signed';
    }, 2500);
  }
}
