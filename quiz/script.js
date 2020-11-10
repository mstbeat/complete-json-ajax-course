const message = document.querySelector('.message');
const game = {};
const output = document.querySelector('.que');
const nx = document.querySelector('.next');

nx.addEventListener('click',createQuestion);
const url = 'https://script.google.com/macros/s/AKfycbzY6vnGOT3AqpxcF7EELfWuH1gSmkYpznfZzCLEEjdTPlhEe-U/exec';

fetch(url).then(function(res){
  return res.json();
}).then(function(data){
  console.log(data.data);
  game.total = data.data.length; //json data for game
  game.val = 0; //question we are on
  game.score = 0;
  game.arr = data.data;
  data.data.forEach(function(el){
    console.log(el);
  });
  createQuestion();
})

function createQuestion(){
  nx.style.display = "none";
  if(game.val+1 > game.total){
    message.textContent = 'Your score was '+game.score+' out of '+game.total+'!';
    output.textContent = "GAME OVER";
    message.classList.add('score');
    output.classList.add('end');
  }else{
    message.textContent = 'Question #'+(game.val+1)+' out of '+game.total;
    output.innerHTML = '';
    console.log(game);
    let q = game.arr[game.val];
    console.log(q);
    const main = document.createElement('div');
    main.textContent = q.question;
    main.classList.add("question");
    output.appendChild(main);
    arrayRandom(q.opt);
    q.opt.forEach(function(el){
      console.log(el);
      let span = document.createElement('span');
      span.textContent = el;
      span.classList.add('answer');
      span.classList.add('btn');
      output.appendChild(span);
      span.ans = q.answer;
      span.addEventListener('click',checker);
    });
  };
}

function arrayRandom(arr){
  arr.sort(function(){
    return .5 - Math.random();
  });
};

function checker(e){
  // console.log(e.target.ans);
  // console.log(this.ans);

  const selAns = document.querySelectorAll('.answer');
  selAns.forEach(function(ele){
    ele.classList.remove('answer');
    ele.style.color = "#ddd";
    ele.removeEventListener('click',checker);
  })

  let sel = e.target;
  console.log(sel.textContent);
  if(sel.textContent == sel.ans){
    console.log('correct');
    sel.style.color = "green"
    nx.textContent = 'Correct - click to move to the next questions';
    game.score++;
  }else{
    console.log('wrong');
    sel.style.color = "red"
    nx.textContent = 'Wrong - click to move to the next questions';
  };
  game.val++;
  nx.style.display = "block";
}