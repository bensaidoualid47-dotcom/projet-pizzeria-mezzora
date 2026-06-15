import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, TrendingUp, Euro, Users } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, completed, pending

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/orders/`);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'completed') return order.payment_status === 'paid';
    if (filter === 'pending') return order.payment_status === 'pending';
    return true;
  });

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.payment_status === 'paid').length,
    pending: orders.filter(o => o.payment_status === 'pending').length,
    revenue: orders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + o.total, 0),
  };

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          <CheckCircle className="w-4 h-4" />
          Payé
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
        <Clock className="w-4 h-4" />
        En attente
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">Dashboard Admin</h1>
              <p className="text-gray-600">Mezzora Pizza - Gestion des commandes</p>
            </div>
            <button
              onClick={fetchOrders}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Actualiser
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-semibold">Total Commandes</h3>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-black">{stats.total}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-semibold">Complétées</h3>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-black">{stats.completed}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-semibold">En Attente</h3>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-black">{stats.pending}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-semibold">Revenu Total</h3>
              <Euro className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.revenue.toFixed(2)} €</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({orders.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'completed'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Complétées ({stats.completed})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'pending'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En attente ({stats.pending})
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Articles
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mode
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      Aucune commande trouvée
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-black">{order.order_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-semibold text-black">
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="text-gray-500">{order.customer.email}</div>
                          <div className="text-gray-500">{order.customer.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {order.items.length} article{order.items.length > 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.deliveryMethod === 'livraison'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {order.deliveryMethod === 'livraison' ? 'Livraison' : 'À emporter'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-green-600">
                          {order.total.toFixed(2)} €
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.payment_status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleString('fr-FR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
