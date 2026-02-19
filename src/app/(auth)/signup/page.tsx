import { SignUpForm } from '@/components/SignUpForm'
import React from 'react'

const SignUpPage = () => {
  return (
     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">

      <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 top-20 left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 bottom-20 right-10"></div>

      {/* Signup Card */}
      <div className="relative w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage