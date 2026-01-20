'use client';

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { Users, CreditCard, Activity, TrendingUp } from 'lucide-react';

// Mock Data
const trafficData = [
    { name: '06:00', users: 120 },
    { name: '09:00', users: 450 },
    { name: '12:00', users: 890 },
    { name: '15:00', users: 670 },
    { name: '18:00', users: 340 },
    { name: '21:00', users: 150 },
];

const serviceData = [
    { name: 'Electricity', value: 45, color: '#facc15' },
    { name: 'Water', value: 20, color: '#10b981' },
    { name: 'Gas', value: 15, color: '#3b82f6' },
    { name: 'Others', value: 20, color: '#fb923c' },
];

const revenueData = [
    { name: 'Mon', amount: 12000 },
    { name: 'Tue', amount: 15000 },
    { name: 'Wed', amount: 18000 },
    { name: 'Thu', amount: 14000 },
    { name: 'Fri', amount: 22000 },
    { name: 'Sat', amount: 25000 },
    { name: 'Sun', amount: 10000 },
];

export default function AdminDashboard() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Dashboard Overview</h1>
                <p style={styles.subtitle}>Welcome back, Administrator. System is operating normally.</p>
            </header>

            {/* Stat Cards */}
            <div style={styles.statGrid}>
                <StatCard icon={<Users size={24} color="#3b82f6" />} title="Total Visitors" value="12,450" trend="+12%" />
                <StatCard icon={<CreditCard size={24} color="#10b981" />} title="Revenue Processed" value="₹ 4.2L" trend="+8%" />
                <StatCard icon={<Activity size={24} color="#f43f5e" />} title="Pending Requests" value="145" trend="-2%" />
                <StatCard icon={<TrendingUp size={24} color="#8b5cf6" />} title="System Uptime" value="99.9%" trend="Stable" />
            </div>

            <div style={styles.chartsGrid}>
                {/* Traffic Chart */}
                <div style={styles.chartCard}>
                    <h3 style={styles.chartTitle}>Daily Footfall Traffic</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={trafficData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Distribution */}
                <div style={styles.chartCard}>
                    <h3 style={styles.chartTitle}>Service Popularity</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={serviceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {serviceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Bar Chart */}
                <div style={{ ...styles.chartCard, gridColumn: '1 / -1' }}>
                    <h3 style={styles.chartTitle}>Weekly Revenue Collection</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, trend }: any) {
    const isPositive = trend.includes('+') || trend === 'Stable';
    return (
        <div style={styles.statCard}>
            <div style={styles.statHeader}>
                <div style={styles.statIcon}>{icon}</div>
                <span style={{
                    ...styles.trend,
                    color: isPositive ? '#10b981' : '#ef4444',
                    background: isPositive ? '#d1fae5' : '#fee2e2'
                }}>
                    {trend}
                </span>
            </div>
            <div style={styles.statInfo}>
                <h4 style={styles.statValue}>{value}</h4>
                <p style={styles.statTitle}>{title}</p>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    header: {
        marginBottom: '1rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 800,
        color: '#1e293b',
        margin: 0,
    },
    subtitle: {
        color: '#64748b',
        fontSize: '1rem',
        margin: '0.5rem 0 0 0',
    },
    statGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
    },
    statCard: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    statHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    statIcon: {
        padding: '0.75rem',
        background: '#f8fafc',
        borderRadius: '1rem',
    },
    trend: {
        fontSize: '0.75rem',
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: '1rem',
    },
    statInfo: {},
    statValue: {
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#1e293b',
        margin: 0,
    },
    statTitle: {
        fontSize: '0.9rem',
        color: '#64748b',
        margin: '0.25rem 0 0 0',
        fontWeight: 500,
    },
    chartsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
    },
    chartCard: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    },
    chartTitle: {
        fontSize: '1.2rem',
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '1.5rem',
    }
};
