import React from 'react';
import { mockData } from '../mockData';
import Card from '../components/ui/Card';

function Property() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-surface-900">Managed Properties</h2>
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {mockData.properties.map((prop) => (
          <Card key={prop.id} className="p-4">
            <img src={prop.image} alt={prop.title} className="h-[150px] w-full rounded-md object-cover" />
            <h3 className="mt-3 text-lg font-semibold text-surface-900">{prop.title}</h3>
            <p className="mt-1 font-semibold text-surface-800">{prop.price}</p>
            <p className="mt-1 text-surface-600">{prop.address}</p>
            <p className="mt-2 text-xs text-surface-500">{prop.description.substring(0, 100)}...</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Property;
