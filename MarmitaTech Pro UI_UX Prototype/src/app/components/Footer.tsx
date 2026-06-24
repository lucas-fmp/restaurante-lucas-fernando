export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 py-6 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">MarmitaTech Pro</span> © {currentYear}. 
          Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">
            Ajuda
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Documentação
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Suporte
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  );
}
