// Description:
//   Botten skaffer data om ledige sykler og låser fra oslo bysykkel
//
// Commands:
//   hubot bysykkel hjem - forteller hvor du skal hente sykkel når du går fra FT.


module.exports = function(robot) {
  robot.respond(/bysykkel hjem/, function(res) {
    /* Denne respond-funksjonen vil bli kalt hver gang du snakker direkte med botten og bruker ordet hello.
     Du snakker direkte med botten ved å skrive: @bottnavn _______  */
    var stationsOfInterest = [279, 249, 278, 220, 302];

    robot.http("https://oslobysykkel.no/api/v1/stations/availability")
      .header("Client-Identifier", process.env.BYSYKKEL_API_TOKEN)
      .get()(function(err, response, body) {
        var stationAvailability = JSON.parse(body);
        robot.http("https://oslobysykkel.no/api/v1/stations")
          .header("Client-Identifier", process.env.BYSYKKEL_API_TOKEN)
          .get()(function(err, response, body) {
            var stationData = JSON.parse(body);
            //
            // var bankplassen = stationAvailability.stations.find(x => x.id === 279).availability;
            // var vippost = stationAvailability.stations.find(x => x.id === 249).availability;
            // var vippvest = stationAvailability.stations.find(x => x.id === 278).availability;
            // var kontra = stationAvailability.stations.find(x => x.id === 220).availability;
            // var radhusgata = stationAvailability.stations.find(x => x.id === 302).availability;
            //




            var attach = [];
            for (stationId of stationsOfInterest) {
              attach.push(createBysykkelAttachment(getStationAvailability(stationAvailability, stationId), getStationName(stationData, stationId)));
            }

            res.send({
              attachments: attach,
              "as_user": false,
              "icon_url": "https://pbs.twimg.com/profile_images/708984982799122432/dkNYCC0p.jpg",
              "username": "hkbot"
            });
          })
      });

    var getStationAvailability = function(stationAvailability, stationId) {
      return stationAvailability.stations.find(x => x.id === stationId).availability;
    }

    var getStationName = function(stationData, stationId) {
      return stationData.stations.find(x => x.id === stationId).title;
    }

    var createBysykkelAttachment = function(stationAvailability, stationName) {
      return {
        "fallback": "There are " + stationAvailability.bikes + " at " + stationName,
        "color": stationAvailability.bikes > 5 ? "#33FF49" : "#FF0000",
        "title": stationName,
        "title_link": "https://oslobysykkel.no/en/map",
        "fields": [{
            "title": ":bike:",
            "value": stationAvailability.bikes,
            "short": false
          },
          {
            "title": ":lock:",
            "value": stationAvailability.locks,
            "short": false
          }
        ],
        "footer": "Oslo Bysykkel",
        "footer_icon": "https://d2aaneovdlurb.cloudfront.net/assets/favicon-167-4377bcb90ff01a5192c52a357821d986b667d7d9a73b344c411918e16ffd9732.png"
      }
    }
  })
};
