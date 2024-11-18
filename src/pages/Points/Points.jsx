import React, { useState, useMemo } from 'react';
import Footer from '../../components/footer';
import { useSelector } from 'react-redux';

const data = [
  { id: 'TLA101', name: 'Kỹ thuật xây dựng công trình thủy', score: '18.15' },
  { id: 'TLA102', name: 'Kỹ thuật tài nguyên nước', score: '18' },
  { id: 'TLA103', name: 'Thủy văn học', score: '19.15' },
  { id: 'TLA104', name: 'Kỹ thuật xây dựng', score: '21' },
  { id: 'TLA105', name: 'Nhóm ngành Kỹ thuật Cơ khí', score: '23.04' },
  { id: 'TLA106', name: 'Công nghệ thông tin', score: '25.89' },
  { id: 'TLA107', name: 'Kỹ thuật cấp thoát nước', score: '18.15' },
  { id: 'TLA109', name: 'Kỹ thuật môi trường', score: '20.05' },
  { id: 'TLA110', name: 'Kỹ thuật cơ sở hạ tầng', score: '20.85' },
];

const LookUPPoints = () => {
  const [year, setYear] = useState('2023');
  const [method, setMethod] = useState('Điểm Chuẩn');
  const [major, setMajor] = useState('Tất cả');

  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const { allMajorsTable } = useSelector((state) => state.majorReducer);

  // Filter data based on selected method and major
  const filteredData = useMemo(() => {
    return allMajorsTable.filter(item => {
      return (
        (method === 'Tất cả' || method === 'Điểm Chuẩn') && // Replace or extend this condition if different filtering is needed
        (major === 'Tất cả' || item.name === major)
      );
    });
  }, [method, major]);

  const renderRows = filteredData.map((item) => (
    <tr key={item.id} className="border-t">
      <td className="px-4 py-2">{item.id}</td>
      <td className="px-4 py-2">{item.name}</td>
      <td className="px-4 py-2">{item.score}</td>
    </tr>
  ));

  const handleSelectMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setIsMethodModalOpen(false);
  };

  const handleSelectMajor = (selectedMajor) => {
    setMajor(selectedMajor);
    setIsMajorModalOpen(false);
  };

  return (
    <div className="p-5 bg-white">
      <div className='mb-14'>
      <h1 className="text-2xl font-bold mb-5 text-center">Tra cứu điểm chuẩn</h1>
      <div className="space-y-4 mb-5">
        <div>
          <label className="block text-lg mb-2">Năm:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Năm"
          />
        </div>
        <div>
          <label className="block text-lg mb-2">Phương thức xét tuyển:</label>
          <div
            className="w-full p-2 border border-gray-300 rounded cursor-pointer"
            onClick={() => setIsMethodModalOpen(true)}
          >
            {method}
          </div>
        </div>
        <div>
          <label className="block text-lg mb-2">Ngành:</label>
          <div
            className="w-full p-2 border border-gray-300 rounded cursor-pointer"
            onClick={() => setIsMajorModalOpen(true)}
          >
            {major}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Mã ngành</th>
              <th className="px-4 py-2">Tên ngành</th>
              <th className="px-4 py-2">Điểm THPT</th>
            </tr>
          </thead>
          <tbody>
            {renderRows}
          </tbody>
        </table>
      </div>

      {/* Method Modal */}
      {isMethodModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end"
          onClick={() => setIsMethodModalOpen(false)}
        >
          <div
            className="bg-white w-full p-5 rounded-t-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <h2 className="text-xl font-bold mb-4">Chọn Phương thức</h2>
            <ul>
              <li
                className="p-2 border-b cursor-pointer"
                onClick={() => handleSelectMethod('Học Bạ')}
              >
                Học Bạ
              </li>
              <li
                className="p-2 cursor-pointer"
                onClick={() => handleSelectMethod('Điểm Chuẩn')}
              >
                Điểm Chuẩn
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Major Modal */}
      {isMajorModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end"
          onClick={() => setIsMajorModalOpen(false)}
        >
          <div
            className="bg-white w-full p-5 rounded-t-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <h2 className="text-xl font-bold mb-4">Chọn Ngành</h2>
            <ul>
              <li
                className="p-2 border-b cursor-pointer"
                onClick={() => handleSelectMajor('Tất cả')}
              >
                Tất cả
              </li>
              {allMajorsTable.map((item) => (
                <li
                  key={item.id}
                  className="p-2 border-b cursor-pointer"
                  onClick={() => handleSelectMajor(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default LookUPPoints;
