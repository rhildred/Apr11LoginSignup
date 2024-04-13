const formList = document.querySelectorAll("form");
formList.forEach((form)=>{
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if(event.submitter.value == "signup" && formData.get("password")!= formData.get("password2")){
            const oAlert = document.querySelector("#message2");
            oAlert.classList.add("alert");
            oAlert.classList.add("alert-danger");
            oAlert.innerHTML = "passwords don't match";
            return;
        }
        const usernameData = new URLSearchParams();
        usernameData.append("username", formData.get("username"));
        const saltRes = await fetch("/salt", { method: "POST", body: usernameData });
        const oSaltReply = await saltRes.json();
        const sHash = md5(`${oSaltReply.salt}:${formData.get("password")}`);
        usernameData.append("password", sHash);
        const loginSignupRes = await fetch("/loginSignup", { method: "POST", body: usernameData });
        const oLoginReply = await loginSignupRes.json();
        if(oLoginReply.success){
            window.location.replace("/");
        }else{
            const oAlert = document.querySelector("#message");
            oAlert.classList.add("alert");
            oAlert.classList.add("alert-danger");
            oAlert.innerHTML = "username or password doesn't match our records.";
        }
    });    
});
