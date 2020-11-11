const message = document.querySelector('.message');
const game = {};
const output = document.querySelector('.que');
const nx = document.querySelector('.next');

nx.addEventListener('click',createQuestion);
const url = 'https://script.google.com/macros/s/AKfycbzY6vnGOT3AqpxcF7EELfWuH1gSmkYpznfZzCLEEjdTPlhEe-U/exec';

fetch(url).then(function(res){
  return res.json();
}).then(function(data){
  game.total = data.data.length;
  game.val = 0;
  game.score = 0;
  game.arr = data.data;
  createQuestion();
})

function createQuestion(){
  nx.style.display = "none";
  if(game.val+1 > game.total){
    message.textContent = 'あなたのスコアは '+game.score+' / '+game.total+' !';
    if(game.score >= 7){
      output.style.color = "green";
      output.textContent = "あなたは立派なバンド経験者です！";
      nx.textContent = 'もう一度回答する';
      nx.style.display = 'block';
      nx.style.backgroundColor = "green";
    }else{
      output.style.color = "red";
      output.textContent = "あなたはバンド経験者ではないようです…";
      nx.textContent = '再挑戦する';
      nx.style.display = 'block';
      nx.style.backgroundColor = "red";
    }
    message.classList.add('score');
    output.classList.add('end');
    nx.addEventListener('click',function(){
      window.location.reload();
    })
  }else{
    message.textContent = 'クイズ '+game.total+' 問中 '+(game.val+1)+' 問目';
    output.innerHTML = '';
    let q = game.arr[game.val];
    const main = document.createElement('div');
    main.textContent = q.question;
    main.classList.add("question");
    output.appendChild(main);
    arrayRandom(q.opt);
    q.opt.forEach(function(el){
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
  const selAns = document.querySelectorAll('.answer');
  selAns.forEach(function(ele){
    ele.classList.remove('answer');
    ele.style.color = "#ddd";
    ele.style.cursor = 'not-allowed';
    ele.removeEventListener('click',checker);
  })

  let sel = e.target;
  if(game.val+1 >= game.total){
    if(sel.textContent == sel.ans){
      sel.style.color = "green"
      nx.textContent = '正解！ - クリックしてスコアを確認する';
      game.score++;
      nx.style.backgroundColor = "green";
    }else{
      sel.style.color = "red"
      nx.textContent = '不正解 - クリックしてスコアを確認する';
      nx.style.backgroundColor = "red";
    };
  }else{
    if(sel.textContent == sel.ans){
      sel.style.color = "green"
      nx.textContent = '正解！ - クリックして次の問題へ';
      game.score++;
      nx.style.backgroundColor = "green";
    }else{
      sel.style.color = "red"
      nx.textContent = '不正解 - クリックして次の問題へ';
      nx.style.backgroundColor = "red";
    };
  }
  game.val++;
  nx.style.display = "block";
}