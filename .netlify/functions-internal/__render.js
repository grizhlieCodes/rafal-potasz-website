var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var ponyfill_es2018 = { exports: {} };
(function(module2, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
    function noop2() {
      return void 0;
    }
    function getGlobals() {
      if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else if (typeof commonjsGlobal !== "undefined") {
        return commonjsGlobal;
      }
      return void 0;
    }
    const globals = getGlobals();
    function typeIsObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    const rethrowAssertionErrorRejection = noop2;
    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
      return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
      return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
      return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
      return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
      PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
      uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
      uponPromise(promise, void 0, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
      return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
      PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
      const globalQueueMicrotask = globals && globals.queueMicrotask;
      if (typeof globalQueueMicrotask === "function") {
        return globalQueueMicrotask;
      }
      const resolvedPromise = promiseResolvedWith(void 0);
      return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V, args) {
      if (typeof F !== "function") {
        throw new TypeError("Argument is not a function");
      }
      return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
      try {
        return promiseResolvedWith(reflectCall(F, V, args));
      } catch (value) {
        return promiseRejectedWith(value);
      }
    }
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    class SimpleQueue {
      constructor() {
        this._cursor = 0;
        this._size = 0;
        this._front = {
          _elements: [],
          _next: void 0
        };
        this._back = this._front;
        this._cursor = 0;
        this._size = 0;
      }
      get length() {
        return this._size;
      }
      push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
          newBack = {
            _elements: [],
            _next: void 0
          };
        }
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
          this._back = newBack;
          oldBack._next = newBack;
        }
        ++this._size;
      }
      shift() {
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
          newFront = oldFront._next;
          newCursor = 0;
        }
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
          this._front = newFront;
        }
        elements[oldCursor] = void 0;
        return element;
      }
      forEach(callback) {
        let i = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i !== elements.length || node._next !== void 0) {
          if (i === elements.length) {
            node = node._next;
            elements = node._elements;
            i = 0;
            if (elements.length === 0) {
              break;
            }
          }
          callback(elements[i]);
          ++i;
        }
      }
      peek() {
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
      }
    }
    function ReadableStreamReaderGenericInitialize(reader, stream) {
      reader._ownerReadableStream = stream;
      stream._reader = reader;
      if (stream._state === "readable") {
        defaultReaderClosedPromiseInitialize(reader);
      } else if (stream._state === "closed") {
        defaultReaderClosedPromiseInitializeAsResolved(reader);
      } else {
        defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
      }
    }
    function ReadableStreamReaderGenericCancel(reader, reason) {
      const stream = reader._ownerReadableStream;
      return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
      if (reader._ownerReadableStream._state === "readable") {
        defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      } else {
        defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      }
      reader._ownerReadableStream._reader = void 0;
      reader._ownerReadableStream = void 0;
    }
    function readerLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released reader");
    }
    function defaultReaderClosedPromiseInitialize(reader) {
      reader._closedPromise = newPromise((resolve2, reject) => {
        reader._closedPromise_resolve = resolve2;
        reader._closedPromise_reject = reject;
      });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
      if (reader._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(reader._closedPromise);
      reader._closedPromise_reject(reason);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
      defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
      if (reader._closedPromise_resolve === void 0) {
        return;
      }
      reader._closedPromise_resolve(void 0);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
    const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
    const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
    const PullSteps = SymbolPolyfill("[[PullSteps]]");
    const NumberIsFinite = Number.isFinite || function(x) {
      return typeof x === "number" && isFinite(x);
    };
    const MathTrunc = Math.trunc || function(v) {
      return v < 0 ? Math.ceil(v) : Math.floor(v);
    };
    function isDictionary(x) {
      return typeof x === "object" || typeof x === "function";
    }
    function assertDictionary(obj, context) {
      if (obj !== void 0 && !isDictionary(obj)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertFunction(x, context) {
      if (typeof x !== "function") {
        throw new TypeError(`${context} is not a function.`);
      }
    }
    function isObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    function assertObject(x, context) {
      if (!isObject(x)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertRequiredArgument(x, position, context) {
      if (x === void 0) {
        throw new TypeError(`Parameter ${position} is required in '${context}'.`);
      }
    }
    function assertRequiredField(x, field, context) {
      if (x === void 0) {
        throw new TypeError(`${field} is required in '${context}'.`);
      }
    }
    function convertUnrestrictedDouble(value) {
      return Number(value);
    }
    function censorNegativeZero(x) {
      return x === 0 ? 0 : x;
    }
    function integerPart(x) {
      return censorNegativeZero(MathTrunc(x));
    }
    function convertUnsignedLongLongWithEnforceRange(value, context) {
      const lowerBound = 0;
      const upperBound = Number.MAX_SAFE_INTEGER;
      let x = Number(value);
      x = censorNegativeZero(x);
      if (!NumberIsFinite(x)) {
        throw new TypeError(`${context} is not a finite number`);
      }
      x = integerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
      }
      if (!NumberIsFinite(x) || x === 0) {
        return 0;
      }
      return x;
    }
    function assertReadableStream(x, context) {
      if (!IsReadableStream(x)) {
        throw new TypeError(`${context} is not a ReadableStream.`);
      }
    }
    function AcquireReadableStreamDefaultReader(stream) {
      return new ReadableStreamDefaultReader(stream);
    }
    function ReadableStreamAddReadRequest(stream, readRequest) {
      stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readRequest = reader._readRequests.shift();
      if (done) {
        readRequest._closeSteps();
      } else {
        readRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadRequests(stream) {
      return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamDefaultReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamDefaultReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("read"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: () => resolvePromise({ value: void 0, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
          throw defaultReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: true
      });
    }
    function IsReadableStreamDefaultReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readRequests")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "closed") {
        readRequest._closeSteps();
      } else if (stream._state === "errored") {
        readRequest._errorSteps(stream._storedError);
      } else {
        stream._readableStreamController[PullSteps](readRequest);
      }
    }
    function defaultReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    class ReadableStreamAsyncIteratorImpl {
      constructor(reader, preventCancel) {
        this._ongoingPromise = void 0;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
      }
      next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
        return this._ongoingPromise;
      }
      return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
      }
      _nextSteps() {
        if (this._isFinished) {
          return Promise.resolve({ value: void 0, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("iterate"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => {
            this._ongoingPromise = void 0;
            queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
          },
          _closeSteps: () => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            resolvePromise({ value: void 0, done: true });
          },
          _errorSteps: (reason) => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            rejectPromise(reason);
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
      }
      _returnSteps(value) {
        if (this._isFinished) {
          return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("finish iterating"));
        }
        if (!this._preventCancel) {
          const result = ReadableStreamReaderGenericCancel(reader, value);
          ReadableStreamReaderGenericRelease(reader);
          return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
      }
    }
    const ReadableStreamAsyncIteratorPrototype = {
      next() {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
        }
        return this._asyncIteratorImpl.next();
      },
      return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
        }
        return this._asyncIteratorImpl.return(value);
      }
    };
    if (AsyncIteratorPrototype !== void 0) {
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
      const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
      iterator._asyncIteratorImpl = impl;
      return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_asyncIteratorImpl")) {
        return false;
      }
      try {
        return x._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
      } catch (_a) {
        return false;
      }
    }
    function streamAsyncIteratorBrandCheckException(name) {
      return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }
    const NumberIsNaN = Number.isNaN || function(x) {
      return x !== x;
    };
    function CreateArrayFromList(elements) {
      return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src2, srcOffset, n) {
      new Uint8Array(dest).set(new Uint8Array(src2, srcOffset, n), destOffset);
    }
    function TransferArrayBuffer(O) {
      return O;
    }
    function IsDetachedBuffer(O) {
      return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
      if (buffer.slice) {
        return buffer.slice(begin, end);
      }
      const length = end - begin;
      const slice = new ArrayBuffer(length);
      CopyDataBlockBytes(slice, 0, buffer, begin, length);
      return slice;
    }
    function IsNonNegativeNumber(v) {
      if (typeof v !== "number") {
        return false;
      }
      if (NumberIsNaN(v)) {
        return false;
      }
      if (v < 0) {
        return false;
      }
      return true;
    }
    function CloneAsUint8Array(O) {
      const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
      return new Uint8Array(buffer);
    }
    function DequeueValue(container) {
      const pair = container._queue.shift();
      container._queueTotalSize -= pair.size;
      if (container._queueTotalSize < 0) {
        container._queueTotalSize = 0;
      }
      return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
      if (!IsNonNegativeNumber(size) || size === Infinity) {
        throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
      }
      container._queue.push({ value, size });
      container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
      const pair = container._queue.peek();
      return pair.value;
    }
    function ResetQueue(container) {
      container._queue = new SimpleQueue();
      container._queueTotalSize = 0;
    }
    class ReadableStreamBYOBRequest {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("view");
        }
        return this._view;
      }
      respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respond");
        }
        assertRequiredArgument(bytesWritten, 1, "respond");
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(this._view.buffer))
          ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
      }
      respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respondWithNewView");
        }
        assertRequiredArgument(view, 1, "respondWithNewView");
        if (!ArrayBuffer.isView(view)) {
          throw new TypeError("You can only respond with array buffer views");
        }
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
      }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
      respond: { enumerable: true },
      respondWithNewView: { enumerable: true },
      view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: true
      });
    }
    class ReadableByteStreamController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("byobRequest");
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
      }
      get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("desiredSize");
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("close");
        }
        if (this._closeRequested) {
          throw new TypeError("The stream has already been closed; do not close it again!");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
      }
      enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("enqueue");
        }
        assertRequiredArgument(chunk, 1, "enqueue");
        if (!ArrayBuffer.isView(chunk)) {
          throw new TypeError("chunk must be an array buffer view");
        }
        if (chunk.byteLength === 0) {
          throw new TypeError("chunk must have non-zero byteLength");
        }
        if (chunk.buffer.byteLength === 0) {
          throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
          throw new TypeError("stream is closed or draining");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("error");
        }
        ReadableByteStreamControllerError(this, e);
      }
      [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
          const entry = this._queue.shift();
          this._queueTotalSize -= entry.byteLength;
          ReadableByteStreamControllerHandleQueueDrain(this);
          const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
          readRequest._chunkSteps(view);
          return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== void 0) {
          let buffer;
          try {
            buffer = new ArrayBuffer(autoAllocateChunkSize);
          } catch (bufferE) {
            readRequest._errorSteps(bufferE);
            return;
          }
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: autoAllocateChunkSize,
            byteOffset: 0,
            byteLength: autoAllocateChunkSize,
            bytesFilled: 0,
            elementSize: 1,
            viewConstructor: Uint8Array,
            readerType: "default"
          };
          this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
      }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      byobRequest: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: true
      });
    }
    function IsReadableByteStreamController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableByteStream")) {
        return false;
      }
      return x instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_associatedReadableByteStreamController")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableByteStreamControllerError(controller, e);
      });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
      let done = false;
      if (stream._state === "closed") {
        done = true;
      }
      const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      if (pullIntoDescriptor.readerType === "default") {
        ReadableStreamFulfillReadRequest(stream, filledView, done);
      } else {
        ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
      }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
      const bytesFilled = pullIntoDescriptor.bytesFilled;
      const elementSize = pullIntoDescriptor.elementSize;
      return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
      controller._queue.push({ buffer, byteOffset, byteLength });
      controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
      const elementSize = pullIntoDescriptor.elementSize;
      const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
      const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
      const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
      const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
      let totalBytesToCopyRemaining = maxBytesToCopy;
      let ready = false;
      if (maxAlignedBytes > currentAlignedBytes) {
        totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
        ready = true;
      }
      const queue = controller._queue;
      while (totalBytesToCopyRemaining > 0) {
        const headOfQueue = queue.peek();
        const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
        const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
        if (headOfQueue.byteLength === bytesToCopy) {
          queue.shift();
        } else {
          headOfQueue.byteOffset += bytesToCopy;
          headOfQueue.byteLength -= bytesToCopy;
        }
        controller._queueTotalSize -= bytesToCopy;
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
        totalBytesToCopyRemaining -= bytesToCopy;
      }
      return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
      pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
      if (controller._queueTotalSize === 0 && controller._closeRequested) {
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(controller._controlledReadableByteStream);
      } else {
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
      if (controller._byobRequest === null) {
        return;
      }
      controller._byobRequest._associatedReadableByteStreamController = void 0;
      controller._byobRequest._view = null;
      controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
      while (controller._pendingPullIntos.length > 0) {
        if (controller._queueTotalSize === 0) {
          return;
        }
        const pullIntoDescriptor = controller._pendingPullIntos.peek();
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
      const stream = controller._controlledReadableByteStream;
      let elementSize = 1;
      if (view.constructor !== DataView) {
        elementSize = view.constructor.BYTES_PER_ELEMENT;
      }
      const ctor = view.constructor;
      const buffer = TransferArrayBuffer(view.buffer);
      const pullIntoDescriptor = {
        buffer,
        bufferByteLength: buffer.byteLength,
        byteOffset: view.byteOffset,
        byteLength: view.byteLength,
        bytesFilled: 0,
        elementSize,
        viewConstructor: ctor,
        readerType: "byob"
      };
      if (controller._pendingPullIntos.length > 0) {
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        return;
      }
      if (stream._state === "closed") {
        const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
        readIntoRequest._closeSteps(emptyView);
        return;
      }
      if (controller._queueTotalSize > 0) {
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          ReadableByteStreamControllerHandleQueueDrain(controller);
          readIntoRequest._chunkSteps(filledView);
          return;
        }
        if (controller._closeRequested) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          readIntoRequest._errorSteps(e);
          return;
        }
      }
      controller._pendingPullIntos.push(pullIntoDescriptor);
      ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
      const stream = controller._controlledReadableByteStream;
      if (ReadableStreamHasBYOBReader(stream)) {
        while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
      ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
      if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
        return;
      }
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
      if (remainderSize > 0) {
        const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
      }
      pullIntoDescriptor.bytesFilled -= remainderSize;
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
      ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        ReadableByteStreamControllerRespondInClosedState(controller);
      } else {
        ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
      const descriptor = controller._pendingPullIntos.shift();
      return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return false;
      }
      if (controller._closeRequested) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
    }
    function ReadableByteStreamControllerClose(controller) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      if (controller._queueTotalSize > 0) {
        controller._closeRequested = true;
        return;
      }
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (firstPendingPullInto.bytesFilled > 0) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          throw e;
        }
      }
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      const buffer = chunk.buffer;
      const byteOffset = chunk.byteOffset;
      const byteLength = chunk.byteLength;
      const transferredBuffer = TransferArrayBuffer(buffer);
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (IsDetachedBuffer(firstPendingPullInto.buffer))
          ;
        firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
      }
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      if (ReadableStreamHasDefaultReader(stream)) {
        if (ReadableStreamGetNumReadRequests(stream) === 0) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        } else {
          const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
          ReadableStreamFulfillReadRequest(stream, transferredView, false);
        }
      } else if (ReadableStreamHasBYOBReader(stream)) {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      } else {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return;
      }
      ReadableByteStreamControllerClearPendingPullIntos(controller);
      ResetQueue(controller);
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
      if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
        controller._byobRequest = byobRequest;
      }
      return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableByteStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (bytesWritten !== 0) {
          throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        }
      } else {
        if (bytesWritten === 0) {
          throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
        }
        if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
          throw new RangeError("bytesWritten out of range");
        }
      }
      firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
      ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (view.byteLength !== 0) {
          throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        }
      } else {
        if (view.byteLength === 0) {
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        }
      }
      if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
        throw new RangeError("The region specified by view does not match byobRequest");
      }
      if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
        throw new RangeError("The buffer of view has different capacity than byobRequest");
      }
      if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
        throw new RangeError("The region specified by view is larger than byobRequest");
      }
      firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
      ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
      controller._controlledReadableByteStream = stream;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._byobRequest = null;
      controller._queue = controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._closeRequested = false;
      controller._started = false;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      controller._autoAllocateChunkSize = autoAllocateChunkSize;
      controller._pendingPullIntos = new SimpleQueue();
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableByteStreamControllerError(controller, r);
      });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
      const controller = Object.create(ReadableByteStreamController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingByteSource.start !== void 0) {
        startAlgorithm = () => underlyingByteSource.start(controller);
      }
      if (underlyingByteSource.pull !== void 0) {
        pullAlgorithm = () => underlyingByteSource.pull(controller);
      }
      if (underlyingByteSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
      }
      const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
      if (autoAllocateChunkSize === 0) {
        throw new TypeError("autoAllocateChunkSize must be greater than 0");
      }
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
      request._associatedReadableByteStreamController = controller;
      request._view = view;
    }
    function byobRequestBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    function byteStreamControllerBrandCheckException(name) {
      return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }
    function AcquireReadableStreamBYOBReader(stream) {
      return new ReadableStreamBYOBReader(stream);
    }
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
      stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readIntoRequest = reader._readIntoRequests.shift();
      if (done) {
        readIntoRequest._closeSteps(chunk);
      } else {
        readIntoRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
      return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamBYOBReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamBYOBReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
          throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("read"));
        }
        if (!ArrayBuffer.isView(view)) {
          return promiseRejectedWith(new TypeError("view must be an array buffer view"));
        }
        if (view.byteLength === 0) {
          return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
        }
        if (view.buffer.byteLength === 0) {
          return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readIntoRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
          throw byobReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readIntoRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: true
      });
    }
    function IsReadableStreamBYOBReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readIntoRequests")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "errored") {
        readIntoRequest._errorSteps(stream._storedError);
      } else {
        ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
      }
    }
    function byobReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }
    function ExtractHighWaterMark(strategy, defaultHWM) {
      const { highWaterMark } = strategy;
      if (highWaterMark === void 0) {
        return defaultHWM;
      }
      if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
        throw new RangeError("Invalid highWaterMark");
      }
      return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
      const { size } = strategy;
      if (!size) {
        return () => 1;
      }
      return size;
    }
    function convertQueuingStrategy(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
      return {
        highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
        size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
      };
    }
    function convertQueuingStrategySize(fn, context) {
      assertFunction(fn, context);
      return (chunk) => convertUnrestrictedDouble(fn(chunk));
    }
    function convertUnderlyingSink(original, context) {
      assertDictionary(original, context);
      const abort = original === null || original === void 0 ? void 0 : original.abort;
      const close = original === null || original === void 0 ? void 0 : original.close;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      const write = original === null || original === void 0 ? void 0 : original.write;
      return {
        abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
        close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
        write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
        type
      };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
      assertFunction(fn, context);
      return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    function assertWritableStream(x, context) {
      if (!IsWritableStream(x)) {
        throw new TypeError(`${context} is not a WritableStream.`);
      }
    }
    function isAbortSignal2(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      try {
        return typeof value.aborted === "boolean";
      } catch (_a) {
        return false;
      }
    }
    const supportsAbortController = typeof AbortController === "function";
    function createAbortController() {
      if (supportsAbortController) {
        return new AbortController();
      }
      return void 0;
    }
    class WritableStream {
      constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === void 0) {
          rawUnderlyingSink = null;
        } else {
          assertObject(rawUnderlyingSink, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== void 0) {
          throw new RangeError("Invalid type is specified");
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
      }
      get locked() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("locked");
        }
        return IsWritableStreamLocked(this);
      }
      abort(reason = void 0) {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("abort"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
        }
        return WritableStreamAbort(this, reason);
      }
      close() {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("close"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamClose(this);
      }
      getWriter() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("getWriter");
        }
        return AcquireWritableStreamDefaultWriter(this);
      }
    }
    Object.defineProperties(WritableStream.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      getWriter: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStream",
        configurable: true
      });
    }
    function AcquireWritableStreamDefaultWriter(stream) {
      return new WritableStreamDefaultWriter(stream);
    }
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(WritableStream.prototype);
      InitializeWritableStream(stream);
      const controller = Object.create(WritableStreamDefaultController.prototype);
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function InitializeWritableStream(stream) {
      stream._state = "writable";
      stream._storedError = void 0;
      stream._writer = void 0;
      stream._writableStreamController = void 0;
      stream._writeRequests = new SimpleQueue();
      stream._inFlightWriteRequest = void 0;
      stream._closeRequest = void 0;
      stream._inFlightCloseRequest = void 0;
      stream._pendingAbortRequest = void 0;
      stream._backpressure = false;
    }
    function IsWritableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_writableStreamController")) {
        return false;
      }
      return x instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
      if (stream._writer === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamAbort(stream, reason) {
      var _a;
      if (stream._state === "closed" || stream._state === "errored") {
        return promiseResolvedWith(void 0);
      }
      stream._writableStreamController._abortReason = reason;
      (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseResolvedWith(void 0);
      }
      if (stream._pendingAbortRequest !== void 0) {
        return stream._pendingAbortRequest._promise;
      }
      let wasAlreadyErroring = false;
      if (state === "erroring") {
        wasAlreadyErroring = true;
        reason = void 0;
      }
      const promise = newPromise((resolve2, reject) => {
        stream._pendingAbortRequest = {
          _promise: void 0,
          _resolve: resolve2,
          _reject: reject,
          _reason: reason,
          _wasAlreadyErroring: wasAlreadyErroring
        };
      });
      stream._pendingAbortRequest._promise = promise;
      if (!wasAlreadyErroring) {
        WritableStreamStartErroring(stream, reason);
      }
      return promise;
    }
    function WritableStreamClose(stream) {
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
      }
      const promise = newPromise((resolve2, reject) => {
        const closeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._closeRequest = closeRequest;
      });
      const writer = stream._writer;
      if (writer !== void 0 && stream._backpressure && state === "writable") {
        defaultWriterReadyPromiseResolve(writer);
      }
      WritableStreamDefaultControllerClose(stream._writableStreamController);
      return promise;
    }
    function WritableStreamAddWriteRequest(stream) {
      const promise = newPromise((resolve2, reject) => {
        const writeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._writeRequests.push(writeRequest);
      });
      return promise;
    }
    function WritableStreamDealWithRejection(stream, error2) {
      const state = stream._state;
      if (state === "writable") {
        WritableStreamStartErroring(stream, error2);
        return;
      }
      WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
      const controller = stream._writableStreamController;
      stream._state = "erroring";
      stream._storedError = reason;
      const writer = stream._writer;
      if (writer !== void 0) {
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
      }
      if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
        WritableStreamFinishErroring(stream);
      }
    }
    function WritableStreamFinishErroring(stream) {
      stream._state = "errored";
      stream._writableStreamController[ErrorSteps]();
      const storedError = stream._storedError;
      stream._writeRequests.forEach((writeRequest) => {
        writeRequest._reject(storedError);
      });
      stream._writeRequests = new SimpleQueue();
      if (stream._pendingAbortRequest === void 0) {
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const abortRequest = stream._pendingAbortRequest;
      stream._pendingAbortRequest = void 0;
      if (abortRequest._wasAlreadyErroring) {
        abortRequest._reject(storedError);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
      uponPromise(promise, () => {
        abortRequest._resolve();
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      }, (reason) => {
        abortRequest._reject(reason);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      });
    }
    function WritableStreamFinishInFlightWrite(stream) {
      stream._inFlightWriteRequest._resolve(void 0);
      stream._inFlightWriteRequest = void 0;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error2) {
      stream._inFlightWriteRequest._reject(error2);
      stream._inFlightWriteRequest = void 0;
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamFinishInFlightClose(stream) {
      stream._inFlightCloseRequest._resolve(void 0);
      stream._inFlightCloseRequest = void 0;
      const state = stream._state;
      if (state === "erroring") {
        stream._storedError = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._resolve();
          stream._pendingAbortRequest = void 0;
        }
      }
      stream._state = "closed";
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseResolve(writer);
      }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error2) {
      stream._inFlightCloseRequest._reject(error2);
      stream._inFlightCloseRequest = void 0;
      if (stream._pendingAbortRequest !== void 0) {
        stream._pendingAbortRequest._reject(error2);
        stream._pendingAbortRequest = void 0;
      }
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamCloseQueuedOrInFlight(stream) {
      if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
      if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
      stream._inFlightCloseRequest = stream._closeRequest;
      stream._closeRequest = void 0;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
      stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
      if (stream._closeRequest !== void 0) {
        stream._closeRequest._reject(stream._storedError);
        stream._closeRequest = void 0;
      }
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseReject(writer, stream._storedError);
      }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
      const writer = stream._writer;
      if (writer !== void 0 && backpressure !== stream._backpressure) {
        if (backpressure) {
          defaultWriterReadyPromiseReset(writer);
        } else {
          defaultWriterReadyPromiseResolve(writer);
        }
      }
      stream._backpressure = backpressure;
    }
    class WritableStreamDefaultWriter {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
        assertWritableStream(stream, "First parameter");
        if (IsWritableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === "writable") {
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
            defaultWriterReadyPromiseInitialize(this);
          } else {
            defaultWriterReadyPromiseInitializeAsResolved(this);
          }
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "erroring") {
          defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "closed") {
          defaultWriterReadyPromiseInitializeAsResolved(this);
          defaultWriterClosedPromiseInitializeAsResolved(this);
        } else {
          const storedError = stream._storedError;
          defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
          defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
      }
      get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("desiredSize");
        }
        if (this._ownerWritableStream === void 0) {
          throw defaultWriterLockException("desiredSize");
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
      }
      get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
        }
        return this._readyPromise;
      }
      abort(reason = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("abort"));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
      }
      close() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("close"));
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("close"));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamDefaultWriterClose(this);
      }
      releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("releaseLock");
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return;
        }
        WritableStreamDefaultWriterRelease(this);
      }
      write(chunk = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("write"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
      }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      releaseLock: { enumerable: true },
      write: { enumerable: true },
      closed: { enumerable: true },
      desiredSize: { enumerable: true },
      ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: true
      });
    }
    function IsWritableStreamDefaultWriter(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_ownerWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultWriter;
    }
    function WritableStreamDefaultWriterAbort(writer, reason) {
      const stream = writer._ownerWritableStream;
      return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
      const stream = writer._ownerWritableStream;
      return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
      if (writer._closedPromiseState === "pending") {
        defaultWriterClosedPromiseReject(writer, error2);
      } else {
        defaultWriterClosedPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
      if (writer._readyPromiseState === "pending") {
        defaultWriterReadyPromiseReject(writer, error2);
      } else {
        defaultWriterReadyPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (state === "errored" || state === "erroring") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
      const stream = writer._ownerWritableStream;
      const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
      WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
      WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
      stream._writer = void 0;
      writer._ownerWritableStream = void 0;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
      const stream = writer._ownerWritableStream;
      const controller = stream._writableStreamController;
      const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
      if (stream !== writer._ownerWritableStream) {
        return promiseRejectedWith(defaultWriterLockException("write to"));
      }
      const state = stream._state;
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
      }
      if (state === "erroring") {
        return promiseRejectedWith(stream._storedError);
      }
      const promise = WritableStreamAddWriteRequest(stream);
      WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
      return promise;
    }
    const closeSentinel = {};
    class WritableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("abortReason");
        }
        return this._abortReason;
      }
      get signal() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("signal");
        }
        if (this._abortController === void 0) {
          throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        }
        return this._abortController.signal;
      }
      error(e = void 0) {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("error");
        }
        const state = this._controlledWritableStream._state;
        if (state !== "writable") {
          return;
        }
        WritableStreamDefaultControllerError(this, e);
      }
      [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [ErrorSteps]() {
        ResetQueue(this);
      }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
      error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: true
      });
    }
    function IsWritableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledWritableStream = stream;
      stream._writableStreamController = controller;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._abortReason = void 0;
      controller._abortController = createAbortController();
      controller._started = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._writeAlgorithm = writeAlgorithm;
      controller._closeAlgorithm = closeAlgorithm;
      controller._abortAlgorithm = abortAlgorithm;
      const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
      const startResult = startAlgorithm();
      const startPromise = promiseResolvedWith(startResult);
      uponPromise(startPromise, () => {
        controller._started = true;
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (r) => {
        controller._started = true;
        WritableStreamDealWithRejection(stream, r);
      });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(WritableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let writeAlgorithm = () => promiseResolvedWith(void 0);
      let closeAlgorithm = () => promiseResolvedWith(void 0);
      let abortAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSink.start !== void 0) {
        startAlgorithm = () => underlyingSink.start(controller);
      }
      if (underlyingSink.write !== void 0) {
        writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
      }
      if (underlyingSink.close !== void 0) {
        closeAlgorithm = () => underlyingSink.close();
      }
      if (underlyingSink.abort !== void 0) {
        abortAlgorithm = (reason) => underlyingSink.abort(reason);
      }
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
      controller._writeAlgorithm = void 0;
      controller._closeAlgorithm = void 0;
      controller._abortAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function WritableStreamDefaultControllerClose(controller) {
      EnqueueValueWithSize(controller, closeSentinel, 0);
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
      try {
        return controller._strategySizeAlgorithm(chunk);
      } catch (chunkSizeE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
        return 1;
      }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
      try {
        EnqueueValueWithSize(controller, chunk, chunkSize);
      } catch (enqueueE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
        return;
      }
      const stream = controller._controlledWritableStream;
      if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
      }
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
      const stream = controller._controlledWritableStream;
      if (!controller._started) {
        return;
      }
      if (stream._inFlightWriteRequest !== void 0) {
        return;
      }
      const state = stream._state;
      if (state === "erroring") {
        WritableStreamFinishErroring(stream);
        return;
      }
      if (controller._queue.length === 0) {
        return;
      }
      const value = PeekQueueValue(controller);
      if (value === closeSentinel) {
        WritableStreamDefaultControllerProcessClose(controller);
      } else {
        WritableStreamDefaultControllerProcessWrite(controller, value);
      }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
      if (controller._controlledWritableStream._state === "writable") {
        WritableStreamDefaultControllerError(controller, error2);
      }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkCloseRequestInFlight(stream);
      DequeueValue(controller);
      const sinkClosePromise = controller._closeAlgorithm();
      WritableStreamDefaultControllerClearAlgorithms(controller);
      uponPromise(sinkClosePromise, () => {
        WritableStreamFinishInFlightClose(stream);
      }, (reason) => {
        WritableStreamFinishInFlightCloseWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkFirstWriteRequestInFlight(stream);
      const sinkWritePromise = controller._writeAlgorithm(chunk);
      uponPromise(sinkWritePromise, () => {
        WritableStreamFinishInFlightWrite(stream);
        const state = stream._state;
        DequeueValue(controller);
        if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (reason) => {
        if (stream._state === "writable") {
          WritableStreamDefaultControllerClearAlgorithms(controller);
        }
        WritableStreamFinishInFlightWriteWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
      const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
      return desiredSize <= 0;
    }
    function WritableStreamDefaultControllerError(controller, error2) {
      const stream = controller._controlledWritableStream;
      WritableStreamDefaultControllerClearAlgorithms(controller);
      WritableStreamStartErroring(stream, error2);
    }
    function streamBrandCheckException$2(name) {
      return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    function defaultControllerBrandCheckException$2(name) {
      return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    function defaultWriterBrandCheckException(name) {
      return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released writer");
    }
    function defaultWriterClosedPromiseInitialize(writer) {
      writer._closedPromise = newPromise((resolve2, reject) => {
        writer._closedPromise_resolve = resolve2;
        writer._closedPromise_reject = reject;
        writer._closedPromiseState = "pending";
      });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
      if (writer._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._closedPromise);
      writer._closedPromise_reject(reason);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "rejected";
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
      defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
      if (writer._closedPromise_resolve === void 0) {
        return;
      }
      writer._closedPromise_resolve(void 0);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "resolved";
    }
    function defaultWriterReadyPromiseInitialize(writer) {
      writer._readyPromise = newPromise((resolve2, reject) => {
        writer._readyPromise_resolve = resolve2;
        writer._readyPromise_reject = reject;
      });
      writer._readyPromiseState = "pending";
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
      if (writer._readyPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._readyPromise);
      writer._readyPromise_reject(reason);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "rejected";
    }
    function defaultWriterReadyPromiseReset(writer) {
      defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
      defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
      if (writer._readyPromise_resolve === void 0) {
        return;
      }
      writer._readyPromise_resolve(void 0);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "fulfilled";
    }
    const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
    function isDOMExceptionConstructor(ctor) {
      if (!(typeof ctor === "function" || typeof ctor === "object")) {
        return false;
      }
      try {
        new ctor();
        return true;
      } catch (_a) {
        return false;
      }
    }
    function createDOMExceptionPolyfill() {
      const ctor = function DOMException2(message, name) {
        this.message = message || "";
        this.name = name || "Error";
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      };
      ctor.prototype = Object.create(Error.prototype);
      Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
      return ctor;
    }
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
      const reader = AcquireReadableStreamDefaultReader(source);
      const writer = AcquireWritableStreamDefaultWriter(dest);
      source._disturbed = true;
      let shuttingDown = false;
      let currentWrite = promiseResolvedWith(void 0);
      return newPromise((resolve2, reject) => {
        let abortAlgorithm;
        if (signal !== void 0) {
          abortAlgorithm = () => {
            const error2 = new DOMException$1("Aborted", "AbortError");
            const actions = [];
            if (!preventAbort) {
              actions.push(() => {
                if (dest._state === "writable") {
                  return WritableStreamAbort(dest, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            if (!preventCancel) {
              actions.push(() => {
                if (source._state === "readable") {
                  return ReadableStreamCancel(source, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
          };
          if (signal.aborted) {
            abortAlgorithm();
            return;
          }
          signal.addEventListener("abort", abortAlgorithm);
        }
        function pipeLoop() {
          return newPromise((resolveLoop, rejectLoop) => {
            function next(done) {
              if (done) {
                resolveLoop();
              } else {
                PerformPromiseThen(pipeStep(), next, rejectLoop);
              }
            }
            next(false);
          });
        }
        function pipeStep() {
          if (shuttingDown) {
            return promiseResolvedWith(true);
          }
          return PerformPromiseThen(writer._readyPromise, () => {
            return newPromise((resolveRead, rejectRead) => {
              ReadableStreamDefaultReaderRead(reader, {
                _chunkSteps: (chunk) => {
                  currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                  resolveRead(false);
                },
                _closeSteps: () => resolveRead(true),
                _errorSteps: rejectRead
              });
            });
          });
        }
        isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
          if (!preventAbort) {
            shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesClosed(source, reader._closedPromise, () => {
          if (!preventClose) {
            shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
          } else {
            shutdown();
          }
        });
        if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
          const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
          } else {
            shutdown(true, destClosed);
          }
        }
        setPromiseIsHandledToTrue(pipeLoop());
        function waitForWritesToFinish() {
          const oldCurrentWrite = currentWrite;
          return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
        }
        function isOrBecomesErrored(stream, promise, action) {
          if (stream._state === "errored") {
            action(stream._storedError);
          } else {
            uponRejection(promise, action);
          }
        }
        function isOrBecomesClosed(stream, promise, action) {
          if (stream._state === "closed") {
            action();
          } else {
            uponFulfillment(promise, action);
          }
        }
        function shutdownWithAction(action, originalIsError, originalError) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), doTheRest);
          } else {
            doTheRest();
          }
          function doTheRest() {
            uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
          }
        }
        function shutdown(isError, error2) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
          } else {
            finalize(isError, error2);
          }
        }
        function finalize(isError, error2) {
          WritableStreamDefaultWriterRelease(writer);
          ReadableStreamReaderGenericRelease(reader);
          if (signal !== void 0) {
            signal.removeEventListener("abort", abortAlgorithm);
          }
          if (isError) {
            reject(error2);
          } else {
            resolve2(void 0);
          }
        }
      });
    }
    class ReadableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("desiredSize");
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("close");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits close");
        }
        ReadableStreamDefaultControllerClose(this);
      }
      enqueue(chunk = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("enqueue");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits enqueue");
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("error");
        }
        ReadableStreamDefaultControllerError(this, e);
      }
      [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
          const chunk = DequeueValue(this);
          if (this._closeRequested && this._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(this);
            ReadableStreamClose(stream);
          } else {
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
          readRequest._chunkSteps(chunk);
        } else {
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
      }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: true
      });
    }
    function IsReadableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableStream")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableStreamDefaultControllerError(controller, e);
      });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableStream;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function ReadableStreamDefaultControllerClose(controller) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      controller._closeRequested = true;
      if (controller._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        ReadableStreamFulfillReadRequest(stream, chunk, false);
      } else {
        let chunkSize;
        try {
          chunkSize = controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          ReadableStreamDefaultControllerError(controller, chunkSizeE);
          throw chunkSizeE;
        }
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          ReadableStreamDefaultControllerError(controller, enqueueE);
          throw enqueueE;
        }
      }
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
      const stream = controller._controlledReadableStream;
      if (stream._state !== "readable") {
        return;
      }
      ResetQueue(controller);
      ReadableStreamDefaultControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
      if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
        return false;
      }
      return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
      const state = controller._controlledReadableStream._state;
      if (!controller._closeRequested && state === "readable") {
        return true;
      }
      return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledReadableStream = stream;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._started = false;
      controller._closeRequested = false;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableStreamDefaultControllerError(controller, r);
      });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSource.start !== void 0) {
        startAlgorithm = () => underlyingSource.start(controller);
      }
      if (underlyingSource.pull !== void 0) {
        pullAlgorithm = () => underlyingSource.pull(controller);
      }
      if (underlyingSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
      }
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function defaultControllerBrandCheckException$1(name) {
      return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }
    function ReadableStreamTee(stream, cloneForBranch2) {
      if (IsReadableByteStreamController(stream._readableStreamController)) {
        return ReadableByteStreamTee(stream);
      }
      return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function pullAlgorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              const chunk2 = chunk;
              if (!canceled1) {
                ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableStreamDefaultControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableStreamDefaultControllerClose(branch2._readableStreamController);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
      }
      branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
      branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
      uponRejection(reader._closedPromise, (r) => {
        ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
        ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      });
      return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
      let reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function forwardReaderError(thisReader) {
        uponRejection(thisReader._closedPromise, (r) => {
          if (thisReader !== reader) {
            return;
          }
          ReadableByteStreamControllerError(branch1._readableStreamController, r);
          ReadableByteStreamControllerError(branch2._readableStreamController, r);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
      }
      function pullWithDefaultReader() {
        if (IsReadableStreamBYOBReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamDefaultReader(stream);
          forwardReaderError(reader);
        }
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              let chunk2 = chunk;
              if (!canceled1 && !canceled2) {
                try {
                  chunk2 = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
              }
              if (!canceled1) {
                ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableByteStreamControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableByteStreamControllerClose(branch2._readableStreamController);
            }
            if (branch1._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
            }
            if (branch2._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
      }
      function pullWithBYOBReader(view, forBranch2) {
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamBYOBReader(stream);
          forwardReaderError(reader);
        }
        const byobBranch = forBranch2 ? branch2 : branch1;
        const otherBranch = forBranch2 ? branch1 : branch2;
        const readIntoRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!otherCanceled) {
                let clonedChunk;
                try {
                  clonedChunk = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
              } else if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
            });
          },
          _closeSteps: (chunk) => {
            reading = false;
            const byobCanceled = forBranch2 ? canceled2 : canceled1;
            const otherCanceled = forBranch2 ? canceled1 : canceled2;
            if (!byobCanceled) {
              ReadableByteStreamControllerClose(byobBranch._readableStreamController);
            }
            if (!otherCanceled) {
              ReadableByteStreamControllerClose(otherBranch._readableStreamController);
            }
            if (chunk !== void 0) {
              if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
              if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
              }
            }
            if (!byobCanceled || !otherCanceled) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
      }
      function pull1Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, false);
        }
        return promiseResolvedWith(void 0);
      }
      function pull2Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, true);
        }
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
        return;
      }
      branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
      branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
      forwardReaderError(reader);
      return [branch1, branch2];
    }
    function convertUnderlyingDefaultOrByteSource(source, context) {
      assertDictionary(source, context);
      const original = source;
      const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
      const cancel = original === null || original === void 0 ? void 0 : original.cancel;
      const pull = original === null || original === void 0 ? void 0 : original.pull;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      return {
        autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
        cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
        pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
        type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
      };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context) {
      type = `${type}`;
      if (type !== "bytes") {
        throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
      }
      return type;
    }
    function convertReaderOptions(options2, context) {
      assertDictionary(options2, context);
      const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
      return {
        mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
      };
    }
    function convertReadableStreamReaderMode(mode, context) {
      mode = `${mode}`;
      if (mode !== "byob") {
        throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
      }
      return mode;
    }
    function convertIteratorOptions(options2, context) {
      assertDictionary(options2, context);
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      return { preventCancel: Boolean(preventCancel) };
    }
    function convertPipeOptions(options2, context) {
      assertDictionary(options2, context);
      const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
      const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
      if (signal !== void 0) {
        assertAbortSignal(signal, `${context} has member 'signal' that`);
      }
      return {
        preventAbort: Boolean(preventAbort),
        preventCancel: Boolean(preventCancel),
        preventClose: Boolean(preventClose),
        signal
      };
    }
    function assertAbortSignal(signal, context) {
      if (!isAbortSignal2(signal)) {
        throw new TypeError(`${context} is not an AbortSignal.`);
      }
    }
    function convertReadableWritablePair(pair, context) {
      assertDictionary(pair, context);
      const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
      assertRequiredField(readable2, "readable", "ReadableWritablePair");
      assertReadableStream(readable2, `${context} has member 'readable' that`);
      const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
      assertRequiredField(writable2, "writable", "ReadableWritablePair");
      assertWritableStream(writable2, `${context} has member 'writable' that`);
      return { readable: readable2, writable: writable2 };
    }
    class ReadableStream2 {
      constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === void 0) {
          rawUnderlyingSource = null;
        } else {
          assertObject(rawUnderlyingSource, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
        InitializeReadableStream(this);
        if (underlyingSource.type === "bytes") {
          if (strategy.size !== void 0) {
            throw new RangeError("The strategy for a byte stream cannot have a size function");
          }
          const highWaterMark = ExtractHighWaterMark(strategy, 0);
          SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        } else {
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
      }
      get locked() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("locked");
        }
        return IsReadableStreamLocked(this);
      }
      cancel(reason = void 0) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("cancel"));
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
        }
        return ReadableStreamCancel(this, reason);
      }
      getReader(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("getReader");
        }
        const options2 = convertReaderOptions(rawOptions, "First parameter");
        if (options2.mode === void 0) {
          return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
      }
      pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("pipeThrough");
        }
        assertRequiredArgument(rawTransform, 1, "pipeThrough");
        const transform = convertReadableWritablePair(rawTransform, "First parameter");
        const options2 = convertPipeOptions(rawOptions, "Second parameter");
        if (IsReadableStreamLocked(this)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        }
        if (IsWritableStreamLocked(transform.writable)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        }
        const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
        setPromiseIsHandledToTrue(promise);
        return transform.readable;
      }
      pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
        }
        if (destination === void 0) {
          return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
          return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options2;
        try {
          options2 = convertPipeOptions(rawOptions, "Second parameter");
        } catch (e) {
          return promiseRejectedWith(e);
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
        }
        if (IsWritableStreamLocked(destination)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
        }
        return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
      }
      tee() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("tee");
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
      }
      values(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("values");
        }
        const options2 = convertIteratorOptions(rawOptions, "First parameter");
        return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
      }
    }
    Object.defineProperties(ReadableStream2.prototype, {
      cancel: { enumerable: true },
      getReader: { enumerable: true },
      pipeThrough: { enumerable: true },
      pipeTo: { enumerable: true },
      tee: { enumerable: true },
      values: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStream",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
    }
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableByteStreamController.prototype);
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
      return stream;
    }
    function InitializeReadableStream(stream) {
      stream._state = "readable";
      stream._reader = void 0;
      stream._storedError = void 0;
      stream._disturbed = false;
    }
    function IsReadableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readableStreamController")) {
        return false;
      }
      return x instanceof ReadableStream2;
    }
    function IsReadableStreamLocked(stream) {
      if (stream._reader === void 0) {
        return false;
      }
      return true;
    }
    function ReadableStreamCancel(stream, reason) {
      stream._disturbed = true;
      if (stream._state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (stream._state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      ReadableStreamClose(stream);
      const reader = stream._reader;
      if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._closeSteps(void 0);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
      const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
      return transformPromiseWith(sourceCancelPromise, noop2);
    }
    function ReadableStreamClose(stream) {
      stream._state = "closed";
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseResolve(reader);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._closeSteps();
        });
        reader._readRequests = new SimpleQueue();
      }
    }
    function ReadableStreamError(stream, e) {
      stream._state = "errored";
      stream._storedError = e;
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseReject(reader, e);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e);
        });
        reader._readRequests = new SimpleQueue();
      } else {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
    }
    function streamBrandCheckException$1(name) {
      return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }
    function convertQueuingStrategyInit(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
      return {
        highWaterMark: convertUnrestrictedDouble(highWaterMark)
      };
    }
    const byteLengthSizeFunction = (chunk) => {
      return chunk.byteLength;
    };
    Object.defineProperty(byteLengthSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class ByteLengthQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("highWaterMark");
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("size");
        }
        return byteLengthSizeFunction;
      }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: true
      });
    }
    function byteLengthBrandCheckException(name) {
      return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_byteLengthQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof ByteLengthQueuingStrategy;
    }
    const countSizeFunction = () => {
      return 1;
    };
    Object.defineProperty(countSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class CountQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "CountQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("highWaterMark");
        }
        return this._countQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("size");
        }
        return countSizeFunction;
      }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: true
      });
    }
    function countBrandCheckException(name) {
      return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_countQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof CountQueuingStrategy;
    }
    function convertTransformer(original, context) {
      assertDictionary(original, context);
      const flush = original === null || original === void 0 ? void 0 : original.flush;
      const readableType = original === null || original === void 0 ? void 0 : original.readableType;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const transform = original === null || original === void 0 ? void 0 : original.transform;
      const writableType = original === null || original === void 0 ? void 0 : original.writableType;
      return {
        flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
        readableType,
        start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
        transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
        writableType
      };
    }
    function convertTransformerFlushCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    class TransformStream {
      constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === void 0) {
          rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
        const transformer = convertTransformer(rawTransformer, "First parameter");
        if (transformer.readableType !== void 0) {
          throw new RangeError("Invalid readableType specified");
        }
        if (transformer.writableType !== void 0) {
          throw new RangeError("Invalid writableType specified");
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise((resolve2) => {
          startPromise_resolve = resolve2;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== void 0) {
          startPromise_resolve(transformer.start(this._transformStreamController));
        } else {
          startPromise_resolve(void 0);
        }
      }
      get readable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("readable");
        }
        return this._readable;
      }
      get writable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("writable");
        }
        return this._writable;
      }
    }
    Object.defineProperties(TransformStream.prototype, {
      readable: { enumerable: true },
      writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStream",
        configurable: true
      });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
      function startAlgorithm() {
        return startPromise;
      }
      function writeAlgorithm(chunk) {
        return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
      }
      function abortAlgorithm(reason) {
        return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
      }
      function closeAlgorithm() {
        return TransformStreamDefaultSinkCloseAlgorithm(stream);
      }
      stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
      function pullAlgorithm() {
        return TransformStreamDefaultSourcePullAlgorithm(stream);
      }
      function cancelAlgorithm(reason) {
        TransformStreamErrorWritableAndUnblockWrite(stream, reason);
        return promiseResolvedWith(void 0);
      }
      stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
      stream._backpressure = void 0;
      stream._backpressureChangePromise = void 0;
      stream._backpressureChangePromise_resolve = void 0;
      TransformStreamSetBackpressure(stream, true);
      stream._transformStreamController = void 0;
    }
    function IsTransformStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_transformStreamController")) {
        return false;
      }
      return x instanceof TransformStream;
    }
    function TransformStreamError(stream, e) {
      ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
      TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
      TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
      WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
      if (stream._backpressure) {
        TransformStreamSetBackpressure(stream, false);
      }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
      if (stream._backpressureChangePromise !== void 0) {
        stream._backpressureChangePromise_resolve();
      }
      stream._backpressureChangePromise = newPromise((resolve2) => {
        stream._backpressureChangePromise_resolve = resolve2;
      });
      stream._backpressure = backpressure;
    }
    class TransformStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("desiredSize");
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
      }
      enqueue(chunk = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("enqueue");
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
      }
      error(reason = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("error");
        }
        TransformStreamDefaultControllerError(this, reason);
      }
      terminate() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("terminate");
        }
        TransformStreamDefaultControllerTerminate(this);
      }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
      enqueue: { enumerable: true },
      error: { enumerable: true },
      terminate: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: true
      });
    }
    function IsTransformStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledTransformStream")) {
        return false;
      }
      return x instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
      controller._controlledTransformStream = stream;
      stream._transformStreamController = controller;
      controller._transformAlgorithm = transformAlgorithm;
      controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
      const controller = Object.create(TransformStreamDefaultController.prototype);
      let transformAlgorithm = (chunk) => {
        try {
          TransformStreamDefaultControllerEnqueue(controller, chunk);
          return promiseResolvedWith(void 0);
        } catch (transformResultE) {
          return promiseRejectedWith(transformResultE);
        }
      };
      let flushAlgorithm = () => promiseResolvedWith(void 0);
      if (transformer.transform !== void 0) {
        transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
      }
      if (transformer.flush !== void 0) {
        flushAlgorithm = () => transformer.flush(controller);
      }
      SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
      controller._transformAlgorithm = void 0;
      controller._flushAlgorithm = void 0;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
        throw new TypeError("Readable side is not in a state that permits enqueue");
      }
      try {
        ReadableStreamDefaultControllerEnqueue(readableController, chunk);
      } catch (e) {
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
        throw stream._readable._storedError;
      }
      const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
      if (backpressure !== stream._backpressure) {
        TransformStreamSetBackpressure(stream, true);
      }
    }
    function TransformStreamDefaultControllerError(controller, e) {
      TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
      const transformPromise = controller._transformAlgorithm(chunk);
      return transformPromiseWith(transformPromise, void 0, (r) => {
        TransformStreamError(controller._controlledTransformStream, r);
        throw r;
      });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      ReadableStreamDefaultControllerClose(readableController);
      const error2 = new TypeError("TransformStream terminated");
      TransformStreamErrorWritableAndUnblockWrite(stream, error2);
    }
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
      const controller = stream._transformStreamController;
      if (stream._backpressure) {
        const backpressureChangePromise = stream._backpressureChangePromise;
        return transformPromiseWith(backpressureChangePromise, () => {
          const writable2 = stream._writable;
          const state = writable2._state;
          if (state === "erroring") {
            throw writable2._storedError;
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        });
      }
      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
      TransformStreamError(stream, reason);
      return promiseResolvedWith(void 0);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
      const readable2 = stream._readable;
      const controller = stream._transformStreamController;
      const flushPromise = controller._flushAlgorithm();
      TransformStreamDefaultControllerClearAlgorithms(controller);
      return transformPromiseWith(flushPromise, () => {
        if (readable2._state === "errored") {
          throw readable2._storedError;
        }
        ReadableStreamDefaultControllerClose(readable2._readableStreamController);
      }, (r) => {
        TransformStreamError(stream, r);
        throw readable2._storedError;
      });
    }
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
      TransformStreamSetBackpressure(stream, false);
      return stream._backpressureChangePromise;
    }
    function defaultControllerBrandCheckException(name) {
      return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    function streamBrandCheckException(name) {
      return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }
    exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports2.CountQueuingStrategy = CountQueuingStrategy;
    exports2.ReadableByteStreamController = ReadableByteStreamController;
    exports2.ReadableStream = ReadableStream2;
    exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports2.TransformStream = TransformStream;
    exports2.TransformStreamDefaultController = TransformStreamDefaultController;
    exports2.WritableStream = WritableStream;
    exports2.WritableStreamDefaultController = WritableStreamDefaultController;
    exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(ponyfill_es2018, ponyfill_es2018.exports);
var POOL_SIZE$1 = 65536;
if (!globalThis.ReadableStream) {
  try {
    Object.assign(globalThis, require("stream/web"));
  } catch (error2) {
    Object.assign(globalThis, ponyfill_es2018.exports);
  }
}
try {
  const { Blob: Blob3 } = require("buffer");
  if (Blob3 && !Blob3.prototype.stream) {
    Blob3.prototype.stream = function name(params) {
      let position = 0;
      const blob = this;
      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));
          if (position === blob.size) {
            ctrl.close();
          }
        }
      });
    };
  }
} catch (error2) {
}
var POOL_SIZE = 65536;
async function* toIterator(parts, clone2 = true) {
  for (let part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        let end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var _Blob = class Blob {
  #parts = [];
  #type = "";
  #size = 0;
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof Blob) {
        part = element;
      } else {
        part = new TextEncoder().encode(element);
      }
      size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
      return part;
    });
    const type = options2.type === void 0 ? "" : String(options2.type);
    this.#type = /[^\u0020-\u007E]/.test(type) ? "" : type;
    this.#size = size;
    this.#parts = parts;
  }
  get size() {
    return this.#size;
  }
  get type() {
    return this.#type;
  }
  async text() {
    const decoder = new TextDecoder();
    let str = "";
    for await (let part of toIterator(this.#parts, false)) {
      str += decoder.decode(part, { stream: true });
    }
    str += decoder.decode();
    return str;
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of toIterator(this.#parts, false)) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    const it = toIterator(this.#parts, true);
    return new ReadableStream({
      type: "bytes",
      async pull(ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      }
    });
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = this.#parts;
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      if (added >= span) {
        break;
      }
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.size;
        }
        blobParts.push(chunk);
        relativeStart = 0;
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    blob.#size = span;
    blob.#parts = blobParts;
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var Blob2 = _Blob;
var Blob$1 = Blob2;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    length += isBlob(value) ? value.size : Buffer.byteLength(String(value));
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (error_) => {
        const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = import_stream.default.Readable.from(body.stream());
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    import_stream.default.Readable.from(body.stream()).pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error2;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
    throw error2;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status != null ? options2.status : 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), reject) : (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}

// .svelte-kit/output/server/app.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler2) {
    return;
  }
  const params = route.params(match);
  const response = await handler2({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal$1(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue$1.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page: page2
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session
      },
      page: page2,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page2 && page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2 && page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2 && page2.path)},
						query: new URLSearchParams(${page2 ? s$1(page2.query.toString()) : ""}),
						params: ${page2 && s$1(page2.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page: page2,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page2, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page2.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page: page2,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page: page2,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page: page2
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page: page2
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function assign(tar, src2) {
  for (const k in src2)
    tar[k] = src2[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
Promise.resolve();
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$q = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$q);
  {
    stores.page.set(page2);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="/favicon.png" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n		<link rel="stylesheet" href="/base-styles/reset.css">\r\n		<link rel="stylesheet" href="/base-styles/variables.css">\r\n		<link rel="stylesheet" href="/base-styles/fonts.css">\r\n		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"><\/script>\r\n		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js"><\/script>\r\n		' + head + '\r\n	</head>\r\n	<body>\r\n		<div id="svelte">' + body + "</div>\r\n	</body>\r\n</html>\r\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-debf6115.js",
      css: [assets + "/_app/assets/start-61d1577b.css"],
      js: [assets + "/_app/start-debf6115.js", assets + "/_app/chunks/vendor-a532ebae.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": "base-styles/fonts.css", "size": 452, "type": "text/css" }, { "file": "base-styles/reset.css", "size": 1391, "type": "text/css" }, { "file": "base-styles/variables.css", "size": 3654, "type": "text/css" }, { "file": "favicon.png", "size": 1571, "type": "image/png" }, { "file": "images/about/shared/eye.svg", "size": 914, "type": "image/svg+xml" }, { "file": "images/about/shared/folder.svg", "size": 379, "type": "image/svg+xml" }, { "file": "images/about/shared/heart.svg", "size": 477, "type": "image/svg+xml" }, { "file": "images/about/shared/rafal-head-down.png", "size": 169052, "type": "image/png" }, { "file": "images/about/shared/rafal-head-up.png", "size": 98581, "type": "image/png" }, { "file": "images/home/desktop/nietzsche.png", "size": 150057, "type": "image/png" }, { "file": "images/home/desktop/tesla.png", "size": 191827, "type": "image/png" }, { "file": "images/home/mobile/nietzsche.png", "size": 131639, "type": "image/png" }, { "file": "images/home/mobile/tesla.png", "size": 57935, "type": "image/png" }, { "file": "images/home/shared/hero-images/book.png", "size": 86039, "type": "image/png" }, { "file": "images/home/shared/hero-images/computer.png", "size": 51054, "type": "image/png" }, { "file": "images/home/shared/hero-images/eagle.png", "size": 141230, "type": "image/png" }, { "file": "images/home/shared/hero-images/rafal.png", "size": 793636, "type": "image/png" }, { "file": "images/home/shared/hero-images/rust.png", "size": 100984, "type": "image/png" }, { "file": "images/home/shared/hero-images/statue.png", "size": 171766, "type": "image/png" }, { "file": "images/home/shared/hero-images/watch.png", "size": 114158, "type": "image/png" }, { "file": "images/home/shared/tech-logos/css.png", "size": 4186, "type": "image/png" }, { "file": "images/home/shared/tech-logos/firebase.png", "size": 3647, "type": "image/png" }, { "file": "images/home/shared/tech-logos/ghostAPI.png", "size": 2290, "type": "image/png" }, { "file": "images/home/shared/tech-logos/html.png", "size": 3591, "type": "image/png" }, { "file": "images/home/shared/tech-logos/javascript.png", "size": 3070, "type": "image/png" }, { "file": "images/home/shared/tech-logos/netlify.png", "size": 4992, "type": "image/png" }, { "file": "images/home/shared/tech-logos/netlifyCMS.png", "size": 5231, "type": "image/png" }, { "file": "images/home/shared/tech-logos/react.png", "size": 4122, "type": "image/png" }, { "file": "images/home/shared/tech-logos/sapper.png", "size": 4730, "type": "image/png" }, { "file": "images/home/shared/tech-logos/sass.png", "size": 4152, "type": "image/png" }, { "file": "images/home/shared/tech-logos/svelte.png", "size": 3697, "type": "image/png" }, { "file": "images/home/shared/tech-logos/sveltekit.png", "size": 9504, "type": "image/png" }, { "file": "images/home/shared/tech-logos/tailwind.png", "size": 1520, "type": "image/png" }, { "file": "images/home/tablet/nietzsche.png", "size": 150057, "type": "image/png" }, { "file": "images/home/tablet/tesla.png", "size": 131037, "type": "image/png" }, { "file": "images/portfolio/arrow.svg", "size": 1159, "type": "image/svg+xml" }, { "file": "images/portfolio/shared/github.svg", "size": 924, "type": "image/svg+xml" }, { "file": "images/portfolio/shared/share.svg", "size": 582, "type": "image/svg+xml" }, { "file": "images/random/3b20122698665d979fae837e2cc30d32.png", "size": 743215, "type": "image/png" }, { "file": "images/random/800x800.png", "size": 754669, "type": "image/png" }, { "file": "images/random/a-lake-in-the-alps-5CYQKZH.jpg", "size": 11608256, "type": "image/jpeg" }, { "file": "images/random/Artboard1.png", "size": 26111205, "type": "image/png" }, { "file": "images/random/Artboard1_2.png", "size": 23878773, "type": "image/png" }, { "file": "images/random/Artboard2.jpg", "size": 625736, "type": "image/jpeg" }, { "file": "images/random/Artboard3.jpg", "size": 472990, "type": "image/jpeg" }, { "file": "images/random/bluetheme.png", "size": 21704113, "type": "image/png" }, { "file": "images/random/computer-developer-working-with-computers-at-night-MD8HUP9.jpg", "size": 2724388, "type": "image/jpeg" }, { "file": "images/random/Daco_4198257.png", "size": 924797, "type": "image/png" }, { "file": "images/random/Daco_4396589.png", "size": 583489, "type": "image/png" }, { "file": "images/random/eagle-15153.png", "size": 618922, "type": "image/png" }, { "file": "images/random/evergreen-plant-PGNVUFN.jpg", "size": 3610404, "type": "image/jpeg" }, { "file": "images/random/fcp,small,wall_texture,product,750x1000.u2.jpg", "size": 153968, "type": "image/jpeg" }, { "file": "images/random/ferns-png-26200.jpg", "size": 1967544, "type": "image/jpeg" }, { "file": "images/random/german-shepherd-PNBFSQT.jpg", "size": 4459342, "type": "image/jpeg" }, { "file": "images/random/https___specials-images.forbesimg.com_imageserve_5e4c179e6895e0000683874a_0x0.jpg", "size": 87840, "type": "image/jpeg" }, { "file": "images/random/IMG_3937.JPG", "size": 1485583, "type": "image/jpeg" }, { "file": "images/random/late-nite-software-development_t20_Zzvrkb.jpg", "size": 6212178, "type": "image/jpeg" }, { "file": "images/random/millennial-black-man-reading-his-resume-while-wait-NLNZ6Q4.jpg", "size": 8458965, "type": "image/jpeg" }, { "file": "images/random/pngwing.com (1).png", "size": 109332, "type": "image/png" }, { "file": "images/random/pngwing.com.png", "size": 447983, "type": "image/png" }, { "file": "images/random/rock-climber-PL6SH7E.jpg", "size": 2837622, "type": "image/jpeg" }, { "file": "images/random/vibrant-colorful-paint-on-canvas-4GMATAF.jpg", "size": 13495298, "type": "image/jpeg" }, { "file": "images/random/_methode_times_prod_web_bin_507b67da-6ac7-11eb-acad-72136628cce4.jpg", "size": 39794, "type": "image/jpeg" }, { "file": "images/shared/about.svg", "size": 1237, "type": "image/svg+xml" }, { "file": "images/shared/arrow.svg", "size": 1159, "type": "image/svg+xml" }, { "file": "images/shared/Artboard-6.svg", "size": 325, "type": "image/svg+xml" }, { "file": "images/shared/background.png", "size": 268991, "type": "image/png" }, { "file": "images/shared/bg-dark.png", "size": 359941, "type": "image/png" }, { "file": "images/shared/bg-light.jpg", "size": 134330, "type": "image/jpeg" }, { "file": "images/shared/bg-light.png", "size": 224405, "type": "image/png" }, { "file": "images/shared/bg-light2.png", "size": 218582, "type": "image/png" }, { "file": "images/shared/bg-pattern-trial-1.png", "size": 460240, "type": "image/png" }, { "file": "images/shared/bg-pattern-trial-2.png", "size": 359941, "type": "image/png" }, { "file": "images/shared/blog.svg", "size": 760, "type": "image/svg+xml" }, { "file": "images/shared/home.svg", "size": 535, "type": "image/svg+xml" }, { "file": "images/shared/logo-box.svg", "size": 5145, "type": "image/svg+xml" }, { "file": "images/shared/logo.svg", "size": 4861, "type": "image/svg+xml" }, { "file": "images/shared/logo2.svg", "size": 4510, "type": "image/svg+xml" }, { "file": "images/shared/logo3.svg", "size": 4115, "type": "image/svg+xml" }, { "file": "images/shared/message-in-bottle.png", "size": 118253, "type": "image/png" }, { "file": "images/shared/moon.svg", "size": 544, "type": "image/svg+xml" }, { "file": "images/shared/portfolio.svg", "size": 1134, "type": "image/svg+xml" }, { "file": "images/shared/rafal-smiling-arthurs-peak.png", "size": 257924, "type": "image/png" }, { "file": "images/shared/sun.svg", "size": 1191, "type": "image/svg+xml" }, { "file": "images/shared/triangle.svg", "size": 1494, "type": "image/svg+xml" }, { "file": "video/original-clips/antara.mp4", "size": 56096901, "type": "video/mp4" }, { "file": "video/original-clips/audiophile.mp4", "size": 93634485, "type": "video/mp4" }, { "file": "video/original-clips/designo.mp4", "size": 78951661, "type": "video/mp4" }, { "file": "video/original-clips/galleria.mp4", "size": 43090520, "type": "video/mp4" }, { "file": "video/original-clips/invoice-app.mp4", "size": 117210903, "type": "video/mp4" }, { "file": "video/original-clips/job-listing.mp4", "size": 89902973, "type": "video/mp4" }, { "file": "video/portfolio-projects/antara.mov", "size": 10110474, "type": "video/quicktime" }, { "file": "video/portfolio-projects/audiophile.mov", "size": 4868539, "type": "video/quicktime" }, { "file": "video/portfolio-projects/designo.mov", "size": 9541432, "type": "video/quicktime" }, { "file": "video/portfolio-projects/galleria.mov", "size": 10608542, "type": "video/quicktime" }, { "file": "video/portfolio-projects/invoice-app.mov", "size": 4222665, "type": "video/quicktime" }, { "file": "video/portfolio-projects/job-listing.mov", "size": 4724800, "type": "video/quicktime" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/portfolio\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/portfolio.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/portfolio.svelte": () => Promise.resolve().then(function() {
    return portfolio;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-1d11754b.js", "css": ["assets/pages/__layout.svelte-7b7d6eec.css", "assets/helperFunctions-113f9c27.css"], "js": ["pages/__layout.svelte-1d11754b.js", "chunks/vendor-a532ebae.js", "chunks/helperFunctions-63941726.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-11975c17.js", "css": [], "js": ["error.svelte-11975c17.js", "chunks/vendor-a532ebae.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-928c11d9.js", "css": ["assets/pages/index.svelte-3f1e1ad0.css", "assets/helperFunctions-113f9c27.css", "assets/Main-55732857.css"], "js": ["pages/index.svelte-928c11d9.js", "chunks/vendor-a532ebae.js", "chunks/helperFunctions-63941726.js", "chunks/Main-bca58bee.js"], "styles": [] }, "src/routes/portfolio.svelte": { "entry": "pages/portfolio.svelte-637cdb73.js", "css": [], "js": ["pages/portfolio.svelte-637cdb73.js", "chunks/vendor-a532ebae.js"], "styles": [] }, "src/routes/about.svelte": { "entry": "pages/about.svelte-92d2b011.js", "css": ["assets/Main-55732857.css"], "js": ["pages/about.svelte-92d2b011.js", "chunks/vendor-a532ebae.js", "chunks/Main-bca58bee.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender: prerender2
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender: prerender2 });
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var css$p = {
  code: "svg, svg path{transition:fill 400ms, transform 250ms}",
  map: `{"version":3,"file":"Icon.svelte","sources":["Icon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let name, width;\\r\\n<\/script>\\r\\n\\r\\n{#if name === 'logo'}\\r\\n\\t<svg class=\\"logo s-gTLmg6Hqck1H\\" viewBox=\\"0 0 67 67\\" aria-labelledby=\\"title desc\\" {width}>\\r\\n\\t\\t<title>logo icon</title>\\r\\n\\t\\t<desc>An icon of a shadowy silhuette of a bearded man wearing glasses</desc>\\r\\n\\t\\t<g transform=\\"matrix(1,0,0,1,-35984,-1992)\\">\\r\\n\\t\\t\\t<g id=\\"logo-box\\" transform=\\"matrix(1,0,0,1,-0.192025,-0.49761)\\">\\r\\n\\t\\t\\t\\t<rect x=\\"35984.2\\" y=\\"1992.5\\" width=\\"66.304\\" height=\\"66.304\\" style=\\"fill:none;\\" />\\r\\n\\t\\t\\t\\t<clipPath id=\\"_clip1\\">\\r\\n\\t\\t\\t\\t\\t<rect x=\\"35984.2\\" y=\\"1992.5\\" width=\\"66.304\\" height=\\"66.304\\" />\\r\\n\\t\\t\\t\\t</clipPath>\\r\\n\\t\\t\\t\\t<g clip-path=\\"url(#_clip1)\\">\\r\\n\\t\\t\\t\\t\\t<g transform=\\"matrix(0.0557345,4.98563e-34,1.06433e-32,0.0600478,35841.3,1842.4)\\">\\r\\n\\t\\t\\t\\t\\t\\t<g>\\r\\n\\t\\t\\t\\t\\t\\t\\t<g transform=\\"matrix(4.16667,0,0,4.16667,2270.23,2633.3)\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<path\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M188.979,205.103C176.94,213.129 172.892,207.656 174.351,200.725C175.811,193.793\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t169.643,190.874 163.806,190.874C157.969,190.874 151.801,193.793\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t153.26,200.725C154.719,207.656 150.672,213.129 138.633,205.103C132.58,201.066\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t129.132,197.571 126.611,193.898C123.899,187.894 123.53,180.602\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t133.331,179.587C143.911,178.492 156.509,180.659 163.806,180.659C171.102,180.659\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t183.701,178.492 194.281,179.587C204.082,180.602 203.712,187.894\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t201,193.898C198.479,197.571 195.032,201.066\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t188.979,205.103ZM251.548,78.689C243.339,66.832 247.296,110.233\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t242.918,129.569C238.54,148.905 233.358,154.639 225.065,165.701C222.105,169.649\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t212.056,173.143 210.303,176.245C201.275,165.215 197.909,163.995\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t186.881,161.321C175.016,158.445 167.852,165.654 163.806,165.863C159.759,165.654\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t152.596,158.445 140.73,161.321C129.703,163.995 126.21,165.593\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t117.308,176.245C115.556,173.143 105.473,169.674 102.546,165.701C94.253,154.442\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t91.006,148.449 84.956,129.569C79.155,111.467 79.379,71.072\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t76.063,78.689C72.635,86.562 73.396,123.654 79.964,145.544C86.531,167.433\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t95.96,176.68 101.068,195.287C106.175,213.893 122.945,232.938\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t163.806,232.938C204.667,232.938 221.436,213.893 226.543,195.287C231.651,176.68\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t241.08,167.433 247.647,145.544C254.213,123.654 256.436,85.749 251.548,78.689Z\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstyle=\\"fill:rgb(204,204,204);fill-rule:nonzero;\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t\\t\\t\\t<g transform=\\"matrix(0.772008,-0.0104727,0.0110494,0.814515,966.226,913.349)\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<path\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M2911.47,2589.44C2911.47,2561.7 2885.87,2539.18\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2854.34,2539.18L2643.52,2539.18C2611.99,2539.18 2586.39,2561.7\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2586.39,2589.44L2586.39,2689.96C2586.39,2717.7 2611.99,2740.22\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2643.52,2740.22L2854.34,2740.22C2885.87,2740.22 2911.47,2717.7\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2911.47,2689.96L2911.47,2589.44Z\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstyle=\\"fill:rgb(204,204,204);\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t\\t\\t\\t<g transform=\\"matrix(0.772012,0.0102181,-0.0107807,0.814518,692.438,856.462)\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<path\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M2911.47,2589.44C2911.47,2561.7 2885.87,2539.18\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2854.34,2539.18L2643.52,2539.18C2611.99,2539.18 2586.39,2561.7\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2586.39,2589.44L2586.39,2689.96C2586.39,2717.7 2611.99,2740.22\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2643.52,2740.22L2854.34,2740.22C2885.87,2740.22 2911.47,2717.7\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t2911.47,2689.96L2911.47,2589.44Z\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstyle=\\"fill:rgb(204,204,204);\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t\\t\\t\\t<g transform=\\"matrix(1,0,0,1.69276,0,-2072.31)\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<path\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M3322.37,2918.03L3327.05,2991.82L3295.89,2990.38L3298.15,2918.03L3322.37,2918.03Z\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstyle=\\"fill:rgb(204,204,204);\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t\\t\\t\\t<g transform=\\"matrix(-10.6486,0,0,8.37903,6168.93,1999.23)\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<path\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M337.409,87.51C334.577,79.051 330.594,70.117 315.473,69.468C311.917,69.314\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t307.809,69.101 303.521,69.079C299.23,69.101 295.122,69.314\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t291.564,69.468C276.442,70.117 272.118,80.655 269.286,89.113C266.574,97.213\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t269.699,125.939 269.699,125.939C269.699,125.939 271.481,120.734\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t270.98,114.098C270.669,109.951 271.319,98.286 276.318,93.754C280.401,90.055\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t278.402,83.259 287.983,80.788C293.573,79.685 298.807,79.165\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t303.521,79.163C308.23,79.165 315.248,79.685 320.839,80.788C330.418,83.259\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t331.087,89.698 332.503,93.754C334.994,100.887 335.551,109.951\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t335.239,114.098C334.739,120.734 336.931,131.57 336.931,131.57C336.931,131.57\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t340.121,95.609 337.409,87.51Z\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstyle=\\"fill:rgb(204,204,204);fill-rule:nonzero;\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t\\t\\t\\t<g transform=\\"matrix(-10.8191,0,0,8.37903,6226.64,1999.23)\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<path\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M302.892,79.384C302.892,79.384 307.494,74.593 321.021,76.485C334.544,78.375\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t330.902,72.324 328.821,69.929C326.74,67.534 317.091,56.156\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t292.02,60.852C273.953,64.236 264.951,95.255 267.805,111.475C268.351,114.576\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t270.628,114.209 274.235,116.761C274.235,116.761 273.501,98.924\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t282.279,87.011C278.475,100.247 281.596,106.582 281.596,106.582C281.596,106.582\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t279.712,71.095 302.892,79.384Z\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstyle=\\"fill:rgb(204,204,204);fill-rule:nonzero;\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t\\t</g>\\r\\n\\t\\t\\t</g>\\r\\n\\t\\t</g>\\r\\n\\t</svg>\\r\\n{:else if name === 'home'}\\r\\n\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" {width} class=\\"nav-icon\\">\\r\\n\\t\\t<title>home icon</title>\\r\\n\\t\\t<desc>An icon of a home</desc>\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M.783,8.811,12,1.106,23.217,8.811a.5.5,0,0,0,.566-.825l-11.5-7.9a.5.5,0,0,0-.566,0l-11.5,7.9a.5.5,0,0,0,.566.825Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M15,24h3.276A2.227,2.227,0,0,0,20.5,21.776V9.664a.5.5,0,0,0-1,0V21.776A1.225,1.225,0,0,1,18.276,23H15.5V18.5a3.5,3.5,0,0,0-7,0V23H5.724A1.225,1.225,0,0,1,4.5,21.776V9.664a.5.5,0,0,0-1,0V21.776A2.227,2.227,0,0,0,5.724,24H9a.5.5,0,0,0,.5-.5v-5a2.5,2.5,0,0,1,5,0v5A.5.5,0,0,0,15,24Z\\" />\\r\\n\\t\\t<path d=\\"M15,12.5a.5.5,0,0,0,0-1H9a.5.5,0,0,0,0,1Z\\" />\\r\\n\\t</svg>\\r\\n{:else if name === 'about'}\\r\\n\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" {width} class=\\"nav-icon\\">\\r\\n\\t\\t<title>about icon</title>\\r\\n\\t\\t<desc>An icon of a smiling face inside of a rectangle with rounded edges</desc>\\r\\n\\t\\t<circle cx=\\"14.186\\" cy=\\"12.729\\" r=\\"0.75\\" />\\r\\n\\t\\t<circle cx=\\"9.744\\" cy=\\"12.729\\" r=\\"0.75\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M10.017,15.052a2.035,2.035,0,0,0,1.973,1.355,2.015,2.015,0,0,0,1.923-1.355.5.5,0,0,0-.954-.3,1.036,1.036,0,0,1-1.019.656,1,1,0,0,1-.969-.656.5.5,0,0,0-.954.3Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M5.527,6.607v6.587a6.473,6.473,0,1,0,12.946,0V6.607A2.277,2.277,0,0,0,16.2,4.332H7.8A2.277,2.277,0,0,0,5.527,6.607Zm11.946,6.587a5.473,5.473,0,1,1-10.946,0V11.28a6.25,6.25,0,0,0,3.7-1.655,16.452,16.452,0,0,0,7.249,1.656Zm0-6.587V10.28a15.185,15.185,0,0,1-7.11-1.716.5.5,0,0,0-.627.116,5.082,5.082,0,0,1-3.209,1.58V6.607A1.276,1.276,0,0,1,7.8,5.332h8.4A1.276,1.276,0,0,1,17.473,6.607Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M20.7,0H16a.5.5,0,0,0,0,1h4.7A2.305,2.305,0,0,1,23,3.3V8.088a.5.5,0,1,0,1,0V3.3A3.306,3.306,0,0,0,20.7,0Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M.5,8.588a.5.5,0,0,0,.5-.5V3.3A2.305,2.305,0,0,1,3.3,1H8A.5.5,0,0,0,8,0H3.3A3.306,3.306,0,0,0,0,3.3V8.088A.5.5,0,0,0,.5,8.588Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M23.5,15.588a.5.5,0,0,0-.5.5V20.7A2.305,2.305,0,0,1,20.7,23H16a.5.5,0,0,0,0,1h4.7A3.306,3.306,0,0,0,24,20.7V16.088A.5.5,0,0,0,23.5,15.588Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M3.3,24H8a.5.5,0,0,0,0-1H3.3A2.305,2.305,0,0,1,1,20.7V16.088a.5.5,0,1,0-1,0V20.7A3.306,3.306,0,0,0,3.3,24Z\\" />\\r\\n\\t</svg>\\r\\n{:else if name === 'portfolio'}\\r\\n\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" {width} class=\\"nav-icon\\">\\r\\n\\t\\t<title>portfolio icon</title>\\r\\n\\t\\t<desc>Differently sized rounded rectangles contained within an invisible square silhuette</desc>\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M1.539,9h9.422A1.54,1.54,0,0,0,12.5,7.461V1.539A1.54,1.54,0,0,0,10.961,0H1.539A1.54,1.54,0,0,0,0,1.539V7.461A1.54,1.54,0,0,0,1.539,9ZM1,1.539A.54.54,0,0,1,1.539,1h9.422a.54.54,0,0,1,.539.539V7.461A.54.54,0,0,1,10.961,8H1.539A.54.54,0,0,1,1,7.461Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M1.539,24H7.461A1.54,1.54,0,0,0,9,22.461V13.039A1.54,1.54,0,0,0,7.461,11.5H1.539A1.54,1.54,0,0,0,0,13.039v9.422A1.54,1.54,0,0,0,1.539,24ZM1,13.039a.54.54,0,0,1,.539-.539H7.461A.54.54,0,0,1,8,13.039v9.422A.54.54,0,0,1,7.461,23H1.539A.54.54,0,0,1,1,22.461Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M22.461,11.5H13.039A1.54,1.54,0,0,0,11.5,13.039v9.422A1.54,1.54,0,0,0,13.039,24h9.422A1.54,1.54,0,0,0,24,22.461V13.039A1.54,1.54,0,0,0,22.461,11.5ZM23,22.461a.54.54,0,0,1-.539.539H13.039a.54.54,0,0,1-.539-.539V13.039a.54.54,0,0,1,.539-.539h9.422a.54.54,0,0,1,.539.539Z\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M22.461,0H16.539A1.54,1.54,0,0,0,15,1.539V7.461A1.54,1.54,0,0,0,16.539,9h5.922A1.54,1.54,0,0,0,24,7.461V1.539A1.54,1.54,0,0,0,22.461,0ZM23,7.461A.54.54,0,0,1,22.461,8H16.539A.54.54,0,0,1,16,7.461V1.539A.54.54,0,0,1,16.539,1h5.922A.54.54,0,0,1,23,1.539Z\\" />\\r\\n\\t</svg>\\r\\n{:else if name === 'moon'}\\r\\n\\t<svg\\r\\n\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\t\\tenable-background=\\"new 0 0 24 24\\"\\r\\n\\t\\theight={width}\\r\\n\\t\\tviewBox=\\"0 0 24 24\\"\\r\\n\\t\\t{width}\\r\\n\\t\\tfill=\\"#000000\\">\\r\\n\\t\\t<rect fill=\\"none\\" height=\\"24\\" width=\\"24\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19\\r\\n\\t\\t\\tc-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z\\r\\n\\t\\t\\tM12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36\\r\\n\\t\\t\\tc-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z\\" />\\r\\n\\t</svg>\\r\\n{:else if name === 'sun'}\\r\\n\\t<svg\\r\\n\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\t\\tenable-background=\\"new 0 0 24 24\\"\\r\\n\\t\\theight={width}\\r\\n\\t\\tviewBox=\\"0 0 24 24\\"\\r\\n\\t\\t{width}\\r\\n\\t\\tfill=\\"#000000\\">\\r\\n\\t\\t<rect fill=\\"none\\" height=\\"24\\" width=\\"24\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9\\r\\n\\t\\t\\tM12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z\\r\\n\\t\\t\\tM2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z\\r\\n\\t\\t\\tM20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z\\r\\n\\t\\t\\tM11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z\\r\\n\\t\\t\\tM11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z\\r\\n\\t\\t\\tM5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0\\r\\n\\t\\t\\tc-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z\\r\\n\\t\\t\\tM18.36,16.95\\r\\n\\t\\t\\tc-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41\\r\\n\\t\\t\\tL18.36,16.95z\\r\\n\\t\\t\\tM19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41\\r\\n\\t\\t\\ts1.03,0.39,1.41,0L19.42,5.99z\\r\\n\\t\\t\\tM7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06\\r\\n\\t\\t\\tc-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z\\" />\\r\\n\\t</svg>\\r\\n{:else if name === 'triangle'}\\r\\n\\t<svg {width} height={width} viewBox=\\"0 0 392 438\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\r\\n\\t\\t<path d=\\"M390.951 0.500058L196 436.774L1.04929 0.500024L390.951 0.500058Z\\" />\\r\\n\\t</svg>\\r\\n{:else if name === 'tick'}\\r\\n\\t<svg {width} height={width} viewBox=\\"0 0 16 16\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\r\\n\\t\\t<title>ok-icon</title>\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M5 14c.4 0 .778-.158 1.06-.443l9.648-9.833c.39-.395.39-1.033 0-1.428s-1.024-.395-1.414 0L5\\r\\n\\t\\t\\t11.772 1.707 8.296C1.317 7.9.684 7.9.293 8.296c-.39.395-.39 1.033 0 1.428l3.646\\r\\n\\t\\t\\t3.833c.283.285.658.443 1.06.443z\\"\\r\\n\\t\\t\\tfill=\\"none\\"\\r\\n\\t\\t\\tfill-rule=\\"evenodd\\" />\\r\\n\\t</svg>\\r\\n{:else if name === 'arrow-right'}\\r\\n\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 32 32\\" width={width}>\\r\\n\\t\\t<title>Right Arrow</title>\\r\\n\\t\\t<g id=\\"Right-3\\" data-name=\\"Right\\">\\r\\n\\t\\t\\t<path\\r\\n\\t\\t\\t\\td=\\"M32,16a.9994.9994,0,0,1-.3271.74l-11,10A1,1,0,0,1,19,26V21H1a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H19V6a1,1,0,0,1,1.6729-.74l11,10A.9994.9994,0,0,1,32,16Z\\"\\r\\n\\t\\t\\t\\tstyle=\\"none\\" />\\r\\n\\t\\t</g>\\r\\n\\t</svg>\\r\\n{/if}\\r\\n\\r\\n<style lang=\\"scss\\">:global(svg, svg path) {\\n  transition: fill 400ms, transform 250ms; }\\n</style>\\r\\n"],"names":[],"mappings":"AAwM2B,aAAa,AAAE,CAAC,AACzC,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,CAAC,SAAS,CAAC,KAAK,AAAE,CAAC"}`
};
var Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name, width } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  $$result.css.add(css$p);
  return `${name === "logo" ? `<svg class="${"logo s-gTLmg6Hqck1H"}" viewBox="${"0 0 67 67"}" aria-labelledby="${"title desc"}"${add_attribute("width", width, 0)}><title>logo icon</title><desc>An icon of a shadowy silhuette of a bearded man wearing glasses</desc><g transform="${"matrix(1,0,0,1,-35984,-1992)"}"><g id="${"logo-box"}" transform="${"matrix(1,0,0,1,-0.192025,-0.49761)"}"><rect x="${"35984.2"}" y="${"1992.5"}" width="${"66.304"}" height="${"66.304"}" style="${"fill:none;"}"></rect><clipPath id="${"_clip1"}"><rect x="${"35984.2"}" y="${"1992.5"}" width="${"66.304"}" height="${"66.304"}"></rect></clipPath><g clip-path="${"url(#_clip1)"}"><g transform="${"matrix(0.0557345,4.98563e-34,1.06433e-32,0.0600478,35841.3,1842.4)"}"><g><g transform="${"matrix(4.16667,0,0,4.16667,2270.23,2633.3)"}"><path d="${"M188.979,205.103C176.94,213.129 172.892,207.656 174.351,200.725C175.811,193.793\r\n									169.643,190.874 163.806,190.874C157.969,190.874 151.801,193.793\r\n									153.26,200.725C154.719,207.656 150.672,213.129 138.633,205.103C132.58,201.066\r\n									129.132,197.571 126.611,193.898C123.899,187.894 123.53,180.602\r\n									133.331,179.587C143.911,178.492 156.509,180.659 163.806,180.659C171.102,180.659\r\n									183.701,178.492 194.281,179.587C204.082,180.602 203.712,187.894\r\n									201,193.898C198.479,197.571 195.032,201.066\r\n									188.979,205.103ZM251.548,78.689C243.339,66.832 247.296,110.233\r\n									242.918,129.569C238.54,148.905 233.358,154.639 225.065,165.701C222.105,169.649\r\n									212.056,173.143 210.303,176.245C201.275,165.215 197.909,163.995\r\n									186.881,161.321C175.016,158.445 167.852,165.654 163.806,165.863C159.759,165.654\r\n									152.596,158.445 140.73,161.321C129.703,163.995 126.21,165.593\r\n									117.308,176.245C115.556,173.143 105.473,169.674 102.546,165.701C94.253,154.442\r\n									91.006,148.449 84.956,129.569C79.155,111.467 79.379,71.072\r\n									76.063,78.689C72.635,86.562 73.396,123.654 79.964,145.544C86.531,167.433\r\n									95.96,176.68 101.068,195.287C106.175,213.893 122.945,232.938\r\n									163.806,232.938C204.667,232.938 221.436,213.893 226.543,195.287C231.651,176.68\r\n									241.08,167.433 247.647,145.544C254.213,123.654 256.436,85.749 251.548,78.689Z"}" style="${"fill:rgb(204,204,204);fill-rule:nonzero;"}"></path></g><g transform="${"matrix(0.772008,-0.0104727,0.0110494,0.814515,966.226,913.349)"}"><path d="${"M2911.47,2589.44C2911.47,2561.7 2885.87,2539.18\r\n									2854.34,2539.18L2643.52,2539.18C2611.99,2539.18 2586.39,2561.7\r\n									2586.39,2589.44L2586.39,2689.96C2586.39,2717.7 2611.99,2740.22\r\n									2643.52,2740.22L2854.34,2740.22C2885.87,2740.22 2911.47,2717.7\r\n									2911.47,2689.96L2911.47,2589.44Z"}" style="${"fill:rgb(204,204,204);"}"></path></g><g transform="${"matrix(0.772012,0.0102181,-0.0107807,0.814518,692.438,856.462)"}"><path d="${"M2911.47,2589.44C2911.47,2561.7 2885.87,2539.18\r\n									2854.34,2539.18L2643.52,2539.18C2611.99,2539.18 2586.39,2561.7\r\n									2586.39,2589.44L2586.39,2689.96C2586.39,2717.7 2611.99,2740.22\r\n									2643.52,2740.22L2854.34,2740.22C2885.87,2740.22 2911.47,2717.7\r\n									2911.47,2689.96L2911.47,2589.44Z"}" style="${"fill:rgb(204,204,204);"}"></path></g><g transform="${"matrix(1,0,0,1.69276,0,-2072.31)"}"><path d="${"M3322.37,2918.03L3327.05,2991.82L3295.89,2990.38L3298.15,2918.03L3322.37,2918.03Z"}" style="${"fill:rgb(204,204,204);"}"></path></g><g transform="${"matrix(-10.6486,0,0,8.37903,6168.93,1999.23)"}"><path d="${"M337.409,87.51C334.577,79.051 330.594,70.117 315.473,69.468C311.917,69.314\r\n									307.809,69.101 303.521,69.079C299.23,69.101 295.122,69.314\r\n									291.564,69.468C276.442,70.117 272.118,80.655 269.286,89.113C266.574,97.213\r\n									269.699,125.939 269.699,125.939C269.699,125.939 271.481,120.734\r\n									270.98,114.098C270.669,109.951 271.319,98.286 276.318,93.754C280.401,90.055\r\n									278.402,83.259 287.983,80.788C293.573,79.685 298.807,79.165\r\n									303.521,79.163C308.23,79.165 315.248,79.685 320.839,80.788C330.418,83.259\r\n									331.087,89.698 332.503,93.754C334.994,100.887 335.551,109.951\r\n									335.239,114.098C334.739,120.734 336.931,131.57 336.931,131.57C336.931,131.57\r\n									340.121,95.609 337.409,87.51Z"}" style="${"fill:rgb(204,204,204);fill-rule:nonzero;"}"></path></g><g transform="${"matrix(-10.8191,0,0,8.37903,6226.64,1999.23)"}"><path d="${"M302.892,79.384C302.892,79.384 307.494,74.593 321.021,76.485C334.544,78.375\r\n									330.902,72.324 328.821,69.929C326.74,67.534 317.091,56.156\r\n									292.02,60.852C273.953,64.236 264.951,95.255 267.805,111.475C268.351,114.576\r\n									270.628,114.209 274.235,116.761C274.235,116.761 273.501,98.924\r\n									282.279,87.011C278.475,100.247 281.596,106.582 281.596,106.582C281.596,106.582\r\n									279.712,71.095 302.892,79.384Z"}" style="${"fill:rgb(204,204,204);fill-rule:nonzero;"}"></path></g></g></g></g></g></g></svg>` : `${name === "home" ? `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"${add_attribute("width", width, 0)} class="${"nav-icon"}"><title>home icon</title><desc>An icon of a home</desc><path d="${"M.783,8.811,12,1.106,23.217,8.811a.5.5,0,0,0,.566-.825l-11.5-7.9a.5.5,0,0,0-.566,0l-11.5,7.9a.5.5,0,0,0,.566.825Z"}"></path><path d="${"M15,24h3.276A2.227,2.227,0,0,0,20.5,21.776V9.664a.5.5,0,0,0-1,0V21.776A1.225,1.225,0,0,1,18.276,23H15.5V18.5a3.5,3.5,0,0,0-7,0V23H5.724A1.225,1.225,0,0,1,4.5,21.776V9.664a.5.5,0,0,0-1,0V21.776A2.227,2.227,0,0,0,5.724,24H9a.5.5,0,0,0,.5-.5v-5a2.5,2.5,0,0,1,5,0v5A.5.5,0,0,0,15,24Z"}"></path><path d="${"M15,12.5a.5.5,0,0,0,0-1H9a.5.5,0,0,0,0,1Z"}"></path></svg>` : `${name === "about" ? `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"${add_attribute("width", width, 0)} class="${"nav-icon"}"><title>about icon</title><desc>An icon of a smiling face inside of a rectangle with rounded edges</desc><circle cx="${"14.186"}" cy="${"12.729"}" r="${"0.75"}"></circle><circle cx="${"9.744"}" cy="${"12.729"}" r="${"0.75"}"></circle><path d="${"M10.017,15.052a2.035,2.035,0,0,0,1.973,1.355,2.015,2.015,0,0,0,1.923-1.355.5.5,0,0,0-.954-.3,1.036,1.036,0,0,1-1.019.656,1,1,0,0,1-.969-.656.5.5,0,0,0-.954.3Z"}"></path><path d="${"M5.527,6.607v6.587a6.473,6.473,0,1,0,12.946,0V6.607A2.277,2.277,0,0,0,16.2,4.332H7.8A2.277,2.277,0,0,0,5.527,6.607Zm11.946,6.587a5.473,5.473,0,1,1-10.946,0V11.28a6.25,6.25,0,0,0,3.7-1.655,16.452,16.452,0,0,0,7.249,1.656Zm0-6.587V10.28a15.185,15.185,0,0,1-7.11-1.716.5.5,0,0,0-.627.116,5.082,5.082,0,0,1-3.209,1.58V6.607A1.276,1.276,0,0,1,7.8,5.332h8.4A1.276,1.276,0,0,1,17.473,6.607Z"}"></path><path d="${"M20.7,0H16a.5.5,0,0,0,0,1h4.7A2.305,2.305,0,0,1,23,3.3V8.088a.5.5,0,1,0,1,0V3.3A3.306,3.306,0,0,0,20.7,0Z"}"></path><path d="${"M.5,8.588a.5.5,0,0,0,.5-.5V3.3A2.305,2.305,0,0,1,3.3,1H8A.5.5,0,0,0,8,0H3.3A3.306,3.306,0,0,0,0,3.3V8.088A.5.5,0,0,0,.5,8.588Z"}"></path><path d="${"M23.5,15.588a.5.5,0,0,0-.5.5V20.7A2.305,2.305,0,0,1,20.7,23H16a.5.5,0,0,0,0,1h4.7A3.306,3.306,0,0,0,24,20.7V16.088A.5.5,0,0,0,23.5,15.588Z"}"></path><path d="${"M3.3,24H8a.5.5,0,0,0,0-1H3.3A2.305,2.305,0,0,1,1,20.7V16.088a.5.5,0,1,0-1,0V20.7A3.306,3.306,0,0,0,3.3,24Z"}"></path></svg>` : `${name === "portfolio" ? `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"${add_attribute("width", width, 0)} class="${"nav-icon"}"><title>portfolio icon</title><desc>Differently sized rounded rectangles contained within an invisible square silhuette</desc><path d="${"M1.539,9h9.422A1.54,1.54,0,0,0,12.5,7.461V1.539A1.54,1.54,0,0,0,10.961,0H1.539A1.54,1.54,0,0,0,0,1.539V7.461A1.54,1.54,0,0,0,1.539,9ZM1,1.539A.54.54,0,0,1,1.539,1h9.422a.54.54,0,0,1,.539.539V7.461A.54.54,0,0,1,10.961,8H1.539A.54.54,0,0,1,1,7.461Z"}"></path><path d="${"M1.539,24H7.461A1.54,1.54,0,0,0,9,22.461V13.039A1.54,1.54,0,0,0,7.461,11.5H1.539A1.54,1.54,0,0,0,0,13.039v9.422A1.54,1.54,0,0,0,1.539,24ZM1,13.039a.54.54,0,0,1,.539-.539H7.461A.54.54,0,0,1,8,13.039v9.422A.54.54,0,0,1,7.461,23H1.539A.54.54,0,0,1,1,22.461Z"}"></path><path d="${"M22.461,11.5H13.039A1.54,1.54,0,0,0,11.5,13.039v9.422A1.54,1.54,0,0,0,13.039,24h9.422A1.54,1.54,0,0,0,24,22.461V13.039A1.54,1.54,0,0,0,22.461,11.5ZM23,22.461a.54.54,0,0,1-.539.539H13.039a.54.54,0,0,1-.539-.539V13.039a.54.54,0,0,1,.539-.539h9.422a.54.54,0,0,1,.539.539Z"}"></path><path d="${"M22.461,0H16.539A1.54,1.54,0,0,0,15,1.539V7.461A1.54,1.54,0,0,0,16.539,9h5.922A1.54,1.54,0,0,0,24,7.461V1.539A1.54,1.54,0,0,0,22.461,0ZM23,7.461A.54.54,0,0,1,22.461,8H16.539A.54.54,0,0,1,16,7.461V1.539A.54.54,0,0,1,16.539,1h5.922A.54.54,0,0,1,23,1.539Z"}"></path></svg>` : `${name === "moon" ? `<svg xmlns="${"http://www.w3.org/2000/svg"}" enable-background="${"new 0 0 24 24"}"${add_attribute("height", width, 0)} viewBox="${"0 0 24 24"}"${add_attribute("width", width, 0)} fill="${"#000000"}"><rect fill="${"none"}" height="${"24"}" width="${"24"}"></rect><path d="${"M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19\r\n			c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z\r\n			M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36\r\n			c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"}"></path></svg>` : `${name === "sun" ? `<svg xmlns="${"http://www.w3.org/2000/svg"}" enable-background="${"new 0 0 24 24"}"${add_attribute("height", width, 0)} viewBox="${"0 0 24 24"}"${add_attribute("width", width, 0)} fill="${"#000000"}"><rect fill="${"none"}" height="${"24"}" width="${"24"}"></rect><path d="${"M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9\r\n			M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z\r\n			M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z\r\n			M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z\r\n			M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z\r\n			M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z\r\n			M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0\r\n			c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z\r\n			M18.36,16.95\r\n			c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41\r\n			L18.36,16.95z\r\n			M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41\r\n			s1.03,0.39,1.41,0L19.42,5.99z\r\n			M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06\r\n			c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"}"></path></svg>` : `${name === "triangle" ? `<svg${add_attribute("width", width, 0)}${add_attribute("height", width, 0)} viewBox="${"0 0 392 438"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M390.951 0.500058L196 436.774L1.04929 0.500024L390.951 0.500058Z"}"></path></svg>` : `${name === "tick" ? `<svg${add_attribute("width", width, 0)}${add_attribute("height", width, 0)} viewBox="${"0 0 16 16"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>ok-icon</title><path d="${"M5 14c.4 0 .778-.158 1.06-.443l9.648-9.833c.39-.395.39-1.033 0-1.428s-1.024-.395-1.414 0L5\r\n			11.772 1.707 8.296C1.317 7.9.684 7.9.293 8.296c-.39.395-.39 1.033 0 1.428l3.646\r\n			3.833c.283.285.658.443 1.06.443z"}" fill="${"none"}" fill-rule="${"evenodd"}"></path></svg>` : `${name === "arrow-right" ? `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 32 32"}"${add_attribute("width", width, 0)}><title>Right Arrow</title><g id="${"Right-3"}" data-name="${"Right"}"><path d="${"M32,16a.9994.9994,0,0,1-.3271.74l-11,10A1,1,0,0,1,19,26V21H1a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H19V6a1,1,0,0,1,1.6729-.74l11,10A.9994.9994,0,0,1,32,16Z"}" style="${"none"}"></path></g></svg>` : ``}`}`}`}`}`}`}`}`}`;
});
var css$o = {
  code: ".logo-container.svelte-qbpoi3.svelte-qbpoi3{z-index:var(--z-index-priority);display:flex;flex-flow:row nowrap;justify-content:start;align-items:center;color:var(--clr-text-heading)}.logo-container__logo-text.svelte-qbpoi3.svelte-qbpoi3{transition:color 400ms;font-family:'Fira Sans', sans-serif;text-transform:uppercase;font-weight:700;font-size:2rem;color:inherit}.logo-container__logo-text.svelte-qbpoi3 span.svelte-qbpoi3{color:var(--clr-text-logo-span);transition:color 400ms}a.logo-container.svelte-qbpoi3.svelte-qbpoi3:hover{color:var(--clr-text-accent-cyan)}a.logo-container.svelte-qbpoi3:hover span.svelte-qbpoi3{color:inherit}a.logo-container svg.logo path{fill:var(--clr-text-heading) !important}a.logo-container:hover svg.logo path{fill:var(--clr-text-accent-cyan) !important}",
  map: `{"version":3,"file":"Logo.svelte","sources":["Logo.svelte"],"sourcesContent":["<script>\\r\\n\\timport Icon from '../Decorations/Icon.svelte';\\r\\n\\timport {flyItem} from '$lib/scripts/animations.js'\\r\\n<\/script>\\r\\n\\r\\n<a href=\\"/\\" class=\\"logo-container\\" use:flyItem={'-20rem'}>\\r\\n\\t<div class=\\"logo-container__logo-img-container\\">\\r\\n\\t\\t<Icon name=\\"logo\\" width=\\"3.9rem\\" />\\r\\n\\t</div>\\r\\n\\t<p class=\\"logo-container__logo-text\\">\\r\\n\\t\\trafal<span>potasz</span>\\r\\n\\t</p>\\r\\n</a>\\r\\n\\r\\n<style lang=\\"scss\\">.logo-container {\\n  z-index: var(--z-index-priority);\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: start;\\n  align-items: center;\\n  color: var(--clr-text-heading); }\\n  .logo-container__logo-text {\\n    transition: color 400ms;\\n    font-family: 'Fira Sans', sans-serif;\\n    text-transform: uppercase;\\n    font-weight: 700;\\n    font-size: 2rem;\\n    color: inherit; }\\n    .logo-container__logo-text span {\\n      color: var(--clr-text-logo-span);\\n      transition: color 400ms; }\\n\\na.logo-container:hover {\\n  color: var(--clr-text-accent-cyan); }\\n  a.logo-container:hover span {\\n    color: inherit; }\\n\\n:global(a.logo-container svg.logo path) {\\n  fill: var(--clr-text-heading) !important; }\\n\\n:global(a.logo-container:hover svg.logo path) {\\n  fill: var(--clr-text-accent-cyan) !important; }\\n</style>\\r\\n"],"names":[],"mappings":"AAcmB,eAAe,4BAAC,CAAC,AAClC,OAAO,CAAE,IAAI,kBAAkB,CAAC,CAChC,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,kBAAkB,CAAC,AAAE,CAAC,AACjC,0BAA0B,4BAAC,CAAC,AAC1B,UAAU,CAAE,KAAK,CAAC,KAAK,CACvB,WAAW,CAAE,WAAW,CAAC,CAAC,UAAU,CACpC,cAAc,CAAE,SAAS,CACzB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OAAO,AAAE,CAAC,AACjB,wCAA0B,CAAC,IAAI,cAAC,CAAC,AAC/B,KAAK,CAAE,IAAI,oBAAoB,CAAC,CAChC,UAAU,CAAE,KAAK,CAAC,KAAK,AAAE,CAAC,AAEhC,CAAC,2CAAe,MAAM,AAAC,CAAC,AACtB,KAAK,CAAE,IAAI,sBAAsB,CAAC,AAAE,CAAC,AACrC,CAAC,6BAAe,MAAM,CAAC,IAAI,cAAC,CAAC,AAC3B,KAAK,CAAE,OAAO,AAAE,CAAC,AAEb,8BAA8B,AAAE,CAAC,AACvC,IAAI,CAAE,IAAI,kBAAkB,CAAC,CAAC,UAAU,AAAE,CAAC,AAErC,oCAAoC,AAAE,CAAC,AAC7C,IAAI,CAAE,IAAI,sBAAsB,CAAC,CAAC,UAAU,AAAE,CAAC"}`
};
var Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$o);
  return `<a href="${"/"}" class="${"logo-container svelte-qbpoi3"}"><div class="${"logo-container__logo-img-container"}">${validate_component(Icon, "Icon").$$render($$result, { name: "logo", width: "3.9rem" }, {}, {})}</div>
	<p class="${"logo-container__logo-text svelte-qbpoi3"}">rafal<span class="${"svelte-qbpoi3"}">potasz</span></p>
</a>`;
});
var darkmode = writable();
var customDarkmode = {
  subscribe: darkmode.subscribe,
  setDarkmode: () => {
    darkmode.update((currentDm) => {
      let dm = currentDm;
      dm = !dm;
      localStorage.setItem("darkmode", JSON.stringify(dm));
      return dm;
    });
    customDarkmode.updateBody();
  },
  checkDarkmode: () => {
    let local = JSON.parse(localStorage.getItem("darkmode"));
    if (local === null) {
      darkmode.set(true);
    } else {
      darkmode.set(local);
    }
    customDarkmode.updateBody();
  },
  updateBody: () => {
    let currentDm = get_store_value(darkmode);
    let body = document.body;
    if (currentDm) {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }
};
var css$n = {
  code: "label.svelte-1t2mwsq.svelte-1t2mwsq{width:4.25rem;height:2rem;background:var(--clr-toggle-bg);border-radius:20rem;position:relative;cursor:pointer;transition:background 400ms}label.svelte-1t2mwsq.svelte-1t2mwsq::after,label.svelte-1t2mwsq .icon-container.svelte-1t2mwsq{height:1.4rem;width:1.4rem;position:absolute;top:50%;transform:translate(0, -50%)}label.svelte-1t2mwsq .icon-container svg{fill:transparent}label.svelte-1t2mwsq .icon-container.active svg{fill:var(--clr-toggle-accent)}label.svelte-1t2mwsq .sun-container.svelte-1t2mwsq{left:calc(3.825rem - 1.4rem)}label.svelte-1t2mwsq .moon-container.svelte-1t2mwsq{left:0.425rem}label.svelte-1t2mwsq input.svelte-1t2mwsq{display:none}label.svelte-1t2mwsq.svelte-1t2mwsq::after{content:'';position:absolute;left:0.425rem;background:var(--clr-toggle-dial);transition:background 400ms;border-radius:50%;transition:left 400ms}label.checked.svelte-1t2mwsq.svelte-1t2mwsq::after{left:calc(3.825rem - 1.4rem)}",
  map: `{"version":3,"file":"DarkmodeToggle.svelte","sources":["DarkmodeToggle.svelte"],"sourcesContent":["<script>\\r\\n    import Icon from '$lib/Decorations/Icon.svelte'\\r\\n    import dmstore from '$lib/stores/darkmode.js'\\r\\n    import {onMount} from 'svelte';\\r\\n    let mounted = false\\r\\n    let checked = false\\r\\n    $: if($dmstore){\\r\\n        checked = $dmstore\\r\\n    } \\r\\n\\r\\n    onMount(() => {\\r\\n        dmstore.checkDarkmode()\\r\\n\\r\\n    })\\r\\n\\r\\n    const updateDarkmodeState = () => {\\r\\n        dmstore.setDarkmode()\\r\\n    }\\r\\n\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n    <label for=\\"darkmode-toggle\\" class:checked={checked} >\\r\\n        <input type=\\"checkbox\\" id=\\"darkmode-toggle\\" bind:checked={checked} on:click={updateDarkmodeState}>\\r\\n        <div class=\\"icon-container sun-container\\" class:active={!checked}>\\r\\n            <Icon name=\\"sun\\" width=\\"1.4rem\\" />\\r\\n        </div>\\r\\n        <div class=\\"icon-container moon-container\\" class:active={checked}>\\r\\n            <Icon name=\\"moon\\" width=\\"1.4rem\\" />\\r\\n        </div>\\r\\n    </label>\\r\\n\\r\\n<style lang=\\"scss\\">label {\\n  width: 4.25rem;\\n  height: 2rem;\\n  background: var(--clr-toggle-bg);\\n  border-radius: 20rem;\\n  position: relative;\\n  cursor: pointer;\\n  transition: background 400ms; }\\n  label::after, label .icon-container {\\n    height: 1.4rem;\\n    width: 1.4rem;\\n    position: absolute;\\n    top: 50%;\\n    transform: translate(0, -50%); }\\n  label :global(.icon-container svg) {\\n    fill: transparent; }\\n  label :global(.icon-container.active svg) {\\n    fill: var(--clr-toggle-accent); }\\n  label .sun-container {\\n    left: calc(3.825rem - 1.4rem); }\\n  label .moon-container {\\n    left: 0.425rem; }\\n  label input {\\n    display: none; }\\n  label::after {\\n    content: '';\\n    position: absolute;\\n    left: 0.425rem;\\n    background: var(--clr-toggle-dial);\\n    transition: background 400ms;\\n    border-radius: 50%;\\n    transition: left 400ms; }\\n  label.checked::after {\\n    left: calc(3.825rem - 1.4rem); }\\n</style>"],"names":[],"mappings":"AAiCmB,KAAK,8BAAC,CAAC,AACxB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,eAAe,CAAC,CAChC,aAAa,CAAE,KAAK,CACpB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,UAAU,CAAC,KAAK,AAAE,CAAC,AAC/B,mCAAK,OAAO,CAAE,oBAAK,CAAC,eAAe,eAAC,CAAC,AACnC,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,MAAM,CACb,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,UAAU,CAAC,CAAC,CAAC,IAAI,CAAC,AAAE,CAAC,AAClC,oBAAK,CAAC,AAAQ,mBAAmB,AAAE,CAAC,AAClC,IAAI,CAAE,WAAW,AAAE,CAAC,AACtB,oBAAK,CAAC,AAAQ,0BAA0B,AAAE,CAAC,AACzC,IAAI,CAAE,IAAI,mBAAmB,CAAC,AAAE,CAAC,AACnC,oBAAK,CAAC,cAAc,eAAC,CAAC,AACpB,IAAI,CAAE,KAAK,QAAQ,CAAC,CAAC,CAAC,MAAM,CAAC,AAAE,CAAC,AAClC,oBAAK,CAAC,eAAe,eAAC,CAAC,AACrB,IAAI,CAAE,QAAQ,AAAE,CAAC,AACnB,oBAAK,CAAC,KAAK,eAAC,CAAC,AACX,OAAO,CAAE,IAAI,AAAE,CAAC,AAClB,mCAAK,OAAO,AAAC,CAAC,AACZ,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,QAAQ,CACd,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,UAAU,CAAE,UAAU,CAAC,KAAK,CAC5B,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAAC,KAAK,AAAE,CAAC,AAC3B,KAAK,sCAAQ,OAAO,AAAC,CAAC,AACpB,IAAI,CAAE,KAAK,QAAQ,CAAC,CAAC,CAAC,MAAM,CAAC,AAAE,CAAC"}`
};
var DarkmodeToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dmstore, $$unsubscribe_dmstore;
  $$unsubscribe_dmstore = subscribe(customDarkmode, (value) => $dmstore = value);
  let checked = false;
  $$result.css.add(css$n);
  {
    if ($dmstore) {
      checked = $dmstore;
    }
  }
  $$unsubscribe_dmstore();
  return `<label for="${"darkmode-toggle"}" class="${["svelte-1t2mwsq", checked ? "checked" : ""].join(" ").trim()}"><input type="${"checkbox"}" id="${"darkmode-toggle"}" class="${"svelte-1t2mwsq"}"${add_attribute("checked", checked, 1)}>
        <div class="${["icon-container sun-container svelte-1t2mwsq", !checked ? "active" : ""].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, { name: "sun", width: "1.4rem" }, {}, {})}</div>
        <div class="${["icon-container moon-container svelte-1t2mwsq", checked ? "active" : ""].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, { name: "moon", width: "1.4rem" }, {}, {})}</div>
    </label>`;
});
var getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
var page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function __rest(s2, e) {
  var t = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
      t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
function crossfade(_a) {
  var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
  const to_receive = new Map();
  const to_send = new Map();
  function crossfade2(from, node, params) {
    const { delay = 0, duration = (d2) => Math.sqrt(d2) * 30, easing = cubicOut } = assign(assign({}, defaults), params);
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, {
        rect: node.getBoundingClientRect()
      });
      return () => {
        if (counterparts.has(params.key)) {
          const { rect } = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(rect, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [
    transition(to_send, to_receive, false),
    transition(to_receive, to_send, true)
  ];
}
var capitaliseFirstLetter = (string) => {
  let array = string.split("");
  array[0] = array[0].toUpperCase();
  return array.join("");
};
var calcRealSize = (winWidth, scrollWidth) => {
  let width = winWidth - scrollWidth;
  let result;
  if (width >= 1248) {
    result = "desktop";
  } else if (width >= 768) {
    result = "tablet";
  } else {
    result = "mobile";
  }
  return result;
};
var css$m = {
  code: ".navigation.svelte-tcvtje{position:absolute;top:calc(100% + 3rem);z-index:var(--z-index-priority);display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:6rem}a.navigation__link.svelte-tcvtje{transition:color 400ms;font-size:2.8rem;font-family:var(--fira);color:var(--clr-text-faded);z-index:5;display:flex;flex-flow:row nowrap;justify-content:start;align-items:center;gap:2.2rem}a.navigation__link.active.svelte-tcvtje{color:var(--clr-text-accent-cyan)}a.navigation__link.svelte-tcvtje:hover:not(.active){color:var(--clr-text-focused)}a.navigation__link.active svg path{fill:var(--clr-text-accent-cyan) !important}a.navigation__link:not(.active) svg path{fill:var(--clr-text-faded) !important}a.navigation__link:hover:not(.active) svg path{fill:var(--clr-text-focused) !important}",
  map: `{"version":3,"file":"MobileNav.svelte","sources":["MobileNav.svelte"],"sourcesContent":["<script>\\r\\n\\timport DmToggle from './DarkmodeToggle.svelte';\\r\\n\\timport { page } from '$app/stores';\\r\\n\\timport { flyItem } from '$lib/scripts/animations.js';\\r\\n\\timport { fly } from 'svelte/transition';\\r\\n\\timport { capitaliseFirstLetter } from '$lib/scripts/helperFunctions.js';\\r\\n\\timport Icon from '$lib/Decorations/Icon.svelte';\\r\\n\\timport { createEventDispatcher } from 'svelte';\\r\\n\\tconst dispatch = createEventDispatcher();\\r\\n\\r\\n\\t$: path = $page.path;\\r\\n\\tlet navData = [\\r\\n\\t\\t{ name: 'home', link: '/' },\\r\\n\\t\\t{ name: 'about', link: '/about' },\\r\\n\\t\\t{ name: 'portfolio', link: '/portfolio' }\\r\\n\\t];\\r\\n\\r\\n\\tconst closeNavModal = () => {\\r\\n\\t\\tdispatch('closeNavModal')\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<nav class=\\"navigation\\" out:fly={{ duration: 250, x: -100 }}>\\r\\n\\t{#each navData as { name, link }, i}\\r\\n\\t\\t<a\\r\\n\\t\\t\\thref={link}\\r\\n\\t\\t\\tclass=\\"navigation__link\\"\\r\\n\\t\\t\\tclass:active={path === link}\\r\\n\\t\\t\\tuse:flyItem={['-20rem', 0.15, i]} on:click={closeNavModal}>\\r\\n\\t\\t\\t<Icon {name} width=\\"2.89rem\\" />\\r\\n\\t\\t\\t<p class=\\"navigation__link-text\\">{capitaliseFirstLetter(name)}</p>\\r\\n\\t\\t</a>\\r\\n\\t{/each}\\r\\n\\t<DmToggle />\\r\\n\\r\\n</nav>\\r\\n\\r\\n<style lang=\\"scss\\">.navigation {\\n  position: absolute;\\n  top: calc(100% + 3rem);\\n  z-index: var(--z-index-priority);\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 6rem; }\\n\\na.navigation__link {\\n  transition: color 400ms;\\n  font-size: 2.8rem;\\n  font-family: var(--fira);\\n  color: var(--clr-text-faded);\\n  z-index: 5;\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: start;\\n  align-items: center;\\n  gap: 2.2rem; }\\n  a.navigation__link.active {\\n    color: var(--clr-text-accent-cyan); }\\n  a.navigation__link:hover:not(.active) {\\n    color: var(--clr-text-focused); }\\n\\n:global(a.navigation__link.active svg path) {\\n  fill: var(--clr-text-accent-cyan) !important; }\\n\\n:global(a.navigation__link:not(.active) svg path) {\\n  fill: var(--clr-text-faded) !important; }\\n\\n:global(a.navigation__link:hover:not(.active) svg path) {\\n  fill: var(--clr-text-focused) !important; }\\n</style>\\r\\n"],"names":[],"mappings":"AAqCmB,WAAW,cAAC,CAAC,AAC9B,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACtB,OAAO,CAAE,IAAI,kBAAkB,CAAC,CAChC,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,IAAI,AAAE,CAAC,AAEd,CAAC,iBAAiB,cAAC,CAAC,AAClB,UAAU,CAAE,KAAK,CAAC,KAAK,CACvB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MAAM,AAAE,CAAC,AACd,CAAC,iBAAiB,OAAO,cAAC,CAAC,AACzB,KAAK,CAAE,IAAI,sBAAsB,CAAC,AAAE,CAAC,AACvC,CAAC,+BAAiB,MAAM,KAAK,OAAO,CAAC,AAAC,CAAC,AACrC,KAAK,CAAE,IAAI,kBAAkB,CAAC,AAAE,CAAC,AAE7B,kCAAkC,AAAE,CAAC,AAC3C,IAAI,CAAE,IAAI,sBAAsB,CAAC,CAAC,UAAU,AAAE,CAAC,AAEzC,wCAAwC,AAAE,CAAC,AACjD,IAAI,CAAE,IAAI,gBAAgB,CAAC,CAAC,UAAU,AAAE,CAAC,AAEnC,8CAA8C,AAAE,CAAC,AACvD,IAAI,CAAE,IAAI,kBAAkB,CAAC,CAAC,UAAU,AAAE,CAAC"}`
};
var MobileNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  createEventDispatcher();
  let navData = [
    { name: "home", link: "/" },
    { name: "about", link: "/about" },
    { name: "portfolio", link: "/portfolio" }
  ];
  $$result.css.add(css$m);
  path = $page.path;
  $$unsubscribe_page();
  return `<nav class="${"navigation svelte-tcvtje"}">${each(navData, ({ name, link }, i) => `<a${add_attribute("href", link, 0)} class="${["navigation__link svelte-tcvtje", path === link ? "active" : ""].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, { name, width: "2.89rem" }, {}, {})}
			<p class="${"navigation__link-text"}">${escape(capitaliseFirstLetter(name))}</p>
		</a>`)}
	${validate_component(DarkmodeToggle, "DmToggle").$$render($$result, {}, {}, {})}

</nav>`;
});
var css$l = {
  code: ".navigation.svelte-mii2jr{z-index:var(--z-index-priority);display:flex;flex-flow:row nowrap;justify-content:start;align-items:start;gap:3rem}a.navigation__link.svelte-mii2jr{transition:color 400ms;font-size:1.6rem;font-family:var(--fira);color:var(--clr-text-faded);z-index:5;display:flex;flex-flow:row nowrap;justify-content:start;align-items:center;gap:1rem}a.navigation__link.active.svelte-mii2jr{color:var(--clr-text-accent-cyan)}a.navigation__link.svelte-mii2jr:hover:not(.active){color:var(--clr-text-focused)}a.navigation__link.active svg path{fill:var(--clr-text-accent-cyan) !important}a.navigation__link:hover:not(.active) svg path{fill:var(--clr-text-focused) !important}",
  map: `{"version":3,"file":"TabDesNav.svelte","sources":["TabDesNav.svelte"],"sourcesContent":["<script>\\r\\n\\timport DmToggle from './DarkmodeToggle.svelte';\\r\\n\\r\\n\\timport { flyItem } from '$lib/scripts/animations.js';\\r\\n\\timport { page } from '$app/stores';\\r\\n\\t$: path = $page.path;\\r\\n\\timport { capitaliseFirstLetter } from '$lib/scripts/helperFunctions.js';\\r\\n\\timport Icon from '$lib/Decorations/Icon.svelte';\\r\\n\\tlet navData = [\\r\\n\\t\\t{ name: 'home', link: '/' },\\r\\n\\t\\t{ name: 'about', link: '/about' },\\r\\n\\t\\t{ name: 'portfolio', link: '/portfolio' }\\r\\n\\t];\\r\\n<\/script>\\r\\n\\r\\n<nav class=\\"navigation\\">\\r\\n\\t{#each navData as { name, link }, i}\\r\\n\\t\\t<a\\r\\n\\t\\t\\thref={link}\\r\\n\\t\\t\\tclass=\\"navigation__link\\"\\r\\n\\t\\t\\tclass:active={path === link}\\r\\n\\t\\t\\tuse:flyItem={['-20rem', 0.15, i]}>\\r\\n\\t\\t\\t<Icon {name} width=\\"1.8rem\\" />\\r\\n\\r\\n\\t\\t\\t<p class=\\"navigation__link-text\\">{capitaliseFirstLetter(name)}</p>\\r\\n\\t\\t</a>\\r\\n\\t{/each}\\r\\n\\t<DmToggle />\\r\\n\\r\\n</nav>\\r\\n\\r\\n<style lang=\\"scss\\">.navigation {\\n  z-index: var(--z-index-priority);\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 3rem; }\\n\\na.navigation__link {\\n  transition: color 400ms;\\n  font-size: 1.6rem;\\n  font-family: var(--fira);\\n  color: var(--clr-text-faded);\\n  z-index: 5;\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: start;\\n  align-items: center;\\n  gap: 1rem; }\\n  a.navigation__link.active {\\n    color: var(--clr-text-accent-cyan); }\\n  a.navigation__link:hover:not(.active) {\\n    color: var(--clr-text-focused); }\\n\\n:global(a.navigation__link.active svg path) {\\n  fill: var(--clr-text-accent-cyan) !important; }\\n\\n:global(a.navigation__link:hover:not(.active) svg path) {\\n  fill: var(--clr-text-focused) !important; }\\n</style>\\r\\n"],"names":[],"mappings":"AA+BmB,WAAW,cAAC,CAAC,AAC9B,OAAO,CAAE,IAAI,kBAAkB,CAAC,CAChC,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,IAAI,AAAE,CAAC,AAEd,CAAC,iBAAiB,cAAC,CAAC,AAClB,UAAU,CAAE,KAAK,CAAC,KAAK,CACvB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,AAAE,CAAC,AACZ,CAAC,iBAAiB,OAAO,cAAC,CAAC,AACzB,KAAK,CAAE,IAAI,sBAAsB,CAAC,AAAE,CAAC,AACvC,CAAC,+BAAiB,MAAM,KAAK,OAAO,CAAC,AAAC,CAAC,AACrC,KAAK,CAAE,IAAI,kBAAkB,CAAC,AAAE,CAAC,AAE7B,kCAAkC,AAAE,CAAC,AAC3C,IAAI,CAAE,IAAI,sBAAsB,CAAC,CAAC,UAAU,AAAE,CAAC,AAEzC,8CAA8C,AAAE,CAAC,AACvD,IAAI,CAAE,IAAI,kBAAkB,CAAC,CAAC,UAAU,AAAE,CAAC"}`
};
var TabDesNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let navData = [
    { name: "home", link: "/" },
    { name: "about", link: "/about" },
    { name: "portfolio", link: "/portfolio" }
  ];
  $$result.css.add(css$l);
  path = $page.path;
  $$unsubscribe_page();
  return `<nav class="${"navigation svelte-mii2jr"}">${each(navData, ({ name, link }, i) => `<a${add_attribute("href", link, 0)} class="${["navigation__link svelte-mii2jr", path === link ? "active" : ""].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, { name, width: "1.8rem" }, {}, {})}

			<p class="${"navigation__link-text"}">${escape(capitaliseFirstLetter(name))}</p>
		</a>`)}
	${validate_component(DarkmodeToggle, "DmToggle").$$render($$result, {}, {}, {})}

</nav>`;
});
var css$k = {
  code: "button.svelte-1s9vj4g.svelte-1s9vj4g{z-index:var(--z-index-priority);display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:0.5rem;cursor:pointer}button.svelte-1s9vj4g span.svelte-1s9vj4g{--cubic:cubic-bezier(0.9, 0.33, 0.83, 0.92);display:block;height:0.2rem;background:var(--clr-burger-btn-bg);border-radius:1rem;transition:background 400ms var(--cubic), width 400ms var(--cubic), transform 400ms var(--cubic), opacity 400ms var(--cubic);transform-origin:0.1px 1px}button.svelte-1s9vj4g span.svelte-1s9vj4g:nth-child(1){width:2rem}button.svelte-1s9vj4g span.svelte-1s9vj4g:nth-child(2){width:1.3rem}button.svelte-1s9vj4g span.svelte-1s9vj4g:nth-child(3){width:1.7rem}button.svelte-1s9vj4g:hover span.svelte-1s9vj4g{background:var(--clr-burger-btn-bg-active)}button.active.svelte-1s9vj4g span.svelte-1s9vj4g{background:var(--clr-burger-btn-bg-active)}button.active.svelte-1s9vj4g span.svelte-1s9vj4g:nth-child(1){transform:rotate(45deg)}button.active.svelte-1s9vj4g span.svelte-1s9vj4g:nth-child(2){transform:scale(0.1, 0.1);opacity:0}button.active.svelte-1s9vj4g span.svelte-1s9vj4g:nth-child(3){transform:rotate(-45deg);width:2rem}",
  map: `{"version":3,"file":"BurgerButton.svelte","sources":["BurgerButton.svelte"],"sourcesContent":["<script>\\r\\n\\timport { createEventDispatcher } from 'svelte';\\r\\n\\tconst dispatch = createEventDispatcher();\\r\\n\\texport let buttonActive\\r\\n\\t$: buttonClicked = buttonActive;\\r\\n\\tconst toggleBtnClicked = () => {\\r\\n\\t\\tbuttonClicked = !buttonClicked;\\r\\n        dispatch('toggleMenu')\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<button class:active={buttonClicked} on:click={toggleBtnClicked}>\\r\\n\\t<span />\\r\\n\\t<span />\\r\\n\\t<span />\\r\\n</button>\\r\\n\\r\\n<style lang=\\"scss\\">button {\\n  z-index: var(--z-index-priority);\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 0.5rem;\\n  cursor: pointer; }\\n  button span {\\n    --cubic: cubic-bezier(0.9, 0.33, 0.83, 0.92);\\n    display: block;\\n    height: 0.2rem;\\n    background: var(--clr-burger-btn-bg);\\n    border-radius: 1rem;\\n    transition: background 400ms var(--cubic), width 400ms var(--cubic), transform 400ms var(--cubic), opacity 400ms var(--cubic);\\n    transform-origin: 0.1px 1px; }\\n    button span:nth-child(1) {\\n      width: 2rem; }\\n    button span:nth-child(2) {\\n      width: 1.3rem; }\\n    button span:nth-child(3) {\\n      width: 1.7rem; }\\n  button:hover span {\\n    background: var(--clr-burger-btn-bg-active); }\\n  button.active span {\\n    background: var(--clr-burger-btn-bg-active); }\\n    button.active span:nth-child(1) {\\n      transform: rotate(45deg); }\\n    button.active span:nth-child(2) {\\n      transform: scale(0.1, 0.1);\\n      opacity: 0; }\\n    button.active span:nth-child(3) {\\n      transform: rotate(-45deg);\\n      width: 2rem; }\\n</style>\\r\\n"],"names":[],"mappings":"AAiBmB,MAAM,8BAAC,CAAC,AACzB,OAAO,CAAE,IAAI,kBAAkB,CAAC,CAChC,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,MAAM,CACX,MAAM,CAAE,OAAO,AAAE,CAAC,AAClB,qBAAM,CAAC,IAAI,eAAC,CAAC,AACX,OAAO,CAAE,mCAAmC,CAC5C,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,MAAM,CACd,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,UAAU,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CAAC,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CAAC,CAAC,SAAS,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CAAC,CAAC,OAAO,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CAC7H,gBAAgB,CAAE,KAAK,CAAC,GAAG,AAAE,CAAC,AAC9B,qBAAM,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AACxB,KAAK,CAAE,IAAI,AAAE,CAAC,AAChB,qBAAM,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AACxB,KAAK,CAAE,MAAM,AAAE,CAAC,AAClB,qBAAM,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AACxB,KAAK,CAAE,MAAM,AAAE,CAAC,AACpB,qBAAM,MAAM,CAAC,IAAI,eAAC,CAAC,AACjB,UAAU,CAAE,IAAI,0BAA0B,CAAC,AAAE,CAAC,AAChD,MAAM,sBAAO,CAAC,IAAI,eAAC,CAAC,AAClB,UAAU,CAAE,IAAI,0BAA0B,CAAC,AAAE,CAAC,AAC9C,MAAM,sBAAO,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AAC/B,SAAS,CAAE,OAAO,KAAK,CAAC,AAAE,CAAC,AAC7B,MAAM,sBAAO,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AAC/B,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1B,OAAO,CAAE,CAAC,AAAE,CAAC,AACf,MAAM,sBAAO,CAAC,mBAAI,GAAG,QAAQ,CAAC,CAAC,AAAC,CAAC,AAC/B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,EAAE,GAAG,CAAE,IAAI,AAAE,CAAC"}`
};
var BurgerButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonClicked;
  createEventDispatcher();
  let { buttonActive } = $$props;
  if ($$props.buttonActive === void 0 && $$bindings.buttonActive && buttonActive !== void 0)
    $$bindings.buttonActive(buttonActive);
  $$result.css.add(css$k);
  buttonClicked = buttonActive;
  return `<button class="${["svelte-1s9vj4g", buttonClicked ? "active" : ""].join(" ").trim()}"><span class="${"svelte-1s9vj4g"}"></span>
	<span class="${"svelte-1s9vj4g"}"></span>
	<span class="${"svelte-1s9vj4g"}"></span>
</button>`;
});
var css$j = {
  code: "header.svelte-17uhpf8{display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;padding:2.8rem 0rem;width:100%;max-width:111rem;margin:auto;grid-area:header;position:relative}@media only screen and (min-width: 768px){header.svelte-17uhpf8{padding:7rem 0rem}}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\r\\n\\timport { createEventDispatcher, getContext } from 'svelte';\\r\\n\\tconst dispatch = createEventDispatcher();\\r\\n\\r\\n\\timport Logo from './Logo.svelte';\\r\\n\\timport MobileNav from './MobileNav.svelte';\\r\\n\\timport TabDesNav from './TabDesNav.svelte';\\r\\n\\timport BurgerButton from './BurgerButton.svelte';\\r\\n\\r\\n\\texport let showMobileNav = false\\r\\n\\r\\n\\t$: showMobileNavReactive = showMobileNav\\r\\n\\r\\n\\tlet size = getContext('size');\\r\\n\\r\\n\\tconst toggleMobileNav = () => {\\r\\n\\t\\tdispatch('toggleMenu');\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<header>\\r\\n\\t<Logo />\\r\\n\\t{#if $size === 'mobile'}\\r\\n\\t\\t<BurgerButton on:toggleMenu={toggleMobileNav} buttonActive={showMobileNavReactive} />\\r\\n\\t\\t{#if showMobileNavReactive}\\r\\n\\t\\t\\t<MobileNav on:closeNavModal={toggleMobileNav}/>\\r\\n\\t\\t{/if}\\r\\n    {:else}\\r\\n        <TabDesNav />\\r\\n\\t{/if}\\r\\n</header>\\r\\n\\r\\n<style lang=\\"scss\\">header {\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: space-between;\\n  align-items: center;\\n  padding: 2.8rem 0rem;\\n  width: 100%;\\n  max-width: 111rem;\\n  margin: auto;\\n  grid-area: header;\\n  position: relative; }\\n  @media only screen and (min-width: 768px) {\\n    header {\\n      padding: 7rem 0rem; } }\\n</style>\\r\\n"],"names":[],"mappings":"AAgCmB,MAAM,eAAC,CAAC,AACzB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,MAAM,CACjB,QAAQ,CAAE,QAAQ,AAAE,CAAC,AACrB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,MAAM,eAAC,CAAC,AACN,OAAO,CAAE,IAAI,CAAC,IAAI,AAAE,CAAC,AAAC,CAAC"}`
};
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showMobileNavReactive;
  let $size, $$unsubscribe_size;
  createEventDispatcher();
  let { showMobileNav = false } = $$props;
  let size = getContext("size");
  $$unsubscribe_size = subscribe(size, (value) => $size = value);
  if ($$props.showMobileNav === void 0 && $$bindings.showMobileNav && showMobileNav !== void 0)
    $$bindings.showMobileNav(showMobileNav);
  $$result.css.add(css$j);
  showMobileNavReactive = showMobileNav;
  $$unsubscribe_size();
  return `<header class="${"svelte-17uhpf8"}">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}
	${$size === "mobile" ? `${validate_component(BurgerButton, "BurgerButton").$$render($$result, { buttonActive: showMobileNavReactive }, {}, {})}
		${showMobileNavReactive ? `${validate_component(MobileNav, "MobileNav").$$render($$result, {}, {}, {})}` : ``}` : `${validate_component(TabDesNav, "TabDesNav").$$render($$result, {}, {}, {})}`}
</header>`;
});
var css$i = {
  code: "body{width:100%;background-color:var(--clr-body-bg);background-repeat:repeat}div#svelte{min-height:100vh;overflow:hidden;display:grid;grid-auto-rows:min-content;grid-template-columns:minmax(2.4rem, 4rem) minmax(32.7rem, 1fr) minmax(2.4rem, 4rem);grid-template-areas:'. header .'\r 'main main main'\r 'footer footer footer'}@media only screen and (min-width: 768px){div#svelte{grid-template-columns:minmax(4rem, 1fr) 1fr minmax(70rem, 90rem) 1fr minmax(4rem, 1fr);grid-template-areas:'. header header header .'\r 'main main main main main'\r 'footer footer footer footer footer'}}@media only screen and (min-width: 1248px){div#svelte{grid-template-columns:1fr minmax(0rem, 10.5rem) 90rem minmax(0rem, 10.5rem) 1fr;grid-template-areas:'. header header header .'\r 'main main main main main'\r 'footer footer footer footer footer'}}",
  map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\r\\n\\timport { writable } from 'svelte/store';\\r\\n\\timport { setContext, onMount } from 'svelte';\\r\\n\\timport Header from '$lib/Navigation/Header.svelte';\\r\\n\\timport Overlay from '$lib/Decorations/Overlay.svelte';\\r\\n\\timport { calcRealSize } from '$lib/scripts/helperFunctions.js';\\r\\n\\r\\n\\tlet windowWidth,\\r\\n\\t\\tscrollbarWidth,\\r\\n\\t\\trealWidth = writable(''),\\r\\n\\t\\tmounted = false,\\r\\n\\t\\tshowOverlay = false,\\r\\n\\t\\tshowMobileNav = false;\\r\\n\\r\\n\\t$: realWidth.set(calcRealSize(windowWidth, scrollbarWidth));\\r\\n\\tsetContext('size', realWidth);\\r\\n\\r\\n\\tonMount(() => {\\r\\n\\t\\tmounted = true;\\r\\n\\t\\tif (mounted) {\\r\\n\\t\\t\\tscrollbarWidth = window.innerWidth - document.documentElement.clientWidth;\\r\\n\\t\\t}\\r\\n\\t});\\r\\n\\r\\n\\tconst toggleMenu = () => {\\r\\n\\t\\tshowOverlay = !showOverlay\\r\\n\\t\\tshowMobileNav = !showMobileNav\\r\\n\\t};\\r\\n\\r\\n\\tconst closeActiveModal = () => {\\r\\n\\t\\tif(showMobileNav){\\r\\n\\t\\t\\tshowOverlay = !showOverlay\\r\\n\\t\\t\\tshowMobileNav = !showMobileNav\\r\\n\\t\\t}\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<svelte:window bind:innerWidth={windowWidth} />\\r\\n\\r\\n{#if showOverlay}\\r\\n\\t<Overlay on:closeModal={closeActiveModal} />\\r\\n{/if}\\r\\n\\r\\n<Header on:toggleMenu={toggleMenu} {showMobileNav} />\\r\\n<slot />\\r\\n\\r\\n<style lang=\\"scss\\">:global(body) {\\n  width: 100%;\\n  background-color: var(--clr-body-bg);\\n  background-repeat: repeat; }\\n\\n:global(div#svelte) {\\n  min-height: 100vh;\\n  overflow: hidden;\\n  display: grid;\\n  grid-auto-rows: min-content;\\n  grid-template-columns: minmax(2.4rem, 4rem) minmax(32.7rem, 1fr) minmax(2.4rem, 4rem);\\n  grid-template-areas: '. header .'\\r 'main main main'\\r 'footer footer footer'; }\\n  @media only screen and (min-width: 768px) {\\n    :global(div#svelte) {\\n      grid-template-columns: minmax(4rem, 1fr) 1fr minmax(70rem, 90rem) 1fr minmax(4rem, 1fr);\\n      grid-template-areas: '. header header header .'\\r 'main main main main main'\\r 'footer footer footer footer footer'; } }\\n  @media only screen and (min-width: 1248px) {\\n    :global(div#svelte) {\\n      grid-template-columns: 1fr minmax(0rem, 10.5rem) 90rem minmax(0rem, 10.5rem) 1fr;\\n      grid-template-areas: '. header header header .'\\r 'main main main main main'\\r 'footer footer footer footer footer'; } }\\n</style>\\r\\n"],"names":[],"mappings":"AA8C2B,IAAI,AAAE,CAAC,AAChC,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,iBAAiB,CAAE,MAAM,AAAE,CAAC,AAEtB,UAAU,AAAE,CAAC,AACnB,UAAU,CAAE,KAAK,CACjB,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,WAAW,CAC3B,qBAAqB,CAAE,OAAO,MAAM,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,OAAO,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,MAAM,CAAC,CAAC,IAAI,CAAC,CACrF,mBAAmB,CAAE,YAAY,EAAE,gBAAgB,EAAE,sBAAsB,AAAE,CAAC,AAC9E,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACjC,UAAU,AAAE,CAAC,AACnB,qBAAqB,CAAE,OAAO,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,OAAO,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,OAAO,IAAI,CAAC,CAAC,GAAG,CAAC,CACvF,mBAAmB,CAAE,0BAA0B,EAAE,0BAA0B,EAAE,oCAAoC,AAAE,CAAC,AAAC,CAAC,AAC1H,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAClC,UAAU,AAAE,CAAC,AACnB,qBAAqB,CAAE,GAAG,CAAC,OAAO,IAAI,CAAC,CAAC,OAAO,CAAC,CAAC,KAAK,CAAC,OAAO,IAAI,CAAC,CAAC,OAAO,CAAC,CAAC,GAAG,CAChF,mBAAmB,CAAE,0BAA0B,EAAE,0BAA0B,EAAE,oCAAoC,AAAE,CAAC,AAAC,CAAC"}`
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let windowWidth, scrollbarWidth, realWidth = writable(""), showMobileNav = false;
  setContext("size", realWidth);
  $$result.css.add(css$i);
  {
    realWidth.set(calcRealSize(windowWidth, scrollbarWidth));
  }
  return `

${``}

${validate_component(Header, "Header").$$render($$result, { showMobileNav }, {}, {})}
${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var portfolioData = [
  {
    name: "audiophile",
    subtitle: "Webstore Development + Minor Redesign",
    type: ["featured", "dev"],
    dateStamp: new Date("2021", "06", "7"),
    description: ["Sleek and powerful webstore experience built with Sveltekit, Tailwind and local storage, fully responsive with a functioning cart and checkout experience.", "This was my first proper project that involved using Tailwind for styling. I enjoyed the speed that Tailwind enables but ultimately regreted it as I prefer reading styling via CSS/SCSS for maximum comprehension."],
    github: "https://github.com/grizhlieCodes/audioPhileEcommerceSvelteKitTailwind",
    website: "https://audiophile-webstore-grizhlie.netlify.app/",
    vimeoEmbed: "617031842?h=94a860f3fb",
    tags: ["Frontend Development", "HTML", "SCSS", "JS", "Tailwind", "Sveltekit", "Frontend Mentor"]
  },
  {
    name: "invoice-app",
    subtitle: "Website Development + Minor Redesign",
    type: ["featured", "dev"],
    dateStamp: new Date("2021", "05", "5"),
    description: ["Full stack invoice application with user authentication, connected to Firebase's realtime database. A responsive experience with a dark-mode toggle, built with Svelte.", "This still remains as one of my largest and most complex projects to date. I ended up coding up a custom datepicker for this as the default one broke user-experience. By far my favorite project to date in terms of data/state management and complexity."],
    github: "https://github.com/grizhlieCodes/invoiceAppSvelte",
    website: "https://grizhlie-invoice-app-frontend-mentor.netlify.app/",
    vimeoEmbed: "617112109?h=18b93cbebf",
    tags: ["Frontend Development", "HTML", "SCSS", "JS", "Firebase", "Svelte", "Frontend Mentor"]
  },
  {
    name: "job-listing",
    subtitle: "Website Development + Big Redesign (UX)",
    type: ["featured", "dev"],
    dateStamp: new Date("2021", "07", "9"),
    description: ["This is a simple job-listings page that can be filtered. The original filter system was just clicking on the various filters. I added an entire new interface and allowed for keyboard accessibility.", "Probably one of my favorite small projects so far as I think I significantly improved upon the original UI/UX design."],
    github: "https://github.com/grizhlieCodes/filtered-job-listings",
    website: "https://grizhlie-filtered-job-listing.netlify.app/",
    vimeoEmbed: "617112071?h=1ed9c1ef9b",
    tags: ["Frontend Development", "HTML", "SCSS", "JS", "Svelte", "Frontend Mentor"]
  },
  {
    name: "galleria",
    subtitle: "Website Development",
    type: ["dev"],
    dateStamp: new Date("2021", "06", "28"),
    description: ["As soon as I saw the design I wanted to code it up. This is a sleak and minimal gallery web-app.", "Figuring out how to structure everything with CSS grid was the most fun and challenging aspect of this project now that I look back on it. I defenitely want to improve in my understanding of CSS grid in order to write up a custom JS code for a mosaic layout grid."],
    github: "https://github.com/grizhlieCodes/galleria-slideshow-site",
    website: "https://grizhlie-galleria-slideshow-site.netlify.app/",
    vimeoEmbed: "617133954?h=ce6853e356",
    tags: ["Frontend Development", "HTML", "SCSS", "JS", "Svelte", "Frontend Mentor"]
  },
  {
    name: "designo",
    subtitle: "Website Development",
    type: ["dev"],
    dateStamp: new Date("2021", "01", "23"),
    description: ["Beautiful design turned into code. A 7 page project of which the prime focus was on sass architecture and thinking via components and reusable, clean, code.", "This project included working with leaflet js and most of the time was spent styling as well as creating components. This was the first time I attempted thinking via components and the results were favourable; I quickly picked up Svelte afterwards to expand on them."],
    github: "https://github.com/grizhlieCodes/designo",
    website: "https://designo-website-grizhliecodes.netlify.app/",
    vimeoEmbed: "617133776?h=126e4105f1",
    tags: ["Frontend Development", "HTML", "SCSS", "JS", "Frontend Mentor"]
  },
  {
    name: "antara",
    subtitle: "Brand Design + Website Design & Development",
    type: ["dev", "design"],
    dateStamp: new Date("2020", "10", "6"),
    description: ["A real project for the family business. I had to rebrand the company and opted for a sleek professional design. My code will be using an older mindset of pixel-perfection but overall the website looks good. This project is actually the reason I wanted to learn web development, read about it in the about me page!", "Fun fact: The name 'Antara' was derived from the first 2 letters of each of the team member's name: ANna, TAriq and RAfal, little bit of witty creative on my part \u{1F601}."],
    github: "",
    website: "https://www.antaraltd.co.uk/",
    vimeoEmbed: "617133607?h=437358b760",
    tags: ["Frontend Development", "HTML", "SCSS", "JS", "Frontend Mentor"]
  }
];
var portfolio$1 = readable(portfolioData);
var css$h = {
  code: ".hero-img-container.svelte-1pxbq8t.svelte-1pxbq8t{width:100%;max-width:clamp(32.5rem, 29.27835rem + 8.59107vw, 40rem);position:relative;z-index:1}@media only screen and (min-width: 768px){.hero-img-container.svelte-1pxbq8t.svelte-1pxbq8t{flex-grow:1}}.images-container.svelte-1pxbq8t.svelte-1pxbq8t{width:100%;height:0;padding-top:111%;position:absolute}.backdrop.svelte-1pxbq8t.svelte-1pxbq8t{top:0;left:0;width:100%;padding-top:100%;background:radial-gradient(circle, var(--clr-hero-bg-img-lighter) 10%, var(--clr-hero-bg-img-darker));transition:background 400ms;border-radius:50%;position:absolute}.images-container.svelte-1pxbq8t .individual-img-container.svelte-1pxbq8t{width:100%;position:absolute;top:0;left:0}.images-container.svelte-1pxbq8t .individual-img-container img.svelte-1pxbq8t{width:100%}.images-container.svelte-1pxbq8t .individual-img-container img.svelte-1pxbq8t:not(:is(.rafal, .eagle, .book, .computer)){animation:4s infinite svelte-1pxbq8t-hoverImage ease-in-out alternate}.images-container.svelte-1pxbq8t .individual-img-container img.rust.svelte-1pxbq8t{animation-delay:1.5s}.images-container.svelte-1pxbq8t .individual-img-container img.watch.svelte-1pxbq8t{animation-delay:0.5s}@keyframes svelte-1pxbq8t-hoverImage{to{transform:translateY(-2rem)}}.rafal.svelte-1pxbq8t.svelte-1pxbq8t{z-index:2}.book.svelte-1pxbq8t.svelte-1pxbq8t,.computer.svelte-1pxbq8t.svelte-1pxbq8t,.eagle.svelte-1pxbq8t.svelte-1pxbq8t{z-index:3}",
  map: `{"version":3,"file":"HeroImage.svelte","sources":["HeroImage.svelte"],"sourcesContent":["<script>\\r\\n\\timport { moveOnScroll } from '$lib/scripts/animations.js';\\r\\n\\timport { setHeroImgHeight } from '$lib/scripts/helperFunctions.js';\\r\\n\\timport {onMount} from 'svelte';\\r\\n\\r\\n\\tlet imageNames = [\\r\\n\\t\\t{ name: 'rafal'},\\r\\n\\t\\t{ name: 'rust'},\\r\\n\\t\\t{ name: 'computer'},\\r\\n\\t\\t{ name: 'watch'},\\r\\n\\t\\t{ name: 'statue'},\\r\\n\\t\\t{ name: 'eagle'},\\r\\n\\t\\t{ name: 'book'}\\r\\n\\t];\\r\\n\\tlet container;\\r\\n\\tlet timeoutCounter = 0\\r\\n\\r\\n\\tconst countedTimeout = () => {\\r\\n\\t\\tsetHeroImgHeight(container)\\r\\n\\t\\ttimeoutCounter++\\r\\n\\t\\tsetTimeout(() => {\\r\\n\\t\\t\\tif(timeoutCounter !== 5){\\r\\n\\t\\t\\t\\tsetHeroImgHeight(container)\\r\\n\\t\\t\\t}\\r\\n\\t\\t},600)\\r\\n\\t}\\r\\n\\r\\n\\tonMount(() => {\\r\\n\\t\\tcountedTimeout()\\r\\n\\t})\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<svelte:window on:resize={() => setHeroImgHeight(container)} />\\r\\n\\r\\n<div class=\\"hero-img-container\\" bind:this={container}>\\r\\n\\t<div class=\\"backdrop\\" />\\r\\n\\t<div class=\\"images-container\\">\\r\\n\\t\\t{#each imageNames as { name }}\\r\\n\\t\\t<div class=\\"{name} individual-img-container\\" use:moveOnScroll={5}>\\r\\n\\t\\t\\t<img\\r\\n\\t\\t\\t\\tclass={name}\\r\\n\\t\\t\\t\\tsrc=\\"/images/home/shared/hero-images/{name}.png\\"\\r\\n\\t\\t\\t\\talt={name}\\r\\n\\t\\t\\t\\t />\\r\\n\\t\\t</div>\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">.hero-img-container {\\n  width: 100%;\\n  max-width: clamp(32.5rem, 29.27835rem + 8.59107vw, 40rem);\\n  position: relative;\\n  z-index: 1; }\\n  @media only screen and (min-width: 768px) {\\n    .hero-img-container {\\n      flex-grow: 1; } }\\n\\n.images-container {\\n  width: 100%;\\n  height: 0;\\n  padding-top: 111%;\\n  position: absolute; }\\n\\n.backdrop {\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  padding-top: 100%;\\n  /* height: 100%; */\\n  /* aspect-ratio: 1; */\\n  background: radial-gradient(circle, var(--clr-hero-bg-img-lighter) 10%, var(--clr-hero-bg-img-darker));\\n  transition: background 400ms;\\n  border-radius: 50%;\\n  position: absolute; }\\n\\n.images-container .individual-img-container {\\n  width: 100%;\\n  position: absolute;\\n  top: 0;\\n  left: 0; }\\n  .images-container .individual-img-container img {\\n    width: 100%; }\\n\\n.images-container .individual-img-container img:not(:is(.rafal, .eagle, .book, .computer)) {\\n  animation: 4s infinite hoverImage ease-in-out alternate; }\\n\\n.images-container .individual-img-container img.rust {\\n  animation-delay: 1.5s; }\\n\\n.images-container .individual-img-container img.watch {\\n  animation-delay: 0.5s; }\\n\\n@keyframes hoverImage {\\n  to {\\n    transform: translateY(-2rem); } }\\n\\n.rafal {\\n  z-index: 2; }\\n\\n.book,\\n.computer,\\n.eagle {\\n  z-index: 3; }\\n</style>\\r\\n"],"names":[],"mappings":"AAkDmB,mBAAmB,8BAAC,CAAC,AACtC,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,OAAO,CAAC,CAAC,WAAW,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,KAAK,CAAC,CACzD,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,AAAE,CAAC,AACb,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,mBAAmB,8BAAC,CAAC,AACnB,SAAS,CAAE,CAAC,AAAE,CAAC,AAAC,CAAC,AAEvB,iBAAiB,8BAAC,CAAC,AACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,IAAI,CACjB,QAAQ,CAAE,QAAQ,AAAE,CAAC,AAEvB,SAAS,8BAAC,CAAC,AACT,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,IAAI,CAGjB,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,IAAI,yBAAyB,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,CACtG,UAAU,CAAE,UAAU,CAAC,KAAK,CAC5B,aAAa,CAAE,GAAG,CAClB,QAAQ,CAAE,QAAQ,AAAE,CAAC,AAEvB,gCAAiB,CAAC,yBAAyB,eAAC,CAAC,AAC3C,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,AAAE,CAAC,AACV,gCAAiB,CAAC,yBAAyB,CAAC,GAAG,eAAC,CAAC,AAC/C,KAAK,CAAE,IAAI,AAAE,CAAC,AAElB,gCAAiB,CAAC,yBAAyB,CAAC,kBAAG,KAAK,IAAI,gCAAgC,CAAC,CAAC,AAAC,CAAC,AAC1F,SAAS,CAAE,EAAE,CAAC,QAAQ,CAAC,yBAAU,CAAC,WAAW,CAAC,SAAS,AAAE,CAAC,AAE5D,gCAAiB,CAAC,yBAAyB,CAAC,GAAG,KAAK,eAAC,CAAC,AACpD,eAAe,CAAE,IAAI,AAAE,CAAC,AAE1B,gCAAiB,CAAC,yBAAyB,CAAC,GAAG,MAAM,eAAC,CAAC,AACrD,eAAe,CAAE,IAAI,AAAE,CAAC,AAE1B,WAAW,yBAAW,CAAC,AACrB,EAAE,AAAC,CAAC,AACF,SAAS,CAAE,WAAW,KAAK,CAAC,AAAE,CAAC,AAAC,CAAC,AAErC,MAAM,8BAAC,CAAC,AACN,OAAO,CAAE,CAAC,AAAE,CAAC,AAEf,mCAAK,CACL,uCAAS,CACT,MAAM,8BAAC,CAAC,AACN,OAAO,CAAE,CAAC,AAAE,CAAC"}`
};
var HeroImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imageNames = [
    { name: "rafal" },
    { name: "rust" },
    { name: "computer" },
    { name: "watch" },
    { name: "statue" },
    { name: "eagle" },
    { name: "book" }
  ];
  let container;
  $$result.css.add(css$h);
  return `

<div class="${"hero-img-container svelte-1pxbq8t"}"${add_attribute("this", container, 0)}><div class="${"backdrop svelte-1pxbq8t"}"></div>
	<div class="${"images-container svelte-1pxbq8t"}">${each(imageNames, ({ name }) => `<div class="${escape(name) + " individual-img-container svelte-1pxbq8t"}"><img class="${escape(null_to_empty(name)) + " svelte-1pxbq8t"}" src="${"/images/home/shared/hero-images/" + escape(name) + ".png"}"${add_attribute("alt", name, 0)}>
		</div>`)}</div>
</div>`;
});
var css$g = {
  code: "a.svelte-1lqddhn,button.svelte-1lqddhn{font-size:clamp(1.6rem, 1.47113rem + 0.34364vw, 1.9rem);font-weight:700;text-transform:uppercase;padding-left:clamp(0.5rem, -0.9313rem + 3.81679vw, 2rem);padding-right:clamp(0.5rem, -0.9313rem + 3.81679vw, 2rem);padding-top:clamp(0.75rem, 0.51145rem + 0.63613vw, 1rem);padding-bottom:clamp(0.75rem, 0.51145rem + 0.63613vw, 1rem);outline:none;border:none;color:var(--clr-text-btn);transition:color 400ms, background 400ms, opacity 400ms, transform 400ms;font-family:var(--fira);text-align:center;cursor:pointer}a.primary.svelte-1lqddhn,button.primary.svelte-1lqddhn{background:var(--clr-bg-accent-cyan)}a.secondary.svelte-1lqddhn,button.secondary.svelte-1lqddhn{background:var(--clr-bg-accent-red)}a.svelte-1lqddhn:hover,button.svelte-1lqddhn:hover{opacity:0.8;transform:scale(1.1)}a.svelte-1lqddhn:active,button.svelte-1lqddhn:active{transform:scale(0.9)}",
  map: `{"version":3,"file":"Button.svelte","sources":["Button.svelte"],"sourcesContent":["<script>\\r\\n\\texport let link, content, type, btnClass;\\r\\n<\/script>\\r\\n\\r\\n{#if type === 'anchor'}\\r\\n\\t<a href={link} class={btnClass}>{content}</a>\\r\\n{:else if type === 'button'}\\r\\n\\t<button type=\\"button\\" on:click class={btnClass}>{content}</button>\\r\\n{:else if type === 'submit'}\\r\\n\\t<button type=\\"submit\\" on:click class={btnClass}>{content}</button>\\r\\n{/if}\\r\\n\\r\\n<style lang=\\"scss\\">a,\\nbutton {\\n  font-size: clamp(1.6rem, 1.47113rem + 0.34364vw, 1.9rem);\\n  font-weight: 700;\\n  text-transform: uppercase;\\n  padding-left: clamp(0.5rem, -0.9313rem + 3.81679vw, 2rem);\\n  padding-right: clamp(0.5rem, -0.9313rem + 3.81679vw, 2rem);\\n  padding-top: clamp(0.75rem, 0.51145rem + 0.63613vw, 1rem);\\n  padding-bottom: clamp(0.75rem, 0.51145rem + 0.63613vw, 1rem);\\n  outline: none;\\n  border: none;\\n  color: var(--clr-text-btn);\\n  transition: color 400ms, background 400ms, opacity 400ms, transform 400ms;\\n  font-family: var(--fira);\\n  text-align: center;\\n  cursor: pointer; }\\n  a.primary,\\n  button.primary {\\n    background: var(--clr-bg-accent-cyan); }\\n  a.secondary,\\n  button.secondary {\\n    background: var(--clr-bg-accent-red); }\\n  a:hover,\\n  button:hover {\\n    opacity: 0.8;\\n    transform: scale(1.1); }\\n  a:active,\\n  button:active {\\n    transform: scale(0.9); }\\n</style>\\r\\n"],"names":[],"mappings":"AAYmB,gBAAC,CACpB,MAAM,eAAC,CAAC,AACN,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CACxD,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,CACzB,YAAY,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,IAAI,CAAC,CACzD,aAAa,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,IAAI,CAAC,CAC1D,WAAW,CAAE,MAAM,OAAO,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,IAAI,CAAC,CACzD,cAAc,CAAE,MAAM,OAAO,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,IAAI,CAAC,CAC5D,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,CAAC,UAAU,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,KAAK,CAAC,CAAC,SAAS,CAAC,KAAK,CACzE,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,OAAO,AAAE,CAAC,AAClB,CAAC,uBAAQ,CACT,MAAM,QAAQ,eAAC,CAAC,AACd,UAAU,CAAE,IAAI,oBAAoB,CAAC,AAAE,CAAC,AAC1C,CAAC,yBAAU,CACX,MAAM,UAAU,eAAC,CAAC,AAChB,UAAU,CAAE,IAAI,mBAAmB,CAAC,AAAE,CAAC,AACzC,gBAAC,MAAM,CACP,qBAAM,MAAM,AAAC,CAAC,AACZ,OAAO,CAAE,GAAG,CACZ,SAAS,CAAE,MAAM,GAAG,CAAC,AAAE,CAAC,AAC1B,gBAAC,OAAO,CACR,qBAAM,OAAO,AAAC,CAAC,AACb,SAAS,CAAE,MAAM,GAAG,CAAC,AAAE,CAAC"}`
};
var Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { link, content, type, btnClass } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.btnClass === void 0 && $$bindings.btnClass && btnClass !== void 0)
    $$bindings.btnClass(btnClass);
  $$result.css.add(css$g);
  return `${type === "anchor" ? `<a${add_attribute("href", link, 0)} class="${escape(null_to_empty(btnClass)) + " svelte-1lqddhn"}">${escape(content)}</a>` : `${type === "button" ? `<button type="${"button"}" class="${escape(null_to_empty(btnClass)) + " svelte-1lqddhn"}">${escape(content)}</button>` : `${type === "submit" ? `<button type="${"submit"}" class="${escape(null_to_empty(btnClass)) + " svelte-1lqddhn"}">${escape(content)}</button>` : ``}`}`}`;
});
var css$f = {
  code: ".svelte-8mowp5:is(h1, h2){font-family:var(--fira);font-weight:700;color:var(--clr-text-heading);transition:color 400ms}h1.svelte-8mowp5{font-size:clamp(3.5rem, 2.64089rem + 2.29095vw, 5.5rem);line-height:clamp(3.5rem, 2.64089rem + 2.29095vw, 5.5rem)}h2.svelte-8mowp5{font-size:clamp(2.5rem, 1.85567rem + 1.71821vw, 4rem);line-height:clamp(2.5rem, 1.85567rem + 1.71821vw, 4rem);text-transform:uppercase}",
  map: `{"version":3,"file":"Heading.svelte","sources":["Heading.svelte"],"sourcesContent":["<script>\\r\\n\\texport let type = 2,\\r\\n\\t\\tcontent = '',\\r\\n\\t\\tcontent2 = '',\\r\\n\\t\\theadingClass = '';\\r\\n<\/script>\\r\\n\\r\\n{#if type === '1'}\\r\\n\\t<h1 class={headingClass}>\\r\\n\\t\\t{content}\\r\\n\\t\\t{#if content2 !== ''}\\r\\n\\t\\t\\t<br />\\r\\n\\t\\t\\t{content2}\\r\\n\\t\\t{/if}\\r\\n\\t</h1>\\r\\n{:else if type === '2'}\\r\\n\\t<h2 class={headingClass}>{content}</h2>\\r\\n{/if}\\r\\n\\r\\n<style lang=\\"scss\\">:is(h1, h2) {\\n  font-family: var(--fira);\\n  font-weight: 700;\\n  color: var(--clr-text-heading);\\n  transition: color 400ms; }\\n\\nh1 {\\n  font-size: clamp(3.5rem, 2.64089rem + 2.29095vw, 5.5rem);\\n  line-height: clamp(3.5rem, 2.64089rem + 2.29095vw, 5.5rem); }\\n\\nh2 {\\n  font-size: clamp(2.5rem, 1.85567rem + 1.71821vw, 4rem);\\n  line-height: clamp(2.5rem, 1.85567rem + 1.71821vw, 4rem);\\n  text-transform: uppercase; }\\n</style>\\r\\n"],"names":[],"mappings":"cAmBmB,IAAI,MAAM,CAAC,AAAC,CAAC,AAC9B,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,UAAU,CAAE,KAAK,CAAC,KAAK,AAAE,CAAC,AAE5B,EAAE,cAAC,CAAC,AACF,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CACxD,WAAW,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,AAAE,CAAC,AAE/D,EAAE,cAAC,CAAC,AACF,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,IAAI,CAAC,CACtD,WAAW,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,IAAI,CAAC,CACxD,cAAc,CAAE,SAAS,AAAE,CAAC"}`
};
var Heading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = 2, content = "", content2 = "", headingClass = "" } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.content2 === void 0 && $$bindings.content2 && content2 !== void 0)
    $$bindings.content2(content2);
  if ($$props.headingClass === void 0 && $$bindings.headingClass && headingClass !== void 0)
    $$bindings.headingClass(headingClass);
  $$result.css.add(css$f);
  return `${type === "1" ? `<h1 class="${escape(null_to_empty(headingClass)) + " svelte-8mowp5"}">${escape(content)}
		${content2 !== "" ? `<br class="${"svelte-8mowp5"}">
			${escape(content2)}` : ``}</h1>` : `${type === "2" ? `<h2 class="${escape(null_to_empty(headingClass)) + " svelte-8mowp5"}">${escape(content)}</h2>` : ``}`}`;
});
var css$e = {
  code: ".hero-text-container.svelte-14kq9f0.svelte-14kq9f0{width:100%;display:flex;flex-flow:column nowrap;justify-content:start;align-items:center;gap:2rem;font-family:var(--fira);text-align:center}@media only screen and (min-width: 768px){.hero-text-container.svelte-14kq9f0.svelte-14kq9f0{flex-grow:1;text-align:left;align-items:start}}.hero-text-container.svelte-14kq9f0 p.svelte-14kq9f0{max-width:34rem;margin-bottom:2rem;font-size:1.8rem;color:var(--clr-text-focused);transition:color 400ms;line-height:2.3rem;font-weight:700}@media only screen and (min-width: 768px){.hero-text-container.svelte-14kq9f0 p.svelte-14kq9f0{flex-grow:1;width:auto;max-width:34rem}}.hero-text-container__cta-container.svelte-14kq9f0.svelte-14kq9f0{display:flex;flex-flow:row nowrap;justify-content:start;align-items:center;gap:2.6rem}",
  map: `{"version":3,"file":"HeroText.svelte","sources":["HeroText.svelte"],"sourcesContent":["<script>\\r\\n\\timport Button from '$lib/Button.svelte';\\r\\n\\timport Heading from '$lib/Decorations/Heading.svelte'\\r\\n\\r\\n\\tlet buttons = [\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent: 'my work \u{1F446}',\\r\\n\\t\\t\\tbtnClass: 'primary',\\r\\n\\t\\t\\ttype: 'anchor',\\r\\n\\t\\t\\tlink: '/portfolio'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent: 'say hello \u{1F4E7}',\\r\\n\\t\\t\\tbtnClass: 'secondary',\\r\\n\\t\\t\\ttype: 'anchor',\\r\\n\\t\\t\\tlink: '/portfolio'\\r\\n\\t\\t}\\r\\n\\t];\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"hero-text-container\\">\\r\\n\\t<Heading content=\\"No-nonsense\\" content2=\\"web developer\\" type=\\"1\\" />\\r\\n\\t<p>\\r\\n\\t\\tHello \u{1F44B}, I'm Rafal, a self-taught front-end web developer with an eye for design, obsessively\\r\\n\\t\\tlearning towards becoming full-stack.\\r\\n\\t</p>\\r\\n\\t<div class=\\"hero-text-container__cta-container\\">\\r\\n\\t\\t{#each buttons as data}\\r\\n\\t\\t\\t<Button {...data} />\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">.hero-text-container {\\n  width: 100%;\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: center;\\n  gap: 2rem;\\n  font-family: var(--fira);\\n  text-align: center; }\\n  @media only screen and (min-width: 768px) {\\n    .hero-text-container {\\n      flex-grow: 1;\\n      text-align: left;\\n      align-items: start; } }\\n  .hero-text-container p {\\n    max-width: 34rem;\\n    margin-bottom: 2rem;\\n    font-size: 1.8rem;\\n    color: var(--clr-text-focused);\\n    transition: color 400ms;\\n    line-height: 2.3rem;\\n    font-weight: 700; }\\n    @media only screen and (min-width: 768px) {\\n      .hero-text-container p {\\n        flex-grow: 1;\\n        width: auto;\\n        max-width: 34rem; } }\\n  .hero-text-container__cta-container {\\n    display: flex;\\n    flex-flow: row nowrap;\\n    justify-content: start;\\n    align-items: center;\\n    gap: 2.6rem; }\\n</style>"],"names":[],"mappings":"AAiCmB,oBAAoB,8BAAC,CAAC,AACvC,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,CACT,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,UAAU,CAAE,MAAM,AAAE,CAAC,AACrB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,oBAAoB,8BAAC,CAAC,AACpB,SAAS,CAAE,CAAC,CACZ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAC3B,mCAAoB,CAAC,CAAC,eAAC,CAAC,AACtB,SAAS,CAAE,KAAK,CAChB,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,UAAU,CAAE,KAAK,CAAC,KAAK,CACvB,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,GAAG,AAAE,CAAC,AACnB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,mCAAoB,CAAC,CAAC,eAAC,CAAC,AACtB,SAAS,CAAE,CAAC,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAC3B,mCAAmC,8BAAC,CAAC,AACnC,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MAAM,AAAE,CAAC"}`
};
var HeroText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttons = [
    {
      content: "my work \u{1F446}",
      btnClass: "primary",
      type: "anchor",
      link: "/portfolio"
    },
    {
      content: "say hello \u{1F4E7}",
      btnClass: "secondary",
      type: "anchor",
      link: "/portfolio"
    }
  ];
  $$result.css.add(css$e);
  return `<div class="${"hero-text-container svelte-14kq9f0"}">${validate_component(Heading, "Heading").$$render($$result, {
    content: "No-nonsense",
    content2: "web developer",
    type: "1"
  }, {}, {})}
	<p class="${"svelte-14kq9f0"}">Hello \u{1F44B}, I&#39;m Rafal, a self-taught front-end web developer with an eye for design, obsessively
		learning towards becoming full-stack.
	</p>
	<div class="${"hero-text-container__cta-container svelte-14kq9f0"}">${each(buttons, (data) => `${validate_component(Button, "Button").$$render($$result, Object.assign(data), {}, {})}`)}</div>
</div>`;
});
var css$d = {
  code: "section.svelte-1azq3hf{--padding:2.4rem;width:100%;height:auto;display:grid;justify-items:center;align-items:start;padding:var(--padding) 0;grid-row:span 1}@media only screen and (min-width: 768px){section.svelte-1azq3hf{--padding:4rem}}section.svelte-1azq3hf:nth-of-type(1){padding-top:5rem}",
  map: '{"version":3,"file":"Section.svelte","sources":["Section.svelte"],"sourcesContent":["<script>\\r\\n    export let sectionClass\\r\\n<\/script>\\r\\n\\r\\n<section class=\\"{sectionClass}\\">\\r\\n\\r\\n    <slot />\\r\\n\\r\\n</section>\\r\\n\\r\\n<style lang=\\"scss\\">section {\\n  --padding: 2.4rem;\\n  width: 100%;\\n  height: auto;\\n  display: grid;\\n  justify-items: center;\\n  align-items: start;\\n  padding: var(--padding) 0;\\n  grid-row: span 1; }\\n  @media only screen and (min-width: 768px) {\\n    section {\\n      --padding: 4rem; } }\\n\\nsection:nth-of-type(1) {\\n  padding-top: 5rem; }\\n</style>"],"names":[],"mappings":"AAUmB,OAAO,eAAC,CAAC,AAC1B,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,MAAM,CACrB,WAAW,CAAE,KAAK,CAClB,OAAO,CAAE,IAAI,SAAS,CAAC,CAAC,CAAC,CACzB,QAAQ,CAAE,IAAI,CAAC,CAAC,AAAE,CAAC,AACnB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,OAAO,eAAC,CAAC,AACP,SAAS,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAE1B,sBAAO,aAAa,CAAC,CAAC,AAAC,CAAC,AACtB,WAAW,CAAE,IAAI,AAAE,CAAC"}'
};
var Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sectionClass } = $$props;
  if ($$props.sectionClass === void 0 && $$bindings.sectionClass && sectionClass !== void 0)
    $$bindings.sectionClass(sectionClass);
  $$result.css.add(css$d);
  return `<section class="${escape(null_to_empty(sectionClass)) + " svelte-1azq3hf"}">${slots.default ? slots.default({}) : ``}

</section>`;
});
var css$c = {
  code: ".flex-container.svelte-depp9r{width:100%;display:flex;flex-flow:column nowrap;justify-content:start;align-items:center;gap:6rem}@media only screen and (min-width: 768px){.flex-container.svelte-depp9r{flex-flow:row-reverse nowrap;justify-content:space-between;align-items:center}}",
  map: `{"version":3,"file":"Hero.svelte","sources":["Hero.svelte"],"sourcesContent":["<script>\\r\\n\\timport HeroImage from './HeroImage.svelte';\\r\\n\\timport HeroText from './HeroText.svelte';\\r\\n\\timport Section from '$lib/Core/Section.svelte';\\r\\n\\timport { getContext } from 'svelte';\\r\\n\\r\\n\\tlet size = getContext('size');\\r\\n<\/script>\\r\\n\\r\\n<Section sectionClass=\\"hero span-900\\">\\r\\n\\t<div class=\\"flex-container\\">\\r\\n\\t\\t<HeroImage />\\r\\n\\t\\t<HeroText />\\r\\n\\t</div>\\r\\n</Section>\\r\\n\\r\\n<style lang=\\"scss\\">.flex-container {\\n  width: 100%;\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: center;\\n  gap: 6rem; }\\n  @media only screen and (min-width: 768px) {\\n    .flex-container {\\n      flex-flow: row-reverse nowrap;\\n      justify-content: space-between;\\n      align-items: center; } }\\n</style>\\r\\n"],"names":[],"mappings":"AAgBmB,eAAe,cAAC,CAAC,AAClC,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,AAAE,CAAC,AACZ,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,eAAe,cAAC,CAAC,AACf,SAAS,CAAE,WAAW,CAAC,MAAM,CAC7B,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC"}`
};
var Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getContext("size");
  $$result.css.add(css$c);
  return `${validate_component(Section, "Section").$$render($$result, { sectionClass: "hero span-900" }, {}, {
    default: () => `<div class="${"flex-container svelte-depp9r"}">${validate_component(HeroImage, "HeroImage").$$render($$result, {}, {}, {})}
		${validate_component(HeroText, "HeroText").$$render($$result, {}, {}, {})}</div>`
  })}`;
});
var css$b = {
  code: "span.svelte-1h11osm{display:block;position:absolute;background:var(--clr-line-bg)}span.horizontal.svelte-1h11osm{height:1px}span.vertical.svelte-1h11osm{width:1px}",
  map: `{"version":3,"file":"Line.svelte","sources":["Line.svelte"],"sourcesContent":["<script>\\r\\n\\texport let direction, dimension, top = '', left = '', bottom = '', right = '';\\r\\n<\/script>\\r\\n\\r\\n{#if direction === 'horizontal'}\\r\\n\\t<span class=\\"line horizontal\\" style=\\"width: {dimension}; top: {top};bottom: {bottom};left: {left};right: {right};\\" />\\r\\n{:else}\\r\\n\\t<span class=\\"line vertical\\" style=\\"height: {dimension}; top: {top};bottom: {bottom};left: {left};right: {right};\\" />\\r\\n{/if}\\r\\n\\r\\n<style lang=\\"scss\\">span {\\n  display: block;\\n  position: absolute;\\n  background: var(--clr-line-bg); }\\n\\nspan.horizontal {\\n  height: 1px; }\\n\\nspan.vertical {\\n  width: 1px; }\\n</style>\\r\\n"],"names":[],"mappings":"AAUmB,IAAI,eAAC,CAAC,AACvB,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,aAAa,CAAC,AAAE,CAAC,AAEnC,IAAI,WAAW,eAAC,CAAC,AACf,MAAM,CAAE,GAAG,AAAE,CAAC,AAEhB,IAAI,SAAS,eAAC,CAAC,AACb,KAAK,CAAE,GAAG,AAAE,CAAC"}`
};
var Line = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { direction, dimension, top = "", left = "", bottom = "", right = "" } = $$props;
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.dimension === void 0 && $$bindings.dimension && dimension !== void 0)
    $$bindings.dimension(dimension);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.left === void 0 && $$bindings.left && left !== void 0)
    $$bindings.left(left);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
    $$bindings.bottom(bottom);
  if ($$props.right === void 0 && $$bindings.right && right !== void 0)
    $$bindings.right(right);
  $$result.css.add(css$b);
  return `${direction === "horizontal" ? `<span class="${"line horizontal svelte-1h11osm"}" style="${"width: " + escape(dimension) + "; top: " + escape(top) + ";bottom: " + escape(bottom) + ";left: " + escape(left) + ";right: " + escape(right) + ";"}"></span>` : `<span class="${"line vertical svelte-1h11osm"}" style="${"height: " + escape(dimension) + "; top: " + escape(top) + ";bottom: " + escape(bottom) + ";left: " + escape(left) + ";right: " + escape(right) + ";"}"></span>`}`;
});
var css$a = {
  code: "div.svelte-1r7be2m.svelte-1r7be2m{transition:height 250ms}span.circle.svelte-1r7be2m.svelte-1r7be2m{display:block;position:absolute;width:90%;max-width:100rem;aspect-ratio:1;background:transparent;border-radius:50%;border:1px solid var(--clr-line-bg);transform:translate(-50%, -50%)}.fifth-section.svelte-1r7be2m span.circle.svelte-1r7be2m{max-width:unset;transform:translate(50%, 0%)}.lines-container.svelte-1r7be2m.svelte-1r7be2m{z-index:var(--z-index-bg);grid-column:1 / -1;grid-row:1 / -1;width:100%;height:100%;position:relative}.lines-container.svelte-1r7be2m .section.svelte-1r7be2m{width:100%;position:relative}",
  map: `{"version":3,"file":"Lines.svelte","sources":["Lines.svelte"],"sourcesContent":["<script>\\r\\n\\timport { onMount } from 'svelte';\\r\\n\\timport Line from './Line.svelte';\\r\\n\\tlet mounted = false,\\r\\n\\t\\theaderHeight = 0,\\r\\n\\t\\theroHeight = 0,\\r\\n\\t\\tphilosophyHeight = 0,\\r\\n\\t\\ttechnologiesHeight = 0,\\r\\n\\t\\tportfolioHeight = 0,\\r\\n\\t\\tformHeight = 0,\\r\\n\\t\\tsectionGap = 0,\\r\\n\\t\\tphilHeight,\\r\\n\\t\\t// allComplete = false,\\r\\n\\t\\tloaded;\\r\\n\\r\\n\\t// onMount(() => {\\r\\n\\t// \\tsetTimeout(() => {\\r\\n\\t// \\t\\tmounted = true;\\r\\n\\t// \\t\\t// window.addEventListener('load', () => {\\r\\n\\t// \\t\\t// \\tconsole.log('loaded')\\r\\n\\t// \\t\\t// });\\r\\n\\t// \\t\\tconsole.log(mounted, loaded)\\r\\n\\t// \\t}, 1000)\\r\\n\\t// });\\r\\n\\r\\n\\r\\n\\tconst updateHeights = () => {\\r\\n\\t\\theaderHeight = returnElHeight('header');\\r\\n\\t\\theroHeight = returnElHeight('section.hero');\\r\\n\\t\\tphilosophyHeight = returnElHeight('section.philosophy')\\r\\n\\t\\ttechnologiesHeight = returnElHeight('section.technologies')\\r\\n\\t\\tportfolioHeight = returnElHeight('section.portfolio') \\r\\n\\t\\tformHeight = returnElHeight('section.contact-form')\\r\\n\\t};\\r\\n\\r\\n\\tconst returnElHeight = (selector) => {\\r\\n\\t\\tconst el = document.querySelector(\`\${selector}\`);\\r\\n\\t\\tconst elHeight = el.clientHeight;\\r\\n\\t\\tconst main = document.querySelector('main')\\r\\n\\t\\tconst mainGridGap = \`\${window.getComputedStyle(main).getPropertyValue('row-gap')}\`\\r\\n\\t\\tsectionGap = mainGridGap\\r\\n\\t\\treturn elHeight;\\r\\n\\t};\\r\\n\\t$: if (loaded) updateHeights();\\r\\n\\r\\n\\texport function rerunLines()  {\\r\\n\\t\\tsetTimeout(() => {\\r\\n\\t\\t\\tupdateHeights()\\r\\n\\t\\t}, 150)\\r\\n\\t}\\r\\n\\tlet scrolled = false\\r\\n\\tconst calcLinesOnScroll = (e) => {\\r\\n\\t\\tif(!scrolled){\\r\\n\\t\\t\\tupdateHeights()\\r\\n\\t\\t}\\r\\n\\t\\treturn\\r\\n\\t};\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<svelte:window on:resize={updateHeights} on:scroll={calcLinesOnScroll} on:load={() => loaded = true}/>\\r\\n\\r\\n<div class=\\"lines-container\\">\\r\\n\\t<div class=\\"section first-section\\" style=\\"height: {headerHeight}px;\\">\\r\\n\\t\\t<Line direction=\\"horizontal\\" dimension=\\"100vw\\" top=\\"20%\\" />\\r\\n\\t\\t<Line direction=\\"vertical\\" dimension=\\"100vh\\" left=\\"5%\\" />\\r\\n\\t\\t<span class=\\"circle\\" />\\r\\n\\t</div>\\r\\n\\t<div class=\\"section second-section\\" style=\\"height: {heroHeight}px; margin-bottom: {sectionGap};\\">\\r\\n\\t</div>\\r\\n\\t<div class=\\"section third-section\\" style=\\"height: {philosophyHeight}px; margin-bottom: {sectionGap};\\">\\r\\n\\t\\t<Line direction=\\"horizontal\\" dimension=\\"70vw\\" left=\\"0%\\" bottom=\\"-20%\\"/>\\r\\n\\t</div>\\r\\n\\t<div class=\\"section fourth-section\\" style=\\"height: {technologiesHeight}px; margin-bottom: {sectionGap};\\">\\r\\n\\t\\t<Line direction=\\"horizontal\\" dimension=\\"70vw\\" right=\\"0%\\" bottom=\\"-20%\\"/>\\r\\n\\t</div>\\r\\n\\t<div class=\\"section fifth-section\\" style=\\"height: {portfolioHeight}px; margin-bottom: {sectionGap};\\">\\r\\n\\t\\t<!-- <Line direction=\\"horizontal\\" dimension=\\"70vw\\" right=\\"0%\\" bottom=\\"-20%\\"/> -->\\r\\n\\t\\t<span class=\\"circle\\" />\\r\\n\\t</div>\\r\\n\\t<div class=\\"section sixth-section\\" style=\\"height: {formHeight}px; margin-bottom: {sectionGap};\\">\\r\\n\\t\\t<!-- <Line direction=\\"horizontal\\" dimension=\\"70vw\\" right=\\"0%\\" bottom=\\"-20%\\"/> -->\\r\\n\\t\\t<!-- <span class=\\"circle\\" /> -->\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">div {\\n  transition: height 250ms; }\\n\\nspan.circle {\\n  display: block;\\n  position: absolute;\\n  width: 90%;\\n  max-width: 100rem;\\n  aspect-ratio: 1;\\n  background: transparent;\\n  border-radius: 50%;\\n  border: 1px solid var(--clr-line-bg);\\n  transform: translate(-50%, -50%); }\\n\\n.fifth-section span.circle {\\n  max-width: unset;\\n  transform: translate(50%, 0%); }\\n\\n.lines-container {\\n  z-index: var(--z-index-bg);\\n  grid-column: 1 / -1;\\n  grid-row: 1 / -1;\\n  width: 100%;\\n  height: 100%;\\n  position: relative; }\\n  .lines-container .section {\\n    width: 100%;\\n    position: relative; }\\n</style>\\r\\n"],"names":[],"mappings":"AAsFmB,GAAG,8BAAC,CAAC,AACtB,UAAU,CAAE,MAAM,CAAC,KAAK,AAAE,CAAC,AAE7B,IAAI,OAAO,8BAAC,CAAC,AACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,MAAM,CACjB,YAAY,CAAE,CAAC,CACf,UAAU,CAAE,WAAW,CACvB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,AAAE,CAAC,AAErC,6BAAc,CAAC,IAAI,OAAO,eAAC,CAAC,AAC1B,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,EAAE,CAAC,AAAE,CAAC,AAElC,gBAAgB,8BAAC,CAAC,AAChB,OAAO,CAAE,IAAI,YAAY,CAAC,CAC1B,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CACnB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,AAAE,CAAC,AACrB,+BAAgB,CAAC,QAAQ,eAAC,CAAC,AACzB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,AAAE,CAAC"}`
};
var Lines = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let headerHeight = 0, heroHeight = 0, philosophyHeight = 0, technologiesHeight = 0, portfolioHeight = 0, formHeight = 0, sectionGap = 0;
  const updateHeights = () => {
    headerHeight = returnElHeight("header");
    heroHeight = returnElHeight("section.hero");
    philosophyHeight = returnElHeight("section.philosophy");
    technologiesHeight = returnElHeight("section.technologies");
    portfolioHeight = returnElHeight("section.portfolio");
    formHeight = returnElHeight("section.contact-form");
  };
  const returnElHeight = (selector) => {
    const el = document.querySelector(`${selector}`);
    const elHeight = el.clientHeight;
    const main = document.querySelector("main");
    const mainGridGap = `${window.getComputedStyle(main).getPropertyValue("row-gap")}`;
    sectionGap = mainGridGap;
    return elHeight;
  };
  function rerunLines() {
    setTimeout(() => {
      updateHeights();
    }, 150);
  }
  if ($$props.rerunLines === void 0 && $$bindings.rerunLines && rerunLines !== void 0)
    $$bindings.rerunLines(rerunLines);
  $$result.css.add(css$a);
  return `

<div class="${"lines-container svelte-1r7be2m"}"><div class="${"section first-section svelte-1r7be2m"}" style="${"height: " + escape(headerHeight) + "px;"}">${validate_component(Line, "Line").$$render($$result, {
    direction: "horizontal",
    dimension: "100vw",
    top: "20%"
  }, {}, {})}
		${validate_component(Line, "Line").$$render($$result, {
    direction: "vertical",
    dimension: "100vh",
    left: "5%"
  }, {}, {})}
		<span class="${"circle svelte-1r7be2m"}"></span></div>
	<div class="${"section second-section svelte-1r7be2m"}" style="${"height: " + escape(heroHeight) + "px; margin-bottom: " + escape(sectionGap) + ";"}"></div>
	<div class="${"section third-section svelte-1r7be2m"}" style="${"height: " + escape(philosophyHeight) + "px; margin-bottom: " + escape(sectionGap) + ";"}">${validate_component(Line, "Line").$$render($$result, {
    direction: "horizontal",
    dimension: "70vw",
    left: "0%",
    bottom: "-20%"
  }, {}, {})}</div>
	<div class="${"section fourth-section svelte-1r7be2m"}" style="${"height: " + escape(technologiesHeight) + "px; margin-bottom: " + escape(sectionGap) + ";"}">${validate_component(Line, "Line").$$render($$result, {
    direction: "horizontal",
    dimension: "70vw",
    right: "0%",
    bottom: "-20%"
  }, {}, {})}</div>
	<div class="${"section fifth-section svelte-1r7be2m"}" style="${"height: " + escape(portfolioHeight) + "px; margin-bottom: " + escape(sectionGap) + ";"}">
		<span class="${"circle svelte-1r7be2m"}"></span></div>
	<div class="${"section sixth-section svelte-1r7be2m"}" style="${"height: " + escape(formHeight) + "px; margin-bottom: " + escape(sectionGap) + ";"}">
		</div>
</div>`;
});
var css$9 = {
  code: "main.svelte-md8f08{width:100%;grid-area:main;display:grid;grid-template-columns:minmax(2.4rem, 4rem) minmax(32.7rem, 1fr) minmax(2.4rem, 4rem);grid-template-areas:'col1 col2 col3';row-gap:12rem}@media only screen and (min-width: 768px){main.svelte-md8f08{grid-template-columns:minmax(4rem, 1fr) 1fr minmax(70rem, 90rem) 1fr minmax(4rem, 1fr);grid-template-areas:'col1 col2 col3 col4 col5'}}@media only screen and (min-width: 1248px){main.svelte-md8f08{grid-template-columns:1fr minmax(4rem, 16rem) 90rem minmax(4rem, 16rem) 1fr}}main section.span-900{grid-column:col2 / col2}@media only screen and (min-width: 768px){main section.span-900{grid-column:col3 / col3}}main section.span-1220{grid-column:col2 / col2}@media only screen and (min-width: 768px){main section.span-1220{grid-column:col2 / col4}}main section.span-1440{grid-column:col2 / col2}@media only screen and (min-width: 768px){main section.span-1440{grid-column:col1 / col5}}",
  map: `{"version":3,"file":"Main.svelte","sources":["Main.svelte"],"sourcesContent":["<script>\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<main>\\r\\n\\t<slot />\\r\\n</main>\\r\\n\\r\\n<style lang=\\"scss\\">main {\\n  width: 100%;\\n  grid-area: main;\\n  display: grid;\\n  grid-template-columns: minmax(2.4rem, 4rem) minmax(32.7rem, 1fr) minmax(2.4rem, 4rem);\\n  grid-template-areas: 'col1 col2 col3';\\n  row-gap: 12rem; }\\n  @media only screen and (min-width: 768px) {\\n    main {\\n      grid-template-columns: minmax(4rem, 1fr) 1fr minmax(70rem, 90rem) 1fr minmax(4rem, 1fr);\\n      grid-template-areas: 'col1 col2 col3 col4 col5'; } }\\n  @media only screen and (min-width: 1248px) {\\n    main {\\n      grid-template-columns: 1fr minmax(4rem, 16rem) 90rem minmax(4rem, 16rem) 1fr; } }\\n\\n:global(main section.span-900) {\\n  grid-column: col2 / col2; }\\n  @media only screen and (min-width: 768px) {\\n    :global(main section.span-900) {\\n      grid-column: col3 / col3; } }\\n\\n:global(main section.span-1220) {\\n  grid-column: col2 / col2; }\\n  @media only screen and (min-width: 768px) {\\n    :global(main section.span-1220) {\\n      grid-column: col2 / col4; } }\\n\\n:global(main section.span-1440) {\\n  grid-column: col2 / col2; }\\n  @media only screen and (min-width: 768px) {\\n    :global(main section.span-1440) {\\n      grid-column: col1 / col5; } }\\n</style>\\r\\n"],"names":[],"mappings":"AAQmB,IAAI,cAAC,CAAC,AACvB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,MAAM,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,OAAO,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,MAAM,CAAC,CAAC,IAAI,CAAC,CACrF,mBAAmB,CAAE,gBAAgB,CACrC,OAAO,CAAE,KAAK,AAAE,CAAC,AACjB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,IAAI,cAAC,CAAC,AACJ,qBAAqB,CAAE,OAAO,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,OAAO,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,OAAO,IAAI,CAAC,CAAC,GAAG,CAAC,CACvF,mBAAmB,CAAE,0BAA0B,AAAE,CAAC,AAAC,CAAC,AACxD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,IAAI,cAAC,CAAC,AACJ,qBAAqB,CAAE,GAAG,CAAC,OAAO,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,OAAO,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,GAAG,AAAE,CAAC,AAAC,CAAC,AAE/E,qBAAqB,AAAE,CAAC,AAC9B,WAAW,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AAAE,CAAC,AAC3B,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACjC,qBAAqB,AAAE,CAAC,AAC9B,WAAW,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AAAE,CAAC,AAAC,CAAC,AAE3B,sBAAsB,AAAE,CAAC,AAC/B,WAAW,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AAAE,CAAC,AAC3B,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACjC,sBAAsB,AAAE,CAAC,AAC/B,WAAW,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AAAE,CAAC,AAAC,CAAC,AAE3B,sBAAsB,AAAE,CAAC,AAC/B,WAAW,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AAAE,CAAC,AAC3B,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACjC,sBAAsB,AAAE,CAAC,AAC/B,WAAW,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AAAE,CAAC,AAAC,CAAC"}`
};
var Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `<main class="${"svelte-md8f08"}">${slots.default ? slots.default({}) : ``}
</main>`;
});
var css$8 = {
  code: "body.light img.philosophy__nietzsche-img.svelte-79ep15.svelte-79ep15{border-radius:50%;mix-blend-mode:unset}.flex-container.svelte-79ep15.svelte-79ep15{width:100%;display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:1.7rem;font-family:var(--fira);text-align:left;position:relative}.flex-container.svelte-79ep15 .bg-triangle.svelte-79ep15{position:absolute;z-index:var(--z-index-behind-bg)}.flex-container.svelte-79ep15 .bg-triangle.normal.svelte-79ep15{left:50%;transform:translate(-50%, 0%);top:-5rem}.flex-container.svelte-79ep15 .bg-triangle.right.svelte-79ep15{top:-5rem;right:0;transform:rotate(180deg) translate(70%, 15%)}.flex-container.svelte-79ep15 .bg-triangle svg path{stroke:var(--clr-line-bg)}@media only screen and (min-width: 1248px){.flex-container.svelte-79ep15.svelte-79ep15{align-items:center;text-align:center}}.flex-container.svelte-79ep15 img.svelte-79ep15{position:absolute;right:0;bottom:0;transform:translate(75%, 0%);z-index:var(--z-index-bg);mix-blend-mode:lighten;width:25rem;transition:border-radius 400ms, transform 250ms, left 250ms, right 250ms}@media only screen and (min-width: 640px){.flex-container.svelte-79ep15 img.svelte-79ep15{bottom:unset;top:50%;transform:translate(50%, -50%);width:27.5rem}}@media only screen and (min-width: 768px){.flex-container.svelte-79ep15 img.svelte-79ep15{bottom:unset;transform:translate(20%, -50%)}}@media only screen and (min-width: 1024px){.flex-container.svelte-79ep15 img.svelte-79ep15{width:30rem;transform:translate(0%, -50%)}}.flex-container.svelte-79ep15 p.tags.svelte-79ep15{color:var(--clr-text-last);font-weight:700;font-size:clamp(1.3rem, 1.21409rem + 0.2291vw, 1.5rem);max-width:26.5rem;line-height:1.8rem;margin-bottom:1rem}.flex-container.svelte-79ep15 p.main-text.svelte-79ep15{max-width:48.7rem;color:var(--clr-text-focused);font-size:clamp(1.4rem, 1.29261rem + 0.28637vw, 1.65rem);line-height:2rem;margin-bottom:2rem}.flex-container.svelte-79ep15 p.main-text span.svelte-79ep15{display:block}.flex-container.svelte-79ep15 p.main-text span.bold.svelte-79ep15{font-weight:700;text-transform:uppercase}.flex-container.svelte-79ep15 p.main-text span.svelte-79ep15:not(:nth-last-child(1)){margin-bottom:1rem}",
  map: `{"version":3,"file":"Philosophy.svelte","sources":["Philosophy.svelte"],"sourcesContent":["<script>\\r\\n\\timport Section from '$lib/Core/Section.svelte';\\r\\n\\timport Button from '$lib/Button.svelte';\\r\\n\\timport Heading from '$lib/Decorations/Heading.svelte';\\r\\n\\timport Icon from '$lib/Decorations/Icon.svelte'\\r\\n\\timport { getContext } from 'svelte';\\r\\n\\r\\n\\tlet size = getContext('size');\\r\\n\\tlet btnData = {\\r\\n\\t\\ttype: 'anchor',\\r\\n\\t\\tlink: '/about',\\r\\n\\t\\tbtnClass: 'primary',\\r\\n\\t\\tcontent: 'ABOUT ME \u{1F5FF}'\\r\\n\\t};\\r\\n\\tlet tags = [\\r\\n\\t\\t'kaizen ',\\r\\n\\t\\t'systemic ',\\r\\n\\t\\t'scalable ',\\r\\n\\t\\t'minimal ',\\r\\n\\t\\t'resourceful ',\\r\\n\\t\\t'effective ',\\r\\n\\t\\t'intuitive '\\r\\n\\t];\\r\\n\\r\\n\\tlet mainText = [\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent: 'I approach my work in an identical way to approaching my life.',\\r\\n\\t\\t\\ttextClass: 'bold'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent:\\r\\n\\t\\t\\t\\t'I give it my all and always seek to improve by perpetually remaining a student of what I do.',\\r\\n\\t\\t\\ttextClass: 'normal'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent: 'I always seek to do everything systemically and scalably.',\\r\\n\\t\\t\\ttextClass: 'normal'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent: 'I seek to simplify and aim for effectiveness over mere eye-candy.',\\r\\n\\t\\t\\ttextClass: 'normal'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent: 'I remain resourceful and always find my way in a new challenge.',\\r\\n\\t\\t\\ttextClass: 'normal'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcontent: \\"I never do anything that doesn't match my long-term vision.\\",\\r\\n\\t\\t\\ttextClass: 'normal'\\r\\n\\t\\t}\\r\\n\\t];\\r\\n<\/script>\\r\\n\\r\\n<Section sectionClass=\\"philosophy span-1220\\">\\r\\n\\t<div class=\\"flex-container\\">\\r\\n\\t\\t<Heading content=\\"my philosophy\\" type=\\"2\\" />\\r\\n\\t\\t<p class=\\"tags\\">\\r\\n\\t\\t\\t{#each tags as tag}\\r\\n\\t\\t\\t\\t<span>#{tag}</span>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</p>\\r\\n\\t\\t<p class=\\"main-text\\">\\r\\n\\t\\t\\t{#each mainText as { content, textClass }}\\r\\n\\t\\t\\t\\t<span class={textClass}>{content}</span>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</p>\\r\\n\\t\\t<Button {...btnData} />\\r\\n\\t\\t<img class=\\"philosophy__nietzsche-img\\"\\r\\n\\t\\t\\tsrc=\\"/images/home/{$size}/nietzsche.png\\"\\r\\n\\t\\t\\talt=\\"Portrait of Frederich Nietzsche with his usual contemplating look.\\" />\\r\\n\\t\\t<div class=\\"bg-triangle normal\\">\\r\\n\\t\\t\\t<Icon name=\\"triangle\\" width=\\"50rem\\" />\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</Section>\\r\\n\\r\\n<style lang=\\"scss\\">:global(body.light) img.philosophy__nietzsche-img {\\n  border-radius: 50%;\\n  mix-blend-mode: unset; }\\n\\n.flex-container {\\n  width: 100%;\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 1.7rem;\\n  font-family: var(--fira);\\n  text-align: left;\\n  position: relative; }\\n  .flex-container .bg-triangle {\\n    position: absolute;\\n    z-index: var(--z-index-behind-bg); }\\n    .flex-container .bg-triangle.normal {\\n      left: 50%;\\n      transform: translate(-50%, 0%);\\n      top: -5rem; }\\n    .flex-container .bg-triangle.right {\\n      top: -5rem;\\n      right: 0;\\n      transform: rotate(180deg) translate(70%, 15%); }\\n  .flex-container :global(.bg-triangle svg path) {\\n    stroke: var(--clr-line-bg); }\\n  @media only screen and (min-width: 1248px) {\\n    .flex-container {\\n      align-items: center;\\n      text-align: center; } }\\n  .flex-container img {\\n    position: absolute;\\n    right: 0;\\n    bottom: 0;\\n    transform: translate(75%, 0%);\\n    z-index: var(--z-index-bg);\\n    mix-blend-mode: lighten;\\n    width: 25rem;\\n    transition: border-radius 400ms, transform 250ms, left 250ms, right 250ms; }\\n    @media only screen and (min-width: 640px) {\\n      .flex-container img {\\n        bottom: unset;\\n        top: 50%;\\n        transform: translate(50%, -50%);\\n        width: 27.5rem; } }\\n    @media only screen and (min-width: 768px) {\\n      .flex-container img {\\n        bottom: unset;\\n        transform: translate(20%, -50%); } }\\n    @media only screen and (min-width: 1024px) {\\n      .flex-container img {\\n        width: 30rem;\\n        transform: translate(0%, -50%); } }\\n  .flex-container p.tags {\\n    color: var(--clr-text-last);\\n    font-weight: 700;\\n    font-size: clamp(1.3rem, 1.21409rem + 0.2291vw, 1.5rem);\\n    max-width: 26.5rem;\\n    line-height: 1.8rem;\\n    margin-bottom: 1rem; }\\n  .flex-container p.main-text {\\n    max-width: 48.7rem;\\n    color: var(--clr-text-focused);\\n    font-size: clamp(1.4rem, 1.29261rem + 0.28637vw, 1.65rem);\\n    line-height: 2rem;\\n    margin-bottom: 2rem; }\\n    .flex-container p.main-text span {\\n      display: block; }\\n      .flex-container p.main-text span.bold {\\n        font-weight: 700;\\n        text-transform: uppercase; }\\n      .flex-container p.main-text span:not(:nth-last-child(1)) {\\n        margin-bottom: 1rem; }\\n</style>\\r\\n"],"names":[],"mappings":"AA4E2B,UAAU,AAAC,CAAC,GAAG,0BAA0B,4BAAC,CAAC,AACpE,aAAa,CAAE,GAAG,CAClB,cAAc,CAAE,KAAK,AAAE,CAAC,AAE1B,eAAe,4BAAC,CAAC,AACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,MAAM,CACX,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,UAAU,CAAE,IAAI,CAChB,QAAQ,CAAE,QAAQ,AAAE,CAAC,AACrB,6BAAe,CAAC,YAAY,cAAC,CAAC,AAC5B,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,mBAAmB,CAAC,AAAE,CAAC,AACpC,6BAAe,CAAC,YAAY,OAAO,cAAC,CAAC,AACnC,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,EAAE,CAAC,CAC9B,GAAG,CAAE,KAAK,AAAE,CAAC,AACf,6BAAe,CAAC,YAAY,MAAM,cAAC,CAAC,AAClC,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,CAAC,CACR,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,GAAG,CAAC,CAAC,GAAG,CAAC,AAAE,CAAC,AACpD,6BAAe,CAAC,AAAQ,qBAAqB,AAAE,CAAC,AAC9C,MAAM,CAAE,IAAI,aAAa,CAAC,AAAE,CAAC,AAC/B,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,eAAe,4BAAC,CAAC,AACf,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC,AAC3B,6BAAe,CAAC,GAAG,cAAC,CAAC,AACnB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,EAAE,CAAC,CAC7B,OAAO,CAAE,IAAI,YAAY,CAAC,CAC1B,cAAc,CAAE,OAAO,CACvB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,aAAa,CAAC,KAAK,CAAC,CAAC,SAAS,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,KAAK,AAAE,CAAC,AAC5E,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,6BAAe,CAAC,GAAG,cAAC,CAAC,AACnB,MAAM,CAAE,KAAK,CACb,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,IAAI,CAAC,CAC/B,KAAK,CAAE,OAAO,AAAE,CAAC,AAAC,CAAC,AACvB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,6BAAe,CAAC,GAAG,cAAC,CAAC,AACnB,MAAM,CAAE,KAAK,CACb,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,IAAI,CAAC,AAAE,CAAC,AAAC,CAAC,AACxC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,6BAAe,CAAC,GAAG,cAAC,CAAC,AACnB,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,UAAU,EAAE,CAAC,CAAC,IAAI,CAAC,AAAE,CAAC,AAAC,CAAC,AACzC,6BAAe,CAAC,CAAC,KAAK,cAAC,CAAC,AACtB,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,MAAM,CAAC,CACvD,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,IAAI,AAAE,CAAC,AACxB,6BAAe,CAAC,CAAC,UAAU,cAAC,CAAC,AAC3B,SAAS,CAAE,OAAO,CAClB,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CACzD,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,IAAI,AAAE,CAAC,AACtB,6BAAe,CAAC,CAAC,UAAU,CAAC,IAAI,cAAC,CAAC,AAChC,OAAO,CAAE,KAAK,AAAE,CAAC,AACjB,6BAAe,CAAC,CAAC,UAAU,CAAC,IAAI,KAAK,cAAC,CAAC,AACrC,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,AAAE,CAAC,AAC9B,6BAAe,CAAC,CAAC,UAAU,CAAC,kBAAI,KAAK,gBAAgB,CAAC,CAAC,CAAC,AAAC,CAAC,AACxD,aAAa,CAAE,IAAI,AAAE,CAAC"}`
};
var Philosophy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $size, $$unsubscribe_size;
  let size = getContext("size");
  $$unsubscribe_size = subscribe(size, (value) => $size = value);
  let btnData = {
    type: "anchor",
    link: "/about",
    btnClass: "primary",
    content: "ABOUT ME \u{1F5FF}"
  };
  let tags = [
    "kaizen ",
    "systemic ",
    "scalable ",
    "minimal ",
    "resourceful ",
    "effective ",
    "intuitive "
  ];
  let mainText = [
    {
      content: "I approach my work in an identical way to approaching my life.",
      textClass: "bold"
    },
    {
      content: "I give it my all and always seek to improve by perpetually remaining a student of what I do.",
      textClass: "normal"
    },
    {
      content: "I always seek to do everything systemically and scalably.",
      textClass: "normal"
    },
    {
      content: "I seek to simplify and aim for effectiveness over mere eye-candy.",
      textClass: "normal"
    },
    {
      content: "I remain resourceful and always find my way in a new challenge.",
      textClass: "normal"
    },
    {
      content: "I never do anything that doesn't match my long-term vision.",
      textClass: "normal"
    }
  ];
  $$result.css.add(css$8);
  $$unsubscribe_size();
  return `${validate_component(Section, "Section").$$render($$result, { sectionClass: "philosophy span-1220" }, {}, {
    default: () => `<div class="${"flex-container svelte-79ep15"}">${validate_component(Heading, "Heading").$$render($$result, { content: "my philosophy", type: "2" }, {}, {})}
		<p class="${"tags svelte-79ep15"}">${each(tags, (tag) => `<span class="${"svelte-79ep15"}">#${escape(tag)}</span>`)}</p>
		<p class="${"main-text svelte-79ep15"}">${each(mainText, ({ content, textClass }) => `<span class="${escape(null_to_empty(textClass)) + " svelte-79ep15"}">${escape(content)}</span>`)}</p>
		${validate_component(Button, "Button").$$render($$result, Object.assign(btnData), {}, {})}
		<img class="${"philosophy__nietzsche-img svelte-79ep15"}" src="${"/images/home/" + escape($size) + "/nietzsche.png"}" alt="${"Portrait of Frederich Nietzsche with his usual contemplating look."}">
		<div class="${"bg-triangle normal svelte-79ep15"}">${validate_component(Icon, "Icon").$$render($$result, { name: "triangle", width: "50rem" }, {}, {})}</div></div>`
  })}`;
});
var css$7 = {
  code: ".badge.svelte-1jg9px6.svelte-1jg9px6{width:auto;height:auto;padding-left:clamp(1rem, 0.52749rem + 1.26002vw, 2.1rem);padding-right:clamp(1rem, 0.52749rem + 1.26002vw, 2.1rem);padding-top:clamp(0.95rem, 0.87268rem + 0.20619vw, 1.13rem);padding-bottom:clamp(0.95rem, 0.87268rem + 0.20619vw, 1.13rem);background:var(--clr-tech-badge-bg);color:var(--clr-text-focused);font-family:var(--fira);display:flex;flex-flow:row nowrap;justify-content:center;align-items:center;font-size:clamp(1.5rem, 1.44416rem + 0.14891vw, 1.63rem);gap:0.8rem;position:relative;transition:background 250ms, flex-grow 250ms;cursor:pointer}.badge.svelte-1jg9px6.svelte-1jg9px6:hover{background:var(--clr-tech-badge-hover-bg)}.badge.active.svelte-1jg9px6.svelte-1jg9px6{background:var(--clr-tech-badge-hover-bg);flex-grow:1}.badge.svelte-1jg9px6 .svelte-1jg9px6{pointer-events:none}.badge.svelte-1jg9px6 img.svelte-1jg9px6{width:1.5rem}.badge.svelte-1jg9px6 p.svelte-1jg9px6{font-weight:700}",
  map: `{"version":3,"file":"Badge.svelte","sources":["Badge.svelte"],"sourcesContent":["<script>\\r\\n    import { createEventDispatcher } from 'svelte';\\r\\n    const dispatch = createEventDispatcher();\\r\\n\\r\\n    import {fade, fly, slide} from 'svelte/transition'\\r\\n\\texport let name, text, index,lastClickedIndex;\\r\\n    $: lastClickedIndexReactive = lastClickedIndex\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n\\r\\n<div class=\\"badge {name}\\" on:click={() => dispatch('clickedBadge', index)} class:active={index === lastClickedIndexReactive}>\\r\\n\\t<!-- <div class=\\"hoverable-overlay\\" /> -->\\r\\n\\r\\n\\t<img src=\\"/images/home/shared/tech-logos/{name}.png\\" alt=\\"{name} svg icon\\" />\\r\\n\\t<p>{text}</p>\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">.badge {\\n  width: auto;\\n  height: auto;\\n  padding-left: clamp(1rem, 0.52749rem + 1.26002vw, 2.1rem);\\n  padding-right: clamp(1rem, 0.52749rem + 1.26002vw, 2.1rem);\\n  padding-top: clamp(0.95rem, 0.87268rem + 0.20619vw, 1.13rem);\\n  padding-bottom: clamp(0.95rem, 0.87268rem + 0.20619vw, 1.13rem);\\n  background: var(--clr-tech-badge-bg);\\n  color: var(--clr-text-focused);\\n  font-family: var(--fira);\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: center;\\n  align-items: center;\\n  font-size: clamp(1.5rem, 1.44416rem + 0.14891vw, 1.63rem);\\n  gap: 0.8rem;\\n  position: relative;\\n  transition: background 250ms, flex-grow 250ms;\\n  cursor: pointer; }\\n  .badge:hover {\\n    background: var(--clr-tech-badge-hover-bg); }\\n  .badge.active {\\n    background: var(--clr-tech-badge-hover-bg);\\n    flex-grow: 1; }\\n  .badge * {\\n    pointer-events: none; }\\n  .badge img {\\n    width: 1.5rem; }\\n  .badge p {\\n    font-weight: 700; }\\n</style>\\r\\n"],"names":[],"mappings":"AAmBmB,MAAM,8BAAC,CAAC,AACzB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,MAAM,IAAI,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CACzD,aAAa,CAAE,MAAM,IAAI,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CAC1D,WAAW,CAAE,MAAM,OAAO,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CAC5D,cAAc,CAAE,MAAM,OAAO,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CAC/D,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CACzD,GAAG,CAAE,MAAM,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,UAAU,CAAC,KAAK,CAAC,CAAC,SAAS,CAAC,KAAK,CAC7C,MAAM,CAAE,OAAO,AAAE,CAAC,AAClB,oCAAM,MAAM,AAAC,CAAC,AACZ,UAAU,CAAE,IAAI,yBAAyB,CAAC,AAAE,CAAC,AAC/C,MAAM,OAAO,8BAAC,CAAC,AACb,UAAU,CAAE,IAAI,yBAAyB,CAAC,CAC1C,SAAS,CAAE,CAAC,AAAE,CAAC,AACjB,qBAAM,CAAC,eAAE,CAAC,AACR,cAAc,CAAE,IAAI,AAAE,CAAC,AACzB,qBAAM,CAAC,GAAG,eAAC,CAAC,AACV,KAAK,CAAE,MAAM,AAAE,CAAC,AAClB,qBAAM,CAAC,CAAC,eAAC,CAAC,AACR,WAAW,CAAE,GAAG,AAAE,CAAC"}`
};
var Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lastClickedIndexReactive;
  createEventDispatcher();
  let { name, text, index: index2, lastClickedIndex } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.index === void 0 && $$bindings.index && index2 !== void 0)
    $$bindings.index(index2);
  if ($$props.lastClickedIndex === void 0 && $$bindings.lastClickedIndex && lastClickedIndex !== void 0)
    $$bindings.lastClickedIndex(lastClickedIndex);
  $$result.css.add(css$7);
  lastClickedIndexReactive = lastClickedIndex;
  return `<div class="${[
    "badge " + escape(name) + " svelte-1jg9px6",
    index2 === lastClickedIndexReactive ? "active" : ""
  ].join(" ").trim()}">

	<img src="${"/images/home/shared/tech-logos/" + escape(name) + ".png"}" alt="${escape(name) + " svg icon"}" class="${"svelte-1jg9px6"}">
	<p class="${"svelte-1jg9px6"}">${escape(text)}</p>
</div>`;
});
var css$6 = {
  code: ".info-container.svelte-1ekikdi.svelte-1ekikdi{width:max-content;display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;background:var(--clr-tech-info-bg);z-index:var(--z-index-priority);padding:3rem 4rem;color:var(--clr-text-focused);font-family:var(--fira);font-size:clamp(1.4rem, 1.29261rem + 0.28637vw, 1.65rem);flex:1 0 100%;gap:1rem}.info-container.svelte-1ekikdi p.svelte-1ekikdi{text-align:left;width:100%}",
  map: `{"version":3,"file":"InfoContainer.svelte","sources":["InfoContainer.svelte"],"sourcesContent":["<script>\\r\\n\\texport let info;\\r\\n    import {slide} from 'svelte/transition'\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"info-container\\" transition:slide={{duration: 250}}>\\r\\n\\t{#each info as par}\\r\\n\\t\\t<p>{par}</p>\\r\\n\\t{/each}\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">.info-container {\\n  width: max-content;\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  background: var(--clr-tech-info-bg);\\n  z-index: var(--z-index-priority);\\n  padding: 3rem 4rem;\\n  color: var(--clr-text-focused);\\n  font-family: var(--fira);\\n  font-size: clamp(1.4rem, 1.29261rem + 0.28637vw, 1.65rem);\\n  flex: 1 0 100%;\\n  gap: 1rem; }\\n  .info-container p {\\n    text-align: left;\\n    width: 100%; }\\n</style>\\r\\n"],"names":[],"mappings":"AAWmB,eAAe,8BAAC,CAAC,AAClC,KAAK,CAAE,WAAW,CAClB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,UAAU,CAAE,IAAI,kBAAkB,CAAC,CACnC,OAAO,CAAE,IAAI,kBAAkB,CAAC,CAChC,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CACzD,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CACd,GAAG,CAAE,IAAI,AAAE,CAAC,AACZ,8BAAe,CAAC,CAAC,eAAC,CAAC,AACjB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,AAAE,CAAC"}`
};
var InfoContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { info } = $$props;
  if ($$props.info === void 0 && $$bindings.info && info !== void 0)
    $$bindings.info(info);
  $$result.css.add(css$6);
  return `<div class="${"info-container svelte-1ekikdi"}">${each(info, (par) => `<p class="${"svelte-1ekikdi"}">${escape(par)}</p>`)}
</div>`;
});
var badgesData = [
  {
    type: "badge",
    name: "html",
    text: "HTML",
    info: [
      "I have spent a considerable amount of time with HTML.",
      "Whilst I forget some syntax aspects like what attributes would go into a radiobutton form's I will always know where to find the information.",
      "I spent time experiment with symantic HTML and I find the topic rather interesting.",
      "The most recent finding was schema.org"
    ]
  },
  { type: "badge", name: "css", text: "CSS", info: ["Testing2"] },
  { type: "badge", name: "javascript", text: "Javascript", info: ["Testing3"] },
  { type: "badge", name: "sass", text: "SASS", info: ["Testing4"] },
  { type: "badge", name: "firebase", text: "Firebase", info: ["Testing5"] },
  { type: "badge", name: "svelte", text: "Svelte", info: ["Testing6"] },
  { type: "badge", name: "sveltekit", text: "Sveltekit", info: ["Testing7"] },
  { type: "badge", name: "tailwind", text: "Tailwind", info: ["Testing8"] },
  { type: "badge", name: "netlify", text: "Netlify", info: ["Testing9"] },
  { type: "badge", name: "netlifyCms", text: "NetlifyCMS", info: ["Testing10"] }
];
var badges = readable(badgesData);
var css$5 = {
  code: ".flex-container.svelte-dvxh30{width:100%;display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:2.9rem;position:relative;transition:gap 250ms}@media only screen and (min-width: 1248px){.flex-container.svelte-dvxh30{align-items:center}}p.svelte-dvxh30{font-family:var(--fira);color:var(--clr-text-faded);font-size:clamp(1.5rem, 1.43557rem + 0.17182vw, 1.65rem);max-width:36rem;text-align:left}@media only screen and (min-width: 1248px){p.svelte-dvxh30{text-align:center}}.badges-container.svelte-dvxh30{display:flex;flex-flow:row wrap;justify-content:start;align-items:center;max-width:23rem;gap:1rem;transition:gap 250ms}@media only screen and (min-width: 560px){.badges-container.svelte-dvxh30{max-width:35rem}}@media only screen and (min-width: 768px){.badges-container.svelte-dvxh30{max-width:55rem}}@media only screen and (min-width: 1248px){.badges-container.svelte-dvxh30{justify-content:center}}img.svelte-dvxh30{position:absolute;right:0;bottom:0;transform:translate(63%, 4%) rotate(-27.5deg);transition:right 250ms, left 250ms, transform 250ms}@media only screen and (min-width: 480px){img.svelte-dvxh30{transform:translate(57%, 8%) rotate(-18.5deg)}}@media only screen and (min-width: 560px){img.svelte-dvxh30{transform:translate(49%, 22%) rotate(-7.5deg)}}@media only screen and (min-width: 768px){img.svelte-dvxh30{transform:translate(52%, 22%) rotate(0.5deg)}}@media only screen and (min-width: 1024px){img.svelte-dvxh30{transform:translate(34%, 9%) rotate(-6.5deg)}}@media only screen and (min-width: 1248px){img.svelte-dvxh30{transform:translate(-46%, 14%) rotate(15.5deg);right:unset;left:0;width:34rem}}",
  map: `{"version":3,"file":"Technologies.svelte","sources":["Technologies.svelte"],"sourcesContent":["<script>\\r\\n\\timport Section from '$lib/Core/Section.svelte';\\r\\n\\timport Heading from '$lib/Decorations/Heading.svelte';\\r\\n\\timport Badge from './Badge.svelte';\\r\\n\\timport InfoContainer from './InfoContainer.svelte';\\r\\n\\timport BadgesData from '$lib/stores/techBadgesData.js'\\r\\n\\timport {getContext, createEventDispatcher } from 'svelte'\\r\\n\\tconst dispatch = createEventDispatcher();\\r\\n\\tlet data = $BadgesData, size = getContext('size')\\r\\n\\r\\n\\tconst removeInfo = () => {\\r\\n\\t\\tlet tempData = [...data];\\r\\n\\t\\ttempData.splice(2, 1);\\r\\n\\t\\tdata = tempData;\\r\\n\\t};\\r\\n\\r\\n\\tconst clearInfoFromData = () => {\\r\\n\\t\\tdata = data.filter((d) => d.type === 'badge');\\r\\n\\t};\\r\\n\\r\\n\\tlet lastClickedIndex = null,\\r\\n\\t\\tbadgeInfo = [];\\r\\n\\r\\n\\tconst updateLastClickedIndex = (e) => {\\r\\n\\t\\tconsole.log('running')\\r\\n\\t\\tlet index = e.detail;\\r\\n\\t\\tif (lastClickedIndex == index) {\\r\\n\\t\\t\\tlastClickedIndex = null;\\r\\n\\t\\t\\tbadgeInfo = [];\\r\\n\\t\\t} else if (lastClickedIndex == null || lastClickedIndex != index)\\r\\n\\t\\t{\\r\\n\\t\\t\\tlastClickedIndex = index;\\r\\n\\t\\t\\tbadgeInfo = data[index].info;\\r\\n\\t\\t}\\r\\n\\t\\tconsole.log('running')\\r\\n\\t\\tdispatch('recalculateLines')\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<Section sectionClass=\\"technologies span-1220\\">\\r\\n\\t<div class=\\"flex-container\\">\\r\\n\\t\\t<Heading type=\\"2\\" content=\\"Technologies\\" />\\r\\n\\t\\t<p>\\r\\n\\t\\t\\tI focus on learning concepts and systems. I will forget syntax, I might forget defenitions,\\r\\n\\t\\t\\tbut I will know where to find anything I need. Repetition takes care of the rest.\\r\\n\\t\\t</p>\\r\\n\\t\\t<p>Some Technologies that I am comfortable with \u{1F4AA}:</p>\\r\\n\\r\\n\\t\\t<div class=\\"badges-container\\">\\r\\n\\t\\t\\t{#each data as { name, text }, i}\\r\\n\\t\\t\\t\\t<Badge\\r\\n\\t\\t\\t\\t\\t{name}\\r\\n\\t\\t\\t\\t\\t{text}\\r\\n\\t\\t\\t\\t\\tindex={i}\\r\\n\\t\\t\\t\\t\\t{lastClickedIndex}\\r\\n\\t\\t\\t\\t\\ton:clickedBadge={updateLastClickedIndex}/>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t\\t{#if badgeInfo.length >= 1}\\r\\n\\t\\t\\t\\t<InfoContainer info={badgeInfo} />\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t</div>\\r\\n\\t\\t{#if badgeInfo.length === 0}\\r\\n\\t\\t\\t<p class=\\"click-disclaimer\\">\u{1F446} on a badge to read my thoughts</p>\\r\\n\\t\\t{/if}\\r\\n\\r\\n\\t\\t<img src=\\"/images/home/{$size}/tesla.png\\" alt=\\"\\">\\r\\n\\t</div>\\r\\n</Section>\\r\\n\\r\\n<style lang=\\"scss\\">.flex-container {\\n  width: 100%;\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 2.9rem;\\n  position: relative;\\n  transition: gap 250ms; }\\n  @media only screen and (min-width: 1248px) {\\n    .flex-container {\\n      align-items: center; } }\\n\\np {\\n  font-family: var(--fira);\\n  color: var(--clr-text-faded);\\n  font-size: clamp(1.5rem, 1.43557rem + 0.17182vw, 1.65rem);\\n  max-width: 36rem;\\n  text-align: left; }\\n  @media only screen and (min-width: 1248px) {\\n    p {\\n      text-align: center; } }\\n\\n.badges-container {\\n  display: flex;\\n  flex-flow: row wrap;\\n  justify-content: start;\\n  align-items: center;\\n  max-width: 23rem;\\n  gap: 1rem;\\n  transition: gap 250ms; }\\n  @media only screen and (min-width: 560px) {\\n    .badges-container {\\n      max-width: 35rem; } }\\n  @media only screen and (min-width: 768px) {\\n    .badges-container {\\n      max-width: 55rem; } }\\n  @media only screen and (min-width: 1248px) {\\n    .badges-container {\\n      justify-content: center; } }\\n\\nimg {\\n  position: absolute;\\n  right: 0;\\n  bottom: 0;\\n  transform: translate(63%, 4%) rotate(-27.5deg);\\n  transition: right 250ms, left 250ms, transform 250ms; }\\n  @media only screen and (min-width: 480px) {\\n    img {\\n      transform: translate(57%, 8%) rotate(-18.5deg); } }\\n  @media only screen and (min-width: 560px) {\\n    img {\\n      transform: translate(49%, 22%) rotate(-7.5deg); } }\\n  @media only screen and (min-width: 768px) {\\n    img {\\n      transform: translate(52%, 22%) rotate(0.5deg); } }\\n  @media only screen and (min-width: 1024px) {\\n    img {\\n      transform: translate(34%, 9%) rotate(-6.5deg); } }\\n  @media only screen and (min-width: 1248px) {\\n    img {\\n      transform: translate(-46%, 14%) rotate(15.5deg);\\n      right: unset;\\n      left: 0;\\n      width: 34rem; } }\\n</style>\\r\\n"],"names":[],"mappings":"AAqEmB,eAAe,cAAC,CAAC,AAClC,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,MAAM,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,GAAG,CAAC,KAAK,AAAE,CAAC,AACxB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,eAAe,cAAC,CAAC,AACf,WAAW,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC,AAE9B,CAAC,cAAC,CAAC,AACD,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CACzD,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,IAAI,AAAE,CAAC,AACnB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,CAAC,cAAC,CAAC,AACD,UAAU,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC,AAE7B,iBAAiB,cAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,IAAI,CACnB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,KAAK,CAChB,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,GAAG,CAAC,KAAK,AAAE,CAAC,AACxB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,iBAAiB,cAAC,CAAC,AACjB,SAAS,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AACzB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,iBAAiB,cAAC,CAAC,AACjB,SAAS,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AACzB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,iBAAiB,cAAC,CAAC,AACjB,eAAe,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC,AAElC,GAAG,cAAC,CAAC,AACH,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,OAAO,QAAQ,CAAC,CAC9C,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,SAAS,CAAC,KAAK,AAAE,CAAC,AACvD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,GAAG,cAAC,CAAC,AACH,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,OAAO,QAAQ,CAAC,AAAE,CAAC,AAAC,CAAC,AACvD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,GAAG,cAAC,CAAC,AACH,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,OAAO,CAAC,AAAE,CAAC,AAAC,CAAC,AACvD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,GAAG,cAAC,CAAC,AACH,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,MAAM,CAAC,AAAE,CAAC,AAAC,CAAC,AACtD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,GAAG,cAAC,CAAC,AACH,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,OAAO,OAAO,CAAC,AAAE,CAAC,AAAC,CAAC,AACtD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,GAAG,cAAC,CAAC,AACH,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,OAAO,CAAC,CAC/C,KAAK,CAAE,KAAK,CACZ,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC"}`
};
var Technologies = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $BadgesData, $$unsubscribe_BadgesData;
  let $size, $$unsubscribe_size;
  $$unsubscribe_BadgesData = subscribe(badges, (value) => $BadgesData = value);
  createEventDispatcher();
  let data = $BadgesData, size = getContext("size");
  $$unsubscribe_size = subscribe(size, (value) => $size = value);
  let lastClickedIndex = null, badgeInfo = [];
  $$result.css.add(css$5);
  $$unsubscribe_BadgesData();
  $$unsubscribe_size();
  return `${validate_component(Section, "Section").$$render($$result, { sectionClass: "technologies span-1220" }, {}, {
    default: () => `<div class="${"flex-container svelte-dvxh30"}">${validate_component(Heading, "Heading").$$render($$result, { type: "2", content: "Technologies" }, {}, {})}
		<p class="${"svelte-dvxh30"}">I focus on learning concepts and systems. I will forget syntax, I might forget defenitions,
			but I will know where to find anything I need. Repetition takes care of the rest.
		</p>
		<p class="${"svelte-dvxh30"}">Some Technologies that I am comfortable with \u{1F4AA}:</p>

		<div class="${"badges-container svelte-dvxh30"}">${each(data, ({ name, text }, i) => `${validate_component(Badge, "Badge").$$render($$result, { name, text, index: i, lastClickedIndex }, {}, {})}`)}
			${badgeInfo.length >= 1 ? `${validate_component(InfoContainer, "InfoContainer").$$render($$result, { info: badgeInfo }, {}, {})}` : ``}</div>
		${badgeInfo.length === 0 ? `<p class="${"click-disclaimer svelte-dvxh30"}">\u{1F446} on a badge to read my thoughts</p>` : ``}

		<img src="${"/images/home/" + escape($size) + "/tesla.png"}" alt="${""}" class="${"svelte-dvxh30"}"></div>`
  })}`;
});
var css$4 = {
  code: "input.hidden.svelte-3ooefh.svelte-3ooefh{display:none}.filters-container.svelte-3ooefh.svelte-3ooefh{display:flex;flex-flow:row nowrap;justify-content:start;align-items:center;gap:1rem;margin-bottom:6rem}label.svelte-3ooefh.svelte-3ooefh{cursor:pointer}label.active.svelte-3ooefh .label-content .radio-button.svelte-3ooefh{background:var(--clr-portfolio-filter-accent);border-color:var(--clr-portfolio-filter-accent)}label.active.svelte-3ooefh .label-content .radio-description.svelte-3ooefh{color:var(--clr-portfolio-filter-accent)}.label-content.svelte-3ooefh.svelte-3ooefh{display:flex;flex-flow:row nowrap;justify-content:start;align-items:center;gap:0.7rem}.label-content.svelte-3ooefh p.svelte-3ooefh{font-family:var(--fira);font-size:clamp(1.4rem, 1.33557rem + 0.17182vw, 1.55rem);color:var(--clr-text-focused);font-weight:700;transition:color 250ms}.label-content.svelte-3ooefh .radio-button.svelte-3ooefh{display:grid;place-items:center;width:1.4rem;height:1.4rem;border:var(--clr-text-focused) solid 1px;border-radius:50%;transition:background 250ms}label.active .label-content .radio-button svg path{fill:var(--clr-portfolio-filter-active-tick)}",
  map: `{"version":3,"file":"PortfolioFilter.svelte","sources":["PortfolioFilter.svelte"],"sourcesContent":["<script>\\r\\n\\timport { createEventDispatcher } from 'svelte';\\r\\n\\tconst dispatch = createEventDispatcher();\\r\\n\\timport Icon from '$lib/Decorations/Icon.svelte';\\r\\n\\tlet options = [\\r\\n\\t\\t{\\r\\n\\t\\t\\tname: 'featured',\\r\\n\\t\\t\\ttext: 'Featured',\\r\\n\\t\\t\\tfilters: ['featured']\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tname: 'dev-only',\\r\\n\\t\\t\\ttext: 'Dev Only',\\r\\n\\t\\t\\tfilters: ['dev']\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tname: 'dev-design',\\r\\n\\t\\t\\ttext: 'Dev + Design',\\r\\n\\t\\t\\tfilters: ['dev', 'design']\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tname: 'all',\\r\\n\\t\\t\\ttext: 'All',\\r\\n\\t\\t\\tfilters: []\\r\\n\\t\\t}\\r\\n\\t];\\r\\n\\r\\n\\texport let initialFilter;\\r\\n\\t$: selectedFilter = initialFilter;\\r\\n\\r\\n\\r\\n\\tconst dispatchFilter = (filter) => {\\r\\n\\t\\tdispatch('updateFilter', filter);\\r\\n\\t};\\r\\n\\r\\n\\t$: dispatchFilter(selectedFilter);\\r\\n\\r\\n\\tconst updateProjects = (chosenFilters) => {\\r\\n\\t\\tconst data = chosenFilters;\\r\\n\\t\\tdispatch('updateProjects',data)\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"filters-container\\">\\r\\n\\t{#each options as { name, text, filters }}\\r\\n\\t\\t<label for={name} class:active={selectedFilter === name}>\\r\\n\\t\\t\\t<input\\r\\n\\t\\t\\t\\ttype=\\"radio\\"\\r\\n\\t\\t\\t\\tid={name}\\r\\n\\t\\t\\t\\t{name}\\r\\n\\t\\t\\t\\tvalue={name}\\r\\n\\t\\t\\t\\tclass=\\"hidden\\"\\r\\n\\t\\t\\t\\tbind:group={selectedFilter}\\r\\n\\t\\t\\t\\ton:click={() => updateProjects(filters)} />\\r\\n\\t\\t\\t<div class=\\"label-content\\">\\r\\n\\t\\t\\t\\t<div class=\\"radio-button\\" />\\r\\n\\t\\t\\t\\t<p class=\\"radio-description\\">{text}</p>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</label>\\r\\n\\t{/each}\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">input.hidden {\\n  display: none; }\\n\\n.filters-container {\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: start;\\n  align-items: center;\\n  gap: 1rem;\\n  margin-bottom: 6rem; }\\n\\nlabel {\\n  cursor: pointer; }\\n  label.active .label-content .radio-button {\\n    background: var(--clr-portfolio-filter-accent);\\n    border-color: var(--clr-portfolio-filter-accent); }\\n  label.active .label-content .radio-description {\\n    color: var(--clr-portfolio-filter-accent); }\\n\\n.label-content {\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: start;\\n  align-items: center;\\n  gap: 0.7rem; }\\n  .label-content p {\\n    font-family: var(--fira);\\n    font-size: clamp(1.4rem, 1.33557rem + 0.17182vw, 1.55rem);\\n    color: var(--clr-text-focused);\\n    font-weight: 700;\\n    transition: color 250ms; }\\n  .label-content .radio-button {\\n    display: grid;\\n    place-items: center;\\n    width: 1.4rem;\\n    height: 1.4rem;\\n    border: var(--clr-text-focused) solid 1px;\\n    border-radius: 50%;\\n    transition: background 250ms; }\\n\\n:global(label.active .label-content .radio-button svg path) {\\n  fill: var(--clr-portfolio-filter-active-tick); }\\n</style>\\r\\n"],"names":[],"mappings":"AA8DmB,KAAK,OAAO,4BAAC,CAAC,AAC/B,OAAO,CAAE,IAAI,AAAE,CAAC,AAElB,kBAAkB,4BAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,KAAK,4BAAC,CAAC,AACL,MAAM,CAAE,OAAO,AAAE,CAAC,AAClB,KAAK,qBAAO,CAAC,cAAc,CAAC,aAAa,cAAC,CAAC,AACzC,UAAU,CAAE,IAAI,6BAA6B,CAAC,CAC9C,YAAY,CAAE,IAAI,6BAA6B,CAAC,AAAE,CAAC,AACrD,KAAK,qBAAO,CAAC,cAAc,CAAC,kBAAkB,cAAC,CAAC,AAC9C,KAAK,CAAE,IAAI,6BAA6B,CAAC,AAAE,CAAC,AAEhD,cAAc,4BAAC,CAAC,AACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MAAM,AAAE,CAAC,AACd,4BAAc,CAAC,CAAC,cAAC,CAAC,AAChB,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CACzD,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,KAAK,CAAC,KAAK,AAAE,CAAC,AAC5B,4BAAc,CAAC,aAAa,cAAC,CAAC,AAC5B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,CACd,MAAM,CAAE,IAAI,kBAAkB,CAAC,CAAC,KAAK,CAAC,GAAG,CACzC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CAAC,KAAK,AAAE,CAAC,AAE3B,kDAAkD,AAAE,CAAC,AAC3D,IAAI,CAAE,IAAI,kCAAkC,CAAC,AAAE,CAAC"}`
};
var PortfolioFilter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedFilter;
  const dispatch = createEventDispatcher();
  let options2 = [
    {
      name: "featured",
      text: "Featured",
      filters: ["featured"]
    },
    {
      name: "dev-only",
      text: "Dev Only",
      filters: ["dev"]
    },
    {
      name: "dev-design",
      text: "Dev + Design",
      filters: ["dev", "design"]
    },
    { name: "all", text: "All", filters: [] }
  ];
  let { initialFilter } = $$props;
  const dispatchFilter = (filter) => {
    dispatch("updateFilter", filter);
  };
  if ($$props.initialFilter === void 0 && $$bindings.initialFilter && initialFilter !== void 0)
    $$bindings.initialFilter(initialFilter);
  $$result.css.add(css$4);
  selectedFilter = initialFilter;
  {
    dispatchFilter(selectedFilter);
  }
  return `<div class="${"filters-container svelte-3ooefh"}">${each(options2, ({ name, text, filters }) => `<label${add_attribute("for", name, 0)} class="${["svelte-3ooefh", selectedFilter === name ? "active" : ""].join(" ").trim()}"><input type="${"radio"}"${add_attribute("id", name, 0)}${add_attribute("name", name, 0)}${add_attribute("value", name, 0)} class="${"hidden svelte-3ooefh"}"${name === selectedFilter ? add_attribute("checked", true, 1) : ""}>
			<div class="${"label-content svelte-3ooefh"}"><div class="${"radio-button svelte-3ooefh"}"></div>
				<p class="${"radio-description svelte-3ooefh"}">${escape(text)}</p></div>
		</label>`)}
</div>`;
});
var css$3 = {
  code: ".view-project-button svg path{fill:var(--clr-text-accent-cyan)}.view-project-button svg{transform:translateY(-0.1rem)}.text-container.svelte-1v3kwtl.svelte-1v3kwtl{display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:1.4rem;font-family:var(--fira)}@media only screen and (min-width: 1248px){.text-container.svelte-1v3kwtl.svelte-1v3kwtl{flex:0 0 34rem}}.text-container.svelte-1v3kwtl h3.project-name.svelte-1v3kwtl{color:var(--clr-text-focused);font-size:clamp(2.2rem, 1.85636rem + 0.91638vw, 3rem)}.text-container.svelte-1v3kwtl p.subtitle.svelte-1v3kwtl{color:var(--clr-text-faded);font-size:clamp(1.4rem, 1.31409rem + 0.2291vw, 1.6rem)}.text-container.svelte-1v3kwtl p.description.svelte-1v3kwtl{font-family:var(--roboto);color:var(--clr-text-focused);font-size:clamp(1.4rem, 1.31409rem + 0.2291vw, 1.6rem);line-height:clamp(1.5rem, 1.41409rem + 0.2291vw, 1.7rem);margin-bottom:1.5rem}.text-container.svelte-1v3kwtl a.view-project-button.svelte-1v3kwtl{display:flex;flex-flow:row nowrap;justify-content:start;align-items:center;gap:0.95rem;color:var(--clr-text-accent-cyan);transition:transform 250ms}.text-container.svelte-1v3kwtl a.view-project-button.svelte-1v3kwtl:hover{transform:scale(1.1, 1.1) translate(0.6rem, 0)}@keyframes svelte-1v3kwtl-heartbeat{0%{transform:scale(1, 1) translate(0, 0)}20%{transform:scale(1.1, 1.1) translate(0.6rem, 0)}40%{transform:scale(1, 1)}60%{transform:scale(1.1, 1.1) translate(0.6rem, 0)}100%{transform:scale(1, 1)}}.text-container.svelte-1v3kwtl a.view-project-button p.svelte-1v3kwtl{font-size:clamp(1.4rem, 1.31409rem + 0.2291vw, 1.6rem)}.text-container.svelte-1v3kwtl a.view-project-button:hover svg{transform:scale(1.1, 1.1) translate(0.5rem, -0.1rem) rotate(180deg)}",
  map: `{"version":3,"file":"PortfolioText.svelte","sources":["PortfolioText.svelte"],"sourcesContent":["<script>\\r\\n\\timport { capitaliseFirstLetter } from '$lib/scripts/helperFunctions';\\r\\n\\timport Icon from '$lib/Decorations/Icon.svelte';\\r\\n\\timport { getContext } from 'svelte';\\r\\n\\timport { slide } from 'svelte/transition';\\r\\n\\texport let project;\\r\\n\\tlet size = getContext('size');\\r\\n\\r\\n\\t$: name = project.name;\\r\\n\\t$: subtitle = project.subtitle;\\r\\n\\t$: description = project.description;\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"text-container\\">\\r\\n\\t<h3 class=\\"project-name\\">{capitaliseFirstLetter(name)}</h3>\\r\\n\\t<p class=\\"subtitle\\">{subtitle}</p>\\r\\n\\t{#if $size !== 'mobile'}\\r\\n\\t\\t<p class=\\"description\\" transition:slide>{description[0]}</p>\\r\\n\\t{/if}\\r\\n\\t<a href=\\"/\\" class=\\"view-project-button\\">\\r\\n\\t\\t<p>VIEW PROJECT</p>\\r\\n\\t\\t<Icon name=\\"arrow-right\\" width=\\"1.4rem\\" />\\r\\n\\t</a>\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">:global(.view-project-button svg path) {\\n  fill: var(--clr-text-accent-cyan); }\\n\\n:global(.view-project-button svg) {\\n  transform: translateY(-0.1rem); }\\n\\n.text-container {\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 1.4rem;\\n  font-family: var(--fira); }\\n  @media only screen and (min-width: 1248px) {\\n    .text-container {\\n      flex: 0 0 34rem; } }\\n  .text-container h3.project-name {\\n    color: var(--clr-text-focused);\\n    font-size: clamp(2.2rem, 1.85636rem + 0.91638vw, 3rem); }\\n  .text-container p.subtitle {\\n    color: var(--clr-text-faded);\\n    font-size: clamp(1.4rem, 1.31409rem + 0.2291vw, 1.6rem); }\\n  .text-container p.description {\\n    font-family: var(--roboto);\\n    color: var(--clr-text-focused);\\n    font-size: clamp(1.4rem, 1.31409rem + 0.2291vw, 1.6rem);\\n    line-height: clamp(1.5rem, 1.41409rem + 0.2291vw, 1.7rem);\\n    margin-bottom: 1.5rem; }\\n  .text-container a.view-project-button {\\n    display: flex;\\n    flex-flow: row nowrap;\\n    justify-content: start;\\n    align-items: center;\\n    gap: 0.95rem;\\n    color: var(--clr-text-accent-cyan);\\n    transition: transform 250ms; }\\n    .text-container a.view-project-button:hover {\\n      transform: scale(1.1, 1.1) translate(0.6rem, 0); }\\n\\n@keyframes heartbeat {\\n  0% {\\n    transform: scale(1, 1) translate(0, 0); }\\n  20% {\\n    transform: scale(1.1, 1.1) translate(0.6rem, 0); }\\n  40% {\\n    transform: scale(1, 1); }\\n  60% {\\n    transform: scale(1.1, 1.1) translate(0.6rem, 0); }\\n  100% {\\n    transform: scale(1, 1); } }\\n    .text-container a.view-project-button p {\\n      font-size: clamp(1.4rem, 1.31409rem + 0.2291vw, 1.6rem); }\\n  .text-container :global(a.view-project-button:hover svg) {\\n    transform: scale(1.1, 1.1) translate(0.5rem, -0.1rem) rotate(180deg); }\\n</style>\\r\\n"],"names":[],"mappings":"AAyB2B,6BAA6B,AAAE,CAAC,AACzD,IAAI,CAAE,IAAI,sBAAsB,CAAC,AAAE,CAAC,AAE9B,wBAAwB,AAAE,CAAC,AACjC,SAAS,CAAE,WAAW,OAAO,CAAC,AAAE,CAAC,AAEnC,eAAe,8BAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,MAAM,CACX,WAAW,CAAE,IAAI,MAAM,CAAC,AAAE,CAAC,AAC3B,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,eAAe,8BAAC,CAAC,AACf,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,AAAE,CAAC,AAAC,CAAC,AACxB,8BAAe,CAAC,EAAE,aAAa,eAAC,CAAC,AAC/B,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,IAAI,CAAC,AAAE,CAAC,AAC3D,8BAAe,CAAC,CAAC,SAAS,eAAC,CAAC,AAC1B,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,MAAM,CAAC,AAAE,CAAC,AAC5D,8BAAe,CAAC,CAAC,YAAY,eAAC,CAAC,AAC7B,WAAW,CAAE,IAAI,QAAQ,CAAC,CAC1B,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,MAAM,CAAC,CACvD,WAAW,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,MAAM,CAAC,CACzD,aAAa,CAAE,MAAM,AAAE,CAAC,AAC1B,8BAAe,CAAC,CAAC,oBAAoB,eAAC,CAAC,AACrC,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,OAAO,CACZ,KAAK,CAAE,IAAI,sBAAsB,CAAC,CAClC,UAAU,CAAE,SAAS,CAAC,KAAK,AAAE,CAAC,AAC9B,8BAAe,CAAC,CAAC,mCAAoB,MAAM,AAAC,CAAC,AAC3C,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,UAAU,MAAM,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AAExD,WAAW,wBAAU,CAAC,AACpB,EAAE,AAAC,CAAC,AACF,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AAC3C,GAAG,AAAC,CAAC,AACH,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,UAAU,MAAM,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AACpD,GAAG,AAAC,CAAC,AACH,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AAC3B,GAAG,AAAC,CAAC,AACH,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,UAAU,MAAM,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AACpD,IAAI,AAAC,CAAC,AACJ,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AAAC,CAAC,AAC3B,8BAAe,CAAC,CAAC,oBAAoB,CAAC,CAAC,eAAC,CAAC,AACvC,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,MAAM,CAAC,AAAE,CAAC,AAC9D,8BAAe,CAAC,AAAQ,+BAA+B,AAAE,CAAC,AACxD,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,UAAU,MAAM,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,MAAM,CAAC,AAAE,CAAC"}`
};
var PortfolioText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name;
  let subtitle;
  let description;
  let $size, $$unsubscribe_size;
  let { project } = $$props;
  let size = getContext("size");
  $$unsubscribe_size = subscribe(size, (value) => $size = value);
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  $$result.css.add(css$3);
  name = project.name;
  subtitle = project.subtitle;
  description = project.description;
  $$unsubscribe_size();
  return `<div class="${"text-container svelte-1v3kwtl"}"><h3 class="${"project-name svelte-1v3kwtl"}">${escape(capitaliseFirstLetter(name))}</h3>
	<p class="${"subtitle svelte-1v3kwtl"}">${escape(subtitle)}</p>
	${$size !== "mobile" ? `<p class="${"description svelte-1v3kwtl"}">${escape(description[0])}</p>` : ``}
	<a href="${"/"}" class="${"view-project-button svelte-1v3kwtl"}"><p class="${"svelte-1v3kwtl"}">VIEW PROJECT</p>
		${validate_component(Icon, "Icon").$$render($$result, { name: "arrow-right", width: "1.4rem" }, {}, {})}</a>
</div>`;
});
var css$2 = {
  code: ".video-container.svelte-10b1zxm{width:100%;border:0.2rem solid var(--clr-text-focused)}@media only screen and (min-width: 1248px){.video-container.svelte-10b1zxm{max-width:77.5rem}}iframe.svelte-10b1zxm{pointer-events:none}",
  map: '{"version":3,"file":"PortfolioVideo.svelte","sources":["PortfolioVideo.svelte"],"sourcesContent":["<script>\\r\\n\\texport let project;\\r\\n\\r\\n\\t$: vimeoEmbed = project.vimeoEmbed;\\r\\n\\t$: name = project.name;\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"video-container\\">\\r\\n    <div style=\\"padding:56.25% 0 0 0;position:relative;\\">\\r\\n        <iframe\\r\\n            src=\\"https://player.vimeo.com/video/{vimeoEmbed}&color=ffffff&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1&autopause=0&background=1\\"\\r\\n            style=\\"position:absolute;top:0;left:0;width:100%;height:100%;\\"\\r\\n            frameborder=\\"0\\"\\r\\n            allow=\\"autoplay\\"\\r\\n            title={name} />\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<style lang=\\"scss\\">.video-container {\\n  width: 100%;\\n  border: 0.2rem solid var(--clr-text-focused); }\\n  @media only screen and (min-width: 1248px) {\\n    .video-container {\\n      max-width: 77.5rem; } }\\n\\niframe {\\n  pointer-events: none; }\\n</style>\\r\\n\\r\\n<!-- 775, 443 -->"],"names":[],"mappings":"AAkBmB,gBAAgB,eAAC,CAAC,AACnC,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,MAAM,CAAC,KAAK,CAAC,IAAI,kBAAkB,CAAC,AAAE,CAAC,AAC/C,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,gBAAgB,eAAC,CAAC,AAChB,SAAS,CAAE,OAAO,AAAE,CAAC,AAAC,CAAC,AAE7B,MAAM,eAAC,CAAC,AACN,cAAc,CAAE,IAAI,AAAE,CAAC"}'
};
var PortfolioVideo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let vimeoEmbed;
  let name;
  let { project } = $$props;
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  $$result.css.add(css$2);
  vimeoEmbed = project.vimeoEmbed;
  name = project.name;
  return `<div class="${"video-container svelte-10b1zxm"}"><div style="${"padding:56.25% 0 0 0;position:relative;"}"><iframe src="${"https://player.vimeo.com/video/" + escape(vimeoEmbed) + "&color=ffffff&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1&autopause=0&background=1"}" style="${"position:absolute;top:0;left:0;width:100%;height:100%;"}" frameborder="${"0"}" allow="${"autoplay"}"${add_attribute("title", name, 0)} class="${"svelte-10b1zxm"}"></iframe></div></div>



`;
});
var css$1 = {
  code: ".flex-container.svelte-rw81wj{width:100%;display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:3rem;transition:padding 250ms}@media only screen and (min-width: 1248px){.flex-container.svelte-rw81wj{align-items:center;padding:0 4rem}}@media only screen and (min-width: 1440px){.flex-container.svelte-rw81wj{padding:0}}.projects.svelte-rw81wj{width:100%;display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:8rem}@media only screen and (min-width: 1248px){.projects.svelte-rw81wj{gap:10rem}}.project-container.svelte-rw81wj{display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;width:100%;gap:2.7rem;position:relative}@media only screen and (min-width: 1248px){.project-container.svelte-rw81wj{flex-flow:row nowrap;justify-content:space-between;align-items:center}}.project-container.svelte-rw81wj:nth-of-type(odd)::after{left:0}.project-container.svelte-rw81wj:nth-of-type(even)::after{right:0}.project-container.svelte-rw81wj::after{content:'';position:absolute;width:70vw;height:1px;background:var(--clr-line-bg);bottom:-4rem}@media only screen and (min-width: 1248px){.project-container.svelte-rw81wj::after{bottom:-5rem}}",
  map: `{"version":3,"file":"Portfolio.svelte","sources":["Portfolio.svelte"],"sourcesContent":["<script>\\r\\n\\timport { createEventDispatcher } from 'svelte';\\r\\n\\tconst dispatch = createEventDispatcher();\\r\\n\\r\\n\\timport Section from '$lib/Core/Section.svelte';\\r\\n\\timport Heading from '$lib/Decorations/Heading.svelte';\\r\\n\\timport PortfolioFilter from './PortfolioFilter.svelte';\\r\\n\\timport PortfolioText from './PortfolioText.svelte';\\r\\n\\timport PortfolioVideo from './PortfolioVideo.svelte';\\r\\n\\timport PortfolioData from '$lib/stores/portfolio.js';\\r\\n\\r\\n\\timport { quintOut } from 'svelte/easing';\\r\\n\\timport { crossfade } from 'svelte/transition';\\r\\n\\timport { flip } from 'svelte/animate';\\r\\n\\tconst [send, receive] = crossfade({\\r\\n\\t\\tduration: (d) => Math.sqrt(d * 200),\\r\\n\\r\\n\\t\\tfallback(node, params) {\\r\\n\\t\\t\\tconst style = getComputedStyle(node);\\r\\n\\t\\t\\tconst transform = style.transform === 'none' ? '' : style.transform;\\r\\n\\r\\n\\t\\t\\treturn {\\r\\n\\t\\t\\t\\tduration: 600,\\r\\n\\t\\t\\t\\teasing: quintOut,\\r\\n\\t\\t\\t\\tcss: (t) => \`\\r\\n\\t\\t\\t\\t\\ttransform: \${transform} scale(\${t});\\r\\n\\t\\t\\t\\t\\topacity: \${t}\\r\\n\\t\\t\\t\\t\`\\r\\n\\t\\t\\t};\\r\\n\\t\\t}\\r\\n\\t});\\r\\n\\r\\n\\tlet filter = 'featured';\\r\\n\\tconst updateFilter = (e) => {\\r\\n\\t\\tfilter = e.detail;\\r\\n\\t};\\r\\n\\r\\n\\tlet localPortfolio = [...$PortfolioData].filter(p => p.type.includes('featured'));\\r\\n\\r\\nconst dispatchRecalcLines = () => {\\r\\n\\tdispatch('recalculateLines')\\r\\n}\\r\\n\\r\\n\\tconst updateProjects = (e) => {\\r\\n\\t\\tlet data = e.detail;\\r\\n\\t\\tconst noFilter = data.length === 0;\\r\\n\\t\\tconst oneFilter = data.length === 1;\\r\\n\\t\\tconst multipleFilters = data.length >= 2;\\r\\n\\r\\n\\t\\tif (noFilter) {\\r\\n\\t\\t\\tlocalPortfolio = [...$PortfolioData];\\r\\n\\t\\t\\tdispatchRecalcLines()\\r\\n\\t\\t\\treturn;\\r\\n\\t\\t}\\r\\n\\t\\tif (oneFilter) {\\r\\n\\t\\t\\tlocalPortfolio = $PortfolioData.filter((p) => {\\r\\n\\t\\t\\t\\treturn p.type.includes(data[0]) && !p.type.includes('design');\\r\\n\\t\\t\\t});\\r\\n\\t\\t\\tdispatchRecalcLines()\\r\\n\\t\\t\\treturn;\\r\\n\\t\\t}\\r\\n\\t\\tif (multipleFilters) {\\r\\n\\t\\t\\tlet returnedData = $PortfolioData.filter((project) => {\\r\\n\\t\\t\\t\\tconst projectTags = project.type;\\r\\n\\t\\t\\t\\treturn data.every((filter) => projectTags.includes(filter));\\r\\n\\t\\t\\t});\\r\\n\\t\\t\\tlocalPortfolio = returnedData;\\r\\n\\t\\t\\tdispatchRecalcLines()\\r\\n\\t\\t\\treturn;\\r\\n\\t\\t}\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<Section sectionClass=\\"portfolio span-1220\\">\\r\\n\\t<div class=\\"flex-container\\">\\r\\n\\t\\t<Heading type=\\"2\\" content=\\"portfolio\\" />\\r\\n\\t\\t<PortfolioFilter\\r\\n\\t\\t\\ton:updateFilter={updateFilter}\\r\\n\\t\\t\\tinitialFilter={filter}\\r\\n\\t\\t\\ton:updateProjects={updateProjects} />\\r\\n\\t\\t<div class=\\"projects\\">\\r\\n\\t\\t\\t{#each localPortfolio as project, i (project.name)}\\r\\n\\t\\t\\t\\t<div\\r\\n\\t\\t\\t\\t\\tclass=\\"project-container\\"\\r\\n\\t\\t\\t\\t\\tin:receive={{ key: project.name }}\\r\\n\\t\\t\\t\\t\\tout:send={{ key: project.name }}\\r\\n\\t\\t\\t\\t\\tanimate:flip={{ duration: 200 }}>\\r\\n\\t\\t\\t\\t\\t<PortfolioText {project} />\\r\\n\\t\\t\\t\\t\\t<PortfolioVideo {project} />\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</Section>\\r\\n\\r\\n<style lang=\\"scss\\">.flex-container {\\n  width: 100%;\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 3rem;\\n  transition: padding 250ms; }\\n  @media only screen and (min-width: 1248px) {\\n    .flex-container {\\n      align-items: center;\\n      padding: 0 4rem; } }\\n  @media only screen and (min-width: 1440px) {\\n    .flex-container {\\n      padding: 0; } }\\n\\n.projects {\\n  width: 100%;\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 8rem; }\\n  @media only screen and (min-width: 1248px) {\\n    .projects {\\n      gap: 10rem; } }\\n\\n.project-container {\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  width: 100%;\\n  gap: 2.7rem;\\n  position: relative; }\\n  @media only screen and (min-width: 1248px) {\\n    .project-container {\\n      flex-flow: row nowrap;\\n      justify-content: space-between;\\n      align-items: center; } }\\n  .project-container:nth-of-type(odd)::after {\\n    left: 0; }\\n  .project-container:nth-of-type(even)::after {\\n    right: 0; }\\n  .project-container::after {\\n    content: '';\\n    position: absolute;\\n    width: 70vw;\\n    height: 1px;\\n    background: var(--clr-line-bg);\\n    bottom: -4rem; }\\n  @media only screen and (min-width: 1248px) {\\n    .project-container::after {\\n      bottom: -5rem; } }\\n</style>\\r\\n"],"names":[],"mappings":"AA+FmB,eAAe,cAAC,CAAC,AAClC,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,OAAO,CAAC,KAAK,AAAE,CAAC,AAC5B,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,eAAe,cAAC,CAAC,AACf,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,CAAC,CAAC,IAAI,AAAE,CAAC,AAAC,CAAC,AACxB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,eAAe,cAAC,CAAC,AACf,OAAO,CAAE,CAAC,AAAE,CAAC,AAAC,CAAC,AAErB,SAAS,cAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,IAAI,AAAE,CAAC,AACZ,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,SAAS,cAAC,CAAC,AACT,GAAG,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAErB,kBAAkB,cAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,MAAM,CACX,QAAQ,CAAE,QAAQ,AAAE,CAAC,AACrB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,kBAAkB,cAAC,CAAC,AAClB,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC,AAC5B,gCAAkB,aAAa,GAAG,CAAC,OAAO,AAAC,CAAC,AAC1C,IAAI,CAAE,CAAC,AAAE,CAAC,AACZ,gCAAkB,aAAa,IAAI,CAAC,OAAO,AAAC,CAAC,AAC3C,KAAK,CAAE,CAAC,AAAE,CAAC,AACb,gCAAkB,OAAO,AAAC,CAAC,AACzB,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,IAAI,aAAa,CAAC,CAC9B,MAAM,CAAE,KAAK,AAAE,CAAC,AAClB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,gCAAkB,OAAO,AAAC,CAAC,AACzB,MAAM,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC"}`
};
var Portfolio$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $PortfolioData, $$unsubscribe_PortfolioData;
  $$unsubscribe_PortfolioData = subscribe(portfolio$1, (value) => $PortfolioData = value);
  createEventDispatcher();
  crossfade({
    duration: (d) => Math.sqrt(d * 200),
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });
  let filter = "featured";
  let localPortfolio = [...$PortfolioData].filter((p) => p.type.includes("featured"));
  $$result.css.add(css$1);
  $$unsubscribe_PortfolioData();
  return `${validate_component(Section, "Section").$$render($$result, { sectionClass: "portfolio span-1220" }, {}, {
    default: () => `<div class="${"flex-container svelte-rw81wj"}">${validate_component(Heading, "Heading").$$render($$result, { type: "2", content: "portfolio" }, {}, {})}
		${validate_component(PortfolioFilter, "PortfolioFilter").$$render($$result, { initialFilter: filter }, {}, {})}
		<div class="${"projects svelte-rw81wj"}">${each(localPortfolio, (project, i) => `<div class="${"project-container svelte-rw81wj"}">${validate_component(PortfolioText, "PortfolioText").$$render($$result, { project }, {}, {})}
					${validate_component(PortfolioVideo, "PortfolioVideo").$$render($$result, { project }, {}, {})}
				</div>`)}</div></div>`
  })}`;
});
var css = {
  code: ".flex-container.svelte-e04i5c.svelte-e04i5c{display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:2rem;width:100%}@media only screen and (min-width: 1248px){.flex-container.svelte-e04i5c.svelte-e04i5c{align-items:center}}.flex-container.svelte-e04i5c p.svelte-e04i5c{font-family:var(--fira);color:var(--clr-text-focused);font-size:clamp(1.4rem, 1.29261rem + 0.28637vw, 1.65rem);margin-bottom:4rem;max-width:35rem}@media only screen and (min-width: 1248px){.flex-container.svelte-e04i5c p.svelte-e04i5c{text-align:center}}.flex-container.svelte-e04i5c .form-container.svelte-e04i5c{display:grid;width:100%;grid-template-columns:2.4rem 1fr 2.4rem;grid-template-rows:15rem 6.8rem max-content 1.5rem 11rem}@media only screen and (min-width: 768px){.flex-container.svelte-e04i5c .form-container.svelte-e04i5c{grid-template-columns:minmax(14.5rem, 26rem) minmax(38rem, 45rem) minmax(14.5rem, 26rem);grid-template-rows:3rem max-content 12rem 3rem max-content}}.flex-container.svelte-e04i5c .form-container form.svelte-e04i5c{background:var(--clr-form-bg);width:100%;height:max-content;padding-top:clamp(4rem, 3.35567rem + 1.71821vw, 5.5rem);padding-bottom:clamp(4rem, 3.35567rem + 1.71821vw, 5.5rem);padding-left:clamp(2rem, 0.92612rem + 2.86369vw, 4.5rem);padding-right:clamp(2rem, 0.92612rem + 2.86369vw, 4.5rem);display:flex;flex-flow:column nowrap;justify-content:start;align-items:start;gap:2rem;max-width:45rem;justify-self:center;-webkit-box-shadow:-1px 0px 15px -3px rgba(0, 0, 0, 0.55), -1px 0px 15px -3px rgba(0, 0, 0, 0.55);box-shadow:-1px 0px 15px -3px rgba(0, 0, 0, 0.55);grid-column:2/3;grid-row:2/5}.flex-container.svelte-e04i5c .form-container form input.svelte-e04i5c,.flex-container.svelte-e04i5c .form-container form textarea.svelte-e04i5c{width:100%;background:var(--clr-form-input-bg);outline:none;border:none;font-family:var(--roboto);color:var(--clr-text-focused);padding:1rem 1rem;font-size:clamp(1.45rem, 1.38557rem + 0.17182vw, 1.6rem);transition:transform 250ms}.flex-container.svelte-e04i5c .form-container form input.svelte-e04i5c:focus-within,.flex-container.svelte-e04i5c .form-container form input.svelte-e04i5c:focus,.flex-container.svelte-e04i5c .form-container form textarea.svelte-e04i5c:focus-within,.flex-container.svelte-e04i5c .form-container form textarea.svelte-e04i5c:focus{box-shadow:none;transform:scale(1.05)}.flex-container.svelte-e04i5c .form-container form input.svelte-e04i5c:-webkit-autofill,.flex-container.svelte-e04i5c .form-container form input.svelte-e04i5c:-webkit-autofill:focus,.flex-container.svelte-e04i5c .form-container form input:-webkit-autofill:hover input.svelte-e04i5c:-webkit-autofill{border:none;-webkit-text-fill-color:var(--clr-text-focused);-webkit-box-shadow:0 0 0 1000px var(--clr-form-input-bg) inset}.flex-container.svelte-e04i5c .form-container form textarea.svelte-e04i5c{resize:none}.flex-container.svelte-e04i5c .form-container img.svelte-e04i5c{width:60vw}.flex-container.svelte-e04i5c .form-container img.img__rafal.svelte-e04i5c{grid-column:1 / 3;grid-row:1 / 3;max-width:30rem}@media only screen and (min-width: 768px){.flex-container.svelte-e04i5c .form-container img.img__rafal.svelte-e04i5c{grid-column:1 / 2;grid-row:1 / 5}}.flex-container.svelte-e04i5c .form-container img.img__bottle.svelte-e04i5c{grid-column:1 / 3;grid-row:4 / 6;max-width:33rem}@media only screen and (min-width: 768px){.flex-container.svelte-e04i5c .form-container img.img__bottle.svelte-e04i5c{grid-column:2 / 4;grid-row:3 / 6;justify-self:end}}",
  map: `{"version":3,"file":"ContactForm.svelte","sources":["ContactForm.svelte"],"sourcesContent":["<script>\\r\\n\\timport Section from '$lib/Core/Section.svelte';\\r\\n\\timport Heading from '$lib/Decorations/Heading.svelte';\\r\\n\\timport Button from '$lib/Button.svelte';\\r\\n\\r\\n\\tconst submitForm = (e) => {\\r\\n\\t\\te.preventDefault();\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<Section sectionClass=\\"contact-form span-900\\">\\r\\n\\t<div class=\\"flex-container\\">\\r\\n\\t\\t<Heading type=\\"2\\" content=\\"SAY HELLO!\\" />\\r\\n\\t\\t<p>\\r\\n\\t\\t\\tWhether you want to hire me or discuss a project, contact me below. I'll be happy to hear from\\r\\n\\t\\t\\tyou \u{1F601}.\\r\\n\\t\\t</p>\\r\\n\\t\\t<div class=\\"form-container\\">\\r\\n\\t\\t\\t<img\\r\\n\\t\\t\\t\\tclass=\\"img__rafal\\"\\r\\n\\t\\t\\t\\tsrc=\\"/images/shared/rafal-smiling-arthurs-peak.png\\"\\r\\n\\t\\t\\t\\talt=\\"Rafal, the website owner, smiling whilst standing on arthurs peak in scotland\\" />\\r\\n\\t\\t\\t<img\\r\\n\\t\\t\\t\\tclass=\\"img__bottle\\"\\r\\n\\t\\t\\t\\tsrc=\\"/images/shared/message-in-bottle.png\\"\\r\\n\\t\\t\\t\\talt=\\"Rafal, the website owner, smiling whilst standing on arthurs peak in scotland\\" />\\r\\n\\t\\t\\t<form name=\\"contact\\" method=\\"POST\\" netlify netlify-honeypot=\\"bot-field\\">\\r\\n\\t\\t\\t\\t<input type=\\"text\\" name=\\"name\\" placeholder=\\"Name\\" />\\r\\n\\t\\t\\t\\t<input type=\\"email\\" name=\\"email\\" placeholder=\\"Email\\" />\\r\\n\\t\\t\\t\\t<textarea name=\\"message\\" id=\\"message\\" cols=\\"30\\" rows=\\"3\\" placeholder=\\"Message\\" />\\r\\n\\t\\t\\t\\t<Button type=\\"submit\\" on:click={submitForm} btnClass=\\"primary\\" content=\\"SEND \u{1F680}\\" />\\r\\n\\t\\t\\t</form>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</Section>\\r\\n\\r\\n<style lang=\\"scss\\">.flex-container {\\n  display: flex;\\n  flex-flow: column nowrap;\\n  justify-content: start;\\n  align-items: start;\\n  gap: 2rem;\\n  width: 100%; }\\n  @media only screen and (min-width: 1248px) {\\n    .flex-container {\\n      align-items: center; } }\\n  .flex-container p {\\n    font-family: var(--fira);\\n    color: var(--clr-text-focused);\\n    font-size: clamp(1.4rem, 1.29261rem + 0.28637vw, 1.65rem);\\n    margin-bottom: 4rem;\\n    max-width: 35rem; }\\n    @media only screen and (min-width: 1248px) {\\n      .flex-container p {\\n        text-align: center; } }\\n  .flex-container .form-container {\\n    display: grid;\\n    width: 100%;\\n    grid-template-columns: 2.4rem 1fr 2.4rem;\\n    grid-template-rows: 15rem 6.8rem max-content 1.5rem 11rem; }\\n    @media only screen and (min-width: 768px) {\\n      .flex-container .form-container {\\n        grid-template-columns: minmax(14.5rem, 26rem) minmax(38rem, 45rem) minmax(14.5rem, 26rem);\\n        grid-template-rows: 3rem max-content 12rem 3rem max-content; } }\\n    .flex-container .form-container form {\\n      background: var(--clr-form-bg);\\n      width: 100%;\\n      height: max-content;\\n      padding-top: clamp(4rem, 3.35567rem + 1.71821vw, 5.5rem);\\n      padding-bottom: clamp(4rem, 3.35567rem + 1.71821vw, 5.5rem);\\n      padding-left: clamp(2rem, 0.92612rem + 2.86369vw, 4.5rem);\\n      padding-right: clamp(2rem, 0.92612rem + 2.86369vw, 4.5rem);\\n      display: flex;\\n      flex-flow: column nowrap;\\n      justify-content: start;\\n      align-items: start;\\n      gap: 2rem;\\n      max-width: 45rem;\\n      justify-self: center;\\n      -webkit-box-shadow: -1px 0px 15px -3px rgba(0, 0, 0, 0.55), -1px 0px 15px -3px rgba(0, 0, 0, 0.55);\\n      box-shadow: -1px 0px 15px -3px rgba(0, 0, 0, 0.55);\\n      grid-column: 2/3;\\n      grid-row: 2/5; }\\n      .flex-container .form-container form input,\\n      .flex-container .form-container form textarea {\\n        width: 100%;\\n        background: var(--clr-form-input-bg);\\n        outline: none;\\n        border: none;\\n        font-family: var(--roboto);\\n        color: var(--clr-text-focused);\\n        padding: 1rem 1rem;\\n        font-size: clamp(1.45rem, 1.38557rem + 0.17182vw, 1.6rem);\\n        transition: transform 250ms; }\\n        .flex-container .form-container form input:focus-within, .flex-container .form-container form input:focus,\\n        .flex-container .form-container form textarea:focus-within,\\n        .flex-container .form-container form textarea:focus {\\n          box-shadow: none;\\n          transform: scale(1.05); }\\n      .flex-container .form-container form input:-webkit-autofill,\\n      .flex-container .form-container form input:-webkit-autofill:focus,\\n      .flex-container .form-container form input:-webkit-autofill:hover input:-webkit-autofill {\\n        border: none;\\n        -webkit-text-fill-color: var(--clr-text-focused);\\n        -webkit-box-shadow: 0 0 0 1000px var(--clr-form-input-bg) inset; }\\n      .flex-container .form-container form textarea {\\n        resize: none; }\\n    .flex-container .form-container img {\\n      width: 60vw; }\\n      .flex-container .form-container img.img__rafal {\\n        grid-column: 1 / 3;\\n        grid-row: 1 / 3;\\n        max-width: 30rem; }\\n        @media only screen and (min-width: 768px) {\\n          .flex-container .form-container img.img__rafal {\\n            grid-column: 1 / 2;\\n            grid-row: 1 / 5; } }\\n      .flex-container .form-container img.img__bottle {\\n        grid-column: 1 / 3;\\n        grid-row: 4 / 6;\\n        max-width: 33rem; }\\n        @media only screen and (min-width: 768px) {\\n          .flex-container .form-container img.img__bottle {\\n            grid-column: 2 / 4;\\n            grid-row: 3 / 6;\\n            justify-self: end; } }\\n</style>\\r\\n"],"names":[],"mappings":"AAoCmB,eAAe,4BAAC,CAAC,AAClC,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,AAAE,CAAC,AACd,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,eAAe,4BAAC,CAAC,AACf,WAAW,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC,AAC5B,6BAAe,CAAC,CAAC,cAAC,CAAC,AACjB,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,OAAO,CAAC,CACzD,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,KAAK,AAAE,CAAC,AACnB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,6BAAe,CAAC,CAAC,cAAC,CAAC,AACjB,UAAU,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC,AAC7B,6BAAe,CAAC,eAAe,cAAC,CAAC,AAC/B,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,qBAAqB,CAAE,MAAM,CAAC,GAAG,CAAC,MAAM,CACxC,kBAAkB,CAAE,KAAK,CAAC,MAAM,CAAC,WAAW,CAAC,MAAM,CAAC,KAAK,AAAE,CAAC,AAC5D,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,6BAAe,CAAC,eAAe,cAAC,CAAC,AAC/B,qBAAqB,CAAE,OAAO,OAAO,CAAC,CAAC,KAAK,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,OAAO,OAAO,CAAC,CAAC,KAAK,CAAC,CACzF,kBAAkB,CAAE,IAAI,CAAC,WAAW,CAAC,KAAK,CAAC,IAAI,CAAC,WAAW,AAAE,CAAC,AAAC,CAAC,AACpE,6BAAe,CAAC,eAAe,CAAC,IAAI,cAAC,CAAC,AACpC,UAAU,CAAE,IAAI,aAAa,CAAC,CAC9B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,WAAW,CACnB,WAAW,CAAE,MAAM,IAAI,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CACxD,cAAc,CAAE,MAAM,IAAI,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CAC3D,YAAY,CAAE,MAAM,IAAI,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CACzD,aAAa,CAAE,MAAM,IAAI,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CAC1D,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,eAAe,CAAE,KAAK,CACtB,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,KAAK,CAChB,YAAY,CAAE,MAAM,CACpB,kBAAkB,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAClG,UAAU,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAClD,WAAW,CAAE,CAAC,CAAC,CAAC,CAChB,QAAQ,CAAE,CAAC,CAAC,CAAC,AAAE,CAAC,AAChB,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,mBAAK,CAC1C,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,QAAQ,cAAC,CAAC,AAC7C,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,QAAQ,CAAC,CAC1B,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,SAAS,CAAE,MAAM,OAAO,CAAC,CAAC,UAAU,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,MAAM,CAAC,CACzD,UAAU,CAAE,SAAS,CAAC,KAAK,AAAE,CAAC,AAC9B,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,mBAAK,aAAa,CAAE,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,mBAAK,MAAM,CACzG,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,sBAAQ,aAAa,CAC1D,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,sBAAQ,MAAM,AAAC,CAAC,AACnD,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,MAAM,IAAI,CAAC,AAAE,CAAC,AAC7B,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,mBAAK,iBAAiB,CAC3D,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,mBAAK,iBAAiB,MAAM,CACjE,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,KAAK,iBAAiB,MAAM,CAAC,mBAAK,iBAAiB,AAAC,CAAC,AACxF,MAAM,CAAE,IAAI,CACZ,uBAAuB,CAAE,IAAI,kBAAkB,CAAC,CAChD,kBAAkB,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,IAAI,mBAAmB,CAAC,CAAC,KAAK,AAAE,CAAC,AACpE,6BAAe,CAAC,eAAe,CAAC,IAAI,CAAC,QAAQ,cAAC,CAAC,AAC7C,MAAM,CAAE,IAAI,AAAE,CAAC,AACnB,6BAAe,CAAC,eAAe,CAAC,GAAG,cAAC,CAAC,AACnC,KAAK,CAAE,IAAI,AAAE,CAAC,AACd,6BAAe,CAAC,eAAe,CAAC,GAAG,WAAW,cAAC,CAAC,AAC9C,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,SAAS,CAAE,KAAK,AAAE,CAAC,AACnB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,6BAAe,CAAC,eAAe,CAAC,GAAG,WAAW,cAAC,CAAC,AAC9C,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AAAC,CAAC,AAC1B,6BAAe,CAAC,eAAe,CAAC,GAAG,YAAY,cAAC,CAAC,AAC/C,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,SAAS,CAAE,KAAK,AAAE,CAAC,AACnB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,6BAAe,CAAC,eAAe,CAAC,GAAG,YAAY,cAAC,CAAC,AAC/C,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,YAAY,CAAE,GAAG,AAAE,CAAC,AAAC,CAAC"}`
};
var ContactForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Section, "Section").$$render($$result, { sectionClass: "contact-form span-900" }, {}, {
    default: () => `<div class="${"flex-container svelte-e04i5c"}">${validate_component(Heading, "Heading").$$render($$result, { type: "2", content: "SAY HELLO!" }, {}, {})}
		<p class="${"svelte-e04i5c"}">Whether you want to hire me or discuss a project, contact me below. I&#39;ll be happy to hear from
			you \u{1F601}.
		</p>
		<div class="${"form-container svelte-e04i5c"}"><img class="${"img__rafal svelte-e04i5c"}" src="${"/images/shared/rafal-smiling-arthurs-peak.png"}" alt="${"Rafal, the website owner, smiling whilst standing on arthurs peak in scotland"}">
			<img class="${"img__bottle svelte-e04i5c"}" src="${"/images/shared/message-in-bottle.png"}" alt="${"Rafal, the website owner, smiling whilst standing on arthurs peak in scotland"}">
			<form name="${"contact"}" method="${"POST"}" netlify netlify-honeypot="${"bot-field"}" class="${"svelte-e04i5c"}"><input type="${"text"}" name="${"name"}" placeholder="${"Name"}" class="${"svelte-e04i5c"}">
				<input type="${"email"}" name="${"email"}" placeholder="${"Email"}" class="${"svelte-e04i5c"}">
				<textarea name="${"message"}" id="${"message"}" cols="${"30"}" rows="${"3"}" placeholder="${"Message"}" class="${"svelte-e04i5c"}"></textarea>
				${validate_component(Button, "Button").$$render($$result, {
      type: "submit",
      btnClass: "primary",
      content: "SEND \u{1F680}"
    }, {}, {})}</form></div></div>`
  })}`;
});
var prerender = true;
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let recalculate;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Main, "Main").$$render($$result, {}, {}, {
      default: () => `${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
	${validate_component(Philosophy, "Philosophy").$$render($$result, {}, {}, {})}
	${validate_component(Technologies, "Technologies").$$render($$result, {}, {}, {})}
	${validate_component(Portfolio$1, "Portfolio").$$render($$result, {}, {}, {})}
	${validate_component(ContactForm, "ContactForm").$$render($$result, {}, {}, {})}`
    })}

${validate_component(Lines, "Lines").$$render($$result, { this: recalculate }, {
      this: ($$value) => {
        recalculate = $$value;
        $$settled = false;
      }
    }, {})}`;
  } while (!$$settled);
  return $$rendered;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  prerender
});
var Portfolio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
var portfolio = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Portfolio
});
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Main, "Main").$$render($$result, {}, {}, {
    default: () => `${validate_component(Heading, "Heading").$$render($$result, { type: "1", content: "about" }, {}, {})}`
  })}`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About
});

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const encoding = isBase64Encoded ? "base64" : headers["content-encoding"] || "utf-8";
  const rawBody = typeof body === "string" ? Buffer.from(body, encoding) : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      ...splitHeaders(rendered.headers),
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
function splitHeaders(headers) {
  const h = {};
  const m = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m : h;
    target[key] = value;
  }
  return {
    headers: h,
    multiValueHeaders: m
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
