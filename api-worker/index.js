var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    __name(PerformanceEntry, "PerformanceEntry");
    PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    }, "PerformanceMark");
    PerformanceMeasure = class extends PerformanceEntry {
      entryType = "measure";
    };
    __name(PerformanceMeasure, "PerformanceMeasure");
    PerformanceResourceTiming = class extends PerformanceEntry {
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    __name(PerformanceResourceTiming, "PerformanceResourceTiming");
    PerformanceObserverEntryList = class {
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    __name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
    Performance = class {
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    __name(Performance, "Performance");
    PerformanceObserver = class {
      __unenv__ = true;
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    __name(PerformanceObserver, "PerformanceObserver");
    __publicField(PerformanceObserver, "supportedEntryTypes", []);
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream;
var init_read_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class extends Socket {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      isRaw = false;
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
      isTTY = false;
    };
    __name(ReadStream, "ReadStream");
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream;
var init_write_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class extends Socket2 {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      columns = 80;
      rows = 24;
      isTTY = false;
    };
    __name(WriteStream, "WriteStream");
  }
});

// node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    Process = class extends EventEmitter {
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return "";
      }
      get versions() {
        return {};
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: () => 0 });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    __name(Process, "Process");
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, exit, platform, nextTick, unenvProcess, abort, addListener, allowedNodeEnvironmentFlags, hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback, loadEnvFile, sourceMapsEnabled, arch, argv, argv0, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, dlopen, disconnect, emit, emitWarning, env, eventNames, execArgv, execPath, finalization, features, getActiveResourcesInfo, getMaxListeners, hrtime3, kill, listeners, listenerCount, memoryUsage, on, off, once, pid, ppid, prependListener, prependOnceListener, rawListeners, release, removeAllListeners, removeListener, report, resourceUsage, setMaxListeners, setSourceMapsEnabled, stderr, stdin, stdout, title, throwDeprecation, traceDeprecation, umask, uptime, version, versions, domain, initgroups, moduleLoadList, reallyExit, openStdin, assert2, binding, send, exitCode, channel, getegid, geteuid, getgid, getgroups, getuid, setegid, seteuid, setgid, setgroups, setuid, permission, mainModule, _events, _eventsCount, _exiting, _maxListeners, _debugEnd, _debugProcess, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, _disconnect, _handleQueue, _pendingMessage, _channel, _send, _linkedBinding, _process, process_default;
var init_process2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    ({ exit, platform, nextTick } = getBuiltinModule(
      "node:process"
    ));
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      nextTick
    });
    ({
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      finalization,
      features,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      on,
      off,
      once,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs
var subtle;
var init_web = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    subtle = globalThis.crypto?.subtle;
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs
var webcrypto, createCipher, createDecipher, pseudoRandomBytes, createCipheriv, createDecipheriv, createECDH, createSign, createVerify, diffieHellman, getCipherInfo, privateDecrypt, privateEncrypt, publicDecrypt, publicEncrypt, sign, verify, hash, Cipher, Cipheriv, Decipher, Decipheriv, ECDH, Sign, Verify;
var init_node = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    webcrypto = new Proxy(globalThis.crypto, { get(_, key) {
      if (key === "CryptoKey") {
        return globalThis.CryptoKey;
      }
      if (typeof globalThis.crypto[key] === "function") {
        return globalThis.crypto[key].bind(globalThis.crypto);
      }
      return globalThis.crypto[key];
    } });
    createCipher = /* @__PURE__ */ notImplemented("crypto.createCipher");
    createDecipher = /* @__PURE__ */ notImplemented("crypto.createDecipher");
    pseudoRandomBytes = /* @__PURE__ */ notImplemented("crypto.pseudoRandomBytes");
    createCipheriv = /* @__PURE__ */ notImplemented("crypto.createCipheriv");
    createDecipheriv = /* @__PURE__ */ notImplemented("crypto.createDecipheriv");
    createECDH = /* @__PURE__ */ notImplemented("crypto.createECDH");
    createSign = /* @__PURE__ */ notImplemented("crypto.createSign");
    createVerify = /* @__PURE__ */ notImplemented("crypto.createVerify");
    diffieHellman = /* @__PURE__ */ notImplemented("crypto.diffieHellman");
    getCipherInfo = /* @__PURE__ */ notImplemented("crypto.getCipherInfo");
    privateDecrypt = /* @__PURE__ */ notImplemented("crypto.privateDecrypt");
    privateEncrypt = /* @__PURE__ */ notImplemented("crypto.privateEncrypt");
    publicDecrypt = /* @__PURE__ */ notImplemented("crypto.publicDecrypt");
    publicEncrypt = /* @__PURE__ */ notImplemented("crypto.publicEncrypt");
    sign = /* @__PURE__ */ notImplemented("crypto.sign");
    verify = /* @__PURE__ */ notImplemented("crypto.verify");
    hash = /* @__PURE__ */ notImplemented("crypto.hash");
    Cipher = /* @__PURE__ */ notImplementedClass("crypto.Cipher");
    Cipheriv = /* @__PURE__ */ notImplementedClass(
      "crypto.Cipheriv"
      // @ts-expect-error not typed yet
    );
    Decipher = /* @__PURE__ */ notImplementedClass("crypto.Decipher");
    Decipheriv = /* @__PURE__ */ notImplementedClass(
      "crypto.Decipheriv"
      // @ts-expect-error not typed yet
    );
    ECDH = /* @__PURE__ */ notImplementedClass("crypto.ECDH");
    Sign = /* @__PURE__ */ notImplementedClass("crypto.Sign");
    Verify = /* @__PURE__ */ notImplementedClass("crypto.Verify");
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/constants.mjs
var SSL_OP_ALL, SSL_OP_ALLOW_NO_DHE_KEX, SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION, SSL_OP_CIPHER_SERVER_PREFERENCE, SSL_OP_CISCO_ANYCONNECT, SSL_OP_COOKIE_EXCHANGE, SSL_OP_CRYPTOPRO_TLSEXT_BUG, SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS, SSL_OP_LEGACY_SERVER_CONNECT, SSL_OP_NO_COMPRESSION, SSL_OP_NO_ENCRYPT_THEN_MAC, SSL_OP_NO_QUERY_MTU, SSL_OP_NO_RENEGOTIATION, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION, SSL_OP_NO_SSLv2, SSL_OP_NO_SSLv3, SSL_OP_NO_TICKET, SSL_OP_NO_TLSv1, SSL_OP_NO_TLSv1_1, SSL_OP_NO_TLSv1_2, SSL_OP_NO_TLSv1_3, SSL_OP_PRIORITIZE_CHACHA, SSL_OP_TLS_ROLLBACK_BUG, ENGINE_METHOD_RSA, ENGINE_METHOD_DSA, ENGINE_METHOD_DH, ENGINE_METHOD_RAND, ENGINE_METHOD_EC, ENGINE_METHOD_CIPHERS, ENGINE_METHOD_DIGESTS, ENGINE_METHOD_PKEY_METHS, ENGINE_METHOD_PKEY_ASN1_METHS, ENGINE_METHOD_ALL, ENGINE_METHOD_NONE, DH_CHECK_P_NOT_SAFE_PRIME, DH_CHECK_P_NOT_PRIME, DH_UNABLE_TO_CHECK_GENERATOR, DH_NOT_SUITABLE_GENERATOR, RSA_PKCS1_PADDING, RSA_NO_PADDING, RSA_PKCS1_OAEP_PADDING, RSA_X931_PADDING, RSA_PKCS1_PSS_PADDING, RSA_PSS_SALTLEN_DIGEST, RSA_PSS_SALTLEN_MAX_SIGN, RSA_PSS_SALTLEN_AUTO, POINT_CONVERSION_COMPRESSED, POINT_CONVERSION_UNCOMPRESSED, POINT_CONVERSION_HYBRID, defaultCoreCipherList, defaultCipherList, OPENSSL_VERSION_NUMBER, TLS1_VERSION, TLS1_1_VERSION, TLS1_2_VERSION, TLS1_3_VERSION;
var init_constants = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    SSL_OP_ALL = 2147485776;
    SSL_OP_ALLOW_NO_DHE_KEX = 1024;
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION = 262144;
    SSL_OP_CIPHER_SERVER_PREFERENCE = 4194304;
    SSL_OP_CISCO_ANYCONNECT = 32768;
    SSL_OP_COOKIE_EXCHANGE = 8192;
    SSL_OP_CRYPTOPRO_TLSEXT_BUG = 2147483648;
    SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS = 2048;
    SSL_OP_LEGACY_SERVER_CONNECT = 4;
    SSL_OP_NO_COMPRESSION = 131072;
    SSL_OP_NO_ENCRYPT_THEN_MAC = 524288;
    SSL_OP_NO_QUERY_MTU = 4096;
    SSL_OP_NO_RENEGOTIATION = 1073741824;
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION = 65536;
    SSL_OP_NO_SSLv2 = 0;
    SSL_OP_NO_SSLv3 = 33554432;
    SSL_OP_NO_TICKET = 16384;
    SSL_OP_NO_TLSv1 = 67108864;
    SSL_OP_NO_TLSv1_1 = 268435456;
    SSL_OP_NO_TLSv1_2 = 134217728;
    SSL_OP_NO_TLSv1_3 = 536870912;
    SSL_OP_PRIORITIZE_CHACHA = 2097152;
    SSL_OP_TLS_ROLLBACK_BUG = 8388608;
    ENGINE_METHOD_RSA = 1;
    ENGINE_METHOD_DSA = 2;
    ENGINE_METHOD_DH = 4;
    ENGINE_METHOD_RAND = 8;
    ENGINE_METHOD_EC = 2048;
    ENGINE_METHOD_CIPHERS = 64;
    ENGINE_METHOD_DIGESTS = 128;
    ENGINE_METHOD_PKEY_METHS = 512;
    ENGINE_METHOD_PKEY_ASN1_METHS = 1024;
    ENGINE_METHOD_ALL = 65535;
    ENGINE_METHOD_NONE = 0;
    DH_CHECK_P_NOT_SAFE_PRIME = 2;
    DH_CHECK_P_NOT_PRIME = 1;
    DH_UNABLE_TO_CHECK_GENERATOR = 4;
    DH_NOT_SUITABLE_GENERATOR = 8;
    RSA_PKCS1_PADDING = 1;
    RSA_NO_PADDING = 3;
    RSA_PKCS1_OAEP_PADDING = 4;
    RSA_X931_PADDING = 5;
    RSA_PKCS1_PSS_PADDING = 6;
    RSA_PSS_SALTLEN_DIGEST = -1;
    RSA_PSS_SALTLEN_MAX_SIGN = -2;
    RSA_PSS_SALTLEN_AUTO = -2;
    POINT_CONVERSION_COMPRESSED = 2;
    POINT_CONVERSION_UNCOMPRESSED = 4;
    POINT_CONVERSION_HYBRID = 6;
    defaultCoreCipherList = "";
    defaultCipherList = "";
    OPENSSL_VERSION_NUMBER = 0;
    TLS1_VERSION = 0;
    TLS1_1_VERSION = 0;
    TLS1_2_VERSION = 0;
    TLS1_3_VERSION = 0;
  }
});

// node_modules/unenv/dist/runtime/node/crypto.mjs
var constants;
var init_crypto = __esm({
  "node_modules/unenv/dist/runtime/node/crypto.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants();
    init_web();
    init_node();
    constants = {
      OPENSSL_VERSION_NUMBER,
      SSL_OP_ALL,
      SSL_OP_ALLOW_NO_DHE_KEX,
      SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
      SSL_OP_CIPHER_SERVER_PREFERENCE,
      SSL_OP_CISCO_ANYCONNECT,
      SSL_OP_COOKIE_EXCHANGE,
      SSL_OP_CRYPTOPRO_TLSEXT_BUG,
      SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS,
      SSL_OP_LEGACY_SERVER_CONNECT,
      SSL_OP_NO_COMPRESSION,
      SSL_OP_NO_ENCRYPT_THEN_MAC,
      SSL_OP_NO_QUERY_MTU,
      SSL_OP_NO_RENEGOTIATION,
      SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION,
      SSL_OP_NO_SSLv2,
      SSL_OP_NO_SSLv3,
      SSL_OP_NO_TICKET,
      SSL_OP_NO_TLSv1,
      SSL_OP_NO_TLSv1_1,
      SSL_OP_NO_TLSv1_2,
      SSL_OP_NO_TLSv1_3,
      SSL_OP_PRIORITIZE_CHACHA,
      SSL_OP_TLS_ROLLBACK_BUG,
      ENGINE_METHOD_RSA,
      ENGINE_METHOD_DSA,
      ENGINE_METHOD_DH,
      ENGINE_METHOD_RAND,
      ENGINE_METHOD_EC,
      ENGINE_METHOD_CIPHERS,
      ENGINE_METHOD_DIGESTS,
      ENGINE_METHOD_PKEY_METHS,
      ENGINE_METHOD_PKEY_ASN1_METHS,
      ENGINE_METHOD_ALL,
      ENGINE_METHOD_NONE,
      DH_CHECK_P_NOT_SAFE_PRIME,
      DH_CHECK_P_NOT_PRIME,
      DH_UNABLE_TO_CHECK_GENERATOR,
      DH_NOT_SUITABLE_GENERATOR,
      RSA_PKCS1_PADDING,
      RSA_NO_PADDING,
      RSA_PKCS1_OAEP_PADDING,
      RSA_X931_PADDING,
      RSA_PKCS1_PSS_PADDING,
      RSA_PSS_SALTLEN_DIGEST,
      RSA_PSS_SALTLEN_MAX_SIGN,
      RSA_PSS_SALTLEN_AUTO,
      defaultCoreCipherList,
      TLS1_VERSION,
      TLS1_1_VERSION,
      TLS1_2_VERSION,
      TLS1_3_VERSION,
      POINT_CONVERSION_COMPRESSED,
      POINT_CONVERSION_UNCOMPRESSED,
      POINT_CONVERSION_HYBRID,
      defaultCipherList
    };
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs
var workerdCrypto, Certificate, DiffieHellman, DiffieHellmanGroup, Hash, Hmac, KeyObject, X509Certificate, checkPrime, checkPrimeSync, createDiffieHellman, createDiffieHellmanGroup, createHash, createHmac, createPrivateKey, createPublicKey, createSecretKey, generateKey, generateKeyPair, generateKeyPairSync, generateKeySync, generatePrime, generatePrimeSync, getCiphers, getCurves, getDiffieHellman, getFips, getHashes, hkdf, hkdfSync, pbkdf2, pbkdf2Sync, randomBytes, randomFill, randomFillSync, randomInt, randomUUID, scrypt, scryptSync, secureHeapUsed, setEngine, setFips, subtle2, timingSafeEqual, getRandomValues, webcrypto2, fips, crypto_default;
var init_crypto2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_crypto();
    workerdCrypto = process.getBuiltinModule("node:crypto");
    ({
      Certificate,
      DiffieHellman,
      DiffieHellmanGroup,
      Hash,
      Hmac,
      KeyObject,
      X509Certificate,
      checkPrime,
      checkPrimeSync,
      createDiffieHellman,
      createDiffieHellmanGroup,
      createHash,
      createHmac,
      createPrivateKey,
      createPublicKey,
      createSecretKey,
      generateKey,
      generateKeyPair,
      generateKeyPairSync,
      generateKeySync,
      generatePrime,
      generatePrimeSync,
      getCiphers,
      getCurves,
      getDiffieHellman,
      getFips,
      getHashes,
      hkdf,
      hkdfSync,
      pbkdf2,
      pbkdf2Sync,
      randomBytes,
      randomFill,
      randomFillSync,
      randomInt,
      randomUUID,
      scrypt,
      scryptSync,
      secureHeapUsed,
      setEngine,
      setFips,
      subtle: subtle2,
      timingSafeEqual
    } = workerdCrypto);
    getRandomValues = workerdCrypto.getRandomValues.bind(
      workerdCrypto.webcrypto
    );
    webcrypto2 = {
      // @ts-expect-error unenv has unknown type
      CryptoKey: webcrypto.CryptoKey,
      getRandomValues,
      randomUUID,
      subtle: subtle2
    };
    fips = workerdCrypto.fips;
    crypto_default = {
      /**
       * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
       */
      Certificate,
      Cipher,
      Cipheriv,
      Decipher,
      Decipheriv,
      ECDH,
      Sign,
      Verify,
      X509Certificate,
      // @ts-expect-error @types/node is out of date - this is a bug in typings
      constants,
      // @ts-expect-error unenv has unknown type
      createCipheriv,
      // @ts-expect-error unenv has unknown type
      createDecipheriv,
      // @ts-expect-error unenv has unknown type
      createECDH,
      // @ts-expect-error unenv has unknown type
      createSign,
      // @ts-expect-error unenv has unknown type
      createVerify,
      // @ts-expect-error unenv has unknown type
      diffieHellman,
      // @ts-expect-error unenv has unknown type
      getCipherInfo,
      // @ts-expect-error unenv has unknown type
      hash,
      // @ts-expect-error unenv has unknown type
      privateDecrypt,
      // @ts-expect-error unenv has unknown type
      privateEncrypt,
      // @ts-expect-error unenv has unknown type
      publicDecrypt,
      // @ts-expect-error unenv has unknown type
      publicEncrypt,
      scrypt,
      scryptSync,
      // @ts-expect-error unenv has unknown type
      sign,
      // @ts-expect-error unenv has unknown type
      verify,
      // default-only export from unenv
      // @ts-expect-error unenv has unknown type
      createCipher,
      // @ts-expect-error unenv has unknown type
      createDecipher,
      // @ts-expect-error unenv has unknown type
      pseudoRandomBytes,
      /**
       * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
       */
      DiffieHellman,
      DiffieHellmanGroup,
      Hash,
      Hmac,
      KeyObject,
      checkPrime,
      checkPrimeSync,
      createDiffieHellman,
      createDiffieHellmanGroup,
      createHash,
      createHmac,
      createPrivateKey,
      createPublicKey,
      createSecretKey,
      generateKey,
      generateKeyPair,
      generateKeyPairSync,
      generateKeySync,
      generatePrime,
      generatePrimeSync,
      getCiphers,
      getCurves,
      getDiffieHellman,
      getFips,
      getHashes,
      getRandomValues,
      hkdf,
      hkdfSync,
      pbkdf2,
      pbkdf2Sync,
      randomBytes,
      randomFill,
      randomFillSync,
      randomInt,
      randomUUID,
      secureHeapUsed,
      setEngine,
      setFips,
      subtle: subtle2,
      timingSafeEqual,
      // default-only export from workerd
      fips,
      // special-cased deep merged symbols
      webcrypto: webcrypto2
    };
  }
});

// node-built-in-modules:crypto
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_crypto2();
    module.exports = crypto_default;
  }
});

// node_modules/bcryptjs/dist/bcrypt.js
var require_bcrypt = __commonJS({
  "node_modules/bcryptjs/dist/bcrypt.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function(global2, factory) {
      if (typeof define === "function" && define["amd"])
        define([], factory);
      else if (typeof __require === "function" && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
      else
        (global2["dcodeIO"] = global2["dcodeIO"] || {})["bcrypt"] = factory();
    })(exports, function() {
      "use strict";
      var bcrypt4 = {};
      var randomFallback = null;
      function random(len) {
        if (typeof module !== "undefined" && module && module["exports"])
          try {
            return require_crypto()["randomBytes"](len);
          } catch (e) {
          }
        try {
          var a;
          (self["crypto"] || self["msCrypto"])["getRandomValues"](a = new Uint32Array(len));
          return Array.prototype.slice.call(a);
        } catch (e) {
        }
        if (!randomFallback)
          throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
        return randomFallback(len);
      }
      __name(random, "random");
      var randomAvailable = false;
      try {
        random(1);
        randomAvailable = true;
      } catch (e) {
      }
      randomFallback = null;
      bcrypt4.setRandomFallback = function(random2) {
        randomFallback = random2;
      };
      bcrypt4.genSaltSync = function(rounds, seed_length) {
        rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof rounds !== "number")
          throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
        if (rounds < 4)
          rounds = 4;
        else if (rounds > 31)
          rounds = 31;
        var salt = [];
        salt.push("$2a$");
        if (rounds < 10)
          salt.push("0");
        salt.push(rounds.toString());
        salt.push("$");
        salt.push(base64_encode(random(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
        return salt.join("");
      };
      bcrypt4.genSalt = function(rounds, seed_length, callback) {
        if (typeof seed_length === "function")
          callback = seed_length, seed_length = void 0;
        if (typeof rounds === "function")
          callback = rounds, rounds = void 0;
        if (typeof rounds === "undefined")
          rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
        else if (typeof rounds !== "number")
          throw Error("illegal arguments: " + typeof rounds);
        function _async(callback2) {
          nextTick2(function() {
            try {
              callback2(null, bcrypt4.genSaltSync(rounds));
            } catch (err) {
              callback2(err);
            }
          });
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt4.hashSync = function(s, salt) {
        if (typeof salt === "undefined")
          salt = GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof salt === "number")
          salt = bcrypt4.genSaltSync(salt);
        if (typeof s !== "string" || typeof salt !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof salt);
        return _hash(s, salt);
      };
      bcrypt4.hash = function(s, salt, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s === "string" && typeof salt === "number")
            bcrypt4.genSalt(salt, function(err, salt2) {
              _hash(s, salt2, callback2, progressCallback);
            });
          else if (typeof s === "string" && typeof salt === "string")
            _hash(s, salt, callback2, progressCallback);
          else
            nextTick2(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof salt)));
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      function safeStringCompare(known, unknown) {
        var right = 0, wrong = 0;
        for (var i = 0, k = known.length; i < k; ++i) {
          if (known.charCodeAt(i) === unknown.charCodeAt(i))
            ++right;
          else
            ++wrong;
        }
        if (right < 0)
          return false;
        return wrong === 0;
      }
      __name(safeStringCompare, "safeStringCompare");
      bcrypt4.compareSync = function(s, hash2) {
        if (typeof s !== "string" || typeof hash2 !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof hash2);
        if (hash2.length !== 60)
          return false;
        return safeStringCompare(bcrypt4.hashSync(s, hash2.substr(0, hash2.length - 31)), hash2);
      };
      bcrypt4.compare = function(s, hash2, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s !== "string" || typeof hash2 !== "string") {
            nextTick2(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof hash2)));
            return;
          }
          if (hash2.length !== 60) {
            nextTick2(callback2.bind(this, null, false));
            return;
          }
          bcrypt4.hash(s, hash2.substr(0, 29), function(err, comp) {
            if (err)
              callback2(err);
            else
              callback2(null, safeStringCompare(comp, hash2));
          }, progressCallback);
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt4.getRounds = function(hash2) {
        if (typeof hash2 !== "string")
          throw Error("Illegal arguments: " + typeof hash2);
        return parseInt(hash2.split("$")[2], 10);
      };
      bcrypt4.getSalt = function(hash2) {
        if (typeof hash2 !== "string")
          throw Error("Illegal arguments: " + typeof hash2);
        if (hash2.length !== 60)
          throw Error("Illegal hash length: " + hash2.length + " != 60");
        return hash2.substring(0, 29);
      };
      var nextTick2 = typeof process !== "undefined" && process && typeof process.nextTick === "function" ? typeof setImmediate === "function" ? setImmediate : process.nextTick : setTimeout;
      function stringToBytes(str) {
        var out = [], i = 0;
        utfx.encodeUTF16toUTF8(function() {
          if (i >= str.length)
            return null;
          return str.charCodeAt(i++);
        }, function(b) {
          out.push(b);
        });
        return out;
      }
      __name(stringToBytes, "stringToBytes");
      var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
      var BASE64_INDEX = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        1,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        -1,
        -1,
        -1,
        -1,
        -1
      ];
      var stringFromCharCode = String.fromCharCode;
      function base64_encode(b, len) {
        var off2 = 0, rs = [], c1, c2;
        if (len <= 0 || len > b.length)
          throw Error("Illegal len: " + len);
        while (off2 < len) {
          c1 = b[off2++] & 255;
          rs.push(BASE64_CODE[c1 >> 2 & 63]);
          c1 = (c1 & 3) << 4;
          if (off2 >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off2++] & 255;
          c1 |= c2 >> 4 & 15;
          rs.push(BASE64_CODE[c1 & 63]);
          c1 = (c2 & 15) << 2;
          if (off2 >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off2++] & 255;
          c1 |= c2 >> 6 & 3;
          rs.push(BASE64_CODE[c1 & 63]);
          rs.push(BASE64_CODE[c2 & 63]);
        }
        return rs.join("");
      }
      __name(base64_encode, "base64_encode");
      function base64_decode(s, len) {
        var off2 = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
        if (len <= 0)
          throw Error("Illegal len: " + len);
        while (off2 < slen - 1 && olen < len) {
          code = s.charCodeAt(off2++);
          c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          code = s.charCodeAt(off2++);
          c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c1 == -1 || c2 == -1)
            break;
          o = c1 << 2 >>> 0;
          o |= (c2 & 48) >> 4;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off2 >= slen)
            break;
          code = s.charCodeAt(off2++);
          c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c3 == -1)
            break;
          o = (c2 & 15) << 4 >>> 0;
          o |= (c3 & 60) >> 2;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off2 >= slen)
            break;
          code = s.charCodeAt(off2++);
          c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          o = (c3 & 3) << 6 >>> 0;
          o |= c4;
          rs.push(stringFromCharCode(o));
          ++olen;
        }
        var res = [];
        for (off2 = 0; off2 < olen; off2++)
          res.push(rs[off2].charCodeAt(0));
        return res;
      }
      __name(base64_decode, "base64_decode");
      var utfx = function() {
        "use strict";
        var utfx2 = {};
        utfx2.MAX_CODEPOINT = 1114111;
        utfx2.encodeUTF8 = function(src, dst) {
          var cp = null;
          if (typeof src === "number")
            cp = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp !== null || (cp = src()) !== null) {
            if (cp < 128)
              dst(cp & 127);
            else if (cp < 2048)
              dst(cp >> 6 & 31 | 192), dst(cp & 63 | 128);
            else if (cp < 65536)
              dst(cp >> 12 & 15 | 224), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
            else
              dst(cp >> 18 & 7 | 240), dst(cp >> 12 & 63 | 128), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
            cp = null;
          }
        };
        utfx2.decodeUTF8 = function(src, dst) {
          var a, b, c, d, fail = /* @__PURE__ */ __name(function(b2) {
            b2 = b2.slice(0, b2.indexOf(null));
            var err = Error(b2.toString());
            err.name = "TruncatedError";
            err["bytes"] = b2;
            throw err;
          }, "fail");
          while ((a = src()) !== null) {
            if ((a & 128) === 0)
              dst(a);
            else if ((a & 224) === 192)
              (b = src()) === null && fail([a, b]), dst((a & 31) << 6 | b & 63);
            else if ((a & 240) === 224)
              ((b = src()) === null || (c = src()) === null) && fail([a, b, c]), dst((a & 15) << 12 | (b & 63) << 6 | c & 63);
            else if ((a & 248) === 240)
              ((b = src()) === null || (c = src()) === null || (d = src()) === null) && fail([a, b, c, d]), dst((a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63);
            else
              throw RangeError("Illegal starting byte: " + a);
          }
        };
        utfx2.UTF16toUTF8 = function(src, dst) {
          var c1, c2 = null;
          while (true) {
            if ((c1 = c2 !== null ? c2 : src()) === null)
              break;
            if (c1 >= 55296 && c1 <= 57343) {
              if ((c2 = src()) !== null) {
                if (c2 >= 56320 && c2 <= 57343) {
                  dst((c1 - 55296) * 1024 + c2 - 56320 + 65536);
                  c2 = null;
                  continue;
                }
              }
            }
            dst(c1);
          }
          if (c2 !== null)
            dst(c2);
        };
        utfx2.UTF8toUTF16 = function(src, dst) {
          var cp = null;
          if (typeof src === "number")
            cp = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp !== null || (cp = src()) !== null) {
            if (cp <= 65535)
              dst(cp);
            else
              cp -= 65536, dst((cp >> 10) + 55296), dst(cp % 1024 + 56320);
            cp = null;
          }
        };
        utfx2.encodeUTF16toUTF8 = function(src, dst) {
          utfx2.UTF16toUTF8(src, function(cp) {
            utfx2.encodeUTF8(cp, dst);
          });
        };
        utfx2.decodeUTF8toUTF16 = function(src, dst) {
          utfx2.decodeUTF8(src, function(cp) {
            utfx2.UTF8toUTF16(cp, dst);
          });
        };
        utfx2.calculateCodePoint = function(cp) {
          return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
        };
        utfx2.calculateUTF8 = function(src) {
          var cp, l = 0;
          while ((cp = src()) !== null)
            l += utfx2.calculateCodePoint(cp);
          return l;
        };
        utfx2.calculateUTF16asUTF8 = function(src) {
          var n = 0, l = 0;
          utfx2.UTF16toUTF8(src, function(cp) {
            ++n;
            l += utfx2.calculateCodePoint(cp);
          });
          return [n, l];
        };
        return utfx2;
      }();
      Date.now = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      var BCRYPT_SALT_LEN = 16;
      var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
      var BLOWFISH_NUM_ROUNDS = 16;
      var MAX_EXECUTION_TIME = 100;
      var P_ORIG = [
        608135816,
        2242054355,
        320440878,
        57701188,
        2752067618,
        698298832,
        137296536,
        3964562569,
        1160258022,
        953160567,
        3193202383,
        887688300,
        3232508343,
        3380367581,
        1065670069,
        3041331479,
        2450970073,
        2306472731
      ];
      var S_ORIG = [
        3509652390,
        2564797868,
        805139163,
        3491422135,
        3101798381,
        1780907670,
        3128725573,
        4046225305,
        614570311,
        3012652279,
        134345442,
        2240740374,
        1667834072,
        1901547113,
        2757295779,
        4103290238,
        227898511,
        1921955416,
        1904987480,
        2182433518,
        2069144605,
        3260701109,
        2620446009,
        720527379,
        3318853667,
        677414384,
        3393288472,
        3101374703,
        2390351024,
        1614419982,
        1822297739,
        2954791486,
        3608508353,
        3174124327,
        2024746970,
        1432378464,
        3864339955,
        2857741204,
        1464375394,
        1676153920,
        1439316330,
        715854006,
        3033291828,
        289532110,
        2706671279,
        2087905683,
        3018724369,
        1668267050,
        732546397,
        1947742710,
        3462151702,
        2609353502,
        2950085171,
        1814351708,
        2050118529,
        680887927,
        999245976,
        1800124847,
        3300911131,
        1713906067,
        1641548236,
        4213287313,
        1216130144,
        1575780402,
        4018429277,
        3917837745,
        3693486850,
        3949271944,
        596196993,
        3549867205,
        258830323,
        2213823033,
        772490370,
        2760122372,
        1774776394,
        2652871518,
        566650946,
        4142492826,
        1728879713,
        2882767088,
        1783734482,
        3629395816,
        2517608232,
        2874225571,
        1861159788,
        326777828,
        3124490320,
        2130389656,
        2716951837,
        967770486,
        1724537150,
        2185432712,
        2364442137,
        1164943284,
        2105845187,
        998989502,
        3765401048,
        2244026483,
        1075463327,
        1455516326,
        1322494562,
        910128902,
        469688178,
        1117454909,
        936433444,
        3490320968,
        3675253459,
        1240580251,
        122909385,
        2157517691,
        634681816,
        4142456567,
        3825094682,
        3061402683,
        2540495037,
        79693498,
        3249098678,
        1084186820,
        1583128258,
        426386531,
        1761308591,
        1047286709,
        322548459,
        995290223,
        1845252383,
        2603652396,
        3431023940,
        2942221577,
        3202600964,
        3727903485,
        1712269319,
        422464435,
        3234572375,
        1170764815,
        3523960633,
        3117677531,
        1434042557,
        442511882,
        3600875718,
        1076654713,
        1738483198,
        4213154764,
        2393238008,
        3677496056,
        1014306527,
        4251020053,
        793779912,
        2902807211,
        842905082,
        4246964064,
        1395751752,
        1040244610,
        2656851899,
        3396308128,
        445077038,
        3742853595,
        3577915638,
        679411651,
        2892444358,
        2354009459,
        1767581616,
        3150600392,
        3791627101,
        3102740896,
        284835224,
        4246832056,
        1258075500,
        768725851,
        2589189241,
        3069724005,
        3532540348,
        1274779536,
        3789419226,
        2764799539,
        1660621633,
        3471099624,
        4011903706,
        913787905,
        3497959166,
        737222580,
        2514213453,
        2928710040,
        3937242737,
        1804850592,
        3499020752,
        2949064160,
        2386320175,
        2390070455,
        2415321851,
        4061277028,
        2290661394,
        2416832540,
        1336762016,
        1754252060,
        3520065937,
        3014181293,
        791618072,
        3188594551,
        3933548030,
        2332172193,
        3852520463,
        3043980520,
        413987798,
        3465142937,
        3030929376,
        4245938359,
        2093235073,
        3534596313,
        375366246,
        2157278981,
        2479649556,
        555357303,
        3870105701,
        2008414854,
        3344188149,
        4221384143,
        3956125452,
        2067696032,
        3594591187,
        2921233993,
        2428461,
        544322398,
        577241275,
        1471733935,
        610547355,
        4027169054,
        1432588573,
        1507829418,
        2025931657,
        3646575487,
        545086370,
        48609733,
        2200306550,
        1653985193,
        298326376,
        1316178497,
        3007786442,
        2064951626,
        458293330,
        2589141269,
        3591329599,
        3164325604,
        727753846,
        2179363840,
        146436021,
        1461446943,
        4069977195,
        705550613,
        3059967265,
        3887724982,
        4281599278,
        3313849956,
        1404054877,
        2845806497,
        146425753,
        1854211946,
        1266315497,
        3048417604,
        3681880366,
        3289982499,
        290971e4,
        1235738493,
        2632868024,
        2414719590,
        3970600049,
        1771706367,
        1449415276,
        3266420449,
        422970021,
        1963543593,
        2690192192,
        3826793022,
        1062508698,
        1531092325,
        1804592342,
        2583117782,
        2714934279,
        4024971509,
        1294809318,
        4028980673,
        1289560198,
        2221992742,
        1669523910,
        35572830,
        157838143,
        1052438473,
        1016535060,
        1802137761,
        1753167236,
        1386275462,
        3080475397,
        2857371447,
        1040679964,
        2145300060,
        2390574316,
        1461121720,
        2956646967,
        4031777805,
        4028374788,
        33600511,
        2920084762,
        1018524850,
        629373528,
        3691585981,
        3515945977,
        2091462646,
        2486323059,
        586499841,
        988145025,
        935516892,
        3367335476,
        2599673255,
        2839830854,
        265290510,
        3972581182,
        2759138881,
        3795373465,
        1005194799,
        847297441,
        406762289,
        1314163512,
        1332590856,
        1866599683,
        4127851711,
        750260880,
        613907577,
        1450815602,
        3165620655,
        3734664991,
        3650291728,
        3012275730,
        3704569646,
        1427272223,
        778793252,
        1343938022,
        2676280711,
        2052605720,
        1946737175,
        3164576444,
        3914038668,
        3967478842,
        3682934266,
        1661551462,
        3294938066,
        4011595847,
        840292616,
        3712170807,
        616741398,
        312560963,
        711312465,
        1351876610,
        322626781,
        1910503582,
        271666773,
        2175563734,
        1594956187,
        70604529,
        3617834859,
        1007753275,
        1495573769,
        4069517037,
        2549218298,
        2663038764,
        504708206,
        2263041392,
        3941167025,
        2249088522,
        1514023603,
        1998579484,
        1312622330,
        694541497,
        2582060303,
        2151582166,
        1382467621,
        776784248,
        2618340202,
        3323268794,
        2497899128,
        2784771155,
        503983604,
        4076293799,
        907881277,
        423175695,
        432175456,
        1378068232,
        4145222326,
        3954048622,
        3938656102,
        3820766613,
        2793130115,
        2977904593,
        26017576,
        3274890735,
        3194772133,
        1700274565,
        1756076034,
        4006520079,
        3677328699,
        720338349,
        1533947780,
        354530856,
        688349552,
        3973924725,
        1637815568,
        332179504,
        3949051286,
        53804574,
        2852348879,
        3044236432,
        1282449977,
        3583942155,
        3416972820,
        4006381244,
        1617046695,
        2628476075,
        3002303598,
        1686838959,
        431878346,
        2686675385,
        1700445008,
        1080580658,
        1009431731,
        832498133,
        3223435511,
        2605976345,
        2271191193,
        2516031870,
        1648197032,
        4164389018,
        2548247927,
        300782431,
        375919233,
        238389289,
        3353747414,
        2531188641,
        2019080857,
        1475708069,
        455242339,
        2609103871,
        448939670,
        3451063019,
        1395535956,
        2413381860,
        1841049896,
        1491858159,
        885456874,
        4264095073,
        4001119347,
        1565136089,
        3898914787,
        1108368660,
        540939232,
        1173283510,
        2745871338,
        3681308437,
        4207628240,
        3343053890,
        4016749493,
        1699691293,
        1103962373,
        3625875870,
        2256883143,
        3830138730,
        1031889488,
        3479347698,
        1535977030,
        4236805024,
        3251091107,
        2132092099,
        1774941330,
        1199868427,
        1452454533,
        157007616,
        2904115357,
        342012276,
        595725824,
        1480756522,
        206960106,
        497939518,
        591360097,
        863170706,
        2375253569,
        3596610801,
        1814182875,
        2094937945,
        3421402208,
        1082520231,
        3463918190,
        2785509508,
        435703966,
        3908032597,
        1641649973,
        2842273706,
        3305899714,
        1510255612,
        2148256476,
        2655287854,
        3276092548,
        4258621189,
        236887753,
        3681803219,
        274041037,
        1734335097,
        3815195456,
        3317970021,
        1899903192,
        1026095262,
        4050517792,
        356393447,
        2410691914,
        3873677099,
        3682840055,
        3913112168,
        2491498743,
        4132185628,
        2489919796,
        1091903735,
        1979897079,
        3170134830,
        3567386728,
        3557303409,
        857797738,
        1136121015,
        1342202287,
        507115054,
        2535736646,
        337727348,
        3213592640,
        1301675037,
        2528481711,
        1895095763,
        1721773893,
        3216771564,
        62756741,
        2142006736,
        835421444,
        2531993523,
        1442658625,
        3659876326,
        2882144922,
        676362277,
        1392781812,
        170690266,
        3921047035,
        1759253602,
        3611846912,
        1745797284,
        664899054,
        1329594018,
        3901205900,
        3045908486,
        2062866102,
        2865634940,
        3543621612,
        3464012697,
        1080764994,
        553557557,
        3656615353,
        3996768171,
        991055499,
        499776247,
        1265440854,
        648242737,
        3940784050,
        980351604,
        3713745714,
        1749149687,
        3396870395,
        4211799374,
        3640570775,
        1161844396,
        3125318951,
        1431517754,
        545492359,
        4268468663,
        3499529547,
        1437099964,
        2702547544,
        3433638243,
        2581715763,
        2787789398,
        1060185593,
        1593081372,
        2418618748,
        4260947970,
        69676912,
        2159744348,
        86519011,
        2512459080,
        3838209314,
        1220612927,
        3339683548,
        133810670,
        1090789135,
        1078426020,
        1569222167,
        845107691,
        3583754449,
        4072456591,
        1091646820,
        628848692,
        1613405280,
        3757631651,
        526609435,
        236106946,
        48312990,
        2942717905,
        3402727701,
        1797494240,
        859738849,
        992217954,
        4005476642,
        2243076622,
        3870952857,
        3732016268,
        765654824,
        3490871365,
        2511836413,
        1685915746,
        3888969200,
        1414112111,
        2273134842,
        3281911079,
        4080962846,
        172450625,
        2569994100,
        980381355,
        4109958455,
        2819808352,
        2716589560,
        2568741196,
        3681446669,
        3329971472,
        1835478071,
        660984891,
        3704678404,
        4045999559,
        3422617507,
        3040415634,
        1762651403,
        1719377915,
        3470491036,
        2693910283,
        3642056355,
        3138596744,
        1364962596,
        2073328063,
        1983633131,
        926494387,
        3423689081,
        2150032023,
        4096667949,
        1749200295,
        3328846651,
        309677260,
        2016342300,
        1779581495,
        3079819751,
        111262694,
        1274766160,
        443224088,
        298511866,
        1025883608,
        3806446537,
        1145181785,
        168956806,
        3641502830,
        3584813610,
        1689216846,
        3666258015,
        3200248200,
        1692713982,
        2646376535,
        4042768518,
        1618508792,
        1610833997,
        3523052358,
        4130873264,
        2001055236,
        3610705100,
        2202168115,
        4028541809,
        2961195399,
        1006657119,
        2006996926,
        3186142756,
        1430667929,
        3210227297,
        1314452623,
        4074634658,
        4101304120,
        2273951170,
        1399257539,
        3367210612,
        3027628629,
        1190975929,
        2062231137,
        2333990788,
        2221543033,
        2438960610,
        1181637006,
        548689776,
        2362791313,
        3372408396,
        3104550113,
        3145860560,
        296247880,
        1970579870,
        3078560182,
        3769228297,
        1714227617,
        3291629107,
        3898220290,
        166772364,
        1251581989,
        493813264,
        448347421,
        195405023,
        2709975567,
        677966185,
        3703036547,
        1463355134,
        2715995803,
        1338867538,
        1343315457,
        2802222074,
        2684532164,
        233230375,
        2599980071,
        2000651841,
        3277868038,
        1638401717,
        4028070440,
        3237316320,
        6314154,
        819756386,
        300326615,
        590932579,
        1405279636,
        3267499572,
        3150704214,
        2428286686,
        3959192993,
        3461946742,
        1862657033,
        1266418056,
        963775037,
        2089974820,
        2263052895,
        1917689273,
        448879540,
        3550394620,
        3981727096,
        150775221,
        3627908307,
        1303187396,
        508620638,
        2975983352,
        2726630617,
        1817252668,
        1876281319,
        1457606340,
        908771278,
        3720792119,
        3617206836,
        2455994898,
        1729034894,
        1080033504,
        976866871,
        3556439503,
        2881648439,
        1522871579,
        1555064734,
        1336096578,
        3548522304,
        2579274686,
        3574697629,
        3205460757,
        3593280638,
        3338716283,
        3079412587,
        564236357,
        2993598910,
        1781952180,
        1464380207,
        3163844217,
        3332601554,
        1699332808,
        1393555694,
        1183702653,
        3581086237,
        1288719814,
        691649499,
        2847557200,
        2895455976,
        3193889540,
        2717570544,
        1781354906,
        1676643554,
        2592534050,
        3230253752,
        1126444790,
        2770207658,
        2633158820,
        2210423226,
        2615765581,
        2414155088,
        3127139286,
        673620729,
        2805611233,
        1269405062,
        4015350505,
        3341807571,
        4149409754,
        1057255273,
        2012875353,
        2162469141,
        2276492801,
        2601117357,
        993977747,
        3918593370,
        2654263191,
        753973209,
        36408145,
        2530585658,
        25011837,
        3520020182,
        2088578344,
        530523599,
        2918365339,
        1524020338,
        1518925132,
        3760827505,
        3759777254,
        1202760957,
        3985898139,
        3906192525,
        674977740,
        4174734889,
        2031300136,
        2019492241,
        3983892565,
        4153806404,
        3822280332,
        352677332,
        2297720250,
        60907813,
        90501309,
        3286998549,
        1016092578,
        2535922412,
        2839152426,
        457141659,
        509813237,
        4120667899,
        652014361,
        1966332200,
        2975202805,
        55981186,
        2327461051,
        676427537,
        3255491064,
        2882294119,
        3433927263,
        1307055953,
        942726286,
        933058658,
        2468411793,
        3933900994,
        4215176142,
        1361170020,
        2001714738,
        2830558078,
        3274259782,
        1222529897,
        1679025792,
        2729314320,
        3714953764,
        1770335741,
        151462246,
        3013232138,
        1682292957,
        1483529935,
        471910574,
        1539241949,
        458788160,
        3436315007,
        1807016891,
        3718408830,
        978976581,
        1043663428,
        3165965781,
        1927990952,
        4200891579,
        2372276910,
        3208408903,
        3533431907,
        1412390302,
        2931980059,
        4132332400,
        1947078029,
        3881505623,
        4168226417,
        2941484381,
        1077988104,
        1320477388,
        886195818,
        18198404,
        3786409e3,
        2509781533,
        112762804,
        3463356488,
        1866414978,
        891333506,
        18488651,
        661792760,
        1628790961,
        3885187036,
        3141171499,
        876946877,
        2693282273,
        1372485963,
        791857591,
        2686433993,
        3759982718,
        3167212022,
        3472953795,
        2716379847,
        445679433,
        3561995674,
        3504004811,
        3574258232,
        54117162,
        3331405415,
        2381918588,
        3769707343,
        4154350007,
        1140177722,
        4074052095,
        668550556,
        3214352940,
        367459370,
        261225585,
        2610173221,
        4209349473,
        3468074219,
        3265815641,
        314222801,
        3066103646,
        3808782860,
        282218597,
        3406013506,
        3773591054,
        379116347,
        1285071038,
        846784868,
        2669647154,
        3771962079,
        3550491691,
        2305946142,
        453669953,
        1268987020,
        3317592352,
        3279303384,
        3744833421,
        2610507566,
        3859509063,
        266596637,
        3847019092,
        517658769,
        3462560207,
        3443424879,
        370717030,
        4247526661,
        2224018117,
        4143653529,
        4112773975,
        2788324899,
        2477274417,
        1456262402,
        2901442914,
        1517677493,
        1846949527,
        2295493580,
        3734397586,
        2176403920,
        1280348187,
        1908823572,
        3871786941,
        846861322,
        1172426758,
        3287448474,
        3383383037,
        1655181056,
        3139813346,
        901632758,
        1897031941,
        2986607138,
        3066810236,
        3447102507,
        1393639104,
        373351379,
        950779232,
        625454576,
        3124240540,
        4148612726,
        2007998917,
        544563296,
        2244738638,
        2330496472,
        2058025392,
        1291430526,
        424198748,
        50039436,
        29584100,
        3605783033,
        2429876329,
        2791104160,
        1057563949,
        3255363231,
        3075367218,
        3463963227,
        1469046755,
        985887462
      ];
      var C_ORIG = [
        1332899944,
        1700884034,
        1701343084,
        1684370003,
        1668446532,
        1869963892
      ];
      function _encipher(lr, off2, P, S) {
        var n, l = lr[off2], r = lr[off2 + 1];
        l ^= P[0];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[1];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[2];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[3];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[4];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[5];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[6];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[7];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[8];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[9];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[10];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[11];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[12];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[13];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[14];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[15];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[16];
        lr[off2] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
        lr[off2 + 1] = l;
        return lr;
      }
      __name(_encipher, "_encipher");
      function _streamtoword(data, offp) {
        for (var i = 0, word = 0; i < 4; ++i)
          word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
        return { key: word, offp };
      }
      __name(_streamtoword, "_streamtoword");
      function _key(key, P, S) {
        var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
        for (i = 0; i < plen; i += 2)
          lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_key, "_key");
      function _ekskey(data, key, P, S) {
        var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
        offp = 0;
        for (i = 0; i < plen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_ekskey, "_ekskey");
      function _crypt(b, salt, rounds, callback, progressCallback) {
        var cdata = C_ORIG.slice(), clen = cdata.length, err;
        if (rounds < 4 || rounds > 31) {
          err = Error("Illegal number of rounds (4-31): " + rounds);
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.length !== BCRYPT_SALT_LEN) {
          err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        rounds = 1 << rounds >>> 0;
        var P, S, i = 0, j;
        if (Int32Array) {
          P = new Int32Array(P_ORIG);
          S = new Int32Array(S_ORIG);
        } else {
          P = P_ORIG.slice();
          S = S_ORIG.slice();
        }
        _ekskey(salt, b, P, S);
        function next() {
          if (progressCallback)
            progressCallback(i / rounds);
          if (i < rounds) {
            var start = Date.now();
            for (; i < rounds; ) {
              i = i + 1;
              _key(b, P, S);
              _key(salt, P, S);
              if (Date.now() - start > MAX_EXECUTION_TIME)
                break;
            }
          } else {
            for (i = 0; i < 64; i++)
              for (j = 0; j < clen >> 1; j++)
                _encipher(cdata, j << 1, P, S);
            var ret = [];
            for (i = 0; i < clen; i++)
              ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
            if (callback) {
              callback(null, ret);
              return;
            } else
              return ret;
          }
          if (callback)
            nextTick2(next);
        }
        __name(next, "next");
        if (typeof callback !== "undefined") {
          next();
        } else {
          var res;
          while (true)
            if (typeof (res = next()) !== "undefined")
              return res || [];
        }
      }
      __name(_crypt, "_crypt");
      function _hash(s, salt, callback, progressCallback) {
        var err;
        if (typeof s !== "string" || typeof salt !== "string") {
          err = Error("Invalid string / salt: Not a string");
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var minor, offset;
        if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
          err = Error("Invalid salt version: " + salt.substring(0, 2));
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.charAt(2) === "$")
          minor = String.fromCharCode(0), offset = 3;
        else {
          minor = salt.charAt(2);
          if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
            err = Error("Invalid salt revision: " + salt.substring(2, 4));
            if (callback) {
              nextTick2(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          offset = 4;
        }
        if (salt.charAt(offset + 2) > "$") {
          err = Error("Missing salt rounds");
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
        s += minor >= "a" ? "\0" : "";
        var passwordb = stringToBytes(s), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
        function finish(bytes) {
          var res = [];
          res.push("$2");
          if (minor >= "a")
            res.push(minor);
          res.push("$");
          if (rounds < 10)
            res.push("0");
          res.push(rounds.toString());
          res.push("$");
          res.push(base64_encode(saltb, saltb.length));
          res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
          return res.join("");
        }
        __name(finish, "finish");
        if (typeof callback == "undefined")
          return finish(_crypt(passwordb, saltb, rounds));
        else {
          _crypt(passwordb, saltb, rounds, function(err2, bytes) {
            if (err2)
              callback(err2, null);
            else
              callback(null, finish(bytes));
          }, progressCallback);
        }
      }
      __name(_hash, "_hash");
      bcrypt4.encodeBase64 = base64_encode;
      bcrypt4.decodeBase64 = base64_decode;
      return bcrypt4;
    });
  }
});

// node_modules/promise-limit/index.js
var require_promise_limit = __commonJS({
  "node_modules/promise-limit/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function limiter(count3) {
      var outstanding = 0;
      var jobs = [];
      function remove() {
        outstanding--;
        if (outstanding < count3) {
          dequeue();
        }
      }
      __name(remove, "remove");
      function dequeue() {
        var job = jobs.shift();
        semaphore.queue = jobs.length;
        if (job) {
          run(job.fn).then(job.resolve).catch(job.reject);
        }
      }
      __name(dequeue, "dequeue");
      function queue(fn) {
        return new Promise(function(resolve, reject) {
          jobs.push({ fn, resolve, reject });
          semaphore.queue = jobs.length;
        });
      }
      __name(queue, "queue");
      function run(fn) {
        outstanding++;
        try {
          return Promise.resolve(fn()).then(function(result) {
            remove();
            return result;
          }, function(error3) {
            remove();
            throw error3;
          });
        } catch (err) {
          remove();
          return Promise.reject(err);
        }
      }
      __name(run, "run");
      var semaphore = /* @__PURE__ */ __name(function(fn) {
        if (outstanding >= count3) {
          return queue(fn);
        } else {
          return run(fn);
        }
      }, "semaphore");
      return semaphore;
    }
    __name(limiter, "limiter");
    function map(items, mapper) {
      var failed = false;
      var limit = this;
      return Promise.all(items.map(function() {
        var args = arguments;
        return limit(function() {
          if (!failed) {
            return mapper.apply(void 0, args).catch(function(e) {
              failed = true;
              throw e;
            });
          }
        });
      }));
    }
    __name(map, "map");
    function addExtras(fn) {
      fn.queue = 0;
      fn.map = map;
      return fn;
    }
    __name(addExtras, "addExtras");
    module.exports = function(count3) {
      if (count3) {
        return addExtras(limiter(count3));
      } else {
        return addExtras(function(fn) {
          return fn();
        });
      }
    };
  }
});

// src/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono-base.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/compose.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/request.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/http-exception.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/request/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/buffer.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/crypto.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = /* @__PURE__ */ __name((arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
}, "bufferToFormData");

// node_modules/hono/dist/utils/body.js
var isRawRequest = /* @__PURE__ */ __name((request) => "headers" in request, "isRawRequest");
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData) {
    return convertFormDataToBodyData(
      await request.bodyCache.formData,
      options
    );
  }
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder2) => {
  try {
    return decoder2(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder2(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str, "tryDecodeURIComponent");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return tryDecodeURIComponent(value);
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = tryDecodeURIComponent(value);
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    for (const anyCachedKey in bodyCache) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    ;
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   // Append multiple headers using the append option (e.g. Vary)
   *   c.header('Vary', 'Accept-Encoding', { append: true })
   *   c.header('Vary', 'User-Agent', { append: true })
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers();
      for (const [key, value] of new Headers(arg.headers)) {
        if (key === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      if (!responseHeaders) {
        let count3 = 0;
        for (const k in headers) {
          if (++count3 > 1 || typeof headers[k] !== "string") {
            responseHeaders = new Headers();
            break;
          }
        }
      }
      if (responseHeaders) {
        for (const k in headers) {
          const v = headers[k];
          if (typeof v === "string") {
            responseHeaders.set(k, v);
          } else {
            responseHeaders.delete(k);
            for (const v2 of v) {
              responseHeaders.append(k, v2);
            }
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object2, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object2),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone2 = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone2.errorHandler = this.errorHandler;
    clone2.#notFoundHandler = this.#notFoundHandler;
    clone2.routes = this.routes;
    return clone2;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app31) {
    const subApp = this.basePath(path);
    app31.routes.map((r) => {
      let handler;
      if (app31.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app31.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} env - env Object
   * @param {ExecutionContext} executionCtx - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// node_modules/hono/dist/router/reg-exp-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  // handler index of a dynamic path, or -1 for a static path terminal
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
        if (name && pattern[2]) {
          if (regexpStr === ".*") {
            throw PATH_ERROR;
          }
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr)) {
            throw PATH_ERROR;
          }
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
            throw PATH_ERROR;
          }
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
            for (const k in node.#children) {
              if (
                // a single-char pattern coexists with single-char literals as a literal does
                (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
              ) {
                throw PATH_ERROR;
              }
            }
          }
          nextNode = node.#children[regexpStr] = new _Node();
        }
        if (name !== "") {
          nextNode.#varIndex ??= context2.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k in node.#children) {
            if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
              throw PATH_ERROR;
            }
          }
          nextNode = node.#children[token] = new _Node();
        }
      }
      node = nextNode;
    }
    if (node.#index !== void 0) {
      throw PATH_ERROR;
    }
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1) {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  #index = 0;
  // dynamic path -> [handler index, param assoc]; static paths are not registered
  paths = /* @__PURE__ */ Object.create(null);
  insert(path, isStatic) {
    if (isStatic) {
      this.#root.insert(path.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path;
    for (let i = 0; ; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#tries = { [METHOD_NAME_ALL]: new Trie() };
  }
  #insertPath(method, path) {
    try {
      this.#tries[method].insert(path, !/\*|\/:/.test(path));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      this.#tries[method] = new Trie();
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
          this.#insertPath(method, p);
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      Object.keys(middleware).forEach((m) => {
        if ((method === METHOD_NAME_ALL || method === m) && !middleware[m][path]) {
          this.#insertPath(m, path);
          middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        }
      });
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          if (!routes[m][path2]) {
            this.#insertPath(m, path2);
            routes[m][path2] = [
              ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
            ];
          }
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = this.#tries = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = /* @__PURE__ */ Object.create(null);
    const handlerData = [];
    [middleware, routes].forEach((r) => {
      for (const path in r) {
        const handlers = r[path];
        const pathData = trie.paths[path];
        if (!pathData) {
          staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
          continue;
        }
        const paramAssoc = pathData[1];
        handlerData[pathData[0]] = handlers.map(([h, paramCount]) => {
          const paramIndexMap = /* @__PURE__ */ Object.create(null);
          paramCount -= 1;
          for (; paramCount >= 0; paramCount--) {
            const [key, value] = paramAssoc[paramCount];
            paramIndexMap[key] = value;
          }
          return [h, paramIndexMap];
        });
      }
    });
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (let i = 0, len = handlerData.length; i < len; i++) {
      for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
        const map = handlerData[i][j]?.[1];
        if (!map) {
          continue;
        }
        const keys = Object.keys(map);
        for (let k = 0, len3 = keys.length; k < len3; k++) {
          map[keys[k]] = paramReplacementMap[map[keys[k]]];
        }
      }
    }
    const handlerMap = [];
    for (const i in indexReplacementMap) {
      handlerMap[i] = handlerData[indexReplacementMap[i]];
    }
    return [regexp, handlerMap, staticMap];
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/smart-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/smart-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParams = /* @__PURE__ */ Object.create(null);
var order = 0;
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods = [];
  #children = /* @__PURE__ */ Object.create(null);
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path, handler) {
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = /* @__PURE__ */ new Set();
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new _Node2();
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam) {
        possibleKeys.add(pattern[1]);
      }
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: [...possibleKeys],
        score: ++order
      }
    });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      if (handlerSet) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
          const key = handlerSet.possibleKeys[i2];
          handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true) {
            continue;
          }
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1]) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node = new Node2();
  add(method, path, handler) {
    for (const result of checkOptionalParameter(path) || [path]) {
      this.#node.insert(method, result, handler);
    }
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/hono/dist/middleware/cors/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var cors = /* @__PURE__ */ __name((options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : void 0;
  const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : void 0;
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
    } else if (Array.isArray(optsAllowMethods)) {
      const methodsStr = optsAllowMethods.join(",");
      return () => methodsStr;
    } else {
      return () => "";
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (exposeHeadersStr) {
      set("Access-Control-Expose-Headers", exposeHeadersStr);
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        c.res.headers.append("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods) {
        set("Access-Control-Allow-Methods", allowMethods);
      }
      let headersStr = allowHeadersStr;
      if (!headersStr) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
        }
      }
      if (headersStr) {
        set("Access-Control-Allow-Headers", headersStr);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// src/routes/auth.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_bcryptjs = __toESM(require_bcrypt(), 1);

// node_modules/zod/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod/v3/errors.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod/v3/locales/en.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod/v3/ZodError.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod/v3/helpers/util.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  __name(assertIs, "assertIs");
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  __name(assertNever, "assertNever");
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object2) => {
    const keys = [];
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array2, separator = " | ") {
    return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  __name(joinValues, "joinValues");
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = /* @__PURE__ */ __name((data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
}, "getParsedType");

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = /* @__PURE__ */ __name((obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
}, "quotelessJson");
var ZodError = class extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = /* @__PURE__ */ __name((error3) => {
      for (const issue of error3.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    }, "processError");
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
__name(ZodError, "ZodError");
ZodError.create = (issues) => {
  const error3 = new ZodError(issues);
  return error3;
};

// node_modules/zod/v3/locales/en.js
var errorMap = /* @__PURE__ */ __name((issue, _ctx) => {
  let message2;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message2 = "Required";
      } else {
        message2 = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message2 = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message2 = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message2 = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message2 = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message2 = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message2 = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message2 = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message2 = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message2 = `${message2} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message2 = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message2 = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message2 = `Invalid ${issue.validation}`;
      } else {
        message2 = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message2 = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message2 = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message2 = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message2 = "Number must be finite";
      break;
    default:
      message2 = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message: message2 };
}, "errorMap");
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
__name(setErrorMap, "setErrorMap");
function getErrorMap() {
  return overrideErrorMap;
}
__name(getErrorMap, "getErrorMap");

// node_modules/zod/v3/helpers/parseUtil.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var makeIssue = /* @__PURE__ */ __name((params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
}, "makeIssue");
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
__name(addIssueToContext, "addIssueToContext");
var ParseStatus = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
__name(ParseStatus, "ParseStatus");
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = /* @__PURE__ */ __name((value) => ({ status: "dirty", value }), "DIRTY");
var OK = /* @__PURE__ */ __name((value) => ({ status: "valid", value }), "OK");
var isAborted = /* @__PURE__ */ __name((x) => x.status === "aborted", "isAborted");
var isDirty = /* @__PURE__ */ __name((x) => x.status === "dirty", "isDirty");
var isValid = /* @__PURE__ */ __name((x) => x.status === "valid", "isValid");
var isAsync = /* @__PURE__ */ __name((x) => typeof Promise !== "undefined" && x instanceof Promise, "isAsync");

// node_modules/zod/v3/types.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/zod/v3/helpers/errorUtil.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message2) => typeof message2 === "string" ? { message: message2 } : message2 || {};
  errorUtil2.toString = (message2) => typeof message2 === "string" ? message2 : message2?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
__name(ParseInputLazyPath, "ParseInputLazyPath");
var handleResult = /* @__PURE__ */ __name((ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error3 = new ZodError(ctx.common.issues);
        this._error = error3;
        return this._error;
      }
    };
  }
}, "handleResult");
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = /* @__PURE__ */ __name((iss, ctx) => {
    const { message: message2 } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message2 ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message2 ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message2 ?? invalid_type_error ?? ctx.defaultError };
  }, "customMap");
  return { errorMap: customMap, description };
}
__name(processCreateParams, "processCreateParams");
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message2) {
    const getIssueProperties = /* @__PURE__ */ __name((val) => {
      if (typeof message2 === "string" || typeof message2 === "undefined") {
        return { message: message2 };
      } else if (typeof message2 === "function") {
        return message2(val);
      } else {
        return message2;
      }
    }, "getIssueProperties");
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = /* @__PURE__ */ __name(() => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      }), "setError");
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
__name(ZodType, "ZodType");
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
__name(timeRegexSource, "timeRegexSource");
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
__name(timeRegex, "timeRegex");
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
__name(datetimeRegex, "datetimeRegex");
function isValidIP(ip, version3) {
  if ((version3 === "v4" || !version3) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version3 === "v6" || !version3) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidIP, "isValidIP");
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
__name(isValidJWT, "isValidJWT");
function isValidCidr(ip, version3) {
  if ((version3 === "v4" || !version3) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version3 === "v6" || !version3) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidCidr, "isValidCidr");
var ZodString = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message2) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message2)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message2) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message2) });
  }
  url(message2) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message2) });
  }
  emoji(message2) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message2) });
  }
  uuid(message2) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message2) });
  }
  nanoid(message2) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message2) });
  }
  cuid(message2) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message2) });
  }
  cuid2(message2) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message2) });
  }
  ulid(message2) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message2) });
  }
  base64(message2) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message2) });
  }
  base64url(message2) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message2)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message2) {
    return this._addCheck({ kind: "date", message: message2 });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message2) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message2) });
  }
  regex(regex, message2) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message2)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message2) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  endsWith(value, message2) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  min(minLength, message2) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message2)
    });
  }
  max(maxLength, message2) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message2)
    });
  }
  length(len, message2) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message2)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message2) {
    return this.min(1, errorUtil.errToObj(message2));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
__name(ZodString, "ZodString");
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
__name(floatSafeRemainder, "floatSafeRemainder");
var ZodNumber = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message2) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message2)
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  finite(message2) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message2)
    });
  }
  safe(message2) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
__name(ZodNumber, "ZodNumber");
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
__name(ZodBigInt, "ZodBigInt");
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodBoolean, "ZodBoolean");
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message2) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  max(maxDate, message2) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
__name(ZodDate, "ZodDate");
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodSymbol, "ZodSymbol");
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodUndefined, "ZodUndefined");
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodNull, "ZodNull");
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
__name(ZodAny, "ZodAny");
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
__name(ZodUnknown, "ZodUnknown");
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
__name(ZodNever, "ZodNever");
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodVoid, "ZodVoid");
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message2) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message2) }
    });
  }
  max(maxLength, message2) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message2) }
    });
  }
  length(len, message2) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message2) }
    });
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
__name(ZodArray, "ZodArray");
ZodArray.create = (schema4, params) => {
  return new ZodArray({
    type: schema4,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema4) {
  if (schema4 instanceof ZodObject) {
    const newShape = {};
    for (const key in schema4.shape) {
      const fieldSchema = schema4.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema4._def,
      shape: () => newShape
    });
  } else if (schema4 instanceof ZodArray) {
    return new ZodArray({
      ...schema4._def,
      type: deepPartialify(schema4.element)
    });
  } else if (schema4 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema4.unwrap()));
  } else if (schema4 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema4.unwrap()));
  } else if (schema4 instanceof ZodTuple) {
    return ZodTuple.create(schema4.items.map((item) => deepPartialify(item)));
  } else {
    return schema4;
  }
}
__name(deepPartialify, "deepPartialify");
var ZodObject = class extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message2) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message2 !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message2).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema4) {
    return this.augment({ [key]: schema4 });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
__name(ZodObject, "ZodObject");
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    __name(handleResults, "handleResults");
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
__name(ZodUnion, "ZodUnion");
ZodUnion.create = (types2, params) => {
  return new ZodUnion({
    options: types2,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = /* @__PURE__ */ __name((type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
}, "getDiscriminator");
var ZodDiscriminatedUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
__name(ZodDiscriminatedUnion, "ZodDiscriminatedUnion");
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
__name(mergeValues, "mergeValues");
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = /* @__PURE__ */ __name((parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    }, "handleParsed");
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
__name(ZodIntersection, "ZodIntersection");
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema4 = this._def.items[itemIndex] || this._def.rest;
      if (!schema4)
        return null;
      return schema4._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
};
__name(ZodTuple, "ZodTuple");
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
__name(ZodRecord, "ZodRecord");
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
__name(ZodMap, "ZodMap");
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    __name(finalizeSet, "finalizeSet");
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message2) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message2) }
    });
  }
  max(maxSize, message2) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message2) }
    });
  }
  size(size, message2) {
    return this.min(size, message2).max(size, message2);
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
__name(ZodSet, "ZodSet");
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error3) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error3
        }
      });
    }
    __name(makeArgsIssue, "makeArgsIssue");
    function makeReturnsIssue(returns, error3) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error3
        }
      });
    }
    __name(makeReturnsIssue, "makeReturnsIssue");
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error3 = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error3.addIssue(makeArgsIssue(args, e));
          throw error3;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error3.addIssue(makeReturnsIssue(result, e));
          throw error3;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
__name(ZodFunction, "ZodFunction");
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
__name(ZodLazy, "ZodLazy");
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
__name(ZodLiteral, "ZodLiteral");
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
__name(createZodEnum, "createZodEnum");
var ZodEnum = class extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
__name(ZodEnum, "ZodEnum");
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
__name(ZodNativeEnum, "ZodNativeEnum");
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
__name(ZodPromise, "ZodPromise");
ZodPromise.create = (schema4, params) => {
  return new ZodPromise({
    type: schema4,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = /* @__PURE__ */ __name((acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      }, "executeRefinement");
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
__name(ZodEffects, "ZodEffects");
ZodEffects.create = (schema4, effect, params) => {
  return new ZodEffects({
    schema: schema4,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema4, params) => {
  return new ZodEffects({
    schema: schema4,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
__name(ZodOptional, "ZodOptional");
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
__name(ZodNullable, "ZodNullable");
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
__name(ZodDefault, "ZodDefault");
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
__name(ZodCatch, "ZodCatch");
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
__name(ZodNaN, "ZodNaN");
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
__name(ZodBranded, "ZodBranded");
var ZodPipeline = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = /* @__PURE__ */ __name(async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }, "handleAsync");
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
__name(ZodPipeline, "ZodPipeline");
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = /* @__PURE__ */ __name((data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    }, "freeze");
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
__name(ZodReadonly, "ZodReadonly");
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
__name(cleanParams, "cleanParams");
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
__name(custom, "custom");
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = /* @__PURE__ */ __name((cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params), "instanceOfType");
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = /* @__PURE__ */ __name(() => stringType().optional(), "ostring");
var onumber = /* @__PURE__ */ __name(() => numberType().optional(), "onumber");
var oboolean = /* @__PURE__ */ __name(() => booleanType().optional(), "oboolean");
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;

// src/lib/db.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/client/lib-esm/web.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/core/lib-esm/api.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LibsqlError = class extends Error {
  /** Machine-readable error code. */
  code;
  /** Raw numeric error code */
  rawCode;
  constructor(message2, code, rawCode, cause) {
    if (code !== void 0) {
      message2 = `${code}: ${message2}`;
    }
    super(message2, { cause });
    this.code = code;
    this.rawCode = rawCode;
    this.name = "LibsqlError";
  }
};
__name(LibsqlError, "LibsqlError");

// node_modules/@libsql/core/lib-esm/config.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/core/lib-esm/uri.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function parseUri(text) {
  const match2 = URI_RE.exec(text);
  if (match2 === null) {
    throw new LibsqlError(`The URL '${text}' is not in a valid format`, "URL_INVALID");
  }
  const groups = match2.groups;
  const scheme = groups["scheme"];
  const authority = groups["authority"] !== void 0 ? parseAuthority(groups["authority"]) : void 0;
  const path = percentDecode(groups["path"]);
  const query = groups["query"] !== void 0 ? parseQuery(groups["query"]) : void 0;
  const fragment = groups["fragment"] !== void 0 ? percentDecode(groups["fragment"]) : void 0;
  return { scheme, authority, path, query, fragment };
}
__name(parseUri, "parseUri");
var URI_RE = (() => {
  const SCHEME = "(?<scheme>[A-Za-z][A-Za-z.+-]*)";
  const AUTHORITY = "(?<authority>[^/?#]*)";
  const PATH = "(?<path>[^?#]*)";
  const QUERY = "(?<query>[^#]*)";
  const FRAGMENT = "(?<fragment>.*)";
  return new RegExp(`^${SCHEME}:(//${AUTHORITY})?${PATH}(\\?${QUERY})?(#${FRAGMENT})?$`, "su");
})();
function parseAuthority(text) {
  const match2 = AUTHORITY_RE.exec(text);
  if (match2 === null) {
    throw new LibsqlError("The authority part of the URL is not in a valid format", "URL_INVALID");
  }
  const groups = match2.groups;
  const host = percentDecode(groups["host_br"] ?? groups["host"]);
  const port = groups["port"] ? parseInt(groups["port"], 10) : void 0;
  const userinfo = groups["username"] !== void 0 ? {
    username: percentDecode(groups["username"]),
    password: groups["password"] !== void 0 ? percentDecode(groups["password"]) : void 0
  } : void 0;
  return { host, port, userinfo };
}
__name(parseAuthority, "parseAuthority");
var AUTHORITY_RE = (() => {
  return new RegExp(`^((?<username>[^:]*)(:(?<password>.*))?@)?((?<host>[^:\\[\\]]*)|(\\[(?<host_br>[^\\[\\]]*)\\]))(:(?<port>[0-9]*))?$`, "su");
})();
function parseQuery(text) {
  const sequences = text.split("&");
  const pairs = [];
  for (const sequence of sequences) {
    if (sequence === "") {
      continue;
    }
    let key;
    let value;
    const splitIdx = sequence.indexOf("=");
    if (splitIdx < 0) {
      key = sequence;
      value = "";
    } else {
      key = sequence.substring(0, splitIdx);
      value = sequence.substring(splitIdx + 1);
    }
    pairs.push({
      key: percentDecode(key.replaceAll("+", " ")),
      value: percentDecode(value.replaceAll("+", " "))
    });
  }
  return { pairs };
}
__name(parseQuery, "parseQuery");
function percentDecode(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    if (e instanceof URIError) {
      throw new LibsqlError(`URL component has invalid percent encoding: ${e}`, "URL_INVALID", void 0, e);
    }
    throw e;
  }
}
__name(percentDecode, "percentDecode");
function encodeBaseUrl(scheme, authority, path) {
  if (authority === void 0) {
    throw new LibsqlError(`URL with scheme ${JSON.stringify(scheme + ":")} requires authority (the "//" part)`, "URL_INVALID");
  }
  const schemeText = `${scheme}:`;
  const hostText = encodeHost(authority.host);
  const portText = encodePort(authority.port);
  const userinfoText = encodeUserinfo(authority.userinfo);
  const authorityText = `//${userinfoText}${hostText}${portText}`;
  let pathText = path.split("/").map(encodeURIComponent).join("/");
  if (pathText !== "" && !pathText.startsWith("/")) {
    pathText = "/" + pathText;
  }
  return new URL(`${schemeText}${authorityText}${pathText}`);
}
__name(encodeBaseUrl, "encodeBaseUrl");
function encodeHost(host) {
  return host.includes(":") ? `[${encodeURI(host)}]` : encodeURI(host);
}
__name(encodeHost, "encodeHost");
function encodePort(port) {
  return port !== void 0 ? `:${port}` : "";
}
__name(encodePort, "encodePort");
function encodeUserinfo(userinfo) {
  if (userinfo === void 0) {
    return "";
  }
  const usernameText = encodeURIComponent(userinfo.username);
  const passwordText = userinfo.password !== void 0 ? `:${encodeURIComponent(userinfo.password)}` : "";
  return `${usernameText}${passwordText}@`;
}
__name(encodeUserinfo, "encodeUserinfo");

// node_modules/@libsql/core/lib-esm/util.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/js-base64/base64.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var version2 = "3.9.3";
var VERSION = version2;
var _TD = typeof TextDecoder === "function" ? new TextDecoder("utf-8", { ignoreBOM: true }) : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = /* @__PURE__ */ __name((src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_"), "_mkUriSafe");
var _tidyB64 = /* @__PURE__ */ __name((s) => s.replace(/[^A-Za-z0-9\+\/]/g, ""), "_tidyB64");
var btoaPolyfill = /* @__PURE__ */ __name((bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
}, "btoaPolyfill");
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : btoaPolyfill;
var _fromUint8Array = typeof Uint8Array.prototype.toBase64 === "function" ? (u8a) => u8a.toBase64() : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = /* @__PURE__ */ __name((u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a), "fromUint8Array");
var cb_utob = /* @__PURE__ */ __name((c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
}, "cb_utob");
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\x00-\x7F]/g;
var utob = /* @__PURE__ */ __name((u) => u.replace(re_utob, cb_utob), "utob");
var _encode = _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = /* @__PURE__ */ __name((src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src), "encode");
var encodeURI2 = /* @__PURE__ */ __name((src) => encode(src, true), "encodeURI");
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = /* @__PURE__ */ __name((cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
}, "cb_btou");
var btou = /* @__PURE__ */ __name((b) => b.replace(re_btou, cb_btou), "btou");
var atobPolyfill = /* @__PURE__ */ __name((asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, r1, r2;
  let binArray = [];
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    if (r1 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255));
    } else if (r2 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
    } else {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
    }
  }
  return binArray.join("");
}, "atobPolyfill");
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : atobPolyfill;
var _toUint8Array = typeof Uint8Array.fromBase64 === "function" ? (a) => Uint8Array.fromBase64(a) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var toUint8Array = /* @__PURE__ */ __name((a) => _toUint8Array(_unURI(a)), "toUint8Array");
var _decode = _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = /* @__PURE__ */ __name((a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/")), "_unURI");
var decode = /* @__PURE__ */ __name((src) => _decode(_unURI(src)), "decode");
var isValid2 = /* @__PURE__ */ __name((src) => {
  if (typeof src !== "string")
    return false;
  const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
}, "isValid");
var _noEnum = /* @__PURE__ */ __name((v) => {
  return {
    value: v,
    enumerable: false,
    writable: true,
    configurable: true
  };
}, "_noEnum");
var extendString = /* @__PURE__ */ __name(function() {
  const _add = /* @__PURE__ */ __name((name, body) => Object.defineProperty(String.prototype, name, _noEnum(body)), "_add");
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
}, "extendString");
var extendUint8Array = /* @__PURE__ */ __name(function() {
  const _add = /* @__PURE__ */ __name((name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body)), "_add");
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
}, "extendUint8Array");
var extendBuiltins = /* @__PURE__ */ __name(() => {
  extendString();
  extendUint8Array();
}, "extendBuiltins");
var gBase64 = {
  version: version2,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI: encodeURI2,
  encodeURL: encodeURI2,
  utob,
  btou,
  decode,
  isValid: isValid2,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};

// node_modules/@libsql/core/lib-esm/util.js
var supportedUrlLink = "https://github.com/libsql/libsql-client-ts#supported-urls";
function transactionModeToBegin(mode) {
  if (mode === "write") {
    return "BEGIN IMMEDIATE";
  } else if (mode === "read") {
    return "BEGIN TRANSACTION READONLY";
  } else if (mode === "deferred") {
    return "BEGIN DEFERRED";
  } else {
    throw RangeError('Unknown transaction mode, supported values are "write", "read" and "deferred"');
  }
}
__name(transactionModeToBegin, "transactionModeToBegin");
var ResultSetImpl = class {
  columns;
  columnTypes;
  rows;
  rowsAffected;
  lastInsertRowid;
  constructor(columns, columnTypes, rows, rowsAffected, lastInsertRowid) {
    this.columns = columns;
    this.columnTypes = columnTypes;
    this.rows = rows;
    this.rowsAffected = rowsAffected;
    this.lastInsertRowid = lastInsertRowid;
  }
  toJSON() {
    return {
      columns: this.columns,
      columnTypes: this.columnTypes,
      rows: this.rows.map(rowToJson),
      rowsAffected: this.rowsAffected,
      lastInsertRowid: this.lastInsertRowid !== void 0 ? "" + this.lastInsertRowid : null
    };
  }
};
__name(ResultSetImpl, "ResultSetImpl");
function rowToJson(row) {
  return Array.prototype.map.call(row, valueToJson);
}
__name(rowToJson, "rowToJson");
function valueToJson(value) {
  if (typeof value === "bigint") {
    return "" + value;
  } else if (value instanceof ArrayBuffer) {
    return gBase64.fromUint8Array(new Uint8Array(value));
  } else {
    return value;
  }
}
__name(valueToJson, "valueToJson");

// node_modules/@libsql/core/lib-esm/config.js
var inMemoryMode = ":memory:";
function expandConfig(config2, preferHttp) {
  if (typeof config2 !== "object") {
    throw new TypeError(`Expected client configuration as object, got ${typeof config2}`);
  }
  let { url, authToken, tls, intMode, concurrency } = config2;
  concurrency = Math.max(0, concurrency || 20);
  intMode ??= "number";
  let connectionQueryParams = [];
  if (url === inMemoryMode) {
    url = "file::memory:";
  }
  const uri = parseUri(url);
  const originalUriScheme = uri.scheme.toLowerCase();
  const isInMemoryMode = originalUriScheme === "file" && uri.path === inMemoryMode && uri.authority === void 0;
  let queryParamsDef;
  if (isInMemoryMode) {
    queryParamsDef = {
      cache: {
        values: ["shared", "private"],
        update: (key, value) => connectionQueryParams.push(`${key}=${value}`)
      }
    };
  } else {
    queryParamsDef = {
      tls: {
        values: ["0", "1"],
        update: (_, value) => tls = value === "1"
      },
      authToken: {
        update: (_, value) => authToken = value
      }
    };
  }
  for (const { key, value } of uri.query?.pairs ?? []) {
    if (!Object.hasOwn(queryParamsDef, key)) {
      throw new LibsqlError(`Unsupported URL query parameter ${JSON.stringify(key)}`, "URL_PARAM_NOT_SUPPORTED");
    }
    const queryParamDef = queryParamsDef[key];
    if (queryParamDef.values !== void 0 && !queryParamDef.values.includes(value)) {
      throw new LibsqlError(`Unknown value for the "${key}" query argument: ${JSON.stringify(value)}. Supported values are: [${queryParamDef.values.map((x) => '"' + x + '"').join(", ")}]`, "URL_INVALID");
    }
    if (queryParamDef.update !== void 0) {
      queryParamDef?.update(key, value);
    }
  }
  const connectionQueryParamsString = connectionQueryParams.length === 0 ? "" : `?${connectionQueryParams.join("&")}`;
  const path = uri.path + connectionQueryParamsString;
  let scheme;
  if (originalUriScheme === "libsql") {
    if (tls === false) {
      if (uri.authority?.port === void 0) {
        throw new LibsqlError('A "libsql:" URL with ?tls=0 must specify an explicit port', "URL_INVALID");
      }
      scheme = preferHttp ? "http" : "ws";
    } else {
      scheme = preferHttp ? "https" : "wss";
    }
  } else {
    scheme = originalUriScheme;
  }
  if (scheme === "http" || scheme === "ws") {
    tls ??= false;
  } else {
    tls ??= true;
  }
  if (scheme !== "http" && scheme !== "ws" && scheme !== "https" && scheme !== "wss" && scheme !== "file") {
    throw new LibsqlError(`The client supports only "libsql:", "wss:", "ws:", "https:", "http:" and "file:" URLs, got ${JSON.stringify(uri.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (intMode !== "number" && intMode !== "bigint" && intMode !== "string") {
    throw new TypeError(`Invalid value for intMode, expected "number", "bigint" or "string", got ${JSON.stringify(intMode)}`);
  }
  if (uri.fragment !== void 0) {
    throw new LibsqlError(`URL fragments are not supported: ${JSON.stringify("#" + uri.fragment)}`, "URL_INVALID");
  }
  if (isInMemoryMode) {
    return {
      scheme: "file",
      tls: false,
      path,
      intMode,
      concurrency,
      syncUrl: config2.syncUrl,
      syncInterval: config2.syncInterval,
      fetch: config2.fetch,
      authToken: void 0,
      encryptionKey: void 0,
      authority: void 0
    };
  }
  return {
    scheme,
    tls,
    authority: uri.authority,
    path,
    authToken,
    intMode,
    concurrency,
    encryptionKey: config2.encryptionKey,
    syncUrl: config2.syncUrl,
    syncInterval: config2.syncInterval,
    fetch: config2.fetch
  };
}
__name(expandConfig, "expandConfig");

// node_modules/@libsql/client/lib-esm/ws.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/isomorphic-ws/web.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var _WebSocket;
if (typeof WebSocket !== "undefined") {
  _WebSocket = WebSocket;
} else if (typeof global !== "undefined") {
  _WebSocket = global.WebSocket;
} else if (typeof window !== "undefined") {
  _WebSocket = window.WebSocket;
} else if (typeof self !== "undefined") {
  _WebSocket = self.WebSocket;
}

// node_modules/@libsql/hrana-client/lib-esm/ws/client.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/client.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Client = class {
  /** @private */
  constructor() {
    this.intMode = "number";
  }
  /** Representation of integers returned from the database. See {@link IntMode}.
   *
   * This value is inherited by {@link Stream} objects created with {@link openStream}, but you can
   * override the integer mode for every stream by setting {@link Stream.intMode} on the stream.
   */
  intMode;
};
__name(Client, "Client");

// node_modules/@libsql/hrana-client/lib-esm/encoding/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/errors.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var ClientError = class extends Error {
  /** @private */
  constructor(message2) {
    super(message2);
    this.name = "ClientError";
  }
};
__name(ClientError, "ClientError");
var ProtoError = class extends ClientError {
  /** @private */
  constructor(message2) {
    super(message2);
    this.name = "ProtoError";
  }
};
__name(ProtoError, "ProtoError");
var ResponseError = class extends ClientError {
  code;
  /** @internal */
  proto;
  /** @private */
  constructor(message2, protoError) {
    super(message2);
    this.name = "ResponseError";
    this.code = protoError.code;
    this.proto = protoError;
    this.stack = void 0;
  }
};
__name(ResponseError, "ResponseError");
var ClosedError = class extends ClientError {
  /** @private */
  constructor(message2, cause) {
    if (cause !== void 0) {
      super(`${message2}: ${cause}`);
      this.cause = cause;
    } else {
      super(message2);
    }
    this.name = "ClosedError";
  }
};
__name(ClosedError, "ClosedError");
var WebSocketUnsupportedError = class extends ClientError {
  /** @private */
  constructor(message2) {
    super(message2);
    this.name = "WebSocketUnsupportedError";
  }
};
__name(WebSocketUnsupportedError, "WebSocketUnsupportedError");
var WebSocketError = class extends ClientError {
  /** @private */
  constructor(message2) {
    super(message2);
    this.name = "WebSocketError";
  }
};
__name(WebSocketError, "WebSocketError");
var HttpServerError = class extends ClientError {
  status;
  /** @private */
  constructor(message2, status) {
    super(message2);
    this.status = status;
    this.name = "HttpServerError";
  }
};
__name(HttpServerError, "HttpServerError");
var ProtocolVersionError = class extends ClientError {
  /** @private */
  constructor(message2) {
    super(message2);
    this.name = "ProtocolVersionError";
  }
};
__name(ProtocolVersionError, "ProtocolVersionError");
var InternalError = class extends ClientError {
  /** @private */
  constructor(message2) {
    super(message2);
    this.name = "InternalError";
  }
};
__name(InternalError, "InternalError");
var MisuseError = class extends ClientError {
  /** @private */
  constructor(message2) {
    super(message2);
    this.name = "MisuseError";
  }
};
__name(MisuseError, "MisuseError");

// node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js
function string(value) {
  if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string");
}
__name(string, "string");
function stringOpt(value) {
  if (value === null || value === void 0) {
    return void 0;
  } else if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string or null");
}
__name(stringOpt, "stringOpt");
function number(value) {
  if (typeof value === "number") {
    return value;
  }
  throw typeError(value, "number");
}
__name(number, "number");
function boolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  throw typeError(value, "boolean");
}
__name(boolean, "boolean");
function array(value) {
  if (Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "array");
}
__name(array, "array");
function object(value) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "object");
}
__name(object, "object");
function arrayObjectsMap(value, fun) {
  return array(value).map((elemValue) => fun(object(elemValue)));
}
__name(arrayObjectsMap, "arrayObjectsMap");
function typeError(value, expected) {
  if (value === void 0) {
    return new ProtoError(`Expected ${expected}, but the property was missing`);
  }
  let received = typeof value;
  if (value === null) {
    received = "null";
  } else if (Array.isArray(value)) {
    received = "array";
  }
  return new ProtoError(`Expected ${expected}, received ${received}`);
}
__name(typeError, "typeError");
function readJsonObject(value, fun) {
  return fun(object(value));
}
__name(readJsonObject, "readJsonObject");

// node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var ObjectWriter = class {
  #output;
  #isFirst;
  constructor(output) {
    this.#output = output;
    this.#isFirst = false;
  }
  begin() {
    this.#output.push("{");
    this.#isFirst = true;
  }
  end() {
    this.#output.push("}");
    this.#isFirst = false;
  }
  #key(name) {
    if (this.#isFirst) {
      this.#output.push('"');
      this.#isFirst = false;
    } else {
      this.#output.push(',"');
    }
    this.#output.push(name);
    this.#output.push('":');
  }
  string(name, value) {
    this.#key(name);
    this.#output.push(JSON.stringify(value));
  }
  stringRaw(name, value) {
    this.#key(name);
    this.#output.push('"');
    this.#output.push(value);
    this.#output.push('"');
  }
  number(name, value) {
    this.#key(name);
    this.#output.push("" + value);
  }
  boolean(name, value) {
    this.#key(name);
    this.#output.push(value ? "true" : "false");
  }
  object(name, value, valueFun) {
    this.#key(name);
    this.begin();
    valueFun(this, value);
    this.end();
  }
  arrayObjects(name, values, valueFun) {
    this.#key(name);
    this.#output.push("[");
    for (let i = 0; i < values.length; ++i) {
      if (i !== 0) {
        this.#output.push(",");
      }
      this.begin();
      valueFun(this, values[i]);
      this.end();
    }
    this.#output.push("]");
  }
};
__name(ObjectWriter, "ObjectWriter");
function writeJsonObject(value, fun) {
  const output = [];
  const writer = new ObjectWriter(output);
  writer.begin();
  fun(writer, value);
  writer.end();
  return output.join("");
}
__name(writeJsonObject, "writeJsonObject");

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/util.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var VARINT = 0;
var FIXED_64 = 1;
var LENGTH_DELIMITED = 2;
var FIXED_32 = 5;

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js
var MessageReader = class {
  #array;
  #view;
  #pos;
  constructor(array2) {
    this.#array = array2;
    this.#view = new DataView(array2.buffer, array2.byteOffset, array2.byteLength);
    this.#pos = 0;
  }
  varint() {
    let value = 0;
    for (let shift = 0; ; shift += 7) {
      const byte = this.#array[this.#pos++];
      value |= (byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  varintBig() {
    let value = 0n;
    for (let shift = 0n; ; shift += 7n) {
      const byte = this.#array[this.#pos++];
      value |= BigInt(byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  bytes(length) {
    const array2 = new Uint8Array(this.#array.buffer, this.#array.byteOffset + this.#pos, length);
    this.#pos += length;
    return array2;
  }
  double() {
    const value = this.#view.getFloat64(this.#pos, true);
    this.#pos += 8;
    return value;
  }
  skipVarint() {
    for (; ; ) {
      const byte = this.#array[this.#pos++];
      if (!(byte & 128)) {
        break;
      }
    }
  }
  skip(count3) {
    this.#pos += count3;
  }
  eof() {
    return this.#pos >= this.#array.byteLength;
  }
};
__name(MessageReader, "MessageReader");
var FieldReader = class {
  #reader;
  #wireType;
  constructor(reader) {
    this.#reader = reader;
    this.#wireType = -1;
  }
  setup(wireType) {
    this.#wireType = wireType;
  }
  #expect(expectedWireType) {
    if (this.#wireType !== expectedWireType) {
      throw new ProtoError(`Expected wire type ${expectedWireType}, got ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
  bytes() {
    this.#expect(LENGTH_DELIMITED);
    const length = this.#reader.varint();
    return this.#reader.bytes(length);
  }
  string() {
    return new TextDecoder().decode(this.bytes());
  }
  message(def) {
    return readProtobufMessage(this.bytes(), def);
  }
  int32() {
    this.#expect(VARINT);
    return this.#reader.varint();
  }
  uint32() {
    return this.int32();
  }
  bool() {
    return this.int32() !== 0;
  }
  uint64() {
    this.#expect(VARINT);
    return this.#reader.varintBig();
  }
  sint64() {
    const value = this.uint64();
    return value >> 1n ^ -(value & 1n);
  }
  double() {
    this.#expect(FIXED_64);
    return this.#reader.double();
  }
  maybeSkip() {
    if (this.#wireType < 0) {
      return;
    } else if (this.#wireType === VARINT) {
      this.#reader.skipVarint();
    } else if (this.#wireType === FIXED_64) {
      this.#reader.skip(8);
    } else if (this.#wireType === LENGTH_DELIMITED) {
      const length = this.#reader.varint();
      this.#reader.skip(length);
    } else if (this.#wireType === FIXED_32) {
      this.#reader.skip(4);
    } else {
      throw new ProtoError(`Unexpected wire type ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
};
__name(FieldReader, "FieldReader");
function readProtobufMessage(data, def) {
  const msgReader = new MessageReader(data);
  const fieldReader = new FieldReader(msgReader);
  let value = def.default();
  while (!msgReader.eof()) {
    const key = msgReader.varint();
    const tag2 = key >> 3;
    const wireType = key & 7;
    fieldReader.setup(wireType);
    const tagFun = def[tag2];
    if (tagFun !== void 0) {
      const returnedValue = tagFun(fieldReader, value);
      if (returnedValue !== void 0) {
        value = returnedValue;
      }
    }
    fieldReader.maybeSkip();
  }
  return value;
}
__name(readProtobufMessage, "readProtobufMessage");

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var MessageWriter = class {
  #buf;
  #array;
  #view;
  #pos;
  constructor() {
    this.#buf = new ArrayBuffer(256);
    this.#array = new Uint8Array(this.#buf);
    this.#view = new DataView(this.#buf);
    this.#pos = 0;
  }
  #ensure(extra) {
    if (this.#pos + extra <= this.#buf.byteLength) {
      return;
    }
    let newCap = this.#buf.byteLength;
    while (newCap < this.#pos + extra) {
      newCap *= 2;
    }
    const newBuf = new ArrayBuffer(newCap);
    const newArray = new Uint8Array(newBuf);
    const newView = new DataView(newBuf);
    newArray.set(new Uint8Array(this.#buf, 0, this.#pos));
    this.#buf = newBuf;
    this.#array = newArray;
    this.#view = newView;
  }
  #varint(value) {
    this.#ensure(5);
    value = 0 | value;
    do {
      let byte = value & 127;
      value >>>= 7;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #varintBig(value) {
    this.#ensure(10);
    value = value & 0xffffffffffffffffn;
    do {
      let byte = Number(value & 0x7fn);
      value >>= 7n;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #tag(tag2, wireType) {
    this.#varint(tag2 << 3 | wireType);
  }
  bytes(tag2, value) {
    this.#tag(tag2, LENGTH_DELIMITED);
    this.#varint(value.byteLength);
    this.#ensure(value.byteLength);
    this.#array.set(value, this.#pos);
    this.#pos += value.byteLength;
  }
  string(tag2, value) {
    this.bytes(tag2, new TextEncoder().encode(value));
  }
  message(tag2, value, fun) {
    const writer = new MessageWriter();
    fun(writer, value);
    this.bytes(tag2, writer.data());
  }
  int32(tag2, value) {
    this.#tag(tag2, VARINT);
    this.#varint(value);
  }
  uint32(tag2, value) {
    this.int32(tag2, value);
  }
  bool(tag2, value) {
    this.int32(tag2, value ? 1 : 0);
  }
  sint64(tag2, value) {
    this.#tag(tag2, VARINT);
    this.#varintBig(value << 1n ^ value >> 63n);
  }
  double(tag2, value) {
    this.#tag(tag2, FIXED_64);
    this.#ensure(8);
    this.#view.setFloat64(this.#pos, value, true);
    this.#pos += 8;
  }
  data() {
    return new Uint8Array(this.#buf, 0, this.#pos);
  }
};
__name(MessageWriter, "MessageWriter");
function writeProtobufMessage(value, fun) {
  const w = new MessageWriter();
  fun(w, value);
  return w.data();
}
__name(writeProtobufMessage, "writeProtobufMessage");

// node_modules/@libsql/hrana-client/lib-esm/id_alloc.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var IdAlloc = class {
  // Set of all allocated ids
  #usedIds;
  // Set of all free ids lower than `#usedIds.size`
  #freeIds;
  constructor() {
    this.#usedIds = /* @__PURE__ */ new Set();
    this.#freeIds = /* @__PURE__ */ new Set();
  }
  // Returns an id that was free, and marks it as used.
  alloc() {
    for (const freeId2 of this.#freeIds) {
      this.#freeIds.delete(freeId2);
      this.#usedIds.add(freeId2);
      if (!this.#usedIds.has(this.#usedIds.size - 1)) {
        this.#freeIds.add(this.#usedIds.size - 1);
      }
      return freeId2;
    }
    const freeId = this.#usedIds.size;
    this.#usedIds.add(freeId);
    return freeId;
  }
  free(id) {
    if (!this.#usedIds.delete(id)) {
      throw new InternalError("Freeing an id that is not allocated");
    }
    this.#freeIds.delete(this.#usedIds.size);
    if (id < this.#usedIds.size) {
      this.#freeIds.add(id);
    }
  }
};
__name(IdAlloc, "IdAlloc");

// node_modules/@libsql/hrana-client/lib-esm/result.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/value.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/util.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function impossible(value, message2) {
  throw new InternalError(message2);
}
__name(impossible, "impossible");

// node_modules/@libsql/hrana-client/lib-esm/value.js
function valueToProto(value) {
  if (value === null) {
    return null;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
    }
    return value;
  } else if (typeof value === "bigint") {
    if (value < minInteger || value > maxInteger) {
      throw new RangeError("This bigint value is too large to be represented as a 64-bit integer and passed as argument");
    }
    return value;
  } else if (typeof value === "boolean") {
    return value ? 1n : 0n;
  } else if (value instanceof ArrayBuffer) {
    return new Uint8Array(value);
  } else if (value instanceof Uint8Array) {
    return value;
  } else if (value instanceof Date) {
    return +value.valueOf();
  } else if (typeof value === "object") {
    return "" + value.toString();
  } else {
    throw new TypeError("Unsupported type of value");
  }
}
__name(valueToProto, "valueToProto");
var minInteger = -9223372036854775808n;
var maxInteger = 9223372036854775807n;
function valueFromProto(value, intMode) {
  if (value === null) {
    return null;
  } else if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "bigint") {
    if (intMode === "number") {
      const num = Number(value);
      if (!Number.isSafeInteger(num)) {
        throw new RangeError("Received integer which is too large to be safely represented as a JavaScript number");
      }
      return num;
    } else if (intMode === "bigint") {
      return value;
    } else if (intMode === "string") {
      return "" + value;
    } else {
      throw new MisuseError("Invalid value for IntMode");
    }
  } else if (value instanceof Uint8Array) {
    return value.slice().buffer;
  } else if (value === void 0) {
    throw new ProtoError("Received unrecognized type of Value");
  } else {
    throw impossible(value, "Impossible type of Value");
  }
}
__name(valueFromProto, "valueFromProto");

// node_modules/@libsql/hrana-client/lib-esm/result.js
function stmtResultFromProto(result) {
  return {
    affectedRowCount: result.affectedRowCount,
    lastInsertRowid: result.lastInsertRowid,
    columnNames: result.cols.map((col) => col.name),
    columnDecltypes: result.cols.map((col) => col.decltype)
  };
}
__name(stmtResultFromProto, "stmtResultFromProto");
function rowsResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  const rows = result.rows.map((row) => rowFromProto(stmtResult.columnNames, row, intMode));
  return { ...stmtResult, rows };
}
__name(rowsResultFromProto, "rowsResultFromProto");
function rowResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let row;
  if (result.rows.length > 0) {
    row = rowFromProto(stmtResult.columnNames, result.rows[0], intMode);
  }
  return { ...stmtResult, row };
}
__name(rowResultFromProto, "rowResultFromProto");
function valueResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let value;
  if (result.rows.length > 0 && stmtResult.columnNames.length > 0) {
    value = valueFromProto(result.rows[0][0], intMode);
  }
  return { ...stmtResult, value };
}
__name(valueResultFromProto, "valueResultFromProto");
function rowFromProto(colNames, values, intMode) {
  const row = {};
  Object.defineProperty(row, "length", { value: values.length });
  for (let i = 0; i < values.length; ++i) {
    const value = valueFromProto(values[i], intMode);
    Object.defineProperty(row, i, { value });
    const colName = colNames[i];
    if (colName !== void 0 && !Object.hasOwn(row, colName)) {
      Object.defineProperty(row, colName, { value, enumerable: true, configurable: true, writable: true });
    }
  }
  return row;
}
__name(rowFromProto, "rowFromProto");
function errorFromProto(error3) {
  return new ResponseError(error3.message, error3);
}
__name(errorFromProto, "errorFromProto");

// node_modules/@libsql/hrana-client/lib-esm/sql.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Sql = class {
  #owner;
  #sqlId;
  #closed;
  /** @private */
  constructor(owner, sqlId) {
    this.#owner = owner;
    this.#sqlId = sqlId;
    this.#closed = void 0;
  }
  /** @private */
  _getSqlId(owner) {
    if (this.#owner !== owner) {
      throw new MisuseError("Attempted to use SQL text opened with other object");
    } else if (this.#closed !== void 0) {
      throw new ClosedError("SQL text is closed", this.#closed);
    }
    return this.#sqlId;
  }
  /** Remove the SQL text from the server, releasing resouces. */
  close() {
    this._setClosed(new ClientError("SQL text was manually closed"));
  }
  /** @private */
  _setClosed(error3) {
    if (this.#closed === void 0) {
      this.#closed = error3;
      this.#owner._closeSql(this.#sqlId);
    }
  }
  /** True if the SQL text is closed (removed from the server). */
  get closed() {
    return this.#closed !== void 0;
  }
};
__name(Sql, "Sql");
function sqlToProto(owner, sql) {
  if (sql instanceof Sql) {
    return { sqlId: sql._getSqlId(owner) };
  } else {
    return { sql: "" + sql };
  }
}
__name(sqlToProto, "sqlToProto");

// node_modules/@libsql/hrana-client/lib-esm/ws/stream.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/queue.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Queue = class {
  #pushStack;
  #shiftStack;
  constructor() {
    this.#pushStack = [];
    this.#shiftStack = [];
  }
  get length() {
    return this.#pushStack.length + this.#shiftStack.length;
  }
  push(elem) {
    this.#pushStack.push(elem);
  }
  shift() {
    if (this.#shiftStack.length === 0 && this.#pushStack.length > 0) {
      this.#shiftStack = this.#pushStack.reverse();
      this.#pushStack = [];
    }
    return this.#shiftStack.pop();
  }
  first() {
    return this.#shiftStack.length !== 0 ? this.#shiftStack[this.#shiftStack.length - 1] : this.#pushStack[0];
  }
};
__name(Queue, "Queue");

// node_modules/@libsql/hrana-client/lib-esm/stream.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/batch.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/stmt.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Stmt = class {
  /** The SQL statement text. */
  sql;
  /** @private */
  _args;
  /** @private */
  _namedArgs;
  /** Initialize the statement with given SQL text. */
  constructor(sql) {
    this.sql = sql;
    this._args = [];
    this._namedArgs = /* @__PURE__ */ new Map();
  }
  /** Binds positional parameters from the given `values`. All previous positional bindings are cleared. */
  bindIndexes(values) {
    this._args.length = 0;
    for (const value of values) {
      this._args.push(valueToProto(value));
    }
    return this;
  }
  /** Binds a parameter by a 1-based index. */
  bindIndex(index, value) {
    if (index !== (index | 0) || index <= 0) {
      throw new RangeError("Index of a positional argument must be positive integer");
    }
    while (this._args.length < index) {
      this._args.push(null);
    }
    this._args[index - 1] = valueToProto(value);
    return this;
  }
  /** Binds a parameter by name. */
  bindName(name, value) {
    this._namedArgs.set(name, valueToProto(value));
    return this;
  }
  /** Clears all bindings. */
  unbindAll() {
    this._args.length = 0;
    this._namedArgs.clear();
    return this;
  }
};
__name(Stmt, "Stmt");
function stmtToProto(sqlOwner, stmt, wantRows) {
  let inSql;
  let args = [];
  let namedArgs = [];
  if (stmt instanceof Stmt) {
    inSql = stmt.sql;
    args = stmt._args;
    for (const [name, value] of stmt._namedArgs.entries()) {
      namedArgs.push({ name, value });
    }
  } else if (Array.isArray(stmt)) {
    inSql = stmt[0];
    if (Array.isArray(stmt[1])) {
      args = stmt[1].map((arg) => valueToProto(arg));
    } else {
      namedArgs = Object.entries(stmt[1]).map(([name, value]) => {
        return { name, value: valueToProto(value) };
      });
    }
  } else {
    inSql = stmt;
  }
  const { sql, sqlId } = sqlToProto(sqlOwner, inSql);
  return { sql, sqlId, args, namedArgs, wantRows };
}
__name(stmtToProto, "stmtToProto");

// node_modules/@libsql/hrana-client/lib-esm/batch.js
var Batch = class {
  /** @private */
  _stream;
  #useCursor;
  /** @private */
  _steps;
  #executed;
  /** @private */
  constructor(stream, useCursor) {
    this._stream = stream;
    this.#useCursor = useCursor;
    this._steps = [];
    this.#executed = false;
  }
  /** Return a builder for adding a step to the batch. */
  step() {
    return new BatchStep(this);
  }
  /** Execute the batch. */
  execute() {
    if (this.#executed) {
      throw new MisuseError("This batch has already been executed");
    }
    this.#executed = true;
    const batch = {
      steps: this._steps.map((step) => step.proto)
    };
    if (this.#useCursor) {
      return executeCursor(this._stream, this._steps, batch);
    } else {
      return executeRegular(this._stream, this._steps, batch);
    }
  }
};
__name(Batch, "Batch");
function executeRegular(stream, steps, batch) {
  return stream._batch(batch).then((result) => {
    for (let step = 0; step < steps.length; ++step) {
      const stepResult = result.stepResults.get(step);
      const stepError = result.stepErrors.get(step);
      steps[step].callback(stepResult, stepError);
    }
  });
}
__name(executeRegular, "executeRegular");
async function executeCursor(stream, steps, batch) {
  const cursor = await stream._openCursor(batch);
  try {
    let nextStep = 0;
    let beginEntry = void 0;
    let rows = [];
    for (; ; ) {
      const entry = await cursor.next();
      if (entry === void 0) {
        break;
      }
      if (entry.type === "step_begin") {
        if (entry.step < nextStep || entry.step >= steps.length) {
          throw new ProtoError("Server produced StepBeginEntry for unexpected step");
        } else if (beginEntry !== void 0) {
          throw new ProtoError("Server produced StepBeginEntry before terminating previous step");
        }
        for (let step = nextStep; step < entry.step; ++step) {
          steps[step].callback(void 0, void 0);
        }
        nextStep = entry.step + 1;
        beginEntry = entry;
        rows = [];
      } else if (entry.type === "step_end") {
        if (beginEntry === void 0) {
          throw new ProtoError("Server produced StepEndEntry but no step is active");
        }
        const stmtResult = {
          cols: beginEntry.cols,
          rows,
          affectedRowCount: entry.affectedRowCount,
          lastInsertRowid: entry.lastInsertRowid
        };
        steps[beginEntry.step].callback(stmtResult, void 0);
        beginEntry = void 0;
        rows = [];
      } else if (entry.type === "step_error") {
        if (beginEntry === void 0) {
          if (entry.step >= steps.length) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          for (let step = nextStep; step < entry.step; ++step) {
            steps[step].callback(void 0, void 0);
          }
        } else {
          if (entry.step !== beginEntry.step) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          beginEntry = void 0;
          rows = [];
        }
        steps[entry.step].callback(void 0, entry.error);
        nextStep = entry.step + 1;
      } else if (entry.type === "row") {
        if (beginEntry === void 0) {
          throw new ProtoError("Server produced RowEntry but no step is active");
        }
        rows.push(entry.row);
      } else if (entry.type === "error") {
        throw errorFromProto(entry.error);
      } else if (entry.type === "none") {
        throw new ProtoError("Server produced unrecognized CursorEntry");
      } else {
        throw impossible(entry, "Impossible CursorEntry");
      }
    }
    if (beginEntry !== void 0) {
      throw new ProtoError("Server closed Cursor before terminating active step");
    }
    for (let step = nextStep; step < steps.length; ++step) {
      steps[step].callback(void 0, void 0);
    }
  } finally {
    cursor.close();
  }
}
__name(executeCursor, "executeCursor");
var BatchStep = class {
  /** @private */
  _batch;
  #conds;
  /** @private */
  _index;
  /** @private */
  constructor(batch) {
    this._batch = batch;
    this.#conds = [];
    this._index = void 0;
  }
  /** Add the condition that needs to be satisfied to execute the statement. If you use this method multiple
   * times, we join the conditions with a logical AND. */
  condition(cond) {
    this.#conds.push(cond._proto);
    return this;
  }
  /** Add a statement that returns rows. */
  query(stmt) {
    return this.#add(stmt, true, rowsResultFromProto);
  }
  /** Add a statement that returns at most a single row. */
  queryRow(stmt) {
    return this.#add(stmt, true, rowResultFromProto);
  }
  /** Add a statement that returns at most a single value. */
  queryValue(stmt) {
    return this.#add(stmt, true, valueResultFromProto);
  }
  /** Add a statement without returning rows. */
  run(stmt) {
    return this.#add(stmt, false, stmtResultFromProto);
  }
  #add(inStmt, wantRows, fromProto) {
    if (this._index !== void 0) {
      throw new MisuseError("This BatchStep has already been added to the batch");
    }
    const stmt = stmtToProto(this._batch._stream._sqlOwner(), inStmt, wantRows);
    let condition;
    if (this.#conds.length === 0) {
      condition = void 0;
    } else if (this.#conds.length === 1) {
      condition = this.#conds[0];
    } else {
      condition = { type: "and", conds: this.#conds.slice() };
    }
    const proto = { stmt, condition };
    return new Promise((outputCallback, errorCallback) => {
      const callback = /* @__PURE__ */ __name((stepResult, stepError) => {
        if (stepResult !== void 0 && stepError !== void 0) {
          errorCallback(new ProtoError("Server returned both result and error"));
        } else if (stepError !== void 0) {
          errorCallback(errorFromProto(stepError));
        } else if (stepResult !== void 0) {
          outputCallback(fromProto(stepResult, this._batch._stream.intMode));
        } else {
          outputCallback(void 0);
        }
      }, "callback");
      this._index = this._batch._steps.length;
      this._batch._steps.push({ proto, callback });
    });
  }
};
__name(BatchStep, "BatchStep");
var BatchCond = class {
  /** @private */
  _batch;
  /** @private */
  _proto;
  /** @private */
  constructor(batch, proto) {
    this._batch = batch;
    this._proto = proto;
  }
  /** Create a condition that evaluates to true when the given step executes successfully.
   *
   * If the given step fails error or is skipped because its condition evaluated to false, this
   * condition evaluates to false.
   */
  static ok(step) {
    return new BatchCond(step._batch, { type: "ok", step: stepIndex(step) });
  }
  /** Create a condition that evaluates to true when the given step fails.
   *
   * If the given step succeeds or is skipped because its condition evaluated to false, this condition
   * evaluates to false.
   */
  static error(step) {
    return new BatchCond(step._batch, { type: "error", step: stepIndex(step) });
  }
  /** Create a condition that is a logical negation of another condition.
   */
  static not(cond) {
    return new BatchCond(cond._batch, { type: "not", cond: cond._proto });
  }
  /** Create a condition that is a logical AND of other conditions.
   */
  static and(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new BatchCond(batch, { type: "and", conds: conds.map((e) => e._proto) });
  }
  /** Create a condition that is a logical OR of other conditions.
   */
  static or(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new BatchCond(batch, { type: "or", conds: conds.map((e) => e._proto) });
  }
  /** Create a condition that evaluates to true when the SQL connection is in autocommit mode (not inside an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  static isAutocommit(batch) {
    batch._stream.client()._ensureVersion(3, "BatchCond.isAutocommit()");
    return new BatchCond(batch, { type: "is_autocommit" });
  }
};
__name(BatchCond, "BatchCond");
function stepIndex(step) {
  if (step._index === void 0) {
    throw new MisuseError("Cannot add a condition referencing a step that has not been added to the batch");
  }
  return step._index;
}
__name(stepIndex, "stepIndex");
function checkCondBatch(expectedBatch, cond) {
  if (cond._batch !== expectedBatch) {
    throw new MisuseError("Cannot mix BatchCond objects for different Batch objects");
  }
}
__name(checkCondBatch, "checkCondBatch");

// node_modules/@libsql/hrana-client/lib-esm/describe.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function describeResultFromProto(result) {
  return {
    paramNames: result.params.map((p) => p.name),
    columns: result.cols,
    isExplain: result.isExplain,
    isReadonly: result.isReadonly
  };
}
__name(describeResultFromProto, "describeResultFromProto");

// node_modules/@libsql/hrana-client/lib-esm/stream.js
var Stream = class {
  /** @private */
  constructor(intMode) {
    this.intMode = intMode;
  }
  /** Execute a statement and return rows. */
  query(stmt) {
    return this.#execute(stmt, true, rowsResultFromProto);
  }
  /** Execute a statement and return at most a single row. */
  queryRow(stmt) {
    return this.#execute(stmt, true, rowResultFromProto);
  }
  /** Execute a statement and return at most a single value. */
  queryValue(stmt) {
    return this.#execute(stmt, true, valueResultFromProto);
  }
  /** Execute a statement without returning rows. */
  run(stmt) {
    return this.#execute(stmt, false, stmtResultFromProto);
  }
  #execute(inStmt, wantRows, fromProto) {
    const stmt = stmtToProto(this._sqlOwner(), inStmt, wantRows);
    return this._execute(stmt).then((r) => fromProto(r, this.intMode));
  }
  /** Return a builder for creating and executing a batch.
   *
   * If `useCursor` is true, the batch will be executed using a Hrana cursor, which will stream results from
   * the server to the client, which consumes less memory on the server. This requires protocol version 3 or
   * higher.
   */
  batch(useCursor = false) {
    return new Batch(this, useCursor);
  }
  /** Parse and analyze a statement. This requires protocol version 2 or higher. */
  describe(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._describe(protoSql).then(describeResultFromProto);
  }
  /** Execute a sequence of statements separated by semicolons. This requires protocol version 2 or higher.
   * */
  sequence(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._sequence(protoSql);
  }
  /** Representation of integers returned from the database. See {@link IntMode}.
   *
   * This value affects the results of all operations on this stream.
   */
  intMode;
};
__name(Stream, "Stream");

// node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/cursor.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Cursor = class {
};
__name(Cursor, "Cursor");

// node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js
var fetchChunkSize = 1e3;
var fetchQueueSize = 10;
var WsCursor = class extends Cursor {
  #client;
  #stream;
  #cursorId;
  #entryQueue;
  #fetchQueue;
  #closed;
  #done;
  /** @private */
  constructor(client, stream, cursorId) {
    super();
    this.#client = client;
    this.#stream = stream;
    this.#cursorId = cursorId;
    this.#entryQueue = new Queue();
    this.#fetchQueue = new Queue();
    this.#closed = void 0;
    this.#done = false;
  }
  /** Fetch the next entry from the cursor. */
  async next() {
    for (; ; ) {
      if (this.#closed !== void 0) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      while (!this.#done && this.#fetchQueue.length < fetchQueueSize) {
        this.#fetchQueue.push(this.#fetch());
      }
      const entry = this.#entryQueue.shift();
      if (this.#done || entry !== void 0) {
        return entry;
      }
      await this.#fetchQueue.shift().then((response) => {
        if (response === void 0) {
          return;
        }
        for (const entry2 of response.entries) {
          this.#entryQueue.push(entry2);
        }
        this.#done ||= response.done;
      });
    }
  }
  #fetch() {
    return this.#stream._sendCursorRequest(this, {
      type: "fetch_cursor",
      cursorId: this.#cursorId,
      maxCount: fetchChunkSize
    }).then((resp) => resp, (error3) => {
      this._setClosed(error3);
      return void 0;
    });
  }
  /** @private */
  _setClosed(error3) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error3;
    this.#stream._sendCursorRequest(this, {
      type: "close_cursor",
      cursorId: this.#cursorId
    }).catch(() => void 0);
    this.#stream._cursorClosed(this);
  }
  /** Close the cursor. */
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  /** True if the cursor is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
};
__name(WsCursor, "WsCursor");

// node_modules/@libsql/hrana-client/lib-esm/ws/stream.js
var WsStream = class extends Stream {
  #client;
  #streamId;
  #queue;
  #cursor;
  #closing;
  #closed;
  /** @private */
  static open(client) {
    const streamId = client._streamIdAlloc.alloc();
    const stream = new WsStream(client, streamId);
    const responseCallback = /* @__PURE__ */ __name(() => void 0, "responseCallback");
    const errorCallback = /* @__PURE__ */ __name((e) => stream.#setClosed(e), "errorCallback");
    const request = { type: "open_stream", streamId };
    client._sendRequest(request, { responseCallback, errorCallback });
    return stream;
  }
  /** @private */
  constructor(client, streamId) {
    super(client.intMode);
    this.#client = client;
    this.#streamId = streamId;
    this.#queue = new Queue();
    this.#cursor = void 0;
    this.#closing = false;
    this.#closed = void 0;
  }
  /** Get the {@link WsClient} object that this stream belongs to. */
  client() {
    return this.#client;
  }
  /** @private */
  _sqlOwner() {
    return this.#client;
  }
  /** @private */
  _execute(stmt) {
    return this.#sendStreamRequest({
      type: "execute",
      streamId: this.#streamId,
      stmt
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _batch(batch) {
    return this.#sendStreamRequest({
      type: "batch",
      streamId: this.#streamId,
      batch
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _describe(protoSql) {
    this.#client._ensureVersion(2, "describe()");
    return this.#sendStreamRequest({
      type: "describe",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _sequence(protoSql) {
    this.#client._ensureVersion(2, "sequence()");
    return this.#sendStreamRequest({
      type: "sequence",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return void 0;
    });
  }
  /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit",
      streamId: this.#streamId
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "request", request, responseCallback, errorCallback });
    });
  }
  /** @private */
  _openCursor(batch) {
    this.#client._ensureVersion(3, "cursor");
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch, cursorCallback, errorCallback });
    });
  }
  /** @private */
  _sendCursorRequest(cursor, request) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor not associated with the stream attempted to execute a request");
    }
    return new Promise((responseCallback, errorCallback) => {
      if (this.#closed !== void 0) {
        errorCallback(new ClosedError("Stream is closed", this.#closed));
      } else {
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      }
    });
  }
  /** @private */
  _cursorClosed(cursor) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = void 0;
    this.#flushQueue();
  }
  #pushToQueue(entry) {
    if (this.#closed !== void 0) {
      entry.errorCallback(new ClosedError("Stream is closed", this.#closed));
    } else if (this.#closing) {
      entry.errorCallback(new ClosedError("Stream is closing", void 0));
    } else {
      this.#queue.push(entry);
      this.#flushQueue();
    }
  }
  #flushQueue() {
    for (; ; ) {
      const entry = this.#queue.first();
      if (entry === void 0 && this.#cursor === void 0 && this.#closing) {
        this.#setClosed(new ClientError("Stream was gracefully closed"));
        break;
      } else if (entry?.type === "request" && this.#cursor === void 0) {
        const { request, responseCallback, errorCallback } = entry;
        this.#queue.shift();
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      } else if (entry?.type === "cursor" && this.#cursor === void 0) {
        const { batch, cursorCallback } = entry;
        this.#queue.shift();
        const cursorId = this.#client._cursorIdAlloc.alloc();
        const cursor = new WsCursor(this.#client, this, cursorId);
        const request = {
          type: "open_cursor",
          streamId: this.#streamId,
          cursorId,
          batch
        };
        const responseCallback = /* @__PURE__ */ __name(() => void 0, "responseCallback");
        const errorCallback = /* @__PURE__ */ __name((e) => cursor._setClosed(e), "errorCallback");
        this.#client._sendRequest(request, { responseCallback, errorCallback });
        this.#cursor = cursor;
        cursorCallback(cursor);
      } else {
        break;
      }
    }
  }
  #setClosed(error3) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error3;
    if (this.#cursor !== void 0) {
      this.#cursor._setClosed(error3);
    }
    for (; ; ) {
      const entry = this.#queue.shift();
      if (entry !== void 0) {
        entry.errorCallback(error3);
      } else {
        break;
      }
    }
    const request = { type: "close_stream", streamId: this.#streamId };
    const responseCallback = /* @__PURE__ */ __name(() => this.#client._streamIdAlloc.free(this.#streamId), "responseCallback");
    const errorCallback = /* @__PURE__ */ __name(() => void 0, "errorCallback");
    this.#client._sendRequest(request, { responseCallback, errorCallback });
  }
  /** Immediately close the stream. */
  close() {
    this.#setClosed(new ClientError("Stream was manually closed"));
  }
  /** Gracefully close the stream. */
  closeGracefully() {
    this.#closing = true;
    this.#flushQueue();
  }
  /** True if the stream is closed or closing. */
  get closed() {
    return this.#closed !== void 0 || this.#closing;
  }
};
__name(WsStream, "WsStream");

// node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/shared/json_encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function Stmt2(w, msg) {
  if (msg.sql !== void 0) {
    w.string("sql", msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.number("sql_id", msg.sqlId);
  }
  w.arrayObjects("args", msg.args, Value);
  w.arrayObjects("named_args", msg.namedArgs, NamedArg);
  w.boolean("want_rows", msg.wantRows);
}
__name(Stmt2, "Stmt");
function NamedArg(w, msg) {
  w.string("name", msg.name);
  w.object("value", msg.value, Value);
}
__name(NamedArg, "NamedArg");
function Batch2(w, msg) {
  w.arrayObjects("steps", msg.steps, BatchStep2);
}
__name(Batch2, "Batch");
function BatchStep2(w, msg) {
  if (msg.condition !== void 0) {
    w.object("condition", msg.condition, BatchCond2);
  }
  w.object("stmt", msg.stmt, Stmt2);
}
__name(BatchStep2, "BatchStep");
function BatchCond2(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "ok" || msg.type === "error") {
    w.number("step", msg.step);
  } else if (msg.type === "not") {
    w.object("cond", msg.cond, BatchCond2);
  } else if (msg.type === "and" || msg.type === "or") {
    w.arrayObjects("conds", msg.conds, BatchCond2);
  } else if (msg.type === "is_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
}
__name(BatchCond2, "BatchCond");
function Value(w, msg) {
  if (msg === null) {
    w.stringRaw("type", "null");
  } else if (typeof msg === "bigint") {
    w.stringRaw("type", "integer");
    w.stringRaw("value", "" + msg);
  } else if (typeof msg === "number") {
    w.stringRaw("type", "float");
    w.number("value", msg);
  } else if (typeof msg === "string") {
    w.stringRaw("type", "text");
    w.string("value", msg);
  } else if (msg instanceof Uint8Array) {
    w.stringRaw("type", "blob");
    w.stringRaw("base64", gBase64.fromUint8Array(msg));
  } else if (msg === void 0) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
}
__name(Value, "Value");

// node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js
function ClientMsg(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "hello") {
    if (msg.jwt !== void 0) {
      w.string("jwt", msg.jwt);
    }
  } else if (msg.type === "request") {
    w.number("request_id", msg.requestId);
    w.object("request", msg.request, Request2);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
__name(ClientMsg, "ClientMsg");
function Request2(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "open_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "close_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "execute") {
    w.number("stream_id", msg.streamId);
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.number("stream_id", msg.streamId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "open_cursor") {
    w.number("stream_id", msg.streamId);
    w.number("cursor_id", msg.cursorId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "close_cursor") {
    w.number("cursor_id", msg.cursorId);
  } else if (msg.type === "fetch_cursor") {
    w.number("cursor_id", msg.cursorId);
    w.number("max_count", msg.maxCount);
  } else if (msg.type === "sequence") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
    w.number("stream_id", msg.streamId);
  } else {
    throw impossible(msg, "Impossible type of Request");
  }
}
__name(Request2, "Request");

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function Stmt3(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
  for (const arg of msg.args) {
    w.message(3, arg, Value2);
  }
  for (const arg of msg.namedArgs) {
    w.message(4, arg, NamedArg2);
  }
  w.bool(5, msg.wantRows);
}
__name(Stmt3, "Stmt");
function NamedArg2(w, msg) {
  w.string(1, msg.name);
  w.message(2, msg.value, Value2);
}
__name(NamedArg2, "NamedArg");
function Batch3(w, msg) {
  for (const step of msg.steps) {
    w.message(1, step, BatchStep3);
  }
}
__name(Batch3, "Batch");
function BatchStep3(w, msg) {
  if (msg.condition !== void 0) {
    w.message(1, msg.condition, BatchCond3);
  }
  w.message(2, msg.stmt, Stmt3);
}
__name(BatchStep3, "BatchStep");
function BatchCond3(w, msg) {
  if (msg.type === "ok") {
    w.uint32(1, msg.step);
  } else if (msg.type === "error") {
    w.uint32(2, msg.step);
  } else if (msg.type === "not") {
    w.message(3, msg.cond, BatchCond3);
  } else if (msg.type === "and") {
    w.message(4, msg.conds, BatchCondList);
  } else if (msg.type === "or") {
    w.message(5, msg.conds, BatchCondList);
  } else if (msg.type === "is_autocommit") {
    w.message(6, void 0, Empty);
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
}
__name(BatchCond3, "BatchCond");
function BatchCondList(w, msg) {
  for (const cond of msg) {
    w.message(1, cond, BatchCond3);
  }
}
__name(BatchCondList, "BatchCondList");
function Value2(w, msg) {
  if (msg === null) {
    w.message(1, void 0, Empty);
  } else if (typeof msg === "bigint") {
    w.sint64(2, msg);
  } else if (typeof msg === "number") {
    w.double(3, msg);
  } else if (typeof msg === "string") {
    w.string(4, msg);
  } else if (msg instanceof Uint8Array) {
    w.bytes(5, msg);
  } else if (msg === void 0) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
}
__name(Value2, "Value");
function Empty(_w, _msg) {
}
__name(Empty, "Empty");

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js
function ClientMsg2(w, msg) {
  if (msg.type === "hello") {
    w.message(1, msg, HelloMsg);
  } else if (msg.type === "request") {
    w.message(2, msg, RequestMsg);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
__name(ClientMsg2, "ClientMsg");
function HelloMsg(w, msg) {
  if (msg.jwt !== void 0) {
    w.string(1, msg.jwt);
  }
}
__name(HelloMsg, "HelloMsg");
function RequestMsg(w, msg) {
  w.int32(1, msg.requestId);
  const request = msg.request;
  if (request.type === "open_stream") {
    w.message(2, request, OpenStreamReq);
  } else if (request.type === "close_stream") {
    w.message(3, request, CloseStreamReq);
  } else if (request.type === "execute") {
    w.message(4, request, ExecuteReq);
  } else if (request.type === "batch") {
    w.message(5, request, BatchReq);
  } else if (request.type === "open_cursor") {
    w.message(6, request, OpenCursorReq);
  } else if (request.type === "close_cursor") {
    w.message(7, request, CloseCursorReq);
  } else if (request.type === "fetch_cursor") {
    w.message(8, request, FetchCursorReq);
  } else if (request.type === "sequence") {
    w.message(9, request, SequenceReq);
  } else if (request.type === "describe") {
    w.message(10, request, DescribeReq);
  } else if (request.type === "store_sql") {
    w.message(11, request, StoreSqlReq);
  } else if (request.type === "close_sql") {
    w.message(12, request, CloseSqlReq);
  } else if (request.type === "get_autocommit") {
    w.message(13, request, GetAutocommitReq);
  } else {
    throw impossible(request, "Impossible type of Request");
  }
}
__name(RequestMsg, "RequestMsg");
function OpenStreamReq(w, msg) {
  w.int32(1, msg.streamId);
}
__name(OpenStreamReq, "OpenStreamReq");
function CloseStreamReq(w, msg) {
  w.int32(1, msg.streamId);
}
__name(CloseStreamReq, "CloseStreamReq");
function ExecuteReq(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.stmt, Stmt3);
}
__name(ExecuteReq, "ExecuteReq");
function BatchReq(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.batch, Batch3);
}
__name(BatchReq, "BatchReq");
function OpenCursorReq(w, msg) {
  w.int32(1, msg.streamId);
  w.int32(2, msg.cursorId);
  w.message(3, msg.batch, Batch3);
}
__name(OpenCursorReq, "OpenCursorReq");
function CloseCursorReq(w, msg) {
  w.int32(1, msg.cursorId);
}
__name(CloseCursorReq, "CloseCursorReq");
function FetchCursorReq(w, msg) {
  w.int32(1, msg.cursorId);
  w.uint32(2, msg.maxCount);
}
__name(FetchCursorReq, "FetchCursorReq");
function SequenceReq(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== void 0) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(3, msg.sqlId);
  }
}
__name(SequenceReq, "SequenceReq");
function DescribeReq(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== void 0) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(3, msg.sqlId);
  }
}
__name(DescribeReq, "DescribeReq");
function StoreSqlReq(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
}
__name(StoreSqlReq, "StoreSqlReq");
function CloseSqlReq(w, msg) {
  w.int32(1, msg.sqlId);
}
__name(CloseSqlReq, "CloseSqlReq");
function GetAutocommitReq(w, msg) {
  w.int32(1, msg.streamId);
}
__name(GetAutocommitReq, "GetAutocommitReq");

// node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function Error2(obj) {
  const message2 = string(obj["message"]);
  const code = stringOpt(obj["code"]);
  return { message: message2, code };
}
__name(Error2, "Error");
function StmtResult(obj) {
  const cols = arrayObjectsMap(obj["cols"], Col);
  const rows = array(obj["rows"]).map((rowObj) => arrayObjectsMap(rowObj, Value3));
  const affectedRowCount = number(obj["affected_row_count"]);
  const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
  const lastInsertRowid = lastInsertRowidStr !== void 0 ? BigInt(lastInsertRowidStr) : void 0;
  return { cols, rows, affectedRowCount, lastInsertRowid };
}
__name(StmtResult, "StmtResult");
function Col(obj) {
  const name = stringOpt(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name, decltype };
}
__name(Col, "Col");
function BatchResult(obj) {
  const stepResults = /* @__PURE__ */ new Map();
  array(obj["step_results"]).forEach((value, i) => {
    if (value !== null) {
      stepResults.set(i, StmtResult(object(value)));
    }
  });
  const stepErrors = /* @__PURE__ */ new Map();
  array(obj["step_errors"]).forEach((value, i) => {
    if (value !== null) {
      stepErrors.set(i, Error2(object(value)));
    }
  });
  return { stepResults, stepErrors };
}
__name(BatchResult, "BatchResult");
function CursorEntry(obj) {
  const type = string(obj["type"]);
  if (type === "step_begin") {
    const step = number(obj["step"]);
    const cols = arrayObjectsMap(obj["cols"], Col);
    return { type: "step_begin", step, cols };
  } else if (type === "step_end") {
    const affectedRowCount = number(obj["affected_row_count"]);
    const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
    const lastInsertRowid = lastInsertRowidStr !== void 0 ? BigInt(lastInsertRowidStr) : void 0;
    return { type: "step_end", affectedRowCount, lastInsertRowid };
  } else if (type === "step_error") {
    const step = number(obj["step"]);
    const error3 = Error2(object(obj["error"]));
    return { type: "step_error", step, error: error3 };
  } else if (type === "row") {
    const row = arrayObjectsMap(obj["row"], Value3);
    return { type: "row", row };
  } else if (type === "error") {
    const error3 = Error2(object(obj["error"]));
    return { type: "error", error: error3 };
  } else {
    throw new ProtoError("Unexpected type of CursorEntry");
  }
}
__name(CursorEntry, "CursorEntry");
function DescribeResult(obj) {
  const params = arrayObjectsMap(obj["params"], DescribeParam);
  const cols = arrayObjectsMap(obj["cols"], DescribeCol);
  const isExplain = boolean(obj["is_explain"]);
  const isReadonly = boolean(obj["is_readonly"]);
  return { params, cols, isExplain, isReadonly };
}
__name(DescribeResult, "DescribeResult");
function DescribeParam(obj) {
  const name = stringOpt(obj["name"]);
  return { name };
}
__name(DescribeParam, "DescribeParam");
function DescribeCol(obj) {
  const name = string(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name, decltype };
}
__name(DescribeCol, "DescribeCol");
function Value3(obj) {
  const type = string(obj["type"]);
  if (type === "null") {
    return null;
  } else if (type === "integer") {
    const value = string(obj["value"]);
    return BigInt(value);
  } else if (type === "float") {
    return number(obj["value"]);
  } else if (type === "text") {
    return string(obj["value"]);
  } else if (type === "blob") {
    return gBase64.toUint8Array(string(obj["base64"]));
  } else {
    throw new ProtoError("Unexpected type of Value");
  }
}
__name(Value3, "Value");

// node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js
function ServerMsg(obj) {
  const type = string(obj["type"]);
  if (type === "hello_ok") {
    return { type: "hello_ok" };
  } else if (type === "hello_error") {
    const error3 = Error2(object(obj["error"]));
    return { type: "hello_error", error: error3 };
  } else if (type === "response_ok") {
    const requestId = number(obj["request_id"]);
    const response = Response2(object(obj["response"]));
    return { type: "response_ok", requestId, response };
  } else if (type === "response_error") {
    const requestId = number(obj["request_id"]);
    const error3 = Error2(object(obj["error"]));
    return { type: "response_error", requestId, error: error3 };
  } else {
    throw new ProtoError("Unexpected type of ServerMsg");
  }
}
__name(ServerMsg, "ServerMsg");
function Response2(obj) {
  const type = string(obj["type"]);
  if (type === "open_stream") {
    return { type: "open_stream" };
  } else if (type === "close_stream") {
    return { type: "close_stream" };
  } else if (type === "execute") {
    const result = StmtResult(object(obj["result"]));
    return { type: "execute", result };
  } else if (type === "batch") {
    const result = BatchResult(object(obj["result"]));
    return { type: "batch", result };
  } else if (type === "open_cursor") {
    return { type: "open_cursor" };
  } else if (type === "close_cursor") {
    return { type: "close_cursor" };
  } else if (type === "fetch_cursor") {
    const entries = arrayObjectsMap(obj["entries"], CursorEntry);
    const done = boolean(obj["done"]);
    return { type: "fetch_cursor", entries, done };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result = DescribeResult(object(obj["result"]));
    return { type: "describe", result };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of Response");
  }
}
__name(Response2, "Response");

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Error3 = {
  default() {
    return { message: "", code: void 0 };
  },
  1(r, msg) {
    msg.message = r.string();
  },
  2(r, msg) {
    msg.code = r.string();
  }
};
var StmtResult2 = {
  default() {
    return {
      cols: [],
      rows: [],
      affectedRowCount: 0,
      lastInsertRowid: void 0
    };
  },
  1(r, msg) {
    msg.cols.push(r.message(Col2));
  },
  2(r, msg) {
    msg.rows.push(r.message(Row));
  },
  3(r, msg) {
    msg.affectedRowCount = Number(r.uint64());
  },
  4(r, msg) {
    msg.lastInsertRowid = r.sint64();
  }
};
var Col2 = {
  default() {
    return { name: void 0, decltype: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  },
  2(r, msg) {
    msg.decltype = r.string();
  }
};
var Row = {
  default() {
    return [];
  },
  1(r, msg) {
    msg.push(r.message(Value4));
  }
};
var BatchResult2 = {
  default() {
    return { stepResults: /* @__PURE__ */ new Map(), stepErrors: /* @__PURE__ */ new Map() };
  },
  1(r, msg) {
    const [key, value] = r.message(BatchResultStepResult);
    msg.stepResults.set(key, value);
  },
  2(r, msg) {
    const [key, value] = r.message(BatchResultStepError);
    msg.stepErrors.set(key, value);
  }
};
var BatchResultStepResult = {
  default() {
    return [0, StmtResult2.default()];
  },
  1(r, msg) {
    msg[0] = r.uint32();
  },
  2(r, msg) {
    msg[1] = r.message(StmtResult2);
  }
};
var BatchResultStepError = {
  default() {
    return [0, Error3.default()];
  },
  1(r, msg) {
    msg[0] = r.uint32();
  },
  2(r, msg) {
    msg[1] = r.message(Error3);
  }
};
var CursorEntry2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return r.message(StepBeginEntry);
  },
  2(r) {
    return r.message(StepEndEntry);
  },
  3(r) {
    return r.message(StepErrorEntry);
  },
  4(r) {
    return { type: "row", row: r.message(Row) };
  },
  5(r) {
    return { type: "error", error: r.message(Error3) };
  }
};
var StepBeginEntry = {
  default() {
    return { type: "step_begin", step: 0, cols: [] };
  },
  1(r, msg) {
    msg.step = r.uint32();
  },
  2(r, msg) {
    msg.cols.push(r.message(Col2));
  }
};
var StepEndEntry = {
  default() {
    return {
      type: "step_end",
      affectedRowCount: 0,
      lastInsertRowid: void 0
    };
  },
  1(r, msg) {
    msg.affectedRowCount = r.uint32();
  },
  2(r, msg) {
    msg.lastInsertRowid = r.uint64();
  }
};
var StepErrorEntry = {
  default() {
    return {
      type: "step_error",
      step: 0,
      error: Error3.default()
    };
  },
  1(r, msg) {
    msg.step = r.uint32();
  },
  2(r, msg) {
    msg.error = r.message(Error3);
  }
};
var DescribeResult2 = {
  default() {
    return {
      params: [],
      cols: [],
      isExplain: false,
      isReadonly: false
    };
  },
  1(r, msg) {
    msg.params.push(r.message(DescribeParam2));
  },
  2(r, msg) {
    msg.cols.push(r.message(DescribeCol2));
  },
  3(r, msg) {
    msg.isExplain = r.bool();
  },
  4(r, msg) {
    msg.isReadonly = r.bool();
  }
};
var DescribeParam2 = {
  default() {
    return { name: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  }
};
var DescribeCol2 = {
  default() {
    return { name: "", decltype: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  },
  2(r, msg) {
    msg.decltype = r.string();
  }
};
var Value4 = {
  default() {
    return void 0;
  },
  1(r) {
    return null;
  },
  2(r) {
    return r.sint64();
  },
  3(r) {
    return r.double();
  },
  4(r) {
    return r.string();
  },
  5(r) {
    return r.bytes();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js
var ServerMsg2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "hello_ok" };
  },
  2(r) {
    return r.message(HelloErrorMsg);
  },
  3(r) {
    return r.message(ResponseOkMsg);
  },
  4(r) {
    return r.message(ResponseErrorMsg);
  }
};
var HelloErrorMsg = {
  default() {
    return { type: "hello_error", error: Error3.default() };
  },
  1(r, msg) {
    msg.error = r.message(Error3);
  }
};
var ResponseErrorMsg = {
  default() {
    return { type: "response_error", requestId: 0, error: Error3.default() };
  },
  1(r, msg) {
    msg.requestId = r.int32();
  },
  2(r, msg) {
    msg.error = r.message(Error3);
  }
};
var ResponseOkMsg = {
  default() {
    return {
      type: "response_ok",
      requestId: 0,
      response: { type: "none" }
    };
  },
  1(r, msg) {
    msg.requestId = r.int32();
  },
  2(r, msg) {
    msg.response = { type: "open_stream" };
  },
  3(r, msg) {
    msg.response = { type: "close_stream" };
  },
  4(r, msg) {
    msg.response = r.message(ExecuteResp);
  },
  5(r, msg) {
    msg.response = r.message(BatchResp);
  },
  6(r, msg) {
    msg.response = { type: "open_cursor" };
  },
  7(r, msg) {
    msg.response = { type: "close_cursor" };
  },
  8(r, msg) {
    msg.response = r.message(FetchCursorResp);
  },
  9(r, msg) {
    msg.response = { type: "sequence" };
  },
  10(r, msg) {
    msg.response = r.message(DescribeResp);
  },
  11(r, msg) {
    msg.response = { type: "store_sql" };
  },
  12(r, msg) {
    msg.response = { type: "close_sql" };
  },
  13(r, msg) {
    msg.response = r.message(GetAutocommitResp);
  }
};
var ExecuteResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(StmtResult2);
  }
};
var BatchResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(BatchResult2);
  }
};
var FetchCursorResp = {
  default() {
    return { type: "fetch_cursor", entries: [], done: false };
  },
  1(r, msg) {
    msg.entries.push(r.message(CursorEntry2));
  },
  2(r, msg) {
    msg.done = r.bool();
  }
};
var DescribeResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(DescribeResult2);
  }
};
var GetAutocommitResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r, msg) {
    msg.isAutocommit = r.bool();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/client.js
var subprotocolsV2 = /* @__PURE__ */ new Map([
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);
var subprotocolsV3 = /* @__PURE__ */ new Map([
  ["hrana3-protobuf", { version: 3, encoding: "protobuf" }],
  ["hrana3", { version: 3, encoding: "json" }],
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);
var WsClient = class extends Client {
  #socket;
  // List of callbacks that we queue until the socket transitions from the CONNECTING to the OPEN state.
  #openCallbacks;
  // Have we already transitioned from CONNECTING to OPEN and fired the callbacks in #openCallbacks?
  #opened;
  // Stores the error that caused us to close the client (and the socket). If we are not closed, this is
  // `undefined`.
  #closed;
  // Have we received a response to our "hello" from the server?
  #recvdHello;
  // Subprotocol negotiated with the server. It is only available after the socket transitions to the OPEN
  // state.
  #subprotocol;
  // Has the `getVersion()` function been called? This is only used to validate that the API is used
  // correctly.
  #getVersionCalled;
  // A map from request id to the responses that we expect to receive from the server.
  #responseMap;
  // An allocator of request ids.
  #requestIdAlloc;
  // An allocator of stream ids.
  /** @private */
  _streamIdAlloc;
  // An allocator of cursor ids.
  /** @private */
  _cursorIdAlloc;
  // An allocator of SQL text ids.
  #sqlIdAlloc;
  /** @private */
  constructor(socket, jwt) {
    super();
    this.#socket = socket;
    this.#openCallbacks = [];
    this.#opened = false;
    this.#closed = void 0;
    this.#recvdHello = false;
    this.#subprotocol = void 0;
    this.#getVersionCalled = false;
    this.#responseMap = /* @__PURE__ */ new Map();
    this.#requestIdAlloc = new IdAlloc();
    this._streamIdAlloc = new IdAlloc();
    this._cursorIdAlloc = new IdAlloc();
    this.#sqlIdAlloc = new IdAlloc();
    this.#socket.binaryType = "arraybuffer";
    this.#socket.addEventListener("open", () => this.#onSocketOpen());
    this.#socket.addEventListener("close", (event) => this.#onSocketClose(event));
    this.#socket.addEventListener("error", (event) => this.#onSocketError(event));
    this.#socket.addEventListener("message", (event) => this.#onSocketMessage(event));
    this.#send({ type: "hello", jwt });
  }
  // Send (or enqueue to send) a message to the server.
  #send(msg) {
    if (this.#closed !== void 0) {
      throw new InternalError("Trying to send a message on a closed client");
    }
    if (this.#opened) {
      this.#sendToSocket(msg);
    } else {
      const openCallback = /* @__PURE__ */ __name(() => this.#sendToSocket(msg), "openCallback");
      const errorCallback = /* @__PURE__ */ __name(() => void 0, "errorCallback");
      this.#openCallbacks.push({ openCallback, errorCallback });
    }
  }
  // The socket transitioned from CONNECTING to OPEN
  #onSocketOpen() {
    const protocol = this.#socket.protocol;
    if (protocol === void 0) {
      this.#setClosed(new ClientError("The `WebSocket.protocol` property is undefined. This most likely means that the WebSocket implementation provided by the environment is broken. If you are using Miniflare 2, please update to Miniflare 3, which fixes this problem."));
      return;
    } else if (protocol === "") {
      this.#subprotocol = { version: 1, encoding: "json" };
    } else {
      this.#subprotocol = subprotocolsV3.get(protocol);
      if (this.#subprotocol === void 0) {
        this.#setClosed(new ProtoError(`Unrecognized WebSocket subprotocol: ${JSON.stringify(protocol)}`));
        return;
      }
    }
    for (const callbacks of this.#openCallbacks) {
      callbacks.openCallback();
    }
    this.#openCallbacks.length = 0;
    this.#opened = true;
  }
  #sendToSocket(msg) {
    const encoding = this.#subprotocol.encoding;
    if (encoding === "json") {
      const jsonMsg = writeJsonObject(msg, ClientMsg);
      this.#socket.send(jsonMsg);
    } else if (encoding === "protobuf") {
      const protobufMsg = writeProtobufMessage(msg, ClientMsg2);
      this.#socket.send(protobufMsg);
    } else {
      throw impossible(encoding, "Impossible encoding");
    }
  }
  /** Get the protocol version negotiated with the server, possibly waiting until the socket is open. */
  getVersion() {
    return new Promise((versionCallback, errorCallback) => {
      this.#getVersionCalled = true;
      if (this.#closed !== void 0) {
        errorCallback(this.#closed);
      } else if (!this.#opened) {
        const openCallback = /* @__PURE__ */ __name(() => versionCallback(this.#subprotocol.version), "openCallback");
        this.#openCallbacks.push({ openCallback, errorCallback });
      } else {
        versionCallback(this.#subprotocol.version);
      }
    });
  }
  // Make sure that the negotiated version is at least `minVersion`.
  /** @private */
  _ensureVersion(minVersion, feature) {
    if (this.#subprotocol === void 0 || !this.#getVersionCalled) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the version supported by the WebSocket server is not yet known. Use Client.getVersion() to wait until the version is available.`);
    } else if (this.#subprotocol.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported on protocol version ${minVersion} and higher, but the WebSocket server only supports version ${this.#subprotocol.version}`);
    }
  }
  // Send a request to the server and invoke a callback when we get the response.
  /** @private */
  _sendRequest(request, callbacks) {
    if (this.#closed !== void 0) {
      callbacks.errorCallback(new ClosedError("Client is closed", this.#closed));
      return;
    }
    const requestId = this.#requestIdAlloc.alloc();
    this.#responseMap.set(requestId, { ...callbacks, type: request.type });
    this.#send({ type: "request", requestId, request });
  }
  // The socket encountered an error.
  #onSocketError(event) {
    const eventMessage = event.message;
    const message2 = eventMessage ?? "WebSocket was closed due to an error";
    this.#setClosed(new WebSocketError(message2));
  }
  // The socket was closed.
  #onSocketClose(event) {
    let message2 = `WebSocket was closed with code ${event.code}`;
    if (event.reason) {
      message2 += `: ${event.reason}`;
    }
    this.#setClosed(new WebSocketError(message2));
  }
  // Close the client with the given error.
  #setClosed(error3) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error3;
    for (const callbacks of this.#openCallbacks) {
      callbacks.errorCallback(error3);
    }
    this.#openCallbacks.length = 0;
    for (const [requestId, responseState] of this.#responseMap.entries()) {
      responseState.errorCallback(error3);
      this.#requestIdAlloc.free(requestId);
    }
    this.#responseMap.clear();
    this.#socket.close();
  }
  // We received a message from the socket.
  #onSocketMessage(event) {
    if (this.#closed !== void 0) {
      return;
    }
    try {
      let msg;
      const encoding = this.#subprotocol.encoding;
      if (encoding === "json") {
        if (typeof event.data !== "string") {
          this.#socket.close(3003, "Only text messages are accepted with JSON encoding");
          this.#setClosed(new ProtoError("Received non-text message from server with JSON encoding"));
          return;
        }
        msg = readJsonObject(JSON.parse(event.data), ServerMsg);
      } else if (encoding === "protobuf") {
        if (!(event.data instanceof ArrayBuffer)) {
          this.#socket.close(3003, "Only binary messages are accepted with Protobuf encoding");
          this.#setClosed(new ProtoError("Received non-binary message from server with Protobuf encoding"));
          return;
        }
        msg = readProtobufMessage(new Uint8Array(event.data), ServerMsg2);
      } else {
        throw impossible(encoding, "Impossible encoding");
      }
      this.#handleMsg(msg);
    } catch (e) {
      this.#socket.close(3007, "Could not handle message");
      this.#setClosed(e);
    }
  }
  // Handle a message from the server.
  #handleMsg(msg) {
    if (msg.type === "none") {
      throw new ProtoError("Received an unrecognized ServerMsg");
    } else if (msg.type === "hello_ok" || msg.type === "hello_error") {
      if (this.#recvdHello) {
        throw new ProtoError("Received a duplicated hello response");
      }
      this.#recvdHello = true;
      if (msg.type === "hello_error") {
        throw errorFromProto(msg.error);
      }
      return;
    } else if (!this.#recvdHello) {
      throw new ProtoError("Received a non-hello message before a hello response");
    }
    if (msg.type === "response_ok") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === void 0) {
        throw new ProtoError("Received unexpected OK response");
      }
      this.#requestIdAlloc.free(requestId);
      try {
        if (responseState.type !== msg.response.type) {
          console.dir({ responseState, msg });
          throw new ProtoError("Received unexpected type of response");
        }
        responseState.responseCallback(msg.response);
      } catch (e) {
        responseState.errorCallback(e);
        throw e;
      }
    } else if (msg.type === "response_error") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === void 0) {
        throw new ProtoError("Received unexpected error response");
      }
      this.#requestIdAlloc.free(requestId);
      responseState.errorCallback(errorFromProto(msg.error));
    } else {
      throw impossible(msg, "Impossible ServerMsg type");
    }
  }
  /** Open a {@link WsStream}, a stream for executing SQL statements. */
  openStream() {
    return WsStream.open(this);
  }
  /** Cache a SQL text on the server. This requires protocol version 2 or higher. */
  storeSql(sql) {
    this._ensureVersion(2, "storeSql()");
    const sqlId = this.#sqlIdAlloc.alloc();
    const sqlObj = new Sql(this, sqlId);
    const responseCallback = /* @__PURE__ */ __name(() => void 0, "responseCallback");
    const errorCallback = /* @__PURE__ */ __name((e) => sqlObj._setClosed(e), "errorCallback");
    const request = { type: "store_sql", sqlId, sql };
    this._sendRequest(request, { responseCallback, errorCallback });
    return sqlObj;
  }
  /** @private */
  _closeSql(sqlId) {
    if (this.#closed !== void 0) {
      return;
    }
    const responseCallback = /* @__PURE__ */ __name(() => this.#sqlIdAlloc.free(sqlId), "responseCallback");
    const errorCallback = /* @__PURE__ */ __name((e) => this.#setClosed(e), "errorCallback");
    const request = { type: "close_sql", sqlId };
    this._sendRequest(request, { responseCallback, errorCallback });
  }
  /** Close the client and the WebSocket. */
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  /** True if the client is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
};
__name(WsClient, "WsClient");

// node_modules/@libsql/hrana-client/lib-esm/http/client.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/isomorphic-fetch/web.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var _fetch = fetch;
var _Request = Request;
var _Headers = Headers;

// node_modules/@libsql/hrana-client/lib-esm/http/stream.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/queue_microtask.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var _queueMicrotask;
if (typeof queueMicrotask !== "undefined") {
  _queueMicrotask = queueMicrotask;
} else {
  const resolved = Promise.resolve();
  _queueMicrotask = /* @__PURE__ */ __name((callback) => {
    resolved.then(callback);
  }, "_queueMicrotask");
}

// node_modules/@libsql/hrana-client/lib-esm/http/cursor.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/byte_queue.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var ByteQueue = class {
  #array;
  #shiftPos;
  #pushPos;
  constructor(initialCap) {
    this.#array = new Uint8Array(new ArrayBuffer(initialCap));
    this.#shiftPos = 0;
    this.#pushPos = 0;
  }
  get length() {
    return this.#pushPos - this.#shiftPos;
  }
  data() {
    return this.#array.slice(this.#shiftPos, this.#pushPos);
  }
  push(chunk) {
    this.#ensurePush(chunk.byteLength);
    this.#array.set(chunk, this.#pushPos);
    this.#pushPos += chunk.byteLength;
  }
  #ensurePush(pushLength) {
    if (this.#pushPos + pushLength <= this.#array.byteLength) {
      return;
    }
    const filledLength = this.#pushPos - this.#shiftPos;
    if (filledLength + pushLength <= this.#array.byteLength && 2 * this.#pushPos >= this.#array.byteLength) {
      this.#array.copyWithin(0, this.#shiftPos, this.#pushPos);
    } else {
      let newCap = this.#array.byteLength;
      do {
        newCap *= 2;
      } while (filledLength + pushLength > newCap);
      const newArray = new Uint8Array(new ArrayBuffer(newCap));
      newArray.set(this.#array.slice(this.#shiftPos, this.#pushPos), 0);
      this.#array = newArray;
    }
    this.#pushPos = filledLength;
    this.#shiftPos = 0;
  }
  shift(length) {
    this.#shiftPos += length;
  }
};
__name(ByteQueue, "ByteQueue");

// node_modules/@libsql/hrana-client/lib-esm/http/json_decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function PipelineRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  const results = arrayObjectsMap(obj["results"], StreamResult);
  return { baton, baseUrl, results };
}
__name(PipelineRespBody, "PipelineRespBody");
function StreamResult(obj) {
  const type = string(obj["type"]);
  if (type === "ok") {
    const response = StreamResponse(object(obj["response"]));
    return { type: "ok", response };
  } else if (type === "error") {
    const error3 = Error2(object(obj["error"]));
    return { type: "error", error: error3 };
  } else {
    throw new ProtoError("Unexpected type of StreamResult");
  }
}
__name(StreamResult, "StreamResult");
function StreamResponse(obj) {
  const type = string(obj["type"]);
  if (type === "close") {
    return { type: "close" };
  } else if (type === "execute") {
    const result = StmtResult(object(obj["result"]));
    return { type: "execute", result };
  } else if (type === "batch") {
    const result = BatchResult(object(obj["result"]));
    return { type: "batch", result };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result = DescribeResult(object(obj["result"]));
    return { type: "describe", result };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of StreamResponse");
  }
}
__name(StreamResponse, "StreamResponse");
function CursorRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  return { baton, baseUrl };
}
__name(CursorRespBody, "CursorRespBody");

// node_modules/@libsql/hrana-client/lib-esm/http/protobuf_decode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var PipelineRespBody2 = {
  default() {
    return { baton: void 0, baseUrl: void 0, results: [] };
  },
  1(r, msg) {
    msg.baton = r.string();
  },
  2(r, msg) {
    msg.baseUrl = r.string();
  },
  3(r, msg) {
    msg.results.push(r.message(StreamResult2));
  }
};
var StreamResult2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "ok", response: r.message(StreamResponse2) };
  },
  2(r) {
    return { type: "error", error: r.message(Error3) };
  }
};
var StreamResponse2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "close" };
  },
  2(r) {
    return r.message(ExecuteStreamResp);
  },
  3(r) {
    return r.message(BatchStreamResp);
  },
  4(r) {
    return { type: "sequence" };
  },
  5(r) {
    return r.message(DescribeStreamResp);
  },
  6(r) {
    return { type: "store_sql" };
  },
  7(r) {
    return { type: "close_sql" };
  },
  8(r) {
    return r.message(GetAutocommitStreamResp);
  }
};
var ExecuteStreamResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(StmtResult2);
  }
};
var BatchStreamResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(BatchResult2);
  }
};
var DescribeStreamResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(DescribeResult2);
  }
};
var GetAutocommitStreamResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r, msg) {
    msg.isAutocommit = r.bool();
  }
};
var CursorRespBody2 = {
  default() {
    return { baton: void 0, baseUrl: void 0 };
  },
  1(r, msg) {
    msg.baton = r.string();
  },
  2(r, msg) {
    msg.baseUrl = r.string();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/http/cursor.js
var HttpCursor = class extends Cursor {
  #stream;
  #encoding;
  #reader;
  #queue;
  #closed;
  #done;
  /** @private */
  constructor(stream, encoding) {
    super();
    this.#stream = stream;
    this.#encoding = encoding;
    this.#reader = void 0;
    this.#queue = new ByteQueue(16 * 1024);
    this.#closed = void 0;
    this.#done = false;
  }
  async open(response) {
    if (response.body === null) {
      throw new ProtoError("No response body for cursor request");
    }
    this.#reader = response.body.getReader();
    const respBody = await this.#nextItem(CursorRespBody, CursorRespBody2);
    if (respBody === void 0) {
      throw new ProtoError("Empty response to cursor request");
    }
    return respBody;
  }
  /** Fetch the next entry from the cursor. */
  next() {
    return this.#nextItem(CursorEntry, CursorEntry2);
  }
  /** Close the cursor. */
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  /** @private */
  _setClosed(error3) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error3;
    this.#stream._cursorClosed(this);
    if (this.#reader !== void 0) {
      this.#reader.cancel();
    }
  }
  /** True if the cursor is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
  async #nextItem(jsonFun, protobufDef) {
    for (; ; ) {
      if (this.#done) {
        return void 0;
      } else if (this.#closed !== void 0) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      if (this.#encoding === "json") {
        const jsonData = this.#parseItemJson();
        if (jsonData !== void 0) {
          const jsonText = new TextDecoder().decode(jsonData);
          const jsonValue = JSON.parse(jsonText);
          return readJsonObject(jsonValue, jsonFun);
        }
      } else if (this.#encoding === "protobuf") {
        const protobufData = this.#parseItemProtobuf();
        if (protobufData !== void 0) {
          return readProtobufMessage(protobufData, protobufDef);
        }
      } else {
        throw impossible(this.#encoding, "Impossible encoding");
      }
      if (this.#reader === void 0) {
        throw new InternalError("Attempted to read from HTTP cursor before it was opened");
      }
      const { value, done } = await this.#reader.read();
      if (done && this.#queue.length === 0) {
        this.#done = true;
      } else if (done) {
        throw new ProtoError("Unexpected end of cursor stream");
      } else {
        this.#queue.push(value);
      }
    }
  }
  #parseItemJson() {
    const data = this.#queue.data();
    const newlineByte = 10;
    const newlinePos = data.indexOf(newlineByte);
    if (newlinePos < 0) {
      return void 0;
    }
    const jsonData = data.slice(0, newlinePos);
    this.#queue.shift(newlinePos + 1);
    return jsonData;
  }
  #parseItemProtobuf() {
    const data = this.#queue.data();
    let varintValue = 0;
    let varintLength = 0;
    for (; ; ) {
      if (varintLength >= data.byteLength) {
        return void 0;
      }
      const byte = data[varintLength];
      varintValue |= (byte & 127) << 7 * varintLength;
      varintLength += 1;
      if (!(byte & 128)) {
        break;
      }
    }
    if (data.byteLength < varintLength + varintValue) {
      return void 0;
    }
    const protobufData = data.slice(varintLength, varintLength + varintValue);
    this.#queue.shift(varintLength + varintValue);
    return protobufData;
  }
};
__name(HttpCursor, "HttpCursor");

// node_modules/@libsql/hrana-client/lib-esm/http/json_encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function PipelineReqBody(w, msg) {
  if (msg.baton !== void 0) {
    w.string("baton", msg.baton);
  }
  w.arrayObjects("requests", msg.requests, StreamRequest);
}
__name(PipelineReqBody, "PipelineReqBody");
function StreamRequest(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "close") {
  } else if (msg.type === "execute") {
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "sequence") {
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
}
__name(StreamRequest, "StreamRequest");
function CursorReqBody(w, msg) {
  if (msg.baton !== void 0) {
    w.string("baton", msg.baton);
  }
  w.object("batch", msg.batch, Batch2);
}
__name(CursorReqBody, "CursorReqBody");

// node_modules/@libsql/hrana-client/lib-esm/http/protobuf_encode.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function PipelineReqBody2(w, msg) {
  if (msg.baton !== void 0) {
    w.string(1, msg.baton);
  }
  for (const req of msg.requests) {
    w.message(2, req, StreamRequest2);
  }
}
__name(PipelineReqBody2, "PipelineReqBody");
function StreamRequest2(w, msg) {
  if (msg.type === "close") {
    w.message(1, msg, CloseStreamReq2);
  } else if (msg.type === "execute") {
    w.message(2, msg, ExecuteStreamReq);
  } else if (msg.type === "batch") {
    w.message(3, msg, BatchStreamReq);
  } else if (msg.type === "sequence") {
    w.message(4, msg, SequenceStreamReq);
  } else if (msg.type === "describe") {
    w.message(5, msg, DescribeStreamReq);
  } else if (msg.type === "store_sql") {
    w.message(6, msg, StoreSqlStreamReq);
  } else if (msg.type === "close_sql") {
    w.message(7, msg, CloseSqlStreamReq);
  } else if (msg.type === "get_autocommit") {
    w.message(8, msg, GetAutocommitStreamReq);
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
}
__name(StreamRequest2, "StreamRequest");
function CloseStreamReq2(_w, _msg) {
}
__name(CloseStreamReq2, "CloseStreamReq");
function ExecuteStreamReq(w, msg) {
  w.message(1, msg.stmt, Stmt3);
}
__name(ExecuteStreamReq, "ExecuteStreamReq");
function BatchStreamReq(w, msg) {
  w.message(1, msg.batch, Batch3);
}
__name(BatchStreamReq, "BatchStreamReq");
function SequenceStreamReq(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
}
__name(SequenceStreamReq, "SequenceStreamReq");
function DescribeStreamReq(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
}
__name(DescribeStreamReq, "DescribeStreamReq");
function StoreSqlStreamReq(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
}
__name(StoreSqlStreamReq, "StoreSqlStreamReq");
function CloseSqlStreamReq(w, msg) {
  w.int32(1, msg.sqlId);
}
__name(CloseSqlStreamReq, "CloseSqlStreamReq");
function GetAutocommitStreamReq(_w, _msg) {
}
__name(GetAutocommitStreamReq, "GetAutocommitStreamReq");
function CursorReqBody2(w, msg) {
  if (msg.baton !== void 0) {
    w.string(1, msg.baton);
  }
  w.message(2, msg.batch, Batch3);
}
__name(CursorReqBody2, "CursorReqBody");

// node_modules/@libsql/hrana-client/lib-esm/http/stream.js
var HttpStream = class extends Stream {
  #client;
  #baseUrl;
  #jwt;
  #fetch;
  #baton;
  #queue;
  #flushing;
  #cursor;
  #closing;
  #closeQueued;
  #closed;
  #sqlIdAlloc;
  /** @private */
  constructor(client, baseUrl, jwt, customFetch) {
    super(client.intMode);
    this.#client = client;
    this.#baseUrl = baseUrl.toString();
    this.#jwt = jwt;
    this.#fetch = customFetch;
    this.#baton = void 0;
    this.#queue = new Queue();
    this.#flushing = false;
    this.#closing = false;
    this.#closeQueued = false;
    this.#closed = void 0;
    this.#sqlIdAlloc = new IdAlloc();
  }
  /** Get the {@link HttpClient} object that this stream belongs to. */
  client() {
    return this.#client;
  }
  /** @private */
  _sqlOwner() {
    return this;
  }
  /** Cache a SQL text on the server. */
  storeSql(sql) {
    const sqlId = this.#sqlIdAlloc.alloc();
    this.#sendStreamRequest({ type: "store_sql", sqlId, sql }).then(() => void 0, (error3) => this._setClosed(error3));
    return new Sql(this, sqlId);
  }
  /** @private */
  _closeSql(sqlId) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#sendStreamRequest({ type: "close_sql", sqlId }).then(() => this.#sqlIdAlloc.free(sqlId), (error3) => this._setClosed(error3));
  }
  /** @private */
  _execute(stmt) {
    return this.#sendStreamRequest({ type: "execute", stmt }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _batch(batch) {
    return this.#sendStreamRequest({ type: "batch", batch }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _describe(protoSql) {
    return this.#sendStreamRequest({
      type: "describe",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _sequence(protoSql) {
    return this.#sendStreamRequest({
      type: "sequence",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return void 0;
    });
  }
  /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit"
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "pipeline", request, responseCallback, errorCallback });
    });
  }
  /** @private */
  _openCursor(batch) {
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch, cursorCallback, errorCallback });
    });
  }
  /** @private */
  _cursorClosed(cursor) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = void 0;
    _queueMicrotask(() => this.#flushQueue());
  }
  /** Immediately close the stream. */
  close() {
    this._setClosed(new ClientError("Stream was manually closed"));
  }
  /** Gracefully close the stream. */
  closeGracefully() {
    this.#closing = true;
    _queueMicrotask(() => this.#flushQueue());
  }
  /** True if the stream is closed. */
  get closed() {
    return this.#closed !== void 0 || this.#closing;
  }
  /** @private */
  _setClosed(error3) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error3;
    if (this.#cursor !== void 0) {
      this.#cursor._setClosed(error3);
    }
    this.#client._streamClosed(this);
    for (; ; ) {
      const entry = this.#queue.shift();
      if (entry !== void 0) {
        entry.errorCallback(error3);
      } else {
        break;
      }
    }
    if ((this.#baton !== void 0 || this.#flushing) && !this.#closeQueued) {
      this.#queue.push({
        type: "pipeline",
        request: { type: "close" },
        responseCallback: () => void 0,
        errorCallback: () => void 0
      });
      this.#closeQueued = true;
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #pushToQueue(entry) {
    if (this.#closed !== void 0) {
      throw new ClosedError("Stream is closed", this.#closed);
    } else if (this.#closing) {
      throw new ClosedError("Stream is closing", void 0);
    } else {
      this.#queue.push(entry);
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #flushQueue() {
    if (this.#flushing || this.#cursor !== void 0) {
      return;
    }
    if (this.#closing && this.#queue.length === 0) {
      this._setClosed(new ClientError("Stream was gracefully closed"));
      return;
    }
    const endpoint = this.#client._endpoint;
    if (endpoint === void 0) {
      this.#client._endpointPromise.then(() => this.#flushQueue(), (error3) => this._setClosed(error3));
      return;
    }
    const firstEntry = this.#queue.shift();
    if (firstEntry === void 0) {
      return;
    } else if (firstEntry.type === "pipeline") {
      const pipeline = [firstEntry];
      for (; ; ) {
        const entry = this.#queue.first();
        if (entry !== void 0 && entry.type === "pipeline") {
          pipeline.push(entry);
          this.#queue.shift();
        } else if (entry === void 0 && this.#closing && !this.#closeQueued) {
          pipeline.push({
            type: "pipeline",
            request: { type: "close" },
            responseCallback: () => void 0,
            errorCallback: () => void 0
          });
          this.#closeQueued = true;
          break;
        } else {
          break;
        }
      }
      this.#flushPipeline(endpoint, pipeline);
    } else if (firstEntry.type === "cursor") {
      this.#flushCursor(endpoint, firstEntry);
    } else {
      throw impossible(firstEntry, "Impossible type of QueueEntry");
    }
  }
  #flushPipeline(endpoint, pipeline) {
    this.#flush(() => this.#createPipelineRequest(pipeline, endpoint), (resp) => decodePipelineResponse(resp, endpoint.encoding), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (respBody) => handlePipelineResponse(pipeline, respBody), (error3) => pipeline.forEach((entry) => entry.errorCallback(error3)));
  }
  #flushCursor(endpoint, entry) {
    const cursor = new HttpCursor(this, endpoint.encoding);
    this.#cursor = cursor;
    this.#flush(() => this.#createCursorRequest(entry, endpoint), (resp) => cursor.open(resp), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (_respBody) => entry.cursorCallback(cursor), (error3) => entry.errorCallback(error3));
  }
  #flush(createRequest, decodeResponse, getBaton, getBaseUrl, handleResponse, handleError) {
    let promise;
    try {
      const request = createRequest();
      const fetch2 = this.#fetch;
      promise = fetch2(request);
    } catch (error3) {
      promise = Promise.reject(error3);
    }
    this.#flushing = true;
    promise.then((resp) => {
      if (!resp.ok) {
        return errorFromResponse(resp).then((error3) => {
          throw error3;
        });
      }
      return decodeResponse(resp);
    }).then((r) => {
      this.#baton = getBaton(r);
      this.#baseUrl = getBaseUrl(r) ?? this.#baseUrl;
      handleResponse(r);
    }).catch((error3) => {
      this._setClosed(error3);
      handleError(error3);
    }).finally(() => {
      this.#flushing = false;
      this.#flushQueue();
    });
  }
  #createPipelineRequest(pipeline, endpoint) {
    return this.#createRequest(new URL(endpoint.pipelinePath, this.#baseUrl), {
      baton: this.#baton,
      requests: pipeline.map((entry) => entry.request)
    }, endpoint.encoding, PipelineReqBody, PipelineReqBody2);
  }
  #createCursorRequest(entry, endpoint) {
    if (endpoint.cursorPath === void 0) {
      throw new ProtocolVersionError(`Cursors are supported only on protocol version 3 and higher, but the HTTP server only supports version ${endpoint.version}.`);
    }
    return this.#createRequest(new URL(endpoint.cursorPath, this.#baseUrl), {
      baton: this.#baton,
      batch: entry.batch
    }, endpoint.encoding, CursorReqBody, CursorReqBody2);
  }
  #createRequest(url, reqBody, encoding, jsonFun, protobufFun) {
    let bodyData;
    let contentType;
    if (encoding === "json") {
      bodyData = writeJsonObject(reqBody, jsonFun);
      contentType = "application/json";
    } else if (encoding === "protobuf") {
      bodyData = writeProtobufMessage(reqBody, protobufFun);
      contentType = "application/x-protobuf";
    } else {
      throw impossible(encoding, "Impossible encoding");
    }
    const headers = new _Headers();
    headers.set("content-type", contentType);
    if (this.#jwt !== void 0) {
      headers.set("authorization", `Bearer ${this.#jwt}`);
    }
    return new _Request(url.toString(), { method: "POST", headers, body: bodyData });
  }
};
__name(HttpStream, "HttpStream");
function handlePipelineResponse(pipeline, respBody) {
  if (respBody.results.length !== pipeline.length) {
    throw new ProtoError("Server returned unexpected number of pipeline results");
  }
  for (let i = 0; i < pipeline.length; ++i) {
    const result = respBody.results[i];
    const entry = pipeline[i];
    if (result.type === "ok") {
      if (result.response.type !== entry.request.type) {
        throw new ProtoError("Received unexpected type of response");
      }
      entry.responseCallback(result.response);
    } else if (result.type === "error") {
      entry.errorCallback(errorFromProto(result.error));
    } else if (result.type === "none") {
      throw new ProtoError("Received unrecognized type of StreamResult");
    } else {
      throw impossible(result, "Received impossible type of StreamResult");
    }
  }
}
__name(handlePipelineResponse, "handlePipelineResponse");
async function decodePipelineResponse(resp, encoding) {
  if (encoding === "json") {
    const respJson = await resp.json();
    return readJsonObject(respJson, PipelineRespBody);
  }
  if (encoding === "protobuf") {
    const respData = await resp.arrayBuffer();
    return readProtobufMessage(new Uint8Array(respData), PipelineRespBody2);
  }
  await resp.body?.cancel();
  throw impossible(encoding, "Impossible encoding");
}
__name(decodePipelineResponse, "decodePipelineResponse");
async function errorFromResponse(resp) {
  const respType = resp.headers.get("content-type") ?? "text/plain";
  let message2 = `Server returned HTTP status ${resp.status}`;
  if (respType === "application/json") {
    const respBody = await resp.json();
    if ("message" in respBody) {
      return errorFromProto(respBody);
    }
    return new HttpServerError(message2, resp.status);
  }
  if (respType === "text/plain") {
    const respBody = (await resp.text()).trim();
    if (respBody !== "") {
      message2 += `: ${respBody}`;
    }
    return new HttpServerError(message2, resp.status);
  }
  await resp.body?.cancel();
  return new HttpServerError(message2, resp.status);
}
__name(errorFromResponse, "errorFromResponse");

// node_modules/@libsql/hrana-client/lib-esm/http/client.js
var checkEndpoints = [
  {
    versionPath: "v3-protobuf",
    pipelinePath: "v3-protobuf/pipeline",
    cursorPath: "v3-protobuf/cursor",
    version: 3,
    encoding: "protobuf"
  }
  /*
  {
      versionPath: "v3",
      pipelinePath: "v3/pipeline",
      cursorPath: "v3/cursor",
      version: 3,
      encoding: "json",
  },
  */
];
var fallbackEndpoint = {
  versionPath: "v2",
  pipelinePath: "v2/pipeline",
  cursorPath: void 0,
  version: 2,
  encoding: "json"
};
var HttpClient = class extends Client {
  #url;
  #jwt;
  #fetch;
  #closed;
  #streams;
  /** @private */
  _endpointPromise;
  /** @private */
  _endpoint;
  /** @private */
  constructor(url, jwt, customFetch, protocolVersion = 2) {
    super();
    this.#url = url;
    this.#jwt = jwt;
    this.#fetch = customFetch ?? _fetch;
    this.#closed = void 0;
    this.#streams = /* @__PURE__ */ new Set();
    if (protocolVersion == 3) {
      this._endpointPromise = findEndpoint(this.#fetch, this.#url);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error3) => this.#setClosed(error3));
    } else {
      this._endpointPromise = Promise.resolve(fallbackEndpoint);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error3) => this.#setClosed(error3));
    }
  }
  /** Get the protocol version supported by the server. */
  async getVersion() {
    if (this._endpoint !== void 0) {
      return this._endpoint.version;
    }
    return (await this._endpointPromise).version;
  }
  // Make sure that the negotiated version is at least `minVersion`.
  /** @private */
  _ensureVersion(minVersion, feature) {
    if (minVersion <= fallbackEndpoint.version) {
      return;
    } else if (this._endpoint === void 0) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the version supported by the HTTP server is not yet known. Use Client.getVersion() to wait until the version is available.`);
    } else if (this._endpoint.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the HTTP server only supports version ${this._endpoint.version}.`);
    }
  }
  /** Open a {@link HttpStream}, a stream for executing SQL statements. */
  openStream() {
    if (this.#closed !== void 0) {
      throw new ClosedError("Client is closed", this.#closed);
    }
    const stream = new HttpStream(this, this.#url, this.#jwt, this.#fetch);
    this.#streams.add(stream);
    return stream;
  }
  /** @private */
  _streamClosed(stream) {
    this.#streams.delete(stream);
  }
  /** Close the client and all its streams. */
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  /** True if the client is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
  #setClosed(error3) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error3;
    for (const stream of Array.from(this.#streams)) {
      stream._setClosed(new ClosedError("Client was closed", error3));
    }
  }
};
__name(HttpClient, "HttpClient");
async function findEndpoint(customFetch, clientUrl) {
  const fetch2 = customFetch;
  for (const endpoint of checkEndpoints) {
    const url = new URL(endpoint.versionPath, clientUrl);
    const request = new _Request(url.toString(), { method: "GET" });
    const response = await fetch2(request);
    await response.arrayBuffer();
    if (response.ok) {
      return endpoint;
    }
  }
  return fallbackEndpoint;
}
__name(findEndpoint, "findEndpoint");

// node_modules/@libsql/hrana-client/lib-esm/libsql_url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@libsql/hrana-client/lib-esm/index.js
function openWs(url, jwt, protocolVersion = 2) {
  if (typeof _WebSocket === "undefined") {
    throw new WebSocketUnsupportedError("WebSockets are not supported in this environment");
  }
  var subprotocols = void 0;
  if (protocolVersion == 3) {
    subprotocols = Array.from(subprotocolsV3.keys());
  } else {
    subprotocols = Array.from(subprotocolsV2.keys());
  }
  const socket = new _WebSocket(url, subprotocols);
  return new WsClient(socket, jwt);
}
__name(openWs, "openWs");
function openHttp(url, jwt, customFetch, protocolVersion = 2) {
  return new HttpClient(url instanceof URL ? url : new URL(url), jwt, customFetch, protocolVersion);
}
__name(openHttp, "openHttp");

// node_modules/@libsql/client/lib-esm/hrana.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var HranaTransaction = class {
  #mode;
  #version;
  // Promise that is resolved when the BEGIN statement completes, or `undefined` if we haven't executed the
  // BEGIN statement yet.
  #started;
  /** @private */
  constructor(mode, version3) {
    this.#mode = mode;
    this.#version = version3;
    this.#started = void 0;
  }
  execute(stmt) {
    return this.batch([stmt]).then((results) => results[0]);
  }
  async batch(stmts) {
    const stream = this._getStream();
    if (stream.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      const hranaStmts = stmts.map(stmtToHrana);
      let rowsPromises;
      if (this.#started === void 0) {
        this._getSqlCache().apply(hranaStmts);
        const batch = stream.batch(this.#version >= 3);
        const beginStep = batch.step();
        const beginPromise = beginStep.run(transactionModeToBegin(this.#mode));
        let lastStep = beginStep;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch.step().condition(BatchCond.ok(lastStep));
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => void 0);
          lastStep = stmtStep;
          return rowsPromise;
        });
        this.#started = batch.execute().then(() => beginPromise).then(() => void 0);
        try {
          await this.#started;
        } catch (e) {
          this.close();
          throw e;
        }
      } else {
        if (this.#version < 3) {
          await this.#started;
        } else {
        }
        this._getSqlCache().apply(hranaStmts);
        const batch = stream.batch(this.#version >= 3);
        let lastStep = void 0;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch.step();
          if (lastStep !== void 0) {
            stmtStep.condition(BatchCond.ok(lastStep));
          }
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => void 0);
          lastStep = stmtStep;
          return rowsPromise;
        });
        await batch.execute();
      }
      const resultSets = [];
      for (const rowsPromise of rowsPromises) {
        const rows = await rowsPromise;
        if (rows === void 0) {
          throw new LibsqlError("Statement in a transaction was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
        }
        resultSets.push(resultSetFromHrana(rows));
      }
      return resultSets;
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async executeMultiple(sql) {
    const stream = this._getStream();
    if (stream.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      if (this.#started === void 0) {
        this.#started = stream.run(transactionModeToBegin(this.#mode)).then(() => void 0);
        try {
          await this.#started;
        } catch (e) {
          this.close();
          throw e;
        }
      } else {
        await this.#started;
      }
      await stream.sequence(sql);
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async rollback() {
    try {
      const stream = this._getStream();
      if (stream.closed) {
        return;
      }
      if (this.#started !== void 0) {
      } else {
        return;
      }
      const promise = stream.run("ROLLBACK").catch((e) => {
        throw mapHranaError(e);
      });
      stream.closeGracefully();
      await promise;
    } catch (e) {
      throw mapHranaError(e);
    } finally {
      this.close();
    }
  }
  async commit() {
    try {
      const stream = this._getStream();
      if (stream.closed) {
        throw new LibsqlError("Cannot commit the transaction because it is already closed", "TRANSACTION_CLOSED");
      }
      if (this.#started !== void 0) {
        await this.#started;
      } else {
        return;
      }
      const promise = stream.run("COMMIT").catch((e) => {
        throw mapHranaError(e);
      });
      stream.closeGracefully();
      await promise;
    } catch (e) {
      throw mapHranaError(e);
    } finally {
      this.close();
    }
  }
};
__name(HranaTransaction, "HranaTransaction");
async function executeHranaBatch(mode, version3, batch, hranaStmts, disableForeignKeys = false) {
  if (disableForeignKeys) {
    batch.step().run("PRAGMA foreign_keys=off");
  }
  const beginStep = batch.step();
  const beginPromise = beginStep.run(transactionModeToBegin(mode));
  let lastStep = beginStep;
  const stmtPromises = hranaStmts.map((hranaStmt) => {
    const stmtStep = batch.step().condition(BatchCond.ok(lastStep));
    if (version3 >= 3) {
      stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
    }
    const stmtPromise = stmtStep.query(hranaStmt);
    lastStep = stmtStep;
    return stmtPromise;
  });
  const commitStep = batch.step().condition(BatchCond.ok(lastStep));
  if (version3 >= 3) {
    commitStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
  }
  const commitPromise = commitStep.run("COMMIT");
  const rollbackStep = batch.step().condition(BatchCond.not(BatchCond.ok(commitStep)));
  rollbackStep.run("ROLLBACK").catch((_) => void 0);
  if (disableForeignKeys) {
    batch.step().run("PRAGMA foreign_keys=on");
  }
  await batch.execute();
  const resultSets = [];
  await beginPromise;
  for (const stmtPromise of stmtPromises) {
    const hranaRows = await stmtPromise;
    if (hranaRows === void 0) {
      throw new LibsqlError("Statement in a batch was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
    }
    resultSets.push(resultSetFromHrana(hranaRows));
  }
  await commitPromise;
  return resultSets;
}
__name(executeHranaBatch, "executeHranaBatch");
function stmtToHrana(stmt) {
  if (typeof stmt === "string") {
    return new Stmt(stmt);
  }
  const hranaStmt = new Stmt(stmt.sql);
  if (Array.isArray(stmt.args)) {
    hranaStmt.bindIndexes(stmt.args);
  } else {
    for (const [key, value] of Object.entries(stmt.args)) {
      hranaStmt.bindName(key, value);
    }
  }
  return hranaStmt;
}
__name(stmtToHrana, "stmtToHrana");
function resultSetFromHrana(hranaRows) {
  const columns = hranaRows.columnNames.map((c) => c ?? "");
  const columnTypes = hranaRows.columnDecltypes.map((c) => c ?? "");
  const rows = hranaRows.rows;
  const rowsAffected = hranaRows.affectedRowCount;
  const lastInsertRowid = hranaRows.lastInsertRowid !== void 0 ? hranaRows.lastInsertRowid : void 0;
  return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
}
__name(resultSetFromHrana, "resultSetFromHrana");
function mapHranaError(e) {
  if (e instanceof ClientError) {
    const code = mapHranaErrorCode(e);
    return new LibsqlError(e.message, code, void 0, e);
  }
  return e;
}
__name(mapHranaError, "mapHranaError");
function mapHranaErrorCode(e) {
  if (e instanceof ResponseError && e.code !== void 0) {
    return e.code;
  } else if (e instanceof ProtoError) {
    return "HRANA_PROTO_ERROR";
  } else if (e instanceof ClosedError) {
    return e.cause instanceof ClientError ? mapHranaErrorCode(e.cause) : "HRANA_CLOSED_ERROR";
  } else if (e instanceof WebSocketError) {
    return "HRANA_WEBSOCKET_ERROR";
  } else if (e instanceof HttpServerError) {
    return "SERVER_ERROR";
  } else if (e instanceof ProtocolVersionError) {
    return "PROTOCOL_VERSION_ERROR";
  } else if (e instanceof InternalError) {
    return "INTERNAL_ERROR";
  } else {
    return "UNKNOWN";
  }
}
__name(mapHranaErrorCode, "mapHranaErrorCode");

// node_modules/@libsql/client/lib-esm/sql_cache.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SqlCache = class {
  #owner;
  #sqls;
  capacity;
  constructor(owner, capacity) {
    this.#owner = owner;
    this.#sqls = new Lru();
    this.capacity = capacity;
  }
  // Replaces SQL strings with cached `hrana.Sql` objects in the statements in `hranaStmts`. After this
  // function returns, we guarantee that all `hranaStmts` refer to valid (not closed) `hrana.Sql` objects,
  // but _we may invalidate any other `hrana.Sql` objects_ (by closing them, thus removing them from the
  // server).
  //
  // In practice, this means that after calling this function, you can use the statements only up to the
  // first `await`, because concurrent code may also use the cache and invalidate those statements.
  apply(hranaStmts) {
    if (this.capacity <= 0) {
      return;
    }
    const usedSqlObjs = /* @__PURE__ */ new Set();
    for (const hranaStmt of hranaStmts) {
      if (typeof hranaStmt.sql !== "string") {
        continue;
      }
      const sqlText = hranaStmt.sql;
      if (sqlText.length >= 5e3) {
        continue;
      }
      let sqlObj = this.#sqls.get(sqlText);
      if (sqlObj === void 0) {
        while (this.#sqls.size + 1 > this.capacity) {
          const [evictSqlText, evictSqlObj] = this.#sqls.peekLru();
          if (usedSqlObjs.has(evictSqlObj)) {
            break;
          }
          evictSqlObj.close();
          this.#sqls.delete(evictSqlText);
        }
        if (this.#sqls.size + 1 <= this.capacity) {
          sqlObj = this.#owner.storeSql(sqlText);
          this.#sqls.set(sqlText, sqlObj);
        }
      }
      if (sqlObj !== void 0) {
        hranaStmt.sql = sqlObj;
        usedSqlObjs.add(sqlObj);
      }
    }
  }
};
__name(SqlCache, "SqlCache");
var Lru = class {
  // This maps keys to the cache values. The entries are ordered by their last use (entires that were used
  // most recently are at the end).
  #cache;
  constructor() {
    this.#cache = /* @__PURE__ */ new Map();
  }
  get(key) {
    const value = this.#cache.get(key);
    if (value !== void 0) {
      this.#cache.delete(key);
      this.#cache.set(key, value);
    }
    return value;
  }
  set(key, value) {
    this.#cache.set(key, value);
  }
  peekLru() {
    for (const entry of this.#cache.entries()) {
      return entry;
    }
    return void 0;
  }
  delete(key) {
    this.#cache.delete(key);
  }
  get size() {
    return this.#cache.size;
  }
};
__name(Lru, "Lru");

// node_modules/@libsql/client/lib-esm/ws.js
var import_promise_limit = __toESM(require_promise_limit(), 1);
function _createClient(config2) {
  if (config2.scheme !== "wss" && config2.scheme !== "ws") {
    throw new LibsqlError(`The WebSocket client supports only "libsql:", "wss:" and "ws:" URLs, got ${JSON.stringify(config2.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config2.encryptionKey !== void 0) {
    throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
  }
  if (config2.scheme === "ws" && config2.tls) {
    throw new LibsqlError(`A "ws:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config2.scheme === "wss" && !config2.tls) {
    throw new LibsqlError(`A "wss:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config2.scheme, config2.authority, config2.path);
  let client;
  try {
    client = openWs(url, config2.authToken);
  } catch (e) {
    if (e instanceof WebSocketUnsupportedError) {
      const suggestedScheme = config2.scheme === "wss" ? "https" : "http";
      const suggestedUrl = encodeBaseUrl(suggestedScheme, config2.authority, config2.path);
      throw new LibsqlError(`This environment does not support WebSockets, please switch to the HTTP client by using a "${suggestedScheme}:" URL (${JSON.stringify(suggestedUrl)}). For more information, please read ${supportedUrlLink}`, "WEBSOCKETS_NOT_SUPPORTED");
    }
    throw mapHranaError(e);
  }
  return new WsClient2(client, url, config2.authToken, config2.intMode, config2.concurrency);
}
__name(_createClient, "_createClient");
var maxConnAgeMillis = 60 * 1e3;
var sqlCacheCapacity = 100;
var WsClient2 = class {
  #url;
  #authToken;
  #intMode;
  // State of the current connection. The `hrana.WsClient` inside may be closed at any moment due to an
  // asynchronous error.
  #connState;
  // If defined, this is a connection that will be used in the future, once it is ready.
  #futureConnState;
  closed;
  protocol;
  #isSchemaDatabase;
  #promiseLimitFunction;
  /** @private */
  constructor(client, url, authToken, intMode, concurrency) {
    this.#url = url;
    this.#authToken = authToken;
    this.#intMode = intMode;
    this.#connState = this.#openConn(client);
    this.#futureConnState = void 0;
    this.closed = false;
    this.protocol = "ws";
    this.#promiseLimitFunction = (0, import_promise_limit.default)(concurrency);
  }
  async limit(fn) {
    return this.#promiseLimitFunction(fn);
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const hranaStmt = stmtToHrana(stmt);
        streamState.conn.sqlCache.apply([hranaStmt]);
        const hranaRowsPromise = streamState.stream.query(hranaStmt);
        streamState.stream.closeGracefully();
        const hranaRowsResult = await hranaRowsPromise;
        return resultSetFromHrana(hranaRowsResult);
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async batch(stmts, mode = "deferred") {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version3 = await streamState.conn.client.getVersion();
        streamState.conn.sqlCache.apply(hranaStmts);
        const batch = streamState.stream.batch(version3 >= 3);
        const resultsPromise = executeHranaBatch(mode, version3, batch, hranaStmts);
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async migrate(stmts) {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version3 = await streamState.conn.client.getVersion();
        const batch = streamState.stream.batch(version3 >= 3);
        const resultsPromise = executeHranaBatch("deferred", version3, batch, hranaStmts, true);
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async transaction(mode = "write") {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const version3 = await streamState.conn.client.getVersion();
        return new WsTransaction(this, streamState, mode, version3);
      } catch (e) {
        this._closeStream(streamState);
        throw mapHranaError(e);
      }
    });
  }
  async executeMultiple(sql) {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const promise = streamState.stream.sequence(sql);
        streamState.stream.closeGracefully();
        await promise;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  sync() {
    throw new LibsqlError("sync not supported in ws mode", "SYNC_NOT_SUPPORTED");
  }
  async #openStream() {
    if (this.closed) {
      throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
    }
    const now = /* @__PURE__ */ new Date();
    const ageMillis = now.valueOf() - this.#connState.openTime.valueOf();
    if (ageMillis > maxConnAgeMillis && this.#futureConnState === void 0) {
      const futureConnState = this.#openConn();
      this.#futureConnState = futureConnState;
      futureConnState.client.getVersion().then((_version) => {
        if (this.#connState !== futureConnState) {
          if (this.#connState.streamStates.size === 0) {
            this.#connState.client.close();
          } else {
          }
        }
        this.#connState = futureConnState;
        this.#futureConnState = void 0;
      }, (_e) => {
        this.#futureConnState = void 0;
      });
    }
    if (this.#connState.client.closed) {
      try {
        if (this.#futureConnState !== void 0) {
          this.#connState = this.#futureConnState;
        } else {
          this.#connState = this.#openConn();
        }
      } catch (e) {
        throw mapHranaError(e);
      }
    }
    const connState = this.#connState;
    try {
      if (connState.useSqlCache === void 0) {
        connState.useSqlCache = await connState.client.getVersion() >= 2;
        if (connState.useSqlCache) {
          connState.sqlCache.capacity = sqlCacheCapacity;
        }
      }
      const stream = connState.client.openStream();
      stream.intMode = this.#intMode;
      const streamState = { conn: connState, stream };
      connState.streamStates.add(streamState);
      return streamState;
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  #openConn(client) {
    try {
      client ??= openWs(this.#url, this.#authToken);
      return {
        client,
        useSqlCache: void 0,
        sqlCache: new SqlCache(client, 0),
        openTime: /* @__PURE__ */ new Date(),
        streamStates: /* @__PURE__ */ new Set()
      };
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  _closeStream(streamState) {
    streamState.stream.close();
    const connState = streamState.conn;
    connState.streamStates.delete(streamState);
    if (connState.streamStates.size === 0 && connState !== this.#connState) {
      connState.client.close();
    }
  }
  close() {
    this.#connState.client.close();
    this.closed = true;
  }
};
__name(WsClient2, "WsClient");
var WsTransaction = class extends HranaTransaction {
  #client;
  #streamState;
  /** @private */
  constructor(client, state, mode, version3) {
    super(mode, version3);
    this.#client = client;
    this.#streamState = state;
  }
  /** @private */
  _getStream() {
    return this.#streamState.stream;
  }
  /** @private */
  _getSqlCache() {
    return this.#streamState.conn.sqlCache;
  }
  close() {
    this.#client._closeStream(this.#streamState);
  }
  get closed() {
    return this.#streamState.stream.closed;
  }
};
__name(WsTransaction, "WsTransaction");

// node_modules/@libsql/client/lib-esm/http.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_promise_limit2 = __toESM(require_promise_limit(), 1);
function _createClient2(config2) {
  if (config2.scheme !== "https" && config2.scheme !== "http") {
    throw new LibsqlError(`The HTTP client supports only "libsql:", "https:" and "http:" URLs, got ${JSON.stringify(config2.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config2.encryptionKey !== void 0) {
    throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
  }
  if (config2.scheme === "http" && config2.tls) {
    throw new LibsqlError(`A "http:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config2.scheme === "https" && !config2.tls) {
    throw new LibsqlError(`A "https:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config2.scheme, config2.authority, config2.path);
  return new HttpClient2(url, config2.authToken, config2.intMode, config2.fetch, config2.concurrency);
}
__name(_createClient2, "_createClient");
var sqlCacheCapacity2 = 30;
var HttpClient2 = class {
  #client;
  protocol;
  #authToken;
  #promiseLimitFunction;
  /** @private */
  constructor(url, authToken, intMode, customFetch, concurrency) {
    this.#client = openHttp(url, authToken, customFetch);
    this.#client.intMode = intMode;
    this.protocol = "http";
    this.#authToken = authToken;
    this.#promiseLimitFunction = (0, import_promise_limit2.default)(concurrency);
  }
  async limit(fn) {
    return this.#promiseLimitFunction(fn);
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    return this.limit(async () => {
      try {
        const hranaStmt = stmtToHrana(stmt);
        let rowsPromise;
        const stream = this.#client.openStream();
        try {
          rowsPromise = stream.query(hranaStmt);
        } finally {
          stream.closeGracefully();
        }
        const rowsResult = await rowsPromise;
        return resultSetFromHrana(rowsResult);
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async batch(stmts, mode = "deferred") {
    return this.limit(async () => {
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version3 = await this.#client.getVersion();
        let resultsPromise;
        const stream = this.#client.openStream();
        try {
          const sqlCache = new SqlCache(stream, sqlCacheCapacity2);
          sqlCache.apply(hranaStmts);
          const batch = stream.batch(false);
          resultsPromise = executeHranaBatch(mode, version3, batch, hranaStmts);
        } finally {
          stream.closeGracefully();
        }
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async migrate(stmts) {
    return this.limit(async () => {
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version3 = await this.#client.getVersion();
        let resultsPromise;
        const stream = this.#client.openStream();
        try {
          const batch = stream.batch(false);
          resultsPromise = executeHranaBatch("deferred", version3, batch, hranaStmts, true);
        } finally {
          stream.closeGracefully();
        }
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async transaction(mode = "write") {
    return this.limit(async () => {
      try {
        const version3 = await this.#client.getVersion();
        return new HttpTransaction(this.#client.openStream(), mode, version3);
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async executeMultiple(sql) {
    return this.limit(async () => {
      try {
        let promise;
        const stream = this.#client.openStream();
        try {
          promise = stream.sequence(sql);
        } finally {
          stream.closeGracefully();
        }
        await promise;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  sync() {
    throw new LibsqlError("sync not supported in http mode", "SYNC_NOT_SUPPORTED");
  }
  close() {
    this.#client.close();
  }
  get closed() {
    return this.#client.closed;
  }
};
__name(HttpClient2, "HttpClient");
var HttpTransaction = class extends HranaTransaction {
  #stream;
  #sqlCache;
  /** @private */
  constructor(stream, mode, version3) {
    super(mode, version3);
    this.#stream = stream;
    this.#sqlCache = new SqlCache(stream, sqlCacheCapacity2);
  }
  /** @private */
  _getStream() {
    return this.#stream;
  }
  /** @private */
  _getSqlCache() {
    return this.#sqlCache;
  }
  close() {
    this.#stream.close();
  }
  get closed() {
    return this.#stream.closed;
  }
};
__name(HttpTransaction, "HttpTransaction");

// node_modules/@libsql/client/lib-esm/web.js
function createClient(config2) {
  return _createClient3(expandConfig(config2, true));
}
__name(createClient, "createClient");
function _createClient3(config2) {
  if (config2.scheme === "ws" || config2.scheme === "wss") {
    return _createClient(config2);
  } else if (config2.scheme === "http" || config2.scheme === "https") {
    return _createClient2(config2);
  } else {
    throw new LibsqlError(`The client that uses Web standard APIs supports only "libsql:", "wss:", "ws:", "https:" and "http:" URLs, got ${JSON.stringify(config2.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
}
__name(_createClient3, "_createClient");

// src/lib/db.js
var cached = null;
function getDb(env2) {
  if (cached)
    return cached;
  cached = createClient({
    url: env2.TURSO_URL,
    authToken: env2.TURSO_AUTH_TOKEN || void 0
  });
  return cached;
}
__name(getDb, "getDb");
var SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    phone TEXT,
    google_id TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id) WHERE google_id IS NOT NULL`,
  `CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    mrp REAL NOT NULL,
    rating REAL NOT NULL DEFAULT 4.5,
    description TEXT NOT NULL DEFAULT '',
    materials_care TEXT NOT NULL DEFAULT '',
    shipping_returns TEXT NOT NULL DEFAULT '',
    images TEXT NOT NULL DEFAULT '[]',
    videos TEXT NOT NULL DEFAULT '[]',
    colors TEXT NOT NULL DEFAULT '[]',
    bg TEXT NOT NULL DEFAULT '',
    is_bestseller INTEGER NOT NULL DEFAULT 0,
    is_new_arrival INTEGER NOT NULL DEFAULT 0,
    is_featured INTEGER NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 100,
    active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`,
  `CREATE INDEX IF NOT EXISTS idx_products_active ON products(active)`,
  `CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label TEXT,
    line1 TEXT NOT NULL,
    line2 TEXT,
    city TEXT NOT NULL,
    state TEXT,
    postal_code TEXT,
    country TEXT NOT NULL DEFAULT 'India',
    is_default INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    product_price REAL NOT NULL,
    product_image TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, product_name)
  )`,
  `CREATE TABLE IF NOT EXISTS wishlist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    product_price REAL NOT NULL,
    product_image TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, product_name)
  )`,
  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_number TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'placed',
    total_amount REAL NOT NULL,
    currency_code TEXT NOT NULL DEFAULT 'INR',
    promo_code TEXT,
    discount_amount REAL NOT NULL DEFAULT 0,
    shipping_name TEXT,
    shipping_line1 TEXT,
    shipping_line2 TEXT,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_postal_code TEXT,
    shipping_country TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS invoice_counters (
    fy TEXT PRIMARY KEY,
    last_number INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    product_price REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1
  )`,
  `CREATE TABLE IF NOT EXISTS order_status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    note TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    reviewer_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, order_id, product_name)
  )`,
  `CREATE TABLE IF NOT EXISTS promo_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('percent', 'flat')),
    value REAL NOT NULL,
    min_order_amount REAL NOT NULL DEFAULT 0,
    max_discount_amount REAL,
    usage_limit INTEGER,
    used_count INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    expires_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  // Tracks which emails have already been sent for which order+kind, so a
  // status update replayed (e.g. admin double-clicks, or a retried request)
  // never sends the same "order delivered" or "please review" email twice.
  `CREATE TABLE IF NOT EXISTS sent_emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    kind TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(order_id, kind)
  )`,
  // Generic key/value store for site-wide content the admin "Website Editor"
  // manages: hero image, homepage banners, the single shared "materials &
  // care" / "shipping & returns" text shown on every product page, etc. One
  // flat table keeps this flexible without a schema change every time a new
  // editable bit of copy/image is added.
  `CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  // Storefront "shop by category" tiles — admin-managed so categories can be
  // added/renamed/reordered/have their image changed without touching code.
  `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  // Curated testimonials shown on the homepage. Separate from `reviews`
  // (which are real, verified-purchase, per-product reviews written by
  // customers) so the two can never get mixed up in the admin UI.
  `CREATE TABLE IF NOT EXISTS featured_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    product_name TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  // One row per (promo code, customer) that has ever redeemed it — lets
  // "usage limit" mean "this many different customers", each customer only
  // ever able to use a given code once, instead of a single shared counter
  // that one person could exhaust alone.
  `CREATE TABLE IF NOT EXISTS promo_redemptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    promo_code_id INTEGER NOT NULL REFERENCES promo_codes(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(promo_code_id, user_id)
  )`,
  // A customer-raised issue against a delivered order (damaged item, wrong
  // product, etc). `images` is a JSON array of up to 5 R2 URLs uploaded via
  // the customer-scoped /api/uploads endpoint. Only raisable within 7 days
  // of delivery — enforced in the route, not here.
  `CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_name TEXT,
    description TEXT NOT NULL,
    images TEXT NOT NULL DEFAULT '[]',
    phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  // One row per active admin login. The admin cookie is already a browser
  // *session* cookie, but browsers restore session cookies on restart
  // ("continue where you left off", crash recovery), so the cookie alone
  // cannot guarantee an admin is logged out after closing the browser.
  // Holding the session server-side lets us enforce a real idle timeout and
  // revoke sessions on logout, which a stateless JWT cannot do.
  `CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_seen_at TEXT NOT NULL DEFAULT (datetime('now')),
    revoked INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin ON admin_sessions(admin_id)`,
  // Failed admin login attempts, used to lock an account out temporarily
  // after repeated wrong passwords. Cleared on a successful login.
  `CREATE TABLE IF NOT EXISTS admin_login_attempts (
    email TEXT PRIMARY KEY,
    failed_count INTEGER NOT NULL DEFAULT 0,
    last_failed_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  // Every Razorpay order ever opened against one of ours. orders.payment_order_id
  // only remembers the latest attempt, so a customer who abandons a payment and
  // tries again overwrites it — and a late 'payment.captured' webhook for the
  // earlier attempt would then match nothing, taking money the shop never
  // records. This keeps the whole trail, so any attempt still resolves home.
  `CREATE TABLE IF NOT EXISTS order_payment_attempts (
    razorpay_order_id TEXT PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    amount_paise INTEGER,
    payment_option TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`
];
var NEW_COLUMNS = [
  { table: "orders", column: "shipping_phone", ddl: "TEXT" },
  // Set on a row the shop created to hold a custom order for someone who has
  // never signed in — there is no account yet, only an email address the order
  // was sent to. Such a row carries an empty password_hash and cannot be
  // logged into; it is claimed the moment that person signs in with Google (
  // which matches on email) or signs up with a password. Cleared then.
  { table: "users", column: "invited_at", ddl: "TEXT" },
  // Marks an order an admin created on a customer's behalf (e.g. a bespoke/
  // custom item not in the catalog) rather than one the customer placed
  // themselves via checkout. Such orders start in the 'awaiting_payment'
  // status until the customer reviews + confirms them from their account.
  { table: "orders", column: "created_by_admin", ddl: "INTEGER NOT NULL DEFAULT 0" },
  // Guest orders still attach to an email identity for invoices and status updates,
  // but require a separate signed link token when opened outside an account.
  { table: "orders", column: "guest_checkout", ddl: "INTEGER NOT NULL DEFAULT 0" },
  // Snapshot the delivery/status contact email on each order without changing account login details.
  { table: "orders", column: "contact_email", ddl: "TEXT" },
  { table: "orders", column: "custom_note", ddl: "TEXT" },
  // A 4th homepage-section flag alongside is_bestseller/is_featured/is_new_arrival
  // (Top Picks / Shop by Trend / New Arrivals) — lets the admin control which
  // products show in the homepage "Spotlight" carousel the same way.
  { table: "products", column: "is_spotlight", ddl: "INTEGER NOT NULL DEFAULT 0" },
  // Snapshotted at order-creation time (looked up from the product's current
  // first image) rather than joined live, so an order still shows the right
  // photo even if that product is later edited, discontinued, or deleted.
  { table: "order_items", column: "product_image", ddl: "TEXT" },
  // Per-section display position on the homepage. `products.sort_order` is a
  // single global position, so a product that appears in two carousels could
  // not be placed differently in each. One column per flag-driven section
  // lets the Website Editor order every carousel independently. Lower comes
  // first; ties fall back to sort_order then id.
  { table: "products", column: "bestseller_order", ddl: "INTEGER NOT NULL DEFAULT 0" },
  { table: "products", column: "featured_order", ddl: "INTEGER NOT NULL DEFAULT 0" },
  { table: "products", column: "new_arrival_order", ddl: "INTEGER NOT NULL DEFAULT 0" },
  { table: "products", column: "spotlight_order", ddl: "INTEGER NOT NULL DEFAULT 0" },
  // Option groups, as JSON: [{ name, choices: [{ label, price? }] }]. A choice
  // with a price replaces the product's price when picked — a set sold as
  // "Necklace 800 / Fullset 8000" is one product with one group, not five
  // products. A choice without one is a plain choice, like a colour.
  { table: "products", column: "variants", ddl: "TEXT NOT NULL DEFAULT '[]'" },
  // The homepage's "Currently on Sale" row, managed the same way as the other
  // carousels rather than the hardcoded placeholder list it used to render.
  { table: "products", column: "is_on_sale", ddl: "INTEGER NOT NULL DEFAULT 0" },
  // Razorpay. payment_status is the money's own state, kept apart from the
  // order's fulfilment status: an order can be 'placed' and refunded, or
  // 'awaiting_payment' and abandoned.
  { table: "orders", column: "payment_status", ddl: "TEXT NOT NULL DEFAULT 'unpaid'" },
  { table: "orders", column: "payment_option", ddl: "TEXT NOT NULL DEFAULT 'full'" },
  { table: "orders", column: "amount_paid", ddl: "REAL NOT NULL DEFAULT 0" },
  { table: "orders", column: "payment_provider", ddl: "TEXT" },
  { table: "orders", column: "payment_order_id", ddl: "TEXT" },
  { table: "orders", column: "payment_id", ddl: "TEXT" },
  { table: "orders", column: "payment_method", ddl: "TEXT" },
  { table: "orders", column: "paid_at", ddl: "TEXT" },
    { table: "orders", column: "manual_payment_reference", ddl: "TEXT" },
  { table: "order_payment_attempts", column: "amount_paise", ddl: "INTEGER" },
  { table: "order_payment_attempts", column: "payment_option", ddl: "TEXT" },
  // Shipping and GST, worked out by the Worker at checkout and frozen on the
  // order — the invoice has to show what was actually charged, not what
  // today's rates would give.
  { table: "orders", column: "shipping_amount", ddl: "REAL NOT NULL DEFAULT 0" },
  { table: "orders", column: "shipping_method", ddl: "TEXT" },
  { table: "orders", column: "tax_amount", ddl: "REAL NOT NULL DEFAULT 0" },
  { table: "orders", column: "tax_type", ddl: "TEXT" },
  { table: "orders", column: "tax_rate", ddl: "REAL NOT NULL DEFAULT 0" },
  { table: "orders", column: "invoice_number", ddl: "TEXT" },
  { table: "products", column: "on_sale_order", ddl: "INTEGER NOT NULL DEFAULT 0" }
];
async function addMissingColumns(db) {
  const tables = [...new Set(NEW_COLUMNS.map((c) => c.table))];
  const infos = await db.batch(
    tables.map((t) => `PRAGMA table_info(${t})`),
    "read"
  );
  const columnsByTable = /* @__PURE__ */ new Map();
  tables.forEach((t, i) => {
    columnsByTable.set(t, new Set(infos[i].rows.map((r) => r.name)));
  });
  const missing = NEW_COLUMNS.filter(({ table: table3, column }) => !columnsByTable.get(table3)?.has(column));
  if (missing.length === 0)
    return;
  for (const { table: table3, column, ddl } of missing) {
    await db.execute(`ALTER TABLE ${table3} ADD COLUMN ${column} ${ddl}`);
  }
}
__name(addMissingColumns, "addMissingColumns");
var schemaReady = null;
async function ensureSchema(env2) {
  if (schemaReady)
    return schemaReady;
  const db = getDb(env2);
  schemaReady = (async () => {
    await db.batch(SCHEMA_STATEMENTS, "write");
    await addMissingColumns(db);
  })();
  schemaReady.catch(() => {
    schemaReady = null;
  });
  return schemaReady;
}
__name(ensureSchema, "ensureSchema");

// src/lib/google.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/runtime/base64url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/lib/buffer_utils.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/runtime/webcrypto.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var webcrypto_default = crypto;
var isCryptoKey = /* @__PURE__ */ __name((key) => key instanceof CryptoKey, "isCryptoKey");

// node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}
__name(concat, "concat");

// node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64 = /* @__PURE__ */ __name((input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
}, "encodeBase64");
var encode2 = /* @__PURE__ */ __name((input) => {
  return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}, "encode");
var decodeBase64 = /* @__PURE__ */ __name((encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}, "decodeBase64");
var decode2 = /* @__PURE__ */ __name((input) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}, "decode");

// node_modules/jose/dist/browser/util/errors.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var JOSEError = class extends Error {
  constructor(message2, options) {
    super(message2, options);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
__name(JOSEError, "JOSEError");
JOSEError.code = "ERR_JOSE_GENERIC";
var JWTClaimValidationFailed = class extends JOSEError {
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
__name(JWTClaimValidationFailed, "JWTClaimValidationFailed");
JWTClaimValidationFailed.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var JWTExpired = class extends JOSEError {
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_EXPIRED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
__name(JWTExpired, "JWTExpired");
JWTExpired.code = "ERR_JWT_EXPIRED";
var JOSEAlgNotAllowed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
__name(JOSEAlgNotAllowed, "JOSEAlgNotAllowed");
JOSEAlgNotAllowed.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var JOSENotSupported = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
};
__name(JOSENotSupported, "JOSENotSupported");
JOSENotSupported.code = "ERR_JOSE_NOT_SUPPORTED";
var JWEDecryptionFailed = class extends JOSEError {
  constructor(message2 = "decryption operation failed", options) {
    super(message2, options);
    this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
};
__name(JWEDecryptionFailed, "JWEDecryptionFailed");
JWEDecryptionFailed.code = "ERR_JWE_DECRYPTION_FAILED";
var JWEInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_INVALID";
  }
};
__name(JWEInvalid, "JWEInvalid");
JWEInvalid.code = "ERR_JWE_INVALID";
var JWSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_INVALID";
  }
};
__name(JWSInvalid, "JWSInvalid");
JWSInvalid.code = "ERR_JWS_INVALID";
var JWTInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWT_INVALID";
  }
};
__name(JWTInvalid, "JWTInvalid");
JWTInvalid.code = "ERR_JWT_INVALID";
var JWKInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWK_INVALID";
  }
};
__name(JWKInvalid, "JWKInvalid");
JWKInvalid.code = "ERR_JWK_INVALID";
var JWKSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_INVALID";
  }
};
__name(JWKSInvalid, "JWKSInvalid");
JWKSInvalid.code = "ERR_JWKS_INVALID";
var JWKSNoMatchingKey = class extends JOSEError {
  constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
};
__name(JWKSNoMatchingKey, "JWKSNoMatchingKey");
JWKSNoMatchingKey.code = "ERR_JWKS_NO_MATCHING_KEY";
var JWKSMultipleMatchingKeys = class extends JOSEError {
  constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
};
__name(JWKSMultipleMatchingKeys, "JWKSMultipleMatchingKeys");
JWKSMultipleMatchingKeys.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var JWKSTimeout = class extends JOSEError {
  constructor(message2 = "request timed out", options) {
    super(message2, options);
    this.code = "ERR_JWKS_TIMEOUT";
  }
};
__name(JWKSTimeout, "JWKSTimeout");
JWKSTimeout.code = "ERR_JWKS_TIMEOUT";
var JWSSignatureVerificationFailed = class extends JOSEError {
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
    this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};
__name(JWSSignatureVerificationFailed, "JWSSignatureVerificationFailed");
JWSSignatureVerificationFailed.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";

// node_modules/jose/dist/browser/lib/crypto_key.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
__name(unusable, "unusable");
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
__name(isAlgorithm, "isAlgorithm");
function getHashLength(hash2) {
  return parseInt(hash2.name.slice(4), 10);
}
__name(getHashLength, "getHashLength");
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
__name(getNamedCurve, "getNamedCurve");
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
__name(checkUsage, "checkUsage");
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "Ed25519": {
      if (!isAlgorithm(key.algorithm, "Ed25519"))
        throw unusable("Ed25519");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}
__name(checkSigCryptoKey, "checkSigCryptoKey");

// node_modules/jose/dist/browser/lib/invalid_key_input.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function message(msg, actual, ...types2) {
  types2 = types2.filter(Boolean);
  if (types2.length > 2) {
    const last = types2.pop();
    msg += `one of type ${types2.join(", ")}, or ${last}.`;
  } else if (types2.length === 2) {
    msg += `one of type ${types2[0]} or ${types2[1]}.`;
  } else {
    msg += `of type ${types2[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
__name(message, "message");
var invalid_key_input_default = /* @__PURE__ */ __name((actual, ...types2) => {
  return message("Key must be ", actual, ...types2);
}, "default");
function withAlg(alg, actual, ...types2) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
}
__name(withAlg, "withAlg");

// node_modules/jose/dist/browser/runtime/is_key_like.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var is_key_like_default = /* @__PURE__ */ __name((key) => {
  if (isCryptoKey(key)) {
    return true;
  }
  return key?.[Symbol.toStringTag] === "KeyObject";
}, "default");
var types = ["CryptoKey"];

// node_modules/jose/dist/browser/lib/is_disjoint.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var isDisjoint = /* @__PURE__ */ __name((...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
}, "isDisjoint");
var is_disjoint_default = isDisjoint;

// node_modules/jose/dist/browser/lib/is_object.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
__name(isObjectLike, "isObjectLike");
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}
__name(isObject, "isObject");

// node_modules/jose/dist/browser/runtime/check_key_length.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var check_key_length_default = /* @__PURE__ */ __name((alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
}, "default");

// node_modules/jose/dist/browser/runtime/normalize_key.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/lib/is_jwk.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function isJWK(key) {
  return isObject(key) && typeof key.kty === "string";
}
__name(isJWK, "isJWK");
function isPrivateJWK(key) {
  return key.kty !== "oct" && typeof key.d === "string";
}
__name(isPrivateJWK, "isPrivateJWK");
function isPublicJWK(key) {
  return key.kty !== "oct" && typeof key.d === "undefined";
}
__name(isPublicJWK, "isPublicJWK");
function isSecretJWK(key) {
  return isJWK(key) && key.kty === "oct" && typeof key.k === "string";
}
__name(isSecretJWK, "isSecretJWK");

// node_modules/jose/dist/browser/runtime/jwk_to_key.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
          algorithm = { name: "ECDSA", namedCurve: "P-256" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          algorithm = { name: "ECDSA", namedCurve: "P-384" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          algorithm = { name: "ECDSA", namedCurve: "P-521" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "Ed25519":
          algorithm = { name: "Ed25519" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "EdDSA":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
__name(subtleMapping, "subtleMapping");
var parse = /* @__PURE__ */ __name(async (jwk) => {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const rest = [
    algorithm,
    jwk.ext ?? false,
    jwk.key_ops ?? keyUsages
  ];
  const keyData = { ...jwk };
  delete keyData.alg;
  delete keyData.use;
  return webcrypto_default.subtle.importKey("jwk", keyData, ...rest);
}, "parse");
var jwk_to_key_default = parse;

// node_modules/jose/dist/browser/runtime/normalize_key.js
var exportKeyValue = /* @__PURE__ */ __name((k) => decode2(k), "exportKeyValue");
var privCache;
var pubCache;
var isKeyObject = /* @__PURE__ */ __name((key) => {
  return key?.[Symbol.toStringTag] === "KeyObject";
}, "isKeyObject");
var importAndCache = /* @__PURE__ */ __name(async (cache, key, jwk, alg, freeze = false) => {
  let cached2 = cache.get(key);
  if (cached2?.[alg]) {
    return cached2[alg];
  }
  const cryptoKey = await jwk_to_key_default({ ...jwk, alg });
  if (freeze)
    Object.freeze(key);
  if (!cached2) {
    cache.set(key, { [alg]: cryptoKey });
  } else {
    cached2[alg] = cryptoKey;
  }
  return cryptoKey;
}, "importAndCache");
var normalizePublicKey = /* @__PURE__ */ __name((key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    delete jwk.d;
    delete jwk.dp;
    delete jwk.dq;
    delete jwk.p;
    delete jwk.q;
    delete jwk.qi;
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(pubCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode2(key.k);
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(pubCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
}, "normalizePublicKey");
var normalizePrivateKey = /* @__PURE__ */ __name((key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(privCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode2(key.k);
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(privCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
}, "normalizePrivateKey");
var normalize_key_default = { normalizePublicKey, normalizePrivateKey };

// node_modules/jose/dist/browser/key/import.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function importJWK(jwk, alg) {
  if (!isObject(jwk)) {
    throw new TypeError("JWK must be an object");
  }
  alg || (alg = jwk.alg);
  switch (jwk.kty) {
    case "oct":
      if (typeof jwk.k !== "string" || !jwk.k) {
        throw new TypeError('missing "k" (Key Value) Parameter value');
      }
      return decode2(jwk.k);
    case "RSA":
      if ("oth" in jwk && jwk.oth !== void 0) {
        throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
      }
    case "EC":
    case "OKP":
      return jwk_to_key_default({ ...jwk, alg });
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}
__name(importJWK, "importJWK");

// node_modules/jose/dist/browser/lib/check_key_type.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var tag = /* @__PURE__ */ __name((key) => key?.[Symbol.toStringTag], "tag");
var jwkMatchesOp = /* @__PURE__ */ __name((alg, key, usage) => {
  if (key.use !== void 0 && key.use !== "sig") {
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  }
  if (key.key_ops !== void 0 && key.key_ops.includes?.(usage) !== true) {
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
  }
  return true;
}, "jwkMatchesOp");
var symmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage, allowJwk) => {
  if (key instanceof Uint8Array)
    return;
  if (allowJwk && isJWK(key)) {
    if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
      return;
    throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, "Uint8Array", allowJwk ? "JSON Web Key" : null));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
  }
}, "symmetricTypeCheck");
var asymmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage, allowJwk) => {
  if (allowJwk && isJWK(key)) {
    switch (usage) {
      case "sign":
        if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a private JWK`);
      case "verify":
        if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a public JWK`);
    }
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, allowJwk ? "JSON Web Key" : null));
  }
  if (key.type === "secret") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
  }
}, "asymmetricTypeCheck");
function checkKeyType(allowJwk, alg, key, usage) {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key, usage, allowJwk);
  } else {
    asymmetricTypeCheck(alg, key, usage, allowJwk);
  }
}
__name(checkKeyType, "checkKeyType");
var check_key_type_default = checkKeyType.bind(void 0, false);
var checkKeyTypeWithJwk = checkKeyType.bind(void 0, true);

// node_modules/jose/dist/browser/lib/validate_crit.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
__name(validateCrit, "validateCrit");
var validate_crit_default = validateCrit;

// node_modules/jose/dist/browser/lib/validate_algorithms.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var validateAlgorithms = /* @__PURE__ */ __name((option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
}, "validateAlgorithms");
var validate_algorithms_default = validateAlgorithms;

// node_modules/jose/dist/browser/jws/compact/verify.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/jws/flattened/verify.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/runtime/verify.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/runtime/subtle_dsa.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function subtleDsa(alg, algorithm) {
  const hash2 = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash: hash2, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash: hash2, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash: hash2, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash: hash2, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "Ed25519":
      return { name: "Ed25519" };
    case "EdDSA":
      return { name: algorithm.name };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}
__name(subtleDsa, "subtleDsa");

// node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function getCryptoKey(alg, key, usage) {
  if (usage === "sign") {
    key = await normalize_key_default.normalizePrivateKey(key, alg);
  }
  if (usage === "verify") {
    key = await normalize_key_default.normalizePublicKey(key, alg);
  }
  if (isCryptoKey(key)) {
    checkSigCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return webcrypto_default.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array", "JSON Web Key"));
}
__name(getCryptoKey, "getCryptoKey");

// node_modules/jose/dist/browser/runtime/verify.js
var verify2 = /* @__PURE__ */ __name(async (alg, key, signature, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "verify");
  check_key_length_default(alg, cryptoKey);
  const algorithm = subtleDsa(alg, cryptoKey.algorithm);
  try {
    return await webcrypto_default.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
}, "verify");
var verify_default = verify2;

// node_modules/jose/dist/browser/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  if (!isObject(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode2(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!is_disjoint_default(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
    checkKeyTypeWithJwk(alg, key, "verify");
    if (isJWK(key)) {
      key = await importJWK(key, alg);
    }
  } else {
    checkKeyTypeWithJwk(alg, key, "verify");
  }
  const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
  let signature;
  try {
    signature = decode2(jws.signature);
  } catch {
    throw new JWSInvalid("Failed to base64url decode the signature");
  }
  const verified = await verify_default(alg, key, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    try {
      payload = decode2(jws.payload);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the payload");
    }
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result, key };
  }
  return result;
}
__name(flattenedVerify, "flattenedVerify");

// node_modules/jose/dist/browser/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
__name(compactVerify, "compactVerify");

// node_modules/jose/dist/browser/jwt/verify.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/lib/epoch.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var epoch_default = /* @__PURE__ */ __name((date) => Math.floor(date.getTime() / 1e3), "default");

// node_modules/jose/dist/browser/lib/secs.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs_default = /* @__PURE__ */ __name((str) => {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
}, "default");

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
var normalizeTyp = /* @__PURE__ */ __name((value) => value.toLowerCase().replace(/^application\//, ""), "normalizeTyp");
var checkAudiencePresence = /* @__PURE__ */ __name((audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
}, "checkAudiencePresence");
var jwt_claims_set_default = /* @__PURE__ */ __name((protectedHeader, encodedPayload, options = {}) => {
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs_default(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
    }
  }
  return payload;
}, "default");

// node_modules/jose/dist/browser/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  const verified = await compactVerify(jwt, key, options);
  if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = jwt_claims_set_default(verified.protectedHeader, verified.payload, options);
  const result = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
__name(jwtVerify, "jwtVerify");

// node_modules/jose/dist/browser/jws/compact/sign.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/jws/flattened/sign.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/runtime/sign.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var sign2 = /* @__PURE__ */ __name(async (alg, key, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "sign");
  check_key_length_default(alg, cryptoKey);
  const signature = await webcrypto_default.subtle.sign(subtleDsa(alg, cryptoKey.algorithm), cryptoKey, data);
  return new Uint8Array(signature);
}, "sign");
var sign_default = sign2;

// node_modules/jose/dist/browser/jws/flattened/sign.js
var FlattenedSign = class {
  constructor(payload) {
    if (!(payload instanceof Uint8Array)) {
      throw new TypeError("payload must be an instance of Uint8Array");
    }
    this._payload = payload;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  async sign(key, options) {
    if (!this._protectedHeader && !this._unprotectedHeader) {
      throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    }
    if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...this._protectedHeader,
      ...this._unprotectedHeader
    };
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this._protectedHeader, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = this._protectedHeader.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    checkKeyTypeWithJwk(alg, key, "sign");
    let payload = this._payload;
    if (b64) {
      payload = encoder.encode(encode2(payload));
    }
    let protectedHeader;
    if (this._protectedHeader) {
      protectedHeader = encoder.encode(encode2(JSON.stringify(this._protectedHeader)));
    } else {
      protectedHeader = encoder.encode("");
    }
    const data = concat(protectedHeader, encoder.encode("."), payload);
    const signature = await sign_default(alg, key, data);
    const jws = {
      signature: encode2(signature),
      payload: ""
    };
    if (b64) {
      jws.payload = decoder.decode(payload);
    }
    if (this._unprotectedHeader) {
      jws.header = this._unprotectedHeader;
    }
    if (this._protectedHeader) {
      jws.protected = decoder.decode(protectedHeader);
    }
    return jws;
  }
};
__name(FlattenedSign, "FlattenedSign");

// node_modules/jose/dist/browser/jws/compact/sign.js
var CompactSign = class {
  constructor(payload) {
    this._flattened = new FlattenedSign(payload);
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  async sign(key, options) {
    const jws = await this._flattened.sign(key, options);
    if (jws.payload === void 0) {
      throw new TypeError("use the flattened module for creating JWS with b64: false");
    }
    return `${jws.protected}.${jws.payload}.${jws.signature}`;
  }
};
__name(CompactSign, "CompactSign");

// node_modules/jose/dist/browser/jwt/sign.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/jwt/produce.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function validateInput(label, input) {
  if (!Number.isFinite(input)) {
    throw new TypeError(`Invalid ${label} input`);
  }
  return input;
}
__name(validateInput, "validateInput");
var ProduceJWT = class {
  constructor(payload = {}) {
    if (!isObject(payload)) {
      throw new TypeError("JWT Claims Set MUST be an object");
    }
    this._payload = payload;
  }
  setIssuer(issuer) {
    this._payload = { ...this._payload, iss: issuer };
    return this;
  }
  setSubject(subject) {
    this._payload = { ...this._payload, sub: subject };
    return this;
  }
  setAudience(audience) {
    this._payload = { ...this._payload, aud: audience };
    return this;
  }
  setJti(jwtId) {
    this._payload = { ...this._payload, jti: jwtId };
    return this;
  }
  setNotBefore(input) {
    if (typeof input === "number") {
      this._payload = { ...this._payload, nbf: validateInput("setNotBefore", input) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, nbf: validateInput("setNotBefore", epoch_default(input)) };
    } else {
      this._payload = { ...this._payload, nbf: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
    }
    return this;
  }
  setExpirationTime(input) {
    if (typeof input === "number") {
      this._payload = { ...this._payload, exp: validateInput("setExpirationTime", input) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, exp: validateInput("setExpirationTime", epoch_default(input)) };
    } else {
      this._payload = { ...this._payload, exp: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
    }
    return this;
  }
  setIssuedAt(input) {
    if (typeof input === "undefined") {
      this._payload = { ...this._payload, iat: epoch_default(/* @__PURE__ */ new Date()) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, iat: validateInput("setIssuedAt", epoch_default(input)) };
    } else if (typeof input === "string") {
      this._payload = {
        ...this._payload,
        iat: validateInput("setIssuedAt", epoch_default(/* @__PURE__ */ new Date()) + secs_default(input))
      };
    } else {
      this._payload = { ...this._payload, iat: validateInput("setIssuedAt", input) };
    }
    return this;
  }
};
__name(ProduceJWT, "ProduceJWT");

// node_modules/jose/dist/browser/jwt/sign.js
var SignJWT = class extends ProduceJWT {
  setProtectedHeader(protectedHeader) {
    this._protectedHeader = protectedHeader;
    return this;
  }
  async sign(key, options) {
    const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
    sig.setProtectedHeader(this._protectedHeader);
    if (Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    return sig.sign(key, options);
  }
};
__name(SignJWT, "SignJWT");

// node_modules/jose/dist/browser/jwks/local.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function getKtyFromAlg(alg) {
  switch (typeof alg === "string" && alg.slice(0, 2)) {
    case "RS":
    case "PS":
      return "RSA";
    case "ES":
      return "EC";
    case "Ed":
      return "OKP";
    default:
      throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
  }
}
__name(getKtyFromAlg, "getKtyFromAlg");
function isJWKSLike(jwks) {
  return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
}
__name(isJWKSLike, "isJWKSLike");
function isJWKLike(key) {
  return isObject(key);
}
__name(isJWKLike, "isJWKLike");
function clone(obj) {
  if (typeof structuredClone === "function") {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}
__name(clone, "clone");
var LocalJWKSet = class {
  constructor(jwks) {
    this._cached = /* @__PURE__ */ new WeakMap();
    if (!isJWKSLike(jwks)) {
      throw new JWKSInvalid("JSON Web Key Set malformed");
    }
    this._jwks = clone(jwks);
  }
  async getKey(protectedHeader, token) {
    const { alg, kid } = { ...protectedHeader, ...token?.header };
    const kty = getKtyFromAlg(alg);
    const candidates = this._jwks.keys.filter((jwk2) => {
      let candidate = kty === jwk2.kty;
      if (candidate && typeof kid === "string") {
        candidate = kid === jwk2.kid;
      }
      if (candidate && typeof jwk2.alg === "string") {
        candidate = alg === jwk2.alg;
      }
      if (candidate && typeof jwk2.use === "string") {
        candidate = jwk2.use === "sig";
      }
      if (candidate && Array.isArray(jwk2.key_ops)) {
        candidate = jwk2.key_ops.includes("verify");
      }
      if (candidate) {
        switch (alg) {
          case "ES256":
            candidate = jwk2.crv === "P-256";
            break;
          case "ES256K":
            candidate = jwk2.crv === "secp256k1";
            break;
          case "ES384":
            candidate = jwk2.crv === "P-384";
            break;
          case "ES512":
            candidate = jwk2.crv === "P-521";
            break;
          case "Ed25519":
            candidate = jwk2.crv === "Ed25519";
            break;
          case "EdDSA":
            candidate = jwk2.crv === "Ed25519" || jwk2.crv === "Ed448";
            break;
        }
      }
      return candidate;
    });
    const { 0: jwk, length } = candidates;
    if (length === 0) {
      throw new JWKSNoMatchingKey();
    }
    if (length !== 1) {
      const error3 = new JWKSMultipleMatchingKeys();
      const { _cached } = this;
      error3[Symbol.asyncIterator] = async function* () {
        for (const jwk2 of candidates) {
          try {
            yield await importWithAlgCache(_cached, jwk2, alg);
          } catch {
          }
        }
      };
      throw error3;
    }
    return importWithAlgCache(this._cached, jwk, alg);
  }
};
__name(LocalJWKSet, "LocalJWKSet");
async function importWithAlgCache(cache, jwk, alg) {
  const cached2 = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
  if (cached2[alg] === void 0) {
    const key = await importJWK({ ...jwk, ext: true }, alg);
    if (key instanceof Uint8Array || key.type !== "public") {
      throw new JWKSInvalid("JSON Web Key Set members must be public keys");
    }
    cached2[alg] = key;
  }
  return cached2[alg];
}
__name(importWithAlgCache, "importWithAlgCache");
function createLocalJWKSet(jwks) {
  const set = new LocalJWKSet(jwks);
  const localJWKSet = /* @__PURE__ */ __name(async (protectedHeader, token) => set.getKey(protectedHeader, token), "localJWKSet");
  Object.defineProperties(localJWKSet, {
    jwks: {
      value: () => clone(set._jwks),
      enumerable: true,
      configurable: false,
      writable: false
    }
  });
  return localJWKSet;
}
__name(createLocalJWKSet, "createLocalJWKSet");

// node_modules/jose/dist/browser/jwks/remote.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/jose/dist/browser/runtime/fetch_jwks.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var fetchJwks = /* @__PURE__ */ __name(async (url, timeout, options) => {
  let controller;
  let id;
  let timedOut = false;
  if (typeof AbortController === "function") {
    controller = new AbortController();
    id = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeout);
  }
  const response = await fetch(url.href, {
    signal: controller ? controller.signal : void 0,
    redirect: "manual",
    headers: options.headers
  }).catch((err) => {
    if (timedOut)
      throw new JWKSTimeout();
    throw err;
  });
  if (id !== void 0)
    clearTimeout(id);
  if (response.status !== 200) {
    throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
  }
  try {
    return await response.json();
  } catch {
    throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
}, "fetchJwks");
var fetch_jwks_default = fetchJwks;

// node_modules/jose/dist/browser/jwks/remote.js
function isCloudflareWorkers() {
  return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && true || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
}
__name(isCloudflareWorkers, "isCloudflareWorkers");
var USER_AGENT;
if (typeof navigator === "undefined" || !"Cloudflare-Workers"?.startsWith?.("Mozilla/5.0 ")) {
  const NAME = "jose";
  const VERSION2 = "v5.10.0";
  USER_AGENT = `${NAME}/${VERSION2}`;
}
var jwksCache = Symbol();
function isFreshJwksCache(input, cacheMaxAge) {
  if (typeof input !== "object" || input === null) {
    return false;
  }
  if (!("uat" in input) || typeof input.uat !== "number" || Date.now() - input.uat >= cacheMaxAge) {
    return false;
  }
  if (!("jwks" in input) || !isObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isObject)) {
    return false;
  }
  return true;
}
__name(isFreshJwksCache, "isFreshJwksCache");
var RemoteJWKSet = class {
  constructor(url, options) {
    if (!(url instanceof URL)) {
      throw new TypeError("url must be an instance of URL");
    }
    this._url = new URL(url.href);
    this._options = { agent: options?.agent, headers: options?.headers };
    this._timeoutDuration = typeof options?.timeoutDuration === "number" ? options?.timeoutDuration : 5e3;
    this._cooldownDuration = typeof options?.cooldownDuration === "number" ? options?.cooldownDuration : 3e4;
    this._cacheMaxAge = typeof options?.cacheMaxAge === "number" ? options?.cacheMaxAge : 6e5;
    if (options?.[jwksCache] !== void 0) {
      this._cache = options?.[jwksCache];
      if (isFreshJwksCache(options?.[jwksCache], this._cacheMaxAge)) {
        this._jwksTimestamp = this._cache.uat;
        this._local = createLocalJWKSet(this._cache.jwks);
      }
    }
  }
  coolingDown() {
    return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
  }
  fresh() {
    return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
  }
  async getKey(protectedHeader, token) {
    if (!this._local || !this.fresh()) {
      await this.reload();
    }
    try {
      return await this._local(protectedHeader, token);
    } catch (err) {
      if (err instanceof JWKSNoMatchingKey) {
        if (this.coolingDown() === false) {
          await this.reload();
          return this._local(protectedHeader, token);
        }
      }
      throw err;
    }
  }
  async reload() {
    if (this._pendingFetch && isCloudflareWorkers()) {
      this._pendingFetch = void 0;
    }
    const headers = new Headers(this._options.headers);
    if (USER_AGENT && !headers.has("User-Agent")) {
      headers.set("User-Agent", USER_AGENT);
      this._options.headers = Object.fromEntries(headers.entries());
    }
    this._pendingFetch || (this._pendingFetch = fetch_jwks_default(this._url, this._timeoutDuration, this._options).then((json) => {
      this._local = createLocalJWKSet(json);
      if (this._cache) {
        this._cache.uat = Date.now();
        this._cache.jwks = json;
      }
      this._jwksTimestamp = Date.now();
      this._pendingFetch = void 0;
    }).catch((err) => {
      this._pendingFetch = void 0;
      throw err;
    }));
    await this._pendingFetch;
  }
};
__name(RemoteJWKSet, "RemoteJWKSet");
function createRemoteJWKSet(url, options) {
  const set = new RemoteJWKSet(url, options);
  const remoteJWKSet = /* @__PURE__ */ __name(async (protectedHeader, token) => set.getKey(protectedHeader, token), "remoteJWKSet");
  Object.defineProperties(remoteJWKSet, {
    coolingDown: {
      get: () => set.coolingDown(),
      enumerable: true,
      configurable: false
    },
    fresh: {
      get: () => set.fresh(),
      enumerable: true,
      configurable: false
    },
    reload: {
      value: () => set.reload(),
      enumerable: true,
      configurable: false,
      writable: false
    },
    reloading: {
      get: () => !!set._pendingFetch,
      enumerable: true,
      configurable: false
    },
    jwks: {
      value: () => set._local?.jwks(),
      enumerable: true,
      configurable: false,
      writable: false
    }
  });
  return remoteJWKSet;
}
__name(createRemoteJWKSet, "createRemoteJWKSet");

// src/lib/google.js
var JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));
async function verifyGoogleIdToken(idToken, clientId) {
  const { payload } = await jwtVerify(idToken, JWKS, {
    issuer: ["https://accounts.google.com", "accounts.google.com"],
    audience: clientId
  });
  return payload;
}
__name(verifyGoogleIdToken, "verifyGoogleIdToken");

// src/lib/auth.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/helper/cookie/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/cookie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var relaxedCookieNameRegEx = /^[!#-:<>-[\]-~]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var trimCookieWhitespace = /* @__PURE__ */ __name((value) => {
  let start = 0;
  let end = value.length;
  while (start < end) {
    const charCode = value.charCodeAt(start);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    start++;
  }
  while (end > start) {
    const charCode = value.charCodeAt(end - 1);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    end--;
  }
  return start === 0 && end === value.length ? value : value.slice(start, end);
}, "trimCookieWhitespace");
var parse2 = /* @__PURE__ */ __name((cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.split(";");
  const parsedCookie = /* @__PURE__ */ Object.create(null);
  for (const pairStr of pairs) {
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = trimCookieWhitespace(pairStr.substring(0, valueStartPos));
    if (name && name !== cookieName || !relaxedCookieNameRegEx.test(cookieName) || cookieName in parsedCookie) {
      continue;
    }
    let cookieValue = trimCookieWhitespace(pairStr.substring(valueStartPos + 1));
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = tryDecodeURIComponent(cookieValue);
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
}, "parse");
var _serialize = /* @__PURE__ */ __name((name, value, opt = {}) => {
  if (!validCookieNameRegEx.test(name)) {
    throw new Error("Invalid cookie name");
  }
  let cookie = `${name}=${value}`;
  if (name.startsWith("__Secure-") && !opt.secure) {
    throw new Error("__Secure- Cookie must have Secure attributes");
  }
  if (name.startsWith("__Host-")) {
    if (!opt.secure) {
      throw new Error("__Host- Cookie must have Secure attributes");
    }
    if (opt.path !== "/") {
      throw new Error('__Host- Cookie must have Path attributes with "/"');
    }
    if (opt.domain) {
      throw new Error("__Host- Cookie must not have Domain attributes");
    }
  }
  for (const key of ["domain", "path", "sameSite", "priority"]) {
    if (opt[key] && /[;\r\n]/.test(opt[key])) {
      throw new Error(`${key} must not contain ";", "\\r", or "\\n"`);
    }
  }
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    if (opt.maxAge > 3456e4) {
      throw new Error(
        "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
      );
    }
    cookie += `; Max-Age=${opt.maxAge | 0}`;
  }
  if (opt.domain && opt.prefix !== "host") {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (opt.expires.getTime() - Date.now() > 3456e7) {
      throw new Error(
        "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
      );
    }
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
  }
  if (opt.priority) {
    cookie += `; Priority=${opt.priority.charAt(0).toUpperCase() + opt.priority.slice(1)}`;
  }
  if (opt.partitioned) {
    if (!opt.secure) {
      throw new Error("Partitioned Cookie must have Secure attributes");
    }
    cookie += "; Partitioned";
  }
  return cookie;
}, "_serialize");
var serialize = /* @__PURE__ */ __name((name, value, opt) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
}, "serialize");

// node_modules/hono/dist/helper/cookie/index.js
var getCookie = /* @__PURE__ */ __name((c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse2(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse2(cookie);
  return obj;
}, "getCookie");
var generateCookie = /* @__PURE__ */ __name((name, value, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
  } else if (opt?.prefix === "host") {
    cookie = serialize("__Host-" + name, value, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = serialize(name, value, { path: "/", ...opt });
  }
  return cookie;
}, "generateCookie");
var setCookie = /* @__PURE__ */ __name((c, name, value, opt) => {
  const cookie = generateCookie(name, value, opt);
  c.header("Set-Cookie", cookie, { append: true });
}, "setCookie");
var deleteCookie = /* @__PURE__ */ __name((c, name, opt) => {
  const deletedCookie = getCookie(c, name, opt?.prefix);
  setCookie(c, name, "", { ...opt, maxAge: 0 });
  return deletedCookie;
}, "deleteCookie");

// src/lib/auth.js
var CUSTOMER_COOKIE = "bob_session";
var ADMIN_COOKIE = "bob_admin_session";
var PHONE_REGEX = /^\+[1-9]\d{0,3}[\s-]?\d{6,14}$/;
var phoneField = external_exports.string().trim().regex(PHONE_REGEX, "Enter a phone number with country code, e.g. +91 98765 43210");
function secretKey(secret) {
  return new TextEncoder().encode(secret);
}
__name(secretKey, "secretKey");
async function signSession(payload, secret, expiresIn = "30d") {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(expiresIn).sign(secretKey(secret));
}
__name(signSession, "signSession");
async function verifySession(token, secret) {
  const { payload } = await jwtVerify(token, secretKey(secret));
  return payload;
}
__name(verifySession, "verifySession");
function cookieOpts(env2, maxAgeSeconds) {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
    maxAge: maxAgeSeconds
  };
}
__name(cookieOpts, "cookieOpts");
async function setCustomerCookie(c, user) {
  const token = await signSession({ sub: user.id, email: user.email, name: user.name }, c.env.JWT_SECRET);
  setCookie(c, CUSTOMER_COOKIE, token, cookieOpts(c.env, 30 * 24 * 60 * 60));
}
__name(setCustomerCookie, "setCustomerCookie");
function clearCustomerCookie(c) {
  deleteCookie(c, CUSTOMER_COOKIE, { path: "/" });
}
__name(clearCustomerCookie, "clearCustomerCookie");
var ADMIN_IDLE_TIMEOUT_MS = 30 * 60 * 1e3;
var ADMIN_ABSOLUTE_TIMEOUT_MS = 12 * 60 * 60 * 1e3;
var LAST_SEEN_WRITE_INTERVAL_MS = 60 * 1e3;
function sqliteTimeToMs(value) {
  if (!value)
    return null;
  const ms = (/* @__PURE__ */ new Date(`${String(value).replace(" ", "T")}Z`)).getTime();
  return Number.isNaN(ms) ? null : ms;
}
__name(sqliteTimeToMs, "sqliteTimeToMs");
async function setAdminCookie(c, admin) {
  const db = getDb(c.env);
  const sessionId = crypto.randomUUID();
  await db.execute({
    sql: "INSERT INTO admin_sessions (id, admin_id) VALUES (?, ?)",
    args: [sessionId, admin.id]
  });
  const token = await signSession(
    { sub: admin.id, email: admin.email, name: admin.name, role: "admin", sid: sessionId },
    c.env.ADMIN_JWT_SECRET,
    "12h"
  );
  const { maxAge, ...sessionCookieOpts } = cookieOpts(c.env, void 0);
  setCookie(c, ADMIN_COOKIE, token, sessionCookieOpts);
}
__name(setAdminCookie, "setAdminCookie");
async function clearAdminCookie(c) {
  const token = getCookie(c, ADMIN_COOKIE);
  if (token) {
    try {
      const payload = await verifySession(token, c.env.ADMIN_JWT_SECRET);
      if (payload.sid) {
        await getDb(c.env).execute({ sql: "UPDATE admin_sessions SET revoked = 1 WHERE id = ?", args: [payload.sid] });
      }
    } catch {
    }
  }
  deleteCookie(c, ADMIN_COOKIE, { path: "/" });
}
__name(clearAdminCookie, "clearAdminCookie");
async function requireAuth(c, next) {
  const token = getCookie(c, CUSTOMER_COOKIE);
  if (!token)
    return c.json({ error: "Not logged in" }, 401);
  try {
    const payload = await verifySession(token, c.env.JWT_SECRET);
    c.set("user", { id: payload.sub, email: payload.email, name: payload.name });
    await next();
  } catch {
    return c.json({ error: "Session expired, please log in again" }, 401);
  }
}
__name(requireAuth, "requireAuth");
async function optionalAuth(c, next) {
  const token = getCookie(c, CUSTOMER_COOKIE);
  if (token) {
    try {
      const payload = await verifySession(token, c.env.JWT_SECRET);
      c.set("user", { id: payload.sub, email: payload.email, name: payload.name });
    } catch {
      // A stale optional session must not prevent a customer from checking out.
    }
  }
  await next();
}
__name(optionalAuth, "optionalAuth");
async function requireAdmin(c, next) {
  const token = getCookie(c, ADMIN_COOKIE);
  if (!token)
    return c.json({ error: "Admin login required" }, 401);
  let payload;
  try {
    payload = await verifySession(token, c.env.ADMIN_JWT_SECRET);
  } catch {
    return c.json({ error: "Admin session expired, please log in again" }, 401);
  }
  if (!payload.sid) {
    clearAdminCookie(c);
    return c.json({ error: "Admin session expired, please log in again" }, 401);
  }
  const db = getDb(c.env);
  const session = (await db.execute({
    sql: "SELECT id, admin_id, created_at, last_seen_at, revoked FROM admin_sessions WHERE id = ?",
    args: [payload.sid]
  })).rows[0];
  if (!session || session.revoked) {
    deleteCookie(c, ADMIN_COOKIE, { path: "/" });
    return c.json({ error: "Admin session expired, please log in again" }, 401);
  }
  const now = Date.now();
  const lastSeen = sqliteTimeToMs(session.last_seen_at) ?? now;
  const createdAt = sqliteTimeToMs(session.created_at) ?? now;
  if (now - lastSeen > ADMIN_IDLE_TIMEOUT_MS || now - createdAt > ADMIN_ABSOLUTE_TIMEOUT_MS) {
    await db.execute({ sql: "UPDATE admin_sessions SET revoked = 1 WHERE id = ?", args: [session.id] });
    deleteCookie(c, ADMIN_COOKIE, { path: "/" });
    return c.json({ error: "Admin session expired, please log in again" }, 401);
  }
  if (now - lastSeen > LAST_SEEN_WRITE_INTERVAL_MS) {
    await db.execute({ sql: "UPDATE admin_sessions SET last_seen_at = datetime('now') WHERE id = ?", args: [session.id] });
  }
  c.set("admin", { id: payload.sub, email: payload.email, name: payload.name });
  await next();
}
__name(requireAdmin, "requireAdmin");

// src/routes/auth.js
var app = new Hono2();
var googleSchema = external_exports.object({ credential: external_exports.string().min(20, "Missing Google credential") });
app.post("/google", async (c) => {
  await ensureSchema(c.env);
  if (!c.env.GOOGLE_CLIENT_ID) {
    return c.json({ error: "Google Sign-In isn't configured on the server yet." }, 503);
  }
  const body = await c.req.json().catch(() => ({}));
  const parsed = googleSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid request" }, 400);
  let payload;
  try {
    payload = await verifyGoogleIdToken(parsed.data.credential, c.env.GOOGLE_CLIENT_ID);
  } catch {
    return c.json({ error: "Couldn't verify that Google sign-in. Please try again." }, 401);
  }
  if (!payload?.email || payload.email_verified !== true)
    return c.json({ error: "Use a Google account with a verified email address." }, 401);
  const db = getDb(c.env);
  const googleId = payload.sub;
  const email = String(payload.email).toLowerCase();
  const name = payload.name || email.split("@")[0];
  let user = (await db.execute({ sql: "SELECT id, name, email, phone, created_at FROM users WHERE google_id = ?", args: [googleId] })).rows[0];
  if (!user) {
    const existing = (await db.execute({ sql: "SELECT id FROM users WHERE email = ?", args: [email] })).rows[0];
    if (existing) {
      await db.execute({
        sql: "UPDATE users SET google_id = ?, invited_at = NULL, name = COALESCE(NULLIF(name, ''), ?) WHERE id = ?",
        args: [googleId, name, existing.id]
      });
      user = (await db.execute({ sql: "SELECT id, name, email, phone, created_at FROM users WHERE id = ?", args: [existing.id] })).rows[0];
    } else {
      const randomPasswordHash = import_bcryptjs.default.hashSync(crypto.randomUUID() + crypto.randomUUID(), 10);
      const info3 = await db.execute({
        sql: "INSERT INTO users (name, email, password_hash, google_id) VALUES (?, ?, ?, ?)",
        args: [name, email, randomPasswordHash, googleId]
      });
      user = (await db.execute({ sql: "SELECT id, name, email, phone, created_at FROM users WHERE id = ?", args: [info3.lastInsertRowid] })).rows[0];
    }
  }
  await setCustomerCookie(c, user);
  return c.json({ user });
});
var signupSchema = external_exports.object({
  name: external_exports.string().trim().min(1, "Name is required").max(100),
  email: external_exports.string().trim().toLowerCase().email("Enter a valid email"),
  password: external_exports.string().min(6, "Password must be at least 6 characters").max(200),
  phone: phoneField.optional()
});
var loginSchema = external_exports.object({
  email: external_exports.string().trim().toLowerCase().email("Enter a valid email"),
  password: external_exports.string().min(1, "Password is required")
});
app.post("/signup", async (c) => {
  await ensureSchema(c.env);
  const body = await c.req.json().catch(() => ({}));
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { name, email, password, phone } = parsed.data;
  const db = getDb(c.env);
  const existing = (await db.execute({ sql: "SELECT id, invited_at, password_hash FROM users WHERE email = ?", args: [email] })).rows[0];
  if (existing && existing.invited_at && !existing.password_hash) {
    return c.json({ error: "Verify ownership of this email with Google sign-in before accessing an existing order." }, 409);
  }
  if (existing)
    return c.json({ error: "An account with this email already exists" }, 409);
  const passwordHash = import_bcryptjs.default.hashSync(password, 10);
  const info3 = await db.execute({
    sql: "INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)",
    args: [name, email, passwordHash, phone || null]
  });
  const user = { id: Number(info3.lastInsertRowid), name, email };
  await setCustomerCookie(c, user);
  return c.json({ user }, 201);
});
app.post("/login", async (c) => {
  await ensureSchema(c.env);
  const body = await c.req.json().catch(() => ({}));
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { email, password } = parsed.data;
  const db = getDb(c.env);
  const row = (await db.execute({ sql: "SELECT id, name, email, password_hash FROM users WHERE email = ?", args: [email] })).rows[0];
  if (!row || !row.password_hash || !import_bcryptjs.default.compareSync(password, row.password_hash)) {
    return c.json({ error: "Incorrect email or password" }, 401);
  }
  const user = { id: row.id, name: row.name, email: row.email };
  await setCustomerCookie(c, user);
  return c.json({ user });
});
app.post("/logout", (c) => {
  clearCustomerCookie(c);
  return c.json({ ok: true });
});
app.get("/me", requireAuth, async (c) => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const user = c.get("user");
  const row = (await db.execute({ sql: "SELECT id, name, email, phone, created_at FROM users WHERE id = ?", args: [user.id] })).rows[0];
  if (!row)
    return c.json({ error: "User not found" }, 404);
  return c.json({ user: row });
});
var updateProfileSchema = external_exports.object({
  name: external_exports.string().trim().min(1, "Name is required").max(100).optional(),
  phone: phoneField.optional()
});
app.patch("/me", requireAuth, async (c) => {
  await ensureSchema(c.env);
  const body = await c.req.json().catch(() => ({}));
  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const existing = (await db.execute({ sql: "SELECT id, name, phone FROM users WHERE id = ?", args: [userId] })).rows[0];
  if (!existing)
    return c.json({ error: "User not found" }, 404);
  await db.execute({
    sql: "UPDATE users SET name = ?, phone = ? WHERE id = ?",
    args: [d.name ?? existing.name, d.phone ?? existing.phone, userId]
  });
  const row = (await db.execute({ sql: "SELECT id, name, email, phone, created_at FROM users WHERE id = ?", args: [userId] })).rows[0];
  return c.json({ user: row });
});
var auth_default = app;

// src/routes/cart.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app2 = new Hono2();
app2.use("*", requireAuth);
app2.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
var addSchema = external_exports.object({
  productName: external_exports.string().min(1),
  productPrice: external_exports.number().nonnegative(),
  productImage: external_exports.string().optional(),
  quantity: external_exports.number().int().positive().max(50).optional()
});
async function listItems(db, userId) {
  const rows = await db.execute({
    sql: "SELECT id, product_name, product_price, product_image, quantity FROM cart_items WHERE user_id = ? ORDER BY created_at DESC",
    args: [userId]
  });
  return rows.rows;
}
__name(listItems, "listItems");
app2.get("/", async (c) => {
  const db = getDb(c.env);
  const items = await listItems(db, c.get("user").id);
  return c.json({ items });
});
app2.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = addSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { productName, productPrice, productImage, quantity } = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  await db.execute({
    sql: `INSERT INTO cart_items (user_id, product_name, product_price, product_image, quantity)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(user_id, product_name) DO UPDATE SET quantity = quantity + excluded.quantity`,
    args: [userId, productName, productPrice, productImage || null, quantity || 1]
  });
  const items = await listItems(db, userId);
  return c.json({ items }, 201);
});
app2.patch("/:id", async (c) => {
  const quantity = Number((await c.req.json().catch(() => ({}))).quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
    return c.json({ error: "Quantity must be between 1 and 50" }, 400);
  }
  const db = getDb(c.env);
  const result = await db.execute({
    sql: "UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?",
    args: [quantity, c.req.param("id"), c.get("user").id]
  });
  if (result.rowsAffected === 0)
    return c.json({ error: "Cart item not found" }, 404);
  return c.json({ ok: true });
});
app2.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const result = await db.execute({
    sql: "DELETE FROM cart_items WHERE id = ? AND user_id = ?",
    args: [c.req.param("id"), c.get("user").id]
  });
  if (result.rowsAffected === 0)
    return c.json({ error: "Cart item not found" }, 404);
  return c.json({ ok: true });
});
app2.delete("/", async (c) => {
  const db = getDb(c.env);
  await db.execute({ sql: "DELETE FROM cart_items WHERE user_id = ?", args: [c.get("user").id] });
  return c.json({ ok: true });
});
var cart_default = app2;

// src/routes/wishlist.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app3 = new Hono2();
app3.use("*", requireAuth);
app3.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
var addSchema2 = external_exports.object({
  productName: external_exports.string().min(1),
  productPrice: external_exports.number().nonnegative(),
  productImage: external_exports.string().optional()
});
async function listItems2(db, userId) {
  const rows = await db.execute({
    sql: "SELECT id, product_name, product_price, product_image FROM wishlist_items WHERE user_id = ? ORDER BY created_at DESC",
    args: [userId]
  });
  return rows.rows;
}
__name(listItems2, "listItems");
app3.get("/", async (c) => {
  const db = getDb(c.env);
  return c.json({ items: await listItems2(db, c.get("user").id) });
});
app3.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = addSchema2.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { productName, productPrice, productImage } = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  await db.execute({
    sql: `INSERT INTO wishlist_items (user_id, product_name, product_price, product_image)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(user_id, product_name) DO NOTHING`,
    args: [userId, productName, productPrice, productImage || null]
  });
  return c.json({ items: await listItems2(db, userId) }, 201);
});
app3.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const result = await db.execute({
    sql: "DELETE FROM wishlist_items WHERE id = ? AND user_id = ?",
    args: [c.req.param("id"), c.get("user").id]
  });
  if (result.rowsAffected === 0)
    return c.json({ error: "Wishlist item not found" }, 404);
  return c.json({ ok: true });
});
app3.delete("/by-name/:name", async (c) => {
  const db = getDb(c.env);
  await db.execute({
    sql: "DELETE FROM wishlist_items WHERE user_id = ? AND product_name = ?",
    args: [c.get("user").id, c.req.param("name")]
  });
  return c.json({ ok: true });
});
var wishlist_default = app3;

// src/routes/orders.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/lib/products.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
__name(slugify, "slugify");
async function firstImageForProductName(db, name) {
  const row = (await db.execute({ sql: "SELECT images FROM products WHERE name = ? COLLATE NOCASE", args: [name] })).rows[0];
  if (!row)
    return null;
  const images = safeJsonParse(row.images, []);
  return images[0] || null;
}
__name(firstImageForProductName, "firstImageForProductName");
function safeJsonParse(value, fallback) {
  if (value == null)
    return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
__name(safeJsonParse, "safeJsonParse");
function rowToProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    mrp: row.mrp,
    rating: row.rating,
    description: row.description || "",
    materialsCare: row.materials_care || "",
    shippingReturns: row.shipping_returns || "",
    images: safeJsonParse(row.images, []),
    videos: safeJsonParse(row.videos, []),
    colors: safeJsonParse(row.colors, []),
    variants: safeJsonParse(row.variants, []),
    bg: row.bg || "",
    isBestseller: !!row.is_bestseller,
    isNewArrival: !!row.is_new_arrival,
    isFeatured: !!row.is_featured,
    isSpotlight: !!row.is_spotlight,
    sortOrder: row.sort_order ?? 0,
    bestsellerOrder: row.bestseller_order ?? 0,
    featuredOrder: row.featured_order ?? 0,
    newArrivalOrder: row.new_arrival_order ?? 0,
    spotlightOrder: row.spotlight_order ?? 0,
    stock: row.stock,
    active: !!row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
__name(rowToProduct, "rowToProduct");
function rowToProductCard(row) {
  const images = safeJsonParse(row.images, []);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    mrp: row.mrp,
    rating: row.rating,
    // Cards only ever show the first image; sending the rest is wasted bytes.
    images: images.slice(0, 1),
    colors: safeJsonParse(row.colors, []),
    variants: safeJsonParse(row.variants, []),
    bg: row.bg || "",
    isBestseller: !!row.is_bestseller,
    isNewArrival: !!row.is_new_arrival,
    isFeatured: !!row.is_featured,
    isSpotlight: !!row.is_spotlight,
    stock: row.stock
  };
}
__name(rowToProductCard, "rowToProductCard");

// src/routes/payments.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/lib/billing.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var GST_RATE = 0.03;
var HSN_CODE = "7117";
var SUPPLIER_STATE = "maharashtra";
var SUPPLIER_GSTIN = "27GTNPD1584G1ZF";
var INDIA_SHIPPING = {
  normal: { amount: 100, label: "Normal delivery", eta: "About 7 days" },
  urgent: { amount: 170, label: "Urgent delivery", eta: "2-3 days" }
};
var NEARBY = /* @__PURE__ */ new Set([
  "australia",
  "nepal",
  "bangladesh",
  "sri lanka",
  "bhutan",
  "maldives",
  "myanmar",
  "pakistan",
  "afghanistan"
]);
var NEARBY_SHIPPING = 2e3;
var WORLD_SHIPPING = 3500;
var norm = /* @__PURE__ */ __name((v) => String(v || "").trim().toLowerCase(), "norm");
function isIndia(country) {
  return norm(country) === "india";
}
__name(isIndia, "isIndia");
function quoteShipping(country, speed, goods = 0) {
  if (isIndia(country)) {
    const choice = INDIA_SHIPPING[speed] || INDIA_SHIPPING.normal;
    return {
      amount: goods >= 2500 && speed !== "urgent" ? 0 : choice.amount,
      method: INDIA_SHIPPING[speed] ? speed : "normal",
      label: choice.label,
      eta: choice.eta
    };
  }
  if (NEARBY.has(norm(country))) {
    return { amount: NEARBY_SHIPPING, method: "international", label: "International delivery", eta: "7-14 days" };
  }
  return { amount: WORLD_SHIPPING, method: "international", label: "International delivery", eta: "10-21 days" };
}
__name(quoteShipping, "quoteShipping");
function financialYear(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getUTCFullYear();
  const start = d.getUTCMonth() >= 3 ? y : y - 1;
  return `${String(start % 100).padStart(2, "0")}-${String((start + 1) % 100).padStart(2, "0")}`;
}
__name(financialYear, "financialYear");
function formatInvoiceNumber(fy, serial) {
  return `BOB/${fy}/${String(serial).padStart(4, "0")}`;
}
__name(formatInvoiceNumber, "formatInvoiceNumber");
var round2 = /* @__PURE__ */ __name((n) => Math.round(n * 100) / 100, "round2");
function quoteTax(country, state, priceIncludingTax) {
  if (!isIndia(country)) {
    return { type: "none", rate: 0, amount: 0, cgst: 0, sgst: 0, igst: 0 };
  }
  const total = round2(priceIncludingTax * GST_RATE / (1 + GST_RATE));
  if (norm(state) === SUPPLIER_STATE) {
    const half = round2(total / 2);
    return { type: "cgst_sgst", rate: GST_RATE, amount: round2(half * 2), cgst: half, sgst: half, igst: 0 };
  }
  return { type: "igst", rate: GST_RATE, amount: total, cgst: 0, sgst: 0, igst: total };
}
__name(quoteTax, "quoteTax");
function quoteOrder({ subtotal, discountAmount, country, state, speed }) {
  const goods = Math.max(0, round2(subtotal - (discountAmount || 0)));
  const shipping = quoteShipping(country, speed, goods);
  const totalAmount = round2(goods + shipping.amount);
  const tax = quoteTax(country, state, totalAmount);
  const taxable = round2(totalAmount - tax.amount);
  return {
    shipping,
    taxableAmount: taxable,
    tax,
    totalAmount
  };
}
__name(quoteOrder, "quoteOrder");

// src/lib/email.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function sendEmail(env2, { to, subject, html, attachments }) {
  if (!env2.RESEND_API_KEY) {
    console.log(`[email:not-configured] would send "${subject}" to ${to}`);
    return { sent: false, reason: "RESEND_API_KEY not set" };
  }
  const from = env2.EMAIL_FROM || "Beauty of Beads <orders@beautyofbeads.example>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env2.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to, subject, html, ...attachments?.length ? { attachments } : {} })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[email:failed] ${res.status} ${body}`);
    return { sent: false, reason: `Resend responded ${res.status}` };
  }
  return { sent: true };
}
__name(sendEmail, "sendEmail");

// src/lib/orderEmails.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BRAND2 = {
  name: "Beauty of Beads",
  // Served from the storefront, not the API, so it keeps working even if the
  // media route ever moves. Width and height on the tag because mail clients
  // lay out before images arrive.
  logo: "https://beautyofbeadsbykhushi.com/share-image.png",
  brown: "#3E2B23",
  blush: "#FFEAEA",
  rose: "#BC4E69",
  ink: "#271D16"
};
var esc = /* @__PURE__ */ __name((v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), "esc");
var money = /* @__PURE__ */ __name((n) => "\u20B9" + Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), "money");
function shipLabel(order2) {
  if (order2.shipping_method === "urgent")
    return "Urgent delivery (2-3 days)";
  if (order2.shipping_method === "international")
    return "International delivery";
  return "Normal delivery (about 7 days)";
}
__name(shipLabel, "shipLabel");
function mediaSrc(url, mediaBase) {
  const raw2 = String(url || "").trim();
  if (!raw2)
    return "";
  if (raw2.startsWith("/media/"))
    return `${mediaBase}${raw2}`;
  const abs = raw2.match(/^https?:\/\/([^/]+)(\/media\/.+)$/i);
  if (abs && /(^|\.)workers\.dev$|(^|\.)beautyofbeadsbykhushi\.com$/i.test(abs[1])) {
    return `${mediaBase}${abs[2]}`;
  }
  return raw2;
}
__name(mediaSrc, "mediaSrc");
function itemRows(items, mediaBase) {
  return items.map((it) => {
    const src = mediaSrc(it.product_image, mediaBase);
    return `
        <tr>
          ${src ? `<td width="52" style="padding:8px 12px 8px 0;border-bottom:1px solid #eadfd8;vertical-align:top">
                   <img src="${esc(src)}" width="44" height="56" alt="" style="display:block;width:44px;height:56px;object-fit:cover;border-radius:2px;border:0" />
                 </td>` : ""}
          <td style="padding:8px 0;border-bottom:1px solid #eadfd8;font-size:14px;color:${BRAND2.ink};vertical-align:top">
            ${esc(it.product_name)}
            <div style="font-size:12px;color:#8a7a70">Qty ${it.quantity}</div>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #eadfd8;font-size:14px;text-align:right;color:${BRAND2.ink};white-space:nowrap;vertical-align:top">
            ${money(it.product_price * it.quantity)}
          </td>
        </tr>`;
  }).join("");
}
__name(itemRows, "itemRows");
function totalRows(order2, items) {
  const subtotal = items.reduce((s, i) => s + i.product_price * i.quantity, 0);
  const discount = Number(order2.discount_amount || 0);
  const shipping = Number(order2.shipping_amount || 0);
  const tax = Number(order2.tax_amount || 0);
  const gross = Math.max(0, subtotal - discount) + shipping;
  const pricesIncludeTax = tax > 0 && Math.abs(Number(order2.total_amount || 0) - gross) < 0.02;
  const line = /* @__PURE__ */ __name((label, value, bold = false) => `
        <tr>
          <td style="padding:3px 0;font-size:${bold ? 15 : 13}px;color:${bold ? BRAND2.ink : "#6d5c52"};${bold ? "font-weight:700;padding-top:10px;border-top:1px solid #eadfd8" : ""}">${label}</td>
          <td style="padding:3px 0;font-size:${bold ? 15 : 13}px;text-align:right;color:${BRAND2.ink};white-space:nowrap;${bold ? "font-weight:700;padding-top:10px;border-top:1px solid #eadfd8" : ""}">${value}</td>
        </tr>`, "line");
  let html = line(pricesIncludeTax ? "Subtotal (GST included)" : "Subtotal", money(subtotal));
  if (discount > 0)
    html += line(`Discount${order2.promo_code ? ` (${esc(order2.promo_code)})` : ""}`, "-" + money(discount));
  html += line(shipLabel(order2), money(shipping));
  if (pricesIncludeTax)
    html += line("GST", "Included in our prices");
  else if (tax > 0)
    html += line(order2.tax_type === "cgst_sgst" ? "CGST 1.5% + SGST 1.5%" : "IGST 3%", money(tax));
  html += line("Total", money(order2.total_amount), true);
  if (order2.payment_status === "partially_paid" || order2.payment_option === "partial_cod") {
    const paid = Math.max(0, Number(order2.amount_paid ?? 250));
    html += line("Paid online", money(paid));
    html += line("Balance to be paid at delivery", money(Math.max(0, Number(order2.total_amount || 0) - paid)), true);
  }
  return html;
}
__name(totalRows, "totalRows");
function paymentDetails(order2) {
  if (order2.payment_status === "partially_paid" || order2.payment_option === "partial_cod") {
    const paid = Math.max(0, Number(order2.amount_paid ?? 250));
    const due = Math.max(0, Number(order2.total_amount || 0) - paid);
    return `Partial COD — ${money(paid)} advance received online. Balance ${money(due)} is to be paid to the delivery partner when your order arrives. Full cash on delivery is not available.`;
  }
  const method = order2.payment_method === "whatsapp_manual" ? "WhatsApp" : String(order2.payment_method || "online").toUpperCase();
  return `Paid in full by ${esc(method)}${order2.payment_id ? `<br>Reference ${esc(order2.payment_id)}` : ""}${order2.manual_payment_reference ? `<br>WhatsApp payment reference ${esc(order2.manual_payment_reference)}` : ""}`;
}
__name(paymentDetails, "paymentDetails");
function addressBlock(order2) {
  return [
    esc(order2.shipping_name),
    esc(order2.shipping_line1),
    order2.shipping_line2 ? esc(order2.shipping_line2) : null,
    `${esc(order2.shipping_city)}${order2.shipping_postal_code ? " " + esc(order2.shipping_postal_code) : ""}`,
    esc([order2.shipping_state, order2.shipping_country].filter(Boolean).join(", ")),
    order2.shipping_phone ? esc(order2.shipping_phone) : null
  ].filter(Boolean).join("<br>");
}
__name(addressBlock, "addressBlock");
function shell(title2, intro, body) {
  return `
  <div style="background:${BRAND2.blush};padding:28px 12px;font-family:Georgia,'Times New Roman',serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:4px;padding:28px 24px">
      <img src="${BRAND2.logo}" width="56" height="60" alt="${BRAND2.name}" style="display:block;width:56px;height:auto;border:0;margin:0 0 14px" />
      <h1 style="margin:0;font-size:22px;letter-spacing:.12em;text-transform:uppercase;color:${BRAND2.brown}">${title2}</h1>
      <p style="margin:14px 0 0;font-size:14px;line-height:1.6;color:#5b4c43;font-family:Arial,sans-serif">${intro}</p>
      ${body}
      <p style="margin:26px 0 0;font-size:12px;line-height:1.6;color:#9a8a80;font-family:Arial,sans-serif">
        Handmade with love in Nagpur &middot; ${BRAND2.name}
      </p>
    </div>
  </div>`;
}
__name(shell, "shell");
function orderConfirmationEmail({ order: order2, items, mediaBase = "", trackingUrl }) {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr>
        <td style="font-size:12px;color:#8a7a70">Order number</td>
        <td style="font-size:12px;color:#8a7a70;text-align:right">${order2.invoice_number ? "Invoice" : ""}</td>
      </tr>
      <tr>
        <td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(order2.order_number)}</td>
        <td style="font-size:13px;color:${BRAND2.ink};text-align:right">${esc(order2.invoice_number || "")}</td>
      </tr>
    </table>

    <h2 style="margin:24px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">Your order</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif">
      ${itemRows(items, mediaBase)}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;font-family:Arial,sans-serif">
      ${totalRows(order2, items)}
    </table>
    <p style="margin:12px 0 0;font-size:12px;line-height:1.6;color:#6d5c52;font-family:Arial,sans-serif">
      Your delivery charge is shown clearly above — no hidden delivery fees.
    </p>
    ${trackingUrl ? `<p style="margin:18px 0 0;font-family:Arial,sans-serif"><a href="${esc(trackingUrl)}" style="color:${BRAND2.brown};font-size:13px;font-weight:700">Track your order</a></p>` : ""}

    <h2 style="margin:26px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">Shipping to</h2>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">${addressBlock(order2)}</p>

    <h2 style="margin:26px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">Payment</h2>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      ${paymentDetails(order2)}
    </p>

    <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      Your tax invoice is attached to this email. Every piece is made by hand, so we&rsquo;ll write again as soon as
      your order is on its way.
    </p>`;
  return {
    subject: `Order ${order2.order_number} confirmed \u2014 ${BRAND2.name}`,
    html: shell(
      "Order confirmed",
      `Thanks for placing your order with <strong>${BRAND2.name}</strong>. Here are your order details.`,
      body
    )
  };
}
__name(orderConfirmationEmail, "orderConfirmationEmail");
function adminOrderEmail({ order: order2, items, customerEmail, mediaBase = "" }) {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      ${itemRows(items, mediaBase)}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;font-family:Arial,sans-serif">
      ${totalRows(order2, items)}
    </table>

    <h2 style="margin:26px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">Ship to</h2>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      ${addressBlock(order2)}${customerEmail ? `<br>${esc(customerEmail)}` : ""}
    </p>

    <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      ${esc(shipLabel(order2))}<br>${paymentDetails(order2)}${order2.payment_id ? `<br>Payment reference: ${esc(order2.payment_id)}` : ""}
    </p>`;
  return {
    subject: `New order ${order2.order_number} \u2014 ${money(order2.total_amount)}`,
    html: shell(
      "New order",
      order2.payment_status === "partially_paid" ? "A new Partial COD order has been confirmed after receiving the advance. The invoice is attached." : "A new order has been paid for. The invoice is attached.",
      body
    )
  };
}
__name(adminOrderEmail, "adminOrderEmail");
function customOrderEmail({ order: order2, items, note, storefrontUrl, mediaBase = "" }) {
  const goods = items.reduce((sum, i) => sum + i.product_price * i.quantity, 0);
  const link = storefrontUrl ? `${String(storefrontUrl).replace(/\/$/, "")}/?order=${encodeURIComponent(order2.order_number)}` : "";
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr>
        <td style="font-size:12px;color:#8a7a70">Order number</td>
      </tr>
      <tr>
        <td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(order2.order_number)}</td>
      </tr>
    </table>

    ${note ? `<p style="margin:18px 0 0;padding:12px 14px;background:${BRAND2.blush};border-radius:3px;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">${esc(note)}</p>` : ""}

    <h2 style="margin:24px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">What we've put together</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif">
      ${itemRows(items, mediaBase)}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;font-family:Arial,sans-serif">
      <tr>
        <td style="padding:3px 0;font-size:15px;font-weight:700;color:${BRAND2.ink};padding-top:10px;border-top:1px solid #eadfd8">Items total</td>
        <td style="padding:3px 0;font-size:15px;font-weight:700;text-align:right;color:${BRAND2.ink};white-space:nowrap;padding-top:10px;border-top:1px solid #eadfd8">${money(goods)}</td>
      </tr>
    </table>

    <p style="margin:10px 0 0;font-size:12px;line-height:1.7;color:#8a7a70;font-family:Arial,sans-serif">
      Delivery and GST are added when you confirm \u2014 they depend on where the order is going, so we can only work them
      out once you give us the address.
    </p>

    ${link ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0">
             <tr>
               <td style="background:${BRAND2.brown};border-radius:3px">
                 <a href="${esc(link)}" style="display:inline-block;padding:13px 26px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;text-decoration:none">
                   Confirm your order
                 </a>
               </td>
             </tr>
           </table>` : ""}

    <p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      Sign in with the email this was sent to, add your delivery address, and pay \u2014 that places the order. Nothing has
      been charged yet.
    </p>`;
  return {
    subject: `Confirm your order ${order2.order_number} \u2014 ${BRAND2.name}`,
    html: shell(
      "Confirm your order",
      `We&rsquo;ve put an order together for you. Check it over and complete it when you&rsquo;re ready.`,
      body
    )
  };
}
__name(customOrderEmail, "customOrderEmail");
function orderDeliveredEmail({ order: order2, items, mediaBase = "" }) {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr><td style="font-size:12px;color:#8a7a70">Order number</td></tr>
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(order2.order_number)}</td></tr>
    </table>

    <h2 style="margin:24px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">What arrived</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif">
      ${itemRows(items, mediaBase)}
    </table>

    <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      Keep your pieces away from water, perfume and direct sunlight, and store them dry when you are not wearing them \u2014
      the beads and the finish last far longer that way.
    </p>`;
  return {
    subject: `Delivered \u2014 order ${order2.order_number}`,
    html: shell("Delivered", `Your order has arrived. We hope you love it.`, body)
  };
}
__name(orderDeliveredEmail, "orderDeliveredEmail");
function reviewRequestEmail({ order: order2, items, reviewUrl, mediaBase = "" }) {
  const body = `
    <h2 style="margin:24px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">Your order ${esc(order2.order_number)}</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif">
      ${itemRows(items, mediaBase)}
    </table>

    ${reviewUrl ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0">
             <tr>
               <td style="background:${BRAND2.brown};border-radius:3px">
                 <a href="${esc(reviewUrl)}" style="display:inline-block;padding:13px 26px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;text-decoration:none">
                   Write a review
                 </a>
               </td>
             </tr>
           </table>` : ""}

    <p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      Every piece is made by hand, so a few honest words help the next person far more than you would think.
    </p>`;
  return {
    subject: `How was your ${BRAND2.name} order?`,
    html: shell("Tell us how it went", `Thank you for supporting something small and handmade.`, body)
  };
}
__name(reviewRequestEmail, "reviewRequestEmail");
function complaintRaisedEmail({ orderNumber, customerName, customerEmail, productName, description, phone }) {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr><td style="font-size:12px;color:#8a7a70">Order</td></tr>
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(orderNumber)}</td></tr>
    </table>

    ${productName ? `<p style="margin:16px 0 0;font-size:13px;color:#5b4c43;font-family:Arial,sans-serif"><strong>${esc(productName)}</strong></p>` : ""}

    <p style="margin:14px 0 0;padding:12px 14px;background:${BRAND2.blush};border-radius:3px;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      ${esc(description)}
    </p>

    <h2 style="margin:24px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">Who to reply to</h2>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      ${esc(customerName || "\u2014")}${customerEmail ? `<br>${esc(customerEmail)}` : ""}${phone ? `<br>${esc(phone)}` : ""}
    </p>

    <p style="margin:20px 0 0;font-size:12px;line-height:1.7;color:#8a7a70;font-family:Arial,sans-serif">
      Any photographs they attached are on the complaint in the admin panel.
    </p>`;
  return {
    subject: `Complaint on order ${orderNumber}`,
    html: shell("A customer has raised a complaint", `Someone has written in about an order.`, body)
  };
}
__name(complaintRaisedEmail, "complaintRaisedEmail");
function reviewPostedEmail({ productName, rating, comment, reviewerName }) {
  const stars = "\u2605".repeat(Math.max(0, Math.min(5, Math.round(rating)))) + "\u2606".repeat(5 - Math.max(0, Math.min(5, Math.round(rating))));
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr><td style="font-size:12px;color:#8a7a70">Product</td></tr>
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(productName)}</td></tr>
    </table>

    <p style="margin:14px 0 0;font-size:18px;letter-spacing:.12em;color:${BRAND2.rose};font-family:Arial,sans-serif">${stars}</p>

    ${comment ? `<p style="margin:12px 0 0;padding:12px 14px;background:${BRAND2.blush};border-radius:3px;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">${esc(comment)}</p>` : ""}

    <p style="margin:16px 0 0;font-size:13px;color:#5b4c43;font-family:Arial,sans-serif">\u2014 ${esc(reviewerName || "Verified buyer")}</p>

    <p style="margin:20px 0 0;font-size:12px;line-height:1.7;color:#8a7a70;font-family:Arial,sans-serif">
      Reviews show on the product straight away. You can feature this one on the homepage from the admin panel.
    </p>`;
  return {
    subject: `${Math.round(rating)}-star review \u2014 ${productName}`,
    html: shell("New review", `A customer has reviewed something they bought.`, body)
  };
}
__name(reviewPostedEmail, "reviewPostedEmail");
function complaintReceivedEmail({ orderNumber, productName, description }) {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr><td style="font-size:12px;color:#8a7a70">Order</td></tr>
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(orderNumber)}</td></tr>
    </table>

    ${productName ? `<p style="margin:16px 0 0;font-size:13px;color:#5b4c43;font-family:Arial,sans-serif"><strong>${esc(productName)}</strong></p>` : ""}

    <h2 style="margin:22px 0 6px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:${BRAND2.brown}">What you told us</h2>
    <p style="margin:0;padding:12px 14px;background:${BRAND2.blush};border-radius:3px;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      ${esc(description)}
    </p>

    <p style="margin:20px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      We read every one of these ourselves \u2014 there is no queue and no ticket number. We&rsquo;ll look at it and write
      back, and you&rsquo;ll get an email each time this moves along.
    </p>`;
  return {
    subject: `We've got your complaint \u2014 order ${orderNumber}`,
    html: shell("We've got it", `Thank you for telling us. Here is what we have on record.`, body)
  };
}
__name(complaintReceivedEmail, "complaintReceivedEmail");
var COMPLAINT_COPY = {
  open: { title: "Complaint reopened", line: "We&rsquo;ve opened this back up and are looking at it again." },
  in_progress: { title: "We&rsquo;re on it", line: "We&rsquo;ve started working on this. We&rsquo;ll write again once it&rsquo;s sorted." },
  resolved: { title: "Sorted", line: "We&rsquo;ve resolved this one. If anything still isn&rsquo;t right, just reply and tell us." },
  rejected: {
    title: "About your complaint",
    line: "We&rsquo;ve looked at this and can&rsquo;t take it further. If you think we&rsquo;ve got it wrong, reply and we&rsquo;ll look again."
  }
};
function complaintStatusEmail({ orderNumber, productName, status }) {
  const copy = COMPLAINT_COPY[status] || { title: "Complaint update", line: `Your complaint is now ${esc(status)}.` };
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr><td style="font-size:12px;color:#8a7a70">Order</td></tr>
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(orderNumber)}</td></tr>
      ${productName ? `<tr><td style="padding-top:8px;font-size:13px;color:#5b4c43">${esc(productName)}</td></tr>` : ""}
    </table>`;
  return {
    subject: `${copy.title.replace(/&rsquo;/g, "'")} \u2014 order ${orderNumber}`,
    html: shell(copy.title, copy.line, body)
  };
}
__name(complaintStatusEmail, "complaintStatusEmail");
var STATUS_COPY = {
  confirmed: { title: "Order confirmed", line: "We&rsquo;ve confirmed your order and started work on it." },
  packed: { title: "Packed and ready", line: "Your order is packed and ready to be handed to the courier." },
  shipped: { title: "On its way", line: "Your order has been dispatched." },
  out_for_delivery: { title: "Out for delivery", line: "Your order is out for delivery and should reach you today." },
  delivered: { title: "Delivered", line: "Your order has been delivered. We hope you love it." },
  cancelled: { title: "Order cancelled", line: "Your order has been cancelled. Any payment made will be refunded." }
};
function statusUpdateEmail({ order: order2, status, trackingUrl }) {
  const copy = STATUS_COPY[status] || { title: "Order update", line: `Your order is now ${esc(status)}.` };
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;font-family:Arial,sans-serif">
      <tr>
        <td style="font-size:12px;color:#8a7a70">Order number</td>
      </tr>
      <tr>
        <td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(order2.order_number)}</td>
      </tr>
    </table>
    <p style="margin:20px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">
      Delivering to:<br>${addressBlock(order2)}
    </p>
    ${trackingUrl ? `<p style="margin:18px 0 0;font-family:Arial,sans-serif"><a href="${esc(trackingUrl)}" style="color:${BRAND2.brown};font-size:13px;font-weight:700">View order status</a></p>` : ""}`;
  return {
    subject: `${copy.title} \u2014 order ${order2.order_number}`,
    html: shell(copy.title, `${copy.line}`, body)
  };
}
__name(statusUpdateEmail, "statusUpdateEmail");

// src/lib/invoicePdf.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var PAGE_W = 595.28;
var PAGE_H = 841.89;
var MARGIN = 48;
var SUPPLIER = {
  trade: "Beauty Of Beads",
  legal: "KHUSHI ACHAR DEMBRA",
  address: ["HIG 1/6, Dayanand Nagar, Galli No-6", "Near Dayanand Park, Jaripatka", "Nagpur, Maharashtra 440014"],
  phone: "9545856028"
};
function ascii(value) {
  return String(value ?? "").replace(/₹/g, "Rs. ").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/[^\x20-\x7e]/g, "");
}
__name(ascii, "ascii");
function esc2(value) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
__name(esc2, "esc");
function money2(n) {
  return "Rs. " + Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
__name(money2, "money");
function dmy(value) {
  if (!value)
    return "-";
  const d = new Date(String(value).includes("T") ? value : String(value).replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime()))
    return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}
__name(dmy, "dmy");
function charWidth(ch, bold) {
  const c = ch.charCodeAt(0);
  if (c === 32)
    return bold ? 278 : 278;
  if (c >= 48 && c <= 57)
    return 556;
  if (c >= 65 && c <= 90)
    return bold ? 722 : 667;
  if (c >= 97 && c <= 122)
    return bold ? 556 : 500;
  if (".,:;'|!".includes(ch))
    return 278;
  return bold ? 556 : 500;
}
__name(charWidth, "charWidth");
function textWidth(str, size, bold) {
  let w = 0;
  const s = ascii(str);
  for (let i = 0; i < s.length; i++)
    w += charWidth(s[i], bold);
  return w / 1e3 * size;
}
__name(textWidth, "textWidth");
var Page = class {
  constructor() {
    this.ops = [];
  }
  text(x, y, str, { size = 9, bold = false, gray = 0 } = {}) {
    this.ops.push(
      `BT /${bold ? "F2" : "F1"} ${size} Tf ${gray} g ${x.toFixed(2)} ${(PAGE_H - y).toFixed(2)} Td (${esc2(str)}) Tj ET`
    );
    return this;
  }
  right(xRight, y, str, opts = {}) {
    const w = textWidth(str, opts.size || 9, opts.bold);
    return this.text(xRight - w, y, str, opts);
  }
  line(x1, y1, x2, y2, { gray = 0.75, width = 0.6 } = {}) {
    this.ops.push(
      `${width} w ${gray} G ${x1.toFixed(2)} ${(PAGE_H - y1).toFixed(2)} m ${x2.toFixed(2)} ${(PAGE_H - y2).toFixed(2)} l S`
    );
    return this;
  }
  build() {
    return this.ops.join("\n");
  }
};
__name(Page, "Page");
function buildPdf(content) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${content.length} >>
stream
${content}
endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj
${body}
endobj
`;
  });
  const xrefAt = pdf.length;
  pdf += `xref
0 ${objects.length + 1}
0000000000 65535 f 
`;
  for (const off2 of offsets)
    pdf += `${String(off2).padStart(10, "0")} 00000 n 
`;
  pdf += `trailer
<< /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefAt}
%%EOF`;
  return pdf;
}
__name(buildPdf, "buildPdf");
function toBase64(str) {
  return btoa(str);
}
__name(toBase64, "toBase64");
function invoicePdfBase64({ order: order2, items }) {
  const p = new Page();
  const right = PAGE_W - MARGIN;
  let y = MARGIN + 14;
  p.text(MARGIN, y, "TAX INVOICE", { size: 17, bold: true });
  p.right(right, y - 4, SUPPLIER.trade, { size: 11, bold: true });
  let sy = y + 10;
  p.right(right, sy, SUPPLIER.legal, { size: 8, gray: 0.35 });
  for (const line of SUPPLIER.address) {
    sy += 11;
    p.right(right, sy, line, { size: 8, gray: 0.35 });
  }
  sy += 11;
  p.right(right, sy, SUPPLIER.phone, { size: 8, gray: 0.35 });
  sy += 12;
  p.right(right, sy, `GSTIN: ${SUPPLIER_GSTIN}`, { size: 8, bold: true });
  y = sy + 16;
  p.line(MARGIN, y, right, y);
  y += 20;
  const metaX = PAGE_W / 2 + 20;
  p.text(MARGIN, y, "BILL TO", { size: 7.5, bold: true, gray: 0.45 });
  let by = y + 14;
  p.text(MARGIN, by, order2.shipping_name, { size: 10, bold: true });
  const addr = [
    order2.shipping_line1,
    order2.shipping_line2,
    `${order2.shipping_city}${order2.shipping_postal_code ? " " + order2.shipping_postal_code : ""}`,
    [order2.shipping_state, order2.shipping_country].filter(Boolean).join(", "),
    order2.shipping_phone,
    order2.customer_email
  ].filter(Boolean);
  for (const line of addr) {
    by += 12;
    p.text(MARGIN, by, line, { size: 8.5, gray: 0.3 });
  }
  const meta = [
    ["Invoice no.", order2.invoice_number || "-"],
    ["Invoice date", dmy(order2.paid_at || order2.created_at)],
    ["Order no.", order2.order_number],
    ["Order date", dmy(order2.created_at)],
    ["Payment", order2.payment_method === "whatsapp_manual" ? "WHATSAPP" : String(order2.payment_method || "-").toUpperCase()],
    ["Place of supply", order2.shipping_state || order2.shipping_country]
  ];
  let my = y;
  for (const [k, v] of meta) {
    p.text(metaX, my, k, { size: 8.5, gray: 0.45 });
    p.right(right, my, v, { size: 8.5, bold: k === "Invoice no." });
    my += 13;
  }
  y = Math.max(by, my) + 22;
  const colHsn = MARGIN + 250;
  const colQty = MARGIN + 310;
  const colUnit = MARGIN + 410;
  p.line(MARGIN, y - 11, right, y - 11);
  p.text(MARGIN, y, "#", { size: 7.5, bold: true, gray: 0.45 });
  p.text(MARGIN + 20, y, "PRODUCT", { size: 7.5, bold: true, gray: 0.45 });
  p.text(colHsn, y, "HSN", { size: 7.5, bold: true, gray: 0.45 });
  p.right(colQty, y, "QTY", { size: 7.5, bold: true, gray: 0.45 });
  p.right(colUnit, y, "UNIT PRICE", { size: 7.5, bold: true, gray: 0.45 });
  p.right(right, y, "AMOUNT", { size: 7.5, bold: true, gray: 0.45 });
  y += 6;
  p.line(MARGIN, y, right, y);
  let subtotal = 0;
  items.forEach((it, i) => {
    y += 17;
    subtotal += it.product_price * it.quantity;
    p.text(MARGIN, y, String(i + 1), { size: 8.5, gray: 0.45 });
    p.text(MARGIN + 20, y, String(it.product_name).slice(0, 42), { size: 8.5 });
    p.text(colHsn, y, HSN_CODE, { size: 8.5, gray: 0.35 });
    p.right(colQty, y, String(it.quantity), { size: 8.5 });
    p.right(colUnit, y, money2(it.product_price), { size: 8.5 });
    p.right(right, y, money2(it.product_price * it.quantity), { size: 8.5 });
    p.line(MARGIN, y + 5, right, y + 5, { gray: 0.9 });
  });
  const discount = Number(order2.discount_amount || 0);
  const shipping = Number(order2.shipping_amount || 0);
  const tax = Number(order2.tax_amount || 0);
  const gross = Math.max(0, subtotal - discount) + shipping;
  const pricesIncludeTax = tax > 0 && Math.abs(Number(order2.total_amount || 0) - gross) < 0.02;
  const taxable = Math.max(0, gross - (pricesIncludeTax ? tax : 0));
  const half = Math.round(tax / 2 * 100) / 100;
  const rate = Number(order2.tax_rate || 0) * 100;
  const shipLabel2 = order2.shipping_method === "urgent" ? "Urgent delivery (2-3 days)" : order2.shipping_method === "international" ? "International delivery" : "Normal delivery (about 7 days)";
  const rows = [[pricesIncludeTax ? "Subtotal (GST included)" : "Subtotal", money2(subtotal)]];
  if (discount > 0)
    rows.push([`Discount${order2.promo_code ? ` (${order2.promo_code})` : ""}`, "-" + money2(discount)]);
  rows.push([shipLabel2, money2(shipping)]);
  rows.push(["Taxable value", money2(taxable)]);
  if (tax > 0 && order2.tax_type === "cgst_sgst") {
    rows.push([`CGST @ ${(rate / 2).toFixed(1)}%`, money2(half)]);
    rows.push([`SGST @ ${(rate / 2).toFixed(1)}%`, money2(half)]);
  } else if (tax > 0) {
    rows.push([`IGST @ ${rate.toFixed(0)}%`, money2(tax)]);
  } else {
    rows.push(["GST", "Nil - export"]);
  }
  y += 26;
  const labelX = PAGE_W / 2 + 40;
  for (const [label, value] of rows) {
    p.text(labelX, y, label, { size: 8.5, gray: 0.35 });
    p.right(right, y, value, { size: 8.5 });
    y += 14;
  }
  p.line(labelX, y - 6, right, y - 6, { gray: 0.4, width: 1 });
  y += 8;
  p.text(labelX, y, "Total", { size: 11, bold: true });
  p.right(right, y, money2(order2.total_amount), { size: 11, bold: true });
  y += 34;
  if (order2.payment_status === "partially_paid" || order2.payment_option === "partial_cod") {
    const paid = Math.max(0, Number(order2.amount_paid ?? 250));
    const due = Math.max(0, Number(order2.total_amount || 0) - paid);
    p.text(labelX, y, "Paid online", { size: 8.5, gray: 0.35 });
    p.right(right, y, money2(paid), { size: 8.5 });
    y += 14;
    p.text(labelX, y, "Balance due at delivery", { size: 8.5, bold: true });
    p.right(right, y, money2(due), { size: 8.5, bold: true });
    y += 20;
  }
  p.line(MARGIN, y, right, y, { gray: 0.85 });
  y += 14;
  p.text(MARGIN, y, "Your delivery charge is shown clearly above - no hidden delivery fees.", { size: 8, gray: 0.4 });
  y += 12;
  p.text(MARGIN, y, "This is a computer generated invoice and does not require a signature.", { size: 7.5, gray: 0.5 });
  if (order2.payment_id) {
    y += 11;
    p.text(MARGIN, y, `Payment reference: ${order2.payment_id}`, { size: 7.5, gray: 0.5 });
  }
  if (order2.manual_payment_reference) {
    y += 11;
    p.text(MARGIN, y, `WhatsApp payment reference: ${order2.manual_payment_reference}`, { size: 7.5, gray: 0.5 });
  }
  if (order2.payment_status === "partially_paid" || order2.payment_option === "partial_cod") {
    y += 11;
    p.text(MARGIN, y, "Advance received. Pay the remaining balance to the delivery partner when your order arrives.", { size: 7.5, gray: 0.4 });
  }
  return toBase64(buildPdf(p.build()));
}
__name(invoicePdfBase64, "invoicePdfBase64");

// src/routes/payments.js
var app4 = new Hono2();
app4.use("*", optionalAuth);
app4.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
function razorpayConfigured(env2) {
  return Boolean(env2?.RAZORPAY_KEY_ID && env2?.RAZORPAY_KEY_SECRET);
}
__name(razorpayConfigured, "razorpayConfigured");
var RAZORPAY_API = "https://api.razorpay.com/v1";
function basicAuth(env2) {
  return "Basic " + btoa(`${env2.RAZORPAY_KEY_ID}:${env2.RAZORPAY_KEY_SECRET}`);
}
__name(basicAuth, "basicAuth");
async function hmacSha256Hex(secret, message2) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message2));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hmacSha256Hex, "hmacSha256Hex");
async function guestOrderTokenFor(env2, orderNumber) {
  return hmacSha256Hex(env2.JWT_SECRET, `beauty-of-beads:guest-order:${orderNumber}`);
}
__name(guestOrderTokenFor, "guestOrderTokenFor");
async function guestOrderLink(env2, order2) {
  if (!Number(order2?.guest_checkout) || !env2.STOREFRONT_URL) return void 0;
  const base = env2.STOREFRONT_URL.replace(/\/$/, "");
  const token = await guestOrderTokenFor(env2, order2.order_number);
  return `${base}/?order=${encodeURIComponent(order2.order_number)}&guestToken=${encodeURIComponent(token)}`;
}
__name(guestOrderLink, "guestOrderLink");
async function canAccessOrder(c, order2, token) {
  if (!Number(order2.guest_checkout) && c.get("user") && String(c.get("user").id) === String(order2.user_id)) return true;
  if (!Number(order2.guest_checkout) || typeof token !== "string" || !token) return false;
  const expected = await guestOrderTokenFor(c.env, order2.order_number);
  return timingSafeEqual2(expected, token);
}
__name(canAccessOrder, "canAccessOrder");
function timingSafeEqual2(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
__name(timingSafeEqual2, "timingSafeEqual");
async function sendOrderEmails(c, db, orderId) {
  const full = (await db.execute({
    sql: `SELECT o.*, COALESCE(o.contact_email, u.email) AS customer_email, u.name AS customer_name
              FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ?`,
    args: [orderId]
  })).rows[0];
  if (!full)
    return;
  const items = (await db.execute({
    sql: "SELECT product_name, product_price, quantity, product_image FROM order_items WHERE order_id = ?",
    args: [orderId]
  })).rows;
  let attachments = [];
  try {
    attachments = [
      {
        filename: `${(full.invoice_number || full.order_number).replace(/[^A-Za-z0-9-]/g, "-")}.pdf`,
        content: invoicePdfBase64({ order: full, items })
      }
    ];
  } catch (err) {
    console.error("[invoice:failed]", err?.message);
  }
  const mediaBase = new URL(c.req.url).origin;
  if (full.customer_email) {
    const trackingUrl = await guestOrderLink(c.env, full);
    const mail = orderConfirmationEmail({ order: full, items, mediaBase, trackingUrl });
    await sendEmail(c.env, { to: full.customer_email, subject: mail.subject, html: mail.html, attachments });
  }
  const adminTo = c.env.ADMIN_EMAIL;
  if (adminTo) {
    const mail = adminOrderEmail({ order: full, items, customerEmail: full.customer_email, mediaBase });
    await sendEmail(c.env, { to: adminTo, subject: mail.subject, html: mail.html, attachments });
  } else {
    console.log("[email:no-admin] ADMIN_EMAIL not set \u2014 shop copy not sent");
  }
}
__name(sendOrderEmails, "sendOrderEmails");
async function markPaid(c, db, order2, { paymentId, method, source }) {
  const paymentOption = order2.attempt_payment_option || order2.payment_option || "full";
  const paidAmount = paymentOption === "partial_cod"
    ? Math.round(Number(order2.amount_paise || 25000)) / 100
    : Number(order2.total_amount || 0);
  if (paymentOption === "partial_cod" && (Math.round(paidAmount * 100) !== 25000 || Number(order2.total_amount) <= paidAmount)) {
    console.error("[payment:partial-cod] invalid deposit amount", order2.order_number);
    return false;
  }
  const paymentStatus = paymentOption === "partial_cod" ? "partially_paid" : "paid";
  const res = await db.execute({
    sql: `UPDATE orders
            SET status = 'placed',
                payment_status = ?,
                payment_option = ?,
                amount_paid = ?,
                payment_id = ?,
                payment_method = ?,
                paid_at = datetime('now'),
                updated_at = datetime('now')
          WHERE id = ? AND payment_status NOT IN ('paid', 'partially_paid')`,
    args: [paymentStatus, paymentOption, paidAmount, paymentId, method || null, order2.id]
  });
  if (!res.rowsAffected)
    return false;
  await db.execute({
    sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'placed', ?)",
    args: [order2.id, paymentOption === "partial_cod" ? `₹${paidAmount.toFixed(2)} advance received; balance due on delivery (${source})` : `Payment received (${source})`]
  });
  const fy = financialYear(/* @__PURE__ */ new Date());
  const counter = await db.execute({
    sql: `INSERT INTO invoice_counters (fy, last_number) VALUES (?, 1)
          ON CONFLICT(fy) DO UPDATE SET last_number = last_number + 1
          RETURNING last_number`,
    args: [fy]
  });
  const serial = counter.rows[0]?.last_number;
  if (serial) {
    await db.execute({
      sql: "UPDATE orders SET invoice_number = ? WHERE id = ? AND invoice_number IS NULL",
      args: [formatInvoiceNumber(fy, serial), order2.id]
    });
  }
  if (!order2.created_by_admin && !order2.guest_checkout) {
    await db.execute({ sql: "DELETE FROM cart_items WHERE user_id = ?", args: [order2.user_id] });
  }
  if (order2.promo_code) {
    await db.execute({
      sql: "UPDATE promo_codes SET used_count = used_count + 1 WHERE code = ? COLLATE NOCASE",
      args: [order2.promo_code]
    });
    const promo = await db.execute({
      sql: "SELECT id FROM promo_codes WHERE code = ? COLLATE NOCASE LIMIT 1",
      args: [order2.promo_code]
    });
    const promoId = promo.rows[0]?.id;
    if (promoId) {
      await db.execute({
        sql: "INSERT INTO promo_redemptions (promo_code_id, user_id, order_id) VALUES (?, ?, ?)",
        args: [promoId, order2.user_id, order2.id]
      });
    }
  }
  const emails = sendOrderEmails(c, db, order2.id).catch((err) => console.error("[email:order]", err?.message));
  if (c.executionCtx?.waitUntil)
    c.executionCtx.waitUntil(emails);
  else
    await emails;
  return true;
}
__name(markPaid, "markPaid");
async function orderByRazorpayOrder(db, razorpayOrderId) {
  const found = await db.execute({
    sql: `SELECT o.id, o.user_id, o.guest_checkout, o.order_number, o.total_amount, o.promo_code, o.payment_status, o.payment_option, o.amount_paid, o.created_by_admin,
                 a.amount_paise, a.payment_option AS attempt_payment_option
            FROM order_payment_attempts a JOIN orders o ON o.id = a.order_id
           WHERE a.razorpay_order_id = ? LIMIT 1`,
    args: [razorpayOrderId]
  });
  return found.rows[0] || null;
}
__name(orderByRazorpayOrder, "orderByRazorpayOrder");
app4.post("/razorpay/order", async (c) => {
  if (!razorpayConfigured(c.env))
    return c.json({ error: "Online payment isn't set up yet." }, 503);
  const body = await c.req.json().catch(() => ({}));
  const orderNumber = String(body.orderNumber || "").trim();
  if (!orderNumber)
    return c.json({ error: "Missing order number." }, 400);
  const db = getDb(c.env);
  const found = await db.execute({
    sql: `SELECT id, user_id, guest_checkout, order_number, total_amount, currency_code, payment_status, payment_option, amount_paid, shipping_name, shipping_phone, shipping_country
            FROM orders WHERE order_number = ? LIMIT 1`,
    args: [orderNumber]
  });
  const order2 = found.rows[0];
  if (!order2 || !await canAccessOrder(c, order2, body.guestToken))
    return c.json({ error: "Order not found." }, 404);
  if (["paid", "partially_paid"].includes(order2.payment_status))
    return c.json({ error: "The required payment for this order has already been received." }, 400);
  if (order2.payment_option === "partial_cod" && (!isIndia(order2.shipping_country) || Number(order2.total_amount) <= 250))
    return c.json({ error: "This partial COD order is not eligible for the ₹250 advance." }, 400);
  const amountPaise = order2.payment_option === "partial_cod" ? 25000 : Math.round(Number(order2.total_amount) * 100);
  if (!Number.isFinite(amountPaise) || amountPaise < 100) {
    return c.json({ error: "This order's total is too small to pay online." }, 400);
  }
  const res = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: { Authorization: basicAuth(c.env), "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: order2.order_number,
      notes: { order_number: order2.order_number }
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.id) {
    return c.json({ error: data?.error?.description || "Couldn't start the payment. Please try again." }, 502);
  }
  await db.execute({
    sql: "UPDATE orders SET payment_provider = 'razorpay', payment_order_id = ?, updated_at = datetime('now') WHERE id = ?",
    args: [data.id, order2.id]
  });
  await db.execute({
    sql: "INSERT OR IGNORE INTO order_payment_attempts (razorpay_order_id, order_id, amount_paise, payment_option) VALUES (?, ?, ?, ?)",
    args: [data.id, order2.id, amountPaise, order2.payment_option || "full"]
  }).catch((err) => console.error("[payment:attempt]", err?.message));
  return c.json({
    keyId: c.env.RAZORPAY_KEY_ID,
    razorpayOrderId: data.id,
    amount: amountPaise,
    currency: "INR",
    paymentOption: order2.payment_option || "full",
    orderNumber: order2.order_number,
    name: order2.shipping_name || "",
    phone: order2.shipping_phone || ""
  });
});
app4.post("/razorpay/verify", async (c) => {
  if (!razorpayConfigured(c.env))
    return c.json({ error: "Online payment isn't set up yet." }, 503);
  const body = await c.req.json().catch(() => ({}));
  const orderNumber = String(body.orderNumber || "").trim();
  const razorpayOrderId = String(body.razorpayOrderId || "").trim();
  const razorpayPaymentId = String(body.razorpayPaymentId || "").trim();
  const razorpaySignature = String(body.razorpaySignature || "").trim();
  if (!orderNumber || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return c.json({ error: "Incomplete payment details." }, 400);
  }
  const db = getDb(c.env);
  const found = await db.execute({
    sql: `SELECT id, user_id, guest_checkout, order_number, promo_code, payment_order_id, payment_status, payment_option, amount_paid, total_amount, created_by_admin
            FROM orders WHERE order_number = ? LIMIT 1`,
    args: [orderNumber]
  });
  const order2 = found.rows[0];
  if (!order2 || !await canAccessOrder(c, order2, body.guestToken))
    return c.json({ error: "Order not found." }, 404);
  if (order2.payment_order_id !== razorpayOrderId) {
    return c.json({ error: "This payment doesn't belong to that order." }, 400);
  }
  const attempt = (await db.execute({
    sql: "SELECT amount_paise, payment_option FROM order_payment_attempts WHERE razorpay_order_id = ? AND order_id = ? LIMIT 1",
    args: [razorpayOrderId, order2.id]
  })).rows[0];
  if (!attempt || !Number.isFinite(Number(attempt.amount_paise)) || Number(attempt.amount_paise) < 100) {
    return c.json({ error: "This payment attempt is no longer valid. Please start checkout again." }, 400);
  }
  const expected = await hmacSha256Hex(c.env.RAZORPAY_KEY_SECRET, `${razorpayOrderId}|${razorpayPaymentId}`);
  if (!timingSafeEqual2(expected, razorpaySignature)) {
    await db.execute({
      sql: "UPDATE orders SET payment_status = 'failed', updated_at = datetime('now') WHERE id = ? AND payment_status != 'paid'",
      args: [order2.id]
    });
    return c.json({ error: "We couldn't verify that payment." }, 400);
  }
  await markPaid(c, db, { ...order2, amount_paise: attempt.amount_paise, attempt_payment_option: attempt.payment_option }, { paymentId: razorpayPaymentId, method: body.method, source: "checkout" });
  return c.json({ ok: true, orderNumber: order2.order_number });
});
app4.post("/razorpay/webhook", async (c) => {
  const secret = c.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret)
    return c.json({ error: "Webhook isn't set up." }, 503);
  const raw2 = await c.req.text();
  const signature = c.req.header("x-razorpay-signature") || "";
  const expected = await hmacSha256Hex(secret, raw2);
  if (!timingSafeEqual2(expected, signature))
    return c.json({ error: "Bad signature." }, 400);
  let event;
  try {
    event = JSON.parse(raw2);
  } catch {
    return c.json({ error: "Bad payload." }, 400);
  }
  const db = getDb(c.env);
  if (event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    if (!payment?.order_id)
      return c.json({ ok: true, ignored: "no order id" });
    const order2 = await orderByRazorpayOrder(db, payment.order_id);
    if (!order2)
      return c.json({ ok: true, ignored: "unknown order" });
    const expectedAmount = Number(order2.amount_paise ?? Math.round(Number(order2.total_amount || 0) * 100));
    if (Number(payment.amount) !== expectedAmount) {
      console.error("[payment:webhook] amount mismatch", order2.order_number);
      return c.json({ ok: true, ignored: "amount mismatch" });
    }
    await markPaid(c, db, order2, { paymentId: payment.id, method: payment.method, source: "webhook" });
    return c.json({ ok: true });
  }
  if (event.event === "payment.failed") {
    const payment = event.payload?.payment?.entity;
    if (!payment?.order_id)
      return c.json({ ok: true, ignored: "no order id" });
    const order2 = await orderByRazorpayOrder(db, payment.order_id);
    if (!order2)
      return c.json({ ok: true, ignored: "unknown order" });
    const res = await db.execute({
      sql: `UPDATE orders SET payment_status = 'failed', updated_at = datetime('now')
              WHERE id = ? AND payment_status NOT IN ('paid', 'partially_paid', 'refunded', 'partially_refunded')`,
      args: [order2.id]
    });
    if (res.rowsAffected) {
      await db.execute({
        sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'awaiting_payment', ?)",
        args: [order2.id, `Payment failed${payment.error_description ? `: ${payment.error_description}` : ""}`]
      });
    }
    return c.json({ ok: true });
  }
  if (event.event === "refund.processed") {
    const refund = event.payload?.refund?.entity;
    if (!refund?.payment_id)
      return c.json({ ok: true, ignored: "no payment id" });
    const found = await db.execute({
      sql: "SELECT id, total_amount, payment_status FROM orders WHERE payment_id = ? LIMIT 1",
      args: [refund.payment_id]
    });
    const order2 = found.rows[0];
    if (!order2)
      return c.json({ ok: true, ignored: "unknown payment" });
    const orderPaise = Math.round(Number(order2.total_amount) * 100);
    const full = Number(refund.amount) >= orderPaise;
    const status = full ? "refunded" : "partially_refunded";
    const res = await db.execute({
      sql: "UPDATE orders SET payment_status = ?, updated_at = datetime('now') WHERE id = ? AND payment_status != ?",
      args: [status, order2.id, status]
    });
    if (res.rowsAffected) {
      await db.execute({
        sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'refunded', ?)",
        args: [order2.id, `${full ? "Refunded" : "Partially refunded"} \u20B9${(Number(refund.amount) / 100).toFixed(2)}`]
      });
    }
    return c.json({ ok: true });
  }
  return c.json({ ok: true, ignored: event.event });
});
var payments_default = app4;

// src/routes/orders.js
var app5 = new Hono2();
app5.use("*", optionalAuth);
app5.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
var placeOrderSchema = external_exports.object({
  email: external_exports.string().trim().toLowerCase().email("Enter a valid email").optional(),
  items: external_exports.array(
    external_exports.object({
      productName: external_exports.string().trim().min(1).max(200),
      productPrice: external_exports.number().nonnegative().optional(),
      quantity: external_exports.number().int().positive().max(50)
    })
  ).min(1, "Cart is empty").max(100, "Too many different products in one order"),
  currencyCode: external_exports.string().min(1).max(8).optional(),
  promoCode: external_exports.string().trim().max(40).optional(),
  paymentOption: external_exports.enum(["full", "partial_cod"]).optional(),
  deliverySpeed: external_exports.enum(["normal", "urgent"]).optional(),
  shipping: external_exports.object({
    name: external_exports.string().min(1),
    phone: phoneField,
    line1: external_exports.string().min(1),
    line2: external_exports.string().optional(),
    city: external_exports.string().min(1),
    state: external_exports.string().optional(),
    postalCode: external_exports.string().optional(),
    country: external_exports.string().min(1)
  })
});
function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `BOB-${stamp}-${rand}`;
}
__name(generateOrderNumber, "generateOrderNumber");
var ORDER_STAGES = ["placed", "confirmed", "packed", "shipped", "out_for_delivery", "delivered"];
app5.get("/", async (c) => {
  if (!c.get("user")) return c.json({ error: "Not logged in" }, 401);
  const db = getDb(c.env);
  const orders = (await db.execute({
    sql: "SELECT id, order_number, status, total_amount, currency_code, created_at FROM orders WHERE user_id = ? AND guest_checkout = 0 ORDER BY created_at DESC",
    args: [c.get("user").id]
  })).rows;
  return c.json({ orders });
});
app5.get("/:orderNumber", async (c) => {
  const db = getDb(c.env);
  const order2 = (await db.execute({
    sql: "SELECT * FROM orders WHERE order_number = ?",
    args: [c.req.param("orderNumber")]
  })).rows[0];
  if (!order2 || !await canAccessOrder(c, order2, c.req.query("guestToken")))
    return c.json({ error: "Order not found" }, 404);
  const items = (await db.execute({ sql: "SELECT product_name, product_price, quantity, product_image FROM order_items WHERE order_id = ?", args: [order2.id] })).rows;
  const history = (await db.execute({
    sql: "SELECT status, note, created_at FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC",
    args: [order2.id]
  })).rows;
  return c.json({ order: order2, items, history, stages: ORDER_STAGES });
});
async function resolvePromo(db, code, subtotal, userId) {
  if (!code)
    return { discountAmount: 0, promoCode: null, promoCodeId: null };
  const row = (await db.execute({ sql: "SELECT * FROM promo_codes WHERE code = ? COLLATE NOCASE", args: [code] })).rows[0];
  if (!row || !row.active)
    throw new Error("That promo code isn't valid.");
  if (row.expires_at && new Date(row.expires_at).getTime() < Date.now())
    throw new Error("That promo code has expired.");
  if (userId != null) {
    const already = (await db.execute({ sql: "SELECT id FROM promo_redemptions WHERE promo_code_id = ? AND user_id = ?", args: [row.id, userId] })).rows[0];
    if (already)
      throw new Error("You've already used this promo code.");
  }
  if (row.usage_limit != null) {
    const distinctUsers = (await db.execute({ sql: "SELECT COUNT(*) AS n FROM promo_redemptions WHERE promo_code_id = ?", args: [row.id] })).rows[0];
    if (Number(distinctUsers.n) >= Number(row.usage_limit)) {
      throw new Error("That promo code has reached its usage limit.");
    }
  }
  if (subtotal < Number(row.min_order_amount)) {
    throw new Error(`This code needs a minimum order of \u20B9${row.min_order_amount}.`);
  }
  let discount = row.type === "percent" ? subtotal * Number(row.value) / 100 : Number(row.value);
  if (row.max_discount_amount != null)
    discount = Math.min(discount, Number(row.max_discount_amount));
  discount = Math.min(discount, subtotal);
  return { discountAmount: Math.round(discount * 100) / 100, promoCode: row.code, promoCodeId: row.id };
}
__name(resolvePromo, "resolvePromo");
async function resolveOrderProduct(db, requested) {
  const exactMatches = (await db.execute({
    sql: "SELECT name, price, variants FROM products WHERE name = ? COLLATE NOCASE AND active = 1 ORDER BY id LIMIT 2",
    args: [requested.productName]
  })).rows;
  if (exactMatches.length === 1) {
    return { productName: requested.productName, productPrice: Number(exactMatches[0].price) };
  }
  if (exactMatches.length > 1) return null;

  // Variant choices are appended to the cart display name by the storefront,
  // e.g. "MultiWisp Resin - Necklace, same colour". Resolve that suffix
  // against the product's saved variant groups and calculate the price here;
  // never trust the price supplied by the browser.
  const candidates = (await db.execute({
    sql: `SELECT name, price, variants FROM products
          WHERE active = 1
            AND LOWER(substr(?, 1, length(name))) = LOWER(name)
            AND substr(?, length(name) + 1, 3) = ' - '
          ORDER BY id LIMIT 20`,
    args: [requested.productName, requested.productName]
  })).rows;
  const resolved = [];
  for (const candidate of candidates) {
    const prefixLength = String(candidate.name).length;
    const suffix = requested.productName.slice(prefixLength + 3);
    const labels = suffix.split(",").map((value) => value.trim());
    let groups = [];
    try {
      const parsedVariants = JSON.parse(candidate.variants || "[]");
      if (Array.isArray(parsedVariants)) groups = parsedVariants;
      else if (parsedVariants && Array.isArray(parsedVariants.choices)) groups = [parsedVariants];
    } catch {
      groups = [];
    }
    // Some older listings store a single colour selection separately from
    // variant groups. Preserve that display suffix while charging the base
    // price; it cannot alter the price supplied by the browser.
    if (!groups.length) {
      if (labels.length === 1) resolved.push({ productName: requested.productName, productPrice: Number(candidate.price) });
      continue;
    }
    if (labels.length < groups.length || labels.length > groups.length + 1) continue;
    let price = Number(candidate.price);
    let priceChoiceUsed = false;
    let valid = true;
    for (let index = 0; index < groups.length; index++) {
      const choice = (groups[index].choices || []).find((entry) =>
        String(entry.label).trim().toLowerCase() === labels[index].toLowerCase()
      );
      if (!choice) {
        valid = false;
        break;
      }
      if (!priceChoiceUsed && typeof choice.price === "number") {
        price = choice.price;
        priceChoiceUsed = true;
      }
    }
    if (valid) resolved.push({ productName: requested.productName, productPrice: price });
  }
  return resolved.length === 1 ? resolved[0] : null;
}
__name(resolveOrderProduct, "resolveOrderProduct");
app5.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = placeOrderSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { items: requestedItems, shipping, currencyCode, promoCode, deliverySpeed } = parsed.data;
  const paymentOption = parsed.data.paymentOption || "full";
  const db = getDb(c.env);
  const items = [];
  for (const requested of requestedItems) {
    const product = await resolveOrderProduct(db, requested);
    if (!product) return c.json({ error: `Product '${requested.productName}' is unavailable or ambiguous. Refresh your cart and try again.` }, 400);
    items.push({ ...product, quantity: requested.quantity });
  }
  const signedInUser = c.get("user");
  const customerEmail = String(parsed.data.email || signedInUser?.email || "").trim().toLowerCase();
  if (!customerEmail) return c.json({ error: "Enter an email address for your order updates." }, 400);
  let userId;
  if (signedInUser) {
    userId = signedInUser.id;
  } else {
    const guestAlias = `guest-${await hmacSha256Hex(c.env.JWT_SECRET, `beauty-of-beads:guest-user:${customerEmail}`)}@guest.invalid`;
    let guestUser = (await db.execute({ sql: "SELECT id FROM users WHERE email = ?", args: [guestAlias] })).rows[0];
    if (!guestUser) {
      await db.execute({
        sql: "INSERT OR IGNORE INTO users (name, email, password_hash, phone, invited_at) VALUES (?, ?, '', ?, datetime('now'))",
        args: [shipping.name, guestAlias, shipping.phone]
      });
      guestUser = (await db.execute({ sql: "SELECT id FROM users WHERE email = ?", args: [guestAlias] })).rows[0];
    }
    userId = guestUser.id;
  }
  const guestCheckout = signedInUser ? 0 : 1;
  const subtotal = items.reduce((sum, it) => sum + it.productPrice * it.quantity, 0);
  let discountAmount = 0;
  let appliedCode = null;
  let appliedCodeId = null;
  if (promoCode) {
    try {
      const resolved = await resolvePromo(db, promoCode, subtotal, userId);
      discountAmount = resolved.discountAmount;
      appliedCode = resolved.promoCode;
      appliedCodeId = resolved.promoCodeId;
    } catch (err) {
      return c.json({ error: err.message }, 400);
    }
  }
  const quote = quoteOrder({
    subtotal,
    discountAmount,
    country: shipping.country,
    state: shipping.state,
    speed: deliverySpeed
  });
  const totalAmount = quote.totalAmount;
  const paymentRequired = razorpayConfigured(c.env);
  if (!paymentRequired) {
    return c.json({ error: "Online payment is temporarily unavailable. Your order has not been placed." }, 503);
  }
  if (paymentOption === "partial_cod" && !isIndia(shipping.country)) {
    return c.json({ error: "Partial COD is available for delivery in India only." }, 400);
  }
  if (paymentOption === "partial_cod" && totalAmount <= 250) {
    return c.json({ error: "Partial COD needs an order total above ₹250." }, 400);
  }
  const pending = paymentRequired ? (await db.execute({
    sql: `SELECT id, order_number FROM orders
                 WHERE user_id = ? AND guest_checkout = ? AND status = 'awaiting_payment' AND created_by_admin = 0
                   AND payment_option = ?
                   AND payment_status NOT IN ('paid', 'refunded', 'partially_refunded')
                 ORDER BY id DESC LIMIT 1`,
    args: [userId, guestCheckout, paymentOption]
  })).rows[0] : null;
  const orderNumber = pending?.order_number || generateOrderNumber();
  let orderId;
  const orderFields = [
    paymentRequired ? "awaiting_payment" : "placed",
    totalAmount,
    currencyCode || "INR",
    appliedCode,
    discountAmount,
    shipping.name,
    shipping.phone,
    shipping.line1,
    shipping.line2 || null,
    shipping.city,
    shipping.state || null,
    shipping.postalCode || null,
    shipping.country,
    quote.shipping.amount,
    quote.shipping.method,
    quote.tax.amount,
    quote.tax.type,
    quote.tax.rate,
    paymentOption
  ];
  if (pending) {
    orderId = pending.id;
    await db.execute({
      sql: `UPDATE orders SET status = ?, total_amount = ?, currency_code = ?, promo_code = ?, discount_amount = ?,
              shipping_name = ?, shipping_phone = ?, shipping_line1 = ?, shipping_line2 = ?, shipping_city = ?,
              shipping_state = ?, shipping_postal_code = ?, shipping_country = ?,
              shipping_amount = ?, shipping_method = ?, tax_amount = ?, tax_type = ?, tax_rate = ?,
              payment_option = ?, amount_paid = 0, guest_checkout = ?, contact_email = ?, payment_status = 'unpaid', created_at = datetime('now'), updated_at = datetime('now')
            WHERE id = ?`,
      args: [...orderFields, guestCheckout, customerEmail, orderId]
    });
    await db.execute({ sql: "DELETE FROM order_items WHERE order_id = ?", args: [orderId] });
  } else {
    const orderInfo = await db.execute({
      sql: `INSERT INTO orders (status, total_amount, currency_code, promo_code, discount_amount,
              shipping_name, shipping_phone, shipping_line1, shipping_line2, shipping_city, shipping_state, shipping_postal_code, shipping_country,
              shipping_amount, shipping_method, tax_amount, tax_type, tax_rate, payment_option, user_id, order_number, guest_checkout, contact_email)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [...orderFields, userId, orderNumber, guestCheckout, customerEmail]
    });
    orderId = orderInfo.lastInsertRowid;
  }
  for (const it of items) {
    const image = await firstImageForProductName(db, it.productName);
    await db.execute({
      sql: "INSERT INTO order_items (order_id, product_name, product_price, quantity, product_image) VALUES (?, ?, ?, ?, ?)",
      args: [orderId, it.productName, it.productPrice, it.quantity, image]
    });
  }
  if (!pending) {
    await db.execute({
      sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, ?, ?)",
      args: [
        orderId,
        paymentRequired ? "awaiting_payment" : "placed",
        paymentRequired ? "Awaiting payment" : "Order placed successfully"
      ]
    });
  }
  if (!paymentRequired) {
    if (signedInUser) await db.execute({ sql: "DELETE FROM cart_items WHERE user_id = ?", args: [userId] });
    if (appliedCode) {
      await db.execute({ sql: "UPDATE promo_codes SET used_count = used_count + 1 WHERE code = ? COLLATE NOCASE", args: [appliedCode] });
      await db.execute({
        sql: "INSERT INTO promo_redemptions (promo_code_id, user_id, order_id) VALUES (?, ?, ?)",
        args: [appliedCodeId, userId, orderId]
      });
    }
  }
  return c.json(
    {
      orderNumber,
      orderId: Number(orderId),
      guestToken: guestCheckout ? await guestOrderTokenFor(c.env, orderNumber) : void 0,
      totalAmount,
      discountAmount,
      shippingAmount: quote.shipping.amount,
      taxAmount: quote.tax.amount,
      paymentRequired
    },
    201
  );
});
app5.post("/preview-promo", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const code = String(body.code || "").trim();
  const subtotal = Number(body.subtotal || 0);
  const db = getDb(c.env);
  try {
    const resolved = await resolvePromo(db, code, subtotal, c.get("user")?.id);
    return c.json({ valid: true, discountAmount: resolved.discountAmount });
  } catch (err) {
    return c.json({ valid: false, error: err.message }, 400);
  }
});
var confirmSchema = external_exports.object({
  shipping: placeOrderSchema.shape.shipping,
  deliverySpeed: external_exports.enum(["normal", "urgent"]).optional()
});
app5.post("/:orderNumber/confirm", async (c) => {
  if (!c.get("user")) return c.json({ error: "Not logged in" }, 401);
  const body = await c.req.json().catch(() => ({}));
  const parsed = confirmSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { shipping, deliverySpeed } = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const order2 = (await db.execute({
    sql: "SELECT * FROM orders WHERE order_number = ? AND user_id = ?",
    args: [c.req.param("orderNumber"), userId]
  })).rows[0];
  if (!order2)
    return c.json({ error: "Order not found" }, 404);
  if (order2.status !== "awaiting_payment")
    return c.json({ error: "This order has already been confirmed." }, 400);
  if (order2.payment_status === "paid")
    return c.json({ error: "This order is already paid." }, 400);
  if (!razorpayConfigured(c.env))
    return c.json({ error: "Online payment is temporarily unavailable. This order has not been confirmed." }, 503);
  const itemTotals = await db.execute({
    sql: "SELECT COALESCE(SUM(product_price * quantity), 0) AS subtotal FROM order_items WHERE order_id = ?",
    args: [order2.id]
  });
  const goods = Math.max(0, round2(Number(itemTotals.rows[0]?.subtotal || 0) - Number(order2.discount_amount || 0)));
  const quote = quoteOrder({
    subtotal: goods,
    discountAmount: 0,
    // already reflected in the stored total
    country: shipping.country,
    state: shipping.state,
    speed: deliverySpeed
  });
  const paymentRequired = razorpayConfigured(c.env);
  await db.execute({
    sql: `UPDATE orders SET status = ?, shipping_name = ?, shipping_phone = ?, shipping_line1 = ?, shipping_line2 = ?,
            shipping_city = ?, shipping_state = ?, shipping_postal_code = ?, shipping_country = ?,
            shipping_amount = ?, shipping_method = ?, tax_amount = ?, tax_type = ?, tax_rate = ?,
            total_amount = ?, updated_at = datetime('now')
          WHERE id = ?`,
    args: [
      paymentRequired ? "awaiting_payment" : "placed",
      shipping.name,
      shipping.phone,
      shipping.line1,
      shipping.line2 || null,
      shipping.city,
      shipping.state || null,
      shipping.postalCode || null,
      shipping.country,
      quote.shipping.amount,
      quote.shipping.method,
      quote.tax.amount,
      quote.tax.type,
      quote.tax.rate,
      quote.totalAmount,
      order2.id
    ]
  });
  if (!paymentRequired) {
    await db.execute({
      sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'placed', 'Confirmed by customer')",
      args: [order2.id]
    });
  }
  return c.json({
    ok: true,
    orderNumber: order2.order_number,
    totalAmount: quote.totalAmount,
    shippingAmount: quote.shipping.amount,
    taxAmount: quote.tax.amount,
    paymentRequired
  });
});
var orders_default = app5;

// src/routes/newsletter.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app6 = new Hono2();
var schema = external_exports.object({ email: external_exports.string().trim().toLowerCase().email("Enter a valid email") });
app6.post("/", async (c) => {
  await ensureSchema(c.env);
  const body = await c.req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { email } = parsed.data;
  const db = getDb(c.env);
  const existing = (await db.execute({ sql: "SELECT id FROM newsletter_subscribers WHERE email = ?", args: [email] })).rows[0];
  if (existing)
    return c.json({ ok: true, alreadySubscribed: true });
  await db.execute({ sql: "INSERT INTO newsletter_subscribers (email) VALUES (?)", args: [email] });
  return c.json({ ok: true, alreadySubscribed: false }, 201);
});
var newsletter_default = app6;

// src/routes/reviews.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app7 = new Hono2();
app7.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app7.get("/product/:productName", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute({
    sql: `SELECT id, rating, comment, reviewer_name, created_at FROM reviews WHERE product_name = ? ORDER BY created_at DESC`,
    args: [c.req.param("productName")]
  });
  const reviews = rows.rows;
  const count3 = reviews.length;
  const average = count3 > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count3 : null;
  return c.json({ reviews, count: count3, average });
});
app7.get("/reviewable", requireAuth, async (c) => {
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const deliveredItems = (await db.execute({
    sql: `SELECT o.id AS order_id, o.order_number, o.updated_at AS delivered_at, oi.product_name, oi.product_price
              FROM orders o JOIN order_items oi ON oi.order_id = o.id
             WHERE o.user_id = ? AND o.status = 'delivered'
             ORDER BY o.updated_at DESC`,
    args: [userId]
  })).rows;
  const already = new Set(
    (await db.execute({ sql: `SELECT order_id, product_name FROM reviews WHERE user_id = ?`, args: [userId] })).rows.map(
      (r) => `${r.order_id}::${r.product_name}`
    )
  );
  const reviewable = deliveredItems.filter((it) => !already.has(`${it.order_id}::${it.product_name}`));
  return c.json({ reviewable });
});
var createReviewSchema = external_exports.object({
  orderId: external_exports.number().int().positive(),
  productName: external_exports.string().min(1),
  rating: external_exports.number().int().min(1).max(5),
  comment: external_exports.string().trim().min(5, "Please write a few words about the product").max(1e3)
});
app7.post("/", requireAuth, async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = createReviewSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { orderId, productName, rating, comment } = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const order2 = (await db.execute({ sql: "SELECT id, user_id, status FROM orders WHERE id = ?", args: [orderId] })).rows[0];
  if (!order2 || Number(order2.user_id) !== userId)
    return c.json({ error: "Order not found" }, 404);
  if (order2.status !== "delivered") {
    return c.json({ error: "You can review a product once your order has been delivered." }, 403);
  }
  const item = (await db.execute({ sql: "SELECT id FROM order_items WHERE order_id = ? AND product_name = ?", args: [orderId, productName] })).rows[0];
  if (!item)
    return c.json({ error: "That product isn't part of this order." }, 400);
  const existing = (await db.execute({
    sql: "SELECT id FROM reviews WHERE user_id = ? AND order_id = ? AND product_name = ?",
    args: [userId, orderId, productName]
  })).rows[0];
  if (existing)
    return c.json({ error: "You've already reviewed this product for this order." }, 409);
  const user = (await db.execute({ sql: "SELECT name FROM users WHERE id = ?", args: [userId] })).rows[0];
  const info3 = await db.execute({
    sql: `INSERT INTO reviews (user_id, order_id, product_name, rating, comment, reviewer_name) VALUES (?, ?, ?, ?, ?, ?)`,
    args: [userId, orderId, productName, rating, comment, user?.name || "Verified Buyer"]
  });
  const review = (await db.execute({
    sql: "SELECT id, rating, comment, reviewer_name, created_at FROM reviews WHERE id = ?",
    args: [info3.lastInsertRowid]
  })).rows[0];
  if (c.env.ADMIN_EMAIL) {
    const mail = reviewPostedEmail({
      productName,
      rating,
      comment,
      reviewerName: review?.reviewer_name || user?.name
    });
    const send2 = sendEmail(c.env, { to: c.env.ADMIN_EMAIL, subject: mail.subject, html: mail.html }).catch(
      (e) => console.error("[email:review]", e?.message)
    );
    if (c.executionCtx?.waitUntil)
      c.executionCtx.waitUntil(send2);
  }
  return c.json({ review }, 201);
});
var reviews_default = app7;

// src/routes/products.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/lib/edgeCache.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var CACHE_VERSION = "3";
var DEFAULT_FRESH_SECONDS = 60;
var EDGE_RETENTION_SECONDS = 86400;
var CACHED_AT = "X-Cached-At";
function keyFor(url) {
  const u = new URL(url);
  return new Request(`${u.origin}${u.pathname}${u.search}#v${CACHE_VERSION}`, { method: "GET" });
}
__name(keyFor, "keyFor");
function stripCors(headers) {
  headers.delete("Access-Control-Allow-Origin");
  headers.delete("Access-Control-Allow-Credentials");
  headers.delete("Vary");
}
__name(stripCors, "stripCors");
function forEdge(response) {
  const copy = new Response(response.body, response);
  copy.headers.set("Cache-Control", `public, max-age=${EDGE_RETENTION_SECONDS}`);
  copy.headers.set(CACHED_AT, String(Date.now()));
  stripCors(copy.headers);
  return copy;
}
__name(forEdge, "forEdge");
function forBrowser(response, freshSeconds) {
  const copy = new Response(response.body, response);
  stripCors(copy.headers);
  copy.headers.set("Cache-Control", `public, max-age=${freshSeconds}`);
  return copy;
}
__name(forBrowser, "forBrowser");
function ageSeconds(response) {
  const at = Number(response.headers.get(CACHED_AT) || 0);
  if (!at)
    return Infinity;
  return (Date.now() - at) / 1e3;
}
__name(ageSeconds, "ageSeconds");
async function withEdgeCache(c, freshSeconds = DEFAULT_FRESH_SECONDS, build) {
  if (c.req.method !== "GET") {
    return build();
  }
  const cache = caches.default;
  const cacheKey = keyFor(c.req.url);
  const hit = await cache.match(cacheKey);
  if (hit) {
    if (ageSeconds(hit) > freshSeconds) {
      c.executionCtx.waitUntil(
        (async () => {
          try {
            const fresh2 = await build();
            if (fresh2.status === 200)
              await cache.put(cacheKey, forEdge(fresh2));
          } catch {
          }
        })()
      );
    }
    return forBrowser(hit, freshSeconds);
  }
  const fresh = await build();
  if (fresh.status !== 200)
    return fresh;
  const edgeCopy = forEdge(fresh);
  c.executionCtx.waitUntil(cache.put(cacheKey, edgeCopy.clone()));
  return forBrowser(edgeCopy, freshSeconds);
}
__name(withEdgeCache, "withEdgeCache");
async function invalidate(c, pathname) {
  try {
    const url = new URL(c.req.url);
    await caches.default.delete(keyFor(`${url.origin}${pathname}`));
  } catch {
  }
}
__name(invalidate, "invalidate");

// src/routes/products.js
var app8 = new Hono2();
app8.get("/", (c) => withEdgeCache(c, 60, async () => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const { category, featured, bestseller, newArrival, search } = c.req.query();
  const cards = c.req.query("cards") === "1";
  const page = Math.max(1, parseInt(c.req.query("page") || "1", 10) || 1);
  const maxLimit = cards ? 250 : 60;
  const limit = Math.min(maxLimit, Math.max(1, parseInt(c.req.query("limit") || "24", 10) || 24));
  const offset = (page - 1) * limit;
  const where = ["active = 1"];
  const args = [];
  if (category) {
    where.push("LOWER(category) = LOWER(?)");
    args.push(category);
  }
  if (featured === "1")
    where.push("is_featured = 1");
  if (bestseller === "1")
    where.push("is_bestseller = 1");
  if (newArrival === "1")
    where.push("is_new_arrival = 1");
  if (search) {
    where.push("LOWER(name) LIKE LOWER(?)");
    args.push(`%${search}%`);
  }
  const whereSql = where.join(" AND ");
  const [rows, countRow] = await Promise.all([
    db.execute({
      sql: `SELECT * FROM products WHERE ${whereSql} ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?`,
      args: [...args, limit, offset]
    }),
    db.execute({ sql: `SELECT COUNT(*) AS total FROM products WHERE ${whereSql}`, args })
  ]);
  return c.json({
    products: rows.rows.map(cards ? rowToProductCard : rowToProduct),
    page,
    limit,
    total: Number(countRow.rows[0].total)
  });
}));
app8.get("/categories", async (c) => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const rows = await db.execute(
    "SELECT category, COUNT(*) AS count FROM products WHERE active = 1 GROUP BY category ORDER BY category ASC"
  );
  return c.json({ categories: rows.rows.map((r) => ({ category: r.category, count: Number(r.count) })) });
});
app8.get("/:slug", (c) => withEdgeCache(c, 60, async () => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const row = await db.execute({ sql: "SELECT * FROM products WHERE slug = ? AND active = 1", args: [c.req.param("slug")] });
  if (row.rows.length === 0)
    return c.json({ error: "Product not found" }, 404);
  return c.json({ product: rowToProduct(row.rows[0]) });
}));
var products_default = app8;

// src/routes/categories.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app9 = new Hono2();
app9.get("/", (c) => withEdgeCache(c, 60, async () => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const rows = await db.execute("SELECT id, name, slug, image_url AS imageUrl FROM categories ORDER BY sort_order ASC, name ASC");
  return c.json({ categories: rows.rows });
}));
var categories_default = app9;

// src/routes/site-settings.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app10 = new Hono2();
app10.get("/", async (c) => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const rows = (await db.execute("SELECT key, value FROM site_settings")).rows;
  const settings = {};
  for (const r of rows)
    settings[r.key] = r.value;
  return c.json({ settings });
});
var site_settings_default = app10;

// src/routes/featured-reviews.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app11 = new Hono2();
app11.get("/", async (c) => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const rows = await db.execute(
    "SELECT id, reviewer_name, rating, comment, product_name FROM featured_reviews ORDER BY sort_order ASC, created_at DESC"
  );
  return c.json({ reviews: rows.rows });
});
var featured_reviews_default = app11;

// src/routes/complaints.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app12 = new Hono2();
app12.use("*", requireAuth);
app12.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
var COMPLAINT_WINDOW_DAYS = 7;
var COMPLAINT_WINDOW_MS = COMPLAINT_WINDOW_DAYS * 24 * 60 * 60 * 1e3;
app12.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute({
    sql: `SELECT co.*, o.order_number
            FROM complaints co JOIN orders o ON o.id = co.order_id
           WHERE co.user_id = ? ORDER BY co.created_at DESC`,
    args: [c.get("user").id]
  });
  return c.json({ complaints: rows.rows.map((r) => ({ ...r, images: JSON.parse(r.images || "[]") })) });
});
var createComplaintSchema = external_exports.object({
  productName: external_exports.string().trim().max(200).optional(),
  description: external_exports.string().trim().min(5, "Please describe the issue").max(2e3),
  images: external_exports.array(external_exports.string().url()).max(5, "You can attach up to 5 images").optional(),
  phone: phoneField
});
app12.post("/:orderNumber", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = createComplaintSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { productName, description, images, phone } = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const order2 = (await db.execute({
    sql: "SELECT id, status FROM orders WHERE order_number = ? AND user_id = ?",
    args: [c.req.param("orderNumber"), userId]
  })).rows[0];
  if (!order2)
    return c.json({ error: "Order not found" }, 404);
  if (order2.status !== "delivered")
    return c.json({ error: "You can raise a complaint once your order has been delivered." }, 400);
  const deliveredRow = (await db.execute({
    sql: `SELECT created_at FROM order_status_history WHERE order_id = ? AND status = 'delivered' ORDER BY created_at DESC LIMIT 1`,
    args: [order2.id]
  })).rows[0];
  const deliveredAt = deliveredRow ? (/* @__PURE__ */ new Date(`${deliveredRow.created_at.replace(" ", "T")}Z`)).getTime() : null;
  if (deliveredAt && Date.now() - deliveredAt > COMPLAINT_WINDOW_MS) {
    return c.json({ error: `The ${COMPLAINT_WINDOW_DAYS}-day window to raise a complaint for this order has passed.` }, 400);
  }
  const info3 = await db.execute({
    sql: `INSERT INTO complaints (order_id, user_id, product_name, description, images, phone) VALUES (?, ?, ?, ?, ?, ?)`,
    args: [order2.id, userId, productName || null, description, JSON.stringify(images || []), phone]
  });
  const row = (await db.execute({ sql: "SELECT * FROM complaints WHERE id = ?", args: [info3.lastInsertRowid] })).rows[0];
  const customer = (await db.execute({ sql: "SELECT name, email FROM users WHERE id = ?", args: [userId] })).rows[0];
  if (customer?.email) {
    const ack = complaintReceivedEmail({ orderNumber: c.req.param("orderNumber"), productName, description });
    const send2 = sendEmail(c.env, { to: customer.email, subject: ack.subject, html: ack.html }).catch(
      (e) => console.error("[email:complaint-ack]", e?.message)
    );
    if (c.executionCtx?.waitUntil)
      c.executionCtx.waitUntil(send2);
  }
  if (c.env.ADMIN_EMAIL) {
    const mail = complaintRaisedEmail({
      orderNumber: c.req.param("orderNumber"),
      customerName: customer?.name,
      customerEmail: customer?.email,
      productName,
      description,
      phone
    });
    const send2 = sendEmail(c.env, { to: c.env.ADMIN_EMAIL, subject: mail.subject, html: mail.html }).catch(
      (e) => console.error("[email:complaint]", e?.message)
    );
    if (c.executionCtx?.waitUntil)
      c.executionCtx.waitUntil(send2);
  }
  return c.json({ complaint: { ...row, images: JSON.parse(row.images || "[]") } }, 201);
});
var complaints_default = app12;

// src/routes/uploads.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app13 = new Hono2();
app13.post("/", requireAuth, async (c) => {
  if (!c.env.MEDIA)
    return c.json({ error: "Media storage isn't configured on this server yet." }, 503);
  const form = await c.req.parseBody();
  const file = form.file;
  if (!file || typeof file === "string")
    return c.json({ error: "No file uploaded" }, 400);
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowed.includes(file.type))
    return c.json({ error: `Unsupported file type: ${file.type}` }, 400);
  const maxBytes = 8 * 1024 * 1024;
  if (file.size > maxBytes)
    return c.json({ error: "Image is too large (max 8MB)" }, 400);
  const ext = file.name?.split(".").pop() || (file.type.split("/")[1] || "jpg");
  const key = `complaints/${crypto.randomUUID()}.${ext}`;
  await c.env.MEDIA.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  const base = c.env.MEDIA_PUBLIC_BASE_URL ? c.env.MEDIA_PUBLIC_BASE_URL.replace(/\/$/, "") : `${new URL(c.req.url).origin}/media`;
  const url = `${base}/${key}`;
  return c.json({ url, key }, 201);
});
var uploads_default = app13;

// src/routes/addresses.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app14 = new Hono2();
app14.use("*", requireAuth);
app14.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
var SELECT_COLS = `id, label, line1, line2, city, state, postal_code AS postalCode, country, is_default AS isDefault, created_at AS createdAt`;
var POSTAL_REGEX = /^[A-Za-z0-9][A-Za-z0-9\s-]{2,11}$/;
var addressSchema = external_exports.object({
  label: external_exports.string().trim().max(60).optional(),
  line1: external_exports.string().trim().min(1, "Address is required").max(200),
  line2: external_exports.string().trim().max(200).optional(),
  city: external_exports.string().trim().min(1, "City is required").max(100),
  state: external_exports.string().trim().max(100).optional(),
  postalCode: external_exports.string().trim().regex(POSTAL_REGEX, "Enter a valid PIN / postal code").optional().or(external_exports.literal("")),
  country: external_exports.string().trim().min(1, "Country is required").max(80),
  isDefault: external_exports.boolean().optional()
});
function normalizeRow(row) {
  return { ...row, isDefault: !!row.isDefault };
}
__name(normalizeRow, "normalizeRow");
async function listFor(db, userId) {
  const rows = await db.execute({
    sql: `SELECT ${SELECT_COLS} FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC`,
    args: [userId]
  });
  return rows.rows.map(normalizeRow);
}
__name(listFor, "listFor");
async function makeDefault(db, userId, addressId) {
  await db.execute({ sql: "UPDATE addresses SET is_default = 0 WHERE user_id = ?", args: [userId] });
  await db.execute({ sql: "UPDATE addresses SET is_default = 1 WHERE id = ? AND user_id = ?", args: [addressId, userId] });
}
__name(makeDefault, "makeDefault");
app14.get("/", async (c) => {
  const db = getDb(c.env);
  return c.json({ addresses: await listFor(db, c.get("user").id) });
});
app14.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = addressSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const count3 = Number((await db.execute({ sql: "SELECT COUNT(*) AS n FROM addresses WHERE user_id = ?", args: [userId] })).rows[0].n);
  const shouldDefault = d.isDefault || count3 === 0;
  const info3 = await db.execute({
    sql: `INSERT INTO addresses (user_id, label, line1, line2, city, state, postal_code, country, is_default)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    args: [userId, d.label || null, d.line1, d.line2 || null, d.city, d.state || null, d.postalCode || null, d.country]
  });
  if (shouldDefault)
    await makeDefault(db, userId, info3.lastInsertRowid);
  return c.json({ addresses: await listFor(db, userId) }, 201);
});
app14.put("/:id", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = addressSchema.partial().safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const id = c.req.param("id");
  const existing = (await db.execute({ sql: "SELECT * FROM addresses WHERE id = ? AND user_id = ?", args: [id, userId] })).rows[0];
  if (!existing)
    return c.json({ error: "Address not found" }, 404);
  await db.execute({
    sql: `UPDATE addresses SET label = ?, line1 = ?, line2 = ?, city = ?, state = ?, postal_code = ?, country = ?
          WHERE id = ? AND user_id = ?`,
    args: [
      d.label ?? existing.label,
      d.line1 ?? existing.line1,
      d.line2 ?? existing.line2,
      d.city ?? existing.city,
      d.state ?? existing.state,
      d.postalCode ?? existing.postal_code,
      d.country ?? existing.country,
      id,
      userId
    ]
  });
  if (d.isDefault)
    await makeDefault(db, userId, id);
  return c.json({ addresses: await listFor(db, userId) });
});
app14.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const id = c.req.param("id");
  const existing = (await db.execute({ sql: "SELECT is_default FROM addresses WHERE id = ? AND user_id = ?", args: [id, userId] })).rows[0];
  if (!existing)
    return c.json({ error: "Address not found" }, 404);
  await db.execute({ sql: "DELETE FROM addresses WHERE id = ? AND user_id = ?", args: [id, userId] });
  if (existing.is_default) {
    const next = (await db.execute({ sql: "SELECT id FROM addresses WHERE user_id = ? ORDER BY id DESC LIMIT 1", args: [userId] })).rows[0];
    if (next)
      await makeDefault(db, userId, next.id);
  }
  return c.json({ addresses: await listFor(db, userId) });
});
app14.post("/:id/default", async (c) => {
  const db = getDb(c.env);
  const userId = c.get("user").id;
  const id = c.req.param("id");
  const existing = (await db.execute({ sql: "SELECT id FROM addresses WHERE id = ? AND user_id = ?", args: [id, userId] })).rows[0];
  if (!existing)
    return c.json({ error: "Address not found" }, 404);
  await makeDefault(db, userId, id);
  return c.json({ addresses: await listFor(db, userId) });
});
var addresses_default = app14;

// src/routes/homepage.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/lib/homepage.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var PRODUCT_SECTIONS = [
  { key: "topPicks", flagColumn: "is_bestseller", orderColumn: "bestseller_order", title: "Top Picks" },
  { key: "shopByTrend", flagColumn: "is_featured", orderColumn: "featured_order", title: "Shop by Trend" },
  { key: "newArrivals", flagColumn: "is_new_arrival", orderColumn: "new_arrival_order", title: "New Arrivals" },
  { key: "spotlight", flagColumn: "is_spotlight", orderColumn: "spotlight_order", title: "Spotlight" },
  { key: "onSale", flagColumn: "is_on_sale", orderColumn: "on_sale_order", title: "Currently on Sale" }
];
var PRODUCT_SECTION_KEYS = PRODUCT_SECTIONS.map((s) => s.key);
var HOMEPAGE_LAYOUT = [
  { key: "hero", kind: "images", title: "Hero", help: "The sliding images at the very top of the homepage." },
  { key: "categories", kind: "categories", title: "Shop by Category", help: "The category tiles and the order they appear in." },
  { key: "topPicks", kind: "products", title: "Top Picks", help: "Products flagged as bestsellers." },
  { key: "heritageBanner", kind: "images", title: "Heritage banner", help: "Full-bleed banner between Top Picks and Shop by Trend." },
  { key: "shopByTrend", kind: "products", title: "Shop by Trend", help: "Products flagged as featured." },
  { key: "newArrivals", kind: "products", title: "New Arrivals", help: "Products flagged as new arrivals." },
  { key: "spotlight", kind: "products", title: "Spotlight", help: "Products shown in the Spotlight carousel." },
  { key: "shopAllTile", kind: "images", title: '"Shop All" tile', help: "The tile that closes the New Arrivals row." },
  { key: "onSale", kind: "products", title: "Currently on Sale", help: "The sale row below Spotlight." },
  { key: "videos", kind: "images", title: "Video strip", help: 'The "Your Next Obsession" reels between the sale row and Reviews.' },
  { key: "storeVisitBanner", kind: "images", title: "Store visit banner", help: 'Banner behind the "Visit Our Store" section. A video works here too.' },
  { key: "story", kind: "images", title: "Story section", help: 'The picture or video beside "Story behind Beauty of Beads".' },
  { key: "instagram", kind: "images", title: "Instagram strip", help: 'The clips under "Follow us on Instagram".' }
];
var IMAGE_SLOTS = {
  // Hero footage is usually shot with the subject a little above the middle,
  // and the frame is very wide, so a plain centre crop tends to clip the top
  // of the head. Slightly above centre is the better starting point; the
  // admin can still change it per slot.
  hero: {
    listKey: "hero_images",
    legacyKey: "hero_image",
    mobileKey: "hero_images_mobile",
    focusKey: "hero_focus",
    defaultFocus: "35%",
    fitKey: "hero_fit",
    defaultFit: "cover"
  },
  heritageBanner: {
    listKey: "homepage_banner_images",
    legacyKey: "homepage_banner_image",
    mobileKey: "homepage_banner_images_mobile",
    focusKey: "homepage_banner_focus",
    fitKey: "homepage_banner_fit"
  },
  // The "Shop All" tile that closes the New Arrivals row.
  shopAllTile: {
    listKey: "shop_all_tile_images",
    legacyKey: "shop_all_tile_image",
    mobileKey: "shop_all_tile_images_mobile",
    focusKey: "shop_all_tile_focus",
    fitKey: "shop_all_tile_fit"
  },
  // The picture or clip beside the "Story behind Beauty of Beads" copy.
  story: {
    listKey: "story_media",
    legacyKey: "story_media_single",
    mobileKey: "story_media_mobile",
    focusKey: "story_focus",
    fitKey: "story_fit"
  },
  // The "Follow us on Instagram" strip — same kind of short vertical clips as
  // the reel strip, kept as its own slot so the two rows are managed apart.
  instagram: {
    listKey: "instagram_media",
    legacyKey: "instagram_media_single",
    mobileKey: "instagram_media_mobile"
  },
  // Short vertical reels. Uses the same list mechanism as the image slots —
  // the storefront decides how to render each URL from its extension.
  videos: {
    listKey: "homepage_videos",
    legacyKey: "homepage_video",
    mobileKey: "homepage_videos_mobile"
  },
  storeVisitBanner: {
    listKey: "store_visit_banner_images",
    legacyKey: "store_visit_banner_image",
    mobileKey: "store_visit_banner_images_mobile",
    focusKey: "store_visit_banner_focus",
    fitKey: "store_visit_banner_fit"
  }
};
var IMAGE_SLOT_KEYS = Object.keys(IMAGE_SLOTS);
var MAX_IMAGES_PER_SLOT = 30;
function readSettings(rows) {
  const settings = {};
  for (const r of rows)
    settings[r.key] = r.value;
  return settings;
}
__name(readSettings, "readSettings");
function imagesForSlot(settings, slotKey, variant = "desktop") {
  const slot = IMAGE_SLOTS[slotKey];
  if (!slot)
    return [];
  if (variant === "mobile")
    return parseImageList(settings[slot.mobileKey]);
  const urls = parseImageList(settings[slot.listKey]);
  if (urls.length)
    return urls;
  const legacy = settings[slot.legacyKey];
  return legacy && legacy.trim() ? [legacy.trim()] : [];
}
__name(imagesForSlot, "imagesForSlot");
function parseImageList(raw2) {
  if (!raw2)
    return [];
  try {
    const parsed = JSON.parse(raw2);
    if (!Array.isArray(parsed))
      return [];
    return parsed.filter((v) => typeof v === "string" && v.trim()).map((v) => v.trim()).slice(0, MAX_IMAGES_PER_SLOT);
  } catch {
    return [];
  }
}
__name(parseImageList, "parseImageList");
var FOCUS_CHOICES = ["0%", "20%", "35%", "50%", "65%", "80%", "100%"];
var DEFAULT_FOCUS = "50%";
function focusForSlot(settings, slotKey) {
  const slot = IMAGE_SLOTS[slotKey];
  if (!slot?.focusKey)
    return DEFAULT_FOCUS;
  const v = (settings[slot.focusKey] || "").trim();
  if (FOCUS_CHOICES.includes(v))
    return v;
  return slot.defaultFocus || DEFAULT_FOCUS;
}
__name(focusForSlot, "focusForSlot");
var FIT_MIN_PERCENT = 20;
var FIT_MAX_PERCENT = 100;
var DEFAULT_FIT = "cover";
function isValidFit(value) {
  if (value === "cover")
    return true;
  const m = /^(\d{1,3})%$/.exec(String(value || ""));
  if (!m)
    return false;
  const n = Number(m[1]);
  return n >= FIT_MIN_PERCENT && n <= FIT_MAX_PERCENT;
}
__name(isValidFit, "isValidFit");
function fitForSlot(settings, slotKey) {
  const slot = IMAGE_SLOTS[slotKey];
  if (!slot?.fitKey)
    return DEFAULT_FIT;
  const v = (settings[slot.fitKey] || "").trim();
  if (isValidFit(v))
    return v;
  return slot.defaultFit || DEFAULT_FIT;
}
__name(fitForSlot, "fitForSlot");

// src/routes/homepage.js
var app15 = new Hono2();
var PER_SECTION_LIMIT = 24;
app15.get("/", (c) => withEdgeCache(c, 60, async () => {
  await ensureSchema(c.env);
  const db = getDb(c.env);
  const sectionQueries = PRODUCT_SECTIONS.map(
    (s) => db.execute({
      sql: `SELECT * FROM products
            WHERE active = 1 AND ${s.flagColumn} = 1
            ORDER BY ${s.orderColumn} ASC, sort_order ASC, id DESC
            LIMIT ?`,
      args: [PER_SECTION_LIMIT]
    })
  );
  const [settingsRows, categoryRows, reviewRows, ...sectionResults] = await Promise.all([
    db.execute("SELECT key, value FROM site_settings"),
    db.execute("SELECT id, name, slug, image_url AS imageUrl FROM categories ORDER BY sort_order ASC, name ASC"),
    db.execute(
      "SELECT id, reviewer_name AS reviewerName, rating, comment, product_name AS productName FROM featured_reviews ORDER BY sort_order ASC, id DESC"
    ),
    ...sectionQueries
  ]);
  const settings = readSettings(settingsRows.rows);
  const sections = {};
  PRODUCT_SECTIONS.forEach((s, i) => {
    sections[s.key] = sectionResults[i].rows.map(rowToProductCard);
  });
  const images = {};
  const imagesMobile = {};
  const focus = {};
  const fit = {};
  for (const slot of IMAGE_SLOT_KEYS) {
    images[slot] = imagesForSlot(settings, slot);
    imagesMobile[slot] = imagesForSlot(settings, slot, "mobile");
    focus[slot] = focusForSlot(settings, slot);
    fit[slot] = fitForSlot(settings, slot);
  }
  return c.json({
    images,
    imagesMobile,
    focus,
    fit,
    categories: categoryRows.rows,
    sections,
    featuredReviews: reviewRows.rows,
    // Only the two site-wide copy blocks the storefront actually renders —
    // the raw image keys are already resolved into `images` above.
    settings: {
      materials_care: settings.materials_care || "",
      shipping_returns: settings.shipping_returns || ""
    }
  });
}));
var homepage_default = app15;

// src/routes/admin/auth.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_bcryptjs2 = __toESM(require_bcrypt(), 1);
var app16 = new Hono2();
var MAX_FAILED_LOGINS = 5;
var LOCKOUT_MS = 15 * 60 * 1e3;
function sqliteTimeToMs2(value) {
  if (!value)
    return null;
  const ms = (/* @__PURE__ */ new Date(`${String(value).replace(" ", "T")}Z`)).getTime();
  return Number.isNaN(ms) ? null : ms;
}
__name(sqliteTimeToMs2, "sqliteTimeToMs");
var loginSchema2 = external_exports.object({
  email: external_exports.string().trim().toLowerCase().email("Enter a valid email"),
  password: external_exports.string().min(1, "Password is required")
});
app16.post("/login", async (c) => {
  await ensureSchema(c.env);
  const body = await c.req.json().catch(() => ({}));
  const parsed = loginSchema2.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { email, password } = parsed.data;
  const db = getDb(c.env);
  const attempt = (await db.execute({ sql: "SELECT failed_count, last_failed_at FROM admin_login_attempts WHERE email = ?", args: [email] })).rows[0];
  if (attempt && attempt.failed_count >= MAX_FAILED_LOGINS) {
    const lastFailed = sqliteTimeToMs2(attempt.last_failed_at) ?? 0;
    const remainingMs = LOCKOUT_MS - (Date.now() - lastFailed);
    if (remainingMs > 0) {
      const minutes = Math.max(1, Math.ceil(remainingMs / 6e4));
      return c.json({ error: `Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` }, 429);
    }
    await db.execute({ sql: "DELETE FROM admin_login_attempts WHERE email = ?", args: [email] });
  }
  const row = (await db.execute({ sql: "SELECT id, name, email, password_hash FROM admins WHERE email = ?", args: [email] })).rows[0];
  if (!row || !import_bcryptjs2.default.compareSync(password, row.password_hash)) {
    await db.execute({
      sql: `INSERT INTO admin_login_attempts (email, failed_count, last_failed_at) VALUES (?, 1, datetime('now'))
            ON CONFLICT(email) DO UPDATE SET failed_count = failed_count + 1, last_failed_at = datetime('now')`,
      args: [email]
    });
    return c.json({ error: "Incorrect email or password" }, 401);
  }
  await db.execute({ sql: "DELETE FROM admin_login_attempts WHERE email = ?", args: [email] });
  const admin = { id: row.id, name: row.name, email: row.email };
  await setAdminCookie(c, admin);
  return c.json({ admin, idleTimeoutMs: ADMIN_IDLE_TIMEOUT_MS });
});
app16.post("/logout", async (c) => {
  await clearAdminCookie(c);
  return c.json({ ok: true });
});
app16.get("/me", requireAdmin, (c) => c.json({ admin: c.get("admin"), idleTimeoutMs: ADMIN_IDLE_TIMEOUT_MS }));
var setupSchema = external_exports.object({
  setupKey: external_exports.string().min(1),
  name: external_exports.string().trim().min(1).max(100),
  email: external_exports.string().trim().toLowerCase().email(),
  password: external_exports.string().min(8, "Use at least 8 characters for the admin password").max(200)
});
app16.post("/setup", async (c) => {
  await ensureSchema(c.env);
  if (!c.env.ADMIN_SETUP_KEY) {
    return c.json({ error: "Admin setup is disabled on this server." }, 503);
  }
  const body = await c.req.json().catch(() => ({}));
  const parsed = setupSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  if (parsed.data.setupKey !== c.env.ADMIN_SETUP_KEY) {
    return c.json({ error: "Invalid setup key" }, 403);
  }
  const db = getDb(c.env);
  const passwordHash = import_bcryptjs2.default.hashSync(parsed.data.password, 10);
  const info3 = await db.execute({
    sql: "INSERT INTO admins (name, email, password_hash) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM admins) RETURNING id",
    args: [parsed.data.name, parsed.data.email, passwordHash]
  });
  const created = info3.rows[0];
  if (!created) return c.json({ error: "Admin setup has already been completed. Sign in and add administrators from the admin panel." }, 409);
  const admin = { id: Number(created.id), name: parsed.data.name, email: parsed.data.email };
  await setAdminCookie(c, admin);
  return c.json({ admin }, 201);
});
var auth_default2 = app16;

// src/routes/admin/products.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app17 = new Hono2();
app17.use("*", async (c, next) => {
  await next();
  if (c.req.method !== "GET" && c.res && c.res.status < 400) {
    c.executionCtx.waitUntil(
      Promise.all([invalidate(c, "/api/homepage"), invalidate(c, "/api/categories")])
    );
  }
});
app17.use("*", requireAdmin);
app17.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
function rowToAdminListProduct(row) {
  const full = rowToProduct(row);
  return {
    ...full,
    description: "",
    materialsCare: "",
    shippingReturns: "",
    videos: [],
    variants: [],
    images: full.images.slice(0, 1)
  };
}
__name(rowToAdminListProduct, "rowToAdminListProduct");
app17.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute("SELECT * FROM products ORDER BY updated_at DESC");
  return c.json({ products: rows.rows.map(rowToAdminListProduct) });
});
app17.get("/missing-card-copies", async (c) => {
  if (!c.env.MEDIA)
    return c.json({ error: "Media storage isn't configured on this server yet." }, 503);
  const db = getDb(c.env);
  const rows = await db.execute("SELECT id, name, images FROM products WHERE active = 1");
  const candidates = [];
  for (const row of rows.rows) {
    let images = [];
    try {
      images = JSON.parse(row.images || "[]");
    } catch {
      images = [];
    }
    const first = typeof images[0] === "string" ? images[0] : "";
    const match2 = /(images\/[0-9a-f-]{36}\.(?:jpe?g|png|webp|avif))$/i.exec(first);
    if (!match2)
      continue;
    const key = match2[1];
    candidates.push({ id: row.id, name: row.name, key, cardKey: key.replace(/\.[^.]+$/, ".card.webp") });
  }
  const missing = [];
  for (let i = 0; i < candidates.length; i += 50) {
    const batch = candidates.slice(i, i + 50);
    const found = await Promise.all(batch.map((cand) => c.env.MEDIA.head(cand.cardKey)));
    batch.forEach((cand, j) => {
      if (!found[j])
        missing.push({ id: cand.id, name: cand.name, key: cand.key });
    });
  }
  return c.json({ checked: candidates.length, missing });
});
app17.get("/:id", async (c) => {
  const db = getDb(c.env);
  const row = (await db.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [c.req.param("id")] })).rows[0];
  if (!row)
    return c.json({ error: "Product not found" }, 404);
  return c.json({ product: rowToProduct(row) });
});
var productSchema = external_exports.object({
  name: external_exports.string().trim().min(1).max(200),
  category: external_exports.string().trim().min(1).max(100),
  price: external_exports.number().nonnegative(),
  mrp: external_exports.number().nonnegative(),
  rating: external_exports.number().min(0).max(5).optional(),
  description: external_exports.string().max(5e3).optional(),
  materialsCare: external_exports.string().max(5e3).optional(),
  shippingReturns: external_exports.string().max(5e3).optional(),
  images: external_exports.array(external_exports.string().url()).max(20).optional(),
  videos: external_exports.array(external_exports.string().url()).max(10).optional(),
  colors: external_exports.array(external_exports.string()).max(6).optional(),
  // Option groups. A choice's price, when set, replaces the product's price
  // while that choice is selected.
  variants: external_exports.array(
    external_exports.object({
      name: external_exports.string().min(1).max(40),
      choices: external_exports.array(external_exports.object({ label: external_exports.string().min(1).max(60), price: external_exports.number().nonnegative().optional() })).min(1).max(20)
    })
  ).max(4).optional(),
  bg: external_exports.string().max(300).optional(),
  isBestseller: external_exports.boolean().optional(),
  isNewArrival: external_exports.boolean().optional(),
  isFeatured: external_exports.boolean().optional(),
  isSpotlight: external_exports.boolean().optional(),
  stock: external_exports.number().int().min(0).optional(),
  active: external_exports.boolean().optional()
});
async function uniqueSlug(db, name, excludeId) {
  const base = slugify(name) || "product";
  let slug = base;
  let n = 2;
  for (; ; ) {
    const clash = (await db.execute({
      sql: excludeId ? "SELECT id FROM products WHERE slug = ? AND id != ?" : "SELECT id FROM products WHERE slug = ?",
      args: excludeId ? [slug, excludeId] : [slug]
    })).rows[0];
    if (!clash)
      return slug;
    slug = `${base}-${n++}`;
  }
}
__name(uniqueSlug, "uniqueSlug");
var importSchema = external_exports.object({
  products: external_exports.array(productSchema.extend({ slug: external_exports.string().trim().max(200).optional() })).max(1e3)
});
var OLD_SITE = "beautyofbeadsbykhushi.com";
var MIGRATE_MAX_IMAGES = 16;
var reorderSchema = external_exports.object({
  items: external_exports.array(external_exports.object({ id: external_exports.number().int().positive(), sortOrder: external_exports.number().int().min(0).max(1e5) })).min(1).max(500)
});
app17.post("/reorder", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = reorderSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { items } = parsed.data;
  const ids = items.map((item) => item.id);
  if (new Set(ids).size !== ids.length)
    return c.json({ error: "Each product can appear only once" }, 400);
  const db = getDb(c.env);
  const rows = await db.execute({
    sql: `SELECT id, category FROM products WHERE id IN (${ids.map(() => "?").join(", ")})`,
    args: ids
  });
  if (rows.rows.length !== ids.length)
    return c.json({ error: "One or more products no longer exist. Refresh and try again." }, 409);
  const category = String(rows.rows[0].category ?? "").trim().toLowerCase();
  if (rows.rows.some((row) => String(row.category ?? "").trim().toLowerCase() !== category)) {
    return c.json({ error: "Products must all belong to the same category" }, 400);
  }
  await db.batch(items.map(({ id, sortOrder }) => ({
    sql: "UPDATE products SET sort_order = ?, updated_at = datetime('now') WHERE id = ?",
    args: [sortOrder, id]
  })), "write");
  const activeCount = Number((await db.execute("SELECT COUNT(*) AS count FROM products WHERE active = 1")).rows[0].count);
  const pages = Math.ceil(activeCount / 250);
  const cachePaths = ["/api/products"];
  for (let page = 1; page <= pages; page += 1) {
    const query = new URLSearchParams({ cards: "1", limit: "250", page: String(page) });
    cachePaths.push(`/api/products?${query.toString()}`);
  }
  await Promise.all(cachePaths.map((path) => invalidate(c, path)));
  return c.json({ ok: true, updated: items.length });
});
app17.post("/show-all", async (c) => {
  const db = getDb(c.env);
  const hidden = Number((await db.execute("SELECT COUNT(*) AS n FROM products WHERE active = 0")).rows[0].n);
  if (hidden > 0) {
    await db.execute("UPDATE products SET active = 1, updated_at = datetime('now') WHERE active = 0");
  }
  const total = Number((await db.execute("SELECT COUNT(*) AS n FROM products")).rows[0].n);
  return c.json({ shown: hidden, total });
});
var OLD_STORE_API = `https://${OLD_SITE}/wp-json/wc/store/v1/products`;
function normaliseGroupName(raw2) {
  const n = String(raw2 || "").trim().toLowerCase();
  if (/^colou?rs?$/.test(n))
    return "Colour";
  if (/^(product|size|design)s?$/.test(n))
    return "Product";
  return String(raw2 || "").trim() || "Option";
}
__name(normaliseGroupName, "normaliseGroupName");
app17.post("/import-variants", async (c) => {
  const db = getDb(c.env);
  const body = await c.req.json().catch(() => ({}));
  const page = Math.max(1, Number(body.page) || 1);
  const offset = Math.max(0, Number(body.offset) || 0);
  const perPage = 20;
  const FETCH_BUDGET = 28;
  let spent = 0;
  const ours = (await db.execute("SELECT id, name FROM products")).rows;
  const byName = /* @__PURE__ */ new Map();
  for (const row of ours)
    byName.set(String(row.name).trim().toLowerCase(), row);
  const res = await fetch(`${OLD_STORE_API}?per_page=${perPage}&page=${page}`, {
    headers: { Accept: "application/json" }
  });
  spent += 1;
  if (!res.ok)
    return c.json({ error: `The old site returned ${res.status}.` }, 502);
  const theirs = await res.json();
  const totalPages = Number(res.headers.get("x-wp-totalpages") || 0);
  let updated = 0;
  let matched = 0;
  let i = offset;
  const statements = [];
  for (; i < theirs.length; i++) {
    const p = theirs[i];
    if (p.type !== "variable")
      continue;
    const mine = byName.get(String(p.name).trim().toLowerCase());
    if (!mine)
      continue;
    const range = p.prices?.price_range;
    const needsPrices = !!(range && range.min_amount !== range.max_amount);
    const cost = needsPrices ? (p.variations || []).length : 0;
    if (spent + cost > FETCH_BUDGET && i > offset)
      break;
    matched += 1;
    const priceByLabel = /* @__PURE__ */ new Map();
    if (needsPrices) {
      const minor = Number(p.prices?.currency_minor_unit ?? 2);
      for (const v of p.variations || []) {
        try {
          const vr = await fetch(`${OLD_STORE_API}/${v.id}`, { headers: { Accept: "application/json" } });
          spent += 1;
          if (!vr.ok)
            continue;
          const vd = await vr.json();
          const amount = Number(vd.prices?.price);
          if (!Number.isFinite(amount))
            continue;
          for (const a of v.attributes || []) {
            priceByLabel.set(`${normaliseGroupName(a.name)}::${String(a.value).trim().toLowerCase()}`, amount / 10 ** minor);
          }
        } catch {
        }
      }
    }
    const groups = [];
    for (const attr of p.attributes || []) {
      const name = normaliseGroupName(attr.name);
      const choices = (attr.terms || []).map((t) => {
        const label = String(t.name || "").trim();
        const price = priceByLabel.get(`${name}::${label.toLowerCase()}`);
        return price === void 0 ? { label } : { label, price };
      });
      if (choices.length)
        groups.push({ name, choices });
    }
    if (!groups.length)
      continue;
    statements.push({
      sql: "UPDATE products SET variants = ?, updated_at = datetime('now') WHERE id = ?",
      args: [JSON.stringify(groups), mine.id]
    });
    updated += 1;
  }
  if (statements.length)
    await db.batch(statements);
  const pageDone = i >= theirs.length;
  const nextPage = pageDone ? page + 1 : page;
  const nextOffset = pageDone ? 0 : i;
  const done = pageDone && page >= totalPages;
  return c.json({ page, totalPages, matched, updated, nextPage, nextOffset, done, spent });
});
app17.post("/migrate-images", async (c) => {
  if (!c.env.MEDIA)
    return c.json({ error: "Media storage isn't configured on this server yet." }, 503);
  const db = getDb(c.env);
  const pending = (await db.execute({
    sql: "SELECT id, name, images FROM products WHERE images LIKE ? ORDER BY id ASC",
    args: [`%${OLD_SITE}%`]
  })).rows;
  const total = pending.length;
  let migrated = 0;
  let budget = MIGRATE_MAX_IMAGES;
  const failures = [];
  for (const row of pending) {
    if (budget <= 0)
      break;
    let images;
    try {
      images = JSON.parse(row.images || "[]");
    } catch {
      continue;
    }
    if (!Array.isArray(images))
      continue;
    let changed = false;
    const next = [];
    for (const url of images) {
      if (typeof url !== "string" || !url.includes(OLD_SITE) || budget <= 0) {
        next.push(url);
        continue;
      }
      budget -= 1;
      try {
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(`HTTP ${res.status}`);
        const type = res.headers.get("content-type") || "image/jpeg";
        if (!type.startsWith("image/"))
          throw new Error(`not an image (${type})`);
        const ext = (type.split("/")[1] || "jpg").split(";")[0].replace("jpeg", "jpg");
        const key = `images/${crypto.randomUUID()}.${ext}`;
        await c.env.MEDIA.put(key, await res.arrayBuffer(), { httpMetadata: { contentType: type } });
        next.push(`${new URL(c.req.url).origin}/media/${key}`);
        changed = true;
      } catch (err) {
        failures.push(`${row.name}: ${err?.message || err}`);
        next.push(url);
      }
    }
    if (changed) {
      await db.execute({
        sql: "UPDATE products SET images = ?, updated_at = datetime('now') WHERE id = ?",
        args: [JSON.stringify(next), row.id]
      });
      migrated += 1;
    }
  }
  const left = (await db.execute({ sql: "SELECT COUNT(*) AS n FROM products WHERE images LIKE ?", args: [`%${OLD_SITE}%`] })).rows[0].n;
  return c.json({ migrated, remaining: Number(left), total, failed: failures.length, failures: failures.slice(0, 5) });
});
app17.post("/import", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = importSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const db = getDb(c.env);
  let existing;
  try {
    existing = new Set((await db.execute("SELECT slug FROM products")).rows.map((r) => String(r.slug).toLowerCase()));
  } catch (err) {
    return c.json({ error: `Couldn't read the existing catalogue: ${err?.message || err}` }, 500);
  }
  const statements = [];
  let skipped = 0;
  for (const d of parsed.data.products) {
    const slug = d.slug && slugify(d.slug) || slugify(d.name);
    if (!slug || existing.has(slug)) {
      skipped += 1;
      continue;
    }
    existing.add(slug);
    statements.push({
      sql: `INSERT INTO products (slug, name, category, price, mrp, rating, description, materials_care, shipping_returns,
              images, videos, colors, variants, bg, is_bestseller, is_new_arrival, is_featured, is_spotlight, stock, active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        slug,
        d.name,
        d.category,
        d.price,
        d.mrp,
        d.rating ?? 4.6,
        d.description || "",
        d.materialsCare || "",
        d.shippingReturns || "",
        JSON.stringify(d.images || []),
        JSON.stringify(d.videos || []),
        JSON.stringify(d.colors || []),
        JSON.stringify(d.variants || []),
        d.bg || "",
        d.isBestseller ? 1 : 0,
        d.isNewArrival ? 1 : 0,
        d.isFeatured ? 1 : 0,
        d.isSpotlight ? 1 : 0,
        d.stock ?? 10,
        d.active === false ? 0 : 1
      ]
    });
  }
  const CHUNK = 50;
  let imported = 0;
  for (let i = 0; i < statements.length; i += CHUNK) {
    const chunk = statements.slice(i, i + CHUNK);
    try {
      await db.batch(chunk, "write");
      imported += chunk.length;
    } catch (err) {
      return c.json(
        {
          error: `Imported ${imported} product(s), then failed on the next batch: ${err?.message || err}`,
          imported,
          skipped
        },
        500
      );
    }
  }
  const total = Number((await db.execute("SELECT COUNT(*) AS n FROM products")).rows[0].n);
  return c.json({ imported, skipped, failed: 0, total });
});
app17.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = productSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const slug = await uniqueSlug(db, d.name);
  const info3 = await db.execute({
    sql: `INSERT INTO products (slug, name, category, price, mrp, rating, description, materials_care, shipping_returns,
            images, videos, colors, variants, bg, is_bestseller, is_new_arrival, is_featured, is_spotlight, stock, active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      slug,
      d.name,
      d.category,
      d.price,
      d.mrp,
      d.rating ?? 4.5,
      d.description || "",
      d.materialsCare || "",
      d.shippingReturns || "",
      JSON.stringify(d.images || []),
      JSON.stringify(d.videos || []),
      JSON.stringify(d.colors || []),
      JSON.stringify(d.variants || []),
      d.bg || "",
      d.isBestseller ? 1 : 0,
      d.isNewArrival ? 1 : 0,
      d.isFeatured ? 1 : 0,
      d.isSpotlight ? 1 : 0,
      d.stock ?? 100,
      d.active === false ? 0 : 1
    ]
  });
  const row = (await db.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [info3.lastInsertRowid] })).rows[0];
  return c.json({ product: rowToProduct(row) }, 201);
});
app17.put("/:id", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = productSchema.partial().safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const id = c.req.param("id");
  const existing = (await db.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [id] })).rows[0];
  if (!existing)
    return c.json({ error: "Product not found" }, 404);
  const slug = d.name && d.name !== existing.name ? await uniqueSlug(db, d.name, id) : existing.slug;
  await db.execute({
    sql: `UPDATE products SET
            slug = ?, name = ?, category = ?, price = ?, mrp = ?, rating = ?, description = ?, materials_care = ?, shipping_returns = ?,
            images = ?, videos = ?, colors = ?, variants = ?, bg = ?, is_bestseller = ?, is_new_arrival = ?, is_featured = ?, is_spotlight = ?, stock = ?, active = ?,
            updated_at = datetime('now')
          WHERE id = ?`,
    args: [
      slug,
      d.name ?? existing.name,
      d.category ?? existing.category,
      d.price ?? existing.price,
      d.mrp ?? existing.mrp,
      d.rating ?? existing.rating,
      d.description ?? existing.description,
      d.materialsCare ?? existing.materials_care,
      d.shippingReturns ?? existing.shipping_returns,
      d.images ? JSON.stringify(d.images) : existing.images,
      d.videos ? JSON.stringify(d.videos) : existing.videos,
      d.colors ? JSON.stringify(d.colors) : existing.colors,
      d.variants ? JSON.stringify(d.variants) : existing.variants ?? "[]",
      d.bg ?? existing.bg,
      d.isBestseller === void 0 ? existing.is_bestseller : d.isBestseller ? 1 : 0,
      d.isNewArrival === void 0 ? existing.is_new_arrival : d.isNewArrival ? 1 : 0,
      d.isFeatured === void 0 ? existing.is_featured : d.isFeatured ? 1 : 0,
      d.isSpotlight === void 0 ? existing.is_spotlight : d.isSpotlight ? 1 : 0,
      d.stock ?? existing.stock,
      d.active === void 0 ? existing.active : d.active ? 1 : 0,
      id
    ]
  });
  const row = (await db.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [id] })).rows[0];
  return c.json({ product: rowToProduct(row) });
});
app17.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const id = c.req.param("id");
  if (c.req.query("hard") === "1") {
    const result2 = await db.execute({ sql: "DELETE FROM products WHERE id = ?", args: [id] });
    if (result2.rowsAffected === 0)
      return c.json({ error: "Product not found" }, 404);
    return c.json({ ok: true, hardDeleted: true });
  }
  const result = await db.execute({ sql: "UPDATE products SET active = 0, updated_at = datetime('now') WHERE id = ?", args: [id] });
  if (result.rowsAffected === 0)
    return c.json({ error: "Product not found" }, 404);
  return c.json({ ok: true, hardDeleted: false });
});
app17.post("/upload", async (c) => {
  if (!c.env.MEDIA)
    return c.json({ error: "Media storage isn't configured on this server yet." }, 503);
  const form = await c.req.parseBody();
  const file = form.file;
  if (!file || typeof file === "string")
    return c.json({ error: "No file uploaded" }, 400);
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4", "video/webm", "video/quicktime"];
  if (!allowed.includes(file.type))
    return c.json({ error: `Unsupported file type: ${file.type}` }, 400);
  const maxBytes = file.type.startsWith("video/") ? 200 * 1024 * 1024 : 15 * 1024 * 1024;
  if (file.size > maxBytes)
    return c.json({ error: "File is too large" }, 400);
  const cardFor = typeof form.cardFor === "string" ? form.cardFor : "";
  if (cardFor) {
    const m = /^images\/([0-9a-f-]{36})\.(webp|jpe?g|png|avif)$/i.exec(cardFor);
    if (!m)
      return c.json({ error: "Invalid cardFor key" }, 400);
    if (file.type !== "image/webp")
      return c.json({ error: "A card copy must be WebP" }, 400);
    if (file.size > 512 * 1024)
      return c.json({ error: "Card copy is too large" }, 400);
    if (!await c.env.MEDIA.head(cardFor))
      return c.json({ error: "Original image not found" }, 404);
    const cardKey = `images/${m[1]}.card.webp`;
    await c.env.MEDIA.put(cardKey, await file.arrayBuffer(), { httpMetadata: { contentType: "image/webp" } });
    return c.json({ key: cardKey }, 201);
  }
  const ext = file.name?.split(".").pop() || (file.type.split("/")[1] || "bin");
  const key = `${file.type.startsWith("video/") ? "videos" : "images"}/${crypto.randomUUID()}.${ext}`;
  await c.env.MEDIA.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  const base = c.env.MEDIA_PUBLIC_BASE_URL ? c.env.MEDIA_PUBLIC_BASE_URL.replace(/\/$/, "") : `${new URL(c.req.url).origin}/media`;
  const url = `${base}/${key}`;
  return c.json({ url, key }, 201);
});
var products_default2 = app17;

// src/routes/admin/orders.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app18 = new Hono2();
app18.use("*", requireAdmin);
app18.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
var ORDER_STAGES2 = ["placed", "confirmed", "packed", "shipped", "out_for_delivery", "delivered"];
var CANCELLABLE = /* @__PURE__ */ new Set(["awaiting_payment", "placed", "confirmed", "packed"]);
app18.get("/", async (c) => {
  const db = getDb(c.env);
  const status = c.req.query("status");
  const rows = await db.execute(
    status ? {
      sql: `SELECT o.*, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email
                  FROM orders o JOIN users u ON u.id = o.user_id
                 WHERE o.status = ? ORDER BY o.created_at DESC LIMIT 200`,
      args: [status]
    } : `SELECT o.*, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email
           FROM orders o JOIN users u ON u.id = o.user_id
          ORDER BY o.created_at DESC LIMIT 200`
  );
  return c.json({ orders: rows.rows, stages: ORDER_STAGES2 });
});
app18.post("/:id/convert-to-prepaid", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const paymentReference = typeof body.paymentReference === "string" ? body.paymentReference.trim().slice(0, 120) : "";
  const db = getDb(c.env);
  const id = c.req.param("id");
  const order = (await db.execute({
    sql: `SELECT o.*, COALESCE(o.contact_email, u.email) AS customer_email
            FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ?`,
    args: [id]
  })).rows[0];
  if (!order) return c.json({ error: "Order not found" }, 404);
  const wasPartialCod = order.payment_option === "partial_cod" && order.payment_status === "partially_paid";
  const alreadyConverted = order.payment_option === "full" && order.payment_status === "paid" && order.payment_method === "whatsapp_manual";
  if (!wasPartialCod && !alreadyConverted) return c.json({ error: "Only a Partial COD order can be converted to prepaid." }, 400);
  let converted = false;
  if (wasPartialCod) {
    if (order.status === "awaiting_payment" || order.status === "cancelled") return c.json({ error: "This order is not an active placed order." }, 400);
    const updated = await db.execute({
      sql: `UPDATE orders SET payment_option = 'full', payment_status = 'paid', amount_paid = total_amount,
                  payment_method = 'whatsapp_manual', manual_payment_reference = ?, paid_at = datetime('now'), updated_at = datetime('now')
            WHERE id = ? AND payment_option = 'partial_cod' AND payment_status = 'partially_paid'`,
      args: [paymentReference || null, id]
    });
    if (updated.rowsAffected !== 1) return c.json({ error: "Order payment changed while updating. Reload and try again." }, 409);
    await db.execute({
      sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, ?, ?)",
      args: [id, order.status, "Payment updated to fully prepaid by admin via WhatsApp" + (paymentReference ? " (reference " + paymentReference + ")" : "") + "."]
    });
    converted = true;
  }
  const kind = "prepaid_conversion";
  if (await alreadySent(db, id, kind)) return c.json({ ok: true, converted, emailSent: true });
  const full = (await db.execute({
    sql: `SELECT o.*, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ?`,
    args: [id]
  })).rows[0];
  const items = (await db.execute({ sql: "SELECT product_name, product_price, quantity, product_image FROM order_items WHERE order_id = ?", args: [id] })).rows;
  const attachments = [];
  try {
    attachments.push({ filename: `${(full.invoice_number || full.order_number).replace(/[^A-Za-z0-9-]/g, "-")}.pdf`, content: invoicePdfBase64({ order: full, items }) });
  } catch (err) {
    console.error("[prepaid-invoice:failed]", err?.message);
    return c.json({ ok: true, converted, emailSent: false, emailReason: "The updated invoice could not be generated." });
  }
  if (!full.customer_email) return c.json({ ok: true, converted, emailSent: false, emailReason: "The order has no customer email address." });
  const finalPaymentReference = paymentReference || full.manual_payment_reference || "";
  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;font-family:Arial,sans-serif">
      <tr><td style="font-size:12px;color:#8a7a70">Order number</td><td style="font-size:12px;color:#8a7a70;text-align:right">Invoice</td></tr>
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND2.ink}">${esc(full.order_number)}</td><td style="font-size:13px;color:${BRAND2.ink};text-align:right">${esc(full.invoice_number || "")}</td></tr>
    </table>
    <p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">We’ve received the remaining payment for your order via WhatsApp. Your order is now fully prepaid.</p>
    <p style="margin:14px 0 0;font-size:14px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif"><strong>Total paid:</strong> ${money(full.total_amount)}<br><strong>Balance due at delivery:</strong> ${money(0)}${finalPaymentReference ? `<br><strong>Payment reference:</strong> ${esc(finalPaymentReference)}` : ""}</p>
    <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#5b4c43;font-family:Arial,sans-serif">Your updated invoice is attached.</p>`;
    const email = await sendEmail(c.env, {
    to: full.customer_email,
    subject: `Order ${full.order_number} is now fully prepaid — ${BRAND2.name}`,
      html: shell("Payment received", `Thanks for completing your payment with <strong>${BRAND2.name}</strong>.`, bodyHtml),
    attachments
  });
  if (email.sent) await markSent(db, id, kind);
  return c.json({ ok: true, converted, emailSent: email.sent, emailReason: email.sent ? undefined : email.reason });
});
app18.get("/:id", async (c) => {
  const db = getDb(c.env);
  const id = c.req.param("id");
  const order2 = (await db.execute({
    sql: `SELECT o.*, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email
              FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ?`,
    args: [id]
  })).rows[0];
  if (!order2)
    return c.json({ error: "Order not found" }, 404);
  const items = (await db.execute({ sql: "SELECT product_name, product_price, quantity, product_image FROM order_items WHERE order_id = ?", args: [id] })).rows;
  const history = (await db.execute({ sql: "SELECT status, note, created_at FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC", args: [id] })).rows;
  const prepaidEmailSent = await alreadySent(db, id, "prepaid_conversion");
  return c.json({ order: order2, items, history, stages: ORDER_STAGES2, prepaidEmailSent });
});
async function alreadySent(db, orderId, kind) {
  const row = (await db.execute({ sql: "SELECT id FROM sent_emails WHERE order_id = ? AND kind = ?", args: [orderId, kind] })).rows[0];
  return !!row;
}
__name(alreadySent, "alreadySent");
async function markSent(db, orderId, kind) {
  await db.execute({
    sql: "INSERT INTO sent_emails (order_id, kind) VALUES (?, ?) ON CONFLICT(order_id, kind) DO NOTHING",
    args: [orderId, kind]
  });
}
__name(markSent, "markSent");
var statusSchema = external_exports.object({ status: external_exports.enum([...ORDER_STAGES2, "cancelled"]), note: external_exports.string().max(300).optional() });
app18.patch("/:id/status", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { status, note } = parsed.data;
  const db = getDb(c.env);
  const id = c.req.param("id");
  const order2 = (await db.execute({
    sql: `SELECT o.*, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ?`,
    args: [id]
  })).rows[0];
  if (!order2)
    return c.json({ error: "Order not found" }, 404);
  if (status === "cancelled" && !CANCELLABLE.has(order2.status)) {
    return c.json({ error: `An order that's already ${order2.status} can't be cancelled.` }, 400);
  }
  await db.execute({ sql: "UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?", args: [status, id] });
  await db.execute({ sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, ?, ?)", args: [id, status, note || null] });
  const items = (await db.execute({ sql: "SELECT product_name, product_price, quantity, product_image FROM order_items WHERE order_id = ?", args: [id] })).rows;
  const emailResults = [];
  if (["confirmed", "packed", "shipped", "out_for_delivery", "cancelled"].includes(status)) {
    const trackingUrl = await guestOrderLink(c.env, order2);
    const { subject, html } = statusUpdateEmail({ order: order2, status, trackingUrl });
    emailResults.push(await sendEmail(c.env, { to: order2.customer_email, subject, html }));
  }
  if (status === "delivered") {
    if (!await alreadySent(db, id, "delivered")) {
      const { subject, html } = orderDeliveredEmail({ order: order2, items, mediaBase: new URL(c.req.url).origin });
      emailResults.push(await sendEmail(c.env, { to: order2.customer_email, subject, html }));
      await markSent(db, id, "delivered");
    }
    if (!await alreadySent(db, id, "review_request")) {
      const { subject, html } = reviewRequestEmail({
        order: order2,
        items,
      reviewUrl: await guestOrderLink(c.env, order2) || (c.env.STOREFRONT_URL ? `${c.env.STOREFRONT_URL.replace(/\/$/, "")}/?order=${encodeURIComponent(order2.order_number)}` : void 0),
        mediaBase: new URL(c.req.url).origin
      });
      emailResults.push(await sendEmail(c.env, { to: order2.customer_email, subject, html }));
      await markSent(db, id, "review_request");
    }
  }
  return c.json({ ok: true, status, emails: emailResults });
});
app18.post("/:id/resend-delivery-email", async (c) => {
  const db = getDb(c.env);
  const id = c.req.param("id");
  const order2 = (await db.execute({
    sql: `SELECT o.*, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ?`,
    args: [id]
  })).rows[0];
  if (!order2)
    return c.json({ error: "Order not found" }, 404);
  if (order2.status !== "delivered")
    return c.json({ error: "Order hasn't been marked delivered yet." }, 400);
  const items = (await db.execute({ sql: "SELECT product_name, product_price, quantity, product_image FROM order_items WHERE order_id = ?", args: [id] })).rows;
  const delivered = orderDeliveredEmail({ order: order2, items, mediaBase: new URL(c.req.url).origin });
  const review = reviewRequestEmail({
    order: order2,
    items,
    reviewUrl: await guestOrderLink(c.env, order2) || (c.env.STOREFRONT_URL ? `${c.env.STOREFRONT_URL.replace(/\/$/, "")}/?order=${encodeURIComponent(order2.order_number)}` : void 0),
    mediaBase: new URL(c.req.url).origin
  });
  const emailResults = [
    await sendEmail(c.env, { to: order2.customer_email, subject: delivered.subject, html: delivered.html }),
    await sendEmail(c.env, { to: order2.customer_email, subject: review.subject, html: review.html })
  ];
  return c.json({ ok: true, emails: emailResults });
});
app18.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const id = c.req.param("id");
  const order2 = (await db.execute({
    sql: "SELECT id, order_number, status, payment_status, payment_id, invoice_number FROM orders WHERE id = ?",
    args: [id]
  })).rows[0];
  if (!order2)
    return c.json({ error: "Order not found" }, 404);
  const touchedMoney = ["paid", "refunded", "partially_refunded"].includes(order2.payment_status) || Boolean(order2.payment_id) || Boolean(order2.invoice_number);
  if (touchedMoney) {
    return c.json({ error: "This order has been paid for \u2014 it can be cancelled, but not deleted." }, 400);
  }
  if (!["awaiting_payment", "cancelled"].includes(order2.status)) {
    return c.json({ error: "Only an unpaid or cancelled order can be deleted." }, 400);
  }
  for (const table3 of ["order_items", "order_status_history", "order_payment_attempts", "sent_emails"]) {
    await db.execute({ sql: `DELETE FROM ${table3} WHERE order_id = ?`, args: [order2.id] }).catch(() => {
    });
  }
  await db.execute({ sql: "DELETE FROM orders WHERE id = ?", args: [order2.id] });
  return c.json({ ok: true, orderNumber: order2.order_number });
});
var orders_default2 = app18;

// src/routes/admin/customers.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app19 = new Hono2();
app19.use("*", requireAdmin);
app19.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app19.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute(`
    SELECT u.id, u.name, COALESCE(MAX(o.contact_email), u.email) AS email, u.phone, u.created_at,
           COUNT(DISTINCT o.id) AS order_count,
           COALESCE(SUM(o.total_amount), 0) AS lifetime_value
      FROM users u
      LEFT JOIN orders o ON o.user_id = u.id
     GROUP BY u.id
     ORDER BY u.created_at DESC
  `);
  return c.json({ customers: rows.rows });
});
app19.get("/:id/orders", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute({
    sql: "SELECT id, order_number, status, total_amount, currency_code, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    args: [c.req.param("id")]
  });
  return c.json({ orders: rows.rows });
});
function generateOrderNumber2() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `BOB-${stamp}-${rand}`;
}
__name(generateOrderNumber2, "generateOrderNumber");
var customOrderSchema = external_exports.object({
  items: external_exports.array(
    external_exports.object({
      productName: external_exports.string().trim().min(1).max(200),
      productPrice: external_exports.number().nonnegative(),
      quantity: external_exports.number().int().positive().max(50).default(1)
    })
  ).min(1, "Add at least one item"),
  note: external_exports.string().trim().max(500).optional()
});
app19.post("/:id/custom-order", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = customOrderSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { items, note } = parsed.data;
  const db = getDb(c.env);
  const userId = c.req.param("id");
  const user = (await db.execute({ sql: "SELECT id, name, email FROM users WHERE id = ?", args: [userId] })).rows[0];
  if (!user)
    return c.json({ error: "Customer not found" }, 404);
  const totalAmount = items.reduce((sum, it) => sum + it.productPrice * it.quantity, 0);
  const orderNumber = generateOrderNumber2();
  const orderInfo = await db.execute({
    sql: `INSERT INTO orders (user_id, order_number, status, total_amount, created_by_admin, custom_note)
          VALUES (?, ?, 'awaiting_payment', ?, 1, ?)`,
    args: [userId, orderNumber, totalAmount, note || null]
  });
  const orderId = orderInfo.lastInsertRowid;
  const emailItems = [];
  for (const it of items) {
    const image = await firstImageForProductName(db, it.productName);
    await db.execute({
      sql: "INSERT INTO order_items (order_id, product_name, product_price, quantity, product_image) VALUES (?, ?, ?, ?, ?)",
      args: [orderId, it.productName, it.productPrice, it.quantity, image]
    });
    emailItems.push({
      product_name: it.productName,
      product_price: it.productPrice,
      quantity: it.quantity,
      product_image: image
    });
  }
  await db.execute({
    sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'awaiting_payment', 'Custom order created by admin')",
    args: [orderId]
  });
  const { subject, html } = customOrderEmail({
    order: { order_number: orderNumber },
    items: emailItems,
    note,
    storefrontUrl: c.env.STOREFRONT_URL,
    mediaBase: new URL(c.req.url).origin
  });
  const emailResult = await sendEmail(c.env, { to: user.email, subject, html });
  return c.json({ orderNumber, orderId: Number(orderId), totalAmount, email: emailResult }, 201);
});
var customers_default = app19;

// src/routes/admin/custom-orders.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app20 = new Hono2();
app20.use("*", requireAdmin);
app20.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
function generateOrderNumber3() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `BOB-${stamp}-${rand}`;
}
__name(generateOrderNumber3, "generateOrderNumber");
var schema2 = external_exports.object({
  email: external_exports.string().trim().toLowerCase().email("Enter a valid email address"),
  name: external_exports.string().trim().max(100).optional(),
  items: external_exports.array(
    external_exports.object({
      productName: external_exports.string().trim().min(1).max(200),
      productPrice: external_exports.number().nonnegative(),
      quantity: external_exports.number().int().positive().max(50).default(1),
      // A photo of the bespoke piece. Optional: without one the catalogue is
      // searched for a product of the same name, which is all there was
      // before — and finds nothing for a piece that was made to order.
      image: external_exports.string().url().max(600).optional()
    })
  ).min(1, "Add at least one item"),
  note: external_exports.string().trim().max(500).optional()
});
app20.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = schema2.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const { email, name, items, note } = parsed.data;
  const db = getDb(c.env);
  let customer = (await db.execute({ sql: "SELECT id, name, email, invited_at FROM users WHERE email = ? LIMIT 1", args: [email] })).rows[0];
  const isNewCustomer = !customer;
  if (!customer) {
    const info3 = await db.execute({
      sql: "INSERT INTO users (name, email, password_hash, invited_at) VALUES (?, ?, '', datetime('now'))",
      args: [name || email.split("@")[0], email]
    });
    customer = { id: Number(info3.lastInsertRowid), name: name || email.split("@")[0], email };
  } else if (name && customer.invited_at) {
    await db.execute({ sql: "UPDATE users SET name = ? WHERE id = ?", args: [name, customer.id] });
  }
  const totalAmount = items.reduce((sum, it) => sum + it.productPrice * it.quantity, 0);
  const orderNumber = generateOrderNumber3();
  const orderInfo = await db.execute({
    sql: `INSERT INTO orders (user_id, order_number, status, total_amount, created_by_admin, custom_note)
          VALUES (?, ?, 'awaiting_payment', ?, 1, ?)`,
    args: [customer.id, orderNumber, totalAmount, note || null]
  });
  const orderId = orderInfo.lastInsertRowid;
  const emailItems = [];
  for (const it of items) {
    const image = it.image || await firstImageForProductName(db, it.productName);
    await db.execute({
      sql: "INSERT INTO order_items (order_id, product_name, product_price, quantity, product_image) VALUES (?, ?, ?, ?, ?)",
      args: [orderId, it.productName, it.productPrice, it.quantity, image]
    });
    emailItems.push({
      product_name: it.productName,
      product_price: it.productPrice,
      quantity: it.quantity,
      product_image: image
    });
  }
  await db.execute({
    sql: "INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'awaiting_payment', ?)",
    args: [orderId, `Custom order created by admin for ${email}`]
  });
  const { subject, html } = customOrderEmail({
    order: { order_number: orderNumber },
    items: emailItems,
    note,
    storefrontUrl: c.env.STOREFRONT_URL,
    mediaBase: new URL(c.req.url).origin
  });
  const emailResult = await sendEmail(c.env, { to: email, subject, html });
  return c.json(
    {
      orderNumber,
      orderId: Number(orderId),
      totalAmount,
      email: emailResult,
      customer: { id: customer.id, email, isNew: isNewCustomer }
    },
    201
  );
});
var custom_orders_default = app20;

// src/routes/admin/reviews.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app21 = new Hono2();
app21.use("*", requireAdmin);
app21.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app21.get("/", async (c) => {
  const db = getDb(c.env);
  const productName = c.req.query("product");
  const rows = await db.execute(
    productName ? { sql: "SELECT * FROM reviews WHERE product_name = ? ORDER BY created_at DESC", args: [productName] } : "SELECT * FROM reviews ORDER BY created_at DESC LIMIT 300"
  );
  return c.json({ reviews: rows.rows });
});
app21.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const result = await db.execute({ sql: "DELETE FROM reviews WHERE id = ?", args: [c.req.param("id")] });
  if (result.rowsAffected === 0)
    return c.json({ error: "Review not found" }, 404);
  return c.json({ ok: true });
});
var reviews_default2 = app21;

// src/routes/admin/promo.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app22 = new Hono2();
app22.use("*", requireAdmin);
app22.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app22.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute("SELECT * FROM promo_codes ORDER BY created_at DESC");
  return c.json({ promoCodes: rows.rows });
});
var promoSchema = external_exports.object({
  code: external_exports.string().trim().min(2).max(40).transform((v) => v.toUpperCase()),
  type: external_exports.enum(["percent", "flat"]),
  value: external_exports.number().positive(),
  minOrderAmount: external_exports.number().nonnegative().optional(),
  maxDiscountAmount: external_exports.number().positive("Max discount is required"),
  usageLimit: external_exports.number().int().positive().nullable().optional(),
  active: external_exports.boolean().optional(),
  expiresAt: external_exports.string().min(1, "Expiry date is required")
});
app22.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = promoSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const existing = (await db.execute({ sql: "SELECT id FROM promo_codes WHERE code = ?", args: [d.code] })).rows[0];
  if (existing)
    return c.json({ error: "A promo code with this code already exists" }, 409);
  const info3 = await db.execute({
    sql: `INSERT INTO promo_codes (code, type, value, min_order_amount, max_discount_amount, usage_limit, active, expires_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [d.code, d.type, d.value, d.minOrderAmount ?? 0, d.maxDiscountAmount ?? null, d.usageLimit ?? null, d.active === false ? 0 : 1, d.expiresAt ?? null]
  });
  const row = (await db.execute({ sql: "SELECT * FROM promo_codes WHERE id = ?", args: [info3.lastInsertRowid] })).rows[0];
  return c.json({ promoCode: row }, 201);
});
app22.put("/:id", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = promoSchema.partial().safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const id = c.req.param("id");
  const existing = (await db.execute({ sql: "SELECT * FROM promo_codes WHERE id = ?", args: [id] })).rows[0];
  if (!existing)
    return c.json({ error: "Promo code not found" }, 404);
  await db.execute({
    sql: `UPDATE promo_codes SET code = ?, type = ?, value = ?, min_order_amount = ?, max_discount_amount = ?, usage_limit = ?, active = ?, expires_at = ? WHERE id = ?`,
    args: [
      d.code ?? existing.code,
      d.type ?? existing.type,
      d.value ?? existing.value,
      d.minOrderAmount ?? existing.min_order_amount,
      d.maxDiscountAmount === void 0 ? existing.max_discount_amount : d.maxDiscountAmount,
      d.usageLimit === void 0 ? existing.usage_limit : d.usageLimit,
      d.active === void 0 ? existing.active : d.active ? 1 : 0,
      d.expiresAt === void 0 ? existing.expires_at : d.expiresAt,
      id
    ]
  });
  const row = (await db.execute({ sql: "SELECT * FROM promo_codes WHERE id = ?", args: [id] })).rows[0];
  return c.json({ promoCode: row });
});
app22.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const result = await db.execute({ sql: "DELETE FROM promo_codes WHERE id = ?", args: [c.req.param("id")] });
  if (result.rowsAffected === 0)
    return c.json({ error: "Promo code not found" }, 404);
  return c.json({ ok: true });
});
var promo_default = app22;

// src/routes/admin/analytics.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app23 = new Hono2();
app23.use("*", requireAdmin);
app23.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app23.get("/", async (c) => {
  const db = getDb(c.env);
  const REVENUE_AMOUNT = `CASE
    WHEN payment_status = 'paid' THEN total_amount
    WHEN payment_status = 'partially_paid' THEN amount_paid
    ELSE 0
  END`;
  const [totals, byStatus, topProducts, recent, customerCount] = await Promise.all([
    db.execute(
      `SELECT COUNT(*) AS order_count,
              COALESCE(SUM(${REVENUE_AMOUNT}), 0) AS revenue,
              COALESCE(SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END), 0) AS paid_count,
              COALESCE(SUM(CASE
                WHEN COALESCE(paid_at, created_at) >= datetime('now', '+5 hours', '+30 minutes', 'start of month', '-5 hours', '-30 minutes')
                 AND COALESCE(paid_at, created_at) < datetime('now', '+5 hours', '+30 minutes', 'start of month', '+1 month', '-5 hours', '-30 minutes')
                THEN ${REVENUE_AMOUNT} ELSE 0 END), 0) AS monthly_revenue
         FROM orders WHERE status NOT IN ('cancelled', 'awaiting_payment')`
    ),
    db.execute(`SELECT status, COUNT(*) AS count FROM orders GROUP BY status`),
    db.execute(`
      SELECT oi.product_name, SUM(oi.quantity) AS units_sold, SUM(oi.quantity * oi.product_price) AS revenue
        FROM order_items oi JOIN orders o ON o.id = oi.order_id
       WHERE o.status != 'cancelled' AND o.payment_status = 'paid'
       GROUP BY oi.product_name
       ORDER BY units_sold DESC
       LIMIT 10
    `),
    db.execute(
      `SELECT order_number, total_amount, status, payment_status, created_at FROM orders ORDER BY created_at DESC LIMIT 10`
    ),
    db.execute(`SELECT COUNT(*) AS count FROM users`)
  ]);
  return c.json({
    orderCount: Number(totals.rows[0].order_count),
    paidOrderCount: Number(totals.rows[0].paid_count),
    revenue: Number(totals.rows[0].revenue),
    monthlyRevenue: Number(totals.rows[0].monthly_revenue),
    customerCount: Number(customerCount.rows[0].count),
    byStatus: byStatus.rows.map((r) => ({ status: r.status, count: Number(r.count) })),
    topProducts: topProducts.rows.map((r) => ({ productName: r.product_name, unitsSold: Number(r.units_sold), revenue: Number(r.revenue) })),
    recentOrders: recent.rows
  });
});
app23.get("/products", async (c) => {
  const db = getDb(c.env);
  const [sold, week2, carts, wishes, products] = await Promise.all([
    db.execute(`
      SELECT oi.product_name,
             SUM(oi.quantity) AS units,
             COUNT(DISTINCT o.id) AS orders,
             SUM(oi.quantity * oi.product_price) AS revenue
        FROM order_items oi JOIN orders o ON o.id = oi.order_id
       WHERE o.payment_status = 'paid'
       GROUP BY oi.product_name
    `),
    db.execute(`
      SELECT oi.product_name, SUM(oi.quantity) AS units
        FROM order_items oi JOIN orders o ON o.id = oi.order_id
       WHERE o.payment_status = 'paid'
         AND COALESCE(o.paid_at, o.created_at) >= datetime('now', '-7 days')
       GROUP BY oi.product_name
    `),
    db.execute(`
      SELECT product_name, COUNT(DISTINCT user_id) AS people, SUM(quantity) AS units, MIN(created_at) AS since
        FROM cart_items GROUP BY product_name
    `),
    db.execute(`SELECT product_name, COUNT(DISTINCT user_id) AS people FROM wishlist_items GROUP BY product_name`),
    db.execute(`SELECT name, category, price, images, active FROM products`)
  ]);
  const key = /* @__PURE__ */ __name((v) => String(v || "").trim().toLowerCase(), "key");
  const index = /* @__PURE__ */ __name((rows2, fn) => {
    const m = /* @__PURE__ */ new Map();
    for (const r of rows2)
      m.set(key(r.product_name), fn(r));
    return m;
  }, "index");
  const soldBy = index(sold.rows, (r) => ({
    units: Number(r.units || 0),
    orders: Number(r.orders || 0),
    revenue: Number(r.revenue || 0)
  }));
  const weekBy = index(week2.rows, (r) => Number(r.units || 0));
  const cartBy = index(carts.rows, (r) => ({
    people: Number(r.people || 0),
    units: Number(r.units || 0),
    since: r.since
  }));
  const wishBy = index(wishes.rows, (r) => Number(r.people || 0));
  const rows = products.rows.map((p) => {
    const k = key(p.name);
    const s = soldBy.get(k) || { units: 0, orders: 0, revenue: 0 };
    const cart = cartBy.get(k) || { people: 0, units: 0, since: null };
    let image = "";
    try {
      const parsed = JSON.parse(p.images || "[]");
      image = Array.isArray(parsed) ? parsed[0] || "" : "";
    } catch {
      image = "";
    }
    return {
      name: p.name,
      category: p.category,
      price: Number(p.price || 0),
      image,
      active: !!p.active,
      unitsSold: s.units,
      orders: s.orders,
      revenue: s.revenue,
      soldThisWeek: weekBy.get(k) || 0,
      inCarts: cart.people,
      inCartsUnits: cart.units,
      inCartsSince: cart.since,
      inWishlists: wishBy.get(k) || 0
    };
  });
  return c.json({
    products: rows,
    // Sold in the last seven days decides the week's trend; ties go to the
    // one with more all-time sales rather than whichever the database
    // happened to return first.
    trending: [...rows].filter((r) => r.soldThisWeek > 0).sort((a, b) => b.soldThisWeek - a.soldThisWeek || b.unitsSold - a.unitsSold).slice(0, 5).map((r) => r.name),
    viewTrackingAvailable: false
  });
});
var analytics_default = app23;

// src/routes/admin/categories.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app24 = new Hono2();
app24.use("*", async (c, next) => {
  await next();
  if (c.req.method !== "GET" && c.res && c.res.status < 400) {
    c.executionCtx.waitUntil(
      Promise.all([invalidate(c, "/api/homepage"), invalidate(c, "/api/categories")])
    );
  }
});
app24.use("*", requireAdmin);
app24.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app24.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute("SELECT id, name, slug, image_url AS imageUrl, sort_order AS sortOrder FROM categories ORDER BY sort_order ASC, name ASC");
  return c.json({ categories: rows.rows });
});
var categorySchema = external_exports.object({
  name: external_exports.string().trim().min(1).max(80),
  imageUrl: external_exports.string().trim().max(1e3).optional(),
  sortOrder: external_exports.number().int().optional()
});
async function uniqueSlug2(db, name, excludeId) {
  const base = slugify(name) || "category";
  let slug = base;
  let n = 2;
  for (; ; ) {
    const clash = (await db.execute({
      sql: excludeId ? "SELECT id FROM categories WHERE slug = ? AND id != ?" : "SELECT id FROM categories WHERE slug = ?",
      args: excludeId ? [slug, excludeId] : [slug]
    })).rows[0];
    if (!clash)
      return slug;
    slug = `${base}-${n++}`;
  }
}
__name(uniqueSlug2, "uniqueSlug");
app24.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const existing = (await db.execute({ sql: "SELECT id FROM categories WHERE name = ? COLLATE NOCASE", args: [d.name] })).rows[0];
  if (existing)
    return c.json({ error: "A category with this name already exists" }, 409);
  const slug = await uniqueSlug2(db, d.name);
  const info3 = await db.execute({
    sql: "INSERT INTO categories (name, slug, image_url, sort_order) VALUES (?, ?, ?, ?)",
    args: [d.name, slug, d.imageUrl || "", d.sortOrder ?? 0]
  });
  const row = (await db.execute({
    sql: "SELECT id, name, slug, image_url AS imageUrl, sort_order AS sortOrder FROM categories WHERE id = ?",
    args: [info3.lastInsertRowid]
  })).rows[0];
  return c.json({ category: row }, 201);
});
app24.put("/:id", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = categorySchema.partial().safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const id = c.req.param("id");
  const existing = (await db.execute({ sql: "SELECT * FROM categories WHERE id = ?", args: [id] })).rows[0];
  if (!existing)
    return c.json({ error: "Category not found" }, 404);
  const slug = d.name && d.name !== existing.name ? await uniqueSlug2(db, d.name, id) : existing.slug;
  await db.execute({
    sql: "UPDATE categories SET name = ?, slug = ?, image_url = ?, sort_order = ? WHERE id = ?",
    args: [d.name ?? existing.name, slug, d.imageUrl ?? existing.image_url, d.sortOrder ?? existing.sort_order, id]
  });
  const row = (await db.execute({ sql: "SELECT id, name, slug, image_url AS imageUrl, sort_order AS sortOrder FROM categories WHERE id = ?", args: [id] })).rows[0];
  return c.json({ category: row });
});
app24.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const result = await db.execute({ sql: "DELETE FROM categories WHERE id = ?", args: [c.req.param("id")] });
  if (result.rowsAffected === 0)
    return c.json({ error: "Category not found" }, 404);
  return c.json({ ok: true });
});
var categories_default2 = app24;

// src/routes/admin/site-settings.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app25 = new Hono2();
app25.use("*", requireAdmin);
app25.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app25.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = (await db.execute("SELECT key, value FROM site_settings")).rows;
  const settings = {};
  for (const r of rows)
    settings[r.key] = r.value;
  return c.json({ settings });
});
var bodySchema = external_exports.record(external_exports.string(), external_exports.string().max(2e4));
app25.put("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: "Invalid input" }, 400);
  const db = getDb(c.env);
  for (const [key, value] of Object.entries(parsed.data)) {
    await db.execute({
      sql: `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
      args: [key, value]
    });
  }
  const rows = (await db.execute("SELECT key, value FROM site_settings")).rows;
  const settings = {};
  for (const r of rows)
    settings[r.key] = r.value;
  return c.json({ settings });
});
var site_settings_default2 = app25;

// src/routes/admin/featured-reviews.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app26 = new Hono2();
app26.use("*", requireAdmin);
app26.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app26.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute("SELECT * FROM featured_reviews ORDER BY sort_order ASC, created_at DESC");
  return c.json({ reviews: rows.rows });
});
var schema3 = external_exports.object({
  reviewerName: external_exports.string().trim().min(1).max(100),
  rating: external_exports.number().int().min(1).max(5),
  comment: external_exports.string().trim().min(1).max(1e3),
  productName: external_exports.string().trim().max(200).optional(),
  sortOrder: external_exports.number().int().optional()
});
app26.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = schema3.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const info3 = await db.execute({
    sql: "INSERT INTO featured_reviews (reviewer_name, rating, comment, product_name, sort_order) VALUES (?, ?, ?, ?, ?)",
    args: [d.reviewerName, d.rating, d.comment, d.productName || null, d.sortOrder ?? 0]
  });
  const row = (await db.execute({ sql: "SELECT * FROM featured_reviews WHERE id = ?", args: [info3.lastInsertRowid] })).rows[0];
  return c.json({ review: row }, 201);
});
app26.put("/:id", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = schema3.partial().safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const d = parsed.data;
  const db = getDb(c.env);
  const id = c.req.param("id");
  const existing = (await db.execute({ sql: "SELECT * FROM featured_reviews WHERE id = ?", args: [id] })).rows[0];
  if (!existing)
    return c.json({ error: "Not found" }, 404);
  await db.execute({
    sql: "UPDATE featured_reviews SET reviewer_name = ?, rating = ?, comment = ?, product_name = ?, sort_order = ? WHERE id = ?",
    args: [
      d.reviewerName ?? existing.reviewer_name,
      d.rating ?? existing.rating,
      d.comment ?? existing.comment,
      d.productName === void 0 ? existing.product_name : d.productName || null,
      d.sortOrder ?? existing.sort_order,
      id
    ]
  });
  const row = (await db.execute({ sql: "SELECT * FROM featured_reviews WHERE id = ?", args: [id] })).rows[0];
  return c.json({ review: row });
});
app26.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const result = await db.execute({ sql: "DELETE FROM featured_reviews WHERE id = ?", args: [c.req.param("id")] });
  if (result.rowsAffected === 0)
    return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
var featured_reviews_default2 = app26;

// src/routes/admin/complaints.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app27 = new Hono2();
app27.use("*", requireAdmin);
app27.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
var STATUSES = ["open", "in_progress", "resolved", "rejected"];
app27.get("/", async (c) => {
  const db = getDb(c.env);
  const status = c.req.query("status");
  const rows = await db.execute(
    status ? {
      sql: `SELECT co.*, o.order_number, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email
                  FROM complaints co JOIN orders o ON o.id = co.order_id JOIN users u ON u.id = co.user_id
                 WHERE co.status = ? ORDER BY co.created_at DESC`,
      args: [status]
    } : `SELECT co.*, o.order_number, u.name AS customer_name, COALESCE(o.contact_email, u.email) AS customer_email
           FROM complaints co JOIN orders o ON o.id = co.order_id JOIN users u ON u.id = co.user_id
          ORDER BY co.created_at DESC`
  );
  return c.json({ complaints: rows.rows.map((r) => ({ ...r, images: JSON.parse(r.images || "[]") })) });
});
var statusSchema2 = external_exports.object({ status: external_exports.enum(STATUSES) });
app27.patch("/:id/status", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = statusSchema2.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const db = getDb(c.env);
  const id = c.req.param("id");
  const result = await db.execute({
    sql: "UPDATE complaints SET status = ?, updated_at = datetime('now') WHERE id = ?",
    args: [parsed.data.status, id]
  });
  if (result.rowsAffected === 0)
    return c.json({ error: "Complaint not found" }, 404);
  const row = (await db.execute({ sql: "SELECT * FROM complaints WHERE id = ?", args: [id] })).rows[0];
  const who = (await db.execute({
    sql: `SELECT u.email AS email, o.order_number AS order_number
              FROM complaints ct JOIN users u ON u.id = ct.user_id JOIN orders o ON o.id = ct.order_id
             WHERE ct.id = ?`,
    args: [id]
  })).rows[0];
  if (who?.email) {
    const mail = complaintStatusEmail({
      orderNumber: who.order_number,
      productName: row.product_name,
      status: parsed.data.status
    });
    const send2 = sendEmail(c.env, { to: who.email, subject: mail.subject, html: mail.html }).catch(
      (e) => console.error("[email:complaint-status]", e?.message)
    );
    if (c.executionCtx?.waitUntil)
      c.executionCtx.waitUntil(send2);
  }
  return c.json({ complaint: { ...row, images: JSON.parse(row.images || "[]") } });
});
var complaints_default2 = app27;

// src/routes/admin/homepage.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var app28 = new Hono2();
app28.use("*", async (c, next) => {
  await next();
  if (c.req.method !== "GET" && c.res && c.res.status < 400) {
    c.executionCtx.waitUntil(
      Promise.all([invalidate(c, "/api/homepage"), invalidate(c, "/api/categories")])
    );
  }
});
app28.use("*", requireAdmin);
app28.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
function sectionByKey(key) {
  return PRODUCT_SECTIONS.find((s) => s.key === key) || null;
}
__name(sectionByKey, "sectionByKey");
function toPickerProduct(row) {
  let image = "";
  try {
    const images = JSON.parse(row.images || "[]");
    if (Array.isArray(images) && typeof images[0] === "string")
      image = images[0];
  } catch {
    image = "";
  }
  return { id: row.id, name: row.name, category: row.category, price: row.price, image, active: !!row.active };
}
__name(toPickerProduct, "toPickerProduct");
app28.get("/", async (c) => {
  const db = getDb(c.env);
  const sectionQueries = PRODUCT_SECTIONS.map(
    (s) => db.execute(
      `SELECT id, name, category, price, images, active FROM products
       WHERE ${s.flagColumn} = 1
       ORDER BY ${s.orderColumn} ASC, sort_order ASC, id DESC`
    )
  );
  const [settingsRows, categoryRows, allProductRows, ...sectionResults] = await Promise.all([
    db.execute("SELECT key, value FROM site_settings"),
    db.execute("SELECT id, name, slug, image_url AS imageUrl, sort_order AS sortOrder FROM categories ORDER BY sort_order ASC, name ASC"),
    db.execute("SELECT id, name, category, price, images, active FROM products WHERE active = 1 ORDER BY name ASC"),
    ...sectionQueries
  ]);
  const settings = readSettings(settingsRows.rows);
  const images = {};
  const imagesMobile = {};
  const focus = {};
  const fit = {};
  for (const slot of Object.keys(IMAGE_SLOTS)) {
    images[slot] = imagesForSlot(settings, slot);
    imagesMobile[slot] = imagesForSlot(settings, slot, "mobile");
    focus[slot] = focusForSlot(settings, slot);
    fit[slot] = fitForSlot(settings, slot);
  }
  const sections = {};
  PRODUCT_SECTIONS.forEach((s, i) => {
    sections[s.key] = sectionResults[i].rows.map(toPickerProduct);
  });
  return c.json({
    layout: HOMEPAGE_LAYOUT,
    images,
    imagesMobile,
    focus,
    focusChoices: FOCUS_CHOICES,
    fit,
    fitRange: { min: FIT_MIN_PERCENT, max: FIT_MAX_PERCENT },
    categories: categoryRows.rows,
    sections,
    allProducts: allProductRows.rows.map(toPickerProduct),
    maxImagesPerSlot: MAX_IMAGES_PER_SLOT
  });
});
var imagesSchema = external_exports.object({
  images: external_exports.array(external_exports.string().trim().min(1).max(1e3)).max(MAX_IMAGES_PER_SLOT),
  // "desktop" (default) or "mobile" — see imagesForSlot in lib/homepage.js.
  variant: external_exports.enum(["desktop", "mobile"]).optional()
});
app28.put("/images/:slot", async (c) => {
  const slotKey = c.req.param("slot");
  const slot = IMAGE_SLOTS[slotKey];
  if (!slot)
    return c.json({ error: "Unknown image slot" }, 404);
  const body = await c.req.json().catch(() => ({}));
  const parsed = imagesSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const db = getDb(c.env);
  const urls = parsed.data.images;
  const variant = parsed.data.variant || "desktop";
  const key = variant === "mobile" ? slot.mobileKey : slot.listKey;
  const upsert = /* @__PURE__ */ __name((k, v) => db.execute({
    sql: `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
    args: [k, v]
  }), "upsert");
  await upsert(key, JSON.stringify(urls));
  if (variant === "desktop")
    await upsert(slot.legacyKey, urls[0] || "");
  return c.json({ images: urls, variant });
});
var sectionSchema = external_exports.object({
  productIds: external_exports.array(external_exports.number().int().positive()).max(60)
});
app28.put("/sections/:key", async (c) => {
  const section = sectionByKey(c.req.param("key"));
  if (!section)
    return c.json({ error: "Unknown homepage section" }, 404);
  const body = await c.req.json().catch(() => ({}));
  const parsed = sectionSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const db = getDb(c.env);
  const ids = [...new Set(parsed.data.productIds)];
  await db.execute(`UPDATE products SET ${section.flagColumn} = 0, ${section.orderColumn} = 0 WHERE ${section.flagColumn} = 1`);
  for (let i = 0; i < ids.length; i++) {
    await db.execute({
      sql: `UPDATE products SET ${section.flagColumn} = 1, ${section.orderColumn} = ? WHERE id = ?`,
      args: [i, ids[i]]
    });
  }
  const rows = await db.execute(
    `SELECT id, name, category, price, images, active FROM products
     WHERE ${section.flagColumn} = 1
     ORDER BY ${section.orderColumn} ASC, sort_order ASC, id DESC`
  );
  return c.json({ products: rows.rows.map(toPickerProduct) });
});
var categoryOrderSchema = external_exports.object({
  categoryIds: external_exports.array(external_exports.number().int().positive()).max(200)
});
app28.put("/categories/order", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = categoryOrderSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const db = getDb(c.env);
  const ids = [...new Set(parsed.data.categoryIds)];
  for (let i = 0; i < ids.length; i++) {
    await db.execute({ sql: "UPDATE categories SET sort_order = ? WHERE id = ?", args: [i, ids[i]] });
  }
  const rows = await db.execute(
    "SELECT id, name, slug, image_url AS imageUrl, sort_order AS sortOrder FROM categories ORDER BY sort_order ASC, name ASC"
  );
  return c.json({ categories: rows.rows });
});
var focusSchema = external_exports.object({ focus: external_exports.enum(FOCUS_CHOICES) });
var fitSchema = external_exports.object({ fit: external_exports.string().trim().refine(isValidFit, "Invalid zoom value") });
app28.put("/fit/:slot", async (c) => {
  const slot = IMAGE_SLOTS[c.req.param("slot")];
  if (!slot?.fitKey)
    return c.json({ error: "Unknown image slot" }, 404);
  const body = await c.req.json().catch(() => ({}));
  const parsed = fitSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: "Invalid fit value" }, 400);
  await getDb(c.env).execute({
    sql: `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
    args: [slot.fitKey, parsed.data.fit]
  });
  return c.json({ fit: parsed.data.fit });
});
app28.put("/focus/:slot", async (c) => {
  const slotKey = c.req.param("slot");
  const slot = IMAGE_SLOTS[slotKey];
  if (!slot?.focusKey)
    return c.json({ error: "Unknown image slot" }, 404);
  const body = await c.req.json().catch(() => ({}));
  const parsed = focusSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: "Invalid focus value" }, 400);
  await getDb(c.env).execute({
    sql: `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
    args: [slot.focusKey, parsed.data.focus]
  });
  return c.json({ focus: parsed.data.focus });
});
var homepage_default2 = app28;

// src/routes/admin/admins.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_bcryptjs3 = __toESM(require_bcrypt(), 1);
var app29 = new Hono2();
app29.use("*", requireAdmin);
app29.use("*", async (c, next) => {
  await ensureSchema(c.env);
  await next();
});
app29.get("/", async (c) => {
  const db = getDb(c.env);
  const rows = await db.execute("SELECT id, name, email, created_at FROM admins ORDER BY created_at ASC");
  return c.json({ admins: rows.rows, currentId: c.get("admin")?.id ?? null });
});
var createSchema = external_exports.object({
  name: external_exports.string().trim().min(1).max(100),
  email: external_exports.string().trim().toLowerCase().email(),
  password: external_exports.string().min(8, "Use at least 8 characters").max(200)
});
app29.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const db = getDb(c.env);
  const clash = (await db.execute({ sql: "SELECT id FROM admins WHERE email = ?", args: [parsed.data.email] })).rows[0];
  if (clash)
    return c.json({ error: "An admin with this email already exists." }, 409);
  const info3 = await db.execute({
    sql: "INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)",
    args: [parsed.data.name, parsed.data.email, import_bcryptjs3.default.hashSync(parsed.data.password, 10)]
  });
  return c.json({ admin: { id: Number(info3.lastInsertRowid), name: parsed.data.name, email: parsed.data.email } }, 201);
});
var passwordSchema = external_exports.object({ password: external_exports.string().min(8, "Use at least 8 characters").max(200) });
app29.post("/:id/password", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = passwordSchema.safeParse(body);
  if (!parsed.success)
    return c.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, 400);
  const db = getDb(c.env);
  const id = Number(c.req.param("id"));
  const target = (await db.execute({ sql: "SELECT id, email FROM admins WHERE id = ?", args: [id] })).rows[0];
  if (!target)
    return c.json({ error: "Admin not found" }, 404);
  await db.execute({
    sql: "UPDATE admins SET password_hash = ? WHERE id = ?",
    args: [import_bcryptjs3.default.hashSync(parsed.data.password, 10), id]
  });
  await db.execute({ sql: "DELETE FROM admin_login_attempts WHERE email = ?", args: [target.email] }).catch(() => {
  });
  return c.json({ ok: true, email: target.email });
});
app29.delete("/:id", async (c) => {
  const db = getDb(c.env);
  const id = Number(c.req.param("id"));
  if (id === (c.get("admin")?.id ?? -1)) {
    return c.json({ error: "You can't remove the account you're signed in with." }, 400);
  }
  const count3 = Number((await db.execute("SELECT COUNT(*) AS n FROM admins")).rows[0].n);
  if (count3 <= 1)
    return c.json({ error: "This is the only admin account." }, 400);
  await db.execute({ sql: "DELETE FROM admins WHERE id = ?", args: [id] });
  return c.json({ ok: true });
});
var admins_default = app29;

// src/index.js
var app30 = new Hono2();
app30.use("*", async (c, next) => {
  const contentType = c.req.header("content-type") || "";
  if (["POST", "PUT", "PATCH"].includes(c.req.method) && contentType.toLowerCase().includes("application/json")) {
    const maxBytes = 1_048_576;
    const declaredLength = Number(c.req.header("content-length") || 0);
    if (declaredLength > maxBytes) return c.json({ error: "Request body is too large." }, 413);
    const body = await c.req.raw.clone().arrayBuffer();
    if (body.byteLength > maxBytes) return c.json({ error: "Request body is too large." }, 413);
  }
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
  c.header("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  c.header("Strict-Transport-Security", "max-age=31536000");
});
app30.use(
  "*",
  cors({
    origin: (origin, c) => {
      const allowed = String(c.env.CORS_ORIGIN || "*").split(",").map((v) => v.trim()).filter(Boolean);
      if (!origin || allowed.includes("*"))
        return null;
      return allowed.includes(origin) ? origin : null;
    },
    credentials: true
  })
);
app30.get("/api/health", (c) => c.json({ ok: true }));
app30.route("/api/auth", auth_default);
app30.route("/api/cart", cart_default);
app30.route("/api/wishlist", wishlist_default);
app30.route("/api/orders", orders_default);
app30.route("/api/newsletter", newsletter_default);
app30.route("/api/reviews", reviews_default);
app30.route("/api/products", products_default);
app30.route("/api/categories", categories_default);
app30.route("/api/site-settings", site_settings_default);
app30.route("/api/featured-reviews", featured_reviews_default);
app30.route("/api/complaints", complaints_default);
app30.route("/api/uploads", uploads_default);
app30.route("/api/addresses", addresses_default);
app30.route("/api/homepage", homepage_default);
app30.route("/api/payments", payments_default);
app30.route("/api/admin/auth", auth_default2);
app30.route("/api/admin/admins", admins_default);
app30.route("/api/admin/products", products_default2);
app30.route("/api/admin/orders", orders_default2);
app30.route("/api/admin/customers", customers_default);
app30.route("/api/admin/custom-orders", custom_orders_default);
app30.route("/api/admin/reviews", reviews_default2);
app30.route("/api/admin/promo-codes", promo_default);
app30.route("/api/admin/analytics", analytics_default);
app30.route("/api/admin/categories", categories_default2);
app30.route("/api/admin/site-settings", site_settings_default2);
app30.route("/api/admin/featured-reviews", featured_reviews_default2);
app30.route("/api/admin/complaints", complaints_default2);
app30.route("/api/admin/homepage", homepage_default2);
app30.get("/media/*", async (c) => {
  if (!c.env.MEDIA)
    return c.notFound();
  const key = c.req.path.replace(/^\/media\//, "");
  const rangeHeader = c.req.header("Range");
  const rangeMatch = rangeHeader && /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (rangeMatch) {
    const head = await c.env.MEDIA.head(key);
    if (!head)
      return c.notFound();
    const total = head.size;
    const [, rawStart, rawEnd] = rangeMatch;
    let start;
    let end;
    if (rawStart === "") {
      const suffix = Number(rawEnd);
      if (!suffix)
        return c.text("", 416, { "Content-Range": `bytes */${total}` });
      start = Math.max(0, total - suffix);
      end = total - 1;
    } else {
      start = Number(rawStart);
      end = rawEnd === "" ? total - 1 : Math.min(Number(rawEnd), total - 1);
    }
    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= total) {
      return c.text("", 416, { "Content-Range": `bytes */${total}` });
    }
    const slice = await c.env.MEDIA.get(key, { range: { offset: start, length: end - start + 1 } });
    if (!slice)
      return c.notFound();
    const rangeHeaders = new Headers({
      "Content-Type": head.httpMetadata?.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Content-Length": String(end - start + 1)
    });
    if (head.httpEtag)
      rangeHeaders.set("ETag", head.httpEtag);
    return new Response(slice.body, { status: 206, headers: rangeHeaders });
  }
  const cache = caches.default;
  const CACHE_VERSION2 = "4";
  const cacheKey = new Request(`${c.req.url}#v${CACHE_VERSION2}`, { method: "GET" });
  const hit = await cache.match(cacheKey);
  if (hit)
    return hit;
  const object2 = await c.env.MEDIA.get(key);
  if (!object2)
    return c.notFound();
  const headers = new Headers({
    "Content-Type": object2.httpMetadata?.contentType || "application/octet-stream",
    "Cache-Control": "public, max-age=31536000, immutable",
    // Advertised so players know they may ask for slices at all.
    "Accept-Ranges": "bytes",
    "Content-Length": String(object2.size)
  });
  if (object2.httpEtag)
    headers.set("ETag", object2.httpEtag);
  const response = new Response(object2.body, { headers });
  c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
});
app30.onError((err, c) => {
  console.error("[unhandled-request-error]", c.req.method, c.req.path, err?.name, err?.message, err?.stack);
  return c.json({ error: "We couldn't complete checkout just now. Your order has not been confirmed. Please wait a moment and try again." }, 500);
});
app30.notFound((c) => c.json({ error: "Not found" }, 404));
var src_default = app30;
export {
  src_default as default
};
/*! Bundled license information:

bcryptjs/dist/bcrypt.js:
  (**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   *)
*/
//# sourceMappingURL=index.js.map
