import {
  EquipmentInventoryService
} from "./chunk-BSTSO5UF.js";
import {
  ProjectService
} from "./chunk-52DGP4Y7.js";
import {
  CommonDialogComponent
} from "./chunk-VKQYMIUT.js";
import {
  CdkScrollableModule,
  ScrollDispatcher,
  ViewportRuler
} from "./chunk-26HEUADP.js";
import {
  Directionality,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _getEventTarget,
  _getShadowRoot,
  coerceArray,
  coerceElement,
  coerceNumberProperty,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader
} from "./chunk-T3AUGCAJ.js";
import {
  ToastrModule,
  ToastrService
} from "./chunk-QR7MRZIR.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators
} from "./chunk-YLIHD5YA.js";
import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DOCUMENT,
  DatePipe,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgClass,
  NgIf,
  NgModule,
  NgZone,
  Observable,
  Output,
  Pipe,
  Renderer2,
  RendererFactory2,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  animationFrameScheduler,
  booleanAttribute,
  inject,
  interval,
  map,
  merge,
  numberAttribute,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵarrowFunction,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-23RKHPSU.js";

// node_modules/@angular/cdk/fesm2022/drag-drop.mjs
function deepCloneNode(node) {
  const clone = node.cloneNode(true);
  const descendantsWithId = clone.querySelectorAll("[id]");
  const nodeName = node.nodeName.toLowerCase();
  clone.removeAttribute("id");
  for (let i = 0; i < descendantsWithId.length; i++) {
    descendantsWithId[i].removeAttribute("id");
  }
  if (nodeName === "canvas") {
    transferCanvasData(node, clone);
  } else if (nodeName === "input" || nodeName === "select" || nodeName === "textarea") {
    transferInputData(node, clone);
  }
  transferData("canvas", node, clone, transferCanvasData);
  transferData("input, textarea, select", node, clone, transferInputData);
  return clone;
}
function transferData(selector, node, clone, callback) {
  const descendantElements = node.querySelectorAll(selector);
  if (descendantElements.length) {
    const cloneElements = clone.querySelectorAll(selector);
    for (let i = 0; i < descendantElements.length; i++) {
      callback(descendantElements[i], cloneElements[i]);
    }
  }
}
var cloneUniqueId = 0;
function transferInputData(source, clone) {
  if (clone.type !== "file") {
    clone.value = source.value;
  }
  if (clone.type === "radio" && clone.name) {
    clone.name = `mat-clone-${clone.name}-${cloneUniqueId++}`;
  }
}
function transferCanvasData(source, clone) {
  const context = clone.getContext("2d");
  if (context) {
    try {
      context.drawImage(source, 0, 0);
    } catch {
    }
  }
}
function getMutableClientRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  };
}
function isInsideClientRect(clientRect, x, y) {
  const {
    top,
    bottom,
    left,
    right
  } = clientRect;
  return y >= top && y <= bottom && x >= left && x <= right;
}
function isOverflowingParent(parentRect, childRect) {
  const isLeftOverflowing = childRect.left < parentRect.left;
  const isRightOverflowing = childRect.left + childRect.width > parentRect.right;
  const isTopOverflowing = childRect.top < parentRect.top;
  const isBottomOverflowing = childRect.top + childRect.height > parentRect.bottom;
  return isLeftOverflowing || isRightOverflowing || isTopOverflowing || isBottomOverflowing;
}
function adjustDomRect(domRect, top, left) {
  domRect.top += top;
  domRect.bottom = domRect.top + domRect.height;
  domRect.left += left;
  domRect.right = domRect.left + domRect.width;
}
function isPointerNearDomRect(rect, threshold, pointerX, pointerY) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = rect;
  const xThreshold = width * threshold;
  const yThreshold = height * threshold;
  return pointerY > top - yThreshold && pointerY < bottom + yThreshold && pointerX > left - xThreshold && pointerX < right + xThreshold;
}
var ParentPositionTracker = class {
  _document;
  positions = /* @__PURE__ */ new Map();
  constructor(_document) {
    this._document = _document;
  }
  clear() {
    this.positions.clear();
  }
  cache(elements) {
    this.clear();
    this.positions.set(this._document, {
      scrollPosition: this.getViewportScrollPosition()
    });
    elements.forEach((element) => {
      this.positions.set(element, {
        scrollPosition: {
          top: element.scrollTop,
          left: element.scrollLeft
        },
        clientRect: getMutableClientRect(element)
      });
    });
  }
  handleScroll(event) {
    const target = _getEventTarget(event);
    const cachedPosition = this.positions.get(target);
    if (!cachedPosition) {
      return null;
    }
    const scrollPosition = cachedPosition.scrollPosition;
    let newTop;
    let newLeft;
    if (target === this._document) {
      const viewportScrollPosition = this.getViewportScrollPosition();
      newTop = viewportScrollPosition.top;
      newLeft = viewportScrollPosition.left;
    } else {
      newTop = target.scrollTop;
      newLeft = target.scrollLeft;
    }
    const topDifference = scrollPosition.top - newTop;
    const leftDifference = scrollPosition.left - newLeft;
    this.positions.forEach((position, node) => {
      if (position.clientRect && target !== node && target.contains(node)) {
        adjustDomRect(position.clientRect, topDifference, leftDifference);
      }
    });
    scrollPosition.top = newTop;
    scrollPosition.left = newLeft;
    return {
      top: topDifference,
      left: leftDifference
    };
  }
  getViewportScrollPosition() {
    return {
      top: window.scrollY,
      left: window.scrollX
    };
  }
};
function getRootNode(viewRef, _document) {
  const rootNodes = viewRef.rootNodes;
  if (rootNodes.length === 1 && rootNodes[0].nodeType === _document.ELEMENT_NODE) {
    return rootNodes[0];
  }
  const wrapper = _document.createElement("div");
  rootNodes.forEach((node) => wrapper.appendChild(node));
  return wrapper;
}
function extendStyles(dest, source, importantProperties2) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      const value = source[key];
      if (value) {
        dest.setProperty(key, value, importantProperties2?.has(key) ? "important" : "");
      } else {
        dest.removeProperty(key);
      }
    }
  }
  return dest;
}
function toggleNativeDragInteractions(element, enable) {
  const userSelect = enable ? "" : "none";
  extendStyles(element.style, {
    "touch-action": enable ? "" : "none",
    "-webkit-user-drag": enable ? "" : "none",
    "-webkit-tap-highlight-color": enable ? "" : "transparent",
    "user-select": userSelect,
    "-ms-user-select": userSelect,
    "-webkit-user-select": userSelect,
    "-moz-user-select": userSelect
  });
}
function toggleVisibility(element, enable, importantProperties2) {
  extendStyles(element.style, {
    position: enable ? "" : "fixed",
    top: enable ? "" : "0",
    opacity: enable ? "" : "0",
    left: enable ? "" : "-999em"
  }, importantProperties2);
}
function combineTransforms(transform, initialTransform) {
  return initialTransform && initialTransform != "none" ? transform + " " + initialTransform : transform;
}
function matchElementSize(target, sourceRect) {
  target.style.width = `${sourceRect.width}px`;
  target.style.height = `${sourceRect.height}px`;
  target.style.transform = getTransform(sourceRect.left, sourceRect.top);
}
function getTransform(x, y) {
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
}
var capturingEventOptions = {
  capture: true
};
var activeCapturingEventOptions$1 = {
  passive: false,
  capture: true
};
var _ResetsLoader = class __ResetsLoader {
  static \u0275fac = function _ResetsLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __ResetsLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __ResetsLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["cdk-drag-resets-container", ""],
    decls: 0,
    vars: 0,
    template: function _ResetsLoader_Template(rf, ctx) {
    },
    styles: ["@layer cdk-resets {\n  .cdk-drag-preview {\n    background: none;\n    border: none;\n    padding: 0;\n    color: inherit;\n    inset: auto;\n  }\n}\n.cdk-drag-placeholder *,\n.cdk-drag-preview * {\n  pointer-events: none !important;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_ResetsLoader, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "cdk-drag-resets-container": ""
      },
      styles: ["@layer cdk-resets {\n  .cdk-drag-preview {\n    background: none;\n    border: none;\n    padding: 0;\n    color: inherit;\n    inset: auto;\n  }\n}\n.cdk-drag-placeholder *,\n.cdk-drag-preview * {\n  pointer-events: none !important;\n}\n"]
    }]
  }], null, null);
})();
var DragDropRegistry = class _DragDropRegistry {
  _ngZone = inject(NgZone);
  _document = inject(DOCUMENT);
  _styleLoader = inject(_CdkPrivateStyleLoader);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupDocumentTouchmove;
  _scroll = new Subject();
  _dropInstances = /* @__PURE__ */ new Set();
  _dragInstances = /* @__PURE__ */ new Set();
  _activeDragInstances = signal([], ...ngDevMode ? [{
    debugName: "_activeDragInstances"
  }] : []);
  _globalListeners;
  _draggingPredicate = (item) => item.isDragging();
  _domNodesToDirectives = null;
  pointerMove = new Subject();
  pointerUp = new Subject();
  constructor() {
  }
  registerDropContainer(drop) {
    if (!this._dropInstances.has(drop)) {
      this._dropInstances.add(drop);
    }
  }
  registerDragItem(drag) {
    this._dragInstances.add(drag);
    if (this._dragInstances.size === 1) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupDocumentTouchmove?.();
        this._cleanupDocumentTouchmove = this._renderer.listen(this._document, "touchmove", this._persistentTouchmoveListener, activeCapturingEventOptions$1);
      });
    }
  }
  removeDropContainer(drop) {
    this._dropInstances.delete(drop);
  }
  removeDragItem(drag) {
    this._dragInstances.delete(drag);
    this.stopDragging(drag);
    if (this._dragInstances.size === 0) {
      this._cleanupDocumentTouchmove?.();
    }
  }
  startDragging(drag, event) {
    if (this._activeDragInstances().indexOf(drag) > -1) {
      return;
    }
    this._styleLoader.load(_ResetsLoader);
    this._activeDragInstances.update((instances) => [...instances, drag]);
    if (this._activeDragInstances().length === 1) {
      const isTouchEvent2 = event.type.startsWith("touch");
      const endEventHandler = (e) => this.pointerUp.next(e);
      const toBind = [["scroll", (e) => this._scroll.next(e), capturingEventOptions], ["selectstart", this._preventDefaultWhileDragging, activeCapturingEventOptions$1]];
      if (isTouchEvent2) {
        toBind.push(["touchend", endEventHandler, capturingEventOptions], ["touchcancel", endEventHandler, capturingEventOptions]);
      } else {
        toBind.push(["mouseup", endEventHandler, capturingEventOptions]);
      }
      if (!isTouchEvent2) {
        toBind.push(["mousemove", (e) => this.pointerMove.next(e), activeCapturingEventOptions$1]);
      }
      this._ngZone.runOutsideAngular(() => {
        this._globalListeners = toBind.map(([name, handler, options]) => this._renderer.listen(this._document, name, handler, options));
      });
    }
  }
  stopDragging(drag) {
    this._activeDragInstances.update((instances) => {
      const index = instances.indexOf(drag);
      if (index > -1) {
        instances.splice(index, 1);
        return [...instances];
      }
      return instances;
    });
    if (this._activeDragInstances().length === 0) {
      this._clearGlobalListeners();
    }
  }
  isDragging(drag) {
    return this._activeDragInstances().indexOf(drag) > -1;
  }
  scrolled(shadowRoot) {
    const streams = [this._scroll];
    if (shadowRoot && shadowRoot !== this._document) {
      streams.push(new Observable((observer) => {
        return this._ngZone.runOutsideAngular(() => {
          const cleanup = this._renderer.listen(shadowRoot, "scroll", (event) => {
            if (this._activeDragInstances().length) {
              observer.next(event);
            }
          }, capturingEventOptions);
          return () => {
            cleanup();
          };
        });
      }));
    }
    return merge(...streams);
  }
  registerDirectiveNode(node, dragRef) {
    this._domNodesToDirectives ??= /* @__PURE__ */ new WeakMap();
    this._domNodesToDirectives.set(node, dragRef);
  }
  removeDirectiveNode(node) {
    this._domNodesToDirectives?.delete(node);
  }
  getDragDirectiveForNode(node) {
    return this._domNodesToDirectives?.get(node) || null;
  }
  ngOnDestroy() {
    this._dragInstances.forEach((instance) => this.removeDragItem(instance));
    this._dropInstances.forEach((instance) => this.removeDropContainer(instance));
    this._domNodesToDirectives = null;
    this._clearGlobalListeners();
    this.pointerMove.complete();
    this.pointerUp.complete();
  }
  _preventDefaultWhileDragging = (event) => {
    if (this._activeDragInstances().length > 0) {
      event.preventDefault();
    }
  };
  _persistentTouchmoveListener = (event) => {
    if (this._activeDragInstances().length > 0) {
      if (this._activeDragInstances().some(this._draggingPredicate)) {
        event.preventDefault();
      }
      this.pointerMove.next(event);
    }
  };
  _clearGlobalListeners() {
    this._globalListeners?.forEach((cleanup) => cleanup());
    this._globalListeners = void 0;
  }
  static \u0275fac = function DragDropRegistry_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DragDropRegistry)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _DragDropRegistry,
    factory: _DragDropRegistry.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDropRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function parseCssTimeUnitsToMs(value) {
  const multiplier = value.toLowerCase().indexOf("ms") > -1 ? 1 : 1e3;
  return parseFloat(value) * multiplier;
}
function getTransformTransitionDurationInMs(element) {
  const computedStyle = getComputedStyle(element);
  const transitionedProperties = parseCssPropertyValue(computedStyle, "transition-property");
  const property = transitionedProperties.find((prop) => prop === "transform" || prop === "all");
  if (!property) {
    return 0;
  }
  const propertyIndex = transitionedProperties.indexOf(property);
  const rawDurations = parseCssPropertyValue(computedStyle, "transition-duration");
  const rawDelays = parseCssPropertyValue(computedStyle, "transition-delay");
  return parseCssTimeUnitsToMs(rawDurations[propertyIndex]) + parseCssTimeUnitsToMs(rawDelays[propertyIndex]);
}
function parseCssPropertyValue(computedStyle, name) {
  const value = computedStyle.getPropertyValue(name);
  return value.split(",").map((part) => part.trim());
}
var importantProperties = /* @__PURE__ */ new Set(["position"]);
var PreviewRef = class {
  _document;
  _rootElement;
  _direction;
  _initialDomRect;
  _previewTemplate;
  _previewClass;
  _pickupPositionOnPage;
  _initialTransform;
  _zIndex;
  _renderer;
  _previewEmbeddedView = null;
  _preview;
  get element() {
    return this._preview;
  }
  constructor(_document, _rootElement, _direction, _initialDomRect, _previewTemplate, _previewClass, _pickupPositionOnPage, _initialTransform, _zIndex, _renderer) {
    this._document = _document;
    this._rootElement = _rootElement;
    this._direction = _direction;
    this._initialDomRect = _initialDomRect;
    this._previewTemplate = _previewTemplate;
    this._previewClass = _previewClass;
    this._pickupPositionOnPage = _pickupPositionOnPage;
    this._initialTransform = _initialTransform;
    this._zIndex = _zIndex;
    this._renderer = _renderer;
  }
  attach(parent) {
    this._preview = this._createPreview();
    parent.appendChild(this._preview);
    if (supportsPopover(this._preview)) {
      this._preview["showPopover"]();
    }
  }
  destroy() {
    this._preview.remove();
    this._previewEmbeddedView?.destroy();
    this._preview = this._previewEmbeddedView = null;
  }
  setTransform(value) {
    this._preview.style.transform = value;
  }
  getBoundingClientRect() {
    return this._preview.getBoundingClientRect();
  }
  addClass(className) {
    this._preview.classList.add(className);
  }
  getTransitionDuration() {
    return getTransformTransitionDurationInMs(this._preview);
  }
  addEventListener(name, handler) {
    return this._renderer.listen(this._preview, name, handler);
  }
  _createPreview() {
    const previewConfig = this._previewTemplate;
    const previewClass = this._previewClass;
    const previewTemplate = previewConfig ? previewConfig.template : null;
    let preview;
    if (previewTemplate && previewConfig) {
      const rootRect = previewConfig.matchSize ? this._initialDomRect : null;
      const viewRef = previewConfig.viewContainer.createEmbeddedView(previewTemplate, previewConfig.context);
      viewRef.detectChanges();
      preview = getRootNode(viewRef, this._document);
      this._previewEmbeddedView = viewRef;
      if (previewConfig.matchSize) {
        matchElementSize(preview, rootRect);
      } else {
        preview.style.transform = getTransform(this._pickupPositionOnPage.x, this._pickupPositionOnPage.y);
      }
    } else {
      preview = deepCloneNode(this._rootElement);
      matchElementSize(preview, this._initialDomRect);
      if (this._initialTransform) {
        preview.style.transform = this._initialTransform;
      }
    }
    extendStyles(preview.style, {
      "pointer-events": "none",
      "margin": supportsPopover(preview) ? "0 auto 0 0" : "0",
      "position": "fixed",
      "top": "0",
      "left": "0",
      "z-index": this._zIndex + ""
    }, importantProperties);
    toggleNativeDragInteractions(preview, false);
    preview.classList.add("cdk-drag-preview");
    preview.setAttribute("popover", "manual");
    preview.setAttribute("dir", this._direction);
    if (previewClass) {
      if (Array.isArray(previewClass)) {
        previewClass.forEach((className) => preview.classList.add(className));
      } else {
        preview.classList.add(previewClass);
      }
    }
    return preview;
  }
};
function supportsPopover(element) {
  return "showPopover" in element;
}
var passiveEventListenerOptions = {
  passive: true
};
var activeEventListenerOptions = {
  passive: false
};
var activeCapturingEventOptions = {
  passive: false,
  capture: true
};
var MOUSE_EVENT_IGNORE_TIME = 800;
var PLACEHOLDER_CLASS = "cdk-drag-placeholder";
var dragImportantProperties = /* @__PURE__ */ new Set(["position"]);
function createDragRef(injector, element, config = {
  dragStartThreshold: 5,
  pointerDirectionChangeThreshold: 5
}) {
  const renderer = injector.get(Renderer2, null, {
    optional: true
  }) || injector.get(RendererFactory2).createRenderer(null, null);
  return new DragRef(element, config, injector.get(DOCUMENT), injector.get(NgZone), injector.get(ViewportRuler), injector.get(DragDropRegistry), renderer);
}
var DragRef = class {
  _config;
  _document;
  _ngZone;
  _viewportRuler;
  _dragDropRegistry;
  _renderer;
  _rootElementCleanups;
  _cleanupShadowRootSelectStart;
  _preview = null;
  _previewContainer;
  _placeholderRef = null;
  _placeholder;
  _pickupPositionInElement;
  _pickupPositionOnPage;
  _marker;
  _anchor = null;
  _passiveTransform = {
    x: 0,
    y: 0
  };
  _activeTransform = {
    x: 0,
    y: 0
  };
  _initialTransform;
  _hasStartedDragging = signal(false, ...ngDevMode ? [{
    debugName: "_hasStartedDragging"
  }] : []);
  _hasMoved = false;
  _initialContainer;
  _initialIndex;
  _parentPositions;
  _moveEvents = new Subject();
  _pointerDirectionDelta;
  _pointerPositionAtLastDirectionChange;
  _lastKnownPointerPosition;
  _rootElement;
  _ownerSVGElement = null;
  _rootElementTapHighlight;
  _pointerMoveSubscription = Subscription.EMPTY;
  _pointerUpSubscription = Subscription.EMPTY;
  _scrollSubscription = Subscription.EMPTY;
  _resizeSubscription = Subscription.EMPTY;
  _lastTouchEventTime;
  _dragStartTime;
  _boundaryElement = null;
  _nativeInteractionsEnabled = true;
  _initialDomRect;
  _previewRect;
  _boundaryRect;
  _previewTemplate;
  _placeholderTemplate;
  _handles = [];
  _disabledHandles = /* @__PURE__ */ new Set();
  _dropContainer;
  _direction = "ltr";
  _parentDragRef = null;
  _cachedShadowRoot;
  lockAxis = null;
  dragStartDelay = 0;
  previewClass;
  scale = 1;
  get disabled() {
    return this._disabled || !!(this._dropContainer && this._dropContainer.disabled);
  }
  set disabled(value) {
    if (value !== this._disabled) {
      this._disabled = value;
      this._toggleNativeDragInteractions();
      this._handles.forEach((handle) => toggleNativeDragInteractions(handle, value));
    }
  }
  _disabled = false;
  beforeStarted = new Subject();
  started = new Subject();
  released = new Subject();
  ended = new Subject();
  entered = new Subject();
  exited = new Subject();
  dropped = new Subject();
  moved = this._moveEvents;
  data;
  constrainPosition;
  constructor(element, _config, _document, _ngZone, _viewportRuler, _dragDropRegistry, _renderer) {
    this._config = _config;
    this._document = _document;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._dragDropRegistry = _dragDropRegistry;
    this._renderer = _renderer;
    this.withRootElement(element).withParent(_config.parentDragRef || null);
    this._parentPositions = new ParentPositionTracker(_document);
    _dragDropRegistry.registerDragItem(this);
  }
  getPlaceholderElement() {
    return this._placeholder;
  }
  getRootElement() {
    return this._rootElement;
  }
  getVisibleElement() {
    return this.isDragging() ? this.getPlaceholderElement() : this.getRootElement();
  }
  withHandles(handles) {
    this._handles = handles.map((handle) => coerceElement(handle));
    this._handles.forEach((handle) => toggleNativeDragInteractions(handle, this.disabled));
    this._toggleNativeDragInteractions();
    const disabledHandles = /* @__PURE__ */ new Set();
    this._disabledHandles.forEach((handle) => {
      if (this._handles.indexOf(handle) > -1) {
        disabledHandles.add(handle);
      }
    });
    this._disabledHandles = disabledHandles;
    return this;
  }
  withPreviewTemplate(template) {
    this._previewTemplate = template;
    return this;
  }
  withPlaceholderTemplate(template) {
    this._placeholderTemplate = template;
    return this;
  }
  withRootElement(rootElement) {
    const element = coerceElement(rootElement);
    if (element !== this._rootElement) {
      this._removeRootElementListeners();
      const renderer = this._renderer;
      this._rootElementCleanups = this._ngZone.runOutsideAngular(() => [renderer.listen(element, "mousedown", this._pointerDown, activeEventListenerOptions), renderer.listen(element, "touchstart", this._pointerDown, passiveEventListenerOptions), renderer.listen(element, "dragstart", this._nativeDragStart, activeEventListenerOptions)]);
      this._initialTransform = void 0;
      this._rootElement = element;
    }
    if (typeof SVGElement !== "undefined" && this._rootElement instanceof SVGElement) {
      this._ownerSVGElement = this._rootElement.ownerSVGElement;
    }
    return this;
  }
  withBoundaryElement(boundaryElement) {
    this._boundaryElement = boundaryElement ? coerceElement(boundaryElement) : null;
    this._resizeSubscription.unsubscribe();
    if (boundaryElement) {
      this._resizeSubscription = this._viewportRuler.change(10).subscribe(() => this._containInsideBoundaryOnResize());
    }
    return this;
  }
  withParent(parent) {
    this._parentDragRef = parent;
    return this;
  }
  dispose() {
    this._removeRootElementListeners();
    if (this.isDragging()) {
      this._rootElement?.remove();
    }
    this._marker?.remove();
    this._destroyPreview();
    this._destroyPlaceholder();
    this._dragDropRegistry.removeDragItem(this);
    this._removeListeners();
    this.beforeStarted.complete();
    this.started.complete();
    this.released.complete();
    this.ended.complete();
    this.entered.complete();
    this.exited.complete();
    this.dropped.complete();
    this._moveEvents.complete();
    this._handles = [];
    this._disabledHandles.clear();
    this._dropContainer = void 0;
    this._resizeSubscription.unsubscribe();
    this._parentPositions.clear();
    this._boundaryElement = this._rootElement = this._ownerSVGElement = this._placeholderTemplate = this._previewTemplate = this._marker = this._parentDragRef = null;
  }
  isDragging() {
    return this._hasStartedDragging() && this._dragDropRegistry.isDragging(this);
  }
  reset() {
    this._rootElement.style.transform = this._initialTransform || "";
    this._activeTransform = {
      x: 0,
      y: 0
    };
    this._passiveTransform = {
      x: 0,
      y: 0
    };
  }
  resetToBoundary() {
    if (this._boundaryElement && this._rootElement && isOverflowingParent(this._boundaryElement.getBoundingClientRect(), this._rootElement.getBoundingClientRect())) {
      const parentRect = this._boundaryElement.getBoundingClientRect();
      const childRect = this._rootElement.getBoundingClientRect();
      let offsetX = 0;
      let offsetY = 0;
      if (childRect.left < parentRect.left) {
        offsetX = parentRect.left - childRect.left;
      } else if (childRect.right > parentRect.right) {
        offsetX = parentRect.right - childRect.right;
      }
      if (childRect.top < parentRect.top) {
        offsetY = parentRect.top - childRect.top;
      } else if (childRect.bottom > parentRect.bottom) {
        offsetY = parentRect.bottom - childRect.bottom;
      }
      const currentLeft = this._activeTransform.x;
      const currentTop = this._activeTransform.y;
      let x = currentLeft + offsetX, y = currentTop + offsetY;
      this._rootElement.style.transform = getTransform(x, y);
      this._activeTransform = {
        x,
        y
      };
      this._passiveTransform = {
        x,
        y
      };
    }
  }
  disableHandle(handle) {
    if (!this._disabledHandles.has(handle) && this._handles.indexOf(handle) > -1) {
      this._disabledHandles.add(handle);
      toggleNativeDragInteractions(handle, true);
    }
  }
  enableHandle(handle) {
    if (this._disabledHandles.has(handle)) {
      this._disabledHandles.delete(handle);
      toggleNativeDragInteractions(handle, this.disabled);
    }
  }
  withDirection(direction) {
    this._direction = direction;
    return this;
  }
  _withDropContainer(container) {
    this._dropContainer = container;
  }
  getFreeDragPosition() {
    const position = this.isDragging() ? this._activeTransform : this._passiveTransform;
    return {
      x: position.x,
      y: position.y
    };
  }
  setFreeDragPosition(value) {
    this._activeTransform = {
      x: 0,
      y: 0
    };
    this._passiveTransform.x = value.x;
    this._passiveTransform.y = value.y;
    if (!this._dropContainer) {
      this._applyRootElementTransform(value.x, value.y);
    }
    return this;
  }
  withPreviewContainer(value) {
    this._previewContainer = value;
    return this;
  }
  _sortFromLastPointerPosition() {
    const position = this._lastKnownPointerPosition;
    if (position && this._dropContainer) {
      this._updateActiveDropContainer(this._getConstrainedPointerPosition(position), position);
    }
  }
  _removeListeners() {
    this._pointerMoveSubscription.unsubscribe();
    this._pointerUpSubscription.unsubscribe();
    this._scrollSubscription.unsubscribe();
    this._cleanupShadowRootSelectStart?.();
    this._cleanupShadowRootSelectStart = void 0;
  }
  _destroyPreview() {
    this._preview?.destroy();
    this._preview = null;
  }
  _destroyPlaceholder() {
    this._anchor?.remove();
    this._placeholder?.remove();
    this._placeholderRef?.destroy();
    this._placeholder = this._anchor = this._placeholderRef = null;
  }
  _pointerDown = (event) => {
    this.beforeStarted.next();
    if (this._handles.length) {
      const targetHandle = this._getTargetHandle(event);
      if (targetHandle && !this._disabledHandles.has(targetHandle) && !this.disabled) {
        this._initializeDragSequence(targetHandle, event);
      }
    } else if (!this.disabled) {
      this._initializeDragSequence(this._rootElement, event);
    }
  };
  _pointerMove = (event) => {
    const pointerPosition = this._getPointerPositionOnPage(event);
    if (!this._hasStartedDragging()) {
      const distanceX = Math.abs(pointerPosition.x - this._pickupPositionOnPage.x);
      const distanceY = Math.abs(pointerPosition.y - this._pickupPositionOnPage.y);
      const isOverThreshold = distanceX + distanceY >= this._config.dragStartThreshold;
      if (isOverThreshold) {
        const isDelayElapsed = Date.now() >= this._dragStartTime + this._getDragStartDelay(event);
        const container = this._dropContainer;
        if (!isDelayElapsed) {
          this._endDragSequence(event);
          return;
        }
        if (!container || !container.isDragging() && !container.isReceiving()) {
          if (event.cancelable) {
            event.preventDefault();
          }
          this._hasStartedDragging.set(true);
          this._ngZone.run(() => this._startDragSequence(event));
        }
      }
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    const constrainedPointerPosition = this._getConstrainedPointerPosition(pointerPosition);
    this._hasMoved = true;
    this._lastKnownPointerPosition = pointerPosition;
    this._updatePointerDirectionDelta(constrainedPointerPosition);
    if (this._dropContainer) {
      this._updateActiveDropContainer(constrainedPointerPosition, pointerPosition);
    } else {
      const offset = this.constrainPosition ? this._initialDomRect : this._pickupPositionOnPage;
      const activeTransform = this._activeTransform;
      activeTransform.x = constrainedPointerPosition.x - offset.x + this._passiveTransform.x;
      activeTransform.y = constrainedPointerPosition.y - offset.y + this._passiveTransform.y;
      this._applyRootElementTransform(activeTransform.x, activeTransform.y);
    }
    if (this._moveEvents.observers.length) {
      this._ngZone.run(() => {
        this._moveEvents.next({
          source: this,
          pointerPosition: constrainedPointerPosition,
          event,
          distance: this._getDragDistance(constrainedPointerPosition),
          delta: this._pointerDirectionDelta
        });
      });
    }
  };
  _pointerUp = (event) => {
    this._endDragSequence(event);
  };
  _endDragSequence(event) {
    if (!this._dragDropRegistry.isDragging(this)) {
      return;
    }
    this._removeListeners();
    this._dragDropRegistry.stopDragging(this);
    this._toggleNativeDragInteractions();
    if (this._handles) {
      this._rootElement.style.webkitTapHighlightColor = this._rootElementTapHighlight;
    }
    if (!this._hasStartedDragging()) {
      return;
    }
    this.released.next({
      source: this,
      event
    });
    if (this._dropContainer) {
      this._dropContainer._stopScrolling();
      this._animatePreviewToPlaceholder().then(() => {
        this._cleanupDragArtifacts(event);
        this._cleanupCachedDimensions();
        this._dragDropRegistry.stopDragging(this);
      });
    } else {
      this._passiveTransform.x = this._activeTransform.x;
      const pointerPosition = this._getPointerPositionOnPage(event);
      this._passiveTransform.y = this._activeTransform.y;
      this._ngZone.run(() => {
        this.ended.next({
          source: this,
          distance: this._getDragDistance(pointerPosition),
          dropPoint: pointerPosition,
          event
        });
      });
      this._cleanupCachedDimensions();
      this._dragDropRegistry.stopDragging(this);
    }
  }
  _startDragSequence(event) {
    if (isTouchEvent(event)) {
      this._lastTouchEventTime = Date.now();
    }
    this._toggleNativeDragInteractions();
    const shadowRoot = this._getShadowRoot();
    const dropContainer = this._dropContainer;
    if (shadowRoot) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupShadowRootSelectStart = this._renderer.listen(shadowRoot, "selectstart", shadowDomSelectStart, activeCapturingEventOptions);
      });
    }
    if (dropContainer) {
      const element = this._rootElement;
      const parent = element.parentNode;
      const placeholder = this._placeholder = this._createPlaceholderElement();
      const marker = this._marker = this._marker || this._document.createComment(typeof ngDevMode === "undefined" || ngDevMode ? "cdk-drag-marker" : "");
      parent.insertBefore(marker, element);
      this._initialTransform = element.style.transform || "";
      this._preview = new PreviewRef(this._document, this._rootElement, this._direction, this._initialDomRect, this._previewTemplate || null, this.previewClass || null, this._pickupPositionOnPage, this._initialTransform, this._config.zIndex || 1e3, this._renderer);
      this._preview.attach(this._getPreviewInsertionPoint(parent, shadowRoot));
      toggleVisibility(element, false, dragImportantProperties);
      this._document.body.appendChild(parent.replaceChild(placeholder, element));
      this.started.next({
        source: this,
        event
      });
      dropContainer.start();
      this._initialContainer = dropContainer;
      this._initialIndex = dropContainer.getItemIndex(this);
    } else {
      this.started.next({
        source: this,
        event
      });
      this._initialContainer = this._initialIndex = void 0;
    }
    this._parentPositions.cache(dropContainer ? dropContainer.getScrollableParents() : []);
  }
  _initializeDragSequence(referenceElement, event) {
    if (this._parentDragRef) {
      event.stopPropagation();
    }
    const isDragging = this.isDragging();
    const isTouchSequence = isTouchEvent(event);
    const isAuxiliaryMouseButton = !isTouchSequence && event.button !== 0;
    const rootElement = this._rootElement;
    const target = _getEventTarget(event);
    const isSyntheticEvent = !isTouchSequence && this._lastTouchEventTime && this._lastTouchEventTime + MOUSE_EVENT_IGNORE_TIME > Date.now();
    const isFakeEvent = isTouchSequence ? isFakeTouchstartFromScreenReader(event) : isFakeMousedownFromScreenReader(event);
    if (target && target.draggable && event.type === "mousedown") {
      event.preventDefault();
    }
    if (isDragging || isAuxiliaryMouseButton || isSyntheticEvent || isFakeEvent) {
      return;
    }
    if (this._handles.length) {
      const rootStyles = rootElement.style;
      this._rootElementTapHighlight = rootStyles.webkitTapHighlightColor || "";
      rootStyles.webkitTapHighlightColor = "transparent";
    }
    this._hasMoved = false;
    this._hasStartedDragging.set(this._hasMoved);
    this._removeListeners();
    this._initialDomRect = this._rootElement.getBoundingClientRect();
    this._pointerMoveSubscription = this._dragDropRegistry.pointerMove.subscribe(this._pointerMove);
    this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp);
    this._scrollSubscription = this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe((scrollEvent) => this._updateOnScroll(scrollEvent));
    if (this._boundaryElement) {
      this._boundaryRect = getMutableClientRect(this._boundaryElement);
    }
    const previewTemplate = this._previewTemplate;
    this._pickupPositionInElement = previewTemplate && previewTemplate.template && !previewTemplate.matchSize ? {
      x: 0,
      y: 0
    } : this._getPointerPositionInElement(this._initialDomRect, referenceElement, event);
    const pointerPosition = this._pickupPositionOnPage = this._lastKnownPointerPosition = this._getPointerPositionOnPage(event);
    this._pointerDirectionDelta = {
      x: 0,
      y: 0
    };
    this._pointerPositionAtLastDirectionChange = {
      x: pointerPosition.x,
      y: pointerPosition.y
    };
    this._dragStartTime = Date.now();
    this._dragDropRegistry.startDragging(this, event);
  }
  _cleanupDragArtifacts(event) {
    toggleVisibility(this._rootElement, true, dragImportantProperties);
    this._marker.parentNode.replaceChild(this._rootElement, this._marker);
    this._destroyPreview();
    this._destroyPlaceholder();
    this._initialDomRect = this._boundaryRect = this._previewRect = this._initialTransform = void 0;
    this._ngZone.run(() => {
      const container = this._dropContainer;
      const currentIndex = container.getItemIndex(this);
      const pointerPosition = this._getPointerPositionOnPage(event);
      const distance = this._getDragDistance(pointerPosition);
      const isPointerOverContainer = container._isOverContainer(pointerPosition.x, pointerPosition.y);
      this.ended.next({
        source: this,
        distance,
        dropPoint: pointerPosition,
        event
      });
      this.dropped.next({
        item: this,
        currentIndex,
        previousIndex: this._initialIndex,
        container,
        previousContainer: this._initialContainer,
        isPointerOverContainer,
        distance,
        dropPoint: pointerPosition,
        event
      });
      container.drop(this, currentIndex, this._initialIndex, this._initialContainer, isPointerOverContainer, distance, pointerPosition, event);
      this._dropContainer = this._initialContainer;
    });
  }
  _updateActiveDropContainer({
    x,
    y
  }, {
    x: rawX,
    y: rawY
  }) {
    let newContainer = this._initialContainer._getSiblingContainerFromPosition(this, x, y);
    if (!newContainer && this._dropContainer !== this._initialContainer && this._initialContainer._isOverContainer(x, y)) {
      newContainer = this._initialContainer;
    }
    if (newContainer && newContainer !== this._dropContainer) {
      this._ngZone.run(() => {
        const exitIndex = this._dropContainer.getItemIndex(this);
        const nextItemElement = this._dropContainer.getItemAtIndex(exitIndex + 1)?.getVisibleElement() || null;
        this.exited.next({
          item: this,
          container: this._dropContainer
        });
        this._dropContainer.exit(this);
        this._conditionallyInsertAnchor(newContainer, this._dropContainer, nextItemElement);
        this._dropContainer = newContainer;
        this._dropContainer.enter(this, x, y, newContainer === this._initialContainer && newContainer.sortingDisabled ? this._initialIndex : void 0);
        this.entered.next({
          item: this,
          container: newContainer,
          currentIndex: newContainer.getItemIndex(this)
        });
      });
    }
    if (this.isDragging()) {
      this._dropContainer._startScrollingIfNecessary(rawX, rawY);
      this._dropContainer._sortItem(this, x, y, this._pointerDirectionDelta);
      if (this.constrainPosition) {
        this._applyPreviewTransform(x, y);
      } else {
        this._applyPreviewTransform(x - this._pickupPositionInElement.x, y - this._pickupPositionInElement.y);
      }
    }
  }
  _animatePreviewToPlaceholder() {
    if (!this._hasMoved) {
      return Promise.resolve();
    }
    const placeholderRect = this._placeholder.getBoundingClientRect();
    this._preview.addClass("cdk-drag-animating");
    this._applyPreviewTransform(placeholderRect.left, placeholderRect.top);
    const duration = this._preview.getTransitionDuration();
    if (duration === 0) {
      return Promise.resolve();
    }
    return this._ngZone.runOutsideAngular(() => {
      return new Promise((resolve) => {
        const handler = (event) => {
          if (!event || this._preview && _getEventTarget(event) === this._preview.element && event.propertyName === "transform") {
            cleanupListener();
            resolve();
            clearTimeout(timeout);
          }
        };
        const timeout = setTimeout(handler, duration * 1.5);
        const cleanupListener = this._preview.addEventListener("transitionend", handler);
      });
    });
  }
  _createPlaceholderElement() {
    const placeholderConfig = this._placeholderTemplate;
    const placeholderTemplate = placeholderConfig ? placeholderConfig.template : null;
    let placeholder;
    if (placeholderTemplate) {
      this._placeholderRef = placeholderConfig.viewContainer.createEmbeddedView(placeholderTemplate, placeholderConfig.context);
      this._placeholderRef.detectChanges();
      placeholder = getRootNode(this._placeholderRef, this._document);
    } else {
      placeholder = deepCloneNode(this._rootElement);
    }
    placeholder.style.pointerEvents = "none";
    placeholder.classList.add(PLACEHOLDER_CLASS);
    return placeholder;
  }
  _getPointerPositionInElement(elementRect, referenceElement, event) {
    const handleElement = referenceElement === this._rootElement ? null : referenceElement;
    const referenceRect = handleElement ? handleElement.getBoundingClientRect() : elementRect;
    const point = isTouchEvent(event) ? event.targetTouches[0] : event;
    const scrollPosition = this._getViewportScrollPosition();
    const x = point.pageX - referenceRect.left - scrollPosition.left;
    const y = point.pageY - referenceRect.top - scrollPosition.top;
    return {
      x: referenceRect.left - elementRect.left + x,
      y: referenceRect.top - elementRect.top + y
    };
  }
  _getPointerPositionOnPage(event) {
    const scrollPosition = this._getViewportScrollPosition();
    const point = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] || {
      pageX: 0,
      pageY: 0
    } : event;
    const x = point.pageX - scrollPosition.left;
    const y = point.pageY - scrollPosition.top;
    if (this._ownerSVGElement) {
      const svgMatrix = this._ownerSVGElement.getScreenCTM();
      if (svgMatrix) {
        const svgPoint = this._ownerSVGElement.createSVGPoint();
        svgPoint.x = x;
        svgPoint.y = y;
        return svgPoint.matrixTransform(svgMatrix.inverse());
      }
    }
    return {
      x,
      y
    };
  }
  _getConstrainedPointerPosition(point) {
    const dropContainerLock = this._dropContainer ? this._dropContainer.lockAxis : null;
    let {
      x,
      y
    } = this.constrainPosition ? this.constrainPosition(point, this, this._initialDomRect, this._pickupPositionInElement) : point;
    if (this.lockAxis === "x" || dropContainerLock === "x") {
      y = this._pickupPositionOnPage.y - (this.constrainPosition ? this._pickupPositionInElement.y : 0);
    } else if (this.lockAxis === "y" || dropContainerLock === "y") {
      x = this._pickupPositionOnPage.x - (this.constrainPosition ? this._pickupPositionInElement.x : 0);
    }
    if (this._boundaryRect) {
      const {
        x: pickupX,
        y: pickupY
      } = !this.constrainPosition ? this._pickupPositionInElement : {
        x: 0,
        y: 0
      };
      const boundaryRect = this._boundaryRect;
      const {
        width: previewWidth,
        height: previewHeight
      } = this._getPreviewRect();
      const minY = boundaryRect.top + pickupY;
      const maxY = boundaryRect.bottom - (previewHeight - pickupY);
      const minX = boundaryRect.left + pickupX;
      const maxX = boundaryRect.right - (previewWidth - pickupX);
      x = clamp$1(x, minX, maxX);
      y = clamp$1(y, minY, maxY);
    }
    return {
      x,
      y
    };
  }
  _updatePointerDirectionDelta(pointerPositionOnPage) {
    const {
      x,
      y
    } = pointerPositionOnPage;
    const delta = this._pointerDirectionDelta;
    const positionSinceLastChange = this._pointerPositionAtLastDirectionChange;
    const changeX = Math.abs(x - positionSinceLastChange.x);
    const changeY = Math.abs(y - positionSinceLastChange.y);
    if (changeX > this._config.pointerDirectionChangeThreshold) {
      delta.x = x > positionSinceLastChange.x ? 1 : -1;
      positionSinceLastChange.x = x;
    }
    if (changeY > this._config.pointerDirectionChangeThreshold) {
      delta.y = y > positionSinceLastChange.y ? 1 : -1;
      positionSinceLastChange.y = y;
    }
    return delta;
  }
  _toggleNativeDragInteractions() {
    if (!this._rootElement || !this._handles) {
      return;
    }
    const shouldEnable = this._handles.length > 0 || !this.isDragging();
    if (shouldEnable !== this._nativeInteractionsEnabled) {
      this._nativeInteractionsEnabled = shouldEnable;
      toggleNativeDragInteractions(this._rootElement, shouldEnable);
    }
  }
  _removeRootElementListeners() {
    this._rootElementCleanups?.forEach((cleanup) => cleanup());
    this._rootElementCleanups = void 0;
  }
  _applyRootElementTransform(x, y) {
    const scale = 1 / this.scale;
    const transform = getTransform(x * scale, y * scale);
    const styles = this._rootElement.style;
    if (this._initialTransform == null) {
      this._initialTransform = styles.transform && styles.transform != "none" ? styles.transform : "";
    }
    styles.transform = combineTransforms(transform, this._initialTransform);
  }
  _applyPreviewTransform(x, y) {
    const initialTransform = this._previewTemplate?.template ? void 0 : this._initialTransform;
    const transform = getTransform(x, y);
    this._preview.setTransform(combineTransforms(transform, initialTransform));
  }
  _getDragDistance(currentPosition) {
    const pickupPosition = this._pickupPositionOnPage;
    if (pickupPosition) {
      return {
        x: currentPosition.x - pickupPosition.x,
        y: currentPosition.y - pickupPosition.y
      };
    }
    return {
      x: 0,
      y: 0
    };
  }
  _cleanupCachedDimensions() {
    this._boundaryRect = this._previewRect = void 0;
    this._parentPositions.clear();
  }
  _containInsideBoundaryOnResize() {
    let {
      x,
      y
    } = this._passiveTransform;
    if (x === 0 && y === 0 || this.isDragging() || !this._boundaryElement) {
      return;
    }
    const elementRect = this._rootElement.getBoundingClientRect();
    const boundaryRect = this._boundaryElement.getBoundingClientRect();
    if (boundaryRect.width === 0 && boundaryRect.height === 0 || elementRect.width === 0 && elementRect.height === 0) {
      return;
    }
    const leftOverflow = boundaryRect.left - elementRect.left;
    const rightOverflow = elementRect.right - boundaryRect.right;
    const topOverflow = boundaryRect.top - elementRect.top;
    const bottomOverflow = elementRect.bottom - boundaryRect.bottom;
    if (boundaryRect.width > elementRect.width) {
      if (leftOverflow > 0) {
        x += leftOverflow;
      }
      if (rightOverflow > 0) {
        x -= rightOverflow;
      }
    } else {
      x = 0;
    }
    if (boundaryRect.height > elementRect.height) {
      if (topOverflow > 0) {
        y += topOverflow;
      }
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
      }
    } else {
      y = 0;
    }
    if (x !== this._passiveTransform.x || y !== this._passiveTransform.y) {
      this.setFreeDragPosition({
        y,
        x
      });
    }
  }
  _getDragStartDelay(event) {
    const value = this.dragStartDelay;
    if (typeof value === "number") {
      return value;
    } else if (isTouchEvent(event)) {
      return value.touch;
    }
    return value ? value.mouse : 0;
  }
  _updateOnScroll(event) {
    const scrollDifference = this._parentPositions.handleScroll(event);
    if (scrollDifference) {
      const target = _getEventTarget(event);
      if (this._boundaryRect && target !== this._boundaryElement && target.contains(this._boundaryElement)) {
        adjustDomRect(this._boundaryRect, scrollDifference.top, scrollDifference.left);
      }
      this._pickupPositionOnPage.x += scrollDifference.left;
      this._pickupPositionOnPage.y += scrollDifference.top;
      if (!this._dropContainer) {
        this._activeTransform.x -= scrollDifference.left;
        this._activeTransform.y -= scrollDifference.top;
        this._applyRootElementTransform(this._activeTransform.x, this._activeTransform.y);
      }
    }
  }
  _getViewportScrollPosition() {
    return this._parentPositions.positions.get(this._document)?.scrollPosition || this._parentPositions.getViewportScrollPosition();
  }
  _getShadowRoot() {
    if (this._cachedShadowRoot === void 0) {
      this._cachedShadowRoot = _getShadowRoot(this._rootElement);
    }
    return this._cachedShadowRoot;
  }
  _getPreviewInsertionPoint(initialParent, shadowRoot) {
    const previewContainer = this._previewContainer || "global";
    if (previewContainer === "parent") {
      return initialParent;
    }
    if (previewContainer === "global") {
      const documentRef = this._document;
      return shadowRoot || documentRef.fullscreenElement || documentRef.webkitFullscreenElement || documentRef.mozFullScreenElement || documentRef.msFullscreenElement || documentRef.body;
    }
    return coerceElement(previewContainer);
  }
  _getPreviewRect() {
    if (!this._previewRect || !this._previewRect.width && !this._previewRect.height) {
      this._previewRect = this._preview ? this._preview.getBoundingClientRect() : this._initialDomRect;
    }
    return this._previewRect;
  }
  _nativeDragStart = (event) => {
    if (this._handles.length) {
      const targetHandle = this._getTargetHandle(event);
      if (targetHandle && !this._disabledHandles.has(targetHandle) && !this.disabled) {
        event.preventDefault();
      }
    } else if (!this.disabled) {
      event.preventDefault();
    }
  };
  _getTargetHandle(event) {
    return this._handles.find((handle) => {
      return event.target && (event.target === handle || handle.contains(event.target));
    });
  }
  _conditionallyInsertAnchor(newContainer, exitContainer, nextItemElement) {
    if (newContainer === this._initialContainer) {
      this._anchor?.remove();
      this._anchor = null;
    } else if (exitContainer === this._initialContainer && exitContainer.hasAnchor) {
      const anchor = this._anchor ??= deepCloneNode(this._placeholder);
      anchor.classList.remove(PLACEHOLDER_CLASS);
      anchor.classList.add("cdk-drag-anchor");
      anchor.style.transform = "";
      if (nextItemElement) {
        nextItemElement.before(anchor);
      } else {
        coerceElement(exitContainer.element).appendChild(anchor);
      }
    }
  }
};
function clamp$1(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function isTouchEvent(event) {
  return event.type[0] === "t";
}
function shadowDomSelectStart(event) {
  event.preventDefault();
}
function moveItemInArray(array, fromIndex, toIndex) {
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);
  if (from === to) {
    return;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
}
function transferArrayItem(currentArray, targetArray, currentIndex, targetIndex) {
  const from = clamp(currentIndex, currentArray.length - 1);
  const to = clamp(targetIndex, targetArray.length);
  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray.splice(from, 1)[0]);
  }
}
function clamp(value, max) {
  return Math.max(0, Math.min(max, value));
}
var SingleAxisSortStrategy = class {
  _dragDropRegistry;
  _element;
  _sortPredicate;
  _itemPositions = [];
  _activeDraggables;
  orientation = "vertical";
  direction = "ltr";
  constructor(_dragDropRegistry) {
    this._dragDropRegistry = _dragDropRegistry;
  }
  _previousSwap = {
    drag: null,
    delta: 0,
    overlaps: false
  };
  start(items) {
    this.withItems(items);
  }
  sort(item, pointerX, pointerY, pointerDelta) {
    const siblings = this._itemPositions;
    const newIndex = this._getItemIndexFromPointerPosition(item, pointerX, pointerY, pointerDelta);
    if (newIndex === -1 && siblings.length > 0) {
      return null;
    }
    const isHorizontal = this.orientation === "horizontal";
    const currentIndex = siblings.findIndex((currentItem) => currentItem.drag === item);
    const siblingAtNewPosition = siblings[newIndex];
    const currentPosition = siblings[currentIndex].clientRect;
    const newPosition = siblingAtNewPosition.clientRect;
    const delta = currentIndex > newIndex ? 1 : -1;
    const itemOffset = this._getItemOffsetPx(currentPosition, newPosition, delta);
    const siblingOffset = this._getSiblingOffsetPx(currentIndex, siblings, delta);
    const oldOrder = siblings.slice();
    moveItemInArray(siblings, currentIndex, newIndex);
    siblings.forEach((sibling, index) => {
      if (oldOrder[index] === sibling) {
        return;
      }
      const isDraggedItem = sibling.drag === item;
      const offset = isDraggedItem ? itemOffset : siblingOffset;
      const elementToOffset = isDraggedItem ? item.getPlaceholderElement() : sibling.drag.getRootElement();
      sibling.offset += offset;
      const transformAmount = Math.round(sibling.offset * (1 / sibling.drag.scale));
      if (isHorizontal) {
        elementToOffset.style.transform = combineTransforms(`translate3d(${transformAmount}px, 0, 0)`, sibling.initialTransform);
        adjustDomRect(sibling.clientRect, 0, offset);
      } else {
        elementToOffset.style.transform = combineTransforms(`translate3d(0, ${transformAmount}px, 0)`, sibling.initialTransform);
        adjustDomRect(sibling.clientRect, offset, 0);
      }
    });
    this._previousSwap.overlaps = isInsideClientRect(newPosition, pointerX, pointerY);
    this._previousSwap.drag = siblingAtNewPosition.drag;
    this._previousSwap.delta = isHorizontal ? pointerDelta.x : pointerDelta.y;
    return {
      previousIndex: currentIndex,
      currentIndex: newIndex
    };
  }
  enter(item, pointerX, pointerY, index) {
    const activeDraggables = this._activeDraggables;
    const currentIndex = activeDraggables.indexOf(item);
    const placeholder = item.getPlaceholderElement();
    if (currentIndex > -1) {
      activeDraggables.splice(currentIndex, 1);
    }
    const newIndex = index == null || index < 0 ? this._getItemIndexFromPointerPosition(item, pointerX, pointerY) : index;
    let newPositionReference = activeDraggables[newIndex];
    if (newPositionReference === item) {
      newPositionReference = activeDraggables[newIndex + 1];
    }
    if (!newPositionReference && (newIndex == null || newIndex === -1 || newIndex < activeDraggables.length - 1) && this._shouldEnterAsFirstChild(pointerX, pointerY)) {
      newPositionReference = activeDraggables[0];
    }
    if (newPositionReference && !this._dragDropRegistry.isDragging(newPositionReference)) {
      const element = newPositionReference.getRootElement();
      element.parentElement.insertBefore(placeholder, element);
      activeDraggables.splice(newIndex, 0, item);
    } else {
      this._element.appendChild(placeholder);
      activeDraggables.push(item);
    }
    placeholder.style.transform = "";
    this._cacheItemPositions();
  }
  withItems(items) {
    this._activeDraggables = items.slice();
    this._cacheItemPositions();
  }
  withSortPredicate(predicate) {
    this._sortPredicate = predicate;
  }
  reset() {
    this._activeDraggables?.forEach((item) => {
      const rootElement = item.getRootElement();
      if (rootElement) {
        const initialTransform = this._itemPositions.find((p) => p.drag === item)?.initialTransform;
        rootElement.style.transform = initialTransform || "";
      }
    });
    this._itemPositions = [];
    this._activeDraggables = [];
    this._previousSwap.drag = null;
    this._previousSwap.delta = 0;
    this._previousSwap.overlaps = false;
  }
  getActiveItemsSnapshot() {
    return this._activeDraggables;
  }
  getItemIndex(item) {
    return this._getVisualItemPositions().findIndex((currentItem) => currentItem.drag === item);
  }
  getItemAtIndex(index) {
    return this._getVisualItemPositions()[index]?.drag || null;
  }
  updateOnScroll(topDifference, leftDifference) {
    this._itemPositions.forEach(({
      clientRect
    }) => {
      adjustDomRect(clientRect, topDifference, leftDifference);
    });
    this._itemPositions.forEach(({
      drag
    }) => {
      if (this._dragDropRegistry.isDragging(drag)) {
        drag._sortFromLastPointerPosition();
      }
    });
  }
  withElementContainer(container) {
    this._element = container;
  }
  _cacheItemPositions() {
    const isHorizontal = this.orientation === "horizontal";
    this._itemPositions = this._activeDraggables.map((drag) => {
      const elementToMeasure = drag.getVisibleElement();
      return {
        drag,
        offset: 0,
        initialTransform: elementToMeasure.style.transform || "",
        clientRect: getMutableClientRect(elementToMeasure)
      };
    }).sort((a, b) => {
      return isHorizontal ? a.clientRect.left - b.clientRect.left : a.clientRect.top - b.clientRect.top;
    });
  }
  _getVisualItemPositions() {
    return this.orientation === "horizontal" && this.direction === "rtl" ? this._itemPositions.slice().reverse() : this._itemPositions;
  }
  _getItemOffsetPx(currentPosition, newPosition, delta) {
    const isHorizontal = this.orientation === "horizontal";
    let itemOffset = isHorizontal ? newPosition.left - currentPosition.left : newPosition.top - currentPosition.top;
    if (delta === -1) {
      itemOffset += isHorizontal ? newPosition.width - currentPosition.width : newPosition.height - currentPosition.height;
    }
    return itemOffset;
  }
  _getSiblingOffsetPx(currentIndex, siblings, delta) {
    const isHorizontal = this.orientation === "horizontal";
    const currentPosition = siblings[currentIndex].clientRect;
    const immediateSibling = siblings[currentIndex + delta * -1];
    let siblingOffset = currentPosition[isHorizontal ? "width" : "height"] * delta;
    if (immediateSibling) {
      const start = isHorizontal ? "left" : "top";
      const end = isHorizontal ? "right" : "bottom";
      if (delta === -1) {
        siblingOffset -= immediateSibling.clientRect[start] - currentPosition[end];
      } else {
        siblingOffset += currentPosition[start] - immediateSibling.clientRect[end];
      }
    }
    return siblingOffset;
  }
  _shouldEnterAsFirstChild(pointerX, pointerY) {
    if (!this._activeDraggables.length) {
      return false;
    }
    const itemPositions = this._itemPositions;
    const isHorizontal = this.orientation === "horizontal";
    const reversed = itemPositions[0].drag !== this._activeDraggables[0];
    if (reversed) {
      const lastItemRect = itemPositions[itemPositions.length - 1].clientRect;
      return isHorizontal ? pointerX >= lastItemRect.right : pointerY >= lastItemRect.bottom;
    } else {
      const firstItemRect = itemPositions[0].clientRect;
      return isHorizontal ? pointerX <= firstItemRect.left : pointerY <= firstItemRect.top;
    }
  }
  _getItemIndexFromPointerPosition(item, pointerX, pointerY, delta) {
    const isHorizontal = this.orientation === "horizontal";
    const index = this._itemPositions.findIndex(({
      drag,
      clientRect
    }) => {
      if (drag === item) {
        return false;
      }
      if (delta) {
        const direction = isHorizontal ? delta.x : delta.y;
        if (drag === this._previousSwap.drag && this._previousSwap.overlaps && direction === this._previousSwap.delta) {
          return false;
        }
      }
      return isHorizontal ? pointerX >= Math.floor(clientRect.left) && pointerX < Math.floor(clientRect.right) : pointerY >= Math.floor(clientRect.top) && pointerY < Math.floor(clientRect.bottom);
    });
    return index === -1 || !this._sortPredicate(index, item) ? -1 : index;
  }
};
var MixedSortStrategy = class {
  _document;
  _dragDropRegistry;
  _element;
  _sortPredicate;
  _rootNode;
  _activeItems;
  _previousSwap = {
    drag: null,
    deltaX: 0,
    deltaY: 0,
    overlaps: false
  };
  _relatedNodes = [];
  constructor(_document, _dragDropRegistry) {
    this._document = _document;
    this._dragDropRegistry = _dragDropRegistry;
  }
  start(items) {
    const childNodes = this._element.childNodes;
    this._relatedNodes = [];
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];
      this._relatedNodes.push([node, node.nextSibling]);
    }
    this.withItems(items);
  }
  sort(item, pointerX, pointerY, pointerDelta) {
    const newIndex = this._getItemIndexFromPointerPosition(item, pointerX, pointerY);
    const previousSwap = this._previousSwap;
    if (newIndex === -1 || this._activeItems[newIndex] === item) {
      return null;
    }
    const toSwapWith = this._activeItems[newIndex];
    if (previousSwap.drag === toSwapWith && previousSwap.overlaps && previousSwap.deltaX === pointerDelta.x && previousSwap.deltaY === pointerDelta.y) {
      return null;
    }
    const previousIndex = this.getItemIndex(item);
    const current = item.getPlaceholderElement();
    const overlapElement = toSwapWith.getRootElement();
    if (newIndex > previousIndex) {
      overlapElement.after(current);
    } else {
      overlapElement.before(current);
    }
    moveItemInArray(this._activeItems, previousIndex, newIndex);
    const newOverlapElement = this._getRootNode().elementFromPoint(pointerX, pointerY);
    previousSwap.deltaX = pointerDelta.x;
    previousSwap.deltaY = pointerDelta.y;
    previousSwap.drag = toSwapWith;
    previousSwap.overlaps = overlapElement === newOverlapElement || overlapElement.contains(newOverlapElement);
    return {
      previousIndex,
      currentIndex: newIndex
    };
  }
  enter(item, pointerX, pointerY, index) {
    const currentIndex = this._activeItems.indexOf(item);
    if (currentIndex > -1) {
      this._activeItems.splice(currentIndex, 1);
    }
    let enterIndex = index == null || index < 0 ? this._getItemIndexFromPointerPosition(item, pointerX, pointerY) : index;
    if (enterIndex === -1) {
      enterIndex = this._getClosestItemIndexToPointer(item, pointerX, pointerY);
    }
    const targetItem = this._activeItems[enterIndex];
    if (targetItem && !this._dragDropRegistry.isDragging(targetItem)) {
      this._activeItems.splice(enterIndex, 0, item);
      targetItem.getRootElement().before(item.getPlaceholderElement());
    } else {
      this._activeItems.push(item);
      this._element.appendChild(item.getPlaceholderElement());
    }
  }
  withItems(items) {
    this._activeItems = items.slice();
  }
  withSortPredicate(predicate) {
    this._sortPredicate = predicate;
  }
  reset() {
    const root = this._element;
    const previousSwap = this._previousSwap;
    for (let i = this._relatedNodes.length - 1; i > -1; i--) {
      const [node, nextSibling] = this._relatedNodes[i];
      if (node.parentNode === root && node.nextSibling !== nextSibling) {
        if (nextSibling === null) {
          root.appendChild(node);
        } else if (nextSibling.parentNode === root) {
          root.insertBefore(node, nextSibling);
        }
      }
    }
    this._relatedNodes = [];
    this._activeItems = [];
    previousSwap.drag = null;
    previousSwap.deltaX = previousSwap.deltaY = 0;
    previousSwap.overlaps = false;
  }
  getActiveItemsSnapshot() {
    return this._activeItems;
  }
  getItemIndex(item) {
    return this._activeItems.indexOf(item);
  }
  getItemAtIndex(index) {
    return this._activeItems[index] || null;
  }
  updateOnScroll() {
    this._activeItems.forEach((item) => {
      if (this._dragDropRegistry.isDragging(item)) {
        item._sortFromLastPointerPosition();
      }
    });
  }
  withElementContainer(container) {
    if (container !== this._element) {
      this._element = container;
      this._rootNode = void 0;
    }
  }
  _getItemIndexFromPointerPosition(item, pointerX, pointerY) {
    const elementAtPoint = this._getRootNode().elementFromPoint(Math.floor(pointerX), Math.floor(pointerY));
    const index = elementAtPoint ? this._activeItems.findIndex((item2) => {
      const root = item2.getRootElement();
      return elementAtPoint === root || root.contains(elementAtPoint);
    }) : -1;
    return index === -1 || !this._sortPredicate(index, item) ? -1 : index;
  }
  _getRootNode() {
    if (!this._rootNode) {
      this._rootNode = _getShadowRoot(this._element) || this._document;
    }
    return this._rootNode;
  }
  _getClosestItemIndexToPointer(item, pointerX, pointerY) {
    if (this._activeItems.length === 0) {
      return -1;
    }
    if (this._activeItems.length === 1) {
      return 0;
    }
    let minDistance = Infinity;
    let minIndex = -1;
    for (let i = 0; i < this._activeItems.length; i++) {
      const current = this._activeItems[i];
      if (current !== item) {
        const {
          x,
          y
        } = current.getRootElement().getBoundingClientRect();
        const distance = Math.hypot(pointerX - x, pointerY - y);
        if (distance < minDistance) {
          minDistance = distance;
          minIndex = i;
        }
      }
    }
    return minIndex;
  }
};
var DROP_PROXIMITY_THRESHOLD = 0.05;
var SCROLL_PROXIMITY_THRESHOLD = 0.05;
var AutoScrollVerticalDirection;
(function(AutoScrollVerticalDirection2) {
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["NONE"] = 0] = "NONE";
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["UP"] = 1] = "UP";
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["DOWN"] = 2] = "DOWN";
})(AutoScrollVerticalDirection || (AutoScrollVerticalDirection = {}));
var AutoScrollHorizontalDirection;
(function(AutoScrollHorizontalDirection2) {
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["NONE"] = 0] = "NONE";
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["LEFT"] = 1] = "LEFT";
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["RIGHT"] = 2] = "RIGHT";
})(AutoScrollHorizontalDirection || (AutoScrollHorizontalDirection = {}));
function createDropListRef(injector, element) {
  return new DropListRef(element, injector.get(DragDropRegistry), injector.get(DOCUMENT), injector.get(NgZone), injector.get(ViewportRuler));
}
var DropListRef = class {
  _dragDropRegistry;
  _ngZone;
  _viewportRuler;
  element;
  disabled = false;
  sortingDisabled = false;
  lockAxis = null;
  autoScrollDisabled = false;
  autoScrollStep = 2;
  hasAnchor = false;
  enterPredicate = () => true;
  sortPredicate = () => true;
  beforeStarted = new Subject();
  entered = new Subject();
  exited = new Subject();
  dropped = new Subject();
  sorted = new Subject();
  receivingStarted = new Subject();
  receivingStopped = new Subject();
  data;
  _container;
  _isDragging = false;
  _parentPositions;
  _sortStrategy;
  _domRect;
  _draggables = [];
  _siblings = [];
  _activeSiblings = /* @__PURE__ */ new Set();
  _viewportScrollSubscription = Subscription.EMPTY;
  _verticalScrollDirection = AutoScrollVerticalDirection.NONE;
  _horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
  _scrollNode;
  _stopScrollTimers = new Subject();
  _cachedShadowRoot = null;
  _document;
  _scrollableElements = [];
  _initialScrollSnap;
  _direction = "ltr";
  constructor(element, _dragDropRegistry, _document, _ngZone, _viewportRuler) {
    this._dragDropRegistry = _dragDropRegistry;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    const coercedElement = this.element = coerceElement(element);
    this._document = _document;
    this.withOrientation("vertical").withElementContainer(coercedElement);
    _dragDropRegistry.registerDropContainer(this);
    this._parentPositions = new ParentPositionTracker(_document);
  }
  dispose() {
    this._stopScrolling();
    this._stopScrollTimers.complete();
    this._viewportScrollSubscription.unsubscribe();
    this.beforeStarted.complete();
    this.entered.complete();
    this.exited.complete();
    this.dropped.complete();
    this.sorted.complete();
    this.receivingStarted.complete();
    this.receivingStopped.complete();
    this._activeSiblings.clear();
    this._scrollNode = null;
    this._parentPositions.clear();
    this._dragDropRegistry.removeDropContainer(this);
  }
  isDragging() {
    return this._isDragging;
  }
  start() {
    this._draggingStarted();
    this._notifyReceivingSiblings();
  }
  enter(item, pointerX, pointerY, index) {
    this._draggingStarted();
    if (index == null && this.sortingDisabled) {
      index = this._draggables.indexOf(item);
    }
    this._sortStrategy.enter(item, pointerX, pointerY, index);
    this._cacheParentPositions();
    this._notifyReceivingSiblings();
    this.entered.next({
      item,
      container: this,
      currentIndex: this.getItemIndex(item)
    });
  }
  exit(item) {
    this._reset();
    this.exited.next({
      item,
      container: this
    });
  }
  drop(item, currentIndex, previousIndex, previousContainer, isPointerOverContainer, distance, dropPoint, event = {}) {
    this._reset();
    this.dropped.next({
      item,
      currentIndex,
      previousIndex,
      container: this,
      previousContainer,
      isPointerOverContainer,
      distance,
      dropPoint,
      event
    });
  }
  withItems(items) {
    const previousItems = this._draggables;
    this._draggables = items;
    items.forEach((item) => item._withDropContainer(this));
    if (this.isDragging()) {
      const draggedItems = previousItems.filter((item) => item.isDragging());
      if (draggedItems.every((item) => items.indexOf(item) === -1)) {
        this._reset();
      } else {
        this._sortStrategy.withItems(this._draggables);
      }
    }
    return this;
  }
  withDirection(direction) {
    this._direction = direction;
    if (this._sortStrategy instanceof SingleAxisSortStrategy) {
      this._sortStrategy.direction = direction;
    }
    return this;
  }
  connectedTo(connectedTo) {
    this._siblings = connectedTo.slice();
    return this;
  }
  withOrientation(orientation) {
    if (orientation === "mixed") {
      this._sortStrategy = new MixedSortStrategy(this._document, this._dragDropRegistry);
    } else {
      const strategy = new SingleAxisSortStrategy(this._dragDropRegistry);
      strategy.direction = this._direction;
      strategy.orientation = orientation;
      this._sortStrategy = strategy;
    }
    this._sortStrategy.withElementContainer(this._container);
    this._sortStrategy.withSortPredicate((index, item) => this.sortPredicate(index, item, this));
    return this;
  }
  withScrollableParents(elements) {
    const element = this._container;
    this._scrollableElements = elements.indexOf(element) === -1 ? [element, ...elements] : elements.slice();
    return this;
  }
  withElementContainer(container) {
    if (container === this._container) {
      return this;
    }
    const element = coerceElement(this.element);
    if ((typeof ngDevMode === "undefined" || ngDevMode) && container !== element && !element.contains(container)) {
      throw new Error("Invalid DOM structure for drop list. Alternate container element must be a descendant of the drop list.");
    }
    const oldContainerIndex = this._scrollableElements.indexOf(this._container);
    const newContainerIndex = this._scrollableElements.indexOf(container);
    if (oldContainerIndex > -1) {
      this._scrollableElements.splice(oldContainerIndex, 1);
    }
    if (newContainerIndex > -1) {
      this._scrollableElements.splice(newContainerIndex, 1);
    }
    if (this._sortStrategy) {
      this._sortStrategy.withElementContainer(container);
    }
    this._cachedShadowRoot = null;
    this._scrollableElements.unshift(container);
    this._container = container;
    return this;
  }
  getScrollableParents() {
    return this._scrollableElements;
  }
  getItemIndex(item) {
    return this._isDragging ? this._sortStrategy.getItemIndex(item) : this._draggables.indexOf(item);
  }
  getItemAtIndex(index) {
    return this._isDragging ? this._sortStrategy.getItemAtIndex(index) : this._draggables[index] || null;
  }
  isReceiving() {
    return this._activeSiblings.size > 0;
  }
  _sortItem(item, pointerX, pointerY, pointerDelta) {
    if (this.sortingDisabled || !this._domRect || !isPointerNearDomRect(this._domRect, DROP_PROXIMITY_THRESHOLD, pointerX, pointerY)) {
      return;
    }
    const result = this._sortStrategy.sort(item, pointerX, pointerY, pointerDelta);
    if (result) {
      this.sorted.next({
        previousIndex: result.previousIndex,
        currentIndex: result.currentIndex,
        container: this,
        item
      });
    }
  }
  _startScrollingIfNecessary(pointerX, pointerY) {
    if (this.autoScrollDisabled) {
      return;
    }
    let scrollNode;
    let verticalScrollDirection = AutoScrollVerticalDirection.NONE;
    let horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
    this._parentPositions.positions.forEach((position, element) => {
      if (element === this._document || !position.clientRect || scrollNode) {
        return;
      }
      if (isPointerNearDomRect(position.clientRect, DROP_PROXIMITY_THRESHOLD, pointerX, pointerY)) {
        [verticalScrollDirection, horizontalScrollDirection] = getElementScrollDirections(element, position.clientRect, this._direction, pointerX, pointerY);
        if (verticalScrollDirection || horizontalScrollDirection) {
          scrollNode = element;
        }
      }
    });
    if (!verticalScrollDirection && !horizontalScrollDirection) {
      const {
        width,
        height
      } = this._viewportRuler.getViewportSize();
      const domRect = {
        width,
        height,
        top: 0,
        right: width,
        bottom: height,
        left: 0
      };
      verticalScrollDirection = getVerticalScrollDirection(domRect, pointerY);
      horizontalScrollDirection = getHorizontalScrollDirection(domRect, pointerX);
      scrollNode = window;
    }
    if (scrollNode && (verticalScrollDirection !== this._verticalScrollDirection || horizontalScrollDirection !== this._horizontalScrollDirection || scrollNode !== this._scrollNode)) {
      this._verticalScrollDirection = verticalScrollDirection;
      this._horizontalScrollDirection = horizontalScrollDirection;
      this._scrollNode = scrollNode;
      if ((verticalScrollDirection || horizontalScrollDirection) && scrollNode) {
        this._ngZone.runOutsideAngular(this._startScrollInterval);
      } else {
        this._stopScrolling();
      }
    }
  }
  _stopScrolling() {
    this._stopScrollTimers.next();
  }
  _draggingStarted() {
    const styles = this._container.style;
    this.beforeStarted.next();
    this._isDragging = true;
    if ((typeof ngDevMode === "undefined" || ngDevMode) && this._container !== coerceElement(this.element)) {
      for (const drag of this._draggables) {
        if (!drag.isDragging() && drag.getVisibleElement().parentNode !== this._container) {
          throw new Error("Invalid DOM structure for drop list. All items must be placed directly inside of the element container.");
        }
      }
    }
    this._initialScrollSnap = styles.msScrollSnapType || styles.scrollSnapType || "";
    styles.scrollSnapType = styles.msScrollSnapType = "none";
    this._sortStrategy.start(this._draggables);
    this._cacheParentPositions();
    this._viewportScrollSubscription.unsubscribe();
    this._listenToScrollEvents();
  }
  _cacheParentPositions() {
    this._parentPositions.cache(this._scrollableElements);
    this._domRect = this._parentPositions.positions.get(this._container).clientRect;
  }
  _reset() {
    this._isDragging = false;
    const styles = this._container.style;
    styles.scrollSnapType = styles.msScrollSnapType = this._initialScrollSnap;
    this._siblings.forEach((sibling) => sibling._stopReceiving(this));
    this._sortStrategy.reset();
    this._stopScrolling();
    this._viewportScrollSubscription.unsubscribe();
    this._parentPositions.clear();
  }
  _startScrollInterval = () => {
    this._stopScrolling();
    interval(0, animationFrameScheduler).pipe(takeUntil(this._stopScrollTimers)).subscribe(() => {
      const node = this._scrollNode;
      const scrollStep = this.autoScrollStep;
      if (this._verticalScrollDirection === AutoScrollVerticalDirection.UP) {
        node.scrollBy(0, -scrollStep);
      } else if (this._verticalScrollDirection === AutoScrollVerticalDirection.DOWN) {
        node.scrollBy(0, scrollStep);
      }
      if (this._horizontalScrollDirection === AutoScrollHorizontalDirection.LEFT) {
        node.scrollBy(-scrollStep, 0);
      } else if (this._horizontalScrollDirection === AutoScrollHorizontalDirection.RIGHT) {
        node.scrollBy(scrollStep, 0);
      }
    });
  };
  _isOverContainer(x, y) {
    return this._domRect != null && isInsideClientRect(this._domRect, x, y);
  }
  _getSiblingContainerFromPosition(item, x, y) {
    return this._siblings.find((sibling) => sibling._canReceive(item, x, y));
  }
  _canReceive(item, x, y) {
    if (!this._domRect || !isInsideClientRect(this._domRect, x, y) || !this.enterPredicate(item, this)) {
      return false;
    }
    const elementFromPoint = this._getShadowRoot().elementFromPoint(x, y);
    if (!elementFromPoint) {
      return false;
    }
    return elementFromPoint === this._container || this._container.contains(elementFromPoint);
  }
  _startReceiving(sibling, items) {
    const activeSiblings = this._activeSiblings;
    if (!activeSiblings.has(sibling) && items.every((item) => {
      return this.enterPredicate(item, this) || this._draggables.indexOf(item) > -1;
    })) {
      activeSiblings.add(sibling);
      this._cacheParentPositions();
      this._listenToScrollEvents();
      this.receivingStarted.next({
        initiator: sibling,
        receiver: this,
        items
      });
    }
  }
  _stopReceiving(sibling) {
    this._activeSiblings.delete(sibling);
    this._viewportScrollSubscription.unsubscribe();
    this.receivingStopped.next({
      initiator: sibling,
      receiver: this
    });
  }
  _listenToScrollEvents() {
    this._viewportScrollSubscription = this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe((event) => {
      if (this.isDragging()) {
        const scrollDifference = this._parentPositions.handleScroll(event);
        if (scrollDifference) {
          this._sortStrategy.updateOnScroll(scrollDifference.top, scrollDifference.left);
        }
      } else if (this.isReceiving()) {
        this._cacheParentPositions();
      }
    });
  }
  _getShadowRoot() {
    if (!this._cachedShadowRoot) {
      const shadowRoot = _getShadowRoot(this._container);
      this._cachedShadowRoot = shadowRoot || this._document;
    }
    return this._cachedShadowRoot;
  }
  _notifyReceivingSiblings() {
    const draggedItems = this._sortStrategy.getActiveItemsSnapshot().filter((item) => item.isDragging());
    this._siblings.forEach((sibling) => sibling._startReceiving(this, draggedItems));
  }
};
function getVerticalScrollDirection(clientRect, pointerY) {
  const {
    top,
    bottom,
    height
  } = clientRect;
  const yThreshold = height * SCROLL_PROXIMITY_THRESHOLD;
  if (pointerY >= top - yThreshold && pointerY <= top + yThreshold) {
    return AutoScrollVerticalDirection.UP;
  } else if (pointerY >= bottom - yThreshold && pointerY <= bottom + yThreshold) {
    return AutoScrollVerticalDirection.DOWN;
  }
  return AutoScrollVerticalDirection.NONE;
}
function getHorizontalScrollDirection(clientRect, pointerX) {
  const {
    left,
    right,
    width
  } = clientRect;
  const xThreshold = width * SCROLL_PROXIMITY_THRESHOLD;
  if (pointerX >= left - xThreshold && pointerX <= left + xThreshold) {
    return AutoScrollHorizontalDirection.LEFT;
  } else if (pointerX >= right - xThreshold && pointerX <= right + xThreshold) {
    return AutoScrollHorizontalDirection.RIGHT;
  }
  return AutoScrollHorizontalDirection.NONE;
}
function getElementScrollDirections(element, clientRect, direction, pointerX, pointerY) {
  const computedVertical = getVerticalScrollDirection(clientRect, pointerY);
  const computedHorizontal = getHorizontalScrollDirection(clientRect, pointerX);
  let verticalScrollDirection = AutoScrollVerticalDirection.NONE;
  let horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
  if (computedVertical) {
    const scrollTop = element.scrollTop;
    if (computedVertical === AutoScrollVerticalDirection.UP) {
      if (scrollTop > 0) {
        verticalScrollDirection = AutoScrollVerticalDirection.UP;
      }
    } else if (element.scrollHeight - scrollTop > element.clientHeight) {
      verticalScrollDirection = AutoScrollVerticalDirection.DOWN;
    }
  }
  if (computedHorizontal) {
    const scrollLeft = element.scrollLeft;
    if (direction === "rtl") {
      if (computedHorizontal === AutoScrollHorizontalDirection.RIGHT) {
        if (scrollLeft < 0) {
          horizontalScrollDirection = AutoScrollHorizontalDirection.RIGHT;
        }
      } else if (element.scrollWidth + scrollLeft > element.clientWidth) {
        horizontalScrollDirection = AutoScrollHorizontalDirection.LEFT;
      }
    } else {
      if (computedHorizontal === AutoScrollHorizontalDirection.LEFT) {
        if (scrollLeft > 0) {
          horizontalScrollDirection = AutoScrollHorizontalDirection.LEFT;
        }
      } else if (element.scrollWidth - scrollLeft > element.clientWidth) {
        horizontalScrollDirection = AutoScrollHorizontalDirection.RIGHT;
      }
    }
  }
  return [verticalScrollDirection, horizontalScrollDirection];
}
var DragDrop = class _DragDrop {
  _injector = inject(Injector);
  constructor() {
  }
  createDrag(element, config) {
    return createDragRef(this._injector, element, config);
  }
  createDropList(element) {
    return createDropListRef(this._injector, element);
  }
  static \u0275fac = function DragDrop_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DragDrop)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _DragDrop,
    factory: _DragDrop.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDrop, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CDK_DRAG_PARENT = new InjectionToken("CDK_DRAG_PARENT");
function assertElementNode(node, name) {
  if (node.nodeType !== 1) {
    throw Error(`${name} must be attached to an element node. Currently attached to "${node.nodeName}".`);
  }
}
var CDK_DRAG_HANDLE = new InjectionToken("CdkDragHandle");
var CdkDragHandle = class _CdkDragHandle {
  element = inject(ElementRef);
  _parentDrag = inject(CDK_DRAG_PARENT, {
    optional: true,
    skipSelf: true
  });
  _dragDropRegistry = inject(DragDropRegistry);
  _stateChanges = new Subject();
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._stateChanges.next(this);
  }
  _disabled = false;
  constructor() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      assertElementNode(this.element.nativeElement, "cdkDragHandle");
    }
    this._parentDrag?._addHandle(this);
  }
  ngAfterViewInit() {
    if (!this._parentDrag) {
      let parent = this.element.nativeElement.parentElement;
      while (parent) {
        const ref = this._dragDropRegistry.getDragDirectiveForNode(parent);
        if (ref) {
          this._parentDrag = ref;
          ref._addHandle(this);
          break;
        }
        parent = parent.parentElement;
      }
    }
  }
  ngOnDestroy() {
    this._parentDrag?._removeHandle(this);
    this._stateChanges.complete();
  }
  static \u0275fac = function CdkDragHandle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDragHandle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDragHandle,
    selectors: [["", "cdkDragHandle", ""]],
    hostAttrs: [1, "cdk-drag-handle"],
    inputs: {
      disabled: [2, "cdkDragHandleDisabled", "disabled", booleanAttribute]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_HANDLE,
      useExisting: _CdkDragHandle
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragHandle, [{
    type: Directive,
    args: [{
      selector: "[cdkDragHandle]",
      host: {
        "class": "cdk-drag-handle"
      },
      providers: [{
        provide: CDK_DRAG_HANDLE,
        useExisting: CdkDragHandle
      }]
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDragHandleDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var CDK_DRAG_CONFIG = new InjectionToken("CDK_DRAG_CONFIG");
var CDK_DROP_LIST = new InjectionToken("CdkDropList");
var CdkDrag = class _CdkDrag {
  element = inject(ElementRef);
  dropContainer = inject(CDK_DROP_LIST, {
    optional: true,
    skipSelf: true
  });
  _ngZone = inject(NgZone);
  _viewContainerRef = inject(ViewContainerRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _changeDetectorRef = inject(ChangeDetectorRef);
  _selfHandle = inject(CDK_DRAG_HANDLE, {
    optional: true,
    self: true
  });
  _parentDrag = inject(CDK_DRAG_PARENT, {
    optional: true,
    skipSelf: true
  });
  _dragDropRegistry = inject(DragDropRegistry);
  _destroyed = new Subject();
  _handles = new BehaviorSubject([]);
  _previewTemplate = null;
  _placeholderTemplate = null;
  _dragRef;
  data;
  lockAxis = null;
  rootElementSelector;
  boundaryElement;
  dragStartDelay;
  freeDragPosition;
  get disabled() {
    return this._disabled || !!(this.dropContainer && this.dropContainer.disabled);
  }
  set disabled(value) {
    this._disabled = value;
    this._dragRef.disabled = this._disabled;
  }
  _disabled = false;
  constrainPosition;
  previewClass;
  previewContainer;
  scale = 1;
  started = new EventEmitter();
  released = new EventEmitter();
  ended = new EventEmitter();
  entered = new EventEmitter();
  exited = new EventEmitter();
  dropped = new EventEmitter();
  moved = new Observable((observer) => {
    const subscription = this._dragRef.moved.pipe(map((movedEvent) => ({
      source: this,
      pointerPosition: movedEvent.pointerPosition,
      event: movedEvent.event,
      delta: movedEvent.delta,
      distance: movedEvent.distance
    }))).subscribe(observer);
    return () => {
      subscription.unsubscribe();
    };
  });
  _injector = inject(Injector);
  constructor() {
    const dropContainer = this.dropContainer;
    const config = inject(CDK_DRAG_CONFIG, {
      optional: true
    });
    this._dragRef = createDragRef(this._injector, this.element, {
      dragStartThreshold: config && config.dragStartThreshold != null ? config.dragStartThreshold : 5,
      pointerDirectionChangeThreshold: config && config.pointerDirectionChangeThreshold != null ? config.pointerDirectionChangeThreshold : 5,
      zIndex: config?.zIndex
    });
    this._dragRef.data = this;
    this._dragDropRegistry.registerDirectiveNode(this.element.nativeElement, this);
    if (config) {
      this._assignDefaults(config);
    }
    if (dropContainer) {
      dropContainer.addItem(this);
      dropContainer._dropListRef.beforeStarted.pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._dragRef.scale = this.scale;
      });
    }
    this._syncInputs(this._dragRef);
    this._handleEvents(this._dragRef);
  }
  getPlaceholderElement() {
    return this._dragRef.getPlaceholderElement();
  }
  getRootElement() {
    return this._dragRef.getRootElement();
  }
  reset() {
    this._dragRef.reset();
  }
  resetToBoundary() {
    this._dragRef.resetToBoundary();
  }
  getFreeDragPosition() {
    return this._dragRef.getFreeDragPosition();
  }
  setFreeDragPosition(value) {
    this._dragRef.setFreeDragPosition(value);
  }
  ngAfterViewInit() {
    afterNextRender(() => {
      this._updateRootElement();
      this._setupHandlesListener();
      this._dragRef.scale = this.scale;
      if (this.freeDragPosition) {
        this._dragRef.setFreeDragPosition(this.freeDragPosition);
      }
    }, {
      injector: this._injector
    });
  }
  ngOnChanges(changes) {
    const rootSelectorChange = changes["rootElementSelector"];
    const positionChange = changes["freeDragPosition"];
    if (rootSelectorChange && !rootSelectorChange.firstChange) {
      this._updateRootElement();
    }
    this._dragRef.scale = this.scale;
    if (positionChange && !positionChange.firstChange && this.freeDragPosition) {
      this._dragRef.setFreeDragPosition(this.freeDragPosition);
    }
  }
  ngOnDestroy() {
    if (this.dropContainer) {
      this.dropContainer.removeItem(this);
    }
    this._dragDropRegistry.removeDirectiveNode(this.element.nativeElement);
    this._ngZone.runOutsideAngular(() => {
      this._handles.complete();
      this._destroyed.next();
      this._destroyed.complete();
      this._dragRef.dispose();
    });
  }
  _addHandle(handle) {
    const handles = this._handles.getValue();
    handles.push(handle);
    this._handles.next(handles);
  }
  _removeHandle(handle) {
    const handles = this._handles.getValue();
    const index = handles.indexOf(handle);
    if (index > -1) {
      handles.splice(index, 1);
      this._handles.next(handles);
    }
  }
  _setPreviewTemplate(preview) {
    this._previewTemplate = preview;
  }
  _resetPreviewTemplate(preview) {
    if (preview === this._previewTemplate) {
      this._previewTemplate = null;
    }
  }
  _setPlaceholderTemplate(placeholder) {
    this._placeholderTemplate = placeholder;
  }
  _resetPlaceholderTemplate(placeholder) {
    if (placeholder === this._placeholderTemplate) {
      this._placeholderTemplate = null;
    }
  }
  _updateRootElement() {
    const element = this.element.nativeElement;
    let rootElement = element;
    if (this.rootElementSelector) {
      rootElement = element.closest !== void 0 ? element.closest(this.rootElementSelector) : element.parentElement?.closest(this.rootElementSelector);
    }
    if (rootElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
      assertElementNode(rootElement, "cdkDrag");
    }
    this._dragRef.withRootElement(rootElement || element);
  }
  _getBoundaryElement() {
    const boundary = this.boundaryElement;
    if (!boundary) {
      return null;
    }
    if (typeof boundary === "string") {
      return this.element.nativeElement.closest(boundary);
    }
    return coerceElement(boundary);
  }
  _syncInputs(ref) {
    ref.beforeStarted.subscribe(() => {
      if (!ref.isDragging()) {
        const dir = this._dir;
        const dragStartDelay = this.dragStartDelay;
        const placeholder = this._placeholderTemplate ? {
          template: this._placeholderTemplate.templateRef,
          context: this._placeholderTemplate.data,
          viewContainer: this._viewContainerRef
        } : null;
        const preview = this._previewTemplate ? {
          template: this._previewTemplate.templateRef,
          context: this._previewTemplate.data,
          matchSize: this._previewTemplate.matchSize,
          viewContainer: this._viewContainerRef
        } : null;
        ref.disabled = this.disabled;
        ref.lockAxis = this.lockAxis;
        ref.scale = this.scale;
        ref.dragStartDelay = typeof dragStartDelay === "object" && dragStartDelay ? dragStartDelay : coerceNumberProperty(dragStartDelay);
        ref.constrainPosition = this.constrainPosition;
        ref.previewClass = this.previewClass;
        ref.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(placeholder).withPreviewTemplate(preview).withPreviewContainer(this.previewContainer || "global");
        if (dir) {
          ref.withDirection(dir.value);
        }
      }
    });
    ref.beforeStarted.pipe(take(1)).subscribe(() => {
      if (this._parentDrag) {
        ref.withParent(this._parentDrag._dragRef);
        return;
      }
      let parent = this.element.nativeElement.parentElement;
      while (parent) {
        const parentDrag = this._dragDropRegistry.getDragDirectiveForNode(parent);
        if (parentDrag) {
          ref.withParent(parentDrag._dragRef);
          break;
        }
        parent = parent.parentElement;
      }
    });
  }
  _handleEvents(ref) {
    ref.started.subscribe((startEvent) => {
      this.started.emit({
        source: this,
        event: startEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.released.subscribe((releaseEvent) => {
      this.released.emit({
        source: this,
        event: releaseEvent.event
      });
    });
    ref.ended.subscribe((endEvent) => {
      this.ended.emit({
        source: this,
        distance: endEvent.distance,
        dropPoint: endEvent.dropPoint,
        event: endEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.entered.subscribe((enterEvent) => {
      this.entered.emit({
        container: enterEvent.container.data,
        item: this,
        currentIndex: enterEvent.currentIndex
      });
    });
    ref.exited.subscribe((exitEvent) => {
      this.exited.emit({
        container: exitEvent.container.data,
        item: this
      });
    });
    ref.dropped.subscribe((dropEvent) => {
      this.dropped.emit({
        previousIndex: dropEvent.previousIndex,
        currentIndex: dropEvent.currentIndex,
        previousContainer: dropEvent.previousContainer.data,
        container: dropEvent.container.data,
        isPointerOverContainer: dropEvent.isPointerOverContainer,
        item: this,
        distance: dropEvent.distance,
        dropPoint: dropEvent.dropPoint,
        event: dropEvent.event
      });
    });
  }
  _assignDefaults(config) {
    const {
      lockAxis,
      dragStartDelay,
      constrainPosition,
      previewClass,
      boundaryElement,
      draggingDisabled,
      rootElementSelector,
      previewContainer
    } = config;
    this.disabled = draggingDisabled == null ? false : draggingDisabled;
    this.dragStartDelay = dragStartDelay || 0;
    this.lockAxis = lockAxis || null;
    if (constrainPosition) {
      this.constrainPosition = constrainPosition;
    }
    if (previewClass) {
      this.previewClass = previewClass;
    }
    if (boundaryElement) {
      this.boundaryElement = boundaryElement;
    }
    if (rootElementSelector) {
      this.rootElementSelector = rootElementSelector;
    }
    if (previewContainer) {
      this.previewContainer = previewContainer;
    }
  }
  _setupHandlesListener() {
    this._handles.pipe(tap((handles) => {
      const handleElements = handles.map((handle) => handle.element);
      if (this._selfHandle && this.rootElementSelector) {
        handleElements.push(this.element);
      }
      this._dragRef.withHandles(handleElements);
    }), switchMap((handles) => {
      return merge(...handles.map((item) => item._stateChanges.pipe(startWith(item))));
    }), takeUntil(this._destroyed)).subscribe((handleInstance) => {
      const dragRef = this._dragRef;
      const handle = handleInstance.element.nativeElement;
      handleInstance.disabled ? dragRef.disableHandle(handle) : dragRef.enableHandle(handle);
    });
  }
  static \u0275fac = function CdkDrag_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDrag)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDrag,
    selectors: [["", "cdkDrag", ""]],
    hostAttrs: [1, "cdk-drag"],
    hostVars: 4,
    hostBindings: function CdkDrag_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("cdk-drag-disabled", ctx.disabled)("cdk-drag-dragging", ctx._dragRef.isDragging());
      }
    },
    inputs: {
      data: [0, "cdkDragData", "data"],
      lockAxis: [0, "cdkDragLockAxis", "lockAxis"],
      rootElementSelector: [0, "cdkDragRootElement", "rootElementSelector"],
      boundaryElement: [0, "cdkDragBoundary", "boundaryElement"],
      dragStartDelay: [0, "cdkDragStartDelay", "dragStartDelay"],
      freeDragPosition: [0, "cdkDragFreeDragPosition", "freeDragPosition"],
      disabled: [2, "cdkDragDisabled", "disabled", booleanAttribute],
      constrainPosition: [0, "cdkDragConstrainPosition", "constrainPosition"],
      previewClass: [0, "cdkDragPreviewClass", "previewClass"],
      previewContainer: [0, "cdkDragPreviewContainer", "previewContainer"],
      scale: [2, "cdkDragScale", "scale", numberAttribute]
    },
    outputs: {
      started: "cdkDragStarted",
      released: "cdkDragReleased",
      ended: "cdkDragEnded",
      entered: "cdkDragEntered",
      exited: "cdkDragExited",
      dropped: "cdkDragDropped",
      moved: "cdkDragMoved"
    },
    exportAs: ["cdkDrag"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_PARENT,
      useExisting: _CdkDrag
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDrag, [{
    type: Directive,
    args: [{
      selector: "[cdkDrag]",
      exportAs: "cdkDrag",
      host: {
        "class": "cdk-drag",
        "[class.cdk-drag-disabled]": "disabled",
        "[class.cdk-drag-dragging]": "_dragRef.isDragging()"
      },
      providers: [{
        provide: CDK_DRAG_PARENT,
        useExisting: CdkDrag
      }]
    }]
  }], () => [], {
    data: [{
      type: Input,
      args: ["cdkDragData"]
    }],
    lockAxis: [{
      type: Input,
      args: ["cdkDragLockAxis"]
    }],
    rootElementSelector: [{
      type: Input,
      args: ["cdkDragRootElement"]
    }],
    boundaryElement: [{
      type: Input,
      args: ["cdkDragBoundary"]
    }],
    dragStartDelay: [{
      type: Input,
      args: ["cdkDragStartDelay"]
    }],
    freeDragPosition: [{
      type: Input,
      args: ["cdkDragFreeDragPosition"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDragDisabled",
        transform: booleanAttribute
      }]
    }],
    constrainPosition: [{
      type: Input,
      args: ["cdkDragConstrainPosition"]
    }],
    previewClass: [{
      type: Input,
      args: ["cdkDragPreviewClass"]
    }],
    previewContainer: [{
      type: Input,
      args: ["cdkDragPreviewContainer"]
    }],
    scale: [{
      type: Input,
      args: [{
        alias: "cdkDragScale",
        transform: numberAttribute
      }]
    }],
    started: [{
      type: Output,
      args: ["cdkDragStarted"]
    }],
    released: [{
      type: Output,
      args: ["cdkDragReleased"]
    }],
    ended: [{
      type: Output,
      args: ["cdkDragEnded"]
    }],
    entered: [{
      type: Output,
      args: ["cdkDragEntered"]
    }],
    exited: [{
      type: Output,
      args: ["cdkDragExited"]
    }],
    dropped: [{
      type: Output,
      args: ["cdkDragDropped"]
    }],
    moved: [{
      type: Output,
      args: ["cdkDragMoved"]
    }]
  });
})();
var CDK_DROP_LIST_GROUP = new InjectionToken("CdkDropListGroup");
var CdkDropListGroup = class _CdkDropListGroup {
  _items = /* @__PURE__ */ new Set();
  disabled = false;
  ngOnDestroy() {
    this._items.clear();
  }
  static \u0275fac = function CdkDropListGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDropListGroup)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDropListGroup,
    selectors: [["", "cdkDropListGroup", ""]],
    inputs: {
      disabled: [2, "cdkDropListGroupDisabled", "disabled", booleanAttribute]
    },
    exportAs: ["cdkDropListGroup"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DROP_LIST_GROUP,
      useExisting: _CdkDropListGroup
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDropListGroup, [{
    type: Directive,
    args: [{
      selector: "[cdkDropListGroup]",
      exportAs: "cdkDropListGroup",
      providers: [{
        provide: CDK_DROP_LIST_GROUP,
        useExisting: CdkDropListGroup
      }]
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListGroupDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkDropList = class _CdkDropList {
  element = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _scrollDispatcher = inject(ScrollDispatcher);
  _dir = inject(Directionality, {
    optional: true
  });
  _group = inject(CDK_DROP_LIST_GROUP, {
    optional: true,
    skipSelf: true
  });
  _latestSortedRefs;
  _destroyed = new Subject();
  _scrollableParentsResolved = false;
  static _dropLists = [];
  _dropListRef;
  connectedTo = [];
  data;
  orientation = "vertical";
  id = inject(_IdGenerator).getId("cdk-drop-list-");
  lockAxis = null;
  get disabled() {
    return this._disabled || !!this._group && this._group.disabled;
  }
  set disabled(value) {
    this._dropListRef.disabled = this._disabled = value;
  }
  _disabled = false;
  sortingDisabled = false;
  enterPredicate = () => true;
  sortPredicate = () => true;
  autoScrollDisabled = false;
  autoScrollStep;
  elementContainerSelector = null;
  hasAnchor = false;
  dropped = new EventEmitter();
  entered = new EventEmitter();
  exited = new EventEmitter();
  sorted = new EventEmitter();
  _unsortedItems = /* @__PURE__ */ new Set();
  constructor() {
    const config = inject(CDK_DRAG_CONFIG, {
      optional: true
    });
    const injector = inject(Injector);
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      assertElementNode(this.element.nativeElement, "cdkDropList");
    }
    this._dropListRef = createDropListRef(injector, this.element);
    this._dropListRef.data = this;
    if (config) {
      this._assignDefaults(config);
    }
    this._dropListRef.enterPredicate = (drag, drop) => {
      return this.enterPredicate(drag.data, drop.data);
    };
    this._dropListRef.sortPredicate = (index, drag, drop) => {
      return this.sortPredicate(index, drag.data, drop.data);
    };
    this._setupInputSyncSubscription(this._dropListRef);
    this._handleEvents(this._dropListRef);
    _CdkDropList._dropLists.push(this);
    if (this._group) {
      this._group._items.add(this);
    }
  }
  addItem(item) {
    this._unsortedItems.add(item);
    item._dragRef._withDropContainer(this._dropListRef);
    if (this._dropListRef.isDragging()) {
      this._syncItemsWithRef(this.getSortedItems().map((item2) => item2._dragRef));
    }
  }
  removeItem(item) {
    this._unsortedItems.delete(item);
    if (this._latestSortedRefs) {
      const index = this._latestSortedRefs.indexOf(item._dragRef);
      if (index > -1) {
        this._latestSortedRefs.splice(index, 1);
        this._syncItemsWithRef(this._latestSortedRefs);
      }
    }
  }
  getSortedItems() {
    return Array.from(this._unsortedItems).sort((a, b) => {
      const documentPosition = a._dragRef.getVisibleElement().compareDocumentPosition(b._dragRef.getVisibleElement());
      return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }
  ngOnDestroy() {
    const index = _CdkDropList._dropLists.indexOf(this);
    if (index > -1) {
      _CdkDropList._dropLists.splice(index, 1);
    }
    if (this._group) {
      this._group._items.delete(this);
    }
    this._latestSortedRefs = void 0;
    this._unsortedItems.clear();
    this._dropListRef.dispose();
    this._destroyed.next();
    this._destroyed.complete();
  }
  _setupInputSyncSubscription(ref) {
    if (this._dir) {
      this._dir.change.pipe(startWith(this._dir.value), takeUntil(this._destroyed)).subscribe((value) => ref.withDirection(value));
    }
    ref.beforeStarted.subscribe(() => {
      const siblings = coerceArray(this.connectedTo).map((drop) => {
        if (typeof drop === "string") {
          const correspondingDropList = _CdkDropList._dropLists.find((list) => list.id === drop);
          if (!correspondingDropList && (typeof ngDevMode === "undefined" || ngDevMode)) {
            console.warn(`CdkDropList could not find connected drop list with id "${drop}"`);
          }
          return correspondingDropList;
        }
        return drop;
      });
      if (this._group) {
        this._group._items.forEach((drop) => {
          if (siblings.indexOf(drop) === -1) {
            siblings.push(drop);
          }
        });
      }
      if (!this._scrollableParentsResolved) {
        const scrollableParents = this._scrollDispatcher.getAncestorScrollContainers(this.element).map((scrollable) => scrollable.getElementRef().nativeElement);
        this._dropListRef.withScrollableParents(scrollableParents);
        this._scrollableParentsResolved = true;
      }
      if (this.elementContainerSelector) {
        const container = this.element.nativeElement.querySelector(this.elementContainerSelector);
        if (!container && (typeof ngDevMode === "undefined" || ngDevMode)) {
          throw new Error(`CdkDropList could not find an element container matching the selector "${this.elementContainerSelector}"`);
        }
        ref.withElementContainer(container);
      }
      ref.disabled = this.disabled;
      ref.lockAxis = this.lockAxis;
      ref.sortingDisabled = this.sortingDisabled;
      ref.autoScrollDisabled = this.autoScrollDisabled;
      ref.autoScrollStep = coerceNumberProperty(this.autoScrollStep, 2);
      ref.hasAnchor = this.hasAnchor;
      ref.connectedTo(siblings.filter((drop) => drop && drop !== this).map((list) => list._dropListRef)).withOrientation(this.orientation);
    });
  }
  _handleEvents(ref) {
    ref.beforeStarted.subscribe(() => {
      this._syncItemsWithRef(this.getSortedItems().map((item) => item._dragRef));
      this._changeDetectorRef.markForCheck();
    });
    ref.entered.subscribe((event) => {
      this.entered.emit({
        container: this,
        item: event.item.data,
        currentIndex: event.currentIndex
      });
    });
    ref.exited.subscribe((event) => {
      this.exited.emit({
        container: this,
        item: event.item.data
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.sorted.subscribe((event) => {
      this.sorted.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        container: this,
        item: event.item.data
      });
    });
    ref.dropped.subscribe((dropEvent) => {
      this.dropped.emit({
        previousIndex: dropEvent.previousIndex,
        currentIndex: dropEvent.currentIndex,
        previousContainer: dropEvent.previousContainer.data,
        container: dropEvent.container.data,
        item: dropEvent.item.data,
        isPointerOverContainer: dropEvent.isPointerOverContainer,
        distance: dropEvent.distance,
        dropPoint: dropEvent.dropPoint,
        event: dropEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    merge(ref.receivingStarted, ref.receivingStopped).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  _assignDefaults(config) {
    const {
      lockAxis,
      draggingDisabled,
      sortingDisabled,
      listAutoScrollDisabled,
      listOrientation
    } = config;
    this.disabled = draggingDisabled == null ? false : draggingDisabled;
    this.sortingDisabled = sortingDisabled == null ? false : sortingDisabled;
    this.autoScrollDisabled = listAutoScrollDisabled == null ? false : listAutoScrollDisabled;
    this.orientation = listOrientation || "vertical";
    this.lockAxis = lockAxis || null;
  }
  _syncItemsWithRef(items) {
    this._latestSortedRefs = items;
    this._dropListRef.withItems(items);
  }
  static \u0275fac = function CdkDropList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDropList)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDropList,
    selectors: [["", "cdkDropList", ""], ["cdk-drop-list"]],
    hostAttrs: [1, "cdk-drop-list"],
    hostVars: 7,
    hostBindings: function CdkDropList_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("id", ctx.id);
        \u0275\u0275classProp("cdk-drop-list-disabled", ctx.disabled)("cdk-drop-list-dragging", ctx._dropListRef.isDragging())("cdk-drop-list-receiving", ctx._dropListRef.isReceiving());
      }
    },
    inputs: {
      connectedTo: [0, "cdkDropListConnectedTo", "connectedTo"],
      data: [0, "cdkDropListData", "data"],
      orientation: [0, "cdkDropListOrientation", "orientation"],
      id: "id",
      lockAxis: [0, "cdkDropListLockAxis", "lockAxis"],
      disabled: [2, "cdkDropListDisabled", "disabled", booleanAttribute],
      sortingDisabled: [2, "cdkDropListSortingDisabled", "sortingDisabled", booleanAttribute],
      enterPredicate: [0, "cdkDropListEnterPredicate", "enterPredicate"],
      sortPredicate: [0, "cdkDropListSortPredicate", "sortPredicate"],
      autoScrollDisabled: [2, "cdkDropListAutoScrollDisabled", "autoScrollDisabled", booleanAttribute],
      autoScrollStep: [0, "cdkDropListAutoScrollStep", "autoScrollStep"],
      elementContainerSelector: [0, "cdkDropListElementContainer", "elementContainerSelector"],
      hasAnchor: [2, "cdkDropListHasAnchor", "hasAnchor", booleanAttribute]
    },
    outputs: {
      dropped: "cdkDropListDropped",
      entered: "cdkDropListEntered",
      exited: "cdkDropListExited",
      sorted: "cdkDropListSorted"
    },
    exportAs: ["cdkDropList"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DROP_LIST_GROUP,
      useValue: void 0
    }, {
      provide: CDK_DROP_LIST,
      useExisting: _CdkDropList
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDropList, [{
    type: Directive,
    args: [{
      selector: "[cdkDropList], cdk-drop-list",
      exportAs: "cdkDropList",
      providers: [{
        provide: CDK_DROP_LIST_GROUP,
        useValue: void 0
      }, {
        provide: CDK_DROP_LIST,
        useExisting: CdkDropList
      }],
      host: {
        "class": "cdk-drop-list",
        "[attr.id]": "id",
        "[class.cdk-drop-list-disabled]": "disabled",
        "[class.cdk-drop-list-dragging]": "_dropListRef.isDragging()",
        "[class.cdk-drop-list-receiving]": "_dropListRef.isReceiving()"
      }
    }]
  }], () => [], {
    connectedTo: [{
      type: Input,
      args: ["cdkDropListConnectedTo"]
    }],
    data: [{
      type: Input,
      args: ["cdkDropListData"]
    }],
    orientation: [{
      type: Input,
      args: ["cdkDropListOrientation"]
    }],
    id: [{
      type: Input
    }],
    lockAxis: [{
      type: Input,
      args: ["cdkDropListLockAxis"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListDisabled",
        transform: booleanAttribute
      }]
    }],
    sortingDisabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListSortingDisabled",
        transform: booleanAttribute
      }]
    }],
    enterPredicate: [{
      type: Input,
      args: ["cdkDropListEnterPredicate"]
    }],
    sortPredicate: [{
      type: Input,
      args: ["cdkDropListSortPredicate"]
    }],
    autoScrollDisabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListAutoScrollDisabled",
        transform: booleanAttribute
      }]
    }],
    autoScrollStep: [{
      type: Input,
      args: ["cdkDropListAutoScrollStep"]
    }],
    elementContainerSelector: [{
      type: Input,
      args: ["cdkDropListElementContainer"]
    }],
    hasAnchor: [{
      type: Input,
      args: [{
        alias: "cdkDropListHasAnchor",
        transform: booleanAttribute
      }]
    }],
    dropped: [{
      type: Output,
      args: ["cdkDropListDropped"]
    }],
    entered: [{
      type: Output,
      args: ["cdkDropListEntered"]
    }],
    exited: [{
      type: Output,
      args: ["cdkDropListExited"]
    }],
    sorted: [{
      type: Output,
      args: ["cdkDropListSorted"]
    }]
  });
})();
var CDK_DRAG_PREVIEW = new InjectionToken("CdkDragPreview");
var CdkDragPreview = class _CdkDragPreview {
  templateRef = inject(TemplateRef);
  _drag = inject(CDK_DRAG_PARENT, {
    optional: true
  });
  data;
  matchSize = false;
  constructor() {
    this._drag?._setPreviewTemplate(this);
  }
  ngOnDestroy() {
    this._drag?._resetPreviewTemplate(this);
  }
  static \u0275fac = function CdkDragPreview_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDragPreview)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDragPreview,
    selectors: [["ng-template", "cdkDragPreview", ""]],
    inputs: {
      data: "data",
      matchSize: [2, "matchSize", "matchSize", booleanAttribute]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_PREVIEW,
      useExisting: _CdkDragPreview
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragPreview, [{
    type: Directive,
    args: [{
      selector: "ng-template[cdkDragPreview]",
      providers: [{
        provide: CDK_DRAG_PREVIEW,
        useExisting: CdkDragPreview
      }]
    }]
  }], () => [], {
    data: [{
      type: Input
    }],
    matchSize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CDK_DRAG_PLACEHOLDER = new InjectionToken("CdkDragPlaceholder");
var CdkDragPlaceholder = class _CdkDragPlaceholder {
  templateRef = inject(TemplateRef);
  _drag = inject(CDK_DRAG_PARENT, {
    optional: true
  });
  data;
  constructor() {
    this._drag?._setPlaceholderTemplate(this);
  }
  ngOnDestroy() {
    this._drag?._resetPlaceholderTemplate(this);
  }
  static \u0275fac = function CdkDragPlaceholder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDragPlaceholder)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDragPlaceholder,
    selectors: [["ng-template", "cdkDragPlaceholder", ""]],
    inputs: {
      data: "data"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_PLACEHOLDER,
      useExisting: _CdkDragPlaceholder
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragPlaceholder, [{
    type: Directive,
    args: [{
      selector: "ng-template[cdkDragPlaceholder]",
      providers: [{
        provide: CDK_DRAG_PLACEHOLDER,
        useExisting: CdkDragPlaceholder
      }]
    }]
  }], () => [], {
    data: [{
      type: Input
    }]
  });
})();
var DRAG_DROP_DIRECTIVES = [CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder];
var DragDropModule = class _DragDropModule {
  static \u0275fac = function DragDropModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DragDropModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _DragDropModule,
    imports: [CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder],
    exports: [CdkScrollableModule, CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [DragDrop],
    imports: [CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDropModule, [{
    type: NgModule,
    args: [{
      imports: DRAG_DROP_DIRECTIVES,
      exports: [CdkScrollableModule, ...DRAG_DROP_DIRECTIVES],
      providers: [DragDrop]
    }]
  }], null, null);
})();

// src/app/modules/projects/widgets/task-detail/task-detail.ts
var _c0 = ["scrollArea"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.predecessor_id;
function TaskDetail_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function TaskDetail_Conditional_28_For_2_Template_div_click_0_listener() {
      const milestone_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectMilestone(milestone_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const milestone_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-blue-600", ctx_r3.task.milestone_id == milestone_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", milestone_r3.name, " ");
  }
}
function TaskDetail_Conditional_28_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275text(1, "No milestones found");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275listener("click", function TaskDetail_Conditional_28_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, TaskDetail_Conditional_28_For_2_Template, 2, 3, "div", 71, _forTrack0);
    \u0275\u0275conditionalCreate(3, TaskDetail_Conditional_28_Conditional_3_Template, 2, 0, "div", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.milestones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r3.milestones || ctx_r3.milestones.length === 0 ? 3 : -1);
  }
}
function TaskDetail_Conditional_40_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function TaskDetail_Conditional_40_For_2_Template_div_click_0_listener() {
      const sub_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectSubMilestone(sub_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-blue-600", ctx_r3.task.submilestone_id == sub_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sub_r6.name, " ");
  }
}
function TaskDetail_Conditional_40_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275text(1, "No sub milestones found");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275listener("click", function TaskDetail_Conditional_40_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, TaskDetail_Conditional_40_For_2_Template, 2, 3, "div", 71, _forTrack0);
    \u0275\u0275conditionalCreate(3, TaskDetail_Conditional_40_Conditional_3_Template, 2, 0, "div", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.subMilestones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r3.subMilestones || ctx_r3.subMilestones.length === 0 ? 3 : -1);
  }
}
function TaskDetail_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "No Sub Milestone Found");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_42_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.task.title, $event) || (ctx_r3.task.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "textarea", 75);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_42_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.task.description, $event) || (ctx_r3.task.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.task.title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.task.description);
  }
}
function TaskDetail_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 77);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.task.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.task.description || "No description provided for this task.", " ");
  }
}
function TaskDetail_For_57_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_For_57_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 80);
    \u0275\u0275listener("ngModelChange", function TaskDetail_For_57_Conditional_3_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onSubTaskChange(item_r9, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "button", 81);
    \u0275\u0275listener("click", function TaskDetail_For_57_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const item_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openDeleteSubTaskDialog(item_r9 == null ? null : item_r9.id));
    });
    \u0275\u0275elementStart(2, "span", 82);
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngModel", item_r9.title);
  }
}
function TaskDetail_For_57_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 84);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 85);
    \u0275\u0275text(5, "more_vert");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMap(item_r9.completed ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-300 font-semibold");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r9.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r3.subTaskStatusClass(item_r9));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.subTaskStatus(item_r9));
  }
}
function TaskDetail_For_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 78);
    \u0275\u0275listener("click", function TaskDetail_For_57_Template_div_click_1_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.isEditing ? ctx_r3.toggleChecklist(item_r9) : null);
    });
    \u0275\u0275conditionalCreate(2, TaskDetail_For_57_Conditional_2_Template, 2, 0, "span", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, TaskDetail_For_57_Conditional_3_Template, 4, 1)(4, TaskDetail_For_57_Conditional_4_Template, 6, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(item_r9.completed ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-600 group-hover:border-blue-500");
    \u0275\u0275classProp("cursor-pointer", ctx_r3.isEditing)("cursor-default", !ctx_r3.isEditing);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r9.completed ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isEditing ? 3 : 4);
  }
}
function TaskDetail_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "span", 86);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_58_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newSubTaskTitle, $event) || (ctx_r3.newSubTaskTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function TaskDetail_Conditional_58_Template_input_keyup_enter_3_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addSubTask());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 88);
    \u0275\u0275listener("click", function TaskDetail_Conditional_58_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addSubTask());
    });
    \u0275\u0275text(5, "Add");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newSubTaskTitle);
  }
}
function TaskDetail_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 89);
    \u0275\u0275listener("click", function TaskDetail_Conditional_67_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openUploadModal());
    });
    \u0275\u0275elementStart(1, "span", 90);
    \u0275\u0275text(2, "upload");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Upload ");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35)(1, "span", 90);
    \u0275\u0275text(2, "upload");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Upload ");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_For_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 91)(2, "span", 92);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 93)(5, "p", 52);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 53);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "a", 94);
    \u0275\u0275text(11, "download");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r13 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r3.getFileIconMeta(file_r13.name).bg);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r3.getFileIconMeta(file_r13.name).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.getFileIconMeta(file_r13.name).icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", file_r13.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", file_r13.size, " \u2022 ", \u0275\u0275pipeBind1(9, 7, file_r13.createdAt));
    \u0275\u0275advance(2);
    \u0275\u0275property("href", file_r13.url, \u0275\u0275sanitizeUrl);
  }
}
function TaskDetail_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1, "No attachments yet.");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 95);
    \u0275\u0275listener("click", function TaskDetail_Conditional_73_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleAttachmentsView());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 96);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.showAllAttachments ? "Show less" : "View all attachments (" + ctx_r3.task.attachments.length + ")", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.showAllAttachments ? "expand_less" : "chevron_right");
  }
}
function TaskDetail_For_85_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 103);
    \u0275\u0275listener("click", function TaskDetail_For_85_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const dep_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeDependency(dep_r16));
    });
    \u0275\u0275elementStart(1, "span", 82);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function TaskDetail_For_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 97)(2, "div", 98);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 99)(5, "p", 100);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 101);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(9, TaskDetail_For_85_Conditional_9_Template, 3, 0, "button", 102);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dep_r16 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.depTypeClass(dep_r16.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", dep_r16.type, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.getTaskTitle(dep_r16.predecessor_id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lag: ", dep_r16.lag, " days");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isEditing ? 9 : -1);
  }
}
function TaskDetail_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 104);
    \u0275\u0275text(2, "link_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 105);
    \u0275\u0275text(4, "No predecessors defined.");
    \u0275\u0275elementEnd()();
  }
}
function TaskDetail_Conditional_87_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 117);
    \u0275\u0275listener("click", function TaskDetail_Conditional_87_Conditional_9_For_2_Template_div_click_0_listener() {
      const t_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.selectPredecessor(t_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r19 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("text-blue-600", ctx_r3.selectedPredecessorId == t_r19.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r19.title, " ");
  }
}
function TaskDetail_Conditional_87_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275text(1, "No tasks found");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_87_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275listener("click", function TaskDetail_Conditional_87_Conditional_9_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, TaskDetail_Conditional_87_Conditional_9_For_2_Template, 2, 3, "div", 116, _forTrack0);
    \u0275\u0275conditionalCreate(3, TaskDetail_Conditional_87_Conditional_9_Conditional_3_Template, 2, 0, "div", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.allTasks);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r3.allTasks || ctx_r3.allTasks.length === 0 ? 3 : -1);
  }
}
function TaskDetail_Conditional_87_Conditional_17_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 117);
    \u0275\u0275listener("click", function TaskDetail_Conditional_87_Conditional_17_For_2_Template_div_click_0_listener() {
      const type_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.selectDepType(type_r21));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r21 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("text-blue-600", ctx_r3.selectedDepType == type_r21.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r21.name, " ");
  }
}
function TaskDetail_Conditional_87_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275listener("click", function TaskDetail_Conditional_87_Conditional_17_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, TaskDetail_Conditional_87_Conditional_17_For_2_Template, 2, 3, "div", 116, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.dependencyTypes);
  }
}
function TaskDetail_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "p", 106);
    \u0275\u0275text(2, "Add Predecessor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15)(4, "button", 107);
    \u0275\u0275listener("click", function TaskDetail_Conditional_87_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r3 = \u0275\u0275nextContext();
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r3.togglePredecessorDropdown());
    });
    \u0275\u0275elementStart(5, "span", 17);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 108);
    \u0275\u0275text(8, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, TaskDetail_Conditional_87_Conditional_9_Template, 4, 1, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 109)(11, "div", 110)(12, "button", 111);
    \u0275\u0275listener("click", function TaskDetail_Conditional_87_Template_button_click_12_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r3 = \u0275\u0275nextContext();
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r3.toggleDepTypeDropdown());
    });
    \u0275\u0275elementStart(13, "span", 17);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 112);
    \u0275\u0275text(16, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, TaskDetail_Conditional_87_Conditional_17_Template, 3, 0, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 113);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_87_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.depLag, $event) || (ctx_r3.depLag = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "p", 114);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 115);
    \u0275\u0275listener("click", function TaskDetail_Conditional_87_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addDependency());
    });
    \u0275\u0275elementStart(22, "span", 90);
    \u0275\u0275text(23, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Add Predecessor ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-blue-500", ctx_r3.predecessorOpen)("ring-4", ctx_r3.predecessorOpen)("ring-blue-100", ctx_r3.predecessorOpen)("dark:ring-blue-900", ctx_r3.predecessorOpen);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-slate-400", !ctx_r3.selectedPredecessorId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.selectedPredecessorId ? ctx_r3.selectedPredecessorName : "Select Task");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r3.predecessorOpen)("text-blue-600", ctx_r3.predecessorOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.predecessorOpen ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-blue-500", ctx_r3.depTypeOpen)("ring-4", ctx_r3.depTypeOpen)("ring-blue-100", ctx_r3.depTypeOpen)("dark:ring-blue-900", ctx_r3.depTypeOpen);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.selectedDepTypeName);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r3.depTypeOpen)("text-blue-600", ctx_r3.depTypeOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.depTypeOpen ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.depLag);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getSelectedDepDesc());
  }
}
function TaskDetail_Conditional_97_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function TaskDetail_Conditional_97_Conditional_6_For_2_Template_div_click_0_listener($event) {
      const member_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r3.selectAssignee(member_r24));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r24 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("text-blue-600", (ctx_r3.task.assignees == null ? null : ctx_r3.task.assignees[0] == null ? null : ctx_r3.task.assignees[0].id) == member_r24.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", member_r24.firstname, " ", member_r24.lastname, " ");
  }
}
function TaskDetail_Conditional_97_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275text(1, "No team members found");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_97_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275listener("click", function TaskDetail_Conditional_97_Conditional_6_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, TaskDetail_Conditional_97_Conditional_6_For_2_Template, 2, 4, "div", 71, _forTrack0);
    \u0275\u0275conditionalCreate(3, TaskDetail_Conditional_97_Conditional_6_Conditional_3_Template, 2, 0, "div", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.teamMembers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r3.teamMembers || ctx_r3.teamMembers.length === 0 ? 3 : -1);
  }
}
function TaskDetail_Conditional_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "button", 118);
    \u0275\u0275listener("click", function TaskDetail_Conditional_97_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r3 = \u0275\u0275nextContext();
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r3.toggleAssigneeDropdown());
    });
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 112);
    \u0275\u0275text(5, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, TaskDetail_Conditional_97_Conditional_6_Template, 4, 1, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("border-blue-500", ctx_r3.assigneeOpen)("ring-4", ctx_r3.assigneeOpen)("ring-blue-100", ctx_r3.assigneeOpen)("dark:ring-blue-900", ctx_r3.assigneeOpen);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-slate-400", !(ctx_r3.task.assignees == null ? null : ctx_r3.task.assignees[0] == null ? null : ctx_r3.task.assignees[0].firstname));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.selectedAssigneeName);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r3.assigneeOpen)("text-blue-600", ctx_r3.assigneeOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.assigneeOpen ? 6 : -1);
  }
}
function TaskDetail_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 119);
    \u0275\u0275text(3, " Primary Contact ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r3.task.assignees == null ? null : ctx_r3.task.assignees[0] == null ? null : ctx_r3.task.assignees[0].firstname, " ", (ctx_r3.task.assignees == null ? null : ctx_r3.task.assignees[0] == null ? null : ctx_r3.task.assignees[0].lastname) || "Unassigned", " ");
  }
}
function TaskDetail_For_120_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275element(1, "div", 120);
    \u0275\u0275elementStart(2, "p", 121)(3, "span", 122);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 123);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const act_r25 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((act_r25.user == null ? null : act_r25.user.firstname) || "System");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", act_r25.detail, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 3, act_r25.createdAt, "shortTime"));
  }
}
function TaskDetail_Conditional_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59);
    \u0275\u0275text(1, "No activity yet.");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_Conditional_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275text(1, " View all activities ");
    \u0275\u0275elementStart(2, "span", 96);
    \u0275\u0275text(3, "chevron_right");
    \u0275\u0275elementEnd()();
  }
}
function TaskDetail_Conditional_123_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "h2", 44)(2, "span", 45);
    \u0275\u0275text(3, "chat_bubble");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Add Comment ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 124);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_123_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newComment, $event) || (ctx_r3.newComment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function TaskDetail_Conditional_123_Template_input_keyup_enter_5_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.postComment());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 125);
    \u0275\u0275listener("click", function TaskDetail_Conditional_123_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.postComment());
    });
    \u0275\u0275elementStart(7, "span", 82);
    \u0275\u0275text(8, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Post Comment ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newComment);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.newComment.trim());
  }
}
var TaskDetail = class _TaskDetail {
  task;
  close = new EventEmitter();
  scrollAreaRef;
  projectService = inject(ProjectService);
  toastr = inject(ToastrService);
  allTasks = [];
  isAdjustingHeight = false;
  isEditing = false;
  newComment = "";
  newSubTaskTitle = "";
  showUploadModal = false;
  showDeleteSubTaskModal = false;
  subTaskToDelete = null;
  isUploading = false;
  showAllAttachments = false;
  selectedPredecessorId = "";
  selectedDepType = "FS";
  depLag = 0;
  milestoneOpen = false;
  subMilestoneOpen = false;
  assigneeOpen = false;
  predecessorOpen = false;
  depTypeOpen = false;
  dependencyTypes = [
    { id: "FS", name: "Finish-to-Start (FS)", desc: "Predecessor must finish before Successor can start" },
    { id: "SS", name: "Start-to-Start (SS)", desc: "Predecessor must start before Successor can start" },
    { id: "FF", name: "Finish-to-Finish (FF)", desc: "Predecessor must finish before Successor can finish" },
    { id: "SF", name: "Start-to-Finish (SF)", desc: "Predecessor must start before Successor can finish" }
  ];
  teamMembers = [];
  loggedInUser = { name: "James Wilson" };
  milestones;
  subMilestones;
  constructor() {
  }
  ngOnInit() {
    if (this.task) {
      this.projectService.getProjectTasks(this.task.project_id).subscribe((res) => {
        this.allTasks = res.data;
      });
      this.fetchTeamMembers();
    }
  }
  mutationObserver;
  ngAfterViewInit() {
    requestAnimationFrame(() => requestAnimationFrame(() => this.adjustScrollHeight()));
    window.addEventListener("resize", this.adjustScrollHeight);
    const el = this.scrollAreaRef?.nativeElement;
    if (el) {
      this.mutationObserver = new MutationObserver(() => {
        requestAnimationFrame(() => this.adjustScrollHeight());
      });
      this.mutationObserver.observe(el, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
    }
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.adjustScrollHeight);
    this.mutationObserver?.disconnect();
    this.restoreAncestorScrolling();
  }
  neutralizedElements = /* @__PURE__ */ new Map();
  neutralizeAncestorScrolling(el) {
    let parent = el.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const computed = window.getComputedStyle(parent);
      const needsOverflowYFix = computed.overflowY === "auto" || computed.overflowY === "scroll";
      const needsOverflowFix = computed.overflow === "auto" || computed.overflow === "scroll";
      if (needsOverflowYFix || needsOverflowFix) {
        if (!this.neutralizedElements.has(parent)) {
          this.neutralizedElements.set(parent, {
            overflow: parent.style.overflow,
            overflowY: parent.style.overflowY
          });
        }
        if (needsOverflowYFix)
          parent.style.overflowY = "hidden";
        if (needsOverflowFix)
          parent.style.overflow = "hidden";
      }
      parent = parent.parentElement;
    }
  }
  restoreAncestorScrolling() {
    this.neutralizedElements.forEach((original, el) => {
      el.style.overflow = original.overflow;
      el.style.overflowY = original.overflowY;
    });
    this.neutralizedElements.clear();
  }
  adjustScrollHeight = () => {
    if (this.isAdjustingHeight)
      return;
    this.isAdjustingHeight = true;
    const el = this.scrollAreaRef?.nativeElement;
    if (!el) {
      this.isAdjustingHeight = false;
      return;
    }
    const dialogHeight = window.innerHeight * 0.96;
    const dialogTop = (window.innerHeight - dialogHeight) / 2;
    const dialogBottom = dialogTop + dialogHeight;
    const elTop = el.getBoundingClientRect().top;
    const bottomSafetyBuffer = 40;
    const available = dialogBottom - elTop - bottomSafetyBuffer;
    const newMaxHeight = `${Math.max(available, 200)}px`;
    if (el.style.maxHeight !== newMaxHeight) {
      el.style.maxHeight = newMaxHeight;
    }
    el.style.boxSizing = "border-box";
    this.neutralizeAncestorScrolling(el);
    requestAnimationFrame(() => {
      this.isAdjustingHeight = false;
    });
  };
  environment = environment;
  onDocumentClick() {
    this.closeAllDropdowns();
  }
  closeAllDropdowns(except) {
    if (except !== "milestone")
      this.milestoneOpen = false;
    if (except !== "subMilestone")
      this.subMilestoneOpen = false;
    if (except !== "assignee")
      this.assigneeOpen = false;
    if (except !== "predecessor")
      this.predecessorOpen = false;
    if (except !== "depType")
      this.depTypeOpen = false;
  }
  toggleMilestoneDropdown() {
    if (!this.isEditing)
      return;
    const next = !this.milestoneOpen;
    this.closeAllDropdowns("milestone");
    this.milestoneOpen = next;
  }
  toggleSubMilestoneDropdown() {
    if (!this.isEditing)
      return;
    const next = !this.subMilestoneOpen;
    this.closeAllDropdowns("subMilestone");
    this.subMilestoneOpen = next;
  }
  toggleAssigneeDropdown() {
    if (!this.isEditing)
      return;
    const next = !this.assigneeOpen;
    this.closeAllDropdowns("assignee");
    this.assigneeOpen = next;
  }
  togglePredecessorDropdown() {
    const next = !this.predecessorOpen;
    this.closeAllDropdowns("predecessor");
    this.predecessorOpen = next;
  }
  toggleDepTypeDropdown() {
    const next = !this.depTypeOpen;
    this.closeAllDropdowns("depType");
    this.depTypeOpen = next;
  }
  selectMilestone(milestone) {
    this.task.milestone_id = milestone.id;
    this.onMilestoneChange({ target: { value: milestone.id } });
    this.milestoneOpen = false;
  }
  selectSubMilestone(sub) {
    this.task.submilestone_id = sub.id;
    this.subMilestoneOpen = false;
  }
  selectAssignee(member) {
    if (!member)
      return;
    this.task.assignees = [__spreadValues({}, member)];
    this.assigneeOpen = false;
    this.projectService.updateTask(this.task.id, { assignees: [member.id] }).subscribe({
      next: () => {
        this.toastr.success("Assignee updated");
      },
      error: () => {
        this.toastr.error("Failed to update assignee");
      }
    });
  }
  get selectedAssigneeName() {
    const a = this.task?.assignees?.[0];
    if (!a || !a.firstname)
      return "Select Assignee";
    return `${a.firstname} ${a.lastname || ""}`.trim();
  }
  selectPredecessor(t) {
    this.selectedPredecessorId = t.id;
    this.predecessorOpen = false;
  }
  selectDepType(type) {
    this.selectedDepType = type.id;
    this.depTypeOpen = false;
  }
  get selectedMilestoneName() {
    return this.milestones?.find((m) => m.id == this.task?.milestone_id)?.name || "Select Milestone";
  }
  get selectedSubMilestoneName() {
    return this.subMilestones?.find((s) => s.id == this.task?.submilestone_id)?.name || "Select Sub Milestone";
  }
  get selectedPredecessorName() {
    return this.allTasks?.find((t) => t.id === Number(this.selectedPredecessorId))?.title || "Select Task";
  }
  get selectedDepTypeName() {
    return this.dependencyTypes.find((t) => t.id === this.selectedDepType)?.name || "Select Type";
  }
  getAvatarUrl(avatar) {
    if (!avatar) {
      return "assets/default-avatar.png";
    }
    if (avatar.startsWith("http")) {
      return avatar;
    }
    return `${this.environment.serverUrl}${avatar}`;
  }
  onAvatarError(event, name) {
    const target = event.target;
    target.onerror = null;
    const displayName = name?.trim() || "User";
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2563eb&color=fff&bold=true`;
  }
  onMilestoneChange(event) {
    const milestoneId = event.target.value || this.task.milestone_id;
    const milestone = this.milestones.find((m) => m.id == milestoneId);
    this.subMilestones = milestone?.children || [];
  }
  fetchTeamMembers() {
    this.projectService.getProjectById(this.task.project_id.toString()).subscribe({
      next: (res) => {
        this.teamMembers = res.data.team_members || [];
        this.milestones = res.data.milestones_with_child || [];
        this.onMilestoneChange({ target: { value: this.task.milestone_id } });
      }
    });
  }
  toggleEditMode() {
    if (this.isEditing) {
      this.saveTaskUpdates();
    }
    this.isEditing = !this.isEditing;
    this.closeAllDropdowns();
    setTimeout(() => this.adjustScrollHeight());
  }
  saveTaskUpdates() {
    const payload = {
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      status: this.task.status,
      due_date: this.task.due_date,
      dependencies: this.task.dependencies
    };
    this.projectService.updateTask(this.task.id, payload).subscribe({
      next: () => this.toastr.success("Task details updated"),
      error: () => this.toastr.error("Failed to update task details")
    });
  }
  onClose() {
    this.restoreAncestorScrolling();
    this.close.emit();
  }
  get checklistProgress() {
    if (!this.task?.sub_tasks || this.task.sub_tasks.length === 0)
      return 0;
    const completed = this.task.sub_tasks.filter((i) => i.completed).length;
    return Math.round(completed / this.task.sub_tasks.length * 100);
  }
  toggleChecklist(item) {
    if (!this.isEditing)
      return;
    const newStatus = !item.completed;
    this.projectService.updateSubTask(item?.id, { completed: newStatus }).subscribe({
      next: () => {
        item.completed = newStatus;
        this.task.progress = this.checklistProgress;
      }
    });
  }
  addSubTask() {
    if (!this.isEditing || !this.newSubTaskTitle.trim())
      return;
    this.projectService.createSubTask(this.task.id, this.newSubTaskTitle.trim()).subscribe({
      next: (res) => {
        if (!this.task.sub_tasks)
          this.task.sub_tasks = [];
        this.task.sub_tasks.push(res.data);
        this.newSubTaskTitle = "";
        this.toastr.success("Sub-task added");
      },
      error: () => this.toastr.error("Error adding sub-task")
    });
  }
  openDeleteSubTaskDialog(subTaskId) {
    if (!this.isEditing)
      return;
    this.subTaskToDelete = subTaskId;
    this.showDeleteSubTaskModal = true;
  }
  closeDeleteSubTaskDialog() {
    this.showDeleteSubTaskModal = false;
    this.subTaskToDelete = null;
  }
  confirmDeleteSubTask() {
    if (!this.subTaskToDelete)
      return;
    this.removeSubTask(this.subTaskToDelete);
  }
  removeSubTask(subTaskId) {
    this.projectService.deleteSubTask(subTaskId).subscribe({
      next: () => {
        if (this.task.sub_tasks) {
          this.task.sub_tasks = this.task.sub_tasks.filter((i) => i.id !== subTaskId);
        }
        this.closeDeleteSubTaskDialog();
        this.toastr.info("Sub-task removed");
      }
    });
  }
  onSubTaskChange(item, newTitle) {
    if (!this.isEditing)
      return;
    if (item.title !== newTitle) {
      this.projectService.updateSubTask(item?.id, { title: newTitle }).subscribe({
        next: () => item.title = newTitle,
        error: () => this.toastr.error("Error updating sub-task")
      });
    }
  }
  postComment() {
    const trimmedComment = this.newComment?.trim();
    if (!trimmedComment)
      return;
    this.projectService.addTaskComment(this.task.id, trimmedComment).subscribe({
      next: (res) => {
        if (!this.task.comments)
          this.task.comments = [];
        this.task.comments.unshift(res.data);
        if (!this.task.activities)
          this.task.activities = [];
        this.task.activities.unshift({
          id: Date.now(),
          task_id: Number(this.task.id),
          user_id: 0,
          user: { id: 0, firstname: "You", lastname: "" },
          detail: `commented: "${this.newComment}"`,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          action_type: "COMMENT"
        });
        this.newComment = "";
        this.toastr.success("Comment posted");
      },
      error: () => this.toastr.error("Error posting comment")
    });
  }
  openUploadModal() {
    this.showUploadModal = true;
  }
  onFileSelected(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("attachments", files[i]);
    }
    this.isUploading = true;
    this.projectService.uploadTaskAttachment(this.task.id, formData).subscribe({
      next: (res) => {
        if (!this.task.attachments)
          this.task.attachments = [];
        this.task.attachments.push(...res.data);
        this.isUploading = false;
        this.showUploadModal = false;
        this.toastr.success("Files uploaded");
      },
      error: () => {
        this.isUploading = false;
        this.toastr.error("Upload failed");
      }
    });
  }
  onAssigneeSelect(event) {
    const userId = event.target.value;
    this.projectService.updateTask(this.task.id, { assignees: [userId] }).subscribe({
      next: () => {
        this.toastr.success("Assignee updated");
      }
    });
  }
  addDependency() {
    if (!this.selectedPredecessorId)
      return;
    const pred = this.allTasks.find((t) => t.id === Number(this.selectedPredecessorId));
    if (!pred)
      return;
    if (!this.task.dependencies)
      this.task.dependencies = [];
    if (this.task.dependencies.some((d) => d.predecessor_id === Number(this.selectedPredecessorId))) {
      this.toastr.warning("Dependency already exists");
      return;
    }
    this.task.dependencies.push({
      id: 0,
      task_id: this.task.id,
      predecessor_id: Number(this.selectedPredecessorId),
      type: this.selectedDepType,
      lag: this.depLag
    });
    this.selectedPredecessorId = "";
    this.depLag = 0;
  }
  getSelectedDepDesc() {
    return this.dependencyTypes.find((t) => t.id === this.selectedDepType)?.desc || "";
  }
  removeDependency(dep) {
    if (this.task.dependencies) {
      this.task.dependencies = this.task.dependencies.filter((d) => d !== dep);
    }
  }
  getTaskTitle(id) {
    const taskId = typeof id === "string" ? Number(id) : id;
    return this.allTasks.find((t) => t.id === taskId)?.title || `Task #${id}`;
  }
  priorityBadgeClass() {
    switch ((this.task?.priority || "").toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";
      case "medium":
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
      case "low":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      default:
        return "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400";
    }
  }
  subTaskStatus(item) {
    return item.completed ? "Completed" : "Pending";
  }
  subTaskStatusClass(item) {
    return item.completed ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500";
  }
  depTypeClass(type) {
    switch (type) {
      case "FS":
        return "bg-blue-100 text-blue-600";
      case "SS":
        return "bg-emerald-100 text-emerald-600";
      case "FF":
        return "bg-violet-100 text-violet-600";
      case "SF":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-slate-100 text-slate-500";
    }
  }
  getFileIconMeta(name) {
    const ext = name?.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return { icon: "picture_as_pdf", bg: "bg-red-100", color: "text-red-600" };
      case "xlsx":
      case "xls":
      case "csv":
        return { icon: "table_chart", bg: "bg-emerald-100", color: "text-emerald-600" };
      case "doc":
      case "docx":
        return { icon: "description", bg: "bg-blue-100", color: "text-blue-600" };
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return { icon: "image", bg: "bg-violet-100", color: "text-violet-600" };
      default:
        return { icon: "draft", bg: "bg-slate-100", color: "text-slate-500" };
    }
  }
  get visibleAttachments() {
    if (!this.task?.attachments)
      return [];
    return this.showAllAttachments ? this.task.attachments : this.task.attachments.slice(0, 3);
  }
  toggleAttachmentsView() {
    this.showAllAttachments = !this.showAllAttachments;
  }
  static \u0275fac = function TaskDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaskDetail)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskDetail, selectors: [["app-task-detail"]], viewQuery: function TaskDetail_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.scrollAreaRef = _t.first);
    }
  }, hostBindings: function TaskDetail_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function TaskDetail_click_HostBindingHandler() {
        return ctx.onDocumentClick();
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { task: "task" }, outputs: { close: "close" }, decls: 137, vars: 72, consts: [["scrollArea", ""], ["size", "xl", "height", "!h-[96vh]", "title", "Task Details", "custom-scrollbar", "", "icon", "assignment", "panelClass", "rounded-2xl border border-slate-200/50 dark:border-slate-800/50 transition-all !w-[92vw] sm:!w-[88vw] !max-w-[1280px]", "contentClass", "min-h-0 flex-1 overflow-hidden bg-slate-50/60 dark:bg-slate-950", 3, "closed", "open", "subtitle", "badge", "badgeClass", "showCloseButton"], ["dialog-header-actions", "", 1, "flex", "items-center", "gap-2", "px-3", "sm:px-4", "py-2", "rounded-xl", "bg-blue-600", "text-white", "font-semibold", "hover:bg-blue-700", "transition-colors", "cursor-pointer", "shadow-sm", "shadow-blue-600/20", "text-sm", "sm:text-base", "whitespace-nowrap", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "hidden", "xs:inline"], [1, "task-detail-scroll", "grid", "grid-cols-1", "md:grid-cols-12", "gap-6", "sm:gap-8", "p-4", "sm:p-6", "lg:p-8"], [1, "md:col-span-8", "space-y-5", "sm:space-y-6"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "shadow-sm", "p-4", "sm:p-6"], [1, "flex", "items-center", "gap-2", "mb-4", "sm:mb-5"], [1, "material-symbols-outlined", "text-blue-600", "text-[18px]"], [1, "text-xs", "font-black", "uppercase", "tracking-[0.15em]", "text-blue-600"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mb-6"], [1, "space-y-2"], [1, "flex", "items-center", "gap-1.5", "text-[11px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "material-symbols-outlined", "text-[14px]", "text-emerald-500"], [1, "relative"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "gap-2", "bg-white", "dark:bg-slate-800", "border-2", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "p-3", "text-sm", "font-semibold", "text-slate-700", "dark:text-slate-200", "outline-none", "transition-all", "cursor-pointer", "disabled:cursor-default", "disabled:opacity-100", "disabled:bg-slate-50", "dark:disabled:bg-slate-800/60", 3, "click", "disabled"], [1, "truncate", "text-left"], [1, "material-symbols-outlined", "text-slate-400", "shrink-0", "transition-transform", "duration-200"], [1, "animate-in", "fade-in", "duration-150", "absolute", "z-20", "mt-2", "w-full", "bg-white", "dark:bg-slate-800", "border", "border-slate-100", "dark:border-slate-700", "rounded-2xl", "shadow-lg", "max-h-56", "overflow-y-auto", "scroll-smooth", "py-2"], [1, "material-symbols-outlined", "text-[14px]", "text-amber-500"], [1, "text-xs", "text-red-500", "font-medium"], [1, "flex", "items-center", "gap-2", "mb-3"], [1, "flex", "items-center", "gap-3", "mb-4"], [1, "flex-1", "h-2", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "overflow-hidden"], [1, "h-full", "rounded-full", "bg-gradient-to-r", "from-blue-500", "to-blue-600", "transition-all"], [1, "text-xs", "font-bold", "text-blue-600", "dark:text-blue-400", "shrink-0"], [1, "flex", "items-center", "gap-2", "sm:gap-3", "p-2.5", "sm:p-3", "bg-slate-50/60", "dark:bg-slate-800/40", "rounded-xl", "border", "border-slate-100/70", "dark:border-slate-800/70", "group", "transition-colors", "hover:bg-slate-50", "dark:hover:bg-slate-800"], [1, "flex", "items-center", "gap-3", "p-2", "mt-3", "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-dashed", "border-slate-300", "dark:border-slate-700"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-5", "sm:gap-6"], [1, "flex", "items-center", "justify-between", "mb-4", "gap-2"], [1, "flex", "items-center", "gap-2", "min-w-0"], [1, "material-symbols-outlined", "text-blue-600", "text-[18px]", "shrink-0"], [1, "text-xs", "font-black", "uppercase", "tracking-[0.15em]", "text-blue-600", "truncate"], [1, "text-xs", "font-bold", "text-blue-600", "hover:text-blue-700", "flex", "items-center", "gap-1", "cursor-pointer", "shrink-0"], [1, "text-xs", "font-semibold", "text-slate-400", "flex", "items-center", "gap-1", "shrink-0"], [1, "space-y-3"], [1, "flex", "items-center", "gap-3", "p-3", "rounded-xl", "border", "border-slate-100", "dark:border-slate-800", "hover:border-blue-100", "hover:bg-blue-50/40", "dark:hover:bg-blue-900/10", "transition-all", "cursor-pointer", "group"], [1, "text-xs", "text-slate-400", "text-center", "py-4"], [1, "mt-3", "text-xs", "font-bold", "text-blue-600", "hover:text-blue-700", "flex", "items-center", "gap-1", "cursor-pointer"], [1, "flex", "items-center", "justify-between", "gap-2", "p-3", "bg-slate-50/60", "dark:bg-slate-800/40", "rounded-xl", "border", "border-slate-100/70", "dark:border-slate-800/70", "group"], [1, "text-center", "py-6"], [1, "pt-4", "mt-4", "border-t", "border-slate-100", "dark:border-slate-800", "space-y-3"], [1, "md:col-span-4", "space-y-5", "sm:space-y-6"], [1, "flex", "items-center", "gap-1.5", "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "material-symbols-outlined", "text-[14px]"], [1, "flex", "flex-nowrap", "items-center", "gap-3", "sm:gap-4", "p-3", "sm:p-4", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-sm", "border", "border-slate-100", "dark:border-slate-800"], [1, "w-10", "h-10", "sm:w-12", "sm:h-12", "rounded-xl", "object-cover", "ring-2", "ring-slate-100", "dark:ring-slate-800", "shrink-0", 3, "error", "src", "alt"], [1, "flex-1", "min-w-0"], [1, "relative", "w-full"], [1, "flex", "flex-nowrap", "items-center", "gap-3", "sm:gap-4", "p-3", "sm:p-4", "bg-white/70", "dark:bg-slate-900/50", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "overflow-hidden", "min-w-0", "flex-1"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "truncate"], [1, "text-[10px]", "text-slate-500", "font-bold", "uppercase", "tracking-widest", "mt-0.5", "truncate"], [1, "space-y-3", "flex-1", "flex", "flex-col", "min-h-0"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "p-4", "sm:p-5"], [1, "max-h-64", "overflow-y-auto", "scroll-smooth", "pr-2"], [1, "space-y-6", "relative", "before:absolute", "before:left-[7px]", "before:top-2", "before:bottom-2", "before:w-[2px]", "before:bg-slate-100", "dark:before:bg-slate-800"], [1, "relative", "pl-8", "animate-in", "fade-in", "duration-500"], [1, "text-xs", "text-slate-400", "text-center", "py-4", "pl-0"], [1, "mt-4", "text-xs", "font-bold", "text-blue-600", "hover:text-blue-700", "flex", "items-center", "gap-1", "cursor-pointer"], ["size", "sm", "title", "Upload Document", "subtitle", "Select a file to attach to this task.", "icon", "cloud_upload", "cancelLabel", "Cancel", "primaryLabel", "Done", "panelClass", "rounded-2xl transform animate-in zoom-in-95 duration-200", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "m-4", "sm:m-6", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-800", "rounded-xl", "p-6", "sm:p-8", "flex", "flex-col", "items-center", "justify-center", "text-center", "cursor-pointer", "hover:bg-slate-50", "transition-colors", "group"], ["type", "file", 1, "hidden", 3, "change"], [1, "material-symbols-outlined", "text-[32px]", "text-blue-500", "mb-2", "group-hover:scale-110", "transition-transform"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300"], [1, "text-[10px]", "text-slate-400", "mt-1"], ["size", "sm", "variant", "danger", "title", "Delete Sub-task?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "px-6", "py-5"], [1, "text-sm", "font-medium", "text-slate-600", "dark:text-slate-300"], [1, "animate-in", "fade-in", "duration-150", "absolute", "z-20", "mt-2", "w-full", "bg-white", "dark:bg-slate-800", "border", "border-slate-100", "dark:border-slate-700", "rounded-2xl", "shadow-lg", "max-h-56", "overflow-y-auto", "scroll-smooth", "py-2", 3, "click"], [1, "px-4", "py-2.5", "text-sm", "font-semibold", "text-slate-700", "dark:text-slate-200", "hover:bg-blue-50", "dark:hover:bg-blue-900/20", "cursor-pointer", "transition-colors", "truncate", 3, "text-blue-600"], [1, "px-4", "py-3", "text-xs", "text-slate-400", "text-center"], [1, "px-4", "py-2.5", "text-sm", "font-semibold", "text-slate-700", "dark:text-slate-200", "hover:bg-blue-50", "dark:hover:bg-blue-900/20", "cursor-pointer", "transition-colors", "truncate", 3, "click"], ["type", "text", "placeholder", "Task Title", 1, "w-full", "text-lg", "sm:text-2xl", "font-extrabold", "text-slate-900", "dark:text-slate-50", "tracking-tight", "mb-3", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "p-3", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["placeholder", "Task Description", 1, "w-full", "text-slate-600", "dark:text-slate-400", "text-sm", "leading-relaxed", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "p-3", "outline-none", "focus:ring-2", "focus:ring-blue-500", "min-h-[100px]", 3, "ngModelChange", "ngModel"], [1, "text-lg", "sm:text-2xl", "font-extrabold", "text-slate-900", "dark:text-slate-50", "tracking-tight", "mb-2", "break-words"], [1, "text-slate-500", "dark:text-slate-400", "text-sm", "leading-relaxed", "break-words"], [1, "w-5", "h-5", "rounded-full", "border-2", "flex", "items-center", "justify-center", "transition-all", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-white", "text-[14px]"], ["type", "text", 1, "text-sm", "bg-transparent", "border-none", "outline-none", "focus:ring-0", "flex-1", "min-w-0", "font-semibold", "text-slate-700", "dark:text-slate-300", 3, "ngModelChange", "ngModel"], [1, "text-red-500", "hover:text-red-700", "p-1", "flex", "items-center", "justify-center", "cursor-pointer", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "text-sm", "transition-all", "flex-1", "min-w-0", "truncate"], [1, "text-[10px]", "font-black", "uppercase", "tracking-wider", "px-2.5", "py-1", "rounded-full", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-slate-300", "hover:text-slate-500", "cursor-pointer", "text-[18px]", "shrink-0"], [1, "material-symbols-outlined", "text-slate-400"], ["type", "text", "placeholder", "Add new sub-task...", 1, "text-sm", "bg-transparent", "border-none", "outline-none", "focus:ring-0", "flex-1", "min-w-0", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "text-xs", "font-bold", "bg-blue-600", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-blue-700", "cursor-pointer", "shrink-0", 3, "click"], [1, "text-xs", "font-bold", "text-blue-600", "hover:text-blue-700", "flex", "items-center", "gap-1", "cursor-pointer", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-[22px]", 3, "ngClass"], [1, "flex-1", "overflow-hidden", "min-w-0"], ["target", "_blank", 1, "material-symbols-outlined", "text-slate-300", "group-hover:text-blue-500", "transition-colors", "shrink-0", "cursor-pointer", 3, "href"], [1, "mt-3", "text-xs", "font-bold", "text-blue-600", "hover:text-blue-700", "flex", "items-center", "gap-1", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[16px]"], [1, "flex", "items-center", "gap-3", "overflow-hidden", "min-w-0"], [1, "px-2", "py-1", "rounded", "text-[10px]", "font-black", "uppercase", "tracking-widest", "shrink-0", 3, "ngClass"], [1, "overflow-hidden", "min-w-0"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300", "truncate"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-wider"], [1, "text-red-400", "hover:text-red-600", "transition-colors", "cursor-pointer", "shrink-0"], [1, "text-red-400", "hover:text-red-600", "transition-colors", "cursor-pointer", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-slate-300", "text-3xl", "mb-2"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "gap-2", "bg-white", "dark:bg-slate-800", "border-2", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "p-2.5", "text-xs", "font-bold", "outline-none", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "shrink-0", "transition-transform", "duration-200"], [1, "grid", "grid-cols-3", "gap-2"], [1, "relative", "col-span-2"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "gap-1", "bg-white", "dark:bg-slate-800", "border-2", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "p-2.5", "text-xs", "font-bold", "outline-none", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[16px]", "text-slate-400", "shrink-0", "transition-transform", "duration-200"], ["type", "number", "placeholder", "Lag", 1, "w-full", "bg-white", "dark:bg-slate-800", "border-2", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "p-2.5", "text-xs", "font-bold", "outline-none", "focus:border-blue-500", "focus:ring-4", "focus:ring-blue-100", "dark:focus:ring-blue-900/20", "transition-all", 3, "ngModelChange", "ngModel"], [1, "text-[10px]", "text-blue-600", "font-medium"], [1, "w-full", "bg-blue-600", "text-white", "rounded-lg", "py-2.5", "flex", "items-center", "justify-center", "gap-1", "cursor-pointer", "hover:bg-blue-700", "text-xs", "font-bold", 3, "click"], [1, "px-4", "py-2", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:bg-blue-50", "dark:hover:bg-blue-900/20", "cursor-pointer", "transition-colors", "truncate", 3, "text-blue-600"], [1, "px-4", "py-2", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:bg-blue-50", "dark:hover:bg-blue-900/20", "cursor-pointer", "transition-colors", "truncate", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "gap-2", "bg-slate-50", "dark:bg-slate-800", "border-2", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "p-2", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-100", "outline-none", "transition-all", "cursor-pointer", 3, "click"], [1, "text-[11px]", "text-slate-500", "font-semibold", "uppercase", "tracking-wider", "mt-0.5", "truncate"], [1, "bg-blue-600", "absolute", "left-0", "top-1.5", "w-4", "h-4", "rounded-full", "ring-4", "ring-white", "dark:ring-slate-900", "z-10"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "leading-relaxed", "break-words"], [1, "font-bold", "text-slate-900", "dark:text-slate-50"], [1, "text-[10px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "mt-1"], ["type", "text", "placeholder", "Type a comment...", 1, "w-full", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "px-4", "py-3", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", "shadow-sm", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "w-full", "flex", "items-center", "justify-center", "gap-2", "px-4", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-500", "text-white", "font-bold", "rounded-xl", "hover:from-blue-700", "hover:to-blue-600", "transition-all", "shadow-md", "shadow-blue-600/20", "active:scale-95", "cursor-pointer", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"]], template: function TaskDetail_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "app-common-dialog", 1);
      \u0275\u0275pipe(1, "date");
      \u0275\u0275listener("closed", function TaskDetail_Template_app_common_dialog_closed_0_listener() {
        return ctx.onClose();
      });
      \u0275\u0275elementStart(2, "button", 2);
      \u0275\u0275listener("click", function TaskDetail_Template_button_click_2_listener() {
        return ctx.toggleEditMode();
      });
      \u0275\u0275elementStart(3, "span", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5, 0)(9, "div", 6)(10, "section", 7)(11, "div", 8)(12, "span", 9);
      \u0275\u0275text(13, "description");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "h3", 10);
      \u0275\u0275text(15, "Task Information");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 11)(17, "div", 12)(18, "label", 13)(19, "span", 14);
      \u0275\u0275text(20, "flag");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, " Milestone ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 15)(23, "button", 16);
      \u0275\u0275listener("click", function TaskDetail_Template_button_click_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        $event.stopPropagation();
        return \u0275\u0275resetView(ctx.toggleMilestoneDropdown());
      });
      \u0275\u0275elementStart(24, "span", 17);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 18);
      \u0275\u0275text(27, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(28, TaskDetail_Conditional_28_Template, 4, 1, "div", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 12)(30, "label", 13)(31, "span", 20);
      \u0275\u0275text(32, "auto_awesome");
      \u0275\u0275elementEnd();
      \u0275\u0275text(33, " Sub Milestone ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 15)(35, "button", 16);
      \u0275\u0275listener("click", function TaskDetail_Template_button_click_35_listener($event) {
        \u0275\u0275restoreView(_r1);
        $event.stopPropagation();
        return \u0275\u0275resetView(ctx.toggleSubMilestoneDropdown());
      });
      \u0275\u0275elementStart(36, "span", 17);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "span", 18);
      \u0275\u0275text(39, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(40, TaskDetail_Conditional_40_Template, 4, 1, "div", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(41, TaskDetail_Conditional_41_Template, 2, 0, "p", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(42, TaskDetail_Conditional_42_Template, 2, 2)(43, TaskDetail_Conditional_43_Template, 4, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "section", 7)(45, "div", 22)(46, "span", 9);
      \u0275\u0275text(47, "checklist");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "h3", 10);
      \u0275\u0275text(49, "Sub-tasks");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 23)(51, "div", 24);
      \u0275\u0275element(52, "div", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "span", 26);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 12);
      \u0275\u0275repeaterCreate(56, TaskDetail_For_57_Template, 5, 8, "div", 27, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(58, TaskDetail_Conditional_58_Template, 6, 1, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "div", 29)(60, "section", 7)(61, "div", 30)(62, "div", 31)(63, "span", 32);
      \u0275\u0275text(64, "attach_file");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "h3", 33);
      \u0275\u0275text(66, "File Attachments");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(67, TaskDetail_Conditional_67_Template, 4, 0, "button", 34)(68, TaskDetail_Conditional_68_Template, 4, 0, "span", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "div", 36);
      \u0275\u0275repeaterCreate(70, TaskDetail_For_71_Template, 12, 9, "div", 37, _forTrack0);
      \u0275\u0275conditionalCreate(72, TaskDetail_Conditional_72_Template, 2, 0, "p", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(73, TaskDetail_Conditional_73_Template, 4, 2, "button", 39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "section", 7)(75, "div", 30)(76, "div", 31)(77, "span", 32);
      \u0275\u0275text(78, "link");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "h3", 33);
      \u0275\u0275text(80, " Relationships");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "span", 26);
      \u0275\u0275text(82);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(83, "div", 12);
      \u0275\u0275repeaterCreate(84, TaskDetail_For_85_Template, 10, 5, "div", 40, _forTrack1);
      \u0275\u0275conditionalCreate(86, TaskDetail_Conditional_86_Template, 5, 0, "div", 41);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(87, TaskDetail_Conditional_87_Template, 25, 32, "div", 42);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(88, "div", 43)(89, "div", 36)(90, "h2", 44)(91, "span", 45);
      \u0275\u0275text(92, "person");
      \u0275\u0275elementEnd();
      \u0275\u0275text(93, " Assignee ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "div", 46)(95, "img", 47);
      \u0275\u0275listener("error", function TaskDetail_Template_img_error_95_listener($event) {
        return ctx.onAvatarError($event, (ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].firstname) || "Assignee");
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "div", 48);
      \u0275\u0275conditionalCreate(97, TaskDetail_Conditional_97_Template, 7, 16, "div", 49)(98, TaskDetail_Conditional_98_Template, 4, 2);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(99, "div", 36)(100, "h2", 44)(101, "span", 45);
      \u0275\u0275text(102, "badge");
      \u0275\u0275elementEnd();
      \u0275\u0275text(103, " Created By ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "div", 50)(105, "img", 47);
      \u0275\u0275listener("error", function TaskDetail_Template_img_error_105_listener($event) {
        return ctx.onAvatarError($event, (ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].firstname) || "Assignee");
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "div", 51)(107, "p", 52);
      \u0275\u0275text(108);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(109, "p", 53);
      \u0275\u0275text(110, " Task Owner ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(111, "div", 54)(112, "h3", 44)(113, "span", 45);
      \u0275\u0275text(114, "history");
      \u0275\u0275elementEnd();
      \u0275\u0275text(115, " Activity Timeline ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(116, "div", 55)(117, "div", 56)(118, "div", 57);
      \u0275\u0275repeaterCreate(119, TaskDetail_For_120_Template, 9, 6, "div", 58, _forTrack0);
      \u0275\u0275conditionalCreate(121, TaskDetail_Conditional_121_Template, 2, 0, "p", 59);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(122, TaskDetail_Conditional_122_Template, 4, 0, "button", 60);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(123, TaskDetail_Conditional_123_Template, 10, 2, "div", 36);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(124, "app-common-dialog", 61);
      \u0275\u0275listener("closed", function TaskDetail_Template_app_common_dialog_closed_124_listener() {
        return ctx.showUploadModal = false;
      })("primary", function TaskDetail_Template_app_common_dialog_primary_124_listener() {
        return ctx.showUploadModal = false;
      });
      \u0275\u0275elementStart(125, "label", 62)(126, "input", 63);
      \u0275\u0275listener("change", function TaskDetail_Template_input_change_126_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "span", 64);
      \u0275\u0275text(128, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "p", 65);
      \u0275\u0275text(130, "Click to Browse Files");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "p", 66);
      \u0275\u0275text(132, "Select any document or image");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(133, "app-common-dialog", 67);
      \u0275\u0275listener("closed", function TaskDetail_Template_app_common_dialog_closed_133_listener() {
        return ctx.closeDeleteSubTaskDialog();
      })("primary", function TaskDetail_Template_app_common_dialog_primary_133_listener() {
        return ctx.confirmDeleteSubTask();
      });
      \u0275\u0275elementStart(134, "div", 68)(135, "p", 69);
      \u0275\u0275text(136, " Are you sure you want to delete this sub-task from the task checklist? ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("open", true)("subtitle", "Due: " + (\u0275\u0275pipeBind2(1, 69, ctx.task.due_date, "MMM dd, yyyy") || "No date set"))("badge", ctx.task.priority)("badgeClass", ctx.priorityBadgeClass())("showCloseButton", true);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.isEditing ? "save" : "edit");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isEditing ? "Save Task" : "Edit Task");
      \u0275\u0275advance(17);
      \u0275\u0275classProp("border-blue-500", ctx.milestoneOpen)("ring-4", ctx.milestoneOpen)("ring-blue-100", ctx.milestoneOpen)("dark:ring-blue-900", ctx.milestoneOpen);
      \u0275\u0275property("disabled", !ctx.isEditing);
      \u0275\u0275advance();
      \u0275\u0275classProp("text-slate-400", !ctx.task.milestone_id);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.selectedMilestoneName);
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.milestoneOpen)("text-blue-600", ctx.milestoneOpen);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.milestoneOpen ? 28 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-blue-500", ctx.subMilestoneOpen)("ring-4", ctx.subMilestoneOpen)("ring-blue-100", ctx.subMilestoneOpen)("dark:ring-blue-900", ctx.subMilestoneOpen);
      \u0275\u0275property("disabled", !ctx.isEditing);
      \u0275\u0275advance();
      \u0275\u0275classProp("text-slate-400", !ctx.task.submilestone_id);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.selectedSubMilestoneName);
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.subMilestoneOpen)("text-blue-600", ctx.subMilestoneOpen);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.subMilestoneOpen ? 40 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditing && ctx.task.milestone_id && (ctx.subMilestones == null ? null : ctx.subMilestones.length) === 0 ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditing ? 42 : 43);
      \u0275\u0275advance(10);
      \u0275\u0275styleProp("width", ctx.checklistProgress, "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.checklistProgress, "% Complete");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.task.sub_tasks);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isEditing ? 58 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.isEditing ? 67 : 68);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.visibleAttachments);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.task.attachments || ctx.task.attachments.length === 0 ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.task.attachments && ctx.task.attachments.length > 3 ? 73 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("", (ctx.task.dependencies == null ? null : ctx.task.dependencies.length) || 0, " Deps");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.task.dependencies);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.task.dependencies || ctx.task.dependencies.length === 0 ? 86 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditing ? 87 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275property("src", ctx.getAvatarUrl(ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].avatar), \u0275\u0275sanitizeUrl)("alt", (ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].firstname) || "Assignee");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isEditing ? 97 : 98);
      \u0275\u0275advance(8);
      \u0275\u0275property("src", ctx.getAvatarUrl(ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].avatar), \u0275\u0275sanitizeUrl)("alt", (ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].firstname) || "Assignee");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" ", (ctx.task.creator == null ? null : ctx.task.creator.firstname) || "System", " ", (ctx.task.creator == null ? null : ctx.task.creator.lastname) || "", " ");
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.task.activities);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.task.activities || ctx.task.activities.length === 0 ? 121 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.task.activities && ctx.task.activities.length > 4 ? 122 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditing ? 123 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showUploadModal)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(9);
      \u0275\u0275property("open", ctx.showDeleteSubTaskModal)("showCloseButton", true)("showFooter", true);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, CommonDialogComponent, DatePipe], styles: ['\n.material-symbols-outlined[_ngcontent-%COMP%] {\n  font-variation-settings:\n    "FILL" 0,\n    "wght" 400,\n    "GRAD" 0,\n    "opsz" 24;\n  vertical-align: middle;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out forwards;\n}\n.task-detail-scroll[_ngcontent-%COMP%] {\n  max-height: calc(96vh - 88px);\n  box-sizing: border-box;\n  overflow-y: auto;\n  overflow-x: hidden;\n  scroll-behavior: smooth;\n  -webkit-overflow-scrolling: touch;\n  overscroll-behavior: contain;\n  touch-action: pan-y;\n  border-radius: 0 0 1rem 1rem;\n  padding-bottom: 4px;\n}\n.overflow-y-auto[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n  -webkit-overflow-scrolling: touch;\n  overscroll-behavior: contain;\n  touch-action: pan-y;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #e2e8f0;\n  border-radius: 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #cbd5e1;\n}\n*[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: #e2e8f0 transparent;\n}\n.dark[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #1e293b;\n}\n.dark[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #334155;\n}\n.dark[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  scrollbar-color: #1e293b transparent;\n}\n/*# sourceMappingURL=task-detail.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaskDetail, [{
    type: Component,
    args: [{ selector: "app-task-detail", standalone: true, imports: [
      CommonModule,
      FormsModule,
      CommonDialogComponent
    ], template: `<app-common-dialog [open]="true" size="xl" height="!h-[96vh]" title="Task Details" custom-scrollbar\r
    [subtitle]="'Due: ' + ((task.due_date | date:'MMM dd, yyyy') || 'No date set')" [badge]="task.priority"\r
    [badgeClass]="priorityBadgeClass()" icon="assignment" [showCloseButton]="true"\r
    panelClass="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 transition-all !w-[92vw] sm:!w-[88vw] !max-w-[1280px]"\r
    contentClass="min-h-0 flex-1 overflow-hidden bg-slate-50/60 dark:bg-slate-950" (closed)="onClose()">\r
\r
    <button dialog-header-actions (click)="toggleEditMode()"\r
        class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer shadow-sm shadow-blue-600/20 text-sm sm:text-base whitespace-nowrap">\r
        <span class="material-symbols-outlined text-[20px]">{{ isEditing ? 'save' : 'edit' }}</span>\r
        <span class="hidden xs:inline">{{ isEditing ? 'Save Task' : 'Edit Task' }}</span>\r
    </button>\r
\r
    <div #scrollArea class="task-detail-scroll grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">\r
\r
        <div class="md:col-span-8 space-y-5 sm:space-y-6">\r
\r
            <section\r
                class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 sm:p-6">\r
                <div class="flex items-center gap-2 mb-4 sm:mb-5">\r
                    <span class="material-symbols-outlined text-blue-600 text-[18px]">description</span>\r
                    <h3 class="text-xs font-black uppercase tracking-[0.15em] text-blue-600">Task Information</h3>\r
                </div>\r
\r
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">\r
                    <div class="space-y-2">\r
                        <label\r
                            class="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400">\r
                            <span class="material-symbols-outlined text-[14px] text-emerald-500">flag</span>\r
                            Milestone\r
                        </label>\r
                        <div class="relative">\r
                            <button type="button" (click)="$event.stopPropagation(); toggleMilestoneDropdown()"\r
                                [disabled]="!isEditing" [class.border-blue-500]="milestoneOpen"\r
                                [class.ring-4]="milestoneOpen" [class.ring-blue-100]="milestoneOpen"\r
                                [class.dark:ring-blue-900]="milestoneOpen"\r
                                class="w-full flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none transition-all cursor-pointer disabled:cursor-default disabled:opacity-100 disabled:bg-slate-50 dark:disabled:bg-slate-800/60">\r
                                <span class="truncate text-left" [class.text-slate-400]="!task.milestone_id">{{\r
                                    selectedMilestoneName }}</span>\r
                                <span\r
                                    class="material-symbols-outlined text-slate-400 shrink-0 transition-transform duration-200"\r
                                    [class.rotate-180]="milestoneOpen"\r
                                    [class.text-blue-600]="milestoneOpen">expand_more</span>\r
                            </button>\r
\r
                            @if (milestoneOpen) {\r
                            <div (click)="$event.stopPropagation()"\r
                                class="animate-in fade-in duration-150 absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-lg max-h-56 overflow-y-auto scroll-smooth py-2">\r
                                @for (milestone of milestones; track milestone.id) {\r
                                <div (click)="selectMilestone(milestone)"\r
                                    class="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors truncate"\r
                                    [class.text-blue-600]="task.milestone_id == milestone.id">\r
                                    {{ milestone.name }}\r
                                </div>\r
                                }\r
                                @if (!milestones || milestones.length === 0) {\r
                                <div class="px-4 py-3 text-xs text-slate-400 text-center">No milestones found</div>\r
                                }\r
                            </div>\r
                            }\r
                        </div>\r
                    </div>\r
\r
                    <div class="space-y-2">\r
                        <label\r
                            class="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400">\r
                            <span class="material-symbols-outlined text-[14px] text-amber-500">auto_awesome</span>\r
                            Sub Milestone\r
                        </label>\r
                        <div class="relative">\r
                            <button type="button" (click)="$event.stopPropagation(); toggleSubMilestoneDropdown()"\r
                                [disabled]="!isEditing" [class.border-blue-500]="subMilestoneOpen"\r
                                [class.ring-4]="subMilestoneOpen" [class.ring-blue-100]="subMilestoneOpen"\r
                                [class.dark:ring-blue-900]="subMilestoneOpen"\r
                                class="w-full flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none transition-all cursor-pointer disabled:cursor-default disabled:opacity-100 disabled:bg-slate-50 dark:disabled:bg-slate-800/60">\r
                                <span class="truncate text-left" [class.text-slate-400]="!task.submilestone_id">{{\r
                                    selectedSubMilestoneName }}</span>\r
                                <span\r
                                    class="material-symbols-outlined text-slate-400 shrink-0 transition-transform duration-200"\r
                                    [class.rotate-180]="subMilestoneOpen"\r
                                    [class.text-blue-600]="subMilestoneOpen">expand_more</span>\r
                            </button>\r
\r
                            @if (subMilestoneOpen) {\r
                            <div (click)="$event.stopPropagation()"\r
                                class="animate-in fade-in duration-150 absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-lg max-h-56 overflow-y-auto scroll-smooth py-2">\r
                                @for (sub of subMilestones; track sub.id) {\r
                                <div (click)="selectSubMilestone(sub)"\r
                                    class="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors truncate"\r
                                    [class.text-blue-600]="task.submilestone_id == sub.id">\r
                                    {{ sub.name }}\r
                                </div>\r
                                }\r
                                @if (!subMilestones || subMilestones.length === 0) {\r
                                <div class="px-4 py-3 text-xs text-slate-400 text-center">No sub milestones found</div>\r
                                }\r
                            </div>\r
                            }\r
                        </div>\r
                        @if(isEditing && task.milestone_id && subMilestones?.length === 0){\r
                        <p class="text-xs text-red-500 font-medium">No Sub Milestone Found</p>\r
                        }\r
                    </div>\r
                </div>\r
\r
                @if (isEditing) {\r
                <input type="text" [(ngModel)]="task.title"\r
                    class="w-full text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"\r
                    placeholder="Task Title">\r
                <textarea [(ngModel)]="task.description"\r
                    class="w-full text-slate-600 dark:text-slate-400 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"\r
                    placeholder="Task Description"></textarea>\r
                } @else {\r
                <h2\r
                    class="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2 break-words">\r
                    {{ task.title }}</h2>\r
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed break-words">\r
                    {{ task.description || 'No description provided for this task.' }}\r
                </p>\r
                }\r
            </section>\r
\r
            <section\r
                class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 sm:p-6">\r
                <div class="flex items-center gap-2 mb-3">\r
                    <span class="material-symbols-outlined text-blue-600 text-[18px]">checklist</span>\r
                    <h3 class="text-xs font-black uppercase tracking-[0.15em] text-blue-600">Sub-tasks</h3>\r
                </div>\r
\r
                <div class="flex items-center gap-3 mb-4">\r
                    <div class="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">\r
                        <div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"\r
                            [style.width.%]="checklistProgress"></div>\r
                    </div>\r
                    <span class="text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">{{ checklistProgress }}%\r
                        Complete</span>\r
                </div>\r
\r
                <div class="space-y-2">\r
                    @for (item of task.sub_tasks; track item.id) {\r
                    <div\r
                        class="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50/60 dark:bg-slate-800/40 rounded-xl border border-slate-100/70 dark:border-slate-800/70 group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">\r
                        <div (click)="isEditing ? toggleChecklist(item) : null"\r
                            [class]="item.completed ? 'border-blue-600 bg-blue-600' : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-500'"\r
                            [class.cursor-pointer]="isEditing" [class.cursor-default]="!isEditing"\r
                            class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0">\r
                            @if (item.completed) {\r
                            <span class="material-symbols-outlined text-white text-[14px]">check</span>\r
                            }\r
                        </div>\r
\r
                        @if (isEditing) {\r
                        <input type="text" [ngModel]="item.title" (ngModelChange)="onSubTaskChange(item, $event)"\r
                            class="text-sm bg-transparent border-none outline-none focus:ring-0 flex-1 min-w-0 font-semibold text-slate-700 dark:text-slate-300">\r
                        <button (click)="openDeleteSubTaskDialog(item?.id!)"\r
                            class="text-red-500 hover:text-red-700 p-1 flex items-center justify-center cursor-pointer shrink-0">\r
                            <span class="material-symbols-outlined text-[18px]">delete</span>\r
                        </button>\r
                        } @else {\r
                        <span\r
                            [class]="item.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300 font-semibold'"\r
                            class="text-sm transition-all flex-1 min-w-0 truncate">{{ item.title }}</span>\r
\r
                        <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0"\r
                            [ngClass]="subTaskStatusClass(item)">{{ subTaskStatus(item) }}</span>\r
\r
                        <span\r
                            class="material-symbols-outlined text-slate-300 hover:text-slate-500 cursor-pointer text-[18px] shrink-0">more_vert</span>\r
                        }\r
                    </div>\r
                    }\r
                </div>\r
\r
                @if (isEditing) {\r
                <div\r
                    class="flex items-center gap-3 p-2 mt-3 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">\r
                    <span class="material-symbols-outlined text-slate-400">add</span>\r
                    <input type="text" [(ngModel)]="newSubTaskTitle" (keyup.enter)="addSubTask()"\r
                        placeholder="Add new sub-task..."\r
                        class="text-sm bg-transparent border-none outline-none focus:ring-0 flex-1 min-w-0">\r
                    <button (click)="addSubTask()"\r
                        class="text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer shrink-0">Add</button>\r
                </div>\r
                }\r
            </section>\r
\r
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">\r
\r
                <section\r
                    class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 sm:p-6">\r
                    <div class="flex items-center justify-between mb-4 gap-2">\r
                        <div class="flex items-center gap-2 min-w-0">\r
                            <span\r
                                class="material-symbols-outlined text-blue-600 text-[18px] shrink-0">attach_file</span>\r
                            <h3 class="text-xs font-black uppercase tracking-[0.15em] text-blue-600 truncate">File\r
                                Attachments</h3>\r
                        </div>\r
                        @if (isEditing) {\r
                        <button (click)="openUploadModal()"\r
                            class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer shrink-0">\r
                            <span class="material-symbols-outlined text-sm">upload</span> Upload\r
                        </button>\r
                        } @else {\r
                        <span class="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">\r
                            <span class="material-symbols-outlined text-sm">upload</span> Upload\r
                        </span>\r
                        }\r
                    </div>\r
\r
                    <div class="space-y-3">\r
                        @for (file of visibleAttachments; track file.id) {\r
                        <div\r
                            class="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-all cursor-pointer group">\r
                            <div [ngClass]="getFileIconMeta(file.name).bg"\r
                                class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">\r
                                <span class="material-symbols-outlined text-[22px]"\r
                                    [ngClass]="getFileIconMeta(file.name).color">{{ getFileIconMeta(file.name).icon\r
                                    }}</span>\r
                            </div>\r
                            <div class="flex-1 overflow-hidden min-w-0">\r
                                <p class="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">{{ file.name }}\r
                                </p>\r
                                <p\r
                                    class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 truncate">\r
                                    {{ file.size }} \u2022 {{ file.createdAt | date }}</p>\r
                            </div>\r
                            <a [href]="file.url" target="_blank"\r
                                class="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-colors shrink-0 cursor-pointer">download</a>\r
                        </div>\r
                        }\r
                        @if (!task.attachments || task.attachments.length === 0) {\r
                        <p class="text-xs text-slate-400 text-center py-4">No attachments yet.</p>\r
                        }\r
                    </div>\r
\r
                    @if (task.attachments && task.attachments.length > 3) {\r
                    <button (click)="toggleAttachmentsView()"\r
                        class="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">\r
                        {{ showAllAttachments ? 'Show less' : 'View all attachments (' + task.attachments.length + ')'\r
                        }}\r
                        <span class="material-symbols-outlined text-[16px]">{{ showAllAttachments ? 'expand_less' :\r
                            'chevron_right' }}</span>\r
                    </button>\r
                    }\r
                </section>\r
\r
                <section\r
                    class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 sm:p-6">\r
                    <div class="flex items-center justify-between mb-4 gap-2">\r
                        <div class="flex items-center gap-2 min-w-0">\r
                            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0">link</span>\r
                            <h3 class="text-xs font-black uppercase tracking-[0.15em] text-blue-600 truncate">\r
                                Relationships</h3>\r
                        </div>\r
                        <span class="text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">{{\r
                            task.dependencies?.length || 0 }} Deps</span>\r
                    </div>\r
\r
                    <div class="space-y-2">\r
                        @for (dep of task.dependencies; track dep.predecessor_id) {\r
                        <div\r
                            class="flex items-center justify-between gap-2 p-3 bg-slate-50/60 dark:bg-slate-800/40 rounded-xl border border-slate-100/70 dark:border-slate-800/70 group">\r
                            <div class="flex items-center gap-3 overflow-hidden min-w-0">\r
                                <div [ngClass]="depTypeClass(dep.type)"\r
                                    class="px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shrink-0">\r
                                    {{ dep.type }}\r
                                </div>\r
                                <div class="overflow-hidden min-w-0">\r
                                    <p class="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">{{\r
                                        getTaskTitle(dep.predecessor_id) }}</p>\r
                                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lag: {{\r
                                        dep.lag }} days</p>\r
                                </div>\r
                            </div>\r
                            @if (isEditing) {\r
                            <button (click)="removeDependency(dep)"\r
                                class="text-red-400 hover:text-red-600 transition-colors cursor-pointer shrink-0">\r
                                <span class="material-symbols-outlined text-[18px]">delete</span>\r
                            </button>\r
                            }\r
                        </div>\r
                        }\r
                        @if (!task.dependencies || task.dependencies.length === 0) {\r
                        <div class="text-center py-6">\r
                            <span class="material-symbols-outlined text-slate-300 text-3xl mb-2">link_off</span>\r
                            <p class="text-xs text-slate-400 font-medium">No predecessors defined.</p>\r
                        </div>\r
                        }\r
                    </div>\r
\r
                    @if (isEditing) {\r
                    <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">\r
                        <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Predecessor</p>\r
\r
                        <div class="relative">\r
                            <button type="button" (click)="$event.stopPropagation(); togglePredecessorDropdown()"\r
                                [class.border-blue-500]="predecessorOpen" [class.ring-4]="predecessorOpen"\r
                                [class.ring-blue-100]="predecessorOpen" [class.dark:ring-blue-900]="predecessorOpen"\r
                                class="w-full flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-2.5 text-xs font-bold outline-none transition-all cursor-pointer">\r
                                <span class="truncate text-left" [class.text-slate-400]="!selectedPredecessorId">{{\r
                                    selectedPredecessorId ? selectedPredecessorName : 'Select Task' }}</span>\r
                                <span\r
                                    class="material-symbols-outlined text-[18px] text-slate-400 shrink-0 transition-transform duration-200"\r
                                    [class.rotate-180]="predecessorOpen"\r
                                    [class.text-blue-600]="predecessorOpen">expand_more</span>\r
                            </button>\r
\r
                            @if (predecessorOpen) {\r
                            <div (click)="$event.stopPropagation()"\r
                                class="animate-in fade-in duration-150 absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-lg max-h-56 overflow-y-auto scroll-smooth py-2">\r
                                @for (t of allTasks; track t.id) {\r
                                <div (click)="selectPredecessor(t)"\r
                                    class="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors truncate"\r
                                    [class.text-blue-600]="selectedPredecessorId == t.id">\r
                                    {{ t.title }}\r
                                </div>\r
                                }\r
                                @if (!allTasks || allTasks.length === 0) {\r
                                <div class="px-4 py-3 text-xs text-slate-400 text-center">No tasks found</div>\r
                                }\r
                            </div>\r
                            }\r
                        </div>\r
\r
                        <div class="grid grid-cols-3 gap-2">\r
\r
                            <div class="relative col-span-2">\r
                                <button type="button" (click)="$event.stopPropagation(); toggleDepTypeDropdown()"\r
                                    [class.border-blue-500]="depTypeOpen" [class.ring-4]="depTypeOpen"\r
                                    [class.ring-blue-100]="depTypeOpen" [class.dark:ring-blue-900]="depTypeOpen"\r
                                    class="w-full flex items-center justify-between gap-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-2.5 text-xs font-bold outline-none transition-all cursor-pointer">\r
                                    <span class="truncate text-left">{{ selectedDepTypeName }}</span>\r
                                    <span\r
                                        class="material-symbols-outlined text-[16px] text-slate-400 shrink-0 transition-transform duration-200"\r
                                        [class.rotate-180]="depTypeOpen"\r
                                        [class.text-blue-600]="depTypeOpen">expand_more</span>\r
                                </button>\r
\r
                                @if (depTypeOpen) {\r
                                <div (click)="$event.stopPropagation()"\r
                                    class="animate-in fade-in duration-150 absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-lg max-h-56 overflow-y-auto scroll-smooth py-2">\r
                                    @for (type of dependencyTypes; track type.id) {\r
                                    <div (click)="selectDepType(type)"\r
                                        class="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors truncate"\r
                                        [class.text-blue-600]="selectedDepType == type.id">\r
                                        {{ type.name }}\r
                                    </div>\r
                                    }\r
                                </div>\r
                                }\r
                            </div>\r
                            <input type="number" [(ngModel)]="depLag" placeholder="Lag"\r
                                class="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-2.5 text-xs font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all">\r
                        </div>\r
                        <p class="text-[10px] text-blue-600 font-medium">{{ getSelectedDepDesc() }}</p>\r
                        <button (click)="addDependency()"\r
                            class="w-full bg-blue-600 text-white rounded-lg py-2.5 flex items-center justify-center gap-1 cursor-pointer hover:bg-blue-700 text-xs font-bold">\r
                            <span class="material-symbols-outlined text-sm">add</span> Add Predecessor\r
                        </button>\r
                    </div>\r
                    }\r
                </section>\r
            </div>\r
        </div>\r
\r
        <div class="md:col-span-4 space-y-5 sm:space-y-6">\r
\r
            <div class="space-y-3">\r
                <h2 class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                    <span class="material-symbols-outlined text-[14px]">person</span> Assignee\r
                </h2>\r
                <div\r
                    class="flex flex-nowrap items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">\r
                    <img class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"\r
                        [src]="getAvatarUrl(task.assignees?.[0]?.avatar)"\r
                        [alt]="task.assignees?.[0]?.firstname || 'Assignee'"\r
                        (error)="onAvatarError($event, task.assignees?.[0]?.firstname || 'Assignee')">\r
\r
                    <div class="flex-1 min-w-0">\r
                        @if (isEditing) {\r
                        <div class="relative w-full">\r
                            <button type="button" (click)="$event.stopPropagation(); toggleAssigneeDropdown()"\r
                                [class.border-blue-500]="assigneeOpen" [class.ring-4]="assigneeOpen"\r
                                [class.ring-blue-100]="assigneeOpen" [class.dark:ring-blue-900]="assigneeOpen"\r
                                class="w-full flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-2 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none transition-all cursor-pointer">\r
                                <span class="truncate text-left"\r
                                    [class.text-slate-400]="!task.assignees?.[0]?.firstname">{{ selectedAssigneeName\r
                                    }}</span>\r
                                <span\r
                                    class="material-symbols-outlined text-[16px] text-slate-400 shrink-0 transition-transform duration-200"\r
                                    [class.rotate-180]="assigneeOpen"\r
                                    [class.text-blue-600]="assigneeOpen">expand_more</span>\r
                            </button>\r
\r
                            @if (assigneeOpen) {\r
                            <div (click)="$event.stopPropagation()"\r
                                class="animate-in fade-in duration-150 absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-lg max-h-56 overflow-y-auto scroll-smooth py-2">\r
                                @for (member of teamMembers; track member.id) {\r
                                <div (click)="$event.stopPropagation(); selectAssignee(member)"\r
                                    class="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors truncate"\r
                                    [class.text-blue-600]="task.assignees?.[0]?.id == member.id">\r
                                    {{ member.firstname }} {{ member.lastname }}\r
                                </div>\r
                                }\r
                                @if (!teamMembers || teamMembers.length === 0) {\r
                                <div class="px-4 py-3 text-xs text-slate-400 text-center">No team members found</div>\r
                                }\r
                            </div>\r
                            }\r
                        </div>\r
                        } @else {\r
                        <p class="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">\r
                            {{ task.assignees?.[0]?.firstname }} {{ task.assignees?.[0]?.lastname || 'Unassigned' }}\r
                        </p>\r
                        <p class="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5 truncate">\r
                            Primary Contact\r
                        </p>\r
                        }\r
                    </div>\r
                </div>\r
            </div>\r
\r
            <div class="space-y-3">\r
                <h2 class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                    <span class="material-symbols-outlined text-[14px]">badge</span> Created By\r
                </h2>\r
                <div\r
                    class="flex flex-nowrap items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">\r
                    <img class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"\r
                        [src]="getAvatarUrl(task.assignees?.[0]?.avatar)"\r
                        [alt]="task.assignees?.[0]?.firstname || 'Assignee'"\r
                        (error)="onAvatarError($event, task.assignees?.[0]?.firstname || 'Assignee')">\r
                    <div class="overflow-hidden min-w-0 flex-1">\r
                        <p class="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">\r
                            {{ task.creator?.firstname || 'System' }} {{ task.creator?.lastname || '' }}\r
                        </p>\r
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 truncate">\r
                            Task Owner\r
                        </p>\r
                    </div>\r
                </div>\r
            </div>\r
\r
            <div class="space-y-3 flex-1 flex flex-col min-h-0">\r
                <h3 class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                    <span class="material-symbols-outlined text-[14px]">history</span> Activity Timeline\r
                </h3>\r
                <div\r
                    class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-5">\r
                    <div class="max-h-64 overflow-y-auto scroll-smooth pr-2">\r
                        <div\r
                            class="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">\r
                            @for (act of task.activities; track act.id) {\r
                            <div class="relative pl-8 animate-in fade-in duration-500">\r
                                <div\r
                                    class="bg-blue-600 absolute left-0 top-1.5 w-4 h-4 rounded-full ring-4 ring-white dark:ring-slate-900 z-10">\r
                                </div>\r
                                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed break-words">\r
                                    <span class="font-bold text-slate-900 dark:text-slate-50">{{ act.user?.firstname ||\r
                                        'System' }}</span>\r
                                    {{ act.detail }}\r
                                </p>\r
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{\r
                                    act.createdAt | date:'shortTime' }}</p>\r
                            </div>\r
                            }\r
                            @if (!task.activities || task.activities.length === 0) {\r
                            <p class="text-xs text-slate-400 text-center py-4 pl-0">No activity yet.</p>\r
                            }\r
                        </div>\r
                    </div>\r
                    @if (task.activities && task.activities.length > 4) {\r
                    <button\r
                        class="mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">\r
                        View all activities <span class="material-symbols-outlined text-[16px]">chevron_right</span>\r
                    </button>\r
                    }\r
                </div>\r
            </div>\r
\r
            @if (isEditing) {\r
            <div class="space-y-3">\r
                <h2 class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                    <span class="material-symbols-outlined text-[14px]">chat_bubble</span> Add Comment\r
                </h2>\r
                <input type="text" [(ngModel)]="newComment" (keyup.enter)="postComment()"\r
                    placeholder="Type a comment..."\r
                    class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />\r
                <button (click)="postComment()" [disabled]="!newComment.trim()"\r
                    class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">\r
                    <span class="material-symbols-outlined text-[18px]">send</span>\r
                    Post Comment\r
                </button>\r
            </div>\r
            }\r
        </div>\r
    </div>\r
\r
    <app-common-dialog [open]="showUploadModal" size="sm" title="Upload Document"\r
        subtitle="Select a file to attach to this task." icon="cloud_upload" [showCloseButton]="true"\r
        [showFooter]="true" cancelLabel="Cancel" primaryLabel="Done"\r
        panelClass="rounded-2xl transform animate-in zoom-in-95 duration-200" (closed)="showUploadModal = false"\r
        (primary)="showUploadModal = false">\r
        <label\r
            class="m-4 sm:m-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors group">\r
            <input type="file" class="hidden" (change)="onFileSelected($event)">\r
            <span\r
                class="material-symbols-outlined text-[32px] text-blue-500 mb-2 group-hover:scale-110 transition-transform">cloud_upload</span>\r
            <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Click to Browse Files</p>\r
            <p class="text-[10px] text-slate-400 mt-1">Select any document or image</p>\r
        </label>\r
    </app-common-dialog>\r
\r
    <app-common-dialog [open]="showDeleteSubTaskModal" size="sm" variant="danger" title="Delete Sub-task?"\r
        subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"\r
        cancelLabel="Cancel" primaryLabel="Delete" (closed)="closeDeleteSubTaskDialog()"\r
        (primary)="confirmDeleteSubTask()">\r
        <div class="px-6 py-5">\r
            <p class="text-sm font-medium text-slate-600 dark:text-slate-300">\r
                Are you sure you want to delete this sub-task from the task checklist?\r
            </p>\r
        </div>\r
    </app-common-dialog>\r
</app-common-dialog>`, styles: ['/* src/app/modules/projects/widgets/task-detail/task-detail.scss */\n.material-symbols-outlined {\n  font-variation-settings:\n    "FILL" 0,\n    "wght" 400,\n    "GRAD" 0,\n    "opsz" 24;\n  vertical-align: middle;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.animate-in {\n  animation: fadeIn 0.3s ease-out forwards;\n}\n.task-detail-scroll {\n  max-height: calc(96vh - 88px);\n  box-sizing: border-box;\n  overflow-y: auto;\n  overflow-x: hidden;\n  scroll-behavior: smooth;\n  -webkit-overflow-scrolling: touch;\n  overscroll-behavior: contain;\n  touch-action: pan-y;\n  border-radius: 0 0 1rem 1rem;\n  padding-bottom: 4px;\n}\n.overflow-y-auto {\n  scroll-behavior: smooth;\n  -webkit-overflow-scrolling: touch;\n  overscroll-behavior: contain;\n  touch-action: pan-y;\n}\n::-webkit-scrollbar {\n  width: 6px;\n}\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n::-webkit-scrollbar-thumb {\n  background: #e2e8f0;\n  border-radius: 10px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #cbd5e1;\n}\n* {\n  scrollbar-width: thin;\n  scrollbar-color: #e2e8f0 transparent;\n}\n.dark ::-webkit-scrollbar-thumb {\n  background: #1e293b;\n}\n.dark ::-webkit-scrollbar-thumb:hover {\n  background: #334155;\n}\n.dark * {\n  scrollbar-color: #1e293b transparent;\n}\n/*# sourceMappingURL=task-detail.css.map */\n'] }]
  }], () => [], { task: [{
    type: Input
  }], close: [{
    type: Output
  }], scrollAreaRef: [{
    type: ViewChild,
    args: ["scrollArea"]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskDetail, { className: "TaskDetail", filePath: "app/modules/projects/widgets/task-detail/task-detail.ts", lineNumber: 21 });
})();

// src/app/modules/projects/widgets/add-task/add-task.ts
var _c02 = () => ({ standalone: true });
var _forTrack02 = ($index, $item) => $item.id;
var arrowFn0 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r2 = \u0275\u0275nextContext();
  return \u0275\u0275resetView(m.id == ctx_r2.newSubTask.materialId);
};
var arrowFn1 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r2 = \u0275\u0275nextContext();
  return \u0275\u0275resetView(m.id == ctx_r2.newSubTask.equipment_id);
};
var arrowFn2 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r2 = \u0275\u0275nextContext();
  return \u0275\u0275resetView(m.id == ctx_r2.newSubTask.labor_id);
};
var arrowFn3 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r2 = \u0275\u0275nextContext(2);
  return \u0275\u0275resetView(m.id == ctx_r2.newSubTask.materialId);
};
var arrowFn4 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r2 = \u0275\u0275nextContext(2);
  return \u0275\u0275resetView(m.id == ctx_r2.newSubTask.equipment_id);
};
var arrowFn5 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r2 = \u0275\u0275nextContext(2);
  return \u0275\u0275resetView(m.id == ctx_r2.newSubTask.labor_id);
};
function AddTask_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275listener("click", function AddTask_Conditional_13_For_2_Template_div_click_0_listener() {
      const milestone_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectMilestone(milestone_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    const milestone_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-primary", ((tmp_11_0 = ctx_r2.taskForm.get("milestone_id")) == null ? null : tmp_11_0.value) == milestone_r2.id)("font-bold", ((tmp_12_0 = ctx_r2.taskForm.get("milestone_id")) == null ? null : tmp_12_0.value) == milestone_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", milestone_r2.name, " ");
  }
}
function AddTask_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1, "No milestones found");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_13_For_2_Template, 2, 5, "div", 54, _forTrack02);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_13_Conditional_3_Template, 2, 0, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.milestones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.milestones.length === 0 ? 3 : -1);
  }
}
function AddTask_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275listener("click", function AddTask_Conditional_23_For_2_Template_div_click_0_listener() {
      const sub_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectSubMilestone(sub_r5));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    const sub_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-primary", ((tmp_11_0 = ctx_r2.taskForm.get("submilestone_id")) == null ? null : tmp_11_0.value) == sub_r5.id)("font-bold", ((tmp_12_0 = ctx_r2.taskForm.get("submilestone_id")) == null ? null : tmp_12_0.value) == sub_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sub_r5.name, " ");
  }
}
function AddTask_Conditional_23_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1, "No sub milestones found");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_23_For_2_Template, 2, 5, "div", 54, _forTrack02);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_23_Conditional_3_Template, 2, 0, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.subMilestones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.subMilestones.length === 0 ? 3 : -1);
  }
}
function AddTask_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, " No Sub Milestone Found ");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_46_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_46_For_2_Template_div_click_0_listener() {
      const p_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectPriority(p_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    const p_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-primary", ((tmp_11_0 = ctx_r2.taskForm.get("priority")) == null ? null : tmp_11_0.value) === p_r7.label)("font-bold", ((tmp_12_0 = ctx_r2.taskForm.get("priority")) == null ? null : tmp_12_0.value) === p_r7.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r7.label, " ");
  }
}
function AddTask_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_46_For_2_Template, 2, 5, "div", 57, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.priorities);
  }
}
function AddTask_Conditional_56_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_56_For_2_Template_div_click_0_listener() {
      const member_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectAssignee(member_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    const member_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-primary", ctx_r2.isSelected((tmp_11_0 = ctx_r2.taskForm.get("assigneeId")) == null ? null : tmp_11_0.value, member_r9.id))("font-bold", ctx_r2.isSelected((tmp_12_0 = ctx_r2.taskForm.get("assigneeId")) == null ? null : tmp_12_0.value, member_r9.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", member_r9.firstname, " ", member_r9.lastname, " ");
  }
}
function AddTask_Conditional_56_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275text(1, "No team members found");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_56_For_2_Template, 2, 6, "div", 57, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_56_Conditional_3_Template, 2, 0, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.teamMembers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.teamMembers.length === 0 ? 3 : -1);
  }
}
function AddTask_Conditional_84_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_84_For_2_Template_div_click_0_listener() {
      const vendor_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectVendor(vendor_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    const vendor_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-primary", ((tmp_11_0 = ctx_r2.taskForm.get("vendorId")) == null ? null : tmp_11_0.value) == vendor_r11.id)("font-bold", ((tmp_12_0 = ctx_r2.taskForm.get("vendorId")) == null ? null : tmp_12_0.value) == vendor_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r11.name, " ");
  }
}
function AddTask_Conditional_84_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275text(1, "No vendors found");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_84_For_2_Template, 2, 5, "div", 57, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_84_Conditional_3_Template, 2, 0, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.vendors);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.vendors.length === 0 ? 3 : -1);
  }
}
function AddTask_For_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 61)(4, "p", 62);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 63);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const file_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r12.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(file_r12.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r12.size);
  }
}
function AddTask_For_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 64)(2, "span", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 64)(7, "span", 65);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 67);
    \u0275\u0275listener("click", function AddTask_For_102_Template_button_click_9_listener() {
      const $index_r14 = \u0275\u0275restoreView(_r13).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeDependency($index_r14));
    });
    \u0275\u0275elementStart(10, "span", 42);
    \u0275\u0275text(11, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dep_r15 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dep_r15.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(dep_r15.predecessorTitle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dep_r15.lag);
  }
}
function AddTask_Conditional_110_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_110_For_2_Template_div_click_0_listener() {
      const t_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectPredecessor(t_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-primary", ctx_r2.isSelected(ctx_r2.selectedPredecessorId, t_r17.id))("font-bold", ctx_r2.isSelected(ctx_r2.selectedPredecessorId, t_r17.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r17.title, " ");
  }
}
function AddTask_Conditional_110_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275text(1, "No tasks found");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_110_For_2_Template, 2, 5, "div", 57, _forTrack02);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_110_Conditional_3_Template, 2, 0, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.allTasks);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.allTasks.length === 0 ? 3 : -1);
  }
}
function AddTask_Conditional_118_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_118_For_2_Template_div_click_0_listener() {
      const type_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectDepType(type_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-primary", ctx_r2.selectedDepType === type_r19.id)("font-bold", ctx_r2.selectedDepType === type_r19.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r19.name, " ");
  }
}
function AddTask_Conditional_118_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_118_For_2_Template, 2, 5, "div", 57, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.dependencyTypes);
  }
}
function AddTask_For_141_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "span", 74);
    \u0275\u0275text(2, "pending");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" +", item_r21.shortage, " Requested ");
  }
}
function AddTask_For_141_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 68)(2, "div", 69)(3, "div", 24)(4, "div")(5, "p", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 71);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 72)(10, "div", 73)(11, "span", 74);
    \u0275\u0275text(12, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, AddTask_For_141_Conditional_14_Template, 4, 1, "div", 75);
    \u0275\u0275elementStart(15, "div", 76)(16, "span", 74);
    \u0275\u0275text(17, " construction ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "button", 77);
    \u0275\u0275listener("click", function AddTask_For_141_Template_button_click_19_listener() {
      const $index_r22 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editSubTask($index_r22));
    });
    \u0275\u0275elementStart(20, "span", 78);
    \u0275\u0275text(21, " edit_square ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "button", 79);
    \u0275\u0275listener("click", function AddTask_For_141_Template_button_click_22_listener() {
      const $index_r22 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeSubTask($index_r22));
    });
    \u0275\u0275elementStart(23, "span", 78);
    \u0275\u0275text(24, " delete ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", item_r21.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r21.itemName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Qty: ", item_r21.materialQty, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r21.pendingRequest ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", item_r21.equipment_id, " ");
  }
}
function AddTask_Conditional_142_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Conditional_15_For_2_Template_div_click_0_listener() {
      const material_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectMaterial(material_r25));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r25 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("text-primary", ctx_r2.newSubTask.materialId == material_r25.id)("font-bold", ctx_r2.newSubTask.materialId == material_r25.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", material_r25.name, " ");
  }
}
function AddTask_Conditional_142_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275text(1, "No materials found");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_142_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_142_Conditional_15_For_2_Template, 2, 5, "div", 57, _forTrack02);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_142_Conditional_15_Conditional_3_Template, 2, 0, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.materials);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.materials.length === 0 ? 3 : -1);
  }
}
function AddTask_Conditional_142_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Available Stock: ", (tmp_2_0 = ctx_r2.materials.find(\u0275\u0275arrowFunction(1, arrowFn3, ctx))) == null ? null : tmp_2_0.stockUsed, " ");
  }
}
function AddTask_Conditional_142_Conditional_30_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Conditional_30_For_2_Template_div_click_0_listener() {
      const equipment_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectEquipment(equipment_r27));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const equipment_r27 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("text-primary", ctx_r2.newSubTask.equipment_id == equipment_r27.id)("font-bold", ctx_r2.newSubTask.equipment_id == equipment_r27.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", equipment_r27.name, " ");
  }
}
function AddTask_Conditional_142_Conditional_30_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275text(1, "No equipment found");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_142_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_142_Conditional_30_For_2_Template, 2, 5, "div", 57, _forTrack02);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_142_Conditional_30_Conditional_3_Template, 2, 0, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.equipmentList);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.equipmentList.length === 0 ? 3 : -1);
  }
}
function AddTask_Conditional_142_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Available Stock: ", (tmp_2_0 = ctx_r2.equipmentList.find(\u0275\u0275arrowFunction(1, arrowFn4, ctx))) == null ? null : tmp_2_0.stockUsed, " ");
  }
}
function AddTask_Conditional_142_Conditional_53_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Conditional_53_For_2_Template_div_click_0_listener() {
      const labor_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectLabor(labor_r29));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const labor_r29 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("text-primary", ctx_r2.newSubTask.labor_id == labor_r29.id)("font-bold", ctx_r2.newSubTask.labor_id == labor_r29.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", labor_r29.skill, " ");
  }
}
function AddTask_Conditional_142_Conditional_53_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275text(1, "Select a vendor first");
    \u0275\u0275elementEnd();
  }
}
function AddTask_Conditional_142_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AddTask_Conditional_142_Conditional_53_For_2_Template, 2, 5, "div", 57, _forTrack02);
    \u0275\u0275conditionalCreate(3, AddTask_Conditional_142_Conditional_53_Conditional_3_Template, 2, 0, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.labors);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.labors.length === 0 ? 3 : -1);
  }
}
function AddTask_Conditional_142_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Available Labor: ", (tmp_2_0 = ctx_r2.labors.find(\u0275\u0275arrowFunction(1, arrowFn5, ctx))) == null ? null : tmp_2_0.labor_count, " ");
  }
}
function AddTask_Conditional_142_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 4)(2, "label", 80);
    \u0275\u0275text(3, " Title ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_142_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newSubTask.title, $event) || (ctx_r2.newSubTask.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 3)(6, "div", 4)(7, "label", 80);
    \u0275\u0275text(8, " Material ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 6)(10, "button", 17);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Template_button_click_10_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("material", $event));
    });
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 18);
    \u0275\u0275text(14, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(15, AddTask_Conditional_142_Conditional_15_Template, 4, 1, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 4)(17, "label", 80);
    \u0275\u0275text(18, " Material Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_142_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newSubTask.materialQty, $event) || (ctx_r2.newSubTask.materialQty = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, AddTask_Conditional_142_Conditional_20_Template, 2, 2, "p", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 4)(22, "label", 80);
    \u0275\u0275text(23, " Equipment ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 6)(25, "button", 17);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Template_button_click_25_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("equipment", $event));
    });
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 18);
    \u0275\u0275text(29, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, AddTask_Conditional_142_Conditional_30_Template, 4, 1, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 4)(32, "label", 80);
    \u0275\u0275text(33, " Equipment Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_142_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newSubTask.equipmentQty, $event) || (ctx_r2.newSubTask.equipmentQty = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(35, AddTask_Conditional_142_Conditional_35_Template, 2, 2, "p", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 4)(37, "label", 80);
    \u0275\u0275text(38, " Start Date ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 84);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_142_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newSubTask.startDate, $event) || (ctx_r2.newSubTask.startDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 4)(41, "label", 80);
    \u0275\u0275text(42, " End Date ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 84);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_142_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newSubTask.endDate, $event) || (ctx_r2.newSubTask.endDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 4)(45, "label", 80);
    \u0275\u0275text(46, " Labor ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 6)(48, "button", 17);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Template_button_click_48_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("labor", $event));
    });
    \u0275\u0275elementStart(49, "span");
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 18);
    \u0275\u0275text(52, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(53, AddTask_Conditional_142_Conditional_53_Template, 4, 1, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 4)(55, "label", 80);
    \u0275\u0275text(56, " No. Of Labor ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_142_Template_input_ngModelChange_57_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newSubTask.no_of_labor, $event) || (ctx_r2.newSubTask.no_of_labor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(58, AddTask_Conditional_142_Conditional_58_Template, 2, 2, "p", 83);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 85)(60, "button", 86);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showSubTaskForm = false);
    });
    \u0275\u0275text(61, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 87);
    \u0275\u0275listener("click", function AddTask_Conditional_142_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addSubTask());
    });
    \u0275\u0275text(63, " Save ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_21_0;
    let tmp_35_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newSubTask.title);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(51, _c02));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("ring-2", ctx_r2.openDropdown === "material")("ring-primary", ctx_r2.openDropdown === "material");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-outline", !ctx_r2.newSubTask.materialId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getMaterialLabel());
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r2.openDropdown === "material");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "material" ? 15 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newSubTask.materialQty);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(52, _c02))("max", (tmp_11_0 = ctx_r2.materials.find(\u0275\u0275arrowFunction(48, arrowFn0, ctx))) == null ? null : tmp_11_0.stockUsed);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.newSubTask.materialId ? 20 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("ring-2", ctx_r2.openDropdown === "equipment")("ring-primary", ctx_r2.openDropdown === "equipment");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-outline", !ctx_r2.newSubTask.equipment_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getEquipmentLabel());
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r2.openDropdown === "equipment");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "equipment" ? 30 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newSubTask.equipmentQty);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(53, _c02))("max", (tmp_21_0 = ctx_r2.equipmentList.find(\u0275\u0275arrowFunction(49, arrowFn1, ctx))) == null ? null : tmp_21_0.stockUsed);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.newSubTask.equipment_id ? 35 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newSubTask.startDate);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(54, _c02));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newSubTask.endDate);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(55, _c02));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("ring-2", ctx_r2.openDropdown === "labor")("ring-primary", ctx_r2.openDropdown === "labor");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-outline", !ctx_r2.newSubTask.labor_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getLaborLabel());
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r2.openDropdown === "labor");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "labor" ? 53 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newSubTask.no_of_labor);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(56, _c02))("max", (tmp_35_0 = ctx_r2.labors.find(\u0275\u0275arrowFunction(50, arrowFn2, ctx))) == null ? null : tmp_35_0.labor_count);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.newSubTask.labor_id ? 58 : -1);
  }
}
function AddTask_Conditional_144_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 88)(2, "p", 89);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 90);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 91)(7, "div", 92)(8, "p", 93);
    \u0275\u0275text(9, "Requested");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h4", 94);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 95)(13, "p", 96);
    \u0275\u0275text(14, "Available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "h4", 97);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 98)(18, "p", 99);
    \u0275\u0275text(19, "Shortage");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "h4", 100);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 101)(23, "div", 19)(24, "div", 102)(25, "div", 103)(26, "span", 104);
    \u0275\u0275text(27, " check_circle ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "p", 105);
    \u0275\u0275text(29, " Allocate ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 106);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "span", 107);
    \u0275\u0275text(33, " east ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 102)(35, "div", 108)(36, "span", 109);
    \u0275\u0275text(37, " pending ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "p", 110);
    \u0275\u0275text(39, " Request ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "p", 111);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 112)(43, "span", 113);
    \u0275\u0275text(44, " info ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div")(46, "p", 114);
    \u0275\u0275text(47, " Automatic Processing ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "p", 115);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 116)(51, "button", 117);
    \u0275\u0275listener("click", function AddTask_Conditional_144_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelStockRequest());
    });
    \u0275\u0275text(52, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 118);
    \u0275\u0275listener("click", function AddTask_Conditional_144_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmStockRequest());
    });
    \u0275\u0275text(54, " Confirm & Request ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.stockDialogData.itemType === "material" ? "Material" : "Equipment", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.stockDialogData.selectedItem == null ? null : ctx_r2.stockDialogData.selectedItem.name, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.stockDialogData.itemType === "material" ? ctx_r2.newSubTask.materialQty : ctx_r2.newSubTask.equipmentQty, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r2.stockDialogData.available, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r2.stockDialogData.shortage, " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r2.stockDialogData.available, " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r2.stockDialogData.shortage, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2(" ", ctx_r2.stockDialogData.available, " units will be allocated immediately. Remaining ", ctx_r2.stockDialogData.shortage, " units will create a stock request for manager approval. ");
  }
}
var AddTask = class _AddTask {
  projectId = "";
  milestoneId = null;
  initialStatus = "To Do";
  close = new EventEmitter();
  save = new EventEmitter();
  projectService = inject(ProjectService);
  toast = inject(ToastrService);
  fb = inject(FormBuilder);
  materialService = inject(EquipmentInventoryService);
  taskForm;
  checklist = [];
  showSubTaskForm = false;
  editingIndex = null;
  newSubTask = {
    title: "",
    materialId: null,
    itemName: "",
    stockIn: 0,
    materialQty: 1,
    equipment_id: "",
    equipmentQty: 1,
    startDate: "",
    endDate: "",
    labor_id: "",
    no_of_labor: 1
  };
  dependencies = [];
  attachments = [];
  selectedPredecessorId = "";
  selectedDepType = "FS";
  depLag = 0;
  allTasks = [];
  priorities = [
    { label: "High Priority", class: "bg-red-100 text-red-700" },
    { label: "Medium Priority", class: "bg-blue-100 text-blue-700" },
    { label: "Low Priority", class: "bg-amber-100 text-amber-700" }
  ];
  dependencyTypes = [
    { id: "FS", name: "Finish-to-Start (FS)", desc: "Predecessor must finish before Successor can start" },
    { id: "SS", name: "Start-to-Start (SS)", desc: "Predecessor must start before Successor can start" },
    { id: "FF", name: "Finish-to-Finish (FF)", desc: "Predecessor must finish before Successor can finish" },
    { id: "SF", name: "Start-to-Finish (SF)", desc: "Predecessor must start before Successor can finish" }
  ];
  milestones = [];
  subMilestones = [];
  teamMembers = [];
  vendors = [];
  materials = [];
  equipmentList = [];
  labors = [];
  openDropdown = null;
  ngOnInit() {
    this.initForm();
    this.projectService.getProjectTasks(this.projectId).subscribe((res) => {
      this.allTasks = res.data;
      console.log(this.allTasks, "test");
    });
    if (this.projectId) {
      this.fetchTeamMembers();
      this.fetchVendors();
      this.fetchMaterials();
      this.materialService.loadMaterials();
      this.materialService.materials$.subscribe((m) => {
        this.equipmentList = m;
      });
    }
  }
  initForm() {
    this.taskForm = this.fb.group({
      title: ["", [Validators.required]],
      description: [""],
      priority: ["Medium Priority"],
      status: [this.initialStatus],
      startDate: [(/* @__PURE__ */ new Date()).toISOString().split("T")[0]],
      duration: [5],
      assigneeId: [""],
      vendorId: [""],
      initialComment: [""],
      milestone_id: [""],
      submilestone_id: [""]
    });
  }
  onMilestoneChange(event) {
    const milestoneId = event.target.value;
    const milestone = this.milestones.find((m) => m.id == milestoneId);
    this.subMilestones = milestone?.children || [];
  }
  fetchTeamMembers() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.teamMembers = res.data.team_members || [];
        this.milestones = res.data.milestones_with_child || [];
        this.taskForm.get("milestone_id")?.valueChanges.subscribe((milestoneId) => {
          const selectedMilestone = this.milestones.find((m) => m.id == milestoneId);
          this.subMilestones = selectedMilestone?.children || [];
          this.taskForm.patchValue({
            subMilestoneId: ""
          });
        });
        console.log(res, "res");
      }
    });
  }
  fetchVendors() {
    this.projectService.getVendors().subscribe({
      next: (res) => {
        this.vendors = res.data || [];
      }
    });
  }
  fetchMaterials() {
    this.projectService.getMaterialByprojectId(this.projectId).subscribe({
      next: (res) => {
        this.materials = Array.isArray(res.data) ? res.data : [res.data];
        console.log("Materials loaded:", this.materials);
      }
    });
  }
  resetSubTaskForm() {
    this.newSubTask = {
      title: "",
      materialId: null,
      itemName: "",
      stockIn: 0,
      materialQty: 1,
      equipment_id: "",
      equipmentQty: 1,
      startDate: "",
      endDate: "",
      labor_id: "",
      no_of_labor: 1
    };
    this.showSubTaskForm = false;
    this.editingIndex = null;
  }
  showStockDialog = false;
  stockDialogData = null;
  addSubTask() {
    if (this.newSubTask.title.trim() && this.newSubTask.materialId) {
      const selectedMaterial = this.materials.find((m) => m.id == this.newSubTask.materialId);
      if (!selectedMaterial) {
        this.toast.error("Material not found");
        return;
      }
      if (this.newSubTask.materialQty > selectedMaterial.stockUsed) {
        if (selectedMaterial.stockIn === 0 && selectedMaterial.stockUsed === 0) {
          this.stockDialogData = {
            available: 0,
            shortage: this.newSubTask.materialQty,
            selectedItem: selectedMaterial,
            itemType: "material"
          };
          this.showStockDialog = true;
          return;
        }
        this.stockDialogData = {
          available: selectedMaterial.stockUsed,
          shortage: this.newSubTask.materialQty - selectedMaterial.stockUsed,
          selectedItem: selectedMaterial,
          itemType: "material"
        };
        this.showStockDialog = true;
        return;
      }
      if (this.newSubTask.equipment_id) {
        const selectedEquipment = this.equipmentList.find((e) => e.id == this.newSubTask.equipment_id);
        if (!selectedEquipment) {
          this.toast.error("Equipment not found");
          return;
        }
        if (this.newSubTask.equipmentQty > selectedEquipment.stockUsed) {
          if (selectedEquipment.stockIn === 0 && selectedEquipment.stockUsed === 0) {
            this.stockDialogData = {
              available: 0,
              shortage: this.newSubTask.equipmentQty,
              selectedItem: selectedEquipment,
              itemType: "equipment"
            };
            this.showStockDialog = true;
            return;
          }
          this.stockDialogData = {
            available: selectedEquipment.stockUsed,
            shortage: this.newSubTask.equipmentQty - selectedEquipment.stockUsed,
            selectedItem: selectedEquipment,
            itemType: "equipment"
          };
          this.showStockDialog = true;
          return;
        }
      }
      const payload = {
        title: this.newSubTask.title,
        material_id: selectedMaterial.id,
        itemName: selectedMaterial.name,
        stockIn: selectedMaterial.stockIn,
        materialQty: this.newSubTask.materialQty,
        equipment_id: this.newSubTask.equipment_id,
        equipmentQty: this.newSubTask.equipmentQty,
        completed: false,
        startDate: this.newSubTask.startDate,
        endDate: this.newSubTask.endDate,
        labor_id: this.newSubTask.labor_id,
        no_of_labor: this.newSubTask.no_of_labor
      };
      if (this.editingIndex !== null) {
        this.checklist[this.editingIndex] = payload;
        this.editingIndex = null;
      } else {
        this.checklist.push(payload);
      }
      this.newSubTask = {
        title: "",
        materialId: null,
        itemName: "",
        stockIn: 0,
        materialQty: 1,
        equipment_id: "",
        equipmentQty: 1,
        startDate: "",
        endDate: "",
        labor_id: "",
        no_of_labor: 1
      };
      this.showSubTaskForm = false;
    }
  }
  editSubTask(index) {
    const item = this.checklist[index];
    this.newSubTask = {
      title: item.title,
      materialId: item.material_id,
      itemName: item.itemName,
      stockIn: item.stockIn,
      materialQty: item.requestedQty ?? item.materialQty,
      equipment_id: item.equipment_id,
      equipmentQty: item.equipmentQty,
      startDate: item.startDate ?? "",
      endDate: item.endDate ?? "",
      labor_id: item.labor_id ?? "",
      no_of_labor: item.no_of_labor ?? 1
    };
    this.editingIndex = index;
    this.showSubTaskForm = true;
  }
  confirmStockRequest() {
    if (!this.stockDialogData)
      return;
    const { available, shortage, selectedItem, itemType } = this.stockDialogData;
    const basePayload = {
      title: this.newSubTask.title,
      stockIn: available,
      materialQty: available,
      requestedQty: this.newSubTask.materialQty || this.newSubTask.equipmentQty,
      shortage,
      pendingRequest: true,
      startDate: this.newSubTask.startDate,
      endDate: this.newSubTask.endDate,
      labor_id: this.newSubTask.labor_id,
      no_of_labor: this.newSubTask.no_of_labor,
      completed: false
    };
    let payload;
    if (itemType === "material") {
      payload = __spreadProps(__spreadValues({}, basePayload), {
        material_id: selectedItem.id,
        itemName: selectedItem.name,
        equipment_id: this.newSubTask.equipment_id,
        equipmentQty: this.newSubTask.equipmentQty
      });
    } else {
      payload = __spreadProps(__spreadValues({}, basePayload), {
        equipment_id: selectedItem.id,
        itemName: selectedItem.name,
        equipmentQty: this.newSubTask.equipmentQty
      });
    }
    if (this.editingIndex !== null) {
      const oldItem = this.checklist[this.editingIndex];
      this.checklist[this.editingIndex] = __spreadProps(__spreadValues({}, payload), {
        stock_request_id: oldItem.stock_request_id
      });
      if (!oldItem.stock_request_id) {
        this.toast.error("Stock request id not found");
        return;
      }
      const updatePayload = {
        task_title: this.newSubTask.title,
        requested_qty: shortage,
        available_qty: available,
        project_id: this.projectId
      };
      if (itemType === "material") {
        updatePayload.material_id = selectedItem.id;
      } else {
        updatePayload.equipment_id = selectedItem.id;
      }
      this.projectService.updateAdditionalStockRequest(oldItem.stock_request_id, updatePayload).subscribe({
        next: () => {
          this.toast.success("Stock request updated");
        },
        error: () => {
          this.toast.error("Failed to update stock request");
        }
      });
    } else {
      const reqPayload = {
        task_title: this.newSubTask.title,
        requested_qty: shortage,
        available_qty: available,
        project_id: this.projectId
      };
      if (itemType === "material") {
        reqPayload.material_id = selectedItem.id;
      } else {
        reqPayload.equipment_id = selectedItem.id;
      }
      this.projectService.requestAdditionalStock(reqPayload).subscribe({
        next: (res) => {
          this.checklist.push(__spreadProps(__spreadValues({}, payload), {
            stock_request_id: res.data.id
          }));
          this.toast.success(`Request sent for ${shortage} items`);
        },
        error: () => {
          this.toast.error("Failed to send stock request");
        }
      });
    }
    this.showStockDialog = false;
    this.stockDialogData = null;
    this.resetSubTaskForm();
  }
  cancelStockRequest() {
    this.showStockDialog = false;
    this.stockDialogData = null;
  }
  removeSubTask(index) {
    this.checklist.splice(index, 1);
  }
  addDependency() {
    if (this.selectedPredecessorId) {
      const pred = this.allTasks.find((t) => t.id === Number(this.selectedPredecessorId));
      const typeObj = this.dependencyTypes.find((t) => t.id === this.selectedDepType);
      this.dependencies.push({
        predecessor_id: Number(this.selectedPredecessorId),
        predecessorTitle: pred?.title,
        type: this.selectedDepType,
        typeName: typeObj?.name,
        lag: this.depLag
      });
      this.selectedPredecessorId = "";
    }
  }
  getSelectedDepDesc() {
    return this.dependencyTypes.find((t) => t.id === this.selectedDepType)?.desc || "";
  }
  removeDependency(index) {
    this.dependencies.splice(index, 1);
  }
  onFileSelected(event) {
    const files = event.target.files;
    if (!files)
      return;
    for (let i = 0; i < files.length; i++) {
      this.attachments.push({
        name: files[i].name,
        size: (files[i].size / 1024).toFixed(1) + " KB",
        icon: "description",
        color: "blue"
      });
    }
  }
  loadLabors(vendorId) {
    if (vendorId) {
      this.projectService.getLaborByVendor(Number(vendorId)).subscribe((res) => {
        this.labors = res.data || [];
      });
    }
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const payload = __spreadProps(__spreadValues({}, formValue), {
        milestone_id: this.milestoneId,
        vendor_id: formValue.vendorId,
        sub_tasks: this.checklist,
        dependencies: this.dependencies,
        assignees: formValue.assigneeId ? [Number(formValue.assigneeId)] : [],
        due_date: this.calculateDueDate(formValue.startDate, formValue.duration)
      });
      this.projectService.createTask(this.projectId, payload).subscribe({
        next: (res) => {
          this.save.emit(res.data);
          this.toast.success("Task initialized successfully");
          this.close.emit();
        },
        error: () => this.toast.error("Failed to initialize task")
      });
    }
  }
  calculateDueDate(startDate, duration) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + duration);
    return date.toISOString().split("T")[0];
  }
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest(".app-dropdown")) {
      this.openDropdown = null;
    }
  }
  toggleDropdown(name, event) {
    event.stopPropagation();
    this.openDropdown = this.openDropdown === name ? null : name;
  }
  closeDropdown() {
    this.openDropdown = null;
  }
  isSelected(a, b) {
    return a == b;
  }
  getMilestoneLabel() {
    const id = this.taskForm.get("milestone_id")?.value;
    const m = this.milestones.find((x) => x.id == id);
    return m ? m.name : "Select Milestone";
  }
  selectMilestone(milestone) {
    this.taskForm.patchValue({ milestone_id: milestone.id });
    this.closeDropdown();
  }
  getSubMilestoneLabel() {
    const id = this.taskForm.get("submilestone_id")?.value;
    const s = this.subMilestones.find((x) => x.id == id);
    return s ? s.name : "Select Sub Milestone";
  }
  selectSubMilestone(sub) {
    this.taskForm.patchValue({ submilestone_id: sub.id });
    this.closeDropdown();
  }
  getPriorityLabel() {
    return this.taskForm.get("priority")?.value || "Select Priority";
  }
  selectPriority(p) {
    this.taskForm.patchValue({ priority: p.label });
    this.closeDropdown();
  }
  getAssigneeLabel() {
    const id = this.taskForm.get("assigneeId")?.value;
    const member = this.teamMembers.find((x) => x.id == id);
    return member ? `${member.firstname} ${member.lastname}` : "Select Team Member";
  }
  selectAssignee(member) {
    this.taskForm.patchValue({ assigneeId: member.id });
    this.closeDropdown();
  }
  getVendorLabel() {
    const id = this.taskForm.get("vendorId")?.value;
    const v = this.vendors.find((x) => x.id == id);
    return v ? v.name : "Select Vendor";
  }
  selectVendor(vendor) {
    this.taskForm.patchValue({ vendorId: vendor.id });
    this.loadLabors(vendor.id);
    this.closeDropdown();
  }
  getMaterialLabel() {
    const id = this.newSubTask.materialId;
    const m = this.materials.find((x) => x.id == id);
    return m ? m.name : "Select Material";
  }
  selectMaterial(material) {
    this.newSubTask.materialId = material.id;
    this.closeDropdown();
  }
  getEquipmentLabel() {
    const id = this.newSubTask.equipment_id;
    const e = this.equipmentList.find((x) => x.id == id);
    return e ? e.name : "Select Equipment";
  }
  selectEquipment(equipment) {
    this.newSubTask.equipment_id = equipment.id;
    this.closeDropdown();
  }
  getLaborLabel() {
    const id = this.newSubTask.labor_id;
    const l = this.labors.find((x) => x.id == id);
    return l ? l.skill : "Select Labor";
  }
  selectLabor(labor) {
    this.newSubTask.labor_id = labor.id;
    this.closeDropdown();
  }
  getPredecessorLabel() {
    const id = this.selectedPredecessorId;
    const t = this.allTasks.find((x) => x.id == id);
    return t ? t.title : "Link Predecessor...";
  }
  selectPredecessor(task) {
    this.selectedPredecessorId = task.id;
    this.closeDropdown();
  }
  getDepTypeLabel() {
    const t = this.dependencyTypes.find((x) => x.id === this.selectedDepType);
    return t ? t.name : "Select Type";
  }
  selectDepType(type) {
    this.selectedDepType = type.id;
    this.closeDropdown();
  }
  static \u0275fac = function AddTask_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddTask)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddTask, selectors: [["app-add-task"]], hostBindings: function AddTask_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function AddTask_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { projectId: "projectId", milestoneId: "milestoneId", initialStatus: "initialStatus" }, outputs: { close: "close", save: "save" }, decls: 145, vars: 81, consts: [["title", "Initialize Construction Task", "subtitle", "Create and configure a new construction activity", "icon", "add_task", "maxWidth", "max-w-4xl", "cancelLabel", "Discard", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "flex", "min-h-0", "flex-col", 3, "formGroup"], [1, "flex-1", "overflow-y-auto", "p-6", "lg:p-8"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "space-y-2"], [1, "block", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "app-dropdown", "relative"], ["type", "button", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-sm", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", "flex", "items-center", "justify-between", "text-left", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-outline", "text-[18px]", "transition-transform", "duration-200"], [1, "absolute", "z-20", "mt-2", "w-full", "bg-surface", "rounded-2xl", "shadow-lg", "ring-1", "ring-outline-variant/10", "max-h-60", "overflow-y-auto"], [1, "text-xs", "text-red-500", "font-medium"], [1, "space-y-6", "mt-2"], [1, "space-y-4"], ["formControlName", "title", "placeholder", "e.g., Structural Steel Erection", "type", "text", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-2xl", "p-4", "text-sm", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none"], ["formControlName", "description", "rows", "3", "placeholder", "Scope of work...", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-2xl", "p-4", "text-sm", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", "resize-none"], [1, "space-y-6"], [1, "grid", "grid-cols-2", "gap-4"], ["type", "button", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-xs", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", "flex", "items-center", "justify-between", "text-left", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-outline", "text-[16px]", "transition-transform", "duration-200"], [1, "flex", "items-center", "justify-between"], [1, "text-[8px]", "font-black", "bg-amber-100", "text-amber-700", "px-1.5", "py-0.5", "rounded", "uppercase", "tracking-widest"], [1, "grid", "grid-cols-2", "gap-4", "bg-surface-container-low/50", "p-4", "rounded-2xl", "ring-1", "ring-outline-variant/10"], [1, "block", "text-[9px]", "font-bold", "text-outline", "uppercase", "tracking-wider"], ["type", "date", "formControlName", "startDate", 1, "w-full", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "outline-none", "ring-1", "ring-outline-variant/10"], [1, "flex", "items-center", "gap-2"], ["type", "number", "formControlName", "duration", 1, "flex-1", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "outline-none", "ring-1", "ring-outline-variant/10"], [1, "text-[10px]", "font-black", "text-outline"], [1, "grid", "grid-cols-2", "gap-3"], [1, "flex", "items-center", "gap-3", "p-3", "bg-surface", "rounded-xl", "border", "border-outline-variant/5", "shadow-sm"], [1, "border-2", "border-dashed", "border-outline-variant/20", "rounded-xl", "p-4", "flex", "flex-col", "items-center", "justify-center", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "group", "col-span-2"], ["type", "file", "multiple", "", 1, "hidden", 3, "change"], [1, "material-symbols-outlined", "text-outline", "group-hover:text-primary", "transition-colors"], [1, "text-[10px]", "font-black", "text-outline", "uppercase", "tracking-widest", "mt-1"], [1, "bg-surface-container-low/50", "rounded-2xl", "p-4", "space-y-4", "ring-1", "ring-outline-variant/10"], [1, "flex", "items-center", "justify-between", "p-3", "bg-surface", "rounded-xl", "shadow-sm", "border", "border-outline-variant/5"], [1, "pt-2", "border-t", "border-outline-variant/10", "space-y-3"], ["type", "button", 1, "w-full", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "ring-1", "ring-outline-variant/10", "outline-none", "flex", "items-center", "justify-between", "text-left", "transition-all", 3, "click"], [1, "flex", "gap-2"], [1, "app-dropdown", "relative", "flex-1"], [1, "truncate"], ["type", "number", "placeholder", "Lag", 1, "w-20", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "ring-1", "ring-outline-variant/10", "outline-none", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "px-4", "bg-primary", "text-white", "rounded-lg", "hover:bg-primary-container", "transition-colors", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "text-[9px]", "text-primary/60", "font-medium", "px-1"], [1, "relative"], ["formControlName", "initialComment", "rows", "2", "placeholder", "Tag team members or add notes...", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-2xl", "p-4", "text-sm", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", "resize-none"], [1, "absolute", "right-3", "bottom-3", "text-outline", "hover:text-primary"], [1, "material-symbols-outlined", "text-[20px]"], ["type", "button", 1, "text-[10px]", "font-black", "bg-primary/10", "text-primary", "px-3", "py-1.5", "rounded-lg", "hover:bg-primary/20", "uppercase", "tracking-widest", "transition-colors", 3, "click"], [1, "bg-surface-container-low/50", "rounded-2xl", "p-3", "space-y-3", "ring-1", "ring-outline-variant/10"], [1, "p-4", "bg-surface", "rounded-2xl", "border", "border-outline-variant/5", "shadow-sm"], [1, "bg-surface", "rounded-2xl", "p-5", "border", "border-outline-variant/10", "space-y-5", "animate-in", "slide-in-from-top-2", "duration-200"], ["title", "Insufficient Stock", "subtitle", "Inventory allocation & shortage request", "icon", "inventory_2", "maxWidth", "max-w-md", 3, "closed", "open", "showCloseButton", "showFooter", "closeOnBackdrop"], [1, "p-6", "space-y-5"], [1, "px-4", "py-2.5", "text-sm", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", 3, "text-primary", "font-bold"], [1, "px-4", "py-2.5", "text-sm", "text-outline"], [1, "px-4", "py-2.5", "text-sm", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", 3, "click"], [1, "px-4", "py-2.5", "text-xs", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", 3, "text-primary", "font-bold"], [1, "px-4", "py-2.5", "text-xs", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", 3, "click"], [1, "px-4", "py-2.5", "text-xs", "text-outline"], [1, "material-symbols-outlined", "text-primary", "text-sm"], [1, "flex-1", "overflow-hidden"], [1, "text-[10px]", "font-bold", "text-on-surface", "truncate"], [1, "text-[8px]", "text-outline", "font-bold"], [1, "flex", "items-center", "gap-3", "overflow-hidden"], [1, "text-[9px]", "font-black", "bg-blue-100", "text-blue-700", "px-1.5", "py-0.5", "rounded"], [1, "text-xs", "font-bold", "text-on-surface", "truncate"], [1, "text-error/60", "hover:text-error", 3, "click"], [1, "flex", "items-start", "justify-between", "gap-4"], [1, "flex-1", "space-y-3"], [1, "text-sm", "font-black", "text-on-surface"], [1, "text-xs", "text-outline", "font-semibold"], [1, "flex", "flex-wrap", "gap-3"], [1, "flex", "items-center", "gap-1", "bg-blue-100", "text-blue-700", "px-2", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-wide"], [1, "material-symbols-outlined", "text-[14px]"], [1, "flex", "items-center", "gap-1", "bg-orange-100", "text-orange-700", "px-2", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-wide"], [1, "flex", "items-center", "gap-1", "bg-amber-100", "text-amber-700", "px-2", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-wide"], ["type", "button", 1, "text-primary", "hover:text-primary/70", "transition-colors", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], ["type", "button", 1, "text-error/60", "hover:text-error", "transition-colors", 3, "click"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], ["type", "text", "placeholder", "e.g. Concrete Work", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-sm", "outline-none", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "1", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-sm", "outline-none", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel", "ngModelOptions", "max"], [1, "text-[10px]", "text-primary", "font-bold", "px-1"], ["type", "date", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-xs", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "flex", "justify-end", "gap-3", "pt-2"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "text-outline", "hover:text-on-surface", "transition-colors", 3, "click"], ["type", "button", 1, "px-5", "py-2.5", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", "hover:scale-[1.02]", "active:scale-[0.98]", "transition-all", 3, "click"], [1, "rounded-2xl", "bg-slate-100", "p-3", "border", "border-slate-300"], [1, "text-xs", "text-slate-600", "font-semibold", "uppercase"], [1, "text-lg", "font-black", "text-slate-800", "mt-1"], [1, "grid", "grid-cols-3", "gap-3"], [1, "rounded-2xl", "bg-slate-50", "border", "border-slate-200", "p-4", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "text-slate-500"], [1, "text-2xl", "font-black", "text-slate-800", "mt-1"], [1, "rounded-2xl", "bg-emerald-50", "border", "border-emerald-200", "p-4", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "text-emerald-600"], [1, "text-2xl", "font-black", "text-emerald-700", "mt-1"], [1, "rounded-2xl", "bg-orange-50", "border", "border-orange-200", "p-4", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "text-orange-600"], [1, "text-2xl", "font-black", "text-orange-700", "mt-1"], [1, "rounded-3xl", "border", "border-outline-variant/10", "bg-surface-container-low", "p-5"], [1, "flex", "flex-col", "items-center"], [1, "w-12", "h-12", "rounded-2xl", "bg-emerald-100", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-emerald-600"], [1, "mt-2", "text-xs", "font-black", "text-emerald-700"], [1, "text-xl", "font-black", "text-emerald-700"], [1, "material-symbols-outlined", "text-outline"], [1, "w-12", "h-12", "rounded-2xl", "bg-orange-100", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-orange-600"], [1, "mt-2", "text-xs", "font-black", "text-orange-700"], [1, "text-xl", "font-black", "text-orange-700"], [1, "rounded-2xl", "bg-blue-50", "border", "border-blue-200", "p-4", "flex", "gap-3"], [1, "material-symbols-outlined", "text-blue-600"], [1, "text-xs", "font-black", "text-blue-700"], [1, "text-[11px]", "text-blue-600", "mt-1", "leading-relaxed"], [1, "flex", "gap-3", "pt-2"], [1, "flex-1", "h-12", "rounded-2xl", "border", "border-slate-300", "font-black", 3, "click"], [1, "flex-1", "h-12", "rounded-2xl", "bg-primary", "text-white", "font-black", 3, "click"]], template: function AddTask_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-common-dialog", 0);
      \u0275\u0275listener("closed", function AddTask_Template_app_common_dialog_closed_0_listener() {
        return ctx.close.emit();
      })("primary", function AddTask_Template_app_common_dialog_primary_0_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "label", 5);
      \u0275\u0275text(6, " Milestone ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 6)(8, "button", 7);
      \u0275\u0275listener("click", function AddTask_Template_button_click_8_listener($event) {
        return ctx.toggleDropdown("milestone", $event);
      });
      \u0275\u0275elementStart(9, "span");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 8);
      \u0275\u0275text(12, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(13, AddTask_Conditional_13_Template, 4, 1, "div", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 4)(15, "label", 5);
      \u0275\u0275text(16, " Sub Milestone ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 6)(18, "button", 7);
      \u0275\u0275listener("click", function AddTask_Template_button_click_18_listener($event) {
        return ctx.toggleDropdown("submilestone", $event);
      });
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span", 8);
      \u0275\u0275text(22, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(23, AddTask_Conditional_23_Template, 4, 1, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, AddTask_Conditional_24_Template, 2, 0, "p", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 11)(26, "section", 12)(27, "div", 4)(28, "label", 5);
      \u0275\u0275text(29, "Task Title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 4)(32, "label", 5);
      \u0275\u0275text(33, "Detailed Instructions");
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "textarea", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 15)(36, "div", 16)(37, "div", 4)(38, "label", 5);
      \u0275\u0275text(39, "Priority");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 6)(41, "button", 17);
      \u0275\u0275listener("click", function AddTask_Template_button_click_41_listener($event) {
        return ctx.toggleDropdown("priority", $event);
      });
      \u0275\u0275elementStart(42, "span");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "span", 18);
      \u0275\u0275text(45, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(46, AddTask_Conditional_46_Template, 3, 0, "div", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "div", 4)(48, "label", 5);
      \u0275\u0275text(49, "Assignee");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 6)(51, "button", 17);
      \u0275\u0275listener("click", function AddTask_Template_button_click_51_listener($event) {
        return ctx.toggleDropdown("assignee", $event);
      });
      \u0275\u0275elementStart(52, "span");
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "span", 18);
      \u0275\u0275text(55, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(56, AddTask_Conditional_56_Template, 4, 1, "div", 9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(57, "section", 12)(58, "div", 19)(59, "label", 5);
      \u0275\u0275text(60, "Scheduling Parameters");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "span", 20);
      \u0275\u0275text(62, "CPM Enabled");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 21)(64, "div", 4)(65, "label", 22);
      \u0275\u0275text(66, "Start Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(67, "input", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div", 4)(69, "label", 22);
      \u0275\u0275text(70, "Duration (Days)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 24);
      \u0275\u0275element(72, "input", 25);
      \u0275\u0275elementStart(73, "span", 26);
      \u0275\u0275text(74, "DYS");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(75, "div", 4)(76, "label", 5);
      \u0275\u0275text(77, "Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "div", 6)(79, "button", 17);
      \u0275\u0275listener("click", function AddTask_Template_button_click_79_listener($event) {
        return ctx.toggleDropdown("vendor", $event);
      });
      \u0275\u0275elementStart(80, "span");
      \u0275\u0275text(81);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "span", 18);
      \u0275\u0275text(83, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(84, AddTask_Conditional_84_Template, 4, 1, "div", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "section", 12)(86, "label", 5);
      \u0275\u0275text(87, "Attachments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "div", 27);
      \u0275\u0275repeaterCreate(89, AddTask_For_90_Template, 8, 3, "div", 28, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(91, "label", 29)(92, "input", 30);
      \u0275\u0275listener("change", function AddTask_Template_input_change_92_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "span", 31);
      \u0275\u0275text(94, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "span", 32);
      \u0275\u0275text(96, "Upload Documents");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(97, "section", 12)(98, "label", 5);
      \u0275\u0275text(99, "Predecessor Relationships");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "div", 33);
      \u0275\u0275repeaterCreate(101, AddTask_For_102_Template, 12, 3, "div", 34, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(103, "div", 35)(104, "div", 6)(105, "button", 36);
      \u0275\u0275listener("click", function AddTask_Template_button_click_105_listener($event) {
        return ctx.toggleDropdown("predecessor", $event);
      });
      \u0275\u0275elementStart(106, "span");
      \u0275\u0275text(107);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "span", 18);
      \u0275\u0275text(109, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(110, AddTask_Conditional_110_Template, 4, 1, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(111, "div", 37)(112, "div", 38)(113, "button", 36);
      \u0275\u0275listener("click", function AddTask_Template_button_click_113_listener($event) {
        return ctx.toggleDropdown("depType", $event);
      });
      \u0275\u0275elementStart(114, "span", 39);
      \u0275\u0275text(115);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(116, "span", 18);
      \u0275\u0275text(117, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(118, AddTask_Conditional_118_Template, 3, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(119, "input", 40);
      \u0275\u0275twoWayListener("ngModelChange", function AddTask_Template_input_ngModelChange_119_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.depLag, $event) || (ctx.depLag = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(120, "button", 41);
      \u0275\u0275listener("click", function AddTask_Template_button_click_120_listener() {
        return ctx.addDependency();
      });
      \u0275\u0275elementStart(121, "span", 42);
      \u0275\u0275text(122, "link");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(123, "p", 43);
      \u0275\u0275text(124);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(125, "section", 12)(126, "label", 5);
      \u0275\u0275text(127, "Initial Comment / Handover Note");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(128, "div", 44);
      \u0275\u0275element(129, "textarea", 45);
      \u0275\u0275elementStart(130, "button", 46)(131, "span", 47);
      \u0275\u0275text(132, "alternate_email");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(133, "section", 12)(134, "div", 19)(135, "label", 5);
      \u0275\u0275text(136, " Sub-tasks ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(137, "button", 48);
      \u0275\u0275listener("click", function AddTask_Template_button_click_137_listener() {
        return ctx.showSubTaskForm = !ctx.showSubTaskForm;
      });
      \u0275\u0275text(138, " Add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(139, "div", 49);
      \u0275\u0275repeaterCreate(140, AddTask_For_141_Template, 25, 5, "div", 50, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(142, AddTask_Conditional_142_Template, 64, 57, "div", 51);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(143, "app-common-dialog", 52);
      \u0275\u0275listener("closed", function AddTask_Template_app_common_dialog_closed_143_listener() {
        return ctx.cancelStockRequest();
      });
      \u0275\u0275conditionalCreate(144, AddTask_Conditional_144_Template, 55, 9, "div", 53);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_12_0;
      let tmp_16_0;
      let tmp_24_0;
      let tmp_30_0;
      \u0275\u0275property("open", true)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.taskForm);
      \u0275\u0275advance(7);
      \u0275\u0275classProp("ring-2", ctx.openDropdown === "milestone")("ring-primary", ctx.openDropdown === "milestone");
      \u0275\u0275advance();
      \u0275\u0275classProp("text-outline", !((tmp_6_0 = ctx.taskForm.get("milestone_id")) == null ? null : tmp_6_0.value));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getMilestoneLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.openDropdown === "milestone");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "milestone" ? 13 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("ring-2", ctx.openDropdown === "submilestone")("ring-primary", ctx.openDropdown === "submilestone");
      \u0275\u0275advance();
      \u0275\u0275classProp("text-outline", !((tmp_12_0 = ctx.taskForm.get("submilestone_id")) == null ? null : tmp_12_0.value));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getSubMilestoneLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.openDropdown === "submilestone");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "submilestone" ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_16_0 = ctx.taskForm.get("milestone_id")) == null ? null : tmp_16_0.value) && ctx.subMilestones.length === 0 ? 24 : -1);
      \u0275\u0275advance(17);
      \u0275\u0275classProp("ring-2", ctx.openDropdown === "priority")("ring-primary", ctx.openDropdown === "priority");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.getPriorityLabel());
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.openDropdown === "priority");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "priority" ? 46 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("ring-2", ctx.openDropdown === "assignee")("ring-primary", ctx.openDropdown === "assignee");
      \u0275\u0275advance();
      \u0275\u0275classProp("text-outline", !((tmp_24_0 = ctx.taskForm.get("assigneeId")) == null ? null : tmp_24_0.value));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.getAssigneeLabel());
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.openDropdown === "assignee");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "assignee" ? 56 : -1);
      \u0275\u0275advance(23);
      \u0275\u0275classProp("ring-2", ctx.openDropdown === "vendor")("ring-primary", ctx.openDropdown === "vendor");
      \u0275\u0275advance();
      \u0275\u0275classProp("text-outline", !((tmp_30_0 = ctx.taskForm.get("vendorId")) == null ? null : tmp_30_0.value));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.getVendorLabel());
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.openDropdown === "vendor");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "vendor" ? 84 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.attachments);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.dependencies);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("ring-2", ctx.openDropdown === "predecessor")("ring-primary", ctx.openDropdown === "predecessor");
      \u0275\u0275advance();
      \u0275\u0275classProp("text-outline", !ctx.selectedPredecessorId);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.getPredecessorLabel());
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.openDropdown === "predecessor");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "predecessor" ? 110 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("ring-2", ctx.openDropdown === "depType")("ring-primary", ctx.openDropdown === "depType");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.getDepTypeLabel());
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.openDropdown === "depType");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "depType" ? 118 : -1);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.depLag);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(80, _c02));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.getSelectedDepDesc(), " ");
      \u0275\u0275advance(16);
      \u0275\u0275repeater(ctx.checklist);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showSubTaskForm ? 142 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showStockDialog && !!ctx.stockDialogData)("showCloseButton", true)("showFooter", false)("closeOnBackdrop", false);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.stockDialogData ? 144 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, NgModel, ToastrModule, ReactiveFormsModule, FormGroupDirective, FormControlName, CommonDialogComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  z-index: 9999;\n}\n/*# sourceMappingURL=add-task.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddTask, [{
    type: Component,
    args: [{ selector: "app-add-task", standalone: true, imports: [CommonModule, FormsModule, ToastrModule, ReactiveFormsModule, CommonDialogComponent], template: `<app-common-dialog [open]="true" title="Initialize Construction Task"\r
    subtitle="Create and configure a new construction activity" icon="add_task" [showCloseButton]="true"\r
    [showFooter]="true" maxWidth="max-w-4xl" (closed)="close.emit()" (primary)="onSubmit()" cancelLabel="Discard">\r
    <div [formGroup]="taskForm" class="flex min-h-0 flex-col">\r
        <div class="flex-1 overflow-y-auto p-6 lg:p-8">\r
\r
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
\r
                <div class="space-y-2">\r
                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">\r
                        Milestone\r
                    </label>\r
\r
                    <div class="app-dropdown relative">\r
                        <button type="button" (click)="toggleDropdown('milestone', $event)"\r
                            class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                            [class.ring-2]="openDropdown === 'milestone'"\r
                            [class.ring-primary]="openDropdown === 'milestone'">\r
                            <span [class.text-outline]="!taskForm.get('milestone_id')?.value">\r
                                {{ getMilestoneLabel() }}\r
                            </span>\r
                            <span\r
                                class="material-symbols-outlined text-outline text-[18px] transition-transform duration-200"\r
                                [class.rotate-180]="openDropdown === 'milestone'">expand_more</span>\r
                        </button>\r
\r
                        @if(openDropdown === 'milestone'){\r
                        <div\r
                            class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                            @for(milestone of milestones; track milestone.id){\r
                            <div (click)="selectMilestone(milestone)"\r
                                class="px-4 py-2.5 text-sm cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                [class.text-primary]="taskForm.get('milestone_id')?.value == milestone.id"\r
                                [class.font-bold]="taskForm.get('milestone_id')?.value == milestone.id">\r
                                {{ milestone.name }}\r
                            </div>\r
                            }\r
                            @if(milestones.length === 0){\r
                            <div class="px-4 py-2.5 text-sm text-outline">No milestones found</div>\r
                            }\r
                        </div>\r
                        }\r
                    </div>\r
                </div>\r
\r
                <div class="space-y-2">\r
                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">\r
                        Sub Milestone\r
                    </label>\r
\r
                    <div class="app-dropdown relative">\r
                        <button type="button" (click)="toggleDropdown('submilestone', $event)"\r
                            class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                            [class.ring-2]="openDropdown === 'submilestone'"\r
                            [class.ring-primary]="openDropdown === 'submilestone'">\r
                            <span [class.text-outline]="!taskForm.get('submilestone_id')?.value">\r
                                {{ getSubMilestoneLabel() }}\r
                            </span>\r
                            <span\r
                                class="material-symbols-outlined text-outline text-[18px] transition-transform duration-200"\r
                                [class.rotate-180]="openDropdown === 'submilestone'">expand_more</span>\r
                        </button>\r
\r
                        @if(openDropdown === 'submilestone'){\r
                        <div\r
                            class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                            @for(sub of subMilestones; track sub.id){\r
                            <div (click)="selectSubMilestone(sub)"\r
                                class="px-4 py-2.5 text-sm cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                [class.text-primary]="taskForm.get('submilestone_id')?.value == sub.id"\r
                                [class.font-bold]="taskForm.get('submilestone_id')?.value == sub.id">\r
                                {{ sub.name }}\r
                            </div>\r
                            }\r
                            @if(subMilestones.length === 0){\r
                            <div class="px-4 py-2.5 text-sm text-outline">No sub milestones found</div>\r
                            }\r
                        </div>\r
                        }\r
                    </div>\r
\r
                    @if(taskForm.get('milestone_id')?.value && subMilestones.length === 0){\r
                    <p class="text-xs text-red-500 font-medium">\r
                        No Sub Milestone Found\r
                    </p>\r
                    }\r
                </div>\r
\r
            </div>\r
\r
            <div class="space-y-6 mt-2">\r
                <section class="space-y-4">\r
                    <div class="space-y-2">\r
                        <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Task\r
                            Title</label>\r
                        <input formControlName="title" placeholder="e.g., Structural Steel Erection" type="text"\r
                            class="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none" />\r
                    </div>\r
                    <div class="space-y-2">\r
                        <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Detailed\r
                            Instructions</label>\r
                        <textarea formControlName="description" rows="3" placeholder="Scope of work..."\r
                            class="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none resize-none"></textarea>\r
                    </div>\r
                </section>\r
\r
                <div class="space-y-6">\r
\r
                    <div class="grid grid-cols-2 gap-4">\r
                        <div class="space-y-2">\r
                            <label\r
                                class="block text-[10px] font-black uppercase tracking-widest text-outline">Priority</label>\r
\r
                            <div class="app-dropdown relative">\r
                                <button type="button" (click)="toggleDropdown('priority', $event)"\r
                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                                    [class.ring-2]="openDropdown === 'priority'"\r
                                    [class.ring-primary]="openDropdown === 'priority'">\r
                                    <span>{{ getPriorityLabel() }}</span>\r
                                    <span\r
                                        class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                        [class.rotate-180]="openDropdown === 'priority'">expand_more</span>\r
                                </button>\r
\r
                                @if(openDropdown === 'priority'){\r
                                <div\r
                                    class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                                    @for (p of priorities; track $index) {\r
                                    <div (click)="selectPriority(p)"\r
                                        class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                        [class.text-primary]="taskForm.get('priority')?.value === p.label"\r
                                        [class.font-bold]="taskForm.get('priority')?.value === p.label">\r
                                        {{ p.label }}\r
                                    </div>\r
                                    }\r
                                </div>\r
                                }\r
                            </div>\r
                        </div>\r
                        <div class="space-y-2">\r
                            <label\r
                                class="block text-[10px] font-black uppercase tracking-widest text-outline">Assignee</label>\r
\r
                            <div class="app-dropdown relative">\r
                                <button type="button" (click)="toggleDropdown('assignee', $event)"\r
                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                                    [class.ring-2]="openDropdown === 'assignee'"\r
                                    [class.ring-primary]="openDropdown === 'assignee'">\r
                                    <span [class.text-outline]="!taskForm.get('assigneeId')?.value">{{\r
                                        getAssigneeLabel() }}</span>\r
                                    <span\r
                                        class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                        [class.rotate-180]="openDropdown === 'assignee'">expand_more</span>\r
                                </button>\r
\r
                                @if(openDropdown === 'assignee'){\r
                                <div\r
                                    class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                                    @for(member of teamMembers; track $index){\r
                                    <div (click)="selectAssignee(member)"\r
                                        class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                        [class.text-primary]="isSelected(taskForm.get('assigneeId')?.value, member.id)"\r
                                        [class.font-bold]="isSelected(taskForm.get('assigneeId')?.value, member.id)">\r
                                        {{ member.firstname }} {{ member.lastname }}\r
                                    </div>\r
                                    }\r
                                    @if(teamMembers.length === 0){\r
                                    <div class="px-4 py-2.5 text-xs text-outline">No team members found</div>\r
                                    }\r
                                </div>\r
                                }\r
                            </div>\r
                        </div>\r
                    </div>\r
\r
                    <section class="space-y-4">\r
                        <div class="flex items-center justify-between">\r
                            <label\r
                                class="block text-[10px] font-black uppercase tracking-widest text-outline">Scheduling\r
                                Parameters</label>\r
                            <span\r
                                class="text-[8px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-widest">CPM\r
                                Enabled</span>\r
                        </div>\r
                        <div\r
                            class="grid grid-cols-2 gap-4 bg-surface-container-low/50 p-4 rounded-2xl ring-1 ring-outline-variant/10">\r
                            <div class="space-y-2">\r
                                <label class="block text-[9px] font-bold text-outline uppercase tracking-wider">Start\r
                                    Date</label>\r
                                <input type="date" formControlName="startDate"\r
                                    class="w-full bg-surface border-none rounded-lg p-2.5 text-xs font-bold outline-none ring-1 ring-outline-variant/10" />\r
                            </div>\r
                            <div class="space-y-2">\r
                                <label class="block text-[9px] font-bold text-outline uppercase tracking-wider">Duration\r
                                    (Days)</label>\r
                                <div class="flex items-center gap-2">\r
                                    <input type="number" formControlName="duration"\r
                                        class="flex-1 bg-surface border-none rounded-lg p-2.5 text-xs font-bold outline-none ring-1 ring-outline-variant/10" />\r
                                    <span class="text-[10px] font-black text-outline">DYS</span>\r
                                </div>\r
                            </div>\r
                        </div>\r
                    </section>\r
                </div>\r
\r
                <div class="space-y-2">\r
                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Vendor</label>\r
\r
                    <div class="app-dropdown relative">\r
                        <button type="button" (click)="toggleDropdown('vendor', $event)"\r
                            class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                            [class.ring-2]="openDropdown === 'vendor'" [class.ring-primary]="openDropdown === 'vendor'">\r
                            <span [class.text-outline]="!taskForm.get('vendorId')?.value">{{ getVendorLabel() }}</span>\r
                            <span\r
                                class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                [class.rotate-180]="openDropdown === 'vendor'">expand_more</span>\r
                        </button>\r
\r
                        @if(openDropdown === 'vendor'){\r
                        <div\r
                            class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                            @for(vendor of vendors; track $index){\r
                            <div (click)="selectVendor(vendor)"\r
                                class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                [class.text-primary]="taskForm.get('vendorId')?.value == vendor.id"\r
                                [class.font-bold]="taskForm.get('vendorId')?.value == vendor.id">\r
                                {{ vendor.name }}\r
                            </div>\r
                            }\r
                            @if(vendors.length === 0){\r
                            <div class="px-4 py-2.5 text-xs text-outline">No vendors found</div>\r
                            }\r
                        </div>\r
                        }\r
                    </div>\r
                </div>\r
\r
                <section class="space-y-4">\r
                    <label\r
                        class="block text-[10px] font-black uppercase tracking-widest text-outline">Attachments</label>\r
                    <div class="grid grid-cols-2 gap-3">\r
                        @for (file of attachments; track $index) {\r
                        <div\r
                            class="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/5 shadow-sm">\r
                            <span class="material-symbols-outlined text-primary text-sm">{{ file.icon }}</span>\r
                            <div class="flex-1 overflow-hidden">\r
                                <p class="text-[10px] font-bold text-on-surface truncate">{{ file.name }}</p>\r
                                <p class="text-[8px] text-outline font-bold">{{ file.size }}</p>\r
                            </div>\r
                        </div>\r
                        }\r
                        <label\r
                            class="border-2 border-dashed border-outline-variant/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors group col-span-2">\r
                            <input type="file" class="hidden" (change)="onFileSelected($event)" multiple />\r
                            <span\r
                                class="material-symbols-outlined text-outline group-hover:text-primary transition-colors">cloud_upload</span>\r
                            <span class="text-[10px] font-black text-outline uppercase tracking-widest mt-1">Upload\r
                                Documents</span>\r
                        </label>\r
                    </div>\r
                </section>\r
\r
                <section class="space-y-4">\r
                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Predecessor\r
                        Relationships</label>\r
                    <div class="bg-surface-container-low/50 rounded-2xl p-4 space-y-4 ring-1 ring-outline-variant/10">\r
                        @for (dep of dependencies; track $index) {\r
                        <div\r
                            class="flex items-center justify-between p-3 bg-surface rounded-xl shadow-sm border border-outline-variant/5">\r
                            <div class="flex items-center gap-3 overflow-hidden">\r
                                <span class="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{{\r
                                    dep.type }}</span>\r
                                <p class="text-xs font-bold text-on-surface truncate">{{ dep.predecessorTitle }}</p>\r
                            </div>\r
                            <div class="flex items-center gap-3 overflow-hidden">\r
                                <span class="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{{\r
                                    dep.lag }}</span>\r
                            </div>\r
                            <button (click)="removeDependency($index)" class="text-error/60 hover:text-error">\r
                                <span class="material-symbols-outlined text-sm">delete</span>\r
                            </button>\r
                        </div>\r
                        }\r
                        <div class="pt-2 border-t border-outline-variant/10 space-y-3">\r
\r
                            <div class="app-dropdown relative">\r
                                <button type="button" (click)="toggleDropdown('predecessor', $event)"\r
                                    class="w-full bg-surface border-none rounded-lg p-2.5 text-xs font-bold ring-1 ring-outline-variant/10 outline-none flex items-center justify-between text-left transition-all"\r
                                    [class.ring-2]="openDropdown === 'predecessor'"\r
                                    [class.ring-primary]="openDropdown === 'predecessor'">\r
                                    <span [class.text-outline]="!selectedPredecessorId">{{ getPredecessorLabel()\r
                                        }}</span>\r
                                    <span\r
                                        class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                        [class.rotate-180]="openDropdown === 'predecessor'">expand_more</span>\r
                                </button>\r
\r
                                @if(openDropdown === 'predecessor'){\r
                                <div\r
                                    class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                                    @for (t of allTasks; track t.id) {\r
                                    <div (click)="selectPredecessor(t)"\r
                                        class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                        [class.text-primary]="isSelected(selectedPredecessorId, t.id)"\r
                                        [class.font-bold]="isSelected(selectedPredecessorId, t.id)">\r
                                        {{ t.title }}\r
                                    </div>\r
                                    }\r
                                    @if(allTasks.length === 0){\r
                                    <div class="px-4 py-2.5 text-xs text-outline">No tasks found</div>\r
                                    }\r
                                </div>\r
                                }\r
                            </div>\r
\r
                            <div class="flex gap-2">\r
\r
                                <div class="app-dropdown relative flex-1">\r
                                    <button type="button" (click)="toggleDropdown('depType', $event)"\r
                                        class="w-full bg-surface border-none rounded-lg p-2.5 text-xs font-bold ring-1 ring-outline-variant/10 outline-none flex items-center justify-between text-left transition-all"\r
                                        [class.ring-2]="openDropdown === 'depType'"\r
                                        [class.ring-primary]="openDropdown === 'depType'">\r
                                        <span class="truncate">{{ getDepTypeLabel() }}</span>\r
                                        <span\r
                                            class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                            [class.rotate-180]="openDropdown === 'depType'">expand_more</span>\r
                                    </button>\r
\r
                                    @if(openDropdown === 'depType'){\r
                                    <div\r
                                        class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                                        @for (type of dependencyTypes; track type.id) {\r
                                        <div (click)="selectDepType(type)"\r
                                            class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                            [class.text-primary]="selectedDepType === type.id"\r
                                            [class.font-bold]="selectedDepType === type.id">\r
                                            {{ type.name }}\r
                                        </div>\r
                                        }\r
                                    </div>\r
                                    }\r
                                </div>\r
\r
                                <input type="number" [(ngModel)]="depLag" [ngModelOptions]="{standalone: true}"\r
                                    placeholder="Lag"\r
                                    class="w-20 bg-surface border-none rounded-lg p-2.5 text-xs font-bold ring-1 ring-outline-variant/10 outline-none" />\r
                                <button (click)="addDependency()"\r
                                    class="px-4 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors">\r
                                    <span class="material-symbols-outlined text-sm">link</span>\r
                                </button>\r
                            </div>\r
                            <p class="text-[9px] text-primary/60 font-medium px-1">\r
                                {{ getSelectedDepDesc() }}\r
                            </p>\r
                        </div>\r
                    </div>\r
                </section>\r
\r
                <section class="space-y-4">\r
                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Initial\r
                        Comment /\r
                        Handover Note</label>\r
                    <div class="relative">\r
                        <textarea formControlName="initialComment" rows="2"\r
                            placeholder="Tag team members or add notes..."\r
                            class="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none resize-none"></textarea>\r
                        <button class="absolute right-3 bottom-3 text-outline hover:text-primary">\r
                            <span class="material-symbols-outlined text-[20px]">alternate_email</span>\r
                        </button>\r
                    </div>\r
                </section>\r
            </div>\r
\r
            <section class="space-y-4">\r
                <div class="flex items-center justify-between">\r
                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">\r
                        Sub-tasks\r
                    </label>\r
\r
                    <button type="button" (click)="showSubTaskForm = !showSubTaskForm"\r
                        class="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 uppercase tracking-widest transition-colors">\r
\r
                        Add\r
                    </button>\r
                </div>\r
\r
                <div class="bg-surface-container-low/50 rounded-2xl p-3 space-y-3 ring-1 ring-outline-variant/10">\r
\r
                    @for (item of checklist; track $index) {\r
\r
                    <div class="p-4 bg-surface rounded-2xl border border-outline-variant/5 shadow-sm">\r
\r
                        <div class="flex items-start justify-between gap-4">\r
\r
                            <div class="flex-1 space-y-3">\r
\r
                                <div class="flex items-center gap-2">\r
\r
                                    <div>\r
                                        <p class="text-sm font-black text-on-surface">\r
                                            {{ item.title }}\r
                                        </p>\r
\r
                                        <p class="text-xs text-outline font-semibold">\r
                                            {{ item.itemName }}\r
                                        </p>\r
                                    </div>\r
\r
                                </div>\r
\r
                                <div class="flex flex-wrap gap-3">\r
                                    <div\r
                                        class="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide">\r
\r
                                        <span class="material-symbols-outlined text-[14px]">\r
                                            inventory_2\r
                                        </span>\r
\r
                                        Qty: {{ item.materialQty }}\r
                                    </div>\r
                                    @if (item.pendingRequest) {\r
                                    <div\r
                                        class="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide">\r
                                        <span class="material-symbols-outlined text-[14px]">pending</span>\r
                                        +{{ item.shortage }} Requested\r
                                    </div>\r
                                    }\r
\r
                                    <div\r
                                        class="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide">\r
\r
                                        <span class="material-symbols-outlined text-[14px]">\r
                                            construction\r
                                        </span>\r
\r
                                        {{ item.equipment_id }}\r
                                    </div>\r
\r
                                </div>\r
\r
                            </div>\r
\r
                            <button type="button" (click)="editSubTask($index)"\r
                                class="text-primary hover:text-primary/70 transition-colors">\r
\r
                                <span class="material-symbols-outlined text-[18px]">\r
                                    edit_square\r
                                </span>\r
\r
                            </button>\r
\r
                            <button type="button" (click)="removeSubTask($index)"\r
                                class="text-error/60 hover:text-error transition-colors">\r
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
                    }\r
\r
                    @if (showSubTaskForm) {\r
\r
                    <div\r
                        class="bg-surface rounded-2xl p-5 border border-outline-variant/10 space-y-5 animate-in slide-in-from-top-2 duration-200">\r
\r
                        <div class="space-y-2">\r
\r
                            <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
\r
                                Title\r
                            </label>\r
\r
                            <input type="text" [(ngModel)]="newSubTask.title" [ngModelOptions]="{standalone: true}"\r
                                placeholder="e.g. Concrete Work"\r
                                class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm outline-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30" />\r
                        </div>\r
\r
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    Material\r
                                </label>\r
\r
                                <div class="app-dropdown relative">\r
                                    <button type="button" (click)="toggleDropdown('material', $event)"\r
                                        class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                                        [class.ring-2]="openDropdown === 'material'"\r
                                        [class.ring-primary]="openDropdown === 'material'">\r
                                        <span [class.text-outline]="!newSubTask.materialId">{{ getMaterialLabel()\r
                                            }}</span>\r
                                        <span\r
                                            class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                            [class.rotate-180]="openDropdown === 'material'">expand_more</span>\r
                                    </button>\r
\r
                                    @if(openDropdown === 'material'){\r
                                    <div\r
                                        class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                                        @for(material of materials; track material.id) {\r
                                        <div (click)="selectMaterial(material)"\r
                                            class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                            [class.text-primary]="newSubTask.materialId == material.id"\r
                                            [class.font-bold]="newSubTask.materialId == material.id">\r
                                            {{ material.name }}\r
                                        </div>\r
                                        }\r
                                        @if(materials.length === 0){\r
                                        <div class="px-4 py-2.5 text-xs text-outline">No materials found</div>\r
                                        }\r
                                    </div>\r
                                    }\r
                                </div>\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    Material Quantity\r
                                </label>\r
\r
                                <input type="number" [(ngModel)]="newSubTask.materialQty"\r
                                    [ngModelOptions]="{standalone: true}" min="1"\r
                                    [max]="materials.find(m => m.id == newSubTask.materialId)?.stockUsed"\r
                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm outline-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30" />\r
\r
                                @if(newSubTask.materialId){\r
                                <p class="text-[10px] text-primary font-bold px-1">\r
                                    Available Stock:\r
                                    {{ materials.find(m => m.id == newSubTask.materialId)?.stockUsed }}\r
                                </p>\r
                                }\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    Equipment\r
                                </label>\r
\r
                                <div class="app-dropdown relative">\r
                                    <button type="button" (click)="toggleDropdown('equipment', $event)"\r
                                        class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                                        [class.ring-2]="openDropdown === 'equipment'"\r
                                        [class.ring-primary]="openDropdown === 'equipment'">\r
                                        <span [class.text-outline]="!newSubTask.equipment_id">{{ getEquipmentLabel()\r
                                            }}</span>\r
                                        <span\r
                                            class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                            [class.rotate-180]="openDropdown === 'equipment'">expand_more</span>\r
                                    </button>\r
\r
                                    @if(openDropdown === 'equipment'){\r
                                    <div\r
                                        class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                                        @for(equipment of equipmentList; track equipment.id) {\r
                                        <div (click)="selectEquipment(equipment)"\r
                                            class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                            [class.text-primary]="newSubTask.equipment_id == equipment.id"\r
                                            [class.font-bold]="newSubTask.equipment_id == equipment.id">\r
                                            {{ equipment.name }}\r
                                        </div>\r
                                        }\r
                                        @if(equipmentList.length === 0){\r
                                        <div class="px-4 py-2.5 text-xs text-outline">No equipment found</div>\r
                                        }\r
                                    </div>\r
                                    }\r
                                </div>\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    Equipment Quantity\r
                                </label>\r
\r
                                <input type="number" [(ngModel)]="newSubTask.equipmentQty"\r
                                    [ngModelOptions]="{standalone: true}" min="1"\r
                                    [max]="equipmentList.find(m => m.id == newSubTask.equipment_id)?.stockUsed"\r
                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm outline-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30" />\r
                                @if(newSubTask.equipment_id){\r
                                <p class="text-[10px] text-primary font-bold px-1">\r
                                    Available Stock:\r
                                    {{ equipmentList.find(m => m.id == newSubTask.equipment_id)?.stockUsed }}\r
                                </p>\r
                                }\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    Start Date\r
                                </label>\r
\r
                                <input type="date" [(ngModel)]="newSubTask.startDate"\r
                                    [ngModelOptions]="{ standalone: true }"\r
                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none">\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    End Date\r
                                </label>\r
\r
                                <input type="date" [(ngModel)]="newSubTask.endDate"\r
                                    [ngModelOptions]="{ standalone: true }"\r
                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none">\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    Labor\r
                                </label>\r
\r
                                <div class="app-dropdown relative">\r
                                    <button type="button" (click)="toggleDropdown('labor', $event)"\r
                                        class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none flex items-center justify-between text-left transition-all"\r
                                        [class.ring-2]="openDropdown === 'labor'"\r
                                        [class.ring-primary]="openDropdown === 'labor'">\r
                                        <span [class.text-outline]="!newSubTask.labor_id">{{ getLaborLabel() }}</span>\r
                                        <span\r
                                            class="material-symbols-outlined text-outline text-[16px] transition-transform duration-200"\r
                                            [class.rotate-180]="openDropdown === 'labor'">expand_more</span>\r
                                    </button>\r
\r
                                    @if(openDropdown === 'labor'){\r
                                    <div\r
                                        class="absolute z-20 mt-2 w-full bg-surface rounded-2xl shadow-lg ring-1 ring-outline-variant/10 max-h-60 overflow-y-auto">\r
                                        @for(labor of labors; track labor.id) {\r
                                        <div (click)="selectLabor(labor)"\r
                                            class="px-4 py-2.5 text-xs cursor-pointer hover:bg-surface-container-low transition-colors"\r
                                            [class.text-primary]="newSubTask.labor_id == labor.id"\r
                                            [class.font-bold]="newSubTask.labor_id == labor.id">\r
                                            {{ labor.skill }}\r
                                        </div>\r
                                        }\r
                                        @if(labors.length === 0){\r
                                        <div class="px-4 py-2.5 text-xs text-outline">Select a vendor first</div>\r
                                        }\r
                                    </div>\r
                                    }\r
                                </div>\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
                                    No. Of Labor\r
                                </label>\r
\r
                                <input type="number" [(ngModel)]="newSubTask.no_of_labor"\r
                                    [ngModelOptions]="{standalone: true}" min="1"\r
                                    [max]="labors.find(m => m.id == newSubTask.labor_id)?.labor_count"\r
                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm outline-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30" />\r
\r
                                @if(newSubTask.labor_id){\r
                                <p class="text-[10px] text-primary font-bold px-1">\r
                                    Available Labor:\r
                                    {{ labors.find(m => m.id == newSubTask.labor_id)?.labor_count }}\r
                                </p>\r
                                }\r
                            </div>\r
                        </div>\r
\r
                        <div class="flex justify-end gap-3 pt-2">\r
\r
                            <button type="button" (click)="showSubTaskForm = false"\r
                                class="px-4 py-2 text-xs font-bold text-outline hover:text-on-surface transition-colors">\r
\r
                                Cancel\r
                            </button>\r
\r
                            <button type="button" (click)="addSubTask()"\r
                                class="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">\r
\r
                                Save\r
                            </button>\r
\r
                        </div>\r
\r
                    </div>\r
\r
                    }\r
                </div>\r
            </section>\r
\r
        </div>\r
\r
    </div>\r
\r
    <app-common-dialog [open]="showStockDialog && !!stockDialogData" title="Insufficient Stock"\r
        subtitle="Inventory allocation & shortage request" icon="inventory_2" [showCloseButton]="true"\r
        [showFooter]="false" [closeOnBackdrop]="false" maxWidth="max-w-md" (closed)="cancelStockRequest()">\r
\r
        @if (stockDialogData) {\r
\r
        <div class="p-6 space-y-5">\r
\r
            <div class="rounded-2xl bg-slate-100 p-3 border border-slate-300">\r
                <p class="text-xs text-slate-600 font-semibold uppercase">\r
                    {{ stockDialogData.itemType === 'material' ? 'Material' : 'Equipment' }}\r
                </p>\r
                <p class="text-lg font-black text-slate-800 mt-1">\r
                    {{ stockDialogData.selectedItem?.name }}\r
                </p>\r
            </div>\r
\r
            <div class="grid grid-cols-3 gap-3">\r
\r
                <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center">\r
                    <p class="text-[10px] font-black uppercase text-slate-500">Requested</p>\r
                    <h4 class="text-2xl font-black text-slate-800 mt-1">\r
                        {{ stockDialogData.itemType === 'material' ? newSubTask.materialQty : newSubTask.equipmentQty }}\r
                    </h4>\r
                </div>\r
\r
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">\r
                    <p class="text-[10px] font-black uppercase text-emerald-600">Available</p>\r
                    <h4 class="text-2xl font-black text-emerald-700 mt-1">\r
                        {{ stockDialogData.available }}\r
                    </h4>\r
                </div>\r
\r
                <div class="rounded-2xl bg-orange-50 border border-orange-200 p-4 text-center">\r
                    <p class="text-[10px] font-black uppercase text-orange-600">Shortage</p>\r
                    <h4 class="text-2xl font-black text-orange-700 mt-1">\r
                        {{ stockDialogData.shortage }}\r
                    </h4>\r
                </div>\r
            </div>\r
\r
            <div class="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-5">\r
\r
                <div class="flex items-center justify-between">\r
\r
                    <div class="flex flex-col items-center">\r
\r
                        <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">\r
\r
                            <span class="material-symbols-outlined text-emerald-600">\r
                                check_circle\r
                            </span>\r
\r
                        </div>\r
\r
                        <p class="mt-2 text-xs font-black text-emerald-700">\r
                            Allocate\r
                        </p>\r
\r
                        <p class="text-xl font-black text-emerald-700">\r
                            {{ stockDialogData.available }}\r
                        </p>\r
\r
                    </div>\r
\r
                    <span class="material-symbols-outlined text-outline">\r
                        east\r
                    </span>\r
\r
                    <div class="flex flex-col items-center">\r
\r
                        <div class="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">\r
\r
                            <span class="material-symbols-outlined text-orange-600">\r
                                pending\r
                            </span>\r
\r
                        </div>\r
\r
                        <p class="mt-2 text-xs font-black text-orange-700">\r
                            Request\r
                        </p>\r
\r
                        <p class="text-xl font-black text-orange-700">\r
                            {{ stockDialogData.shortage }}\r
                        </p>\r
\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
\r
            <div class="rounded-2xl bg-blue-50 border border-blue-200 p-4 flex gap-3">\r
\r
                <span class="material-symbols-outlined text-blue-600">\r
                    info\r
                </span>\r
\r
                <div>\r
\r
                    <p class="text-xs font-black text-blue-700">\r
                        Automatic Processing\r
                    </p>\r
\r
                    <p class="text-[11px] text-blue-600 mt-1 leading-relaxed">\r
\r
                        {{ stockDialogData.available }} units will be allocated immediately.\r
\r
                        Remaining {{ stockDialogData.shortage }} units will create a stock\r
                        request for manager approval.\r
\r
                    </p>\r
\r
                </div>\r
\r
            </div>\r
\r
            <div class="flex gap-3 pt-2">\r
\r
                <button (click)="cancelStockRequest()"\r
                    class="flex-1 h-12 rounded-2xl border border-slate-300 font-black">\r
\r
                    Cancel\r
\r
                </button>\r
\r
                <button (click)="confirmStockRequest()"\r
                    class="flex-1 h-12 rounded-2xl bg-primary text-white font-black">\r
\r
                    Confirm & Request\r
\r
                </button>\r
\r
            </div>\r
\r
        </div>\r
\r
        }\r
\r
    </app-common-dialog>\r
</app-common-dialog>`, styles: ["/* src/app/modules/projects/widgets/add-task/add-task.scss */\n:host {\n  display: block;\n  z-index: 9999;\n}\n/*# sourceMappingURL=add-task.css.map */\n"] }]
  }], null, { projectId: [{
    type: Input
  }], milestoneId: [{
    type: Input
  }], initialStatus: [{
    type: Input
  }], close: [{
    type: Output
  }], save: [{
    type: Output
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddTask, { className: "AddTask", filePath: "app/modules/projects/widgets/add-task/add-task.ts", lineNumber: 17 });
})();

// src/app/shared/pipes/subtask-progress.pipe.ts
var SubtaskProgressPipe = class _SubtaskProgressPipe {
  transform(subtasks) {
    if (!subtasks || subtasks.length === 0)
      return 0;
    const completed = subtasks.filter((s) => s.completed).length;
    return Math.round(completed / subtasks.length * 100);
  }
  static \u0275fac = function SubtaskProgressPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SubtaskProgressPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "subtaskProgress", type: _SubtaskProgressPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SubtaskProgressPipe, [{
    type: Pipe,
    args: [{
      name: "subtaskProgress",
      standalone: true
    }]
  }], null, null);
})();

// src/app/modules/projects/widgets/task-management/task-management.ts
var _c03 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
function TaskManagement_Conditional_8_Conditional_11_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function TaskManagement_Conditional_8_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function TaskManagement_Conditional_8_Conditional_11_For_2_Template_button_click_0_listener() {
      const m_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectMilestone(m_r4.id));
    });
    \u0275\u0275elementStart(1, "div", 12);
    \u0275\u0275element(2, "span");
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, TaskManagement_Conditional_8_Conditional_11_For_2_Conditional_5_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap("w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-100 " + (m_r4.id === ctx_r1.selectedMilestoneId ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("w-1.5 h-1.5 rounded-full shrink-0 " + (m_r4.id === ctx_r1.selectedMilestoneId ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r4.id === ctx_r1.selectedMilestoneId ? 5 : -1);
  }
}
function TaskManagement_Conditional_8_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, TaskManagement_Conditional_8_Conditional_11_For_2_Template, 6, 6, "button", 17, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.milestones);
  }
}
function TaskManagement_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "span", 10);
    \u0275\u0275text(2, "Milestone / Phase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 11);
    \u0275\u0275listener("click", function TaskManagement_Conditional_8_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleMilestoneDropdown());
    });
    \u0275\u0275elementStart(4, "div", 12)(5, "span", 13);
    \u0275\u0275text(6, "flag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 15);
    \u0275\u0275text(10, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, TaskManagement_Conditional_8_Conditional_11_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classMap("flex items-center justify-between gap-4 min-w-[240px] px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 transition-all duration-150 cursor-pointer " + (ctx_r1.milestoneDropdownOpen ? "border-primary ring-4 ring-primary/10 shadow-md" : "border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getSelectedMilestoneName());
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.milestoneDropdownOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.milestoneDropdownOpen ? 11 : -1);
  }
}
function TaskManagement_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, " No milestones found for this project ");
    \u0275\u0275elementEnd();
  }
}
function TaskManagement_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 18)(2, "span", 19);
    \u0275\u0275text(3, "task");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3", 20);
    \u0275\u0275text(5, "Select a Milestone to View Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 21);
    \u0275\u0275text(7, "Tasks are organized by milestones. Choose a phase from the dropdown above to load the kanban board.");
    \u0275\u0275elementEnd()();
  }
}
function TaskManagement_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 28);
    \u0275\u0275element(2, "div", 29);
    \u0275\u0275elementStart(3, "p", 30);
    \u0275\u0275text(4, "Synchronizing Board...");
    \u0275\u0275elementEnd()()();
  }
}
function TaskManagement_Conditional_11_For_4_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function TaskManagement_Conditional_11_For_4_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const column_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAddTaskModal(column_r8.title));
    });
    \u0275\u0275elementStart(1, "span", 40);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd()();
  }
}
function TaskManagement_Conditional_11_For_4_For_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 52);
  }
}
function TaskManagement_Conditional_11_For_4_For_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "task");
    \u0275\u0275elementEnd();
  }
}
function TaskManagement_Conditional_11_For_4_For_12_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "chat_bubble");
    \u0275\u0275elementEnd();
  }
}
function TaskManagement_Conditional_11_For_4_For_12_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r10.description);
  }
}
function TaskManagement_Conditional_11_For_4_For_12_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 53)(2, "span", 54);
    \u0275\u0275text(3, "Subtasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 55);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "subtaskProgress");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 56);
    \u0275\u0275element(8, "div", 57);
    \u0275\u0275pipe(9, "subtaskProgress");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(6, 3, task_r10.sub_tasks || \u0275\u0275pureFunction0(7, _c03)), "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", \u0275\u0275pipeBind1(9, 5, task_r10.sub_tasks || \u0275\u0275pureFunction0(8, _c03)), "%");
  }
}
function TaskManagement_Conditional_11_For_4_For_12_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 51);
  }
  if (rf & 2) {
    const assignee_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("src", ctx_r1.getAvatarUrl(assignee_r11.avatar), \u0275\u0275sanitizeUrl)("title", assignee_r11.firstname);
  }
}
function TaskManagement_Conditional_11_For_4_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275listener("click", function TaskManagement_Conditional_11_For_4_For_12_Template_div_click_0_listener() {
      const task_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openTaskDetail(task_r10));
    });
    \u0275\u0275template(1, TaskManagement_Conditional_11_For_4_For_12_div_1_Template, 1, 0, "div", 42);
    \u0275\u0275elementStart(2, "div", 43)(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 3);
    \u0275\u0275conditionalCreate(6, TaskManagement_Conditional_11_For_4_For_12_Conditional_6_Template, 2, 0, "span", 44);
    \u0275\u0275conditionalCreate(7, TaskManagement_Conditional_11_For_4_For_12_Conditional_7_Template, 2, 0, "span", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h4");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, TaskManagement_Conditional_11_For_4_For_12_Conditional_10_Template, 2, 1, "p", 45);
    \u0275\u0275conditionalCreate(11, TaskManagement_Conditional_11_For_4_For_12_Conditional_11_Template, 10, 9, "div", 46);
    \u0275\u0275elementStart(12, "div", 47)(13, "div", 48)(14, "span", 49);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 50);
    \u0275\u0275repeaterCreate(19, TaskManagement_Conditional_11_For_4_For_12_For_20_Template, 1, 2, "img", 51, _forTrack03);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const task_r10 = ctx.$implicit;
    \u0275\u0275classMap("glass-card p-5 rounded-2xl shadow-sm border border-white/40 group hover:shadow-xl hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden " + (task_r10.status === "Completed" ? "opacity-75 grayscale-[0.5]" : ""));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter " + task_r10.priorityClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r10.priority);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((task_r10.sub_tasks == null ? null : task_r10.sub_tasks.length) ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((task_r10.comments == null ? null : task_r10.comments.length) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap("font-bold text-slate-900 mb-2 leading-snug " + (task_r10.status === "Completed" ? "line-through text-slate-400" : ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r10.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(task_r10.description ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((task_r10.sub_tasks == null ? null : task_r10.sub_tasks.length) ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-amber-500", task_r10.status === "In Progress")("text-blue-600", task_r10.status === "Review")("text-green-600", task_r10.status === "Completed")("text-slate-400", task_r10.status === "To Do");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", task_r10.status === "In Progress" ? "update" : task_r10.status === "Review" ? "visibility" : task_r10.status === "Completed" ? "check_circle" : "calendar_today", " ");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r10.due_date ? \u0275\u0275pipeBind2(17, 22, task_r10.due_date, "MMM dd, yyyy") : task_r10.status, " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(task_r10.assignees);
  }
}
function TaskManagement_Conditional_11_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 31)(2, "div", 32);
    \u0275\u0275element(3, "div");
    \u0275\u0275elementStart(4, "h3", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, TaskManagement_Conditional_11_For_4_button_8_Template, 3, 0, "button", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 36)(10, "div", 37);
    \u0275\u0275listener("cdkDropListDropped", function TaskManagement_Conditional_11_For_4_Template_div_cdkDropListDropped_10_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.drop($event));
    });
    \u0275\u0275repeaterCreate(11, TaskManagement_Conditional_11_For_4_For_12_Template, 21, 25, "div", 38, _forTrack03);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const column_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275classMap("w-2.5 h-2.5 rounded-full " + column_r8.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(column_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(column_r8.count);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", column_r8.title == "To Do");
    \u0275\u0275advance();
    \u0275\u0275property("id", column_r8.id + "-wrapper");
    \u0275\u0275advance();
    \u0275\u0275property("id", column_r8.id)("cdkDropListData", column_r8.tasks);
    \u0275\u0275advance();
    \u0275\u0275repeater(column_r8.tasks);
  }
}
function TaskManagement_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275conditionalCreate(1, TaskManagement_Conditional_11_Conditional_1_Template, 5, 0, "div", 23);
    \u0275\u0275elementStart(2, "div", 24);
    \u0275\u0275repeaterCreate(3, TaskManagement_Conditional_11_For_4_Template, 13, 8, "div", 25, _forTrack03);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 26);
    \u0275\u0275listener("click", function TaskManagement_Conditional_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAddTaskModal());
    });
    \u0275\u0275elementStart(6, "span", 27);
    \u0275\u0275text(7, "add");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loading ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.columns);
  }
}
function TaskManagement_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-task-detail", 58);
    \u0275\u0275listener("close", function TaskManagement_Conditional_12_Template_app_task_detail_close_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTaskDetail());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("task", ctx_r1.selectedTask);
  }
}
function TaskManagement_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-add-task", 59);
    \u0275\u0275listener("close", function TaskManagement_Conditional_13_Template_app_add_task_close_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddTaskModal = false);
    })("save", function TaskManagement_Conditional_13_Template_app_add_task_save_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addNewTask($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("projectId", ctx_r1.projectId)("milestoneId", ctx_r1.selectedMilestoneId)("initialStatus", ctx_r1.targetStep);
  }
}
var TaskManagement = class _TaskManagement {
  projectService;
  toastr;
  elementRef;
  projectId = "";
  selectedMember = "All Members";
  team_members = [];
  milestones = [];
  loading = false;
  selectedTask = null;
  showAddTaskModal = false;
  targetStep = "To Do";
  newComment = "";
  isUploading = false;
  activeTaskTab = "Subtasks";
  selectedMilestoneId = null;
  allTasks = [];
  milestoneDropdownOpen = false;
  columns = [
    { id: "todo", title: "To Do", color: "bg-slate-400", count: 0, tasks: [] },
    { id: "inprogress", title: "In Progress", color: "bg-amber-500", count: 0, tasks: [] },
    { id: "review", title: "Review", color: "bg-blue-600", count: 0, tasks: [] },
    { id: "completed", title: "Completed", color: "bg-green-500", count: 0, tasks: [] }
  ];
  environment = environment;
  constructor(projectService, toastr, elementRef) {
    this.projectService = projectService;
    this.toastr = toastr;
    this.elementRef = elementRef;
  }
  ngOnInit() {
    if (this.projectId) {
      this.fetchTasks();
    }
  }
  ngOnChanges(changes) {
    let projectChanged = false;
    if (changes["projectId"] && !changes["projectId"].isFirstChange()) {
      projectChanged = true;
      this.selectedMilestoneId = null;
      this.allTasks = [];
      this.mapTasksToColumns([]);
    }
    if (changes["milestones"]) {
      const currentMilestones = this.milestones || [];
      if (currentMilestones.length > 0) {
        const stillValid = currentMilestones.some((m) => m.id === this.selectedMilestoneId);
        if (!this.selectedMilestoneId || !stillValid) {
          this.selectedMilestoneId = currentMilestones[0].id;
        }
      } else {
        this.selectedMilestoneId = null;
      }
    }
    if (projectChanged && this.projectId) {
      this.fetchTasks();
    } else if (this.selectedMilestoneId) {
      this.filterTasks();
    }
  }
  toggleMilestoneDropdown() {
    this.milestoneDropdownOpen = !this.milestoneDropdownOpen;
  }
  getSelectedMilestoneName() {
    const found = (this.milestones || []).find((m) => m.id === this.selectedMilestoneId);
    return found ? found.name : "Select Milestone";
  }
  selectMilestone(milestoneId) {
    this.selectedMilestoneId = Number(milestoneId);
    this.milestoneDropdownOpen = false;
    this.filterTasks();
  }
  onDocumentClick(event) {
    if (this.milestoneDropdownOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.milestoneDropdownOpen = false;
    }
  }
  getAvatarUrl(avatar) {
    if (!avatar) {
      return "assets/default-avatar.png";
    }
    if (avatar.startsWith("http")) {
      return avatar;
    }
    return `${this.environment.serverUrl}${avatar}`;
  }
  fetchTasks() {
    this.loading = true;
    this.projectService.getProjectTasks(this.projectId).subscribe({
      next: (res) => {
        this.allTasks = res.data;
        this.filterTasks();
        this.loading = false;
      },
      error: () => {
        this.toastr.error("Failed to load project tasks");
        this.loading = false;
      }
    });
  }
  filterTasks() {
    if (!this.selectedMilestoneId)
      return;
    const filtered = this.allTasks.filter((t) => t.milestone_id != null && Number(t.milestone_id) === Number(this.selectedMilestoneId));
    this.mapTasksToColumns(filtered);
  }
  mapTasksToColumns(tasks) {
    this.columns.forEach((col) => col.tasks = []);
    tasks.forEach((task) => {
      const mappedTask = this.transformTask(task);
      const column = this.columns.find((c) => c.title === mappedTask.status);
      if (column) {
        column.tasks.push(mappedTask);
      }
    });
    this.updateCounts();
  }
  transformTask(t) {
    return __spreadProps(__spreadValues({}, t), {
      priorityClass: this.getPriorityClass(t.priority)
    });
  }
  getPriorityClass(p) {
    switch (p) {
      case "High Priority":
        return "bg-red-100 text-red-700";
      case "Medium Priority":
        return "bg-blue-100 text-blue-700";
      case "Low Priority":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-500";
    }
  }
  updateCounts() {
    this.columns.forEach((col) => col.count = col.tasks.length);
  }
  openAddTaskModal(columnTitle = "To Do") {
    this.targetStep = columnTitle;
    this.showAddTaskModal = true;
  }
  addNewTask(task) {
    const newTask = this.transformTask(task);
    this.allTasks.push(newTask);
    const column = this.columns.find((c) => c.title === newTask.status);
    if (column) {
      column.tasks.unshift(newTask);
      this.updateCounts();
    }
    this.showAddTaskModal = false;
    this.toastr.success("Task created successfully");
  }
  drop(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const containerId = event.container.id;
      let newStatus;
      switch (containerId) {
        case "todo":
          newStatus = "To Do";
          break;
        case "inprogress":
          newStatus = "In Progress";
          break;
        case "review":
          newStatus = "Review";
          break;
        case "completed":
          newStatus = "Completed";
          break;
        default:
          newStatus = "To Do";
      }
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.projectService.updateTask(task.id, { status: newStatus }).subscribe({
        next: () => {
          task.status = newStatus;
          task.priorityClass = this.getPriorityClass(task.priority);
          this.updateCounts();
        },
        error: () => {
          this.toastr.error("Failed to update task status");
          transferArrayItem(event.container.data, event.previousContainer.data, event.currentIndex, event.previousIndex);
          this.updateCounts();
        }
      });
    }
  }
  openTaskDetail(task) {
    this.selectedTask = task;
    this.activeTaskTab = "Subtasks";
  }
  closeTaskDetail() {
    this.selectedTask = null;
  }
  static \u0275fac = function TaskManagement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaskManagement)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(ElementRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskManagement, selectors: [["app-task-management"]], hostBindings: function TaskManagement_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function TaskManagement_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { projectId: "projectId", team_members: "team_members", milestones: "milestones" }, features: [\u0275\u0275NgOnChangesFeature], decls: 14, vars: 4, consts: [[1, "col-span-12", "lg:col-span-12", "bg-surface-container-lowest", "rounded-xl", "p-2", "shadow-[0_12_32px_rgba(15,23,42,0.06)]", "relative", "overflow-hidden", "group", "border", "border-outline-variant/10"], [1, "mb-10", "mt-2", "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-4", "p-2"], [1, "text-[10px]", "font-extrabold", "uppercase", "tracking-[0.2em]", "text-primary", "mb-2", "block"], [1, "flex", "items-center", "gap-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "relative", "flex", "flex-col"], [1, "text-xs", "font-bold", "text-red-500", "uppercase", "tracking-widest"], [1, "flex", "flex-col", "items-center", "justify-center", "min-h-[400px]", "border-2", "border-dashed", "border-slate-200", "rounded-3xl", "bg-slate-50/50"], [3, "task"], [3, "projectId", "milestoneId", "initialStatus"], [1, "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400", "mb-1.5", "block"], ["type", "button", 3, "click"], [1, "flex", "items-center", "gap-2.5", "min-w-0"], [1, "material-symbols-outlined", "text-lg", "text-primary", "shrink-0"], [1, "truncate"], [1, "material-symbols-outlined", "text-xl", "text-slate-400", "transition-transform", "duration-200", "shrink-0"], [1, "absolute", "top-full", "mt-2", "left-0", "right-0", "z-20", "bg-white", "dark:bg-slate-800", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "shadow-[0_16px_40px_rgba(15,23,42,0.14)]", "overflow-hidden", "py-1.5", "min-w-[240px]", "max-h-72", "overflow-y-auto"], ["type", "button", 3, "class"], [1, "w-16", "h-16", "bg-blue-100", "text-blue-600", "rounded-2xl", "flex", "items-center", "justify-center", "mb-4"], [1, "material-symbols-outlined", "text-3xl"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-900", "mb-2"], [1, "text-sm", "font-bold", "text-slate-500", "uppercase", "tracking-widest", "max-w-sm", "text-center"], [1, "relative"], [1, "absolute", "inset-0", "z-10", "bg-white/50", "backdrop-blur-[1px]", "flex", "items-center", "justify-center", "rounded-3xl"], ["cdkDropListGroup", "", 1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-6"], [1, "flex", "flex-col", "gap-4"], [1, "fixed", "bottom-8", "right-8", "w-14", "h-14", "rounded-2xl", "bg-linear-to-br", "from-primary", "to-primary-container", "text-white", "shadow-2xl", "shadow-primary/40", "flex", "items-center", "justify-center", "active:scale-90", "transition-all", "z-50", "group", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-3xl", "transition-transform", "group-hover:rotate-90"], [1, "flex", "flex-col", "items-center"], [1, "w-12", "h-12", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "mt-4", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest"], [1, "flex", "items-center", "justify-between", "px-2"], [1, "flex", "items-center", "gap-3"], [1, "text-sm", "font-black", "uppercase", "tracking-widest", "text-slate-500"], [1, "px-2", "py-0.5", "rounded-full", "bg-slate-100", "text-[10px]", "font-black", "text-slate-500"], ["class", "text-slate-400 hover:text-blue-600 transition-colors cursor-pointer", 3, "click", 4, "ngIf"], [1, "kanban-column-scroll", 3, "id"], ["cdkDropList", "", 1, "flex", "flex-col", "gap-4", "min-h-[200px]", 3, "cdkDropListDropped", "id", "cdkDropListData"], ["cdkDrag", "", 3, "class"], [1, "text-slate-400", "hover:text-blue-600", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined"], ["cdkDrag", "", 3, "click"], ["class", "cdk-drag-placeholder", 4, "cdkDragPlaceholder"], [1, "flex", "justify-between", "items-start", "mb-4"], [1, "material-symbols-outlined", "text-slate-400", "text-xs"], [1, "text-xs", "text-slate-500", "mb-6", "line-clamp-2"], [1, "mb-4"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2", "text-[10px]", "font-bold"], [1, "material-symbols-outlined", "text-sm"], [1, "flex", "-space-x-2"], [1, "w-6", "h-6", "rounded-lg", "ring-2", "ring-white", "object-cover", 3, "src", "title"], [1, "cdk-drag-placeholder"], [1, "flex", "justify-between", "items-center", "mb-1"], [1, "text-[10px]", "font-bold", "text-slate-400", "uppercase"], [1, "text-[10px]", "font-bold", "text-slate-500"], [1, "w-full", "bg-slate-100", "h-1", "rounded-full"], [1, "bg-primary", "h-1", "rounded-full", "transition-all"], [3, "close", "task"], [3, "close", "save", "projectId", "milestoneId", "initialStatus"]], template: function TaskManagement_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "span", 2);
      \u0275\u0275text(4, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "h2", 4);
      \u0275\u0275text(7, "Task Management");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(8, TaskManagement_Conditional_8_Template, 12, 6, "div", 5)(9, TaskManagement_Conditional_9_Template, 2, 0, "div", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, TaskManagement_Conditional_10_Template, 8, 0, "div", 7)(11, TaskManagement_Conditional_11_Template, 8, 1);
      \u0275\u0275conditionalCreate(12, TaskManagement_Conditional_12_Template, 1, 1, "app-task-detail", 8);
      \u0275\u0275conditionalCreate(13, TaskManagement_Conditional_13_Template, 1, 3, "app-add-task", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.milestones && ctx.milestones.length > 0 ? 8 : !ctx.loading ? 9 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.selectedMilestoneId ? 10 : 11);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedTask ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAddTaskModal ? 13 : -1);
    }
  }, dependencies: [
    DragDropModule,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    CdkDragPlaceholder,
    CommonModule,
    NgIf,
    FormsModule,
    ToastrModule,
    TaskDetail,
    AddTask,
    DatePipe,
    SubtaskProgressPipe
  ], styles: ["\n.cdk-drag-preview[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  border-radius: 20px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  opacity: 0.9;\n  cursor: grabbing;\n}\n.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n.cdk-drop-list-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%] {\n  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n.glass-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n}\n.kanban-column-scroll[_ngcontent-%COMP%] {\n  max-height: 430px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-right: 4px;\n  border-radius: 16px;\n}\n.kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n}\n.kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 999px;\n  transition: background 0.2s;\n}\n.kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n.kanban-column-scroll[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n}\n.kanban-column-scroll[_ngcontent-%COMP%] {\n  -webkit-mask-image:\n    linear-gradient(\n      to bottom,\n      black 0%,\n      black 82%,\n      transparent 100%);\n  mask-image:\n    linear-gradient(\n      to bottom,\n      black 0%,\n      black 82%,\n      transparent 100%);\n}\n.kanban-column-scroll[_ngcontent-%COMP%]:hover, \n.kanban-column-scroll.scrolled-to-bottom[_ngcontent-%COMP%] {\n  -webkit-mask-image: none;\n  mask-image: none;\n}\n.scroll-hint[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_bob 1.8s ease-in-out infinite;\n  opacity: 0.7;\n}\n@keyframes _ngcontent-%COMP%_bob {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(3px);\n  }\n}\n.dark[_nghost-%COMP%]   .glass-card[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .glass-card[_ngcontent-%COMP%] {\n  background: rgba(30, 41, 59, 0.75);\n  border-color: rgba(255, 255, 255, 0.08);\n}\n.dark[_nghost-%COMP%]   .kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, .dark   [_nghost-%COMP%]   .kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #475569;\n}\n.dark[_nghost-%COMP%]   .kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, .dark   [_nghost-%COMP%]   .kanban-column-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #64748b;\n}\n.dark[_nghost-%COMP%]   .kanban-column-scroll[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .kanban-column-scroll[_ngcontent-%COMP%] {\n  scrollbar-color: #475569 transparent;\n}\n/*# sourceMappingURL=task-management.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaskManagement, [{
    type: Component,
    args: [{ selector: "app-task-management", standalone: true, imports: [
      DragDropModule,
      CommonModule,
      FormsModule,
      ToastrModule,
      TaskDetail,
      AddTask,
      SubtaskProgressPipe
    ], template: `<div\r
    class="col-span-12 lg:col-span-12 bg-surface-container-lowest rounded-xl p-2 shadow-[0_12_32px_rgba(15,23,42,0.06)] relative overflow-hidden group border border-outline-variant/10">\r
\r
    <div class="mb-10 mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4 p-2">\r
        <div>\r
            <span class="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-2 block">Project</span>\r
            <div class="flex items-center gap-1">\r
                <h2 class="text-3xl font-black text-slate-800 dark:text-white">Task Management</h2>\r
            </div>\r
        </div>\r
\r
        @if (milestones && milestones.length > 0) {\r
\r
        <div class="relative flex flex-col">\r
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 block">Milestone /\r
                Phase</span>\r
\r
            <button type="button" (click)="toggleMilestoneDropdown()"\r
                [class]="'flex items-center justify-between gap-4 min-w-[240px] px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 transition-all duration-150 cursor-pointer ' +\r
                    (milestoneDropdownOpen\r
                        ? 'border-primary ring-4 ring-primary/10 shadow-md'\r
                        : 'border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md')">\r
                <div class="flex items-center gap-2.5 min-w-0">\r
                    <span class="material-symbols-outlined text-lg text-primary shrink-0">flag</span>\r
                    <span class="truncate">{{ getSelectedMilestoneName() }}</span>\r
                </div>\r
                <span\r
                    class="material-symbols-outlined text-xl text-slate-400 transition-transform duration-200 shrink-0"\r
                    [class.rotate-180]="milestoneDropdownOpen">\r
                    expand_more\r
                </span>\r
            </button>\r
\r
            @if (milestoneDropdownOpen) {\r
            <div\r
                class="absolute top-full mt-2 left-0 right-0 z-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.14)] overflow-hidden py-1.5 min-w-[240px] max-h-72 overflow-y-auto">\r
                @for (m of milestones; track m.id) {\r
                <button type="button" (click)="selectMilestone(m.id)" [class]="'w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-100 ' +\r
                        (m.id === selectedMilestoneId\r
                            ? 'bg-primary/10 text-primary'\r
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50')">\r
                    <div class="flex items-center gap-2.5 min-w-0">\r
                        <span\r
                            [class]="'w-1.5 h-1.5 rounded-full shrink-0 ' + (m.id === selectedMilestoneId ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600')">\r
                        </span>\r
                        <span class="truncate">{{ m.name }}</span>\r
                    </div>\r
                    @if (m.id === selectedMilestoneId) {\r
                    <span class="material-symbols-outlined text-lg text-primary shrink-0">check</span>\r
                    }\r
                </button>\r
                }\r
            </div>\r
            }\r
        </div>\r
        } @else if (!loading) {\r
        <div class="text-xs font-bold text-red-500 uppercase tracking-widest">\r
            No milestones found for this project\r
        </div>\r
        }\r
    </div>\r
\r
    @if (!selectedMilestoneId) {\r
    <div\r
        class="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">\r
        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">\r
            <span class="material-symbols-outlined text-3xl">task</span>\r
        </div>\r
        <h3 class="text-lg font-black tracking-tight text-slate-900 mb-2">Select a Milestone to View Tasks</h3>\r
        <p class="text-sm font-bold text-slate-500 uppercase tracking-widest max-w-sm text-center">Tasks are organized\r
            by\r
            milestones. Choose a phase from the dropdown above to load the kanban board.</p>\r
    </div>\r
    }\r
    @else {\r
    <div class="relative">\r
        @if (loading) {\r
        <div class="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">\r
            <div class="flex flex-col items-center">\r
                <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>\r
                <p class="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing Board...</p>\r
            </div>\r
        </div>\r
        }\r
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6" cdkDropListGroup>\r
            @for (column of columns; track column.id) {\r
            <div class="flex flex-col gap-4">\r
\r
                <div class="flex items-center justify-between px-2">\r
                    <div class="flex items-center gap-3">\r
                        <div [class]="'w-2.5 h-2.5 rounded-full ' + column.color"></div>\r
                        <h3 class="text-sm font-black uppercase tracking-widest text-slate-500">{{ column.title }}</h3>\r
                        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-500">{{\r
                            column.count }}</span>\r
                    </div>\r
                    <button *ngIf="column.title == 'To Do'" (click)="openAddTaskModal(column.title)"\r
                        class="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">\r
                        <span class="material-symbols-outlined">add</span>\r
                    </button>\r
                </div>\r
\r
                <div class="kanban-column-scroll" [id]="column.id + '-wrapper'">\r
\r
                    <div cdkDropList [id]="column.id" [cdkDropListData]="column.tasks"\r
                        (cdkDropListDropped)="drop($event)" class="flex flex-col gap-4 min-h-[200px]">\r
\r
                        @for (task of column.tasks; track task.id) {\r
                        <div cdkDrag (click)="openTaskDetail(task)"\r
                            [class]="'glass-card p-5 rounded-2xl shadow-sm border border-white/40 group hover:shadow-xl hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden ' + (task.status === 'Completed' ? 'opacity-75 grayscale-[0.5]' : '')">\r
\r
                            <div class="cdk-drag-placeholder" *cdkDragPlaceholder></div>\r
\r
                            <div class="flex justify-between items-start mb-4">\r
                                <span\r
                                    [class]="'px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ' + task.priorityClass">{{\r
                                    task.priority }}</span>\r
                                <div class="flex items-center gap-1">\r
                                    @if (task.sub_tasks?.length) {\r
                                    <span class="material-symbols-outlined text-slate-400 text-xs">task</span>\r
                                    }\r
                                    @if (task.comments?.length) {\r
                                    <span class="material-symbols-outlined text-slate-400 text-xs">chat_bubble</span>\r
                                    }\r
                                </div>\r
                            </div>\r
\r
                            <h4\r
                                [class]="'font-bold text-slate-900 mb-2 leading-snug ' + (task.status === 'Completed' ? 'line-through text-slate-400' : '')">\r
                                {{ task.title }}</h4>\r
\r
                            @if (task.description) {\r
                            <p class="text-xs text-slate-500 mb-6 line-clamp-2">{{ task.description }}</p>\r
                            }\r
                            @if (task.sub_tasks?.length) {\r
                            <div class="mb-4">\r
                                <div class="flex justify-between items-center mb-1">\r
                                    <span class="text-[10px] font-bold text-slate-400 uppercase">Subtasks</span>\r
                                    <span class="text-[10px] font-bold text-slate-500">{{ ((task.sub_tasks || []) |\r
                                        subtaskProgress) }}%</span>\r
                                </div>\r
                                <div class="w-full bg-slate-100 h-1 rounded-full">\r
                                    <div class="bg-primary h-1 rounded-full transition-all"\r
                                        [style.width.%]="((task.sub_tasks || []) | subtaskProgress)"></div>\r
                                </div>\r
                            </div>\r
                            }\r
\r
                            <div class="flex items-center justify-between">\r
                                <div class="flex items-center gap-2 text-[10px] font-bold"\r
                                    [class.text-amber-500]="task.status === 'In Progress'"\r
                                    [class.text-blue-600]="task.status === 'Review'"\r
                                    [class.text-green-600]="task.status === 'Completed'"\r
                                    [class.text-slate-400]="task.status === 'To Do'">\r
                                    <span class="material-symbols-outlined text-sm">\r
                                        {{ task.status === 'In Progress' ? 'update' :\r
                                        (task.status === 'Review' ? 'visibility' :\r
                                        (task.status === 'Completed' ? 'check_circle' : 'calendar_today')) }}\r
                                    </span>\r
                                    {{ task.due_date ? (task.due_date | date: 'MMM dd, yyyy') : task.status }}\r
                                </div>\r
\r
                                <div class="flex -space-x-2">\r
                                    @for (assignee of task.assignees; track assignee.id) {\r
                                    <img class="w-6 h-6 rounded-lg ring-2 ring-white object-cover"\r
                                        [src]="getAvatarUrl(assignee.avatar)" [title]="assignee.firstname" />\r
                                    }\r
                                </div>\r
                            </div>\r
                        </div>\r
                        }\r
\r
                    </div>\r
                </div>\r
\r
            </div>\r
            }\r
        </div>\r
    </div>\r
\r
    <button (click)="openAddTaskModal()"\r
        class="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary-container text-white shadow-2xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-all z-50 group cursor-pointer">\r
        <span class="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">add</span>\r
    </button>\r
    }\r
\r
    @if (selectedTask) {\r
    <app-task-detail [task]="selectedTask" (close)="closeTaskDetail()"></app-task-detail>\r
    }\r
\r
    @if (showAddTaskModal) {\r
    <app-add-task [projectId]="projectId" [milestoneId]="selectedMilestoneId" [initialStatus]="targetStep"\r
        (close)="showAddTaskModal = false" (save)="addNewTask($event)"></app-add-task>\r
    }\r
\r
</div>`, styles: ["/* src/app/modules/projects/widgets/task-management/task-management.scss */\n.cdk-drag-preview {\n  box-sizing: border-box;\n  border-radius: 20px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  opacity: 0.9;\n  cursor: grabbing;\n}\n.cdk-drag-placeholder {\n  opacity: 0;\n}\n.cdk-drag-animating {\n  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n.cdk-drop-list-dragging .cdk-drag {\n  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n.glass-card {\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n}\n.kanban-column-scroll {\n  max-height: 430px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-right: 4px;\n  border-radius: 16px;\n}\n.kanban-column-scroll::-webkit-scrollbar {\n  width: 5px;\n}\n.kanban-column-scroll::-webkit-scrollbar-track {\n  background: transparent;\n}\n.kanban-column-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 999px;\n  transition: background 0.2s;\n}\n.kanban-column-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n.kanban-column-scroll {\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n}\n.kanban-column-scroll {\n  -webkit-mask-image:\n    linear-gradient(\n      to bottom,\n      black 0%,\n      black 82%,\n      transparent 100%);\n  mask-image:\n    linear-gradient(\n      to bottom,\n      black 0%,\n      black 82%,\n      transparent 100%);\n}\n.kanban-column-scroll:hover,\n.kanban-column-scroll.scrolled-to-bottom {\n  -webkit-mask-image: none;\n  mask-image: none;\n}\n.scroll-hint {\n  animation: bob 1.8s ease-in-out infinite;\n  opacity: 0.7;\n}\n@keyframes bob {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(3px);\n  }\n}\n:host-context(.dark) .glass-card {\n  background: rgba(30, 41, 59, 0.75);\n  border-color: rgba(255, 255, 255, 0.08);\n}\n:host-context(.dark) .kanban-column-scroll::-webkit-scrollbar-thumb {\n  background: #475569;\n}\n:host-context(.dark) .kanban-column-scroll::-webkit-scrollbar-thumb:hover {\n  background: #64748b;\n}\n:host-context(.dark) .kanban-column-scroll {\n  scrollbar-color: #475569 transparent;\n}\n/*# sourceMappingURL=task-management.css.map */\n"] }]
  }], () => [{ type: ProjectService }, { type: ToastrService }, { type: ElementRef }], { projectId: [{
    type: Input
  }], team_members: [{
    type: Input
  }], milestones: [{
    type: Input
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskManagement, { className: "TaskManagement", filePath: "app/modules/projects/widgets/task-management/task-management.ts", lineNumber: 36 });
})();

export {
  DragDropModule,
  TaskDetail,
  TaskManagement
};
//# sourceMappingURL=chunk-EXICJZOE.js.map
