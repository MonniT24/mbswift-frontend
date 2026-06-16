import React,{
  useEffect
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

  useEffect(()=>{

    const routeTimer =
      setTimeout(()=>{

        navigate(
          "/login",
          {
            replace:true
          }
        );

      },9000);

    return ()=>{

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
        "linear-gradient(145deg,#020617 0%,#0f172a 46%,#1d4ed8 100%)",
        overflow:"hidden",
        position:"relative",
        color:"white",
        perspective:"1200px"
      }}
    >
      <style>
        {`
          @keyframes splashEnter {
            0%{
              opacity:0;
              transform:translateY(32px) scale(0.86);
            }

            100%{
              opacity:1;
              transform:translateY(0) scale(1);
            }
          }

          @keyframes logoRotate3D {
            0%{
              transform:rotateY(0deg);
            }

            100%{
              transform:rotateY(360deg);
            }
          }

          @keyframes shineMove {
            0%{
              transform:translateX(-170%) rotate(22deg);
            }

            100%{
              transform:translateX(170%) rotate(22deg);
            }
          }

          @keyframes loadFill {
            0%{
              width:0%;
            }

            100%{
              width:100%;
            }
          }

          @keyframes glowPulse {
            0%,100%{
              opacity:0.45;
              transform:scale(1);
            }

            50%{
              opacity:0.8;
              transform:scale(1.08);
            }
          }
        `}
      </style>

      <div
        style={{
          position:"absolute",
          inset:0,
          background:
            "radial-gradient(circle at 50% 23%, rgba(250,204,21,0.24), transparent 34%)"
        }}
      />

      <div
        style={{
          position:"absolute",
          width:"340px",
          height:"340px",
          borderRadius:"50%",
          background:"rgba(250,204,21,0.15)",
          filter:"blur(12px)",
          animation:"loadFill 6.6s linear forwards"
        }}
      />

      <div
        style={{
          position:"absolute",
          top:"12%",
          left:"8%",
          width:"80px",
          height:"80px",
          borderRadius:"26px",
          background:"rgba(255,255,255,0.055)",
          transform:"rotate(18deg)"
        }}
      />

      <div
        style={{
          position:"absolute",
          bottom:"12%",
          right:"8%",
          width:"110px",
          height:"110px",
          borderRadius:"34px",
          background:"rgba(250,204,21,0.08)",
          transform:"rotate(-18deg)"
        }}
      />

      <div
        style={{
          position:"relative",
          zIndex:2,
          width:"88%",
          maxWidth:"380px",
          textAlign:"center",
          padding:"30px 22px",
          borderRadius:"36px",
          background:
            "linear-gradient(145deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))",
          border:"1px solid rgba(250,204,21,0.32)",
          boxShadow:"0 30px 85px rgba(0,0,0,0.48)",
          animation:"splashEnter 0.7s ease-out forwards",
          backdropFilter:"blur(10px)"
        }}
      >
        <div
          style={{
            width:"176px",
            height:"176px",
            margin:"0 auto",
            borderRadius:"42px",
            background:"linear-gradient(145deg,#ffffff,#dbeafe)",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            position:"relative",
            overflow:"hidden",
            boxShadow:
              "0 24px 52px rgba(0,0,0,0.4), inset 0 6px 14px rgba(255,255,255,0.78)",
            animation:"logoRotate3D 5s linear forwards",
            transformStyle:"preserve-3d"
          }}
        >
          <div
            style={{
              position:"absolute",
              top:"-48%",
              left:"-75%",
              width:"76px",
              height:"280px",
              background:"rgba(255,255,255,0.68)",
              animation:"shineMove 2.4s ease-in-out infinite"
            }}
          />

          <img
            src={logo}
            alt="MB Swift"
            style={{
              width:"136px",
              height:"136px",
              objectFit:"contain",
              position:"relative",
              zIndex:2
            }}
          />
        </div>

        <h1
          style={{
            margin:"24px 0 6px",
            fontSize:"40px",
            fontWeight:"900",
            color:"#facc15",
            letterSpacing:"0.4px"
          }}
        >
          MB Swift
        </h1>

        <div
          style={{
            color:"rgba(255,255,255,0.92)",
            fontSize:"14px",
            fontWeight:"900",
            marginBottom:"18px"
          }}
        >
          Driven by Speed, Powered by Trust.
        </div>

        <div
          style={{
            display:"inline-flex",
            alignItems:"center",
            justifyContent:"center",
            gap:"8px",
            padding:"8px 14px",
            borderRadius:"999px",
            background:"rgba(250,204,21,0.14)",
            border:"1px solid rgba(250,204,21,0.36)",
            color:"#facc15",
            fontSize:"12px",
            fontWeight:"900",
            marginBottom:"20px"
          }}
        >
          🚀 Fast • Secure • Reliable
        </div>

        <div
          style={{
            width:"100%",
            height:"9px",
            borderRadius:"999px",
            background:"rgba(255,255,255,0.16)",
            overflow:"hidden"
          }}
        >
          <div
            style={{
              height:"100%",
              borderRadius:"999px",
              background:"linear-gradient(90deg,#facc15,#f59e0b)",
              animation:"loadFill 4.6s linear forwards"
            }}
          />
        </div>
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

    return(
      <Navigate to="/login"/>
    );
  }

  if(
    role &&
    user?.role !== role
  ){

    return(
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

        <Route
          path="/"
          element={
            <SplashScreen/>
          }
        />

        <Route
          path="/login"
          element={
            <Login/>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword/>
          }
        />

        <Route
          path="/register"
          element={
            <Register/>
          }
        />

        <Route
          path="/become-rider"
          element={
            <BecomeRider/>
          }
        />

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