import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import LoginModal from "@/components/modals/LoginModal";
import RegistarModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<RegistarModal />
			<LoginModal />
			{/* <Modal isOpen title="Test Modal" actionLabel="Submit" /> */}
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
