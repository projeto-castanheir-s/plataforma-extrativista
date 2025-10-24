import './globals.css';

export const metadata = {
  title: 'Plataforma Castanheir@s - Extrativista',
  description: 'Plataforma de gestão de projetos extrativistas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
