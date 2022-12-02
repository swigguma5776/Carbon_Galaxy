import React, {useState} from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { 
    onAuthStateChanged,
    getAuth, 
    GoogleAuthProvider, 
    signOut, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, } from 'firebase/auth'
import { 
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress, 
    styled
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../sharedComponents';


const signinStyles = {
    googleButton:{
        backgroundColor: 'rgb(66,133,244)',
        margin: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        color: 'black', 
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'left',
        fontSize: '2em',
        marginBottom: '20px' 
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf{50'
    }
}

const NavA = styled(Link)({
    display: "block",
    color: "#065579",
    marginBottom: "20px",
    marginTop: "10px",
    textDecoration: "none"
  });

// Functional components to be used inside of SignIn Component
const Alert = (props:AlertProps) =>{
    return <MUIAlert elevation={6} variant='filled' />
}

interface buttonProps{
    open: boolean,
    onClick: () => void
}

// Functional component to conditionally render Google SignIn Button
const GoogleButton = (props:buttonProps) =>{
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const signIn = async ( ) =>{
        await signInWithGoogle();
        localStorage.setItem('auth', 'true')
        console.log('User signed in')
        onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email);
            console.log(user.uid)
            localStorage.setItem("token", user.uid);
        }
        });
      
          await navigate("/dashboard");
          
        };

    const signUsOut = async () =>{
        await signOut(auth)
        localStorage.setItem('auth', 'false')
        console.log('User signed out')
        navigate('/')
    }

    if (loading){
        return <CircularProgress />
    }
    if (user){
        return (
            <Button variant='contained' size ='large' color='secondary' onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
            <Button variant='contained' color='secondary' onClick={signIn}>Sign In With Google</Button>
        )
    }
}


export const SignIn = ()=> {
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth()

    const handleSnackOpen =() =>{
        setOpen(true)
    }
    const handleSnackClose =() =>{
        setOpen(false)
        navigate('/dashboard')
    }

    const signUsOut = async () =>{
        await signOut(auth)
        localStorage.setItem('auth', 'false')
        console.log('User signed out')
        navigate('/')
    }

    const onSubmit = async (data: any, event: any) => {
        console.log(data.email, data.password);
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            localStorage.setItem("auth", "true");
            onAuthStateChanged(auth, (user) => {
              if (user) {
                localStorage.setItem("token", user.uid);
              }
            });
            const user = userCredential.user;
            //Once signed in we navigate to dashboard
            navigate("/dashboard");
            window.location.reload();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      };

    if (localStorage.getItem('auth') == 'true'){
        return (
        <Container maxWidth='md' sx={signinStyles.containerStyle}>
        <Typography sx={signinStyles.typographyStyle}>
            Thank you for checking out Carbon Galaxy.    
        </Typography> 
            <Button type="submit" variant="contained" color="primary" size="large" onClick={signUsOut}>Sign Out</Button>
        </Container>
        )
    } else {
    return (
       <Container maxWidth='sm' sx={signinStyles.containerStyle}>
        <Typography sx={signinStyles.typographyStyle}>
            Sign In Below    
        </Typography>    
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email"> Email</label>
            <Input {...register("email")} name="email" placeholder='place email here'/>
            <label htmlFor="password"> Password (must be 6 or more characters)</label>
            <Input {...register("password")} name="password"placeholder="place password here"/>
              <Button type="submit" variant="contained" color="primary" size="large">Submit</Button>
        </form>
        <br/>
        <GoogleButton open={open} onClick={handleSnackClose} />
        <NavA to="/signup">Don't have an account? Register now!</NavA>

        <Snackbar message='Success' open={open} autoHideDuration={3000}>
            <Alert severity='success'>
                <AlertTitle>Successful Sign In --- Redirect in 3 seconds</AlertTitle>
            </Alert>    
        </Snackbar>

       </Container>
    )
    }
}


export const SignUp = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();
    const handleSnackOpen = () => {
      setOpen(true);
    };
    const handleSnackClose = () => {
      setOpen(false);
      navigate("/signin");
    };
  
    const onSubmit = async (data: any, event: any) => {
      console.log(data.email, data.password);
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
  
          const user = userCredential.user;
          //Once signed in we navigate to dashboard
          navigate("/signin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    };
  
    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
         <Typography sx={signinStyles.typographyStyle}>
             Sign Up to create your free account!  
         </Typography>    
         <form onSubmit={handleSubmit(onSubmit)}>
             <label htmlFor="email"> Email</label>
             <Input {...register("email")} name="email" placeholder='place email here'/>
             <label htmlFor="password"> Password (must be 6 or more characters)</label>
             <Input {...register("password")} name="password"placeholder="place password here"/>
               <Button type="submit" variant="contained" color="primary" size="large">Submit</Button>
         </form>
         <br/>
         <GoogleButton open={open} onClick={handleSnackClose} />
         <NavA to="/signin">Already Have an Account? Sign In!</NavA>
 
         <Snackbar message='Success' open={open} autoHideDuration={3000}>
             <Alert severity='success'>
                 <AlertTitle>Successful Sign Up --- Redirect in 3 seconds</AlertTitle>
             </Alert>    
         </Snackbar>
 
        </Container>
     )
  };