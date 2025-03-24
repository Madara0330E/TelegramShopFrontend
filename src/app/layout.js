// app/layout.js
import "./globals.css";
import Header from "./components/Header";



export const metadata = {
    title: "My Awesome App",
    description: "Example Next.js 13 layout",
};

// Обычно layout.js - это server component (без "use client")
// Если вам не нужны хуки/события, оставляйте так.
// Если нужен интерактив (например, клик по меню), можно
// вынести логику в "use client" внутри отдельного компонента (Header, Sidebar и т.п.)

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        {/* Шапка сайта */}
        <Header />

        <div style={{ display: "flex", minHeight: "80vh" }}>
            {/* Левая панель (например, навигация) */}
      

            {/* Основной контент (куда подставляются страницы) */}
            <main style={{ flex: 1, padding: "1rem" }}>
                {children}
            </main>

            {/* Правая панель (например, чат, реклама, виджеты) */}

        </div>

        {/* Футер сайта */}

        </body>
        </html>
    );
}
