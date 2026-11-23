export function Diamond({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 0 12 6 6 12 0 6Z" fill="currentColor" />
    </svg>
  );
}

export function Emblem({ name, className = "" }) {
  const paths = {
    tower: (
      <>
        <path d="M6 21V10l3-1V6l3 2 3-2v3l3 1v11" />
        <path d="M9 21v-4h6v4M4 21h16" />
      </>
    ),
    wings: (
      <>
        <path d="M12 20c-3-3-5-5-5-8 0-2 1-4 3-4 1.4 0 2 1 2 2 0-1 .6-2 2-2 2 0 3 2 3 4 0 3-2 5-5 8Z" />
        <path d="M7 8C5 6 3 6 2 7c1 3 3 5 5 6M17 8c2-2 4-2 5-1-1 3-3 5-5 6" />
      </>
    ),
    sigil: (
      <>
        <path d="M12 3 19 7v6c0 4-3 7-7 8-4-1-7-4-7-8V7Z" />
        <path d="M12 8v7M9 11h6" />
      </>
    ),
    scales: (
      <>
        <path d="M12 3v18M6 21h12M5 8h14M12 6l-7 2 2 5h10l2-5Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 19 6v6c0 4-3 7-7 9-4-2-7-5-7-9V6Z" />
        <path d="m8.5 12 2.5 2.5L16 10" />
      </>
    ),
  };
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.sigil}
    </svg>
  );
}

export function Arrow({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mail({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <rect x="1.8" y="3.4" width="12.4" height="9.2" />
      <path d="m2.4 4 5.6 4.6L13.6 4" />
    </svg>
  );
}

export function Github({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

export function Linkedin({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.6 1.8a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM2.2 6h2.8v8H2.2V6Zm4.6 0h2.7v1.1h.04c.38-.72 1.3-1.48 2.68-1.48 2.86 0 3.39 1.88 3.39 4.33V14h-2.8V10.5c0-.83-.02-1.9-1.16-1.9-1.16 0-1.34.9-1.34 1.84V14H6.8V6Z" />
    </svg>
  );
}

export function Copy({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <rect x="5.5" y="5.5" width="8" height="8" />
      <path d="M10.5 5.5v-3h-8v8h3" />
    </svg>
  );
}

export function Check({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4 13 5 5L20 6" />
    </svg>
  );
}

