'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PaymentPageProps {
  params: {
    id: string;
  };
}

const PaymentPage = ({ params }: PaymentPageProps) => {
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    // Combine both offers and destinations for lookup
    const offers = [
      {
        id: 1,
        from: 'São Paulo',
        to: 'Miami',
        details: 'Voo direto + 5 diárias',
        price: 3499,
        image: '/images/miami.jpg',
      },
      {
        id: 2,
        from: 'Rio',
        to: 'Paris',
        details: 'Voo + 7 diárias',
        price: 4299,
        image: '/images/paris.jpg',
      },
      {
        id: 3,
        from: 'São Paulo',
        to: 'Roma',
        details: 'Voo + 6 diárias',
        price: 3999,
        image: '/images/roma.jpg',
      }
    ];

    const destinations = [
      { id: 4, name: 'Rio de Janeiro', price: 299, image: '/images/rio.jpg', details: 'Passagem aérea' },
      { id: 5, name: 'Salvador', price: 399, image: '/images/salvador.jpg', details: 'Passagem aérea' },
      { id: 6, name: 'Florianópolis', price: 349, image: '/images/florianopolis.jpg', details: 'Passagem aérea' },
      { id: 7, name: 'Fortaleza', price: 449, image: '/images/fortaleza.jpg', details: 'Passagem aérea' }
    ];

    const allItems = [...offers, ...destinations.map(dest => ({
      id: dest.id,
      from: 'São Paulo',
      to: dest.name,
      details: dest.details,
      price: dest.price,
      image: dest.image
    }))];

    const found = allItems.find(item => item.id === parseInt(params.id));
    setDestination(found);
  }, [params.id]);

  if (!destination) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Pagamento - {destination.from} → {destination.to}
        </h1>
        <p className="text-gray-600 mb-4">{destination.details}</p>
        <p className="text-xl text-blue-600 font-bold mb-6">
          Total: R${destination.price}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número do cartão</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Validade</label>
              <input
                type="text"
                placeholder="MM/AA"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors">
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;