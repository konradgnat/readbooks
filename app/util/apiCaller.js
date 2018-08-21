
export default function bookSearch(query) {

  return fetch("https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(query))
    .then((res) => {
      return res.json();
    });
};
