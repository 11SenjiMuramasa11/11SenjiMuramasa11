import markdown
from pathlib import Path

root = Path(__file__).resolve().parents[1]
src = (root / "README.md").read_text(encoding="utf-8")
body = markdown.markdown(src, extensions=["tables", "md_in_html"])

vendor = root / "src" / "vendor"
light = (vendor / "github-markdown-light.css").read_text(encoding="utf-8")
dark = (vendor / "github-markdown-dark.css").read_text(encoding="utf-8")

html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GitHub profile preview</title>
<style>{light}</style>
<style>@media (prefers-color-scheme: dark) {{
{dark}
}}</style>
<style>
  html {{ background: #ffffff; }}
  @media (prefers-color-scheme: dark) {{ html {{ background: #0d1117; }} }}
  body {{ margin: 0; }}
  .markdown-body {{
    box-sizing: border-box;
    min-width: 200px;
    max-width: 846px;
    margin: 0 auto;
    padding: 32px 0 64px;
    background: var(--bgColor-default);
  }}
  .markdown-body img {{ background: transparent; }}
  @media (max-width: 600px) {{
    .markdown-body {{ padding: 24px 16px 48px; }}
  }}
</style></head>
<body><article class="markdown-body">{body}</article></body></html>"""

(root / "preview.html").write_text(html, encoding="utf-8")
print("wrote", root / "preview.html")
