const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace('let posts = [', 'let defaultPosts = [');

const monthNamesIdx = code.indexOf('const monthNames');
const beforeMonthNames = code.substring(0, monthNamesIdx);
const lastBracket = beforeMonthNames.lastIndexOf(']');
const arrayEnd = lastBracket + 1;

const localStorageLogic = `
let posts = [];
try {
  const saved = localStorage.getItem('saam_marketing_posts_v2');
  if (saved) {
    posts = JSON.parse(saved);
  } else {
    posts = [...defaultPosts];
    localStorage.setItem('saam_marketing_posts_v2', JSON.stringify(posts));
  }
} catch(e) {
  posts = [...defaultPosts];
}

function savePostsToStorage() {
  localStorage.setItem('saam_marketing_posts_v2', JSON.stringify(posts));
}
`;

code = code.substring(0, arrayEnd) + localStorageLogic + code.substring(arrayEnd + 1);

// Inject savePostsToStorage() in the submit handler
code = code.replace('posts.push(newPost);\n  }', 'posts.push(newPost);\n  }\n  savePostsToStorage();');

// Inject in dot click
code = code.replace('post.status = nextStatus;\n    renderCalendar();', 'post.status = nextStatus;\n    savePostsToStorage();\n    renderCalendar();');

// Inject in delete click
code = code.replace('posts.splice(index, 1);\n      closeModal();', 'posts.splice(index, 1);\n      savePostsToStorage();\n      closeModal();');

fs.writeFileSync('app.js', code);
console.log('Done modifying app.js');
