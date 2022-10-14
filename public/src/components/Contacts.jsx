import axios from 'axios'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logojira.svg'
import {getUnreadNumRoute} from '../utils/APIRoutes'

function Contacts({contacts, currentUser, changeChat}) {

  const [currentUserName, setCurrentUserName] = useState(null)
  const [currentUserImage, setCurrentUserImage] = useState(null)
  const [currentSelected, setCurrentSelected] = useState(null)
  const [unreadNum, setUnreadNum] = useState([])

  useEffect(() => {
    if(currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }

  }, [currentUser])
  const getUsersUnread = async () => {
    console.log('lalalalalala');
    const promiseArr = contacts.map( (contact, index) => 
        axios.post(getUnreadNumRoute, {from: contact._id, to: currentUser._id})
    )
    console.log('promiseArr:', promiseArr)
     
      const values = Promise.all(promiseArr)
    console.log('1');
    // setTimeout(() =>{console.log('asdfas')}, 5000)
    const val = await values
    console.log(2)
    console.log('values:', val)
  }

  // useEffect( () => {
  //   console.log('here')
  //   if(currentUser) {
     
  //     getUsersUnread()
  //   }
    
  // }, [currentSelected])

  // useEffect(() => {
  //   let newArr = unreadNum.map(e => e)
  //   setUnreadNum(newArr)
  // }, [unreadNum])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact)
  }

  return (
    <>
    {
      currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt='logo' />
            <h3>ChatApp</h3>
          </div>
          <div className="contacts">
            {
              contacts.map((contact, index) => {
                return (
                  <div className={`contact ${index === currentSelected ? 'selected' : ''}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                      <h2>{contact.username}</h2>
                    </div>
                    <div className="info">
                      <div className="timestamp">Timestamp</div>
                      <div className="unreadNum">
                        {unreadNum[index]}
                      </div>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
          <div className="current-user" onClick={getUsersUnread}>
          <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                      <h2>{currentUserName}</h2>
                    </div>
          </div>
        </Container>
      )
    }
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    gap: 0.8rem;
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.4s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      .info {
        margin-left: auto;
        border: solid;
        display: flex;
        flex-direction: column;
        height: 90%;
        align-items: center;
        .unreadNum {
          /* flex-grow: 1; */
          height: 20%;
          background: #d9aef1;
          border-radius: 50%;
          font-size: 0.9rem;
          width: 1.1rem;
          height: 1.1rem;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          margin-top: 0.3rem;
        }
        .timestamp {
          /* flex-grow: 2; */
          height: 40%;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;

        }
      }
    }
  }
`;

export default Contacts