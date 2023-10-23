import "./globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Providers from "./Provider";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "Omar Afet | Personal Website",
	description: "Omar Afet's personal website",
	icons: {
		icon: "/public/Avatar.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="!scroll-smooth" suppressHydrationWarning>
			<body className="bg-white text-OpenColor-gray-7 dark:bg-OpenColor-gray-9 dark:text-OpenColor-gray-1">
				<Toaster position="top-center" reverseOrder={false} />
				<Providers>
					<Navbar />
					<main className="mt-8 px-16 container m-auto">{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
