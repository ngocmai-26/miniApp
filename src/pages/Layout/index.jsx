import { Page } from "zmp-ui";
import Footer from "../../components/footer";

function Layout({ children }) {
 
  return (
    <Page className="page">
      <div>
        {children}
        <Footer />
      </div>
    </Page>
  );
}

export default Layout;
