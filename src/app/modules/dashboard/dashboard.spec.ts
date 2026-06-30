import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { DashboardService } from './services/dashboard.service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let httpMock: HttpTestingController;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Dashboard],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    dashboardService = TestBed.inject(DashboardService);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard stats from API', () => {
    const req = httpMock.expectOne(dashboardService['baseUrl']);
    expect(req.request.method).toBe('GET');

    req.flush({
      success: true,
      data: {
        projects: { total: 5, thisMonth: 1 },
        materials: { total: 35, newAdded: 19 },
        equipment: { total: 7, active: 7 },
      },
    });

    expect(component.stats.projects.total).toBe(5);
    expect(component.stats.materials.total).toBe(35);
    expect(component.stats.equipment.total).toBe(7);
  });
});
