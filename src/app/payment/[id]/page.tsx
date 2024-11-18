'use client';

import { useState, useEffect } from 'react';
import { offers, destinations } from '@/lib/data';

interface PaymentPageProps {
    params: {
        id: string;
    };
}

const PaymentPage = ({ params }: PaymentPageProps) => {
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        const id = parseInt(params.id);
        const offer = offers.find(o => o.id === id);
        const destination = destinations.find(d => d.id === id);

        if (offer) {
            setItem({
                from: offer.from,
                to: offer.to,
                details: offer.details,
                price: offer.price,
                image: offer.image
            });
        } else if (destination) {
            setItem({
                from: 'São Paulo',
                to: destination.name,
                details: 'Passagem aérea',
                price: destination.price,
                image: destination.image
            });
        }
    }, [params.id]);

    if (!item) return <div className="text-center py-10">Pacote não encontrado.</div>;

    return (
        <div className="container mx-auto max-w-2xl p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Pagamento - {item.from} → {item.to}
                </h1>
                <p className="text-gray-600 mb-4">{item.details}</p>
                <p className="text-xl text-blue-600 font-bold mb-6">
                    Total: R${item.price}
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