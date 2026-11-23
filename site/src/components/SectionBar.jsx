import { Emblem } from "./icons.jsx";

export default function SectionBar({ id, title, meta, emblem = "sigil" }) {
  return (
    <div className="wrap">
      <div className="secbar">
        <span className="secbar__emblem" aria-hidden="true">
          <Emblem name={emblem} />
        </span>
        <h2 className="secbar__title" id={id}>
          {title}
        </h2>
        <span className="secbar__rule" aria-hidden="true" />
        <span className="secbar__meta">{meta}</span>
      </div>
    </div>
  );
}
