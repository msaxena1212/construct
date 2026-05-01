import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Vendor {
  id: string;
  name: string;
  spoc_name: string;
  spoc_phone: string;
  official_email: string;
  official_phone: string;
  gst_no: string;
  pan_card_no: string;
  physical_address: string;
  pincode: string;
  budget_allocation: number;
  services: string[];
  contract_file: string | null;
  status: 'active' | 'pending' | 'inactive';
  compliance_score: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityItem {
  id?: number;
  icon: 'invoice' | 'cert' | 'assign';
  title: string;
  description: string;
  time_label?: string;
  time?: string;
  createdAt?: string;
}

export interface VendorStats {
  totalActive: number;
  pendingPayments: string;
  compliantPartners: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class VendorsServices {
  private readonly base = `${environment.serverUrl}/api/v1`;

  constructor(private http: HttpClient) { }
  getAllVendors(status?: string): Observable<ApiResponse<Vendor[]>> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http
      .get<ApiResponse<Vendor[]>>(`${this.base}/vendors`, { params })
      .pipe(catchError(this.handleError));
  }

  getStats(): Observable<ApiResponse<VendorStats>> {
    return this.http
      .get<ApiResponse<VendorStats>>(`${this.base}/vendors/stats`)
      .pipe(catchError(this.handleError));
  }

  getVendorById(id: string): Observable<ApiResponse<Vendor>> {
    return this.http
      .get<ApiResponse<Vendor>>(`${this.base}/vendors/${id}`)
      .pipe(catchError(this.handleError));
  }

  createVendor(payload: {
    vendorLegalName: string;
    spocName: string;
    spocPhone: string;
    officialEmail: string;
    officialPhone: string;
    gstNo: string;
    panCardNo: string;
    physicalAddress: string;
    pincode: string;
    budgetAllocation: string;
    services: string;
    contractFile?: File | null;
  }): Observable<ApiResponse<Vendor>> {

    const fd = new FormData();

    const textFields: (keyof typeof payload)[] = [
      'vendorLegalName',
      'spocName',
      'spocPhone',
      'officialEmail',
      'officialPhone',
      'gstNo',
      'panCardNo',
      'physicalAddress',
      'pincode',
      'budgetAllocation',
      'services',
    ];

    textFields.forEach((key) => {
      const value = payload[key];

      if (value !== undefined && value !== null) {
        fd.append(key, value as string);
      }
    });

    // PDF file upload
    if (payload.contractFile) {
      fd.append(
        'contractFile',
        payload.contractFile,
        payload.contractFile.name
      );
    }

    return this.http
      .post<ApiResponse<Vendor>>(`${this.base}/vendors`, fd)
      .pipe(catchError(this.handleError));
  }

  updateVendor(
    id: string,
    data: Partial<Vendor>
  ): Observable<ApiResponse<Vendor>> {
    return this.http
      .put<ApiResponse<Vendor>>(`${this.base}/vendors/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteVendor(id: string): Observable<ApiResponse<null>> {
    return this.http
      .delete<ApiResponse<null>>(`${this.base}/vendors/${id}`)
      .pipe(catchError(this.handleError));
  }

  getActivities(limit = 20): Observable<ApiResponse<ActivityItem[]>> {
    const params = new HttpParams().set('limit', limit.toString());

    return this.http
      .get<ApiResponse<ActivityItem[]>>(`${this.base}/activities`, { params })
      .pipe(catchError(this.handleError));
  }

  createActivity(data: {
    icon: 'invoice' | 'cert' | 'assign';
    title: string;
    description: string;
    time_label?: string;
  }): Observable<ApiResponse<ActivityItem>> {

    return this.http
      .post<ApiResponse<ActivityItem>>(`${this.base}/activities`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {

    const msg =
      error?.error?.message ||
      error?.message ||
      'An unexpected error occurred';

    console.error('[VendorsService Error]', error);

    return throwError(() => new Error(msg));
  }
}