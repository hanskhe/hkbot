// Description:
//   Botten svarer på enkle hilsner og lytter etter spesifikke spørsmål
//
// Commands:
//   hubot hello - boten hilser tilbake
//   hvem er den neste hovedpersonen i skam  - boten svarer


module.exports = function (robot) {
  robot.respond(/hello/, function (res) {
    /* Denne respond-funksjonen vil bli kalt hver gang du snakker direkte med botten og bruker ordet hello.
     Du snakker direkte med botten ved å skrive: @bottnavn _______  */

    //code here
    res.reply("Yes Master")
  });

  robot.hear(/Donald Trump/, function (res) {
    /* Denne hear-funksjonen vil bli kalt hver gang noen sier "hvem er neste hovedpersonen i skam" i en chat hvor
     botten har tilgang */


    //code here
    res.send("Did you mean Donald _Drumpf_?")
  });
};
