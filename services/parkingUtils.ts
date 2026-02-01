// Ajuste as funções conforme seu App.tsx precisar.
// Por enquanto, stubs para o build passar.

export function formatPlate(plate: string) {
  return (plate || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function minutesToLabel(mins: number) {
  if (!Number.isFinite(mins)) return "";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
