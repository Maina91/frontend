let tempLoginToken: string | null = null

export const setTempLoginToken = (token: string) => {
  tempLoginToken = token
}

export const getTempLoginToken = () => tempLoginToken

export const clearTempLoginToken = () => {
  tempLoginToken = null
}
