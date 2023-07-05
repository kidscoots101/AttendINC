import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  //TODO
};

const provider = new GoogleAuthProvider();

//Init Firebase
const app = initializeApp(firebaseConfig);

//Init Firebase Auth
const auth = getAuth(app);
signInWithPopup(auth, provider)
  .then((result) => {
    //This gives you a GAuth Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    //Signed in user's info
    const user = result.user;
    console.log(user);
  })
  .catch((error) => {
    //Handle error
    const errorCode = error.code;
    const errorMEssage = error.message;
    //THE EMAIL THAT WE NEED
    const email = error.customData.email;
    //Auth type used
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

provider.setCustomParameters({
  login_hint: "user@s202x.ssts.edu.sg",
});
export { signInWithPopup };
