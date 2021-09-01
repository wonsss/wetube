const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");
const deleteCommentBtn = document.getElementsByClassName("deleteCommentBtn");
let commentDeleteBtn = null;

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon  = document.createElement("i");
  icon.className = "fas fa-comment";
  const commentSpan = document.createElement("span");
  commentSpan.innerText= `${text}`;
  commentDeleteBtn = document.createElement("span");
  commentDeleteBtn.innerText = "❌";
  commentDeleteBtn.dataset.id = id;
  commentDeleteBtn.className = "deleteCommentBtn";
  newComment.appendChild(icon);
  newComment.appendChild(commentSpan);
  newComment.appendChild(commentDeleteBtn);
  videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");

  const text = textarea.value;
  const videoId = videoContainer.dataset.id; //어떤 비디오에 코멘트 달지
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const {newCommentId} = await response.json();
    addComment(text, newCommentId);
    const {id} = commentDeleteBtn.dataset;
    commentDeleteBtn.addEventListener("click", () => handleDeleteComment2(id));
  }
};

const handleDeleteComment2 = async (id) => {
  const response = await fetch(`/api/comments/${id}/delete`, {
    method: "DELETE",
  });
  if(response.status === 200) {
    const target = document.querySelector(`li[data-id="${id}"]`);
    target.remove();
  }
}

const deleteCommentContainer = (parentNode) => {
  parentNode.remove();
};

const handleDeleteComment = async (element) => {
  const { parentNode } = element.target;
  const { id } = parentNode.dataset;

  const response = await fetch(`/api/comments/${id}/delete`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    deleteCommentContainer(parentNode);
  }
};

if (form) {
  form.addEventListener("click", handleSubmit);

}
if (deleteCommentBtn) {
  for (let i = 0; i<deleteCommentBtn.length; i++) {
    deleteCommentBtn[i].addEventListener("click", handleDeleteComment);
  }
}
