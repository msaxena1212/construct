import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../../../@shared/material/material-module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

function noLeadingSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trimLeft() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-rbac-role-create',
  imports: [CommonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, ToastrModule, MaterialModule, MatIconModule,
    RouterModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule],
  templateUrl: './rbac-role-create.html',
  styleUrl: './rbac-role-create.css',
})
export class RbacRoleCreate {
  checked = true;
  roleMasterForm: any;
  roleData: any;
  id: any;
  roleGetByData: any;
  role_id: any;
  employee_id: any;
  loginUser: any;
  branchData: any;
  constructor(private route: Router, private fb: FormBuilder, private activetRoute: ActivatedRoute, private toaster: ToastrService, private location: Location) {
    this.roleMasterForm = this.fb.group({
      role_master_name: new FormControl(null, [Validators.required, noLeadingSpaces()]),
      // branch_id: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    this.activetRoute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.employee_id = this.id.employee_id

      this.role_id = this.id.role_master_id

    })
    // this.getByIdRole();
    // this.getRole();
    // this._configurationalMasterService.getListBranchSetup().subscribe((res: any) => {
    //   this.branchData = res.data
    // })
  }
  goBack() {
    this.location.back();
  }

  roleSubmitForm() {
    let val = this.roleMasterForm.value;
    if (this.roleMasterForm.invalid) {
      this.toaster.error('required fields should not be blank', 'Required fields');
      return
    }
    // if(!this.role_id){

    //   this._rbacMasterService.createRole(val).subscribe((res: any) => {

    //     this.toaster.success('Master Role Created');
    //     this.route.navigate(['master/user-management/rbacmaster/rbac-role-master'])
    //   },
    //   (err:any)=>{
    //     if(err.status==403){
    //       this.toaster.error("Role Master Name is Already Exits!")
    //     }
    //   }
    //   )
    // }
    // else{
    //   this._rbacMasterService.updateRole(this.employee_id,val).subscribe((res:any)=>{

    //    this.toaster.success('Master Role Updated');
    //    this.route.navigate(['master/user-management/rbacmaster/rbac-role-master'])
    //   })
    // }
  }

  // getRole() {
  //   this._rbacMasterService.getRole(this.loginUser.role).subscribe((res: any) => {
  //     this.roleData = res.data;
  //   })
  // }

  // getByIdRole() {
  //   this._rbacMasterService.getByIdRole(this.role_id).subscribe((res: any) => {
  //     this.roleGetByData = res.data;

  //     this.roleMasterForm.patchValue({
  //       role_master_name: this.roleGetByData?.role_master_name,
  //       branch_id: this.roleGetByData?.branch_id
  //     })
  //   })
  // }

  // back(){
  //   this.route.navigate(['master/user-manaagement/rbacmaster/rbac-role-master'])
  // }
}

