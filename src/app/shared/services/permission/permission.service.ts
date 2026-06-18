import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private permissions: any[] = [];

  constructor() {
    this.loadPermissions();
  }

  loadPermissions() {
    this.permissions = JSON.parse(
      localStorage.getItem('permissions') || '[]'
    );
  }

  hasPermission(
    module: string,
    action: string
  ): boolean {

    const menu = this.permissions.find(
      x => x.path === module
    );

    return menu?.permissions?.[action] || false;
  }
}