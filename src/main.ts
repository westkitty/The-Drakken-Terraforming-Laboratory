import './styles.css';
import { LaboratoryApp } from './ui/LaboratoryApp';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Application root missing');
const app = new LaboratoryApp(root);
window.addEventListener('beforeunload', () => app.dispose(), { once: true });
