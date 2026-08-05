import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('progetti');

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Header / Navigation */}
      <header className="border-b border-[var(--border)] px-6 py-4 flex justify-between items-center sticky top-0 bg-[var(--background)]/90 backdrop-blur-sm z-50">
        <div>
          <h1 className="text-2xl font-light tracking-wide uppercase">STUDIO STUDIO</h1>
          <p className="text-xs text-[var(--muted-foreground)] tracking-widest uppercase">Architettura & Interior Design</p>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('progetti')} 
            className={`transition-colors hover:text-[var(--primary)] ${activeTab === 'progetti' ? 'underline underline-offset-4 decoration-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
          >
            Progetti
          </button>
          <button 
            onClick={() => setActiveTab('studio')} 
            className={`transition-colors hover:text-[var(--primary)] ${activeTab === 'studio' ? 'underline underline-offset-4 decoration-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
          >
            Lo Studio
          </button>
          <button 
            onClick={() => setActiveTab('contatti')} 
            className={`transition-colors hover:text-[var(--primary)] ${activeTab === 'contatti' ? 'underline underline-offset-4 decoration-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
          >
            Contatti
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        {/* Hero Section */}
        <section className="py-16 border-b border-[var(--border)]">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-2">Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6">
            Spazi essenziali, materia e luce in equilibrio.
          </h2>
          <p className="max-w-xl text-[var(--muted-foreground)] leading-relaxed">
            Progettiamo residenze private e spazi commerciali focalizzandoci sul dialogo tra materiali naturali e geometrie pulite.
          </p>
        </section>

        {/* Dynamic Content Grid */}
        <section className="py-12">
          {activeTab === 'progetti' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-[var(--card)] border border-[var(--border)] mb-3 overflow-hidden flex items-center justify-center text-[var(--muted-foreground)]">
                  [ Immagine Progetto 01 ]
                </div>
                <h3 className="text-2xl font-light group-hover:text-[var(--primary)] transition-colors">Residenza Testaccio</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Roma — Interior & Lighting</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-[var(--card)] border border-[var(--border)] mb-3 overflow-hidden flex items-center justify-center text-[var(--muted-foreground)]">
                  [ Immagine Progetto 02 ]
                </div>
                <h3 className="text-2xl font-light group-hover:text-[var(--primary)] transition-colors">Attico Prati</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Roma — Ristrutturazione Completa</p>
              </div>
            </div>
          )}

          {activeTab === 'studio' && (
            <div className="max-w-2xl space-y-6">
              <h3 className="text-3xl font-light">La Nostra Filosofia</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Ogni progetto parte dall'ascolto del luogo e delle esigenze di chi lo vive. Lavoriamo sulla materia grezza, sulla valorizzazione della luce naturale e sulla riduzione dell'inutile.
              </p>
            </div>
          )}

          {activeTab === 'contatti' && (
            <div className="max-w-xl space-y-4">
              <h3 className="text-3xl font-light">Contattaci</h3>
              <p className="text-[var(--muted-foreground)]">Per informazioni, consulenze o per fissare un appuntamento in studio.</p>
              <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] space-y-2">
                <p className="text-sm"><strong>Email:</strong> info@studiostudio.it</p>
                <p className="text-sm"><strong>Telefono:</strong> +39 06 12345678</p>
                <p className="text-sm"><strong>Studio:</strong> Via Giulia, Roma</p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--muted-foreground)]">
        © {new Date().getFullYear()} STUDIO STUDIO. Tutti i diritti riservati.
      </footer>
    </div>
  );
}
