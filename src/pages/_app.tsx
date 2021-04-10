import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "../components/NavBar";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <title>Space Engineers Mod Helper</title>
            </Head>
            <div className="bg-gray-700 h-screen w-screen">
                <NavBar />
                <div className="text-white relative max-w-7xl mx-auto px-8 py-12">
                    <Component {...pageProps} />
                </div>
            </div>
        </QueryClientProvider>
    );
}
