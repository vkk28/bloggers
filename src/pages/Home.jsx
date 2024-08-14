import React from "react";
import {  Container, Button } from "../components/index";
import blog from "../image/blog.png"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {ReactTyped} from "react-typed";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  
  return (
    
    <div className="w-full py-2 bg-bgcolor">
      <Container>
        <div className="flex  flex-col lg:flex-row gap-8 p-5 md:p-15">
          <div className="text-slate-800 w-2/3 flex  flex-col gap-9 mx-auto my-auto">
           <div className=" text-4xl lg:text-7xl">
             <h1>Hola Amigos!</h1>
           </div>
           {/* <div className="text-4xl ">
                <h1>Welcome to the Bloggerz!</h1>
             </div> */}
           <div className="text-xl">
           <h2 className="text-4xl">
              <ReactTyped
                  strings={["Share Your Story, Connect Your World!"]}
                  typeSpeed={80}
                  loop
                  backSpeed={20}
                  cursorChar=""
                  showCursor={true}
                />
            </h2>
            </div>
            {/* 
            <div className="text-xl font-serif">
            <h3>Share Your Story, Connect Your World&nbsp;-Blog with Us!</h3>
            </div> */}
           <div>
            <Link to={authStatus ? "/all-posts" : "/login"}>
            <Button  bgColor={"bg-secondary-color"} textColor="text-white" hover="hover:bg-hover-color hover:text-white">
              {authStatus ? "View All Posts" : "Get Started" } 
              </Button>
            </Link>
           </div>
          </div>
          <div className="rounded-xl w-64 h-64  md:w-112 md:h-112 overflow-hidden lg:w-128 lg:h-128 mx-auto my-auto"> 
            <img src={blog} alt="Home" className="w-full h-full object-cover" />
          </div>
        </div>
      </Container>
    </div>
  );
  //hello
}

export default Home;
