//import React from 'react';
import React, { useState, useEffect } from "react"
import './App.css';
import 'antd/dist/antd.css';
import {  Layout } from 'antd';
import {Select,Timeline} from '@/components'
import {getUserList,getEvents,delateEvent} from "@/api/events"
import {Flipper,Flipped} from "react-flip-toolkit"
const { Content } = Layout

function App() {
  const [eventsList, setEventsList] = useState([])
  const [usersList, setUsersList] = useState([])
  const [currentUserId, setCurrentUserId] = useState()
  const getEventByUserId = async (userId:any) => {
    const events = await getEvents({ user_id: userId })
    setEventsList(events)
  }
  const onUserChange = (user_id: any) => {
    setCurrentUserId(user_id)
  }
  const onDeleteEvent = (id: any) => {
    delateEvent({id}).then(((res) => {
      console.log(delateEvent)
      getEventByUserId(currentUserId)
    }))
  }
  const getUsers = async () => {
    const users = await getUserList()
      setUsersList(users)
      setCurrentUserId(users[0].value)
  }
useEffect(() => {
    getUsers()
}, [])
useEffect(() => {
  if (currentUserId) {
    getEventByUserId(currentUserId)
  }
}, [currentUserId])
// @ts-ignore
return (

    <Content style={{ maxWidth: '1000px', margin: 'auto', width: '100%' }}>
      User Id
        <Select items={usersList} defaultValue={currentUserId} onChange={onUserChange} size='large'></Select>
        <Timeline mode="left">{eventsList.map(({ id, timestamp }) => (
          <Timeline.Item  key={id} label={timestamp}>{id}vb<button onClick={()=>{onDeleteEvent(id)}}>del</button></Timeline.Item>
        ))
        }
        </Timeline>
      
    </Content>

);
}

export default App;
