'use strict'

module.exports = function exampleApiCall(req, res) { // Stand Alone
    const client_id = req.user.accessToken;
    const client_secret = req.user.accessToken;
    const token = req.user.accessToken;
    const refresh_token = req.user.refreshToken;
    superagent.get('https://api.spotify.com/v1/me/playlists?')
      .auth(req.user.accessToken, { type: 'bearer' })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then(data => {
        console.log(data.body.items[0].images);
        data.body.items.forEach(item => {
          const sqlQueryString = 'INSERT INTO spotifytable (playlist, client_id, client_secret, token, refresh_token, name_of_playlist, playlist_image_urls) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING;';
          const sqlQueryArray = [item.id, client_id, client_secret, token, refresh_token, item.name.toLowerCase(), item.images];
          client.query(sqlQueryString, sqlQueryArray);
        });
        res.redirect('/');
      });
  }
