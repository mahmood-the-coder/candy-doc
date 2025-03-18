export function getCurrentContent() {
  const cursor = document.body.querySelector(".candyDoc__cursor");
  return cursor.parentElement;
}
