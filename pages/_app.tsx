import Contextwrapper from "@/ContextWrapper/contextwrapper";
// import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import Layout from "@/layout/layout";
// import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Contextwrapper >
        {/* <Navbar /> */}
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </Contextwrapper>
    </>
  )
}
