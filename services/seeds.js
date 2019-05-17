const mongoose = require('mongoose');
const Book = require('../models/book');
const User = require('../models/user');
const Comment = require('../models/comment');

var data = [
  {
    _id: '5b7087c4a7999d98430d29cb',
    thumbnail:
      'http://books.google.com/books/content?id=e2YCuxBjkq0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    title: 'Program Or be Programmed',
    author: 'Douglas Rushkoff',
    publishedDate: '2010',
    description:
      "The debate over whether the Net is good or bad for us fills the airwaves and the blogosphere. But for all the heat of claim and counter-claim, the argument is essentially beside the point: It's here; it's everywhere. The real question is, do we direct technology, or do we let ourselves be directed by it and those who have mastered it? 'Choose the former,' writes Rushkoff, 'and you gain access to the control panel of civilization. Choose the latter, and it could be the last real choice you get to make.' In ten chapters, composed of ten 'commands' accompanied by original illustrations from comic artist Leland Purvis, Rushkoff provides cyber enthusiasts and technophobes alike with the guidelines to navigate this new universe. In this spirited, accessible poetics of new media, Rushkoff picks up where Marshall McLuhan left off, helping readers come to recognize programming as the new literacy of the digital age--and as a template through which to see beyond social conventions and power structures that have vexed us for centuries. This is a friendly little book with a big and actionable message.",
    thoughts:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    comments: ['59e034dfb6d54d54eb3e0bda', '59e034eab6d54d54eb3e0bdb'],
    postedBy: {
      id: '59e033bab6d54d54eb3e0bd4',
      username: 'JohnDoe',
      avatar: 'bean.jpeg',
      email: 'JohnDoe@gmail.com'
    },
    __v: 2
  },
  {
    _id: '59e034d6b6d54d54eb3e0bd9',
    thumbnail:
      'http://books.google.com/books/content?id=sQYqRCIhFAMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    publishedDate: '2010-10-06',
    description:
      "To make the journey into the Now we will need to leave our analytical mind and its false created self, the ego, behind. From the very first page of Eckhart Tolle's extraordinary book, we move rapidly into a significantly higher altitude where we breathe a lighter air. We become connected to the indestructible essence of our Being, “The eternal, ever present One Life beyond the myriad forms of life that are subject to birth and death.” Although the journey is challenging, Eckhart Tolle uses simple language and an easy question and answer format to guide us. A word of mouth phenomenon since its first publication, The Power of Now is one of those rare books with the power to create an experience in readers, one that can radically change their lives for the better.",
    thoughts:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    comments: ['59e034dfb6d54d54eb3e0bda', '59e034eab6d54d54eb3e0bdb'],
    postedBy: {
      id: '59e033bab6d54d54eb3e0bd4',
      username: 'JohnDoe',
      avatar: 'bean.jpeg',
      email: 'JohnDoe@gmail.com'
    },
    __v: 2
  },
  {
    _id: '59e03445b6d54d54eb3e0bd6',
    thumbnail:
      'http://books.google.com/books/content?id=vxbUjwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    title: 'Secrets of the JavaScript Ninja',
    author: 'John Resig',
    publishedDate: '2016-03',
    description:
      "More than ever, the web is a universal platform for all types of applications, and JavaScript is the language of the web. For anyone serious about web development, it's not enough to be a decent JavaScript coder. They need to be ninja-stealthy, efficient, and ready for anything. Secrets of the JavaScript Ninja, Second Edition dives below the surface and helps readers understand the deceptively-complex world of JavaScript and browser-based application development. It skips the basics, and dives into core JavaScript concepts such as functions, closures, objects, prototypes, promises, and so on. With examples, illustrations, and insightful explanations, readers will benefit from the collective wisdom of seasoned experts John Resig, Bear Bibeault, and Josip Maras. Purchase of the print book includes a free eBook in PDF, Kindle, and ePub formats from Manning Publications.",
    thoughts:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    comments: ['59e0345bb6d54d54eb3e0bd7', '59e03470b6d54d54eb3e0bd8'],
    postedBy: {
      id: '59e033bab6d54d54eb3e0bd4',
      username: 'JohnDoe',
      email: 'JohnDoe@gmail.com',
      avatar: 'bean.jpeg'
    },
    __v: 2
  },
  {
    _id: '59e033d7b6d54d54eb3e0bd5',
    thumbnail:
      'http://books.google.com/books/content?id=ZEQvvmF7ZrwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    title: 'The Odyssey of Homer',
    author: 'Butcher,S.H..',
    publishedDate: '2000',
    description: '',
    thoughts:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  ',
    comments: [
      '594f3df8283ea656955e973e',
      ('594def761dbcf8287a6866b3', '594f3df8283ea656955e973e')
    ],
    postedBy: {
      id: '59e033bab6d54d54eb3e0bd4',
      username: 'JohnDoe',
      email: 'JohnDoe@gmail.com',
      avatar: 'bean.jpeg'
    },
    __v: 0
  }
];

var userData = [
  {
    _id: '5a481d884f95a82f953691ef',
    username: 'StephenKing',
    avatar: 'chuck.jpeg',
    local: {
      password: '$2a$08$sVzi4db/nbqdizQt7w/4pe6hCLab/rGWJCY/Vti2locLHGvt2VXj6',
      email: 'HomerJS@gmail.com'
    },
    __v: 0
  },
  {
    _id: '59e033bab6d54d54eb3e0bd4',
    username: 'JohnDoe',
    location: 'San Francisco',
    interests: 'Computers and reading',
    topFiveAuthors:
      'J. Steinbeck, Dashielle Hammet, Louis Borges, Gabriel Garcia Marquez, Carl Sandburg',
    avatar: 'bean.jpeg',
    local: {
      password: '$2a$08$sVzi4db/nbqdizQt7w/4pe6hCLab/rGWJCY/Vti2locLHGvt2VXj6',
      email: 'JohnDoe@gmail.com'
    },
    __v: 0
  },
  {
    _id: '5b40f331c9d8d36f212ae0a6',
    username: 'k',
    local: {
      password: '$2a$08$MQ7b7HJsHQCfZ/CXbf.wpeg9V5XSHUSeR/URDmVaIYvgokkEArGSO',
      email: 'k'
    },
    followers: [],
    __v: 0
  }
];

const commentData = [
  {
    _id: '594dee3c1dbcf8287a6866b2',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    __v: 0,
    author: { id: '5a481d884f95a82f953691ef', username: 'Stephen King' }
  },
  {
    _id: '594def761dbcf8287a6866b3',
    text: "do'h",
    __v: 0,
    author: { id: '5a481d884f95a82f953691ef', username: 'HomerSimpson' }
  },
  {
    _id: '594f3df8283ea656955e973e',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    __v: 0,
    author: { id: '5949d4806bc1df3be17b0b42', username: 'William Faulkner' }
  }
];

function seedDB() {
  Book.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      data.forEach(function(seed) {
        Book.create(seed, function(err, book) {
          if (err) {
            console.log(err);
          } else {
            // Comment.create({
            // 		text: "This is a steller book!!",
            // 		author: "Jane"
            // 	}, function(err, comment){
            // 	if(err){
            // 		console.log(err);
            // 	} else {
            // 		book.comments.push(comment);
            // 		book.save();
            // 		console.log("created new comment");
            // 	}
            // })
          }
        });
      });
    }
  });
  User.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      userData.forEach(function(seed) {
        User.create(seed, function(err, user) {
          if (err) {
            console.log(err);
          } else {
          }
        });
      });
    }
  });
  Comment.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('removed comments');
      commentData.forEach(function(seed) {
        Comment.create(seed, function(err, comment) {
          if (err) {
            console.log(err);
          } else {
            console.log('Comment created');
          }
        });
      });
    }
  });
}

module.exports = seedDB;
