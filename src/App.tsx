import React, { useState, useEffect } from "react";
// Removed Papa from "papaparse" as it was causing a resolution error.
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ResponsiveContainer // Added AreaChart and ResponsiveContainer
} from "recharts";
import { Settings, Download, Calendar, ChevronDown, PlusCircle, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react"; // Added more Lucide icons

// DashboardTab with full UI (unchanged)
function DashboardTab() {
  const lineData = [
    { name: "Jan", exposure: 500 },
    { name: "Feb", exposure: 600 },
    { name: "Mar", exposure: 550 },
    { name: "Apr", exposure: 700 },
    { name: "May", exposure: 650 },
  ];
  const barData = [
    { name: "Jan", marginCalls: 50 },
    { name: "Feb", marginCalls: 45 },
    { name: "Mar", marginCalls: 60 },
    { name: "Apr", marginCalls: 35 },
    { name: "May", marginCalls: 55 },
  ];
  const pieData = [
    { name: "Settled", value: 80 },
    { name: "Pending", value: 15 },
    { name: "Disputed", value: 5 },
  ];
  const COLORS = ["#4caf50", "#ff9800", "#f44336"];

  return (
    <div>
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <Settings className="w-6 h-6 cursor-pointer text-gray-600" />
          <Download className="w-6 h-6 cursor-pointer text-gray-600" />
        </div>
        <div className="flex items-center bg-white border rounded p-2">
          <Calendar className="w-5 h-5 text-gray-600 mr-2" />
          <span className="mr-2 text-gray-800">Last 6 Months</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Total Exposure", "$2,500,000"],
          ["Margin Calls", "150"],
          ["Collateral Posted", "$2,000,000"],
          ["Utilization", "80.0%"],
          ["Disputed Calls", "10"],
          ["Avg Response Time", "3h 20m"],
          ["Settlement Rate", "95%"],
          ["Avg Collateral Age", "4d"],
          ["Pending Margin Calls", "20"],
          ["Largest Exposure Client", "Client 1"],
          ["Outstanding Disputes", "5"],
          ["Avg Margin Shortfall", "$200,000"],
        ].map(([label, value]) => (
          <div key={label} className="bg-white p-4 rounded shadow">
            <span className="text-sm text-gray-500">{label}</span>
            <div className="mt-1 text-lg font-semibold text-gray-800">{value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-medium mb-2">Exposure Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="exposure" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-medium mb-2">Margin Calls Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="marginCalls" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-medium mb-2">Settlement Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                outerRadius={70}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Trade & Valuation Tab
function TradeValuationTab() {
  return (
    <div>
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Download className="w-6 h-6 cursor-pointer text-gray-600" />
        </div>
        <div className="flex items-center bg-white border rounded p-2">
          <Calendar className="w-5 h-5 text-gray-600 mr-2" />
          <span className="mr-2 text-gray-800">Last 6 Months</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* New Trade & Valuation Setup */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">New Trade & Valuation Setup</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input type="text" placeholder="Enter Client Name" className="border rounded p-2 w-full" />
          <input type="text" placeholder="Enter Trade ID" className="border rounded p-2 w-full" />
          <input type="text" placeholder="e.g. USD/INR" className="border rounded p-2 w-full" />
          <div className="relative">
            <input type="text" placeholder="dd-mm-yyyy" className="border rounded p-2 w-full pr-10" />
            <Calendar className="w-5 h-5 text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select className="border rounded p-2 w-full">
            <option>Reported</option>
            <option>Unreported</option>
          </select>
          <select className="border rounded p-2 w-full">
            <option>Active</option>
            <option>Closed</option>
          </select>
          <select className="border rounded p-2 w-full">
            <option>Spot</option>
            <option>Forward</option>
          </select>
          <select className="border rounded p-2 w-full">
            <option>Compliant</option>
            <option>Non-Compliant</option>
          </select>
        </div>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="text-blue-600">Download ISDA Agreement</a>
          <a href="#" className="text-blue-600">Download CSA Agreement</a>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Trade & Valuation</button>
      </div>

      {/* Existing Clients */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Clients</h2>
        <div className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Client ID",
                  "Name",
                  "Trades",
                  "Exposure",
                  "Margin Calls",
                  "Collateral Posted",
                  "Utilization",
                  "Disputed",
                  "Settlement Rate",
                ].map((header) => (
                  <th key={header} className="px-4 py-2 text-left text-sm font-medium text-gray-600">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["C001","Alpha Corp","12","$1,200,000","2","$960,000","80%","1","91.7%"],
                ["C002","Bravo Ltd","8","$800,000","1","$640,000","80%","0","87.5%"],
                ["C003","Charlie Inc","15","$1,500,000","3","$1,200,000","80%","2","80.0%"],
                ["C004","Delta LLC","10","$1,000,000","2","$800,000","80%","1","80.0%"],
                ["C005","Echo PLC","9","$900,000","1","$720,000","80%","0","88.9%"],
                ["C006","Foxtrot GmbH","7","$700,000","2","$560,000","80%","1","71.4%"],
                ["C007","Golf SA","11","$1,100,000","2","$880,000","80%","1","81.8%"],
                ["C008","Hotel BV","5","$500,000","0","$400,000","80%","0","100.0%"],
                ["C009","India Co","6","$600,000","1","$480,000","80%","0","83.3%"],
              ].map((row) => (
                <tr key={row[0]} className="border-t">
                  {row.map((cell, idx) => (
                    <td key={idx} className="px-4 py-2 text-sm text-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Valuation Tab: dynamic columns from file, summary display: dynamic columns from file, summary display
function ValuationTab() {
  // Removed fileName state as file upload is no longer supported directly for simplicity
  const [rowCount, setRowCount] = useState("1-50");
  
  // Static data to replace CSV upload functionality
  const staticData = [
    { "Trade ID": "TRD001", "Client": "Alpha Corp", "Value Date": "2024-06-01", "Maturity Date": "2024-12-01", "Currency": "USD", "Amount": "1,000,000", "Valuation": "1,000,000", "Collateral Required": "80,000", "Collateral Posted": "75,000", "Shortfall": "5,000" },
    { "Trade ID": "TRD002", "Client": "Bravo Ltd", "Value Date": "2024-06-05", "Maturity Date": "2025-01-15", "Currency": "EUR", "Amount": "500,000", "Valuation": "505,000", "Collateral Required": "40,000", "Collateral Posted": "40,000", "Shortfall": "0" },
    { "Trade ID": "TRD003", "Client": "Charlie Inc", "Value Date": "2024-06-10", "Maturity Date": "2024-11-20", "Currency": "GBP", "Amount": "750,000", "Valuation": "745,000", "Collateral Required": "60,000", "Collateral Posted": "58,000", "Shortfall": "2,000" },
    { "Trade ID": "TRD004", "Client": "Delta LLC", "Value Date": "2024-06-12", "Maturity Date": "2025-03-01", "Currency": "USD", "Amount": "1,200,000", "Valuation": "1,200,000", "Collateral Required": "96,000", "Collateral Posted": "96,000", "Shortfall": "0" },
    { "Trade ID": "TRD005", "Client": "Echo PLC", "Value Date": "2024-06-15", "Maturity Date": "2024-10-10", "Currency": "JPY", "Amount": "20,000,000", "Valuation": "19,950,000", "Collateral Required": "1,600,000", "Collateral Posted": "1,500,000", "Shortfall": "100,000" },
  ];

  const columns = Object.keys(staticData[0] || {}).map(key => ({ key, label: key }));
  const [selectedCols, setSelectedCols] = useState(columns.map(c => c.key));
  const data = staticData; // Use static data

  // No need for handleFile as there is no file input
  // const handleFile = e => { ... };

  const toggleCol = key => {
    setSelectedCols(cols =>
      cols.includes(key) ? cols.filter(c => c !== key) : [...cols, key]
    );
  };
  const selectAll = () => setSelectedCols(columns.map(c => c.key));
  const deselectAll = () => setSelectedCols([]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Valuation Table</h2>
      {/* Removed file input as it's no longer functional without papaparse */}
      <div className="flex items-center space-x-4 mb-4">
        {/* <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="border rounded p-1"
        /> */}
        <span className="italic">Using static sample data for valuation</span>
        <select
          value={rowCount}
          onChange={e => setRowCount(e.target.value)}
          className="border rounded p-2"
        >
          <option>1-50</option>
          <option>51-100</option>
        </select>
      </div>

      {/* Select/Deselect all */}
      <div className="flex items-center mb-2">
        <button onClick={selectAll} className="text-blue-600 underline mr-4">Select All</button>
        <button onClick={deselectAll} className="text-red-500 underline">Deselect All</button>
      </div>

      {/* Column checkboxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {columns.map(col => (
          <label key={col.key} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCols.includes(col.key)}
              onChange={() => toggleCol(col.key)}
            />
            <span className="ml-2 text-gray-700">{col.label}</span>
          </label>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow overflow-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              {columns.filter(c => selectedCols.includes(c.key)).map(c => (
                <th key={c.key} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, Number(rowCount.split('-')[1] || 50)).map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.filter(c => selectedCols.includes(c.key)).map(col => (
                  <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary of selected */}
      <div className="mt-6 bg-gray-50 p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Summary</h3>
        <p><strong>Columns Selected:</strong> {selectedCols.join(', ') || 'None'}</p>
        <p><strong>Total Rows:</strong> {data.length}</p>
      </div>
    </div>
  );
}

// Margin Calculator Tab
function MarginCalculatorTab() {
  // Static client data for dynamic selection
  const clients = [
    { id: "C001", name: "Alpha Corp", defaultMarginRequirement: 10, 
      availableCollateral: [
        { type: "Cash", value: 500000 },
        { type: "Bonds", value: 300000, subtype: "Corporate" },
        { type: "Bonds", value: 200000, subtype: "Government" }
      ] 
    },
    { id: "C002", name: "Bravo Ltd", defaultMarginRequirement: 8, 
      availableCollateral: [
        { type: "Cash", value: 700000 },
        { type: "Equities", value: 200000, subtype: "Blue Chip" },
        { type: "Equities", value: 100000, subtype: "Growth" }
      ] 
    },
    { id: "C003", name: "Charlie Inc", defaultMarginRequirement: 12, 
      availableCollateral: [
        { type: "Cash", value: 400000 },
        { type: "Bonds", value: 600000, subtype: "Municipal" }
      ] 
    },
  ];

  // Collateral types with associated haircuts
  const collateralHaircuts = {
    Cash: 0,
    Bonds: {
      Corporate: 5, // 5% haircut
      Government: 2, // 2% haircut
      Municipal: 3, // 3% haircut
    },
    Equities: {
      "Blue Chip": 15, // 15% haircut
      Growth: 25, // 25% haircut
    },
  };

  const [selectedClient, setSelectedClient] = useState("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [marginRequirement, setMarginRequirement] = useState("");
  const [collaterals, setCollaterals] = useState([{ id: 1, type: "Cash", subtype: "", value: "" }]);
  const [calculatedMargin, setCalculatedMargin] = useState(null);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [shortfallMessage, setShortfallMessage] = useState(null);

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setMarginRequirement(client.defaultMarginRequirement.toString());
      setCollaterals(client.availableCollateral.map((item, index) => ({
        id: index + 1,
        type: item.type,
        subtype: item.subtype || "",
        value: item.value.toString()
      })));
    } else {
      setMarginRequirement("");
      setCollaterals([{ id: 1, type: "Cash", subtype: "", value: "" }]);
    }
  };

  const handleCollateralChange = (id, field, value) => {
    setCollaterals(prevCollaterals =>
      prevCollaterals.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addCollateral = () => {
    setCollaterals(prevCollaterals => [
      ...prevCollaterals,
      { id: prevCollaterals.length + 1, type: "Cash", subtype: "", value: "" }
    ]);
  };

  const removeCollateral = (id) => {
    setCollaterals(prevCollaterals => prevCollaterals.filter(item => item.id !== id));
  };

  const calculateMargin = () => {
    const amount = parseFloat(tradeAmount) || 0;
    const requirement = parseFloat(marginRequirement) || 0;
    
    let totalCollateralAfterHaircut = 0;
    const collateralBreakdown = {};

    collaterals.forEach(item => {
      const val = parseFloat(item.value) || 0;
      let haircut = 0;
      if (typeof collateralHaircuts[item.type] === 'object') {
        haircut = collateralHaircuts[item.type][item.subtype] || 0;
      } else {
        haircut = collateralHaircuts[item.type] || 0;
      }
      
      const adjustedValue = val * (1 - haircut / 100);
      totalCollateralAfterHaircut += adjustedValue;
      
      if (!collateralBreakdown[item.type]) {
        collateralBreakdown[item.type] = {};
      }
      if (!collateralBreakdown[item.type][item.subtype || 'N/A']) {
        collateralBreakdown[item.type][item.subtype || 'N/A'] = { original: 0, adjusted: 0, haircut: haircut };
      }
      collateralBreakdown[item.type][item.subtype || 'N/A'].original += val;
      collateralBreakdown[item.type][item.subtype || 'N/A'].adjusted += adjustedValue;
    });
    
    const requiredMargin = amount * (requirement / 100);
    const shortfall = Math.max(0, requiredMargin - totalCollateralAfterHaircut);
    const utilizationRate = totalCollateralAfterHaircut > 0 ? (requiredMargin / totalCollateralAfterHaircut * 100) : 0;

    const newCalculation = {
      timestamp: new Date().toLocaleString(),
      client: clients.find(c => c.id === selectedClient)?.name || "N/A",
      tradeAmount: amount,
      marginRequirement: requirement,
      collaterals: collaterals, // Store raw input
      collateralBreakdown: collateralBreakdown, // Store detailed breakdown
      requiredMargin,
      availableCollateral: totalCollateralAfterHaircut,
      shortfall,
      utilizationRate,
    };
    
    setCalculatedMargin(newCalculation);
    setCalculationHistory(prevHistory => [newCalculation, ...prevHistory.slice(0, 4)]); // Keep last 5 calculations

    if (shortfall > 0) {
      setShortfallMessage(`Warning: A shortfall of $${shortfall.toLocaleString(undefined, { maximumFractionDigits: 2 })} exists.`);
    } else {
      setShortfallMessage(null);
    }
  };

  const getSubtypesForType = (type) => {
    if (typeof collateralHaircuts[type] === 'object') {
      return Object.keys(collateralHaircuts[type]);
    }
    return [];
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Margin Calculator</h2>
      
      {/* Input Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-lg font-medium mb-4">Calculate Margin Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
            <select 
              value={selectedClient}
              onChange={handleClientChange}
              className="border rounded p-2 w-full"
            >
              <option value="">Choose Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trade Amount ($)</label>
            <input 
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              placeholder="Enter trade amount"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Margin Requirement (%)</label>
            <input 
              type="number"
              value={marginRequirement}
              onChange={(e) => setMarginRequirement(e.target.value)}
              placeholder="Enter margin percentage"
              className="border rounded p-2 w-full"
            />
          </div>
        </div>

        <h4 className="text-md font-medium mt-6 mb-2">Collateral Details</h4>
        {collaterals.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={item.type}
                onChange={(e) => handleCollateralChange(item.id, "type", e.target.value)}
                className="border rounded p-2 w-full"
              >
                {Object.keys(collateralHaircuts).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtype</label>
              <select
                value={item.subtype}
                onChange={(e) => handleCollateralChange(item.id, "subtype", e.target.value)}
                className="border rounded p-2 w-full"
                disabled={!getSubtypesForType(item.type).length}
              >
                <option value="">Select Subtype</option>
                {getSubtypesForType(item.type).map(subtype => (
                  <option key={subtype} value={subtype}>{subtype} ({collateralHaircuts[item.type][subtype]}% haircut)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Value ($)</label>
              <input
                type="number"
                value={item.value}
                onChange={(e) => handleCollateralChange(item.id, "value", e.target.value)}
                placeholder="Value"
                className="border rounded p-2 w-full"
              />
            </div>
            <button
              onClick={() => removeCollateral(item.id)}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 self-end"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addCollateral}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mt-4 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add More Collateral
        </button>
        
        <button 
          onClick={calculateMargin}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-6"
        >
          Calculate Margin
        </button>
      </div>

      {/* Shortfall/Surplus Message */}
      {shortfallMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow" role="alert">
          <p className="font-bold">Shortfall Alert!</p>
          <p>{shortfallMessage}</p>
        </div>
      )}

      {/* Results */}
      {calculatedMargin && (
        <div className="bg-white p-6 rounded shadow mb-8">
          <h3 className="text-lg font-medium mb-4">Calculation Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <span className="text-sm text-gray-600">Required Margin</span>
              <div className="text-xl font-semibold text-blue-600">
                ${calculatedMargin.requiredMargin.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <span className="text-sm text-gray-600">Total Available Collateral (after haircuts)</span>
              <div className="text-xl font-semibold text-green-600">
                ${calculatedMargin.availableCollateral.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className={`p-4 rounded ${calculatedMargin.shortfall > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
              <span className="text-sm text-gray-600">Shortfall / Surplus</span>
              <div className={`text-xl font-semibold ${calculatedMargin.shortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {calculatedMargin.shortfall > 0 ? 
                  `$${calculatedMargin.shortfall.toLocaleString(undefined, { maximumFractionDigits: 2 })} (Shortfall)` :
                  `$${Math.abs(calculatedMargin.shortfall).toLocaleString(undefined, { maximumFractionDigits: 2 })} (Surplus)`
                }
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <span className="text-sm text-gray-600">Utilization Rate</span>
              <div className="text-xl font-semibold text-yellow-600">
                {calculatedMargin.utilizationRate.toFixed(1)}%
              </div>
            </div>
          </div>

          <h4 className="text-md font-medium mt-6 mb-2">Detailed Collateral Breakdown:</h4>
          {Object.keys(calculatedMargin.collateralBreakdown).map(type => (
            <div key={type} className="mb-2">
              <h5 className="font-semibold text-gray-700">{type}</h5>
              {Object.keys(calculatedMargin.collateralBreakdown[type]).map(subtype => {
                const breakdown = calculatedMargin.collateralBreakdown[type][subtype];
                return (
                  <p key={`${type}-${subtype}`} className="text-sm text-gray-600 ml-4">
                    {subtype !== 'N/A' && `(${subtype}) `}Original: ${breakdown.original.toLocaleString()}, Adjusted: ${breakdown.adjusted.toLocaleString()} (Haircut: {breakdown.haircut}%)
                  </p>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Calculation History */}
      {calculationHistory.length > 0 && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-medium mb-4">Recent Calculations</h3>
          <div className="overflow-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Timestamp</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Trade Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Req. Margin</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Collateral (Adj.)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Shortfall/Surplus</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {calculationHistory.map((calc, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-700">{calc.timestamp}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{calc.client}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${calc.tradeAmount.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${calc.requiredMargin.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${calc.availableCollateral.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <span className={calc.shortfall > 0 ? "text-red-600" : "text-green-600"}>
                        {calc.shortfall > 0 ? `$${calc.shortfall.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `$${Math.abs(calc.shortfall).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{calc.utilizationRate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function PortfolioReconciliationTab() {
  const initialReconciliationData = [
    { tradeId: "T001", client: "Alpha Corp", clientSide: 1200000, bankSide: 1200000, difference: 0, status: "Matched", lastUpdated: "2024-06-19 10:30 AM", breakType: "N/A" },
    { tradeId: "T002", client: "Bravo Ltd", clientSide: 850000, bankSide: 855000, difference: -5000, status: "Break", lastUpdated: "2024-06-19 11:00 AM", breakType: "Amount Discrepancy" },
    { tradeId: "T003", client: "Charlie Inc", clientSide: 750000, bankSide: 750000, difference: 0, status: "Matched", lastUpdated: "2024-06-19 11:15 AM", breakType: "N/A" },
    { tradeId: "T004", client: "Delta LLC", clientSide: 920000, bankSide: 915000, difference: 5000, status: "Break", lastUpdated: "2024-06-19 11:30 AM", breakType: "Missing Trade - Bank" },
    { tradeId: "T005", client: "Alpha Corp", clientSide: 150000, bankSide: 150000, difference: 0, status: "Matched", lastUpdated: "2024-06-19 12:00 PM", breakType: "N/A" },
    { tradeId: "T006", client: "Bravo Ltd", clientSide: 200000, bankSide: 198000, difference: 2000, status: "Break", lastUpdated: "2024-06-19 01:00 PM", breakType: "Amount Discrepancy" },
    { tradeId: "T007", client: "Charlie Inc", clientSide: 0, bankSide: 300000, difference: 300000, status: "Break", lastUpdated: "2024-06-19 02:00 PM", breakType: "Missing Trade - Client" },
  ];

  const [reconciliationData, setReconciliationData] = useState(initialReconciliationData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedBreak, setSelectedBreak] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [resolutionType, setResolutionType] = useState("");
  const [resolvedAmount, setResolvedAmount] = useState("");

  const filteredData = reconciliationData.filter(item => {
    const matchesSearch = item.tradeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleInvestigateClick = (trade) => {
    setSelectedBreak(trade);
    setResolutionNotes(""); // Clear notes on new investigation
    setResolutionType(""); // Clear resolution type
    setResolvedAmount(""); // Clear resolved amount
  };

  const closeInvestigateModal = () => {
    setSelectedBreak(null);
  };

  const handleMarkAsResolved = (tradeId) => {
    setReconciliationData(prevData =>
      prevData.map(trade =>
        trade.tradeId === tradeId ? { 
          ...trade, 
          status: "Resolved", 
          difference: 0,
          resolution: { notes: resolutionNotes, type: resolutionType, amount: resolvedAmount || null, resolvedAt: new Date().toLocaleString() }
        } : trade
      )
    );
    setSelectedBreak(null); // Close modal after resolving
  };

  const handleReconcile = (tradeId) => {
    // Simulate a reconciliation attempt. For a real app, this would involve backend logic.
    setReconciliationData(prevData =>
      prevData.map(trade =>
        trade.tradeId === tradeId && trade.status === "Break"
          ? { ...trade, status: "Matched", difference: 0, lastUpdated: new Date().toLocaleString() }
          : trade
      )
    );
    setSelectedBreak(null); // Close modal
    alert(`Attempted to reconcile Trade ID: ${tradeId}. Status updated to Matched (simulated).`); // Using alert for simplicity
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Portfolio Reconciliation</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Total Trades</span>
          <div className="text-2xl font-semibold text-gray-800">
            {reconciliationData.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Matched</span>
          <div className="text-2xl font-semibold text-green-600">
            {reconciliationData.filter(item => item.status === "Matched").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Breaks</span>
          <div className="text-2xl font-semibold text-red-600">
            {reconciliationData.filter(item => item.status === "Break").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Match Rate</span>
          <div className="text-2xl font-semibold text-blue-600">
            {((reconciliationData.filter(item => item.status === "Matched").length / reconciliationData.length) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Controls: Search and Filter */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by Trade ID or Client"
          className="border rounded p-2 flex-grow mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Matched">Matched</option>
          <option value="Break">Break</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Reconciliation Table */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Reconciliation Details</h3>
        <div className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Trade ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client Side</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Bank Side</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Difference</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Break Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Last Updated</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.tradeId} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.tradeId}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.client}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${row.clientSide.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${row.bankSide.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <span className={row.difference === 0 ? "text-green-600" : "text-red-600"}>
                      {row.difference === 0 ? "$0" : `${row.difference.toLocaleString()}`}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.breakType}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      row.status === "Matched" ? "bg-green-100 text-green-800" :
                      row.status === "Break" ? "bg-red-100 text-red-800" :
                      "bg-blue-100 text-blue-800" // For Resolved status
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.lastUpdated}</td>
                  <td className="px-4 py-2 text-sm">
                    {row.status === "Break" && (
                      <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => handleInvestigateClick(row)}
                      >
                        Investigate
                      </button>
                    )}
                    {(row.status === "Resolved" || row.status === "Matched") && (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigate Break Modal */}
      {selectedBreak && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Investigate Trade Break</h3>
            <p className="mb-2"><strong>Trade ID:</strong> {selectedBreak.tradeId}</p>
            <p className="mb-2"><strong>Client:</strong> {selectedBreak.client}</p>
            <p className="mb-2"><strong>Client Side:</strong> ${selectedBreak.clientSide.toLocaleString()}</p>
            <p className="mb-2"><strong>Bank Side:</strong> ${selectedBreak.bankSide.toLocaleString()}</p>
            <p className="mb-2"><strong>Difference:</strong> <span className="text-red-600">${selectedBreak.difference.toLocaleString()}</span></p>
            <p className="mb-4"><strong>Break Type:</strong> {selectedBreak.breakType}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Type</label>
              <select
                value={resolutionType}
                onChange={(e) => setResolutionType(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">Select Resolution Type</option>
                <option value="Manual Adjustment">Manual Adjustment</option>
                <option value="System Correction">System Correction</option>
                <option value="Client Clarification">Client Clarification</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {selectedBreak.breakType === "Amount Discrepancy" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Resolved Amount ($)</label>
                <input
                  type="number"
                  value={resolvedAmount}
                  onChange={(e) => setResolvedAmount(e.target.value)}
                  placeholder="Enter resolved amount"
                  className="border rounded p-2 w-full"
                />
              </div>
            )}
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Add notes for investigation and resolution..."
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
            ></textarea>

            <div className="flex justify-end space-x-4">
              <button 
                onClick={closeInvestigateModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleReconcile(selectedBreak.tradeId)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Attempt Reconcile (Simulated)
              </button>
              <button 
                onClick={() => handleMarkAsResolved(selectedBreak.tradeId)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={!resolutionType} // Disable if no resolution type selected
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ClientCommunicationTab() {
  const [messages, setMessages] = useState([
    { id: 1, client: "Alpha Corp", subject: "Margin Call Notice", date: "2024-06-18", status: "Sent", priority: "High", body: "Dear Client, your margin call for trade TRD001 is due by end of day. Please refer to the attached statement for details.", attachments: ["margin_call_TRD001.pdf"] },
    { id: 2, client: "Bravo Ltd", subject: "Collateral Confirmation", date: "2024-06-17", status: "Read", priority: "Medium", body: "We confirm receipt of collateral for your portfolio. The updated collateral balance is now $XX,XXX.", attachments: ["collateral_statement_BRAVO.xlsx"] },
    { id: 3, client: "Charlie Inc", subject: "Trade Settlement", date: "2024-06-16", status: "Pending", priority: "Low", body: "Trade TRD003 is pending settlement. Please ensure all necessary documentation is provided.", attachments: [] },
    { id: 4, client: "Alpha Corp", subject: "Urgent: Exposure Limit Breached", date: "2024-06-15", status: "Sent", priority: "High", body: "Urgent: Your exposure limits have been breached. Immediate action is required. Please contact your account manager.", attachments: [] },
  ]);

  const [newMessage, setNewMessage] = useState({
    client: "",
    subject: "",
    message: "",
    priority: "Medium",
    attachments: [],
  });

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterClient, setFilterClient] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [loadingLLM, setLoadingLLM] = useState(false);

  const clients = ["Alpha Corp", "Bravo Ltd", "Charlie Inc", "Delta LLC", "Echo PLC"]; // Example clients

  const handleSendMessage = async () => {
    if (!newMessage.client || !newMessage.subject || !newMessage.message) {
      alert("Please fill in all fields (Client, Subject, Message)."); // Using alert for simplicity
      return;
    }

    setLoadingLLM(true);
    try {
      const prompt = `Draft a professional and clear client communication message for ${newMessage.client} with the subject "${newMessage.subject}". The core message is: "${newMessage.message}". Suggest a slightly more formal subject line if appropriate and expand the body to be comprehensive but concise.`;
      
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      let enhancedSubject = newMessage.subject;
      let enhancedMessageBody = newMessage.message;

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        // Attempt to parse structured response if the LLM provides it.
        // For simplicity, let's assume the LLM directly returns the full message in plain text.
        // In a real app, you might guide the LLM to return JSON with subject and body.
        enhancedMessageBody = result.candidates[0].content.parts[0].text;
        // Simple attempt to extract a new subject if the LLM suggests it within the text
        const subjectMatch = enhancedMessageBody.match(/Subject: (.*)\n/i);
        if (subjectMatch && subjectMatch[1]) {
          enhancedSubject = subjectMatch[1].trim();
          enhancedMessageBody = enhancedMessageBody.replace(subjectMatch[0], '').trim(); // Remove subject line from body
        }
      } else {
        console.warn("LLM response did not contain expected content. Using original message.");
      }

      const newMsg = {
        id: messages.length + 1,
        client: newMessage.client,
        subject: enhancedSubject,
        date: new Date().toLocaleDateString(),
        status: "Sent",
        priority: newMessage.priority,
        body: enhancedMessageBody,
        attachments: newMessage.attachments,
      };
      setMessages([newMsg, ...messages]);
      setNewMessage({ client: "", subject: "", message: "", priority: "Medium", attachments: [] });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message or calling LLM:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoadingLLM(false);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    // Simulate marking as read
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === message.id && msg.status === "Sent" ? { ...msg, status: "Read" } : msg
      )
    );
  };

  const handleReplyMessage = (message) => {
    setNewMessage({
      client: message.client,
      subject: `RE: ${message.subject}`,
      message: `\n\n--- Original Message ---\n${message.body}`,
      priority: message.priority,
      attachments: []
    });
    setSelectedMessage(null); // Close view modal
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  const handleAttachFile = (e) => {
    // Simulate file attachment by adding file name to attachments array
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setNewMessage(prev => ({
        ...prev,
        attachments: [...prev.attachments, fileName]
      }));
      e.target.value = ''; // Clear file input
    }
  };

  const filteredMessages = messages.filter(msg => {
    const clientMatch = filterClient === "All" || msg.client === filterClient;
    const statusMatch = filterStatus === "All" || msg.status === filterStatus;
    const priorityMatch = filterPriority === "All" || msg.priority === filterPriority;
    return clientMatch && statusMatch && priorityMatch;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Client Communication</h2>
      
      {/* New Message Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-lg font-medium mb-4">Send New Message</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <select 
              value={newMessage.client}
              onChange={(e) => setNewMessage({...newMessage, client: e.target.value})}
              className="border rounded p-2 w-full"
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select 
              value={newMessage.priority}
              onChange={(e) => setNewMessage({...newMessage, priority: e.target.value})}
              className="border rounded p-2 w-full"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <input 
            type="text"
            value={newMessage.subject}
            onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
            placeholder="Enter subject"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea 
            value={newMessage.message}
            onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
            placeholder="Enter message content"
            rows="4"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">Attachments:</label>
          <input
            type="file"
            onChange={handleAttachFile}
            className="hidden" // Hide default file input
            id="file-upload"
          />
          <label htmlFor="file-upload" className="bg-gray-200 text-gray-800 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
            Choose File
          </label>
          {newMessage.attachments.length > 0 && (
            <div className="flex flex-wrap items-center space-x-2">
              {newMessage.attachments.map((file, index) => (
                <span key={index} className="text-sm text-gray-600 bg-gray-100 p-1 rounded">
                  {file}
                </span>
              ))}
            </div>
          )}
        </div>
        <button 
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
          disabled={loadingLLM}
        >
          {loadingLLM ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Send Message"
          )}
        </button>
        {loadingLLM && <p className="text-sm text-gray-500 mt-2">Generating message with AI...</p>}
      </div>

      {/* Message History Filters */}
      <div className="flex space-x-4 mb-4 bg-white p-4 rounded shadow">
        <select 
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Clients</option>
          {clients.map(client => (
            <option key={client} value={client}>{client}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Statuses</option>
          <option value="Sent">Sent</option>
          <option value="Read">Read</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Message History */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Message History</h3>
        <div className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Subject</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Priority</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Attachments</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{msg.client}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{msg.subject}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{msg.date}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      msg.status === "Sent" ? "bg-blue-100 text-blue-800" :
                      msg.status === "Read" ? "bg-green-100 text-green-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      msg.priority === "High" ? "bg-red-100 text-red-800" :
                      msg.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {msg.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {msg.attachments && msg.attachments.length > 0 ? (
                      msg.attachments.map((file, idx) => (
                        <span key={idx} className="text-blue-600 text-xs hover:underline mr-1">{file}</span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">None</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm flex space-x-2">
                    <button 
                      onClick={() => handleViewMessage(msg)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => alert(`Archiving message ${msg.id}`)} // Placeholder for archive logic
                      className="text-gray-600 hover:underline"
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Message Details</h3>
            <p className="mb-2"><strong>From:</strong> Collateral CMS</p>
            <p className="mb-2"><strong>To:</strong> {selectedMessage.client}</p>
            <p className="mb-2"><strong>Subject:</strong> {selectedMessage.subject}</p>
            <p className="mb-2"><strong>Date:</strong> {selectedMessage.date}</p>
            <p className="mb-2"><strong>Priority:</strong> <span className={`px-2 py-1 rounded text-xs ${
                      selectedMessage.priority === "High" ? "bg-red-100 text-red-800" :
                      selectedMessage.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {selectedMessage.priority}
                    </span>
            </p>
            <p className="mb-4">
              <strong>Attachments:</strong>{" "}
              {selectedMessage.attachments && selectedMessage.attachments.length > 0 ? (
                selectedMessage.attachments.map((file, idx) => (
                  <span key={idx} className="text-blue-600 text-sm hover:underline mr-1">{file}</span>
                ))
              ) : (
                "None"
              )}
            </p>
            <div className="border p-4 rounded bg-gray-50 mb-4 max-h-60 overflow-y-auto">
              <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.body}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => handleReplyMessage(selectedMessage)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Reply
              </button>
              <button 
                onClick={closeMessageModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FinancialPageTab() {
  const initialFinancialData = [
    { metric: "Total Assets Under Management", value: 15250000, change: 5.2, unit: "$", type: "currency", trendData: [{ month: 'Jan', value: 14.5 }, { month: 'Feb', value: 14.8 }, { month: 'Mar', value: 15.0 }, { month: 'Apr', value: 15.1 }, { month: 'May', value: 15.25 }] },
    { metric: "Daily P&L", value: 125000, change: 2.1, unit: "$", type: "currency", trendData: [{ day: 'Mon', value: 110 }, { day: 'Tue', value: 125 }, { day: 'Wed', value: 115 }, { day: 'Thu', value: 130 }, { day: 'Fri', value: 125 }] },
    { metric: "Monthly Revenue", value: 2850000, change: 8.7, unit: "$", type: "currency", trendData: [{ month: 'Jan', value: 2.5 }, { month: 'Feb', value: 2.6 }, { month: 'Mar', value: 2.7 }, { month: 'Apr', value: 2.8 }, { month: 'May', value: 2.85 }] },
    { metric: "Risk Adjusted Return", value: 12.4, change: 0.8, unit: "%", type: "percentage", trendData: [{ month: 'Jan', value: 11.5 }, { month: 'Feb', value: 11.8 }, { month: 'Mar', value: 12.0 }, { month: 'Apr', value: 12.2 }, { month: 'May', value: 12.4 }] },
    { metric: "Operational Expenses", value: 850000, change: -1.5, unit: "$", type: "currency", trendData: [{ month: 'Jan', value: 0.7 }, { month: 'Feb', value: 0.75 }, { month: 'Mar', value: 0.72 }, { month: 'Apr', value: 0.8 }, { month: 'May', value: 0.85 }] },
    { metric: "Client Growth", value: 1.2, change: 0.1, unit: "%", type: "percentage", trendData: [{ month: 'Jan', value: 1.0 }, { month: 'Feb', value: 1.05 }, { month: 'Mar', value: 1.1 }, { month: 'Apr', value: 1.15 }, { month: 'May', value: 1.2 }] },
    { metric: "Average Trade Size", value: 150000, change: 3.5, unit: "$", type: "currency" },
    { metric: "Cost of Capital", value: 4.8, change: -0.2, unit: "%", type: "percentage" },
  ];

  const initialTransactionHistory = [ // Added to maintain original filter capabilities
    { id: 1, date: "2024-06-20", type: "Collateral Posted", client: "Alpha Corp", amount: 500000, status: "Completed", tradeId: "TRD001" },
    { id: 2, date: "2024-06-19", type: "Margin Call", client: "Bravo Ltd", amount: 250000, status: "Pending", tradeId: "TRD002" },
    { id: 3, date: "2024-06-18", type: "Settlement", client: "Charlie Inc", amount: 1200000, status: "Completed", tradeId: "TRD003" },
    { id: 4, date: "2024-06-17", type: "Interest Payment", client: "Delta LLC", amount: 75000, status: "Completed", tradeId: "ACC001" },
    { id: 5, date: "2024-06-16", type: "Withdrawal", client: "Alpha Corp", amount: 100000, status: "Completed", tradeId: "ACC002" },
    { id: 6, date: "2024-06-15", type: "Margin Call", client: "Echo PLC", amount: 300000, status: "Overdue", tradeId: "TRD004" },
    { id: 7, date: "2024-06-14", type: "Collateral Release", client: "Bravo Ltd", amount: 50000, status: "Completed", tradeId: "TRD002" },
    { id: 8, date: "2024-06-13", type: "Fee Payment", client: "Charlie Inc", amount: 15000, status: "Completed", tradeId: "ACC003" },
  ];

  const [financialData, setFinancialData] = useState(initialFinancialData);
  const [transactionHistory, setTransactionHistory] = useState(initialTransactionHistory);
  const [reportType, setReportType] = useState("Monthly Summary");
  const [reportPeriod, setReportPeriod] = useState("Current Month");
  const [reportFormat, setReportFormat] = useState("PDF");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClientFilter, setSelectedClientFilter] = useState("All");

  const clients = ["All", "Alpha Corp", "Bravo Ltd", "Charlie Inc", "Delta LLC", "Echo PLC"]; // Example clients for filter

  const revenueByCategoryData = [
    { name: "Derivatives", Q1: 1.5, Q2: 1.6 },
    { name: "Fixed Income", Q1: 0.8, Q2: 0.9 },
    { name: "Equities", Q1: 0.5, Q2: 0.3 },
    { name: "Commodities", Q1: 0.2, Q2: 0.1 },
  ];

  // Filtered transaction history for display
  const filteredTransactionHistory = transactionHistory.filter(tx => {
    const clientMatch = selectedClientFilter === "All" || tx.client === selectedClientFilter;
    return clientMatch;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Financial Overview</h2>
      
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {financialData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">{item.metric}</h3>
              <div className="text-2xl font-semibold text-gray-800 mb-2">
                {item.unit === "$" && "$"}
                {item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                {item.unit === "%" && "%"}
              </div>
            </div>
            <div className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {item.change >= 0 ? `+${item.change.toFixed(1)}%` : `${item.change.toFixed(1)}%`} from last period
            </div>
            {item.trendData && (
              <div className="mt-2" style={{ width: '100%', height: '50px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={item.trendData}>
                    <Tooltip contentStyle={{ fontSize: '10px' }} />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" strokeWidth={1} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-2">Monthly Revenue Trend ($M)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={financialData.find(d => d.metric === "Monthly Revenue")?.trendData || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-2">Revenue by Product Category (Q2)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueByCategoryData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}M`} />
              <Legend />
              <Bar dataKey="Q2" fill="#82ca9d" name="Q2 Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Reports */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-lg font-medium mb-4">Generate Financial Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option>Monthly Summary</option>
              <option>Quarterly Report</option>
              <option>Annual Statement</option>
              <option>Risk Assessment</option>
              <option>Client Profitability</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select 
              value={reportPeriod} 
              onChange={(e) => setReportPeriod(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option>Current Month</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
              <option>Current Year</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select 
              value={reportFormat} 
              onChange={(e) => setReportFormat(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
        {reportPeriod === "Custom Range" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded p-2 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded p-2 w-full" />
            </div>
          </div>
        )}
        <button 
          onClick={() => alert(`Generating ${reportType} report for ${reportPeriod === "Custom Range" ? `${startDate} to ${endDate}` : reportPeriod} in ${reportFormat} format.`)} // Replace with actual report generation logic
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4"
        >
          Generate Report
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Recent Financial Transactions</h3>
        {/* Transaction Filters */}
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Filter by Type or Trade ID"
            className="border rounded p-2 flex-grow max-w-xs"
            onChange={(e) => {
              const term = e.target.value.toLowerCase();
              setTransactionHistory(initialTransactionHistory.filter(tx =>
                tx.type.toLowerCase().includes(term) || tx.tradeId?.toLowerCase().includes(term)
              ));
            }}
          />
          <select
            className="border rounded p-2"
            onChange={(e) => {
              const status = e.target.value;
              setTransactionHistory(initialTransactionHistory.filter(tx => status === "All" ? true : tx.status === status));
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select
            className="border rounded p-2"
            value={selectedClientFilter}
            onChange={(e) => setSelectedClientFilter(e.target.value)}
          >
            {clients.map(client => (
              <option key={client} value={client}>{client}</option>
            ))}
          </select>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Trade/Account ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactionHistory.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.client}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.tradeId}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${row.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      row.status === "Completed" ? "bg-green-100 text-green-800" : 
                      row.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MisTab() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "warning", message: "High concentration risk detected for Client Alpha Corp (Exposure: $1.8M)", time: "2 hours ago", status: "Active", severity: "High" },
    { id: 2, type: "info", message: "Daily reconciliation completed successfully", time: "4 hours ago", status: "Resolved", severity: "Low" },
    { id: 3, type: "error", message: "Failed trade settlement requires attention (TRD006 - $200,000)", time: "6 hours ago", status: "Active", severity: "Critical" },
    { id: 4, type: "success", message: "Monthly regulatory report submitted (June 2024)", time: "1 day ago", status: "Resolved", severity: "Low" },
    { id: 5, type: "warning", message: "Margin call for Bravo Ltd is overdue by 1 day ($5,000 shortfall)", time: "1 day ago", status: "Active", severity: "Medium" },
    { id: 6, type: "error", message: "System outage detected in trading engine", time: "3 days ago", status: "Active", severity: "Critical" },
  ]);

  const [filterAlertType, setFilterAlertType] = useState("All");
  const [filterAlertStatus, setFilterAlertStatus] = useState("Active"); // Default to Active alerts
  const [filterAlertSeverity, setFilterAlertSeverity] = useState("All");
  const [selectedKpiDetails, setSelectedKpiDetails] = useState(null);

  const kpis = {
    "Operational Efficiency": [
      { label: "Processing Time", value: "2.5 hrs avg", change: "-0.5 hrs", trend: "down" },
      { label: "SLA Compliance", value: "98.5%", change: "+0.5%", trend: "up" },
      { label: "Error Rate", value: "0.2%", change: "-0.1%", trend: "down" },
      { label: "Automation Rate", value: "75%", change: "+2%", trend: "up" },
    ],
    "Risk Metrics": [
      { label: "VaR (95%)", value: "$1.2M", change: "+0.1M", trend: "up" },
      { label: "Stress Test", value: "Passed", change: "N/A", trend: "stable" },
      { label: "Concentration Risk", value: "Medium", change: "⬆", trend: "up" },
      { label: "Credit Risk Rating", value: "Stable", change: "N/A", trend: "stable" },
    ],
    "Compliance Status": [
      { label: "Regulatory Reports", value: "Up to Date", change: "All submitted", trend: "up" },
      { label: "Audit Status", value: "Clean", change: "No findings", trend: "up" },
      { label: "Policy Updates", value: "2 Pending", change: "Critical", trend: "down" },
      { label: "Training Completion", value: "92%", change: "N/A", trend: "stable" },
    ],
  };

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = filterAlertType === "All" || alert.type === filterAlertType;
    const statusMatch = filterAlertStatus === "All" || alert.status === filterAlertStatus;
    const severityMatch = filterAlertSeverity === "All" || alert.severity === filterAlertSeverity;
    return typeMatch && statusMatch && severityMatch;
  });

  const markAlertAsResolved = (id) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, status: "Resolved", time: new Date().toLocaleString() } : alert
      )
    );
    alert("Alert marked as resolved!"); // Using alert for simplicity
  };

  const snoozeAlert = (id) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, status: "Snoozed", time: new Date().toLocaleString() } : alert
      )
    );
    alert("Alert snoozed for 24 hours (simulated)!"); // Using alert for simplicity
  };

  const handleKpiClick = (kpiCategory) => {
    setSelectedKpiDetails({ category: kpiCategory, data: kpis[kpiCategory] });
  };

  const closeKpiDetails = () => {
    setSelectedKpiDetails(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Management Information System (MIS)</h2>
      
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.keys(kpis).map(category => (
          <div key={category} className="bg-white p-6 rounded shadow cursor-pointer hover:bg-gray-50" onClick={() => handleKpiClick(category)}>
            <h3 className="text-lg font-medium mb-4">{category}</h3>
            <div className="space-y-3">
              {kpis[category].slice(0, 3).map((kpi, idx) => ( // Show first 3 KPIs for summary
                <div key={idx} className="flex justify-between">
                  <span className="text-sm text-gray-600">{kpi.label}</span>
                  <span className={`font-semibold ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-blue-600'}`}>
                    {kpi.value}
                    {kpi.change !== "N/A" && <span className="text-gray-500 text-xs"> ({kpi.change})</span>}
                  </span>
                </div>
              ))}
              <p className="text-sm text-blue-600 hover:underline mt-2">Click for more details</p>
            </div>
          </div>
        ))}
      </div>

      {/* KPI Details Modal */}
      {selectedKpiDetails && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">{selectedKpiDetails.category} Details</h3>
            <div className="space-y-4">
              {selectedKpiDetails.data.map((kpi, idx) => (
                <div key={idx} className="border-b pb-2">
                  <p className="text-md font-medium text-gray-800">{kpi.label}</p>
                  <div className="flex justify-between items-center text-sm text-gray-700 mt-1">
                    <span>Current Value: <span className="font-semibold">{kpi.value}</span></span>
                    <span className={`${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                      {kpi.change !== "N/A" && (kpi.change.includes('+') ? `📈 ${kpi.change}` : kpi.change.includes('-') ? `📉 ${kpi.change}` : kpi.change)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={closeKpiDetails}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Generation */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-lg font-medium mb-4">MIS Report Generation</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select className="border rounded p-2 w-full">
            <option>Daily Operations Report</option>
            <option>Weekly Risk Summary</option>
            <option>Monthly Executive Dashboard</option>
            <option>Quarterly Compliance Report</option>
            <option>Ad-hoc Report</option>
          </select>
          <select className="border rounded p-2 w-full">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Quarter</option>
            <option>Custom Range</option>
          </select>
          <select className="border rounded p-2 w-full">
            <option>All Departments</option>
            <option>Risk Management</option>
            <option>Operations</option>
            <option>Compliance</option>
            <option>Finance</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Generate MIS Report
          </button>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mt-4 flex items-center">
          <PlusCircle className="w-5 h-5 mr-2"/> Create Custom Dashboard Widget (Simulated)
        </button>
      </div>

      {/* System Alerts Filters */}
      <div className="flex flex-wrap space-x-4 mb-4 bg-white p-4 rounded shadow">
        <select 
          value={filterAlertType}
          onChange={(e) => setFilterAlertType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Types</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
          <option value="error">Error</option>
          <option value="success">Success</option>
        </select>
        <select 
          value={filterAlertStatus}
          onChange={(e) => setFilterAlertStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Resolved">Resolved</option>
          <option value="Snoozed">Snoozed</option>
        </select>
        <select 
          value={filterAlertSeverity}
          onChange={(e) => setFilterAlertSeverity(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* System Alerts */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">System Alerts & Notifications</h3>
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <p className="text-gray-600">No alerts found matching your criteria.</p>
          ) : (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded border-l-4 ${
                alert.type === "error" ? "border-red-500 bg-red-50" :
                alert.type === "warning" ? "border-yellow-500 bg-yellow-50" :
                alert.type === "success" ? "border-green-500 bg-green-50" :
                "border-blue-500 bg-blue-50"
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      {alert.type === "error" && <XCircle className="w-4 h-4 text-red-500 mr-1" />}
                      {alert.type === "warning" && <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />}
                      {alert.type === "info" && <Info className="w-4 h-4 text-blue-500 mr-1" />}
                      {alert.type === "success" && <CheckCircle className="w-4 h-4 text-green-500 mr-1" />}
                      <p className="text-sm text-gray-800 font-semibold">{alert.message}</p>
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        alert.severity === "Critical" ? "bg-red-200 text-red-800" :
                        alert.severity === "High" ? "bg-red-100 text-red-700" :
                        alert.severity === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-200 text-gray-700"
                      }`}>
                        Severity: {alert.severity}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        alert.status === "Active" ? "bg-red-100 text-red-800" :
                        alert.status === "Resolved" ? "bg-green-100 text-green-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        Status: {alert.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    {alert.status === "Active" && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => markAlertAsResolved(alert.id)}
                          className="text-blue-600 text-xs hover:underline"
                        >
                          Resolve
                        </button>
                        <button 
                          onClick={() => snoozeAlert(alert.id)}
                          className="text-yellow-600 text-xs hover:underline"
                        >
                          Snooze
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// New Collateral Management Tab
function CollateralManagementTab() {
  const [collateralHoldings, setCollateralHoldings] = useState([
    { id: 1, type: "Cash", currency: "USD", amount: 1500000, client: "Alpha Corp", eligibility: "Eligible", haircut: 0, available: 1500000, pledgedTo: "Bank A", maturityDate: "N/A", ISIN: "N/A" },
    { id: 2, type: "Bonds", currency: "EUR", amount: 800000, client: "Bravo Ltd", eligibility: "Eligible", haircut: 0.02, available: 784000, pledgedTo: "Bank B", maturityDate: "2025-12-31", ISIN: "EU0000000001" },
    { id: 3, type: "Equities", currency: "USD", amount: 500000, client: "Charlie Inc", eligibility: "Eligible", haircut: 0.15, available: 425000, pledgedTo: "Bank C", maturityDate: "N/A", ISIN: "US0000000001" },
    { id: 4, type: "Cash", currency: "GBP", amount: 200000, client: "Delta LLC", eligibility: "Eligible", haircut: 0, available: 200000, pledgedTo: "Bank D", maturityDate: "N/A", ISIN: "N/A" },
    { id: 5, type: "Bonds", currency: "USD", amount: 1200000, client: "Alpha Corp", eligibility: "Eligible", haircut: 0.05, available: 1140000, pledgedTo: "Bank A", maturityDate: "2026-06-30", ISIN: "US0000000002" },
    { id: 6, type: "Other", currency: "JPY", amount: 100000, client: "Echo PLC", eligibility: "Ineligible", haircut: 0.50, available: 50000, pledgedTo: "N/A", maturityDate: "N/A", ISIN: "N/A" }, // Example of ineligible
  ]);

  const [filterType, setFilterType] = useState("All");
  const [filterClient, setFilterClient] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const clients = ["All", "Alpha Corp", "Bravo Ltd", "Charlie Inc", "Delta LLC", "Echo PLC"];
  const collateralTypes = ["All", "Cash", "Bonds", "Equities", "Other"];

  const filteredHoldings = collateralHoldings.filter(item => {
    const typeMatch = filterType === "All" || item.type === filterType;
    const clientMatch = filterClient === "All" || item.client === filterClient;
    const searchMatch = searchTerm === "" || 
                        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.ISIN.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && clientMatch && searchMatch;
  });

  const totalCollateralValue = filteredHoldings.reduce((sum, item) => sum + item.amount, 0);
  const totalEligibleValue = filteredHoldings.reduce((sum, item) => sum + (item.eligibility === "Eligible" ? item.available : 0), 0);
  const totalIneligibleValue = filteredHoldings.reduce((sum, item) => sum + (item.eligibility === "Ineligible" ? item.amount : 0), 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Collateral Management</h2>
      
      {/* Summary Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Total Collateral Value</span>
          <div className="text-2xl font-semibold text-gray-800">
            ${totalCollateralValue.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Total Eligible Collateral</span>
          <div className="text-2xl font-semibold text-green-600">
            ${totalEligibleValue.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Total Ineligible Collateral</span>
          <div className="text-2xl font-semibold text-red-600">
            ${totalIneligibleValue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center space-x-4 mb-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by Client, Type, Currency, ISIN"
          className="border rounded p-2 flex-grow max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded p-2"
        >
          {collateralTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select 
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="border rounded p-2"
        >
          {clients.map(client => (
            <option key={client} value={client}>{client}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New Collateral</button>
      </div>

      {/* Collateral Holdings Table */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Current Collateral Holdings</h3>
        <div className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Currency</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pledged To</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Maturity Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ISIN</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Eligibility</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Haircut (%)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Available Value</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHoldings.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{item.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.currency}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${item.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.client}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.pledgedTo}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.maturityDate}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.ISIN}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.eligibility === "Eligible" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {item.eligibility}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{(item.haircut * 100).toFixed(1)}%</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${item.available.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm">
                    <button className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// New Collateral Movements Tab
function CollateralMovementsTab() {
  const [movements, setMovements] = useState([
    { id: 1, date: "2024-06-20", type: "Pledge In", client: "Alpha Corp", asset: "Cash", amount: 100000, status: "Completed", reference: "MOV001", details: "Received cash collateral from Alpha Corp for TRD007." },
    { id: 2, date: "2024-06-19", type: "Release Out", client: "Bravo Ltd", asset: "Bonds", amount: 50000, status: "Completed", reference: "MOV002", details: "Released bonds to Bravo Ltd due to margin surplus." },
    { id: 3, date: "2024-06-19", type: "Transfer", client: "Charlie Inc", asset: "Equities", amount: 20000, status: "Pending", reference: "MOV003", details: "Internal transfer of equities for portfolio rebalancing." },
    { id: 4, date: "2024-06-18", type: "Pledge In", client: "Delta LLC", asset: "Cash", amount: 150000, status: "Completed", reference: "MOV004", details: "Cash collateral pledged by Delta LLC." },
    { id: 5, date: "2024-06-17", type: "Substitution", client: "Alpha Corp", asset: "Bonds (new)", amount: 75000, status: "Completed", reference: "MOV005", details: "Substituted old bonds with new ones for Alpha Corp." },
    { id: 6, date: "2024-06-16", type: "Release Out", client: "Echo PLC", asset: "Cash", amount: 30000, status: "Rejected", reference: "MOV006", details: "Release request rejected due to insufficient margin." },
  ]);

  const [filterType, setFilterType] = useState("All");
  const [filterClient, setFilterClient] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovement, setSelectedMovement] = useState(null);

  const clients = ["All", "Alpha Corp", "Bravo Ltd", "Charlie Inc", "Delta LLC", "Echo PLC"];
  const movementTypes = ["All", "Pledge In", "Release Out", "Transfer", "Substitution"];
  const statuses = ["All", "Completed", "Pending", "Rejected"];

  const filteredMovements = movements.filter(item => {
    const typeMatch = filterType === "All" || item.type === filterType;
    const clientMatch = filterClient === "All" || item.client === filterClient;
    const statusMatch = filterStatus === "All" || item.status === filterStatus;
    const searchMatch = searchTerm === "" ||
                        item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.details.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && clientMatch && statusMatch && searchMatch;
  });

  const handleViewDetails = (movement) => {
    setSelectedMovement(movement);
  };

  const closeDetailsModal = () => {
    setSelectedMovement(null);
  };

  const handleApproveReject = (movementId, action) => {
    setMovements(prevMovements =>
      prevMovements.map(mov =>
        mov.id === movementId ? { ...mov, status: action === "Approve" ? "Completed" : "Rejected", details: `${mov.details} (Action: ${action} by user)` } : mov
      )
    );
    setSelectedMovement(null); // Close modal after action
    alert(`Movement ${movementId} ${action === "Approve" ? "approved" : "rejected"}!`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Collateral Movements</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Total Movements</span>
          <div className="text-2xl font-semibold text-gray-800">
            {movements.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Completed Movements</span>
          <div className="text-2xl font-semibold text-green-600">
            {movements.filter(m => m.status === "Completed").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <span className="text-sm text-gray-500">Pending/Rejected</span>
          <div className="text-2xl font-semibold text-red-600">
            {movements.filter(m => m.status === "Pending" || m.status === "Rejected").length}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center space-x-4 mb-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by Reference, Client, Asset, Details"
          className="border rounded p-2 flex-grow max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded p-2"
        >
          {movementTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select 
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="border rounded p-2"
        >
          {clients.map(client => (
            <option key={client} value={client}>{client}</option>
          ))}
        </select>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Initiate Movement</button>
      </div>

      {/* Movements Table */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Collateral Movement History</h3>
        <div className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Asset</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Reference</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{item.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.client}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.asset}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${item.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === "Completed" ? "bg-green-100 text-green-800" :
                      item.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.reference}</td>
                  <td className="px-4 py-2 text-sm">
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      View Details
                    </button>
                    {item.status === "Pending" && (
                      <>
                        <button 
                          onClick={() => handleApproveReject(item.id, "Approve")}
                          className="text-green-600 hover:underline mr-2"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleApproveReject(item.id, "Reject")}
                          className="text-red-600 hover:underline"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movement Details Modal */}
      {selectedMovement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Movement Details</h3>
            <p className="mb-2"><strong>Reference:</strong> {selectedMovement.reference}</p>
            <p className="mb-2"><strong>Type:</strong> {selectedMovement.type}</p>
            <p className="mb-2"><strong>Client:</strong> {selectedMovement.client}</p>
            <p className="mb-2"><strong>Asset:</strong> {selectedMovement.asset}</p>
            <p className="mb-2"><strong>Amount:</strong> ${selectedMovement.amount.toLocaleString()}</p>
            <p className="mb-2"><strong>Date:</strong> {selectedMovement.date}</p>
            <p className="mb-4"><strong>Status:</strong> {selectedMovement.status}</p>
            <p className="mb-4"><strong>Description:</strong> {selectedMovement.details}</p>
            
            <div className="flex justify-end space-x-4">
              <button 
                onClick={closeDetailsModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// New Akadia Notification Tab
function AkadiaNotificationTab() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Margin Call",
      tradeId: "TRD007",
      client: "Alpha Corp",
      requiredMargin: 150000,
      currentCollateral: 100000,
      shortfall: 50000,
      status: "New",
      dateSent: "2024-06-20 09:00 AM",
      dueDate: "2024-06-21 05:00 PM",
      history: [],
    },
    {
      id: 2,
      type: "Margin Call",
      tradeId: "TRD008",
      client: "Bravo Ltd",
      requiredMargin: 80000,
      currentCollateral: 80000,
      shortfall: 0,
      status: "New",
      dateSent: "2024-06-20 10:30 AM",
      dueDate: "2024-06-21 05:00 PM",
      history: [],
    },
    {
      id: 3,
      type: "Collateral Request",
      tradeId: "TRD009",
      client: "Charlie Inc",
      requiredMargin: 200000,
      currentCollateral: 180000,
      shortfall: 20000,
      status: "Accepted",
      dateSent: "2024-06-19 01:00 PM",
      dueDate: "2024-06-20 05:00 PM",
      history: [{ action: "Accepted", notes: "Collateral dispatched.", timestamp: "2024-06-19 03:00 PM" }],
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [newProposedMargin, setNewProposedMargin] = useState("");
  const [proposalReason, setProposalReason] = useState("");
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [filterClient, setFilterClient] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loadingLLM, setLoadingLLM] = useState(false);

  const clients = ["All", "Alpha Corp", "Bravo Ltd", "Charlie Inc"];
  const notificationStatuses = ["All", "New", "Accepted", "Rejected", "Responded"];

  const handleAction = async (notificationId, actionType, proposal = null) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => {
        if (notif.id === notificationId) {
          const newHistoryEntry = {
            action: actionType,
            timestamp: new Date().toLocaleString(),
            notes: proposal ? `Proposed new margin: $${proposal.amount}, Reason: ${proposal.reason}` : "",
          };

          let newStatus = notif.status;
          if (actionType === "Accept") newStatus = "Accepted";
          if (actionType === "Reject") newStatus = "Rejected";
          if (actionType === "Propose New Margin") newStatus = "Responded";

          return {
            ...notif,
            status: newStatus,
            history: [...notif.history, newHistoryEntry],
          };
        }
        return notif;
      })
    );

    let llmPrompt = "";
    if (actionType === "Accept") {
      llmPrompt = `Draft a confirmation message for client ${selectedNotification.client} for accepting margin call ${selectedNotification.tradeId}. Confirm receipt and next steps.`;
    } else if (actionType === "Reject") {
      llmPrompt = `Draft a rejection message for client ${selectedNotification.client} for margin call ${selectedNotification.tradeId}. Ask for clarification or alternative proposals.`;
    } else if (actionType === "Propose New Margin" && proposal) {
      llmPrompt = `Draft a message for client ${selectedNotification.client} proposing a new margin of $${proposal.amount} for trade ${selectedNotification.tradeId} with reason: ${proposal.reason}. Explain the proposal clearly.`;
    }

    if (llmPrompt) {
      setLoadingLLM(true);
      try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: llmPrompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will provide this at runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        let llmResponseText = "AI response unavailable.";
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          llmResponseText = result.candidates[0].content.parts[0].text;
        }
        alert(`Simulated message sent to client (${actionType}):\n\n${llmResponseText}`);
      } catch (error) {
        console.error("Error calling LLM:", error);
        alert("Failed to generate client message with AI.");
      } finally {
        setLoadingLLM(false);
      }
    }
    setSelectedNotification(null); // Close modal
    setShowProposeModal(false); // Close propose modal
  };

  const openProposeModal = (notification) => {
    setSelectedNotification(notification);
    setShowProposeModal(true);
    setNewProposedMargin("");
    setProposalReason("");
  };

  const handleProposeSubmit = () => {
    if (selectedNotification && newProposedMargin && proposalReason) {
      handleAction(selectedNotification.id, "Propose New Margin", {
        amount: newProposedMargin,
        reason: proposalReason,
      });
    } else {
      alert("Please enter a proposed margin and a reason.");
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    const clientMatch = filterClient === "All" || notif.client === filterClient;
    const statusMatch = filterStatus === "All" || notif.status === filterStatus;
    return clientMatch && statusMatch;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Akadia Notification System</h2>
      
      {/* Filters */}
      <div className="flex space-x-4 mb-4 bg-white p-4 rounded shadow">
        <select 
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="border rounded p-2"
        >
          {clients.map(client => (
            <option key={client} value={client}>{client}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          {notificationStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Notifications Table */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Incoming Notifications</h3>
        <div className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Trade ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Required Margin</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Current Collateral</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Shortfall</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Due Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-4 text-center text-gray-500">No notifications found.</td>
                </tr>
              ) : (
                filteredNotifications.map(notif => (
                  <tr key={notif.id} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-700">{notif.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{notif.type}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{notif.client}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{notif.tradeId}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${notif.requiredMargin.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${notif.currentCollateral.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <span className={notif.shortfall > 0 ? "text-red-600" : "text-green-600"}>
                        ${notif.shortfall.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        notif.status === "New" ? "bg-blue-100 text-blue-800" :
                        notif.status === "Accepted" ? "bg-green-100 text-green-800" :
                        notif.status === "Rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800" // Responded
                      }`}>
                        {notif.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{notif.dueDate}</td>
                    <td className="px-4 py-2 text-sm flex space-x-2">
                      {notif.status === "New" && (
                        <>
                          <button 
                            onClick={() => handleAction(notif.id, "Accept")}
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleAction(notif.id, "Reject")}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => openProposeModal(notif)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                          >
                            Propose New
                          </button>
                        </>
                      )}
                      {(notif.status !== "New" && notif.history.length > 0) && (
                        <button 
                          onClick={() => setSelectedNotification(notif)}
                          className="text-gray-600 hover:underline text-xs"
                        >
                          View History
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Propose New Margin Modal */}
      {showProposeModal && selectedNotification && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Propose New Margin</h3>
            <p className="mb-2"><strong>Trade ID:</strong> {selectedNotification.tradeId}</p>
            <p className="mb-2"><strong>Client:</strong> {selectedNotification.client}</p>
            <p className="mb-4"><strong>Current Shortfall:</strong> ${selectedNotification.shortfall.toLocaleString()}</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Proposed Margin Amount ($)</label>
              <input
                type="number"
                value={newProposedMargin}
                onChange={(e) => setNewProposedMargin(e.target.value)}
                placeholder="Enter new proposed margin"
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Proposal</label>
              <textarea
                value={proposalReason}
                onChange={(e) => setProposalReason(e.target.value)}
                rows="3"
                placeholder="Explain why you are proposing a new margin..."
                className="border rounded p-2 w-full"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowProposeModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleProposeSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loadingLLM}
              >
                 {loadingLLM ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Submit Proposal"
                  )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification History Modal */}
      {selectedNotification && !showProposeModal && ( // Only show if not propose modal
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Notification History - {selectedNotification.tradeId}</h3>
            <p className="mb-2"><strong>Client:</strong> {selectedNotification.client}</p>
            <p className="mb-4"><strong>Type:</strong> {selectedNotification.type}</p>

            <div className="max-h-60 overflow-y-auto mb-4">
              {selectedNotification.history.length === 0 ? (
                <p className="text-gray-500">No history for this notification.</p>
              ) : (
                selectedNotification.history.map((entry, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-2 mb-2">
                    <p className="text-sm"><strong>Action:</strong> {entry.action}</p>
                    <p className="text-xs text-gray-600">Timestamp: {entry.timestamp}</p>
                    {entry.notes && <p className="text-xs text-gray-600">Notes: {entry.notes}</p>}
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedNotification(null)} // Close the history modal
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const tabs = {
    Dashboard: <DashboardTab />,
    "Trade & Valuation": <TradeValuationTab />,
    Valuation: <ValuationTab />,
    "Margin Calculator": <MarginCalculatorTab />,
    "Portfolio Reconciliation": <PortfolioReconciliationTab />,
    "Client Communication": <ClientCommunicationTab />,
    "Financial Page": <FinancialPageTab />,
    "Collateral Management": <CollateralManagementTab />,
    "Collateral Movements": <CollateralMovementsTab />,
    "Akadia Notification": <AkadiaNotificationTab />,
    MIS: <MisTab />,
  };

  return (
    <div className="flex">
      <aside className="w-1/5 bg-blue-800 text-white min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-8">Collateral CMS</h1>
        {Object.keys(tabs).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left mb-4 p-2 rounded ${
              activeTab === tab ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </aside>
      // @ts-ignore
      <main className="w-4/5 p-8 bg-gray-100">{tabs[activeTab]}</main>
    </div>
  );
}
