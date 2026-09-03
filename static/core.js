// static/core.js - Closed 9-Axis Core implementation (exposed as window.Closed9AxisCore)
class Closed9AxisCore {
  constructor() {
    this.axes = {};
    for (let i = 1; i <= 9; i++) this.axes['AXIS_' + i] = 0;
    this.log = [];
  }

  // clamp value to [0,100]
  _clamp(v) {
    const n = Number(v);
    if (Number.isNaN(n)) return 0;
    return Math.min(100, Math.max(0, Math.round(n)));
  }

  set(axisName, value) {
    if (!(axisName in this.axes)) throw new Error('Unknown axis ' + axisName);
    const newVal = this._clamp(value);
    const old = this.axes[axisName];
    this.axes[axisName] = newVal;
    this._log(`set ${axisName} ${old} -> ${newVal}`);
    return this.get(axisName);
  }

  get(axisName) {
    if (!(axisName in this.axes)) throw new Error('Unknown axis ' + axisName);
    return this.axes[axisName];
  }

  reset(axisName = null) {
    if (axisName) {
      if (!(axisName in this.axes)) throw new Error('Unknown axis ' + axisName);
      this.axes[axisName] = 0;
      this._log(`reset ${axisName}`);
    } else {
      Object.keys(this.axes).forEach(k => (this.axes[k] = 0));
      this._log('reset core');
    }
  }

  randomize(axisName = null) {
    if (axisName) {
      const v = Math.floor(Math.random() * 101);
      this.set(axisName, v);
    } else {
      Object.keys(this.axes).forEach(k => this.set(k, Math.floor(Math.random() * 101)));
      this._log('randomize core');
    }
  }

  toJSON() {
    return {
      core_name: 'CLOSED 9-AXIS CORE',
      timestamp: new Date().toISOString(),
      axes: { ...this.axes }
    };
  }

  _log(msg) {
    const ts = new Date().toISOString();
    this.log.unshift(`${ts} - ${msg}`);
    if (this.log.length > 500) this.log.length = 500;
  }

  getLog() {
    return this.log.slice(0, 200);
  }

  clearLog() {
    this.log = [];
  }
}

// expose globally for simple script usage
window.Closed9AxisCore = Closed9AxisCore;
