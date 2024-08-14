import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "./index";
import appwriteService from "../appwrite/congif";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AiRes from "./AiRes"
export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const [showElement, setShowElement] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  let id = userData.$id !== undefined ? userData.$id : userData.userData.$id;
  const handleClick = () => {
    setShowElement(true);
  };
  const submit = async (data) => {
    console.log(data);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        try {
          
          let dbPost = await appwriteService.createPost({
            ...data,
            Userid: id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        } catch (error) {
          prompt(error.message);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap flex-col md:flex-row "
    >
      <div className=" w-full lg:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full lg:w-1/3 px-3">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 active:border border-zinc-600"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="flex flex-wrap flex-col md:flex-row">
          <div className="w-3/4 px-2  md:w-1/2">
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
          </div>
          <div className="w-full px-2  md:w-1/2">
            <Button
              type="submit"
              bgColor="bg-green-500"
              className="w-full "
              textColor="text-black"
              hover="hover:bg-green-600 hover:text-white"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
          <button
            type="button"
            className="w-full p-2 rounded-xl bg-secondary-color text-white mt-4 mb-2 hover:bg-hover-color hover:text-white"
            onClick={handleClick}
          >
            Let AI help in writting post
          </button>
          {showElement && <AiRes />}
        </div>
      </div>
    </form>
  );
}
