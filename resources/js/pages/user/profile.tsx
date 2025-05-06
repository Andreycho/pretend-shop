"use client"

import { usePage } from "@inertiajs/react"
import { User, Mail, Calendar, Edit, Camera } from "lucide-react"
import UserLayout from "../user/layouts/user-layout"
import { useState } from "react"

interface UserData {
  id: number
  name: string
  email: string
  created_at: string
}

export default function Profile() {
  const { auth } = usePage().props as unknown as {
    auth: { user: UserData }
  }

  const { user } = auth
  const [showEditAvatar, setShowEditAvatar] = useState(false)

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const memberSince = user.created_at ? formatDate(user.created_at) : "N/A"

  return (
    <UserLayout title="My Profile">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 h-32"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-6 flex justify-center">
                <div
                  className="relative"
                  onMouseEnter={() => setShowEditAvatar(true)}
                  onMouseLeave={() => setShowEditAvatar(false)}
                >
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center overflow-hidden">
                    <span className="text-blue-600 text-5xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  {showEditAvatar && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                <p className="text-gray-500">Member since {memberSince}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                      <p className="text-lg font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                      <p className="text-lg font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
                      <p className="text-lg font-medium text-gray-900">{memberSince}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Account ID</h3>
                      <p className="text-lg font-medium text-gray-900">#{user.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
