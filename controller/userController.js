import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join",{pageTitle:"Join"});
}

export const postJoin = (req, res) => {
    //console.log(req.body);
    const {name, email, password, password2} = req.body;
    if(password !== password2){
        res.status(400);//서버상태에대한 응답을 보낼수도있음
        res.render("join",{pageTitle:"Join"});
    }
    else{
        //To Do: Register User
        //To Do: Log user in
        res.redirect(routes.home);
    }
    
}



export const getLogin = (req, res) => {
    res.render("login",{pageTitle:"Login"});
}
export const postLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    //로그아웃처리하기
    res.redirect(routes.home);
}
export const users = (req, res) => res.render("Users",{pageTitle:"Users"});
export const userDetail = (req, res) => res.render("userDetail",{pageTitle:"User Detail"});
export const editProfile = (req, res) => res.render("editProfile",{pageTitle:"Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword",{pageTitle:"Change Password"});