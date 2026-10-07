const LATO_MAX = 1600;
const QUALITA = 0.82;

/** Ridimensiona un'immagine (lato lungo ≤ 1600 px) e la converte in data URL JPEG. */
export async function riduciImmagine(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scala = Math.min(1, LATO_MAX / Math.max(bitmap.width, bitmap.height));
    const larghezza = Math.round(bitmap.width * scala);
    const altezza = Math.round(bitmap.height * scala);
    const canvas = document.createElement('canvas');
    canvas.width = larghezza;
    canvas.height = altezza;
    const contesto = canvas.getContext('2d');
    if (!contesto) throw new Error('Canvas non disponibile');
    contesto.fillStyle = '#ffffff';
    contesto.fillRect(0, 0, larghezza, altezza);
    contesto.drawImage(bitmap, 0, 0, larghezza, altezza);
    return canvas.toDataURL('image/jpeg', QUALITA);
  } finally {
    bitmap.close();
  }
}
