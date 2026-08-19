import { LaboratoryRenderer } from '../render/LaboratoryRenderer';
import { SimulationEngine } from '../simulation/SimulationEngine';
import { GRID_WIDTH, type LayerId, type ProcessId } from '../simulation/types';
import { DRAKKEN_PROCESS_REGISTRY, PROCESS_ORDER } from '../simulation/processRegistry';

export class LaboratoryApp {
  private engine = new SimulationEngine();
  private renderer!: LaboratoryRenderer;
  private playing = false;
  private speed = 1;
  private accumulator = 0;
  private last = performance.now();
  private selectedProcess: ProcessId = 'fault-tongue';
  private selectedCell = 0;
  private placement = true;
  private readonly root: HTMLElement;
  private frameId = 0;
  private telemetryTimer = 0;
  private comparisonCacheKey = '';
  private currentLayer: LayerId = 'normal';
  private fps = 0;
  private frameCounter = 0;
  private fpsClock = performance.now();
  private simStepMs = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    this.build();
    this.renderer = new LaboratoryRenderer(this.must('viewport'), this.engine);
    this.renderer.onCellPick = (i,lat,lon) => { if (this.placement) { this.engine.deploy(this.selectedProcess,lat,lon,this.num('radius'),this.num('intensity')); this.renderer.markDirty(); this.refresh(); } else { this.selectCell(i); } };
    this.renderer.onCellHover = (i,lat,lon) => { this.must('targeting').textContent = `${lat.toFixed(1)}° / ${lon.toFixed(1)}° · CELL ${i}`; };
    this.bind(); this.selectCell(Math.floor(this.engine.state.elevation.length/2)); this.refresh(); this.frameId = requestAnimationFrame(this.loop);
  }

  private build(): void {
    this.root.innerHTML = `
      <main class="lab-shell">
        <header class="topbar"><div><p class="eyebrow">DRAKKEN TERRAFORMING LABORATORY</p><h1>Planetary Causality Instrument</h1></div><div class="statusline" id="statusline"></div></header>
        <aside class="panel rack" aria-label="Experiment rack">
          <h2>EXPERIMENT RACK</h2>
          <label>PLANET SEED <input id="seed" type="number" value="19870615" /></label><button id="regenerate">REGENERATE / RESET</button>
          <div class="process-grid">${PROCESS_ORDER.map((id,n)=>`<button class="process-card ${n===0?'selected':''}" data-process="${id}" aria-pressed="${n===0}"><strong>${DRAKKEN_PROCESS_REGISTRY[id].displayName}</strong><span><b>CANON FUNCTION</b>${DRAKKEN_PROCESS_REGISTRY[id].canonFunction}</span><span><b>LAB MODEL</b>${DRAKKEN_PROCESS_REGISTRY[id].labModel}</span></button>`).join('')}</div>
          <label>INTENSITY <input id="intensity" type="range" min="0.1" max="1" value="0.65" step="0.05"><output id="intensityOut">0.65</output></label>
          <label>INFLUENCE RADIUS <input id="radius" type="range" min="4" max="40" value="18" step="1"><output id="radiusOut">18°</output></label>
          <button id="placement" class="active" aria-pressed="true">PLACEMENT ARMED</button>
          <div><h3>DEPLOYED INSTANCES</h3><div id="instances" class="dense-list"></div></div>
        </aside>
        <section class="viewport-wrap"><div id="viewport" class="viewport" aria-label="Interactive planetary viewport"></div><div id="targeting" class="targeting">TARGETING READY</div><div class="layerlegend" id="layerlegend" aria-live="polite"></div><div class="layerbar" id="layerbar"></div></section>
        <aside class="panel inspector" aria-label="Planetary autopsy inspector"><h2>PLANETARY AUTOPSY</h2><div id="inspector"></div><h3>MATERIAL LEDGER</h3><div id="ledger" class="metric-grid"></div><h3>COMPARE A / B</h3><div id="compare"></div></aside>
        <footer class="timeline"><div class="timeline-controls"><button id="play">PLAY</button><label>SPEED <select id="speed"><option>.25</option><option selected>1</option><option>4</option><option>16</option><option>64</option></select></label><button id="fork">FORK B</button><button id="switchA">BRANCH A</button><button id="switchB">BRANCH B</button><button id="camera">RESET VIEW</button></div><label class="scrub">EXPERIMENT TIMELINE <input id="timeline" type="range" min="0" max="0" value="0"><output id="tickout">TICK 0</output></label><div id="events" class="events"></div></footer>
      </main>`;
    const layers: LayerId[]=['normal','crust','hydrology','atmosphere','biosphere','feedstock','drakken','provenance','comparison'];
    this.must('layerbar').innerHTML = layers.map((l,i)=>`<button data-layer="${l}" class="${i===0?'active':''}" aria-pressed="${i===0}">${l.toUpperCase()}</button>`).join('');
    this.must('layerlegend').textContent = LAYER_LEGENDS.normal;
  }

  private bind(): void {
    this.must('regenerate').addEventListener('click',()=>this.reset());
    this.root.querySelectorAll<HTMLButtonElement>('[data-process]').forEach(b=>b.addEventListener('click',()=>{ this.selectedProcess=b.dataset.process as ProcessId; this.root.querySelectorAll('[data-process]').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false');}); b.classList.add('selected');b.setAttribute('aria-pressed','true'); const def=DRAKKEN_PROCESS_REGISTRY[this.selectedProcess];this.must<HTMLInputElement>('intensity').value=String(def.defaultIntensity);this.must<HTMLInputElement>('radius').value=String(def.defaultRadius);this.updateOutputs(); }));
    for (const id of ['intensity','radius']) this.must(id).addEventListener('input',()=>this.updateOutputs());
    this.must('placement').addEventListener('click',()=>{this.placement=!this.placement;this.must('placement').classList.toggle('active',this.placement);this.must('placement').setAttribute('aria-pressed',String(this.placement));this.must('placement').textContent=this.placement?'PLACEMENT ARMED':'INSPECTION MODE';});
    this.must('play').addEventListener('click',()=>{this.playing=!this.playing;this.must('play').textContent=this.playing?'PAUSE':'PLAY';});
    this.must<HTMLSelectElement>('speed').addEventListener('change',()=>this.speed=Number(this.must<HTMLSelectElement>('speed').value));
    this.must<HTMLInputElement>('timeline').addEventListener('change',()=>{this.playing=false;this.must('play').textContent='PLAY';this.engine.restore(Number(this.must<HTMLInputElement>('timeline').value));this.renderer.markDirty();this.refresh();});
    this.must('fork').addEventListener('click',()=>{ if(!this.engine.branches.has('B')) this.engine.fork('B'); this.renderer.markDirty(); this.refresh();});
    this.must('switchA').addEventListener('click',()=>this.switchBranch('A'));
    this.must('switchB').addEventListener('click',()=>{if(this.engine.branches.has('B'))this.switchBranch('B');});
    this.must('camera').addEventListener('click',()=>this.renderer.resetCamera());
    this.root.querySelectorAll<HTMLButtonElement>('[data-layer]').forEach(b=>b.addEventListener('click',()=>{this.root.querySelectorAll('[data-layer]').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false');});b.classList.add('active');b.setAttribute('aria-pressed','true');this.currentLayer=b.dataset.layer as LayerId;this.renderer.setLayer(this.currentLayer);this.must('layerlegend').textContent=LAYER_LEGENDS[this.currentLayer];}));
  }

  private loop = (now:number): void => {
    const dt=Math.min(0.1,(now-this.last)/1000);this.last=now;
    if(this.playing){this.accumulator+=dt*this.speed*8;let steps=0;const simStart=performance.now();while(this.accumulator>=1&&steps<24){this.engine.step();this.accumulator-=1;steps++;}if(steps){this.simStepMs=(performance.now()-simStart)/steps;this.renderer.markDirty();this.refreshLight();}}
    this.renderer.render();this.telemetryTimer+=dt;if(this.telemetryTimer>.25){this.telemetryTimer=0;this.refresh();}
    this.frameCounter++;if(now-this.fpsClock>=1000){this.fps=this.frameCounter*1000/(now-this.fpsClock);this.frameCounter=0;this.fpsClock=now;}
    this.frameId=requestAnimationFrame(this.loop);
  };

  private reset(): void { const seed=Number(this.must<HTMLInputElement>('seed').value)||19870615;this.engine=new SimulationEngine(seed);this.renderer.dispose();this.renderer=new LaboratoryRenderer(this.must('viewport'),this.engine);this.renderer.onCellPick=(i,lat,lon)=>{if(this.placement){this.engine.deploy(this.selectedProcess,lat,lon,this.num('radius'),this.num('intensity'));this.renderer.markDirty();this.refresh();}else this.selectCell(i);};this.renderer.onCellHover=(i,lat,lon)=>{this.must('targeting').textContent=`${lat.toFixed(1)}° / ${lon.toFixed(1)}° · CELL ${i}`;};this.comparisonCacheKey='';this.currentLayer='normal';this.refresh(); }
  private switchBranch(id:string): void {this.engine.switchBranch(id);this.comparisonCacheKey='';this.renderer.markDirty();this.refresh();}
  private selectCell(i:number): void {this.selectedCell=i;this.renderer.setSelected(i);this.refresh();}
  private updateOutputs(): void {this.must('intensityOut').textContent=this.num('intensity').toFixed(2);this.must('radiusOut').textContent=`${this.num('radius').toFixed(0)}°`;}
  private refreshLight():void{const t=this.must<HTMLInputElement>('timeline');t.max=String(Math.max(Number(t.max),this.engine.state.tick));t.value=String(this.engine.state.tick);this.must('tickout').textContent=`TICK ${this.engine.state.tick}`;}

  private refresh(): void {
    this.refreshLight(); const m=this.engine.metrics(); const s=this.engine.state; const cell=this.engine.selectedCell(this.selectedCell); const y=Math.floor(this.selectedCell/GRID_WIDTH),x=this.selectedCell%GRID_WIDTH;
    this.must('statusline').textContent=`SEED ${s.seed} · TICK ${s.tick} · TIME ${s.simulationTime.toFixed(0)} · BRANCH ${s.branchId} · HASH ${this.engine.hash()} · FPS ${this.fps.toFixed(0)} · STEP ${this.simStepMs.toFixed(2)}ms · ACTIVE ${[...this.engine.processes.values()].filter(p=>p.active).length}`;
    this.must('inspector').innerHTML=`<div class="metric-grid"><span>COORDINATES<b>${((y/63)*180-90).toFixed(1)}° / ${((x/128)*360-180).toFixed(1)}°</b></span>${Object.entries(cell).map(([k,v])=>`<span>${label(k)}<b>${typeof v==='number'?fmt(v):v}</b></span>`).join('')}</div>`;
    const g=s.gorevault,o=s.orbital,ledger=this.engine.ledger();this.must('ledger').innerHTML=[['WATER MASS',m.waterMass],['WATER DRIFT',m.waterDrift],['CONVERTIBLE REMAINING',m.convertibleRemaining],['ENV RESIDUE',ledger.environmentalResidueMass],['HARVESTED',g.totalHarvested],['PIPELINE ACCOUNTED',ledger.pipelineAccounted],['PIPELINE ERROR',ledger.pipelineError],['SYSTEM ERROR',ledger.systemError],['REFINED FEEDSTOCK',g.refinedFeedstock],['RISING MATERIAL',o.risingMaterial],['ORBITAL LOOSE',o.orbitalLooseMaterial],['SHAPED BAND',o.shapedBandMaterial],['BAND COVERAGE',o.bandCoverage],['BAND INTEGRITY',o.bandIntegrity]].map(([k,v])=>`<span>${k}<b>${fmt(Number(v))}</b></span>`).join('');
    this.must('instances').innerHTML=[...this.engine.processes.values()].map(p=>`<div><b>${display(p.processId)}</b><span>${p.id} · ${processStatus(p.processId,p.active,g.refinedFeedstock,o.risingMaterial+o.orbitalLooseMaterial+o.shapedBandMaterial)}</span><button data-toggle="${p.id}">${p.active?'DEACTIVATE':'ACTIVATE'}</button></div>`).join('')||'<p>NO ACTIVE PROCESS INSTANCES</p>';
    this.root.querySelectorAll<HTMLButtonElement>('[data-toggle]').forEach(b=>b.addEventListener('click',()=>{const p=this.engine.processes.get(b.dataset.toggle!);if(p){this.engine.setProcessActive(p.id,!p.active);this.refresh();}}));
    const ev=this.engine.events.filter(e=>e.branchId===s.branchId).slice(-7);this.must('events').innerHTML=ev.map(e=>`<span><b>${e.tick}</b>${e.type}</span>`).join('')||'<span>NO EVENTS</span>';
    if(this.engine.branches.has('B')){const tick=s.tick;const c=this.engine.compare('A','B',tick);this.must('compare').innerHTML=`<p class="compare-note">A/B DELTA layer: crimson = active branch more transformed; azure = comparison branch more transformed.</p><div class="metric-grid">${(['oceanCoverage','biosphereRemaining','averageCrustIntegrity','populationRemaining','refinedFeedstock','orbitalMaterial','bandCoverage'] as const).map(k=>`<span>${label(k)}<b>${fmt(c.delta[k])}</b></span>`).join('')}</div>`;const other=s.branchId==='A'?'B':'A';const key=`${s.branchId}:${other}:${tick}`;if(key!==this.comparisonCacheKey){this.renderer.setComparisonState(this.engine.captureState(other,tick));this.comparisonCacheKey=key;}}else{this.must('compare').innerHTML='<p>Fork Branch B to compare deterministic futures.</p>';this.renderer.setComparisonState(null);this.comparisonCacheKey='';}
  }

  private num(id:string):number{return Number(this.must<HTMLInputElement>(id).value);}
  private must<T extends HTMLElement=HTMLElement>(id:string):T{const el=this.root.querySelector<T>(`#${id}`);if(!el)throw new Error(`Missing #${id}`);return el;}
  dispose():void{cancelAnimationFrame(this.frameId);this.renderer.dispose();}
}
const LAYER_LEGENDS: Record<LayerId,string> = {normal:'NORMAL · terrain / water / vegetation / transformation',crust:'CRUST · integrity / stress / fracture',hydrology:'HYDROLOGY · surface water mass',atmosphere:'ATMOSPHERE · humidity / aerosols',biosphere:'BIOSPHERE · vegetation / microbes / animals',feedstock:'FEEDSTOCK · harvestable matter / processing state',drakken:'DRAKKEN · active process influence',provenance:'PROVENANCE · latest major causal source',comparison:'COMPARISON · crimson active-branch transformation / azure comparison-branch transformation'};
function display(id:ProcessId):string{return DRAKKEN_PROCESS_REGISTRY[id].displayName;}
function processStatus(id:ProcessId,active:boolean,feedstock:number,orbital:number):string{if(!active)return'INACTIVE';if(id==='ringthroat'&&feedstock<=1e-5&&orbital<=1e-5)return'STARVED';return'ACTIVE';}
function fmt(v:number):string{return Math.abs(v)>=100?v.toFixed(1):v.toFixed(4);}
function label(v:string):string{return v.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase()).toUpperCase();}
