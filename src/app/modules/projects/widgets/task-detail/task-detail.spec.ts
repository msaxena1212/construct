import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskDetail } from './task-detail';
import { ProjectService } from '../../services/project-service';
import { ToastrService } from 'ngx-toastr';

describe('TaskDetail', () => {
  let component: TaskDetail;
  let fixture: ComponentFixture<TaskDetail>;
  let projectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    projectService = jasmine.createSpyObj('ProjectService', ['getProjectTasks', 'getProjectById', 'updateSubTask']);
    projectService.getProjectTasks.and.returnValue(of({ data: [] }));
    projectService.getProjectById.and.returnValue(of({ data: { team_members: [], milestones_with_child: [] } }));
    projectService.updateSubTask.and.returnValue(of({ success: true }));

    await TestBed.configureTestingModule({
      imports: [TaskDetail],
      providers: [
        { provide: ProjectService, useValue: projectService },
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success', 'error', 'info', 'warning']) }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetail);
    component = fixture.componentInstance;
    component.task = {
      id: 1,
      project_id: 10,
      sub_tasks: [{ id: 1, title: 'Test sub-task', completed: false }]
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not update a sub-task when edit mode is off', () => {
    const item = component.task.sub_tasks[0];
    component.isEditing = false;

    component.toggleChecklist(item);

    expect(projectService.updateSubTask).not.toHaveBeenCalled();
    expect(item.completed).toBeFalse();
  });

  it('should disable the post comment button when there is no comment text', () => {
    component.newComment = '';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button?.disabled).toBeTrue();
  });
});
