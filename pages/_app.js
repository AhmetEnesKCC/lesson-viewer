import { Provider, useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import { setTheme, store } from "../Redux";
import "../styles/globals.css";
import "../styles/markdown.css";
import "../styles/write.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
