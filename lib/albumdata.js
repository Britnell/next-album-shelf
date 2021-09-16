import React from "react";
import albums from './album-list'
import SpotifyWebApi from 'spotify-web-api-node'


async function getToken(api){
    return await api.clientCredentialsGrant()
        .then( data => data.body )
        .then( (data)=>{
            let tkn = data['access_token']
            if(tkn)     api.setAccessToken(tkn)
            else        return { error: 'error fetching token' }
        })
        .catch( (err)=> {error: err.message } )
    //   
}

async function fetchAlbums(api,albums){
    return await api.getAlbums(albums)
                    .then(
                        (data)=>data.body,
                        (err)=>{ error: err.message }
                    )
}

export default async function fetchAlbumShelf(){
    const spotifyApi = new SpotifyWebApi({
        clientId:       process.env.CLIENT_ID,
        clientSecret:   process.env.CLIENT_SECRET,
        redirectUri:    process.env.CLIENT_REDIRECT,
    });

    var err = await getToken(spotifyApi)
    if(err)        return err;

    var data = []
    var _albums = [...albums]
    while(_albums.length>0){
        let slice = _albums.splice(0,20)
        let res = await fetchAlbums(spotifyApi,slice)
        if(!res)       return { error: 'unknown' }
        if(res.error)  return res.error;
        data = data.concat(res.albums)
    }
    return data;
}
