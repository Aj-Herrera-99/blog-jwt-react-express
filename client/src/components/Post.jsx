import { useState } from "react";
import axios from "axios";

function Post({ post, posts, setPosts, users, currUser }) {
    const [update, setUpdate] = useState(false);
    const [content, setContent] = useState(post.content);

    // actions
    const removePost = (id, userId) => {
        axios({
            method: "delete",
            url: `http://localhost:3000/posts/${id}/${userId}`,
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + currUser.accessToken,
            },
        })
            .then((res) => {
                console.log(res.data);
                const newPosts = posts.filter((user) => user.id != id);
                setPosts(newPosts);
            })
            .catch((err) => {
                console.error(err.response.data);
                if (err.status == 401) {
                    navigate("/");
                }
            });
    };

    const handleTextChange = (e) => {
        setContent(e.target.value);
    };

    const updatePost = (e, id, userId, newContent) => {
        axios({
            method: "put",
            url: `http://localhost:3000/posts/${id}/${userId}`,
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + currUser.accessToken,
            },
            data: {
                content: newContent,
            },
        }).then(() => {
            const updatedPost = posts.find((post) => post.id === id);
            updatedPost.content = newContent;
            const newPosts = posts.filter((post) => post.id !== id);
            newPosts.push(updatedPost);
            console.log(newPosts);
            setPosts(newPosts);
        }).catch(err => console.log(err.response.data));
    };

    return (
        <div
            key={post.id}
            id={post.id}
            className="post mx-auto my-8 h-[190px] flex p-2 text-black bg-white rounded-xl"
        >
            <div className="relative flex flex-col justify-around w-1/5 border-r border-r-stone-400">
                <span>
                    Author:{" "}
                    {users.find((user) => user.id == post.userId).username}
                </span>
                <span>Date: {post.date}</span>
                {(currUser.isAdmin || currUser.id == post.userId) && (
                    <>
                        <i
                            onClick={() => removePost(post.id, post.userId)}
                            className="absolute top-0 text-red-500 fa-solid fa-xmark hover:scale-150 hover:drop-shadow-[0_0_2px_rgb(255,0,0)] transition-all"
                        ></i>
                        {!update && (
                            <i
                                onClick={() => setUpdate(true)}
                                className="absolute top-0 right-1 text-stone-600 fa-solid fa-pen-to-square hover:scale-125 hover:drop-shadow-[0_0_2px_rgb(0,0,0)] transition-all"
                            ></i>
                        )}
                        {update && (
                            <div className="absolute top-0 flex gap-3 right-1">
                                <i
                                    onClick={() => {
                                        setUpdate(false);
                                        setContent(post.content);
                                    }}
                                    className="fa-solid fa-rotate-left"
                                ></i>
                                <i
                                    onClick={(e) => {
                                        updatePost(
                                            e,
                                            post.id,
                                            currUser.id,
                                            content
                                        );
                                        setUpdate(false);
                                    }}
                                    className="fa-regular fa-square-check"
                                ></i>
                            </div>
                        )}
                    </>
                )}
            </div>
            <textarea
                onChange={handleTextChange}
                className="w-2/5 ml-2 overflow-hidden line-clamp-[6] grow hyphens-auto break-words bg-inherit resize-none focus:outline-none select-none"
                disabled={!update && true}
                value={content}
            ></textarea>
        </div>
    );
}
export default Post;
