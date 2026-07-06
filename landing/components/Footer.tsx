export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-[0.15em] font-bold mb-4">
              SignatureInk
            </h3>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              Professional signature maker with ink simulation.
              Create, customize, and export your digital signature.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-xs font-mono text-foreground hover:text-muted-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs font-mono text-foreground hover:text-muted-foreground transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs font-mono text-foreground hover:text-muted-foreground transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/jmahiswara1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-foreground hover:text-muted-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:gadangjatumahiswara@gmail.com"
                  className="text-xs font-mono text-foreground hover:text-muted-foreground transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/j.mahiswara_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-foreground hover:text-muted-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border">
          <span className="text-xs font-mono text-muted-foreground">
            © 2026 SignatureInk. All rights reserved.
          </span>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-xs font-mono text-muted-foreground">
              Local Only
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              •
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              No Signup Required
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
