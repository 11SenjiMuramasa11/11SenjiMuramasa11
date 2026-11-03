(function () {
  "use strict";

  const data = window.PORTFOLIO;
  if (!data) return;

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  const escapeHTML = (value) =>
    String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const icon = (name) =>
    `<svg viewBox="0 0 20 20" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

  const setText = (field, value) => {
    $$(`[data-field="${field}"]`).forEach((node) => {
      node.textContent = value == null ? "" : String(value);
    });
  };

  const hide = (node) => {
    if (node) node.hidden = true;
  };

  const show = (node) => {
    if (node) node.hidden = false;
  };

  /* --------------------------------------------------------------
     Identity
  -------------------------------------------------------------- */

  const identity = data.identity || {};

  setText("name", identity.name);
  setText("alias", identity.alias);
  setText("role", identity.role);
  setText("signature", identity.signature);
  setText("bio", identity.bio);
  setText("handle", "@" + (identity.handle || ""));
  setText("projectsBuilt", identity.projectsBuilt);

  const joinedAt = identity.githubJoined ? Date.parse(identity.githubJoined) : NaN;
  if (!Number.isNaN(joinedAt)) {
    const daysActive = Math.max(1, Math.floor((Date.now() - joinedAt) / 86400000));
    setText("daysActive", daysActive.toLocaleString("en-US"));
  }

  const avatar = $("[data-avatar]");
  if (avatar && identity.avatar) {
    avatar.src = identity.avatar;
    avatar.alt = `GitHub avatar of ${identity.name || "the portfolio owner"}`;
  }

  $$('[data-link="github"]').forEach((link) => {
    if (identity.github) {
      link.href = identity.github;
      link.target = "_blank";
      link.rel = "noreferrer";
    } else {
      hide(link);
    }
  });

  const emailLinks = $$('[data-link="email"]');
  if (identity.email) {
    setText("email", identity.email);
    emailLinks.forEach((link) => {
      link.href = "mailto:" + identity.email;
      show(link);
    });
  } else {
    emailLinks.forEach(hide);
  }

  const resumeLink = $('[data-link="resume"]');
  if (resumeLink) {
    if (identity.resume) {
      resumeLink.href = identity.resume;
      show(resumeLink);
    } else {
      hide(resumeLink);
    }
  }

  /* --------------------------------------------------------------
     Stats and developer ledger
  -------------------------------------------------------------- */

  const statStrip = $("#stat-strip");
  if (statStrip) {
    statStrip.innerHTML = (data.stats || [])
      .map(
        (stat, index) => `
          <div class="stat" style="--i:${index + 1}">
            <strong>${escapeHTML(stat.value)}</strong>
            <span>${escapeHTML(stat.label)}</span>
          </div>`
      )
      .join("");
  }

  const ledger = $("#ledger");
  if (ledger) {
    ledger.innerHTML = (data.ledger || [])
      .map(
        (row) => `
          <div class="ledger-row">
            <span class="ledger-icon" aria-hidden="true">${icon(row.icon || "star")}</span>
            <dt>${escapeHTML(row.label)}</dt>
            <dd>${escapeHTML(row.value)}</dd>
          </div>`
      )
      .join("");
  }

  /* --------------------------------------------------------------
     Skills
  -------------------------------------------------------------- */

  const skillGrid = $("#skill-grid");
  if (skillGrid) {
    skillGrid.innerHTML = (data.skills || [])
      .map(
        (skill, index) => `
          <button class="namecard-tile" type="button" data-detail="skill" data-id="${escapeHTML(skill.id)}" aria-label="Open ${escapeHTML(skill.label)} details" style="--i:${index + 4}">
            <span class="namecard-tile__art">
              <svg viewBox="0 0 200 120" aria-hidden="true"><use href="#art-${escapeHTML(skill.art)}"></use></svg>
            </span>
            <span class="namecard-tile__label">${escapeHTML(skill.label)}</span>
          </button>`
      )
      .join("");
  }

  /* --------------------------------------------------------------
     Projects
  -------------------------------------------------------------- */

  const projectGrid = $("#project-grid");
  if (projectGrid) {
    const cards = (data.projects || [])
      .map(
        (project, index) => `
          <button class="project-card" type="button" data-detail="project" data-id="${escapeHTML(project.id)}" aria-label="Open ${escapeHTML(project.title)} details" style="--i:${index + 3}">
            <span class="project-card__art">
              <svg viewBox="0 0 200 120" aria-hidden="true"><use href="#art-${escapeHTML(project.art)}"></use></svg>
            </span>
            <span class="project-card__body">
              <span class="project-card__meta">${escapeHTML(project.type)}<i aria-hidden="true"></i>${escapeHTML(project.year)}</span>
              <span class="project-card__title">${escapeHTML(project.title)}</span>
              <span class="project-card__summary">${escapeHTML(project.summary)}</span>
              <span class="chip-row">
                ${(project.stack || [])
                  .map((item) => `<span class="chip">${escapeHTML(item)}</span>`)
                  .join("")}
              </span>
            </span>
          </button>`
      )
      .join("");

    const archiveCard = identity.github
      ? `
        <a class="project-card project-card--plus" href="${escapeHTML(identity.github)}" target="_blank" rel="noreferrer" aria-label="Browse more repositories on GitHub">
          <span class="plus-mark" aria-hidden="true">${icon("plus")}</span>
          <strong>More on GitHub</strong>
          <span>Browse the full archive</span>
        </a>`
      : "";

    projectGrid.innerHTML = cards + archiveCard;
  }

  const logList = $("#log-list");
  if (logList) {
    logList.innerHTML = (data.log || [])
      .map(
        (entry, index) => `
          <li style="--i:${index + 7}">
            <time>${escapeHTML(entry.date)}</time>
            <strong>${escapeHTML(entry.title)}</strong>
            <p>${escapeHTML(entry.text)}</p>
          </li>`
      )
      .join("");
  }

  /* --------------------------------------------------------------
     Tabs
  -------------------------------------------------------------- */

  const tablist = $(".tablist");
  const tabs = $$('[role="tab"]');
  const panels = $$('[role="tabpanel"]');
  const tabShell = $(".tab-shell");

  const activateTab = (id, options) => {
    const opts = Object.assign(
      { focus: false, updateHash: true, scroll: false },
      options || {}
    );
    const targetTab = tabs.find((tab) => tab.getAttribute("aria-controls") === "panel-" + id);
    if (!targetTab) return;

    tabs.forEach((tab) => {
      const active = tab === targetTab;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel.id === "panel-" + id;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    if (tablist) {
      tablist.dataset.active = String(tabs.indexOf(targetTab));
    }

    if (opts.updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + id);
    }

    if (opts.focus) {
      targetTab.focus({ preventScroll: true });
    }

    if (opts.scroll && tabShell) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.requestAnimationFrame(() => {
        tabShell.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start"
        });
      });
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      const id = tab.getAttribute("aria-controls").replace("panel-", "");
      activateTab(id, { focus: false, updateHash: true });
    });

    tab.addEventListener("keydown", (event) => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();

      let next = index;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;

      const id = tabs[next].getAttribute("aria-controls").replace("panel-", "");
      activateTab(id, { focus: true, updateHash: true });
    });
  });

  $$('[data-tab-target]').forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-tab-target");
      const isSmall = window.matchMedia("(max-width: 900px)").matches;
      activateTab(id, { focus: true, updateHash: true, scroll: isSmall });
    });
  });

  const initial = window.location.hash.replace("#", "");
  activateTab(initial === "projects" ? "projects" : "namecard", { updateHash: false });

  /* --------------------------------------------------------------
     Detail dialog
  -------------------------------------------------------------- */

  const dialog = $("#detail-dialog");
  const dialogArt = $("#detail-art");
  const dialogKicker = $("#detail-kicker");
  const dialogTitle = $("#detail-title");
  const dialogSummary = $("#detail-summary");
  const dialogChips = $("#detail-chips");
  const dialogList = $("#detail-list");
  const dialogNote = $("#detail-note");
  const dialogLink = $("#detail-link");
  let opener = null;

  const findDetail = (type, id) => {
    if (type === "skill") {
      return (data.skills || []).find((skill) => skill.id === id);
    }
    return (data.projects || []).find((project) => project.id === id);
  };

  const openDetail = (type, id) => {
    const item = findDetail(type, id);
    if (!item || !dialog) return;

    opener = document.activeElement;

    dialogArt.innerHTML = `<svg viewBox="0 0 200 120" aria-hidden="true"><use href="#art-${escapeHTML(item.art)}"></use></svg>`;
    dialogTitle.textContent = type === "skill" ? item.label : item.title;
    dialogSummary.textContent =
      type === "skill" ? item.description : item.description;
    dialogChips.innerHTML = "";
    dialogList.innerHTML = "";
    dialogLink.hidden = true;

    if (type === "skill") {
      dialogKicker.textContent = "Skill · " + item.tag;
      dialogChips.innerHTML = `<span class="chip">${escapeHTML(item.tag)}</span>`;
      (item.usedIn || []).forEach((project) => {
        const li = document.createElement("li");
        li.textContent = "Used in " + project;
        dialogList.appendChild(li);
      });
      dialogNote.textContent = "Part of the current developer toolkit.";
    } else {
      dialogKicker.textContent = item.type + " · " + item.year;
      dialogSummary.textContent = item.description;
      (item.stack || []).forEach((tech) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = tech;
        dialogChips.appendChild(chip);
      });
      (item.highlights || []).forEach((highlight) => {
        const li = document.createElement("li");
        li.textContent = highlight;
        dialogList.appendChild(li);
      });
      dialogNote.textContent = item.note || "";

      if (item.repo) {
        dialogLink.href = item.repo;
        dialogLink.hidden = false;
      }
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    document.documentElement.classList.add("dialog-open");
    const closeButton = $(".detail-close", dialog);
    if (closeButton) closeButton.focus({ preventScroll: true });
  };

  const closeDetail = () => {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      document.documentElement.classList.remove("dialog-open");
      if (opener && typeof opener.focus === "function") opener.focus();
    }
  };

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDetail();
    });

    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("dialog-open");
      if (opener && typeof opener.focus === "function") {
        opener.focus({ preventScroll: true });
      }
    });

    const closeButton = $(".detail-close", dialog);
    if (closeButton) closeButton.addEventListener("click", closeDetail);
  }

  document.addEventListener("click", (event) => {
    const card = event.target.closest("[data-detail]");
    if (!card) return;
    openDetail(card.getAttribute("data-detail"), card.getAttribute("data-id"));
  });

  /* --------------------------------------------------------------
     Small quality-of-life details
  -------------------------------------------------------------- */

  const yearNodes = $$("[data-current-year]");
  yearNodes.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
