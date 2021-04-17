import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Feed, Icon} from 'semantic-ui-react';
import {  useParams } from "react-router";


import ConversationModal from './ConversationModal';

const moment = require('moment');


function ConversationItem({ conversation }) {

  const params = useParams(); 
 

  const channel = Object.values(conversation)

  const userConversation = channel[1]

  
  const messages = channel[2]
 
  let messagesToRead = messages.some(message => !message.read_check)

  let messagesRead = messages.filter(message => message.read_check === true)

  console.log(messagesRead)

  messages.sort((a, b) => {
    let da = new Date(a.createdAt),
      db = new Date(b.createdAt);
    return db - da;
  })


  return (
    
    <div>

      {channel &&

        <div key={conversation.id}>

          <Card>

            <Card.Content>
              <Card.Header >Conversation with {userConversation.userName || (userConversation.name && userConversation.surname)} </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Label image={userConversation.avatar} />

                { messagesToRead &&
               <Link
                to= {{
                  pathname: `/messages/${conversation.id}/read`,
                  state : {userConversation, messages}
                 
              }}>
                
                 <Icon name="envelope outline" size="big"/>
                
                 </Link>
                }


                  <Feed.Content> Click to read your new message
                      <Feed.Date content={moment(conversation.createdAt).startOf('hour').fromNow()} className="mt-0 mb-3" />
                    <>

                    <Feed.Content> Old messages
                    </Feed.Content>

                    { messagesRead.map(message => (
                            <div className="mt-1 " key={message.id}>
                              {message.message}
                            </div>

                          ))}
                  
                    </>
                  </Feed.Content>
                </Feed.Event>


              </Feed>
            </Card.Content>

            <ConversationModal
              userConversation={userConversation}
              messages={messages}
            />
          </Card>


        </div>


      }

    </div>
    
  )


}


export default ConversationItem;



/*{ messages.map(message => (
                            <div className="mt-1 " key={message.id}>
                              {message.message}
                            </div>

                          ))}*/



                          
/*const conversationsAsGuide = Object.values(message).filter(message => (message.user.id === channel[0]))

  conversationsAsGuide.sort((a, b) => {
    let da = new Date(a.createdAt),
      db = new Date(b.createdAt);
    return db - da;
  });


console.log(conversationsAsGuide)


  const conversationsAsUser = Object.values(message).filter(message => (message.user.id != channel[0]))

  conversationsAsUser.sort((a, b) => {
    let da = new Date(a.createdAt),
      db = new Date(b.createdAt);
    return db - da;
  });


  console.log(conversationsAsGuide)

   <div>

        {channel[0] &&
          <div>
            <h1>Conversations as Guide    </h1>

            <Card>

              <Card.Content>
                <Card.Header >Conversation with {channel[0].user.userName} </Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image={channel[0].user.avatar} />
                    <Feed.Content>
                      <Feed.Date content={moment(channel[0].createdAt).startOf('hour').fromNow()} />
                      <Feed.Summary>
                        {channel[0].message}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>


                </Feed>
              </Card.Content>

              <ConversationModal
                show={open}
                onHide={() => setOpen(true)}
                conversationsAsGuide={conversationsAsGuide}

              />
            </Card>


          </div>

        }

      </div>





<div>
      {conversationsAsUser[0] &&
        <div>
          <h1>Conversations as User    </h1>
          <Card>
            <Card.Content>
              <Card.Header >Conversation with {conversationsAsUser[0].user.userName} </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Label image={conversationsAsUser[0].user.avatar} />
                  <Feed.Content>
                    <Feed.Date content={moment(conversationsAsUser[0].createdAt).startOf('hour').fromNow()} />
                    <Feed.Summary>
                      {conversationsAsUser[0].message}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>


              </Feed>
            </Card.Content>
            <ConversationModal
              show={open}
              onHide={() => setOpen(true)}
              conversationsAsUser={conversationsAsUser}

            />
          </Card>
        </div>
      }

    </div>

  */