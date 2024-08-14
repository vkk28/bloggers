import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/congif";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  let id = userData.$id !== undefined ? userData.$id : userData.userData.$id;
  const isAuthor = post && userData ? post.Userid === id : false;
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 flex justify-center">
      <div className="max-w-[57rem]">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl max-h-80">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl object-cover"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    hover="hover:bg-green-700 hover:text-white"
                    className="mr-3 rounded-lg"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="rounded-lg"
                  hover="hover:bg-red-700 hover:text-white"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css text-justify leading-relaxed">
            {parse(String(post.content))}
          </div>
        </Container>
      </div>
    </div>
  ) : null;
}
