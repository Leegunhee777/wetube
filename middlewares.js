import routes from "./routes";

export const localsMiddleware = (req, res, next) =>{
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id:1
    }//DB생성전 가짜 정보
    next(); //이걸호출해야 다음 작업으로 넘어가짐
};