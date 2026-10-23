import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import { pageFromPath } from './routes';
import './index.css';

const root = document.getElementById('root')!;
const app = <App initialPage={pageFromPath(window.location.pathname)} />;

// Built pages arrive prerendered (scripts/prerender.tsx); the dev server serves an empty root.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
