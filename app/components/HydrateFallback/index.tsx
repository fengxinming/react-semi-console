import './style.styl';
import { useTranslation } from 'react-i18next';

import '~/i18n';

export default function HydrateFallback() {
  const { t } = useTranslation();

  return (
    <div className="hf-stage" role="status">
      <div className="hf-panel">
        <svg
          className="hf-emblem"
          width="180"
          height="180"
          viewBox="0 0 120 120"
          fill="none"
          role="img"
          aria-label={t('common.loading')}
        >
          <defs>
            <linearGradient id="hf-beam" x1="0" y1="0" x2="1" y2="1">
              <stop className="hf-stop-start" offset="0%" />
              <stop className="hf-stop-end" offset="100%" />
            </linearGradient>
          </defs>
          <g className="hf-ring" aria-hidden="true">
            <circle cx="60" cy="60" r="54" />
          </g>
          <path
            className="hf-hex-base"
            d="M112 60 L86 105 L34 105 L8 60 L34 15 L86 15 Z"
            strokeWidth="2"
            strokeLinejoin="round"
            aria-hidden="true"
          />
          <path
            className="hf-hex-trace"
            d="M112 60 L86 105 L34 105 L8 60 L34 15 L86 15 Z"
            strokeWidth="3"
            strokeLinejoin="round"
            pathLength={100}
            aria-hidden="true"
          />
          <path
            className="hf-hex-sweep"
            d="M112 60 L86 105 L34 105 L8 60 L34 15 L86 15 Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
            pathLength={100}
            aria-hidden="true"
          />
          <circle className="hf-core" cx="60" cy="60" r="3" aria-hidden="true" />
          <path
            className="hf-mark"
            d="M40 78 L60 42 L80 78"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            aria-hidden="true"
          />
        </svg>
        <div className="hf-copy" aria-hidden="true">
          <p className="hf-title">{t('common.brand')}</p>
          <p className="hf-sub">{t('common.initializing')}</p>
        </div>
        <div className="hf-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hf-track" aria-hidden="true">
          <div className="hf-bar" />
        </div>
      </div>
    </div>
  );
}
