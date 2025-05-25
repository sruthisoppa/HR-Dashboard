// pages/index.jsx
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import InfiniteScroll from 'react-infinite-scroll-component'

const generateMockUsers = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: `User ${start + i}`,
  }))

export default function Home() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('users')
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  // User list for infinite scroll
  const [users, setUsers] = useState(generateMockUsers(1, 20))
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreUsers = () => {
    const currentLength = users.length
    const newUsers = generateMockUsers(currentLength + 1, 20)
    setTimeout(() => {
      setUsers([...users, ...newUsers])
      if (users.length + newUsers.length >= 100) {
        setHasMore(false)
      }
    }, 500)
  }

  // Create User form state
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleCreateUser = () => {
    // Basic validation
    const errs = {}
    if (!newUser.username) errs.username = 'Username required'
    if (!newUser.email || !/\S+@\S+\.\S+/.test(newUser.email))
      errs.email = 'Valid email required'
    if (newUser.password.length < 6)
      errs.password = 'Password min 6 chars'
    if (Object.keys(errs).length === 0) {
      // Add new user to list (simulate)
      setUsers([{ id: Date.now(), name: newUser.username }, ...users])
      setShowCreateModal(false)
      setNewUser({ username: '', email: '', password: '' })
      setErrors({})
    } else {
      setErrors(errs)
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h2 className="text-2xl mb-4">Please Sign In</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>

      {/* Tabs with animation */}
      <div className="mb-4 flex space-x-4 border-b border-gray-300 pb-2">
        {['users', 'settings'].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence exitBeforeEnter>
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {/* User List with Infinite Scroll */}
              <div className="mb-4">
                <button
                  className="mb-2 px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create User
                </button>
                <InfiniteScroll
                  dataLength={users.length}
                  next={fetchMoreUsers}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  height={300}
                >
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="p-2 border-b border-gray-300"
                    >
                      {user.name}
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </motion.div>
          )}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <p>Settings content here...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Create User</h2>
            <div className="mb-2">
              <label className="block mb-1">Username</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block mb-1">Email</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleCreateUser}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}