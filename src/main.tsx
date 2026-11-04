import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// 한글 글꼴은 굵기마다 CSS가 커서 두 굵기만 쓴다(500은 400, 700은 600으로 보임).
import '@fontsource/ibm-plex-sans-kr/400.css';
import '@fontsource/ibm-plex-sans-kr/600.css';
import '@fontsource/ibm-plex-mono/600.css';
import './styles.css';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
