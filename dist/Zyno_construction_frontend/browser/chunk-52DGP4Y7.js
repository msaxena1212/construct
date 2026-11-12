import {
  AuthService
} from "./chunk-2M3NZLNK.js";
import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-23RKHPSU.js";

// src/app/modules/projects/services/project-service.ts
var ProjectService = class _ProjectService {
  http;
  authService;
  apiUrl = environment.serverUrl + "/api/v1";
  constructor(http, authService) {
    this.http = http;
    this.authService = authService;
  }
  getProjects() {
    return this.http.get(`${this.apiUrl}/projects`);
  }
  getProjectById(id) {
    return this.http.get(`${this.apiUrl}/projects/${id}`);
  }
  getProjectHistory(projectId, params) {
    let query = "";
    if (params) {
      const parts = [];
      if (params.action_type)
        parts.push(`action_type=${params.action_type}`);
      if (params.limit)
        parts.push(`limit=${params.limit}`);
      if (params.offset)
        parts.push(`offset=${params.offset}`);
      if (parts.length)
        query = `?${parts.join("&")}`;
    }
    return this.http.get(`${this.apiUrl}/projects/${projectId}/history${query}`);
  }
  getTeamMembers() {
    return this.http.get(`${this.apiUrl}/team`);
  }
  createProject(formData) {
    return this.http.post(`${this.apiUrl}/projects`, formData);
  }
  updateProject(id, formData) {
    return this.http.put(`${this.apiUrl}/projects/${id}`, formData);
  }
  // --- Task Management ---
  getProjectTasks(projectId) {
    return this.http.get(`${this.apiUrl}/projects/${projectId}/tasks`);
  }
  createTask(projectId, taskData) {
    return this.http.post(`${this.apiUrl}/projects/${projectId}/tasks`, taskData);
  }
  updateTask(taskId, taskData) {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, taskData);
  }
  deleteTask(taskId) {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }
  addTaskComment(taskId, content) {
    return this.http.post(`${this.apiUrl}/tasks/${taskId}/comments`, { content });
  }
  uploadTaskAttachment(taskId, formData) {
    return this.http.post(`${this.apiUrl}/tasks/${taskId}/attachments`, formData);
  }
  createSubTask(taskId, title) {
    return this.http.post(`${this.apiUrl}/tasks/${taskId}/subtasks`, { title });
  }
  updateSubTask(subTaskId, data) {
    return this.http.put(`${this.apiUrl}/subtasks/${subTaskId}`, data);
  }
  deleteSubTask(subTaskId) {
    return this.http.delete(`${this.apiUrl}/subtasks/${subTaskId}`);
  }
  getTasks() {
    return this.http.get(`${this.apiUrl}/tasks`);
  }
  getProjectTimeline(projectId) {
    return this.http.get(`${this.apiUrl}/projects/${projectId}/timeline`);
  }
  uploadDocuments(projectId, files) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    return this.http.post(`${this.apiUrl}/projects/${projectId}/documents`, formData);
  }
  // --- Milestone Management ---
  createMilestone(projectId, data) {
    return this.http.post(`${this.apiUrl}/projects/${projectId}/milestones`, data);
  }
  updateMilestone(projectId, milestoneId, data) {
    return this.http.put(`${this.apiUrl}/projects/${projectId}/milestones/${milestoneId}`, data);
  }
  // Vendors
  getVendors() {
    return this.http.get(`${this.apiUrl}/vendors`);
  }
  // materials
  getMaterialByprojectId(projectId) {
    return this.http.get(`${this.apiUrl}/getMaterialByprojectId/${projectId}`);
  }
  requestAdditionalStock(payload) {
    return this.http.post(`${this.apiUrl}/stock-request`, payload);
  }
  updateAdditionalStockRequest(id, payload) {
    return this.http.put(`${this.apiUrl}/stock-request/${id}`, payload);
  }
  // side manger
  getAllStockRequests() {
    return this.http.get(`${this.apiUrl}/stock-request`);
  }
  getStockRequestById(projectId) {
    return this.http.get(`${this.apiUrl}/stock-request/${projectId}`);
  }
  approveStockRequest(id) {
    return this.http.put(`${this.apiUrl}/stock-request/${id}/approve`, {});
  }
  rejectStockRequest(id) {
    return this.http.put(`${this.apiUrl}/stock-request/${id}/reject`, {});
  }
  projectByesBudget(id) {
    return this.http.get(`${this.apiUrl}/getBudget_vendorProjectById/${id}`);
  }
  getProjectCostReconciliation(id) {
    return this.http.get(`${this.apiUrl}/projects/budget/reconciliation/project/${id}`);
  }
  getLaborByVendor(id) {
    return this.http.get(`${this.apiUrl}/vendors_labor/vendor/${id}`);
  }
  // --- Construction Extensions & AI Integrations ---
  getProjectDPRs(projectId) {
    return this.http.get(`${this.apiUrl}/dpr/project/${projectId}`);
  }
  createDPR(data) {
    return this.http.post(`${this.apiUrl}/dpr/create`, data);
  }
  exportMspdi(projectId) {
    return this.http.get(`${this.apiUrl}/projects/msp/${projectId}/export`, { responseType: "blob" });
  }
  importMspdi(projectId, file) {
    const form = new FormData();
    form.append("file", file, file.name);
    return this.http.post(`${this.apiUrl}/projects/msp/${projectId}/import`, form);
  }
  createItemBudget(data) {
    return this.http.post(`${this.apiUrl}/projects/budget/item-allocations`, data);
  }
  uploadDprImages(dprId, files) {
    const form = new FormData();
    files.forEach((file) => form.append("images", file, file.name));
    return this.http.post(`${this.apiUrl}/dpr/${dprId}/images`, form);
  }
  getDprImages(dprId) {
    return this.http.get(`${this.apiUrl}/dpr/${dprId}/images`);
  }
  getDprImageBlob(imageId) {
    return this.http.get(`${this.apiUrl}/dpr/images/${imageId}/file`, { responseType: "blob" });
  }
  getProjectBOQ(projectId) {
    return this.http.get(`${this.apiUrl}/boq/project/${projectId}`);
  }
  extractAndCreateBOQ(data) {
    return this.http.post(`${this.apiUrl}/boq/extract-create`, data);
  }
  getProjectSnags(projectId) {
    return this.http.get(`${this.apiUrl}/snags/project/${projectId}`);
  }
  createSnag(data) {
    return this.http.post(`${this.apiUrl}/snags/create`, data);
  }
  updateSnagStatus(snagId, status) {
    return this.http.put(`${this.apiUrl}/snags/${snagId}/status`, { status });
  }
  updateSnag(snagId, data) {
    return this.http.put(`${this.apiUrl}/snags/${snagId}`, data);
  }
  deleteSnag(snagId) {
    return this.http.delete(`${this.apiUrl}/snags/${snagId}`);
  }
  analyzeVoiceSnag(text) {
    return this.http.post(`${this.apiUrl}/snags/analyze-voice`, { text });
  }
  getProjectLabourLogs(projectId) {
    return this.http.get(`${this.apiUrl}/labour/project/${projectId}`);
  }
  recordLabourAttendance(data) {
    return this.http.post(`${this.apiUrl}/labour/record`, data);
  }
  getProjectDrawings(projectId) {
    return this.http.get(`${this.apiUrl}/drawings/project/${projectId}`);
  }
  registerDrawing(data) {
    return this.http.post(`${this.apiUrl}/drawings/register`, data);
  }
  generateVendorRFQ(data) {
    return this.http.post(`${this.apiUrl}/boq/generate-rfq`, data);
  }
  queryAICopilot(projectId, question) {
    return this.http.post(`${this.apiUrl}/copilot/query`, {
      project_id: projectId,
      question
    });
  }
  streamAICopilot(projectId, question, onChunk, onDone, onError) {
    const token = this.authService.getToken() || "";
    const payload = { question };
    if (projectId) {
      payload.project_id = projectId;
    }
    fetch(`${this.apiUrl}/copilot/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }).then((response) => {
      if (!response.ok) {
        const err = new Error(`HTTP_${response.status}: ${response.statusText || "Request failed"}`);
        err.status = response.status;
        throw err;
      }
      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            onDone();
            return;
          }
          const chunkText = decoder.decode(value, { stream: true });
          const lines = chunkText.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.replace("data: ", "").trim());
                if (data.error) {
                  const serverError = new Error(data.error);
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
              } catch (e) {
              }
            }
          }
          read();
        }).catch(onError);
      }
      read();
    }).catch(onError);
  }
  parseBOQContent(data) {
    return this.http.post(`${this.apiUrl}/boq/parse`, data);
  }
  batchCreateBOQ(data) {
    return this.http.post(`${this.apiUrl}/boq/batch`, data);
  }
  updateBOQItem(id, data) {
    return this.http.put(`${this.apiUrl}/boq/items/${id}`, data);
  }
  deleteBOQItem(id) {
    return this.http.delete(`${this.apiUrl}/boq/items/${id}`);
  }
  getDrawingVersionHistory(projectId, drawingNumber) {
    return this.http.get(`${this.apiUrl}/drawings/history/${projectId}/${drawingNumber}`);
  }
  requestStakeholderSignature(data) {
    return this.http.post(`${this.apiUrl}/drawings/request-signature`, data);
  }
  downloadProtectedFile(fileUrl) {
    const serverUrl = environment.serverUrl.endsWith("/") ? environment.serverUrl.slice(0, -1) : environment.serverUrl;
    const fullUrl = fileUrl.startsWith("http") ? fileUrl : `${serverUrl}${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
    return this.http.get(fullUrl, { responseType: "blob" });
  }
  // --- Batch R: Measurement Book & Contractor RA Billing ---
  getMeasurementBooks(projectId, params) {
    let query = "";
    if (params) {
      const parts = [];
      if (params.status)
        parts.push(`status=${params.status}`);
      if (params.vendor_id)
        parts.push(`vendor_id=${params.vendor_id}`);
      if (parts.length)
        query = `?${parts.join("&")}`;
    }
    return this.http.get(`${this.apiUrl}/measurement-books/project/${projectId}${query}`);
  }
  getCertifiedUnbilledItems(projectId, vendorId) {
    const query = vendorId ? `?vendor_id=${vendorId}` : "";
    return this.http.get(`${this.apiUrl}/measurement-books/project/${projectId}/certified-unbilled${query}`);
  }
  createMeasurementBook(data) {
    return this.http.post(`${this.apiUrl}/measurement-books`, data);
  }
  submitMeasurementBook(mbId) {
    return this.http.post(`${this.apiUrl}/measurement-books/${mbId}/submit`, {});
  }
  certifyMeasurementBook(mbId, items) {
    return this.http.post(`${this.apiUrl}/measurement-books/${mbId}/certify`, { items: items || [] });
  }
  rejectMeasurementBook(mbId, rejectionReason) {
    return this.http.post(`${this.apiUrl}/measurement-books/${mbId}/reject`, { rejection_reason: rejectionReason });
  }
  getContractorRaBills(projectId, params) {
    let query = "";
    if (params) {
      const parts = [];
      if (params.status)
        parts.push(`status=${params.status}`);
      if (params.vendor_id)
        parts.push(`vendor_id=${params.vendor_id}`);
      if (parts.length)
        query = `?${parts.join("&")}`;
    }
    return this.http.get(`${this.apiUrl}/contractor-ra-bills/project/${projectId}${query}`);
  }
  createContractorRaBill(data) {
    return this.http.post(`${this.apiUrl}/contractor-ra-bills`, data);
  }
  approveContractorRaBill(billId, postToCostLedger = true) {
    return this.http.post(`${this.apiUrl}/contractor-ra-bills/${billId}/approve`, { postToCostLedger });
  }
  // --- Batch W: Enterprise Variations, Change Orders & Claims ---
  getVariationOrders(projectId, params) {
    let query = "";
    if (params) {
      const parts = [];
      if (params.status)
        parts.push(`status=${params.status}`);
      if (params.change_type)
        parts.push(`change_type=${params.change_type}`);
      if (parts.length)
        query = `?${parts.join("&")}`;
    }
    return this.http.get(`${this.apiUrl}/variation-orders/project/${projectId}${query}`);
  }
  getVariationOrderById(id) {
    return this.http.get(`${this.apiUrl}/variation-orders/${id}`);
  }
  getVariationSummary(projectId) {
    return this.http.get(`${this.apiUrl}/variation-orders/project/${projectId}/summary`);
  }
  createVariationOrder(data) {
    return this.http.post(`${this.apiUrl}/variation-orders`, data);
  }
  submitVariationOrder(id) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/submit`, {});
  }
  technicalReviewVariationOrder(id, data) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/technical-review`, data);
  }
  commercialReviewVariationOrder(id, data) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/commercial-review`, data);
  }
  budgetReviewVariationOrder(id) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/budget-review`, {});
  }
  approveVariationOrder(id, data) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/approve`, data);
  }
  implementVariationOrder(id) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/implement`, {});
  }
  rejectVariationOrder(id, reason) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/reject`, { reason });
  }
  withdrawVariationOrder(id, reason) {
    return this.http.put(`${this.apiUrl}/variation-orders/${id}/withdraw`, { reason });
  }
  // --- Autonomous AI Agents & Bots Command Center ---
  getAgentRoster() {
    return this.http.get(`${this.apiUrl}/agents/roster`);
  }
  getAgentModelStatus() {
    return this.http.get(`${this.apiUrl}/agents/status`);
  }
  getAgentInsights(projectId) {
    return this.http.get(`${this.apiUrl}/agents/${projectId}/insights`);
  }
  runProjectAgents(projectId) {
    return this.http.post(`${this.apiUrl}/agents/${projectId}/run`, {});
  }
  getAgentLog(projectId, limit = 100) {
    return this.http.get(`${this.apiUrl}/agents/${projectId}/log?limit=${limit}`);
  }
  getIndiaCompliance(projectId) {
    return this.http.get(`${this.apiUrl}/agents/${projectId}/india-compliance`);
  }
  // --- Field Operations: Safety / HSE & Toolbox Talks ---
  getSafetySummary(projectId) {
    return this.http.get(`${this.apiUrl}/safety/project/${projectId}/summary`);
  }
  createSafetyIncident(projectId, data) {
    return this.http.post(`${this.apiUrl}/safety/project/${projectId}/incidents`, data);
  }
  updateSafetyIncident(projectId, incidentId, data) {
    return this.http.put(`${this.apiUrl}/safety/project/${projectId}/incidents/${incidentId}`, data);
  }
  createToolboxTalk(projectId, data) {
    return this.http.post(`${this.apiUrl}/safety/project/${projectId}/toolbox-talks`, data);
  }
  // --- Field Operations: QA/QC & RFIs ---
  getProjectRFIs(projectId, status) {
    const q = status ? `?status=${status}` : "";
    return this.http.get(`${this.apiUrl}/rfis/project/${projectId}${q}`);
  }
  createRFI(projectId, data) {
    return this.http.post(`${this.apiUrl}/rfis/project/${projectId}`, data);
  }
  answerRFI(projectId, rfiId, response) {
    return this.http.put(`${this.apiUrl}/rfis/project/${projectId}/${rfiId}/answer`, { response });
  }
  // --- Zyno Intelligence Copilot ---
  askCopilot(projectId, question) {
    return this.http.post(`${this.apiUrl}/copilot/query`, { project_id: projectId, question });
  }
  static \u0275fac = function ProjectService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(AuthService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectService, factory: _ProjectService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: AuthService }], null);
})();

export {
  ProjectService
};
//# sourceMappingURL=chunk-52DGP4Y7.js.map
