import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";

function Main({ currUser }) {
    // states
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    // fetching
    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3000/posts"),
            fetch("http://localhost:3000/users"),
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
    const submitNewPost = (e) => {
        e.preventDefault();
        const userId = currUser.id;
        const content = e.target.querySelector("textarea").value;
        e.target.querySelector("textarea").value = "";
        axios({
            method: "post",
            url: "http://localhost:3000/posts",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + currUser.accessToken,
            },
            data: JSON.stringify({ userId, content }),
        })
            .then((res) => res.data)
            .then((data) => setPosts([data, ...posts]))
            .catch((err) => console.error(err.response.data));
    };

    return (
        <main className="flex px-8 text-xl grow bg-stone-800">
            {/* todo: barra di ricerca, filtri per autore, data, ordine */}

            <section className="w-3/5">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        posts={posts}
                        setPosts={setPosts}
                        users={users}
                        currUser={currUser}
                    ></Post>
                ))}
            </section>
            {/* todo: creare componente PostForm */}
            <section className="my-8 text-white grow">
                <form
                    onSubmit={submitNewPost}
                    className="p-4 mx-16 rounded-xl bg-stone-700"
                >
                    <p>
                        <label htmlFor="new-post" className="underline">
                            What's on your mind
                        </label>
                    </p>
                    <textarea
                        id="new-post"
                        rows={5}
                        cols={50}
                        className="p-2 my-2 rounded-md resize-none"
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
