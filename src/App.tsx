//import React from 'react';
import React, { useState, useEffect } from "react"
import './App.css';
import 'antd/dist/antd.css';
import { Layout,Button } from 'antd';
import { Select, Timeline } from '@/components'
import { getUserList, getEvents, delateEvent } from "@/api/events"
//import {Flipper,Flipped} from "react-flip-toolkit"
const { Content } = Layout

function App() {
  const [eventsList, setEventsList] = useState([])
  const [usersList, setUsersList] = useState([])
  const [currentUserId, setCurrentUserId] = useState()
  const [currentEventId, setCurrentEventId] = useState()
  const getEventByUserId = async (userId: any) => {
    const events = await getEvents({ user_id: userId,current_item_id:currentEventId })
    setEventsList(events)
  }
  const onUserChange = (user_id: any) => {
    setCurrentUserId(user_id)
  }
  const onDeleteEvent = (id: any) => {
    delateEvent({ id }).then(((res) => {
      console.log(delateEvent)
      getEventByUserId(currentUserId)
    }))
  }
  const onClickEvent = (id: any) => {
    setCurrentEventId(id)
  }

  const onUp = () => {
    if(currentUserId){
   
      const currentItemIndex = eventsList.findIndex(({id})=>id===currentEventId)

      const nextItem=eventsList[currentItemIndex-1]
         // @ts-ignore
         console.log(nextItem)
    
      if(nextItem){
        // @ts-ignore
        setCurrentEventId(nextItem.id)
      }
    }

  }
  const onDown = () => {
    if(currentUserId){
      const currentItemIndex = eventsList.findIndex(({id})=>id===currentEventId)
      const nextItem=eventsList[currentItemIndex+1]
      if(nextItem){
        // @ts-ignore
        setCurrentEventId(nextItem.id)
      }
    }
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
  }, [currentUserId,currentEventId])
  // @ts-ignore
  return (

    <Content style={{ maxWidth: '1000px', margin: 'auto', width: '100%' }}>
      User Id
      <Select items={usersList} defaultValue={currentUserId} onChange={onUserChange} size='large'></Select>
      <Button onClick={onUp}>UP</Button>
      <Timeline mode="left">{eventsList.map(({ id, timestamp }) => (
        <Timeline.Item key={id} label={timestamp}><div style={id===currentEventId?{backgroundColor:'red'}:{}} onClick={() => { onClickEvent(id) }}>{id}<button onClick={() => { onDeleteEvent(id) }}>del</button></div></Timeline.Item>
      ))
      }
      </Timeline>
      <Button onClick={onDown}>DOWN</Button>
    </Content>

  );
}

export default App;
