import {
  CARTELLA_IMMAGINI_REPO, ConflittoError, PERCORSO_JSON, immaginiOrfane, interpreta, serializza,
  type Archivio,
} from './archivio.js';

export interface ConfigGitHub {
  token: string;
  repo: string;
  branch: string;
}

export class ErroreGitHub extends Error {
  status: number;
  constructor(status: number, messaggio: string) {
    super(messaggio);
    this.name = 'ErroreGitHub';
    this.status = status;
  }
}

interface VoceAlbero {
  path: string;
  mode: '100644';
  type: 'blob';
  sha: string | null;
}

export function archivioGitHub(config: ConfigGitHub, fetchFn: typeof fetch = fetch): Archivio {
  if (!/^[\w.-]+\/[\w.-]+$/.test(config.repo)) {
    throw new Error('GITHUB_REPO non valido (formato: proprietario/repository)');
  }
  const base = `https://api.github.com/repos/${config.repo}`;

  async function api<T>(metodo: string, percorso: string, corpo?: unknown): Promise<T> {
    const risposta = await fetchFn(base + percorso, {
      method: metodo,
      headers: {
        authorization: `Bearer ${config.token}`,
        accept: 'application/vnd.github+json',
        'x-github-api-version': '2022-11-28',
        'user-agent': 'parrocchia-coriano-admin',
        ...(corpo === undefined ? {} : { 'content-type': 'application/json' }),
      },
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
    if (!risposta.ok) {
      throw new ErroreGitHub(risposta.status, `GitHub ${metodo} ${percorso}: ${risposta.status} ${await risposta.text()}`);
    }
    return (await risposta.json()) as T;
  }

  async function leggiFile(rif: string) {
    const file = await api<{ content: string; sha: string }>('GET', `/contents/${PERCORSO_JSON}?ref=${encodeURIComponent(rif)}`);
    return { contenuto: Buffer.from(file.content, 'base64').toString('utf8'), sha: file.sha };
  }

  async function nomiImmagini(rif: string): Promise<string[]> {
    try {
      const voci = await api<{ name: string; type: string }[]>(
        'GET', `/contents/${CARTELLA_IMMAGINI_REPO}?ref=${encodeURIComponent(rif)}`,
      );
      return voci.filter((v) => v.type === 'file').map((v) => v.name);
    } catch (e) {
      if (e instanceof ErroreGitHub && e.status === 404) return [];
      throw e;
    }
  }

  const creaBlob = (content: string, encoding: 'utf-8' | 'base64') =>
    api<{ sha: string }>('POST', '/git/blobs', { content, encoding });

  return {
    modalita: 'github',

    async leggi() {
      const { contenuto, sha } = await leggiFile(config.branch);
      return { avvisi: interpreta(contenuto), sha };
    },

    async scrivi(avvisi, nuoveImmagini, shaAtteso) {
      const testa = await api<{ object: { sha: string } }>('GET', `/git/ref/heads/${config.branch}`);
      const shaTesta = testa.object.sha;
      const commitTesta = await api<{ tree: { sha: string } }>('GET', `/git/commits/${shaTesta}`);
      const attuale = await leggiFile(shaTesta);
      if (attuale.sha !== shaAtteso) throw new ConflittoError();
      const presenti = await nomiImmagini(shaTesta);

      const blobJson = await creaBlob(serializza(avvisi), 'utf-8');
      const voci: VoceAlbero[] = [{ path: PERCORSO_JSON, mode: '100644', type: 'blob', sha: blobJson.sha }];
      for (const img of nuoveImmagini) {
        const blob = await creaBlob(img.byte.toString('base64'), 'base64');
        voci.push({ path: `${CARTELLA_IMMAGINI_REPO}/${img.nome}`, mode: '100644', type: 'blob', sha: blob.sha });
      }
      for (const nome of immaginiOrfane(presenti, avvisi)) {
        voci.push({ path: `${CARTELLA_IMMAGINI_REPO}/${nome}`, mode: '100644', type: 'blob', sha: null });
      }

      const albero = await api<{ sha: string }>('POST', '/git/trees', { base_tree: commitTesta.tree.sha, tree: voci });
      const commit = await api<{ sha: string }>('POST', '/git/commits', {
        message: 'avvisi: aggiornamento dalla dashboard',
        tree: albero.sha,
        parents: [shaTesta],
      });
      try {
        await api('PATCH', `/git/refs/heads/${config.branch}`, { sha: commit.sha, force: false });
      } catch (e) {
        if (e instanceof ErroreGitHub && e.status === 422) throw new ConflittoError();
        throw e;
      }
      return { sha: blobJson.sha, commit: commit.sha };
    },
  };
}
