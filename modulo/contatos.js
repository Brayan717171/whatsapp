const contatos = { "whats-users" :
  [
    {  
      "id" : 1,    
      "account"  : "Ricardo da Silva",
      "nickname" : "Ricky",
      "created-since": { "start" : "2015-08-23", "end": "null" },
      "profile-image": "img/contact1.png",
      "number" : "11987876567",
      "background" : "#fccc5b",
      "contacts": [
        {
          "name": "Ana Maria", "description": "Frontend Developer", "image": "img/contact1.png",
          "messages": [
            { "sender": "me", "content": "Hello Leonid, how are you doing today?", "time": "14:20" },
            { "sender": "Ana Maria", "content": "Hi, I'm doing fine. Thanks for asking.", "time": "14:25" },
            { "sender": "me", "content": "Great to hear that. Do you have any plans for the weekend?", "time": "14:30" },
            { "sender": "Ana Maria", "content": "Not yet. I'm thinking about going to the beach. What about you?", "time": "14:35" }
          ]
        },
        {
          "name": "John Doe", "description": "Designer", "image": "img/contact2.png",
          "messages": [
            { "sender": "me", "content": "Hi John, how are you?", "time": "10:00" },
            { "sender": "John Doe", "content": "I'm good, how about you?", "time": "10:05" }
          ]
        }
      ]
    },
    {  
      "id" : 4,    
      "account"  : "Jonathan Xavier",
      "nickname" : "Joe",
      "created-since": { "start" : "2023-03-11", "end": "null" },
      "profile-image": "img/contact230.png",
      "number" : "1194457796",
      "background" : "#c00bfc",
      "contacts": [
        {
          "name": "Wally Gator", "description": "Free", "image": "img/contact4.png",
          "messages": [
            { "sender": "me", "content": "Hey Wally, como estão as coisas?", "time": "10:00" },
            { "sender": "Wally Gator", "content": "Tudo bem por aqui!", "time": "10:05" }
          ]
        }
      ]
    }
  ]
}

module.exports = { contatos };