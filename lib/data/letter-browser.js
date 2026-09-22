export const ALL_RELIGIONS = ['islamic', 'christian', 'hindu', 'italian'];
export const ALL_LETTERS = [...'abcdefghijklmnopqrstuvwxyz', '#'];

export function lettersFor(religionKey, manifest) {
  const available = new Set();
  const items = (manifest && manifest[religionKey]) || [];
  for (const item of items) {
    if (!item.name) continue;
    const firstChar = item.name.trim().charAt(0).toLowerCase();
    available.add(/^[a-z]$/.test(firstChar) ? firstChar : '#');
  }
  return available;
}
