import { Sidebar } from "@/componnents/Sidebar";
import "./globals.css";
import { Montserrat } from "next/font/google";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Metaverso",
  description: "Aplicação para teste de conhecimento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={mont.className}>
        <div className="grid-cols-app bg-gradient-metaverso-grey g-10 grid min-h-screen p-5">
          <Sidebar />
          <main className="px-4">
            <div className="bg-metaverso-white min-h-screen rounded-3xl px-10 py-10 shadow-xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
