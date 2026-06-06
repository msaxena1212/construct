import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-F27QM527.js";

// src/app/modules/projects/services/project-service.ts
var ProjectService = class _ProjectService {
  http;
  apiUrl = environment.serverUrl + "/api/v1";
  constructor(http) {
    this.http = http;
  }
  getProjects() {
    return this.http.get(`${this.apiUrl}/projects`);
  }
  getProjectById(id) {
    return this.http.get(`${this.apiUrl}/projects/${id}`);
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
  getUpdates() {
    return this.http.get(`${this.apiUrl}/updates`);
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
  static \u0275fac = function ProjectService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectService, factory: _ProjectService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ProjectService
};
//# sourceMappingURL=chunk-VBCWJQVV.js.map
