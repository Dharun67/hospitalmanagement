import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext, Navigate } from 'react-router-dom';
import '../styles/appointments.css';

const Laboratory = () => {
  const { user } = useOutletContext();
  const [tests, setTests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState('orders');
  const [showTestForm, setShowTestForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [reportData, setReportData] = useState({
    reportType: 'Daily',
    dateFrom: '',
    dateTo: '',
    status: 'All',
    doctor: ''
  });

  const [testData, setTestData] = useState({
    name: '', category: 'Blood Test', price: '', normalRange: '', unit: ''
  });

  const [orderData, setOrderData] = useState({
    patientName: '', patientPhone: '', doctorName: '', tests: [{ testId: '' }], priority: 'Normal', notes: ''
  });

  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/laboratory/tests') {
      setCurrentMode('tests');
    } else if (location.pathname === '/laboratory/orders') {
      setCurrentMode('orders');
    } else if (location.pathname === '/laboratory/results') {
      setCurrentMode('results');
    } else if (location.pathname === '/laboratory/reports') {
      setCurrentMode('reports');
    } else {
      setCurrentMode('orders');
    }
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      const response = await fetch('/hospital.json');
      const data = await response.json();
      
      const savedTests = localStorage.getItem('labTests');
      const savedOrders = localStorage.getItem('labOrders');
      const savedPatients = localStorage.getItem('hospitalPatients');
      
      setTests(savedTests ? JSON.parse(savedTests) : [
        { id: 'LAB001', name: 'Complete Blood Count (CBC)', category: 'Blood Test', price: 450, normalRange: 'RBC: 4.5-5.5, WBC: 4000-11000', unit: 'cells/μL' },
        { id: 'LAB002', name: 'Lipid Profile', category: 'Blood Test', price: 750, normalRange: 'Total Cholesterol <200', unit: 'mg/dL' },
        { id: 'LAB003', name: 'Liver Function Test (LFT)', category: 'Blood Test', price: 650, normalRange: 'SGPT: 7-56, SGOT: 10-40', unit: 'U/L' },
        { id: 'LAB004', name: 'Kidney Function Test (KFT)', category: 'Blood Test', price: 550, normalRange: 'Creatinine: 0.6-1.2', unit: 'mg/dL' },
        { id: 'LAB005', name: 'Thyroid Profile (T3, T4, TSH)', category: 'Blood Test', price: 850, normalRange: 'TSH: 0.4-4.0', unit: 'mIU/L' },
        { id: 'LAB006', name: 'HbA1c (Diabetes)', category: 'Blood Test', price: 400, normalRange: '<5.7%', unit: '%' },
        { id: 'LAB007', name: 'Chest X-Ray', category: 'Radiology', price: 300, normalRange: 'Normal lung fields', unit: '' },
        { id: 'LAB008', name: 'ECG (Electrocardiogram)', category: 'Cardiology', price: 200, normalRange: 'Normal sinus rhythm', unit: '' },
        { id: 'LAB009', name: 'Urine Routine & Microscopy', category: 'Urine Test', price: 150, normalRange: 'No abnormal cells', unit: '' },
        { id: 'LAB010', name: 'Blood Sugar (Fasting)', category: 'Blood Test', price: 80, normalRange: '70-100', unit: 'mg/dL' },
        { id: 'LAB011', name: 'Blood Sugar (PP)', category: 'Blood Test', price: 80, normalRange: '<140', unit: 'mg/dL' },
        { id: 'LAB012', name: 'Vitamin D3', category: 'Blood Test', price: 1200, normalRange: '30-100', unit: 'ng/mL' },
        { id: 'LAB013', name: 'Vitamin B12', category: 'Blood Test', price: 900, normalRange: '200-900', unit: 'pg/mL' },
        { id: 'LAB014', name: 'Ultrasound Abdomen', category: 'Radiology', price: 800, normalRange: 'Normal organs', unit: '' },
        { id: 'LAB015', name: 'Hemoglobin (Hb)', category: 'Blood Test', price: 100, normalRange: 'M: 13.5-17.5, F: 12.0-15.5', unit: 'g/dL' }
      ]);
      setOrders(savedOrders ? JSON.parse(savedOrders) : [
        {
          id: 'LO001',
          patientName: 'Rajesh Kumar',
          patientPhone: '+91-9876543210',
          doctorName: 'Dr. Priya Sharma',
          tests: [
            { testId: 'LAB001', testName: 'Complete Blood Count (CBC)', price: 450, status: 'Completed', result: 'Normal', resultDate: '2024-01-15' },
            { testId: 'LAB010', testName: 'Blood Sugar (Fasting)', price: 80, status: 'Completed', result: '95 mg/dL', resultDate: '2024-01-15' }
          ],
          totalAmount: 530,
          priority: 'Normal',
          notes: 'Routine health checkup',
          orderDate: '2024-01-15',
          orderTime: '09:30 AM',
          status: 'Completed'
        },
        {
          id: 'LO002',
          patientName: 'Sunita Devi',
          patientPhone: '+91-8765432109',
          doctorName: 'Dr. Amit Patel',
          tests: [
            { testId: 'LAB005', testName: 'Thyroid Profile (T3, T4, TSH)', price: 850, status: 'In Progress', result: '', resultDate: '' }
          ],
          totalAmount: 850,
          priority: 'Urgent',
          notes: 'Patient complaining of fatigue and weight gain',
          orderDate: '2024-01-16',
          orderTime: '11:15 AM',
          status: 'In Progress'
        },
        {
          id: 'LO003',
          patientName: 'Mohammed Ali',
          patientPhone: '+91-7654321098',
          doctorName: 'Dr. Kavita Singh',
          tests: [
            { testId: 'LAB003', testName: 'Liver Function Test (LFT)', price: 650, status: 'Pending', result: '', resultDate: '' },
            { testId: 'LAB004', testName: 'Kidney Function Test (KFT)', price: 550, status: 'Pending', result: '', resultDate: '' }
          ],
          totalAmount: 1200,
          priority: 'Normal',
          notes: 'Pre-operative evaluation',
          orderDate: '2024-01-16',
          orderTime: '02:45 PM',
          status: 'Ordered'
        }
      ]);
      setPatients(savedPatients ? JSON.parse(savedPatients) : data.patients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const generateTestId = () => {
    const lastId = tests[tests.length - 1]?.id || 'LAB000';
    const num = parseInt(lastId.replace('LAB', '')) + 1;
    return `LAB${String(num).padStart(3, '0')}`;
  };

  const generateOrderId = () => {
    const lastId = orders[orders.length - 1]?.id || 'LO000';
    const num = parseInt(lastId.replace('LO', '')) + 1;
    return `LO${String(num).padStart(3, '0')}`;
  };

  const handleAddTest = (e) => {
    e.preventDefault();
    const newTest = {
      id: generateTestId(),
      name: testData.name,
      category: testData.category,
      price: parseInt(testData.price),
      normalRange: testData.normalRange,
      unit: testData.unit
    };
    
    const updatedTests = [...tests, newTest];
    setTests(updatedTests);
    localStorage.setItem('labTests', JSON.stringify(updatedTests));
    
    setTestData({ name: '', category: 'Blood Test', price: '', normalRange: '', unit: '' });
    setShowTestForm(false);
    alert('Test added successfully!');
  };

  const handleUpdateTest = (e) => {
    e.preventDefault();
    const updatedTests = tests.map(test => 
      test.id === editingTest ? { ...test, ...testData, price: parseInt(testData.price) } : test
    );
    setTests(updatedTests);
    localStorage.setItem('labTests', JSON.stringify(updatedTests));
    setEditingTest(null);
    setTestData({ name: '', category: 'Blood Test', price: '', normalRange: '', unit: '' });
    alert('Test updated successfully!');
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    let totalAmount = 0;
    const orderTests = [];
    
    orderData.tests.forEach(item => {
      const test = tests.find(t => t.id === item.testId);
      if (test) {
        totalAmount += test.price;
        orderTests.push({
          testId: item.testId,
          testName: test.name,
          price: test.price,
          status: 'Pending',
          result: '',
          resultDate: ''
        });
      }
    });
    
    if (orderTests.length === 0) {
      alert('Please select at least one test!');
      return;
    }
    
    const newOrder = {
      id: generateOrderId(),
      patientName: orderData.patientName,
      patientPhone: orderData.patientPhone,
      doctorName: orderData.doctorName,
      tests: orderTests,
      totalAmount,
      priority: orderData.priority,
      notes: orderData.notes,
      orderDate: new Date().toISOString().split('T')[0],
      orderTime: new Date().toLocaleTimeString(),
      status: 'Ordered'
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('labOrders', JSON.stringify(updatedOrders));
    
    setOrderData({ patientName: '', patientPhone: '', doctorName: '', tests: [{ testId: '' }], priority: 'Normal', notes: '' });
    setShowOrderForm(false);
    alert(`Order created successfully! Total: ₹${totalAmount}`);
  };

  const addTestRow = () => {
    setOrderData({
      ...orderData,
      tests: [...orderData.tests, { testId: '' }]
    });
  };

  const removeTestRow = (index) => {
    setOrderData({
      ...orderData,
      tests: orderData.tests.filter((_, i) => i !== index)
    });
  };

  const updateTestRow = (index, testId) => {
    const updatedTests = orderData.tests.map((test, i) => 
      i === index ? { testId } : test
    );
    setOrderData({ ...orderData, tests: updatedTests });
  };

  const handleEditTest = (test) => {
    setEditingTest(test.id);
    setTestData({
      name: test.name,
      category: test.category,
      price: test.price.toString(),
      normalRange: test.normalRange,
      unit: test.unit
    });
    setShowTestForm(true);
  };

  const handleDeleteTest = (id) => {
    if (window.confirm('Delete this test?')) {
      const updatedTests = tests.filter(test => test.id !== id);
      setTests(updatedTests);
      localStorage.setItem('labTests', JSON.stringify(updatedTests));
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Delete this order?')) {
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);
      localStorage.setItem('labOrders', JSON.stringify(updatedOrders));
    }
  };

  const updateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('labOrders', JSON.stringify(updatedOrders));
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order.id);
    setOrderData({
      patientName: order.patientName,
      patientPhone: order.patientPhone,
      doctorName: order.doctorName,
      tests: order.tests.map(t => ({ testId: t.testId })),
      priority: order.priority,
      notes: order.notes
    });
    setShowOrderForm(true);
  };

  const handleUpdateOrder = (e) => {
    e.preventDefault();
    let totalAmount = 0;
    const orderTests = [];
    
    orderData.tests.forEach(item => {
      const test = tests.find(t => t.id === item.testId);
      if (test) {
        totalAmount += test.price;
        orderTests.push({
          testId: item.testId,
          testName: test.name,
          price: test.price,
          status: 'Pending',
          result: '',
          resultDate: ''
        });
      }
    });
    
    const updatedOrders = orders.map(order => 
      order.id === editingOrder ? {
        ...order,
        patientName: orderData.patientName,
        patientPhone: orderData.patientPhone,
        doctorName: orderData.doctorName,
        tests: orderTests,
        totalAmount,
        priority: orderData.priority,
        notes: orderData.notes
      } : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('labOrders', JSON.stringify(updatedOrders));
    
    setOrderData({ patientName: '', patientPhone: '', doctorName: '', tests: [{ testId: '' }], priority: 'Normal', notes: '' });
    setEditingOrder(null);
    setShowOrderForm(false);
    alert('Order updated successfully!');
  };

  const updateTestResult = (orderId, testId, result) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedTests = order.tests.map(test => 
          test.testId === testId ? {
            ...test,
            result: result,
            status: 'Completed',
            resultDate: new Date().toISOString().split('T')[0]
          } : test
        );
        return { ...order, tests: updatedTests };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('labOrders', JSON.stringify(updatedOrders));
  };

  const generateFormReport = () => {
    let filteredOrders = orders;
    
    if (reportData.dateFrom && reportData.dateTo) {
      filteredOrders = filteredOrders.filter(order => 
        order.orderDate >= reportData.dateFrom && order.orderDate <= reportData.dateTo
      );
    }
    
    if (reportData.status !== 'All') {
      filteredOrders = filteredOrders.filter(order => order.status === reportData.status);
    }
    
    if (reportData.doctor) {
      filteredOrders = filteredOrders.filter(order => 
        order.doctorName.toLowerCase().includes(reportData.doctor.toLowerCase())
      );
    }
    
    const totalOrders = filteredOrders.length;
    const completedTests = filteredOrders.filter(o => o.status === 'Completed').length;
    const pendingTests = filteredOrders.filter(o => o.status === 'Pending' || o.status === 'Ordered').length;
    const totalRevenue = filteredOrders.filter(o => o.status === 'Completed').reduce((sum, order) => sum + order.totalAmount, 0);
    
    const report = {
      title: `${reportData.reportType} Laboratory Report`,
      dateRange: `${reportData.dateFrom} to ${reportData.dateTo}`,
      totalOrders,
      completedTests,
      pendingTests,
      totalRevenue,
      orders: filteredOrders
    };
    
    setGeneratedReport(report);
    setShowReportForm(false);
    setReportData({ reportType: 'Daily', dateFrom: '', dateTo: '', status: 'All', doctor: '' });
  };

  const filteredTests = tests.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(order => 
    order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.patientPhone.includes(searchTerm) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Laboratory {currentMode === 'tests' ? '- Test Management' : currentMode === 'orders' ? '- Test Orders' : currentMode === 'results' ? '- Test Results' : currentMode === 'reports' ? '- Reports' : '- Test Orders'}</h1>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{tests.length}</span>
          <span className="label">Available Tests</span>
        </div>
        <div className="stat">
          <span className="number">{orders.length}</span>
          <span className="label">Total Orders</span>
        </div>
        <div className="stat">
          <span className="number">{orders.filter(o => o.status === 'Pending').length}</span>
          <span className="label">Pending Tests</span>
        </div>
        <div className="stat">
          <span className="number">{orders.filter(o => o.status === 'Completed').length}</span>
          <span className="label">Completed Today</span>
        </div>
      </div>

      {currentMode === 'tests' && (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search"
            />
            <button className="btn-primary" onClick={() => setShowTestForm(true)}>Add New Test</button>
          </div>

          <div className="table-section">
            <h2>Laboratory Tests</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Test Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Normal Range</th>
                  <th>Unit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map(test => (
                  <tr key={test.id}>
                    <td>{test.id}</td>
                    <td>{test.name}</td>
                    <td>{test.category}</td>
                    <td>₹{test.price}</td>
                    <td>{test.normalRange}</td>
                    <td>{test.unit}</td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEditTest(test)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDeleteTest(test.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {(currentMode === 'orders' || currentMode === 'main') && (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search"
            />
            <button className="btn-primary" onClick={() => setShowOrderForm(true)}>New Test Order</button>
          </div>

          <div className="table-section">
            <h2>Test Orders</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Tests</th>
                  <th>Amount</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <div>{order.patientName}</div>
                      <small>{order.patientPhone}</small>
                    </td>
                    <td>{order.doctorName}</td>
                    <td>{order.tests.length} test(s)</td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <span className={`status ${order.priority.toLowerCase()}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.orderDate}</td>
                    <td>
                      <button className="btn-view" onClick={() => setViewingOrder(order)}>View</button>
                      <button className="btn-edit" onClick={() => handleEditOrder(order)}>Edit</button>
                      {order.status === 'Ordered' && (
                        <button className="btn-edit" onClick={() => updateOrderStatus(order.id, 'In Progress')}>Start</button>
                      )}
                      {order.status === 'In Progress' && (
                        <button className="btn-complete" onClick={() => updateOrderStatus(order.id, 'Completed')}>Complete</button>
                      )}
                      <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {currentMode === 'reports' && !generatedReport && (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search"
            />
            <button className="btn-primary" onClick={() => setShowReportForm(true)}>Generate Report</button>
          </div>

          <div className="table-section">
            <h2>Laboratory Reports</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Patient Name</th>
                  <th>Phone</th>
                  <th>Doctor</th>
                  <th>Total Tests</th>
                  <th>Total Amount</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.patientName}</td>
                    <td>{order.patientPhone}</td>
                    <td>{order.doctorName}</td>
                    <td>{order.tests.length}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>{order.orderDate}</td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-view" onClick={() => setViewingReport(order)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {currentMode === 'results' && (
        <div className="table-section">
          <h2>Test Results</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Patient</th>
                <th>Test Name</th>
                <th>Result</th>
                <th>Normal Range</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => 
                order.tests.map(test => (
                  <tr key={`${order.id}-${test.testId}`}>
                    <td>{order.id}</td>
                    <td>{order.patientName}</td>
                    <td>{test.testName}</td>
                    <td>
                      {test.status === 'Completed' ? (
                        test.result || 'Result Available'
                      ) : (
                        <input
                          type="text"
                          placeholder="Enter result"
                          onBlur={(e) => {
                            if (e.target.value) {
                              updateTestResult(order.id, test.testId, e.target.value);
                            }
                          }}
                          style={{width: '120px', padding: '4px'}}
                        />
                      )}
                    </td>
                    <td>{tests.find(t => t.id === test.testId)?.normalRange}</td>
                    <td>
                      <span className={`status ${test.status.toLowerCase().replace(' ', '-')}`}>
                        {test.status}
                      </span>
                    </td>
                    <td>{test.resultDate || order.orderDate}</td>
                    <td>
                      {test.status !== 'Completed' && (
                        <button 
                          className="btn-complete" 
                          onClick={() => updateTestResult(order.id, test.testId, 'Normal')}
                        >
                          Mark Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showTestForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingTest ? 'Edit Test' : 'Add New Test'}</h2>
              <button className="close" onClick={() => {
                setShowTestForm(false);
                setEditingTest(null);
                setTestData({ name: '', category: 'Blood Test', price: '', normalRange: '', unit: '' });
              }}>×</button>
            </div>
            <form onSubmit={editingTest ? handleUpdateTest : handleAddTest}>
              <div className="form-row">
                <div className="form-group">
                  <label>Test Name</label>
                  <input
                    type="text"
                    value={testData.name}
                    onChange={(e) => setTestData({...testData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={testData.category}
                    onChange={(e) => setTestData({...testData, category: e.target.value})}
                  >
                    <option value="Blood Test">Blood Test</option>
                    <option value="Urine Test">Urine Test</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Microbiology">Microbiology</option>
                    <option value="Biochemistry">Biochemistry</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    value={testData.price}
                    onChange={(e) => setTestData({...testData, price: e.target.value})}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input
                    type="text"
                    value={testData.unit}
                    onChange={(e) => setTestData({...testData, unit: e.target.value})}
                    placeholder="e.g., mg/dL, 10³/μL"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Normal Range</label>
                <input
                  type="text"
                  value={testData.normalRange}
                  onChange={(e) => setTestData({...testData, normalRange: e.target.value})}
                  placeholder="e.g., 4.5-11.0, <200, Normal"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingTest ? 'Update Test' : 'Add Test'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => {
                  setShowTestForm(false);
                  setEditingTest(null);
                  setTestData({ name: '', category: 'Blood Test', price: '', normalRange: '', unit: '' });
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOrderForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingOrder ? 'Edit Test Order' : 'New Test Order'}</h2>
              <button className="close" onClick={() => {
                setShowOrderForm(false);
                setEditingOrder(null);
                setOrderData({ patientName: '', patientPhone: '', doctorName: '', tests: [{ testId: '' }], priority: 'Normal', notes: '' });
              }}>×</button>
            </div>
            <form onSubmit={editingOrder ? handleUpdateOrder : handleAddOrder}>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    value={orderData.patientName}
                    onChange={(e) => setOrderData({...orderData, patientName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Patient Phone</label>
                  <input
                    type="tel"
                    value={orderData.patientPhone}
                    onChange={(e) => setOrderData({...orderData, patientPhone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Doctor Name</label>
                  <input
                    type="text"
                    value={orderData.doctorName}
                    onChange={(e) => setOrderData({...orderData, doctorName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={orderData.priority}
                    onChange={(e) => setOrderData({...orderData, priority: e.target.value})}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              
              {orderData.tests.map((test, index) => (
                <div key={index} className="form-row">
                  <div className="form-group">
                    <label>Test {index + 1}</label>
                    <select
                      value={test.testId}
                      onChange={(e) => updateTestRow(index, e.target.value)}
                      required
                    >
                      <option value="">Select Test</option>
                      {tests.map(availableTest => (
                        <option key={availableTest.id} value={availableTest.id}>
                          {availableTest.name} - ₹{availableTest.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <button type="button" className="btn-danger" onClick={() => removeTestRow(index)}>Remove</button>
                  </div>
                </div>
              ))}
              
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={orderData.notes}
                  onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                  rows="3"
                  placeholder="Additional notes or instructions..."
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={addTestRow}>Add Test</button>
                <button type="submit" className="btn-primary">
                  {editingOrder ? 'Update Order' : 'Create Order'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => {
                  setShowOrderForm(false);
                  setEditingOrder(null);
                  setOrderData({ patientName: '', patientPhone: '', doctorName: '', tests: [{ testId: '' }], priority: 'Normal', notes: '' });
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingOrder && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Order Details - {viewingOrder.id}</h2>
              <button className="close" onClick={() => setViewingOrder(null)}>×</button>
            </div>
            <div className="view-details">
              <div className="detail-row">
                <label>Patient:</label>
                <span>{viewingOrder.patientName} ({viewingOrder.patientPhone})</span>
              </div>
              <div className="detail-row">
                <label>Doctor:</label>
                <span>{viewingOrder.doctorName}</span>
              </div>
              <div className="detail-row">
                <label>Order Date:</label>
                <span>{viewingOrder.orderDate} at {viewingOrder.orderTime}</span>
              </div>
              <div className="detail-row">
                <label>Priority:</label>
                <span className={`status ${viewingOrder.priority.toLowerCase()}`}>{viewingOrder.priority}</span>
              </div>
              <div className="detail-row">
                <label>Status:</label>
                <span className={`status ${viewingOrder.status.toLowerCase()}`}>{viewingOrder.status}</span>
              </div>
              <div className="detail-row">
                <label>Total Amount:</label>
                <span>₹{viewingOrder.totalAmount}</span>
              </div>
              <div className="detail-row">
                <label>Tests:</label>
                <div>
                  {viewingOrder.tests.map(test => (
                    <div key={test.testId} style={{marginBottom: '5px'}}>
                      {test.testName} - ₹{test.price}
                    </div>
                  ))}
                </div>
              </div>
              {viewingOrder.notes && (
                <div className="detail-row">
                  <label>Notes:</label>
                  <span>{viewingOrder.notes}</span>
                </div>
              )}
            </div>
            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setViewingOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {viewingReport && (
        <div className="modal">
          <div className="modal-content" style={{maxWidth: '700px'}}>
            <div className="modal-header">
              <h2>Laboratory Report - {viewingReport.id}</h2>
              <button className="close" onClick={() => setViewingReport(null)}>×</button>
            </div>
            <div className="view-details">
              <div className="detail-row">
                <label>Report ID:</label>
                <span>{viewingReport.id}</span>
              </div>
              <div className="detail-row">
                <label>Patient Name:</label>
                <span>{viewingReport.patientName}</span>
              </div>
              <div className="detail-row">
                <label>Phone Number:</label>
                <span>{viewingReport.patientPhone}</span>
              </div>
              <div className="detail-row">
                <label>Referring Doctor:</label>
                <span>{viewingReport.doctorName}</span>
              </div>
              <div className="detail-row">
                <label>Order Date:</label>
                <span>{viewingReport.orderDate}</span>
              </div>
              <div className="detail-row">
                <label>Order Time:</label>
                <span>{viewingReport.orderTime}</span>
              </div>
              <div className="detail-row">
                <label>Priority Level:</label>
                <span>{viewingReport.priority}</span>
              </div>
              <div className="detail-row">
                <label>Order Status:</label>
                <span>{viewingReport.status}</span>
              </div>
              <div className="detail-row">
                <label>Total Tests:</label>
                <span>{viewingReport.tests.length}</span>
              </div>
              <div className="detail-row">
                <label>Completed Tests:</label>
                <span>{viewingReport.tests.filter(t => t.status === 'Completed').length}</span>
              </div>
              <div className="detail-row">
                <label>Pending Tests:</label>
                <span>{viewingReport.tests.filter(t => t.status === 'Pending').length}</span>
              </div>
              <div className="detail-row">
                <label>Total Amount:</label>
                <span>₹{viewingReport.totalAmount}</span>
              </div>
              
              <div className="tests-list">
                <h4>Test Details:</h4>
                {viewingReport.tests.map(test => {
                  const testDetails = tests.find(t => t.id === test.testId);
                  return (
                    <div key={test.testId} className="test-detail">
                      <div className="test-info">
                        <strong>{test.testName}</strong>
                        <span>Price: ₹{test.price}</span>
                        <span>Status: {test.status}</span>
                        {test.result && <span>Result: {test.result}</span>}
                        {testDetails?.normalRange && <span>Normal Range: {testDetails.normalRange}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {viewingReport.notes && (
                <div className="detail-row">
                  <label>Clinical Notes:</label>
                  <span>{viewingReport.notes}</span>
                </div>
              )}
              
              <div className="detail-row">
                <label>Report Generated:</label>
                <span>{new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={() => window.print()}>Print Report</button>
              <button className="btn-secondary" onClick={() => setViewingReport(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showReportForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Generate Laboratory Report</h2>
              <button className="close" onClick={() => setShowReportForm(false)}>×</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              generateFormReport();
            }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Report Type</label>
                  <select
                    value={reportData.reportType}
                    onChange={(e) => setReportData({...reportData, reportType: e.target.value})}
                  >
                    <option value="Daily">Daily Report</option>
                    <option value="Weekly">Weekly Report</option>
                    <option value="Monthly">Monthly Report</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status Filter</label>
                  <select
                    value={reportData.status}
                    onChange={(e) => setReportData({...reportData, status: e.target.value})}
                  >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed Only</option>
                    <option value="Pending">Pending Only</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>From Date</label>
                  <input
                    type="date"
                    value={reportData.dateFrom}
                    onChange={(e) => setReportData({...reportData, dateFrom: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input
                    type="date"
                    value={reportData.dateTo}
                    onChange={(e) => setReportData({...reportData, dateTo: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Doctor (Optional)</label>
                <input
                  type="text"
                  value={reportData.doctor}
                  onChange={(e) => setReportData({...reportData, doctor: e.target.value})}
                  placeholder="Filter by doctor name"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Generate Report</button>
                <button type="button" className="btn-secondary" onClick={() => setShowReportForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {generatedReport && (
        <div className="modal">
          <div className="modal-content compact-modal">
            <div className="modal-header">
              <h2>{generatedReport.title}</h2>
              <button className="close" onClick={() => setGeneratedReport(null)}>×</button>
            </div>
            <div className="view-details compact-view">
              <div className="info-row">
                <span><strong>Orders:</strong> {generatedReport.totalOrders}</span>
                <span><strong>Completed:</strong> {generatedReport.completedTests}</span>
                <span><strong>Revenue:</strong> ₹{generatedReport.totalRevenue}</span>
              </div>
              
              <div className="orders-list">
                <h4>Orders</h4>
                {generatedReport.orders.slice(0, 5).map(order => (
                  <div key={order.id} className="order-item">
                    <span>{order.id}</span>
                    <span>{order.patientName}</span>
                    <span>₹{order.totalAmount}</span>
                    <span>{order.status}</span>
                  </div>
                ))}
                {generatedReport.orders.length > 5 && (
                  <p>... and {generatedReport.orders.length - 5} more orders</p>
                )}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setGeneratedReport(null)}>Close</button>
              <button className="btn-primary" onClick={() => window.print()}>Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Laboratory;