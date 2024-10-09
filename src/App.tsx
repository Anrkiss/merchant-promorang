import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BoomerangLoader from './components/BoomerangLoader'
import BusinessQuestionnaire from './components/BusinessQuestionnaire'
import MerchantDashboard from './components/MerchantDashboard'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    // Simulate initial app loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    setIsLoading(true)
    // Simulate loading after login
    setTimeout(() => {
      setIsLoading(false)
      setShowQuestionnaire(true)
    }, 3000)
  }

  const handleQuestionnaireSubmit = (data: any) => {
    console.log('Questionnaire submitted:', data)
    // Here you would typically send this data to your backend
    setShowQuestionnaire(false)
    setShowDashboard(true)
  }

  if (isLoading) {
    return <BoomerangLoader appName="Promorang" backgroundColor="bg-orange-500" boomerangColor="text-white" textColor="text-gray-100" />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn && <LoginForm onLogin={handleLogin} />}
      {isLoggedIn && !showQuestionnaire && !showDashboard && (
        <div className="text-2xl font-bold text-orange-500 text-center p-8">Welcome! You are logged in.</div>
      )}
      {showQuestionnaire && <BusinessQuestionnaire onSubmit={handleQuestionnaireSubmit} />}
      {showDashboard && <MerchantDashboard />}
    </div>
  )
}

export default App