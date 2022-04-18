//web3
import { Web3ReactProvider } from "@web3-react/core";
//redux
import { AuthProvider } from "../src/contexts/JWTContext";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
//ethers
import { ethers } from "ethers";
//styles
import "../styles/globals.css";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </Web3ReactProvider>
  );
}

export default MyApp;
