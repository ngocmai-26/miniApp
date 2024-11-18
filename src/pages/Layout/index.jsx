import { Page } from "zmp-ui";
import Footer from "../../components/footer";
import { getAccessToken } from "zmp-sdk/apis";
import { useEffect } from "react";

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
