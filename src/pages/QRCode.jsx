import React from 'react';
import { Page } from 'zmp-ui';
import Footer from '../components/footer';
import website from "../img/Website.png";
import { openWebview } from 'zmp-sdk/apis';

// Hàm mở URL trong webview
const openUrlInWebview = async () => {
  try {
    await openWebview({
      url: "https://tuyensinh.bdu.edu.vn/index.php",
      config: {
        style: "bottomSheet",
        leftButton: "back"
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function QRCode() {
  return (
    <Page className="page overflow-auto h-screen">
      <div className="flex flex-col items-center space-y-6 p-6 mb-14">
        <h1 className="text-2xl font-bold text-center">Mã QR</h1>
        <p className="text-center text-gray-600">Dưới đây là các mã QR của bạn. Quét mã để truy cập nhanh chóng.</p>
        
        {/* Fanpage QR Code */}
        {/* <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 w-80">
          <img 
            src={fanpage} 
            alt="Fanpage QR Code" 
            className="w-40 h-40 object-cover"
          />
          <button 
            onClick={() => openUrlInWebview('https://www.facebook.com/daihocbinhduong')}
            className="text-lg font-medium text-blue-500"
          >
            Fanpage Trường
          </button>
          <p className="text-sm text-gray-500 text-center">
            Theo dõi Fanpage của chúng tôi để nhận các thông tin và cập nhật mới nhất.
          </p>
        </div> */}
        
        {/* Website QR Code */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 w-80">
          <img 
            src={website} 
            alt="Website QR Code" 
            className="w-40 h-40 object-cover"
          />
          <button 
            onClick={openUrlInWebview}
            className="text-lg font-medium text-blue-500"
          >
            Website Chính Thức
          </button>
          <p className="text-sm text-gray-500 text-center">
            Truy cập website của chúng tôi để biết thêm chi tiết về tuyển sinh và sự kiện.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </Page>
  );
}

export default QRCode;
