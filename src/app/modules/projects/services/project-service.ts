import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/interfaces/core.interface';
import { IProject, IProjectTask } from '../../../shared/interfaces/project.interface';
import { AuthService } from '../../../shared/services/auth/auth';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.serverUrl + '/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProjects(): Observable<ApiResponse<IProject[]>> {
    return this.http.get<ApiResponse<IProject[]>>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string | number): Observable<ApiResponse<IProject>> {
    return this.http.get<ApiResponse<IProject>>(`${this.apiUrl}/projects/${id}`);
  }
  getProjectHistory(projectId: string | number, params?: { action_type?: string; limit?: number; offset?: number }): Observable<ApiResponse<any[]>> {
    let query = '';
    if (params) {
      const parts: string[] = [];
      if (params.action_type) parts.push(`action_type=${params.action_type}`);
      if (params.limit) parts.push(`limit=${params.limit}`);
      if (params.offset) parts.push(`offset=${params.offset}`);
      if (parts.length) query = `?${parts.join('&')}`;
    }
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/projects/${projectId}/history${query}`);
  }
  getTeamMembers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/team`);
  }

  createProject(formData: FormData): Observable<ApiResponse<IProject>> {
    return this.http.post<ApiResponse<IProject>>(`${this.apiUrl}/projects`, formData);
  }

  updateProject(id: string | number, formData: FormData): Observable<ApiResponse<IProject>> {
    return this.http.put<ApiResponse<IProject>>(`${this.apiUrl}/projects/${id}`, formData);
  }

  // --- Task Management ---
  getProjectTasks(projectId: string | number): Observable<ApiResponse<IProjectTask[]>> {
    return this.http.get<ApiResponse<IProjectTask[]>>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  createTask(projectId: string | number, taskData: any): Observable<ApiResponse<IProjectTask>> {
    return this.http.post<ApiResponse<IProjectTask>>(`${this.apiUrl}/projects/${projectId}/tasks`, taskData);
  }

  updateTask(taskId: string | number, taskData: any): Observable<ApiResponse<IProjectTask>> {
    return this.http.put<ApiResponse<IProjectTask>>(`${this.apiUrl}/tasks/${taskId}`, taskData);
  }

  deleteTask(taskId: string | number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/tasks/${taskId}`);
  }

  addTaskComment(taskId: string | number, content: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/tasks/${taskId}/comments`, { content });
  }

  uploadTaskAttachment(taskId: string | number, formData: FormData): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/tasks/${taskId}/attachments`, formData);
  }

  createSubTask(taskId: string | number, title: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/tasks/${taskId}/subtasks`, { title });
  }

  updateSubTask(subTaskId: number, data: { title?: string; completed?: boolean }): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/subtasks/${subTaskId}`, data);
  }

  deleteSubTask(subTaskId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/subtasks/${subTaskId}`);
  }

  getTasks(): Observable<ApiResponse<IProjectTask[]>> {
    return this.http.get<ApiResponse<IProjectTask[]>>(`${this.apiUrl}/tasks`);
  }

  getProjectTimeline(projectId: string | number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/timeline`);
  }

  uploadDocuments(projectId: string | number, files: File[]): Observable<ApiResponse<any>> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/documents`, formData);
  }

  // --- Milestone Management ---
  createMilestone(projectId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/milestones`, data);
  }

  updateMilestone(projectId: string | number, milestoneId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/milestones/${milestoneId}`, data);
  }

  // Vendors
  getVendors(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/vendors`);
  }
  // materials
  getMaterialByprojectId(projectId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/getMaterialByprojectId/${projectId}`
    );



  }
  requestAdditionalStock(payload: {
    material_id: number;
    task_title: string;
    requested_qty: number;
    available_qty: number;
    project_id: string | number;
  }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/stock-request`, payload);
  }

  updateAdditionalStockRequest(id: number, payload: any) {
    return this.http.put(
      `${this.apiUrl}/stock-request/${id}`,
      payload
    );
  }

  // side manger
  getAllStockRequests(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/stock-request`);
  }

  getStockRequestById(projectId: string | number): Observable<ApiResponse<IProjectTask[]>> {
    return this.http.get<ApiResponse<IProjectTask[]>>(`${this.apiUrl}/stock-request/${projectId}`);
  }

  approveStockRequest(id: number) {
    return this.http.put(
      `${this.apiUrl}/stock-request/${id}/approve`,
      {}
    );
  }

  rejectStockRequest(id: number) {
    return this.http.put(
      `${this.apiUrl}/stock-request/${id}/reject`,
      {}
    );
  }

  projectByesBudget(id: number) {
    return this.http.get(
      `${this.apiUrl}/getBudget_vendorProjectById/${id}`,
    );
  }

  getProjectCostReconciliation(id: number | string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/projects/budget/reconciliation/project/${id}`
    );
  }

  getLaborByVendor(id: number) {
    return this.http.get(
      `${this.apiUrl}/vendors_labor/vendor/${id}`,
    );
  }

  // --- Construction Extensions & AI Integrations ---
  getProjectDPRs(projectId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/dpr/project/${projectId}`);
  }

  createDPR(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/dpr/create`, data);
  }

  exportMspdi(projectId: string | number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/projects/msp/${projectId}/export`, { responseType: 'blob' });
  }

  importMspdi(projectId: string | number, file: File): Observable<ApiResponse<any>> {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/projects/msp/${projectId}/import`, form);
  }

  createItemBudget(data: { project_id: number; budget_total?: number; items: { name: string; amount: number }[] }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/projects/budget/item-allocations`, data);
  }

  uploadDprImages(dprId: string | number, files: File[]): Observable<ApiResponse<any[]>> {
    const form = new FormData();
    files.forEach((file) => form.append('images', file, file.name));
    return this.http.post<ApiResponse<any[]>>(`${this.apiUrl}/dpr/${dprId}/images`, form);
  }

  getDprImages(dprId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/dpr/${dprId}/images`);
  }

  getDprImageBlob(imageId: string | number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/dpr/images/${imageId}/file`, { responseType: 'blob' });
  }

  getProjectBOQ(projectId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/boq/project/${projectId}`);
  }

  extractAndCreateBOQ(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/boq/extract-create`, data);
  }

  getProjectSnags(projectId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/snags/project/${projectId}`);
  }

  createSnag(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/snags/create`, data);
  }

  updateSnagStatus(snagId: string | number, status: string): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/snags/${snagId}/status`, { status });
  }

  updateSnag(snagId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/snags/${snagId}`, data);
  }

  deleteSnag(snagId: string | number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/snags/${snagId}`);
  }

  analyzeVoiceSnag(text: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/snags/analyze-voice`, { text });
  }

  getProjectLabourLogs(projectId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/labour/project/${projectId}`);
  }

  recordLabourAttendance(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/labour/record`, data);
  }

  getProjectDrawings(projectId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/drawings/project/${projectId}`);
  }

  registerDrawing(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/drawings/register`, data);
  }

  generateVendorRFQ(data: { project_id: string | number; boq_item_ids: number[]; notes?: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/boq/generate-rfq`, data);
  }

  queryAICopilot(projectId: string | number, question: string): Observable<ApiResponse<{ question: string; answer: string }>> {
    return this.http.post<ApiResponse<{ question: string; answer: string }>>(`${this.apiUrl}/copilot/query`, {
      project_id: projectId,
      question,
    });
  }

  streamAICopilot(projectId: string | number | null | undefined, question: string, onChunk: (chunk: string) => void, onDone: () => void, onError: (err: any) => void) {
    const token = this.authService.getToken() || '';
    const payload: any = { question };
    if (projectId) {
      payload.project_id = projectId;
    }

    fetch(`${this.apiUrl}/copilot/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          const err = new Error(`HTTP_${response.status}: ${response.statusText || 'Request failed'}`);
          (err as any).status = response.status;
          throw err;
        }
        if (!response.body) {
          throw new Error('ReadableStream not supported');
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        function read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              onDone();
              return;
            }
            const chunkText = decoder.decode(value, { stream: true });
            const lines = chunkText.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.replace('data: ', '').trim());
                  if (data.error) {
                    // An error the server reports (for example, that the AI model is not connected). Marked so the
                    // screen shows the reason, rather than a generic connection message.
                    const serverError: any = new Error(data.error);
                    serverError.fromServer = true;
                    onError(serverError);
                    return;
                  }
                  if (data.chunk) {
                    onChunk(data.chunk);
                  }
                  if (data.done) {
                    onDone();
                    return;
                  }
                } catch (e) {}
              }
            }
            read();
          }).catch(onError);
        }
        read();
      })
      .catch(onError);
  }

  parseBOQContent(data: { project_id: string | number; boq_raw_text: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/boq/parse`, data);
  }

  batchCreateBOQ(data: { project_id: string | number; items: any[] }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/boq/batch`, data);
  }

  updateBOQItem(id: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/boq/items/${id}`, data);
  }

  deleteBOQItem(id: string | number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/boq/items/${id}`);
  }

  getDrawingVersionHistory(projectId: string | number, drawingNumber: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/drawings/history/${projectId}/${drawingNumber}`);
  }

  requestStakeholderSignature(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/drawings/request-signature`, data);
  }

  downloadProtectedFile(fileUrl: string): Observable<Blob> {
    const serverUrl = environment.serverUrl.endsWith('/') ? environment.serverUrl.slice(0, -1) : environment.serverUrl;
    const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${serverUrl}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
    return this.http.get(fullUrl, { responseType: 'blob' });
  }

  // --- Batch R: Measurement Book & Contractor RA Billing ---
  getMeasurementBooks(projectId: string | number, params?: any): Observable<ApiResponse<any>> {
    let query = '';
    if (params) {
      const parts: string[] = [];
      if (params.status) parts.push(`status=${params.status}`);
      if (params.vendor_id) parts.push(`vendor_id=${params.vendor_id}`);
      if (parts.length) query = `?${parts.join('&')}`;
    }
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/measurement-books/project/${projectId}${query}`);
  }

  getCertifiedUnbilledItems(projectId: string | number, vendorId?: string | number): Observable<ApiResponse<any>> {
    const query = vendorId ? `?vendor_id=${vendorId}` : '';
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/measurement-books/project/${projectId}/certified-unbilled${query}`);
  }

  createMeasurementBook(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/measurement-books`, data);
  }

  submitMeasurementBook(mbId: string | number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/measurement-books/${mbId}/submit`, {});
  }

  certifyMeasurementBook(mbId: string | number, items?: any[]): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/measurement-books/${mbId}/certify`, { items: items || [] });
  }

  rejectMeasurementBook(mbId: string | number, rejectionReason: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/measurement-books/${mbId}/reject`, { rejection_reason: rejectionReason });
  }

  getContractorRaBills(projectId: string | number, params?: any): Observable<ApiResponse<any>> {
    let query = '';
    if (params) {
      const parts: string[] = [];
      if (params.status) parts.push(`status=${params.status}`);
      if (params.vendor_id) parts.push(`vendor_id=${params.vendor_id}`);
      if (parts.length) query = `?${parts.join('&')}`;
    }
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/contractor-ra-bills/project/${projectId}${query}`);
  }

  createContractorRaBill(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/contractor-ra-bills`, data);
  }

  approveContractorRaBill(billId: string | number, postToCostLedger: boolean = true): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/contractor-ra-bills/${billId}/approve`, { postToCostLedger });
  }

  // --- Batch W: Enterprise Variations, Change Orders & Claims ---
  getVariationOrders(projectId: string | number, params?: any): Observable<ApiResponse<any>> {
    let query = '';
    if (params) {
      const parts: string[] = [];
      if (params.status) parts.push(`status=${params.status}`);
      if (params.change_type) parts.push(`change_type=${params.change_type}`);
      if (parts.length) query = `?${parts.join('&')}`;
    }
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/variation-orders/project/${projectId}${query}`);
  }

  getVariationOrderById(id: string | number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}`);
  }

  getVariationSummary(projectId: string | number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/variation-orders/project/${projectId}/summary`);
  }

  createVariationOrder(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/variation-orders`, data);
  }

  submitVariationOrder(id: string | number): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/submit`, {});
  }

  technicalReviewVariationOrder(id: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/technical-review`, data);
  }

  commercialReviewVariationOrder(id: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/commercial-review`, data);
  }

  budgetReviewVariationOrder(id: string | number): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/budget-review`, {});
  }

  approveVariationOrder(id: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/approve`, data);
  }

  implementVariationOrder(id: string | number): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/implement`, {});
  }

  rejectVariationOrder(id: string | number, reason: string): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/reject`, { reason });
  }

  withdrawVariationOrder(id: string | number, reason?: string): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/variation-orders/${id}/withdraw`, { reason });
  }

  // --- Autonomous AI Agents & Bots Command Center ---
  getAgentRoster(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/agents/roster`);
  }

  getAgentModelStatus(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/agents/status`);
  }

  getAgentInsights(projectId: string | number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/agents/${projectId}/insights`);
  }

  runProjectAgents(projectId: string | number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/agents/${projectId}/run`, {});
  }

  getAgentLog(projectId: string | number, limit = 100): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/agents/${projectId}/log?limit=${limit}`);
  }

  getIndiaCompliance(projectId: string | number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/agents/${projectId}/india-compliance`);
  }

  // --- Field Operations: Safety / HSE & Toolbox Talks ---
  getSafetySummary(projectId: string | number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/safety/project/${projectId}/summary`);
  }

  createSafetyIncident(projectId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/safety/project/${projectId}/incidents`, data);
  }

  updateSafetyIncident(projectId: string | number, incidentId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/safety/project/${projectId}/incidents/${incidentId}`, data);
  }

  createToolboxTalk(projectId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/safety/project/${projectId}/toolbox-talks`, data);
  }

  // --- Field Operations: QA/QC & RFIs ---
  getProjectRFIs(projectId: string | number, status?: string): Observable<ApiResponse<any[]>> {
    const q = status ? `?status=${status}` : '';
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/rfis/project/${projectId}${q}`);
  }

  createRFI(projectId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/rfis/project/${projectId}`, data);
  }

  answerRFI(projectId: string | number, rfiId: string | number, response: string): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/rfis/project/${projectId}/${rfiId}/answer`, { response });
  }

  // --- Zyno Intelligence Copilot ---
  askCopilot(projectId: string | number, question: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/copilot/query`, { project_id: projectId, question });
  }
}

