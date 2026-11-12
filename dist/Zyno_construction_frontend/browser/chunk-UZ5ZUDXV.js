import {
  CategoryServeice,
  Equipment,
  MaterialMasterService
} from "./chunk-GXADUZJV.js";
import {
  SkillMasterServices
} from "./chunk-TS7FOP4Y.js";
import {
  VendorsServices
} from "./chunk-LTJWUNDC.js";
import {
  CommonDialogComponent
} from "./chunk-VKQYMIUT.js";
import {
  ToastrService
} from "./chunk-QR7MRZIR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-YLIHD5YA.js";
import "./chunk-A27VMC3V.js";
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-23RKHPSU.js";

// src/app/modules/master/material-master/material-master.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.sku;
function MaterialMaster_For_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 25)(1, "td", 48)(2, "div", 49)(3, "div", 50);
    \u0275\u0275element(4, "div", 51);
    \u0275\u0275elementStart(5, "span", 52);
    \u0275\u0275text(6, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 53)(8, "p", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 55)(11, "span", 56);
    \u0275\u0275text(12, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 57);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 58)(16, "span", 59);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 58)(19, "div", 60)(20, "span", 61);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 62);
    \u0275\u0275text(24, " Per Unit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "td", 58)(26, "div", 63)(27, "div", 64)(28, "span", 65);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 66);
    \u0275\u0275text(31, " Available ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 67);
    \u0275\u0275element(33, "div", 68);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "td", 58)(35, "span", 69);
    \u0275\u0275element(36, "span", 70);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "td", 71)(39, "div", 72)(40, "button", 73);
    \u0275\u0275listener("click", function MaterialMaster_For_49_Template_button_click_40_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal($event, item_r2));
    });
    \u0275\u0275elementStart(41, "span", 74);
    \u0275\u0275text(42, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "button", 75);
    \u0275\u0275listener("click", function MaterialMaster_For_49_Template_button_click_43_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r2));
    });
    \u0275\u0275elementStart(44, "span", 74);
    \u0275\u0275text(45, " delete ");
    \u0275\u0275elementEnd()()()()();
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
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
  }
}
function MaterialMaster_For_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function MaterialMaster_For_58_Template_button_click_0_listener() {
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
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function MaterialMaster_Conditional_81_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_81_For_3_Template_button_click_0_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectCategory(category_r8.category_name));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.category === category_r8.category_name ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r8.category_name, " ");
  }
}
function MaterialMaster_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_81_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.categoryDropdownOpen = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 78);
    \u0275\u0275repeaterCreate(2, MaterialMaster_Conditional_81_For_3_Template, 2, 2, "button", 79, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.categories);
  }
}
function MaterialMaster_Conditional_87_Conditional_18_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_87_Conditional_18_For_3_Template_button_click_0_listener() {
      const category_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectEditCategory(category_r12.category_name));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.category === category_r12.category_name ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r12.category_name, " ");
  }
}
function MaterialMaster_Conditional_87_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_87_Conditional_18_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editCategoryDropdownOpen = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 78);
    \u0275\u0275repeaterCreate(2, MaterialMaster_Conditional_87_Conditional_18_For_3_Template, 2, 2, "button", 79, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.categories);
  }
}
function MaterialMaster_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "div", 35)(3, "label", 36);
    \u0275\u0275text(4, "Material Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Conditional_87_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.name, $event) || (ctx_r2.materialToEdit.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 36);
    \u0275\u0275text(8, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Conditional_87_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.sku, $event) || (ctx_r2.materialToEdit.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 39)(11, "label", 36);
    \u0275\u0275text(12, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 40);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_87_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editCategoryDropdownOpen = !ctx_r2.editCategoryDropdownOpen);
    });
    \u0275\u0275elementStart(14, "span", 41);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 42);
    \u0275\u0275text(17, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, MaterialMaster_Conditional_87_Conditional_18_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 35)(20, "label", 36);
    \u0275\u0275text(21, "Cost Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Conditional_87_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r9);
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
    \u0275\u0275property("ngClass", ctx_r2.editCategoryDropdownOpen ? "border-primary ring-2 ring-primary/30" : "border-outline-variant/20 dark:border-slate-800");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.category ? "text-slate-800 dark:text-white" : "text-slate-400 font-medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.materialToEdit.category || "Select Category", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.editCategoryDropdownOpen ? "rotate-180" : "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.editCategoryDropdownOpen ? 18 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.cost);
  }
}
function MaterialMaster_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "p", 83);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 84);
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
function MaterialMaster_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_90_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 86);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_90_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 87);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 88)(5, "div")(6, "label", 89);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 90)(9, "option");
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
    \u0275\u0275elementStart(19, "div")(20, "label", 89);
    \u0275\u0275text(21, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 91)(23, "button", 92);
    \u0275\u0275text(24, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 93);
    \u0275\u0275text(26, "Preferred");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 93);
    \u0275\u0275text(28, "New");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "button", 94);
    \u0275\u0275listener("click", function MaterialMaster_Conditional_90_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r13);
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
  categoryDropdownOpen = false;
  editCategoryDropdownOpen = false;
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
  selectCategory(name) {
    this.newMaterial.category = name;
    this.categoryDropdownOpen = false;
  }
  selectEditCategory(name) {
    this.materialToEdit.category = name;
    this.editCategoryDropdownOpen = false;
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaterialMaster, selectors: [["app-material-master"]], standalone: false, decls: 91, vars: 25, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "gap-3"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "cursor-pointer", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/60", "dark:border-slate-800", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search materials...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "w-full", "overflow-x-auto", "custom-scrollbar", "px-4", "py-4"], [1, "w-full", "table-fixed", "border-separate", "border-spacing-y-4"], [2, "width", "27%"], [2, "width", "13%"], [2, "width", "19%"], [2, "width", "14%"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "px-6", "text-right", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[99]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "class"], ["title", "New Material", "icon", "inventory_2", "cancelLabel", "Cancel", "primaryLabel", "Add Material", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "max-h-[65vh]", "overflow-y-auto", "scroll-smooth", "custom-scrollbar"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], ["type", "text", "placeholder", "e.g. Portland Cement Grade-C", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "relative"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-4", "py-3", "rounded-xl", "border", "text-sm", "font-bold", "outline-none", "transition-all", "duration-200", "bg-white", "dark:bg-slate-900", "cursor-pointer", 3, "click", "ngClass"], [3, "ngClass"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "transition-transform", "duration-200", 3, "ngClass"], ["type", "number", "min", "1", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["title", "Edit Material", "icon", "edit_square", "cancelLabel", "Cancel", "primaryLabel", "Save Changes", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], ["variant", "danger", "title", "Delete Material?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "fixed", "inset-0", "z-[90]"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm", "group-hover:shadow-xl", "transition-all", "duration-300"], [1, "flex", "items-center", "gap-4", "min-w-0"], [1, "shrink-0", "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity", "duration-300"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10", "group-hover:scale-110", "transition-transform", "duration-300"], [1, "space-y-1", "min-w-0"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors", "truncate"], [1, "flex", "items-center", "gap-2", "min-w-0"], [1, "shrink-0", "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold", "truncate"], [1, "px-3", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "max-w-full", "items-center", "px-3", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[10px]", "font-black", "uppercase", "tracking-wide", "truncate"], [1, "flex", "flex-col", "min-w-0"], [1, "text-base", "font-black", "text-slate-800", "dark:text-white", "truncate", "block"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-full", "flex", "flex-col", "gap-3", "min-w-0"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200", "truncate"], [1, "text-[11px]", "font-bold", "text-emerald-600", "shrink-0"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "inline-flex", "max-w-full", "items-center", "gap-2", "px-3", "py-2", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-wide", "truncate", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", 3, "ngClass"], [1, "px-3", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm", "group-hover:shadow-xl", "transition-all", "duration-300"], [1, "flex", "items-center", "justify-end", "gap-1.5", "transition-all", "duration-300"], ["title", "Edit Material", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[16px]"], ["title", "Delete Material", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "click"], [1, "fixed", "inset-0", "z-40", 3, "click"], [1, "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "dark:border-slate-800", "p-2", "max-h-56", "overflow-y-auto", "scroll-smooth", "custom-scrollbar", "animate-in", "fade-in", "slide-in-from-top-2", "duration-200"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-2.5", "rounded-xl", "text-sm", "font-bold", "transition-all", "duration-150", "cursor-pointer", 3, "ngClass"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-2.5", "rounded-xl", "text-sm", "font-bold", "transition-all", "duration-150", "cursor-pointer", 3, "click", "ngClass"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "ngModelChange", "ngModel"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "space-y-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], [1, "w-full", "p-2", "bg-surface-container", "rounded-lg", "text-xs", "font-bold", "outline-none"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "bg-primary", "text-white", "rounded", "text-[10px]", "font-bold"], [1, "px-2", "py-1", "bg-surface-container", "text-outline", "rounded", "text-[10px]", "font-bold"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"]], template: function MaterialMaster_Template(rf, ctx) {
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
      \u0275\u0275elementStart(24, "div", 17)(25, "table", 18)(26, "colgroup");
      \u0275\u0275element(27, "col", 19)(28, "col", 20)(29, "col", 20)(30, "col", 21)(31, "col", 22)(32, "col", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "thead")(34, "tr")(35, "th", 23);
      \u0275\u0275text(36, " Material ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "th", 23);
      \u0275\u0275text(38, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "th", 23);
      \u0275\u0275text(40, " Cost ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "th", 23);
      \u0275\u0275text(42, " Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "th", 23);
      \u0275\u0275text(44, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "th", 24);
      \u0275\u0275text(46, " Action ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "tbody");
      \u0275\u0275repeaterCreate(48, MaterialMaster_For_49_Template, 46, 13, "tr", 25, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(50, "div", 26)(51, "p", 27);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 28)(54, "button", 29);
      \u0275\u0275listener("click", function MaterialMaster_Template_button_click_54_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(55, "span", 30);
      \u0275\u0275text(56, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(57, MaterialMaster_For_58_Template, 2, 3, "button", 31, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(59, "button", 29);
      \u0275\u0275listener("click", function MaterialMaster_Template_button_click_59_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(60, "span", 30);
      \u0275\u0275text(61, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(62, "app-common-dialog", 32);
      \u0275\u0275listener("closed", function MaterialMaster_Template_app_common_dialog_closed_62_listener() {
        return ctx.showAddModal = false;
      })("primary", function MaterialMaster_Template_app_common_dialog_primary_62_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275elementStart(63, "div", 33)(64, "div", 34)(65, "div", 35)(66, "label", 36);
      \u0275\u0275text(67, "Material Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "input", 37);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_68_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.name, $event) || (ctx.newMaterial.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "div")(70, "label", 36);
      \u0275\u0275text(71, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "input", 38);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_72_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "div", 39)(74, "label", 36);
      \u0275\u0275text(75, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "button", 40);
      \u0275\u0275listener("click", function MaterialMaster_Template_button_click_76_listener() {
        return ctx.categoryDropdownOpen = !ctx.categoryDropdownOpen;
      });
      \u0275\u0275elementStart(77, "span", 41);
      \u0275\u0275text(78);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "span", 42);
      \u0275\u0275text(80, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(81, MaterialMaster_Conditional_81_Template, 4, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "div", 35)(83, "label", 36);
      \u0275\u0275text(84, "Cost Price");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "input", 43);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialMaster_Template_input_ngModelChange_85_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(86, "app-common-dialog", 44);
      \u0275\u0275listener("closed", function MaterialMaster_Template_app_common_dialog_closed_86_listener() {
        return ctx.showEditModal = false;
      })("primary", function MaterialMaster_Template_app_common_dialog_primary_86_listener() {
        return ctx.updateMaterial();
      });
      \u0275\u0275conditionalCreate(87, MaterialMaster_Conditional_87_Template, 23, 8, "div", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "app-common-dialog", 45);
      \u0275\u0275listener("closed", function MaterialMaster_Template_app_common_dialog_closed_88_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function MaterialMaster_Template_app_common_dialog_primary_88_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(89, MaterialMaster_Conditional_89_Template, 6, 1, "div", 46);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(90, MaterialMaster_Conditional_90_Template, 31, 0, "div", 47);
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(25);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", (ctx.page - 1) * ctx.pageSize + 1, " to ", ctx.endItem, " of ", ctx.materials.length, " materials ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(24, _c0).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.categoryDropdownOpen ? "border-primary ring-2 ring-primary/30" : "border-outline-variant/20 dark:border-slate-800");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.category ? "text-slate-800 dark:text-white" : "text-slate-400 font-medium");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.category || "Select Category", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.categoryDropdownOpen ? "rotate-180" : "");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.categoryDropdownOpen ? 81 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToEdit ? 87 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToDelete ? 89 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showFilters ? 90 : -1);
    }
  }, dependencies: [NgClass, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, CommonDialogComponent, CurrencyPipe], styles: ["\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=material-master.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialMaster, [{
    type: Component,
    args: [{ selector: "app-material-master", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Materials Master\r
            </h2>\r
        </div>\r
        <div class="flex gap-3">\r
\r
            <button (click)="openAddModal()"\r
                class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] cursor-pointer">\r
\r
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
                Add Material\r
\r
\r
\r
\r
            </button>\r
        </div>\r
    </div>\r
\r
    <div\r
        class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm">\r
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
            <div class="flex items-center gap-3">\r
\r
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
            </div>\r
        </div>\r
\r
        <div class="w-full overflow-x-auto custom-scrollbar px-4 py-4">\r
\r
            <table class="w-full table-fixed border-separate border-spacing-y-4">\r
\r
                <colgroup>\r
                    <col style="width:27%">\r
                    <col style="width:13%">\r
                    <col style="width:13%">\r
                    <col style="width:19%">\r
                    <col style="width:14%">\r
                    <col style="width:14%">\r
                </colgroup>\r
\r
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
                        <th class="px-6 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Action\r
                        </th>\r
                    </tr>\r
\r
                </thead>\r
\r
                <tbody>\r
\r
                    @for (item of paginatedMaterials; track item.sku) {\r
\r
                    <tr\r
                        class="group relative z-0 hover:z-[99] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
                        <td\r
                            class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-xl transition-all duration-300">\r
\r
                            <div class="flex items-center gap-4 min-w-0">\r
\r
                                <div\r
                                    class="shrink-0 relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
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
                                <div class="space-y-1 min-w-0">\r
\r
                                    <p\r
                                        class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors truncate">\r
\r
                                        {{ item.name }}\r
\r
                                    </p>\r
\r
                                    <div class="flex items-center gap-2 min-w-0">\r
\r
                                        <span\r
                                            class="shrink-0 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
\r
                                            SKU\r
\r
                                        </span>\r
\r
                                        <span class="text-xs text-slate-400 font-semibold truncate">\r
                                            {{ item.sku }}\r
                                        </span>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </div>\r
                        </td>\r
\r
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <span\r
                                class="inline-flex max-w-full items-center px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-wide truncate">\r
\r
                                {{ item.category }}\r
\r
                            </span>\r
\r
                        </td>\r
\r
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="flex flex-col min-w-0">\r
\r
                                <span class="text-base font-black text-slate-800 dark:text-white truncate block">\r
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
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="w-full flex flex-col gap-3 min-w-0">\r
\r
                                <div class="flex items-center justify-between gap-2">\r
\r
                                    <span class="text-sm font-black text-slate-700 dark:text-slate-200 truncate">\r
                                        {{ item.stockAvailable || 0 }} Units\r
                                    </span>\r
\r
                                    <span class="text-[11px] font-bold text-emerald-600 shrink-0">\r
                                        Available\r
                                    </span>\r
\r
                                </div>\r
\r
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
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <span\r
                                class="inline-flex max-w-full items-center gap-2 px-3 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wide truncate"\r
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
                        </td>\r
\r
                        <td\r
                            class="px-3 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-xl transition-all duration-300">\r
\r
                            <div class="flex items-center justify-end gap-1.5 transition-all duration-300">\r
\r
                                <button (click)="openEditModal($event, item)" title="Edit Material"\r
                                    class="w-9 h-9 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                    <span class="material-symbols-outlined text-[16px]">\r
                                        edit\r
                                    </span>\r
                                </button>\r
\r
                                <button (click)="openDeleteModal($event, item)" title="Delete Material"\r
                                    class="w-9 h-9 shrink-0 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                    <span class="material-symbols-outlined text-[16px]">\r
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
                    }\r
\r
                </tbody>\r
\r
            </table>\r
        </div>\r
\r
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
                <button (click)="prevPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_left\r
                    </span>\r
\r
                </button>\r
\r
                @for (p of [].constructor(totalPages()); track $index) {\r
\r
                <button (click)="goToPage($index + 1)"\r
                    [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
                    class="w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer">\r
\r
                    {{ $index + 1 }}\r
\r
                </button>\r
\r
                }\r
\r
                <button (click)="nextPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
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
<app-common-dialog [open]="showAddModal" title="New Material" icon="inventory_2" [showCloseButton]="true"\r
    [showFooter]="true" cancelLabel="Cancel" primaryLabel="Add Material" (closed)="showAddModal = false"\r
    (primary)="addMaterial()">\r
    <div class="p-8 max-h-[65vh] overflow-y-auto scroll-smooth custom-scrollbar">\r
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
            <div class="relative">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
\r
                <button type="button" (click)="categoryDropdownOpen = !categoryDropdownOpen"\r
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all duration-200 bg-white dark:bg-slate-900 cursor-pointer"\r
                    [ngClass]="categoryDropdownOpen\r
            ? 'border-primary ring-2 ring-primary/30'\r
            : 'border-outline-variant/20 dark:border-slate-800'">\r
\r
                    <span\r
                        [ngClass]="newMaterial.category ? 'text-slate-800 dark:text-white' : 'text-slate-400 font-medium'">\r
                        {{ newMaterial.category || 'Select Category' }}\r
                    </span>\r
\r
                    <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200"\r
                        [ngClass]="categoryDropdownOpen ? 'rotate-180' : ''">\r
                        expand_more\r
                    </span>\r
                </button>\r
\r
                @if (categoryDropdownOpen) {\r
\r
                <div class="fixed inset-0 z-40" (click)="categoryDropdownOpen = false"></div>\r
\r
                <div\r
                    class="absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 dark:border-slate-800 p-2 max-h-56 overflow-y-auto scroll-smooth custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">\r
                    @for (category of categories; track $index) {\r
                    <button type="button" (click)="selectCategory(category.category_name)"\r
                        class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"\r
                        [ngClass]="newMaterial.category === category.category_name\r
                ? 'bg-primary text-white'\r
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'">\r
                        {{ category.category_name }}\r
                    </button>\r
                    }\r
                </div>\r
                }\r
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
<app-common-dialog [open]="showEditModal && !!materialToEdit" title="Edit Material" icon="edit_square"\r
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" primaryLabel="Save Changes"\r
    (closed)="showEditModal = false" (primary)="updateMaterial()">\r
    @if (materialToEdit) {\r
    <div class="p-8 max-h-[65vh] overflow-y-auto scroll-smooth custom-scrollbar">\r
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
            <div class="relative">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
\r
                <button type="button" (click)="editCategoryDropdownOpen = !editCategoryDropdownOpen"\r
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all duration-200 bg-white dark:bg-slate-900 cursor-pointer"\r
                    [ngClass]="editCategoryDropdownOpen\r
            ? 'border-primary ring-2 ring-primary/30'\r
            : 'border-outline-variant/20 dark:border-slate-800'">\r
\r
                    <span\r
                        [ngClass]="materialToEdit.category ? 'text-slate-800 dark:text-white' : 'text-slate-400 font-medium'">\r
                        {{ materialToEdit.category || 'Select Category' }}\r
                    </span>\r
\r
                    <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200"\r
                        [ngClass]="editCategoryDropdownOpen ? 'rotate-180' : ''">\r
                        expand_more\r
                    </span>\r
                </button>\r
\r
                @if (editCategoryDropdownOpen) {\r
\r
                <div class="fixed inset-0 z-40" (click)="editCategoryDropdownOpen = false"></div>\r
\r
                <div\r
                    class="absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 dark:border-slate-800 p-2 max-h-56 overflow-y-auto scroll-smooth custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">\r
                    @for (category of categories; track $index) {\r
                    <button type="button" (click)="selectEditCategory(category.category_name)"\r
                        class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"\r
                        [ngClass]="materialToEdit.category === category.category_name\r
                ? 'bg-primary text-white'\r
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'">\r
                        {{ category.category_name }}\r
                    </button>\r
                    }\r
                </div>\r
                }\r
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
<app-common-dialog [open]="showDeleteModal && !!materialToDelete" variant="danger" title="Delete Material?"\r
    subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"\r
    cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="showDeleteModal = false" (primary)="confirmDelete()">\r
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
}`, styles: ["/* src/app/modules/master/material-master/material-master.scss */\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=material-master.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaterialMaster, { className: "MaterialMaster", filePath: "app/modules/master/material-master/material-master.ts", lineNumber: 16 });
})();

// src/app/modules/master/equipment-master/equipment-master.ts
var _c02 = () => [];
var _forTrack02 = ($index, $item) => $item.sku;
function EquipmentMaster_For_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 25)(1, "td", 48)(2, "div", 49)(3, "div", 50);
    \u0275\u0275element(4, "div", 51);
    \u0275\u0275elementStart(5, "span", 52);
    \u0275\u0275text(6, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 53)(8, "p", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 55)(11, "span", 56);
    \u0275\u0275text(12, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 57);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 58)(16, "span", 59);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 58)(19, "div", 60)(20, "span", 61);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 62);
    \u0275\u0275text(24, " Per Unit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "td", 58)(26, "div", 63)(27, "div", 64)(28, "span", 65);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 66);
    \u0275\u0275text(31, " Available ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 67);
    \u0275\u0275element(33, "div", 68);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "td", 58)(35, "span", 69);
    \u0275\u0275element(36, "span", 70);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "td", 71)(39, "div", 72)(40, "button", 73);
    \u0275\u0275listener("click", function EquipmentMaster_For_49_Template_button_click_40_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal($event, item_r2));
    });
    \u0275\u0275elementStart(41, "span", 74);
    \u0275\u0275text(42, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "button", 75);
    \u0275\u0275listener("click", function EquipmentMaster_For_49_Template_button_click_43_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r2));
    });
    \u0275\u0275elementStart(44, "span", 74);
    \u0275\u0275text(45, " delete ");
    \u0275\u0275elementEnd()()()()();
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
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
  }
}
function EquipmentMaster_For_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function EquipmentMaster_For_58_Template_button_click_0_listener() {
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
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function EquipmentMaster_Conditional_81_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_81_For_3_Template_button_click_0_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectCategory(category_r8.category_name));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.category === category_r8.category_name ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r8.category_name, " ");
  }
}
function EquipmentMaster_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_81_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.categoryDropdownOpen = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 78);
    \u0275\u0275repeaterCreate(2, EquipmentMaster_Conditional_81_For_3_Template, 2, 2, "button", 79, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.categories);
  }
}
function EquipmentMaster_Conditional_87_Conditional_18_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_87_Conditional_18_For_3_Template_button_click_0_listener() {
      const category_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectEditCategory(category_r12.category_name));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.category === category_r12.category_name ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r12.category_name, " ");
  }
}
function EquipmentMaster_Conditional_87_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_87_Conditional_18_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editCategoryDropdownOpen = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 78);
    \u0275\u0275repeaterCreate(2, EquipmentMaster_Conditional_87_Conditional_18_For_3_Template, 2, 2, "button", 79, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.categories);
  }
}
function EquipmentMaster_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "div", 35)(3, "label", 36);
    \u0275\u0275text(4, "Equipment Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Conditional_87_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.name, $event) || (ctx_r2.materialToEdit.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 36);
    \u0275\u0275text(8, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Conditional_87_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.sku, $event) || (ctx_r2.materialToEdit.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 39)(11, "label", 36);
    \u0275\u0275text(12, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 40);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_87_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editCategoryDropdownOpen = !ctx_r2.editCategoryDropdownOpen);
    });
    \u0275\u0275elementStart(14, "span", 41);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 42);
    \u0275\u0275text(17, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, EquipmentMaster_Conditional_87_Conditional_18_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 35)(20, "label", 36);
    \u0275\u0275text(21, "Cost Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Conditional_87_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r9);
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
    \u0275\u0275property("ngClass", ctx_r2.editCategoryDropdownOpen ? "border-primary ring-2 ring-primary/30" : "border-outline-variant/20 dark:border-slate-800");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.category ? "text-slate-800 dark:text-white" : "text-slate-400 font-medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.materialToEdit.category || "Select Category", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.editCategoryDropdownOpen ? "rotate-180" : "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.editCategoryDropdownOpen ? 18 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.cost);
  }
}
function EquipmentMaster_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "p", 83);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 84);
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
function EquipmentMaster_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_90_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 86);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_90_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 87);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 88)(5, "div")(6, "label", 89);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 90)(9, "option");
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
    \u0275\u0275elementStart(19, "div")(20, "label", 89);
    \u0275\u0275text(21, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 91)(23, "button", 92);
    \u0275\u0275text(24, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 93);
    \u0275\u0275text(26, "Preferred");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 93);
    \u0275\u0275text(28, "New");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "button", 94);
    \u0275\u0275listener("click", function EquipmentMaster_Conditional_90_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r13);
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
  categoryDropdownOpen = false;
  editCategoryDropdownOpen = false;
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
  selectCategory(name) {
    this.newMaterial.category = name;
    this.categoryDropdownOpen = false;
  }
  selectEditCategory(name) {
    this.materialToEdit.category = name;
    this.editCategoryDropdownOpen = false;
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EquipmentMaster, selectors: [["app-equipment-master"]], standalone: false, decls: 91, vars: 25, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "gap-3"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "cursor-pointer", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/60", "dark:border-slate-800", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search equipment...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "w-full", "overflow-x-auto", "custom-scrollbar", "px-4", "py-4"], [1, "w-full", "table-fixed", "border-separate", "border-spacing-y-4"], [2, "width", "27%"], [2, "width", "13%"], [2, "width", "19%"], [2, "width", "14%"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "px-6", "text-right", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[99]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "class"], ["title", "New Equipment", "icon", "construction", "cancelLabel", "Cancel", "primaryLabel", "Add Equipment", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "max-h-[65vh]", "overflow-y-auto", "scroll-smooth", "custom-scrollbar"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], ["type", "text", "placeholder", "e.g. Portland Cement Grade-C", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "relative"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-4", "py-3", "rounded-xl", "border", "text-sm", "font-bold", "outline-none", "transition-all", "duration-200", "bg-white", "dark:bg-slate-900", "cursor-pointer", 3, "click", "ngClass"], [3, "ngClass"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "transition-transform", "duration-200", 3, "ngClass"], ["type", "number", "min", "1", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["title", "Edit Equipment", "icon", "edit_square", "cancelLabel", "Cancel", "primaryLabel", "Save Changes", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], ["variant", "danger", "title", "Delete Equipment?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "fixed", "inset-0", "z-[90]"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4", "min-w-0"], [1, "shrink-0", "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "space-y-1", "min-w-0"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors", "truncate"], [1, "flex", "items-center", "gap-2", "min-w-0"], [1, "shrink-0", "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold", "truncate"], [1, "px-3", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "max-w-full", "items-center", "px-3", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[10px]", "font-black", "uppercase", "tracking-wide", "truncate"], [1, "flex", "flex-col", "min-w-0"], [1, "text-base", "font-black", "text-slate-800", "dark:text-white", "truncate", "block"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-full", "flex", "flex-col", "gap-3", "min-w-0"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200", "truncate"], [1, "text-[11px]", "font-bold", "text-emerald-600", "shrink-0"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "inline-flex", "max-w-full", "items-center", "gap-2", "px-3", "py-2", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-wide", "truncate", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", 3, "ngClass"], [1, "px-3", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm", "group-hover:shadow-xl", "transition-all", "duration-300"], [1, "flex", "items-center", "justify-end", "gap-1.5", "transition-all", "duration-300"], ["title", "Edit Equipment", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[16px]"], ["title", "Delete Equipment", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "click"], [1, "fixed", "inset-0", "z-40", 3, "click"], [1, "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "dark:border-slate-800", "p-2", "max-h-56", "overflow-y-auto", "scroll-smooth", "custom-scrollbar", "animate-in", "fade-in", "slide-in-from-top-2", "duration-200"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-2.5", "rounded-xl", "text-sm", "font-bold", "transition-all", "duration-150", "cursor-pointer", 3, "ngClass"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-2.5", "rounded-xl", "text-sm", "font-bold", "transition-all", "duration-150", "cursor-pointer", 3, "click", "ngClass"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "ngModelChange", "ngModel"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "space-y-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], [1, "w-full", "p-2", "bg-surface-container", "rounded-lg", "text-xs", "font-bold", "outline-none"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "bg-primary", "text-white", "rounded", "text-[10px]", "font-bold"], [1, "px-2", "py-1", "bg-surface-container", "text-outline", "rounded", "text-[10px]", "font-bold"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"]], template: function EquipmentMaster_Template(rf, ctx) {
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
      \u0275\u0275elementStart(24, "div", 17)(25, "table", 18)(26, "colgroup");
      \u0275\u0275element(27, "col", 19)(28, "col", 20)(29, "col", 20)(30, "col", 21)(31, "col", 22)(32, "col", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "thead")(34, "tr")(35, "th", 23);
      \u0275\u0275text(36, " Equipment ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "th", 23);
      \u0275\u0275text(38, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "th", 23);
      \u0275\u0275text(40, " Cost ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "th", 23);
      \u0275\u0275text(42, " Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "th", 23);
      \u0275\u0275text(44, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "th", 24);
      \u0275\u0275text(46, " Action ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "tbody");
      \u0275\u0275repeaterCreate(48, EquipmentMaster_For_49_Template, 46, 13, "tr", 25, _forTrack02);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(50, "div", 26)(51, "p", 27);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 28)(54, "button", 29);
      \u0275\u0275listener("click", function EquipmentMaster_Template_button_click_54_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(55, "span", 30);
      \u0275\u0275text(56, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(57, EquipmentMaster_For_58_Template, 2, 3, "button", 31, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(59, "button", 29);
      \u0275\u0275listener("click", function EquipmentMaster_Template_button_click_59_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(60, "span", 30);
      \u0275\u0275text(61, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(62, "app-common-dialog", 32);
      \u0275\u0275listener("closed", function EquipmentMaster_Template_app_common_dialog_closed_62_listener() {
        return ctx.showAddModal = false;
      })("primary", function EquipmentMaster_Template_app_common_dialog_primary_62_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275elementStart(63, "div", 33)(64, "div", 34)(65, "div", 35)(66, "label", 36);
      \u0275\u0275text(67, "Equipment Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "input", 37);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_68_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.name, $event) || (ctx.newMaterial.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "div")(70, "label", 36);
      \u0275\u0275text(71, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "input", 38);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_72_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "div", 39)(74, "label", 36);
      \u0275\u0275text(75, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "button", 40);
      \u0275\u0275listener("click", function EquipmentMaster_Template_button_click_76_listener() {
        return ctx.categoryDropdownOpen = !ctx.categoryDropdownOpen;
      });
      \u0275\u0275elementStart(77, "span", 41);
      \u0275\u0275text(78);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "span", 42);
      \u0275\u0275text(80, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(81, EquipmentMaster_Conditional_81_Template, 4, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "div", 35)(83, "label", 36);
      \u0275\u0275text(84, "Cost Price");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "input", 43);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentMaster_Template_input_ngModelChange_85_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(86, "app-common-dialog", 44);
      \u0275\u0275listener("closed", function EquipmentMaster_Template_app_common_dialog_closed_86_listener() {
        return ctx.showEditModal = false;
      })("primary", function EquipmentMaster_Template_app_common_dialog_primary_86_listener() {
        return ctx.updateMaterial();
      });
      \u0275\u0275conditionalCreate(87, EquipmentMaster_Conditional_87_Template, 23, 8, "div", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "app-common-dialog", 45);
      \u0275\u0275listener("closed", function EquipmentMaster_Template_app_common_dialog_closed_88_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function EquipmentMaster_Template_app_common_dialog_primary_88_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(89, EquipmentMaster_Conditional_89_Template, 6, 1, "div", 46);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(90, EquipmentMaster_Conditional_90_Template, 31, 0, "div", 47);
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(25);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredMaterials.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - to ", ctx.endItem, " of ", ctx.filteredMaterials.length, " Equipment ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(24, _c02).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.categoryDropdownOpen ? "border-primary ring-2 ring-primary/30" : "border-outline-variant/20 dark:border-slate-800");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.category ? "text-slate-800 dark:text-white" : "text-slate-400 font-medium");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.category || "Select Category", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.categoryDropdownOpen ? "rotate-180" : "");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.categoryDropdownOpen ? 81 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToEdit ? 87 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToDelete ? 89 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showFilters ? 90 : -1);
    }
  }, dependencies: [NgClass, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, CommonDialogComponent, CurrencyPipe], styles: ["\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=equipment-master.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EquipmentMaster, [{
    type: Component,
    args: [{ selector: "app-equipment-master", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Equipment Master\r
            </h2>\r
        </div>\r
        <div class="flex gap-3">\r
            <button (click)="openAddModal()"\r
                class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] cursor-pointer">\r
\r
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
                </div>\r
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
\r
            <div class="flex items-center gap-3">\r
\r
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
        <div class="w-full overflow-x-auto custom-scrollbar px-4 py-4">\r
\r
            <table class="w-full table-fixed border-separate border-spacing-y-4">\r
                <colgroup>\r
                    <col style="width:27%">\r
                    <col style="width:13%">\r
                    <col style="width:13%">\r
                    <col style="width:19%">\r
                    <col style="width:14%">\r
                    <col style="width:14%">\r
                </colgroup>\r
\r
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
                        <th class="px-6 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                            Action\r
                        </th>\r
\r
                    </tr>\r
\r
                </thead>\r
\r
                <tbody>\r
\r
                    @for (item of paginatedMaterials; track item.sku) {\r
\r
                    <tr\r
                        class="group relative z-0 hover:z-[99] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
                        <td\r
                            class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
                            <div class="flex items-center gap-4 min-w-0">\r
\r
                                <div\r
                                    class="shrink-0 relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
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
                                <div class="space-y-1 min-w-0">\r
\r
                                    <p\r
                                        class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors truncate">\r
\r
                                        {{ item.name }}\r
\r
                                    </p>\r
\r
                                    <div class="flex items-center gap-2 min-w-0">\r
\r
                                        <span\r
                                            class="shrink-0 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
                                            SKU\r
                                        </span>\r
\r
                                        <span class="text-xs text-slate-400 font-semibold truncate">\r
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
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <span\r
                                class="inline-flex max-w-full items-center px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-wide truncate">\r
\r
                                {{ item.category }}\r
\r
                            </span>\r
\r
                        </td>\r
\r
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="flex flex-col min-w-0">\r
\r
                                <span class="text-base font-black text-slate-800 dark:text-white truncate block">\r
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
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <div class="w-full flex flex-col gap-3 min-w-0">\r
\r
                                <div class="flex items-center justify-between gap-2">\r
\r
                                    <span class="text-sm font-black text-slate-700 dark:text-slate-200 truncate">\r
                                        {{ item.stockAvailable || 0 }} Units\r
                                    </span>\r
\r
                                    <span class="text-[11px] font-bold text-emerald-600 shrink-0">\r
                                        Available\r
                                    </span>\r
\r
                                </div>\r
\r
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
                        <td\r
                            class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                            <span\r
                                class="inline-flex max-w-full items-center gap-2 px-3 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wide truncate"\r
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
                        </td>\r
\r
                        <td\r
                            class="px-3 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-xl transition-all duration-300">\r
\r
                            <div class="flex items-center justify-end gap-1.5 transition-all duration-300">\r
\r
                                <button (click)="openEditModal($event, item)" title="Edit Equipment"\r
                                    class="w-9 h-9 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                    <span class="material-symbols-outlined text-[16px]">\r
                                        edit\r
                                    </span>\r
\r
                                </button>\r
\r
                                <button (click)="openDeleteModal($event, item)" title="Delete Equipment"\r
                                    class="w-9 h-9 shrink-0 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                    <span class="material-symbols-outlined text-[16px]">\r
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
                    }\r
\r
                </tbody>\r
\r
            </table>\r
\r
        </div>\r
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
                <button (click)="prevPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_left\r
                    </span>\r
\r
                </button>\r
\r
                @for (p of [].constructor(totalPages()); track $index) {\r
\r
                <button (click)="goToPage($index + 1)"\r
                    [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
                    class="w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer">\r
\r
                    {{ $index + 1 }}\r
\r
                </button>\r
\r
                }\r
\r
                <button (click)="nextPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
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
<app-common-dialog [open]="showAddModal" title="New Equipment" icon="construction" [showCloseButton]="true"\r
    [showFooter]="true" cancelLabel="Cancel" primaryLabel="Add Equipment" (closed)="showAddModal = false"\r
    (primary)="addMaterial()">\r
    <div class="p-8 max-h-[65vh] overflow-y-auto scroll-smooth custom-scrollbar">\r
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
            <div class="relative">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
\r
                <button type="button" (click)="categoryDropdownOpen = !categoryDropdownOpen"\r
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all duration-200 bg-white dark:bg-slate-900 cursor-pointer"\r
                    [ngClass]="categoryDropdownOpen\r
            ? 'border-primary ring-2 ring-primary/30'\r
            : 'border-outline-variant/20 dark:border-slate-800'">\r
\r
                    <span\r
                        [ngClass]="newMaterial.category ? 'text-slate-800 dark:text-white' : 'text-slate-400 font-medium'">\r
                        {{ newMaterial.category || 'Select Category' }}\r
                    </span>\r
\r
                    <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200"\r
                        [ngClass]="categoryDropdownOpen ? 'rotate-180' : ''">\r
                        expand_more\r
                    </span>\r
                </button>\r
\r
                @if (categoryDropdownOpen) {\r
\r
                <div class="fixed inset-0 z-40" (click)="categoryDropdownOpen = false"></div>\r
\r
                <div\r
                    class="absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 dark:border-slate-800 p-2 max-h-56 overflow-y-auto scroll-smooth custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">\r
                    @for (category of categories; track $index) {\r
                    <button type="button" (click)="selectCategory(category.category_name)"\r
                        class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"\r
                        [ngClass]="newMaterial.category === category.category_name\r
                ? 'bg-primary text-white'\r
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'">\r
                        {{ category.category_name }}\r
                    </button>\r
                    }\r
                </div>\r
                }\r
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
<app-common-dialog [open]="showEditModal && !!materialToEdit" title="Edit Equipment" icon="edit_square"\r
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" primaryLabel="Save Changes"\r
    (closed)="showEditModal = false" (primary)="updateMaterial()">\r
    @if (materialToEdit) {\r
    <div class="p-8 max-h-[65vh] overflow-y-auto scroll-smooth custom-scrollbar">\r
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
            <div class="relative">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
\r
                <button type="button" (click)="editCategoryDropdownOpen = !editCategoryDropdownOpen"\r
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all duration-200 bg-white dark:bg-slate-900 cursor-pointer"\r
                    [ngClass]="editCategoryDropdownOpen\r
            ? 'border-primary ring-2 ring-primary/30'\r
            : 'border-outline-variant/20 dark:border-slate-800'">\r
\r
                    <span\r
                        [ngClass]="materialToEdit.category ? 'text-slate-800 dark:text-white' : 'text-slate-400 font-medium'">\r
                        {{ materialToEdit.category || 'Select Category' }}\r
                    </span>\r
\r
                    <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200"\r
                        [ngClass]="editCategoryDropdownOpen ? 'rotate-180' : ''">\r
                        expand_more\r
                    </span>\r
                </button>\r
\r
                @if (editCategoryDropdownOpen) {\r
\r
                <div class="fixed inset-0 z-40" (click)="editCategoryDropdownOpen = false"></div>\r
\r
                <div\r
                    class="absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 dark:border-slate-800 p-2 max-h-56 overflow-y-auto scroll-smooth custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">\r
                    @for (category of categories; track $index) {\r
                    <button type="button" (click)="selectEditCategory(category.category_name)"\r
                        class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"\r
                        [ngClass]="materialToEdit.category === category.category_name\r
                ? 'bg-primary text-white'\r
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'">\r
                        {{ category.category_name }}\r
                    </button>\r
                    }\r
                </div>\r
                }\r
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
<app-common-dialog [open]="showDeleteModal && !!materialToDelete" variant="danger" title="Delete Equipment?"\r
    subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"\r
    cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="showDeleteModal = false" (primary)="confirmDelete()">\r
    @if (materialToDelete) {\r
    <div class="p-8 text-center">\r
        <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
                class="text-on-surface font-black">"{{ materialToDelete.name }}"</span>? This action cannot be undone.\r
        </p>\r
    </div>\r
    }\r
</app-common-dialog>\r
\r
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
}`, styles: ["/* src/app/modules/master/equipment-master/equipment-master.scss */\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=equipment-master.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EquipmentMaster, { className: "EquipmentMaster", filePath: "app/modules/master/equipment-master/equipment-master.ts", lineNumber: 16 });
})();

// src/app/modules/master/skill-master/skill-master.ts
var _c03 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
function SkillMaster_For_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 21)(1, "td", 35)(2, "div", 36)(3, "div", 37);
    \u0275\u0275element(4, "div", 38);
    \u0275\u0275elementStart(5, "span", 39);
    \u0275\u0275text(6, " engineering ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 40)(8, "p", 41);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 42)(11, "span", 43);
    \u0275\u0275text(12, " Skill ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 44);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 45)(16, "div", 46)(17, "span", 47);
    \u0275\u0275element(18, "span", 48);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "td", 49)(21, "div", 50)(22, "button", 51);
    \u0275\u0275listener("click", function SkillMaster_For_39_Template_button_click_22_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(item_r2));
    });
    \u0275\u0275elementStart(23, "span", 52);
    \u0275\u0275text(24, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 53);
    \u0275\u0275listener("click", function SkillMaster_For_39_Template_button_click_25_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteSkill(item_r2));
    });
    \u0275\u0275elementStart(26, "span", 52);
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
function SkillMaster_ForEmpty_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 54)(2, "div", 55)(3, "div", 56)(4, "span", 57);
    \u0275\u0275text(5, " construction ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "p", 58);
    \u0275\u0275text(8, " No Skills Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 59);
    \u0275\u0275text(10, " Add new skills to get started ");
    \u0275\u0275elementEnd()()()()();
  }
}
function SkillMaster_For_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function SkillMaster_For_49_Template_button_click_0_listener() {
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
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function SkillMaster_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "p", 61);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 62);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SkillMaster, selectors: [["app-skill-master"]], standalone: false, decls: 61, vars: 17, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "cursor-pointer", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "bg-white", "rounded-[28px]", "border", "border-slate-200", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search skills...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "w-full", "overflow-x-auto", "custom-scrollbar", "px-4", "py-4"], [1, "w-full", "table-fixed", "border-separate", "border-spacing-y-4"], [2, "width", "50%"], [2, "width", "25%"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "px-6", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[9]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "class"], ["icon", "construction", "cancelLabel", "Cancel", 3, "closed", "primary", "open", "title", "subtitle", "showCloseButton", "showFooter", "primaryLabel"], [1, "p-7", "max-h-[65vh]", "overflow-y-auto", "scroll-smooth", "custom-scrollbar"], [1, "mb-5"], [1, "text-sm", "font-black", "block", "mb-2", "text-slate-700"], ["type", "text", "placeholder", "Enter skill name", 1, "w-full", "border", "border-slate-200", "rounded-2xl", "px-4", "py-3.5", "outline-none", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all", 3, "ngModelChange", "ngModel"], ["variant", "danger", "title", "Delete Skill?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4", "min-w-0"], [1, "shrink-0", "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[26px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "space-y-1", "min-w-0"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors", "truncate"], [1, "flex", "items-center", "gap-2", "min-w-0"], [1, "shrink-0", "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold", "truncate"], [1, "px-3", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-center"], [1, "inline-flex", "max-w-full", "items-center", "gap-2", "px-3", "py-2", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-wide", "truncate", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", "shrink-0", 3, "ngClass"], [1, "px-3", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-center", "gap-2"], ["title", "Edit Skill", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[16px]"], ["title", "Delete Skill", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["colspan", "3", 1, "py-24", "text-center"], [1, "flex", "flex-col", "items-center", "gap-4"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "click"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"]], template: function SkillMaster_Template(rf, ctx) {
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
      \u0275\u0275elementStart(23, "div", 15)(24, "table", 16)(25, "colgroup");
      \u0275\u0275element(26, "col", 17)(27, "col", 18)(28, "col", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "thead")(30, "tr")(31, "th", 19);
      \u0275\u0275text(32, " Skill & Services ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th", 20);
      \u0275\u0275text(34, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "th", 20);
      \u0275\u0275text(36, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "tbody");
      \u0275\u0275repeaterCreate(38, SkillMaster_For_39_Template, 28, 5, "tr", 21, _forTrack03, false, SkillMaster_ForEmpty_40_Template, 11, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 22)(42, "p", 23);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 24)(45, "button", 25);
      \u0275\u0275listener("click", function SkillMaster_Template_button_click_45_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(46, "span", 26);
      \u0275\u0275text(47, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(48, SkillMaster_For_49_Template, 2, 3, "button", 27, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(50, "button", 25);
      \u0275\u0275listener("click", function SkillMaster_Template_button_click_50_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(51, "span", 26);
      \u0275\u0275text(52, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(53, "app-common-dialog", 28);
      \u0275\u0275listener("closed", function SkillMaster_Template_app_common_dialog_closed_53_listener() {
        return ctx.closeModal();
      })("primary", function SkillMaster_Template_app_common_dialog_primary_53_listener() {
        return ctx.isEditMode ? ctx.updateSkill() : ctx.addSkill();
      });
      \u0275\u0275elementStart(54, "div", 29)(55, "div", 30)(56, "label", 31);
      \u0275\u0275text(57, " Skill & Services Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "input", 32);
      \u0275\u0275twoWayListener("ngModelChange", function SkillMaster_Template_input_ngModelChange_58_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newSkill.skill_name, $event) || (ctx.newSkill.skill_name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(59, "app-common-dialog", 33);
      \u0275\u0275listener("closed", function SkillMaster_Template_app_common_dialog_closed_59_listener() {
        return ctx.closeDeleteModal();
      })("primary", function SkillMaster_Template_app_common_dialog_primary_59_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(60, SkillMaster_Conditional_60_Template, 6, 1, "div", 34);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(16);
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
      \u0275\u0275conditional(ctx.skillToDelete ? 60 : -1);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel, CommonDialogComponent], styles: ["\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=skill-master.css.map */"] });
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
    </div>\r
\r
    <button (click)="openAddModal()"\r
      class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] cursor-pointer">\r
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
      <div class="flex items-center gap-3">\r
\r
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
    <div class="w-full overflow-x-auto custom-scrollbar px-4 py-4">\r
\r
      <table class="w-full table-fixed border-separate border-spacing-y-4">\r
        <colgroup>\r
          <col style="width:50%">\r
          <col style="width:25%">\r
          <col style="width:25%">\r
        </colgroup>\r
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
        </thead>\r
\r
        <tbody>\r
\r
          @for (item of paginatedSkills; track item.id) {\r
\r
          <tr\r
            class="group relative z-0 hover:z-[9] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl ">\r
\r
            <td\r
              class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center gap-4 min-w-0">\r
\r
                <div\r
                  class="shrink-0 relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
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
                <div class="space-y-1 min-w-0">\r
\r
                  <p\r
                    class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors truncate">\r
\r
                    {{ item.skill_name }}\r
\r
                  </p>\r
\r
                  <div class="flex items-center gap-2 min-w-0">\r
\r
                    <span\r
                      class="shrink-0 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
                      Skill ID\r
                    </span>\r
\r
                    <span class="text-xs text-slate-400 font-semibold truncate">\r
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
            <td class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-center justify-center">\r
\r
                <span\r
                  class="inline-flex max-w-full items-center gap-2 px-3 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wide truncate"\r
                  [ngClass]="item.status === 'ACTIVE'\r
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'\r
                            : 'bg-red-50 text-red-700 border border-red-200'">\r
\r
                  <span class="w-2.5 h-2.5 rounded-full shrink-0" [ngClass]="item.status === 'ACTIVE'\r
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
              class="px-3 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center justify-center gap-2">\r
\r
                <button (click)="openEditModal(item)" title="Edit Skill"\r
                  class="w-9 h-9 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                  <span class="material-symbols-outlined text-[16px]">\r
                    edit\r
                  </span>\r
\r
                </button>\r
\r
                <button (click)="deleteSkill(item)" title="Delete Skill"\r
                  class="w-9 h-9 shrink-0 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                  <span class="material-symbols-outlined text-[16px]">\r
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
        <button (click)="prevPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
\r
          <span class="material-symbols-outlined text-[18px]">\r
            chevron_left\r
          </span>\r
        </button>\r
\r
        @for (p of [].constructor(totalPages()); track $index) {\r
\r
        <button (click)="goToPage($index + 1)"\r
          [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
          class="w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer">\r
\r
          {{ $index + 1 }}\r
\r
        </button>\r
        }\r
\r
\r
        <button (click)="nextPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
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
<app-common-dialog [open]="showAddModal" [title]="isEditMode ? 'Edit Skill & Services' : 'Add Skill & Services'"\r
  [subtitle]="isEditMode ? 'Update existing skill details' : 'Create a new skill & services record'" icon="construction"\r
  [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" [primaryLabel]="isEditMode ? 'Update' : 'Save'"\r
  (closed)="closeModal()" (primary)="isEditMode ? updateSkill() : addSkill()">\r
  <div class="p-7 max-h-[65vh] overflow-y-auto scroll-smooth custom-scrollbar">\r
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
<app-common-dialog [open]="showDeleteModal && !!skillToDelete" variant="danger" title="Delete Skill?"\r
  subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"\r
  cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="closeDeleteModal()" (primary)="confirmDelete()">\r
  @if (skillToDelete) {\r
  <div class="p-8 text-center">\r
    <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
        class="text-on-surface font-black">"{{ skillToDelete.skill_name }}"</span>? This action cannot be undone.\r
    </p>\r
  </div>\r
  }\r
</app-common-dialog>`, styles: ["/* src/app/modules/master/skill-master/skill-master.scss */\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=skill-master.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SkillMaster, { className: "SkillMaster", filePath: "app/modules/master/skill-master/skill-master.ts", lineNumber: 11 });
})();

// src/app/modules/master/category/category.ts
var _c04 = () => [];
var _forTrack04 = ($index, $item) => $item.id;
function Category_For_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 24)(1, "td", 42)(2, "div", 43)(3, "div", 44);
    \u0275\u0275element(4, "div", 45);
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275text(6, " category ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 47)(8, "p", 48);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 49)(11, "span", 50);
    \u0275\u0275text(12, " Cat. ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 51);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 52)(16, "div", 53)(17, "span", 54)(18, "span", 55);
    \u0275\u0275text(19, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 56);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(22, "td", 52)(23, "div", 53)(24, "span", 57);
    \u0275\u0275element(25, "span", 58);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "td", 59)(28, "div", 60)(29, "button", 61);
    \u0275\u0275listener("click", function Category_For_44_Template_button_click_29_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(item_r2));
    });
    \u0275\u0275elementStart(30, "span", 62);
    \u0275\u0275text(31, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 63);
    \u0275\u0275listener("click", function Category_For_44_Template_button_click_32_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(item_r2));
    });
    \u0275\u0275elementStart(33, "span", 62);
    \u0275\u0275text(34, " delete ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", item_r2.category_name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" #", item_r2.id, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r2.category_type);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r2.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
  }
}
function Category_ForEmpty_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 64)(2, "div", 65)(3, "div", 66)(4, "span", 67);
    \u0275\u0275text(5, " category ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "p", 68);
    \u0275\u0275text(8, " No Categories Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 69);
    \u0275\u0275text(10, " Add new categories to get started ");
    \u0275\u0275elementEnd()()()()();
  }
}
function Category_For_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function Category_For_54_Template_button_click_0_listener() {
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
    \u0275\u0275classMap(ctx_r2.page === $index_r5 + 1 ? "bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r5 + 1, " ");
  }
}
function Category_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function Category_Conditional_72_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.categoryTypeDropdownOpen = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 72)(2, "button", 73);
    \u0275\u0275listener("click", function Category_Conditional_72_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCategoryType("Material"));
    });
    \u0275\u0275text(3, " Material ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 73);
    \u0275\u0275listener("click", function Category_Conditional_72_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCategoryType("Equipment"));
    });
    \u0275\u0275text(5, " Equipment ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.newCategory.category_type === "Material" ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.newCategory.category_type === "Equipment" ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800");
  }
}
function Category_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "p", 74);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 75);
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
  categoryTypeDropdownOpen = false;
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
  selectCategoryType(type) {
    this.newCategory.category_type = type;
    this.categoryTypeDropdownOpen = false;
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
    this.categoryTypeDropdownOpen = false;
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Category, selectors: [["app-category"]], standalone: false, decls: 75, vars: 22, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white", "tracking-tight"], [1, "text-sm", "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "cursor-pointer", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "relative", "z-10"], [1, "bg-white", "dark:bg-slate-900", "rounded-[28px]", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden", "shadow-sm"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "flex-col", "lg:flex-row", "items-start", "lg:items-center", "justify-between", "gap-4", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search categories...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "w-full", "overflow-x-auto", "custom-scrollbar", "px-4", "py-4"], [1, "w-full", "table-fixed", "border-separate", "border-spacing-y-4"], [2, "width", "34%"], [2, "width", "24%"], [2, "width", "20%"], [2, "width", "22%"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "px-6", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "px-6", "py-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/40", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "class"], ["icon", "category", "cancelLabel", "Cancel", 3, "closed", "primary", "open", "title", "subtitle", "showCloseButton", "showFooter", "primaryLabel"], [1, "p-7", "max-h-[65vh]", "overflow-y-auto", "scroll-smooth", "custom-scrollbar"], [1, "mb-5"], [1, "text-sm", "font-black", "block", "mb-2", "text-slate-700", "dark:text-slate-200"], ["type", "text", "placeholder", "Enter category name", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all", 3, "ngModelChange", "ngModel"], [1, "mb-6", "relative"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "border", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "transition-all", "cursor-pointer", 3, "click", "ngClass"], [3, "ngClass"], [1, "material-symbols-outlined", "text-[20px]", "text-slate-400", "transition-transform", "duration-200", 3, "ngClass"], ["variant", "danger", "title", "Delete Category?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4", "min-w-0"], [1, "shrink-0", "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[26px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "space-y-1", "min-w-0"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors", "truncate"], [1, "flex", "items-center", "gap-2", "min-w-0"], [1, "shrink-0", "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold", "truncate"], [1, "px-3", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "min-w-0"], [1, "inline-flex", "max-w-full", "items-center", "gap-2", "px-3", "py-2", "rounded-xl", "bg-slate-100", "dark:bg-slate-800", "text-sm", "font-bold", "text-slate-700", "dark:text-slate-200", "truncate"], [1, "material-symbols-outlined", "text-[18px]", "text-primary", "shrink-0"], [1, "truncate"], [1, "inline-flex", "max-w-full", "items-center", "gap-2", "px-3", "py-2", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-wide", "truncate", 3, "ngClass"], [1, "w-2.5", "h-2.5", "rounded-full", "shrink-0", 3, "ngClass"], [1, "px-3", "py-5", "rounded-r-[28px]", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-center", "gap-2"], ["title", "Edit Category", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[16px]"], ["title", "Delete Category", 1, "w-9", "h-9", "shrink-0", "rounded-xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["colspan", "4", 1, "py-24", "text-center"], [1, "flex", "flex-col", "items-center", "gap-4"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "w-9", "h-9", "rounded-xl", "text-sm", "font-bold", "transition-all", "cursor-pointer", 3, "click"], [1, "fixed", "inset-0", "z-40", 3, "click"], [1, "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-slate-200", "dark:border-slate-700", "p-2", "max-h-56", "overflow-y-auto", "scroll-smooth", "custom-scrollbar", "animate-in", "fade-in", "slide-in-from-top-2", "duration-200"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-2.5", "rounded-xl", "text-sm", "font-bold", "transition-all", "duration-150", "cursor-pointer", 3, "click", "ngClass"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"]], template: function Category_Template(rf, ctx) {
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
      \u0275\u0275elementStart(25, "div", 16)(26, "table", 17)(27, "colgroup");
      \u0275\u0275element(28, "col", 18)(29, "col", 19)(30, "col", 20)(31, "col", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "thead")(33, "tr")(34, "th", 22);
      \u0275\u0275text(35, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "th", 22);
      \u0275\u0275text(37, " Category Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "th", 22);
      \u0275\u0275text(39, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "th", 23);
      \u0275\u0275text(41, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "tbody");
      \u0275\u0275repeaterCreate(43, Category_For_44_Template, 35, 6, "tr", 24, _forTrack04, false, Category_ForEmpty_45_Template, 11, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(46, "div", 25)(47, "p", 26);
      \u0275\u0275text(48);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div", 27)(50, "button", 28);
      \u0275\u0275listener("click", function Category_Template_button_click_50_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(51, "span", 29);
      \u0275\u0275text(52, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(53, Category_For_54_Template, 2, 3, "button", 30, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(55, "button", 28);
      \u0275\u0275listener("click", function Category_Template_button_click_55_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(56, "span", 29);
      \u0275\u0275text(57, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(58, "app-common-dialog", 31);
      \u0275\u0275listener("closed", function Category_Template_app_common_dialog_closed_58_listener() {
        return ctx.closeModal();
      })("primary", function Category_Template_app_common_dialog_primary_58_listener() {
        return ctx.isEditMode ? ctx.updateCategory() : ctx.addCategory();
      });
      \u0275\u0275elementStart(59, "div", 32)(60, "div", 33)(61, "label", 34);
      \u0275\u0275text(62, " Category Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "input", 35);
      \u0275\u0275twoWayListener("ngModelChange", function Category_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newCategory.category_name, $event) || (ctx.newCategory.category_name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 36)(65, "label", 34);
      \u0275\u0275text(66, " Category Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "button", 37);
      \u0275\u0275listener("click", function Category_Template_button_click_67_listener() {
        return ctx.categoryTypeDropdownOpen = !ctx.categoryTypeDropdownOpen;
      });
      \u0275\u0275elementStart(68, "span", 38);
      \u0275\u0275text(69);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "span", 39);
      \u0275\u0275text(71, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(72, Category_Conditional_72_Template, 6, 2);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(73, "app-common-dialog", 40);
      \u0275\u0275listener("closed", function Category_Template_app_common_dialog_closed_73_listener() {
        return ctx.closeDeleteModal();
      })("primary", function Category_Template_app_common_dialog_primary_73_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(74, Category_Conditional_74_Template, 6, 1, "div", 41);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(24);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(19);
      \u0275\u0275repeater(ctx.paginatedCategories);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate3(" Showing ", (ctx.page - 1) * ctx.pageSize + 1, " to ", ctx.endItem, " of ", ctx.categories.length, " Categories ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(21, _c04).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("title", ctx.isEditMode ? "Edit Category" : "Add Category")("subtitle", ctx.isEditMode ? "Update existing category details" : "Create a new category record")("showCloseButton", true)("showFooter", true)("primaryLabel", ctx.isEditMode ? "Update" : "Save");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newCategory.category_name);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.categoryTypeDropdownOpen ? "border-primary ring-4 ring-primary/10" : "border-slate-200 dark:border-slate-700");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newCategory.category_type ? "text-slate-800 dark:text-white font-bold" : "text-slate-400 font-medium");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newCategory.category_type || "Select category type", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.categoryTypeDropdownOpen ? "rotate-180" : "");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.categoryTypeDropdownOpen ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.categoryToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.categoryToDelete ? 74 : -1);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel, CommonDialogComponent], styles: ["\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=category.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Category, [{
    type: Component,
    args: [{ selector: "app-category", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
\r
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
    <button (click)="openAddModal()"\r
      class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] cursor-pointer">\r
\r
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
      <span class="relative z-10">\r
        Add New\r
      </span>\r
\r
    </button>\r
\r
  </div>\r
\r
  <div\r
    class="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">\r
\r
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
    <div class="w-full overflow-x-auto custom-scrollbar px-4 py-4">\r
\r
      <table class="w-full table-fixed border-separate border-spacing-y-4">\r
        <colgroup>\r
          <col style="width:34%">\r
          <col style="width:24%">\r
          <col style="width:20%">\r
          <col style="width:22%">\r
        </colgroup>\r
\r
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
          </tr>\r
        </thead>\r
\r
        <tbody>\r
\r
          @for (item of paginatedCategories; track item.id) {\r
\r
          <tr\r
            class="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
            <td\r
              class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center gap-4 min-w-0">\r
\r
                <div\r
                  class="shrink-0 relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
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
                <div class="space-y-1 min-w-0">\r
\r
                  <p\r
                    class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors truncate">\r
\r
                    {{ item.category_name }}\r
\r
                  </p>\r
\r
                  <div class="flex items-center gap-2 min-w-0">\r
\r
                    <span\r
                      class="shrink-0 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
\r
                      Cat. ID\r
\r
                    </span>\r
\r
                    <span class="text-xs text-slate-400 font-semibold truncate">\r
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
            <td class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-center min-w-0">\r
\r
                <span\r
                  class="inline-flex max-w-full items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 truncate">\r
\r
                  <span class="material-symbols-outlined text-[18px] text-primary shrink-0">\r
                    inventory_2\r
                  </span>\r
\r
                  <span class="truncate">{{ item.category_type }}</span>\r
\r
                </span>\r
\r
              </div>\r
            </td>\r
\r
            <td class="px-3 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-center min-w-0">\r
\r
                <span\r
                  class="inline-flex max-w-full items-center gap-2 px-3 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wide truncate"\r
                  [ngClass]="item.status === 'ACTIVE'\r
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'\r
                    : 'bg-red-50 text-red-700 border border-red-200'">\r
\r
                  <span class="w-2.5 h-2.5 rounded-full shrink-0" [ngClass]="item.status === 'ACTIVE'\r
                      ? 'bg-emerald-500'\r
                      : 'bg-red-500'">\r
                  </span>\r
\r
                  {{ item.status }}\r
\r
                </span>\r
\r
              </div>\r
            </td>\r
\r
            <td class="px-3 py-5 rounded-r-[28px] border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
              <div class="flex items-center justify-center gap-2">\r
\r
                <button (click)="openEditModal(item)" title="Edit Category"\r
                  class="w-9 h-9 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                  <span class="material-symbols-outlined text-[16px]">\r
                    edit\r
                  </span>\r
\r
                </button>\r
\r
                <button (click)="deleteCategory(item)" title="Delete Category"\r
                  class="w-9 h-9 shrink-0 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                  <span class="material-symbols-outlined text-[16px]">\r
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
    </div>\r
\r
    <div\r
      class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-4">\r
\r
      <p class="text-xs font-bold uppercase tracking-wider text-slate-500">\r
\r
        Showing {{ (page - 1) * pageSize + 1 }}\r
        to {{ endItem }}\r
        of {{ categories.length }} Categories\r
      </p>\r
\r
      <div class="flex items-center gap-2">\r
\r
        <button (click)="prevPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
\r
          <span class="material-symbols-outlined text-[18px]">\r
            chevron_left\r
          </span>\r
\r
        </button>\r
\r
        @for (p of [].constructor(totalPages()); track $index) {\r
\r
        <button (click)="goToPage($index + 1)"\r
          [class]="page === ($index + 1)\r
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer'\r
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'"\r
          class="w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer">\r
\r
          {{ $index + 1 }}\r
\r
        </button>\r
\r
        }\r
\r
        <button (click)="nextPage()"\r
          class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">\r
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
<app-common-dialog [open]="showAddModal" [title]="isEditMode ? 'Edit Category' : 'Add Category'"\r
  [subtitle]="isEditMode ? 'Update existing category details' : 'Create a new category record'" icon="category"\r
  [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" [primaryLabel]="isEditMode ? 'Update' : 'Save'"\r
  (closed)="closeModal()" (primary)="isEditMode ? updateCategory() : addCategory()">\r
  <div class="p-7 max-h-[65vh] overflow-y-auto scroll-smooth custom-scrollbar">\r
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
    <div class="mb-6 relative">\r
      <label class="text-sm font-black block mb-2 text-slate-700 dark:text-slate-200">\r
        Category Type\r
      </label>\r
\r
      <button type="button" (click)="categoryTypeDropdownOpen = !categoryTypeDropdownOpen"\r
        class="w-full flex items-center justify-between border rounded-2xl px-4 py-3.5 outline-none bg-white dark:bg-slate-900 transition-all cursor-pointer"\r
        [ngClass]="categoryTypeDropdownOpen\r
      ? 'border-primary ring-4 ring-primary/10'\r
      : 'border-slate-200 dark:border-slate-700'">\r
\r
        <span\r
          [ngClass]="newCategory.category_type ? 'text-slate-800 dark:text-white font-bold' : 'text-slate-400 font-medium'">\r
          {{ newCategory.category_type || 'Select category type' }}\r
        </span>\r
\r
        <span class="material-symbols-outlined text-[20px] text-slate-400 transition-transform duration-200"\r
          [ngClass]="categoryTypeDropdownOpen ? 'rotate-180' : ''">\r
          expand_more\r
        </span>\r
      </button>\r
\r
      @if (categoryTypeDropdownOpen) {\r
\r
      <div class="fixed inset-0 z-40" (click)="categoryTypeDropdownOpen = false"></div>\r
\r
      <div\r
        class="absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 max-h-56 overflow-y-auto scroll-smooth custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">\r
\r
        <button type="button" (click)="selectCategoryType('Material')"\r
          class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"\r
          [ngClass]="newCategory.category_type === 'Material'\r
        ? 'bg-primary text-white'\r
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'">\r
          Material\r
        </button>\r
\r
        <button type="button" (click)="selectCategoryType('Equipment')"\r
          class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"\r
          [ngClass]="newCategory.category_type === 'Equipment'\r
        ? 'bg-primary text-white'\r
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'">\r
          Equipment\r
        </button>\r
\r
      </div>\r
      }\r
    </div>\r
\r
  </div>\r
</app-common-dialog>\r
\r
<app-common-dialog [open]="showDeleteModal && !!categoryToDelete" variant="danger" title="Delete Category?"\r
  subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"\r
  cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="closeDeleteModal()" (primary)="confirmDelete()">\r
  @if (categoryToDelete) {\r
  <div class="p-8 text-center">\r
    <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
        class="text-on-surface font-black">"{{ categoryToDelete.category_name }}"</span>? This action cannot be undone.\r
    </p>\r
  </div>\r
  }\r
</app-common-dialog>`, styles: ["/* src/app/modules/master/category/category.scss */\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n/*# sourceMappingURL=category.css.map */\n"] }]
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
//# sourceMappingURL=chunk-UZ5ZUDXV.js.map
