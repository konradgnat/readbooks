// @flow

export type TitleResults = {
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
