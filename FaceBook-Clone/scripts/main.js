window.onload = () => {

  //Create dropdown menus for the three options when writing a post 
  createDropdown(window.hashtags, document.getElementById('hashtag-button'), 'hashtag');
  createDropdown(window.feelings, document.getElementById('feeling-button'), 'feeling');
  createDropdown(window.images, document.getElementById('image-button'), 'image');

  //Update the user's name on all relevant elements
  let userNames = document.getElementsByClassName('user-name')
  for (let name of userNames) {
    name.innerHTML = username;
  }
  
  //Update the user's avatar on all relevant elements
  let userAvatars = document.getElementsByClassName('user-avatar');
  for (let avatar of userAvatars) {
    avatar.src = bacefook.user.profilePic;
  }

  //Populate the friends online column with all friends and their avatars
  let friendsBar = document.getElementById('friends-bar');
  for (let friend in bacefook.friends) {
    let friendBar = document.createElement('div');
    friendBar.className = 'friend-bar';
    let profileImage = document.createElement('img');
    profileImage.className = 'avatar';
    profileImage.src = bacefook.friends[friend].profilePic;
    friendBar.append(profileImage);

    let friendName = document.createElement('span');
    friendName.className = 'name';
    friendName.innerHTML = bacefook.friends[friend].name;

    friendBar.append(friendName);
    friendBar.append(document.createElement('br'))

    friendsBar.append(friendBar);
  }

  //Update the feed
  updateFeed();

  //Begin recursive functions that continually update the status of the posts
  updateTimes();
  updateReactions();

}; //End window onload

const reactionCharCodes = {like: '&#128077', love: '&#128525', angry: '&#128548',
sad: '&#128549', wow: '&#128558', haha: '&#128514', care:'&#128538'};

function updateReactions() {
  let likeBars = document.getElementsByClassName('likes-bar');
  for (let likeBar of likeBars) {
    let reactionsCopy = {...likeBar.reactions}
    let reactionsValues = Object.values(reactionsCopy)
    //If there are any reactions on the post, unhide the reaction bar
    let totalReactions = reactionsValues.reduce((total, value) => total += value, 0)
    if (totalReactions) {
      if (likeBar.hidden) {
        likeBar.hidden = false;
      }
      likeBar.innerHTML = ''
      while (totalReactions) {
        let max = Math.max(...reactionsValues);
        let maxKey = Object.keys(reactionsCopy).find(key => reactionsCopy[key] === max);
        delete reactionsCopy[maxKey];
        likeBar.innerHTML += reactionCharCodes[maxKey];
        likeBar.innerHTML += max;
        reactionsValues.splice(reactionsValues.indexOf(max), 1);
        totalReactions -= max;
      }
    }
  }
  setTimeout(updateReactions, 5000);
}

// Automatically update the times of all visible posts every 5 seconds
function updateTimes() {
  var times = document.getElementsByClassName("post-time");
  for (let time of times) {
    if (moment().diff(time.name, 'seconds') < 60) {
      time.innerHTML = moment().diff(time.name, 'seconds') + 's';
    }    
    else {
      time.innerHTML = moment().diff(time.name, 'minutes') + 'm';
    }
  }
  setTimeout(updateTimes, 2000);
}

// Function to run when you want to update the feed with new posts
function updateButton(button) {
  // Make the button invisible
  button.style.height = '0px';
  button.style.visibility = 'hidden';
  // Then update the actual feed with posts loaded into bacefook.newsfeed
  updateFeed();
}

// Focus on the difference between the webpage and bacefook.newsfeed, add everything that's missing
function updateFeed() {
  let newsfeed = document.getElementById('newsfeed');
  //Change times of all children already on screen
  for (let i = newsfeed.children.length; i < bacefook.newsfeed.length; i++) {
    const post = bacefook.newsfeed[i];
    uploadPost(post);
  };
}

// Transform the given button into a drop down list 
function createDropdown(optionList, elementToUse, name) {
  let menuButton = elementToUse;

  let dropdown = document.createElement('div');
  dropdown.id = 'myDropdown';
  dropdown.className = 'dropdown-content';
  
  for (let option of optionList) {
    let optionButton = document.createElement('button');
    optionButton.className = 'dropdownButton';
    optionButton.innerHTML = option;
    optionButton.onclick = function() {
      if (name === 'image') {
        this.parentElement.previousElementSibling.innerHTML = 'selected!';
        this.parentElement.previousElementSibling.imagePass = this.innerText; //made up attribute to store image data
      } if (name === 'hashtag' || name === 'feeling') {
        this.parentElement.previousElementSibling.innerHTML = this.innerText;
      } if (name === 'reactions') {
        this.parentElement.parentElement.parentElement.previousElementSibling.reactions[this.innerText]++;
      }
    }
    dropdown.append(optionButton);
  }

  menuButton.append(dropdown)
  menuButton.onclick = function() {
    dropdown.classList.toggle("show");
  }
}

// Large method which generates all the elements to make a post as needed
function uploadPost(post) {
  let containerEl = document.querySelector('#newsfeed'); //Select the newsfeed on the page

  const postEl = document.createElement('div');
  postEl.id = 'post';
  postEl.className = 'post';

  const postText = document.createElement('div');
  postText.id = 'text';
  postText.innerHTML = post.text;
  postText.className = 'post-text'

  const postHashtag = document.createElement('span');
  postHashtag.id = 'hashtag';
  postHashtag.innerHTML = ' ' + post.hashtag;
  postText.append(postHashtag);

  const postFeeling = document.createElement('div');
  postFeeling.id = 'feeling';
  postFeeling.innerHTML = post.feeling;
  postFeeling.className = 'post-text'

  const postTime = document.createElement('span');
  postTime.className = 'post-time';
  postTime.name = post.timestamp
  postTime.innerHTML = moment().diff(post.timestamp, 'seconds') + 's'

  const friendEl = document.createElement('span');
  friendEl.className = 'friend';
  friendEl.innerHTML = post.friend + '<br>'
  friendEl.id = 'post-name'
  friendEl.append(postTime);

  //This is to generate either the globe of the friends symbol depending on the privacy settings of the user
  const visibility = document.createElement('span');
  post.visibility ? (visibility.innerHTML = ' &#183 &#127760') : (visibility.innerHTML = '&#183  &#128101')
  visibility.id = 'visibility'
  friendEl.append(visibility);

  //Add the poster's avatar
  const friendImage = document.createElement('img')
  friendImage.className = 'avatar';
  friendImage.id = 'post-avatar';
  if (post.friend === username) {
    friendImage.src = bacefook.user.profilePic;
  } else {
    friendImage.src = bacefook.friends[post.friend].profilePic;
  }

  //Add the post's image
    const imageEl = document.createElement('img')
    imageEl.src = post.image
    imageEl.id = 'post-image';
    imageEl.setAttribute('style', 'width:100%')
  

  //Add a comment section for the post
  const commentSection = document.createElement('div');
  commentSection.id = 'comment-section';
  commentSection.className = 'comment-section';

  //Add reaction bar to the comment section
  const reactionBar = document.createElement('div')
  reactionBar.className = 'likes-bar'
  reactionBar.hidden = true; //It doesn't need to show until someone reacts
  commentSection.append(reactionBar);
  reactionBar.reactions = {like:0, 
                          care:0,
                          haha:0,
                          sad:0,
                          angry:0,
                          wow:0,
                          love:0}
                          //This is a custom attribute to track the number of reactions

                          
  const likeCommentShare = document.createElement('div');
  likeCommentShare.id = 'like-comment-share'
  commentSection.append(likeCommentShare);

  //Add like comment share buttons for the comment section
  const like = document.createElement('button');
  like.className = 'dropbtn'
  like.innerHTML = 'Like  &#128077'
  like.id = 'like'
  const comment = document.createElement('button')
  comment.className = 'dropbtn'
  comment.innerHTML = 'Comment 	&#128172'
  comment.id = 'comment'
  const share = document.createElement('button')
  share.className = 'dropbtn'
  share.innerHTML = 'Share  &#10149'
  share.id = 'share'

  //Add everything into likecommentshare
  likeCommentShare.append(document.createElement('hr'))
  likeCommentShare.append(like)
  likeCommentShare.append(comment)
  likeCommentShare.append(share);

  postEl.append(friendImage);
  postEl.append(friendEl);
  postEl.append(postText);
  postEl.append(postFeeling)
  if (post.image) {
    postEl.append(imageEl);
  }
  postEl.append(commentSection)

  //Attach it to the webpage
  containerEl.prepend(postEl)
  createDropdown(window.reactions, like, 'reactions');

}

// When the user clicks 'post', do this..
function genUserPost() {
  let postText = document.getElementById('textPostOption').value
  if (!postText) {
    return; //If nothing written, don't run
  }
  let postHashtag = document.getElementById('hashtag').innerText
  let postFeeling = document.getElementById('feeling').innerText
  let postImage = document.getElementById('image').imagePass
  let postTime = new moment();

  //If user left the menus on default, append empty elements
  if (postFeeling === 'feeling') {
    postFeeling = '';
  }
  if (postHashtag === 'hashtag') {
    postHashtag = '';
  }

  var userPost = {  friend: localStorage.getItem('username'), 
                    text: postText, 
                    feeling: postFeeling, 
                    hashtag: postHashtag,
                    image: postImage, 
                    timestamp: postTime,
                    visibility: bacefook.user.globalPostVisibility};

  /* Kind of complicated, basically there was an issue where the users post would be pushed into
  the bacefook.newsfeed array and then appended to the html element instantly, but this meant that
  if you did this while there was a automatically generated element waiting to be pushed to the html
  element, and you had not yet pressed the update button, the final element of the array would become
  the user generated post, and therefore the updateFeed method (when you press the button) would post the 
  user generated post a second time (it pushes the final elements of the array). To counteract this
  I am pushing into the window.bacefook.newsfeed array at the corresponding position of the html element
  , this way the post order is the same for both bacefook.newsfeed and the html element. */
  bacefook.newsfeed.splice(newsfeed.children.length, 0, userPost)

  //Then upload the new post made by user
  uploadPost(userPost);
}


// This is to change the 'Post' button styling depending on whether or not the user is typing
function changeButtonColour() {
  var postButton = document.getElementById('userPost');
  var inputBox = document.getElementById('textPostOption')
  if (inputBox.value) {
    postButton.setAttribute('style', 'background-color: #1877f2;color: rgb(0,0,0)');
  } else {
    postButton.setAttribute('style', 'background-color: #eeeff4;color: rgba(0,0,0, 0.5);');
  }
}

// This is to collapse the dropdown menus if you click on the window
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}