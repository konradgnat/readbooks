// @flow

export type TitleResults = {
  id: string,
  volumeInfo: {
    title: string,
    imageLinks: {
      smallThumbnail: string
    },
    publishedDate: string
  },
  searchInfo: {
    textSnippet: string
  }
}