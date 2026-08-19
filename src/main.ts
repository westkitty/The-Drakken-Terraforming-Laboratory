import './styles.css';
import { installBrowserDiagnostics } from './browserDiagnostics';
import { LaboratoryApp } from './ui/LaboratoryApp';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Application root missing');
const app = new LaboratoryApp(root);
const diagnosticsEnabled = new URLSearchParams(window.location.search).get('diagnostics') === '1';
const removeDiagnostics = diagnosticsEnabled ? installBrowserDiagnostics(app) : () => {};
window.addEventListener('beforeunload', () => {
  removeDiagnostics();
  app.dispose();
}, { once: true });
