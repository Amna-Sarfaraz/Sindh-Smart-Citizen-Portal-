import React from 'react';
import { mockData } from '../mockData';

function Landing() {
    return (
        <div className="page">
            <header className="hero">
                <h1>{mockData.stats.totalComplaints}+ Problems Solved</h1>
                <p>Smart City Service Complaint Portal (SSCP) - Your voice for a better city.</p>
            </header>

            <section>
                <h2>Our Impact</h2>
                <div className="stats-grid">
                    <div>
                        <h3>{mockData.stats.totalComplaints}</h3>
                        <p>Total Complaints</p>
                    </div>
                    <div>
                        <h3>{mockData.stats.resolvedComplaints}</h3>
                        <p>Resolved</p>
                    </div>
                    <div>
                        <h3>{mockData.stats.activeProperties}</h3>
                        <p>Managed Properties</p>
                    </div>
                </div>
            </section>

            <section>
                <h2>About SSCP</h2>
                <p>The Smart City Service Complaint Portal is a comprehensive platform designed to streamline communication between citizens and city administration. Our goal is to ensure every issue is tracked, addressed, and resolved efficiently.</p>
            </section>
        </div>
    );
}

export default Landing;
