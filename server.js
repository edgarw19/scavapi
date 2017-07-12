var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  QAS = require('./api/models/QAModel'),
  Settings = require('./api/models/SettingModel'),
  Categories = require('./api/models/CategoryModel'),
  Users = require('./api/models/UserModel'),
  QueInteractions = require('./api/models/QueInteractionModel'),
  Winners = require('./api/models/WinnerModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test1:test@ds153732.mlab.com:53732/puamscavenger');



var questions = [{
    "promptResponse": "From where I lay it is very dark\nTo the Underworld I will embark, On one side of the lid is a mask of my head\nThe other side a spell from the Book of the Dead.\nWhat is my name?",
    "imageUrl": "",
    "acceptedAnswer": "Wadj-shemsi-su; Fragmentary Lid from the Coffin of Wadj-shemsi-su",
    "correctResponse": "You’re correct! The text above my head helped my soul travel safely through the Underworld by teaching me passwords, giving me clues, and revealing routes to keep me out of danger.",
    "correctResponseImage": "",
    "incorrectResponse": "That’s not quite it. Please try again!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "37715",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "This object featuring imitation coins demonstrates the desire of the Severan emperors to be associated with the popular Antonine Dynasty. What is this object made of?",
    "imageUrl": "",
    "acceptedAnswer": "Gold",
    "correctResponse": "Exactly! Here is a look of the back of the pendants inspired by Severan coins minted in Egypt. They feature a lion, a chariot, a winged Victory, and the goddesses Isis and Spes (Hope).",
    "correctResponseImage": "http://puam-loris.aws.princeton.edu/loris/2003-93_FRN.jp2/full/400,/0/color.jpg",
    "incorrectResponse": "That’s not it. Go again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "41978",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "This object tells the story of a drinking contest between Herakles, the mythological hero, and Dionysos, the god of wine. What is it made of?",
    "imageUrl": "",
    "acceptedAnswer": "Tessarae; Stone and glass",
    "correctResponse": "Great job! This large mosaic was made for the dining room of a home and was used as a moral message for mortals to watch their alcoholic consumption because not even Herakles can out-drink the god of wine.",
    "correctResponseImage": "",
    "incorrectResponse": "Nice try! Please answer again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "29551",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "When it comes to love, gods are as feeble as men,\nSwayed by their passions again and again.\nThis ancient fragment illustrates the statement above – \nNot even gods can escape the power of love.\nWhat two gods are on this fragment?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/INV003348.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Zeus and Hera; Hera and Zeus",
    "correctResponse": "Way to go! This fragment is from a kylix, which is an ancient Greek cup with a shallow bowl and long stem. Here is an intact kylix also made in the 4th Century B.C. depicting Nike and youths from Museum’s collection.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/77dfcf1301f2abc381fe3e72251ada96.jpg",
    "incorrectResponse": "Lighting just struck you! Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "23849",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I am made of bronze and after death I provided my owner with a home. What object am I?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/1999-70.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Cinerary Urn in the Form of a House; Urn; Cinerary Urn",
    "correctResponse": "Well done! Take a look at this other Etruscan ash urn in the Museum’s collection from the second half of the 2nd century B.C. This urn depicts Pelops and Hippodameia.",
    "correctResponseImage": "http://puam-loris.aws.princeton.edu/loris/y1986-68.jp2/full/400,/0/color.jpg",
    "incorrectResponse": "That’s not quite right. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "35147",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "Some people say that I am wild and mean,\nOver the years I have sadly turned green.\nI am half horse and half man,\nI run fast – catch me if you can!\nWhat am I?",
    "imageUrl": "",
    "acceptedAnswer": "Statuette of a Centaur; Centaur",
    "correctResponse": "You caught me! Do you notice the slight smile on my face? That is referred to as an “Archaic smile” and was common during the Archaic period. My smile inspired the Museum’s exhibition The Centaur's Smile: The Human Animal in Early Greek Art.",
    "correctResponseImage": "",
    "incorrectResponse": "I guess I’m too fast! Try to catch me again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "8146",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I was a lifelong student of Stoic philosophy and wrote the book Meditations. Who am I?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1958-1_FRN_SL.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Marcus Aurelius; Marcus",
    "correctResponse": "You got it! This head could have been broken from either a bust or a full-sized statue, with the emperor shown heroically nude, draped in a toga, or suited in armor.",
    "correctResponseImage": "",
    "incorrectResponse": "Give it another try.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "28094",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "This object that was used to hold oil is in the shape of a mythical Greek creature often depicted as half woman and half bird. What is this mythical creature?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1989-31_FRN.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Siren; Oil bottle in the form of a Siren",
    "correctResponse": "Super! Take a look at this aryballos in the Museum’s collection. This object also held oil and features a siren.",
    "correctResponseImage": "http://puam-loris.aws.princeton.edu/loris/INV003242.jp2/full/400,/0/color.jpg",
    "incorrectResponse": "Sorry that is not right. Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "33104",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "Atop this Egyptian jar sits a head,\nIts duty is to hold organs of the dead.\nWhat is the object?",
    "imageUrl": "",
    "acceptedAnswer": "canopic jar; pair of canopic jars; pair of canopic jars, for holding the organs of the deceased",
    "correctResponse": "Well done! According to the New Kingdom’s system of mummification they removed the intestines, stomach, lungs, and liver and placed them in canopic jars. The heart was left inside as the source for intelligence. In later mummies, the organs were treated, wrapped, and replaced in the body but they still used canopic jars as part of the ritual.",
    "correctResponseImage": "",
    "incorrectResponse": "That is not it. Give it another try.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "21887",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "The man depicted in this object is generally considered to be a great New Comedy playwright. What is his name?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1951-1.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Menander",
    "correctResponse": "Exactly! New Comedy is a form of Greek drama from about 320 BC to the mid-3rd century BC that offers a mildly satiric view of contemporary Athenian society, especially in its familiar and domestic aspects. It features fictional average citizens and has no supernatural or heroic overtones.",
    "correctResponseImage": "",
    "incorrectResponse": "Nope. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f565db602c6dca642c",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "23937",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "This handscroll was written by Huang Tingjian for Zhang Datong. What was Zhang’s relationship to Huang?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1992-22-1.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Nephew",
    "correctResponse": "Well done! The poet-statesman-calligrapher Su Shi described the effect of Huang’s brush technique as resembling snakes dangling from treetops.",
    "correctResponseImage": "",
    "incorrectResponse": "That’s not quite right. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "33737",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "What does the Preserver of the Universe hold in his upper left hand?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1961-47_FRN.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "A wheel; wheel",
    "correctResponse": "Well done! When sculptures hang on the wall you are not able to see them from all sides. Here is a picture of this object from the back.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/6f91af97b360ad317c069ac5082be017.jpg",
    "incorrectResponse": "Nope. Give it another shot.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "28869",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "Together we make a fearsome pair,\nWe were sculpted and fired in a kiln with care.\nFighting off beasts is what we do best,\nAll to protect our owner’s final rest.\nWho are we?",
    "imageUrl": "",
    "acceptedAnswer": "Pair of Tomb Guardians; tomb guardians",
    "correctResponse": "Excellent job! Be sure to take a look at this other formidable pair of tomb guardians that are also from the Tang Dynasty.",
    "correctResponseImage": "http://puam-loris.aws.princeton.edu/loris/y1969-120_SL.jp2/full/400,/0/color.jpg",
    "incorrectResponse": "Oh no! Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "55280",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I am the Buddhist deity of infinite compassion,\nYou can find me sitting in a relaxed position.\nI will protect you from getting hurt,\nOn my lower half I wear a skirt.\nWho am I?",
    "imageUrl": "",
    "acceptedAnswer": "Guanyin Seated in Royal-ease Pose; bodhisattva Guanyin",
    "correctResponse": "Nice job! Fun Fact: Temple sculptures were periodically redecorated, and the addition of relief designs on the surface of my skirt and scarves likely occurred sometime in the Ming dynasty (1368 – 1644).",
    "correctResponseImage": "",
    "incorrectResponse": "That’s not quite right. Give it another try!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "23888",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "What does the inscription on this bronze Pouring vessel with dragon-head lid say? Answer with English translation.",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1965-3_1.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Accomplished Father Ding",
    "correctResponse": "You got it! Check out this vessel also from the Western Zho Dynasty featuring a dragon on the handle.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/293709f70a138ed026be7feb8e00778a.jpg",
    "incorrectResponse": "Shucks. Give it another try.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "29713",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "What chapter from the Tale of Genji is depicted in this messenger painting?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1964-50.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Ukifune",
    "correctResponse": "Way to go! Check out this painting of two women also from Japan during the Edo period, 1600-1868. Do you see any similarities or differences?",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/7a23eba84115e2f910faae4a8d7eafe0.jpg",
    "incorrectResponse": "Sorry, that’s not it. Try again!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "29435",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "What type of object is this?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/INV05457.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Netsuke; Netsuke: Three men drinking",
    "correctResponse": "Well done! Take a look at another Japanese netsuke also made of ivory found in the Museum’s collection.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/9e527b0571ad04624007ac9acb49767f.jpg",
    "incorrectResponse": "Oops. Give it another try!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "24234",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I was harvested from Lake Tai, drilled, and then submerged back in the lake for hundreds of years before becoming a valuable collectable. What object am I?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/2008-65_1.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Taihu Rock",
    "correctResponse": "Way to go! This picture from The Lion Grove Garden in the city of Suzhou features the famously large and labyrinthine grotto of taihu rocks at the garden's center.",
    "correctResponseImage": "http://images.china.cn/attachement/jpg/site1007/20130124/001422373e19126b05184a.jpg",
    "incorrectResponse": "Give it another go!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "55543",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "The frontispiece of this handscroll depicts the historical Buddha, Shakyamuni, giving a sermon at the foot of what sacred site where Buddha gave many of his lectures?",
    "imageUrl": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/f79241396f6fe2d0690541c93e884e88.jpg",
    "acceptedAnswer": "Vulture Peak",
    "correctResponse": "Excellent! Take a look at this scroll rolled up next to its box.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/2c27fe6592b4cc5c637322be72b7ee04.jpg",
    "incorrectResponse": "Not exactly. Please try again!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "28405",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "What semi-legendary figure and strong support of Buddhism does this object depict?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1984-76_OBL.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Prince Shotoku; Prince Shōtoku; Young Prince Shotoku; Young Prince Shōtoku",
    "correctResponse": "Right on! The statue was constructed by the ­multiple-block (yosegi zukuri) technique. The pieces were glued together vertically and the joints covered with a glossy black lacquer, after which the figure was painted.",
    "correctResponseImage": "",
    "incorrectResponse": "That’s not it. Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659f065db602c6dca642b",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "32872",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I am a symbol of the power and authority of kings in western Cameroon. My likeness is depicted in this mask. What animal am I?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/STU00623.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Elephant",
    "correctResponse": "Great job! Leopards also symbolized power. Note the white seed beads arranged into repeating triangles—the sign of the leopard—create a dazzling positive-negative effect.",
    "correctResponseImage": "",
    "incorrectResponse": "Better luck next time. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "102729",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "When a Yoruba king speaks with this to his lips, his word is final.",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/2012-77_FRN.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Animal horn; Horn",
    "correctResponse": "Way to go! The Museum also has these Yoruba twin sculptures (ere ibeji) commissioned by parents who lost at least one of their twins. These objects were ritually washed, clothed, and fed as a way to care for the inner soul (ori inu) of the lost child. The beaded tunic—with its diamond and interlace pattern—suggests that these ere ibeji belonged to a royal mother. The red, gold, and white color scheme of the beads refers to Sango, the Yoruba god who was the protector of twins.",
    "correctResponseImage": "http://puam-loris.aws.princeton.edu/loris/2011-42_FRN1.jp2/full/400,/0/color.jpg",
    "incorrectResponse": "Give it another try!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "73907",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "This charm, covered in cowrie shells, refers to the Kuba king’s right to own what?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/AR-1.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Sheep",
    "correctResponse": "You got it! Also on view in the same case is this collar by a Kuba artist. Don’t miss it! This collar features a floral pattern comprising four cowrie shells and a blue and white beadwork design of alternating right angle triangles.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/fc61803619bd3bc9f01403fffdb5c60e.jpg",
    "incorrectResponse": "That’s not quite right. Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "60513",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "Offerings made to this communal shrine\nEnsured success so divine\nUpon its head is a crown of horns\nIt was paraded at a festival honoring male newborns.\nWhat is this object?",
    "imageUrl": "",
    "acceptedAnswer": "Ikenga",
    "correctResponse": "Excellent! Take a look at this other ikenga from Nigeria in the Museum’s collection.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/db792a57977739100cbfec97e3a4414f.jpg",
    "incorrectResponse": "Bummer. Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "60129",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I am made with feathers of red,\nI am worn atop one’s head.\nWhat object am I?",
    "imageUrl": "",
    "acceptedAnswer": "feather headdress",
    "correctResponse": "Good work! Be sure to check out this other twentieth-century headdress on view that is also made by a Cameroon Grasslands artist.",
    "correctResponseImage": "",
    "incorrectResponse": "That’s not it. Try once more.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "107469",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "What animal is referenced by the bongo’s horns on the back of the abotire?",
    "imageUrl": "",
    "acceptedAnswer": "antelope; forest antelope",
    "correctResponse": "Right on! The Bongo is a large species of antelope that is found in Eastern, Western, and Central Africa. They are the largest forest-dwelling antelope species with a chestnut colored coat and long horns that spiral as high as 90cm in males.",
    "correctResponseImage": "http://www.factzoo.com/sites/all/img/mammals/bovid/bongo-drinking-nice-horns.jpg",
    "incorrectResponse": "Good try, but not quite. Go again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "36704",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "This wearable beaded object is a symbol of prestige and power for Yaka chiefs.",
    "imageUrl": "",
    "acceptedAnswer": "Chief's hat; chiefs hat",
    "correctResponse": "Wonderful! Check out this Yaka mask in the Museum’s collection. The Yaka of southwest Zaire and northern Angola are known for a variety of masks associated with male initiation and circumcision rites.",
    "correctResponseImage": "http://puam-loris.aws.princeton.edu/loris/y1990-90_FRN.jp2/full/400,/0/color.jpg",
    "incorrectResponse": "That’s not quite right. Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "32967",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "Cameroonian men and women would put me to their lips after a big meal. What object am I?",
    "imageUrl": "",
    "acceptedAnswer": "Pipe bowl molded in the form of a human head",
    "correctResponse": "Right on! Check out this other pipe in the Museum’s collection by a Bamileke artist also made in Grasslands, Cameroon.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/74abf8db4ae6c6dc1ad17ba00cda1793.jpg",
    "incorrectResponse": "Nice try! Give it another shot.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "37861",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "This object is made of woven grass.\nIt was created by women from which culture’s ruling class?",
    "imageUrl": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/5617786a10f1fabced7161389ec63624.jpg",
    "acceptedAnswer": "Tutsi",
    "correctResponse": "Well done! Here is another beautifully woven Tutsi basket from the Museum’s collection.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/5f3a29151c8d38b547c087de95f8e518.jpg",
    "incorrectResponse": "Nope. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "37048",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "This object’s style is based on a British royal crown, affirming a Yoruba king’s alliance with the British colonial power that ruled Nigeria until 1960. What is the name of this object?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/1998-729_1.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Coronet (Orikofobo); Coronet Orikofobo; Coronet; Orikofobo",
    "correctResponse": "Nicely done! A bead artist overlaid traditional Yoruba iconography onto a profile based on a British coronation crown, likely one made for Queen Victoria. Here is an image of a hand-colored lithograph of Queen Victoria’s imperial state crown. Do you see any similarities?",
    "correctResponseImage": "http://www.saturdayeveningpost.com/wp-content/uploads/satevepost/Imperial_State_Crown_of_Queen_Victoria.jpg",
    "incorrectResponse": "Why don’t you give it another shot?",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659ea65db602c6dca642a",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "37122",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "This animal-like helmet carved realistically,\nDepicts the ferociousness of a lion of the sea.\nWhat object am I?",
    "imageUrl": "",
    "acceptedAnswer": "Crest helmet in the form of a sea lion; sea lion helmet",
    "correctResponse": "Well done! Be sure not to miss this dagger depicting a raven and bear, which was also used in battle by the Tlingit.",
    "correctResponseImage": "",
    "incorrectResponse": "Not exactly. Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "37436",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "One item in the case displaying objects form ancient Mexico’s Classic Period (A.D. 150-900) incorporates one of the six ‘simple machines’ as established by the Renaissance in Europe. From what state in Mexico is the object?",
    "imageUrl": "",
    "acceptedAnswer": "Veracruz",
    "correctResponse": "Great job! This toy likely depicts a jaguar cub, a species that can be found in Veracruz.",
    "correctResponseImage": "http://www.zooborns.com/.a/6a010535647bf3970b014e87f404fb970d-500wi",
    "incorrectResponse": "Sorry, that’s not it. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "42386",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "This wooden object may look like a computer mouse, but it was used for scraping animal hides and intestines. What is this object called in the language of its maker?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/INV009839.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Ellumerun",
    "correctResponse": "Good work! The wood handle was formed by its Artic maker for the user’s right hand.",
    "correctResponseImage": "",
    "incorrectResponse": "You missed the mark. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "36049",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "The elbow pipe used for smoking tobacco was found on a Princeton graduate’s orange plantation in Florida. What was the class year of the alumnus?",
    "imageUrl": "",
    "acceptedAnswer": "1854",
    "correctResponse": "Way to go! The designs carved on the sides of the pipe might represent the head of an alligator.",
    "correctResponseImage": "",
    "incorrectResponse": "Wrong answer. Please try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "52878",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I depict a dog with no hair,\nMy Chimú maker sculpted me with care.\nWhat object am I?",
    "imageUrl": "",
    "acceptedAnswer": "Bridge-spouted vessel in the form of a dog.",
    "correctResponse": "Way to go! Take a look at this hairless dog that is similar to what the vessel is depicting.",
    "correctResponseImage": "https://i.ytimg.com/vi/dTh-7joAxkk/hqdefault.jpg",
    "incorrectResponse": "Better luck next time. Try again!",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "44432",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}
,
{
    "promptResponse": "I was worn in a whaling captain wife’s hair while he was at sea. What object am I?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/1997-206_REC.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Whale-tail comb; whale tail comb; whaletail comb",
    "correctResponse": "Sweet! Take a look at this other whale comb in the Museum’s collection from the Okvik/OBS period made over 400 years earlier.",
    "correctResponseImage": "http://artmuseum.princeton.edu/files/styles/tms_flexslider_full/public/imagecache/external/97d56e3b26ecbea777e4022976a01125.jpg",
    "incorrectResponse": "Whoops. Give it another try.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "38282",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "This lunar object belonging to the Tlingit may have been used in shamanic rites.",
    "imageUrl": "",
    "acceptedAnswer": "moon mask",
    "correctResponse": "You got it! Visit the homepage of the Taku River Tlingit First Nation in Canada to find information about the Tlingit tribe in the past and today. http://trtfn.com/",
    "correctResponseImage": "",
    "incorrectResponse": "Nice try. Give it another shot.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "37397",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "This small, brilliantly colored ceramic effigy vessel represents a Maya maize god descending from the sky. In each hand he presents an offering of food. While the food in his right hand represents a plain tamale, that in his left hand includes the head of an animal to signal the meat flavoring. What animal is indicated here?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1982-15.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "turkey",
    "correctResponse": "Nice job! The distinctive neck and head appended to the tamale on this figure accurately captures the vibrant coloration of the ocellated turkey, a species indigenous to the Maya area.",
    "correctResponseImage": "http://1photo1day.com/wp-content/uploads/2016/11/An-ocellated-turkey-in-Guatemala-20161124.jpg",
    "incorrectResponse": "Nice try. Go again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "32714",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "An Inka ceremonial knife, known as a tumi, is on view in the case dedicated to ancient Peru. It includes inlays on the handle in green, purple, and orange. Name the material used for the orange inlays.",
    "imageUrl": "",
    "acceptedAnswer": "spondylus",
    "correctResponse": "You got it! Spondylus, otherwise known as the thorny oyster or spiny oyster, is a bivalve mollusk found in the warm waters of most of the oceans of the world. These shells were coveted during pre-Colombian times and held great symbolic power.",
    "correctResponseImage": "http://www.maramar.ind.br/maramar2011/ImageUpload/18094424122011.jpg",
    "incorrectResponse": "Give it another go.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "102723",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "What animal is inscribed on the scalp of this kneeling lord?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1976-21.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "toad",
    "correctResponse": "Excellent! Check out this image of a bufo marinus toad shedding its skin.",
    "correctResponseImage": "https://www.flickr.com/photos/30530662@N07/2883135840/",
    "incorrectResponse": "Shucks, that’s not it. Go again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "32269",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "You will notice me if you take a close look,\nI am sitting below God L and writing in a book.\nWhat is my occupation?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/y1975-17.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Scribe; a scribe",
    "correctResponse": "Well done! The formulaic texts at the upper edge of the Princeton Vase serve to consecrate the vessel, to specify that it was intended for drinking “maize tree” chocolate, and to designate its owner, a lord named Muwaan K’uk’.",
    "correctResponseImage": "",
    "incorrectResponse": "Not quite. Try again.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "32221",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
},
{
    "promptResponse": "This object’s fashionable hair style was sure to beguile.\nIt is your duty to identify this Mayan beauty.\nWhat is the name of this object?",
    "imageUrl": "http://puam-loris.aws.princeton.edu/loris/2005-65A-B_OBL.jp2/full/400,/0/color.jpg",
    "acceptedAnswer": "Kneeling Woman Holding a Lidded Jar",
    "correctResponse": "You got it! This woman’s elongated head naturalistically depicts the head shape of elite Maya, produced through intentional cranial alteration in infancy. Such modification gave the head a form akin to an ear of maize, the primary staple of the ancient Maya diet and the substance from which the Maya believed humans were created.",
    "correctResponseImage": "",
    "incorrectResponse": "Nope. Give it another try.",
    "incorrectResponseImage": "",
    "exhibitCategory": "596659e065db602c6dca6429",
    "level": 0,
    "successCnt": 0,
    "skipCnt": 0,
    "failCnt": 0,
    "collApiObjId": "47566",
    "isActive": true,
    "createdDate": "2017-07-12T02:51:34.169Z",
    "updatedDate": "2017-07-12T02:51:34.169Z"
}]

for (var i = 0; i < questions.length; i++){
    var new_qa = new QAS(questions[i]);
  new_qa.save(function (err, qa) {
    if (err){console.log(err);}
  });
}

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Register Routes
var routes = require('./api/routes/QARoutes');
routes(app);
var settingroutes = require('./api/routes/SettingRoutes');
settingroutes(app);
var catroutes = require('./api/routes/CategoryRoutes');
catroutes(app);
var userroutes = require('./api/routes/UserRoutes');
userroutes(app);
var qiroutes = require('./api/routes/QueInteractionRoutes');
qiroutes(app);
var winnerroutes = require('./api/routes/WinnerRoutes');
winnerroutes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

