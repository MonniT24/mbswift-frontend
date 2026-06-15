import React,{
  useEffect,
  useState
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import Login from "./pages/Login";

import ForgotPassword from "./pages/ForgotPassword";

import Register from "./pages/Register";

import BecomeRider from "./pages/BecomeRider";

import Customer from "./pages/Customer";

import Rider from "./pages/Rider";

import Admin from "./pages/Admin";

import logo from "./assets/logo.png";

// SPLASH SCREEN

function SplashScreen(){

  const navigate =
    useNavigate();

  const [showText,setShowText] =
    useState(false);

    const [loadingText,setLoadingText] =
  useState("Connecting customers...");

useEffect(()=>{

  const textTimer =
    setTimeout(()=>{

      setShowText(true);

    },600);

  const loadingTimer1 =
    setTimeout(()=>{

      setLoadingText(
        "Finding nearby riders..."
      );

    },1800);

  const loadingTimer2 =
    setTimeout(()=>{

      setLoadingText(
        "Preparing fast delivery..."
      );

    },3200);

  const loadingTimer3 =
    setTimeout(()=>{

      setLoadingText(
        "Ready to move 🚀"
      );

    },4500);

  const routeTimer =
    setTimeout(()=>{

      navigate(
        "/login",
        {
          replace:true
        }
      );

    },5500);

  return ()=>{

    clearTimeout(textTimer);
    clearTimeout(loadingTimer1);
    clearTimeout(loadingTimer2);
    clearTimeout(loadingTimer3);
    clearTimeout(routeTimer);
  };

},[navigate]);

  return(

    <div
      style={{
        minHeight:"100vh",
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        background:
          "radial-gradient(circle at top right, rgba(250,204,21,0.35), transparent 32%), linear-gradient(135deg,#0f172a,#1d4ed8)",
        overflow:"hidden",
        position:"relative",
        color:"white"
      }}
    >

      <style>
        {`
          @keyframes mbFloat {
            0%{
              transform:translateY(0) scale(1);
            }

            50%{
              transform:translateY(-10px) scale(1.04);
            }

            100%{
              transform:translateY(0) scale(1);
            }
          }

          @keyframes mbFadeUp {
            0%{
              opacity:0;
              transform:translateY(18px);
            }

            100%{
              opacity:1;
              transform:translateY(0);
            }
          }

          @keyframes mbPulse {
            0%{
              transform:scale(0.92);
              opacity:0.35;
            }

            50%{
              transform:scale(1.2);
              opacity:0.12;
            }

            100%{
              transform:scale(0.92);
              opacity:0.35;
            }
          }

          @keyframes mbSlide {
            0%{
              transform:translateX(-100%);
            }

            100%{
              transform:translateX(100%);
            }
          }
        

        @keyframes mbSlide {
  0%{
    transform:translateX(-100%);
  }

  100%{
    transform:translateX(100%);
  }
}

@keyframes deliveryMove {
  0%{
    transform:translateX(-90px);
    opacity:0;
  }

  20%{
    opacity:1;
  }

  80%{
    opacity:1;
  }

  100%{
    transform:translateX(90px);
    opacity:0;
  }
}
`}
      </style>

      <div
        style={{
          position:"absolute",
          width:"260px",
          height:"260px",
          borderRadius:"50%",
          background:"rgba(250,204,21,0.20)",
          animation:"mbPulse 2.2s ease-in-out infinite"
        }}
      />

      <div
        style={{
          position:"absolute",
          inset:0,
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.12), transparent)",
          animation:"mbSlide 2.8s ease-in-out infinite"
        }}
      />

      <div
        style={{
          position:"relative",
          zIndex:2,
          textAlign:"center",
          padding:"24px",
          animation:"mbFadeUp 0.9s ease forwards"
        }}
      >

        <img
          src={logo}
          alt="MB Swift"
          style={{
            width:"150px",
            height:"150px",
            objectFit:"contain",
            background:"white",
            padding:"10px",
            borderRadius:"50%",
            boxShadow:"0 18px 45px rgba(0,0,0,0.28)",
            animation:"mbFloat 2.1s ease-in-out infinite"
          }}
        />

        {
          showText && (

            <div
              style={{
                animation:"mbFadeUp 0.8s ease forwards"
              }}
            >

              <h1
                style={{
                  margin:"22px 0 8px",
                  fontSize:"34px",
                  fontWeight:"900",
                  color:"#facc15",
                  letterSpacing:"0.5px"
                }}
              >
                MB Swift
              </h1>

              <div
                style={{
                  color:"rgba(255,255,255,0.90)",
                  fontSize:"15px",
                  fontWeight:"800"
                }}
              >
                Driven by Speed, Powered by Trust.
              </div>
              <div
  style={{
    marginTop:"14px",
    color:"#facc15",
    fontSize:"14px",
    fontWeight:"900",
    letterSpacing:"0.4px"
  }}
>
  {loadingText}
</div>

<div
  style={{
    margin:"18px auto 0",
    width:"220px",
    height:"34px",
    position:"relative",
    overflow:"hidden"
  }}
>
  <div
    style={{
      position:"absolute",
      left:"50%",
      top:"50%",
      width:"180px",
      height:"3px",
      background:"rgba(250,204,21,0.35)",
      transform:"translate(-50%,-50%)",
      borderRadius:"999px"
    }}
  />

  <div
    style={{
      position:"absolute",
      left:"50%",
      top:"2px",
      fontSize:"24px",
      animation:"deliveryMove 2.2s ease-in-out infinite"
    }}
  >
    📦🏍️
  </div>
</div>

              <div
                style={{
                  margin:"22px auto 0",
                  width:"180px",
                  height:"8px",
                  borderRadius:"999px",
                  background:"rgba(255,255,255,0.18)",
                  overflow:"hidden"
                }}
              >
                <div
                  style={{
                    width:"65%",
                    height:"100%",
                    borderRadius:"999px",
                    background:"#facc15",
                    animation:"mbSlide 1.3s ease-in-out infinite"
                  }}
                />
              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}

// PRIVATE ROUTE

function PrivateRoute({

  children,
  role

}){

  const token =
    localStorage.getItem(
      "token"
    );

  const storedUser =
    localStorage.getItem(
      "user"
    );

  let user = null;

  try{

    user =
      storedUser &&
      storedUser !==
      "undefined"
      ?
      JSON.parse(
        storedUser
      )
      :
      null;

  }catch(error){

    console.log(
      "Invalid user data"
    );

    localStorage.removeItem(
      "user"
    );
  }

  if(!token){

    return (
      <Navigate to="/login"/>
    );
  }

  if(
    role &&
    user?.role !== role
  ){

    return (
      <Navigate to="/login"/>
    );
  }

  return children;
}

// APP

export default function App(){

  return(

    <BrowserRouter>

      <Routes>

        {/* SPLASH */}

        <Route

          path="/"

          element={
            <SplashScreen/>
          }
        />

        {/* LOGIN */}

        <Route

          path="/login"

          element={
            <Login/>
          }
        />

        {/* FORGOT PASSWORD */}

        <Route

          path="/forgot-password"

          element={
            <ForgotPassword/>
          }
        />

        {/* REGISTER */}

        <Route

          path="/register"

          element={
            <Register/>
          }
        />

        {/* BECOME RIDER */}

        <Route

          path="/become-rider"

          element={
            <BecomeRider/>
          }
        />

        {/* CUSTOMER */}

        <Route

          path="/customer"

          element={

            <PrivateRoute
              role="customer"
            >

              <Customer/>

            </PrivateRoute>
          }
        />

        {/* RIDER */}

        <Route

          path="/rider"

          element={

            <PrivateRoute
              role="rider"
            >

              <Rider/>

            </PrivateRoute>
          }
        />

        {/* ADMIN */}

        <Route

          path="/admin"

          element={

            <PrivateRoute
              role="admin"
            >

              <Admin/>

            </PrivateRoute>
          }
        />

        {/* FALLBACK */}

        <Route

          path="*"

          element={
            <Navigate to="/login"/>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}