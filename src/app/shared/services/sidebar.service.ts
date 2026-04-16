import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SidebarMenu } from '../interfaces/sidebar-menu.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private baseUrl = environment.serverUrl + '/api/v1';

  constructor(private http: HttpClient) { }

  public getSidebarHierarchy(): Observable<SidebarMenu[]> {
    return this.http.get<{ data: any[] }>(this.baseUrl + '/sidebar').pipe(
      map(res => this.buildHierarchy(res.data))
    );
  }

  private buildHierarchy(data: any[]): SidebarMenu[] {
    const map = new Map<number, SidebarMenu>();
    const roots: SidebarMenu[] = [];

    // 1. Initialize all nodes strictly mapping to the UI Interface
    data.forEach(item => {
      map.set(item.id, {
        id: item.id,
        name: item.name,
        path: item.path ? item.path.replace(/^\/+|\/+$/g, '') : '', // strip trailing/leading slashes
        icon: item.icon || 'arrow_right',
        parentId: item.parentId,
        order: item.order,
        subMenu: []
      });
    });

    // 2. Structurally link parent arrays strictly
    data.forEach(item => {
      if (item.parentId && map.has(item.parentId)) {
        const child = map.get(item.id)!;
        child.subMenuName = item.name; // maps natively to HTML interpolation
        map.get(item.parentId)!.subMenu!.push(child);
      } else {
        roots.push(map.get(item.id)!);
      }
    });

    // 3. Recursively resolve full URL paths top-down (parent/child/grandchild)
    const resolvePaths = (nodes: SidebarMenu[], cumulativePath: string = '') => {
      nodes.sort((a, b) => a.order - b.order); // ascending order dynamically calculated

      nodes.forEach(node => {
        let nodePath = cumulativePath;

        if (node.path) {
          nodePath = cumulativePath ? `${cumulativePath}/${node.path}` : node.path;
        }

        node.path = nodePath;

        if (node.subMenu && node.subMenu.length > 0) {
          resolvePaths(node.subMenu, nodePath);
        }
      });
    };

    resolvePaths(roots, '');
    return roots;
  }
}
