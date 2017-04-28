// Description:
//   Botten skaffer data om ledige sykler og låser fra oslo bysykkel
//
// Commands:
//   hubot bysykkel hjem - forteller hvor du skal hente sykkel når du går fra FT.


module.exports = function (robot) {
  robot.respond(/bysykkel hjem/, function (res) {
    /* Denne respond-funksjonen vil bli kalt hver gang du snakker direkte med botten og bruker ordet hello.
     Du snakker direkte med botten ved å skrive: @bottnavn _______  */
     robot.http("https://oslobysykkel.no/api/v1/stations/availability")
     .header("Client-Identifier", "ea3181e9c45934acfa673644eb864dd4")
     .get()(function(err, response, body){
        var parsedBody = JSON.parse(body);
        var bankplassen = parsedBody.stations.find(x => x.id === 279).availability;
        var fallback = "There are " + bankplassen.bikes + " bikes at Bankplassen";
        res.send({
          attachments: [{
           "fallback": fallback,
           "color": "#33FF49",
           "title": "Bankplassen",
           "title_link": "https://oslobysykkel.no/en/map",
           "fields": [
               {
                   "title": ":bike:",
                   "value": bankplassen.bikes,
                   "short": false
               },
               {
                   "title": ":lock:",
                   "value": bankplassen.locks,
                   "short": false
               }
           ],
           "footer": "Oslo Bysykkel",
           "footer_icon": "https://d2aaneovdlurb.cloudfront.net/assets/favicon-167-4377bcb90ff01a5192c52a357821d986b667d7d9a73b344c411918e16ffd9732.png"
         }],
          "as_user" : false,
          "icon_url" : "https://pbs.twimg.com/profile_images/708984982799122432/dkNYCC0p.jpg",
          "username" : "hkbot"
        });
     })
  });
};
