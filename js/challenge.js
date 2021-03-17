window.addEventListener("DOMContentLoaded", (event) => {
  // counter selectors
  const counter = document.querySelector("h1#counter");
  const minus = document.querySelector("button#minus");
  const plus = document.querySelector("button#plus");
  const heart = document.querySelector("button#heart");
  const pause = document.querySelector("button#pause");
  const likes = document.querySelector("ul.likes");
  let likeEntries = {};

  //comment selectors
  const comments = document.querySelector("div#list");
  const commentSubmit = document.querySelector("button#submit");
  const commentInput = document.querySelector("input#comment-input");
  let commentText = [];
  const buttons = [minus, plus, heart, commentSubmit];

  let count = 0;
  let counting = true;
  let st;

  //counter
  function refreshCount() {
    counter.innerHTML = count;
  }

  function incCount() {
    count += 1;
    refreshCount();
  }

  function startCount() {
    incCount();
    st = setTimeout(startCount, 1000);
  }

  startCount();

  plus.addEventListener("click", function (e) {
    e.preventDefault();
    incCount();
  });

  minus.addEventListener("click", function (e) {
    e.preventDefault();
    count -= 1;
    refreshCount();
  });

  // likes counter

  heart.addEventListener("click", function (e) {
    e.preventDefault();
    if (likeEntries[count]) {
      likeEntries[count] += 1;
    } else {
      likeEntries[count] = 1;
    }
    let likeOutput = [];
    for (const [c, l] of Object.entries(likeEntries)) {
      let s = "";
      if (parseInt(c) !== 1) s = "s";
      let line = `<li>${c} has been liked ${l} time${s}</li>`;
      likeOutput.push(line);
    }
    likes.innerHTML = likeOutput.join("\n");
  });

  // pause
  function pauseToggle() {
    for (const button of buttons) {
      button.disabled = !button.disabled;
    }
    if (counting) {
      clearTimeout(st);
      pause.innerText = "play";
    } else {
      startCount();
      pause.innerText = "pause";
    }
    counting = !counting;
  }

  pause.addEventListener("click", function (e) {
    e.preventDefault();
    pauseToggle();
  });

  // comment section
  function addComment(comment) {
    commentText.push(comment);
    comments.innerHTML = commentText
      .map((comment) => `<p>${comment}</p>`)
      .join("\n");
  }

  commentSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    if (commentInput.value !== "") {
      addComment(commentInput.value);
    }
    commentInput.value = "";
  });
});
