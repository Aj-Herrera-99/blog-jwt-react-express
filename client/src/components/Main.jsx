import axios from "axios";
import { useState, useEffect } from "react";

function Main({ currUser }) {
    // states
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    // fetching
    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3000/posts"),
            fetch("http://localhost:3000/api/users"),
        ])
            .then((responses) =>
                Promise.all(responses.map((res) => res.json()))
            )
            .then((jsons) => {
                setPosts(jsons[0]);
                setUsers(jsons[1]);
            });
    }, []);

    // actions
    // TODO: submit new post con verifica token
    const submitNewPost = (e) => {
        e.preventDefault();
        const userId = currUser.id;
        const content = e.target.querySelector("textarea").value;
        axios({
            method: "post",
            url: "http://localhost:3000/posts",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ userId, content }),
        })
            .then((res) => res.data)
            .then((data) => setPosts([data, ...posts]));
    };

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

    return (
        <main className="flex px-8 text-xl grow bg-stone-800">
            {/* todo: creare componente Post */}
            <section className="w-3/5">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="mx-auto my-8 h-[190px] flex p-2 text-black bg-white rounded-xl relative"
                    >
                        {(currUser.isAdmin || currUser.id == post.userId) && (
                            <i
                                onClick={() => removePost(post.id, post.userId)}
                                className="absolute text-red-500 fa-solid fa-xmark hover:scale-150 hover:drop-shadow-[0_0_2px_rgb(255,0,0)] transition-all"
                            ></i>
                        )}

                        <div className="flex flex-col justify-around w-1/5 border-r border-r-stone-400">
                            <span>
                                Author:{" "}
                                {
                                    users.find((user) => user.id == post.userId)
                                        .username
                                }
                            </span>
                            <span>Date: {post.date}</span>
                        </div>
                        <div className="w-2/5 ml-2 overflow-hidden line-clamp-[6] grow">
                            Content: {post.content}
                        </div>
                    </div>
                ))}
            </section>
            {/* todo: creare componente PostForm */}
            <section className="my-8 text-white grow">
                <form
                    onSubmit={submitNewPost}
                    className="p-4 mx-16 rounded-xl bg-stone-700"
                >
                    <p>
                        <label htmlFor="new-post">What's on your mind</label>
                    </p>
                    <textarea
                        id="new-post"
                        rows={5}
                        cols={50}
                        className="p-2 resize"
                    ></textarea>
                    <div className="text-end">
                        <button className="py-1 tracking-widest uppercase rounded-2xl">
                            Post
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Main;
