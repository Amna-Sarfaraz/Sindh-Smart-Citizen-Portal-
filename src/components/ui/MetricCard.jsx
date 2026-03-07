import React from 'react';
import Card from './Card';

function MetricCard({ value, label }) {
  return (
    <Card className="p-6 text-center">
      <h3 className="text-3xl font-bold text-brand-600">{value}</h3>
      <p className="text-surface-600">{label}</p>
    </Card>
  );
}

export default MetricCard;
