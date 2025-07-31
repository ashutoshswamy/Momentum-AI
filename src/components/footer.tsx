import Link from 'next/link';
import { Bot, Github, Linkedin, Twitter } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Column 1: App Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Bot className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Momentum AI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A comprehensive suite of AI agents to help you with your daily tasks.
            </p>
          </div>

          {/* Column 2: Legal */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect with Us */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-3">Connect with Us</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/ashutoshswamy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com/in/ashutoshswamy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com/ashutoshswamy_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Developer: Ashutosh Swamy</p>
          </div>

          {/* Column 4: Theme */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-3">Theme</h3>
            <ThemeToggle />
          </div>
        </div>

        <div className="border-t border-border/40 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Momentum AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
