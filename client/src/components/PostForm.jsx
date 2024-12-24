function PostForm({ submitNewPost }) {
    return (
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
                className="w-full p-2 my-2 rounded-md resize-none"
            ></textarea>
            <div className="text-end">
                <button className="py-1 tracking-widest uppercase rounded-2xl">
                    Post
                </button>
            </div>
        </form>
    );
}

export default PostForm;
