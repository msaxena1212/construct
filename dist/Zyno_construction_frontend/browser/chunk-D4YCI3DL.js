import {
  SkillMasterServices
} from "./chunk-R26N3MCA.js";
import {
  CategoryServeice,
  Equipment,
  MaterialMasterService
} from "./chunk-R2A3OHD2.js";
import {
  VendorsServices
} from "./chunk-PVCBN2NP.js";
import {
  CommonDialogComponent
} from "./chunk-WS53KIOQ.js";
import {
  ToastrService
} from "./chunk-YLGXRPVA.js";
import "./chunk-M3DYL5PG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-WFU7JF4C.js";
import {
  CommonModule,
  Component,
  CurrencyPipe,
  NgClass,
  NgModule,
  Router,
  RouterModule,
  __spreadValues,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-F27QM527.js";

// src/app/modules/master/material-master/material-master.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.sku;
function MaterialMaster_For_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 42)(2, "div", 43)(3, "div", 44);
    \u0275\u0275element(4, "div", 45);
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275text(6, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 2)(8, "p", 47);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 23)(11, "span", 48);
    \u0275\u0275text(12, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 49);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 50)(16, "span", 51);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 50)(19, "div", 52)(20, "span", 53);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 54);
    \u0275\u0275text(24, " Per Unit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "td", 50)(26, "div", 55)(27, "div", 56)(28, "span", 57);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 58);
    \u0275\u0275text(31, " Available ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 59);
    \u0275\u0275element(33, "div", 60);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "td", 61)(35, "div", 62)(36, "span", 63);
    \u0275\u0275element(37, "span", 64);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 65)(40, "button", 66);
    \u0275\u0275listener("click", function MaterialMaster_For_40_Template_button_click_40_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal($event, item_r2));
    });
    \u0275\u0275elementStart(41, "span", 25);
    \u0275\u0275text(42, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "button", 67);
    \u0275\u0275listener("click", function MaterialMaster_For_40_Template_button_click_43_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r2));
    });
    \u0275\u0275elementStart(44, "span", 25);
    \u0275\u0275text(45, " delete ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", item_r2.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", item_r2.sku, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r2.category, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(22, 10, item_r2.cost, "\u20B9"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", item_r2.stockAvailable || 0, " Units ");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", item_r2.stockAvailable > 100 ? 100 : item_r2.stockAvailable || 0, "%");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
  }
}
function MaterialMaster_For_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function MaterialMaster_For_49_Template_button_click_0_listener() {
      const $index_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage($index_r5 + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function MaterialMaster_For_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r6 = ctx.$implicit;
    \u0275\u0275property("value", category_r6.category_name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r6.category_name, " ");
  }
}
function MaterialMaster_Conditional_77_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", category_r8.category_name)("selected", category_r8.category_name === ctx_r2.materialToEdit.category);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r8.category_name, " ");
  }
}
function MaterialMaster_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "label", 31);
    \u0275\u0275text(4, "Material Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Conditional_77_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.name, $event) || (ctx_r2.materialToEdit.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 31);
    \u0275\u0275text(8, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Conditional_77_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.sku, $event) || (ctx_r2.materialToEdit.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "label", 31);
    \u0275\u0275text(12, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 34);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Conditional_77_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.category, $event) || (ctx_r2.materialToEdit.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 35);
    \u0275\u0275text(15, " Select Category ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, MaterialMaster_Conditional_77_For_17_Template, 2, 3, "option", 71, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 30)(19, "label", 31);
    \u0275\u0275text(20, "Cost Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Conditional_77_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.cost, $event) || (ctx_r2.materialToEdit.cost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.sku);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.category);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.categories);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.cost);
  }
}
function MaterialMaster_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "p", 72);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 73);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, "? This action cannot be undone. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('"', ctx_r2.materialToDelete.name, '"');
  }
}
function MaterialMaster_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_80_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 75);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_80_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 76);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 77)(5, "div")(6, "label", 78);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 79)(9, "option");
    \u0275\u0275text(10, "Usage Rate (Highest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option");
    \u0275\u0275text(12, "Usage Rate (Lowest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option");
    \u0275\u0275text(14, "Stock Level (Asc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option");
    \u0275\u0275text(16, "Stock Level (Desc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option");
    \u0275\u0275text(18, "Newest Additions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div")(20, "label", 78);
    \u0275\u0275text(21, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 80)(23, "button", 81);
    \u0275\u0275text(24, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 82);
    \u0275\u0275text(26, "Preferred");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 82);
    \u0275\u0275text(28, "New");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "button", 83);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_80_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275text(30, "Apply Filters");
    \u0275\u0275elementEnd()()();
  }
}
var MaterialMaster = class _MaterialMaster {
  materialService = inject(MaterialMasterService);
  router = inject(Router);
  vendorService = inject(VendorsServices);
  toast = inject(ToastrService);
  categoryService = inject(CategoryServeice);
  selectedTab = "All Materials";
  // Modal States
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showFilters = false;
  materialToEdit;
  materialToDelete;
  newMaterial = this.getDefaultMaterial();
  materials = [];
  vendors = [];
  page = 1;
  pageSize = 5;
  paginatedMaterials = [];
  Math;
  searchQuery;
  categories = [];
  ngOnInit() {
    this.materialService.loadMaterials();
    this.materialService.materials$.subscribe((m) => {
      this.materials = m;
      this.page = 1;
      this.updatePagination();
    });
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
    });
    this.getCategories();
  }
  getCategories() {
    this.categoryService.loadCategories().subscribe({
      next: () => {
        this.categoryService.categories$.subscribe((res) => {
          this.categories = res.filter((c) => c.category_type === "Material");
          this.updatePagination();
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to load skills");
      }
    });
  }
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMaterials = this.filteredMaterials.slice(start, end);
  }
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  goToPage(p) {
    this.page = p;
    this.updatePagination();
  }
  totalPages() {
    return Math.ceil(this.materials.length / this.pageSize);
  }
  get endItem() {
    return Math.min(this.page * this.pageSize, this.filteredMaterials.length);
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  get filteredMaterials() {
    let filtered = [...this.materials];
    if (this.selectedTab !== "All Materials") {
      filtered = filtered.filter((m) => (m.category || "").trim().toLowerCase() === this.selectedTab.trim().toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((material) => material.name?.toLowerCase().includes(q) || material.sku?.toLowerCase().includes(q));
    }
    return filtered;
  }
  getDefaultMaterial() {
    return {
      name: "",
      sku: "",
      category: "Concrete",
      cost: 0,
      status: "ACTIVE",
      stockAvailable: 0
    };
  }
  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.showAddModal = true;
  }
  getvendor(vendorId) {
    console.log(vendorId.target.value, "sdzfdsfds");
  }
  addMaterial() {
    this.materialService.addMaterial(__spreadValues({}, this.newMaterial)).subscribe({
      next: (res) => {
        console.log("Material created", res);
        this.showAddModal = false;
        this.toast.success("Material added successfully");
        this.materialService.loadMaterials();
        this.getDefaultMaterial();
      },
      error: (err) => {
        console.error("Error creating material", err);
        this.toast.error(err?.error?.message || "Failed to add material");
      }
    });
  }
  openEditModal(event, material) {
    console.log(material);
    event.stopPropagation();
    this.materialToEdit = __spreadValues({}, material);
    this.showEditModal = true;
  }
  updateMaterial() {
    if (this.materialToEdit) {
      this.materialService.updateMaterial(this.materialToEdit.id, this.materialToEdit).subscribe({
        next: () => {
          this.showEditModal = false;
          this.materialToEdit = null;
          this.toast.success("Material updated successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Update failed", err);
          this.toast.error(err?.error?.message || "Failed to update material");
        }
      });
    }
  }
  openDeleteModal(event, material) {
    event.stopPropagation();
    this.materialToDelete = material;
    this.showDeleteModal = true;
  }
  confirmDelete() {
    if (this.materialToDelete) {
      this.materialService.deleteMaterial(this.materialToDelete.id).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.materialToDelete = null;
          this.toast.success("Material deleted successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Delete failed", err);
          this.toast.error(err?.error?.message || "Failed to delete material");
        }
      });
    }
  }
  static \u0275fac = function MaterialMaster_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaterialMaster)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaterialMaster, selectors: [["app-material-master"]], standalone: false, decls: 81, vars: 21, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "gap-3"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/60", "dark:border-slate-800", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search materials...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "px-4", "py-4"], [1, "w-full", "min-w-[1150px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[99]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl", "cursor-pointer"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "class"], ["title", "New Material", "icon", "inventory_2", "cancelLabel", "Cancel", "primaryLabel", "Add Material", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], ["type", "text", "placeholder", "e.g. Portland Cement Grade-C", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], [3, "value"], ["type", "number", "min", "1", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["title", "Edit Material", "icon", "edit_square", "cancelLabel", "Cancel", "primaryLabel", "Save Changes", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], ["variant", "danger", "title", "Delete Material?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "fixed", "inset-0", "z-[90]"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm", "group-hover:shadow-xl", "transition-all", "duration-300"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity", "duration-300"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10", "group-hover:scale-110", "transition-transform", "duration-300"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "px-4", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "flex", "flex-col"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-[210px]", "flex", "flex-col", "gap-3"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-[11px]", "font-bold", "text-emerald-600"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "px-6", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm", "group-hover:shadow-xl", "transition-all", "duration-300"], [1, "flex", "items-center", "justify-between", "gap-4"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-2xl", "text-[11px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", 3, "ngClass"], [1, "flex", "items-center", "gap-2", "transition-all", "duration-300"], [1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "click"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "ngModelChange", "ngModel"], [3, "value", "selected"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "space-y-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], [1, "w-full", "p-2", "bg-surface-container", "rounded-lg", "text-xs", "font-bold", "outline-none"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "bg-primary", "text-white", "rounded", "text-[10px]", "font-bold"], [1, "px-2", "py-1", "bg-surface-container", "text-outline", "rounded", "text-[10px]", "font-bold"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"]], template: function MaterialMaster_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Materials Master ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "button", 5);
      \u0275\u0275listener("click", function MaterialMaster_Template_button_click_6_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275element(7, "div", 6);
      \u0275\u0275elementStart(8, "div", 7)(9, "span", 8);
      \u0275\u0275text(10, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275text(11, " Add Material ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "div", 9)(13, "div", 10)(14, "div")(15, "h3", 11);
      \u0275\u0275text(16, " Materials Master ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p", 12);
      \u0275\u0275text(18, " Manage and monitor all material stock ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 13)(20, "div", 14)(21, "span", 15);
      \u0275\u0275text(22, " search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_23_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(24, "div", 17)(25, "table", 18)(26, "thead")(27, "tr")(28, "th", 19);
      \u0275\u0275text(29, " Material ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "th", 19);
      \u0275\u0275text(31, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "th", 19);
      \u0275\u0275text(33, " Cost ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "th", 19);
      \u0275\u0275text(35, " Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "th", 19);
      \u0275\u0275text(37, " Status ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "tbody");
      \u0275\u0275repeaterCreate(39, MaterialMaster_For_40_Template, 46, 13, "tr", 20, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 21)(42, "p", 22);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 23)(45, "button", 24);
      \u0275\u0275listener("click", function MaterialMaster_Template_button_click_45_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(46, "span", 25);
      \u0275\u0275text(47, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(48, MaterialMaster_For_49_Template, 2, 3, "button", 26, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(50, "button", 24);
      \u0275\u0275listener("click", function MaterialMaster_Template_button_click_50_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(51, "span", 25);
      \u0275\u0275text(52, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(53, "app-common-dialog", 27);
      \u0275\u0275listener("closed", function MaterialMaster_Template_app_common_dialog_closed_53_listener() {
        return ctx.showAddModal = false;
      })("primary", function MaterialMaster_Template_app_common_dialog_primary_53_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275elementStart(54, "div", 28)(55, "div", 29)(56, "div", 30)(57, "label", 31);
      \u0275\u0275text(58, "Material Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "input", 32);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_59_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.name, $event) || (ctx.newMaterial.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div")(61, "label", 31);
      \u0275\u0275text(62, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "input", 33);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div")(65, "label", 31);
      \u0275\u0275text(66, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "select", 34);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_select_ngModelChange_67_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.category, $event) || (ctx.newMaterial.category = $event);
        return $event;
      });
      \u0275\u0275elementStart(68, "option", 35);
      \u0275\u0275text(69, " Select Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(70, MaterialMaster_For_71_Template, 2, 2, "option", 36, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "div", 30)(73, "label", 31);
      \u0275\u0275text(74, "Cost Price");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "input", 37);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_75_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(76, "app-common-dialog", 38);
      \u0275\u0275listener("closed", function MaterialMaster_Template_app_common_dialog_closed_76_listener() {
        return ctx.showEditModal = false;
      })("primary", function MaterialMaster_Template_app_common_dialog_primary_76_listener() {
        return ctx.updateMaterial();
      });
      \u0275\u0275conditionalCreate(77, MaterialMaster_Conditional_77_Template, 22, 4, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "app-common-dialog", 39);
      \u0275\u0275listener("closed", function MaterialMaster_Template_app_common_dialog_closed_78_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function MaterialMaster_Template_app_common_dialog_primary_78_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(79, MaterialMaster_Conditional_79_Template, 6, 1, "div", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(80, MaterialMaster_Conditional_80_Template, 31, 0, "div", 41);
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(16);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", (ctx.page - 1) * ctx.pageSize + 1, " to ", ctx.endItem, " of ", ctx.materials.length, " materials ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(20, _c0).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.category);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToEdit ? 77 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToDelete ? 79 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showFilters ? 80 : -1);
    }
  }, dependencies: [NgClass, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, CommonDialogComponent, CurrencyPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialMaster, [{
    type: Component,
    args: [{ selector: "app-material-master", standalone: false, template: `<!-- Content Area -->\r
<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
    <!-- Page Header & Key Metrics -->\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Materials Master\r
            </h2>\r
        </div>\r
        <div class="flex gap-3">\r
\r
            <button (click)="openAddModal()"\r
                class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r
\r
                <!-- Glow -->\r
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
                </div>\r
\r
                <!-- Icon -->\r
                <div\r
                    class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">\r
\r
                    <span class="material-symbols-outlined text-[20px]">\r
                        add\r
                    </span>\r
\r
                </div>\r
\r
                Add Material\r
\r
\r
\r
\r
            </button>\r
        </div>\r
    </div>\r
\r
\r
    <!-- Inventory Table Container -->\r
    <div\r
        class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm">\r
\r
        <!-- Table Header -->\r
        <div\r
            class="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/50">\r
\r
            <div>\r
                <h3 class="text-lg font-black tracking-tight text-slate-800 dark:text-white">\r
                    Materials Master\r
                </h3>\r
\r
                <p class="text-xs text-slate-500 font-medium mt-1">\r
                    Manage and monitor all material stock\r
                </p>\r
            </div>\r
            <!-- Actions -->\r
            <div class="flex items-center gap-3">\r
\r
                <!-- Search -->\r
                <div\r
                    class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">\r
\r
                    <span class="material-symbols-outlined text-slate-400 text-[20px]">\r
                        search\r
                    </span>\r
\r
                    <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
                        placeholder="Search materials..."\r
                        class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
\r
                </div>\r
\r
            </div>\r
\r
\r
\r
        </div>\r
\r
        <!-- Responsive Table -->\r
        <div class="overflow-x-auto px-4 py-4">\r
\r
            <table class="w-full min-w-[1150px] border-separate border-spacing-y-4">\r
\r
                <!-- Head -->\r
                <thead>\r
\r
                    <tr>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Material\r
                        </th>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Category\r
                        </th>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Cost\r
                        </th>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Stock\r
                        </th>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Status\r
                        </th>\r
\r
                    </tr>\r
\r
                </thead>\r
\r
                <!-- Body -->\r
                <tbody>\r
\r
                    @for (item of paginatedMaterials; track item.sku) {\r
\r
                    <tr\r
                        class="group relative z-0 hover:z-[99] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl cursor-pointer">\r
\r
                        <!-- Material -->\r
                        <td\r
                            class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-xl transition-all duration-300">\r
\r
                            <div class="flex items-center gap-4">\r
\r
                                <!-- Icon -->\r
                                <div\r
                                    class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
\r
                                    <div\r
                                        class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300">\r
                                    </div>\r
\r
                                    <span\r
                                        class="material-symbols-outlined text-primary text-[24px] relative z-10 group-hover:scale-110 transition-transform duration-300">\r
\r
                                        inventory_2\r
\r
                                    </span>\r
\r
                                </div>\r
\r
                                <!-- Info -->\r
                                <div class="space-y-1">\r
\r
                                    <p\r
                                        class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                                        {{ item.name }}\r
\r
                                    </p>\r
\r
                                    <div class="flex items-center gap-2">\r
\r
                                        <span\r
                                            class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
\r
                                            SKU\r
\r
                                        </span>\r
\r
                                        <span class="text-xs text-slate-400 font-semibold">\r
                                            {{ item.sku }}\r
                                        </span>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                        <!-- Category -->\r
                        <td\r
                            class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <span\r
                                class="inline-flex items-center px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide">\r
\r
                                {{ item.category }}\r
\r
                            </span>\r
\r
                        </td>\r
\r
                        <!-- Cost -->\r
                        <td\r
                            class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="flex flex-col">\r
\r
                                <span class="text-lg font-black text-slate-800 dark:text-white">\r
                                    {{ item.cost | currency:'\u20B9' }}\r
                                </span>\r
\r
                                <span class="text-[11px] text-slate-400 font-semibold">\r
                                    Per Unit\r
                                </span>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                        <!-- Stock -->\r
                        <td\r
                            class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="w-[210px] flex flex-col gap-3">\r
\r
                                <div class="flex items-center justify-between">\r
\r
                                    <span class="text-sm font-black text-slate-700 dark:text-slate-200">\r
                                        {{ item.stockAvailable || 0 }} Units\r
                                    </span>\r
\r
                                    <span class="text-[11px] font-bold text-emerald-600">\r
                                        Available\r
                                    </span>\r
\r
                                </div>\r
\r
                                <!-- Progress -->\r
                                <div\r
                                    class="relative w-full h-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">\r
\r
                                    <div class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container transition-all duration-700"\r
                                        [style.width.%]="item.stockAvailable > 100 ? 100 : item.stockAvailable || 0">\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                        <!-- Status -->\r
                        <td\r
                            class="px-6 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-xl transition-all duration-300">\r
\r
                            <div class="flex items-center justify-between gap-4">\r
\r
                                <!-- Status -->\r
                                <span\r
                                    class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wide"\r
                                    [ngClass]="item.status === 'ACTIVE'\r
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'\r
                            : 'bg-amber-50 text-amber-700 border border-amber-200'">\r
\r
                                    <span class="w-2.5 h-2.5 rounded-full" [ngClass]="item.status === 'ACTIVE'\r
                                ? 'bg-emerald-500'\r
                                : 'bg-amber-500'">\r
                                    </span>\r
\r
                                    {{ item.status }}\r
\r
                                </span>\r
\r
                                <!-- Actions -->\r
                                <div class="flex items-center gap-2 transition-all duration-300">\r
\r
                                    <!-- Edit -->\r
                                    <button (click)="openEditModal($event, item)"\r
                                        class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                                        <span class="material-symbols-outlined text-[18px]">\r
                                            edit\r
                                        </span>\r
\r
                                    </button>\r
\r
                                    <!-- Delete -->\r
                                    <button (click)="openDeleteModal($event, item)"\r
                                        class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                                        <span class="material-symbols-outlined text-[18px]">\r
                                            delete\r
                                        </span>\r
\r
                                    </button>\r
\r
                                </div>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                    </tr>\r
\r
                    }\r
\r
                </tbody>\r
\r
            </table>\r
\r
        </div>\r
\r
        <!-- Footer Pagination -->\r
        <div\r
            class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-4">\r
\r
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500">\r
\r
                Showing {{ (page - 1) * pageSize + 1 }}\r
                to {{ endItem }}\r
                of {{ materials.length }} materials\r
\r
            </p>\r
\r
            <div class="flex items-center gap-2">\r
\r
                <!-- Prev -->\r
                <button (click)="prevPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_left\r
                    </span>\r
\r
                </button>\r
\r
                <!-- Pages -->\r
                @for (p of [].constructor(totalPages()); track $index) {\r
\r
                <button (click)="goToPage($index + 1)"\r
                    [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
                    class="w-9 h-9 rounded-xl text-sm font-bold transition-all">\r
\r
                    {{ $index + 1 }}\r
\r
                </button>\r
\r
                }\r
\r
                <!-- Next -->\r
                <button (click)="nextPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_right\r
                    </span>\r
\r
                </button>\r
\r
            </div>\r
\r
        </div>\r
\r
    </div>\r
</section>\r
\r
<!-- Modals -->\r
<!-- Add Material Modal -->\r
<app-common-dialog\r
    [open]="showAddModal"\r
    title="New Material"\r
    icon="inventory_2"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Add Material"\r
    (closed)="showAddModal = false"\r
    (primary)="addMaterial()"\r
>\r
    <div class="p-8">\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material\r
                    Name</label>\r
                <input [(ngModel)]="newMaterial.name" type="text" placeholder="e.g. Portland Cement Grade-C"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>\r
                <input [(ngModel)]="newMaterial.sku" type="text" placeholder="SKU-XXX-X"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
                <select [(ngModel)]="newMaterial.category" class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800\r
         text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
\r
                    <!-- Default Disabled Option -->\r
                    <option value="" disabled selected>\r
                        Select Category\r
                    </option>\r
\r
                    @for (category of categories; track $index) {\r
\r
                    <option [value]="category.category_name">\r
                        {{ category.category_name }}\r
                    </option>\r
\r
                    }\r
\r
                </select>\r
            </div>\r
\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Cost\r
                    Price</label>\r
                <input [(ngModel)]="newMaterial.cost" type="number" min="1" placeholder="0.00"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
        </div>\r
\r
    </div>\r
</app-common-dialog>\r
\r
<!-- Edit Material Modal -->\r
<app-common-dialog\r
    [open]="showEditModal && !!materialToEdit"\r
    title="Edit Material"\r
    icon="edit_square"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Save Changes"\r
    (closed)="showEditModal = false"\r
    (primary)="updateMaterial()"\r
>\r
    @if (materialToEdit) {\r
    <div class="p-8">\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material\r
                    Name</label>\r
                <input [(ngModel)]="materialToEdit.name" type="text"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU\r
                    Code</label>\r
                <input [(ngModel)]="materialToEdit.sku" type="text" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-slate-50 dark:bg-slate-800/50 text-sm font-bold outline-none cursor-not-allowed">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
                <select [(ngModel)]="materialToEdit.category" class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800\r
         text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
\r
                    <!-- Default Disabled Option -->\r
                    <option value="" disabled selected>\r
                        Select Category\r
                    </option>\r
\r
                    @for (category of categories; track $index) {\r
\r
                    <option [value]="category.category_name"\r
                        [selected]="category.category_name === materialToEdit.category">\r
                        {{ category.category_name }}\r
                    </option>\r
\r
                    }\r
\r
                </select>\r
            </div>\r
\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Cost\r
                    Price</label>\r
                <input [(ngModel)]="materialToEdit.cost" type="text"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <!-- <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Current\r
                    Stock</label>\r
                <input [(ngModel)]="materialToEdit.stockCurrent" type="number"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Total\r
                    Capacity</label>\r
                <input [(ngModel)]="materialToEdit.stockTotal" type="number"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Unit\r
                    Cost</label>\r
                <input [(ngModel)]="materialToEdit.cost" type="text"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Supplier</label>\r
                <select [(ngModel)]="materialToEdit.vendor_id" (change)="getvendor($event)"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                    @for (v of vendors; track v.id) {\r
                    <option [value]="v.id">{{ v.name }}</option>\r
                    }\r
                </select>\r
            </div> -->\r
        </div>\r
\r
    </div>\r
    }\r
</app-common-dialog>\r
\r
<!-- Delete Confirmation Modal -->\r
<app-common-dialog\r
    [open]="showDeleteModal && !!materialToDelete"\r
    variant="danger"\r
    title="Delete Material?"\r
    subtitle="This action cannot be undone."\r
    icon="delete_forever"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Delete Item"\r
    (closed)="showDeleteModal = false"\r
    (primary)="confirmDelete()"\r
>\r
    @if (materialToDelete) {\r
    <div class="p-8 text-center">\r
        <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
                class="text-on-surface font-black">"{{ materialToDelete.name }}"</span>? This action cannot be\r
            undone.\r
        </p>\r
    </div>\r
    }\r
</app-common-dialog>\r
\r
<!-- Filters Dropdown Overlay -->\r
@if (showFilters) {\r
<div class="fixed inset-0 z-[90]" (click)="showFilters = false">\r
    <div class="absolute top-32 right-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 p-6 w-72 animate-in fade-in slide-in-from-top-4 duration-300"\r
        (click)="$event.stopPropagation()">\r
        <h4 class="text-xs font-black uppercase tracking-widest text-outline mb-4">Advanced Filters</h4>\r
        <div class="space-y-4">\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Sort Order</label>\r
                <select class="w-full p-2 bg-surface-container rounded-lg text-xs font-bold outline-none">\r
                    <option>Usage Rate (Highest)</option>\r
                    <option>Usage Rate (Lowest)</option>\r
                    <option>Stock Level (Asc)</option>\r
                    <option>Stock Level (Desc)</option>\r
                    <option>Newest Additions</option>\r
                </select>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Supplier Status</label>\r
                <div class="flex flex-wrap gap-2">\r
                    <button class="px-2 py-1 bg-primary text-white rounded text-[10px] font-bold">Active</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">Preferred</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">New</button>\r
                </div>\r
            </div>\r
        </div>\r
        <button (click)="showFilters = false"\r
            class="w-full mt-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">Apply\r
            Filters</button>\r
    </div>\r
</div>\r
}\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaterialMaster, { className: "MaterialMaster", filePath: "app/modules/master/material-master/material-master.ts", lineNumber: 16 });
})();

// src/app/modules/master/equipment-master/equipment-master.ts
var _c02 = () => [];
var _forTrack02 = ($index, $item) => $item.sku;
function EquipmentMaster_For_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 42)(2, "div", 43)(3, "div", 44);
    \u0275\u0275element(4, "div", 45);
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275text(6, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 2)(8, "p", 47);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 23)(11, "span", 48);
    \u0275\u0275text(12, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 49);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 50)(16, "span", 51);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 50)(19, "div", 52)(20, "span", 53);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 54);
    \u0275\u0275text(24, " Per Unit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "td", 50)(26, "div", 55)(27, "div", 56)(28, "span", 57);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 58);
    \u0275\u0275text(31, " Available ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 59);
    \u0275\u0275element(33, "div", 60);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "td", 61)(35, "div", 62)(36, "span", 63);
    \u0275\u0275element(37, "span", 64);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 23)(40, "button", 65);
    \u0275\u0275listener("click", function EquipmentMaster_For_40_Template_button_click_40_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal($event, item_r2));
    });
    \u0275\u0275elementStart(41, "span", 25);
    \u0275\u0275text(42, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "button", 66);
    \u0275\u0275listener("click", function EquipmentMaster_For_40_Template_button_click_43_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r2));
    });
    \u0275\u0275elementStart(44, "span", 25);
    \u0275\u0275text(45, " delete ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", item_r2.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", item_r2.sku, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r2.category, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(22, 10, item_r2.cost, "\u20B9"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", item_r2.stockAvailable || 0, " Units ");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", item_r2.stockAvailable > 100 ? 100 : item_r2.stockAvailable || 0, "%");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
  }
}
function EquipmentMaster_For_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function EquipmentMaster_For_49_Template_button_click_0_listener() {
      const $index_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage($index_r5 + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function EquipmentMaster_For_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r6 = ctx.$implicit;
    \u0275\u0275property("value", category_r6.category_name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r6.category_name, " ");
  }
}
function EquipmentMaster_Conditional_77_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    \u0275\u0275property("value", category_r8.category_name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r8.category_name, " ");
  }
}
function EquipmentMaster_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "label", 31);
    \u0275\u0275text(4, "Equipment Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Conditional_77_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.name, $event) || (ctx_r2.materialToEdit.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 31);
    \u0275\u0275text(8, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Conditional_77_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.sku, $event) || (ctx_r2.materialToEdit.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "label", 31);
    \u0275\u0275text(12, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 34);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Conditional_77_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.category, $event) || (ctx_r2.materialToEdit.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 35);
    \u0275\u0275text(15, " Select Category ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, EquipmentMaster_Conditional_77_For_17_Template, 2, 2, "option", 36, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 30)(19, "label", 31);
    \u0275\u0275text(20, "Cost Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Conditional_77_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.cost, $event) || (ctx_r2.materialToEdit.cost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.sku);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.category);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.categories);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.cost);
  }
}
function EquipmentMaster_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "p", 70);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 71);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, "? This action cannot be undone. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('"', ctx_r2.materialToDelete.name, '"');
  }
}
function EquipmentMaster_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_80_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 73);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_80_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 74);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 75)(5, "div")(6, "label", 76);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 77)(9, "option");
    \u0275\u0275text(10, "Usage Rate (Highest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option");
    \u0275\u0275text(12, "Usage Rate (Lowest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option");
    \u0275\u0275text(14, "Stock Level (Asc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option");
    \u0275\u0275text(16, "Stock Level (Desc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option");
    \u0275\u0275text(18, "Newest Additions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div")(20, "label", 76);
    \u0275\u0275text(21, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 78)(23, "button", 79);
    \u0275\u0275text(24, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 80);
    \u0275\u0275text(26, "Preferred");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 80);
    \u0275\u0275text(28, "New");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "button", 81);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_80_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275text(30, "Apply Filters");
    \u0275\u0275elementEnd()()();
  }
}
var EquipmentMaster = class _EquipmentMaster {
  router = inject(Router);
  vendorService = inject(VendorsServices);
  toast = inject(ToastrService);
  materialService = inject(Equipment);
  categoryService = inject(CategoryServeice);
  team = [
    { name: "All Members" },
    { name: "Marcus Thorne" },
    { name: "Sarah Chen" }
  ];
  selectedMember = "All Members";
  selectedTab = "All Materials";
  // tabs = ['All Materials', 'Low Stock', 'Concrete', 'Steel', 'Electrical', 'Lumber'];
  // Modal States
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showFilters = false;
  materialToEdit;
  materialToDelete;
  newMaterial = this.getDefaultMaterial();
  materials = [];
  vendors = [];
  page = 1;
  pageSize = 5;
  paginatedMaterials = [];
  Math;
  searchQuery;
  categories;
  ngOnInit() {
    this.materialService.loadMaterials();
    this.materialService.materials$.subscribe((m) => {
      this.materials = m;
      this.page = 1;
      this.updatePagination();
    });
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
    });
    this.getCategories();
  }
  getCategories() {
    this.categoryService.loadCategories().subscribe({
      next: () => {
        this.categoryService.categories$.subscribe((res) => {
          this.categories = res.filter((c) => c.category_type === "Equipment");
          this.updatePagination();
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to load skills");
      }
    });
  }
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMaterials = this.filteredMaterials.slice(start, end);
  }
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  goToPage(p) {
    this.page = p;
    this.updatePagination();
  }
  totalPages() {
    return Math.ceil(this.materials.length / this.pageSize);
  }
  get endItem() {
    return Math.min(this.page * this.pageSize, this.filteredMaterials.length);
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  get filteredMaterials() {
    let filtered = [...this.materials];
    if (this.selectedTab !== "All Materials") {
      filtered = filtered.filter((m) => (m.category || "").trim().toLowerCase() === this.selectedTab.trim().toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((material) => material.name?.toLowerCase().includes(q) || material.sku?.toLowerCase().includes(q));
    }
    return filtered;
  }
  getDefaultMaterial() {
    return {
      name: "",
      sku: "",
      category: "Concrete",
      cost: 0,
      status: "ACTIVE",
      stockAvailable: 0
    };
  }
  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.showAddModal = true;
  }
  getvendor(vendorId) {
    console.log(vendorId.target.value, "sdzfdsfds");
  }
  addMaterial() {
    this.materialService.addMaterial(__spreadValues({}, this.newMaterial)).subscribe({
      next: (res) => {
        console.log("Material created", res);
        this.showAddModal = false;
        this.toast.success("Material added successfully");
        this.materialService.loadMaterials();
        this.getDefaultMaterial();
      },
      error: (err) => {
        console.error("Error creating material", err);
        this.toast.error(err?.error?.message || "Failed to add material");
      }
    });
  }
  openEditModal(event, material) {
    console.log(material);
    event.stopPropagation();
    this.materialToEdit = __spreadValues({}, material);
    this.showEditModal = true;
  }
  updateMaterial() {
    if (this.materialToEdit) {
      this.materialService.updateMaterial(this.materialToEdit.id, this.materialToEdit).subscribe({
        next: () => {
          this.showEditModal = false;
          this.materialToEdit = null;
          this.toast.success("Material updated successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Update failed", err);
          this.toast.error(err?.error?.message || "Failed to update material");
        }
      });
    }
  }
  openDeleteModal(event, material) {
    event.stopPropagation();
    this.materialToDelete = material;
    this.showDeleteModal = true;
  }
  confirmDelete() {
    if (this.materialToDelete) {
      this.materialService.deleteMaterial(this.materialToDelete.id).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.materialToDelete = null;
          this.toast.success("Material deleted successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Delete failed", err);
          this.toast.error(err?.error?.message || "Failed to delete material");
        }
      });
    }
  }
  calculateStatus(percent) {
    if (percent < 20)
      return "Critical";
    if (percent < 60)
      return "Adequate";
    return "Optimal";
  }
  exportReport() {
    console.log("Exporting materials report...");
    alert("Materials report exported successfully (Simulated)");
  }
  deliveries = [
    { time: "09:00", period: "AM", item: "Lumber Pine Planks (400 Units)", location: "Site A - Skyline Towers", status: "In Transit", statusColor: "bg-blue-50 text-blue-600", assignee: "Marcus Thorne" },
    { time: "14:30", period: "PM", item: "HVAC Ducting Components", location: "Site C - Riverside Mall", status: "Confirmed", statusColor: "bg-surface-container text-outline", assignee: "Sarah Chen" }
  ];
  get filteredDeliveries() {
    if (this.selectedMember === "All Members")
      return this.deliveries;
    return this.deliveries.filter((d) => d.assignee === this.selectedMember);
  }
  static \u0275fac = function EquipmentMaster_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EquipmentMaster)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EquipmentMaster, selectors: [["app-equipment-master"]], standalone: false, decls: 81, vars: 21, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "gap-3"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/60", "dark:border-slate-800", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search equipment...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "px-4", "py-4"], [1, "w-full", "min-w-[1050px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[99]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl", "cursor-pointer"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "class"], ["title", "New Equipment", "icon", "construction", "cancelLabel", "Cancel", "primaryLabel", "Add Equipment", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], ["type", "text", "placeholder", "e.g. Portland Cement Grade-C", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], [3, "value"], ["type", "number", "min", "1", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["title", "Edit Equipment", "icon", "edit_square", "cancelLabel", "Cancel", "primaryLabel", "Save Changes", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], ["variant", "danger", "title", "Delete Equipment?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "fixed", "inset-0", "z-[90]"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "px-4", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "flex", "flex-col"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-[210px]", "flex", "flex-col", "gap-3"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-[11px]", "font-bold", "text-emerald-600"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "px-6", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-4"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-2xl", "text-[11px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", 3, "ngClass"], [1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "click"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "ngModelChange", "ngModel"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "space-y-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], [1, "w-full", "p-2", "bg-surface-container", "rounded-lg", "text-xs", "font-bold", "outline-none"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "bg-primary", "text-white", "rounded", "text-[10px]", "font-bold"], [1, "px-2", "py-1", "bg-surface-container", "text-outline", "rounded", "text-[10px]", "font-bold"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"]], template: function EquipmentMaster_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Equipment Master ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "button", 5);
      \u0275\u0275listener("click", function EquipmentMaster_Template_button_click_6_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275element(7, "div", 6);
      \u0275\u0275elementStart(8, "div", 7)(9, "span", 8);
      \u0275\u0275text(10, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275text(11, " Add Equipment ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "div", 9)(13, "div", 10)(14, "div")(15, "h3", 11);
      \u0275\u0275text(16, " Equipment Master ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p", 12);
      \u0275\u0275text(18, " Manage and monitor all equipment stock ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 13)(20, "div", 14)(21, "span", 15);
      \u0275\u0275text(22, " search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_23_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(24, "div", 17)(25, "table", 18)(26, "thead")(27, "tr")(28, "th", 19);
      \u0275\u0275text(29, " Equipment ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "th", 19);
      \u0275\u0275text(31, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "th", 19);
      \u0275\u0275text(33, " Cost ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "th", 19);
      \u0275\u0275text(35, " Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "th", 19);
      \u0275\u0275text(37, " Status ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "tbody");
      \u0275\u0275repeaterCreate(39, EquipmentMaster_For_40_Template, 46, 13, "tr", 20, _forTrack02);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 21)(42, "p", 22);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 23)(45, "button", 24);
      \u0275\u0275listener("click", function EquipmentMaster_Template_button_click_45_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(46, "span", 25);
      \u0275\u0275text(47, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(48, EquipmentMaster_For_49_Template, 2, 3, "button", 26, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(50, "button", 24);
      \u0275\u0275listener("click", function EquipmentMaster_Template_button_click_50_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(51, "span", 25);
      \u0275\u0275text(52, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(53, "app-common-dialog", 27);
      \u0275\u0275listener("closed", function EquipmentMaster_Template_app_common_dialog_closed_53_listener() {
        return ctx.showAddModal = false;
      })("primary", function EquipmentMaster_Template_app_common_dialog_primary_53_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275elementStart(54, "div", 28)(55, "div", 29)(56, "div", 30)(57, "label", 31);
      \u0275\u0275text(58, "Equipment Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "input", 32);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_59_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.name, $event) || (ctx.newMaterial.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div")(61, "label", 31);
      \u0275\u0275text(62, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "input", 33);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div")(65, "label", 31);
      \u0275\u0275text(66, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "select", 34);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_select_ngModelChange_67_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.category, $event) || (ctx.newMaterial.category = $event);
        return $event;
      });
      \u0275\u0275elementStart(68, "option", 35);
      \u0275\u0275text(69, " Select Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(70, EquipmentMaster_For_71_Template, 2, 2, "option", 36, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "div", 30)(73, "label", 31);
      \u0275\u0275text(74, "Cost Price");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "input", 37);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_75_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(76, "app-common-dialog", 38);
      \u0275\u0275listener("closed", function EquipmentMaster_Template_app_common_dialog_closed_76_listener() {
        return ctx.showEditModal = false;
      })("primary", function EquipmentMaster_Template_app_common_dialog_primary_76_listener() {
        return ctx.updateMaterial();
      });
      \u0275\u0275conditionalCreate(77, EquipmentMaster_Conditional_77_Template, 22, 4, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "app-common-dialog", 39);
      \u0275\u0275listener("closed", function EquipmentMaster_Template_app_common_dialog_closed_78_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function EquipmentMaster_Template_app_common_dialog_primary_78_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(79, EquipmentMaster_Conditional_79_Template, 6, 1, "div", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(80, EquipmentMaster_Conditional_80_Template, 31, 0, "div", 41);
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(16);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredMaterials.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - to ", ctx.endItem, " of ", ctx.filteredMaterials.length, " Equipment ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(20, _c02).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.category);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToEdit ? 77 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToDelete ? 79 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showFilters ? 80 : -1);
    }
  }, dependencies: [NgClass, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, CommonDialogComponent, CurrencyPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EquipmentMaster, [{
    type: Component,
    args: [{ selector: "app-equipment-master", standalone: false, template: `<!-- Content Area -->\r
<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
    <!-- Page Header & Key Metrics -->\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Equipment Master\r
            </h2>\r
        </div>\r
        <div class="flex gap-3">\r
            <button (click)="openAddModal()"\r
                class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r
\r
                <!-- Glow -->\r
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
                </div>\r
\r
                <!-- Icon -->\r
                <div\r
                    class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">\r
\r
                    <span class="material-symbols-outlined text-[20px]">\r
                        add\r
                    </span>\r
\r
                </div>\r
\r
                Add Equipment\r
\r
            </button>\r
        </div>\r
    </div>\r
\r
\r
    <div\r
        class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm">\r
\r
        <!-- Table Header -->\r
        <div\r
            class="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/50">\r
\r
            <div>\r
                <h3 class="text-lg font-black tracking-tight text-slate-800 dark:text-white">\r
                    Equipment Master\r
                </h3>\r
\r
                <p class="text-xs text-slate-500 font-medium mt-1">\r
                    Manage and monitor all equipment stock\r
                </p>\r
            </div>\r
            <!-- Actions -->\r
            <div class="flex items-center gap-3">\r
\r
                <!-- Search -->\r
                <div\r
                    class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">\r
\r
                    <span class="material-symbols-outlined text-slate-400 text-[20px]">\r
                        search\r
                    </span>\r
\r
                    <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
                        placeholder="Search equipment..."\r
                        class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
\r
                </div>\r
\r
            </div>\r
\r
\r
\r
        </div>\r
\r
        <!-- Responsive Table -->\r
        <div class="overflow-x-auto px-4 py-4">\r
\r
            <table class="w-full min-w-[1050px] border-separate border-spacing-y-4">\r
\r
                <!-- Head -->\r
                <thead>\r
\r
                    <tr>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Equipment\r
                        </th>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Category\r
                        </th>\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Cost\r
                        </th>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Stock\r
                        </th>\r
\r
                        <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Status\r
                        </th>\r
\r
                    </tr>\r
\r
                </thead>\r
\r
                <!-- Body -->\r
                <tbody>\r
\r
                    @for (item of paginatedMaterials; track item.sku) {\r
\r
                    <tr\r
                        class="group relative z-0 hover:z-[99] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl cursor-pointer">\r
\r
                        <!-- Equipment -->\r
                        <td\r
                            class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
                            <div class="flex items-center gap-4">\r
\r
                                <!-- Icon -->\r
                                <div\r
                                    class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
\r
                                    <div\r
                                        class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity">\r
                                    </div>\r
\r
                                    <span\r
                                        class="material-symbols-outlined text-primary text-[24px] relative z-10 group-hover:scale-110 transition-transform">\r
                                        inventory_2\r
                                    </span>\r
\r
                                </div>\r
\r
                                <!-- Info -->\r
                                <div class="space-y-1">\r
\r
                                    <p\r
                                        class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                                        {{ item.name }}\r
\r
                                    </p>\r
\r
                                    <div class="flex items-center gap-2">\r
\r
                                        <span\r
                                            class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
                                            SKU\r
                                        </span>\r
\r
                                        <span class="text-xs text-slate-400 font-semibold">\r
                                            {{ item.sku }}\r
                                        </span>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                        <!-- Category -->\r
                        <td\r
                            class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <span\r
                                class="inline-flex items-center px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide">\r
\r
                                {{ item.category }}\r
\r
                            </span>\r
\r
                        </td>\r
\r
                        <td\r
                            class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="flex flex-col">\r
\r
                                <span class="text-lg font-black text-slate-800 dark:text-white">\r
                                    {{ item.cost | currency:'\u20B9' }}\r
                                </span>\r
\r
                                <span class="text-[11px] text-slate-400 font-semibold">\r
                                    Per Unit\r
                                </span>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                        <!-- Stock -->\r
                        <td\r
                            class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="w-[210px] flex flex-col gap-3">\r
\r
                                <div class="flex items-center justify-between">\r
\r
                                    <span class="text-sm font-black text-slate-700 dark:text-slate-200">\r
                                        {{ item.stockAvailable || 0 }} Units\r
                                    </span>\r
\r
                                    <span class="text-[11px] font-bold text-emerald-600">\r
                                        Available\r
                                    </span>\r
\r
                                </div>\r
\r
                                <!-- Progress -->\r
                                <div\r
                                    class="relative w-full h-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">\r
\r
                                    <div class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container transition-all duration-700"\r
                                        [style.width.%]="item.stockAvailable > 100 ? 100 : item.stockAvailable || 0">\r
                                    </div>\r
\r
                                </div>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                        <!-- Status -->\r
                        <td\r
                            class="px-6 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
                            <div class="flex items-center justify-between gap-4">\r
\r
                                <!-- Badge -->\r
                                <span\r
                                    class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wide"\r
                                    [ngClass]="item.status === 'ACTIVE'\r
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'\r
                            : 'bg-amber-50 text-amber-700 border border-amber-200'">\r
\r
                                    <span class="w-2.5 h-2.5 rounded-full" [ngClass]="item.status === 'ACTIVE'\r
                                ? 'bg-emerald-500'\r
                                : 'bg-amber-500'">\r
                                    </span>\r
\r
                                    {{ item.status }}\r
\r
                                </span>\r
\r
                                <!-- Actions -->\r
                                <div class="flex items-center gap-2">\r
\r
                                    <!-- Edit -->\r
                                    <button (click)="openEditModal($event, item)"\r
                                        class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                                        <span class="material-symbols-outlined text-[18px]">\r
                                            edit\r
                                        </span>\r
\r
                                    </button>\r
\r
                                    <!-- Delete -->\r
                                    <button (click)="openDeleteModal($event, item)"\r
                                        class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                                        <span class="material-symbols-outlined text-[18px]">\r
                                            delete\r
                                        </span>\r
\r
                                    </button>\r
\r
                                </div>\r
\r
                            </div>\r
\r
                        </td>\r
\r
                    </tr>\r
\r
                    }\r
\r
                </tbody>\r
\r
            </table>\r
\r
        </div>\r
        <!-- Footer Pagination -->\r
        <div\r
            class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-4">\r
\r
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500">\r
\r
                Showing\r
                {{ filteredMaterials.length ? ((page - 1) * pageSize) + 1 : 0 }}\r
                -\r
                to {{endItem}}\r
\r
                of\r
\r
                {{ filteredMaterials.length}} Equipment\r
\r
            </p>\r
\r
            <div class="flex items-center gap-2">\r
\r
                <!-- Prev -->\r
                <button (click)="prevPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_left\r
                    </span>\r
\r
                </button>\r
\r
                <!-- Pages -->\r
                @for (p of [].constructor(totalPages()); track $index) {\r
\r
                <button (click)="goToPage($index + 1)"\r
                    [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
                    class="w-9 h-9 rounded-xl text-sm font-bold transition-all">\r
\r
                    {{ $index + 1 }}\r
\r
                </button>\r
\r
                }\r
\r
                <!-- Next -->\r
                <button (click)="nextPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_right\r
                    </span>\r
\r
                </button>\r
\r
            </div>\r
\r
        </div>\r
\r
    </div>\r
</section>\r
\r
<!-- Modals -->\r
<!-- Add Material Modal -->\r
<app-common-dialog\r
    [open]="showAddModal"\r
    title="New Equipment"\r
    icon="construction"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Add Equipment"\r
    (closed)="showAddModal = false"\r
    (primary)="addMaterial()"\r
>\r
    <div class="p-8">\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Equipment\r
                    Name</label>\r
                <input [(ngModel)]="newMaterial.name" type="text" placeholder="e.g. Portland Cement Grade-C"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>\r
                <input [(ngModel)]="newMaterial.sku" type="text" placeholder="SKU-XXX-X"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
                <select [(ngModel)]="newMaterial.category" class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800\r
         text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
\r
                    <!-- Default Disabled Option -->\r
                    <option value="" disabled selected>\r
                        Select Category\r
                    </option>\r
\r
                    @for (category of categories; track $index) {\r
\r
                    <option [value]="category.category_name">\r
                        {{ category.category_name }}\r
                    </option>\r
\r
                    }\r
\r
                </select>\r
            </div>\r
\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Cost\r
                    Price</label>\r
                <input [(ngModel)]="newMaterial.cost" type="number" min="1" placeholder="0.00"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
        </div>\r
\r
    </div>\r
</app-common-dialog>\r
\r
<!-- Edit Material Modal -->\r
<app-common-dialog\r
    [open]="showEditModal && !!materialToEdit"\r
    title="Edit Equipment"\r
    icon="edit_square"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Save Changes"\r
    (closed)="showEditModal = false"\r
    (primary)="updateMaterial()"\r
>\r
    @if (materialToEdit) {\r
    <div class="p-8">\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Equipment\r
                    Name</label>\r
                <input [(ngModel)]="materialToEdit.name" type="text"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>\r
                <input [(ngModel)]="materialToEdit.sku" type="text" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-slate-50 dark:bg-slate-800/50 text-sm font-bold outline-none cursor-not-allowed">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
                <select [(ngModel)]="materialToEdit.category" class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800\r
         text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
\r
                    <!-- Default Disabled Option -->\r
                    <option value="" disabled selected>\r
                        Select Category\r
                    </option>\r
\r
                    @for (category of categories; track $index) {\r
\r
                    <option [value]="category.category_name">\r
                        {{ category.category_name }}\r
                    </option>\r
\r
                    }\r
\r
                </select>\r
            </div>\r
\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Cost\r
                    Price</label>\r
                <input [(ngModel)]="materialToEdit.cost" type="text"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
        </div>\r
\r
    </div>\r
    }\r
</app-common-dialog>\r
\r
<!-- Delete Confirmation Modal -->\r
<app-common-dialog\r
    [open]="showDeleteModal && !!materialToDelete"\r
    variant="danger"\r
    title="Delete Equipment?"\r
    subtitle="This action cannot be undone."\r
    icon="delete_forever"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Delete Item"\r
    (closed)="showDeleteModal = false"\r
    (primary)="confirmDelete()"\r
>\r
    @if (materialToDelete) {\r
    <div class="p-8 text-center">\r
        <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
                class="text-on-surface font-black">"{{ materialToDelete.name }}"</span>? This action cannot be undone.\r
        </p>\r
    </div>\r
    }\r
</app-common-dialog>\r
\r
<!-- Filters Dropdown Overlay -->\r
@if (showFilters) {\r
<div class="fixed inset-0 z-[90]" (click)="showFilters = false">\r
    <div class="absolute top-32 right-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 p-6 w-72 animate-in fade-in slide-in-from-top-4 duration-300"\r
        (click)="$event.stopPropagation()">\r
        <h4 class="text-xs font-black uppercase tracking-widest text-outline mb-4">Advanced Filters</h4>\r
        <div class="space-y-4">\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Sort Order</label>\r
                <select class="w-full p-2 bg-surface-container rounded-lg text-xs font-bold outline-none">\r
                    <option>Usage Rate (Highest)</option>\r
                    <option>Usage Rate (Lowest)</option>\r
                    <option>Stock Level (Asc)</option>\r
                    <option>Stock Level (Desc)</option>\r
                    <option>Newest Additions</option>\r
                </select>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Supplier Status</label>\r
                <div class="flex flex-wrap gap-2">\r
                    <button class="px-2 py-1 bg-primary text-white rounded text-[10px] font-bold">Active</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">Preferred</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">New</button>\r
                </div>\r
            </div>\r
        </div>\r
        <button (click)="showFilters = false"\r
            class="w-full mt-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">Apply\r
            Filters</button>\r
    </div>\r
</div>\r
}\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EquipmentMaster, { className: "EquipmentMaster", filePath: "app/modules/master/equipment-master/equipment-master.ts", lineNumber: 16 });
})();

// src/app/modules/master/skill-master/skill-master.ts
var _c03 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
function SkillMaster_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 19)(1, "td", 33)(2, "div", 34)(3, "div", 35);
    \u0275\u0275element(4, "div", 36);
    \u0275\u0275elementStart(5, "span", 37);
    \u0275\u0275text(6, " engineering ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 38)(8, "p", 39);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 22)(11, "span", 40);
    \u0275\u0275text(12, " Skill ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 41);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 42)(16, "div", 43)(17, "span", 44);
    \u0275\u0275element(18, "span", 45);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "td", 46)(21, "div", 47)(22, "button", 48);
    \u0275\u0275listener("click", function SkillMaster_For_35_Template_button_click_22_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(item_r2));
    });
    \u0275\u0275elementStart(23, "span", 24);
    \u0275\u0275text(24, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 49);
    \u0275\u0275listener("click", function SkillMaster_For_35_Template_button_click_25_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteSkill(item_r2));
    });
    \u0275\u0275elementStart(26, "span", 24);
    \u0275\u0275text(27, " delete ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", item_r2.skill_name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" #", item_r2.id, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
  }
}
function SkillMaster_ForEmpty_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 50)(2, "div", 51)(3, "div", 52)(4, "span", 53);
    \u0275\u0275text(5, " construction ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "p", 54);
    \u0275\u0275text(8, " No Skills Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 55);
    \u0275\u0275text(10, " Add new skills to get started ");
    \u0275\u0275elementEnd()()()()();
  }
}
function SkillMaster_For_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function SkillMaster_For_45_Template_button_click_0_listener() {
      const $index_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage($index_r5 + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function SkillMaster_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "p", 57);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 58);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, "? This action cannot be undone. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('"', ctx_r2.skillToDelete.skill_name, '"');
  }
}
var SkillMaster = class _SkillMaster {
  skillService = inject(SkillMasterServices);
  toast = inject(ToastrService);
  skills = [];
  paginatedSkills = [];
  page = 1;
  pageSize = 5;
  showAddModal = false;
  showDeleteModal = false;
  skillToDelete = null;
  isEditMode = false;
  selectedSkillId = null;
  newSkill = {
    company_id: 1,
    skill_name: "",
    status: "ACTIVE"
  };
  selectedTab = "All Materials";
  searchQuery;
  ngOnInit() {
    this.getSkills();
  }
  getSkills() {
    this.skillService.loadSkills().subscribe({
      next: () => {
        this.skillService.skills$.subscribe((res) => {
          this.skills = res;
          this.updatePagination();
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to load skills");
      }
    });
  }
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedSkills = this.filteredSkills.slice(start, end);
  }
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  goToPage(p) {
    this.page = p;
    this.updatePagination();
  }
  totalPages() {
    return Math.ceil(this.skills.length / this.pageSize);
  }
  get endItem() {
    return Math.min(this.page * this.pageSize, this.skills.length);
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  get filteredSkills() {
    let filtered = [...this.skills];
    if (this.selectedTab !== "All Materials") {
      filtered = filtered.filter((m) => (m.category || "").trim().toLowerCase() === this.selectedTab.trim().toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((material) => material.name?.toLowerCase().includes(q) || material.sku?.toLowerCase().includes(q));
    }
    return filtered;
  }
  openAddModal() {
    this.isEditMode = false;
    this.selectedSkillId = null;
    this.newSkill = {
      company_id: 1,
      skill_name: "",
      status: "ACTIVE"
    };
    this.showAddModal = true;
  }
  closeModal() {
    this.showAddModal = false;
  }
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.skillToDelete = null;
  }
  addSkill() {
    this.skillService.addSkill(this.newSkill).subscribe({
      next: () => {
        this.toast.success("Skill added successfully");
        this.closeModal();
        this.getSkills();
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err?.error?.message || "Failed to add skill");
      }
    });
  }
  openEditModal(skill) {
    this.isEditMode = true;
    this.selectedSkillId = skill.id;
    this.newSkill = {
      company_id: skill.company_id,
      skill_name: skill.skill_name,
      status: skill.status
    };
    this.showAddModal = true;
  }
  updateSkill() {
    if (!this.selectedSkillId)
      return;
    this.skillService.updateSkill(this.selectedSkillId, this.newSkill).subscribe({
      next: () => {
        this.toast.success("Skill updated successfully");
        this.closeModal();
        this.getSkills();
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err?.error?.message || "Failed to update skill");
      }
    });
  }
  deleteSkill(skill) {
    this.skillToDelete = skill;
    this.showDeleteModal = true;
  }
  confirmDelete() {
    if (!this.skillToDelete?.id)
      return;
    this.skillService.deleteSkill(this.skillToDelete.id).subscribe({
      next: () => {
        this.toast.success("Skill deleted successfully");
        this.showDeleteModal = false;
        this.skillToDelete = null;
        this.getSkills();
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err?.error?.message || "Failed to delete skill");
      }
    });
  }
  static \u0275fac = function SkillMaster_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkillMaster)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SkillMaster, selectors: [["app-skill-master"]], standalone: false, decls: 57, vars: 17, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "bg-white", "rounded-[28px]", "border", "border-slate-200", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search skills...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "px-4", "py-4"], [1, "w-full", "min-w-[1000px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "px-6", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[9]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl", "cursor-pointer"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "class"], ["icon", "construction", "cancelLabel", "Cancel", 3, "closed", "primary", "open", "title", "subtitle", "showCloseButton", "showFooter", "primaryLabel"], [1, "p-7"], [1, "mb-5"], [1, "text-sm", "font-black", "block", "mb-2", "text-slate-700"], ["type", "text", "placeholder", "Enter skill name", 1, "w-full", "border", "border-slate-200", "rounded-2xl", "px-4", "py-3.5", "outline-none", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all", 3, "ngModelChange", "ngModel"], ["variant", "danger", "title", "Delete Skill?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[26px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "space-y-1"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-center"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-2xl", "text-[11px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", 3, "ngClass"], [1, "px-6", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-center", "gap-3"], [1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], ["colspan", "3", 1, "py-24", "text-center"], [1, "flex", "flex-col", "items-center", "gap-4"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "click"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"]], template: function SkillMaster_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, " Skill & Services Master ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275listener("click", function SkillMaster_Template_button_click_5_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275element(6, "div", 4);
      \u0275\u0275elementStart(7, "div", 5)(8, "span", 6);
      \u0275\u0275text(9, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275text(10, " Add Skill & Services ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 7)(12, "div", 8)(13, "div")(14, "h3", 9);
      \u0275\u0275text(15, " Skill & Services Master ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p", 10);
      \u0275\u0275text(17, " Manage and monitor all skill stock ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 11)(19, "div", 12)(20, "span", 13);
      \u0275\u0275text(21, " search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function SkillMaster_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function SkillMaster_Template_input_ngModelChange_22_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(23, "div", 15)(24, "table", 16)(25, "thead")(26, "tr")(27, "th", 17);
      \u0275\u0275text(28, " Skill & Services ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th", 18);
      \u0275\u0275text(30, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th", 18);
      \u0275\u0275text(32, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "tbody");
      \u0275\u0275repeaterCreate(34, SkillMaster_For_35_Template, 28, 5, "tr", 19, _forTrack03, false, SkillMaster_ForEmpty_36_Template, 11, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 20)(38, "p", 21);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 22)(41, "button", 23);
      \u0275\u0275listener("click", function SkillMaster_Template_button_click_41_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(42, "span", 24);
      \u0275\u0275text(43, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(44, SkillMaster_For_45_Template, 2, 3, "button", 25, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(46, "button", 23);
      \u0275\u0275listener("click", function SkillMaster_Template_button_click_46_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(47, "span", 24);
      \u0275\u0275text(48, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(49, "app-common-dialog", 26);
      \u0275\u0275listener("closed", function SkillMaster_Template_app_common_dialog_closed_49_listener() {
        return ctx.closeModal();
      })("primary", function SkillMaster_Template_app_common_dialog_primary_49_listener() {
        return ctx.isEditMode ? ctx.updateSkill() : ctx.addSkill();
      });
      \u0275\u0275elementStart(50, "div", 27)(51, "div", 28)(52, "label", 29);
      \u0275\u0275text(53, " Skill & Services Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "input", 30);
      \u0275\u0275twoWayListener("ngModelChange", function SkillMaster_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newSkill.skill_name, $event) || (ctx.newSkill.skill_name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(55, "app-common-dialog", 31);
      \u0275\u0275listener("closed", function SkillMaster_Template_app_common_dialog_closed_55_listener() {
        return ctx.closeDeleteModal();
      })("primary", function SkillMaster_Template_app_common_dialog_primary_55_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(56, SkillMaster_Conditional_56_Template, 6, 1, "div", 32);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.paginatedSkills);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate3(" Showing ", (ctx.page - 1) * ctx.pageSize + 1, " to ", ctx.endItem, " of ", ctx.skills.length, " Skills ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(16, _c03).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("title", ctx.isEditMode ? "Edit Skill & Services" : "Add Skill & Services")("subtitle", ctx.isEditMode ? "Update existing skill details" : "Create a new skill & services record")("showCloseButton", true)("showFooter", true)("primaryLabel", ctx.isEditMode ? "Update" : "Save");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newSkill.skill_name);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.skillToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.skillToDelete ? 56 : -1);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel, CommonDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkillMaster, [{
    type: Component,
    args: [{ selector: "app-skill-master", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
\r
  <div class="flex items-center justify-between mb-6">\r
\r
    <div>\r
      <h2 class="text-3xl font-black text-slate-800 dark:text-white">\r
        Skill & Services Master\r
      </h2>\r
\r
    </div>\r
\r
    <!-- Actions -->\r
\r
\r
\r
    <button (click)="openAddModal()"\r
      class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r
      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
      </div>\r
\r
      <div\r
        class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">\r
\r
        <span class="material-symbols-outlined text-[20px]">\r
          add\r
        </span>\r
\r
      </div>\r
\r
      Add Skill & Services\r
\r
    </button>\r
\r
  </div>\r
\r
\r
\r
  <div class="bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm">\r
    <div\r
      class="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/50">\r
\r
      <div>\r
        <h3 class="text-lg font-black tracking-tight text-slate-800 dark:text-white">\r
          Skill & Services Master\r
        </h3>\r
\r
        <p class="text-xs text-slate-500 font-medium mt-1">\r
          Manage and monitor all skill stock\r
        </p>\r
      </div>\r
      <!-- Actions -->\r
      <div class="flex items-center gap-3">\r
\r
        <!-- Search -->\r
        <div\r
          class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">\r
\r
          <span class="material-symbols-outlined text-slate-400 text-[20px]">\r
            search\r
          </span>\r
\r
          <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()" placeholder="Search skills..."\r
            class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
\r
        </div>\r
\r
      </div>\r
\r
\r
\r
    </div>\r
    <div class="overflow-x-auto px-4 py-4">\r
\r
      <table class="w-full min-w-[1000px] border-separate border-spacing-y-4">\r
\r
        <thead>\r
\r
          <tr>\r
\r
            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
              Skill & Services\r
            </th>\r
\r
            <th class="px-6 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
              Status\r
            </th>\r
\r
            <th class="px-6 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
              Actions\r
            </th>\r
\r
          </tr>\r
\r
        </thead>\r
\r
        <tbody>\r
\r
          @for (item of paginatedSkills; track item.id) {\r
\r
          <tr\r
            class="group relative z-0 hover:z-[9] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl cursor-pointer">\r
\r
            <td\r
              class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center gap-4">\r
\r
                <div\r
                  class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
\r
                  <div\r
                    class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity">\r
                  </div>\r
\r
                  <span\r
                    class="material-symbols-outlined text-primary text-[26px] relative z-10 group-hover:scale-110 transition-transform">\r
                    engineering\r
                  </span>\r
\r
                </div>\r
\r
                <div class="space-y-1">\r
\r
                  <p\r
                    class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                    {{ item.skill_name }}\r
\r
                  </p>\r
\r
                  <div class="flex items-center gap-2">\r
\r
                    <span\r
                      class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
                      Skill ID\r
                    </span>\r
\r
                    <span class="text-xs text-slate-400 font-semibold">\r
                      #{{ item.id }}\r
                    </span>\r
\r
                  </div>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
            <td class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-center justify-center">\r
\r
                <span\r
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wide"\r
                  [ngClass]="item.status === 'ACTIVE'\r
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'\r
                            : 'bg-red-50 text-red-700 border border-red-200'">\r
\r
                  <span class="w-2.5 h-2.5 rounded-full" [ngClass]="item.status === 'ACTIVE'\r
                                ? 'bg-emerald-500'\r
                                : 'bg-red-500'">\r
                  </span>\r
\r
                  {{ item.status }}\r
\r
                </span>\r
\r
              </div>\r
\r
            </td>\r
\r
            <td\r
              class="px-6 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center justify-center gap-3">\r
\r
                <button (click)="openEditModal(item)"\r
                  class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                  <span class="material-symbols-outlined text-[18px]">\r
                    edit\r
                  </span>\r
\r
                </button>\r
\r
                <button (click)="deleteSkill(item)"\r
                  class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                  <span class="material-symbols-outlined text-[18px]">\r
                    delete\r
                  </span>\r
\r
                </button>\r
\r
              </div>\r
\r
            </td>\r
\r
          </tr>\r
\r
          } @empty {\r
\r
          <tr>\r
\r
            <td colspan="3" class="py-24 text-center">\r
\r
              <div class="flex flex-col items-center gap-4">\r
\r
                <div\r
                  class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">\r
\r
                  <span class="material-symbols-outlined text-5xl text-slate-400">\r
                    construction\r
                  </span>\r
\r
                </div>\r
\r
                <div>\r
\r
                  <p class="text-xl font-black text-slate-700 dark:text-slate-200">\r
                    No Skills Found\r
                  </p>\r
\r
                  <p class="text-sm text-slate-400 mt-1">\r
                    Add new skills to get started\r
                  </p>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
          </tr>\r
\r
          }\r
\r
        </tbody>\r
\r
      </table>\r
\r
    </div>\r
\r
    <div\r
      class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-4">\r
\r
      <p class="text-xs font-bold uppercase tracking-wider text-slate-500">\r
\r
        Showing {{ (page - 1) * pageSize + 1 }}\r
        to {{ endItem }}\r
        of {{ skills.length }} Skills\r
\r
      </p>\r
\r
      <div class="flex items-center gap-2">\r
\r
        <!-- Prev -->\r
        <button (click)="prevPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
          <span class="material-symbols-outlined text-[18px]">\r
            chevron_left\r
          </span>\r
\r
        </button>\r
\r
        <!-- Pages -->\r
        @for (p of [].constructor(totalPages()); track $index) {\r
\r
        <button (click)="goToPage($index + 1)"\r
          [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
          class="w-9 h-9 rounded-xl text-sm font-bold transition-all">\r
\r
          {{ $index + 1 }}\r
\r
        </button>\r
\r
        }\r
\r
        <!-- Next -->\r
        <button (click)="nextPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
          <span class="material-symbols-outlined text-[18px]">\r
            chevron_right\r
          </span>\r
\r
        </button>\r
\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
</section>\r
\r
<app-common-dialog\r
  [open]="showAddModal"\r
  [title]="isEditMode ? 'Edit Skill & Services' : 'Add Skill & Services'"\r
  [subtitle]="isEditMode ? 'Update existing skill details' : 'Create a new skill & services record'"\r
  icon="construction"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Cancel"\r
  [primaryLabel]="isEditMode ? 'Update' : 'Save'"\r
  (closed)="closeModal()"\r
  (primary)="isEditMode ? updateSkill() : addSkill()"\r
>\r
  <div class="p-7">\r
\r
    <div class="mb-5">\r
\r
      <label class="text-sm font-black block mb-2 text-slate-700">\r
        Skill & Services Name\r
      </label>\r
\r
      <input type="text" [(ngModel)]="newSkill.skill_name" placeholder="Enter skill name"\r
        class="w-full border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">\r
\r
    </div>\r
\r
  </div>\r
</app-common-dialog>\r
\r
<!-- Delete Confirmation Modal -->\r
<app-common-dialog\r
  [open]="showDeleteModal && !!skillToDelete"\r
  variant="danger"\r
  title="Delete Skill?"\r
  subtitle="This action cannot be undone."\r
  icon="delete_forever"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Cancel"\r
  primaryLabel="Delete Item"\r
  (closed)="closeDeleteModal()"\r
  (primary)="confirmDelete()"\r
>\r
  @if (skillToDelete) {\r
  <div class="p-8 text-center">\r
    <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
        class="text-on-surface font-black">"{{ skillToDelete.skill_name }}"</span>? This action cannot be undone.\r
    </p>\r
  </div>\r
  }\r
</app-common-dialog>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SkillMaster, { className: "SkillMaster", filePath: "app/modules/master/skill-master/skill-master.ts", lineNumber: 11 });
})();

// src/app/modules/master/category/category.ts
var _c04 = () => [];
var _forTrack04 = ($index, $item) => $item.id;
function Category_For_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 39)(2, "div", 40)(3, "div", 41);
    \u0275\u0275element(4, "div", 42);
    \u0275\u0275elementStart(5, "span", 43);
    \u0275\u0275text(6, " category ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 44)(8, "p", 45);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 23)(11, "span", 46);
    \u0275\u0275text(12, " Cat. ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 47);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 48)(16, "div", 49)(17, "span", 50)(18, "span", 51);
    \u0275\u0275text(19, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "td", 48)(22, "div", 49)(23, "span", 52);
    \u0275\u0275element(24, "span", 53);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "td", 54)(27, "div", 55)(28, "button", 56);
    \u0275\u0275listener("click", function Category_For_39_Template_button_click_28_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(item_r2));
    });
    \u0275\u0275elementStart(29, "span", 25);
    \u0275\u0275text(30, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "button", 57);
    \u0275\u0275listener("click", function Category_For_39_Template_button_click_31_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(item_r2));
    });
    \u0275\u0275elementStart(32, "span", 25);
    \u0275\u0275text(33, " delete ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", item_r2.category_name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" #", item_r2.id, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", item_r2.category_type, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
  }
}
function Category_ForEmpty_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 58)(2, "div", 59)(3, "div", 60)(4, "span", 61);
    \u0275\u0275text(5, " category ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "p", 62);
    \u0275\u0275text(8, " No Categories Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 63);
    \u0275\u0275text(10, " Add new categories to get started ");
    \u0275\u0275elementEnd()()()()();
  }
}
function Category_For_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function Category_For_49_Template_button_click_0_listener() {
      const $index_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage($index_r5 + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function Category_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "p", 65);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, "? This action cannot be undone. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('"', ctx_r2.categoryToDelete.category_name, '"');
  }
}
var Category = class _Category {
  categoryService = inject(CategoryServeice);
  toast = inject(ToastrService);
  categories = [];
  paginatedCategories = [];
  page = 1;
  pageSize = 5;
  showAddModal = false;
  showDeleteModal = false;
  categoryToDelete = null;
  isEditMode = false;
  selectedSkillId = null;
  newCategory = {
    company_id: 1,
    category_name: "",
    category_type: "",
    status: "ACTIVE"
  };
  selectedTab = "All Materials";
  searchQuery;
  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.loadCategories().subscribe({
      next: () => {
        this.categoryService.categories$.subscribe((res) => {
          this.categories = res;
          this.updatePagination();
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to load skills");
      }
    });
  }
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCategories = this.filteredCategories.slice(start, end);
  }
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  goToPage(p) {
    this.page = p;
    this.updatePagination();
  }
  totalPages() {
    return Math.ceil(this.categories.length / this.pageSize);
  }
  get endItem() {
    return Math.min(this.page * this.pageSize, this.categories.length);
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  get filteredCategories() {
    let filtered = [...this.categories];
    if (this.selectedTab !== "All Materials") {
      filtered = filtered.filter((c) => (c.category_name || "").trim().toLowerCase() === this.selectedTab.trim().toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((category) => category.category_name?.toLowerCase().includes(q) || category.category_type?.toLowerCase().includes(q));
    }
    return filtered;
  }
  openAddModal() {
    this.isEditMode = false;
    this.selectedSkillId = null;
    this.newCategory = {
      company_id: 1,
      category_name: "",
      category_type: "",
      status: "ACTIVE"
    };
    this.showAddModal = true;
  }
  closeModal() {
    this.showAddModal = false;
  }
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.categoryToDelete = null;
  }
  addCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe({
      next: () => {
        this.toast.success("Category added successfully");
        this.closeModal();
        this.getCategories();
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err?.error?.message || "Failed to add category");
      }
    });
  }
  openEditModal(category) {
    this.isEditMode = true;
    this.selectedSkillId = category.id;
    this.newCategory = {
      company_id: category.company_id,
      category_name: category.category_name,
      category_type: category.category_type,
      status: category.status
    };
    this.showAddModal = true;
  }
  updateCategory() {
    if (!this.selectedSkillId)
      return;
    this.categoryService.updateCategory(this.selectedSkillId, this.newCategory).subscribe({
      next: () => {
        this.toast.success("Category updated successfully");
        this.closeModal();
        this.getCategories();
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err?.error?.message || "Failed to update category");
      }
    });
  }
  deleteCategory(category) {
    this.categoryToDelete = category;
    this.showDeleteModal = true;
  }
  confirmDelete() {
    if (!this.categoryToDelete?.id)
      return;
    this.categoryService.deleteCategory(this.categoryToDelete.id).subscribe({
      next: () => {
        this.toast.success("Category deleted successfully");
        this.showDeleteModal = false;
        this.categoryToDelete = null;
        this.getCategories();
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err?.error?.message || "Failed to delete category");
      }
    });
  }
  static \u0275fac = function Category_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Category)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Category, selectors: [["app-category"]], standalone: false, decls: 71, vars: 18, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white", "tracking-tight"], [1, "text-sm", "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "relative", "z-10"], [1, "bg-white", "dark:bg-slate-900", "rounded-[28px]", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "flex-col", "lg:flex-row", "items-start", "lg:items-center", "justify-between", "gap-4", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search categories...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "px-4", "py-4"], [1, "w-full", "min-w-[1000px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "px-6", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "class"], ["icon", "category", "cancelLabel", "Cancel", 3, "closed", "primary", "open", "title", "subtitle", "showCloseButton", "showFooter", "primaryLabel"], [1, "p-7"], [1, "mb-5"], [1, "text-sm", "font-black", "block", "mb-2", "text-slate-700", "dark:text-slate-200"], ["type", "text", "placeholder", "Enter category name", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all", 3, "ngModelChange", "ngModel"], [1, "mb-6"], [1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all", "appearance-none", "cursor-pointer", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], ["value", "Material"], ["value", "Equipment"], ["variant", "danger", "title", "Delete Category?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[26px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "space-y-1"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-left"], [1, "inline-flex", "items-left", "gap-2", "px-4", "py-2", "rounded-xl", "bg-slate-100", "dark:bg-slate-800", "text-sm", "font-bold", "text-slate-700", "dark:text-slate-200"], [1, "material-symbols-outlined", "text-[18px]", "text-primary"], [1, "inline-flex", "items-left", "gap-2", "px-4", "py-2", "rounded-2xl", "text-[11px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", 3, "ngClass"], [1, "px-6", "py-5", "rounded-r-[28px]", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-center", "gap-3"], [1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], ["colspan", "4", 1, "py-24", "text-center"], [1, "flex", "flex-col", "items-center", "gap-4"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "click"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"]], template: function Category_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, " Category Master ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Manage all categories easily ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function Category_Template_button_click_7_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275element(8, "div", 5);
      \u0275\u0275elementStart(9, "div", 6)(10, "span", 7);
      \u0275\u0275text(11, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "span", 8);
      \u0275\u0275text(13, " Add New ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 9)(15, "div", 10)(16, "div")(17, "h3", 11);
      \u0275\u0275text(18, " Category List ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p", 12);
      \u0275\u0275text(20, " Search and manage categories ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 13)(22, "span", 14);
      \u0275\u0275text(23, " search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function Category_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Category_Template_input_ngModelChange_24_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "div", 16)(26, "table", 17)(27, "thead")(28, "tr")(29, "th", 18);
      \u0275\u0275text(30, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th", 18);
      \u0275\u0275text(32, " Category Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th", 18);
      \u0275\u0275text(34, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "th", 19);
      \u0275\u0275text(36, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "tbody");
      \u0275\u0275repeaterCreate(38, Category_For_39_Template, 34, 6, "tr", 20, _forTrack04, false, Category_ForEmpty_40_Template, 11, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 21)(42, "p", 22);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 23)(45, "button", 24);
      \u0275\u0275listener("click", function Category_Template_button_click_45_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(46, "span", 25);
      \u0275\u0275text(47, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(48, Category_For_49_Template, 2, 3, "button", 26, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(50, "button", 24);
      \u0275\u0275listener("click", function Category_Template_button_click_50_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(51, "span", 25);
      \u0275\u0275text(52, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(53, "app-common-dialog", 27);
      \u0275\u0275listener("closed", function Category_Template_app_common_dialog_closed_53_listener() {
        return ctx.closeModal();
      })("primary", function Category_Template_app_common_dialog_primary_53_listener() {
        return ctx.isEditMode ? ctx.updateCategory() : ctx.addCategory();
      });
      \u0275\u0275elementStart(54, "div", 28)(55, "div", 29)(56, "label", 30);
      \u0275\u0275text(57, " Category Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "input", 31);
      \u0275\u0275twoWayListener("ngModelChange", function Category_Template_input_ngModelChange_58_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newCategory.category_name, $event) || (ctx.newCategory.category_name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "div", 32)(60, "label", 30);
      \u0275\u0275text(61, " Category Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "select", 33);
      \u0275\u0275twoWayListener("ngModelChange", function Category_Template_select_ngModelChange_62_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newCategory.category_type, $event) || (ctx.newCategory.category_type = $event);
        return $event;
      });
      \u0275\u0275elementStart(63, "option", 34);
      \u0275\u0275text(64, " Select category type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "option", 35);
      \u0275\u0275text(66, " Material ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "option", 36);
      \u0275\u0275text(68, " Equipment ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(69, "app-common-dialog", 37);
      \u0275\u0275listener("closed", function Category_Template_app_common_dialog_closed_69_listener() {
        return ctx.closeDeleteModal();
      })("primary", function Category_Template_app_common_dialog_primary_69_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(70, Category_Conditional_70_Template, 6, 1, "div", 38);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(24);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.paginatedCategories);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate3(" Showing ", (ctx.page - 1) * ctx.pageSize + 1, " to ", ctx.endItem, " of ", ctx.categories.length, " Categories ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(17, _c04).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("title", ctx.isEditMode ? "Edit Category" : "Add Category")("subtitle", ctx.isEditMode ? "Update existing category details" : "Create a new category record")("showCloseButton", true)("showFooter", true)("primaryLabel", ctx.isEditMode ? "Update" : "Save");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newCategory.category_name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newCategory.category_type);
      \u0275\u0275advance(7);
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.categoryToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.categoryToDelete ? 70 : -1);
    }
  }, dependencies: [NgClass, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, CommonDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Category, [{
    type: Component,
    args: [{ selector: "app-category", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
\r
  <!-- Top Header -->\r
  <div class="flex items-center justify-between mb-2">\r
\r
    <div>\r
\r
      <h2 class="text-3xl font-black text-slate-800 dark:text-white tracking-tight">\r
        Category Master\r
      </h2>\r
\r
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">\r
        Manage all categories easily\r
      </p>\r
\r
    </div>\r
\r
    <!-- Add Button -->\r
    <button (click)="openAddModal()"\r
      class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r
\r
      <div\r
        class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
      </div>\r
\r
      <div\r
        class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">\r
\r
        <span class="material-symbols-outlined text-[20px]">\r
          add\r
        </span>\r
\r
      </div>\r
\r
      <span class="relative z-10">\r
        Add New\r
      </span>\r
\r
    </button>\r
\r
  </div>\r
\r
  <!-- Main Card -->\r
  <div\r
    class="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">\r
\r
    <!-- Card Header -->\r
    <div\r
      class="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/50">\r
\r
      <div>\r
\r
        <h3 class="text-lg font-black tracking-tight text-slate-800 dark:text-white">\r
          Category List\r
        </h3>\r
\r
        <p class="text-xs text-slate-500 font-medium mt-1">\r
          Search and manage categories\r
        </p>\r
\r
      </div>\r
\r
      <!-- Search -->\r
      <div\r
        class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">\r
\r
        <span class="material-symbols-outlined text-slate-400 text-[20px]">\r
          search\r
        </span>\r
\r
        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
          placeholder="Search categories..."\r
          class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
\r
      </div>\r
\r
    </div>\r
\r
    <!-- Table -->\r
    <div class="overflow-x-auto px-4 py-4">\r
\r
      <table class="w-full min-w-[1000px] border-separate border-spacing-y-4">\r
\r
        <!-- Head -->\r
        <thead>\r
\r
          <tr>\r
\r
            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
              Category\r
            </th>\r
\r
            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
              Category Type\r
            </th>\r
\r
            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
              Status\r
            </th>\r
\r
            <th class="px-6 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
              Actions\r
            </th>\r
\r
          </tr>\r
\r
        </thead>\r
\r
        <!-- Body -->\r
        <tbody>\r
\r
          @for (item of paginatedCategories; track item.id) {\r
\r
          <tr\r
            class="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
            <!-- Category -->\r
            <td\r
              class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center gap-4">\r
\r
                <!-- Icon -->\r
                <div\r
                  class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
\r
                  <div\r
                    class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity">\r
                  </div>\r
\r
                  <span\r
                    class="material-symbols-outlined text-primary text-[26px] relative z-10 group-hover:scale-110 transition-transform">\r
\r
                    category\r
\r
                  </span>\r
\r
                </div>\r
\r
                <!-- Content -->\r
                <div class="space-y-1">\r
\r
                  <p\r
                    class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                    {{ item.category_name }}\r
\r
                  </p>\r
\r
                  <div class="flex items-center gap-2">\r
\r
                    <span\r
                      class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
\r
                      Cat. ID\r
\r
                    </span>\r
\r
                    <span class="text-xs text-slate-400 font-semibold">\r
                      #{{ item.id }}\r
                    </span>\r
\r
                  </div>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Category Type -->\r
            <td\r
              class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-left">\r
\r
                <span\r
                  class="inline-flex items-left gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200">\r
\r
                  <span class="material-symbols-outlined text-[18px] text-primary">\r
                    inventory_2\r
                  </span>\r
\r
                  {{ item.category_type }}\r
\r
                </span>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Status -->\r
            <td\r
              class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-left">\r
\r
                <span\r
                  class="inline-flex items-left gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wide"\r
                  [ngClass]="item.status === 'ACTIVE'\r
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'\r
                    : 'bg-red-50 text-red-700 border border-red-200'">\r
\r
                  <span class="w-2.5 h-2.5 rounded-full" [ngClass]="item.status === 'ACTIVE'\r
                      ? 'bg-emerald-500'\r
                      : 'bg-red-500'">\r
                  </span>\r
\r
                  {{ item.status }}\r
\r
                </span>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Actions -->\r
            <td\r
              class="px-6 py-5 rounded-r-[28px] border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center justify-center gap-3">\r
\r
                <!-- Edit -->\r
                <button (click)="openEditModal(item)"\r
                  class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                  <span class="material-symbols-outlined text-[18px]">\r
                    edit\r
                  </span>\r
\r
                </button>\r
\r
                <!-- Delete -->\r
                <button (click)="deleteCategory(item)"\r
                  class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                  <span class="material-symbols-outlined text-[18px]">\r
                    delete\r
                  </span>\r
\r
                </button>\r
\r
              </div>\r
\r
            </td>\r
\r
          </tr>\r
\r
          } @empty {\r
\r
          <!-- Empty State -->\r
          <tr>\r
\r
            <td colspan="4" class="py-24 text-center">\r
\r
              <div class="flex flex-col items-center gap-4">\r
\r
                <div\r
                  class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">\r
\r
                  <span class="material-symbols-outlined text-5xl text-slate-400">\r
                    category\r
                  </span>\r
\r
                </div>\r
\r
                <div>\r
\r
                  <p class="text-xl font-black text-slate-700 dark:text-slate-200">\r
                    No Categories Found\r
                  </p>\r
\r
                  <p class="text-sm text-slate-400 mt-1">\r
                    Add new categories to get started\r
                  </p>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
          </tr>\r
\r
          }\r
\r
        </tbody>\r
\r
      </table>\r
\r
    </div>\r
\r
    <!-- Footer -->\r
    <div\r
      class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-4">\r
\r
      <!-- Info -->\r
      <p class="text-xs font-bold uppercase tracking-wider text-slate-500">\r
\r
        Showing {{ (page - 1) * pageSize + 1 }}\r
        to {{ endItem }}\r
        of {{ categories.length }} Categories\r
\r
      </p>\r
\r
      <!-- Pagination -->\r
      <div class="flex items-center gap-2">\r
\r
        <!-- Prev -->\r
        <button (click)="prevPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
          <span class="material-symbols-outlined text-[18px]">\r
            chevron_left\r
          </span>\r
\r
        </button>\r
\r
        <!-- Pages -->\r
        @for (p of [].constructor(totalPages()); track $index) {\r
\r
        <button (click)="goToPage($index + 1)"\r
          [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
          class="w-9 h-9 rounded-xl text-sm font-bold transition-all">\r
\r
          {{ $index + 1 }}\r
\r
        </button>\r
\r
        }\r
\r
        <!-- Next -->\r
        <button (click)="nextPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">\r
\r
          <span class="material-symbols-outlined text-[18px]">\r
            chevron_right\r
          </span>\r
\r
        </button>\r
\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
</section>\r
\r
<app-common-dialog\r
  [open]="showAddModal"\r
  [title]="isEditMode ? 'Edit Category' : 'Add Category'"\r
  [subtitle]="isEditMode ? 'Update existing category details' : 'Create a new category record'"\r
  icon="category"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Cancel"\r
  [primaryLabel]="isEditMode ? 'Update' : 'Save'"\r
  (closed)="closeModal()"\r
  (primary)="isEditMode ? updateCategory() : addCategory()"\r
>\r
  <div class="p-7">\r
\r
    <!-- Category Name -->\r
    <div class="mb-5">\r
\r
      <label class="text-sm font-black block mb-2 text-slate-700 dark:text-slate-200">\r
        Category Name\r
      </label>\r
\r
      <input type="text" [(ngModel)]="newCategory.category_name" placeholder="Enter category name"\r
        class="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none bg-white dark:bg-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">\r
\r
    </div>\r
\r
    <!-- Category Type -->\r
    <div class="mb-6">\r
\r
      <label class="text-sm font-black block mb-2 text-slate-700 dark:text-slate-200">\r
        Category Type\r
      </label>\r
\r
      <select [(ngModel)]="newCategory.category_type"\r
        class="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none bg-white dark:bg-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer">\r
\r
        <option value="" disabled selected>\r
          Select category type\r
        </option>\r
\r
        <option value="Material">\r
          Material\r
        </option>\r
\r
        <option value="Equipment">\r
          Equipment\r
        </option>\r
\r
      </select>\r
\r
    </div>\r
\r
  </div>\r
</app-common-dialog>\r
\r
<!-- Delete Confirmation Modal -->\r
<app-common-dialog\r
  [open]="showDeleteModal && !!categoryToDelete"\r
  variant="danger"\r
  title="Delete Category?"\r
  subtitle="This action cannot be undone."\r
  icon="delete_forever"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Cancel"\r
  primaryLabel="Delete Item"\r
  (closed)="closeDeleteModal()"\r
  (primary)="confirmDelete()"\r
>\r
  @if (categoryToDelete) {\r
  <div class="p-8 text-center">\r
    <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
        class="text-on-surface font-black">"{{ categoryToDelete.category_name }}"</span>? This action cannot be undone.\r
    </p>\r
  </div>\r
  }\r
</app-common-dialog>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Category, { className: "Category", filePath: "app/modules/master/category/category.ts", lineNumber: 10 });
})();

// src/app/modules/master/master-routing-module.ts
var routes = [
  {
    path: "material",
    component: MaterialMaster
  },
  {
    path: "equipment",
    component: EquipmentMaster
  },
  {
    path: "skill",
    component: SkillMaster
  },
  {
    path: "category",
    component: Category
  }
];
var MasterRoutingModule = class _MasterRoutingModule {
  static \u0275fac = function MasterRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MasterRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _MasterRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasterRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/master/master-module.ts
var MasterModule = class _MasterModule {
  static \u0275fac = function MasterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MasterModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _MasterModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, MasterRoutingModule, FormsModule, CommonDialogComponent] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasterModule, [{
    type: NgModule,
    args: [{
      declarations: [MaterialMaster, EquipmentMaster, SkillMaster, Category],
      imports: [CommonModule, MasterRoutingModule, FormsModule, CommonDialogComponent]
    }]
  }], null, null);
})();
export {
  MasterModule
};
//# sourceMappingURL=chunk-D4YCI3DL.js.map
