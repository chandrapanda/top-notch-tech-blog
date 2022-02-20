const newPostHandler = async (event) => {
  event.preventDefault();

  const blogText = document.querySelector("#blog-text").value.trim();
  const blogTitle = document.querySelector("#blog-title").value.trim();

  if (blogText && blogTitle) {
    const newBlogPost = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ body: blogText, title: blogTitle }),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    alert("Failed to post.");
  }
};
const newPostButton = document
  .getElementById("blog-post")
  .addEventListener("click", newPostHandler);
