//for better styling, a markdowntoHTML function to better display the blog text
// Function to convert Markdown to HTML
function markdownToHTML(markdown) {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /<codeblock>([\s\S]*?)<\/codeblock>/g,
      "<pre><code>$1</code></pre>"
    )
    .replace(/\n/g, "<br>");
}

document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");

  fetch("posts.json")
    .then((response) => response.json())
    .then((posts) => {
      console.log("Fetched posts:", posts);
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");

        const postTitle = document.createElement("h3");
        postTitle.textContent = post.title;
        postElement.appendChild(postTitle);

        const postContent = document.createElement("p");
        postContent.innerHTML = markdownToHTML(post.content);
        postElement.appendChild(postContent);

        blogList.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Error loading blog posts:", error));
});
