// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const youtubeapi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({

    getAllVideos: builder.query({
        query: () => ({
        url:'videos/',
        method:'GET'
      })
    }),
    
    getVideo: builder.query({
        query: (slug_name) => ({
        url:`videos/${slug_name}/`,
        method:'GET' 
      })
    }),
    
    getUserChannel: builder.query({
        query: (user_name) => ({
        url:`channel/${user_name}/`,
        method:'GET'
      })
    }),

    getUser: builder.query({
      // ------------------------------------
        query: (access_token) => {
        return {
          url:'api/user/userchannelinfo/',
          method:'GET',
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
      }
    }
      // ------------------------------------
    }),

    verifyemail: builder.query({
      // ------------------------------------
        query: (id,token) => {
        return {
          url:`api/user/verify-email/${id}/${token}/`,
          method:'GET'
      }
    }
      // ------------------------------------
    }),
    
    useraccountdetail: builder.query({
      // ------------------------------------
        query: (access_token) => {
        return {
          url:'api/user/userprofileinfo/',
          method:'GET',
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
      }
    }
      // ------------------------------------
    }),
    
    userchanneldetail: builder.query({
      // ------------------------------------
        query: (access_token) => {
        return {
          url:'api/user/userchannelinfo/',
          method:'GET',
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
      }
    }
      // ------------------------------------
    }),
    
    uservideodetail: builder.query({
      // ------------------------------------
        query: (access_token) => {
        return {
          url:'api/user/uservideos/',
          method:'GET',
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
      }
    }
      // ------------------------------------
    }),

    loginUser: builder.mutation({
      // ------------------------------------
      query: (userdata) => {
        return {
          url:'api/user/login/',
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),

    registerUser: builder.mutation({
      // ------------------------------------
      query: (userdata) => {
        return {
          url:'api/user/register/',
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
   
  passwordresetemail: builder.mutation({
      // ------------------------------------
      query: (userdata) => {
        return {
          url:'api/user/send-reset-password-email/',
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
 
  passwordreset: builder.mutation({
      // ------------------------------------
      query: ({userdata, uid, token}) => {
        return {
          url:`api/user/passwordreset/${uid}/${token}/`,
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
    
  updateuseraccount: builder.mutation({
      // ------------------------------------
      query: ({actualData, access_token}) => {
        return {
          url:'api/user/userprofileupdate/',
          method:'PATCH',
          body:actualData,
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),
  
  uploaduservideo: builder.mutation({
      // ------------------------------------
      query: ({actualData, access_token}) => {
        return {
          url:'api/user/uploaduservideo/',
          method:'PATCH',
          body:actualData,
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),
  
  updateuservideo: builder.mutation({
      // ------------------------------------
      query: ({actualData, slug_name, access_token}) => {
        return {
          url:`api/user/updateuservideo/${slug_name}/`,
          method:'PATCH',
          body:actualData,
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),
  
  uservideodelete: builder.mutation({
      // ------------------------------------
      query: ({slug_name, access_token}) => {
        return {
          url:`api/user/uservideodelete/${slug_name}/`,
          method:'DELETE',
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),

    SubscribeUser: builder.mutation({
      // ------------------------------------
      query: ({ actualData, access_token}) => {
        return {
          url:`api/user/subscribe-unsubscribe/${actualData}/`,
          method:'PATCH',
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),
    
  
  VideoLike: builder.mutation({
      // ------------------------------------
      query: ({ slug_name, access_token, like_name}) => {
        return {
          url:`api/user/like-dislike/${slug_name}/${like_name}/`,
          method:'PATCH',
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),

  












  
    deletePost: builder.mutation({
      // ------------------------------------
      query: (id) => {
        return {
          url:`posts/${id}`,
          method:'DELETE',
        }
      }
      // ------------------------------------
  }),

    createPost: builder.mutation({
      // ------------------------------------
      query: (newpost) => {
        return {
          url:'posts',
          method:'POST',
          body:newpost,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),

    updatePost: builder.mutation({
      // ------------------------------------
      query: (u) => {
        // we destructure id from updatepost
        const {id, ...data} = u
        return {
          url:`posts/${id}`,
          method:'PUT',
          body:data,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
    })



// ------------------------------------------
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllVideosQuery, useGetVideoQuery, useGetUserChannelQuery, usePasswordresetMutation, usePasswordresetemailMutation, useUploaduservideoMutation, useUservideodeleteMutation, useUpdateuservideoMutation, useUpdateuseraccountMutation, useVideoLikeMutation, useUservideodetailQuery, useUseraccountdetailQuery, useUserchanneldetailQuery, useVerifyemailQuery, useGetUserQuery, useLoginUserMutation, useRegisterUserMutation, useSubscribeUserMutation,                 useGetPostQuery, useDeletePostMutation, useCreatePostMutation, useUpdatePostMutation } = youtubeapi