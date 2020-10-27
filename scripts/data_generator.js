(() => {

  // this is a very simple check to see if there's a username stored
  if (!localStorage.getItem('username')) {
    // prompt for one from user if not
    window.username = window.prompt('What is your name?');
    localStorage.setItem('username', username);
  } else {
      window.username = localStorage.getItem('username');
  }

  window.bacefook = {};
  bacefook.newsfeed = [];
  bacefook.friends = {};

  bacefook.user = {name: username, profilePic: null, postList: [], globalPostVisibility: null}
  bacefook.friendNames = ['meowze', 'hana', 'kani', 'eliot', 'michael',
                          'jeff', 'yusuke', 'kaori', 'tanaka', 'hiroshi', 'edward'];
  for (let friend of bacefook.friendNames) {
    bacefook.friends[friend] = {name: friend, profilePic: null, postList: [], globalPostVisibility: null};
  }

  document.getElementById('textPostOption').placeholder = `What's on your mind, ${window.username}?`

  const getRandomElement = (array) => {
    // Given an array, returns a random element
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  window.starters = ['totally just', 'just', 'completely', 'waaaaah! i', 'i just', 'a salaryman', 'a salaryman', 'yesterday I', 'a ninja', 'my boss'];
  window.verbs = ['ate', 'drank', 'threw up in', 'refactored', 'iterated on', 'thought about', 'threw up on', 'saw', 'walked to', 'got lost in', 'walked into', 'pooped in', 'peed in', 'googled', 'drove', 'ran to', 'worked on', 'slept on', 'slept in'];
  window.fillers = ['my', 'your', 'his', 'her', 'my favorite', 'a beautiful', 'a delicious', 'that', 'this', 'an interesting', '', 'the best', 'the greatest', 'a delightful'];
  window.nouns = ['code chrysalis', 'restaurant', 'omakase', 'hitomedia', 'family mart', 'private jet', 'mama', 'lawsons', 'conbini', 'whisky', 'onigiri', 'tesla', 'food', 'house', 'toilet', 'tokyo', 'city', 'iphone', 'google', 'unicorn', 'mess', 'pirate ship', 'ninja'];
  window.hashtags = ['#codechrysalis', '#techlife', '#startups', '#tokyo', '#japan', '#interesting', '#til', '#wtf', '#tgifriday', '#hashtags', '#japanlife', '#oops'];
  window.feelings = ['happy', 'smug', 'lovestruck', 'gross', 'scared', 'shitty', 'angry', 'frustrated', 'excited']
  window.reactions = ['like', 'care', 'love', 'sad', 'angry', 'wow', 'haha']
  window.images = [ 'images/_x4ya1Y6gSw.jpg',
                    'images/-AS7i6dSzdA.jpg',
                    'images/0I4ZyQ5fJno.jpg',
                    'images/3_EYV8uXVk4.jpg',
                    'images/3XACsT4vSIg.jpg',
                    'images/3Xmcv5MjZpw.jpg',
                    'images/5hd3jaqNY6g.jpg',
                    'images/7Cz1rh0P_HQ.jpg',
                    'images/7ZZdGoVjGPg.jpg',
                    'images/8cfo9D1cxgM.jpg',
                    'images/8XMWpPJcVcA.jpg',
                    'images/9Evqbiy9Lj8.jpg',
                    'images/9TUoK8H4Gh0.jpg',
                    'images/37pqumnhk8Q.jpg',
                    'images/amBvaOYIRLY.jpg',
                    'images/bCdT-xwZTKQ.jpg',
                    'images/BSDBCg6iHLM.jpg',
                    'images/BTQw24OaTzQ.jpg',
                    'images/C5ZQh4MwCzA.jpg',
                    'images/CeofJKf8OlI.jpg',
                    'images/cIRFP06YAtk.jpg',
                    'images/CpCWewFMw8o.jpg',
                    'images/DEHNYNoQc8I.jpg',
                    'images/f7S_Ad9dF_s.jpg',
                    'images/F8ZR9BmWD3E.jpg',
                    'images/goMFAkWUAEY.jpg',
                    'images/GVfFzYDFGuo.jpg',
                    'images/i7-SqMOmjH8.jpg',
                    'images/jaFS4_e_fyA.jpg',
                    'images/jee-RG8CKno.jpg',
                    'images/jFlUBx5x8zA.jpg',
                    'images/jNLYIlsM7Ks.jpg',
                    'images/K5uq1M5430s.jpg',
                    'images/Kx2KjHLzqEQ.jpg',
                    'images/leKpULP7QnM.jpg',
                    'images/lr2q_pj-XLw.jpg',
                    'images/ml8AP0cWiDU.jpg',
                    'images/mmDEZL8fYNA.jpg',
                    'images/nM7xJtD0o3Y.jpg',
                    'images/NW01TMx4_B0.jpg',
                    'images/nX0NgrGEwEc.jpg',
                    'images/pM_w6EFVh4g.jpg',
                    'images/psdlo3aF5XM.jpg',
                    'images/pZbujR27VE4.jpg',
                    'images/qUmz6ncEQak.jpg',
                    'images/rrocCJOvebg.jpg',
                    'images/RrWbgaBi7VA.jpg',
                    'images/ryuO0bLmj40.jpg',
                    'images/TLF6MCoMik0.jpg',
                    'images/UeT9QPYEU5Q.jpg',
                    'images/UY_974kGwGQ.jpg',
                    'images/v3myoCy4hFA.jpg',
                    'images/VjD193X8HeI.jpg',
                    'images/XhSqdNRp1zQ.jpg',
                    'images/YNx9m4cQg8k.jpg',
                    'images/zX0MJTBs8Iw.jpg'
                  ];

  const generateRandomText = () => {
    return [ 
      getRandomElement(starters),
      getRandomElement(verbs),
      getRandomElement(fillers),
      getRandomElement(nouns),
    ].join(' ');
  };

  const generatePostObj = () => {
    let post = {
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
      feeling: getRandomElement(feelings),
      hashtag: getRandomElement(hashtags),
      image: getRandomElement(images),
      timestamp: new moment(),
      visibility: this.globalPostVisibility,
      comments: [],
    }
    return post;
  };

  const addPost = obj => {
    bacefook.newsfeed.push(obj);
    bacefook.friends[obj.friend].postList.push(obj);
  };

  const createPost = () => {
    const newPost = generatePostObj();
    if (newPost) { //In case user does not write anything
      addPost(newPost);
    }
  };

  for (let i = 0; i < 10; i++) {
    createPost();
  }

  for (let friend in bacefook.friends) {
    genUserInformaton(friend);
  }

  genUserInformaton(username)

  function genUserInformaton(user) {
    let userImage = getRandomElement(images);
    let indexUserImage = images.indexOf(userImage);
    if (bacefook.friends[user]) {
      bacefook.friends[user].profilePic = userImage;
    } 
    else {
      bacefook.user.profilePic = userImage;
    }
    images.splice(indexUserImage, 1);
  }

  let updateButton = document.getElementById('update');
  let visibleUpdateButtonWidth = '100%';
  let visibleUpdateButtonHeight = '50px';
  let counter = 0;

  const scheduler = () => {
    createPost();
    //Then mess around with button
    if (updateButton.style.visibility = 'hidden' && counter !== 0) {
      updateButton.innerHTML = `&#8635 ${bacefook.newsfeed.length - document.getElementById('newsfeed').childElementCount}`
      //if button not visible, make it visible
      updateButton.style.visibility = 'visible'
      //then update to the correct heights
      updateButton.style.height = visibleUpdateButtonHeight;
      updateButton.style.width = visibleUpdateButtonWidth;
    }
    
    //Then repeat this
    counter++;
    setTimeout(scheduler, 5000);
  };

  scheduler();

  function generatePostLikes() {
    let postReactionBar = getRandomElement(document.getElementsByClassName('likes-bar'));
    // If there are actually posts
    if (postReactionBar) { 
      // If it's currently hidden, make visible
      let reaction = getRandomElement(reactions);
      postReactionBar.reactions[reaction]++;
    }
    setTimeout(generatePostLikes, 500)
  }

  generatePostLikes();

})();
