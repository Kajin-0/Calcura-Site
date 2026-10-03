import { CalcuraIntegralMark } from './Icons.jsx';

export default function Logo({ href = '/', className = '' }) {
  return (
    <a className={`brand${className ? ` ${className}` : ''}`} href={href} aria-label="Calcura home">
      <span className="brand-mark" aria-hidden="true">
        <CalcuraIntegralMark weight={28} />
      </span>
      <span className="brand-name" aria-hidden="true">calcura</span>
    </a>
  );
}
