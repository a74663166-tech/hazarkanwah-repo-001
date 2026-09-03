// app.js - simple closed 9-axis core simulation
class Closed9AxisCore{
  constructor(){
    this.axes = {};
    for(let i=1;i<=9;i++) this.axes['AXIS_'+i]=0;
    this.log = [];
  }
  set(axisName,value){
    if(!(axisName in this.axes)) throw new Error('Unknown axis '+axisName);
    const old = this.axes[axisName];
    this.axes[axisName]=Number(value);
    this._log(`set ${axisName} ${old} -> ${value}`);
    return this.get(axisName);
  }
  get(axisName){
    return this.axes[axisName];
  }
  reset(axisName=null){
    if(axisName){
      if(!(axisName in this.axes)) throw new Error('Unknown axis '+axisName);
      this.axes[axisName]=0;
      this._log(`reset ${axisName}`);
    }else{
      Object.keys(this.axes).forEach(k=>this.axes[k]=0);
      this._log('reset core');
    }
  }
  randomize(axisName=null){
    if(axisName){
      const v=Math.floor(Math.random()*101);
      this.set(axisName,v);
    }else{
      Object.keys(this.axes).forEach(k=>this.set(k,Math.floor(Math.random()*101)));
      this._log('randomize core');
    }
  }
  toJSON(){
    return {
      core_name: 'CLOSED 9-AXIS CORE',
      timestamp: new Date().toISOString(),
      axes: {...this.axes}
    };
  }
  _log(msg){
    const ts=new Date().toISOString();
    this.log.unshift(`${ts} - ${msg}`);
    if(this.log.length>200) this.log.length=200;
  }
  getLog(){return this.log.slice(0,100)}
}

// UI binding
const core = new Closed9AxisCore();

function $id(id){return document.getElementById(id)}

function init(){
  const axisSelect = $id('axisSelect');
  for(let i=1;i<=9;i++){
    const name = 'AXIS_'+i;
    const opt = document.createElement('option'); opt.value=name; opt.textContent=name;
    axisSelect.appendChild(opt);
  }
  axisSelect.value='AXIS_1';

  const axisValue = $id('axisValue');
  const axisValueLabel = $id('axisValueLabel');
  axisValue.addEventListener('input',()=>{axisValueLabel.textContent=axisValue.value});

  $id('setAxisBtn').addEventListener('click',()=>{
    const axis = axisSelect.value; core.set(axis,axisValue.value); render();
  });
  $id('resetAxisBtn').addEventListener('click',()=>{
    const axis = axisSelect.value; core.reset(axis); render();
  });
  $id('randomAxisBtn').addEventListener('click',()=>{
    const axis = axisSelect.value; core.randomize(axis); render();
  });

  $id('resetCoreBtn').addEventListener('click',()=>{core.reset();render();});
  $id('randomizeAllBtn').addEventListener('click',()=>{core.randomize();render();});
  $id('applyBtn').addEventListener('click',applyChanges);
  $id('exportBtn').addEventListener('click',exportJSON);

  $id('copyJsonBtn').addEventListener('click',()=>{navigator.clipboard.writeText($id('jsonOutput').value).then(()=>addLog('copied JSON to clipboard')).catch(()=>addLog('copy failed'))});
  $id('clearJsonBtn').addEventListener('click',()=>{$id('jsonOutput').value='';addLog('cleared JSON output')});

  render();
}

function render(){
  // update enabled axes list
  const enabled = Object.entries(core.axes).filter(([,v])=>v!=0);
  const container = $id('enabledAxes'); container.innerHTML='';
  if(enabled.length===0){container.textContent='لا محاور مفعلة (القيم صفر)';}
  else{
    enabled.forEach(([k,v])=>{
      const pill=document.createElement('div'); pill.className='axis-pill'; pill.textContent=`${k}: ${v}`; container.appendChild(pill);
    });
  }
  // update JSON output
  $id('jsonOutput').value = JSON.stringify(core.toJSON(),null,2);
  // update log
  const log = $id('log'); log.innerHTML=''; core.getLog().forEach(l=>{
    const li=document.createElement('li'); li.textContent=l; log.appendChild(li);
  });
}

function applyChanges(){
  // In this demo we treat 'apply' as creating a snapshot and logging
  const snapshot = core.toJSON();
  addLog('apply changes -> snapshot created');
  // show a notification in the JSON area
  $id('jsonOutput').value = JSON.stringify({applied_at:new Date().toISOString(), snapshot},null,2);
}

function exportJSON(){
  const data = JSON.stringify(core.toJSON(),null,2);
  const blob = new Blob([data],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='hazarkanwah-core.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  addLog('exported JSON');
}

function addLog(msg){core._log(msg); render();}

window.addEventListener('DOMContentLoaded',init);
