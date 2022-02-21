const selectedcolor = document.querySelector("#zone");

const googleLogin = document.getElementById("google-login");
const weChatLogin = document.getElementById("wechat-btn");

Flagship.start(

    "c86qidai1k7g0idvo81g",
    "QyiaARJcqSCkJtOMjOCrauYmGqpBXkoiFysmexJv"

);
const visitor = Flagship.newVisitor({
    hasConsented: true,
    context: {
        zone: selectedcolor.value
    }
});
visitor.on("ready", function(error) {
    if (error) {
        console.log("error", error);
    }

    // step 5 get flags
    visitor
        .getModifications([{
                key: "login-red",
                defaultValue: false,
                activate: true // send activate
            },
            {
                key: "login-blue",
                defaultValue: false,
                activate: true // send activate
            },
            {
                key: "btn_color",
                defaultValue: "#0000ff",
                activate: true // send activate
            }
        ])
        .then((flags) => {

            if (flags["login-red"]) {
                googleLogin.classList.remove("d-none");
            } else {
                googleLogin.classList.add("d-none");
            }

            if (flags["login-blue"]) {
                weChatLogin.classList.remove("d-none");
            } else {
                weChatLogin.classList.add("d-none");
            }


            const startbutton = document.querySelector("#btn");
            startbutton.style.backgroundColor = flags["btn_color"];
            startbutton.style.borderColor = flags["btn_color"];

            console.log(flags);

        });
});

selectedcolor.addEventListener("change", function(e) {;
    visitor.updateContext({ zone: e.target.value });
    visitor.synchronizeModifications();
});


const startbutton = document.getElementById("btn");
//send hit
startbutton.addEventListener("click", (e) => {
    e.preventDefault();
    visitor
        .sendHit({
            type: "EVENT",
            category: "Action Tracking",
            action: "btn_color"
        })
        .then(() => {
            alert("Hit Btn Color sent");
        });
    console.log("Start button clicked for Hit Event", visitor);
});

//send hit
googleLogin.addEventListener("click", () => {
    visitor
        .sendHit({
            type: "EVENT",
            category: "Action Tracking",
            action: "login-red"
        })
        .then(() => {
            alert("Hit google login sent");
        });
    console.log("Google button clicked for Hit Event", visitor);
});

//send hit
weChatLogin.addEventListener("click", () => {
    visitor
        .sendHit({
            type: "EVENT",
            category: "Action Tracking",
            action: "login-blue"
        })
        .then(() => {
            alert("Hit wechat login sent");
        });
    console.log("Wechat button clicked for Hit Event", visitor);
});