import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/appointments.css';

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState('main');
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [viewingMedicine, setViewingMedicine] = useState(null);
  const [showBillForm, setShowBillForm] = useState(false);
  const [stockData, setStockData] = useState({
    name: '', type: 'Tablet', stock: '', price: ''
  });
  const [billData, setBillData] = useState({
    patientName: '', patientPhone: '', medicines: [{ medicineId: '', quantity: 1 }], paymentMethod: 'Cash'
  });
  const [medicineSearch, setMedicineSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/pharmacy/add-stock') {
      setCurrentMode('add-stock');
    } else if (location.pathname === '/pharmacy/bill-medicine') {
      setCurrentMode('bill-medicine');
    } else if (location.pathname === '/pharmacy/medicine-details') {
      setCurrentMode('medicine-details');
    } else {
      setCurrentMode('bill-medicine');
    }
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      const response = await fetch('/hospital.json');
      const data = await response.json();
      
      const savedMedicines = localStorage.getItem('hospitalMedicines');
      const savedPatients = localStorage.getItem('hospitalPatients');
      const savedBills = localStorage.getItem('pharmacyBills');
      
      setMedicines(savedMedicines ? JSON.parse(savedMedicines) : [
        { id: 'MED301', name: 'Paracetamol 500mg', type: 'Tablet', stock: 500, price: 2 },
        { id: 'MED302', name: 'Amoxicillin 250mg', type: 'Capsule', stock: 200, price: 8 },
        { id: 'MED303', name: 'Crocin Advance', type: 'Tablet', stock: 300, price: 3 },
        { id: 'MED304', name: 'Cetirizine 10mg', type: 'Tablet', stock: 150, price: 1.5 },
        { id: 'MED305', name: 'Omeprazole 20mg', type: 'Capsule', stock: 100, price: 12 },
        { id: 'MED306', name: 'Azithromycin 500mg', type: 'Tablet', stock: 80, price: 25 },
        { id: 'MED307', name: 'Dolo 650', type: 'Tablet', stock: 400, price: 4 },
        { id: 'MED308', name: 'Metformin 500mg', type: 'Tablet', stock: 250, price: 3.5 },
        { id: 'MED309', name: 'Amlodipine 5mg', type: 'Tablet', stock: 180, price: 2.8 },
        { id: 'MED310', name: 'Cough Syrup (Benadryl)', type: 'Syrup', stock: 50, price: 85 },
        { id: 'MED311', name: 'Insulin Injection', type: 'Injection', stock: 30, price: 450 },
        { id: 'MED312', name: 'Volini Gel', type: 'Ointment', stock: 75, price: 120 },
        { id: 'MED313', name: 'Eye Drops (Refresh)', type: 'Drops', stock: 60, price: 95 },
        { id: 'MED314', name: 'Aspirin 75mg', type: 'Tablet', stock: 350, price: 1.2 },
        { id: 'MED315', name: 'Pantoprazole 40mg', type: 'Tablet', stock: 120, price: 8.5 }
      ]);
      setPatients(savedPatients ? JSON.parse(savedPatients) : data.patients);
      setBills(savedBills ? JSON.parse(savedBills) : [
        {
          id: 'PB001',
          patientName: 'Ravi Sharma',
          patientPhone: '+91-9988776655',
          items: [
            { medicineId: 'MED301', medicineName: 'Paracetamol 500mg', quantity: 10, price: 2, total: 20 },
            { medicineId: 'MED304', medicineName: 'Cetirizine 10mg', quantity: 5, price: 1.5, total: 7.5 }
          ],
          totalAmount: 27.5,
          paymentMethod: 'Cash',
          date: '2024-01-16',
          time: '10:30 AM',
          status: 'Paid'
        },
        {
          id: 'PB002',
          patientName: 'Meera Patel',
          patientPhone: '+91-8877665544',
          items: [
            { medicineId: 'MED307', medicineName: 'Dolo 650', quantity: 6, price: 4, total: 24 },
            { medicineId: 'MED310', medicineName: 'Cough Syrup (Benadryl)', quantity: 1, price: 85, total: 85 }
          ],
          totalAmount: 109,
          paymentMethod: 'UPI',
          date: '2024-01-16',
          time: '02:15 PM',
          status: 'Paid'
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const generateMedicineId = () => {
    const lastId = medicines[medicines.length - 1]?.id || 'MED300';
    const num = parseInt(lastId.replace('MED', '')) + 1;
    return `MED${num}`;
  };

  const generateBillId = () => {
    const lastId = bills[bills.length - 1]?.id || 'PB000';
    const num = parseInt(lastId.replace('PB', '')) + 1;
    return `PB${String(num).padStart(3, '0')}`;
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const newMedicine = {
      id: generateMedicineId(),
      name: stockData.name,
      type: stockData.type,
      stock: parseInt(stockData.stock),
      price: parseInt(stockData.price)
    };
    
    const updatedMedicines = [...medicines, newMedicine];
    setMedicines(updatedMedicines);
    localStorage.setItem('hospitalMedicines', JSON.stringify(updatedMedicines));
    
    setStockData({ name: '', type: 'Tablet', stock: '', price: '' });
    alert('Medicine added successfully!');
  };

  const handleUpdateStock = (e) => {
    e.preventDefault();
    const updatedMedicines = medicines.map(med => 
      med.id === editingMedicine ? { ...med, ...stockData } : med
    );
    setMedicines(updatedMedicines);
    localStorage.setItem('hospitalMedicines', JSON.stringify(updatedMedicines));
    setEditingMedicine(null);
    setStockData({ name: '', type: 'Tablet', stock: '', price: '' });
  };

  const handleBillMedicine = (e) => {
    e.preventDefault();
    let totalAmount = 0;
    const billItems = [];
    
    // Calculate total and prepare bill items
    billData.medicines.forEach(item => {
      const medicine = medicines.find(m => m.id === item.medicineId);
      if (medicine && medicine.stock >= item.quantity) {
        const itemTotal = medicine.price * item.quantity;
        totalAmount += itemTotal;
        billItems.push({
          medicineId: item.medicineId,
          medicineName: medicine.name,
          quantity: item.quantity,
          price: medicine.price,
          total: itemTotal
        });
      }
    });
    
    if (billItems.length === 0) {
      alert('No valid medicines selected or insufficient stock!');
      return;
    }
    
    // Update medicine stock
    const updatedMedicines = medicines.map(med => {
      const soldItem = billData.medicines.find(item => item.medicineId === med.id);
      if (soldItem) {
        return { ...med, stock: med.stock - soldItem.quantity };
      }
      return med;
    });
    
    // Create bill
    const newBill = {
      id: generateBillId(),
      patientName: billData.patientName,
      patientPhone: billData.patientPhone,
      items: billItems,
      totalAmount,
      paymentMethod: billData.paymentMethod,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      status: 'Paid'
    };
    
    const updatedBills = [...bills, newBill];
    
    setMedicines(updatedMedicines);
    setBills(updatedBills);
    localStorage.setItem('hospitalMedicines', JSON.stringify(updatedMedicines));
    localStorage.setItem('pharmacyBills', JSON.stringify(updatedBills));
    
    setBillData({ patientName: '', patientPhone: '', medicines: [{ medicineId: '', quantity: 1 }], paymentMethod: 'Cash' });
    setShowBillForm(false);
    alert(`Bill generated successfully! Total: ₹${totalAmount}`);
  };

  const addMedicineRow = () => {
    setBillData({
      ...billData,
      medicines: [...billData.medicines, { medicineId: '', quantity: 1 }]
    });
  };

  const removeMedicineRow = (index) => {
    setBillData({
      ...billData,
      medicines: billData.medicines.filter((_, i) => i !== index)
    });
  };

  const updateMedicineRow = (index, field, value) => {
    const updatedMedicines = billData.medicines.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setBillData({ ...billData, medicines: updatedMedicines });
  };

  const handleMedicineSearch = (searchTerm) => {
    setMedicineSearch(searchTerm);
    if (searchTerm.length > 0) {
      const results = medicines.filter(med => 
        med.stock > 0 && (
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ).slice(0, 5);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      addMedicineFromSearch(searchResults[0]);
    }
  };

  const addMedicineFromSearch = (medicine) => {
    const existingIndex = billData.medicines.findIndex(med => med.medicineId === medicine.id);
    if (existingIndex >= 0) {
      updateMedicineRow(existingIndex, 'quantity', billData.medicines[existingIndex].quantity + 1);
    } else {
      setBillData({
        ...billData,
        medicines: [...billData.medicines, { medicineId: medicine.id, quantity: 1 }]
      });
    }
    setMedicineSearch('');
    setShowSearchResults(false);
  };



  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine.id);
    setStockData({
      name: medicine.name,
      type: medicine.type,
      stock: medicine.stock.toString(),
      price: medicine.price.toString()
    });
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm('Delete this medicine?')) {
      const updatedMedicines = medicines.filter(med => med.id !== id);
      setMedicines(updatedMedicines);
      localStorage.setItem('hospitalMedicines', JSON.stringify(updatedMedicines));
    }
  };

  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBills = bills.filter(bill => 
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.patientPhone.includes(searchTerm) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Pharmacy {currentMode === 'add-stock' ? '- Add Stock' : currentMode === 'bill-medicine' ? '- Bill Medicine' : currentMode === 'medicine-details' ? '- Medicine Details' : '- Bill Medicine'}</h1>
        <div className="dropdown">
          <button className="dropdown-btn">Pharmacy Options ▼</button>
          <div className="dropdown-content">
            <a href="/pharmacy/add-stock">Add Stock</a>
            <a href="/pharmacy/bill-medicine">Bill Medicine</a>
            <a href="/pharmacy/medicine-details">Medicine Details</a>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{medicines.length}</span>
          <span className="label">Total Medicines</span>
        </div>
        <div className="stat">
          <span className="number">{medicines.filter(m => m.stock > 0).length}</span>
          <span className="label">In Stock</span>
        </div>
        <div className="stat">
          <span className="number">{medicines.filter(m => m.stock <= 10).length}</span>
          <span className="label">Low Stock</span>
        </div>
        <div className="stat">
          <span className="number">{bills.length}</span>
          <span className="label">Bills Today</span>
        </div>
      </div>

      {currentMode === 'add-stock' && (
        <div className="form-section">
          <h2>Add New Medicine Stock</h2>
          <form onSubmit={editingMedicine ? handleUpdateStock : handleAddStock} className="booking-form">
            <div className="form-row">
              <div className="form-group">
                <label>Medicine Name</label>
                <input
                  type="text"
                  value={stockData.name}
                  onChange={(e) => setStockData({...stockData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={stockData.type}
                  onChange={(e) => setStockData({...stockData, type: e.target.value})}
                >
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Injection">Injection</option>
                  <option value="Ointment">Ointment</option>
                  <option value="Drops">Drops</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={stockData.stock}
                  onChange={(e) => setStockData({...stockData, stock: e.target.value})}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Unit (₹)</label>
                <input
                  type="number"
                  value={stockData.price}
                  onChange={(e) => setStockData({...stockData, price: e.target.value})}
                  min="1"
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
              </button>
              {editingMedicine && (
                <button type="button" className="btn-secondary" onClick={() => {
                  setEditingMedicine(null);
                  setStockData({ name: '', type: 'Tablet', stock: '', price: '' });
                }}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      )}

      {currentMode === 'bill-medicine' && (
        <>
          <div className="compact-form">
            <h2>Generate Medicine Bill</h2>
            
            <div className="medicine-search-section">
              <h3>Quick Add Medicine</h3>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search medicine by name or ID and press Enter..."
                  value={medicineSearch}
                  onChange={(e) => handleMedicineSearch(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="medicine-search-input"
                />
                {showSearchResults && searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map(medicine => (
                      <div 
                        key={medicine.id} 
                        className="search-result-item"
                        onClick={() => addMedicineFromSearch(medicine)}
                      >
                        <span className="medicine-name">{medicine.name}</span>
                        <span className="medicine-details">₹{medicine.price} - Stock: {medicine.stock}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <form onSubmit={handleBillMedicine}>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    value={billData.patientName}
                    onChange={(e) => setBillData({...billData, patientName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Patient Phone</label>
                  <input
                    type="tel"
                    value={billData.patientPhone}
                    onChange={(e) => setBillData({...billData, patientPhone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    value={billData.paymentMethod}
                    onChange={(e) => setBillData({...billData, paymentMethod: e.target.value})}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
              </div>
              
              {billData.medicines.map((med, index) => (
                <div key={index} className="form-row">
                  <div className="form-group">
                    <label>Medicine</label>
                    <select
                      value={med.medicineId}
                      onChange={(e) => updateMedicineRow(index, 'medicineId', e.target.value)}
                      required
                    >
                      <option value="">Select Medicine</option>
                      {medicines.filter(m => m.stock > 0).map(medicine => (
                        <option key={medicine.id} value={medicine.id}>
                          {medicine.name} - ₹{medicine.price} (Stock: {medicine.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={med.quantity}
                      onChange={(e) => updateMedicineRow(index, 'quantity', parseInt(e.target.value))}
                      min="1"
                      max={medicines.find(m => m.id === med.medicineId)?.stock || 1}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button type="button" className="btn-danger" onClick={() => removeMedicineRow(index)}>Remove</button>
                  </div>
                </div>
              ))}
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={addMedicineRow}>Add Medicine</button>
                <button type="submit" className="btn-primary">Generate Bill</button>
              </div>
            </form>
          </div>
          
          <div className="table-section">
            <h2>Recent Bills</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.slice(-10).map(bill => (
                  <tr key={bill.id}>
                    <td>{bill.id}</td>
                    <td>{bill.patientName}</td>
                    <td>{bill.patientPhone}</td>
                    <td>₹{bill.totalAmount}</td>
                    <td>{bill.paymentMethod}</td>
                    <td>{bill.date}</td>
                    <td><span className="status paid">{bill.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {(currentMode === 'main' || currentMode === 'medicine-details') && (
        <div className="controls">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {currentMode === 'medicine-details' && (
        <div className="table-section">
          <h2>Medicine Inventory</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map(medicine => (
                <tr key={medicine.id}>
                  <td>{medicine.id}</td>
                  <td>{medicine.name}</td>
                  <td>{medicine.type}</td>
                  <td>{medicine.stock}</td>
                  <td>₹{medicine.price}</td>
                  <td>
                    <span className={`status ${medicine.stock <= 10 ? 'low-stock' : medicine.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {medicine.stock <= 10 ? 'Low Stock' : medicine.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditMedicine(medicine)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteMedicine(medicine.id)}>Delete</button>
                    <button className="btn-view" onClick={() => setViewingMedicine(medicine)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}



      {currentMode === 'main' && (
        <div className="table-section">
          <h2>Recent Bills</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.slice(-10).map(bill => (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.patientName}</td>
                  <td>{bill.patientPhone}</td>
                  <td>₹{bill.totalAmount}</td>
                  <td>{bill.paymentMethod}</td>
                  <td>{bill.date}</td>
                  <td><span className="status paid">{bill.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewingMedicine && (
        <div className="modal">
          <div className="modal-content">
            <h2>Medicine Details</h2>
            <div className="detail-grid">
              <div><strong>ID:</strong> {viewingMedicine.id}</div>
              <div><strong>Name:</strong> {viewingMedicine.name}</div>
              <div><strong>Type:</strong> {viewingMedicine.type}</div>
              <div><strong>Stock:</strong> {viewingMedicine.stock}</div>
              <div><strong>Price:</strong> ₹{viewingMedicine.price}</div>
              <div><strong>Total Value:</strong> ₹{viewingMedicine.stock * viewingMedicine.price}</div>
            </div>
            <button className="btn-secondary" onClick={() => setViewingMedicine(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pharmacy;
