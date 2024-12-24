import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";
import PostForm from "./PostForm";

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
        <main className="flex flex-wrap px-8 text-xl grow bg-stone-800">
            {/* todo: completare il filtro */}
            <div className="flex items-center w-full gap-2">
                <i className="fa-solid fa-filter"></i>
                <span>Filtra per</span>
                <select
                    onChange={(e) => {
                        const selected = e.target.value;
                        if (selected === "recentDate") {
                            const postsOrdered = posts.toSorted(
                                (a, b) => b.time - a.time
                            );
                            setPosts(postsOrdered);
                        } else if (selected === "authorName") {
                            console.log(selected)
                            // todo: in posts.js (api), aggiungere key username per tenere traccia di user tramite username
                            // const postsOrdered = posts.toSorted((a, b) => );
                        }
                    }}
                >
                    <option value=""></option>
                    <option value="authorName">Autore</option>
                    <option value="recentDate">Data</option>
                </select>
                <select>
                    <option value=""></option>
                    <option value="crescente">Crescente</option>
                    <option value="decrescente">Decrescente</option>
                </select>
            </div>

            <section className="w-3/5">
                <div className="posts-wrapper">
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
                </div>
            </section>
            <section className="w-2/5 my-8 text-white">
                <PostForm submitNewPost={submitNewPost} />
            </section>
        </main>
    );
}

export default Main;
