import albums from '../../lib/album-list'
import SpotifyWebApi from 'spotify-web-api-node'

// https://github.com/thelinmichael/spotify-web-api-node

export default async function handler(req, res) {

    const sendJson = (data)=>res.status(200).json(data)

    var spotifyApi = new SpotifyWebApi({
        clientId:       process.env.CLIENT_ID,
        clientSecret:   process.env.CLIENT_SECRET,
        redirectUri:    process.env.CLIENT_REDIRECT,
    });

    let token = await spotifyApi.clientCredentialsGrant()
        .then( data => data.body )
        .then( (data)=> data['access_token'] )
        .catch( (err)=>sendJson({error: err.message }) )
    
    console.log(' token ',token )
    spotifyApi.setAccessToken(token)
    
    // while(albums.length>0){
        let albs = albums.splice(0,20)
        spotifyApi.getAlbums(albs)
            .then(data=>{
                sendJson({ data: 123 })
            })
            .catch(err=> sendJson({error: err.message }))
    // }

    // res.status(200).json({ a:1 })
  }
  