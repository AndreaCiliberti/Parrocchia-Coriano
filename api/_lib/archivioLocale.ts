import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  CARTELLA_IMMAGINI_REPO, ConflittoError, PERCORSO_JSON, immaginiOrfane, interpreta, serializza,
  type Archivio,
} from './archivio.js';

const hash = (contenuto: string) => createHash('sha256').update(contenuto).digest('hex');

export function archivioLocale(radice: string): Archivio {
  const fileJson = path.join(radice, PERCORSO_JSON);
  const cartellaImmagini = path.join(radice, CARTELLA_IMMAGINI_REPO);

  async function leggiContenuto(): Promise<string> {
    try {
      return await readFile(fileJson, 'utf8');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return serializza([]);
      throw e;
    }
  }

  return {
    modalita: 'locale',

    async leggi() {
      const contenuto = await leggiContenuto();
      return { avvisi: interpreta(contenuto), sha: hash(contenuto) };
    },

    async scrivi(avvisi, nuoveImmagini, shaAtteso) {
      if (hash(await leggiContenuto()) !== shaAtteso) throw new ConflittoError();
      await mkdir(cartellaImmagini, { recursive: true });
      for (const img of nuoveImmagini) {
        await writeFile(path.join(cartellaImmagini, img.nome), img.byte);
      }
      const contenuto = serializza(avvisi);
      await mkdir(path.dirname(fileJson), { recursive: true });
      await writeFile(fileJson, contenuto);
      for (const nome of immaginiOrfane(await readdir(cartellaImmagini), avvisi)) {
        await unlink(path.join(cartellaImmagini, nome));
      }
      return hash(contenuto);
    },
  };
}
