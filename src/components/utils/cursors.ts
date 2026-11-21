// Collaborator cursors shared by the load intro and the per-section builds.

// Playback rate for every cursor build animation (1 = original pace).
export const CURSOR_SPEED = 1.5;

export const CURSORS = [
  { name: "Zaid", color: "#a9c4ec" },
  { name: "Designer", color: "#f472b6" },
  { name: "Frontend", color: "#60a5fa" },
  { name: "Backend", color: "#facc15" },
  { name: "ML", color: "#c9956b" },
  { name: "Motion", color: "#fb923c" },
  { name: "QA", color: "#4ade80" },
  { name: "Copywriter", color: "#f87171" },
  { name: "DevOps", color: "#38bdf8" },
  { name: "Data", color: "#e879f9" },
];

export const CURSOR_PATH =
  "M1 1 L1 17.5 L5.6 13.4 L8.8 20.6 L12 19.2 L8.9 12.2 L15 12 Z";

export const cursorMarkup = (name: string) =>
  `<svg width="20" height="22" viewBox="0 0 20 22" aria-hidden="true"><path d="${CURSOR_PATH}" fill="var(--bi-color)" stroke="#15171c" stroke-width="1.4" stroke-linejoin="round"/></svg><span class="bi-cursor-name">${name}</span>`;
