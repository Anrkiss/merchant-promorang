import React, { useState } from 'react'
import { PlusCircle, BarChart2, DollarSign, Bell, User, TrendingUp, Settings } from 'lucide-react'
import CreateTaskPage from './CreateTaskPage'

// ... (keep the existing interfaces)

const MerchantDashboard: React.FC = () => {
  // ... (keep the existing state)

  const [showCreateTask, setShowCreateTask] = useState(false)

  const handleCreateTask = () => {
    setShowCreateTask(true)
  }

  if (showCreateTask) {
    return <CreateTaskPage onClose={() => setShowCreateTask(false)} />
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-orange-500">Promorang</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                <Settings className="h-6 w-6" />
              </button>
              <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ... (keep the existing dashboard content) */}

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Active Tasks</h2>
          <button
            onClick={handleCreateTask}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Task
          </button>
        </div>
        {/* ... (keep the existing active tasks list) */}
      </div>

      {/* ... (keep the rest of the dashboard content) */}
    </div>
  )
}

// ... (keep the DashboardCard and AnalyticsCard components)

export default MerchantDashboard