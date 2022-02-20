const newPostButton = document
  .getElementById("#blog-post")
  .addEventListener("click", newPostHandler());

const newPostHandler = async (event) => {
  event.preventDefault();

  const newPost = document.querySelector("#blog-post").value.trim();

  if (newPost) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to post.");
    }
  }
};
