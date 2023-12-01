import jwt from "jsonwebtoken";

//user wants to like a post
//clicks like button => auth middleware  "says you're good to go" (NEXT) => like controller

const secret = 'test';

//next- do something then move onto next part
const auth = async (req, res, next) => {
  try {
    //to check if user is actually who he claims to be
    //check if his token is valid
    //gets token from frontend

    //after splitting , token is at 1 position in array
    const token = req.headers.authorization.split(" ")[1];
    
    const isCustomAuth = token.length < 500;

    let decodedData;
    //token is our own
    if (token && isCustomAuth) { 
      //give us data from each token     
      decodedData = jwt.verify(token, secret);

      //we know which user is logged in and doing action
      //we store the user id in req.userID
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
