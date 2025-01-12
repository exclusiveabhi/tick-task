import { useState } from 'react'
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Textarea } from "./components/ui/textarea"
import { Plus, Bell, ListTodo, CircleCheckBig, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function App() {
  const [view, setView] = useState('add-task')
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [taskPriority, setTaskPriority] = useState('')
  const [notificationType, setNotificationType] = useState('email')
  const [notificationEmail, setNotificationEmail] = useState('')
  const [notificationWhatsApp, setNotificationWhatsApp] = useState('')
  const [notificationTime, setNotificationTime] = useState(10)
  const [popupMessage, setPopupMessage] = useState('')
  const [popupColor, setPopupColor] = useState('green')

  const addTask = () => {
    if (!taskTitle || !taskDescription || !taskDeadline || !taskPriority) {
      setPopupMessage('All fields are required!')
      setPopupColor('red')
      setTimeout(() => setPopupMessage(''), 3000)
      return
    }
    setTasks([...tasks, { title: taskTitle, description: taskDescription, deadline: taskDeadline, priority: taskPriority }])
    setTaskTitle('')
    setTaskDescription('')
    setTaskDeadline('')
    setTaskPriority('')
    setPopupMessage('Task added successfully!')
    setPopupColor('green')
    setTimeout(() => setPopupMessage(''), 3000)
  }

  const saveNotification = () => {
    if (!notificationEmail && notificationType === 'email') {
      setPopupMessage('Email is required!')
      setPopupColor('red')
      setTimeout(() => setPopupMessage(''), 3000)
      return
    }
    if (!notificationWhatsApp && notificationType === 'whatsapp') {
      setPopupMessage('WhatsApp number is required!')
      setPopupColor('red')
      setTimeout(() => setPopupMessage(''), 3000)
      return
    }
    setPopupMessage('Notification settings saved!')
    setPopupColor('green')
    setTimeout(() => setPopupMessage(''), 3000)
  }

  const saveNotificationDetails = () => {
    if (!notificationTime) {
      setPopupMessage('Notification time is required!')
      setPopupColor('red')
      setTimeout(() => setPopupMessage(''), 3000)
      return
    }
    setPopupMessage('Notification details saved!')
    setPopupColor('green')
    setTimeout(() => setPopupMessage(''), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <CircleCheckBig className="h-6 w-6 text-black-500 mr-2" />
            <h1 className="text-2xl font-bold text-black-500">Task Tick</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <div className="w-[23.5%] pr-5">
          <div className="flex flex-col space-y-4">
            <Button
              variant="outline"
              onClick={() => setView('add-task')}
              className="w-full flex items-center justify-center space-x-2 text-center md:space-x-2"
            >
              <Plus className="h-6 w-6" />
              <span className="hidden md:inline">Add Task</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setView('view-tasks')}
              className="w-full flex items-center justify-center space-x-2 text-center md:space-x-2"
            >
              <ListTodo className="h-6 w-6" />
              <span className="hidden md:inline">View All Tasks</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setView('notification-type')}
              className="w-full flex items-center justify-center space-x-2 text-center md:space-x-2"
            >
              <Bell className="h-6 w-6" />
              <span className="hidden md:inline">Notification Type</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setView('notify-details')}
              className="w-full flex items-center justify-center space-x-2 text-center md:space-x-2"
            >
              <Clock className="h-6 w-6" />
              <span className="hidden md:inline">Notify Details</span>
            </Button>
          </div>
        </div>

        <div className="w-3/4">
          {view === 'add-task' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Add Task</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                    <Input id="title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea id="description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-sm font-medium">Deadline</Label>
                    <Input id="deadline" type="datetime-local" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} className="w-full" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
                    <Select onValueChange={(value) => setTaskPriority(value)} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={addTask} className="w-full">
                    Add Task
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
          {view === 'view-tasks' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card className="bg-white shadow-md rounded-lg p-4">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{task.description}</p>
                      <p className="text-gray-600">Deadline: {task.deadline}</p>
                      <p className="text-gray-600">Priority: {task.priority}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          {view === 'notification-type' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Notification Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup defaultValue="email" onValueChange={(value) => setNotificationType(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp</Label>
                    </div>
                  </RadioGroup>
                  {notificationType === 'email' && (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                      <Input id="email" value={notificationEmail} onChange={(e) => setNotificationEmail(e.target.value)} className="w-full" required />
                    </div>
                  )}
                  {notificationType === 'whatsapp' && (
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp number</Label>
                      <Input id="whatsapp" value={notificationWhatsApp} onChange={(e) => setNotificationWhatsApp(e.target.value)} className="w-full" required />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={saveNotification} className="w-full">
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
          {view === 'notify-details' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Notification Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium">Time (in minutes)</Label>
                    <Input id="time" type="number" value={notificationTime} onChange={(e) => setNotificationTime(e.target.value)} className="w-full" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveNotificationDetails} className="w-full">
                    Save Notification Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      {/* Popup Alerts */}
      {popupMessage && (
        <div
          className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-md text-white ${popupColor === 'green' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {popupMessage}
        </div>
      )}
    </div>
  )
}
