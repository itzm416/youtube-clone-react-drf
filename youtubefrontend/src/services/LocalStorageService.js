const storeSlug = (slug) => {
    if (slug) {
      localStorage.setItem('slug_name', slug)
    }
  }
  
  const getSlug = () => {
    let slug = localStorage.getItem('slug_name')
    return { slug }
  }
  
  const removeSlug = () => {
    localStorage.removeItem('slug_name')
  }  

  // ----------------------------------------------

  const storeUsername = (username) => {
    if (username) {
      localStorage.setItem('user_name', username)
    }
  }
  
  const getUsername = () => {
    let username = localStorage.getItem('user_name')
    return { username }
  }
  
  const removeUsername = () => {
    localStorage.removeItem('slug_name')
  }  

// ------------------------------------------

const storeToken = (value) => {
  if (value) {
    const { access, refresh } = value
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  }
}

const getToken = () => {
  let access_token = localStorage.getItem('access_token')
  let refresh_token = localStorage.getItem('refresh_token')
  return { access_token, refresh_token }
}

const removeToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

// --------------------------------

const storeS = (s) => {
  if (s) {
    localStorage.setItem('s', s)
  }
}

const getS = () => {
  let s = localStorage.getItem('s')
  return { s }
}

const storeD = (u) => {
  if (u) {
    localStorage.setItem('u', u)
  }
}

const getD = () => {
  let u = localStorage.getItem('u')
  return { u }
}

const storeUserprofilepic = (pic) => {
  if (pic) {
    localStorage.setItem('pic', pic)
  }
}

const getprofilepic = () => {
  let pic = localStorage.getItem('pic')
  return { pic }
}

const removeprofilepic = () => {
  localStorage.removeItem('pic')
}

export { storeS, getS, storeSlug, getSlug, getD, storeD, removeSlug, storeUsername, storeUserprofilepic, getprofilepic, removeprofilepic, getUsername, removeUsername, storeToken, getToken, removeToken }
