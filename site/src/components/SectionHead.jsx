export default function SectionHead({ id, number, label, title, sub }) {
  return (
    <div className="section__head">
      <p className="section__label">
        <i aria-hidden="true" />
        {number} <em>/</em> {label}
      </p>
      <h2 className="section__title" id={id}>
        {title}
      </h2>
      {sub && <p className="section__sub">{sub}</p>}
      <div className="section__rule" aria-hidden="true">
        <span />
        <i />
      </div>
    </div>
  );
}
