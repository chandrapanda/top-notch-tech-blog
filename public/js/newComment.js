// Add a comment
const addComment = async function (event) {
  const post_id = event.currentTarget.dataset.id;

  await fetch(`/api/posts`, {
    method: "GET",
    body: JSON.stringify({ post_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location.reload();
};

document.querySelector("#add-comment").addEventListener("click", addComment);
