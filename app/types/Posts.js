// @flow

export type SearchResults = {
  id: string,
  volumeInfo: {
    authors: Array<string>,
    description: string,
    title: string,
    imageLinks: {
      smallThumbnail: string
    },
    publishedDate: string
  },
  searchInfo: {
    textSnippet: string
  }
};

export type ProccessedSearchResult = {
  id: string,
  thumbnail: string,
  title: string,
  publishedDate: string,
  authors: string,
  description: string,
};
