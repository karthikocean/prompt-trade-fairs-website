import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { motion } from 'framer-motion';

const visitorData = [
  { name: '2020', visitors: 4000, exhibitors: 240 },
  { name: '2021', visitors: 3000, exhibitors: 198 },
  { name: '2022', visitors: 5000, exhibitors: 300 },
  { name: '2023', visitors: 8000, exhibitors: 450 },
  { name: '2024', visitors: 12000, exhibitors: 600 },
  { name: '2025', visitors: 15000, exhibitors: 850 },
];

const industryData = [
  { name: 'Construction', value: 400 },
  { name: 'Food & Tech', value: 300 },
  { name: 'Healthcare', value: 300 },
  { name: 'Real Estate', value: 200 },
  { name: 'Engineering', value: 278 },
];

const ReportingCharts = () => {
  return (
    <>
      {/* 
      <section className="reporting-charts-section" style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row">
              <div className="header-accent-line"></div>
              <span className="header-accent-tag">ANALYTICS</span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title">Expo <span>Performance</span> Metrics</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 40px', color: '#666' }}>
              Real-time insights into our growing network of exhibitors and visitors across various industries.
            </p>
          </div>

          <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="chart-card" 
              style={{ background: '#f8f9fb', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0', height: '400px' }}
            >
              <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>Growth Trends</h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={visitorData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ED1C24" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ED1C24" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#ED1C24' }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#ED1C24" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="chart-card" 
              style={{ background: '#f8f9fb', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0', height: '400px' }}
            >
              <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>Sector Distribution</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={industryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(237, 28, 36, 0.05)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" fill="#ED1C24" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

          </div>
        </div>
      </section>
      */}
    </>
  );
};

export default ReportingCharts;

