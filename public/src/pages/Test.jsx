// import axios from 'axios'
import React, {useContext, useEffect} from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { host} from '../utils/APIRoutes'
import {io} from 'socket.io-client'
import {SocketContext} from '../store/socket-context'

export default function Test() {
  const socket = useContext(SocketContext)
  const [testState, setTestState] = useState(false)
  console.log('Test component rendered')

//  const listener = useCallback(message => {
//   console.log('message fromlistener:', message)
//  }, [])

  // useEffect(() => {
  //   console.log('socket', socket)
  //   socket.on('send-msg', listener)
  //   return () => socket.off('send-msg', listener)
  // }, [])

  useEffect(() => {
      console.log('Socket exist', socket);
      socket.once('lala', lala => {
        
        console.log('emited lala', lala)
      })

      return () => socket.off('lala')
    }, [socket])

  const socketHandler = () => {
    console.log('socketHandler fired')
    socket.emit('test-socket', 'testing testing')
  }
 
  return (
      <button onClick={socketHandler}>Run</button>
  )
}
