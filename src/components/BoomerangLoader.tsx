import React from 'react'

interface BoomerangLoaderProps {
  appName: string
  backgroundColor?: string
  boomerangColor?: string
  textColor?: string
}

export default function BoomerangLoader({
  appName,
  backgroundColor = 'bg-orange-500',
  boomerangColor = 'text-white',
  textColor = 'text-gray-100'
}: BoomerangLoaderProps) {
  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center ${backgroundColor}`}>
      <div className={`text-5xl ${boomerangColor} animate-spin`}>
        🪃
      </div>
      <p className={`mt-8 text-2xl font-bold ${textColor} animate-pulse`}>
        Loading {appName}...
      </p>
    </div>
  )
}