// ===== WEBSITE CONFIGURATION =====
// Edit this file to customize all content without touching the layout code

const CONFIG = {
    // Hero Section Content
    hero: {
        title: "Forever & Always",
        subtitle: "Celebrating our beautiful journey together",
        heroImage: "images/background.jpeg" // Replace with your main photo
    },

    // Timeline story ehha se likhna 
    timeline: [
        {
            title: "First Meeting",
            date: "06/01/2023",
            description: "Do you rember you ask me for a rose to gave you and i came to your collage rode while you going to collage to give you a rose that is day i saw you ter very first time ",
            image: "images/first-meeting.png"
        },
        {
            title: "First Date",
            date: "09/10/2023",
            description: "Do you rember the after 8-9 month we decide go our first ever date but we totally messed up ",
            image: "images/first-image.jpg"
        },
        {
            title: "Became Official",
            date: "31/12/2022",
            description: " Its a lovely saturday and its 2-3 pm and that the time i propose you and you accept me <3. I remeber you told me i will accept in new year so not accepting you will gona be accept but it happrnd that moment is so spacial for me <3 LOVE YOUU BABE...  ",
            image: "images/official.png"
        },
        {
            title: "First Trip Together",
            date: "02/11/2023",
            description: "We gone to a tample for the first time as a trip place - gurjimuda. Do you while we are going we gone to a mistake rode and then we came back and arrived destination by using fully map ",
            image: "images/trip1.jpg"
        },
        {
            title: "Moving In Together",
            date: "__/__/____",
            description: "And one day YOU AND ME both of us living together",
            image: "images/timeline/moving-in.jpg"
        }
    ],

    // Gallery Images - Add your favorite photos here 
    gallery: [
        {
            src: "images/1st-img.jpg",
            caption: "Our First Image "
        },
        {
            src: "images/kiss.jpg",
            caption: "Not first kiss but captured first kiss"
        },
        {
            src: "images/rain.jpg",
            caption: "love in rain"
        },
        {
            src: "images/to1.jpg",
            caption: ""
        },
        {
            src: "images/to2.jpg",
            caption: ""
        },
        {
            src: "images/to3.jpg",
            caption: ""
        },
        {
            src: "images/hand.jpg",
            caption: "love"
        },
        {
            src: "images/call.jpg",
            caption: "10hr call "
        },
        {
            src: "images/eat.jpg",
            caption: "eating togather "
        },
        {
            src: "images/boat.jpg",
            caption: "boating togather "
        },
        {
            src: "images/happy.jpg",
            caption: " happy moments"
        },
        {
            src: "images/work.jpg",
            caption: " pasandida aurat ki seva "
        },
        {
            src: "images/us.webp",
            caption: "love us"
        },
        {
            src: "images/us2.jpg",
            caption: "im maaa manikeswari temple"
        }
    ],

    // Love Letter Content
    loveLetter: `My Dearest Wife ♡,
First of all congratulation and happy anniversary my cutiee wife. I know mui thamke bhalse time nei dei parba that why im sorry but trust me i love you so much my wife..
i just want one thing that is our marriege please be my wife and make me your husband    

    All my love, always and forever,
    Your devoted husband ♡`,

    // Important Dates
    dates: {
        relationshipStart: "2022-12-31", // When you became official   ye sab yad to hain na tujhe 
        nextAnniversary: "2025-12-31"    // Next anniversary date
    },

    // Music Settings
    music: {
        file: "music/pahad.mp3", // Replace with your song if you wanna change 
        autoplay: true // Set to true for autoplay (user will need to interact first)
    },

    // Surprise Message
    surprise: {
        title: "You Are My Everything",
        message: `
        Thank you for choosing to love me back. Thank you for making every day brighter just by being in it.

        I love you more than all the stars in the sky, and that love grows stronger with each passing day.

        Happy Anniversary, my beautiful wife ♡`
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}