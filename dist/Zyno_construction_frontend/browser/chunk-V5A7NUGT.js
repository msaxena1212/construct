import {
  ProjectService
} from "./chunk-VBCWJQVV.js";
import {
  CommonDialogComponent
} from "./chunk-WS53KIOQ.js";
import {
  CdkScrollableModule,
  ScrollDispatcher,
  ViewportRuler
} from "./chunk-E3SOVO5U.js";
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
} from "./chunk-NKQ2I3NH.js";
import {
  ToastrModule,
  ToastrService
} from "./chunk-YLGXRPVA.js";
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
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgSelectMultipleOption
} from "./chunk-WFU7JF4C.js";
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
  Injectable,
  InjectionToken,
  Injector,
  Input,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
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
  ɵɵtwoWayProperty
} from "./chunk-F27QM527.js";

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
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.predecessor_id;
function TaskDetail_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_9_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.task.title, $event) || (ctx_r1.task.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "textarea", 49);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_9_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.task.description, $event) || (ctx_r1.task.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.task.title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.task.description);
  }
}
function TaskDetail_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 51);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.task.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.task.description || "No description provided for this task.", " ");
  }
}
function TaskDetail_For_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function TaskDetail_For_19_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 55);
    \u0275\u0275listener("ngModelChange", function TaskDetail_For_19_Conditional_3_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubTaskChange(item_r4, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "button", 56);
    \u0275\u0275listener("click", function TaskDetail_For_19_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openDeleteSubTaskDialog(item_r4 == null ? null : item_r4.id));
    });
    \u0275\u0275elementStart(2, "span", 38);
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngModel", item_r4.title);
  }
}
function TaskDetail_For_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(item_r4.completed ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-300 font-semibold");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.title);
  }
}
function TaskDetail_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 52);
    \u0275\u0275listener("click", function TaskDetail_For_19_Template_div_click_1_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleChecklist(item_r4));
    });
    \u0275\u0275conditionalCreate(2, TaskDetail_For_19_Conditional_2_Template, 2, 0, "span", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, TaskDetail_For_19_Conditional_3_Template, 4, 1)(4, TaskDetail_For_19_Conditional_4_Template, 2, 3, "span", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(item_r4.completed ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-600 group-hover:border-blue-500");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.completed ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditing ? 3 : 4);
  }
}
function TaskDetail_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 58);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_20_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newSubTaskTitle, $event) || (ctx_r1.newSubTaskTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function TaskDetail_Conditional_20_Template_input_keyup_enter_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addSubTask());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 60);
    \u0275\u0275listener("click", function TaskDetail_Conditional_20_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addSubTask());
    });
    \u0275\u0275text(5, "Add");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newSubTaskTitle);
  }
}
function TaskDetail_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 61)(2, "span", 62);
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 63)(5, "p", 64);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 30);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "a", 65);
    \u0275\u0275text(11, "download");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r7 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", file_r7.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", file_r7.size, " \u2022 ", \u0275\u0275pipeBind1(9, 4, file_r7.createdAt));
    \u0275\u0275advance(2);
    \u0275\u0275property("href", file_r7.url, \u0275\u0275sanitizeUrl);
  }
}
function TaskDetail_For_40_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function TaskDetail_For_40_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const dep_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeDependency(dep_r9));
    });
    \u0275\u0275elementStart(1, "span", 38);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function TaskDetail_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 66)(2, "div", 67);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "p", 43);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 68);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(9, TaskDetail_For_40_Conditional_9_Template, 3, 0, "button", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dep_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", dep_r9.type, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getTaskTitle(dep_r9.predecessor_id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lag: ", dep_r9.lag, " days");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditing ? 9 : -1);
  }
}
function TaskDetail_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 71);
    \u0275\u0275text(2, "link_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 72);
    \u0275\u0275text(4, "No predecessors defined.");
    \u0275\u0275elementEnd()();
  }
}
function TaskDetail_Conditional_42_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    \u0275\u0275property("value", t_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r11.title);
  }
}
function TaskDetail_Conditional_42_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r12 = ctx.$implicit;
    \u0275\u0275property("value", type_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r12.name);
  }
}
function TaskDetail_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "p", 73);
    \u0275\u0275text(2, "Add Predecessor ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 74)(4, "div", 75)(5, "select", 76);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_42_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedPredecessorId, $event) || (ctx_r1.selectedPredecessorId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 77);
    \u0275\u0275text(7, "Select Task");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, TaskDetail_Conditional_42_For_9_Template, 2, 2, "option", 78, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 79)(11, "select", 76);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_42_Template_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedDepType, $event) || (ctx_r1.selectedDepType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(12, TaskDetail_Conditional_42_For_13_Template, 2, 2, "option", 78, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 80);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 81)(17, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Conditional_42_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.depLag, $event) || (ctx_r1.depLag = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 83)(19, "button", 84);
    \u0275\u0275listener("click", function TaskDetail_Conditional_42_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addDependency());
    });
    \u0275\u0275elementStart(20, "span", 14);
    \u0275\u0275text(21, "add");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedPredecessorId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.allTasks);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedDepType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.dependencyTypes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getSelectedDepDesc());
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.depLag);
  }
}
function TaskDetail_Conditional_50_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r14 = ctx.$implicit;
    \u0275\u0275property("value", member_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", member_r14.firstname, " ", member_r14.lastname);
  }
}
function TaskDetail_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 85);
    \u0275\u0275listener("change", function TaskDetail_Conditional_50_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAssigneeSelect($event));
    });
    \u0275\u0275elementStart(1, "option", 86);
    \u0275\u0275text(2, "Select Assignee");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, TaskDetail_Conditional_50_For_4_Template, 2, 3, "option", 78, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.teamMembers);
  }
}
function TaskDetail_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 87);
    \u0275\u0275text(3, "Primary Contact ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.task.assignees == null ? null : ctx_r1.task.assignees[0] == null ? null : ctx_r1.task.assignees[0].firstname, " ", (ctx_r1.task.assignees == null ? null : ctx_r1.task.assignees[0] == null ? null : ctx_r1.task.assignees[0].lastname) || "Unassigned", " ");
  }
}
function TaskDetail_For_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "div", 88);
    \u0275\u0275elementStart(2, "p", 89)(3, "span", 90);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 91);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const act_r15 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((act_r15.user == null ? null : act_r15.user.firstname) || "System");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", act_r15.detail, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 3, act_r15.createdAt, "shortTime"));
  }
}
var TaskDetail = class _TaskDetail {
  task;
  close = new EventEmitter();
  projectService = inject(ProjectService);
  toastr = inject(ToastrService);
  allTasks = [];
  isEditing = false;
  newComment = "";
  newSubTaskTitle = "";
  showUploadModal = false;
  showDeleteSubTaskModal = false;
  subTaskToDelete = null;
  isUploading = false;
  selectedPredecessorId = "";
  selectedDepType = "FS";
  depLag = 0;
  dependencyTypes = [
    { id: "FS", name: "Finish-to-Start (FS)", desc: "Predecessor must finish before Successor can start" },
    { id: "SS", name: "Start-to-Start (SS)", desc: "Predecessor must start before Successor can start" },
    { id: "FF", name: "Finish-to-Finish (FF)", desc: "Predecessor must finish before Successor can finish" },
    { id: "SF", name: "Start-to-Finish (SF)", desc: "Predecessor must start before Successor can finish" }
  ];
  teamMembers = [];
  loggedInUser = { name: "James Wilson" };
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
  fetchTeamMembers() {
    this.projectService.getProjectById(this.task.project_id.toString()).subscribe({
      next: (res) => {
        this.teamMembers = res.data.team_members || [];
      }
    });
  }
  toggleEditMode() {
    if (this.isEditing) {
      this.saveTaskUpdates();
    }
    this.isEditing = !this.isEditing;
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
    this.close.emit();
  }
  get checklistProgress() {
    if (!this.task?.sub_tasks || this.task.sub_tasks.length === 0)
      return 0;
    const completed = this.task.sub_tasks.filter((i) => i.completed).length;
    return Math.round(completed / this.task.sub_tasks.length * 100);
  }
  toggleChecklist(item) {
    const newStatus = !item.completed;
    this.projectService.updateSubTask(item?.id, { completed: newStatus }).subscribe({
      next: () => {
        item.completed = newStatus;
        this.task.progress = this.checklistProgress;
      }
    });
  }
  addSubTask() {
    if (!this.newSubTaskTitle.trim())
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
    if (item.title !== newTitle) {
      this.projectService.updateSubTask(item?.id, { title: newTitle }).subscribe({
        next: () => item.title = newTitle,
        error: () => this.toastr.error("Error updating sub-task")
      });
    }
  }
  postComment() {
    if (!this.newComment.trim())
      return;
    this.projectService.addTaskComment(this.task.id, this.newComment).subscribe({
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
      }
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
  static \u0275fac = function TaskDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaskDetail)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskDetail, selectors: [["app-task-detail"]], inputs: { task: "task" }, outputs: { close: "close" }, decls: 88, vars: 30, consts: [["size", "xl", "height", "h-[85vh]", "title", "Task Details", "icon", "assignment", "panelClass", "rounded-2xl border border-slate-200/50 dark:border-slate-800/50 transition-all", "contentClass", "min-h-0 flex-1 overflow-hidden", 3, "closed", "open", "subtitle", "badge", "badgeClass", "showCloseButton"], ["dialog-header-actions", "", 1, "flex", "items-center", "gap-2", "px-4", "py-2", "rounded-xl", "bg-slate-50", "dark:bg-slate-800", "text-blue-600", "dark:text-blue-400", "font-semibold", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "h-full", "overflow-y-auto", "grid", "grid-cols-1", "md:grid-cols-12", "min-h-0"], [1, "md:col-span-8", "p-10", "space-y-10", "border-r", "border-slate-100", "dark:border-slate-800"], [1, "space-y-4"], [1, "flex", "justify-between", "items-end", "mb-2"], [1, "text-xs", "font-black", "uppercase", "tracking-[0.15em]", "text-slate-400"], [1, "text-xs", "font-bold", "text-blue-600", "dark:text-blue-400"], [1, "bg-slate-50/50", "dark:bg-slate-800/30", "rounded-2xl", "p-2", "space-y-1", "border", "border-slate-100", "dark:border-slate-800"], [1, "flex", "items-center", "gap-3", "p-3", "bg-white", "dark:bg-slate-900", "rounded-xl", "shadow-sm", "border", "border-slate-100/50", "dark:border-slate-800/50", "group", "transition-colors", "hover:bg-slate-50", "relative", "pr-10"], [1, "flex", "items-center", "gap-3", "p-2", "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-dashed", "border-slate-300", "dark:border-slate-700", "mt-2"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-xs", "font-bold", "text-blue-600", "hover:text-blue-700", "flex", "items-center", "gap-1", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [1, "flex", "items-center", "gap-4", "p-4", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "hover:border-blue-50/50", "hover:bg-blue-50/50", "dark:hover:bg-blue-900/10", "transition-all", "cursor-pointer", "group", "shadow-sm", "bg-white", "dark:bg-slate-900/50"], [1, "bg-slate-50/50", "dark:bg-slate-800/30", "rounded-2xl", "p-4", "space-y-3", "border", "border-slate-100", "dark:border-slate-800"], [1, "flex", "items-center", "justify-between", "p-3", "bg-white", "dark:bg-slate-900", "rounded-xl", "shadow-sm", "border", "border-slate-100/50", "dark:border-slate-800/50", "group"], [1, "text-center", "py-6"], [1, "pt-4", "border-t", "border-slate-100", "dark:border-slate-800", "space-y-3"], [1, "md:col-span-4", "bg-slate-50/50", "dark:bg-slate-800/20", "p-8", "space-y-8", "flex", "flex-col", "h-full", "overflow-y-auto", "min-h-0"], [1, "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "flex", "items-center", "gap-4", "p-4", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-sm", "border", "border-slate-100", "dark:border-slate-800", "relative"], [1, "w-12", "h-12", "rounded-xl", "object-cover", "ring-2", "ring-slate-100", "dark:ring-slate-800", 3, "src", "alt"], [1, "flex-1"], [1, "w-full", "bg-slate-50", "border", "border-slate-200", "rounded-lg", "p-2", "text-sm", "font-bold", "text-slate-900", "outline-none", "focus:ring-2", "focus:ring-blue-500"], [1, "flex", "items-center", "gap-4", "p-4", "bg-white/50", "dark:bg-slate-900/50", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "w-10", "h-10", "rounded-xl", "object-cover", 3, "src", "alt"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50"], [1, "text-[10px]", "text-slate-500", "font-bold", "uppercase", "tracking-widest", "mt-0.5"], [1, "space-y-6", "flex-1", "flex", "flex-col", "min-h-0"], [1, "flex-1", "overflow-y-auto", "pr-2", "min-h-0"], [1, "space-y-8", "relative", "before:absolute", "before:left-[7px]", "before:top-2", "before:bottom-2", "before:w-[2px]", "before:bg-slate-100", "dark:before:bg-slate-800"], [1, "relative", "pl-8", "animate-in", "fade-in", "duration-500"], [1, "pt-4", "mt-auto", "space-y-3"], ["type", "text", "placeholder", "Type a comment...", 1, "w-full", "bg-white", "border", "border-slate-200", "rounded-xl", "px-4", "py-3", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", "shadow-sm", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "w-full", "flex", "items-center", "justify-center", "gap-2", "px-4", "py-3", "bg-slate-900", "dark:bg-slate-800", "text-white", "font-bold", "rounded-xl", "hover:bg-slate-800", "transition-all", "shadow-md", "active:scale-95", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], ["size", "sm", "title", "Upload Document", "subtitle", "Select a file to attach to this task.", "icon", "cloud_upload", "cancelLabel", "Cancel", "primaryLabel", "Done", "panelClass", "rounded-2xl transform animate-in zoom-in-95 duration-200", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "m-6", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-800", "rounded-xl", "p-8", "flex", "flex-col", "items-center", "justify-center", "text-center", "cursor-pointer", "hover:bg-slate-50", "transition-colors", "group"], ["type", "file", 1, "hidden", 3, "change"], [1, "material-symbols-outlined", "text-[32px]", "text-blue-500", "mb-2", "group-hover:scale-110", "transition-transform"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300"], [1, "text-[10px]", "text-slate-400", "mt-1"], ["size", "sm", "variant", "danger", "title", "Delete Sub-task?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "px-6", "py-5"], [1, "text-sm", "font-medium", "text-slate-600", "dark:text-slate-300"], ["type", "text", "placeholder", "Task Title", 1, "w-full", "text-4xl", "font-extrabold", "text-slate-900", "dark:text-slate-50", "tracking-tighter", "mb-4", "bg-slate-50", "border", "border-slate-200", "rounded-xl", "p-2", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["placeholder", "Task Description", 1, "w-full", "text-slate-500", "dark:text-slate-400", "text-lg", "leading-relaxed", "font-light", "bg-slate-50", "border", "border-slate-200", "rounded-xl", "p-2", "outline-none", "focus:ring-2", "focus:ring-blue-500", "min-h-[100px]", 3, "ngModelChange", "ngModel"], [1, "text-4xl", "font-extrabold", "text-slate-900", "dark:text-slate-50", "tracking-tighter", "mb-4"], [1, "text-slate-500", "dark:text-slate-400", "text-lg", "leading-relaxed", "font-light"], [1, "cursor-pointer", "w-5", "h-5", "rounded-md", "border-2", "flex", "items-center", "justify-center", "transition-all", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-white", "text-[16px]"], [1, "text-sm", "transition-all", 3, "class"], ["type", "text", 1, "text-sm", "bg-transparent", "border-none", "outline-none", "focus:ring-0", "flex-1", "font-semibold", "text-slate-700", "dark:text-slate-300", "pointer-events-auto", 3, "ngModelChange", "ngModel"], [1, "absolute", "right-3", "text-red-500", "hover:text-red-700", "p-1", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "text-sm", "transition-all"], [1, "material-symbols-outlined", "text-slate-400"], ["type", "text", "placeholder", "Add new sub-task...", 1, "text-sm", "bg-transparent", "border-none", "outline-none", "focus:ring-0", "flex-1", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "text-xs", "font-bold", "bg-slate-100", "px-3", "py-1", "rounded-lg", "text-slate-700", "hover:bg-slate-200", "cursor-pointer", 3, "click"], [1, "bg-blue-100", "text-blue-600", "w-12", "h-12", "rounded-xl", "flex", "items-center", "justify-center", "shadow-inner", "shrink-0"], [1, "material-symbols-outlined", "text-[28px]"], [1, "flex-1", "overflow-hidden"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "truncate"], ["target", "_blank", 1, "material-symbols-outlined", "text-slate-300", "group-hover:text-blue-500", "transition-colors", 3, "href"], [1, "flex", "items-center", "gap-4"], [1, "bg-blue-100", "dark:bg-blue-900/30", "text-blue-600", "dark:text-blue-400", "px-2", "py-1", "rounded", "text-[10px]", "font-black", "uppercase", "tracking-widest"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-wider"], [1, "text-red-400", "hover:text-red-600", "transition-colors", "cursor-pointer"], [1, "text-red-400", "hover:text-red-600", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-slate-300", "text-3xl", "mb-2"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "grid", "grid-cols-12", "gap-3"], [1, "col-span-6"], [1, "w-full", "bg-white", "border", "border-slate-200", "rounded-lg", "p-2", "text-xs", "font-bold", "outline-none", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], [1, "col-span-3"], [1, "text-[9px]", "text-blue-600", "font-medium", "mt-1"], [1, "col-span-2"], ["type", "number", "placeholder", "Lag", 1, "w-full", "bg-white", "border", "border-slate-200", "rounded-lg", "p-2", "text-xs", "font-bold", "outline-none", 3, "ngModelChange", "ngModel"], [1, "col-span-1"], [1, "w-full", "h-full", "bg-blue-600", "text-white", "rounded-lg", "flex", "items-center", "justify-center", "cursor-pointer", "hover:bg-blue-700", 3, "click"], [1, "w-full", "bg-slate-50", "border", "border-slate-200", "rounded-lg", "p-2", "text-sm", "font-bold", "text-slate-900", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "change"], ["disabled", "", "selected", ""], [1, "text-[11px]", "text-slate-500", "font-semibold", "uppercase", "tracking-wider", "mt-0.5"], [1, "bg-blue-600", "absolute", "left-0", "top-1.5", "w-4", "h-4", "rounded-full", "ring-4", "ring-white", "dark:ring-slate-900", "z-10"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "leading-relaxed"], [1, "font-bold", "text-slate-900", "dark:text-slate-50"], [1, "text-[10px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "mt-1"]], template: function TaskDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-common-dialog", 0);
      \u0275\u0275pipe(1, "date");
      \u0275\u0275listener("closed", function TaskDetail_Template_app_common_dialog_closed_0_listener() {
        return ctx.onClose();
      });
      \u0275\u0275elementStart(2, "button", 1);
      \u0275\u0275listener("click", function TaskDetail_Template_button_click_2_listener() {
        return ctx.toggleEditMode();
      });
      \u0275\u0275elementStart(3, "span", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "div", 4)(8, "section");
      \u0275\u0275conditionalCreate(9, TaskDetail_Conditional_9_Template, 2, 2)(10, TaskDetail_Conditional_10_Template, 4, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "section", 5)(12, "div", 6)(13, "h3", 7);
      \u0275\u0275text(14, "Sub-tasks Checklist ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 8);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275repeaterCreate(18, TaskDetail_For_19_Template, 5, 4, "div", 10, _forTrack0);
      \u0275\u0275conditionalCreate(20, TaskDetail_Conditional_20_Template, 6, 1, "div", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "section")(22, "div", 12)(23, "h3", 7);
      \u0275\u0275text(24, "File Attachments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 13);
      \u0275\u0275listener("click", function TaskDetail_Template_button_click_25_listener() {
        return ctx.openUploadModal();
      });
      \u0275\u0275elementStart(26, "span", 14);
      \u0275\u0275text(27, "upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(28, " Upload Document ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 15);
      \u0275\u0275repeaterCreate(30, TaskDetail_For_31_Template, 12, 6, "div", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "section", 5)(33, "div", 6)(34, "h3", 7);
      \u0275\u0275text(35, "Relationships (Predecessors)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "span", 8);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 17);
      \u0275\u0275repeaterCreate(39, TaskDetail_For_40_Template, 10, 4, "div", 18, _forTrack1);
      \u0275\u0275conditionalCreate(41, TaskDetail_Conditional_41_Template, 5, 0, "div", 19);
      \u0275\u0275conditionalCreate(42, TaskDetail_Conditional_42_Template, 22, 4, "div", 20);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 21)(44, "div", 5)(45, "h2", 22);
      \u0275\u0275text(46, "Assignee");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 23);
      \u0275\u0275element(48, "img", 24);
      \u0275\u0275elementStart(49, "div", 25);
      \u0275\u0275conditionalCreate(50, TaskDetail_Conditional_50_Template, 5, 0, "select", 26)(51, TaskDetail_Conditional_51_Template, 4, 2);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "div", 5)(53, "h2", 22);
      \u0275\u0275text(54, "Created By");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 27);
      \u0275\u0275element(56, "img", 28);
      \u0275\u0275elementStart(57, "div")(58, "p", 29);
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "p", 30);
      \u0275\u0275text(61, "Task Owner ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(62, "div", 31)(63, "h3", 22);
      \u0275\u0275text(64, "Activity Timeline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "div", 32)(66, "div", 33);
      \u0275\u0275repeaterCreate(67, TaskDetail_For_68_Template, 9, 6, "div", 34, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(69, "div", 35)(70, "input", 36);
      \u0275\u0275twoWayListener("ngModelChange", function TaskDetail_Template_input_ngModelChange_70_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newComment, $event) || (ctx.newComment = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function TaskDetail_Template_input_keyup_enter_70_listener() {
        return ctx.postComment();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "button", 37);
      \u0275\u0275listener("click", function TaskDetail_Template_button_click_71_listener() {
        return ctx.postComment();
      });
      \u0275\u0275elementStart(72, "span", 38);
      \u0275\u0275text(73, "send");
      \u0275\u0275elementEnd();
      \u0275\u0275text(74, " Post Comment ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(75, "app-common-dialog", 39);
      \u0275\u0275listener("closed", function TaskDetail_Template_app_common_dialog_closed_75_listener() {
        return ctx.showUploadModal = false;
      })("primary", function TaskDetail_Template_app_common_dialog_primary_75_listener() {
        return ctx.showUploadModal = false;
      });
      \u0275\u0275elementStart(76, "label", 40)(77, "input", 41);
      \u0275\u0275listener("change", function TaskDetail_Template_input_change_77_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "span", 42);
      \u0275\u0275text(79, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "p", 43);
      \u0275\u0275text(81, "Click to Browse Files");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "p", 44);
      \u0275\u0275text(83, "Select any document or image");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(84, "app-common-dialog", 45);
      \u0275\u0275listener("closed", function TaskDetail_Template_app_common_dialog_closed_84_listener() {
        return ctx.closeDeleteSubTaskDialog();
      })("primary", function TaskDetail_Template_app_common_dialog_primary_84_listener() {
        return ctx.confirmDeleteSubTask();
      });
      \u0275\u0275elementStart(85, "div", 46)(86, "p", 47);
      \u0275\u0275text(87, " Are you sure you want to delete this sub-task from the task checklist? ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("open", true)("subtitle", "Due: " + (\u0275\u0275pipeBind2(1, 27, ctx.task.due_date, "MMM dd, yyyy") || "No date set"))("badge", ctx.task.priority)("badgeClass", ctx.task.priorityClass || "")("showCloseButton", true);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.isEditing ? "save" : "edit");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Save Task" : "Edit Task", " ");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isEditing ? 9 : 10);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("", ctx.checklistProgress, "% Complete");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.task.sub_tasks);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isEditing ? 20 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.task.attachments);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("", (ctx.task.dependencies == null ? null : ctx.task.dependencies.length) || 0, " Dependencies");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.task.dependencies);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((ctx.task.dependencies == null ? null : ctx.task.dependencies.length) === 0 ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditing ? 42 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("src", (ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].avatar) || "https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&h=256&auto=format&fit=crop", \u0275\u0275sanitizeUrl)("alt", (ctx.task.assignees == null ? null : ctx.task.assignees[0] == null ? null : ctx.task.assignees[0].firstname) || "Assignee");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isEditing ? 50 : 51);
      \u0275\u0275advance(6);
      \u0275\u0275property("src", (ctx.task.creator == null ? null : ctx.task.creator.avatar) || "assets/default-avatar.png", \u0275\u0275sanitizeUrl)("alt", (ctx.task.creator == null ? null : ctx.task.creator.firstname) || "Creator");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", (ctx.task.creator == null ? null : ctx.task.creator.firstname) || "System", " ", (ctx.task.creator == null ? null : ctx.task.creator.lastname) || "");
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.task.activities);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.newComment);
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showUploadModal)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(9);
      \u0275\u0275property("open", ctx.showDeleteSubTaskModal)("showCloseButton", true)("showFooter", true);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    CommonDialogComponent,
    DatePipe
  ], styles: ['\n.material-symbols-outlined[_ngcontent-%COMP%] {\n  font-variation-settings:\n    "FILL" 0,\n    "wght" 400,\n    "GRAD" 0,\n    "opsz" 24;\n  vertical-align: middle;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out forwards;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #e2e8f0;\n  border-radius: 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #cbd5e1;\n}\n.dark[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::webkit-scrollbar-thumb {\n  background: #1e293b;\n}\n/*# sourceMappingURL=task-detail.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaskDetail, [{
    type: Component,
    args: [{ selector: "app-task-detail", standalone: true, imports: [
      CommonModule,
      FormsModule,
      CommonDialogComponent
    ], template: `<!-- Task Detail Modal Overlay -->\r
<app-common-dialog\r
    [open]="true"\r
    size="xl"\r
    height="h-[85vh]"\r
    title="Task Details"\r
    [subtitle]="'Due: ' + ((task.due_date | date:'MMM dd, yyyy') || 'No date set')"\r
    [badge]="task.priority"\r
    [badgeClass]="task.priorityClass || ''"\r
    icon="assignment"\r
    [showCloseButton]="true"\r
    panelClass="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 transition-all"\r
    contentClass="min-h-0 flex-1 overflow-hidden"\r
    (closed)="onClose()"\r
>\r
        <button dialog-header-actions (click)="toggleEditMode()"\r
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">\r
            <span class="material-symbols-outlined text-[20px]">{{ isEditing ? 'save' : 'edit' }}</span>\r
            {{ isEditing ? 'Save Task' : 'Edit Task' }}\r
        </button>\r
\r
        <!-- Modal Content Scroll Area -->\r
        <div class="h-full overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-0">\r
            <!-- Main Info Column -->\r
            <div class="md:col-span-8 p-10 space-y-10 border-r border-slate-100 dark:border-slate-800">\r
                <!-- Title Section -->\r
                <section>\r
                    @if (isEditing) {\r
                    <input type="text" [(ngModel)]="task.title"\r
                        class="w-full text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tighter mb-4 bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-500"\r
                        placeholder="Task Title">\r
                    <textarea [(ngModel)]="task.description"\r
                        class="w-full text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-light bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"\r
                        placeholder="Task Description"></textarea>\r
                    } @else {\r
                    <h2 class="text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tighter mb-4">{{\r
                        task.title }}</h2>\r
                    <p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-light">\r
                        {{ task.description || 'No description provided for this task.' }}\r
                    </p>\r
                    }\r
                </section>\r
\r
                <!-- Sub-tasks Checklist -->\r
                <section class="space-y-4">\r
                    <div class="flex justify-between items-end mb-2">\r
                        <h3 class="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Sub-tasks Checklist\r
                        </h3>\r
                        <span class="text-xs font-bold text-blue-600 dark:text-blue-400">{{ checklistProgress }}%\r
                            Complete</span>\r
                    </div>\r
                    <div\r
                        class="bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-2 space-y-1 border border-slate-100 dark:border-slate-800">\r
                        @for (item of task.sub_tasks; track item.id) {\r
                        <div\r
                            class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100/50 dark:border-slate-800/50 group transition-colors hover:bg-slate-50 relative pr-10">\r
                            <div (click)="toggleChecklist(item)"\r
                                [class]="item.completed ? 'border-blue-600 bg-blue-600' : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-500'"\r
                                class="cursor-pointer w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0">\r
                                @if (item.completed) {\r
                                <span class="material-symbols-outlined text-white text-[16px]">check</span>\r
                                }\r
                            </div>\r
                            @if (isEditing) {\r
                            <input type="text" [ngModel]="item.title" (ngModelChange)="onSubTaskChange(item, $event)"\r
                                class="text-sm bg-transparent border-none outline-none focus:ring-0 flex-1 font-semibold text-slate-700 dark:text-slate-300 pointer-events-auto">\r
                            <button (click)="openDeleteSubTaskDialog(item?.id!)"\r
                                class="absolute right-3 text-red-500 hover:text-red-700 p-1 flex items-center justify-center cursor-pointer">\r
                                <span class="material-symbols-outlined text-[18px]">delete</span>\r
                            </button>\r
                            } @else {\r
                            <span\r
                                [class]="item.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300 font-semibold'"\r
                                class="text-sm transition-all">{{ item.title }}</span>\r
                            }\r
                        </div>\r
                        }\r
                        @if (isEditing) {\r
                        <div\r
                            class="flex items-center gap-3 p-2 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 mt-2">\r
                            <span class="material-symbols-outlined text-slate-400">add</span>\r
                            <input type="text" [(ngModel)]="newSubTaskTitle" (keyup.enter)="addSubTask()"\r
                                placeholder="Add new sub-task..."\r
                                class="text-sm bg-transparent border-none outline-none focus:ring-0 flex-1">\r
                            <button (click)="addSubTask()"\r
                                class="text-xs font-bold bg-slate-100 px-3 py-1 rounded-lg text-slate-700 hover:bg-slate-200 cursor-pointer">Add</button>\r
                        </div>\r
                        }\r
                    </div>\r
                </section>\r
\r
                <!-- Attachments -->\r
                <section>\r
                    <div class="flex items-center justify-between mb-6">\r
                        <h3 class="text-xs font-black uppercase tracking-[0.15em] text-slate-400">File Attachments</h3>\r
                        <button (click)="openUploadModal()"\r
                            class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">\r
                            <span class="material-symbols-outlined text-sm">upload</span> Upload Document\r
                        </button>\r
                    </div>\r
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
                        @for (file of task.attachments; track file.id) {\r
                        <div\r
                            class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-50/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer group shadow-sm bg-white dark:bg-slate-900/50">\r
                            <div\r
                                class="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner shrink-0">\r
                                <span class="material-symbols-outlined text-[28px]">description</span>\r
                            </div>\r
                            <div class="flex-1 overflow-hidden">\r
                                <p class="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">{{ file.name }}\r
                                </p>\r
                                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{{\r
                                    file.size }} \u2022 {{ file.createdAt | date }}</p>\r
                            </div>\r
                            <a [href]="file.url" target="_blank"\r
                                class="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-colors">download</a>\r
                        </div>\r
                        }\r
                    </div>\r
                </section>\r
\r
                <!-- Relationships (Predecessors) -->\r
                <section class="space-y-4">\r
                    <div class="flex justify-between items-end mb-2">\r
                        <h3 class="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Relationships\r
                            (Predecessors)</h3>\r
                        <span class="text-xs font-bold text-blue-600 dark:text-blue-400">{{ task.dependencies?.length ||\r
                            0 }} Dependencies</span>\r
                    </div>\r
                    <div\r
                        class="bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-4 space-y-3 border border-slate-100 dark:border-slate-800">\r
                        @for (dep of task.dependencies; track dep.predecessor_id) {\r
                        <div\r
                            class="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100/50 dark:border-slate-800/50 group">\r
                            <div class="flex items-center gap-4">\r
                                <div\r
                                    class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">\r
                                    {{ dep.type }}\r
                                </div>\r
                                <div>\r
                                    <p class="text-sm font-bold text-slate-700 dark:text-slate-300">{{\r
                                        getTaskTitle(dep.predecessor_id) }}</p>\r
                                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lag: {{\r
                                        dep.lag }} days</p>\r
                                </div>\r
                            </div>\r
                            @if (isEditing) {\r
                            <button (click)="removeDependency(dep)"\r
                                class="text-red-400 hover:text-red-600 transition-colors cursor-pointer">\r
                                <span class="material-symbols-outlined text-[18px]">delete</span>\r
                            </button>\r
                            }\r
                        </div>\r
                        }\r
                        @if (task.dependencies?.length === 0) {\r
                        <div class="text-center py-6">\r
                            <span class="material-symbols-outlined text-slate-300 text-3xl mb-2">link_off</span>\r
                            <p class="text-xs text-slate-400 font-medium">No predecessors defined.</p>\r
                        </div>\r
                        }\r
\r
                        @if (isEditing) {\r
                        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">\r
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Predecessor\r
                            </p>\r
                            <div class="grid grid-cols-12 gap-3">\r
                                <div class="col-span-6">\r
                                    <select [(ngModel)]="selectedPredecessorId"\r
                                        class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold outline-none">\r
                                        <option value="" disabled>Select Task</option>\r
                                        @for (t of allTasks; track t.id) {\r
                                        <option [value]="t.id">{{ t.title }}</option>\r
                                        }\r
                                    </select>\r
                                </div>\r
                                <div class="col-span-3">\r
                                    <select [(ngModel)]="selectedDepType"\r
                                        class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold outline-none">\r
                                        @for (type of dependencyTypes; track type.id) {\r
                                        <option [value]="type.id">{{ type.name }}</option>\r
                                        }\r
                                    </select>\r
                                    <p class="text-[9px] text-blue-600 font-medium mt-1">{{ getSelectedDepDesc() }}</p>\r
                                </div>\r
                                <div class="col-span-2">\r
                                    <input type="number" [(ngModel)]="depLag" placeholder="Lag"\r
                                        class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold outline-none">\r
                                </div>\r
                                <div class="col-span-1">\r
                                    <button (click)="addDependency()"\r
                                        class="w-full h-full bg-blue-600 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700">\r
                                        <span class="material-symbols-outlined text-sm">add</span>\r
                                    </button>\r
                                </div>\r
                            </div>\r
                        </div>\r
                        }\r
                    </div>\r
                </section>\r
            </div>\r
\r
            <!-- Side Panel Column -->\r
            <div\r
                class="md:col-span-4 bg-slate-50/50 dark:bg-slate-800/20 p-8 space-y-8 flex flex-col h-full overflow-y-auto min-h-0">\r
                <!-- Assignee Section -->\r
                <div class="space-y-4">\r
                    <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Assignee</h2>\r
                    <div\r
                        class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative">\r
                        <img class="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"\r
                            [src]="task.assignees?.[0]?.avatar || 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&h=256&auto=format&fit=crop'"\r
                            [alt]="task.assignees?.[0]?.firstname || 'Assignee'">\r
                        <div class="flex-1">\r
                            @if (isEditing) {\r
                            <select (change)="onAssigneeSelect($event)"\r
                                class="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500">\r
                                <option disabled selected>Select Assignee</option>\r
                                @for (member of teamMembers; track member.id) {\r
                                <option [value]="member.id">{{ member.firstname }} {{ member.lastname }}</option>\r
                                }\r
                            </select>\r
                            } @else {\r
                            <p class="text-sm font-bold text-slate-900 dark:text-slate-50">{{\r
                                task.assignees?.[0]?.firstname }} {{ task.assignees?.[0]?.lastname || 'Unassigned' }}\r
                            </p>\r
                            <p class="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Primary\r
                                Contact\r
                            </p>\r
                            }\r
                        </div>\r
                    </div>\r
                </div>\r
\r
                <!-- Created By Section -->\r
                <div class="space-y-4">\r
                    <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Created By</h2>\r
                    <div\r
                        class="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">\r
                        <img class="w-10 h-10 rounded-xl object-cover"\r
                            [src]="task.creator?.avatar || 'assets/default-avatar.png'"\r
                            [alt]="task.creator?.firstname || 'Creator'">\r
                        <div>\r
                            <p class="text-sm font-bold text-slate-900 dark:text-slate-50">{{ task.creator?.firstname || 'System' }} {{\r
                                task.creator?.lastname || '' }}</p>\r
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Task Owner\r
                            </p>\r
                        </div>\r
                    </div>\r
                </div>\r
\r
                <!-- Activity Log -->\r
                <div class="space-y-6 flex-1 flex flex-col min-h-0">\r
                    <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Timeline</h3>\r
                    <div class="flex-1 overflow-y-auto pr-2 min-h-0">\r
                        <div\r
                            class="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">\r
                            @for (act of task.activities; track act.id) {\r
                            <div class="relative pl-8 animate-in fade-in duration-500">\r
                                <div\r
                                    class="bg-blue-600 absolute left-0 top-1.5 w-4 h-4 rounded-full ring-4 ring-white dark:ring-slate-900 z-10">\r
                                </div>\r
                                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">\r
                                    <span class="font-bold text-slate-900 dark:text-slate-50">{{ act.user?.firstname ||\r
                                        'System' }}</span>\r
                                    {{ act.detail }}\r
                                </p>\r
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{\r
                                    act.createdAt | date:'shortTime' }}</p>\r
                            </div>\r
                            }\r
                        </div>\r
                    </div>\r
                </div>\r
\r
                <!-- Quick Actions -->\r
                <div class="pt-4 mt-auto space-y-3">\r
                    <input type="text" [(ngModel)]="newComment" (keyup.enter)="postComment()"\r
                        placeholder="Type a comment..."\r
                        class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />\r
                    <button (click)="postComment()"\r
                        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer">\r
                        <span class="material-symbols-outlined text-[18px]">send</span>\r
                        Post Comment\r
                    </button>\r
                </div>\r
            </div>\r
        </div>\r
\r
    <!-- Document Upload Modal -->\r
    <app-common-dialog\r
        [open]="showUploadModal"\r
        size="sm"\r
        title="Upload Document"\r
        subtitle="Select a file to attach to this task."\r
        icon="cloud_upload"\r
        [showCloseButton]="true"\r
        [showFooter]="true"\r
        cancelLabel="Cancel"\r
        primaryLabel="Done"\r
        panelClass="rounded-2xl transform animate-in zoom-in-95 duration-200"\r
        (closed)="showUploadModal = false"\r
        (primary)="showUploadModal = false"\r
    >\r
            <label\r
                class="m-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors group">\r
                <input type="file" class="hidden" (change)="onFileSelected($event)">\r
                <span\r
                    class="material-symbols-outlined text-[32px] text-blue-500 mb-2 group-hover:scale-110 transition-transform">cloud_upload</span>\r
                <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Click to Browse Files</p>\r
                <p class="text-[10px] text-slate-400 mt-1">Select any document or image</p>\r
            </label>\r
    </app-common-dialog>\r
\r
    <app-common-dialog\r
        [open]="showDeleteSubTaskModal"\r
        size="sm"\r
        variant="danger"\r
        title="Delete Sub-task?"\r
        subtitle="This action cannot be undone."\r
        icon="delete_forever"\r
        [showCloseButton]="true"\r
        [showFooter]="true"\r
        cancelLabel="Cancel"\r
        primaryLabel="Delete"\r
        (closed)="closeDeleteSubTaskDialog()"\r
        (primary)="confirmDeleteSubTask()"\r
    >\r
        <div class="px-6 py-5">\r
            <p class="text-sm font-medium text-slate-600 dark:text-slate-300">\r
                Are you sure you want to delete this sub-task from the task checklist?\r
            </p>\r
        </div>\r
    </app-common-dialog>\r
</app-common-dialog>\r
`, styles: ['/* src/app/modules/projects/widgets/task-detail/task-detail.scss */\n.material-symbols-outlined {\n  font-variation-settings:\n    "FILL" 0,\n    "wght" 400,\n    "GRAD" 0,\n    "opsz" 24;\n  vertical-align: middle;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.animate-in {\n  animation: fadeIn 0.3s ease-out forwards;\n}\n::-webkit-scrollbar {\n  width: 6px;\n}\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n::-webkit-scrollbar-thumb {\n  background: #e2e8f0;\n  border-radius: 10px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #cbd5e1;\n}\n.dark ::webkit-scrollbar-thumb {\n  background: #1e293b;\n}\n/*# sourceMappingURL=task-detail.css.map */\n'] }]
  }], () => [], { task: [{
    type: Input
  }], close: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskDetail, { className: "TaskDetail", filePath: "app/modules/projects/widgets/task-detail/task-detail.ts", lineNumber: 20 });
})();

// src/app/modules/projects/widgets/add-task/add-task.ts
var _c0 = () => ({ standalone: true });
var _forTrack02 = ($index, $item) => $item.id;
var arrowFn0 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r4 = \u0275\u0275nextContext();
  return \u0275\u0275resetView(m.id == ctx_r4.newSubTask.materialId);
};
var arrowFn1 = (ctx, view) => (m) => {
  \u0275\u0275restoreView(view);
  const ctx_r4 = \u0275\u0275nextContext(2);
  return \u0275\u0275resetView(m.id == ctx_r4.newSubTask.materialId);
};
function AddTask_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r1 = ctx.$implicit;
    \u0275\u0275property("value", vendor_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r1.name, " ");
  }
}
function AddTask_For_29_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "span", 55);
    \u0275\u0275text(2, "pending");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" +", item_r3.shortage, " Requested ");
  }
}
function AddTask_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 49)(2, "div", 50)(3, "div", 30)(4, "div")(5, "p", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 53)(10, "div", 54)(11, "span", 55);
    \u0275\u0275text(12, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, AddTask_For_29_Conditional_14_Template, 4, 1, "div", 56);
    \u0275\u0275elementStart(15, "div", 57)(16, "span", 55);
    \u0275\u0275text(17, " construction ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "button", 58);
    \u0275\u0275listener("click", function AddTask_For_29_Template_button_click_19_listener() {
      const $index_r4 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.editSubTask($index_r4));
    });
    \u0275\u0275elementStart(20, "span", 59);
    \u0275\u0275text(21, " edit_square ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "button", 60);
    \u0275\u0275listener("click", function AddTask_For_29_Template_button_click_22_listener() {
      const $index_r4 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.removeSubTask($index_r4));
    });
    \u0275\u0275elementStart(23, "span", 59);
    \u0275\u0275text(24, " delete ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", item_r3.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r3.itemName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Qty: ", item_r3.qty, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.pendingRequest ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", item_r3.equipment, " ");
  }
}
function AddTask_Conditional_30_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r7 = ctx.$implicit;
    \u0275\u0275property("ngValue", material_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(material_r7.name);
  }
}
function AddTask_Conditional_30_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Available Stock: ", (tmp_2_0 = ctx_r4.materials.find(\u0275\u0275arrowFunction(1, arrowFn1, ctx))) == null ? null : tmp_2_0.stockIn, " ");
  }
}
function AddTask_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 5)(2, "label", 61);
    \u0275\u0275text(3, " Title ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_30_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.newSubTask.title, $event) || (ctx_r4.newSubTask.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 5)(6, "label", 61);
    \u0275\u0275text(7, " Material ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 63);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_30_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.newSubTask.materialId, $event) || (ctx_r4.newSubTask.materialId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 64);
    \u0275\u0275text(10, "Select Material");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, AddTask_Conditional_30_For_12_Template, 2, 2, "option", 65, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 5)(14, "label", 61);
    \u0275\u0275text(15, " Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_30_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.newSubTask.qty, $event) || (ctx_r4.newSubTask.qty = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, AddTask_Conditional_30_Conditional_17_Template, 2, 2, "p", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 5)(19, "label", 61);
    \u0275\u0275text(20, " Equipment ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function AddTask_Conditional_30_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.newSubTask.equipment, $event) || (ctx_r4.newSubTask.equipment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 69)(23, "button", 70);
    \u0275\u0275listener("click", function AddTask_Conditional_30_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showSubTaskForm = false);
    });
    \u0275\u0275text(24, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 71);
    \u0275\u0275listener("click", function AddTask_Conditional_30_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.addSubTask());
    });
    \u0275\u0275text(26, " Save ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.newSubTask.title);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(12, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.newSubTask.materialId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(13, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.materials);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.newSubTask.qty);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(14, _c0))("max", (tmp_9_0 = ctx_r4.materials.find(\u0275\u0275arrowFunction(11, arrowFn0, ctx))) == null ? null : tmp_9_0.stockIn);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.newSubTask.materialId ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.newSubTask.equipment);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(15, _c0));
  }
}
function AddTask_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 73)(4, "p", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 75);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const file_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r8.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(file_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r8.size);
  }
}
function AddTask_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275property("value", p_r9.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r9.label);
  }
}
function AddTask_For_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r10 = ctx.$implicit;
    \u0275\u0275property("value", member_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", member_r10.firstname, " ", member_r10.lastname);
  }
}
function AddTask_For_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 76)(2, "span", 77);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 78);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 79);
    \u0275\u0275listener("click", function AddTask_For_82_Template_button_click_6_listener() {
      const $index_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.removeDependency($index_r12));
    });
    \u0275\u0275elementStart(7, "span", 41);
    \u0275\u0275text(8, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dep_r13 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dep_r13.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(dep_r13.predecessorTitle);
  }
}
function AddTask_For_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r14 = ctx.$implicit;
    \u0275\u0275property("value", t_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r14.title);
  }
}
function AddTask_For_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r15 = ctx.$implicit;
    \u0275\u0275property("value", type_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r15.name);
  }
}
function AddTask_Conditional_108_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 80)(2, "div", 81)(3, "p", 82);
    \u0275\u0275text(4, "Requested");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h4", 83);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 84)(8, "p", 85);
    \u0275\u0275text(9, "Available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h4", 86);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 87)(13, "p", 88);
    \u0275\u0275text(14, "Shortage");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "h4", 89);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 90)(18, "div", 12)(19, "div", 91)(20, "div", 92)(21, "span", 93);
    \u0275\u0275text(22, " check_circle ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "p", 94);
    \u0275\u0275text(24, " Allocate ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p", 95);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span", 96);
    \u0275\u0275text(28, " east ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 91)(30, "div", 97)(31, "span", 98);
    \u0275\u0275text(32, " pending ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "p", 99);
    \u0275\u0275text(34, " Request ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 100);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 101)(38, "span", 102);
    \u0275\u0275text(39, " info ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div")(41, "p", 103);
    \u0275\u0275text(42, " Automatic Processing ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p", 104);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 105)(46, "button", 106);
    \u0275\u0275listener("click", function AddTask_Conditional_108_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.cancelStockRequest());
    });
    \u0275\u0275text(47, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 107);
    \u0275\u0275listener("click", function AddTask_Conditional_108_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.confirmStockRequest());
    });
    \u0275\u0275text(49, " Confirm & Request ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r4.newSubTask.qty, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r4.stockDialogData.available, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r4.stockDialogData.shortage, " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r4.stockDialogData.available, " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r4.stockDialogData.shortage, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2(" ", ctx_r4.stockDialogData.available, " units will be allocated immediately. Remaining ", ctx_r4.stockDialogData.shortage, " units will create a stock request for manager approval. ");
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
  taskForm;
  checklist = [];
  showSubTaskForm = false;
  editingIndex = null;
  newSubTask = {
    title: "",
    materialId: null,
    itemName: "",
    stockIn: 0,
    qty: 1,
    equipment: ""
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
  teamMembers = [];
  vendors = [];
  materials = [];
  ngOnInit() {
    this.initForm();
    this.projectService.getProjectTasks(this.projectId).subscribe((res) => {
      this.allTasks = res.data;
    });
    if (this.projectId) {
      this.fetchTeamMembers();
      this.fetchVendors();
      this.fetchMaterials();
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
      initialComment: [""]
    });
  }
  fetchTeamMembers() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.teamMembers = res.data.team_members || [];
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
    this.newSubTask = { title: "", materialId: null, itemName: "", stockIn: 0, qty: 1, equipment: "" };
    this.showSubTaskForm = false;
    this.editingIndex = null;
  }
  // Add these new properties
  showStockDialog = false;
  stockDialogData = null;
  addSubTask() {
    if (this.newSubTask.title.trim() && this.newSubTask.materialId) {
      const selectedMaterial = this.materials.find((m) => m.id == this.newSubTask.materialId);
      if (!selectedMaterial) {
        this.toast.error("Material not found");
        return;
      }
      if (this.newSubTask.qty > selectedMaterial.stockIn) {
        if (selectedMaterial.stockIn === 0) {
          this.stockDialogData = {
            available: 0,
            shortage: this.newSubTask.qty,
            selectedMaterial
          };
          this.showStockDialog = true;
          return;
        }
        this.stockDialogData = {
          available: selectedMaterial.stockIn,
          shortage: this.newSubTask.qty - selectedMaterial.stockIn,
          selectedMaterial
        };
        this.showStockDialog = true;
        return;
      }
      const payload = {
        title: this.newSubTask.title,
        material_id: selectedMaterial.id,
        itemName: selectedMaterial.name,
        stockIn: selectedMaterial.stockIn,
        qty: this.newSubTask.qty,
        equipment: this.newSubTask.equipment,
        completed: false
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
        qty: 1,
        equipment: ""
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
      qty: item.requestedQty ?? item.qty,
      equipment: item.equipment
    };
    this.editingIndex = index;
    this.showSubTaskForm = true;
  }
  confirmStockRequest() {
    if (!this.stockDialogData)
      return;
    const { available, shortage, selectedMaterial } = this.stockDialogData;
    const payload = {
      title: this.newSubTask.title,
      material_id: selectedMaterial.id,
      itemName: selectedMaterial.name,
      stockIn: available,
      qty: available,
      requestedQty: this.newSubTask.qty,
      shortage,
      pendingRequest: true,
      equipment: this.newSubTask.equipment,
      completed: false
    };
    if (this.editingIndex !== null) {
      const oldItem = this.checklist[this.editingIndex];
      this.checklist[this.editingIndex] = __spreadProps(__spreadValues({}, payload), {
        stock_request_id: oldItem.stock_request_id
      });
      if (!oldItem.stock_request_id) {
        this.toast.error("Stock request id not found");
        return;
      }
      this.projectService.updateAdditionalStockRequest(oldItem.stock_request_id, {
        material_id: selectedMaterial.id,
        task_title: this.newSubTask.title,
        requested_qty: shortage,
        available_qty: available,
        project_id: this.projectId
      }).subscribe({
        next: () => {
          this.toast.success("Stock request updated");
        },
        error: () => {
          this.toast.error("Failed to update stock request");
        }
      });
    } else {
      this.projectService.requestAdditionalStock({
        material_id: selectedMaterial.id,
        task_title: this.newSubTask.title,
        requested_qty: shortage,
        available_qty: available,
        project_id: this.projectId
      }).subscribe({
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
  static \u0275fac = function AddTask_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddTask)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddTask, selectors: [["app-add-task"]], inputs: { projectId: "projectId", milestoneId: "milestoneId", initialStatus: "initialStatus" }, outputs: { close: "close", save: "save" }, decls: 109, vars: 20, consts: [["title", "Initialize Construction Task", "subtitle", "Create and configure a new construction activity", "icon", "add_task", "maxWidth", "max-w-4xl", "cancelLabel", "Discard", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "flex", "min-h-0", "flex-col", 3, "formGroup"], [1, "flex-1", "overflow-y-auto", "p-8", "grid", "grid-cols-1", "md:grid-cols-2", "gap-10"], [1, "space-y-8"], [1, "space-y-4"], [1, "space-y-2"], [1, "block", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], ["formControlName", "title", "placeholder", "e.g., Structural Steel Erection", "type", "text", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-2xl", "p-4", "text-sm", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none"], ["formControlName", "description", "rows", "3", "placeholder", "Scope of work...", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-2xl", "p-4", "text-sm", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", "resize-none"], ["formControlName", "vendorId", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-xs", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none"], ["value", "", "disabled", "", "selected", ""], [3, "value"], [1, "flex", "items-center", "justify-between"], ["type", "button", 1, "text-[10px]", "font-black", "bg-primary/10", "text-primary", "px-3", "py-1.5", "rounded-lg", "hover:bg-primary/20", "uppercase", "tracking-widest", "transition-colors", 3, "click"], [1, "bg-surface-container-low/50", "rounded-2xl", "p-3", "space-y-3", "ring-1", "ring-outline-variant/10"], [1, "p-4", "bg-surface", "rounded-2xl", "border", "border-outline-variant/5", "shadow-sm"], [1, "bg-surface", "rounded-2xl", "p-5", "border", "border-outline-variant/10", "space-y-5", "animate-in", "slide-in-from-top-2", "duration-200"], [1, "grid", "grid-cols-2", "gap-3"], [1, "flex", "items-center", "gap-3", "p-3", "bg-surface", "rounded-xl", "border", "border-outline-variant/5", "shadow-sm"], [1, "border-2", "border-dashed", "border-outline-variant/20", "rounded-xl", "p-4", "flex", "flex-col", "items-center", "justify-center", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "group", "col-span-2"], ["type", "file", "multiple", "", 1, "hidden", 3, "change"], [1, "material-symbols-outlined", "text-outline", "group-hover:text-primary", "transition-colors"], [1, "text-[10px]", "font-black", "text-outline", "uppercase", "tracking-widest", "mt-1"], [1, "grid", "grid-cols-2", "gap-4"], ["formControlName", "priority", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-xs", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none"], ["formControlName", "assigneeId", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-xs", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none"], [1, "text-[8px]", "font-black", "bg-amber-100", "text-amber-700", "px-1.5", "py-0.5", "rounded", "uppercase"], [1, "grid", "grid-cols-2", "gap-4", "bg-surface-container-low/50", "p-4", "rounded-2xl", "ring-1", "ring-outline-variant/10"], [1, "block", "text-[9px]", "font-bold", "text-outline", "uppercase", "tracking-wider"], ["type", "date", "formControlName", "startDate", 1, "w-full", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "outline-none", "ring-1", "ring-outline-variant/10"], [1, "flex", "items-center", "gap-2"], ["type", "number", "formControlName", "duration", 1, "flex-1", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "outline-none", "ring-1", "ring-outline-variant/10"], [1, "text-[10px]", "font-black", "text-outline"], [1, "bg-surface-container-low/50", "rounded-2xl", "p-4", "space-y-4", "ring-1", "ring-outline-variant/10"], [1, "flex", "items-center", "justify-between", "p-3", "bg-surface", "rounded-xl", "shadow-sm", "border", "border-outline-variant/5"], [1, "pt-2", "border-t", "border-outline-variant/10", "space-y-3"], [1, "w-full", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "ring-1", "ring-outline-variant/10", "outline-none", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "flex", "gap-2"], [1, "flex-1", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "ring-1", "ring-outline-variant/10", "outline-none", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "placeholder", "Lag", 1, "w-20", "bg-surface", "border-none", "rounded-lg", "p-2.5", "text-xs", "font-bold", "ring-1", "ring-outline-variant/10", "outline-none", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "px-4", "bg-primary", "text-white", "rounded-lg", "hover:bg-primary-container", "transition-colors", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "text-[9px]", "text-primary/60", "font-medium", "px-1"], [1, "relative"], ["formControlName", "initialComment", "rows", "2", "placeholder", "Tag team members or add notes...", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-2xl", "p-4", "text-sm", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", "resize-none"], [1, "absolute", "right-3", "bottom-3", "text-outline", "hover:text-primary"], [1, "material-symbols-outlined", "text-[20px]"], ["title", "Insufficient Stock", "subtitle", "Inventory allocation & shortage request", "icon", "inventory_2", "maxWidth", "max-w-md", 3, "open", "showCloseButton", "showFooter", "closeOnBackdrop"], [1, "p-6", "space-y-5"], [1, "flex", "items-start", "justify-between", "gap-4"], [1, "flex-1", "space-y-3"], [1, "text-sm", "font-black", "text-on-surface"], [1, "text-xs", "text-outline", "font-semibold"], [1, "flex", "flex-wrap", "gap-3"], [1, "flex", "items-center", "gap-1", "bg-blue-100", "text-blue-700", "px-2", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-wide"], [1, "material-symbols-outlined", "text-[14px]"], [1, "flex", "items-center", "gap-1", "bg-orange-100", "text-orange-700", "px-2", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-wide"], [1, "flex", "items-center", "gap-1", "bg-amber-100", "text-amber-700", "px-2", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-wide"], ["type", "button", 1, "text-primary", "hover:text-primary/70", "transition-colors", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], ["type", "button", 1, "text-error/60", "hover:text-error", "transition-colors", 3, "click"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], ["type", "text", "placeholder", "e.g. Concrete Work", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-sm", "outline-none", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-xs", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", "outline-none", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["type", "number", "min", "1", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-sm", "outline-none", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel", "ngModelOptions", "max"], [1, "text-[10px]", "text-primary", "font-bold", "px-1"], ["type", "text", "placeholder", "Machine / Tool", 1, "w-full", "bg-surface-container-low", "border-none", "rounded-xl", "p-3", "text-sm", "outline-none", "ring-1", "ring-outline-variant/20", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "flex", "justify-end", "gap-3", "pt-2"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "text-outline", "hover:text-on-surface", "transition-colors", 3, "click"], ["type", "button", 1, "px-5", "py-2.5", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", "hover:scale-[1.02]", "active:scale-[0.98]", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-primary", "text-sm"], [1, "flex-1", "overflow-hidden"], [1, "text-[10px]", "font-bold", "text-on-surface", "truncate"], [1, "text-[8px]", "text-outline", "font-bold"], [1, "flex", "items-center", "gap-3", "overflow-hidden"], [1, "text-[9px]", "font-black", "bg-blue-100", "text-blue-700", "px-1.5", "py-0.5", "rounded"], [1, "text-xs", "font-bold", "text-on-surface", "truncate"], [1, "text-error/60", "hover:text-error", 3, "click"], [1, "grid", "grid-cols-3", "gap-3"], [1, "rounded-2xl", "bg-slate-50", "border", "border-slate-200", "p-4", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "text-slate-500"], [1, "text-2xl", "font-black", "text-slate-800", "mt-1"], [1, "rounded-2xl", "bg-emerald-50", "border", "border-emerald-200", "p-4", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "text-emerald-600"], [1, "text-2xl", "font-black", "text-emerald-700", "mt-1"], [1, "rounded-2xl", "bg-orange-50", "border", "border-orange-200", "p-4", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "text-orange-600"], [1, "text-2xl", "font-black", "text-orange-700", "mt-1"], [1, "rounded-3xl", "border", "border-outline-variant/10", "bg-surface-container-low", "p-5"], [1, "flex", "flex-col", "items-center"], [1, "w-12", "h-12", "rounded-2xl", "bg-emerald-100", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-emerald-600"], [1, "mt-2", "text-xs", "font-black", "text-emerald-700"], [1, "text-xl", "font-black", "text-emerald-700"], [1, "material-symbols-outlined", "text-outline"], [1, "w-12", "h-12", "rounded-2xl", "bg-orange-100", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-orange-600"], [1, "mt-2", "text-xs", "font-black", "text-orange-700"], [1, "text-xl", "font-black", "text-orange-700"], [1, "rounded-2xl", "bg-blue-50", "border", "border-blue-200", "p-4", "flex", "gap-3"], [1, "material-symbols-outlined", "text-blue-600"], [1, "text-xs", "font-black", "text-blue-700"], [1, "text-[11px]", "text-blue-600", "mt-1", "leading-relaxed"], [1, "flex", "gap-3", "pt-2"], [1, "flex-1", "h-12", "rounded-2xl", "border", "border-slate-300", "font-black", 3, "click"], [1, "flex-1", "h-12", "rounded-2xl", "bg-primary", "text-white", "font-black", 3, "click"]], template: function AddTask_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-common-dialog", 0);
      \u0275\u0275listener("closed", function AddTask_Template_app_common_dialog_closed_0_listener() {
        return ctx.close.emit();
      })("primary", function AddTask_Template_app_common_dialog_primary_0_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "section", 4)(5, "div", 5)(6, "label", 6);
      \u0275\u0275text(7, "Task Title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "input", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 5)(10, "label", 6);
      \u0275\u0275text(11, "Detailed Instructions");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "textarea", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 5)(14, "label", 6);
      \u0275\u0275text(15, "Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "select", 9)(17, "option", 10);
      \u0275\u0275text(18, "Select Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(19, AddTask_For_20_Template, 2, 2, "option", 11, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "section", 4)(22, "div", 12)(23, "label", 6);
      \u0275\u0275text(24, " Sub-tasks Checklist ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 13);
      \u0275\u0275listener("click", function AddTask_Template_button_click_25_listener() {
        return ctx.showSubTaskForm = !ctx.showSubTaskForm;
      });
      \u0275\u0275text(26, " Add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 14);
      \u0275\u0275repeaterCreate(28, AddTask_For_29_Template, 25, 5, "div", 15, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(30, AddTask_Conditional_30_Template, 27, 16, "div", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "section", 4)(32, "label", 6);
      \u0275\u0275text(33, "Attachments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 17);
      \u0275\u0275repeaterCreate(35, AddTask_For_36_Template, 8, 3, "div", 18, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(37, "label", 19)(38, "input", 20);
      \u0275\u0275listener("change", function AddTask_Template_input_change_38_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "span", 21);
      \u0275\u0275text(40, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span", 22);
      \u0275\u0275text(42, "Upload Documents");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(43, "div", 3)(44, "div", 23)(45, "div", 5)(46, "label", 6);
      \u0275\u0275text(47, "Priority");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "select", 24);
      \u0275\u0275repeaterCreate(49, AddTask_For_50_Template, 2, 2, "option", 11, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 5)(52, "label", 6);
      \u0275\u0275text(53, "Assignee");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "select", 25)(55, "option", 10);
      \u0275\u0275text(56, "Select Team Member");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(57, AddTask_For_58_Template, 2, 3, "option", 11, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(59, "section", 4)(60, "div", 12)(61, "label", 6);
      \u0275\u0275text(62, "Scheduling Parameters");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "span", 26);
      \u0275\u0275text(64, "CPM Enabled");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(65, "div", 27)(66, "div", 5)(67, "label", 28);
      \u0275\u0275text(68, "Start Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(69, "input", 29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div", 5)(71, "label", 28);
      \u0275\u0275text(72, "Duration (Days)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "div", 30);
      \u0275\u0275element(74, "input", 31);
      \u0275\u0275elementStart(75, "span", 32);
      \u0275\u0275text(76, "DYS");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(77, "section", 4)(78, "label", 6);
      \u0275\u0275text(79, "Predecessor Relationships");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 33);
      \u0275\u0275repeaterCreate(81, AddTask_For_82_Template, 9, 2, "div", 34, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(83, "div", 35)(84, "select", 36);
      \u0275\u0275twoWayListener("ngModelChange", function AddTask_Template_select_ngModelChange_84_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedPredecessorId, $event) || (ctx.selectedPredecessorId = $event);
        return $event;
      });
      \u0275\u0275elementStart(85, "option", 10);
      \u0275\u0275text(86, "Link Predecessor...");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(87, AddTask_For_88_Template, 2, 2, "option", 11, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "div", 37)(90, "select", 38);
      \u0275\u0275twoWayListener("ngModelChange", function AddTask_Template_select_ngModelChange_90_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedDepType, $event) || (ctx.selectedDepType = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(91, AddTask_For_92_Template, 2, 2, "option", 11, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "input", 39);
      \u0275\u0275twoWayListener("ngModelChange", function AddTask_Template_input_ngModelChange_93_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.depLag, $event) || (ctx.depLag = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "button", 40);
      \u0275\u0275listener("click", function AddTask_Template_button_click_94_listener() {
        return ctx.addDependency();
      });
      \u0275\u0275elementStart(95, "span", 41);
      \u0275\u0275text(96, "link");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(97, "p", 42);
      \u0275\u0275text(98);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(99, "section", 4)(100, "label", 6);
      \u0275\u0275text(101, "Initial Comment / Handover Note");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "div", 43);
      \u0275\u0275element(103, "textarea", 44);
      \u0275\u0275elementStart(104, "button", 45)(105, "span", 46);
      \u0275\u0275text(106, "alternate_email");
      \u0275\u0275elementEnd()()()()()()();
      \u0275\u0275elementStart(107, "app-common-dialog", 47);
      \u0275\u0275conditionalCreate(108, AddTask_Conditional_108_Template, 50, 7, "div", 48);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("open", true)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.taskForm);
      \u0275\u0275advance(18);
      \u0275\u0275repeater(ctx.vendors);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.checklist);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showSubTaskForm ? 30 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.attachments);
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.priorities);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.teamMembers);
      \u0275\u0275advance(24);
      \u0275\u0275repeater(ctx.dependencies);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedPredecessorId);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c0));
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.allTasks);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedDepType);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(18, _c0));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.dependencyTypes);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.depLag);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c0));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.getSelectedDepDesc(), " ");
      \u0275\u0275advance(9);
      \u0275\u0275property("open", ctx.showStockDialog && !!ctx.stockDialogData)("showCloseButton", true)("showFooter", false)("closeOnBackdrop", false);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.stockDialogData ? 108 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, NgModel, ToastrModule, ReactiveFormsModule, FormGroupDirective, FormControlName, CommonDialogComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  z-index: 9999;\n}\n/*# sourceMappingURL=add-task.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddTask, [{
    type: Component,
    args: [{ selector: "app-add-task", standalone: true, imports: [CommonModule, FormsModule, ToastrModule, ReactiveFormsModule, CommonDialogComponent], template: '<app-common-dialog [open]="true" title="Initialize Construction Task"\r\n    subtitle="Create and configure a new construction activity" icon="add_task" [showCloseButton]="true"\r\n    [showFooter]="true" maxWidth="max-w-4xl" (closed)="close.emit()" (primary)="onSubmit()" cancelLabel="Discard">\r\n    <div [formGroup]="taskForm" class="flex min-h-0 flex-col">\r\n        <!-- Header -->\r\n        <!-- <div class="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between shrink-0">\r\n            <div class="flex items-center gap-4">\r\n                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">\r\n                    <span class="material-symbols-outlined">add_task</span>\r\n                </div>\r\n                <h3 class="text-xl font-black tracking-tight text-on-surface uppercase">Initialize Construction Task\r\n                </h3>\r\n            </div>\r\n            <button (click)="close.emit()"\r\n                class="p-2 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer">\r\n                <span class="material-symbols-outlined text-outline">close</span>\r\n            </button>\r\n        </div> -->\r\n\r\n        <!-- Scrollable Form Content -->\r\n        <div class="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">\r\n            <!-- Left Column: Core Info & Checklist -->\r\n            <div class="space-y-8">\r\n                <!-- Title & Description -->\r\n                <section class="space-y-4">\r\n                    <div class="space-y-2">\r\n                        <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Task\r\n                            Title</label>\r\n                        <input formControlName="title" placeholder="e.g., Structural Steel Erection" type="text"\r\n                            class="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none" />\r\n                    </div>\r\n                    <div class="space-y-2">\r\n                        <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Detailed\r\n                            Instructions</label>\r\n                        <textarea formControlName="description" rows="3" placeholder="Scope of work..."\r\n                            class="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none resize-none"></textarea>\r\n                    </div>\r\n                </section>\r\n\r\n                <!-- vender list -->\r\n                <div class="space-y-2">\r\n                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Vendor</label>\r\n                    <select formControlName="vendorId"\r\n                        class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none">\r\n                        <option value="" disabled selected>Select Vendor</option>\r\n                        @for(vendor of vendors; track $index){\r\n                        <option [value]="vendor.id">\r\n                            {{ vendor.name }}\r\n                        </option>\r\n                        }\r\n                    </select>\r\n                </div>\r\n\r\n                <!-- Sub-tasks Checklist -->\r\n                <section class="space-y-4">\r\n                    <!-- Header -->\r\n                    <div class="flex items-center justify-between">\r\n                        <label class="block text-[10px] font-black uppercase tracking-widest text-outline">\r\n                            Sub-tasks Checklist\r\n                        </label>\r\n\r\n                        <button type="button" (click)="showSubTaskForm = !showSubTaskForm"\r\n                            class="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 uppercase tracking-widest transition-colors">\r\n\r\n                            Add\r\n                        </button>\r\n                    </div>\r\n                    <!-- Wrapper -->\r\n                    <div class="bg-surface-container-low/50 rounded-2xl p-3 space-y-3 ring-1 ring-outline-variant/10">\r\n\r\n                        <!-- Existing Checklist Items -->\r\n                        @for (item of checklist; track $index) {\r\n\r\n                        <div class="p-4 bg-surface rounded-2xl border border-outline-variant/5 shadow-sm">\r\n\r\n                            <div class="flex items-start justify-between gap-4">\r\n\r\n                                <!-- Left -->\r\n                                <div class="flex-1 space-y-3">\r\n\r\n                                    <!-- Title -->\r\n                                    <div class="flex items-center gap-2">\r\n\r\n                                        <div>\r\n                                            <p class="text-sm font-black text-on-surface">\r\n                                                {{ item.title }}\r\n                                            </p>\r\n\r\n                                            <p class="text-xs text-outline font-semibold">\r\n                                                {{ item.itemName }}\r\n                                            </p>\r\n                                        </div>\r\n\r\n                                    </div>\r\n\r\n                                    <!-- Meta -->\r\n                                    <div class="flex flex-wrap gap-3">\r\n\r\n                                        <!-- Qty -->\r\n                                        <div\r\n                                            class="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide">\r\n\r\n                                            <span class="material-symbols-outlined text-[14px]">\r\n                                                inventory_2\r\n                                            </span>\r\n\r\n                                            Qty: {{ item.qty }}\r\n                                        </div>\r\n                                        @if (item.pendingRequest) {\r\n                                        <div\r\n                                            class="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide">\r\n                                            <span class="material-symbols-outlined text-[14px]">pending</span>\r\n                                            +{{ item.shortage }} Requested\r\n                                        </div>\r\n                                        }\r\n                                        <!-- Equipment -->\r\n                                        <div\r\n                                            class="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide">\r\n\r\n                                            <span class="material-symbols-outlined text-[14px]">\r\n                                                construction\r\n                                            </span>\r\n\r\n                                            {{ item.equipment }}\r\n                                        </div>\r\n\r\n                                    </div>\r\n\r\n                                </div>\r\n                                <!-- Edit -->\r\n                                <button type="button" (click)="editSubTask($index)"\r\n                                    class="text-primary hover:text-primary/70 transition-colors">\r\n\r\n                                    <span class="material-symbols-outlined text-[18px]">\r\n                                        edit_square\r\n                                    </span>\r\n\r\n                                </button>\r\n                                <!-- Delete -->\r\n                                <button type="button" (click)="removeSubTask($index)"\r\n                                    class="text-error/60 hover:text-error transition-colors">\r\n\r\n                                    <span class="material-symbols-outlined text-[18px]">\r\n                                        delete\r\n                                    </span>\r\n\r\n                                </button>\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n                        }\r\n\r\n                        <!-- Expandable Form -->\r\n                        @if (showSubTaskForm) {\r\n\r\n                        <div\r\n                            class="bg-surface rounded-2xl p-5 border border-outline-variant/10 space-y-5 animate-in slide-in-from-top-2 duration-200">\r\n\r\n                            <!-- Title -->\r\n                            <div class="space-y-2">\r\n\r\n                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r\n\r\n                                    Title\r\n                                </label>\r\n\r\n                                <input type="text" [(ngModel)]="newSubTask.title" [ngModelOptions]="{standalone: true}"\r\n                                    placeholder="e.g. Concrete Work"\r\n                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm outline-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30" />\r\n                            </div>\r\n\r\n                            <!-- Qty + Material -->\r\n                            <!-- Material -->\r\n                            <div class="space-y-2">\r\n                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r\n                                    Material\r\n                                </label>\r\n                                <!-- AFTER -->\r\n                                <select [(ngModel)]="newSubTask.materialId" [ngModelOptions]="{ standalone: true }"  class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none">\r\n                                    <option [ngValue]="null" disabled>Select Material</option>\r\n                                    @for(material of materials; track material.id) {\r\n                                    <option [ngValue]="material.id">{{ material.name }}</option>\r\n                                    }\r\n                                </select>\r\n                            </div>\r\n\r\n                            <!-- Qty -->\r\n                            <div class="space-y-2">\r\n\r\n                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r\n                                    Quantity\r\n                                </label>\r\n\r\n                                <input type="number" [(ngModel)]="newSubTask.qty" [ngModelOptions]="{standalone: true}"\r\n                                    min="1" [max]="materials.find(m => m.id == newSubTask.materialId)?.stockIn"\r\n                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm outline-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30" />\r\n\r\n                                @if(newSubTask.materialId){\r\n                                <p class="text-[10px] text-primary font-bold px-1">\r\n                                    Available Stock:\r\n                                    {{ materials.find(m => m.id == newSubTask.materialId)?.stockIn }}\r\n                                </p>\r\n                                }\r\n\r\n                            </div>\r\n\r\n                            <!-- Equipment -->\r\n                            <div class="space-y-2">\r\n\r\n                                <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r\n\r\n                                    Equipment\r\n                                </label>\r\n\r\n                                <input type="text" [(ngModel)]="newSubTask.equipment"\r\n                                    [ngModelOptions]="{standalone: true}" placeholder="Machine / Tool"\r\n                                    class="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm outline-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30" />\r\n\r\n                            </div>\r\n\r\n                            <!-- Actions -->\r\n                            <div class="flex justify-end gap-3 pt-2">\r\n\r\n                                <button type="button" (click)="showSubTaskForm = false"\r\n                                    class="px-4 py-2 text-xs font-bold text-outline hover:text-on-surface transition-colors">\r\n\r\n                                    Cancel\r\n                                </button>\r\n\r\n                                <button type="button" (click)="addSubTask()"\r\n                                    class="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">\r\n\r\n                                    Save\r\n                                </button>\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n                        }\r\n\r\n                    </div>\r\n                </section>\r\n\r\n                <!-- File Attachments -->\r\n                <section class="space-y-4">\r\n                    <label\r\n                        class="block text-[10px] font-black uppercase tracking-widest text-outline">Attachments</label>\r\n                    <div class="grid grid-cols-2 gap-3">\r\n                        @for (file of attachments; track $index) {\r\n                        <div\r\n                            class="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/5 shadow-sm">\r\n                            <span class="material-symbols-outlined text-primary text-sm">{{ file.icon }}</span>\r\n                            <div class="flex-1 overflow-hidden">\r\n                                <p class="text-[10px] font-bold text-on-surface truncate">{{ file.name }}</p>\r\n                                <p class="text-[8px] text-outline font-bold">{{ file.size }}</p>\r\n                            </div>\r\n                        </div>\r\n                        }\r\n                        <label\r\n                            class="border-2 border-dashed border-outline-variant/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors group col-span-2">\r\n                            <input type="file" class="hidden" (change)="onFileSelected($event)" multiple />\r\n                            <span\r\n                                class="material-symbols-outlined text-outline group-hover:text-primary transition-colors">cloud_upload</span>\r\n                            <span class="text-[10px] font-black text-outline uppercase tracking-widest mt-1">Upload\r\n                                Documents</span>\r\n                        </label>\r\n                    </div>\r\n                </section>\r\n            </div>\r\n\r\n            <!-- Right Column: Scheduling & Relationships -->\r\n            <div class="space-y-8">\r\n                <!-- Settings Grid -->\r\n                <div class="grid grid-cols-2 gap-4">\r\n                    <div class="space-y-2">\r\n                        <label\r\n                            class="block text-[10px] font-black uppercase tracking-widest text-outline">Priority</label>\r\n                        <select formControlName="priority"\r\n                            class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none">\r\n                            @for (p of priorities; track $index) {\r\n                            <option [value]="p.label">{{ p.label }}</option>\r\n                            }\r\n                        </select>\r\n                    </div>\r\n                    <div class="space-y-2">\r\n                        <label\r\n                            class="block text-[10px] font-black uppercase tracking-widest text-outline">Assignee</label>\r\n                        <select formControlName="assigneeId"\r\n                            class="w-full bg-surface-container-low border-none rounded-xl p-3 text-xs ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none">\r\n                            <option value="" disabled selected>Select Team Member</option>\r\n                            @for(member of teamMembers; track $index){\r\n                            <option [value]="member.id">{{ member.firstname }} {{ member.lastname }}</option>\r\n                            }\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Scheduling Analysis -->\r\n                <section class="space-y-4">\r\n                    <div class="flex items-center justify-between">\r\n                        <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Scheduling\r\n                            Parameters</label>\r\n                        <span\r\n                            class="text-[8px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase">CPM\r\n                            Enabled</span>\r\n                    </div>\r\n                    <div\r\n                        class="grid grid-cols-2 gap-4 bg-surface-container-low/50 p-4 rounded-2xl ring-1 ring-outline-variant/10">\r\n                        <div class="space-y-2">\r\n                            <label class="block text-[9px] font-bold text-outline uppercase tracking-wider">Start\r\n                                Date</label>\r\n                            <input type="date" formControlName="startDate"\r\n                                class="w-full bg-surface border-none rounded-lg p-2.5 text-xs font-bold outline-none ring-1 ring-outline-variant/10" />\r\n                        </div>\r\n                        <div class="space-y-2">\r\n                            <label class="block text-[9px] font-bold text-outline uppercase tracking-wider">Duration\r\n                                (Days)</label>\r\n                            <div class="flex items-center gap-2">\r\n                                <input type="number" formControlName="duration"\r\n                                    class="flex-1 bg-surface border-none rounded-lg p-2.5 text-xs font-bold outline-none ring-1 ring-outline-variant/10" />\r\n                                <span class="text-[10px] font-black text-outline">DYS</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </section>\r\n\r\n                <!-- Relationships (Predecessors) -->\r\n                <section class="space-y-4">\r\n                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Predecessor\r\n                        Relationships</label>\r\n                    <div class="bg-surface-container-low/50 rounded-2xl p-4 space-y-4 ring-1 ring-outline-variant/10">\r\n                        @for (dep of dependencies; track $index) {\r\n                        <div\r\n                            class="flex items-center justify-between p-3 bg-surface rounded-xl shadow-sm border border-outline-variant/5">\r\n                            <div class="flex items-center gap-3 overflow-hidden">\r\n                                <span class="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{{\r\n                                    dep.type }}</span>\r\n                                <p class="text-xs font-bold text-on-surface truncate">{{ dep.predecessorTitle }}</p>\r\n                            </div>\r\n                            <button (click)="removeDependency($index)" class="text-error/60 hover:text-error">\r\n                                <span class="material-symbols-outlined text-sm">delete</span>\r\n                            </button>\r\n                        </div>\r\n                        }\r\n                        <div class="pt-2 border-t border-outline-variant/10 space-y-3">\r\n                            <select [(ngModel)]="selectedPredecessorId" [ngModelOptions]="{standalone: true}"\r\n                                class="w-full bg-surface border-none rounded-lg p-2.5 text-xs font-bold ring-1 ring-outline-variant/10 outline-none">\r\n                                <option value="" disabled selected>Link Predecessor...</option>\r\n                                @for (t of allTasks; track t.id) {\r\n                                <option [value]="t.id">{{ t.title }}</option>\r\n                                }\r\n                            </select>\r\n                            <div class="flex gap-2">\r\n                                <select [(ngModel)]="selectedDepType" [ngModelOptions]="{standalone: true}"\r\n                                    class="flex-1 bg-surface border-none rounded-lg p-2.5 text-xs font-bold ring-1 ring-outline-variant/10 outline-none">\r\n                                    @for (type of dependencyTypes; track type.id) {\r\n                                    <option [value]="type.id">{{ type.name }}</option>\r\n                                    }\r\n                                </select>\r\n                                <input type="number" [(ngModel)]="depLag" [ngModelOptions]="{standalone: true}"\r\n                                    placeholder="Lag"\r\n                                    class="w-20 bg-surface border-none rounded-lg p-2.5 text-xs font-bold ring-1 ring-outline-variant/10 outline-none" />\r\n                                <button (click)="addDependency()"\r\n                                    class="px-4 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors">\r\n                                    <span class="material-symbols-outlined text-sm">link</span>\r\n                                </button>\r\n                            </div>\r\n                            <p class="text-[9px] text-primary/60 font-medium px-1">\r\n                                {{ getSelectedDepDesc() }}\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n                </section>\r\n\r\n                <!-- Initial Comment -->\r\n                <section class="space-y-4">\r\n                    <label class="block text-[10px] font-black uppercase tracking-widest text-outline">Initial Comment /\r\n                        Handover Note</label>\r\n                    <div class="relative">\r\n                        <textarea formControlName="initialComment" rows="2"\r\n                            placeholder="Tag team members or add notes..."\r\n                            class="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary/30 outline-none resize-none"></textarea>\r\n                        <button class="absolute right-3 bottom-3 text-outline hover:text-primary">\r\n                            <span class="material-symbols-outlined text-[20px]">alternate_email</span>\r\n                        </button>\r\n                    </div>\r\n                </section>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- Actions -->\r\n        <!-- <div\r\n            class="px-8 py-6 bg-surface-container-low/80 border-t border-outline-variant/10 flex items-center justify-between shrink-0">\r\n            <div class="flex items-center gap-2 text-outline">\r\n                <span class="material-symbols-outlined text-sm">info</span>\r\n                <span class="text-[10px] font-bold uppercase tracking-widest">New tasks are synced to CPM Engine\r\n                    automatically</span>\r\n            </div>\r\n            <div class="flex gap-4">\r\n                <button (click)="close.emit()"\r\n                    class="px-6 py-2.5 text-sm font-bold text-outline hover:text-on-surface transition-colors cursor-pointer">\r\n                    Discard\r\n                </button>\r\n                <button (click)="onSubmit()" [disabled]="taskForm.invalid"\r\n                    class="px-10 py-3 bg-primary text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 cursor-pointer uppercase tracking-widest">\r\n                    Initialize Task\r\n                </button>\r\n            </div>\r\n        </div> -->\r\n    </div>\r\n\r\n    <!-- Stock Shortage Dialog -->\r\n    <app-common-dialog [open]="showStockDialog && !!stockDialogData" title="Insufficient Stock"\r\n        subtitle="Inventory allocation & shortage request" icon="inventory_2" [showCloseButton]="true"\r\n        [showFooter]="false" [closeOnBackdrop]="false" maxWidth="max-w-md">\r\n\r\n        @if (stockDialogData) {\r\n\r\n        <div class="p-6 space-y-5">\r\n\r\n            <!-- Summary -->\r\n            <div class="grid grid-cols-3 gap-3">\r\n\r\n                <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center">\r\n                    <p class="text-[10px] font-black uppercase text-slate-500">Requested</p>\r\n                    <h4 class="text-2xl font-black text-slate-800 mt-1">\r\n                        {{ newSubTask.qty }}\r\n                    </h4>\r\n                </div>\r\n\r\n                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">\r\n                    <p class="text-[10px] font-black uppercase text-emerald-600">Available</p>\r\n                    <h4 class="text-2xl font-black text-emerald-700 mt-1">\r\n                        {{ stockDialogData.available }}\r\n                    </h4>\r\n                </div>\r\n\r\n                <div class="rounded-2xl bg-orange-50 border border-orange-200 p-4 text-center">\r\n                    <p class="text-[10px] font-black uppercase text-orange-600">Shortage</p>\r\n                    <h4 class="text-2xl font-black text-orange-700 mt-1">\r\n                        {{ stockDialogData.shortage }}\r\n                    </h4>\r\n                </div>\r\n\r\n            </div>\r\n\r\n            <!-- Flow -->\r\n            <div class="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-5">\r\n\r\n                <div class="flex items-center justify-between">\r\n\r\n                    <div class="flex flex-col items-center">\r\n\r\n                        <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">\r\n\r\n                            <span class="material-symbols-outlined text-emerald-600">\r\n                                check_circle\r\n                            </span>\r\n\r\n                        </div>\r\n\r\n                        <p class="mt-2 text-xs font-black text-emerald-700">\r\n                            Allocate\r\n                        </p>\r\n\r\n                        <p class="text-xl font-black text-emerald-700">\r\n                            {{ stockDialogData.available }}\r\n                        </p>\r\n\r\n                    </div>\r\n\r\n                    <span class="material-symbols-outlined text-outline">\r\n                        east\r\n                    </span>\r\n\r\n                    <div class="flex flex-col items-center">\r\n\r\n                        <div class="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">\r\n\r\n                            <span class="material-symbols-outlined text-orange-600">\r\n                                pending\r\n                            </span>\r\n\r\n                        </div>\r\n\r\n                        <p class="mt-2 text-xs font-black text-orange-700">\r\n                            Request\r\n                        </p>\r\n\r\n                        <p class="text-xl font-black text-orange-700">\r\n                            {{ stockDialogData.shortage }}\r\n                        </p>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n\r\n            <!-- Message -->\r\n            <div class="rounded-2xl bg-blue-50 border border-blue-200 p-4 flex gap-3">\r\n\r\n                <span class="material-symbols-outlined text-blue-600">\r\n                    info\r\n                </span>\r\n\r\n                <div>\r\n\r\n                    <p class="text-xs font-black text-blue-700">\r\n                        Automatic Processing\r\n                    </p>\r\n\r\n                    <p class="text-[11px] text-blue-600 mt-1 leading-relaxed">\r\n\r\n                        {{ stockDialogData.available }} units will be allocated immediately.\r\n\r\n                        Remaining {{ stockDialogData.shortage }} units will create a stock\r\n                        request for manager approval.\r\n\r\n                    </p>\r\n\r\n                </div>\r\n\r\n            </div>\r\n\r\n            <!-- Actions -->\r\n            <div class="flex gap-3 pt-2">\r\n\r\n                <button (click)="cancelStockRequest()"\r\n                    class="flex-1 h-12 rounded-2xl border border-slate-300 font-black">\r\n\r\n                    Cancel\r\n\r\n                </button>\r\n\r\n                <button (click)="confirmStockRequest()"\r\n                    class="flex-1 h-12 rounded-2xl bg-primary text-white font-black">\r\n\r\n                    Confirm & Request\r\n\r\n                </button>\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n        }\r\n\r\n    </app-common-dialog>\r\n</app-common-dialog>', styles: ["/* src/app/modules/projects/widgets/add-task/add-task.scss */\n:host {\n  display: block;\n  z-index: 9999;\n}\n/*# sourceMappingURL=add-task.css.map */\n"] }]
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
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddTask, { className: "AddTask", filePath: "app/modules/projects/widgets/add-task/add-task.ts", lineNumber: 16 });
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
var _c02 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
function TaskManagement_For_15_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sm_r1 = ctx.$implicit;
    \u0275\u0275property("ngValue", sm_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u21B3 ", sm_r1.name, " ");
  }
}
function TaskManagement_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(2, TaskManagement_For_15_For_3_Template, 2, 2, "option", 12, _forTrack03);
  }
  if (rf & 2) {
    const ms_r2 = ctx.$implicit;
    \u0275\u0275property("ngValue", ms_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ms_r2.name, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ms_r2.subMilestones);
  }
}
function TaskManagement_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ms_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", ms_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ms_r3.firstname, " ", ms_r3.lastname, " ");
  }
}
function TaskManagement_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 18)(2, "span", 19);
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
function TaskManagement_Conditional_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 28);
    \u0275\u0275element(2, "div", 29);
    \u0275\u0275elementStart(3, "p", 30);
    \u0275\u0275text(4, "Synchronizing Board...");
    \u0275\u0275elementEnd()()();
  }
}
function TaskManagement_Conditional_33_For_4_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function TaskManagement_Conditional_33_For_4_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const column_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r7 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r7.openAddTaskModal(column_r7.title));
    });
    \u0275\u0275elementStart(1, "span", 41);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd()();
  }
}
function TaskManagement_Conditional_33_For_4_For_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 53);
  }
}
function TaskManagement_Conditional_33_For_4_For_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "task");
    \u0275\u0275elementEnd();
  }
}
function TaskManagement_Conditional_33_For_4_For_12_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "chat_bubble");
    \u0275\u0275elementEnd();
  }
}
function TaskManagement_Conditional_33_For_4_For_12_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r10.description);
  }
}
function TaskManagement_Conditional_33_For_4_For_12_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 54)(2, "span", 55);
    \u0275\u0275text(3, "Subtasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 56);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "subtaskProgress");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 57);
    \u0275\u0275element(8, "div", 58);
    \u0275\u0275pipe(9, "subtaskProgress");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(6, 3, task_r10.sub_tasks || \u0275\u0275pureFunction0(7, _c02)), "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", \u0275\u0275pipeBind1(9, 5, task_r10.sub_tasks || \u0275\u0275pureFunction0(8, _c02)), "%");
  }
}
function TaskManagement_Conditional_33_For_4_For_12_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 52);
  }
  if (rf & 2) {
    const assignee_r11 = ctx.$implicit;
    \u0275\u0275property("src", assignee_r11.avatar || "assets/default-avatar.png", \u0275\u0275sanitizeUrl)("title", assignee_r11.firstname);
  }
}
function TaskManagement_Conditional_33_For_4_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275listener("click", function TaskManagement_Conditional_33_For_4_For_12_Template_div_click_0_listener() {
      const task_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r7 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r7.openTaskDetail(task_r10));
    });
    \u0275\u0275template(1, TaskManagement_Conditional_33_For_4_For_12_div_1_Template, 1, 0, "div", 43);
    \u0275\u0275elementStart(2, "div", 44)(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 2);
    \u0275\u0275conditionalCreate(6, TaskManagement_Conditional_33_For_4_For_12_Conditional_6_Template, 2, 0, "span", 45);
    \u0275\u0275conditionalCreate(7, TaskManagement_Conditional_33_For_4_For_12_Conditional_7_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h4");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, TaskManagement_Conditional_33_For_4_For_12_Conditional_10_Template, 2, 1, "p", 46);
    \u0275\u0275conditionalCreate(11, TaskManagement_Conditional_33_For_4_For_12_Conditional_11_Template, 10, 9, "div", 47);
    \u0275\u0275elementStart(12, "div", 48)(13, "div", 49)(14, "span", 50);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 51);
    \u0275\u0275repeaterCreate(19, TaskManagement_Conditional_33_For_4_For_12_For_20_Template, 1, 2, "img", 52, _forTrack03);
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
function TaskManagement_Conditional_33_For_4_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 59);
    \u0275\u0275text(2, "keyboard_double_arrow_down");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", column_r7.tasks.length - 2, " more ");
  }
}
function TaskManagement_Conditional_33_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 31)(2, "div", 32);
    \u0275\u0275element(3, "div");
    \u0275\u0275elementStart(4, "h3", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, TaskManagement_Conditional_33_For_4_button_8_Template, 3, 0, "button", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 36)(10, "div", 37);
    \u0275\u0275listener("cdkDropListDropped", function TaskManagement_Conditional_33_For_4_Template_div_cdkDropListDropped_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r7 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r7.drop($event));
    });
    \u0275\u0275repeaterCreate(11, TaskManagement_Conditional_33_For_4_For_12_Template, 21, 25, "div", 38, _forTrack03);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, TaskManagement_Conditional_33_For_4_Conditional_13_Template, 5, 1, "div", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275classMap("w-2.5 h-2.5 rounded-full " + column_r7.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(column_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(column_r7.count);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", column_r7.title == "To Do");
    \u0275\u0275advance();
    \u0275\u0275property("id", column_r7.id + "-wrapper");
    \u0275\u0275advance();
    \u0275\u0275property("id", column_r7.id)("cdkDropListData", column_r7.tasks);
    \u0275\u0275advance();
    \u0275\u0275repeater(column_r7.tasks);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(column_r7.tasks.length > 2 ? 13 : -1);
  }
}
function TaskManagement_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275conditionalCreate(1, TaskManagement_Conditional_33_Conditional_1_Template, 5, 0, "div", 23);
    \u0275\u0275elementStart(2, "div", 24);
    \u0275\u0275repeaterCreate(3, TaskManagement_Conditional_33_For_4_Template, 14, 9, "div", 25, _forTrack03);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 26);
    \u0275\u0275listener("click", function TaskManagement_Conditional_33_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.openAddTaskModal());
    });
    \u0275\u0275elementStart(6, "span", 27);
    \u0275\u0275text(7, "add");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r7 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r7.loading ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r7.columns);
  }
}
function TaskManagement_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-task-detail", 61);
    \u0275\u0275listener("close", function TaskManagement_Conditional_34_Template_app_task_detail_close_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.closeTaskDetail());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r7 = \u0275\u0275nextContext();
    \u0275\u0275property("task", ctx_r7.selectedTask);
  }
}
function TaskManagement_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-add-task", 62);
    \u0275\u0275listener("close", function TaskManagement_Conditional_35_Template_app_add_task_close_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.showAddTaskModal = false);
    })("save", function TaskManagement_Conditional_35_Template_app_add_task_save_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.addNewTask($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r7 = \u0275\u0275nextContext();
    \u0275\u0275property("projectId", ctx_r7.projectId)("milestoneId", ctx_r7.selectedMilestoneId)("initialStatus", ctx_r7.targetStep);
  }
}
var TaskManagement = class _TaskManagement {
  projectService;
  toastr;
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
  // Subtasks, Attachments, Discussion, History
  selectedMilestoneId = null;
  allTasks = [];
  columns = [
    { id: "todo", title: "To Do", color: "bg-slate-400", count: 0, tasks: [] },
    { id: "inprogress", title: "In Progress", color: "bg-amber-500", count: 0, tasks: [] },
    { id: "review", title: "Review", color: "bg-blue-600", count: 0, tasks: [] },
    { id: "completed", title: "Completed", color: "bg-green-500", count: 0, tasks: [] }
  ];
  constructor(projectService, toastr) {
    this.projectService = projectService;
    this.toastr = toastr;
  }
  ngOnInit() {
    if (this.projectId) {
      this.fetchTasks();
    }
  }
  ngOnChanges(changes) {
    if (changes["milestones"] && this.milestones && this.milestones.length > 0 && !this.selectedMilestoneId) {
      this.selectedMilestoneId = this.milestones[0].id;
      this.filterTasks();
    }
  }
  selectMilestone(milestoneId) {
    this.selectedMilestoneId = milestoneId;
    this.filterTasks();
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
    const filtered = this.allTasks.filter((t) => t.milestone_id === this.selectedMilestoneId);
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
    this.allTasks.push(task);
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
    return new (__ngFactoryType__ || _TaskManagement)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskManagement, selectors: [["app-task-management"]], inputs: { projectId: "projectId", team_members: "team_members", milestones: "milestones" }, features: [\u0275\u0275NgOnChangesFeature], decls: 36, vars: 9, consts: [[1, "mb-10", "mt-4", "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-4", "p-4"], [1, "text-[10px]", "font-extrabold", "uppercase", "tracking-[0.2em]", "text-primary", "mb-2", "block"], [1, "flex", "items-center", "gap-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "items-center", "gap-3", "flex-wrap"], [1, "relative", "flex", "items-center", "gap-3", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "px-4", "py-2", "rounded-xl", "shadow-sm", "min-w-[240px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[18px]"], [1, "w-full", "bg-transparent", "border-none", "text-[11px]", "font-black", "uppercase", "tracking-widest", "text-slate-700", "dark:text-slate-200", "outline-none", "cursor-pointer", "appearance-none", "pr-8", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [1, "material-symbols-outlined", "absolute", "right-4", "text-slate-400", "text-[18px]", "pointer-events-none"], [1, "relative", "flex", "items-center", "gap-3", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "px-4", "py-2", "rounded-xl", "shadow-sm", "min-w-[220px]"], ["value", "All Members"], [3, "ngValue"], [1, "flex", "items-center", "gap-2", "px-5", "py-[11px]", "bg-white", "dark:bg-slate-900", "text-slate-900", "dark:text-white", "text-sm", "font-bold", "rounded-xl", "shadow-sm", "hover:shadow-md", "transition-all", "border", "border-slate-200", "dark:border-slate-800", "cursor-pointer", "disabled:opacity-60", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-lg"], [1, "flex", "flex-col", "items-center", "justify-center", "min-h-[400px]", "border-2", "border-dashed", "border-slate-200", "rounded-3xl", "bg-slate-50/50"], [3, "task"], [3, "projectId", "milestoneId", "initialStatus"], [1, "w-16", "h-16", "bg-blue-100", "text-blue-600", "rounded-2xl", "flex", "items-center", "justify-center", "mb-4"], [1, "material-symbols-outlined", "text-3xl"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-900", "mb-2"], [1, "text-sm", "font-bold", "text-slate-500", "uppercase", "tracking-widest", "max-w-sm", "text-center"], [1, "relative"], [1, "absolute", "inset-0", "z-10", "bg-white/50", "backdrop-blur-[1px]", "flex", "items-center", "justify-center", "rounded-3xl"], ["cdkDropListGroup", "", 1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-6"], [1, "flex", "flex-col", "gap-4"], [1, "fixed", "bottom-8", "right-8", "w-14", "h-14", "rounded-2xl", "bg-linear-to-br", "from-primary", "to-primary-container", "text-white", "shadow-2xl", "shadow-primary/40", "flex", "items-center", "justify-center", "active:scale-90", "transition-all", "z-50", "group", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-3xl", "transition-transform", "group-hover:rotate-90"], [1, "flex", "flex-col", "items-center"], [1, "w-12", "h-12", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "mt-4", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest"], [1, "flex", "items-center", "justify-between", "px-2"], [1, "flex", "items-center", "gap-3"], [1, "text-sm", "font-black", "uppercase", "tracking-widest", "text-slate-500"], [1, "px-2", "py-0.5", "rounded-full", "bg-slate-100", "text-[10px]", "font-black", "text-slate-500"], ["class", "text-slate-400 hover:text-blue-600 transition-colors cursor-pointer", 3, "click", 4, "ngIf"], [1, "kanban-column-scroll", 3, "id"], ["cdkDropList", "", 1, "flex", "flex-col", "gap-4", "min-h-[200px]", 3, "cdkDropListDropped", "id", "cdkDropListData"], ["cdkDrag", "", 3, "class"], [1, "scroll-hint", "flex", "items-center", "justify-center", "gap-1.5", "pt-1"], [1, "text-slate-400", "hover:text-blue-600", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined"], ["cdkDrag", "", 3, "click"], ["class", "cdk-drag-placeholder", 4, "cdkDragPlaceholder"], [1, "flex", "justify-between", "items-start", "mb-4"], [1, "material-symbols-outlined", "text-slate-400", "text-xs"], [1, "text-xs", "text-slate-500", "mb-6", "line-clamp-2"], [1, "mb-4"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2", "text-[10px]", "font-bold"], [1, "material-symbols-outlined", "text-sm"], [1, "flex", "-space-x-2"], [1, "w-6", "h-6", "rounded-lg", "ring-2", "ring-white", "object-cover", 3, "src", "title"], [1, "cdk-drag-placeholder"], [1, "flex", "justify-between", "items-center", "mb-1"], [1, "text-[10px]", "font-bold", "text-slate-400", "uppercase"], [1, "text-[10px]", "font-bold", "text-slate-500"], [1, "w-full", "bg-slate-100", "h-1", "rounded-full"], [1, "bg-primary", "h-1", "rounded-full", "transition-all"], [1, "material-symbols-outlined", "text-slate-300", "text-base"], [1, "text-[10px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest"], [3, "close", "task"], [3, "close", "save", "projectId", "milestoneId", "initialStatus"]], template: function TaskManagement_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "span", 1);
      \u0275\u0275text(3, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "h2", 3);
      \u0275\u0275text(6, "Task Management");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "span", 6);
      \u0275\u0275text(10, " flag ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "select", 7);
      \u0275\u0275listener("ngModelChange", function TaskManagement_Template_select_ngModelChange_11_listener($event) {
        return ctx.selectMilestone($event);
      });
      \u0275\u0275elementStart(12, "option", 8);
      \u0275\u0275text(13, " Select Milestone ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(14, TaskManagement_For_15_Template, 4, 2, null, null, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 9);
      \u0275\u0275text(17, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 10)(19, "span", 6);
      \u0275\u0275text(20, " filter_alt ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function TaskManagement_Template_select_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedMember, $event) || (ctx.selectedMember = $event);
        return $event;
      });
      \u0275\u0275elementStart(22, "option", 11);
      \u0275\u0275text(23, " All Members ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(24, TaskManagement_For_25_Template, 2, 3, "option", 12, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 9);
      \u0275\u0275text(27, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 13);
      \u0275\u0275listener("click", function TaskManagement_Template_button_click_28_listener() {
        return ctx.fetchTasks();
      });
      \u0275\u0275elementStart(29, "span", 14);
      \u0275\u0275text(30, " sync ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(31, " Refresh ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(32, TaskManagement_Conditional_32_Template, 8, 0, "div", 15)(33, TaskManagement_Conditional_33_Template, 8, 1);
      \u0275\u0275conditionalCreate(34, TaskManagement_Conditional_34_Template, 1, 1, "app-task-detail", 16);
      \u0275\u0275conditionalCreate(35, TaskManagement_Conditional_35_Template, 1, 3, "app-add-task", 17);
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("ngModel", ctx.selectedMilestoneId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.milestones);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedMember);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.team_members);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275classProp("animate-spin", ctx.loading);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.selectedMilestoneId ? 32 : 33);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedTask ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAddTaskModal ? 35 : -1);
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
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
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
    ], template: `<div class="mb-10 mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4 p-4">\r
    <div>\r
        <span class="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-2 block">Project</span>\r
        <div class="flex items-center gap-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Task Management</h2>\r
        </div>\r
    </div>\r
    <div class="flex items-center gap-3 flex-wrap">\r
\r
        <div\r
            class="relative flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm min-w-[240px]">\r
\r
            <span class="material-symbols-outlined text-slate-400 text-[18px]">\r
                flag\r
            </span>\r
\r
            <select [ngModel]="selectedMilestoneId" (ngModelChange)="selectMilestone($event)"\r
                class="w-full bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-8">\r
\r
                <option [ngValue]="null" disabled>\r
                    Select Milestone\r
                </option>\r
\r
                @for(ms of milestones; track ms.id) {\r
\r
                <option [ngValue]="ms.id">\r
                    {{ ms.name }}\r
                </option>\r
\r
                @for(sm of ms.subMilestones; track sm.id) {\r
\r
                <option [ngValue]="sm.id">\r
                    \u21B3 {{ sm.name }}\r
                </option>\r
\r
                }\r
\r
                }\r
\r
            </select>\r
\r
            <span class="material-symbols-outlined absolute right-4 text-slate-400 text-[18px] pointer-events-none">\r
                expand_more\r
            </span>\r
\r
        </div>\r
\r
        <div\r
            class="relative flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm min-w-[220px]">\r
\r
            <span class="material-symbols-outlined text-slate-400 text-[18px]">\r
                filter_alt\r
            </span>\r
\r
            <select [(ngModel)]="selectedMember"\r
                class="w-full bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-8">\r
\r
                <option value="All Members">\r
                    All Members\r
                </option>\r
\r
                @for(ms of team_members; track ms.id) {\r
\r
                <option [ngValue]="ms.id">\r
                    {{ ms.firstname }} {{ ms.lastname }}\r
                </option>\r
\r
                }\r
\r
            </select>\r
\r
            <span class="material-symbols-outlined absolute right-4 text-slate-400 text-[18px] pointer-events-none">\r
                expand_more\r
            </span>\r
\r
        </div>\r
        <button (click)="fetchTasks()" [disabled]="loading"\r
            class="flex items-center gap-2 px-5 py-[11px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-800 cursor-pointer disabled:opacity-60">\r
\r
            <span class="material-symbols-outlined text-lg" [class.animate-spin]="loading">\r
                sync\r
            </span>\r
\r
            Refresh\r
\r
        </button>\r
\r
    </div>\r
</div>\r
\r
@if (!selectedMilestoneId) {\r
<div\r
    class="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">\r
    <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">\r
        <span class="material-symbols-outlined text-3xl">task</span>\r
    </div>\r
    <h3 class="text-lg font-black tracking-tight text-slate-900 mb-2">Select a Milestone to View Tasks</h3>\r
    <p class="text-sm font-bold text-slate-500 uppercase tracking-widest max-w-sm text-center">Tasks are organized by\r
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
                <div cdkDropList [id]="column.id" [cdkDropListData]="column.tasks" (cdkDropListDropped)="drop($event)"\r
                    class="flex flex-col gap-4 min-h-[200px]">\r
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
                                    [src]="assignee.avatar || 'assets/default-avatar.png'"\r
                                    [title]="assignee.firstname" />\r
                                }\r
                            </div>\r
                        </div>\r
                    </div>\r
                    }\r
\r
                </div>\r
            </div>\r
\r
            @if (column.tasks.length > 2) {\r
            <div class="scroll-hint flex items-center justify-center gap-1.5 pt-1">\r
                <span class="material-symbols-outlined text-slate-300 text-base">keyboard_double_arrow_down</span>\r
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">\r
                    {{ column.tasks.length - 2 }} more\r
                </span>\r
            </div>\r
            }\r
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
}`, styles: ["/* src/app/modules/projects/widgets/task-management/task-management.scss */\n.cdk-drag-preview {\n  box-sizing: border-box;\n  border-radius: 20px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  opacity: 0.9;\n  cursor: grabbing;\n}\n.cdk-drag-placeholder {\n  opacity: 0;\n}\n.cdk-drag-animating {\n  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n.cdk-drop-list-dragging .cdk-drag {\n  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n.glass-card {\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n}\n.kanban-column-scroll {\n  max-height: 430px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-right: 4px;\n  border-radius: 16px;\n}\n.kanban-column-scroll::-webkit-scrollbar {\n  width: 5px;\n}\n.kanban-column-scroll::-webkit-scrollbar-track {\n  background: transparent;\n}\n.kanban-column-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 999px;\n  transition: background 0.2s;\n}\n.kanban-column-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n.kanban-column-scroll {\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n}\n.kanban-column-scroll {\n  -webkit-mask-image:\n    linear-gradient(\n      to bottom,\n      black 0%,\n      black 82%,\n      transparent 100%);\n  mask-image:\n    linear-gradient(\n      to bottom,\n      black 0%,\n      black 82%,\n      transparent 100%);\n}\n.kanban-column-scroll:hover,\n.kanban-column-scroll.scrolled-to-bottom {\n  -webkit-mask-image: none;\n  mask-image: none;\n}\n.scroll-hint {\n  animation: bob 1.8s ease-in-out infinite;\n  opacity: 0.7;\n}\n@keyframes bob {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(3px);\n  }\n}\n:host-context(.dark) .glass-card {\n  background: rgba(30, 41, 59, 0.75);\n  border-color: rgba(255, 255, 255, 0.08);\n}\n:host-context(.dark) .kanban-column-scroll::-webkit-scrollbar-thumb {\n  background: #475569;\n}\n:host-context(.dark) .kanban-column-scroll::-webkit-scrollbar-thumb:hover {\n  background: #64748b;\n}\n:host-context(.dark) .kanban-column-scroll {\n  scrollbar-color: #475569 transparent;\n}\n/*# sourceMappingURL=task-management.css.map */\n"] }]
  }], () => [{ type: ProjectService }, { type: ToastrService }], { projectId: [{
    type: Input
  }], team_members: [{
    type: Input
  }], milestones: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskManagement, { className: "TaskManagement", filePath: "app/modules/projects/widgets/task-management/task-management.ts", lineNumber: 35 });
})();

export {
  DragDropModule,
  TaskManagement
};
//# sourceMappingURL=chunk-V5A7NUGT.js.map
