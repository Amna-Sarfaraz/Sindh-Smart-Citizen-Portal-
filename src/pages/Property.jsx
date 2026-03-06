import React from 'react';
import { mockData } from '../mockData';

function Property() {
    return (
        <div className="page">
            <h2>Managed Properties</h2>
            <div className="grid">
                {mockData.properties.map(prop => (
                    <div key={prop.id} className="card">
                        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                        <h3>{prop.title}</h3>
                        <p><strong>{prop.price}</strong></p>
                        <p>{prop.address}</p>
                        <p style={{ fontSize: '0.8rem' }}>{prop.description.substring(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Property;
