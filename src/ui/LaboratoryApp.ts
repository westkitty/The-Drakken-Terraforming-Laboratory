import { LaboratoryRenderer } from '../render/LaboratoryRenderer';
import { cellToLatLon } from '../simulation/PlanetGenerator';
import { DRAKKEN_PROCESS_REGISTRY, PROCESS_ORDER } from '../simulation/processRegistry';
import { SimulationEngine, type Metrics } from '../simulation/SimulationEngine';
import type { LayerId, ProcessId } from '../simulation/types';
import { isGridNavigationKey, moveGridSelection } from './gridKeyboard';
import { processStatus } from './processTelemetry';
import { DEFAULT_PLANET_SEED, parsePlanetSeed } from './seedInput';

const BASE_TICKS_PER_SECOND = 8;
const MAX_CATCH_UP_STEPS = 24;
const LAYERS: LayerId[] = ['normal', 'crust', 'hydrology', 'atmosphere', 'biosphere', 'feedstock', 'drakken', 'provenance', 'comparison'];
const CONTROL_FAMILIES = ['run', 'drakken', 'view', 'history', 'inspect'] as const;
type ControlFamily = (typeof CONTROL_FAMILIES)[number];

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
  private comparisonDelta: Metrics | null = null;
  private currentLayer: LayerId = 'normal';
  private fps = 0;
  private frameCounter = 0;
  private fpsClock = performance.now();
  private simStepMs = 0;
  private hashCacheKey = '';
  private hashCache = '';
  private ledgerRenderKey = '';
  private inspectorRenderKey = '';
  private instancesRenderKey = '';
  private eventsRenderKey = '';
  private quickStartVisible = true;
  private targetingOverride = false;
  private controlsOpen = false;
  private activeFamily: ControlFamily | null = null;
  private selectedBodyId: string | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.build();
    this.renderer = new LaboratoryRenderer(this.must('viewport'), this.engine);
    this.configureRenderer();
    this.bind();
    this.selectCell(Math.floor(this.engine.state.elevation.length / 2));
    this.refresh(true);
    this.frameId = requestAnimationFrame(this.loop);
  }

  private build(): void {
    this.root.innerHTML = `
      <main class="lab-shell">
        <section class="viewport-wrap" aria-label="Planet visualization">
          <div id="viewport" class="viewport" role="region" tabindex="0" aria-label="Interactive planetary viewport. Arrow keys move the selected cell; Enter or Space activates the selected cell." aria-describedby="targeting"></div>
          <button id="lab-controls-launcher" class="dot-launcher" type="button" aria-label="Laboratory controls" aria-expanded="false" aria-controls="lab-controls-menu">
            <span class="dot-grid" aria-hidden="true">${'<span class="dot"></span>'.repeat(12)}</span>
          </button>
          <div id="targeting" class="targeting" aria-live="polite">PLACEMENT · FAULT-TONGUE · TARGETING READY</div>
          <output id="tickout" class="tick-chip">TICK 0</output>
          <section id="quickstart" class="quickstart" aria-label="First run guide">
            <div><p class="section-kicker">FIRST RUN</p><strong>Make one cause visible.</strong></div>
            <ol><li>Open the 12-dot controls.</li><li>Choose a Drakken process.</li><li>Click the planet, press PLAY, then rewind or fork B.</li></ol>
            <button id="quickstartDismiss" type="button">DISMISS</button>
          </section>
          <div class="layerlegend" id="layerlegend" aria-live="polite"></div>

          <div id="lab-controls-menu" class="controls-menu" hidden>
            <nav class="family-nav" aria-label="Control families">
              <button type="button" data-family="run" aria-controls="family-run" aria-selected="false">RUN</button>
              <button type="button" data-family="drakken" aria-controls="family-drakken" aria-selected="false">DRAKKEN</button>
              <button type="button" data-family="view" aria-controls="family-view" aria-selected="false">VIEW</button>
              <button type="button" data-family="history" aria-controls="family-history" aria-selected="false">HISTORY</button>
              <button type="button" data-family="inspect" aria-controls="family-inspect" aria-selected="false">INSPECT</button>
            </nav>

            <section id="family-run" class="family-panel" hidden aria-label="Run controls">
              <p class="section-kicker">RUN</p>
              <div class="statusline" id="statusline" aria-label="Simulation status"></div>
              <label>PLANET SEED <input id="seed" type="number" value="${DEFAULT_PLANET_SEED}" /></label>
              <div class="run-actions">
                <button id="play" class="primary-control">PLAY</button>
                <label>SPEED <select id="speed"><option>.25</option><option selected>1</option><option>4</option><option>16</option><option>64</option></select></label>
              </div>
              <button id="regenerate" class="wide-control">REGENERATE / RESET</button>
            </section>

            <aside id="family-drakken" class="panel rack family-panel" hidden aria-label="Experiment rack">
              <div class="panel-heading">
                <div><p class="section-kicker">DRAKKEN</p><h2>EXPERIMENT RACK</h2></div>
                <span class="mode-chip" id="modechip">PLACEMENT</span>
              </div>
              <div class="process-grid">
                ${PROCESS_ORDER.map((id, n) => `
                  <button class="process-card ${n === 0 ? 'selected' : ''}" data-process="${id}" aria-pressed="${n === 0}">
                    <strong>${DRAKKEN_PROCESS_REGISTRY[id].displayName}</strong>
                    <span><b>CANON FUNCTION</b>${DRAKKEN_PROCESS_REGISTRY[id].canonFunction}</span>
                    <span><b>LAB MODEL</b>${DRAKKEN_PROCESS_REGISTRY[id].labModel}</span>
                  </button>`).join('')}
              </div>
              <label>INTENSITY <input id="intensity" type="range" min="0.1" max="1" value="0.65" step="0.05"><output id="intensityOut">0.65</output></label>
              <label>INFLUENCE RADIUS <input id="radius" type="range" min="4" max="40" value="18" step="1"><output id="radiusOut">18°</output></label>
              <button id="placement" class="active wide-control" aria-pressed="true">PLACEMENT ARMED</button>
              <div><h3>DEPLOYED INSTANCES</h3><div id="instances" class="dense-list"></div></div>
            </aside>

            <section id="family-view" class="family-panel" hidden aria-label="View controls">
              <p class="section-kicker">VIEW</p>
              <h2>FRAMING</h2>
              <div class="framing-actions">
                <button id="camera" class="wide-control">FOCUS PLANET / HOME</button>
                <button id="system-view" class="wide-control">SYSTEM VIEW</button>
                <button id="focus-body" class="wide-control" disabled>FOCUS SELECTED</button>
              </div>
              <h2>LAYERS</h2>
              <div class="layerbar" id="layerbar" aria-label="Planet inspection layers"></div>
            </section>

            <footer id="family-history" class="timeline family-panel" hidden aria-label="History controls">
              <p class="section-kicker">HISTORY</p>
              <div class="timeline-controls">
                <button id="fork">FORK B @ CURRENT TICK</button>
                <button id="switchA" class="branch-button active-branch" aria-pressed="true">VIEW A</button>
                <button id="switchB" class="branch-button" aria-pressed="false" disabled>VIEW B</button>
              </div>
              <label class="scrub">EXPERIMENT TIMELINE <input id="timeline" type="range" min="0" max="0" value="0"></label>
              <div id="events" class="events" aria-label="Recent causal events"></div>
            </footer>

            <aside id="family-inspect" class="panel inspector family-panel" hidden aria-label="Planetary autopsy inspector">
              <div class="panel-heading"><div><p class="section-kicker">INSPECT</p><h2>PLANETARY AUTOPSY</h2></div></div>
              <h3>CELESTIAL BODY</h3>
              <div id="celestial-inspect" class="metric-grid"></div>
              <h3>SELECTED CELL</h3>
              <div id="inspector"></div>
              <h3>MATERIAL LEDGER</h3><div id="ledger" class="metric-grid"></div>
              <h3>COMPARE A / B</h3><div id="compare"></div>
            </aside>
          </div>
        </section>
      </main>`;

    this.must('layerbar').innerHTML = LAYERS.map((layer, index) => `
      <button data-layer="${layer}" class="${index === 0 ? 'active' : ''}" aria-pressed="${index === 0}" ${layer === 'comparison' ? 'disabled' : ''}>${layer.toUpperCase()}</button>`).join('');
    this.must('layerlegend').textContent = LAYER_LEGENDS.normal;
  }

  private bind(): void {
    this.must('lab-controls-launcher').addEventListener('click', () => this.toggleControls());
    this.root.querySelectorAll<HTMLButtonElement>('[data-family]').forEach(button => button.addEventListener('click', () => {
      this.openFamily(button.dataset.family as ControlFamily);
    }));
    document.addEventListener('keydown', this.onDocumentKeydown);

    this.must('regenerate').addEventListener('click', () => this.reset());
    this.must('quickstartDismiss').addEventListener('click', () => this.hideQuickStart());

    this.root.querySelectorAll<HTMLButtonElement>('[data-process]').forEach(button => button.addEventListener('click', () => {
      this.selectedProcess = button.dataset.process as ProcessId;
      this.root.querySelectorAll('[data-process]').forEach(item => { item.classList.remove('selected'); item.setAttribute('aria-pressed', 'false'); });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      const definition = DRAKKEN_PROCESS_REGISTRY[this.selectedProcess];
      this.must<HTMLInputElement>('intensity').value = String(definition.defaultIntensity);
      this.must<HTMLInputElement>('radius').value = String(definition.defaultRadius);
      this.updateOutputs();
      this.updateTargetingForSelectedCell();
    }));

    for (const id of ['intensity', 'radius']) this.must(id).addEventListener('input', () => this.updateOutputs());

    this.must('placement').addEventListener('click', () => {
      this.placement = !this.placement;
      const button = this.must('placement');
      button.classList.toggle('active', this.placement);
      button.setAttribute('aria-pressed', String(this.placement));
      button.textContent = this.placement ? 'PLACEMENT ARMED' : 'INSPECTION MODE';
      this.must('modechip').textContent = this.placement ? 'PLACEMENT' : 'INSPECTION';
      this.updateTargetingForSelectedCell();
    });

    this.must('play').addEventListener('click', () => {
      this.playing = !this.playing;
      this.must('play').textContent = this.playing ? 'PAUSE' : 'PLAY';
      this.updateTargetingForSelectedCell();
    });
    this.must<HTMLSelectElement>('speed').addEventListener('change', () => { this.speed = Number(this.must<HTMLSelectElement>('speed').value); });
    this.must<HTMLInputElement>('timeline').addEventListener('change', () => {
      this.playing = false;
      this.must('play').textContent = 'PLAY';
      this.engine.restore(Number(this.must<HTMLInputElement>('timeline').value));
      this.updateTargetingForSelectedCell();
      this.invalidateUiCaches();
      this.renderer.markDirty();
      this.refresh(true);
    });
    this.must('fork').addEventListener('click', () => {
      if (!this.engine.branches.has('B')) this.engine.fork('B');
      this.updateTargetingForSelectedCell();
      this.invalidateUiCaches();
      this.renderer.markDirty();
      this.refresh(true);
    });
    this.must('switchA').addEventListener('click', () => this.switchBranch('A'));
    this.must('switchB').addEventListener('click', () => { if (this.engine.branches.has('B')) this.switchBranch('B'); });
    this.must('camera').addEventListener('click', () => this.focusPlanet());
    this.must('system-view').addEventListener('click', () => this.renderer.systemView());
    this.must('focus-body').addEventListener('click', () => this.focusSelectedBody());
    this.must('viewport').addEventListener('keydown', this.onViewportKeydown);

    this.root.querySelectorAll<HTMLButtonElement>('[data-layer]').forEach(button => button.addEventListener('click', () => {
      this.root.querySelectorAll('[data-layer]').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      this.currentLayer = button.dataset.layer as LayerId;
      this.renderer.setLayer(this.currentLayer);
      this.must('layerlegend').textContent = LAYER_LEGENDS[this.currentLayer];
    }));
  }

  private toggleControls(force?: boolean): void {
    this.controlsOpen = force ?? !this.controlsOpen;
    if (!this.controlsOpen) this.activeFamily = null;
    this.syncControlChrome();
  }

  private openFamily(family: ControlFamily): void {
    this.controlsOpen = true;
    this.activeFamily = family;
    this.syncControlChrome();
  }

  private syncControlChrome(): void {
    const launcher = this.must<HTMLButtonElement>('lab-controls-launcher');
    launcher.setAttribute('aria-expanded', String(this.controlsOpen));
    this.must('lab-controls-menu').hidden = !this.controlsOpen;
    for (const family of CONTROL_FAMILIES) {
      const selected = this.controlsOpen && this.activeFamily === family;
      this.must(`family-${family}`).hidden = !selected;
      const tab = this.root.querySelector(`[data-family="${family}"]`);
      tab?.setAttribute('aria-selected', String(selected));
      tab?.classList.toggle('active', selected);
    }
  }

  private readonly onDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      if (this.controlsOpen) { event.preventDefault(); this.toggleControls(false); return; }
      if (this.selectedBodyId) { event.preventDefault(); this.focusPlanet(); }
      return;
    }
    if ((event.key === 'f' || event.key === 'F') && !isEditableTarget(event.target) && this.selectedBodyId) {
      event.preventDefault();
      this.focusSelectedBody();
    }
  };

  private loop = (now: number): void => {
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    if (this.playing) {
      this.accumulator = Math.min(MAX_CATCH_UP_STEPS, this.accumulator + dt * this.speed * BASE_TICKS_PER_SECOND);
      let steps = 0;
      const simStart = performance.now();
      while (this.accumulator >= 1 && steps < MAX_CATCH_UP_STEPS) {
        this.engine.step();
        this.accumulator -= 1;
        steps++;
      }
      if (steps) {
        this.simStepMs = (performance.now() - simStart) / steps;
        this.renderer.markDirty();
        this.refreshLight();
      }
    }
    this.renderer.render();
    this.telemetryTimer += dt;
    if (this.telemetryTimer > 0.25) { this.telemetryTimer = 0; this.refresh(); }
    this.frameCounter++;
    if (now - this.fpsClock >= 1000) {
      this.fps = this.frameCounter * 1000 / (now - this.fpsClock);
      this.frameCounter = 0;
      this.fpsClock = now;
    }
    this.frameId = requestAnimationFrame(this.loop);
  };

  private reset(): void {
    const seedInput = this.must<HTMLInputElement>('seed');
    const seed = parsePlanetSeed(seedInput.value);
    seedInput.value = String(seed);
    this.playing = false;
    this.accumulator = 0;
    this.last = performance.now();
    this.must('play').textContent = 'PLAY';
    const timeline = this.must<HTMLInputElement>('timeline');
    timeline.min = '0'; timeline.max = '0'; timeline.value = '0';
    this.engine = new SimulationEngine(seed);
    this.renderer.dispose();
    this.renderer = new LaboratoryRenderer(this.must('viewport'), this.engine);
    this.configureRenderer();
    this.currentLayer = 'normal';
    this.root.querySelectorAll<HTMLButtonElement>('[data-layer]').forEach(button => {
      const active = button.dataset.layer === 'normal';
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    this.must('layerlegend').textContent = LAYER_LEGENDS.normal;
    this.invalidateUiCaches();
    this.selectedBodyId = null;
    this.renderer.setSelectedBody(null);
    this.renderer.setSelected(this.selectedCell);
    this.updateTargetingForSelectedCell();
    this.refresh(true);
  }

  private configureRenderer(): void {
    this.renderer.onCellPick = (index, lat, lon) => this.activateCell(index, lat, lon);
    this.renderer.onCellHover = (index, lat, lon) => {
      if (!this.targetingOverride) this.must('targeting').textContent = this.targetingText(index, lat, lon);
    };
    this.renderer.onCelestialPick = id => this.selectCelestial(id);
    this.renderer.onCelestialHover = id => {
      if (!this.targetingOverride) this.must('targeting').textContent = `CELESTIAL · ${this.celestialName(id)}`;
    };
  }

  private selectCelestial(id: string): void {
    this.selectedBodyId = id;
    this.renderer.setSelectedBody(id);
    this.must<HTMLButtonElement>('focus-body').disabled = false;
    this.targetingOverride = true;
    this.must('targeting').textContent = `SELECTED · ${this.celestialName(id)}`;
    this.refreshInspector(true);
  }

  private focusPlanet(): void {
    this.selectedBodyId = null;
    this.renderer.setSelectedBody(null);
    this.must<HTMLButtonElement>('focus-body').disabled = true;
    this.renderer.resetCamera();
    this.updateTargetingForSelectedCell();
    this.refreshInspector(true);
  }

  private focusSelectedBody(): void {
    if (!this.selectedBodyId) return;
    this.renderer.setFocus(this.selectedBodyId);
  }

  private celestialName(id: string): string {
    return (this.renderer.celestialPose(id)?.name ?? id).toUpperCase();
  }

  private activateCell(index: number, lat: number, lon: number): void {
    if (!this.placement) { this.selectCell(index); return; }
    if (!this.engine.canMutateAt()) {
      this.targetingOverride = true;
      this.must('targeting').textContent = `HISTORY LOCKED · ${this.engine.state.branchId} EDITS BEGIN TICK ${this.engine.editableFromTick()}`;
      return;
    }
    this.engine.deploy(this.selectedProcess, lat, lon, this.num('radius'), this.num('intensity'));
    this.hideQuickStart();
    this.invalidateUiCaches();
    this.targetingOverride = true;
    this.must('targeting').textContent = `${display(this.selectedProcess).toUpperCase()} DEPLOYED · TICK ${this.engine.state.tick} · PRESS PLAY`;
    this.refresh(true);
  }

  private onViewportKeydown = (event: KeyboardEvent): void => {
    if (isGridNavigationKey(event.key)) {
      event.preventDefault();
      this.selectCell(moveGridSelection(this.selectedCell, event.key));
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const { lat, lon } = cellToLatLon(this.selectedCell);
      this.activateCell(this.selectedCell, lat, lon);
    }
  };

  private switchBranch(id: string): void {
    this.engine.switchBranch(id);
    this.updateTargetingForSelectedCell();
    this.invalidateUiCaches();
    this.renderer.markDirty();
    this.refresh(true);
  }

  private selectCell(index: number): void {
    this.selectedCell = index;
    this.renderer.setSelected(index);
    this.updateTargetingForSelectedCell();
    this.refreshInspector(true);
  }

  private updateTargetingForSelectedCell(): void {
    this.targetingOverride = false;
    const { lat, lon } = cellToLatLon(this.selectedCell);
    this.must('targeting').textContent = this.targetingText(this.selectedCell, lat, lon);
  }

  private targetingText(index: number, lat: number, lon: number): string {
    const mode = this.placement ? `PLACEMENT · ${display(this.selectedProcess).toUpperCase()}` : 'INSPECT';
    return `${mode} · ${lat.toFixed(1)}° / ${lon.toFixed(1)}° · CELL ${index}`;
  }

  private updateOutputs(): void {
    this.must('intensityOut').textContent = this.num('intensity').toFixed(2);
    this.must('radiusOut').textContent = `${this.num('radius').toFixed(0)}°`;
  }

  private refreshLight(): void {
    const timeline = this.must<HTMLInputElement>('timeline');
    timeline.max = String(Math.max(Number(timeline.max), this.engine.state.tick));
    timeline.value = String(this.engine.state.tick);
    this.must('tickout').textContent = `TICK ${this.engine.state.tick}`;
  }

  private refresh(force = false): void {
    this.refreshLight();
    this.refreshBranchControls();
    this.refreshStatusline();
    this.refreshInspector(force);
    this.refreshCelestialInspect();
    this.refreshStatePanels(force);
    this.refreshInstances(force);
    this.refreshEvents(force);
    this.refreshComparison();
  }

  private refreshStatusline(): void {
    const state = this.engine.state;
    const stateKey = `${state.branchId}:${state.tick}`;
    if (stateKey !== this.hashCacheKey) {
      this.hashCacheKey = stateKey;
      this.hashCache = this.engine.hash();
    }
    const active = [...this.engine.processes.values()].filter(process => process.active).length;
    this.must('statusline').innerHTML = [
      ['SEED', state.seed], ['TICK', state.tick], ['BRANCH', state.branchId], ['HASH', this.hashCache],
      ['FPS', this.fps.toFixed(0)], ['STEP', `${this.simStepMs.toFixed(2)}ms`], ['ACTIVE', active]
    ].map(([key, value]) => `<span>${key}<b>${value}</b></span>`).join('');
  }

  private refreshBranchControls(): void {
    const state = this.engine.state;
    const hasBranchB = this.engine.branches.has('B');
    this.must<HTMLButtonElement>('fork').disabled = hasBranchB;
    this.must<HTMLButtonElement>('switchB').disabled = !hasBranchB;
    for (const id of ['A', 'B'] as const) {
      const button = this.must<HTMLButtonElement>(`switch${id}`);
      const active = state.branchId === id;
      button.classList.toggle('active-branch', active);
      button.setAttribute('aria-pressed', String(active));
    }
    const comparisonButton = this.root.querySelector<HTMLButtonElement>('[data-layer="comparison"]');
    if (comparisonButton) comparisonButton.disabled = !hasBranchB;
  }

  private refreshCelestialInspect(): void {
    const panel = this.must('celestial-inspect');
    const pose = this.selectedBodyId ? this.renderer.celestialPose(this.selectedBodyId) : null;
    if (!pose) {
      panel.innerHTML = '<span>OBJECT TYPE<b>NONE</b></span><span>OBJECT ID<b>—</b></span>';
      return;
    }
    panel.innerHTML = [
      ['OBJECT TYPE', pose.kind.toUpperCase()],
      ['OBJECT ID', pose.id],
      ['ORBITAL RADIUS', pose.orbitRadius.toFixed(3)],
      ['CURRENT PHASE', pose.phase.toFixed(4)],
      ['DISTANCE FROM PRIMARY', pose.distanceFromPrimary.toFixed(3)]
    ].map(([key, value]) => `<span>${key}<b>${value}</b></span>`).join('');
  }

  private refreshInspector(force = false): void {
    const state = this.engine.state;
    const key = `${state.branchId}:${state.tick}:${this.selectedCell}:${this.selectedBodyId ?? ''}`;
    if (!force && key === this.inspectorRenderKey) return;
    this.inspectorRenderKey = key;
    const cell = this.engine.selectedCell(this.selectedCell);
    const coordinates = cellToLatLon(this.selectedCell);
    this.must('inspector').innerHTML = `<div class="metric-grid"><span>COORDINATES<b>${coordinates.lat.toFixed(1)}° / ${coordinates.lon.toFixed(1)}°</b></span>${Object.entries(cell).map(([field, value]) => `<span>${label(field)}<b>${typeof value === 'number' ? fmt(value) : value}</b></span>`).join('')}</div>`;
  }

  private refreshStatePanels(force = false): void {
    const state = this.engine.state;
    const key = `${state.branchId}:${state.tick}`;
    if (!force && key === this.ledgerRenderKey) return;
    this.ledgerRenderKey = key;
    const metrics = this.engine.metrics();
    const ledger = this.engine.ledger();
    const gorevault = state.gorevault;
    const orbital = state.orbital;
    this.must('ledger').innerHTML = [
      ['WATER MASS', metrics.waterMass], ['WATER DRIFT', metrics.waterDrift], ['CONVERTIBLE REMAINING', metrics.convertibleRemaining],
      ['ENV RESIDUE', ledger.environmentalResidueMass], ['HARVESTED', gorevault.totalHarvested], ['PIPELINE ACCOUNTED', ledger.pipelineAccounted],
      ['PIPELINE ERROR', ledger.pipelineError], ['SYSTEM ERROR', ledger.systemError], ['REFINED FEEDSTOCK', gorevault.refinedFeedstock],
      ['RISING MATERIAL', orbital.risingMaterial], ['ORBITAL LOOSE', orbital.orbitalLooseMaterial], ['SHAPED BAND', orbital.shapedBandMaterial],
      ['BAND COVERAGE', orbital.bandCoverage], ['BAND INTEGRITY', orbital.bandIntegrity]
    ].map(([keyName, value]) => `<span>${keyName}<b>${fmt(Number(value))}</b></span>`).join('');
  }

  private refreshInstances(force = false): void {
    const state = this.engine.state;
    const gorevault = state.gorevault;
    const orbital = state.orbital;
    const historyEditable = this.engine.canMutateAt();
    const processes = [...this.engine.processes.values()];
    const signature = `${state.branchId}:${state.tick}:${historyEditable}:${processes.map(process => `${process.id}:${process.active}`).join('|')}:${gorevault.refinedFeedstock.toFixed(6)}:${(orbital.queuedForLift + orbital.risingMaterial + orbital.orbitalLooseMaterial).toFixed(6)}`;
    if (!force && signature === this.instancesRenderKey) return;
    this.instancesRenderKey = signature;
    this.must('instances').innerHTML = processes.map(process => `
      <div><b>${display(process.processId)}</b><span>${process.id} · ${processStatus(process.processId, process.active, gorevault.refinedFeedstock, orbital.queuedForLift + orbital.risingMaterial + orbital.orbitalLooseMaterial)}</span><button data-toggle="${process.id}" ${historyEditable ? '' : 'disabled'}>${process.active ? 'DEACTIVATE' : 'ACTIVATE'}</button></div>`).join('') || '<p>NO DEPLOYED PROCESS INSTANCES</p>';
    this.root.querySelectorAll<HTMLButtonElement>('[data-toggle]').forEach(button => button.addEventListener('click', () => {
      const process = this.engine.processes.get(button.dataset.toggle!);
      if (!process) return;
      this.engine.setProcessActive(process.id, !process.active);
      this.invalidateUiCaches();
      this.refresh(true);
    }));
  }

  private refreshEvents(force = false): void {
    const state = this.engine.state;
    const visible = this.engine.timelineEvents(state.branchId, state.tick).slice(-7);
    const key = `${state.branchId}:${state.tick}:${visible.map(event => `${event.tick}:${event.type}`).join('|')}`;
    if (!force && key === this.eventsRenderKey) return;
    this.eventsRenderKey = key;
    this.must('events').innerHTML = visible.map(event => `<span><b>${event.tick}</b>${event.type}</span>`).join('') || '<span>NO EVENTS YET · DEPLOY A PROCESS TO BEGIN</span>';
  }

  private refreshComparison(): void {
    const state = this.engine.state;
    if (!this.engine.branches.has('B')) {
      this.must('compare').innerHTML = '<p class="empty-copy">Fork Branch B to compare deterministic futures from one shared past.</p>';
      this.renderer.setComparisonState(null);
      this.comparisonCacheKey = '';
      this.comparisonDelta = null;
      return;
    }
    const tick = state.tick;
    const other = state.branchId === 'A' ? 'B' : 'A';
    const key = `${state.branchId}:${other}:${tick}`;
    if (key !== this.comparisonCacheKey || !this.comparisonDelta) {
      const comparison = this.engine.compare('A', 'B', tick);
      this.comparisonDelta = comparison.delta;
      this.renderer.setComparisonState(this.engine.captureState(other, tick));
      this.comparisonCacheKey = key;
    }
    const delta = this.comparisonDelta;
    this.must('compare').innerHTML = `<p class="compare-note">A/B DELTA · crimson = active branch more transformed · azure = comparison branch more transformed</p><div class="metric-grid">${(['oceanCoverage', 'biosphereRemaining', 'averageCrustIntegrity', 'populationRemaining', 'refinedFeedstock', 'orbitalMaterial', 'bandCoverage'] as const).map(metric => `<span>${label(metric)}<b>${fmt(delta[metric])}</b></span>`).join('')}</div>`;
  }

  private hideQuickStart(): void {
    if (!this.quickStartVisible) return;
    this.quickStartVisible = false;
    this.must('quickstart').hidden = true;
  }

  private invalidateUiCaches(): void {
    this.comparisonCacheKey = '';
    this.comparisonDelta = null;
    this.hashCacheKey = '';
    this.ledgerRenderKey = '';
    this.inspectorRenderKey = '';
    this.instancesRenderKey = '';
    this.eventsRenderKey = '';
  }

  private num(id: string): number { return Number(this.must<HTMLInputElement>(id).value); }
  private must<T extends HTMLElement = HTMLElement>(id: string): T {
    const element = this.root.querySelector<T>(`#${id}`);
    if (!element) throw new Error(`Missing #${id}`);
    return element;
  }

  dispose(): void {
    cancelAnimationFrame(this.frameId);
    document.removeEventListener('keydown', this.onDocumentKeydown);
    this.must('viewport').removeEventListener('keydown', this.onViewportKeydown);
    this.renderer.dispose();
  }
}

const LAYER_LEGENDS: Record<LayerId, string> = {
  normal: 'NORMAL · terrain / water / vegetation / transformation',
  crust: 'CRUST · integrity / stress / fracture',
  hydrology: 'HYDROLOGY · surface water mass',
  atmosphere: 'ATMOSPHERE · humidity / aerosols',
  biosphere: 'BIOSPHERE · vegetation / microbes / animals',
  feedstock: 'FEEDSTOCK · harvestable matter / processing state',
  drakken: 'DRAKKEN · active process influence',
  provenance: 'PROVENANCE · latest major causal source',
  comparison: 'COMPARISON · crimson active-branch transformation / azure comparison-branch transformation'
};

function display(id: ProcessId): string { return DRAKKEN_PROCESS_REGISTRY[id].displayName; }
function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target.isContentEditable;
}
function fmt(value: number): string { return Math.abs(value) >= 100 ? value.toFixed(1) : value.toFixed(4); }
function label(value: string): string { return value.replace(/([A-Z])/g, ' $1').replace(/^./, char => char.toUpperCase()).toUpperCase(); }
