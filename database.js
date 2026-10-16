/**
 * database.js
 * Banco de dados SQLite (sql.js) — Mapa das Estrelas
 * Roda 100% no navegador. Persistência via localStorage.
 * 
 * Uso:
 *   await DB.init();
 *   DB.salvar({ ... });
 *   DB.listar();
 *   DB.remover(id);
 */

window.DB = (function () {
  'use strict';

  let SQL = null;
  let db = null;

  function loadSqlJs() {
    return new Promise((resolve, reject) => {
      if (typeof initSqlJs !== 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Falha ao carregar sql.js'));
      document.head.appendChild(script);
    });
  }

  async function init() {
    try {
      await loadSqlJs();

      SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      });

      const saved = localStorage.getItem('doisCeusDB');
      if (saved) {
        const binary = atob(saved);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          buffer[i] = binary.charCodeAt(i);
        }
        db = new SQL.Database(buffer);
      } else {
        db = new SQL.Database();
      }

      db.run(`
        CREATE TABLE IF NOT EXISTS memorias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data_nascimento TEXT NOT NULL,
          signo_ocidental TEXT,
          emoji_ocidental TEXT,
          animal_chines TEXT,
          emoji_chines TEXT,
          criado_em TEXT DEFAULT (datetime('now'))
        )
      `);

      return true;
    } catch (err) {
      console.warn('SQLite não pôde ser inicializado:', err);
      return false;
    }
  }

  function persistir() {
    if (!db) return;
    try {
      const data = db.export();
      let binary = '';
      const bytes = new Uint8Array(data);
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      localStorage.setItem('doisCeusDB', btoa(binary));
    } catch (e) {
      console.warn('Não foi possível salvar o banco:', e);
    }
  }

  function salvar(dados) {
    if (!db) return { ok: false, mensagem: 'Banco de dados não disponível.' };

    const { dataNascimento, signoNome, signoEmoji, animalNome, animalEmoji } = dados;

    const check = db.exec(
      `SELECT id FROM memorias WHERE data_nascimento = ?`,
      [dataNascimento]
    );
    if (check.length && check[0].values.length) {
      return { ok: false, mensagem: 'Esta memória já está guardada no céu.' };
    }

    db.run(
      `INSERT INTO memorias (data_nascimento, signo_ocidental, emoji_ocidental, animal_chines, emoji_chines)
       VALUES (?, ?, ?, ?, ?)`,
      [dataNascimento, signoNome, signoEmoji, animalNome, animalEmoji]
    );

    persistir();
    return { ok: true };
  }

  function remover(id) {
    if (!db) return false;
    db.run(`DELETE FROM memorias WHERE id = ?`, [id]);
    persistir();
    return true;
  }

  function listar(limite = 20) {
    if (!db) return [];

    const res = db.exec(
      `SELECT id, data_nascimento, signo_ocidental, emoji_ocidental, animal_chines, emoji_chines
       FROM memorias ORDER BY id DESC LIMIT ?`,
      [limite]
    );

    if (!res.length || !res[0].values.length) return [];

    return res[0].values.map(row => ({
      id: row[0],
      dataNascimento: row[1],
      signoOcidental: row[2],
      emojiOcidental: row[3],
      animalChines: row[4],
      emojiChines: row[5]
    }));
  }

  function disponivel() {
    return db !== null;
  }

  return {
    init,
    salvar,
    remover,
    listar,
    disponivel
  };
})();
