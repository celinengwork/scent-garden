import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byId = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const name = path.split('/').pop()!;
  byId.set(name.slice(0, name.lastIndexOf('.')), mod.default);
}

/** The image dropped in for a slot id, if any (`src/assets/images/<id>.<ext>`). */
export function slotImage(id: string): ImageMetadata | undefined {
  return byId.get(id);
}
